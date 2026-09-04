'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LearningModule, Topic, Language } from '@/types/learning';
import { useLearning } from '@/context/LearningContext';
import { MathFormula } from './ui/MathFormula';
import { GlossaryText } from './ui/GlossaryText';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  Clock,
  BookOpen,
  ArrowRight,
  Lightbulb,
  Check,
  X,
  Share2,
  BookmarkCheck,
  Volume2,
  AlertTriangle,
} from 'lucide-react';

export interface QuizComponentProps {
  module: LearningModule;
  topic?: Topic;
  language: Language;
  onComplete?: (score: number, passed: boolean) => void;
  onNavigateToNextModule?: () => void;
  onNavigateToTheory?: () => void;
  onOpenGlossary?: () => void;
  isPostCompletionFlow?: boolean;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  module,
  topic,
  language,
  onComplete,
  onNavigateToNextModule,
  onNavigateToTheory,
  onOpenGlossary,
  isPostCompletionFlow = false,
}) => {
  const {
    userProgress,
    saveQuizScore,
    markModuleComplete,
    settings,
  } = useLearning();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'stepper' | 'review'>('stepper');
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<string[]>([]);
  const [unansweredWarning, setUnansweredWarning] = useState<number | null>(null);

  const questions = module.quiz || [];
  const currentQ = questions[currentQuestionIdx];
  const previousScore = userProgress.quizScores[module.id];
  const attemptsCount = userProgress.quizAttempts[module.id] || 0;

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    if (unansweredWarning !== null) {
      setUnansweredWarning(null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / questions.length) * 100);
    return { correct, percentage };
  };

  const handleSubmitQuiz = () => {
    // Check if any question remains unanswered
    const unansweredIdx = questions.findIndex((q) => selectedAnswers[q.id] === undefined);
    if (unansweredIdx !== -1) {
      setUnansweredWarning(unansweredIdx + 1);
      setCurrentQuestionIdx(unansweredIdx);
      return;
    }
    setUnansweredWarning(null);
    setIsTimerRunning(false);
    const { percentage } = calculateScore();
    const passed = percentage >= 75;
    setQuizScore(percentage);
    setIsSubmitted(true);
    setViewMode('review');

    const previousBadges = [...userProgress.badges];
    saveQuizScore(module.id, percentage);
    if (passed) {
      markModuleComplete(module.id);
    }

    // Determine newly unlocked badges
    setTimeout(() => {
      const currentStored = typeof window !== 'undefined' ? localStorage.getItem('aetheria_user_progress_v1') : null;
      if (currentStored) {
        try {
          const parsed = JSON.parse(currentStored);
          const currentBadges: string[] = parsed.badges || [];
          const freshlyEarned = currentBadges.filter((b) => !previousBadges.includes(b));
          setNewlyUnlockedBadges(freshlyEarned);
        } catch (e) {}
      }
    }, 100);

    if (onComplete) {
      onComplete(percentage, passed);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setQuizScore(null);
    setCurrentQuestionIdx(0);
    setTimeElapsed(0);
    setIsTimerRunning(true);
    setViewMode('stepper');
    setShowHint(false);
    setNewlyUnlockedBadges([]);
    setUnansweredWarning(null);
  };

  const answeredCount = questions.filter((q) => selectedAnswers[q.id] !== undefined).length;
  const isAllAnswered = answeredCount === questions.length && questions.length > 0;
  const isPassed = (quizScore ?? 0) >= 75;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500">
          {language === 'en' ? 'No quiz questions available for this module.' : 'Belum ada soal kuis untuk modul ini.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* 1. Header Banner with Progress & Timer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800">
                {language === 'en' ? 'Checkpoint Assessment' : 'Evaluasi Pemahaman'}
              </span>
              {previousScore !== undefined && (
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {language === 'en' ? `Best: ${previousScore}%` : `Terbaik: ${previousScore}%`} • {attemptsCount} {language === 'en' ? 'attempts' : 'percobaan'}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {module.title[language]}
            </h3>
          </div>

          {/* Timer & Question Counter Pill */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <span>
                {answeredCount} / {questions.length} {language === 'en' ? 'Answered' : 'Terjawab'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
          <motion.div
            className="h-full bg-sky-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 2. Main Question Card / Results View */}
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          /* STEPPER / ACTIVE QUESTION MODE */
          <motion.div
            key={`question-${currentQuestionIdx}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
          >
            {/* Question Header & Stepper Dots */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono text-xs font-bold flex items-center justify-center">
                  {currentQuestionIdx + 1}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {language === 'en' ? `Question ${currentQuestionIdx + 1} of ${questions.length}` : `Pertanyaan ${currentQuestionIdx + 1} dari ${questions.length}`}
                </span>
              </div>

              {/* Step dots */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Questions">
                {questions.map((q, idx) => {
                  const isDone = selectedAnswers[q.id] !== undefined;
                  const isCur = idx === currentQuestionIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIdx(idx);
                        setShowHint(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                        isCur
                          ? 'bg-sky-500 ring-2 ring-sky-300 dark:ring-sky-800 scale-110'
                          : isDone
                          ? 'bg-emerald-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      aria-label={`Question ${idx + 1}: ${isCur ? 'Current' : isDone ? 'Answered' : 'Unanswered'}`}
                      title={`Go to Question ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Question Text */}
            <div className="pt-2">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                <GlossaryText
                  text={currentQ.question[language]}
                  language={language}
                  onOpenFullGlossary={onOpenGlossary}
                />
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options[language].map((optText, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const optionKey = ['A', 'B', 'C', 'D', 'E'][optIdx] || optIdx + 1;

                return (
                  <motion.button
                    key={optIdx}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-100 font-semibold shadow-xs ring-1 ring-sky-400/40'
                        : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {optionKey}
                      </span>
                      <span className="leading-relaxed pt-0.5">
                        <GlossaryText
                          text={optText}
                          language={language}
                          onOpenFullGlossary={onOpenGlossary}
                        />
                      </span>
                    </div>

                    <div className="flex items-center mt-1">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Hint Reveal Drawer */}
            <div className="pt-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{showHint ? (language === 'en' ? 'Hide Concept Clue' : 'Sembunyikan Petunjuk') : (language === 'en' ? 'Need a Concept Clue?' : 'Butuh Petunjuk Konsep?')}</span>
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 overflow-hidden"
                  >
                    <p className="leading-relaxed">
                      💡 {language === 'en'
                        ? `Focus on the underlying physical law: ${module.sections[0]?.title[language] || 'Module Theory principles'}.`
                        : `Fokus pada prinsip fisika dasar: ${module.sections[0]?.title[language] || 'Prinsip teori modul'}.`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation & Submit Bar */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (currentQuestionIdx > 0) {
                    setCurrentQuestionIdx((prev) => prev - 1);
                    setShowHint(false);
                  }
                }}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'en' ? 'Previous' : 'Sebelumnya'}</span>
              </button>

              <div className="flex items-center gap-2">
                {unansweredWarning !== null && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-200 text-xs font-semibold animate-fadeIn">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? `Please answer question ${unansweredWarning} before submitting.`
                        : `Harap jawab pertanyaan ${unansweredWarning} sebelum mengirim.`}
                    </span>
                  </div>
                )}
                {currentQuestionIdx < questions.length - 1 ? (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentQuestionIdx((prev) => prev + 1);
                      setShowHint(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Next Question' : 'Pertanyaan Berikutnya'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitQuiz}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all ${
                      isAllAnswered
                        ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 ring-2 ring-sky-300 dark:ring-sky-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? 'Submit Assessment' : 'Kirim Jawaban Evaluasi'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* RESULTS & PEDAGOGICAL BREAKDOWN VIEW */
          <motion.div
            key="results-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Scorecard Hero */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border text-center space-y-4 shadow-sm ${
                isPassed
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-sm mx-auto">
                {isPassed ? (
                  <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                ) : (
                  <XCircle className="w-9 h-9 text-rose-500" />
                )}
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                  {isPassed
                    ? (language === 'en' ? 'Checkpoint Mastered' : 'Pemahaman Terverifikasi')
                    : (language === 'en' ? 'Review Recommended' : 'Perlu Pengulangan')}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-mono mt-1">
                  {quizScore}%
                </h3>
                <p className="text-xs sm:text-sm mt-2 max-w-md mx-auto opacity-90 leading-relaxed">
                  {isPassed
                    ? (language === 'en'
                      ? 'Outstanding work! You demonstrated solid theoretical grasp and your progress stats have been certified.'
                      : 'Luar biasa! Anda menunjukkan pemahaman teori yang solid dan progres modul Anda telah diperbarui.')
                    : (language === 'en'
                      ? 'You scored below the 75% threshold. Review the explanations below or retake the assessment to solidify your understanding.'
                      : 'Skor Anda di bawah ambang batas 75%. Tinjau penjelasan di bawah atau ulangi kuis untuk memperdalam konsep.')}
                </p>
              </div>

              {/* Stat Chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <div className="px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-mono font-bold">
                  {answeredCount} / {questions.length} {language === 'en' ? 'Correct' : 'Benar'}
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-mono font-bold">
                  {formatTime(timeElapsed)} {language === 'en' ? 'Duration' : 'Durasi'}
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-mono font-bold">
                  {isPassed ? (language === 'en' ? 'Status: Passed' : 'Status: Lulus') : (language === 'en' ? 'Status: Pending' : 'Status: Mengulang')}
                </div>
              </div>

              {/* Badge Unlock Celebration Banner if new badges unlocked */}
              {newlyUnlockedBadges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 flex items-center justify-center gap-3"
                >
                  <Award className="w-6 h-6 text-amber-500 drop-shadow-xs flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-bold font-mono">
                      🎉 {language === 'en' ? 'New Achievement Unlocked!' : 'Lencana Baru Terbuka!'}
                    </div>
                    <div className="text-[11px] opacity-90">
                      {language === 'en'
                        ? 'Your digital certificate and achievement collection have been updated.'
                        : 'Sertifikat digital dan koleksi lencana Anda telah diperbarui.'}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Detailed Question Review List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                {language === 'en' ? 'Pedagogical Analysis & Answer Breakdown' : 'Analisis Jawaban & Penjelasan Ilmiah'}
              </h4>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const studentAnswer = selectedAnswers[q.id];
                  const isCorrect = studentAnswer === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border space-y-3 ${
                        isCorrect
                          ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200/80 dark:border-emerald-900/40'
                          : 'bg-rose-50/30 dark:bg-rose-950/10 border-rose-200/80 dark:border-rose-900/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span
                            className={`w-5 h-5 rounded-md font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isCorrect
                                ? 'bg-emerald-500 text-white'
                                : 'bg-rose-500 text-white'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {q.question[language]}
                          </span>
                        </div>

                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                            <Check className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400 flex-shrink-0">
                            <X className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>

                      {/* Options breakdown */}
                      <div className="space-y-1.5 pl-7 text-xs">
                        {q.options[language].map((opt, oIdx) => {
                          const isPicked = studentAnswer === oIdx;
                          const isRight = oIdx === q.correctAnswerIndex;

                          let style = 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400';
                          if (isRight) {
                            style = 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (isPicked && !isRight) {
                            style = 'bg-rose-100/70 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200 line-through';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-lg border flex items-center justify-between ${style}`}
                            >
                              <span>{opt}</span>
                              {isRight && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                              {isPicked && !isRight && <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Scientific Explanation */}
                      <div className="pl-7 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 dark:text-white">
                            {language === 'en' ? 'Scientific Explanation: ' : 'Penjelasan Ilmiah: '}
                          </strong>
                          <span>{q.explanation[language]}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'en' ? 'Retake Assessment' : 'Ulangi Kuis'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {onNavigateToTheory && (
                    <button
                      onClick={onNavigateToTheory}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{language === 'en' ? 'Review Theory' : 'Baca Teori'}</span>
                    </button>
                  )}

                  {onNavigateToNextModule && (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={onNavigateToNextModule}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Next Module' : 'Modul Berikutnya'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
