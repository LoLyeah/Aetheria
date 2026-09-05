'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { Language, Theme, TopicId, UserProgress, AppSettings } from '@/types/learning';
import { allTopics, allBadges, getModuleById } from '@/lib/content';

export type AppView = 'landing' | 'learn' | 'module' | 'progress' | 'settings';

interface LearningContextType {
  isHydrated: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  view: AppView;
  selectedTopicId: TopicId | null;
  selectedModuleId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userProgress: UserProgress;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
  importProgress: (jsonData: string) => boolean;
  navigateTo: (view: AppView, topicId?: TopicId | null, moduleId?: string) => void;
  markModuleComplete: (moduleId: string) => void;
  saveQuizScore: (moduleId: string, score: number) => void;
  saveNote: (moduleId: string, text: string) => void;
  toggleBookmark: (moduleId: string) => void;
  setUserName: (name: string) => void;
  resetProgress: () => void;
  isWebGPUSupported: boolean;
  gpuRendererInfo: string;
  totalCompletionPercentage: number;
}

const STORAGE_KEY_PROGRESS = 'aetheria_user_progress_v1';
const STORAGE_KEY_THEME = 'aetheria_theme_v1';
const STORAGE_KEY_LANG = 'aetheria_lang_v1';
const STORAGE_KEY_SETTINGS = 'aetheria_settings_v1';

export const defaultSettings: AppSettings = {
  readerFontSize: 'base',
  mathDisplayFormat: 'standard',
  glossaryHighlighting: 'enabled',
  glossaryTrigger: 'hover',
  speechAudioEnabled: true,
  graphicsQuality: 'high',
  particleDensity: 100,
  autoRotate3D: true,
  showFpsOverlay: false,
  soundEffects: true,
  autoAdvanceQuiz: false,
  physicsSpeed: 1.0,
  physicsEngine: 'verlet',
};

const defaultProgress: UserProgress = {
  completedModules: [],
  quizScores: {},
  quizAttempts: {},
  notes: {},
  bookmarks: [],
  userName: 'Student of Science',
  totalTimeMinutes: 45,
  badges: [],
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');
  const [settings, setSettingsState] = useState<AppSettings>(defaultSettings);
  const [view, setView] = useState<AppView>('landing');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean>(false);
  const [gpuRendererInfo, setGpuRendererInfo] = useState<string>('Initializing 3D Engine...');

  // Hydrate stored preferences on client mount only to eliminate SSR mismatches
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as Language | null;
        const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as Theme | null;
        const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
        const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);

        queueMicrotask(() => {
          if (savedLang === 'en' || savedLang === 'id') setLanguageState(savedLang);
          if (savedTheme === 'light' || savedTheme === 'dark') setThemeState(savedTheme);
          if (savedSettings) {
            try {
              setSettingsState({ ...defaultSettings, ...JSON.parse(savedSettings) });
            } catch {}
          }
          if (savedProgress) {
            try {
              setUserProgress(JSON.parse(savedProgress));
            } catch {}
          }
          // Support direct navigation and PWA shortcuts via URL search parameters
          try {
            const params = new URLSearchParams(window.location.search);
            const topicParam = params.get('topic') as TopicId | null;
            const moduleParam = params.get('module');
            const viewParam = params.get('view') as AppView | null;
            const validTopics: TopicId[] = [
              'quantum-mechanics',
              'fetus-development',
              'ev-battery',
              'pulmonology-pneumonia',
              'cardiac-arrest',
              'hypertension',
              'biomes-ecology',
            ];

            if (moduleParam) {
              const found = getModuleById(moduleParam);
              if (found) {
                setSelectedTopicId(found.topic.id);
                setSelectedModuleId(found.module.id);
                setView('module');
              }
            } else if (topicParam && validTopics.includes(topicParam)) {
              setSelectedTopicId(topicParam);
              if (viewParam === 'module') {
                const topic = allTopics.find((t) => t.id === topicParam);
                if (topic && topic.modules.length > 0) {
                  setSelectedModuleId(topic.modules[0].id);
                  setView('module');
                } else {
                  setView('learn');
                }
              } else {
                setView('learn');
              }
            } else if (viewParam === 'learn' || viewParam === 'settings') {
              setView(viewParam);
            }
          } catch {}
          setIsHydrated(true);
        });
      }
    } catch (e) {
      console.error('Storage hydration failed:', e);
      queueMicrotask(() => {
        setIsHydrated(true);
      });
    }
  }, []);

  // Sync theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // WebGPU & WebGL detector
  useEffect(() => {
    async function checkGPU() {
      if (typeof window === 'undefined') return;
      
      let webgpuAvailable = false;
      let infoString = 'WebGL2 Accelerated';

      if ('gpu' in navigator && (navigator as any).gpu) {
        try {
          const adapter = await (navigator as any).gpu.requestAdapter();
          if (adapter) {
            webgpuAvailable = true;
            const adapterInfo = (adapter as any).info || {};
            infoString = `WebGPU (${adapterInfo.vendor || 'Hardware Accelerated'})`;
          }
        } catch (err) {
          console.log('WebGPU check fallback to WebGL:', err);
        }
      }

      if (!webgpuAvailable) {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
          if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
              const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
              infoString = `WebGL2 (${renderer.replace(/ANGLE \(|Direct3D.*|Metal.*|\)/g, '').trim()})`;
            }
          }
        } catch (e) {
          infoString = 'Standard WebGL Engine';
        }
      }

      setIsWebGPUSupported(webgpuAvailable);
      setGpuRendererInfo(infoString);
    }

    checkGPU();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch (e) {}
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, newTheme);
    } catch (e) {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const saveProgressToStorage = (updated: UserProgress) => {
    setUserProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
    } catch (e) {}
  };

  const checkAndAwardBadges = (currentProgress: UserProgress): UserProgress => {
    const updatedBadges = [...currentProgress.badges];
    let changed = false;

    // First step badge
    if (currentProgress.completedModules.length >= 1 && !updatedBadges.includes('first-step')) {
      updatedBadges.push('first-step');
      changed = true;
    }

    // Specific topic master badges
    for (const badge of allBadges) {
      if (badge.requiredModuleIds && !updatedBadges.includes(badge.id)) {
        const hasAll = badge.requiredModuleIds.every((id) => currentProgress.completedModules.includes(id));
        if (hasAll) {
          updatedBadges.push(badge.id);
          changed = true;
        }
      }
    }

    // Grand polymath (all 31 modules across all 7 disciplines)
    const allModuleIds = allTopics.flatMap((t) => t.modules.map((m) => m.id));
    if (
      allModuleIds.every((id) => currentProgress.completedModules.includes(id)) &&
      !updatedBadges.includes('polymath')
    ) {
      updatedBadges.push('polymath');
      changed = true;
    }

    // Quiz Ace badge
    const hasPerfectScore = Object.values(currentProgress.quizScores).some((s) => s === 100);
    if (hasPerfectScore && !updatedBadges.includes('quiz-ace')) {
      updatedBadges.push('quiz-ace');
      changed = true;
    }

    if (changed) {
      return { ...currentProgress, badges: updatedBadges };
    }
    return currentProgress;
  };

  const markModuleComplete = (moduleId: string) => {
    setUserProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const updatedList = [...prev.completedModules, moduleId];
      const withCompleted = { ...prev, completedModules: updatedList };
      const finalized = checkAndAwardBadges(withCompleted);
      saveProgressToStorage(finalized);
      return finalized;
    });
  };

  const saveQuizScore = (moduleId: string, score: number) => {
    setUserProgress((prev) => {
      const existingScore = prev.quizScores[moduleId] || 0;
      const highestScore = Math.max(existingScore, score);
      const attempts = (prev.quizAttempts[moduleId] || 0) + 1;
      
      let updatedCompleted = prev.completedModules;
      if (score >= 70 && !prev.completedModules.includes(moduleId)) {
        updatedCompleted = [...prev.completedModules, moduleId];
      }

      const updated: UserProgress = {
        ...prev,
        completedModules: updatedCompleted,
        quizScores: {
          ...prev.quizScores,
          [moduleId]: highestScore,
        },
        quizAttempts: {
          ...prev.quizAttempts,
          [moduleId]: attempts,
        },
      };

      const finalized = checkAndAwardBadges(updated);
      saveProgressToStorage(finalized);
      return finalized;
    });
  };

  const saveNote = (moduleId: string, text: string) => {
    setUserProgress((prev) => {
      const updated = {
        ...prev,
        notes: {
          ...prev.notes,
          [moduleId]: text,
        },
      };
      saveProgressToStorage(updated);
      return updated;
    });
  };

  const toggleBookmark = (moduleId: string) => {
    setUserProgress((prev) => {
      const exists = prev.bookmarks.includes(moduleId);
      const updatedBookmarks = exists
        ? prev.bookmarks.filter((id) => id !== moduleId)
        : [...prev.bookmarks, moduleId];
      const updated = { ...prev, bookmarks: updatedBookmarks };
      saveProgressToStorage(updated);
      return updated;
    });
  };

  const setUserName = (name: string) => {
    setUserProgress((prev) => {
      const updated = { ...prev, userName: name };
      saveProgressToStorage(updated);
      return updated;
    });
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetSettings = () => {
    setSettingsState(defaultSettings);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(defaultSettings));
    } catch (e) {}
  };

  const importProgress = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.completedModules)) {
        const validated: UserProgress = {
          completedModules: parsed.completedModules || [],
          quizScores: parsed.quizScores || {},
          quizAttempts: parsed.quizAttempts || {},
          notes: parsed.notes || {},
          bookmarks: parsed.bookmarks || [],
          userName: parsed.userName || 'Student of Science',
          totalTimeMinutes: parsed.totalTimeMinutes || 45,
          badges: parsed.badges || [],
        };
        saveProgressToStorage(validated);
        return true;
      }
    } catch (e) {
      console.error('Failed to import progress JSON:', e);
    }
    return false;
  };

  const resetProgress = () => {
    setUserProgress(defaultProgress);
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch (e) {}
  };

  const navigateTo = (newView: AppView, topicId?: TopicId | null, moduleId?: string) => {
    setView(newView);
    if (newView === 'learn') {
      if (topicId === undefined || topicId === null) {
        setSelectedTopicId(null);
        setSelectedModuleId(null);
      } else {
        setSelectedTopicId(topicId);
      }
    } else if (newView === 'landing') {
      setSelectedTopicId(null);
      setSelectedModuleId(null);
    } else if (topicId !== undefined) {
      setSelectedTopicId(topicId);
    }

    if (moduleId) {
      setSelectedModuleId(moduleId);
      const info = getModuleById(moduleId);
      if (info) setSelectedTopicId(info.topic.id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCompletionPercentage = useMemo(() => {
    const totalCount = allTopics.reduce((acc, t) => acc + t.modules.length, 0);
    if (totalCount === 0) return 0;
    return Math.round((userProgress.completedModules.length / totalCount) * 100);
  }, [userProgress.completedModules]);

  return (
    <LearningContext.Provider
      value={{
        isHydrated,
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        view,
        selectedTopicId,
        selectedModuleId,
        searchQuery,
        setSearchQuery,
        userProgress,
        settings,
        updateSettings,
        resetSettings,
        importProgress,
        navigateTo,
        markModuleComplete,
        saveQuizScore,
        saveNote,
        toggleBookmark,
        setUserName,
        resetProgress,
        isWebGPUSupported,
        gpuRendererInfo,
        totalCompletionPercentage,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = (): LearningContextType => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
