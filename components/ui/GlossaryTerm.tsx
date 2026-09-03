'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GlossaryTermData } from '@/lib/glossaryData';
import { Language } from '@/types/learning';
import { useLearning } from '@/context/LearningContext';
import { MathFormula } from './MathFormula';
import {
  Atom,
  Dna,
  Zap,
  Activity,
  HeartCrack,
  Gauge,
  BookOpen,
  Volume2,
  X,
  ExternalLink,
} from 'lucide-react';

interface GlossaryTermProps {
  termData: GlossaryTermData;
  displayedText: string;
  language: Language;
  onOpenFullGlossary?: () => void;
}

interface PopoverCoords {
  top?: number;
  bottom?: number;
  left: number;
  arrowLeft: number;
  placement: 'top' | 'bottom';
}

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  termData,
  displayedText,
  language,
  onOpenFullGlossary,
}) => {
  const { settings } = useLearning();
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
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
    pulmonology: {
      label: { en: 'Pulmonology & Medicine', id: 'Pulmonologi & Kedokteran' },
      badgeBg: 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      icon: Activity,
      accentBorder: 'border-rose-500/30',
    },
    cardiology: {
      label: { en: 'Cardiology & Emergency', id: 'Kardiologi & Kegawatdaruratan' },
      badgeBg: 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
      icon: HeartCrack,
      accentBorder: 'border-red-500/30',
    },
    hypertension: {
      label: { en: 'Hypertension & Hemodynamics', id: 'Hipertensi & Hemodinamika' },
      badgeBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      icon: Gauge,
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

  const updateCoordinates = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const popoverWidth = Math.min(320, window.innerWidth - 32);
    const estimatedHeight = 220;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    
    // Choose placement: top if space allows, otherwise bottom
    const placement: 'top' | 'bottom' = spaceAbove >= estimatedHeight + 16 || spaceAbove > spaceBelow ? 'top' : 'bottom';

    const targetCenterX = rect.left + rect.width / 2;
    let left = targetCenterX - popoverWidth / 2;
    const minLeft = 16;
    const maxLeft = window.innerWidth - popoverWidth - 16;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    const arrowLeft = Math.max(16, Math.min(popoverWidth - 16, targetCenterX - left));

    if (placement === 'top') {
      const bottom = window.innerHeight - rect.top + 8;
      setCoords({ bottom, left, arrowLeft, placement });
    } else {
      const top = rect.bottom + 8;
      setCoords({ top, left, arrowLeft, placement });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateCoordinates();
      const handleScrollOrResize = () => updateCoordinates();
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    }
  }, [isOpen, updateCoordinates]);

  // Handle outside clicks to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
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
    updateCoordinates();
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
    if (!isOpen) {
      updateCoordinates();
    }
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
    <>
      <span
        ref={containerRef}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`inline text-inherit font-inherit text-left p-0 m-0 ${highlightStyle}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {displayedText}
      </span>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && coords && (
              <motion.div
                ref={popoverRef}
                initial={{
                  opacity: 0,
                  y: coords.placement === 'top' ? 6 : -6,
                  scale: 0.97,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: coords.placement === 'top' ? 4 : -4,
                  scale: 0.97,
                }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  top: coords.top !== undefined ? `${coords.top}px` : 'auto',
                  bottom: coords.bottom !== undefined ? `${coords.bottom}px` : 'auto',
                  left: `${coords.left}px`,
                  width: 'min(320px, calc(100vw - 32px))',
                }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-[9999] text-slate-900 dark:text-slate-100 text-left font-sans cursor-default pointer-events-auto select-text"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Popover Arrow */}
                <div
                  style={{ left: `${coords.arrowLeft}px` }}
                  className={`absolute w-3 h-3 rotate-45 bg-white dark:bg-slate-900 pointer-events-none ${
                    coords.placement === 'top'
                      ? 'top-full -translate-x-1/2 -mt-1.5 border-r border-b border-slate-200 dark:border-slate-800'
                      : 'bottom-full -translate-x-1/2 -mb-1.5 border-l border-t border-slate-200 dark:border-slate-800'
                  }`}
                />

                {/* Header: Category & Close */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${cat.badgeBg}`}
                  >
                    <CategoryIcon className="w-3 h-3" />
                    <span>{cat.label[language]}</span>
                  </span>

                  <div className="flex items-center gap-1">
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
                  </div>
                </div>

                {/* Title & Mathematical Symbol */}
                <div className="pt-2.5 pb-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      {termData.term[language]}
                    </h4>
                    {termData.pronunciation && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {termData.pronunciation}
                      </span>
                    )}
                  </div>

                  {termData.symbol && (
                    <div className="py-1 px-2 rounded-lg bg-slate-950 text-cyan-300 text-xs font-serif inline-block border border-slate-800">
                      <MathFormula formula={termData.symbol} displayMode={false} />
                    </div>
                  )}
                </div>

                {/* Non-AI Clear Scientific Definition */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 pb-2">
                  {termData.definition[language]}
                </p>

                {/* Real Lab & Clinical Context Callout */}
                {termData.context && (
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                    <span className="font-bold text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 block">
                      {language === 'en' ? 'Laboratory Application' : 'Penerapan Laboratorium'}
                    </span>
                    <p className="leading-snug">{termData.context[language]}</p>
                  </div>
                )}

                {/* Footer CTA */}
                {onOpenFullGlossary && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
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
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

