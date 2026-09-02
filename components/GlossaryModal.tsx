'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY_TERMS, GlossaryCategory, GlossaryTermData } from '@/lib/glossaryData';
import { Language } from '@/types/learning';
import { MathFormula } from './ui/MathFormula';
import {
  Search,
  Atom,
  Dna,
  Zap,
  BookOpen,
  Volume2,
  X,
  Sparkles,
  FlaskConical,
  Filter,
} from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTermData | null>(null);

  if (!isOpen) return null;

  const categories: Array<{ id: GlossaryCategory | 'all'; label: { en: string; id: string }; icon: any }> = [
    { id: 'all', label: { en: 'All Disciplines', id: 'Semua Disiplin' }, icon: BookOpen },
    { id: 'quantum', label: { en: 'Quantum Physics', id: 'Fisika Kuantum' }, icon: Atom },
    { id: 'biology', label: { en: 'Embryology', id: 'Embriologi' }, icon: Dna },
    { id: 'ev-battery', label: { en: 'EV Battery Tech', id: 'Baterai EV' }, icon: Zap },
  ];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName =
      term.term.en.toLowerCase().includes(query) ||
      term.term.id.toLowerCase().includes(query) ||
      term.aliases?.en.some((a) => a.toLowerCase().includes(query)) ||
      term.aliases?.id.some((a) => a.toLowerCase().includes(query));

    const matchesDef =
      term.definition.en.toLowerCase().includes(query) ||
      term.definition.id.toLowerCase().includes(query);

    return matchesCategory && (matchesName || matchesDef);
  });

  const speakTerm = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'id' ? 'id-ID' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'en' ? 'Scientific Terminology Lexicon' : 'Glosarium Terminologi Ilmiah'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'en'
                    ? 'Authoritative non-AI definitions, mathematical formulations, and laboratory contexts'
                    : 'Definisi ilmiah otoritatif, formulasi matematis, dan konteks aplikasi laboratorium'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={
                  language === 'en'
                    ? 'Search terms (e.g. Wavefunction, Blastocyst, 4680, SEI)...'
                    : 'Cari istilah (contoh: Fungsi Gelombang, Gastrulasi, C-Rate)...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{c.label[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body: Terms List & Detail View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((term) => (
                <div
                  key={term.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {term.term[language]}
                          </h4>
                          <button
                            onClick={() => speakTerm(term.term[language])}
                            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-0.5"
                            title={language === 'en' ? 'Pronounce' : 'Dengarkan'}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {language === 'id' && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            EN: {term.term.en}
                          </span>
                        )}
                      </div>

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {term.category}
                      </span>
                    </div>

                    {term.symbol && (
                      <div className="py-1 px-2.5 rounded-lg bg-slate-950 text-cyan-300 font-serif text-xs border border-slate-800 inline-block">
                        <MathFormula formula={term.symbol} displayMode={false} />
                      </div>
                    )}

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {term.definition[language]}
                    </p>
                  </div>

                  {term.context && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      <strong className="text-slate-700 dark:text-slate-300 font-semibold">
                        {language === 'en' ? 'Lab Context: ' : 'Aplikasi Lab: '}
                      </strong>
                      {term.context[language]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredTerms.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-xs">
                {language === 'en'
                  ? 'No scientific terms matched your search.'
                  : 'Tidak ada istilah ilmiah yang cocok dengan pencarian Anda.'}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              {filteredTerms.length} {language === 'en' ? 'Terms Indexed' : 'Istilah Terindeks'}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer hover:opacity-90"
            >
              {language === 'en' ? 'Done' : 'Selesai'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
