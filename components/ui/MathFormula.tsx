'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

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

  return (
    <span
      className={`katex-wrapper ${displayMode ? 'block my-2 overflow-x-auto text-center' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
