'use client';

import React, { useMemo } from 'react';
import { GLOSSARY_TERMS, GlossaryTermData } from '@/lib/glossaryData';
import { Language } from '@/types/learning';
import { GlossaryTerm } from './GlossaryTerm';
import { MathFormula } from './MathFormula';

interface GlossaryTextProps {
  text: string;
  language: Language;
  onOpenFullGlossary?: () => void;
  className?: string;
}

export const GlossaryText: React.FC<GlossaryTextProps> = ({
  text,
  language,
  onOpenFullGlossary,
  className = '',
}) => {
  // Build a dictionary of terms and aliases to match
  const parsedNodes = useMemo(() => {
    if (!text || typeof text !== 'string') return [text];

    // 1. Separate inline math expressions ($...$) from text
    const mathSegments: Array<{ type: 'text' | 'math'; content: string }> = [];
    const mathRegex = /\$([^\$\n]+)\$/g;
    let mathLastIdx = 0;
    let mathMatch: RegExpExecArray | null;

    while ((mathMatch = mathRegex.exec(text)) !== null) {
      if (mathMatch.index > mathLastIdx) {
        mathSegments.push({ type: 'text', content: text.slice(mathLastIdx, mathMatch.index) });
      }
      mathSegments.push({ type: 'math', content: mathMatch[1] });
      mathLastIdx = mathRegex.lastIndex;
    }

    if (mathLastIdx < text.length) {
      mathSegments.push({ type: 'text', content: text.slice(mathLastIdx) });
    }

    // 2. Collect all search phrases mapped to their GlossaryTermData
    const phraseMap: Array<{ phrase: string; data: GlossaryTermData }> = [];

    GLOSSARY_TERMS.forEach((term) => {
      // Add primary term
      const primary = term.term[language];
      if (primary && primary.length > 2) {
        phraseMap.push({ phrase: primary, data: term });
      }
      // Add primary in other language as fallback if used commonly in science
      const altLang = language === 'en' ? 'id' : 'en';
      const altPrimary = term.term[altLang];
      if (altPrimary && altPrimary.length > 2 && altPrimary !== primary) {
        phraseMap.push({ phrase: altPrimary, data: term });
      }

      // Add aliases
      const aliases = term.aliases?.[language] || [];
      aliases.forEach((alias) => {
        if (alias && alias.length > 2) {
          phraseMap.push({ phrase: alias, data: term });
        }
      });
    });

    // Sort phrases by descending length so longer compound phrases match first
    phraseMap.sort((a, b) => b.phrase.length - a.phrase.length);

    // Escape special regex characters in phrases
    const escapeRegex = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regexPattern = phraseMap.length > 0
      ? new RegExp(`\\b(${phraseMap.map((p) => escapeRegex(p.phrase)).join('|')})\\b`, 'gi')
      : null;

    // Track matched terms per paragraph to avoid duplicate tooltips in one paragraph
    const matchedTermIds = new Set<string>();

    const parseTextSegment = (segmentText: string, keyPrefix: string): React.ReactNode[] => {
      if (!regexPattern) return [segmentText];

      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      regexPattern.lastIndex = 0;

      while ((match = regexPattern.exec(segmentText)) !== null) {
        const matchStart = match.index;
        const matchEnd = regexPattern.lastIndex;
        const matchedString = match[0];

        // Add plain text before match
        if (matchStart > lastIndex) {
          parts.push(segmentText.slice(lastIndex, matchStart));
        }

        // Find the corresponding term data
        const matchedLower = matchedString.toLowerCase();
        const entry = phraseMap.find(
          (p) => p.phrase.toLowerCase() === matchedLower
        );

        if (entry && !matchedTermIds.has(entry.data.id)) {
          matchedTermIds.add(entry.data.id);
          parts.push(
            <GlossaryTerm
              key={`${keyPrefix}-${entry.data.id}-${matchStart}`}
              termData={entry.data}
              displayedText={matchedString}
              language={language}
              onOpenFullGlossary={onOpenFullGlossary}
            />
          );
        } else {
          // Already highlighted this term in this paragraph or not found, keep as regular text
          parts.push(matchedString);
        }

        lastIndex = matchEnd;
      }

      if (lastIndex < segmentText.length) {
        parts.push(segmentText.slice(lastIndex));
      }

      return parts;
    };

    const finalNodes: React.ReactNode[] = [];
    mathSegments.forEach((seg, idx) => {
      if (seg.type === 'math') {
        finalNodes.push(
          <MathFormula key={`math-${idx}`} formula={seg.content} displayMode={false} />
        );
      } else {
        finalNodes.push(...parseTextSegment(seg.content, `seg-${idx}`));
      }
    });

    return finalNodes;
  }, [text, language, onOpenFullGlossary]);

  return <span className={className}>{parsedNodes}</span>;
};
