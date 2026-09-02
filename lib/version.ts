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
  version: '1.0.8',
  major: 1,
  minor: 0,
  patch: 8,
  releaseDate: '2026-09-02',
  buildNumber: 'build.20260902.08',
  environment: 'production',
  changelog: [
    {
      version: '1.0.8',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: '60 FPS Simulation Animation Loop Optimization & Smooth Settings Transitions',
        id: 'Optimasi Loop Animasi Simulasi 60 FPS & Transisi Halus Pengaturan',
      },
      highlights: {
        en: [
          'Decoupled WebGL rendering contexts from dynamic component state (isRotating, cRate, wavelength, detectorActive) using mutable refs to eliminate frame stutter and prevent canvas rebuilds.',
          'Throttled Double-Slit quantum hit state dispatches to 5 Hz instead of 60 Hz to avoid React component thrashing.',
          'Integrated motion cross-fade animations across all Settings tabs and fixed container height to prevent any layout jumping.',
        ],
        id: [
          'Memisahkan konteks render WebGL dari state dinamis komponen menggunakan mutable ref untuk mengeliminasi lag dan mencegah inisialisasi ulang kanvas.',
          'Membatasi update state hit interferensi celah ganda menjadi 5 Hz dari 60 Hz untuk mencegah beban render berlebih di React.',
          'Mengintegrasikan animasi motion halus di seluruh tab Pengaturan dan menetapkan tinggi kontainer tetap.',
        ],
      },
    },
    {
      version: '1.0.7',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Fixed Embryonic Optic Vesicle & Cranium Mesh Coordinate Anchor',
        id: 'Memperbaiki Penahan Koordinat Vesikel Optik & Mesh Cranium Embrio',
      },
      highlights: {
        en: [
          'Corrected optic vesicle (eye) placement by anchoring coordinates directly relative to the cranium surface geometry.',
          'Prevented optic spheres from floating or dislocating during stage scaling transitions from Week 8 to Week 36.',
        ],
        id: [
          'Memperbaiki penempatan vesikel optik (mata) dengan menambatkan koordinat langsung relatif terhadap geometri permukaan kranium.',
          'Mencegah bola mata melayang atau terdislokasi selama transisi skala tahap dari Minggu 8 ke Minggu 36.',
        ],
      },
    },
    {
      version: '1.0.6',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Resolved Sub-Header Scrolling Overlap in Module Viewer',
        id: 'Memperbaiki Tumpang Tindih Gulir Sub-Header di Penampil Modul',
      },
      highlights: {
        en: [
          'Removed sticky positioning constraint from module breadcrumbs and tabs bar, eliminating clipping and overlaps over 3D lab canvas titles.',
          'Maintained full viewport height and natural scroll behavior across all interactive simulations, theory reader, and quizzes.',
        ],
        id: [
          'Menghapus posisi sticky pada bilah remah roti dan tab modul, menghilangkan pemotongan dan tumpang tindih pada judul kanvas lab 3D.',
          'Mempertahankan tinggi viewport maksimal dan perilaku gulir alami di seluruh simulasi interaktif, pembaca teori, dan kuis.',
        ],
      },
    },
    {
      version: '1.0.5',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Telemetry Matrix Layout Optimization & Layer Isolation',
        id: 'Optimasi Tata Letak Matriks Telemetri & Isolasi Lapisan UI',
      },
      highlights: {
        en: [
          'Repositioned 3D Telemetry HUD to an unobtrusive floating position with an instant dismiss close button, ensuring no discipline or stage controls are ever covered.',
          'Configured Telemetry matrix overlay to be collapsed by default with an active status toggle in the top stage bar.',
          'Elevated discipline selector pills and bottom interactive toolbars to z-index 30 to guarantee unobstructed clickability across all device viewports.',
        ],
        id: [
          'Memindahkan HUD Telemetri 3D ke posisi mengambang yang rapi dengan tombol tutup instan, memastikan tidak ada tombol disiplin atau kontrol panggung yang tertutup.',
          'Menyetel overlay matriks Telemetri dalam keadaan tertutup secara default dengan tombol alih status aktif di bilah atas panggung.',
          'Meningkatkan pil pemilih disiplin dan bilah kontrol bawah ke z-index 30 untuk menjamin kemudahan klik di semua ukuran layar.',
        ],
      },
    },
    {
      version: '1.0.4',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Header Cleanup, Scroll Alignment & Multi-Level Breadcrumbs',
        id: 'Pembersihan Header, Penyesuaian Gulir & Navigasi Bertingkat',
      },
      highlights: {
        en: [
          'Removed version indicator badge from top header (retained exclusively in footer and system settings).',
          'Resolved visual overlap by adding automatic instant scroll-to-top on module and tab switches.',
          'Added multi-level breadcrumb navigation in module viewer for fluid traversal to All Topics and Topic Curriculums.',
        ],
        id: [
          'Menghapus lencana versi dari header atas (tetap tersedia di footer dan pengaturan sistem).',
          'Memperbaiki tumpang tindih tampilan dengan mereset posisi gulir ke paling atas saat beralih modul atau tab.',
          'Menambahkan remah roti (breadcrumb) bertingkat pada penampil modul untuk navigasi instan ke Semua Topik dan Kurikulum.',
        ],
      },
    },
    {
      version: '1.0.3',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Standalone QuizComponent, Enhanced 3D Homepage Stage & Navigation Fixes',
        id: 'Komponen Kuis Terdedikasi, Panggung 3D Beranda & Perbaikan Navigasi',
      },
      highlights: {
        en: [
          'Modular QuizComponent with step-by-step progress, LaTeX formula support, hint reveals, detailed pedagogical explanations, and badge unlock triggers.',
          'Remade hardware-accelerated Homepage 3D Stage with orbit/zoom controls, explode cross-section anatomy, shader styles (Hologram, Solid PBR, Flux Field), and real-time scientific telemetry HUD.',
          'Resolved "Back to all topics" navigation state reset when browsing curriculum modules.',
        ],
        id: [
          'Komponen Kuis modular dengan pelacak progres bertahap, dukungan formula LaTeX, petunjuk konsep, penjelasan ilmiah mendalam, serta perolehan lencana otomatis.',
          'Panggung 3D Beranda baru dengan kontrol putar/perbesar interaktif, bedah anatomi bertingkat, mode shader (Hologram, PBR Padat, Medan Fluks), dan HUD telemetri ilmiah real-time.',
          'Perbaikan navigasi "Kembali ke Semua Topik" untuk mereset pilihan topik secara instan.',
        ],
      },
    },
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
