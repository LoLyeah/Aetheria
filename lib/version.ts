export interface VersionInfo {
  version: string;
  major: number;
  minor: number;
  patch: number;
  releaseDate: string;
  buildNumber: string;
  environment: string;
  changelog: {
    version: string;
    date: string;
    type: 'major' | 'minor' | 'patch';
    title: {
      en: string;
      id: string;
    };
    highlights: {
      en: string[];
      id: string[];
    };
  }[];
}

export const APP_VERSION_DATA: VersionInfo = {
  version: '1.0.2',
  major: 1,
  minor: 0,
  patch: 2,
  releaseDate: '2026-09-02',
  buildNumber: 'build.20260902.02',
  environment: 'production',
  changelog: [
    {
      version: '1.0.2',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Hover-Enabled Scientific Glossary & Global System Settings',
        id: 'Glosarium Sains Interaktif & Panel Pengaturan Sistem',
      },
      highlights: {
        en: [
          'Interactive scientific hover tooltips across all theory modules with real-world definitions and TTS pronunciation.',
          'Full-screen searchable Lexicon browser with discipline categorization and phonetic guides.',
          'Comprehensive Settings page with font scaling, 3D simulation quality toggles, particle count, and data export/import.',
          'Expanded and formatted theory principles with rigorous LaTeX equations and pedagogical step derivations.',
        ],
        id: [
          'Tooltip glosarium sains interaktif di seluruh modul teori dengan definisi faktual dan audio pelafalan.',
          'Panel Glosarium Sains lengkap yang dapat dicari dengan filter kategori dan panduan fonetik.',
          'Halaman Pengaturan lengkap: ukuran teks, kualitas simulasi 3D, jumlah partikel, serta ekspor/impor data progres.',
          'Pengayaan materi teori dan prinsip ilmiah dengan persamaan matematis terstruktur dan penurunan rumus langkah demi langkah.',
        ],
      },
    },
    {
      version: '1.0.0',
      date: '2026-09-02',
      type: 'major',
      title: {
        en: 'Initial Production Release (x.y.z Semantic Architecture)',
        id: 'Rilis Produksi Perdana (Arsitektur Semantik x.y.z)',
      },
      highlights: {
        en: [
          'Full-scale 3D interactive physics labs: Quantum Wavefunctions, Morphogenesis, EV Battery Dynamics.',
          'Bilingual English and Indonesian pedagogical curriculum with 12 structured parts.',
          'Checkpoint assessment system, accreditation certificates, and local progress persistence.',
          'Semantic versioning protocol (x.y.z) with automated commit-push bump automation.',
        ],
        id: [
          'Lab fisika interaktif 3D skala penuh: Fungsi Gelombang Kuantum, Morfogenesis Janin, Dinamika Baterai EV.',
          'Kurikulum pedagogis dwibahasa (Inggris & Indonesia) dengan 12 modul bertahap.',
          'Sistem evaluasi checkpoint kuis, sertifikat akreditasi terverifikasi, dan penyimpanan progres lokal.',
          'Protokol versioning semantik (x.y.z) dengan otomatisasi bump pada setiap komit dan push.',
        ],
      },
    },
    {
      version: '0.9.4',
      date: '2026-09-01',
      type: 'minor',
      title: {
        en: 'Editorial Anti-Slop UI & WebGPU Optimization',
        id: 'Redesain UI Anti-Slop Editorial & Optimasi WebGPU',
      },
      highlights: {
        en: [
          'Mathematical spacing and high-contrast typography hierarchy.',
          'Spring-assisted page and tab transitions using motion.',
          'WebGPU hardware detection and fallback shader rendering.',
        ],
        id: [
          'Penskalaan spasi matematis dan hierarki tipografi kontras tinggi.',
          'Transisi halaman dan tab mulus dengan motion berbasis pegas.',
          'Deteksi akselerasi WebGPU dan fallback shader grafis.',
        ],
      },
    },
    {
      version: '0.9.0',
      date: '2026-08-28',
      type: 'patch',
      title: {
        en: 'Core Physics Simulation Engines',
        id: 'Mesin Inti Simulasi Fisika 3D',
      },
      highlights: {
        en: [
          'Three.js real-time double slit particle-wave duality simulator.',
          '4680 jellyroll tabless battery electrochemical visualizer.',
          'Interactive embryonic cleavage cell division stage models.',
        ],
        id: [
          'Simulasi dualitas gelombang-partikel celah ganda Three.js.',
          'Visualisasi elektrokimia baterai silinder 4680 tabless.',
          'Model 3D tahapan pembelahan sel dan organogenesis janin.',
        ],
      },
    },
  ],
};

export const SEMVER_GUIDELINES = {
  major: {
    key: 'x',
    title: {
      en: 'Major Update (x.0.0)',
      id: 'Pembaruan Utama / Mayor (x.0.0)',
    },
    desc: {
      en: 'Triggered on architectural overhauls, new foundational science disciplines, or breaking curriculum restructuring.',
      id: 'Diterapkan saat perombakan arsitektur besar, penambahan disiplin sains baru, atau restrukturisasi kurikulum utama.',
    },
  },
  minor: {
    key: 'y',
    title: {
      en: 'Minor Update (x.y.0)',
      id: 'Pembaruan Fitur / Minor (x.y.0)',
    },
    desc: {
      en: 'Triggered when adding new module parts, extra 3D apparatus capabilities, or pedagogical tools.',
      id: 'Diterapkan saat penambahan modul belajar baru, fitur aparatus 3D tambahan, atau perangkat evaluasi baru.',
    },
  },
  patch: {
    key: 'z',
    title: {
      en: 'Patch Update (x.y.z)',
      id: 'Pembaruan Patch / Perbaikan (x.y.z)',
    },
    desc: {
      en: 'Triggered on every commit/push for bug fixes, physics calculation refinements, translation updates, and optimizations.',
      id: 'Diterapkan pada setiap commit/push untuk perbaikan bug, penyempurnaan kalkulasi fisika, penyesuaian teks, dan optimasi.',
    },
  },
};
