import { Badge } from '@/types/learning';

export const allBadges: Badge[] = [
  {
    id: 'first-step',
    title: {
      en: 'Quantum Spark',
      id: 'Percikan Kuantum',
    },
    description: {
      en: 'Completed your first interactive learning module.',
      id: 'Menyelesaikan modul pembelajaran interaktif pertamamu.',
    },
    icon: 'Sparkles',
  },
  {
    id: 'qm-master',
    title: {
      en: 'Quantum Theorist',
      id: 'Fisikawan Kuantum',
    },
    description: {
      en: 'Completed all 4 modules in Quantum Mechanics.',
      id: 'Menyelesaikan seluruh 4 modul dalam Mekanika Kuantum.',
    },
    icon: 'Atom',
    requiredModuleIds: ['qm-mod-1', 'qm-mod-2', 'qm-mod-3', 'qm-mod-4'],
  },
  {
    id: 'embryo-master',
    title: {
      en: 'Master of Embryogenesis',
      id: 'Ahli Embriogenesis',
    },
    description: {
      en: 'Completed all 4 modules in Embryonic & Fetal Development.',
      id: 'Menyelesaikan seluruh 4 modul dalam Perkembangan Janin & Embrio.',
    },
    icon: 'HeartPulse',
    requiredModuleIds: ['emb-mod-1', 'emb-mod-2', 'emb-mod-3', 'emb-mod-4'],
  },
  {
    id: 'ev-master',
    title: {
      en: 'Powertrain Architect',
      id: 'Arsitek Powertrain EV',
    },
    description: {
      en: 'Completed all 4 modules in EV Battery Technology.',
      id: 'Menyelesaikan seluruh 4 modul dalam Teknologi Baterai EV.',
    },
    icon: 'Zap',
    requiredModuleIds: ['bat-mod-1', 'bat-mod-2', 'bat-mod-3', 'bat-mod-4'],
  },
  {
    id: 'pne-master',
    title: {
      en: 'Pulmonary Pathophysiologist',
      id: 'Pakar Patofisiologi Pulmonal',
    },
    description: {
      en: 'Completed all 4 modules in Pneumonia & Pulmonary Pathophysiology.',
      id: 'Menyelesaikan seluruh 4 modul dalam Pneumonia & Patofisiologi Infeksi Pulmonal.',
    },
    icon: 'Activity',
    requiredModuleIds: ['pne-mod-1', 'pne-mod-2', 'pne-mod-3', 'pne-mod-4'],
  },
  {
    id: 'cardiac-master',
    title: {
      en: 'Resuscitation Cardiologist',
      id: 'Kardiolog Resusitasi',
    },
    description: {
      en: 'Completed all 4 modules in Cardiac Arrest & Acute Coronary Syndromes.',
      id: 'Menyelesaikan seluruh 4 modul dalam Henti Jantung & Sindrom Koroner Akut.',
    },
    icon: 'HeartCrack',
    requiredModuleIds: ['cardiac-mod-1', 'cardiac-mod-2', 'cardiac-mod-3', 'cardiac-mod-4'],
  },
  {
    id: 'hypertension-master',
    title: {
      en: 'Vascular Hemodynamicist',
      id: 'Pakar Hemodinamika Vaskular',
    },
    description: {
      en: 'Completed all 4 modules in Hypertension & Vascular Hemodynamics.',
      id: 'Menyelesaikan seluruh 4 modul dalam Hipertensi & Hemodinamika Vaskular.',
    },
    icon: 'Gauge',
    requiredModuleIds: ['hyp-mod-1', 'hyp-mod-2', 'hyp-mod-3', 'hyp-mod-4'],
  },
  {
    id: 'quiz-ace',
    title: {
      en: 'Academic Excellence',
      id: 'Kecemerlangan Akademik',
    },
    description: {
      en: 'Achieved a perfect 100% score on any module checkpoint quiz.',
      id: 'Meraih skor sempurna 100% pada salah satu kuis evaluasi modul.',
    },
    icon: 'Trophy',
    requiredScore: 100,
  },
  {
    id: 'polymath',
    title: {
      en: 'Aetheria Grand Polymath',
      id: 'Polimat Agung Aetheria',
    },
    description: {
      en: 'Completed all 24 modules across all 6 foundational scientific disciplines.',
      id: 'Menyelesaikan seluruh 24 modul di keenam disiplin ilmu sains dasar.',
    },
    icon: 'GraduationCap',
  },
];

export const BADGES_CATALOG = allBadges;
