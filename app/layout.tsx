import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Aetheria - Interactive 3D Science & Tech Learning Platform',
  description: 'An interactive WebGPU/3D learning platform featuring Quantum Mechanics, Embryonic Development, and EV Battery Technology with interactive simulations, bilingual support (EN/ID), and progress tracking.',
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
