'use client';

import { useSyncExternalStore, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  installApp: () => Promise<'accepted' | 'dismissed' | 'ios' | 'unsupported'>;
}

// Module-level state to share prompt and install state across all components (Navbar, SettingsModal, etc.)
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
let globalIsInstalled = false;
const storeListeners = new Set<() => void>();

function notifyStore() {
  storeListeners.forEach((l) => l());
}

if (typeof window !== 'undefined') {
  // Check if early capture in <head> already caught beforeinstallprompt
  const win = window as unknown as {
    __pwaDeferredPrompt?: BeforeInstallPromptEvent | null;
    __pwaPromptReady?: (e: BeforeInstallPromptEvent) => void;
  };

  if (win.__pwaDeferredPrompt) {
    globalDeferredPrompt = win.__pwaDeferredPrompt;
  }

  // Register hook for early-capture script
  win.__pwaPromptReady = (e: BeforeInstallPromptEvent) => {
    globalDeferredPrompt = e;
    notifyStore();
  };

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    win.__pwaDeferredPrompt = globalDeferredPrompt;
    notifyStore();
  });

  window.addEventListener('appinstalled', () => {
    globalDeferredPrompt = null;
    globalIsInstalled = true;
    if (win.__pwaDeferredPrompt) win.__pwaDeferredPrompt = null;
    notifyStore();
    console.log('[PWA] Application successfully installed.');
  });
}

function subscribePWA(callback: () => void) {
  storeListeners.add(callback);
  if (typeof window === 'undefined') {
    return () => storeListeners.delete(callback);
  }

  const mql = window.matchMedia('(display-mode: standalone)');
  mql.addEventListener('change', callback);

  return () => {
    storeListeners.delete(callback);
    mql.removeEventListener('change', callback);
  };
}

function getInstalledSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  if (globalIsInstalled) return true;
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://');
  return isStandalone;
}

function getServerInstalledSnapshot(): boolean {
  return false;
}

function getPromptSnapshot(): BeforeInstallPromptEvent | null {
  return globalDeferredPrompt;
}

function getServerPromptSnapshot(): null {
  return null;
}

export function usePWA(): PWAState {
  const isInstalled = useSyncExternalStore(
    subscribePWA,
    getInstalledSnapshot,
    getServerInstalledSnapshot
  );

  const deferredPrompt = useSyncExternalStore(
    subscribePWA,
    getPromptSnapshot,
    getServerPromptSnapshot
  );

  const isAppleMobile = useSyncExternalStore(
    () => () => {},
    () => {
      if (typeof window === 'undefined') return false;
      const userAgent = window.navigator.userAgent || '';
      return /iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    },
    () => false
  );

  const isIOS = isAppleMobile && !isInstalled;

  const installApp = useCallback(async (): Promise<'accepted' | 'dismissed' | 'ios' | 'unsupported'> => {
    if (globalDeferredPrompt) {
      try {
        const promptEvent = globalDeferredPrompt;
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') {
          globalIsInstalled = true;
          globalDeferredPrompt = null;
          notifyStore();
        }
        return choice.outcome;
      } catch (err) {
        console.error('[PWA] Install prompt failed:', err);
        return 'unsupported';
      }
    }

    if (isIOS) {
      return 'ios';
    }

    return 'unsupported';
  }, [isIOS]);

  return {
    isInstallable: !!deferredPrompt || (isIOS && !isInstalled),
    isInstalled,
    isIOS,
    installApp,
  };
}
