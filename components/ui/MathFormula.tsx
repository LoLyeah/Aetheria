import React, { useMemo } from 'react';
import katex from 'katex';
import { useLearning } from '@/context/LearningContext';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  displayMode = true,
  className = '',
}) => {
  const { settings } = useLearning();
  const isHighContrast = settings?.mathDisplayFormat === 'high-contrast';

  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return `<code class="font-mono text-xs text-rose-500">${formula}</code>`;
    }
  }, [formula, displayMode]);

  const contrastClasses = isHighContrast
    ? displayMode
      ? 'p-3 my-3 rounded-xl border border-sky-500/30 bg-sky-50/30 dark:bg-sky-950/20 text-slate-950 dark:text-sky-100 shadow-2xs font-medium'
      : 'px-1.5 py-0.5 rounded-md border border-sky-400/30 bg-sky-50/40 dark:bg-sky-950/30 text-slate-950 dark:text-sky-200 font-medium'
    : '';

  return (
    <span
      className={`katex-wrapper transition-all ${contrastClasses} ${
        displayMode
          ? 'block my-2 overflow-x-auto overflow-y-hidden max-w-full text-center py-1'
          : 'inline-block max-w-full align-middle'
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
