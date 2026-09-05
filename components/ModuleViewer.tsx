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
import { PulmonaryAlveoliViewer } from './3d/PulmonaryAlveoliViewer';
import { CardiacArrestViewer } from './3d/CardiacArrestViewer';
import { HypertensionVascularViewer } from './3d/HypertensionVascularViewer';
import { BiomesGlobeViewer } from './3d/BiomesGlobeViewer';
import { EVPowertrainSimulator } from './simulators/EVPowertrainSimulator';
import { TheoryReader } from './TheoryReader';
import { QuizComponent } from './QuizComponent';
import { StudyNotesWorkspace } from './StudyNotesWorkspace';
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
  const [activeTab, setActiveTab] = useState<'theory' | 'interactive' | 'quiz' | 'notes'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const tabParam = new URLSearchParams(window.location.search).get('tab');
        if (tabParam === 'interactive' || tabParam === 'quiz' || tabParam === 'notes' || tabParam === 'theory') {
          return tabParam;
        }
      } catch {}
    }
    return 'theory';
  });
  const [prevModuleId, setPrevModuleId] = useState<string | null>(selectedModuleId);
  if (selectedModuleId !== prevModuleId) {
    setPrevModuleId(selectedModuleId);
    setActiveTab('theory');
  }

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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors w-full min-w-0 overflow-x-hidden">
      {/* 1. Header Breadcrumbs & Controls */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs truncate min-w-0 flex-1">
            <button
              onClick={() => navigateTo('learn', null)}
              className="flex items-center gap-1 font-semibold text-slate-400 hover:text-sky-600 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.nav.topics}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700 shrink-0">/</span>
            <button
              onClick={() => navigateTo('learn', topic.id)}
              className="font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer truncate max-w-[140px] sm:max-w-[200px]"
            >
              {topic.title[language]}
            </button>
            <span className="text-slate-300 dark:text-slate-700 shrink-0">/</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
              {language === 'en' ? `Part ${currentModule.order}` : `Bagian ${currentModule.order}`}
            </span>
            <span className="font-bold text-slate-900 dark:text-white truncate min-w-0">
              {currentModule.title[language]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 min-w-0">
        <AnimatePresence mode="wait">
          {/* TAB 1: THEORY & PRINCIPLES */}
          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full min-w-0"
            >
              <TheoryReader
                key={currentModule.id}
                module={currentModule}
                topic={topic}
                language={language}
                onNavigateToQuiz={() => setActiveTab('quiz')}
                onNavigateTo3D={() => setActiveTab('interactive')}
                onOpenGlossary={onOpenGlossary}
              />
            </motion.div>
          )}

          {/* TAB 2: 3D INTERACTIVE LAB */}
          {activeTab === 'interactive' && (
            <motion.div
              key="interactive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full min-w-0 space-y-6"
            >
              {(currentModule.interactiveType === 'orbital-cloud' || currentModule.interactiveType === 'bloch-sphere') && <QuantumOrbitalViewer />}
              {(currentModule.interactiveType === 'double-slit' || currentModule.interactiveType === 'quantum-tunneling') && <DoubleSlitViewer />}
              {(currentModule.interactiveType === 'embryo-timeline' || currentModule.interactiveType === 'ultrasound-scan') && <EmbryoViewer />}
              {currentModule.interactiveType === 'cell-cross-section' && <BatteryCellViewer />}
              {currentModule.interactiveType === 'ev-powertrain' && <EVPowertrainSimulator />}
              {currentModule.interactiveType === 'pulmonary-alveoli' && <PulmonaryAlveoliViewer />}
              {currentModule.interactiveType === 'cardiac-hemodynamics' && <CardiacArrestViewer />}
              {currentModule.interactiveType === 'vascular-hemodynamics' && <HypertensionVascularViewer />}
              {currentModule.interactiveType === 'biome-globe' && <BiomesGlobeViewer />}

              {/* Lab Completion & Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Done with the 3D simulation?' : 'Selesai bereksperimen di lab 3D?'}
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'en'
                      ? 'Revisit theoretical principles or proceed to the checkpoint quiz to test your comprehension.'
                      : 'Tinjau kembali perumusan teori atau lanjutkan ke kuis evaluasi untuk menguji pemahaman Anda.'}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => setActiveTab('theory')}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{t.moduleViewer.tabOverview}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-950" />
                    <span>{t.moduleViewer.tabQuiz}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
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
              className="w-full min-w-0"
            >
              <QuizComponent
                key={currentModule.id}
                module={currentModule}
                topic={topic}
                language={language}
                onOpenGlossary={onOpenGlossary}
                onNavigateToTheory={() => setActiveTab('theory')}
                onNavigateToNextModule={
                  nextModule
                    ? () => {
                        setActiveTab('theory');
                        navigateTo('module', topic.id, nextModule.id);
                      }
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
              className="w-full"
            >
              <StudyNotesWorkspace
                module={currentModule}
                topic={topic}
                language={language}
                note={currentNote}
                onSaveNote={(text) => saveNote(currentModule.id, text)}
                onOpenGlossary={onOpenGlossary}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Module Navigation (below the module, not floating with the user) */}
        <div className="mt-12 pt-6 pb-16 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevModule ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab('theory');
                navigateTo('module', topic.id, prevModule.id);
              }}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-3 transition-all shadow-xs cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                  {t.moduleViewer.prevModule}
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {prevModule.title[language]}
                </div>
              </div>
            </motion.button>
          ) : (
            <div />
          )}

          {nextModule ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab('theory');
                navigateTo('module', topic.id, nextModule.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white text-xs font-bold flex items-center justify-between sm:justify-start gap-3 transition-all shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="text-left sm:text-right min-w-0">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                  {t.moduleViewer.nextModule}
                </div>
                <div className="font-bold truncate">
                  {nextModule.title[language]}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('learn', null)}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>{language === 'en' ? 'Back to Curriculum' : 'Kembali ke Kurikulum'}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
