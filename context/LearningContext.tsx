'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { Language, Theme, TopicId, UserProgress } from '@/types/learning';
import { allTopics, allBadges, getModuleById } from '@/lib/content';

export type AppView = 'landing' | 'learn' | 'module' | 'progress';

interface LearningContextType {
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
  navigateTo: (view: AppView, topicId?: TopicId, moduleId?: string) => void;
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
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_LANG) as Language | null;
      if (saved === 'en' || saved === 'id') return saved;
    }
    return 'en';
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_THEME) as Theme | null;
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light'; // light mode default per prompt
  });
  const [view, setView] = useState<AppView>('landing');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId | null>('quantum-mechanics');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultProgress;
        }
      }
    }
    return defaultProgress;
  });
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean>(false);
  const [gpuRendererInfo, setGpuRendererInfo] = useState<string>('Initializing 3D Engine...');

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

    // Grand polymath (all 12 modules)
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

  const resetProgress = () => {
    setUserProgress(defaultProgress);
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch (e) {}
  };

  const navigateTo = (newView: AppView, topicId?: TopicId, moduleId?: string) => {
    setView(newView);
    if (topicId) setSelectedTopicId(topicId);
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
