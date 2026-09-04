'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { APP_VERSION_DATA, SEMVER_GUIDELINES } from '@/lib/version';
import { useModalA11y } from '@/hooks/useModalA11y';
import {
  X,
  Tag,
  GitCommit,
  GitBranch,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export const VersionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLearning();
  const [activeTab, setActiveTab] = useState<'semver' | 'changelog' | 'cli'>('semver');
  const modalRef = useRef<HTMLDivElement>(null);

  useModalA11y({ isOpen, onClose, modalRef });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="version-modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-3xl h-[650px] max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col outline-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="version-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'en' ? 'Software Versioning' : 'Versi Perangkat Lunak'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  v{APP_VERSION_DATA.version}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Semantic x.y.z versioning structure & commit push bump protocol.'
                  : 'Struktur versioning semantik x.y.z & protokol otomatisasi komit push.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={language === 'en' ? 'Close version modal' : 'Tutup jendela versi'}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('semver')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'semver'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'en' ? 'Semantic x.y.z Structure' : 'Struktur Semantik x.y.z'}
          </button>

          <button
            onClick={() => setActiveTab('changelog')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'changelog'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Changelog & Releases' : 'Catatan Rilis (Changelog)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cli'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'CLI Automation' : 'Otomatisasi CLI'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <AnimatePresence mode="wait">
            {/* TAB 1: SEMANTIC STRUCTURE EXPLANATION */}
            {activeTab === 'semver' && (
              <motion.div
                key="semver"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Visual Semantic Block Breakdown */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                    {language === 'en' ? 'Current Production Version' : 'Versi Produksi Saat Ini'}
                  </div>
                  <div className="flex items-baseline gap-2 font-mono text-4xl sm:text-5xl font-black">
                    <span className="text-sky-400">v{APP_VERSION_DATA.major}</span>
                    <span className="text-slate-600">.</span>
                    <span className="text-indigo-400">{APP_VERSION_DATA.minor}</span>
                    <span className="text-slate-600">.</span>
                    <span className="text-emerald-400">{APP_VERSION_DATA.patch}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{APP_VERSION_DATA.releaseDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-slate-500" />
                      <span>{APP_VERSION_DATA.buildNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* 3 Pillars of x.y.z */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* x: Major */}
                  <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                        x • MAJOR
                      </span>
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                        {APP_VERSION_DATA.major}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {SEMVER_GUIDELINES.major.title[language]}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {SEMVER_GUIDELINES.major.desc[language]}
                    </p>
                  </div>

                  {/* y: Minor */}
                  <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        y • MINOR
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {APP_VERSION_DATA.minor}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {SEMVER_GUIDELINES.minor.title[language]}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {SEMVER_GUIDELINES.minor.desc[language]}
                    </p>
                  </div>

                  {/* z: Patch */}
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                        z • PATCH
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {APP_VERSION_DATA.patch}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {SEMVER_GUIDELINES.patch.title[language]}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {SEMVER_GUIDELINES.patch.desc[language]}
                    </p>
                  </div>
                </div>

                {/* Automation Notice */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <Sparkles className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-slate-900 dark:text-white block font-mono">
                      {language === 'en' ? 'Automated Commit-Push Hook' : 'Hook Otomatis Komit-Push'}
                    </strong>
                    <p className="leading-relaxed">
                      {language === 'en'
                        ? 'Every git push automatically invokes the patch incrementor to bump z (e.g. 1.0.0 -> 1.0.1) across package.json and the runtime metadata.'
                        : 'Setiap perintah git push secara otomatis memicu incrementor patch untuk menaikkan z (misal 1.0.0 -> 1.0.1) pada package.json dan metadata runtime.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: CHANGELOG */}
            {activeTab === 'changelog' && (
              <motion.div
                key="changelog"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {APP_VERSION_DATA.changelog.map((rel) => (
                  <div
                    key={rel.version}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-black text-slate-900 dark:text-white">
                          v{rel.version}
                        </span>
                        <span
                          className={`px-2 py-0.2 rounded-md text-[10px] font-mono font-bold uppercase ${
                            rel.type === 'major'
                              ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                              : rel.type === 'minor'
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {rel.type}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{rel.date}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {rel.title[language]}
                    </h4>

                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {rel.highlights[language].map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 3: CLI COMMANDS */}
            {activeTab === 'cli' && (
              <motion.div
                key="cli"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {language === 'en' ? 'Manual & CI Version Bumping Commands' : 'Perintah Manual & CI Version Bumping'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'en'
                      ? 'Execute these commands in the terminal or CI/CD pipelines to increment versions safely.'
                      : 'Jalankan perintah ini di terminal atau pipeline CI/CD untuk menaikkan versi secara aman.'}
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Patch command */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-emerald-400 font-bold">
                      # Bump patch version (z) — e.g. 1.0.0 -&gt; 1.0.1 (Commit Push)
                    </div>
                    <code className="text-sky-300 block">npm run version:patch</code>
                  </div>

                  {/* Minor command */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-indigo-400 font-bold">
                      # Bump minor version (y) — e.g. 1.0.1 -&gt; 1.1.0 (New Features/Modules)
                    </div>
                    <code className="text-sky-300 block">npm run version:minor</code>
                  </div>

                  {/* Major command */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-sky-400 font-bold">
                      # Bump major version (x) — e.g. 1.1.0 -&gt; 2.0.0 (Architecture Overhauls)
                    </div>
                    <code className="text-sky-300 block">npm run version:major</code>
                  </div>

                  {/* Setup Git hook */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-amber-400 font-bold">
                      # Install Git Pre-Push Hook for Automatic Version Bumps
                    </div>
                    <code className="text-sky-300 block">npm run version:setup-hooks</code>
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
