'use client';

import React, { useMemo } from 'react';
import { GLOSSARY_TERMS, GlossaryTermData } from '@/lib/glossaryData';
import { Language } from '@/types/learning';
import { GlossaryTerm } from './GlossaryTerm';

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

    // Collect all search phrases mapped to their GlossaryTermData
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

    // Sort phrases by descending length so longer compound phrases match first (e.g. "Heisenberg Uncertainty Principle" before "Heisenberg")
    phraseMap.sort((a, b) => b.phrase.length - a.phrase.length);

    if (phraseMap.length === 0) return [text];

    // Escape special regex characters in phrases
    const escapeRegex = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regexPattern = new RegExp(
      `\\b(${phraseMap.map((p) => escapeRegex(p.phrase)).join('|')})\\b`,
      'gi'
    );

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Track matched terms per paragraph to avoid annoying users with 10 duplicate tooltips of the same word in 1 paragraph
    const matchedTermIds = new Set<string>();

    while ((match = regexPattern.exec(text)) !== null) {
      const matchStart = match.index;
      const matchEnd = regexPattern.lastIndex;
      const matchedString = match[0];

      // Add plain text before match
      if (matchStart > lastIndex) {
        parts.push(text.slice(lastIndex, matchStart));
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
            key={`${entry.data.id}-${matchStart}`}
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

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }, [text, language, onOpenFullGlossary]);

  return <span className={className}>{parsedNodes}</span>;
};
