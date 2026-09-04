import type { Metadata, Viewport } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css'; // Global styles

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Aetheria - Interactive 3D Science & Tech Learning Platform',
  description: 'An interactive WebGPU/3D learning platform featuring Quantum Mechanics, Embryonic Development, and EV Battery Technology with interactive simulations, bilingual support (EN/ID), and progress tracking.',
  applicationName: 'Aetheria',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Aetheria',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Aetheria - Interactive 3D Science & Tech Learning Platform',
    description: 'An interactive WebGPU/3D learning platform featuring Quantum Mechanics, Embryonic Development, and EV Battery Technology with interactive simulations, bilingual support (EN/ID), and progress tracking.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aetheria - Interactive 3D Science & Tech Learning Platform',
    description: 'An interactive WebGPU/3D learning platform featuring Quantum Mechanics, Embryonic Development, and EV Battery Technology with interactive simulations, bilingual support (EN/ID), and progress tracking.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('aetheria_theme_v1');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
                // Early capture of beforeinstallprompt so no component misses it
                window.addEventListener('beforeinstallprompt', function(e) {
                  e.preventDefault();
                  window.__pwaDeferredPrompt = e;
                  if (typeof window.__pwaPromptReady === 'function') {
                    window.__pwaPromptReady(e);
                  }
                });
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(err) {
                      console.warn('[PWA] Service Worker registration failed:', err);
                    });
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-200 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
