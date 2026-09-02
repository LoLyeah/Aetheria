'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { getTopicById, getModuleById } from '@/lib/content';
import { QuantumOrbitalViewer } from './3d/QuantumOrbitalViewer';
import { DoubleSlitViewer } from './3d/DoubleSlitViewer';
import { EmbryoViewer } from './3d/EmbryoViewer';
import { BatteryCellViewer } from './3d/BatteryCellViewer';
import { EVPowertrainSimulator } from './simulators/EVPowertrainSimulator';
import { TheoryReader } from './TheoryReader';
import { QuizComponent } from './QuizComponent';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Edit3,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

interface ModuleViewerProps {
  onOpenGlossary?: () => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({ onOpenGlossary }) => {
  const {
    language,
    selectedTopicId,
    selectedModuleId,
    navigateTo,
    userProgress,
    markModuleComplete,
    toggleBookmark,
    saveNote,
  } = useLearning();

  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'interactive' | 'theory' | 'quiz' | 'notes'>('interactive');

  const topic = getTopicById(selectedTopicId || 'quantum-mechanics');
  const currentModule = getModuleById(selectedModuleId || 'qm-mod-1')?.module || topic?.modules[0];

  // Scroll to top on module or tab change to prevent overlapping view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedModuleId, activeTab]);

  if (!topic || !currentModule) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Module Not Found</h2>
        <button
          onClick={() => navigateTo('learn', null)}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
        >
          Return to Topics
        </button>
      </div>
    );
  }

  const isCompleted = userProgress.completedModules.includes(currentModule.id);
  const isBookmarked = userProgress.bookmarks.includes(currentModule.id);
  const currentNote = userProgress.notes[currentModule.id] || '';

  // Previous & Next Modules in current topic
  const currentIdx = topic.modules.findIndex((m) => m.id === currentModule.id);
  const prevModule = currentIdx > 0 ? topic.modules[currentIdx - 1] : null;
  const nextModule = currentIdx < topic.modules.length - 1 ? topic.modules[currentIdx + 1] : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* 1. Header Breadcrumbs & Controls */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs truncate">
            <button
              onClick={() => navigateTo('learn', null)}
              className="flex items-center gap-1 font-semibold text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.nav.topics}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <button
              onClick={() => navigateTo('learn', topic.id)}
              className="font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer truncate max-w-[200px]"
            >
              {topic.title[language]}
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex-shrink-0">
              {language === 'en' ? `Part ${currentModule.order}` : `Bagian ${currentModule.order}`}
            </span>
            <span className="font-bold text-slate-900 dark:text-white truncate">
              {currentModule.title[language]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleBookmark(currentModule.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Bookmark module"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => markModuleComplete(currentModule.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? (language === 'en' ? 'Completed' : 'Selesai') : t.moduleViewer.markComplete}</span>
            </motion.button>
          </div>
        </div>

        {/* 2. Workspace Tabs with Smooth Indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'interactive'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>{t.moduleViewer.tab3DLab}</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'theory'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>{t.moduleViewer.tabOverview}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-500" />
            <span>{t.moduleViewer.tabQuiz}</span>
            {userProgress.quizScores[currentModule.id] !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">
                {userProgress.quizScores[currentModule.id]}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'notes'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-500" />
            <span>{t.moduleViewer.tabNotes}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Dynamic Content Container with AnimatePresence */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: 3D INTERACTIVE LAB */}
          {activeTab === 'interactive' && (
            <motion.div
              key="interactive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {(currentModule.interactiveType === 'orbital-cloud' || currentModule.interactiveType === 'bloch-sphere') && <QuantumOrbitalViewer />}
              {(currentModule.interactiveType === 'double-slit' || currentModule.interactiveType === 'quantum-tunneling') && <DoubleSlitViewer />}
              {(currentModule.interactiveType === 'embryo-timeline' || currentModule.interactiveType === 'ultrasound-scan') && <EmbryoViewer />}
              {currentModule.interactiveType === 'cell-cross-section' && <BatteryCellViewer />}
              {currentModule.interactiveType === 'ev-powertrain' && <EVPowertrainSimulator />}
            </motion.div>
          )}

          {/* TAB 2: THEORY & PRINCIPLES */}
          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <TheoryReader
                module={currentModule}
                topic={topic}
                language={language}
                onNavigateToQuiz={() => setActiveTab('quiz')}
                onNavigateTo3D={() => setActiveTab('interactive')}
                onOpenGlossary={onOpenGlossary}
              />
            </motion.div>
          )}

          {/* TAB 3: CHECKPOINT QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <QuizComponent
                module={currentModule}
                topic={topic}
                language={language}
                onOpenGlossary={onOpenGlossary}
                onNavigateToTheory={() => setActiveTab('theory')}
                onNavigateToNextModule={
                  nextModule
                    ? () => navigateTo('module', topic.id, nextModule.id)
                    : () => navigateTo('learn', null)
                }
              />
            </motion.div>
          )}

          {/* TAB 4: STUDY NOTES */}
          {activeTab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Personal Study Notes' : 'Catatan Belajar Pribadi'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'en'
                      ? 'Notes are saved locally in your browser for this module.'
                      : 'Catatan disimpan secara lokal di peramban untuk modul ini.'}
                  </p>
                </div>
              </div>

              <textarea
                rows={12}
                value={currentNote}
                onChange={(e) => saveNote(currentModule.id, e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Record formulas, observations, or questions here...'
                    : 'Catat rumus, hasil observasi simulasi 3D, atau pertanyaan di sini...'
                }
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono leading-relaxed resize-y"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Navigation Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {prevModule ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('module', topic.id, prevModule.id)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevModule.title[language]}</span>
              <span className="sm:hidden">{t.moduleViewer.prevModule}</span>
            </motion.button>
          ) : (
            <div />
          )}

          {nextModule ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('module', topic.id, nextModule.id)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span className="hidden sm:inline">{nextModule.title[language]}</span>
              <span className="sm:hidden">{t.moduleViewer.nextModule}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('learn', null)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>{language === 'en' ? 'Back to Topics' : 'Kembali ke Topik'}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
