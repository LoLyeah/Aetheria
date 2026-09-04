'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { Atom, Cpu, ShieldCheck, Download, Check, X } from 'lucide-react';
import { allTopics } from '@/lib/content';
import { APP_VERSION_DATA } from '@/lib/version';
import { usePWA } from '@/hooks/usePWA';

export const Footer: React.FC<{ onOpenVersion?: () => void }> = ({ onOpenVersion }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shadow-2xs">
                <Atom className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              {language === 'en'
                ? 'An interactive scientific laboratory and learning platform powered by WebGPU and Three.js, delivering real-time 3D physics simulations across Quantum Mechanics, Embryonic Morphogenesis, and EV Battery Technology.'
                : 'Laboratorium sains dan platform pembelajaran interaktif ditenagai oleh WebGPU dan Three.js, menghadirkan simulasi fisika 3D real-time pada Mekanika Kuantum, Morfogenesis Janin, dan Teknologi Baterai Kendaraan Listrik.'}
            </p>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-500" />
                <span>WebGPU / WebGL2 Pipeline</span>
              </div>
              <span>•</span>
              <button
                onClick={onOpenVersion}
                className="hover:text-sky-500 underline underline-offset-2 transition-colors cursor-pointer"
              >
                v{APP_VERSION_DATA.version} (SemVer)
              </button>
            </div>

            {/* PWA Installation Affordance */}
            <div className="pt-2">
              {!isInstalled ? (
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInstallClick}
                    aria-label={t.pwa.installTitle}
                    title={t.pwa.installTitle}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors text-xs font-semibold cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-500" />
                    <span>{t.nav.installApp}</span>
                  </motion.button>
                  <AnimatePresence>
                    {installFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2 max-w-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span className="flex-1 leading-relaxed font-sans">{installFeedback}</span>
                        <button
                          onClick={() => {
                            if (installTimerRef.current) clearTimeout(installTimerRef.current);
                            setInstallFeedback(null);
                          }}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-0.5"
                          aria-label="Dismiss feedback"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.pwa.runningAsApp}</span>
                </div>
              )}
            </div>
          </div>

          {/* Curriculum Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] font-mono">
              {language === 'en' ? 'Disciplines' : 'Disiplin Ilmu'}
            </h4>
            <ul className="space-y-2">
              {allTopics.map((topic) => (
                <li key={topic.id}>
                  <button
                    onClick={() => navigateTo('learn', topic.id)}
                    className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-left cursor-pointer"
                  >
                    {topic.title[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Architecture & Verifications */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] font-mono">
              {language === 'en' ? 'Specifications' : 'Spesifikasi'}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Next.js 15+ App Router</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Three.js Hardware Acceleration</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SemVer x.y.z (Auto Commit-Bump)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Bilingual English & Indonesian</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Aetheria Interactive Science Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <button
              onClick={onOpenVersion}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
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
