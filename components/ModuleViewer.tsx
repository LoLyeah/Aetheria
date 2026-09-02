'use client';

import React, { useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { getTopicById, getModuleById, allTopics } from '@/lib/content';
import { QuantumOrbitalViewer } from './3d/QuantumOrbitalViewer';
import { DoubleSlitViewer } from './3d/DoubleSlitViewer';
import { EmbryoViewer } from './3d/EmbryoViewer';
import { BatteryCellViewer } from './3d/BatteryCellViewer';
import { EVPowertrainSimulator } from './simulators/EVPowertrainSimulator';
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
  Award,
  Layers,
  Check,
  X,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';

export const ModuleViewer: React.FC = () => {
  const {
    language,
    selectedTopicId,
    selectedModuleId,
    navigateTo,
    userProgress,
    markModuleComplete,
    toggleBookmark,
    saveNote,
    saveQuizScore,
  } = useLearning();

  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'interactive' | 'theory' | 'quiz' | 'notes'>('interactive');

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const topic = getTopicById(selectedTopicId || 'quantum-mechanics');
  const currentModule = getModuleById(selectedModuleId || 'qm-mod-1')?.module || topic?.modules[0];

  if (!topic || !currentModule) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Module Not Found</h2>
        <button
          onClick={() => navigateTo('learn')}
          className="mt-4 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isCompleted = userProgress.completedModules.includes(currentModule.id);
  const isBookmarked = userProgress.bookmarks.includes(currentModule.id);
  const currentNote = userProgress.notes[currentModule.id] || '';

  // Determine Previous & Next Modules in current topic
  const currentIdx = topic.modules.findIndex((m) => m.id === currentModule.id);
  const prevModule = currentIdx > 0 ? topic.modules[currentIdx - 1] : null;
  const nextModule = currentIdx < topic.modules.length - 1 ? topic.modules[currentIdx + 1] : null;

  const handleQuizOptionSelect = (qId: string, optIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    currentModule.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / currentModule.quiz.length) * 100);
    setQuizScore(percentage);
    setSubmittedQuiz(true);
    saveQuizScore(currentModule.id, percentage);
    if (percentage >= 75) {
      markModuleComplete(currentModule.id);
    }
  };

  const handleQuizReset = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* 1. Header Breadcrumbs & Controls */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs truncate">
            <button
              onClick={() => navigateTo('learn', topic.id)}
              className="flex items-center gap-1 font-semibold text-slate-500 hover:text-sky-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{topic.title[language]}</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-bold text-slate-900 dark:text-white truncate">
              {currentModule.title[language]}
            </span>
          </div>

          {/* Action Buttons: Bookmark & Completion */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => toggleBookmark(currentModule.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Bookmark module"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => markModuleComplete(currentModule.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-slate-900 dark:bg-slate-100 hover:bg-sky-600 dark:hover:bg-sky-600 text-white dark:text-slate-900 hover:text-white dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? (language === 'en' ? 'Completed' : 'Selesai') : t.moduleViewer.markComplete}</span>
            </button>
          </div>
        </div>

        {/* 2. Workspace Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
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
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
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
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
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
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
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

      {/* 3. Main Dynamic Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* TAB 1: 3D INTERACTIVE LAB */}
        {activeTab === 'interactive' && (
          <div className="space-y-6">
            {(currentModule.interactiveType === 'orbital-cloud' || currentModule.interactiveType === 'bloch-sphere') && <QuantumOrbitalViewer />}
            {(currentModule.interactiveType === 'double-slit' || currentModule.interactiveType === 'quantum-tunneling') && <DoubleSlitViewer />}
            {(currentModule.interactiveType === 'embryo-timeline' || currentModule.interactiveType === 'ultrasound-scan') && <EmbryoViewer />}
            {currentModule.interactiveType === 'cell-cross-section' && <BatteryCellViewer />}
            {currentModule.interactiveType === 'ev-powertrain' && <EVPowertrainSimulator />}
          </div>
        )}

        {/* TAB 2: THEORY & PRINCIPLES */}
        {activeTab === 'theory' && (
          <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                <span>{topic.title[language]}</span>
                <span>•</span>
                <span>{currentModule.durationMinutes} min read</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {currentModule.title[language]}
              </h2>
            </div>

            {/* Structured Sections */}
            <div className="space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
              {currentModule.sections.map((sec, idx) => (
                <div key={sec.id} className={idx > 0 ? 'pt-8' : ''}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {sec.title[language]}
                  </h3>
                  <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
                    {sec.content[language]}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Takeaways Callout */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-mono">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{language === 'en' ? 'Core Conceptual Takeaways' : 'Poin Kunci Konseptual'}</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>
                    {language === 'en'
                      ? 'Physical phenomena at this scale require non-linear differential dynamics.'
                      : 'Fenomena fisik pada skala ini memerlukan dinamika diferensial non-linear.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>
                    {language === 'en'
                      ? 'Experimental verification validates the mathematical predictions observed in the 3D lab.'
                      : 'Verifikasi eksperimental memvalidasi prediksi matematis yang diamati pada lab 3D.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: CHECKPOINT QUIZ */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'en' ? 'Checkpoint Knowledge Assessment' : 'Evaluasi Pemahaman Materi'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'en'
                    ? 'Score 75% or higher to automatically certify and complete this module.'
                    : 'Raih skor 75% atau lebih untuk menyelesaikan modul ini secara otomatis.'}
                </p>
              </div>

              {submittedQuiz && quizScore !== null && (
                <div
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                    quizScore >= 75
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  Score: {quizScore}% {quizScore >= 75 ? '✓ Passed' : '✗ Try Again'}
                </div>
              )}
            </div>

            {/* Quiz Questions List */}
            <div className="space-y-6">
              {currentModule.quiz.map((q, qIdx) => {
                const selectedOpt = selectedAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {q.question[language]}
                      </h4>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pt-1 pl-7">
                      {q.options[language].map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400';

                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswerIndex) {
                            optStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isChosen && optIdx !== q.correctAnswerIndex) {
                            optStyle = 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-700 dark:text-rose-300';
                          }
                        } else if (isChosen) {
                          optStyle = 'bg-sky-50 dark:bg-sky-950/70 border-sky-500 text-sky-700 dark:text-sky-300 font-semibold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && optIdx === q.correctAnswerIndex && (
                              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                            {submittedQuiz && isChosen && optIdx !== q.correctAnswerIndex && (
                              <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation Reveal */}
                    {submittedQuiz && (
                      <div className="mt-3 pl-7 pt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                          {q.explanation[language]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleQuizReset}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Reset Answers' : 'Ulangi Kuis'}</span>
              </button>

              {!submittedQuiz ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(selectedAnswers).length < currentModule.quiz.length}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  {language === 'en' ? 'Submit Answers' : 'Kirim Jawaban'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (nextModule) navigateTo('module', topic.id, nextModule.id);
                    else navigateTo('learn');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>{nextModule ? (language === 'en' ? 'Next Module' : 'Modul Berikutnya') : (language === 'en' ? 'Back to Dashboard' : 'Kembali ke Dashboard')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: STUDY NOTES */}
        {activeTab === 'notes' && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
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
          </div>
        )}
      </div>

      {/* 4. Bottom Navigation Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {prevModule ? (
            <button
              onClick={() => navigateTo('module', topic.id, prevModule.id)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevModule.title[language]}</span>
              <span className="sm:hidden">{t.moduleViewer.prevModule}</span>
            </button>
          ) : (
            <div />
          )}

          {nextModule ? (
            <button
              onClick={() => navigateTo('module', topic.id, nextModule.id)}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span className="hidden sm:inline">{nextModule.title[language]}</span>
              <span className="sm:hidden">{t.moduleViewer.nextModule}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('learn')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>{language === 'en' ? 'Back to Dashboard' : 'Selesai & Ke Dashboard'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
