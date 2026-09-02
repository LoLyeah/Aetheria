'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlossaryTermData } from '@/lib/glossaryData';
import { Language } from '@/types/learning';
import { useLearning } from '@/context/LearningContext';
import { MathFormula } from './MathFormula';
import {
  Atom,
  Dna,
  Zap,
  BookOpen,
  Volume2,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface GlossaryTermProps {
  termData: GlossaryTermData;
  displayedText: string;
  language: Language;
  onOpenFullGlossary?: () => void;
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  termData,
  displayedText,
  language,
  onOpenFullGlossary,
}) => {
  const { settings } = useLearning();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categoryConfigs = {
    quantum: {
      label: { en: 'Quantum Physics', id: 'Fisika Kuantum' },
      badgeBg: 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      icon: Atom,
      accentBorder: 'border-sky-500/30',
    },
    biology: {
      label: { en: 'Embryology & Biology', id: 'Embriologi & Biologi' },
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      icon: Dna,
      accentBorder: 'border-emerald-500/30',
    },
    'ev-battery': {
      label: { en: 'EV Battery & Powertrain', id: 'Baterai EV & Powertrain' },
      badgeBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      icon: Zap,
      accentBorder: 'border-amber-500/30',
    },
    general: {
      label: { en: 'Scientific Principle', id: 'Prinsip Ilmiah' },
      badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
      icon: BookOpen,
      accentBorder: 'border-slate-500/30',
    },
  };

  const cat = categoryConfigs[termData.category] || categoryConfigs.general;
  const CategoryIcon = cat.icon;

  // Handle outside clicks to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (settings?.glossaryTrigger === 'click') return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (settings?.glossaryTrigger === 'click') return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const speakTerm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(termData.term[language]);
      utterance.lang = language === 'id' ? 'id-ID' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const highlightStyle =
    settings?.glossaryHighlighting === 'disabled'
      ? ''
      : settings?.glossaryHighlighting === 'subtle'
      ? 'border-b border-dotted border-slate-400 dark:border-slate-600 hover:text-sky-600 dark:hover:text-sky-400 cursor-help transition-colors'
      : 'border-b-2 border-sky-400/60 dark:border-sky-500/60 hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 font-medium cursor-help transition-all bg-sky-50/40 dark:bg-sky-950/20 px-0.5 rounded-xs';

  if (settings?.glossaryHighlighting === 'disabled') {
    return <span>{displayedText}</span>;
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      <button
        type="button"
        onClick={handleClick}
        className={`inline text-inherit font-inherit text-left p-0 m-0 ${highlightStyle}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {displayedText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 text-slate-900 dark:text-slate-100 text-left font-sans cursor-default pointer-events-auto select-text block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Popover Arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 rotate-45 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-800 block" />

            {/* Header: Category & Close */}
            <span className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${cat.badgeBg}`}
              >
                <CategoryIcon className="w-3 h-3" />
                <span>{cat.label[language]}</span>
              </span>

              <span className="flex items-center gap-1">
                {settings?.speechAudioEnabled !== false && (
                  <button
                    onClick={speakTerm}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={language === 'en' ? 'Listen to pronunciation' : 'Dengarkan pengucapan'}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close popover"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            </span>

            {/* Title & Mathematical Symbol */}
            <span className="pt-2.5 pb-1 space-y-1 block">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight block">
                  {termData.term[language]}
                </span>
                {termData.pronunciation && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {termData.pronunciation}
                  </span>
                )}
              </span>

              {termData.symbol && (
                <span className="py-1 px-2 rounded-lg bg-slate-950 text-cyan-300 text-xs font-serif inline-block border border-slate-800">
                  <MathFormula formula={termData.symbol} displayMode={false} />
                </span>
              )}
            </span>

            {/* Non-AI Clear Scientific Definition */}
            <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 pb-2 block">
              {termData.definition[language]}
            </span>

            {/* Real Lab & Clinical Context Callout */}
            {termData.context && (
              <span className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5 block">
                <span className="font-bold text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 block">
                  {language === 'en' ? 'Laboratory Application' : 'Penerapan Laboratorium'}
                </span>
                <span className="leading-snug block">{termData.context[language]}</span>
              </span>
            )}

            {/* Footer CTA */}
            {onOpenFullGlossary && (
              <span className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{language === 'en' ? 'Scientific Terminology' : 'Terminologi Ilmiah'}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    onOpenFullGlossary();
                  }}
                  className="text-sky-600 dark:text-sky-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Open Lexicon' : 'Buka Glosarium'}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
