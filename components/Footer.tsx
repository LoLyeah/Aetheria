'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import {
  Atom,
  Cpu,
  Download,
  Check,
  X,
  BookOpen,
  Award,
  Settings,
  Tag,
} from 'lucide-react';
import { allTopics } from '@/lib/content';
import { APP_VERSION_DATA } from '@/lib/version';
import { usePWA } from '@/hooks/usePWA';

export interface FooterProps {
  onOpenVersion?: () => void;
  onOpenProgress?: () => void;
  onOpenGlossary?: () => void;
  onOpenSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVersion,
  onOpenProgress,
  onOpenGlossary,
  onOpenSettings,
}) => {
  const { language, navigateTo } = useLearning();
  const t = translations[language];
  const { isInstalled, installApp } = usePWA();
  const [installFeedback, setInstallFeedback] = useState<string | null>(null);
  const installTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (installTimerRef.current) clearTimeout(installTimerRef.current);
    };
  }, []);

  const showInstallFeedback = (msg: string, duration: number) => {
    if (installTimerRef.current) clearTimeout(installTimerRef.current);
    setInstallFeedback(msg);
    installTimerRef.current = setTimeout(() => {
      setInstallFeedback(null);
      installTimerRef.current = null;
    }, duration);
  };

  const handleInstallClick = async () => {
    const outcome = await installApp();
    if (outcome === 'ios') {
      showInstallFeedback(t.pwa.iosGuide, 6000);
    } else if (outcome === 'accepted') {
      showInstallFeedback(t.pwa.installedSuccess, 4000);
    } else if (outcome === 'unsupported') {
      showInstallFeedback(t.pwa.unsupportedGuide, 6000);
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          {/* Brand & Scientific Overview */}
          <div className="space-y-3.5 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shadow-2xs">
                <Atom className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span>WebGPU / WebGL2 Pipeline</span>
              </div>
              <span>•</span>
              <button
                type="button"
                onClick={onOpenVersion}
                aria-haspopup="dialog"
                className="hover:text-sky-500 underline underline-offset-2 transition-colors cursor-pointer"
              >
                v{APP_VERSION_DATA.version}
              </button>
            </div>

            {/* PWA Installation Affordance */}
            <div className="pt-2">
              {!isInstalled ? (
                <div className="space-y-2">
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstallClick}
                    aria-label={t.pwa.installTitle}
                    title={t.pwa.installTitle}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                    <span>{t.nav.installApp}</span>
                  </motion.button>
                  <AnimatePresence>
                    {installFeedback && (
                      <motion.div
                        role="status"
                        aria-live="polite"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2 max-w-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span className="flex-1 leading-relaxed font-sans">{installFeedback}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (installTimerRef.current) clearTimeout(installTimerRef.current);
                            setInstallFeedback(null);
                          }}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-1 rounded-md"
                          aria-label={t.footer.dismissFeedback}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{t.footer.runningAsApp}</span>
                </div>
              )}
            </div>
          </div>

          {/* Curriculum Disciplines Directory (2-Column Subgrid) */}
          <div className="space-y-3.5 lg:col-span-5">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] font-mono">
              {t.footer.disciplinesTitle}
            </h4>
            <nav aria-label={t.footer.disciplinesNav}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {allTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => navigateTo('learn', topic.id)}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-left cursor-pointer leading-snug py-0.5"
                  >
                    {topic.title[language]}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Platform & Laboratory Tools (Interactive Nav) */}
          <div className="space-y-3.5 lg:col-span-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] font-mono">
              {t.footer.platformToolsTitle}
            </h4>
            <nav aria-label={t.footer.platformToolsNav}>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={onOpenGlossary}
                    aria-haspopup="dialog"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left w-full group py-1"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>{t.footer.scientificGlossary}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenProgress}
                    aria-haspopup="dialog"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left w-full group py-1"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>{t.footer.masteryCertificates}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    aria-haspopup="dialog"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left w-full group py-1"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>{t.footer.simulationSettings}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenVersion}
                    aria-haspopup="dialog"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left w-full group py-1"
                  >
                    <Tag className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>{t.footer.releaseNotes}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright & Legal Standards */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Aetheria Interactive Science Platform. {t.footer.rightsReserved}
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={onOpenVersion}
              aria-haspopup="dialog"
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Release v{APP_VERSION_DATA.version}
            </button>
            <span>•</span>
            <span>English & Bahasa Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
