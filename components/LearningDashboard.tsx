'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { allTopics, getTopicById } from '@/lib/content';
import {
  Atom,
  HeartPulse,
  Zap,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Award,
  Bookmark,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { TopicId } from '@/types/learning';

const topicIcons: Record<TopicId, React.ReactNode> = {
  'quantum-mechanics': <Atom className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
  'fetus-development': <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
  'ev-battery': <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
};

export const LearningDashboard: React.FC<{ onOpenProgress: () => void }> = ({ onOpenProgress }) => {
  const {
    language,
    selectedTopicId,
    navigateTo,
    userProgress,
    totalCompletionPercentage,
  } = useLearning();

  const t = translations[language];
  const currentTopic = selectedTopicId ? getTopicById(selectedTopicId) : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* 1. Dashboard Sub-Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
              <button
                onClick={() => navigateTo('landing')}
                className="hover:text-sky-600 transition-colors cursor-pointer"
              >
                AETHERIA
              </button>
              <span>/</span>
              <button
                onClick={() => navigateTo('learn', null)}
                className={`transition-colors ${
                  !selectedTopicId ? 'text-sky-600 dark:text-sky-400 font-bold' : 'hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                {t.nav.topics}
              </button>
              {currentTopic && (
                <>
                  <span>/</span>
                  <span className="text-slate-900 dark:text-white font-bold truncate">
                    {currentTopic.title[language]}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentTopic
                ? currentTopic.title[language]
                : (language === 'en' ? 'Scientific Disciplines & Curriculum' : 'Disiplin Sains & Kurikulum')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {currentTopic
                ? currentTopic.description[language]
                : (language === 'en'
                  ? 'Select a core topic below to open its dedicated modular learning path, 3D interactive laboratories, and checkpoint quizzes.'
                  : 'Pilih topik utama di bawah ini untuk membuka modul pembelajaran terstruktur, laboratorium interaktif 3D, dan kuis evaluasi.')}
            </p>
          </div>

          {/* Quick Progress Indicator Card */}
          <div className="flex items-center gap-3 self-start md:self-auto p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {language === 'en' ? 'Curriculum Progress' : 'Progres Kurikulum'}
              </div>
              <div className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                {userProgress.completedModules.length} / 12 {language === 'en' ? 'Modules' : 'Modul'} ({totalCompletionPercentage}%)
              </div>
            </div>
            <button
              onClick={onOpenProgress}
              className="ml-2 px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Badges' : 'Lencana'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content View Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AnimatePresence mode="wait">
          {/* VIEW A: TOPIC MODULE LIST (When a topic is selected) */}
          {currentTopic ? (
            <motion.div
              key={currentTopic.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Back to all topics button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigateTo('learn', null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'en' ? 'Back to All Topics' : 'Kembali ke Semua Topik'}</span>
                </button>

                <span className="text-xs font-mono font-semibold text-slate-400">
                  {currentTopic.modules.length} {language === 'en' ? 'Modules in Sequence' : 'Modul Berurutan'}
                </span>
              </div>

              {/* Sequential Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentTopic.modules.map((m, idx) => {
                  const isCompleted = userProgress.completedModules.includes(m.id);
                  const isBookmarked = userProgress.bookmarks.includes(m.id);
                  const quizScore = userProgress.quizScores[m.id];

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.35 }}
                      whileHover={{ y: -3 }}
                      onClick={() => navigateTo('module', currentTopic.id, m.id)}
                      className={`group relative bg-white dark:bg-slate-900 border rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                        isCompleted
                          ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                          : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                      }`}
                    >
                      <div>
                        {/* Part Tag & Metadata */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                            {language === 'en' ? `Part ${m.order}` : `Bagian ${m.order}`}
                          </span>

                          <div className="flex items-center gap-2">
                            {quizScore !== undefined && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                                Score {quizScore}%
                              </span>
                            )}
                            {isBookmarked && (
                              <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            )}
                            {isCompleted && (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{language === 'en' ? 'Completed' : 'Selesai'}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {m.title[language]}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                          {m.shortDescription[language]}
                        </p>

                        {/* Lab Feature Badge */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-[11px] font-medium">
                            <Sparkles className="w-3 h-3 text-sky-500" />
                            <span>{m.interactiveType.replace('-', ' ').toUpperCase()} Lab</span>
                          </div>

                          <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                            <Clock className="w-3 h-3" />
                            <span>{m.durationMinutes} min</span>
                          </div>
                        </div>
                      </div>

                      {/* Launch Button Footer */}
                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        <span>{language === 'en' ? 'Launch Interactive Lab & Theory' : 'Buka Lab Interaktif & Teori'}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* VIEW B: TOPICS OVERVIEW (When no specific topic is chosen) */
            <motion.div
              key="topics-overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allTopics.map((topic, idx) => {
                  const completedCount = topic.modules.filter((m) => userProgress.completedModules.includes(m.id)).length;
                  const pct = Math.round((completedCount / topic.modules.length) * 100);

                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.35 }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigateTo('learn', topic.id)}
                      className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                            {topicIcons[topic.id]}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                            {topic.modules.length} {language === 'en' ? 'Parts' : 'Bagian'}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {topic.title[language]}
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                          {topic.description[language]}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-5 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span>{language === 'en' ? 'Progress' : 'Kemajuan'}</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{completedCount} / {topic.modules.length} ({pct}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        <span>{language === 'en' ? 'View Topic Modules' : 'Buka Modul Topik'}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
