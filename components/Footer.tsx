'use client';

import React from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { Atom, Cpu, ShieldCheck } from 'lucide-react';
import { allTopics } from '@/lib/content';
import { APP_VERSION_DATA } from '@/lib/version';

export const Footer: React.FC<{ onOpenVersion?: () => void }> = ({ onOpenVersion }) => {
  const { language, navigateTo } = useLearning();
  const t = translations[language];

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
