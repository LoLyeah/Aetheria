import { AppView } from '@/context/LearningContext';
import { TopicId } from '@/types/learning';
import { allTopics, getModuleById, getTopicById } from '@/lib/content';

export type ModuleTab = 'theory' | 'interactive' | 'quiz' | 'notes';

export const VALID_MODULE_TABS: readonly ModuleTab[] = ['theory', 'interactive', 'quiz', 'notes'] as const;

export const VALID_TOPIC_IDS: readonly TopicId[] = [
  'quantum-mechanics',
  'fetus-development',
  'ev-battery',
  'pulmonology-pneumonia',
  'cardiac-arrest',
  'hypertension',
  'biomes-ecology',
  'hybrid-vehicles',
  'battery-storage',
  'nuclear-reactor',
] as const;

export interface RouteState {
  view: AppView;
  topicId: TopicId | null;
  moduleId: string | null;
  tab: ModuleTab;
}

export function isValidTopicId(id: string | null | undefined): id is TopicId {
  if (!id) return false;
  const normalized = id.trim().toLowerCase();
  return allTopics.some((t) => t.id === normalized);
}

export function isValidModuleTab(tab: string | null | undefined): tab is ModuleTab {
  if (!tab) return false;
  const normalized = tab.trim().toLowerCase();
  return (VALID_MODULE_TABS as readonly string[]).includes(normalized);
}

/**
 * Parses path slug segments into application state.
 * Handles case-insensitivity, whitespace, duplicate slashes, and fallback routes.
 * Examples:
 *   [] -> landing
 *   ['learn'] -> learn (all topics)
 *   ['learn', 'quantum-mechanics'] -> learn (topic)
 *   ['learn', 'quantum-mechanics', 'qm-mod-1'] -> module
 *   ['settings'] -> settings
 */
export function parseSlugToState(slug?: string[]): RouteState {
  if (!slug || slug.length === 0) {
    return { view: 'landing', topicId: null, moduleId: null, tab: 'theory' };
  }

  const cleanSegments = slug
    .filter(Boolean)
    .map((s) => s.trim().toLowerCase());

  if (cleanSegments.length === 0) {
    return { view: 'landing', topicId: null, moduleId: null, tab: 'theory' };
  }

  const [first, second, third] = cleanSegments;

  if (first === 'settings') {
    return { view: 'settings', topicId: null, moduleId: null, tab: 'theory' };
  }

  if (first === 'learn') {
    if (!second) {
      return { view: 'learn', topicId: null, moduleId: null, tab: 'theory' };
    }

    // e.g. /learn/quantum-mechanics or /learn/quantum-mechanics/qm-mod-1
    if (isValidTopicId(second)) {
      if (third) {
        const found = getModuleById(third);
        if (found) {
          return { view: 'module', topicId: found.topic.id, moduleId: found.module.id, tab: 'theory' };
        }
        // If third is not recognized as a module, keep topic view
        return { view: 'learn', topicId: second as TopicId, moduleId: null, tab: 'theory' };
      }
      return { view: 'learn', topicId: second as TopicId, moduleId: null, tab: 'theory' };
    }

    // Direct module shortcut: /learn/qm-mod-1
    const foundModule = getModuleById(second);
    if (foundModule) {
      return { view: 'module', topicId: foundModule.topic.id, moduleId: foundModule.module.id, tab: 'theory' };
    }

    // Fallback for unknown sub-route of /learn
    return { view: 'learn', topicId: null, moduleId: null, tab: 'theory' };
  }

  // Direct topic slug: /quantum-mechanics
  if (isValidTopicId(first)) {
    if (second) {
      const foundModule = getModuleById(second);
      if (foundModule) {
        return { view: 'module', topicId: foundModule.topic.id, moduleId: foundModule.module.id, tab: 'theory' };
      }
    }
    return { view: 'learn', topicId: first as TopicId, moduleId: null, tab: 'theory' };
  }

  // Direct module slug: /qm-mod-1
  const directModule = getModuleById(first);
  if (directModule) {
    return { view: 'module', topicId: directModule.topic.id, moduleId: directModule.module.id, tab: 'theory' };
  }

  return { view: 'landing', topicId: null, moduleId: null, tab: 'theory' };
}

/**
 * Parses full URL pathname and search query string into application state.
 * Supports clean paths, ?tab= parameter, and backward-compatible legacy query params.
 */
export function parseUrlToState(pathname: string, search: string): RouteState {
  const cleanPath = (pathname || '').replace(/^\/+|\/+$/g, '');
  const segments = cleanPath ? cleanPath.split('/').filter(Boolean) : [];
  const searchParams = new URLSearchParams(search || '');

  const state = parseSlugToState(segments);

  // Tab parameter takes precedence for module view
  const tabParam = searchParams.get('tab');
  if (isValidModuleTab(tabParam)) {
    state.tab = tabParam.trim().toLowerCase() as ModuleTab;
  }

  // Backward compatibility with legacy query params (e.g. /?topic=...&module=... or /learn?module=...)
  const topicParam = searchParams.get('topic');
  const moduleParam = searchParams.get('module');
  const viewParam = searchParams.get('view');

  if (moduleParam) {
    const found = getModuleById(moduleParam.trim().toLowerCase());
    if (found) {
      state.view = 'module';
      state.topicId = found.topic.id;
      state.moduleId = found.module.id;
    }
  } else if (topicParam && isValidTopicId(topicParam)) {
    const normalizedTopic = topicParam.trim().toLowerCase() as TopicId;
    state.topicId = normalizedTopic;
    if (viewParam === 'module' || state.view === 'module') {
      const topic = getTopicById(normalizedTopic);
      if (topic && topic.modules.length > 0) {
        state.view = 'module';
        state.moduleId = topic.modules[0].id;
      } else {
        state.view = 'learn';
      }
    } else {
      state.view = 'learn';
    }
  } else if (viewParam === 'learn' || viewParam === 'settings') {
    state.view = viewParam;
  }

  // Ensure tabs only exist on module view
  if (state.view !== 'module') {
    state.tab = 'theory';
  }

  return state;
}

/**
 * Builds the canonical clean RESTful URL for any given application state.
 * Resolves true parent topic ID from content definitions to prevent broken link generation.
 */
export function getUrlForState(
  view: AppView,
  topicId?: TopicId | null,
  moduleId?: string | null,
  tab?: ModuleTab
): string {
  if (view === 'landing') {
    return '/';
  }

  if (view === 'settings') {
    return '/settings';
  }

  if (view === 'module' && moduleId) {
    // Resolve true parent topic ID for the module if available
    const found = getModuleById(moduleId);
    const resolvedTopicId = found ? found.topic.id : topicId;

    const basePath = resolvedTopicId
      ? `/learn/${resolvedTopicId}/${moduleId}`
      : `/learn/module/${moduleId}`;

    if (tab && tab !== 'theory' && isValidModuleTab(tab)) {
      return `${basePath}?tab=${tab.toLowerCase()}`;
    }
    return basePath;
  }

  if (view === 'learn') {
    if (topicId && isValidTopicId(topicId)) {
      return `/learn/${topicId.toLowerCase()}`;
    }
    return '/learn';
  }

  return '/';
}

/**
 * Resilient cross-browser clipboard copy with secure API preference
 * and bulletproof textarea fallback for iOS Safari and in-app webviews.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || !text) return false;

  // 1. Try modern Async Clipboard API first if in secure context
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (clipErr) {
      console.warn('Async clipboard write failed, attempting fallback:', clipErr);
    }
  }

  // 2. Fallback for non-secure contexts, older Safari iOS, and in-app webviews
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.contain = 'strict';
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.style.fontSize = '12pt'; // Prevent auto-zooming in iOS Safari
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.warn('Fallback execCommand copy failed:', err);
    return false;
  }
}
