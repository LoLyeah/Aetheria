export type Language = 'en' | 'id';
export type Theme = 'light' | 'dark';

export type TopicId = 'quantum-mechanics' | 'fetus-development' | 'ev-battery';

export interface QuizQuestion {
  id: string;
  question: {
    en: string;
    id: string;
  };
  options: {
    en: string[];
    id: string[];
  };
  correctAnswerIndex: number;
  explanation: {
    en: string;
    id: string;
  };
}

export interface ModuleSection {
  id: string;
  title: {
    en: string;
    id: string;
  };
  content: {
    en: string;
    id: string;
  };
  formula?: string;
  formulaExplanation?: {
    en: string;
    id: string;
  };
  keyTakeaways: {
    en: string[];
    id: string[];
  };
}

export type InteractiveLabType =
  | 'orbital-cloud'
  | 'double-slit'
  | 'quantum-tunneling'
  | 'bloch-sphere'
  | 'embryo-timeline'
  | 'ultrasound-scan'
  | 'cell-cross-section'
  | 'ev-powertrain';

export interface LearningModule {
  id: string;
  topicId: TopicId;
  order: number; // 1, 2, 3, 4 - Part sequence
  title: {
    en: string;
    id: string;
  };
  shortDescription: {
    en: string;
    id: string;
  };
  durationMinutes: number;
  interactiveType: InteractiveLabType;
  sections: ModuleSection[];
  quiz: QuizQuestion[];
  difficulty?: string;
  difficultyId?: string;
}

export interface Topic {
  id: TopicId;
  title: {
    en: string;
    id: string;
  };
  tagline: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  category: {
    en: string;
    id: string;
  };
  colorAccent: string; // Tailwind color class or hex
  badgeColor: string;
  iconName: string;
  modules: LearningModule[];
}

export interface UserProgress {
  completedModules: string[]; // module IDs
  quizScores: Record<string, number>; // moduleId -> percentage score (0 - 100)
  quizAttempts: Record<string, number>;
  notes: Record<string, string>; // moduleId -> markdown notes
  bookmarks: string[]; // module IDs
  lastAccessedModuleId?: string;
  userName: string;
  totalTimeMinutes: number;
  badges: string[]; // badge IDs
}

export interface Badge {
  id: string;
  title: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  icon: string;
  requiredModuleIds?: string[];
  requiredScore?: number;
}
