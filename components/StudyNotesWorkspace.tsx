'use client';

import React, { useState, useRef, useMemo, useDeferredValue, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LearningModule, Topic, Language } from '@/types/learning';
import { MathFormula } from './ui/MathFormula';
import { translations } from '@/lib/translations';
import {
  BookOpen,
  Copy,
  Check,
  Download,
  Trash2,
  Edit3,
  Columns,
  Eye,
  Type,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Sigma,
  SquareSigma,
  Quote,
  Maximize2,
  Minimize2,
  AlertCircle,
  CheckCircle2,
  FileText,
  Table,
  CheckSquare,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface StudyNotesWorkspaceProps {
  module: LearningModule;
  topic: Topic;
  language: Language;
  note: string;
  onSaveNote: (text: string) => void;
  onOpenGlossary?: () => void;
}

type SymbolCategory = 'all' | 'greek' | 'math' | 'subsuper' | 'arrows' | 'formulas';
type ViewMode = 'write' | 'split' | 'preview';
type FontSize = 'sm' | 'base' | 'lg';

const GREEK_SYMBOLS = [
  'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'κ', 'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'φ', 'χ', 'ψ', 'ω',
  'Γ', 'Δ', 'Θ', 'Λ', 'Ξ', 'Π', 'Σ', 'Φ', 'Ψ', 'Ω'
];

const MATH_OPERATORS = [
  'ħ', '∂', '∇', '∫', '∬', '∮', '∑', '∏', '√', '∝', '∞', '≈', '≠', '≡', '≤', '≥', '±', '∓', '×', '÷', '·'
];

const SUB_SUPER_SYMBOLS = [
  '⁰', '¹', '²', '³', '⁴', 'ⁿ', '⁻¹', '⁻²',
  '₀', '₁', '₂', '₃', '₄', 'ₙ', '₊', '₋'
];

const ARROWS_AND_UNITS = [
  '→', '⇌', '←', '↔', '↑', '↓', '|0⟩', '|1⟩', '|ψ⟩', '⟨ψ|', '°C', 'Å', 'eV', 'nm', 'μs', 'kHz', 'Ω', 'mA', 'Wh/kg'
];

interface FormulaSnippet {
  label: string;
  latex: string;
  display: string;
  discipline?: string;
}

const FORMULA_SNIPPETS: FormulaSnippet[] = [
  // General Calculus & Math
  { label: 'Fraction', latex: '\\frac{a}{b}', display: '\\frac{a}{b}', discipline: 'math' },
  { label: 'Square Root', latex: '\\sqrt{x}', display: '\\sqrt{x}', discipline: 'math' },
  { label: 'Partial Deriv', latex: '\\frac{\\partial \\psi}{\\partial t}', display: '\\frac{\\partial}{\\partial t}', discipline: 'math' },
  { label: 'Definite Integral', latex: '\\int_{a}^{b} f(x) dx', display: '\\int_a^b', discipline: 'math' },
  { label: 'Summation', latex: '\\sum_{i=1}^{n} x_i', display: '\\sum_{i=1}^n', discipline: 'math' },
  // Quantum Mechanics
  { label: 'Schrödinger Eq', latex: '\\hat{H}|\\psi\\rangle = E|\\psi\\rangle', display: '\\hat{H}|\\psi\\rangle', discipline: 'qm' },
  { label: 'Heisenberg', latex: '\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}', display: '\\Delta x \\Delta p', discipline: 'qm' },
  { label: 'de Broglie', latex: '\\lambda = \\frac{h}{p}', display: '\\lambda = \\frac{h}{p}', discipline: 'qm' },
  { label: 'Probability Density', latex: 'P(x) = |\\psi(x)|^2', display: '|\\psi|^2', discipline: 'qm' },
  // EV Battery & Powertrain
  { label: 'Nernst Eq', latex: 'E = E^0 - \\frac{RT}{zF} \\ln Q', display: 'E_{cell}', discipline: 'battery' },
  { label: 'Butler-Volmer', latex: 'j = j_0 \\left( e^{\\frac{\\alpha_a F \\eta}{RT}} - e^{-\\frac{\\alpha_c F \\eta}{RT}} \\right)', display: 'j(\\eta)', discipline: 'battery' },
  { label: 'Joule Heating', latex: 'P_{loss} = I^2 R_{int}', display: 'I^2 R', discipline: 'battery' },
  { label: 'Kinetic Power', latex: 'P = \\tau \\cdot \\omega = V \\cdot I', display: 'P = \\tau \\omega', discipline: 'battery' },
  // Embryonic & Hemodynamics
  { label: 'Poiseuille Flow', latex: 'Q = \\frac{\\Delta P \\cdot \\pi r^4}{8 \\eta L}', display: 'Q_{flow}', discipline: 'bio' },
  { label: 'Doppler Shift', latex: '\\Delta f = \\frac{2 f_0 v \\cos \\theta}{c}', display: '\\Delta f', discipline: 'bio' },
  { label: 'Fick Diffusion', latex: 'J = -D \\frac{dC}{dx}', display: 'J_{diff}', discipline: 'bio' },
  { label: 'Wall Tension', latex: 'T = \\frac{P \\cdot r}{2h}', display: 'T_{wall}', discipline: 'bio' },
];

/**
 * Parses inline Markdown & KaTeX tokens with robust LaTeX matching:
 * 1. Double dollar display math: $$...$$
 * 2. Single dollar inline math: $...$ (requires non-whitespace adjacent to delimiters to prevent currency collision)
 * 3. Links: [text](url)
 * 4. Inline code: `...`
 * 5. Bold: **...** (with recursive inline rendering)
 * 6. Italic: *...* (with recursive inline rendering)
 * 7. Strikethrough: ~~...~~
 */
function renderInlineTokens(text: string): React.ReactNode[] {
  if (!text) return [];
  const tokens: React.ReactNode[] = [];
  // Tokenizer regex
  const inlineRegex = /(\$\$([^\$]+?)\$\$)|(\$([^\s\$\n](?:[^\$\n]*?[^\s\$\n])?)\$)|(\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\))|(`([^`\n]+)`)|(\*\*([^\*\n]+)\*\*)|(\*([^\*\n]+)\*)|(~~([^~\n]+)~~)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // 1. Display math inside inline sentence: $$formula$$
      tokens.push(
        <MathFormula
          key={`math-disp-${match.index}`}
          formula={match[2].trim()}
          displayMode={true}
          className="my-1.5"
        />
      );
    } else if (match[4] !== undefined) {
      // 2. Inline math: $formula$
      tokens.push(
        <MathFormula
          key={`math-${match.index}`}
          formula={match[4]}
          displayMode={false}
          className="mx-0.5 align-middle"
        />
      );
    } else if (match[6] !== undefined && match[7] !== undefined) {
      // 3. Link: [text](url)
      tokens.push(
        <a
          key={`link-${match.index}`}
          href={match[7]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline underline-offset-2 font-medium"
        >
          <span>{match[6]}</span>
          <ExternalLink className="w-3 h-3 inline-block" />
        </a>
      );
    } else if (match[9] !== undefined) {
      // 4. Inline code: `code`
      tokens.push(
        <code
          key={`code-${match.index}`}
          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-mono text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60"
        >
          {match[9]}
        </code>
      );
    } else if (match[11] !== undefined) {
      // 5. Bold: **text** (supports nested math or code)
      tokens.push(
        <strong key={`bold-${match.index}`} className="font-bold text-slate-900 dark:text-white">
          {renderInlineTokens(match[11])}
        </strong>
      );
    } else if (match[13] !== undefined) {
      // 6. Italic: *text* (supports nested math)
      tokens.push(
        <em key={`italic-${match.index}`} className="italic text-slate-800 dark:text-slate-200">
          {renderInlineTokens(match[13])}
        </em>
      );
    } else if (match[15] !== undefined) {
      // 7. Strikethrough: ~~text~~
      tokens.push(
        <del key={`del-${match.index}`} className="line-through text-slate-400 dark:text-slate-500">
          {match[15]}
        </del>
      );
    }
    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : [text];
}

/** Parses markdown text into block structures */
interface MarkdownBlock {
  type: 'math-block' | 'code-block' | 'heading' | 'blockquote' | 'hr' | 'ul' | 'ol' | 'table' | 'paragraph';
  content: string;
  level?: number;
  items?: string[];
  lang?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

function parseMarkdownBlocks(rawText: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = rawText.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Math block start $$
    if (trimmed.startsWith('$$')) {
      let mathContent = '';
      if (trimmed === '$$') {
        i++;
        const mathLines: string[] = [];
        while (i < lines.length && lines[i].trim() !== '$$') {
          mathLines.push(lines[i]);
          i++;
        }
        mathContent = mathLines.join('\n');
        if (i < lines.length) i++;
      } else if (trimmed.endsWith('$$') && trimmed.length > 2) {
        mathContent = trimmed.slice(2, -2).trim();
        i++;
      } else {
        const rest = trimmed.slice(2);
        i++;
        const mathLines: string[] = [rest];
        while (i < lines.length && !lines[i].trim().endsWith('$$')) {
          mathLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) {
          const lastLine = lines[i].trim();
          mathLines.push(lastLine.slice(0, -2));
          i++;
        }
        mathContent = mathLines.join('\n');
      }
      blocks.push({ type: 'math-block', content: mathContent });
      continue;
    }

    // 2. Code block ```
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      blocks.push({ type: 'code-block', content: codeLines.join('\n'), lang });
      continue;
    }

    // 3. Markdown Table: lines starting and ending with |
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|')) {
      const headerCells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      
      // Check if next line is separator line (e.g. |---|---|)
      if (i + 1 < lines.length && /^\|(\s*:?-+:?\s*\|)+$/.test(lines[i + 1].trim())) {
        i += 2; // skip header and separator
        const rows: string[][] = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          const rowCells = lines[i]
            .trim()
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim());
          rows.push(rowCells);
          i++;
        }
        blocks.push({
          type: 'table',
          content: '',
          tableHeaders: headerCells,
          tableRows: rows,
        });
        continue;
      }
    }

    // 4. Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push({ type: 'hr', content: '' });
      i++;
      continue;
    }

    // 5. Headings (#, ##, ###, ####)
    if (trimmed.startsWith('#')) {
      const hashMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (hashMatch) {
        blocks.push({
          type: 'heading',
          level: hashMatch[1].length,
          content: hashMatch[2],
        });
        i++;
        continue;
      }
    }

    // 6. Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [trimmed.replace(/^>\s?/, '')];
      i++;
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', content: quoteLines.join('\n') });
      continue;
    }

    // 7. Unordered list (supports task checkboxes: - [ ] and - [x])
    if (/^[\*\-]\s+/.test(trimmed)) {
      const listItems: string[] = [trimmed.replace(/^[\*\-]\s+/, '')];
      i++;
      while (i < lines.length && /^[\*\-]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[\*\-]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ul', content: '', items: listItems });
      continue;
    }

    // 8. Ordered list
    if (/^\d+[\.\)]\s+/.test(trimmed)) {
      const listItems: string[] = [trimmed.replace(/^\d+[\.\)]\s+/, '')];
      i++;
      while (i < lines.length && /^\d+[\.\)]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+[\.\)]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', content: '', items: listItems });
      continue;
    }

    // 9. Empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 10. Paragraph
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('$$') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('---') &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) &&
      !/^[\*\-]\s+/.test(lines[i].trim()) &&
      !/^\d+[\.\)]\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'paragraph', content: paraLines.join('\n') });
  }

  return blocks;
}

export const StudyNotesWorkspace: React.FC<StudyNotesWorkspaceProps> = ({
  module,
  topic,
  language,
  note,
  onSaveNote,
}) => {
  const t = translations[language];
  const notesT = t.studyNotes;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('write');
  const [activeCategory, setActiveCategory] = useState<SymbolCategory>('all');
  const [isFullWidth, setIsFullWidth] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [showSymbolsPalette, setShowSymbolsPalette] = useState<boolean>(true);

  // Performance: Deferred note avoids KaTeX re-parsing lag on rapid keystrokes in Split View
  const deferredNote = useDeferredValue(note);

  // Metrics
  const charCount = note.length;
  const wordCount = useMemo(() => {
    const trimmed = note.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [note]);
  const lineCount = useMemo(() => {
    return note ? note.split('\n').length : 0;
  }, [note]);
  const estimatedReadMinutes = useMemo(() => {
    return Math.max(1, Math.ceil(wordCount / 180));
  }, [wordCount]);

  // Font size classes
  const fontClasses: Record<FontSize, string> = {
    sm: 'text-xs sm:text-sm leading-relaxed',
    base: 'text-sm sm:text-base leading-relaxed',
    lg: 'text-base sm:text-lg leading-relaxed',
  };

  /**
   * Inserts text at current textarea cursor position with accurate selection preservation.
   * If user has no text selected and a placeholder is passed (e.g. bold text, Section Title),
   * the placeholder is highlighted so typing immediately replaces it.
   */
  const insertAtCursor = (prefix: string, suffix: string = '', defaultSelectedText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onSaveNote(note + prefix + defaultSelectedText + suffix);
      return;
    }

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const hasSelection = start !== end;
    const selectedText = hasSelection ? textarea.value.substring(start, end) : defaultSelectedText;
    const replacement = prefix + selectedText + suffix;
    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    onSaveNote(newValue);

    setTimeout(() => {
      if (!textarea) return;
      textarea.focus();
      if (!hasSelection && defaultSelectedText) {
        // Highlight placeholder so typing replaces it immediately
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + defaultSelectedText.length
        );
      } else {
        // Place cursor right after the replacement
        const targetPos = start + replacement.length;
        textarea.setSelectionRange(targetPos, targetPos);
      }
    }, 0);
  };

  /** Inserts a formula snippet wrapped with LaTeX delimiters */
  const insertFormulaSnippet = (latex: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onSaveNote(note + ` $${latex}$ `);
      return;
    }
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const hasSelection = start !== end;

    if (hasSelection) {
      // Wrap selected text or replace
      insertAtCursor('$', '$', latex);
    } else {
      // Clean inline math insertion
      insertAtCursor('$', '$', latex);
    }
  };

  /** Inserts a markdown table boilerplate */
  const insertTableTemplate = () => {
    const tableTemplate =
      '\n| ' +
      (language === 'id' ? 'Parameter' : 'Parameter') +
      ' | ' +
      (language === 'id' ? 'Simbol' : 'Symbol') +
      ' | ' +
      (language === 'id' ? 'Nilai / Satuan' : 'Value / Unit') +
      ' |\n|---|:---:|---:|\n| ' +
      (language === 'id' ? 'Massa Partikel' : 'Particle Mass') +
      ' | $m$ | $9.11 \\times 10^{-31}$ kg |\n| ' +
      (language === 'id' ? 'Energi Kinetik' : 'Kinetic Energy') +
      ' | $E_k$ | $13.6$ eV |\n';
    insertAtCursor(tableTemplate);
  };

  /** Handles Tab key indentation and keyboard shortcuts */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;

    // 1. Tab / Shift+Tab 2-space indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start === end) {
        // Simple cursor insert 2 spaces
        insertAtCursor('  ');
      } else {
        // Multi-line selection indent / un-indent
        const val = textarea.value;
        const lineStart = val.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = val.indexOf('\n', end);
        const effectiveEnd = lineEnd === -1 ? val.length : lineEnd;
        const selectedBlock = val.substring(lineStart, effectiveEnd);
        const lines = selectedBlock.split('\n');

        let updatedBlock: string;
        if (e.shiftKey) {
          // Unindent up to 2 spaces
          updatedBlock = lines
            .map((l) => (l.startsWith('  ') ? l.slice(2) : l.startsWith(' ') ? l.slice(1) : l))
            .join('\n');
        } else {
          // Indent 2 spaces
          updatedBlock = lines.map((l) => '  ' + l).join('\n');
        }

        const newVal = val.substring(0, lineStart) + updatedBlock + val.substring(effectiveEnd);
        onSaveNote(newVal);

        setTimeout(() => {
          if (!textarea) return;
          textarea.focus();
          textarea.setSelectionRange(lineStart, lineStart + updatedBlock.length);
        }, 0);
      }
      return;
    }

    // 2. Keyboard shortcuts (Cmd/Ctrl + B, I, M, S)
    if (e.metaKey || e.ctrlKey) {
      const key = e.key.toLowerCase();
      if (key === 'b') {
        e.preventDefault();
        insertAtCursor('**', '**', 'bold text');
      } else if (key === 'i') {
        e.preventDefault();
        insertAtCursor('*', '*', 'italic text');
      } else if (key === 'm') {
        e.preventDefault();
        insertAtCursor('$', '$', 'x');
      } else if (key === 's') {
        e.preventDefault();
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2000);
      }
    }
  };

  /** Robust copy notes with clipboard fallback for sandboxed/non-HTTPS environments */
  const handleCopyNotes = async () => {
    if (!note) return;
    let succeeded = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(note);
        succeeded = true;
      } catch (err) {
        console.warn('Clipboard API writeText failed, attempting textarea fallback:', err);
      }
    }

    if (!succeeded) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = note;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        succeeded = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback clipboard copy failed:', err);
      }
    }

    if (succeeded) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /** Export notes as .md file */
  const handleExportMarkdown = () => {
    const content = note || `# ${module.title[language]}\n\n`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${topic.id}-${module.id}-study-notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /** Generates structured STEM lab template tailored to the active module's actual physics */
  const getLabTemplate = () => {
    // Extract module's primary formula if present
    const primarySectionFormula = module.sections.find((s) => s.formula)?.formula;
    const defaultTopicFormula =
      topic.id === 'ev-battery'
        ? 'E = E^0 - \\frac{RT}{zF} \\ln Q'
        : topic.id === 'fetus-development' || topic.id === 'cardiac-arrest' || topic.id === 'hypertension' || topic.id === 'pulmonology-pneumonia'
        ? 'Q = \\frac{\\Delta P \\cdot \\pi r^4}{8 \\eta L}'
        : '\\hat{H}|\\psi\\rangle = E|\\psi\\rangle';

    const activeEquation = primarySectionFormula || defaultTopicFormula;

    if (language === 'id') {
      return `# Catatan Studi Laboratorium: ${module.title.id}
**Disiplin Kurikulum:** ${topic.title.id} | **Modul:** Bagian ${module.order}

## 1. Prinsip Utama & Hipotesis Teoretis
- Hukum ilmiah yang mendasari & definisi formal:
- Hipotesis konseptual awal sebelum menjalankan simulasi 3D:

## 2. Formulasi Matematis & Relasi Kunci
$$
${activeEquation}
$$
- Variabel kunci & kondisi batas (boundary conditions):
- Ekspektasi teoretis dibandingkan nilai acuan referensi:

## 3. Observasi Simulasi 3D & Data Empiris
| Parameter Uji | Nilai Masukan | Hasil Teramati | Catatan |
|---|---|---|---|
| Titik Uji 1 | Baseline | Normal | Nominal |
| Titik Uji 2 | Variasi $\\Delta$ | Respons transien | Dinamis |

- Perilaku penting atau fenomena visual yang teramati di laboratorium 3D:
- Metrik kuantitatif atau grafik karakteristik yang tercatat:

## 4. Wawasan Analisis & Kesimpulan Konseptual
- [ ] Menganalisis korelasi antara parameter fisik dan dinamika sistem.
- [ ] Memvalidasi kesesuaian hasil observasi dengan rumus teoretis di Bagian 2.
- Implikasi praktis dalam bidang sains atau rekayasa:
- Pertanyaan lanjutan untuk pendalaman konsep:
`;
    }

    return `# Laboratory Study Notes: ${module.title.en}
**Curriculum Discipline:** ${topic.title.en} | **Module:** Part ${module.order}

## 1. Core Principles & Theoretical Hypotheses
- Governing scientific laws & formal definitions:
- Initial conceptual hypothesis prior to 3D interactive experimentation:

## 2. Mathematical Formulations & Governing Relations
$$
${activeEquation}
$$
- Key variables & boundary conditions:
- Theoretical expectations versus baseline reference values:

## 3. 3D Simulation Observations & Empirical Data
| Test Parameter | Input Value | Observed Outcome | Observations |
|---|---|---|---|
| Trial 1 | Baseline | Steady state | Nominal |
| Trial 2 | Perturbation $\\Delta$ | Transient response | Dynamic |

- Key visual or dynamical phenomena observed in the 3D lab:
- Quantitative metrics, waveforms, or transient trajectories noted:

## 4. Analytical Insights & Conceptual Takeaways
- [ ] Synthesize correlation between physical parameters and observed dynamics.
- [ ] Confirm alignment between empirical observations and governing equations.
- Practical engineering or scientific implications:
- Unresolved questions for further exploration:
`;
  };

  const handleApplyTemplate = (replace: boolean) => {
    const template = getLabTemplate();
    if (replace || !note.trim()) {
      onSaveNote(template);
    } else {
      onSaveNote(`${note.trim()}\n\n---\n\n${template}`);
    }
    setShowTemplateModal(false);
  };

  // Symbols list depending on active category
  const activeSymbols = useMemo(() => {
    if (activeCategory === 'greek') return GREEK_SYMBOLS;
    if (activeCategory === 'math') return MATH_OPERATORS;
    if (activeCategory === 'subsuper') return SUB_SUPER_SYMBOLS;
    if (activeCategory === 'arrows') return ARROWS_AND_UNITS;
    return [
      'ψ', 'Ψ', 'ħ', 'Δ', 'λ', '∫', '∂', '∑', '√', '≈', '≠', '±', '∞', 'π', 'θ', 'ω', 'α', 'β', 'γ', 'μ', 'Ω', '²', '³', '₀', '₁', '→', '⇌', '°C'
    ];
  }, [activeCategory]);

  // Filter formula snippets by active module topic
  const relevantFormulaSnippets = useMemo(() => {
    const isBattery = topic.id === 'ev-battery';
    const isBio =
      topic.id === 'fetus-development' ||
      topic.id === 'cardiac-arrest' ||
      topic.id === 'hypertension' ||
      topic.id === 'pulmonology-pneumonia';

    return FORMULA_SNIPPETS.filter((snippet) => {
      if (snippet.discipline === 'math') return true;
      if (isBattery && snippet.discipline === 'battery') return true;
      if (isBio && snippet.discipline === 'bio') return true;
      if (!isBattery && !isBio && snippet.discipline === 'qm') return true;
      return false;
    });
  }, [topic.id]);

  // Deferred markdown parsing for 60fps typing smoothness
  const parsedBlocks = useMemo(() => parseMarkdownBlocks(deferredNote), [deferredNote]);

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFullscreen]);

  return (
    <div
      className={`transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto flex flex-col'
          : isFullWidth
          ? 'w-full'
          : 'max-w-5xl mx-auto'
      }`}
    >
      <div
        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col ${
          isFullscreen ? 'flex-1 max-w-7xl mx-auto w-full' : ''
        }`}
      >
        {/* 1. Header Area: Editorial title, context, and primary actions */}
        <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Title & Context */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                  {language === 'en' ? `Part ${module.order}` : `Bagian ${module.order}`}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {topic.title[language]} • {module.title[language]}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {notesT.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {notesT.subtitle}
              </p>
            </div>

            {/* Right: Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Insert Lab Template */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (note.trim()) {
                    setShowTemplateModal(true);
                  } else {
                    handleApplyTemplate(true);
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={notesT.insertTemplate}
              >
                <FileText className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden sm:inline">{notesT.insertTemplate}</span>
                <span className="sm:hidden">Template</span>
              </motion.button>

              {/* Copy Note */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyNotes}
                disabled={!note}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  copied
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
                title={notesT.copy}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{notesT.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span className="hidden sm:inline">{notesT.copy}</span>
                  </>
                )}
              </motion.button>

              {/* Export .MD */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportMarkdown}
                disabled={!note}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title={notesT.exportMd}
              >
                <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline">{notesT.exportMd}</span>
              </motion.button>

              {/* Clear Notes */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowClearConfirm(true)}
                disabled={!note}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:border-rose-200 dark:hover:border-rose-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title={notesT.clear}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </motion.button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

              {/* Zen Fullscreen Toggle */}
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center ${
                  isFullscreen
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
                title={isFullscreen ? notesT.exitFullscreen : notesT.fullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Row 2: View Modes, Font Controls, & Status */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
              <button
                onClick={() => setViewMode('write')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'write'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                <span>{notesT.tabWrite}</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`hidden md:flex px-3 py-1.5 rounded-lg items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Columns className="w-3.5 h-3.5 text-sky-500" />
                <span>{notesT.tabSplit}</span>
              </button>

              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                <span>{notesT.tabPreview}</span>
              </button>
            </div>

            {/* Font Size & Auto-save Status */}
            <div className="flex items-center gap-3">
              {/* Font controls */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">
                <Type className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    fontSize === 'sm'
                      ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs text-slate-900 dark:text-white'
                      : 'text-slate-500'
                  }`}
                  title={notesT.fontSmall}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    fontSize === 'base'
                      ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs text-slate-900 dark:text-white'
                      : 'text-slate-500'
                  }`}
                  title={notesT.fontBase}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    fontSize === 'lg'
                      ? 'bg-white dark:bg-slate-700 font-bold shadow-2xs text-slate-900 dark:text-white'
                      : 'text-slate-500'
                  }`}
                  title={notesT.fontLarge}
                >
                  A+
                </button>
              </div>

              {/* Auto-save Status */}
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {savedToast ? notesT.copied : notesT.autoSaved}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Formatting & Scientific Symbols Toolbars (Visible when editing) */}
        {(viewMode === 'write' || viewMode === 'split') && (
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 divide-y divide-slate-200/60 dark:divide-slate-800/60">
            {/* Quick Markdown & Formula Formatting Strip */}
            <div className="px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1">
                {/* Bold */}
                <button
                  onClick={() => insertAtCursor('**', '**', 'bold text')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  title={`${notesT.bold} (⌘B)`}
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>

                {/* Italic */}
                <button
                  onClick={() => insertAtCursor('*', '*', 'italic text')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title={`${notesT.italic} (⌘I)`}
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                {/* Heading 2 */}
                <button
                  onClick={() => insertAtCursor('\n## ', '\n', 'Section Title')}
                  className="px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                  title={notesT.heading}
                >
                  H2
                </button>

                {/* Heading 3 */}
                <button
                  onClick={() => insertAtCursor('\n### ', '\n', 'Subheading')}
                  className="px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                  title={notesT.subheading}
                >
                  H3
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                {/* Bullet List */}
                <button
                  onClick={() => insertAtCursor('\n- ', '\n', 'List item')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title={notesT.bulletList}
                >
                  <List className="w-3.5 h-3.5" />
                </button>

                {/* Numbered List */}
                <button
                  onClick={() => insertAtCursor('\n1. ', '\n', 'Step item')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title={notesT.numberedList}
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>

                {/* Checklist item */}
                <button
                  onClick={() => insertAtCursor('\n- [ ] ', '\n', 'Task checklist item')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title="Checklist (- [ ])"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </button>

                {/* Blockquote */}
                <button
                  onClick={() => insertAtCursor('\n> ', '\n', 'Important insight')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title={notesT.quote}
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>

                {/* Code Block */}
                <button
                  onClick={() => insertAtCursor('\n```typescript\n', '\n```\n', '// code snippet')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title={notesT.codeBlock}
                >
                  <Code className="w-3.5 h-3.5" />
                </button>

                {/* Table Template */}
                <button
                  onClick={insertTableTemplate}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title={notesT.table}
                >
                  <Table className="w-3.5 h-3.5 text-indigo-500" />
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                {/* Inline Math */}
                <button
                  onClick={() => insertAtCursor('$', '$', 'E = mc^2')}
                  className="px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title={`${notesT.inlineMath} (⌘M)`}
                >
                  <span>$x$</span>
                </button>

                {/* Math Block */}
                <button
                  onClick={() => insertAtCursor('\n$$\n', '\n$$\n', '\\hat{H}|\\psi\\rangle = E|\\psi\\rangle')}
                  className="px-2 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title={notesT.mathBlock}
                >
                  <SquareSigma className="w-3.5 h-3.5" />
                  <span>$$</span>
                </button>
              </div>

              {/* Toggle Symbols Palette Bar */}
              <button
                onClick={() => setShowSymbolsPalette(!showSymbolsPalette)}
                className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer py-1 px-1.5 rounded hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
              >
                <Sigma className="w-3.5 h-3.5 text-amber-500" />
                <span>{notesT.symbolsLabel}</span>
                <span className="text-[10px] opacity-70">
                  {showSymbolsPalette ? '▲' : '▼'}
                </span>
              </button>
            </div>

            {/* Scientific Symbols & Formulas Palette with horizontal scroll on mobile */}
            {showSymbolsPalette && (
              <div className="px-4 sm:px-6 py-2.5 bg-slate-100/60 dark:bg-slate-900/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  {/* Category Pills (responsive overflow-x-auto to prevent mobile wrapping clip) */}
                  <div className="flex items-center gap-1 text-[11px] font-mono overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                        activeCategory === 'all'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {notesT.categoryAll}
                    </button>
                    <button
                      onClick={() => setActiveCategory('greek')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                        activeCategory === 'greek'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {notesT.categoryGreek}
                    </button>
                    <button
                      onClick={() => setActiveCategory('math')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                        activeCategory === 'math'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {notesT.categoryMath}
                    </button>
                    <button
                      onClick={() => setActiveCategory('subsuper')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                        activeCategory === 'subsuper'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {notesT.categorySubSuper}
                    </button>
                    <button
                      onClick={() => setActiveCategory('arrows')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                        activeCategory === 'arrows'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {notesT.categoryArrows}
                    </button>
                    <button
                      onClick={() => setActiveCategory('formulas')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                        activeCategory === 'formulas'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {notesT.categoryFormulas}
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden lg:inline">
                    {notesT.latexSupported}
                  </span>
                </div>

                {/* Symbols or Formulas Grid */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {activeCategory === 'formulas' ? (
                    <div className="flex flex-wrap gap-1.5 w-full">
                      {relevantFormulaSnippets.map((snippet, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => insertFormulaSnippet(snippet.latex)}
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                          title={`Insert $${snippet.latex}$`}
                        >
                          <span className="text-slate-500 dark:text-slate-400">{snippet.label}:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">{snippet.display}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    activeSymbols.map((sym, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => insertAtCursor(sym)}
                        className="min-w-[34px] h-8 px-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600 dark:hover:bg-slate-700 dark:hover:text-sky-400 text-xs sm:text-sm font-serif font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        title={`Insert ${sym}`}
                      >
                        {sym}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Main Workspace Area: STABLE single-textarea DOM architecture */}
        <div
          className={`flex-1 ${
            viewMode === 'split'
              ? 'grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800'
              : ''
          }`}
        >
          {/* EDITOR PANE (Visible in Write & Split View) */}
          <div
            className={`relative flex flex-col ${
              viewMode === 'preview' ? 'hidden' : 'block'
            }`}
          >
            <textarea
              ref={textareaRef}
              value={note}
              onChange={(e) => onSaveNote(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={notesT.placeholder}
              className={`w-full flex-1 min-h-[540px] sm:min-h-[620px] p-6 sm:p-8 font-mono ${fontClasses[fontSize]} bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none`}
            />
          </div>

          {/* PREVIEW PANE (Visible in Split & Preview View) */}
          <div
            className={`${
              viewMode === 'write' ? 'hidden' : 'block'
            } ${
              viewMode === 'split'
                ? 'min-h-[540px] sm:min-h-[620px] max-h-[750px] overflow-y-auto p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-950/30'
                : 'min-h-[540px] sm:min-h-[620px] p-6 sm:p-10 bg-slate-50/30 dark:bg-slate-950/20'
            }`}
          >
            {note.trim() ? (
              <div className={`${viewMode === 'preview' ? 'max-w-4xl mx-auto space-y-5' : 'space-y-4'}`}>
                {parsedBlocks.map((block, bIdx) => renderBlock(block, bIdx))}
              </div>
            ) : (
              <EmptyNotesState
                notesT={notesT}
                onUseTemplate={() => handleApplyTemplate(true)}
              />
            )}
          </div>
        </div>

        {/* 4. Footer & Metrics Bar */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-slate-800 dark:text-slate-200">{wordCount}</strong> {notesT.words}
            </span>
            <span>•</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">{charCount}</strong> {notesT.chars}
            </span>
            <span>•</span>
            <span>
              <strong className="text-slate-800 dark:text-slate-200">{lineCount}</strong> {notesT.lines}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>
                ~{estimatedReadMinutes} {notesT.readingTime}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="hidden md:inline text-slate-400">{notesT.keyboardHints}</span>
            <span className="md:hidden">{notesT.latexSupported}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Clear Notes (Spring physics & backdrop-blur-md per AGENTS.md) */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {notesT.clearConfirmTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {notesT.clearConfirmDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {notesT.cancel}
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSaveNote('');
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {notesT.confirmClear}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal: Insert Lab Template (Spring physics & backdrop-blur-md per AGENTS.md) */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {notesT.templateConfirmTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {notesT.templateConfirmDesc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowTemplateModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {notesT.cancel}
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyTemplate(false)}
                  className="px-3.5 py-2 rounded-xl border border-sky-300 dark:border-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/50 text-sky-700 dark:text-sky-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {notesT.appendTemplate}
                </motion.button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApplyTemplate(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  {notesT.replaceConfirm}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Render individual markdown block */
function renderBlock(block: MarkdownBlock, idx: number) {
  switch (block.type) {
    case 'heading': {
      if (block.level === 1) {
        return (
          <h1
            key={idx}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white pt-4 pb-2 border-b border-slate-200 dark:border-slate-800"
          >
            {renderInlineTokens(block.content)}
          </h1>
        );
      }
      if (block.level === 2) {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-1.5 border-b border-slate-100 dark:border-slate-800/60"
          >
            {renderInlineTokens(block.content)}
          </h2>
        );
      }
      return (
        <h3
          key={idx}
          className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 pt-3 pb-1"
        >
          {renderInlineTokens(block.content)}
        </h3>
      );
    }
    case 'math-block':
      return (
        <div
          key={idx}
          className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 overflow-x-auto shadow-2xs"
        >
          <MathFormula formula={block.content} displayMode={true} />
        </div>
      );
    case 'code-block':
      return (
        <div
          key={idx}
          className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 dark:bg-slate-950 shadow-2xs"
        >
          {block.lang && (
            <div className="px-4 py-1.5 bg-slate-800/80 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
              {block.lang}
            </div>
          )}
          <pre className="p-4 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto">
            <code>{block.content}</code>
          </pre>
        </div>
      );
    case 'table':
      return (
        <div
          key={idx}
          className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs"
        >
          <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-100/90 dark:bg-slate-800/60 font-mono">
              <tr>
                {block.tableHeaders?.map((h, hIdx) => (
                  <th
                    key={hIdx}
                    className="px-4 py-2.5 font-bold text-slate-900 dark:text-white"
                  >
                    {renderInlineTokens(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
              {block.tableRows?.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-4 py-2.5 text-slate-700 dark:text-slate-300 font-mono"
                    >
                      {renderInlineTokens(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'blockquote':
      return (
        <blockquote
          key={idx}
          className="my-3 pl-4 border-l-2 border-sky-500 text-slate-600 dark:text-slate-300 italic text-sm sm:text-base leading-relaxed whitespace-pre-line"
        >
          {renderInlineTokens(block.content)}
        </blockquote>
      );
    case 'ul':
      return (
        <ul
          key={idx}
          className="my-2 space-y-1.5 text-sm sm:text-base text-slate-700 dark:text-slate-300"
        >
          {block.items?.map((item, itemIdx) => {
            const isUnchecked = item.startsWith('[ ] ');
            const isChecked = item.startsWith('[x] ') || item.startsWith('[X] ');
            if (isUnchecked || isChecked) {
              const taskText = item.slice(4);
              return (
                <li key={itemIdx} className="flex items-start gap-2.5 leading-relaxed">
                  <span
                    className={`mt-1 w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span className={isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                    {renderInlineTokens(taskText)}
                  </span>
                </li>
              );
            }
            return (
              <li key={itemIdx} className="list-disc ml-6 leading-relaxed">
                {renderInlineTokens(item)}
              </li>
            );
          })}
        </ul>
      );
    case 'ol':
      return (
        <ol
          key={idx}
          className="my-2 pl-6 list-decimal space-y-1.5 text-sm sm:text-base text-slate-700 dark:text-slate-300"
        >
          {block.items?.map((item, itemIdx) => (
            <li key={itemIdx} className="leading-relaxed">
              {renderInlineTokens(item)}
            </li>
          ))}
        </ol>
      );
    case 'hr':
      return (
        <hr key={idx} className="my-6 border-slate-200 dark:border-slate-800" />
      );
    case 'paragraph':
    default:
      return (
        <p
          key={idx}
          className="my-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line"
        >
          {renderInlineTokens(block.content)}
        </p>
      );
  }
}

/** Empty notes placeholder illustration */
interface EmptyNotesStateProps {
  notesT: typeof translations.en.studyNotes;
  onUseTemplate: () => void;
}

const EmptyNotesState: React.FC<EmptyNotesStateProps> = ({ notesT, onUseTemplate }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-12 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-xs">
        <BookOpen className="w-6 h-6" />
      </div>

      <div className="max-w-md space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {notesT.emptyNotesTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {notesT.emptyNotesDesc}
        </p>
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={onUseTemplate}
        className="mt-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
      >
        <FileText className="w-4 h-4" />
        <span>{notesT.useTemplatePrompt}</span>
      </motion.button>
    </div>
  );
};
