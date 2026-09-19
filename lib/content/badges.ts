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
    id: 'biosphere-master',
    title: {
      en: 'Biosphere Ecologist',
      id: 'Pakar Ekologi Biosfer',
    },
    description: {
      en: 'Completed all 7 modules in Global Biomes, Climatology & Ecosystem Dynamics.',
      id: 'Menyelesaikan seluruh 7 modul dalam Bioma Global, Klimatologi & Dinamika Ekosistem.',
    },
    icon: 'Globe',
    requiredModuleIds: [
      'biome-mod-1',
      'biome-mod-2',
      'biome-mod-3',
      'biome-mod-4',
      'biome-mod-5',
      'biome-mod-6',
      'biome-mod-7',
    ],
  },
  {
    id: 'hybrid-master',
    title: {
      en: 'Hybrid Powertrain Architect',
      id: 'Arsitek Powertrain Hibrida',
    },
    description: {
      en: 'Completed all 5 modules in Hybrid Electric Vehicles & Powertrain Electrification.',
      id: 'Menyelesaikan seluruh 5 modul dalam Kendaraan Listrik Hibrida & Elektrifikasi Powertrain.',
    },
    icon: 'Car',
    requiredModuleIds: ['hyb-mod-1', 'hyb-mod-2', 'hyb-mod-3', 'hyb-mod-4', 'hyb-mod-5'],
  },
  {
    id: 'bess-master',
    title: {
      en: 'Grid Storage Architect',
      id: 'Arsitek Penyimpanan Jaringan & BESS',
    },
    description: {
      en: 'Completed all 5 modules in Battery Storage Technologies & Next-Generation Chemistries.',
      id: 'Menyelesaikan seluruh 5 modul dalam Teknologi Penyimpanan Baterai & Kimia Generasi Masa Depan.',
    },
    icon: 'BatteryCharging',
    requiredModuleIds: ['bess-mod-1', 'bess-mod-2', 'bess-mod-3', 'bess-mod-4', 'bess-mod-5'],
  },
  {
    id: 'nuclear-master',
    title: {
      en: 'Nuclear Reactor Physicist',
      id: 'Fisikawan Reaktor Nuklir',
    },
    description: {
      en: 'Completed all 5 modules in Nuclear Reactor Physics, Advanced Architectures & Disaster Mitigation.',
      id: 'Menyelesaikan seluruh 5 modul dalam Fisika Reaktor Nuklir, Arsitektur Mutakhir & Mitigasi Bencana.',
    },
    icon: 'ShieldAlert',
    requiredModuleIds: ['nuc-mod-1', 'nuc-mod-2', 'nuc-mod-3', 'nuc-mod-4', 'nuc-mod-5'],
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
      en: 'Completed all 46 modules across all 10 foundational scientific disciplines.',
      id: 'Menyelesaikan seluruh 46 modul di kesepuluh disiplin ilmu sains dasar.',
    },
    icon: 'GraduationCap',
  },
];

export const BADGES_CATALOG = allBadges;
