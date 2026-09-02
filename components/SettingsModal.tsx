'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { Language, Theme } from '@/types/learning';
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Globe,
  Type,
  Sparkles,
  Volume2,
  VolumeX,
  Gauge,
  Cpu,
  Layers,
  RotateCw,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  X,
  Check,
  AlertTriangle,
  BookOpen,
  Eye,
  Sliders,
} from 'lucide-react';
import { APP_VERSION_DATA } from '@/lib/version';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGlossary?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onOpenGlossary,
}) => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    settings,
    updateSettings,
    resetSettings,
    userProgress,
    setUserName,
    resetProgress,
    importProgress,
    gpuRendererInfo,
    isWebGPUSupported,
  } = useLearning();

  const [activeTab, setActiveTab] = useState<'appearance' | 'glossary' | 'simulation' | 'data'>('appearance');
  const [nameInput, setNameInput] = useState(userProgress.userName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSettingsResetConfirm, setShowSettingsResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExportData = () => {
    const backupData = {
      version: APP_VERSION_DATA.version,
      timestamp: new Date().toISOString(),
      userProgress,
      settings,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aetheria-science-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const progressData = parsed.userProgress || parsed;
        const success = importProgress(JSON.stringify(progressData));
        if (success) {
          if (parsed.settings) {
            updateSettings(parsed.settings);
          }
          setImportStatus('success');
          setTimeout(() => setImportStatus('idle'), 3000);
        } else {
          setImportStatus('error');
          setTimeout(() => setImportStatus('idle'), 3000);
        }
      } catch (err) {
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };
    reader.readAsText(file);
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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'en' ? 'System & Laboratory Settings' : 'Pengaturan Sistem & Laboratorium'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Aetheria Platform v{APP_VERSION_DATA.version}
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

          {/* Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => setActiveTab('appearance')}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'appearance'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Display & Language' : 'Tampilan & Bahasa'}</span>
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'glossary'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Glossary & Tooltips' : 'Glosarium & Tooltip'}</span>
            </button>

            <button
              onClick={() => setActiveTab('simulation')}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'simulation'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{language === 'en' ? '3D Engine & Physics' : 'Mesin 3D & Fisika'}</span>
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'data'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Data & Backup' : 'Data & Cadangan'}</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-900 dark:text-slate-100">
            {/* 1. APPEARANCE & DISPLAY TAB */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                {/* Language Selection */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-500" />
                    <span>{language === 'en' ? 'Platform Language' : 'Bahasa Platform'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        language === 'en'
                          ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">English (US)</div>
                        <div className="text-[11px] text-slate-500">Standard Scientific English</div>
                      </div>
                      {language === 'en' && <Check className="w-4 h-4 text-sky-500" />}
                    </button>

                    <button
                      onClick={() => setLanguage('id')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        language === 'id'
                          ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">Bahasa Indonesia</div>
                        <div className="text-[11px] text-slate-500">Terminologi Sains Indonesia</div>
                      </div>
                      {language === 'id' && <Check className="w-4 h-4 text-sky-500" />}
                    </button>
                  </div>
                </div>

                {/* Theme Mode */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>{language === 'en' ? 'Visual Theme' : 'Tema Visual'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        theme === 'light'
                          ? 'border-sky-500 bg-sky-50/50 text-sky-900 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Sun className="w-5 h-5 text-amber-500" />
                        <div>
                          <div className="text-sm font-bold">
                            {language === 'en' ? 'Light Laboratory' : 'Mode Terang (Laboratorium)'}
                          </div>
                          <div className="text-[11px] text-slate-500">Default clean high-contrast</div>
                        </div>
                      </div>
                      {theme === 'light' && <Check className="w-4 h-4 text-sky-500" />}
                    </button>

                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        theme === 'dark'
                          ? 'border-sky-500 bg-sky-950/40 text-sky-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-indigo-400" />
                        <div>
                          <div className="text-sm font-bold">
                            {language === 'en' ? 'Dark Obsidian' : 'Mode Gelap (Obsidian)'}
                          </div>
                          <div className="text-[11px] text-slate-500">Low-light laboratory study</div>
                        </div>
                      </div>
                      {theme === 'dark' && <Check className="w-4 h-4 text-sky-500" />}
                    </button>
                  </div>
                </div>

                {/* Default Reading Text Scale */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-500" />
                    <span>{language === 'en' ? 'Default Theory Reader Text Scale' : 'Ukuran Teks Modul Teori'}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(['sm', 'base', 'lg'] as const).map((size) => {
                      const labels = {
                        sm: { en: 'Compact (14px)', id: 'Kompak (14px)' },
                        base: { en: 'Standard (16px)', id: 'Standar (16px)' },
                        lg: { en: 'Comfort (18px)', id: 'Besar (18px)' },
                      };
                      const active = settings?.readerFontSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => updateSettings({ readerFontSize: size })}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 font-bold text-sky-900 dark:text-sky-200'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs font-bold">{labels[size][language]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. GLOSSARY & TOOLTIPS TAB */}
            {activeTab === 'glossary' && (
              <div className="space-y-6">
                {/* Highlighting Mode */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{language === 'en' ? 'Scientific Term Highlighting' : 'Sorotan Istilah Ilmiah'}</span>
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'en'
                      ? 'Controls how complex scientific terms are visually marked inside theory modules.'
                      : 'Mengatur bagaimana istilah sains kompleks ditandai secara visual di dalam teks teori.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'enabled', label: { en: 'Active & Highlighted', id: 'Aktif & Bergaris' }, desc: { en: 'Dashed underline with instant hover card', id: 'Garis bawah & kartu interaktif' } },
                      { id: 'subtle', label: { en: 'Subtle Dotted', id: 'Garis Titik Halus' }, desc: { en: 'Minimal dotted underline', id: 'Garis bawah titik minimalis' } },
                      { id: 'disabled', label: { en: 'Plain Text', id: 'Teks Biasa' }, desc: { en: 'No term underlines', id: 'Tanpa garis bawah istilah' } },
                    ].map((opt) => {
                      const active = settings?.glossaryHighlighting === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => updateSettings({ glossaryHighlighting: opt.id as any })}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            active
                              ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs font-bold">{opt.label[language]}</div>
                          <div className="text-[11px] text-slate-500 mt-1">{opt.desc[language]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Interaction Trigger */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-sky-500" />
                    <span>{language === 'en' ? 'Tooltip Activation Trigger' : 'Pemicu Munculnya Tooltip'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateSettings({ glossaryTrigger: 'hover' })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        settings?.glossaryTrigger !== 'click'
                          ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 font-bold text-sky-900 dark:text-sky-200'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold">
                        {language === 'en' ? 'Hover & Click (Recommended)' : 'Arahkan Kursor & Klik'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'en' ? 'Opens on mouse hover, taps on mobile' : 'Terbuka saat hover di desktop / tap di ponsel'}
                      </div>
                    </button>

                    <button
                      onClick={() => updateSettings({ glossaryTrigger: 'click' })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        settings?.glossaryTrigger === 'click'
                          ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 font-bold text-sky-900 dark:text-sky-200'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold">
                        {language === 'en' ? 'Click Only' : 'Hanya Saat Diklik'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'en' ? 'Requires explicit tap/click' : 'Hanya muncul saat tombol istilah diklik'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Pronunciation Audio */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-emerald-500" />
                      <span>{language === 'en' ? 'Pronunciation Audio Assistant' : 'Asisten Suara Pengucapan Istilah'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {language === 'en'
                        ? 'Includes speaker button in glossary cards to pronounce complex Latin & Greek terms.'
                        : 'Menyediakan tombol suara untuk melafalkan istilah ilmiah Latin & Yunani.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.speechAudioEnabled !== false}
                    onChange={(e) => updateSettings({ speechAudioEnabled: e.target.checked })}
                    className="w-5 h-5 rounded accent-sky-500 cursor-pointer"
                  />
                </div>

                {/* Open Full Lexicon Action */}
                {onOpenGlossary && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {language === 'en' ? 'Scientific Terminology Lexicon' : 'Glosarium Lengkap Aetheria'}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'en'
                          ? 'Browse, search, and study all indexed terms across all three disciplines.'
                          : 'Jelajahi dan cari seluruh istilah di ketiga disiplin ilmu.'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenGlossary();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-bold hover:bg-sky-400 transition-colors cursor-pointer"
                    >
                      {language === 'en' ? 'Open Lexicon' : 'Buka Glosarium'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. 3D ENGINE & PHYSICS TAB */}
            {activeTab === 'simulation' && (
              <div className="space-y-6">
                {/* GPU Info Card */}
                <div className="p-4 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-2 font-mono">
                  <div className="flex items-center justify-between text-xs text-sky-400 font-bold uppercase">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4" />
                      {language === 'en' ? 'Hardware Graphics Adapter' : 'Deteksi Perangkat Keras'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-400">
                      {isWebGPUSupported ? 'WebGPU' : 'WebGL2'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">{gpuRendererInfo}</div>
                </div>

                {/* Graphics Quality */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'en' ? 'Graphics & Frame Rate Target' : 'Kualitas Grafis & Target FPS'}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'high', label: { en: 'High (60 FPS)', id: 'Tinggi (60 FPS)' }, desc: { en: 'Full shaders & anti-aliasing', id: 'Shader penuh & anti-aliasing' } },
                      { id: 'balanced', label: { en: 'Balanced', id: 'Seimbang' }, desc: { en: 'Standard post-processing', id: 'Pemrosesan standar' } },
                      { id: 'performance', label: { en: 'Battery Saver', id: 'Hemat Baterai' }, desc: { en: 'Reduced pixel ratio', id: 'Rasio piksel ringan' } },
                    ].map((q) => {
                      const active = (settings?.graphicsQuality || 'high') === q.id;
                      return (
                        <button
                          key={q.id}
                          onClick={() => updateSettings({ graphicsQuality: q.id as any })}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="text-xs font-bold">{q.label[language]}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{q.desc[language]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Particle Density */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-500" />
                    <span>{language === 'en' ? 'Particle Simulation Density' : 'Kerapatan Partikel Simulasi'}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[100, 75, 50].map((density) => {
                      const active = (settings?.particleDensity || 100) === density;
                      return (
                        <button
                          key={density}
                          onClick={() => updateSettings({ particleDensity: density })}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 font-bold text-sky-900 dark:text-sky-200'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="text-xs font-bold">{density}%</div>
                          <div className="text-[10px] text-slate-500">
                            {density === 100 ? (language === 'en' ? 'Full Physics' : 'Fisika Penuh') : `${density}% Cloud`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Auto Rotate 3D */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <RotateCw className="w-4 h-4 text-indigo-500" />
                      <span>{language === 'en' ? 'Default 3D Auto-Rotation' : 'Rotasi Otomatis 3D'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {language === 'en'
                        ? 'Slowly rotates 3D models when camera is idle.'
                        : 'Memutar model 3D perlahan saat kamera sedang diam.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.autoRotate3D !== false}
                    onChange={(e) => updateSettings({ autoRotate3D: e.target.checked })}
                    className="w-5 h-5 rounded accent-sky-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 4. DATA & BACKUP TAB */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                {/* Learner Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Learner Full Name (For Certificate)' : 'Nama Lengkap Peserta (Untuk Sertifikat)'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => setUserName(nameInput)}
                      className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      {language === 'en' ? 'Save' : 'Simpan'}
                    </button>
                  </div>
                </div>

                {/* Export & Import Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Backup & Synchronization' : 'Cadangan & Sinkronisasi'}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleExportData}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-3 transition-colors text-left cursor-pointer"
                    >
                      <Download className="w-5 h-5 text-sky-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {language === 'en' ? 'Export Progress JSON' : 'Ekspor Cadangan JSON'}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {language === 'en' ? 'Download verified learning backup' : 'Unduh berkas cadangan progres'}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-3 transition-colors text-left cursor-pointer"
                    >
                      <Upload className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {language === 'en' ? 'Import Progress JSON' : 'Impor Cadangan JSON'}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {language === 'en' ? 'Restore from previous backup' : 'Pulihkan data dari berkas'}
                        </div>
                      </div>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {importStatus === 'success' && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>{language === 'en' ? 'Progress restored successfully!' : 'Progres berhasil dipulihkan!'}</span>
                    </div>
                  )}
                  {importStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{language === 'en' ? 'Invalid JSON backup format.' : 'Format berkas JSON tidak valid.'}</span>
                    </div>
                  )}
                </div>

                {/* Danger Zone: Reset Settings & Data */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{language === 'en' ? 'Reset Options' : 'Pilihan Pengaturan Ulang'}</span>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        resetSettings();
                        setShowSettingsResetConfirm(true);
                        setTimeout(() => setShowSettingsResetConfirm(false), 2500);
                      }}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>
                        {showSettingsResetConfirm
                          ? language === 'en' ? 'Settings Reset to Default!' : 'Pengaturan Direset!'
                          : language === 'en' ? 'Reset Preferences' : 'Kembalikan Pengaturan'}
                      </span>
                    </button>

                    {!showResetConfirm ? (
                      <button
                        onClick={() => setShowResetConfirm(true)}
                        className="px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Clear Progress & Scores' : 'Hapus Semua Progres'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            resetProgress();
                            setShowResetConfirm(false);
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors cursor-pointer"
                        >
                          {language === 'en' ? 'Confirm Delete All' : 'Konfirmasi Hapus'}
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500 cursor-pointer"
                        >
                          {language === 'en' ? 'Cancel' : 'Batal'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{language === 'en' ? 'Settings saved automatically' : 'Pengaturan tersimpan otomatis'}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer hover:opacity-90"
            >
              {language === 'en' ? 'Close' : 'Tutup'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
