'use client';

import React, { useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { allTopics, getAllModules } from '@/lib/content';
import { TopicId } from '@/types/learning';
import {
  Atom,
  HeartPulse,
  Zap,
  CheckCircle2,
  Clock,
  BarChart3,
  Layers,
  Sparkles,
  ChevronRight,
  Search,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const LearningDashboard: React.FC<{ onOpenProgress: () => void }> = ({ onOpenProgress }) => {
  const {
    language,
    selectedTopicId,
    navigateTo,
    userProgress,
    totalCompletionPercentage,
    searchQuery,
    setSearchQuery,
  } = useLearning();

  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState<TopicId | 'all'>('all');

  const topicIcons: Record<TopicId, React.ReactNode> = {
    'quantum-mechanics': <Atom className="w-5 h-5 text-sky-500" />,
    'fetus-development': <HeartPulse className="w-5 h-5 text-rose-500" />,
    'ev-battery': <Zap className="w-5 h-5 text-emerald-500" />,
  };

  const filteredTopics = allTopics.filter((tp) => {
    if (activeFilter !== 'all' && tp.id !== activeFilter) return false;
    return true;
  });

  const allModulesList = getAllModules();
  const totalCompletedModules = userProgress.completedModules.length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      {/* Top Banner / Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1.5 font-mono">
                <span>{t.dashboard.welcomeTitle}</span>
                <span>/</span>
                <span>Interactive 3D Curriculum</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {language === 'en' ? 'Interactive Learning Modules' : 'Modul Pembelajaran Interaktif'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                {t.dashboard.welcomeSubtitle}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="flex items-center gap-4 p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-700 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-sky-500 stroke-current transition-all duration-700"
                    strokeDasharray={`${totalCompletionPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-black font-mono text-slate-900 dark:text-white">
                  {totalCompletionPercentage}%
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {totalCompletedModules} / {allModulesList.length} {language === 'en' ? 'Completed' : 'Selesai'}
                </div>
                <button
                  onClick={onOpenProgress}
                  className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Award className="w-3 h-3 text-amber-500" />
                  <span>{language === 'en' ? 'View Badges & Certificate' : 'Lihat Lencana & Sertifikat'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs & Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            {/* Topic Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t.dashboard.filterAll}
              </button>

              {allTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveFilter(topic.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    activeFilter === topic.id
                      ? 'bg-sky-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {topicIcons[topic.id]}
                  <span>{topic.title[language]}</span>
                </button>
              ))}
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Topics & Modules Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {filteredTopics.map((topic) => {
          const matchingModules = topic.modules.filter((m) => {
            if (!searchQuery.trim()) return true;
            return (
              m.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
              m.shortDescription[language].toLowerCase().includes(searchQuery.toLowerCase())
            );
          });

          if (matchingModules.length === 0) return null;

          const completedInTopic = topic.modules.filter((m) => userProgress.completedModules.includes(m.id)).length;

          return (
            <section key={topic.id} className="space-y-4">
              {/* Topic Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    {topicIcons[topic.id]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {topic.title[language]}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {topic.description[language]}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {completedInTopic} / {topic.modules.length}
                  </span>
                  <span>{language === 'en' ? 'modules completed' : 'modul selesai'}</span>
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingModules.map((module) => {
                  const isCompleted = userProgress.completedModules.includes(module.id);
                  const quizScore = userProgress.quizScores[module.id];

                  return (
                    <div
                      key={module.id}
                      className={`group relative bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                        isCompleted
                          ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/10 dark:bg-emerald-950/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500'
                      }`}
                    >
                      <div>
                        {/* Top Pills: Difficulty, Duration, Status */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider ${
                              module.difficulty === 'Beginner'
                                ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                                : module.difficulty === 'Intermediate'
                                ? 'bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300'
                                : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'
                            }`}
                          >
                            {language === 'en' ? module.difficulty : module.difficultyId}
                          </span>

                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {module.durationMinutes}m
                            </span>
                            {isCompleted && (
                              <span className="flex items-center gap-1 text-emerald-500 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {module.title[language]}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {module.shortDescription[language]}
                        </p>

                        {/* 3D Lab Feature Badge */}
                        <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 font-mono truncate">
                            {module.interactiveType === 'orbital-cloud' && '3D Quantum Orbital Wave Cloud'}
                            {module.interactiveType === 'double-slit' && '3D Double-Slit Wave Interference'}
                            {module.interactiveType === 'quantum-tunneling' && '3D Potential Barrier Quantum Tunneling'}
                            {module.interactiveType === 'bloch-sphere' && '3D Qubit Bloch Sphere State Vector'}
                            {module.interactiveType === 'embryo-timeline' && '3D Embryo & Ultrasound Morphogenesis'}
                            {module.interactiveType === 'ultrasound-scan' && '3D Doppler Ultrasound Heartbeat & Vessel Flow'}
                            {module.interactiveType === 'cell-cross-section' && '3D 4680 Battery Jellyroll Cross-Section'}
                            {module.interactiveType === 'ev-powertrain' && 'Aerodynamic & SiC Inverter Engine'}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Card Launch Button & Quiz Score */}
                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                        {quizScore !== undefined ? (
                          <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            Quiz: {quizScore}%
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 font-medium">
                            {module.quiz.length} Checkpoints
                          </div>
                        )}

                        <button
                          onClick={() => navigateTo('module', topic.id, module.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-sky-600 dark:hover:bg-sky-500 text-white dark:text-slate-900 hover:text-white dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          <span>{isCompleted ? (language === 'en' ? 'Review' : 'Ulangi') : (language === 'en' ? 'Start Lab' : 'Mulai Lab')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
