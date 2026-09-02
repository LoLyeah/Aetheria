'use client';

import React, { useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { allTopics } from '@/lib/content';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import { WebGPUTestBadge } from './3d/WebGPUTestBadge';
import {
  Sparkles,
  ArrowRight,
  Atom,
  HeartPulse,
  Zap,
  Layers,
  Cpu,
  Award,
  Globe2,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Activity,
  Boxes,
} from 'lucide-react';
import { TopicId } from '@/types/learning';

export const LandingPage: React.FC = () => {
  const { language, navigateTo, isWebGPUSupported, userProgress } = useLearning();
  const t = translations[language];
  const [hoveredTopic, setHoveredTopic] = useState<TopicId>('quantum-mechanics');

  const topicIcons: Record<TopicId, React.ReactNode> = {
    'quantum-mechanics': <Atom className="w-6 h-6 text-sky-500" />,
    'fetus-development': <HeartPulse className="w-6 h-6 text-rose-500" />,
    'ev-battery': <Zap className="w-6 h-6 text-emerald-500" />,
  };

  const topicAccentColors: Record<TopicId, { badge: string; border: string; glow: string; text: string }> = {
    'quantum-mechanics': {
      badge: 'bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300',
      border: 'hover:border-sky-400 dark:hover:border-sky-500',
      glow: 'group-hover:shadow-sky-500/10',
      text: 'text-sky-600 dark:text-sky-400',
    },
    'fetus-development': {
      badge: 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300',
      border: 'hover:border-rose-400 dark:hover:border-rose-500',
      glow: 'group-hover:shadow-rose-500/10',
      text: 'text-rose-600 dark:text-rose-400',
    },
    'ev-battery': {
      badge: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300',
      border: 'hover:border-emerald-400 dark:hover:border-emerald-500',
      glow: 'group-hover:shadow-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-sky-400/10 via-indigo-500/10 to-rose-400/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Top Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                <span>WebGPU-Accelerated 3D Simulation</span>
                <span className="text-slate-400">|</span>
                <span className="text-sky-600 dark:text-sky-400 font-mono">EN / ID</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {t.landing.heroTitlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500">
                  {t.landing.heroTitleHighlight}
                </span>{' '}
                {t.landing.heroTitleSuffix}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t.landing.heroDescription}
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => navigateTo('learn')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 transition-all hover:gap-3 cursor-pointer"
                >
                  <span>{t.landing.startLearningBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('curriculum-topics');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 shadow-xs transition-colors cursor-pointer"
                >
                  {t.landing.exploreTopicsBtn}
                </button>
              </div>

              {/* Quick Specs Callouts */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 text-center lg:text-left">
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white">
                    3 Topics
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'Deep STEM Core' : 'Sains & Rekayasa'}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono text-sky-600 dark:text-sky-400">
                    60 FPS
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'WebGPU 3D Labs' : 'Lab 3D WebGPU'}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    100% Free
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'Bilingual & Open' : 'Bilingual & Gratis'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Hologram Column */}
            <div className="lg:col-span-6">
              <Hero3DCanvas activeTopicId={hoveredTopic} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE DISCIPLINARY TOPIC SHOWCASE */}
      <section id="curriculum-topics" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-mono">
            {language === 'en' ? 'Disciplinary Matrix' : 'Matriks Disiplin Ilmu'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 tracking-tight">
            {language === 'en' ? 'Explore the Interactive Topics' : 'Jelajahi Topik Pembelajaran Interaktif'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {language === 'en'
              ? 'Each topic features hardware-accelerated 3D simulators, rigorous theoretical principles, and interactive checkpoint assessments.'
              : 'Setiap topik dilengkapi simulator 3D berakselerasi perangkat keras, teori mendalam, dan kuis evaluasi pemahaman.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allTopics.map((topic) => {
            const styles = topicAccentColors[topic.id];
            const completedCount = topic.modules.filter((m) => userProgress.completedModules.includes(m.id)).length;
            const progressPct = Math.round((completedCount / topic.modules.length) * 100);

            return (
              <div
                key={topic.id}
                onMouseEnter={() => setHoveredTopic(topic.id)}
                className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${styles.border} ${styles.glow}`}
              >
                <div>
                  {/* Card Header: Icon & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                      {topicIcons[topic.id]}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${styles.badge}`}>
                      {topic.modules.length} {language === 'en' ? 'Modules' : 'Modul'}
                    </span>
                  </div>

                  {/* Topic Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {topic.title[language]}
                  </h3>

                  {/* Topic Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {topic.description[language]}
                  </p>

                  {/* Modules Preview List */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {topic.modules.map((m, idx) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-slate-400 text-[10px]">0{idx + 1}</span>
                          <span className="truncate font-medium">{m.title[language]}</span>
                        </div>
                        {userProgress.completedModules.includes(m.id) ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">{m.durationMinutes}m</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button & Progress */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {progressPct > 0 && (
                    <div className="mb-3 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>{language === 'en' ? 'Completed' : 'Selesai'}</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => navigateTo('learn', topic.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 dark:hover:bg-sky-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{progressPct > 0 ? (language === 'en' ? 'Continue Topic' : 'Lanjutkan Topik') : (language === 'en' ? 'Start Topic' : 'Mulai Topik')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PLATFORM ARCHITECTURE & CAPABILITIES PILLARS */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t.landing.features.f1Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f1Desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t.landing.features.f2Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f2Desc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t.landing.features.f3Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f3Desc}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t.landing.features.f4Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HARDWARE STATUS & ENGINE CALLOUT */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                GPU Compute Shader Ready
              </span>
              <span className="text-xs text-slate-400 font-mono">Next-Gen Web Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              {language === 'en' ? 'Powered by Next-Gen 3D WebGPU Engine' : 'Ditenagai Mesin 3D WebGPU Generasi Baru'}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              {language === 'en'
                ? 'Direct GPU pipeline access enables rendering 50,000+ atomic orbital probability particles and real-time fluid dynamics directly in your browser.'
                : 'Akses langsung pipeline GPU memungkinkan rendering 50.000+ partikel probabilitas orbital atom dan dinamika fluida secara real-time di peramban Anda.'}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => navigateTo('learn')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              {language === 'en' ? 'Open Learning Lab' : 'Buka Lab Belajar'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
