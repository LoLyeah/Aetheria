'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import {
  Sun,
  Moon,
  Award,
  Search,
  ChevronRight,
  Atom,
  Menu,
  X,
  Settings,
  BookOpen,
  Download,
} from 'lucide-react';
import { getAllModules } from '@/lib/content';
import { APP_VERSION_DATA } from '@/lib/version';
import { usePWA } from '@/hooks/usePWA';

export const Navbar: React.FC<{
  onOpenProgress: () => void;
  onOpenVersion?: () => void;
  onOpenSettings?: () => void;
  onOpenGlossary?: () => void;
}> = ({ onOpenProgress, onOpenVersion, onOpenSettings, onOpenGlossary }) => {
  const {
    isHydrated,
    language,
    setLanguage,
    theme,
    toggleTheme,
    view,
    navigateTo,
    searchQuery,
    setSearchQuery,
    totalCompletionPercentage,
  } = useLearning();

  const t = translations[language];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [installFeedback, setInstallFeedback] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { isInstalled, installApp } = usePWA();

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleInstallClick = async () => {
    const outcome = await installApp();
    if (outcome === 'ios') {
      setInstallFeedback(t.pwa.iosGuide);
      setTimeout(() => setInstallFeedback(null), 6000);
    } else if (outcome === 'accepted') {
      setInstallFeedback(t.pwa.installedSuccess);
      setTimeout(() => setInstallFeedback(null), 4000);
    } else if (outcome === 'unsupported') {
      setInstallFeedback(t.pwa.unsupportedGuide);
      setTimeout(() => setInstallFeedback(null), 6000);
    }
  };

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
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shadow-2xs group-hover:scale-105 transition-transform">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white block font-mono">
                {t.brandName}
              </span>
              <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400 block -mt-1 tracking-wider uppercase font-mono">
                3D Science Lab
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => navigateTo('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                view === 'landing'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => navigateTo('learn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                view === 'learn' || view === 'module'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.nav.topics}
            </button>
            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                <span>{language === 'en' ? 'Glossary' : 'Glosarium'}</span>
              </button>
            )}
            <button
              onClick={onOpenProgress}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.nav.myProgress}</span>
              {isHydrated && totalCompletionPercentage > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                  {totalCompletionPercentage}%
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Global Search Input & Dropdown */}
        {/* Global Search Input with Cmd+K Shortcut */}
        <div className="hidden lg:block relative w-64 xl:w-72">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              aria-label={t.nav.searchPlaceholder}
              placeholder={`${t.nav.searchPlaceholder}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-12 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-slate-300 dark:focus:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold text-slate-400 bg-slate-200/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600 pointer-events-none">
              ⌘K
            </kbd>
          </div>

          {/* Search Dropdown with AnimatePresence */}
          <AnimatePresence>
            {searchQuery.trim() && isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
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
                      className="w-full p-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {module.title[language]}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {topic.title[language]} • {language === 'en' ? `Part ${module.order}` : `Bagian ${module.order}`}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Install PWA Button */}
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              aria-label={t.pwa.installTitle}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer text-xs font-semibold"
              title={t.pwa.installTitle}
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden xl:inline">{t.nav.installApp}</span>
            </button>
          )}

          {/* Settings Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              aria-label={language === 'en' ? 'System & Learning Settings' : 'Pengaturan Sistem & Belajar'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer"
              title={language === 'en' ? 'System & Learning Settings' : 'Pengaturan Sistem & Belajar'}
            >
              <Settings className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </button>
          )}

          {/* Language Toggle (EN / ID) */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold font-mono">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer"
            title={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Primary Action Button */}
          {view === 'landing' ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('learn')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 shadow-2xs transition-all cursor-pointer"
            >
              <span>{t.nav.getStarted}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onOpenProgress}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono">{isHydrated ? totalCompletionPercentage : 0}%</span>
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-3 overflow-hidden"
          >
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
              {onOpenGlossary && (
                <button
                  onClick={() => {
                    onOpenGlossary();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                  <span>{language === 'en' ? 'Scientific Glossary' : 'Glosarium Sains'}</span>
                </button>
              )}
              {onOpenSettings && (
                <button
                  onClick={() => {
                    onOpenSettings();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>{language === 'en' ? 'Settings & Preferences' : 'Pengaturan & Preferensi'}</span>
                </button>
              )}
              <button
                onClick={() => {
                  onOpenProgress();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>{t.nav.myProgress}</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">{totalCompletionPercentage}%</span>
              </button>

              {!isInstalled && (
                <button
                  onClick={() => {
                    handleInstallClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 text-left rounded-lg text-xs font-semibold bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-200 flex items-center justify-between border border-sky-200/60 dark:border-sky-800/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-sky-500" />
                    <span>{t.nav.installApp}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase bg-sky-100 dark:bg-sky-900/70 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded">
                    PWA
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Feedback Notification */}
      <AnimatePresence>
        {installFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-4 max-w-sm p-3.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs shadow-2xl border border-slate-800 dark:border-slate-200 z-50 flex items-start gap-2.5"
          >
            <Download className="w-4 h-4 text-sky-400 dark:text-sky-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed font-sans">{installFeedback}</div>
            <button
              onClick={() => setInstallFeedback(null)}
              className="text-slate-400 hover:text-white dark:hover:text-slate-900 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
