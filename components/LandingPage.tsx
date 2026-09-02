'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { allTopics } from '@/lib/content';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import {
  ArrowRight,
  Atom,
  HeartPulse,
  Zap,
  Cpu,
  Award,
  Globe2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { TopicId } from '@/types/learning';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

export const LandingPage: React.FC = () => {
  const { language, navigateTo, userProgress } = useLearning();
  const t = translations[language];
  const [hoveredTopic, setHoveredTopic] = useState<TopicId>('quantum-mechanics');

  const topicIcons: Record<TopicId, React.ReactNode> = {
    'quantum-mechanics': <Atom className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    'fetus-development': <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    'ev-battery': <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20"
    >
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Refined Academic Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>WebGPU & Three.js 3D Physics</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>EN / ID</span>
              </div>

              {/* Main Headline - Clean, High Contrast, No AI Slop Rainbow Text */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {t.landing.heroTitlePrefix}{' '}
                <span className="text-sky-600 dark:text-sky-400 underline decoration-sky-500/30 decoration-2 underline-offset-8">
                  {t.landing.heroTitleHighlight}
                </span>{' '}
                {t.landing.heroTitleSuffix}
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t.landing.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('learn')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{t.landing.startLearningBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('curriculum-topics');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
                >
                  {t.landing.exploreTopicsBtn}
                </motion.button>
              </div>

              {/* Refined Metric Bar - Flat & High Precision */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                    3
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'Core Disciplines' : 'Disiplin Utama'}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-sky-600 dark:text-sky-400">
                    60 FPS
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'Real-Time Physics' : 'Fisika Real-Time'}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {language === 'en' ? 'Free & Open' : 'Gratis & Terbuka'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive 3D Hologram Column */}
            <motion.div variants={itemVariants} className="lg:col-span-6">
              <Hero3DCanvas activeTopicId={hoveredTopic} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THREE MAJOR TOPICS SHOWCASE */}
      <section id="curriculum-topics" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div variants={itemVariants} className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'CORE DISCIPLINES' : 'DISIPLIN UTAMA'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === 'en' ? 'Select a Subject Area' : 'Pilih Disiplin Sains'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            {language === 'en'
              ? 'Every discipline contains progressive structured parts, interactive 3D laboratory apparatus, rigorous theory, and assessment checkpoints.'
              : 'Setiap disiplin dilengkapi bagian pembelajaran bertahap, aparatus laboratorium 3D, teori mendalam, dan kuis evaluasi.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allTopics.map((topic, idx) => {
            const completedCount = topic.modules.filter((m) => userProgress.completedModules.includes(m.id)).length;
            const progressPct = Math.round((completedCount / topic.modules.length) * 100);

            return (
              <motion.div
                key={topic.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredTopic(topic.id)}
                onClick={() => navigateTo('learn', topic.id)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Discipline Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                      {topicIcons[topic.id]}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                      {topic.category[language]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {topic.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {topic.description[language]}
                  </p>

                  {/* Sequential Parts Overview List */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-400 mb-1">
                      <span>{language === 'en' ? 'Curriculum Structure' : 'Struktur Kurikulum'}</span>
                      <span>{topic.modules.length} {language === 'en' ? 'Parts' : 'Bagian'}</span>
                    </div>

                    {topic.modules.map((m) => {
                      const isDone = userProgress.completedModules.includes(m.id);
                      return (
                        <div
                          key={m.id}
                          className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {language === 'en' ? `P${m.order}` : `B${m.order}`}
                            </span>
                            <span className="truncate font-medium">{m.title[language]}</span>
                          </div>

                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono">{m.durationMinutes}m</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    <span>
                      {progressPct > 0
                        ? (language === 'en' ? `Continue Topic (${progressPct}%)` : `Lanjutkan (${progressPct}%)`)
                        : (language === 'en' ? 'Open Topic Modules' : 'Buka Modul Topik')}
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. SCIENTIFIC CAPABILITIES PILLARS */}
      <section className="py-14 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div variants={itemVariants} className="p-4 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {t.landing.features.f1Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f1Desc}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {t.landing.features.f2Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f2Desc}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {t.landing.features.f3Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f3Desc}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {t.landing.features.f4Title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.landing.features.f4Desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
