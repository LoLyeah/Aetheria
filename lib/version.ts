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
  version: '1.1.6',
  major: 1,
  minor: 1,
  patch: 6,
  releaseDate: '2026-09-04',
  buildNumber: 'build.20260904.06',
  environment: 'production',
  changelog: [
    {
      version: '1.1.5',
      date: '2026-09-04',
      type: 'patch',
      title: {
        en: 'Expansive Scientific Study Notes Workspace with Live KaTeX Preview',
        id: 'Ruang Kerja Catatan Belajar Sains Luas dengan Pratinjau Langsung KaTeX',
      },
      highlights: {
        en: [
          'Expanded study notes editor from narrow fixed card to full-width responsive scientific lab workspace (write, split, and preview modes).',
          'Integrated interactive scientific symbol palette (Greek letters, quantum/calculus operators, sub/superscripts, discipline formulas).',
          'Added live KaTeX mathematical formula rendering and rich Markdown support with tables, checklists, and code highlighting.',
          'Added distraction-free Zen Fullscreen mode, quick lab note templates, and one-click markdown note export/copy tools.',
        ],
        id: [
          'Memperluas editor catatan studi dari kartu sempit menjadi ruang kerja lab sains responsif selebar layar (mode tulis, split, dan pratinjau).',
          'Mengintegrasikan palet simbol sains interaktif (huruf Yunani, operator kuantum/kalkulus, sub/superscript, rumus disiplin ilmu).',
          'Menambahkan perenderan rumus matematika KaTeX langsung dan dukungan Markdown lengkap dengan tabel, checklist, dan penyorotan kode.',
          'Menambahkan mode Layar Penuh Zen bebas distraksi, templat catatan lab cepat, dan alat ekspor/salin catatan markdown 1-klik.',
        ],
      },
    },
    {
      version: '1.1.4',
      date: '2026-09-04',
      type: 'patch',
      title: {
        en: 'Progressive Web App (PWA) Standalone Installation & Vector App Icons',
        id: 'Pemasangan Mandiri Aplikasi Web Progresif (PWA) & Ikon Aplikasi Vektor',
      },
      highlights: {
        en: [
          'Generated multi-resolution favicon.ico (16, 32, 48px), adaptive SVG favicon with dark/light scheme support, and standard/maskable 192 & 512px app icons based on the slate-900 Atom brand logo.',
          'Configured standard Web App Manifest (display: standalone) with topic shortcuts and offline-capable Service Worker.',
          'Added global PWA installation store using useSyncExternalStore with 1-click install triggers in Navbar and Settings.',
          'Added URL search parameter topic routing to support PWA shortcuts directly from OS app launcher.',
        ],
        id: [
          'Membuat favicon.ico multi-resolusi (16, 32, 48px), favicon SVG adaptif skema terang/gelap, dan ikon aplikasi 192 & 512px (standar & maskable) berdasarkan logo Atom slate-900.',
          'Mengonfigurasi Manifest Aplikasi Web standar (tampilan: standalone) dengan pintasan topik dan Service Worker berkemampuan luring.',
          'Menambahkan state PWA global dengan useSyncExternalStore dan tombol pasang 1-klik di Navbar serta Pengaturan.',
          'Menambahkan perutean parameter URL topik untuk mendukung pintasan PWA langsung dari peluncur aplikasi sistem operasi.',
        ],
      },
    },
    {
      version: '1.1.3',
      date: '2026-09-04',
      type: 'patch',
      title: {
        en: 'Hero 3D Canvas Discipline Dropdown Selector & UI De-cluttering',
        id: 'Dropdown Pemilih Disiplin Kanvas 3D Hero & Pembersihan Tampilan',
      },
      highlights: {
        en: [
          'Replaced multi-row cluttered discipline button pills with a sleek, compact dropdown selector on the Hero 3D Canvas.',
          'Added smooth spring motion animation (motion/react) with glassmorphism backdrop blur styling.',
          'Integrated discipline category descriptions, scientific color badges, and active state indicators in English and Indonesian.',
          'Implemented click-outside detection and Escape key dismiss handlers for seamless accessibility.',
        ],
        id: [
          'Mengganti tombol pil disiplin multi-baris yang padat dengan pemilih dropdown ringkas dan elegan pada Kanvas 3D Hero.',
          'Menambahkan animasi pegas yang halus (motion/react) dengan efek visual glassmorphism backdrop blur.',
          'Mengintegrasikan deskripsi kategori disiplin, lencana warna sains autentik, dan indikator status aktif dalam Bahasa Inggris dan Bahasa Indonesia.',
          'Mengimplementasikan deteksi klik di luar menu dan penutup tombol Escape untuk aksesibilitas yang optimal.',
        ],
      },
    },
    {
      version: '1.1.2',
      date: '2026-09-04',
      type: 'patch',
      title: {
        en: 'Theory-First Pedagogical Flow & Module Tab Sequence Reorganization',
        id: 'Alur Pedagogis Teori-Pertama & Reorganisasi Urutan Tab Modul',
      },
      highlights: {
        en: [
          'Reordered workspace tabs to present Theory & Principles as the first default view ahead of the 3D Interactive Lab, aligning with STEM learning pedagogy.',
          'Configured automatic tab reset ensuring every module opens directly to Theory & Principles regardless of entry point.',
          'Added seamless post-theory progression button in TheoryReader prominently leading into the 3D Interactive Lab.',
          'Added interactive lab completion and transition card enabling smooth navigation between theory review and checkpoint quizzes.',
          'Updated module pagination and post-assessment flows to open following modules on the theory tab.',
        ],
        id: [
          'Mengatur ulang urutan tab ruang kerja untuk menampilkan Teori & Prinsip sebagai tampilan awal default sebelum Lab Interaktif 3D, selaras dengan pedagogi pembelajaran STEM.',
          'Mengonfigurasi reset tab otomatis untuk memastikan setiap modul selalu terbuka langsung pada tab Teori & Prinsip.',
          'Menambahkan tombol transisi terarah pada TheoryReader untuk mengarahkan pengguna langsung ke Lab Interaktif 3D setelah selesai membaca teori.',
          'Menambahkan bilah transisi interaktif di bawah Lab 3D untuk memudahkan siswa berpindah antara ulasan teori dan kuis evaluasi.',
          'Memperbarui paginasi modul dan alur pasca-kuis agar modul berikutnya selalu dimulai dari tab teori.',
        ],
      },
    },
    {
      version: '1.1.1',
      date: '2026-09-04',
      type: 'patch',
      title: {
        en: 'Human Embryology & Fetal Development 3D Simulator Full Overhaul',
        id: 'Perombakan Menyeluruh Simulator 3D Embriologi Manusia & Perkembangan Janin',
      },
      highlights: {
        en: [
          'Completely remade 3D Embryology Simulator with organic parametric lofting geometries, replacing primitive geometric models with authentic anatomical structures.',
          'Added Week 1 Cleavage Continuum sub-stage switcher: 1-Cell Zygote with pronuclei, 4-Cell Blastomere cleavage, 16-Cell Morula, and Cavitated Blastocyst with polarized trophectoderm and epiblast/hypoblast bilaminar embryonic disc.',
          'Accurately modeled Carnegie Stage 13 (Week 4 C-shaped embryo) with 30 somite pairs, pharyngeal arches 1 & 2, AER paddle buds, and looped primitive heart tube.',
          'Sculpted Carnegie Stage 23 (Week 8) with BMP-mediated digital ray apoptosis (5 separated fingers and toes), physiological umbilical midgut hernia, and pigmented retina.',
          'Enhanced Week 12, 20, and 36+ fetal stages with primary endochondral ossification centers, 4-chamber cardiac symmetry with the Three Fetal Circulatory Shunts (Ductus Venosus, Foramen Ovale, Ductus Arteriosus), vernix caseosa, and cephalic vertex presentation.',
          'Introduced interactive Biometric Calipers (CRL, BPD, HC, AC, FL) with obstetric scan plane auto-alignment, live millimeter measurements, and Hadlock gestational age calculation.',
          'Implemented universal PointerEvent touch interaction (drag rotation, two-finger pinch zoom), 3D hotspot raycasting with hover badges, and deep GPU memory disposal.',
          'Refined authentic B-mode USG Sonogram view with sector beam overlay and Pulsed Spectral Doppler hemodynamics with dual-beat S1/S2 Doppler audio synthesis.',
          'Ensured full bilingual standard across all UI elements, toolbars, HUD, and clinical notes in English and Indonesian.',
        ],
        id: [
          'Merombak total Simulator 3D Embriologi dengan geometri lofting parametrik organik, menggantikan model geometris primitif dengan struktur anatomi autentik.',
          'Menambahkan selektor tahap pembelahan Minggu 1: Zigot 1-Sel dengan pronukleus, pembelahan blastomer 4-sel, morula 16-sel, dan blastokista berkavitasi dengan trofoblas terpolarisasi serta lempeng bilaminar epiblas/hipoblas.',
          'Memodelkan Carnegie Stage 13 (embrio bentuk C Minggu 4) secara akurat dengan 30 pasang somit, lengkung faring 1 & 2, tunas anggota badan AER, dan tabung jantung berdenyut.',
          'Menyusun Carnegie Stage 23 (Minggu 8) dengan apoptosis sinar digital BMP (5 jari tangan dan kaki terpisah sempurna), hernia umbilikalis usus tengah fisiologis, dan retina berpigmen.',
          'Menyempurnakan tahap janin Minggu 12, 20, dan 36+ dengan pusat osifikasi endokondral primer, simetri jantung 4 ruang dengan Tiga Pirau Sirkulasi Janin (Duktus Venosus, Foramen Ovale, Duktus Arteriosus), verniks kaseosa, dan presentasi kepala verteks.',
          'Memperkenalkan alat Kaliper Biometri interaktif (CRL, BPD, HC, AC, FL) dengan perataan otomatis bidang USG obstetri, pembacaan milimeter langsung, dan formula usia kehamilan Hadlock.',
          'Mengimplementasikan interaksi sentuh PointerEvent universal (rotasi seret, zoom cubit dua jari), raycasting titik anatomi 3D dengan lencana hover, dan pembersihan memori GPU mendalam.',
          'Menyempurnakan tampilan Sonogram USG mode-B autentik dengan hamparan sorotan sektor dan hemodinamika Doppler Spektral Berdenyut dengan sintesis audio detak ganda S1/S2.',
          'Memastikan kepatuhan standar dwibahasa penuh di seluruh elemen UI, bilah alat, HUD, dan catatan klinis dalam Bahasa Inggris dan Bahasa Indonesia.',
        ],
      },
    },
    {
      version: '1.1.0',
      date: '2026-09-04',
      type: 'minor',
      title: {
        en: 'Cardiology (Cardiac Arrest & ACS) and Vascular Hypertension Curriculum Expansion',
        id: 'Ekspansi Kurikulum Kardiologi (Henti Jantung & SKA) serta Hipertensi Vaskular',
      },
      highlights: {
        en: [
          'Added Cardiac Arrest & Acute Coronary Syndromes topic: STEMI, NSTEMI, Stable/Unstable/Prinzmetal Angina, 4 primary arrest rhythms, biphasic defibrillation physics, and CPR hemodynamics.',
          'Added Hypertension & Vascular Hemodynamics topic: Primary HTN, RAAS dysregulation, all secondary etiologies (endocrine, renovascular, coarctation, OSA), hypertensive emergencies, isolated systolic HTN, and WHO Groups 1-5 pulmonary hypertension.',
          'Built 3D interactive laboratories: Cardiac Electrophysiology & Coronary Occlusion Simulator with live 12-lead ECG strip, and Arterial Remodeling & Hemodynamic Flow Viewer.',
          'Expanded curriculum to 6 foundational scientific disciplines with 24 deep interactive modules, comprehensive bilingual assessments, and rich glossary terms.',
        ],
        id: [
          'Menambahkan topik Henti Jantung & Sindrom Koroner Akut: STEMI, NSTEMI, Angina Stabil/Tidak Stabil/Prinzmetal, 4 irama henti jantung, fisika defibrilasi bifasik, dan hemodinamika RJP.',
          'Menambahkan topik Hipertensi & Hemodinamika Vaskular: Hipertensi Primer, disregulasi RAAS, seluruh etiologi sekunder (endokrin, renovaskular, koarktasio, OSA), krisis emergensi hipertensi, hipertensi sistolik terisolasi, dan hipertensi pulmonal WHO 1-5.',
          'Membangun laboratorium interaktif 3D: Simulator Elektrofisiologi Jantung & Oklusi Koroner dengan monitor EKG 12-sadapan real-time, serta Penampil Remodeling Arteriol & Aliran Hemodinamika.',
          'Memperluas kurikulum menjadi 6 disiplin sains inti dengan 24 modul interaktif mendalam, evaluasi bilingual komprehensif, dan istilah glosarium kaya.',
        ],
      },
    },
    {
      version: '1.0.15',
      date: '2026-09-03',
      type: 'patch',
      title: {
        en: 'Embryonic 3D Anatomical Texture Mapping & Organ Viewport Refinement',
        id: 'Pemetaan Tekstur Anatomi 3D Embrio & Penyempurnaan Posisi Organ',
      },
      highlights: {
        en: [
          'Refactored Embryonic Development 3D scene with procedural textures for skin, epidermal micro-bump, cardiac muscle, cornea/iris, and cartilage/bone scaffolding.',
          'Re-anchored anatomical organ positions (optic cups, heart prominence, limbs, somites) to eliminate clipping across all gestational stages from Week 1 to Week 36.',
          'Added automatic WebGL canvas texture lifecycle disposal to prevent memory leaks during rapid gestational stage transitions.',
          'Resolved all React Hook dependency linting warnings across EmbryoViewer, DoubleSlitViewer, BatteryCellViewer, and QuantumOrbitalViewer.',
        ],
        id: [
          'Memperbarui model 3D Perkembangan Embrio dengan tekstur prosedural kulit, mikro-bump epidermal, otot jantung, kornea/iris, dan struktur tulang rawan/tulang keras.',
          'Menata ulang koordinat organ anatomi (cawan optik mata, tonjolan jantung, tunas anggota badan, somit) untuk mengeliminasi pemotongan mesh pada semua tahap dari Minggu 1 hingga Minggu 36.',
          'Menambahkan pembersihan siklus hidup tekstur kanvas WebGL otomatis untuk mencegah kebocoran memori saat transisi cepat antar minggu kehamilan.',
          'Menyelesaikan seluruh peringatan linting React Hook pada EmbryoViewer, DoubleSlitViewer, BatteryCellViewer, dan QuantumOrbitalViewer.',
        ],
      },
    },
    {
      version: '1.0.12',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Module Transition State Reset & Quiz Auto-Completion Resolution',
        id: 'Reset Status Transisi Modul & Resolusi Penyelesaian Otomatis Kuis',
      },
      highlights: {
        en: [
          'Fixed an issue where navigating to the next module retained the previous module completed quiz state and review screen.',
          'Reset activeTab to the primary 3D Interactive Lab whenever transitioning to a new module.',
          'Added keyed remounting and explicit state reset on module ID change in QuizComponent to ensure each assessment starts fresh.',
        ],
        id: [
          'Memperbaiki masalah di mana navigasi ke modul berikutnya mempertahankan status kuis selesai dan layar tinjauan modul sebelumnya.',
          'Mereset activeTab ke Lab Interaktif 3D utama setiap kali beralih ke modul baru.',
          'Menambahkan remounting berdasar key dan reset status eksplisit saat ID modul berubah di QuizComponent untuk memastikan setiap evaluasi dimulai dari awal.',
        ],
      },
    },
    {
      version: '1.0.11',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Glossary Popover Positioning Fix & Nested Button DOM Hydration Resolution',
        id: 'Perbaikan Posisi Popover Glosarium & Resolusi Hidrasi DOM Tombol Bersarang',
      },
      highlights: {
        en: [
          'Replaced Framer Motion CSS transform collisions with absolute bottom/top pixel anchoring to ensure popovers always position accurately above or below the hovered term.',
          'Converted GlossaryTerm interactive trigger from <button> to accessible <span role="button"> to eliminate nested button errors inside quiz options and interactive components.',
        ],
        id: [
          'Mengganti konflik CSS transform Framer Motion dengan penjangkaran piksel bottom/top absolut untuk memastikan posisi popover selalu tepat di atas atau di bawah istilah.',
          'Mengonversi pemicu interaktif GlossaryTerm dari <button> ke <span role="button"> yang aksesibel untuk mengeliminasi error tombol bersarang di dalam opsi kuis.',
        ],
      },
    },
    {
      version: '1.0.10',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Glossary Popover Body Portaling & Clipping Prevention',
        id: 'Portal Popover Glosarium ke Body & Pencegahan Pemotongan Kontainer',
      },
      highlights: {
        en: [
          'Portaled the glossary term popover directly to document.body using React createPortal with fixed floating coordinates.',
          'Eliminated popover clipping inside structured comparison tables, horizontal scroll views, and cards with overflow restrictions.',
          'Added automatic viewport collision detection and flipping between top and bottom placements.',
        ],
        id: [
          'Memportal popover istilah glosarium langsung ke document.body menggunakan React createPortal dengan koordinat mengambang tetap.',
          'Mengeliminasi pemotongan popover di dalam tabel perbandingan terstruktur, scroll horizontal, dan kartu dengan pembatasan overflow.',
          'Menambahkan deteksi tabrakan viewport otomatis dan pergantian penempatan atas/bawah yang dinamis.',
        ],
      },
    },
    {
      version: '1.0.9',
      date: '2026-09-02',
      type: 'patch',
      title: {
        en: 'Hero 3D Model Viewport Centering & Symmetrical Camera Alignment',
        id: 'Penyelarasan Presisi Pusat Model 3D Hero & Kamera Simetris',
      },
      highlights: {
        en: [
          'Corrected perspective camera elevation offset from Y=1.2 to Y=0.0 and enforced continuous lookAt(0,0,0) targeting to perfectly center the 3D model in the hero viewport card.',
          'Rescaled quantum orbital lobes and equatorial nodal torus to balance bounding box margins and prevent lower control overlap.',
        ],
        id: [
          'Memperbaiki offset elevasi kamera perspektif dari Y=1.2 ke Y=0.0 dan menerapkan penargetan lookAt(0,0,0) kontinu agar model 3D berada tepat di tengah kartu hero.',
          'Menyesuaikan skala lobus orbital kuantum dan cincin torus khatulistiwa untuk keseimbangan margin dan mencegah tumpang tindih dengan kontrol bawah.',
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
