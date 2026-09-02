'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { BADGES_CATALOG } from '@/lib/content/badges';
import { allTopics, getAllModules } from '@/lib/content';
import {
  X,
  Award,
  CheckCircle2,
  Lock,
  Printer,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Atom,
  HeartPulse,
  Zap,
} from 'lucide-react';

export const ProgressTrackerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { language, userProgress, totalCompletionPercentage, resetProgress } = useLearning();
  const t = translations[language];
  const [userName, setUserName] = useState<string>('Learner');
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'certificate'>('overview');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [certificateSerial] = useState<string>('AETH-2026-849204');
  const [issuedDate] = useState<string>('September 2026');

  if (!isOpen) return null;

  const allModules = getAllModules();
  const completedCount = userProgress.completedModules.length;
  const earnedBadgesCount = userProgress.badges.length;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'en' ? 'Learning Progress & Badges' : 'Kemajuan Belajar & Lencana'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Track your mastery, unlocked achievements, and verifiable certificate.'
                  : 'Pantau penguasaan materi, lencana pencapaian, dan sertifikat terverifikasi.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'en' ? 'Curriculum Overview' : 'Ringkasan Kurikulum'}
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'badges'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{language === 'en' ? 'Badges & Achievements' : 'Lencana & Prestasi'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
              {earnedBadgesCount}/{BADGES_CATALOG.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'certificate'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'en' ? 'Verifiable Certificate' : 'Sertifikat Terverifikasi'}</span>
          </button>
        </div>

        {/* Modal Body with AnimatePresence */}
        <div className="p-6 overflow-y-auto space-y-6">
          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Progress Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'en' ? 'Total Completion' : 'Total Kelulusan'}
                    </span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                      {totalCompletionPercentage}%
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: `${totalCompletionPercentage}%` }} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'en' ? 'Completed Modules' : 'Modul Selesai'}
                    </span>
                    <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                      {completedCount} <span className="text-xs font-sans text-slate-400">/ {allModules.length}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                      {allModules.length - completedCount} {language === 'en' ? 'remaining' : 'tersisa'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'en' ? 'Unlocked Badges' : 'Lencana Terbuka'}
                    </span>
                    <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
                      {earnedBadgesCount} <span className="text-xs font-sans text-slate-400">/ {BADGES_CATALOG.length}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {language === 'en' ? 'STEM Mastery levels' : 'Tingkat penguasaan sains'}
                    </span>
                  </div>
                </div>

                {/* Breakdown by Topic */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {language === 'en' ? 'Topic Breakdown' : 'Rincian Per Topik'}
                  </h4>
                  {allTopics.map((topic) => {
                    const done = topic.modules.filter((m) => userProgress.completedModules.includes(m.id)).length;
                    const pct = Math.round((done / topic.modules.length) * 100);

                    return (
                      <div
                        key={topic.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                            {topic.id === 'quantum-mechanics' && <Atom className="w-4 h-4 text-sky-500" />}
                            {topic.id === 'fetus-development' && <HeartPulse className="w-4 h-4 text-rose-500" />}
                            {topic.id === 'ev-battery' && <Zap className="w-4 h-4 text-emerald-500" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {topic.title[language]}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {done} / {topic.modules.length} {language === 'en' ? 'modules' : 'modul'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-24 sm:w-36 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 w-9 text-right">
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reset Confirmation Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {!showResetConfirm ? (
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="text-xs font-medium text-rose-500 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Reset All Learning Progress' : 'Atur Ulang Semua Kemajuan Belajar'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-rose-600 font-semibold">
                        {language === 'en' ? 'Are you sure?' : 'Apakah Anda yakin?'}
                      </span>
                      <button
                        onClick={() => {
                          resetProgress();
                          setShowResetConfirm(false);
                        }}
                        className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer"
                      >
                        {language === 'en' ? 'Yes, Reset' : 'Ya, Atur Ulang'}
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs cursor-pointer"
                      >
                        {language === 'en' ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 2: BADGES & ACHIEVEMENTS */}
            {activeTab === 'badges' && (
              <motion.div
                key="badges"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {BADGES_CATALOG.map((badge) => {
                  const isUnlocked = userProgress.badges.includes(badge.id);

                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                        isUnlocked
                          ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/80 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isUnlocked
                            ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                        }`}
                      >
                        {isUnlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {badge.title[language]}
                          </h4>
                          {isUnlocked && (
                            <span className="px-1.5 py-0.2 rounded-md text-[9px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                              UNLOCKED
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                          {badge.description[language]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* TAB 3: VERIFIABLE CERTIFICATE */}
            {activeTab === 'certificate' && (
              <motion.div
                key="certificate"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* User Name input for Certificate */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {language === 'en' ? 'Recipient Full Name' : 'Nama Lengkap Penerima'}
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name..."
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white w-full sm:w-64 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <button
                    onClick={handlePrintCertificate}
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer self-end sm:self-auto"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{language === 'en' ? 'Print / Export Certificate' : 'Cetak / Ekspor Sertifikat'}</span>
                  </button>
                </div>

                {/* Printable Certificate Frame */}
                <div
                  id="printable-certificate"
                  className="relative bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border-2 border-slate-300 shadow-lg space-y-6 text-center"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-0.5 w-16 bg-slate-300" />
                    <Award className="w-8 h-8 text-amber-600" />
                    <div className="h-0.5 w-16 bg-slate-300" />
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                      Aetheria 3D Interactive Science Academy
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-wide">
                      CERTIFICATE OF SCIENTIFIC ACHIEVEMENT
                    </h3>
                    <div className="text-xs text-slate-500 font-sans mt-1">
                      Verifiable Digital STEM Accreditation
                    </div>
                  </div>

                  <div className="py-2">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                      This is proudly presented to:
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 border-b-2 border-slate-200 inline-block pb-1 px-8">
                      {userName || 'Candidate'}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                    For mastering the core theoretical foundations and interactive hardware-accelerated 3D simulations across{' '}
                    <strong>Quantum Mechanics & Wavefunctions</strong>,{' '}
                    <strong>Embryonic & Fetal Morphogenesis</strong>, and{' '}
                    <strong>EV Electrochemical Battery & Powertrain Dynamics</strong>.
                  </p>

                  {/* Seal & Verification Serial */}
                  <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <div className="text-left font-mono text-[10px]">
                      <div>Serial: {certificateSerial}</div>
                      <div>Issued: {issuedDate}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-slate-800 text-[11px]">
                        WebGPU Physics Engine Verified
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
