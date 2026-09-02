'use client';

import React from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { Atom, HeartPulse, Zap, Globe, Github, Cpu, ShieldCheck } from 'lucide-react';
import { allTopics } from '@/lib/content';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useLearning();
  const t = translations[language];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-xs">
                <Atom className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              {language === 'en'
                ? 'An innovative, next-generation scientific learning platform powered by WebGPU and Three.js, delivering interactive 3D simulations across Quantum Mechanics, Embryonic Development, and EV Battery Technology.'
                : 'Platform pembelajaran sains generasi baru yang ditenagai oleh WebGPU dan Three.js, menghadirkan simulasi 3D interaktif pada Mekanika Kuantum, Perkembangan Janin, dan Teknologi Baterai Kendaraan Listrik.'}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
              <Cpu className="w-3.5 h-3.5 text-sky-500" />
              <span>WebGPU / WebGL2 Real-Time Graphics Pipeline</span>
            </div>
          </div>

          {/* Curriculum Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              {language === 'en' ? 'Curriculum Topics' : 'Topik Kurikulum'}
            </h4>
            <ul className="space-y-2">
              {allTopics.map((topic) => (
                <li key={topic.id}>
                  <button
                    onClick={() => navigateTo('learn', topic.id)}
                    className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-left"
                  >
                    {topic.title[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Architecture & Verifications */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              {language === 'en' ? 'Core Capabilities' : 'Kemampuan Utama'}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Next.js 15+ & Vercel Optimized</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Three.js WebGPU Fallback</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Client-Side Offline LocalStorage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Bilingual English & Indonesian</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Aetheria Interactive Lab. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Light Mode Default</span>
            <span>•</span>
            <span>English & Bahasa Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
