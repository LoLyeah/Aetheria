'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LearningModule, Topic, Language } from '@/types/learning';
import { MathFormula } from './ui/MathFormula';
import { GlossaryText } from './ui/GlossaryText';
import { useLearning } from '@/context/LearningContext';
import {
  BookOpen,
  Clock,
  Award,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Table as TableIcon,
  Cpu,
  Layers,
  FlaskConical,
  ChevronRight,
  Hash,
  FileText,
  Type,
} from 'lucide-react';

interface TheoryReaderProps {
  module: LearningModule;
  topic: Topic;
  language: Language;
  onNavigateToQuiz: () => void;
  onNavigateTo3D: () => void;
  onOpenGlossary?: () => void;
}

export const TheoryReader: React.FC<TheoryReaderProps> = ({
  module,
  topic,
  language,
  onNavigateToQuiz,
  onNavigateTo3D,
  onOpenGlossary,
}) => {
  const { settings } = useLearning();
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>(settings?.readerFontSize || 'base');
  const [activeSectionId, setActiveSectionId] = useState<string>(module.sections[0]?.id || '');

  const fontSizeClasses = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Chapter Editorial Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
            <span className="px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300">
              {topic.title[language]}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {language === 'en' ? `Part ${module.order}` : `Bagian ${module.order}`}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {module.durationMinutes} min read
            </span>
          </div>

          {/* Reading Controls & Glossary Button */}
          <div className="flex items-center gap-2">
            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold transition-colors cursor-pointer"
                title={language === 'en' ? 'Open Scientific Lexicon Glossary' : 'Buka Glosarium Istilah Ilmiah'}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Glossary' : 'Glosarium'}</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">
              <Type className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs text-slate-900 dark:text-white' : 'text-slate-500'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs text-slate-900 dark:text-white' : 'text-slate-500'}`}
                title="Standard text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs text-slate-900 dark:text-white' : 'text-slate-500'}`}
                title="Large text"
              >
                A+
              </button>
            </div>
          </div>
        </div>

        <div className="pt-5 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {module.title[language]}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <GlossaryText
              text={module.shortDescription[language]}
              language={language}
              onOpenFullGlossary={onOpenGlossary}
            />
          </p>
        </div>

        {/* Section Quick Jump Navigator */}
        {module.sections.length > 1 && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              {language === 'en' ? 'Section Outline' : 'Daftar Pembahasan'}
            </span>
            <div className="flex flex-wrap gap-2">
              {module.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSectionId === sec.id
                      ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">§{idx + 1}</span>
                  <span className="truncate max-w-[200px]">{sec.title[language].replace(/^\d+\.\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Structured Sections Body */}
      <div className="space-y-10">
        {module.sections.map((sec, secIdx) => (
          <article
            key={sec.id}
            id={sec.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs scroll-mt-28 space-y-6"
          >
            {/* Section Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-mono text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                {secIdx + 1}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {sec.title[language]}
                </h2>
              </div>
            </div>

            {/* Main Narrative Prose with Glossary Highlighting */}
            <div className={`text-slate-700 dark:text-slate-300 space-y-4 ${fontSizeClasses[fontSize]}`}>
              {sec.content[language].split('\n\n').map((paragraph, pIdx) => {
                const lines = paragraph.split('\n');

                // Check if any line in this paragraph block has list markers
                const hasListItems = lines.some((l) => /^\s*(?:[•\-\*]|\d+[\.\)])\s+/.test(l));

                if (!hasListItems) {
                  return (
                    <p key={pIdx} className="leading-relaxed">
                      <GlossaryText
                        text={paragraph}
                        language={language}
                        onOpenFullGlossary={onOpenGlossary}
                      />
                    </p>
                  );
                }

                // Group consecutive lines into blocks (prose, numbered, or bullet)
                const groups: Array<{
                  type: 'text' | 'bullet' | 'numbered';
                  items: Array<{ text: string; num?: string }>;
                }> = [];

                for (const rawLine of lines) {
                  const line = rawLine.trim();
                  if (!line) continue;

                  const numMatch = line.match(/^(\d+)[\.\)]\s+(.*)$/);
                  const bulletMatch = line.match(/^[•\-\*]\s+(.*)$/);

                  if (numMatch) {
                    const last = groups[groups.length - 1];
                    if (last && last.type === 'numbered') {
                      last.items.push({ text: numMatch[2], num: numMatch[1] });
                    } else {
                      groups.push({
                        type: 'numbered',
                        items: [{ text: numMatch[2], num: numMatch[1] }],
                      });
                    }
                  } else if (bulletMatch) {
                    const last = groups[groups.length - 1];
                    if (last && last.type === 'bullet') {
                      last.items.push({ text: bulletMatch[1] });
                    } else {
                      groups.push({
                        type: 'bullet',
                        items: [{ text: bulletMatch[1] }],
                      });
                    }
                  } else {
                    const last = groups[groups.length - 1];
                    if (last && last.type === 'text') {
                      last.items.push({ text: line });
                    } else {
                      groups.push({
                        type: 'text',
                        items: [{ text: line }],
                      });
                    }
                  }
                }

                return (
                  <div key={pIdx} className="space-y-3">
                    {groups.map((grp, gIdx) => {
                      if (grp.type === 'numbered') {
                        return (
                          <ol key={gIdx} className="space-y-2.5 my-3 pl-0.5">
                            {grp.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3">
                                <span className="w-5 h-5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-sky-200/90 dark:border-sky-800/80 shadow-2xs">
                                  {item.num || itemIdx + 1}
                                </span>
                                <span className="flex-1 leading-relaxed">
                                  <GlossaryText
                                    text={item.text}
                                    language={language}
                                    onOpenFullGlossary={onOpenGlossary}
                                  />
                                </span>
                              </li>
                            ))}
                          </ol>
                        );
                      }

                      if (grp.type === 'bullet') {
                        return (
                          <ul key={gIdx} className="space-y-2 my-3 pl-2">
                            {grp.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                                <span className="flex-1 leading-relaxed">
                                  <GlossaryText
                                    text={item.text}
                                    language={language}
                                    onOpenFullGlossary={onOpenGlossary}
                                  />
                                </span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <div key={gIdx} className="space-y-2">
                          {grp.items.map((item, itemIdx) => (
                            <p key={itemIdx} className="leading-relaxed">
                              <GlossaryText
                                text={item.text}
                                language={language}
                                onOpenFullGlossary={onOpenGlossary}
                              />
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Scientific Formula & Variable Explorer */}
            {sec.formula && (
              <div className="my-6 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                    <FlaskConical className="w-4 h-4" />
                    <span>{language === 'en' ? 'Governing Physical Formulation' : 'Formulasi Fisika Utama'}</span>
                  </div>
                </div>

                {/* KaTeX Math Formula Display */}
                <div className="py-2 text-cyan-300 font-serif text-lg sm:text-xl">
                  <MathFormula formula={sec.formula} displayMode={true} />
                </div>

                {sec.formulaExplanation && (
                  <p className="text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                    <strong className="text-slate-100 font-semibold">{language === 'en' ? 'Physical Meaning: ' : 'Makna Fisik: '}</strong>
                    <GlossaryText
                      text={sec.formulaExplanation[language]}
                      language={language}
                      onOpenFullGlossary={onOpenGlossary}
                    />
                  </p>
                )}

                {/* Formula Variables Table */}
                {sec.variables && sec.variables.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                      {language === 'en' ? 'Variable & Constant Breakdown' : 'Rincian Variabel & Konstanta'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {sec.variables.map((v, vIdx) => (
                        <div
                          key={vIdx}
                          className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5"
                        >
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-bold text-xs">
                            {v.symbol}
                          </span>
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                              <span>{v.name[language]}</span>
                              {v.unit && <span className="text-[10px] text-slate-400 font-mono">[{v.unit}]</span>}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug">
                              <GlossaryText
                                text={v.description[language]}
                                language={language}
                                onOpenFullGlossary={onOpenGlossary}
                              />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step-by-Step Derivation Breakdown */}
            {sec.derivationSteps && sec.derivationSteps.length > 0 && (
              <div className="my-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Layers className="w-4 h-4" />
                  <span>{language === 'en' ? 'Mathematical Derivation & Analytical Steps' : 'Langkah Penurunan Matematis & Analitis'}</span>
                </div>

                <div className="space-y-3.5">
                  {sec.derivationSteps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] flex items-center justify-center font-bold">
                          {stepIdx + 1}
                        </span>
                        <span>{step.title[language]}</span>
                      </div>

                      {step.math && (
                        <div className="my-1.5 py-1 px-3 bg-slate-50 dark:bg-slate-950 rounded-lg font-serif text-slate-900 dark:text-cyan-300 text-sm overflow-x-auto">
                          <MathFormula formula={step.math} displayMode={true} />
                        </div>
                      )}

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                        <GlossaryText
                          text={step.explanation[language]}
                          language={language}
                          onOpenFullGlossary={onOpenGlossary}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comparative & Structured Data Table */}
            {sec.comparisonTable && (
              <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                  <TableIcon className="w-4 h-4 text-sky-500" />
                  <span>{language === 'en' ? 'Structured Comparison & Properties Table' : 'Tabel Perbandingan Terstruktur'}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        {sec.comparisonTable.headers[language].map((head, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 whitespace-nowrap">
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {sec.comparisonTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          {row[language].map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-3 ${cIdx === 0 ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}
                            >
                              <GlossaryText
                                text={cell}
                                language={language}
                                onOpenFullGlossary={onOpenGlossary}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Real-World Engineering / Clinical Application Case Study */}
            {sec.caseStudy && (
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <Cpu className="w-4 h-4" />
                  <span>{language === 'en' ? 'Applied Science & Engineering Case Study' : 'Studi Kasus Sains & Rekayasa Terapan'}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {sec.caseStudy.title[language]}
                </h4>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {language === 'en' ? 'Context & Problem: ' : 'Konteks & Masalah: '}
                    </strong>
                    <GlossaryText
                      text={sec.caseStudy.context[language]}
                      language={language}
                      onOpenFullGlossary={onOpenGlossary}
                    />
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white font-semibold">
                      {language === 'en' ? 'Scientific Analysis: ' : 'Analisis Ilmiah: '}
                    </strong>
                    <GlossaryText
                      text={sec.caseStudy.analysis[language]}
                      language={language}
                      onOpenFullGlossary={onOpenGlossary}
                    />
                  </p>
                  <p className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/80 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 font-medium">
                    <strong>{language === 'en' ? 'Engineering Takeaway: ' : 'Kesimpulan Rekayasa: '}</strong>
                    <GlossaryText
                      text={sec.caseStudy.takeaway[language]}
                      language={language}
                      onOpenFullGlossary={onOpenGlossary}
                    />
                  </p>
                </div>
              </div>
            )}

            {/* Section Takeaways */}
            {sec.keyTakeaways && sec.keyTakeaways[language].length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{language === 'en' ? 'Core Concepts in this Section' : 'Konsep Kunci Bagian Ini'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {sec.keyTakeaways[language].map((takeaway, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-start gap-2"
                    >
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>
                        <GlossaryText
                          text={takeaway}
                          language={language}
                          onOpenFullGlossary={onOpenGlossary}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Module-Level Real-World Case Study (if present) */}
      {module.caseStudy && (
        <div className="my-6 p-6 sm:p-8 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Cpu className="w-4 h-4" />
            <span>{language === 'en' ? 'Module Clinical / Engineering Case Study' : 'Studi Kasus Klinis / Rekayasa Modul'}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {module.caseStudy.title[language]}
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <strong className="text-slate-900 dark:text-white font-semibold">
                {language === 'en' ? 'Context & Problem: ' : 'Konteks & Masalah: '}
              </strong>
              <GlossaryText
                text={module.caseStudy.context[language]}
                language={language}
                onOpenFullGlossary={onOpenGlossary}
              />
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white font-semibold">
                {language === 'en' ? 'Scientific Analysis: ' : 'Analisis Ilmiah: '}
              </strong>
              <GlossaryText
                text={module.caseStudy.analysis[language]}
                language={language}
                onOpenFullGlossary={onOpenGlossary}
              />
            </p>
            <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-amber-200/90 dark:border-amber-900/70 text-amber-900 dark:text-amber-200 font-medium">
              <strong className="block mb-1 text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {language === 'en' ? 'Takeaway & Clinical / Engineering Outcome:' : 'Hasil & Kesimpulan Klinis / Rekayasa:'}
              </strong>
              <GlossaryText
                text={module.caseStudy.takeaway[language]}
                language={language}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Bottom Next Steps & Assessment CTA Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'en' ? 'Theory Mastery Complete' : 'Selesai Mempelajari Teori'}</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {language === 'en' ? 'Ready to Apply Your Knowledge?' : 'Siap Menerapkan Pemahaman Anda?'}
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            {language === 'en'
              ? 'Test your comprehension with the checkpoint quiz or experiment hands-on in the 3D Interactive Lab.'
              : 'Uji pemahaman Anda dengan kuis evaluasi atau langsung bereksperimen di Lab Interaktif 3D.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onNavigateTo3D}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-700 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>{language === 'en' ? 'Open 3D Lab' : 'Buka Lab 3D'}</span>
          </button>

          <button
            onClick={onNavigateToQuiz}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-950" />
            <span>{language === 'en' ? 'Take Checkpoint Quiz' : 'Mulai Kuis Evaluasi'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
