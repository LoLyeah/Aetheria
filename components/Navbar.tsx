'use client';

import React, { useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { WebGPUTestBadge } from './3d/WebGPUTestBadge';
import {
  Sun,
  Moon,
  Globe,
  Compass,
  BookOpen,
  Award,
  Search,
  ChevronRight,
  Atom,
  HeartPulse,
  Zap,
  Menu,
  X,
} from 'lucide-react';
import { allTopics, getAllModules } from '@/lib/content';

export const Navbar: React.FC<{ onOpenProgress: () => void }> = ({ onOpenProgress }) => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    view,
    navigateTo,
    searchQuery,
    setSearchQuery,
    totalCompletionPercentage,
    userProgress,
  } = useLearning();

  const t = translations[language];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search Results
  const allModulesList = getAllModules();
  const searchResults = searchQuery.trim()
    ? allModulesList.filter(
        ({ topic, module }) =>
          module.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.shortDescription[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.title[language].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Atom className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white block font-mono">
                {t.brandName}
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block -mt-1 tracking-wider uppercase">
                3D Science Lab
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => navigateTo('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                view === 'landing'
                  ? 'bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => navigateTo('learn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                view === 'learn' || view === 'module'
                  ? 'bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.nav.topics}
            </button>
            <button
              onClick={onOpenProgress}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.nav.myProgress}</span>
              {totalCompletionPercentage > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold">
                  {totalCompletionPercentage}%
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Global Search Input & Quick Results */}
        <div className="hidden lg:block relative w-64 xl:w-72">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t.nav.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
          </div>

          {/* Instant Search Dropdown */}
          {searchQuery.trim() && isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {searchResults.length} {language === 'en' ? 'Modules Found' : 'Modul Ditemukan'}
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  {t.dashboard.searchNoResults}
                </div>
              ) : (
                searchResults.map(({ topic, module }) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      navigateTo('module', topic.id, module.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full p-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {module.title[language]}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {topic.title[language]}
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Action Controls: WebGPU, Bilingual Toggle, Theme Toggle, CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WebGPU Status Badge */}
          <div className="hidden sm:block">
            <WebGPUTestBadge compact />
          </div>

          {/* Language Toggle (EN / ID) */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold font-mono">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === 'id'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          {/* Theme Toggle Button (Light mode default per prompt) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
            title={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Primary Action Button */}
          {view === 'landing' ? (
            <button
              onClick={() => navigateTo('learn')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs shadow-sky-600/20 transition-all cursor-pointer"
            >
              <span>{t.nav.getStarted}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenProgress}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{totalCompletionPercentage}%</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('landing');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => {
                navigateTo('learn');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              {t.nav.topics}
            </button>
            <button
              onClick={() => {
                onOpenProgress();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <span>{t.nav.myProgress}</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{totalCompletionPercentage}%</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
