export type GlossaryCategory =
  | 'quantum'
  | 'biology'
  | 'ev-battery'
  | 'pulmonology'
  | 'cardiology'
  | 'hypertension'
  | 'ecology'
  | 'hybrid'
  | 'battery-storage'
  | 'nuclear'
  | 'general';

export interface GlossaryTermData {
  id: string;
  term: {
    en: string;
    id: string;
  };
  aliases?: {
    en: string[];
    id: string[];
  };
  category: GlossaryCategory;
  symbol?: string;
  pronunciation?: string;
  definition: {
    en: string;
    id: string;
  };
  context: {
    en: string;
    id: string;
  };
  relatedTopicId?:
    | 'quantum-mechanics'
    | 'fetus-development'
    | 'ev-battery'
    | 'pulmonology-pneumonia'
    | 'cardiac-arrest'
    | 'hypertension'
    | 'biomes-ecology'
    | 'hybrid-vehicles'
    | 'battery-storage'
    | 'nuclear-reactor';
}

export const GLOSSARY_TERMS: GlossaryTermData[] = [
  // ================= QUANTUM MECHANICS =================
  {
    id: 'wavefunction',
    term: {
      en: 'Wavefunction',
      id: 'Fungsi Gelombang',
    },
    aliases: {
      en: ['wave function', 'wavefunctions', 'wave functions', 'psi'],
      id: ['fungsi gelombang', 'psi'],
    },
    category: 'quantum',
    symbol: 'Ψ(r, t)',
    pronunciation: '/ˈweɪvˌfʌŋk.ʃən/',
    definition: {
      en: 'A complex-valued mathematical function that fully describes the quantum state of an isolated physical system. Its modulus squared yields the spatial probability density of locating the particle.',
      id: 'Fungsi matematika bernilai kompleks yang mendeskripsikan kondisi kuantum suatu partikel secara lengkap. Kuadrat mutlaknya menyatakan kerapatan probabilitas menemukan partikel di ruang tertentu.',
    },
    context: {
      en: 'Used to calculate observable physical quantities (energy, momentum, angular position) via linear operators.',
      id: 'Digunakan untuk menghitung besaran fisik teramati (energi, momentum, posisi sudut) melalui operator linear.',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'probability-density',
    term: {
      en: 'Probability Density',
      id: 'Kerapatan Probabilitas',
    },
    aliases: {
      en: ['probability densities', 'spatial probability density', '|psi|^2'],
      id: ['kerapatan probabilitas', '|psi|^2', 'densitas probabilitas'],
    },
    category: 'quantum',
    symbol: '|Ψ|²',
    definition: {
      en: 'The Born interpretation value equal to Ψ*Ψ, quantifying the probability per unit volume of detecting a quantum particle at a specific coordinate.',
      id: 'Nilai interpretasi Born yang setara dengan Ψ*Ψ, menyatakan besarnya peluang per satuan volume untuk menemukan partikel pada koordinat tertentu.',
    },
    context: {
      en: 'Forms the physical basis of electron orbital probability clouds in atomic physics.',
      id: 'Menjadi dasar fisik visualisasi awan probabilitas orbital elektron dalam fisika atom.',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'quantum-superposition',
    term: {
      en: 'Quantum Superposition',
      id: 'Superposisi Kuantum',
    },
    aliases: {
      en: ['superposition', 'superposition state', 'superpositions'],
      id: ['superposisi', 'keadaan superposisi', 'superposisi kuantum'],
    },
    category: 'quantum',
    symbol: '|ψ⟩ = α|0⟩ + β|1⟩',
    definition: {
      en: 'A fundamental principle where a quantum system simultaneously exists in a linear combination of multiple distinct basis states until measured.',
      id: 'Prinsip fundamental di mana sistem kuantum berada dalam kombinasi linear dari beberapa keadaan basis berbeda secara bersamaan sampai terjadi pengukuran.',
    },
    context: {
      en: 'Enables quantum computers to process exponentially large state spaces simultaneously.',
      id: 'Memungkinkan komputer kuantum memproses ruang keadaan eksponensial secara simultan.',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'quantum-tunneling',
    term: {
      en: 'Quantum Tunneling',
      id: 'Tunneling Kuantum',
    },
    aliases: {
      en: ['tunneling', 'tunnel effect', 'barrier tunneling', 'quantum tunnel'],
      id: ['tunneling', 'penembusan rintangan', 'efek terobosan kuantum', 'tunneling kuantum'],
    },
    category: 'quantum',
    symbol: 'T ≈ e^{-2κa}',
    definition: {
      en: 'A wave-mechanical phenomenon where a particle penetrates and traverses a potential energy barrier higher than the particle\'s total kinetic energy.',
      id: 'Fenomena mekanika gelombang di mana partikel dapat menembus rintangan energi potensial yang lebih tinggi daripada energi kinetik total partikel tersebut.',
    },
    context: {
      en: 'Powers Scanning Tunneling Microscopy (STM), NAND flash memory floating gates, and stellar nuclear fusion.',
      id: 'Mendasari cara kerja Mikroskop Tunneling Payaran (STM), memori NAND flash, dan fusi nuklir di inti bintang.',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'bloch-sphere',
    term: {
      en: 'Bloch Sphere',
      id: 'Bola Bloch',
    },
    aliases: {
      en: ['bloch sphere representation', 'bloch vector'],
      id: ['bola bloch', 'vektor bloch'],
    },
    category: 'quantum',
    symbol: '|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩',
    definition: {
      en: 'A geometrical unit-sphere representation of the two-dimensional state space of a quantum two-level system (qubit).',
      id: 'Representasi geometri bola satuan untuk memetakan ruang keadaan dua dimensi dari sistem kuantum dua tingkat (qubit).',
    },
    context: {
      en: 'Provides visual mapping for single-qubit quantum gate operations (Hadamard, Pauli-X, Pauli-Z rotations).',
      id: 'Menyediakan pemetaan visual untuk operasi gerbang kuantum qubit tunggal (rotasi Hadamard, Pauli-X, Pauli-Z).',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'heisenberg-uncertainty',
    term: {
      en: 'Heisenberg Uncertainty Principle',
      id: 'Prinsip Ketidakpastian Heisenberg',
    },
    aliases: {
      en: ['uncertainty principle', 'heisenberg uncertainty'],
      id: ['prinsip ketidakpastian', 'ketidakpastian heisenberg'],
    },
    category: 'quantum',
    symbol: 'Δx · Δp ≥ ℏ/2',
    definition: {
      en: 'A mathematical inequality asserting a fundamental limit to the precision with which canonical conjugate observables (such as position and momentum) can be known simultaneously.',
      id: 'Ketidaksamaan matematis fundamental yang menyatakan batas presisi minimum saat mengukur pasangan variabel konjugat (seperti posisi dan momentum) secara bersamaan.',
    },
    context: {
      en: 'Direct consequence of the non-commutativity of quantum operators ([x̂, p̂] = iℏ).',
      id: 'Merupakan konsekuensi langsung dari sifat non-komutatif operator kuantum ([x̂, p̂] = iℏ).',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'de-broglie-wavelength',
    term: {
      en: 'de Broglie Wavelength',
      id: 'Panjang Gelombang de Broglie',
    },
    aliases: {
      en: ['matter wave', 'matter waves', 'de broglie relation'],
      id: ['gelombang materi', 'panjang gelombang de broglie'],
    },
    category: 'quantum',
    symbol: 'λ = h / p',
    definition: {
      en: 'The characteristic wavelength associated with any massive particle moving with linear momentum p.',
      id: 'Panjang gelombang karakteristik yang dimiliki oleh partikel bermassa yang bergerak dengan momentum linear p.',
    },
    context: {
      en: 'Explains why electrons exhibit interference patterns in crystal diffraction experiments (Davisson-Germer).',
      id: 'Menjelaskan mengapa elektron memunculkan pola interferensi pada eksperimen difraksi kristal (Davisson-Germer).',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'pauli-exclusion',
    term: {
      en: 'Pauli Exclusion Principle',
      id: 'Prinsip Larangan Pauli',
    },
    aliases: {
      en: ['exclusion principle', 'pauli exclusion'],
      id: ['larangan pauli', 'prinsip larangan pauli', 'eksklusi pauli'],
    },
    category: 'quantum',
    definition: {
      en: 'A quantum mechanical principle stating that two or more identical fermions cannot occupy the same quantum state simultaneously within a quantum system.',
      id: 'Prinsip mekanika kuantum yang menyatakan bahwa dua atau lebih fermion identik (seperti elektron) tidak dapat menempati keadaan kuantum yang persis sama secara bersamaan.',
    },
    context: {
      en: 'Dictates the electron shell structure of atoms, the periodic table of elements, and stellar stability against gravitational collapse.',
      id: 'Menentukan susunan kulit elektron atom, tabel periodik unsur, dan kestabilan bintang katai putih dari keruntuhan gravitasi.',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'evanescent-wave',
    term: {
      en: 'Evanescent Wave',
      id: 'Gelombang Evanesen',
    },
    aliases: {
      en: ['evanescent decay', 'evanescent field'],
      id: ['gelombang evanesen', 'peluruhan evanesen'],
    },
    category: 'quantum',
    symbol: 'ψ(x) ∝ e^{-κx}',
    definition: {
      en: 'An oscillating spatial field whose amplitude decays exponentially with distance rather than propagating sinusoidally.',
      id: 'Medan gelombang yang amplitudonya meluruh secara eksponensial terhadap jarak alih-alih merambat secara sinusoidal tanpa batas.',
    },
    context: {
      en: 'Describes the wavefunction profile inside a classically forbidden energy barrier during quantum tunneling.',
      id: 'Mendeskripsikan profil fungsi gelombang di dalam rintangan energi yang terlarang secara klasik selama tunneling kuantum.',
    },
    relatedTopicId: 'quantum-mechanics',
  },
  {
    id: 'qubit',
    term: {
      en: 'Qubit (Quantum Bit)',
      id: 'Qubit (Bit Kuantum)',
    },
    aliases: {
      en: ['qubit', 'qubits', 'quantum bit'],
      id: ['qubit', 'bit kuantum'],
    },
    category: 'quantum',
    definition: {
      en: 'The fundamental unit of quantum information, formalized as a two-state quantum-mechanical system capable of existing in coherent superpositions.',
      id: 'Satuan dasar informasi kuantum, yang berupa sistem mekanika kuantum dua keadaan yang mampu berada dalam superposisi koheren.',
    },
    context: {
      en: 'Physical implementations include superconducting transmon circuits, trapped ions, and nitrogen-vacancy diamond centers.',
      id: 'Implementasi fisiknya mencakup sirkuit superkonduktor transmon, ion terperangkap, dan pusat NV intan.',
    },
    relatedTopicId: 'quantum-mechanics',
  },

  // ================= EMBRYONIC BIOLOGY =================
  {
    id: 'cleavage-embryo',
    term: {
      en: 'Embryonic Cleavage',
      id: 'Pembelahan Sel Embrio (Cleavage)',
    },
    aliases: {
      en: ['cleavage', 'cleavage division', 'cell cleavage'],
      id: ['pembelahan sel', 'cleavage', 'pembelahan mitosis zigot'],
    },
    category: 'biology',
    definition: {
      en: 'The rapid series of mitotic cell divisions following fertilization that divides the single-celled zygote into smaller blastomeres without overall volume growth.',
      id: 'Serangkaian pembelahan mitosis cepat pasca fertilisasi yang membagi zigot bersel tunggal menjadi sel-sel blastomer yang lebih kecil tanpa penambahan volume total.',
    },
    context: {
      en: 'Occurs during Days 1–4 post-conception inside the fallopian tube, transforming the zygote into a morula.',
      id: 'Terjadi pada Hari ke 1–4 pasca pembuahan di tuba falopi, mengubah zigot menjadi morula.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'morula',
    term: {
      en: 'Morula',
      id: 'Morula',
    },
    aliases: {
      en: ['morula stage', 'morula embryo'],
      id: ['morula', 'fase morula'],
    },
    category: 'biology',
    definition: {
      en: 'A solid spherical ball of 16 to 32 tightly compacted blastomeres formed approximately 3 to 4 days after fertilization, resembling a mulberry.',
      id: 'Gumpalan bola padat berisi 16 hingga 32 sel blastomer terkompaksi yang terbentuk sekitar 3 hingga 4 hari pasca fertilisasi, menyerupai buah arbei.',
    },
    context: {
      en: 'Undergoes outer cell junction polarization (compaction) to prepare for cavitation into a blastocyst.',
      id: 'Mengalami proses pemadatan tautan seluler (kompaksi) sebelum mengalami pembentukan rongga blastosol.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'blastocyst',
    term: {
      en: 'Blastocyst',
      id: 'Blastokista',
    },
    aliases: {
      en: ['blastocyst stage', 'blastocyst embryo'],
      id: ['blastokista', 'tahap blastokista'],
    },
    category: 'biology',
    definition: {
      en: 'A hollow cellular sphere containing an outer trophoblast layer, a fluid-filled blastocoel cavity, and an inner cell mass (ICM) destined to form the embryo proper.',
      id: 'Struktur bola seluler berongga yang terdiri atas lapisan luar trofoblas, rongga blastosol berisi cairan, dan massa sel dalam (ICM) yang akan membentuk tubuh janin.',
    },
    context: {
      en: 'Hatches from the zona pellucida around Day 5–6 to implant into the maternal uterine endometrium.',
      id: 'Menetas dari zona pelusida sekitar Hari ke 5–6 untuk berimplantasi ke dinding endometrium uterus ibu.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'trophoblast',
    term: {
      en: 'Trophoblast',
      id: 'Trofoblas',
    },
    aliases: {
      en: ['trophoblasts', 'trophoectoderm'],
      id: ['trofoblas', 'trofoektoderm'],
    },
    category: 'biology',
    definition: {
      en: 'The outer epithelial cell layer of the blastocyst that establishes nutritional connection with the uterine endometrium and develops into the fetal placenta.',
      id: 'Lapisan sel epitel luar blastokista yang menjalin hubungan nutrisi dengan dinding endometrium dan berkembang menjadi plasenta janin.',
    },
    context: {
      en: 'Secretes human Chorionic Gonadotropin (hCG) to maintain the corpus luteum and sustain pregnancy.',
      id: 'Mensekresi hormon hCG untuk mempertahankan korpus luteum dan menjaga keberlangsungan kehamilan.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'inner-cell-mass',
    term: {
      en: 'Inner Cell Mass (ICM)',
      id: 'Massa Sel Dalam (ICM)',
    },
    aliases: {
      en: ['inner cell mass', 'embryoblast', 'ICM'],
      id: ['massa sel dalam', 'embrioblas', 'ICM'],
    },
    category: 'biology',
    definition: {
      en: 'The cluster of pluripotential stem cells situated at the embryonic pole inside the blastocyst that gives rise to all tissues of the developing fetus.',
      id: 'Kumpulan sel punca pluripoten di kutub embrionik di dalam rongga blastokista yang akan berkembang menjadi seluruh jaringan dan organ tubuh janin.',
    },
    context: {
      en: 'Source of human embryonic stem cells (hESCs) capable of differentiating into ectoderm, mesoderm, and endoderm.',
      id: 'Sumber sel punca embrionik manusia yang mampu berdiferensiasi menjadi ektoderm, mesoderm, dan endoderm.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'gastrulation',
    term: {
      en: 'Gastrulation',
      id: 'Gastrulasi',
    },
    aliases: {
      en: ['gastrulation process', 'gastrula'],
      id: ['gastrulasi', 'proses gastrulasi'],
    },
    category: 'biology',
    definition: {
      en: 'The transformative morphogenetic process in Week 3 of human development that reorganizes the bilaminar embryonic disc into three primary germ layers.',
      id: 'Proses morfogenetik krusial pada Minggu ke-3 perkembangan manusia yang mereorganisasi lempeng embrio dua lapis menjadi tiga lapisan germinal primer.',
    },
    context: {
      en: 'Initiated by cell migration through the primitive streak; establishes the fundamental cranial-caudal and bilateral body axes.',
      id: 'Dimulai dengan migrasi sel melalui primitive streak; menetapkan sumbu tubuh kranial-kaudal dan simetri bilateral.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'ectoderm',
    term: {
      en: 'Ectoderm',
      id: 'Ektoderm',
    },
    aliases: {
      en: ['ectodermal layer', 'ectodermal'],
      id: ['ektoderm', 'lapisan ektoderm'],
    },
    category: 'biology',
    definition: {
      en: 'The outermost of the three primary germ layers, giving rise to the central and peripheral nervous systems, epidermis of the skin, hair, and sensory epithelium.',
      id: 'Lapisan germinal terluar dari tiga lapisan primer, yang berdiferensiasi membentuk sistem saraf pusat dan perifer, epidermis kulit, rambut, dan epitel sensorik.',
    },
    context: {
      en: 'Includes neuroectoderm which folds to form the neural tube (brain and spinal cord).',
      id: 'Mencakup neuroektoderm yang melipat membentuk tabung saraf (otak dan medula spinalis).',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'mesoderm',
    term: {
      en: 'Mesoderm',
      id: 'Mesoderm',
    },
    aliases: {
      en: ['mesodermal layer', 'mesodermal'],
      id: ['mesoderm', 'lapisan mesoderm'],
    },
    category: 'biology',
    definition: {
      en: 'The middle germ layer formed during gastrulation that differentiates into muscle, skeletal bone, cardiovascular circulatory system, kidneys, and gonads.',
      id: 'Lapisan germinal tengah hasil gastrulasi yang berdiferensiasi menjadi jaringan otot, tulang kerangka, sistem sirkulasi kardiovaskular, ginjal, dan gonad.',
    },
    context: {
      en: 'Differentiates into paraxial (somites), intermediate (urogenital), and lateral plate (heart/limbs) mesoderm.',
      id: 'Terbagi menjadi mesoderm paraksial (somit), intermediat (urogenital), dan lempeng lateral (jantung/anggota gerak).',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'endoderm',
    term: {
      en: 'Endoderm',
      id: 'Endoderm',
    },
    aliases: {
      en: ['endodermal layer', 'endodermal'],
      id: ['endoderm', 'lapisan endoderm'],
    },
    category: 'biology',
    definition: {
      en: 'The innermost germ layer, giving rise to the epithelial lining of the gastrointestinal tract, respiratory system (trachea, lungs), liver, and pancreas.',
      id: 'Lapisan germinal terdalam, yang membentuk lapisan epitel saluran pencernaan, sistem pernapasan (trakea, paru-paru), hati, dan pankreas.',
    },
    context: {
      en: 'Forms the primitive gut tube through craniocaudal and lateral embryonic body folding.',
      id: 'Membentuk tabung usus primitif melalui proses pelipatan embrio kraniokaudal dan lateral.',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'teratogen',
    term: {
      en: 'Teratogen',
      id: 'Teratogen',
    },
    aliases: {
      en: ['teratogens', 'teratogenic', 'teratogenicity'],
      id: ['teratogen', 'agen teratogenik', 'teratogenisitas'],
    },
    category: 'biology',
    definition: {
      en: 'Any chemical agent, drug, virus, or physical factor that causes congenital structural or functional malformations during embryonic organogenesis.',
      id: 'Setiap zat kimia, obat, virus, atau faktor fisik yang menyebabkan malformasi struktural atau fungsional bawaan selama periode organogenesis embrio.',
    },
    context: {
      en: 'The classic critical window of highest vulnerability is Weeks 3–8 post-conception (e.g., thalidomide phocomelia).',
      id: 'Jendela kerentanan tertinggi terjadi pada Minggu ke 3–8 pasca pembuahan (misalnya thalidomide yang memicu fokomelia).',
    },
    relatedTopicId: 'fetus-development',
  },
  {
    id: 'doppler-ultrasound',
    term: {
      en: 'Doppler Ultrasound',
      id: 'USG Doppler Fetal',
    },
    aliases: {
      en: ['fetal doppler', 'doppler hemodynamics', 'doppler shift'],
      id: ['usg doppler', 'doppler janin', 'hemodinamika doppler'],
    },
    category: 'biology',
    symbol: 'Δf = (2 f₀ v cos θ) / c',
    definition: {
      en: 'An acoustic imaging modality using the frequency shift of reflected high-frequency sound waves to measure the velocity and direction of red blood cell flow in fetal and umbilical vessels.',
      id: 'Modalitas pencitraan akustik yang memanfaatkan pergeseran frekuensi gelombang ultrasonik pantul untuk mengukur kecepatan dan arah aliran eritrosit di pembuluh darah janin dan tali pusat.',
    },
    context: {
      en: 'Evaluates placental resistance, fetal anemia (via Middle Cerebral Artery PSV), and fetal cardiac function.',
      id: 'Digunakan untuk mengevaluasi resistensi plasenta, anemia janin (melalui PSV Arteri Serebri Media), dan fungsi jantung janin.',
    },
    relatedTopicId: 'fetus-development',
  },

  // ================= EV BATTERY & POWERTRAIN =================
  {
    id: '4680-cell',
    term: {
      en: '4680 Form Factor',
      id: 'Format Sel 4680',
    },
    aliases: {
      en: ['4680 cell', '4680 battery', '4680 form factor'],
      id: ['sel 4680', 'baterai 4680', 'format 4680'],
    },
    category: 'ev-battery',
    definition: {
      en: 'A cylindrical lithium-ion battery cell measuring 46 mm in diameter by 80 mm in height, offering 5× higher energy content and 6× higher power output than previous 2170 cells.',
      id: 'Sel baterai litium-ion silinder berukuran diameter 46 mm dan tinggi 80 mm, yang memberikan kapasitas energi 5× lebih besar dan daya 6× lebih tinggi dibanding sel 2170 generasi sebelumnya.',
    },
    context: {
      en: 'Employs shingled tabless electrode architecture to overcome high electrical resistance and thermal bottlenecks across its thick radius.',
      id: 'Menggunakan arsitektur elektroda tanpa tab (tabless) bertumpuk untuk mengatasi hambatan listrik internal dan hambatan pelepasan panas.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'tabless-electrode',
    term: {
      en: 'Tabless Electrode',
      id: 'Elektroda Tanpa Tab (Tabless)',
    },
    aliases: {
      en: ['tabless design', 'tabless architecture', 'shingled tabs'],
      id: ['tabless', 'elektroda tanpa tab', 'arsitektur tabless'],
    },
    category: 'ev-battery',
    definition: {
      en: 'A battery cell manufacturing innovation where continuous laser-cut conductive foil edges act as the electrical contact across the entire winding, replacing traditional narrow conductive tabs.',
      id: 'Inovasi manufaktur sel baterai di mana tepi foil konduktif yang dipotong laser secara kontinyu berfungsi sebagai kontak listrik di sepanjang gulungan, menggantikan tab konduktif tunggal yang sempit.',
    },
    context: {
      en: 'Reduces electron ohmic path length from 800–1000 mm down to <50 mm, cutting internal resistance and heat generation by 80%.',
      id: 'Memperpendek lintasan ohmik elektron dari 800–1000 mm menjadi <50 mm, memangkas hambatan internal dan panas hingga 80%.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'jellyroll',
    term: {
      en: 'Jellyroll',
      id: 'Jellyroll (Gulungan Elektroda)',
    },
    aliases: {
      en: ['jelly roll', 'electrode winding'],
      id: ['jellyroll', 'gulungan jellyroll'],
    },
    category: 'ev-battery',
    definition: {
      en: 'The spirally wound cylindrical assembly of an anode sheet, porous separator, cathode sheet, and secondary separator that fits tightly inside a cylindrical metal battery can.',
      id: 'Susunan lembaran anoda, separator berpori, katoda, dan separator sekunder yang digulung spiral menyerupai kue gulung agar muat presisi di dalam sel silinder.',
    },
    context: {
      en: 'Requires ultra-tight tension and alignment tolerances during manufacturing to prevent lithium dendrite shorts.',
      id: 'Membutuhkan toleransi tegangan dan kelurusan presisi tinggi saat penggulungan untuk mencegah korsleting akibat dendrit litium.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'c-rate',
    term: {
      en: 'C-Rate',
      id: 'C-Rate (Laju Arus)',
    },
    aliases: {
      en: ['c rate', 'discharge c-rate', 'charge rate'],
      id: ['c-rate', 'laju c', 'kecepatan arus'],
    },
    category: 'ev-battery',
    symbol: 'I = C × Q_nom',
    definition: {
      en: 'A standardized measure of the rate at which a battery is charged or discharged relative to its nominal rated capacity. 1C completely discharges a battery in 1 hour.',
      id: 'Satuan standar untuk menyatakan laju pengisian atau pengosongan arus baterai relatif terhadap kapasitas nominalnya. 1C mengosongkan kapasitas penuh baterai dalam waktu 1 jam.',
    },
    context: {
      en: 'Fast-charging at 3C (20-minute full charge) accelerates Joule heating ($I^2 R$) and can induce anode lithium plating if thermal limits are exceeded.',
      id: 'Pengisian cepat pada 3C (isi penuh 20 menit) melipatgandakan panas Joule ($I^2 R$) dan berisiko memicu pelapisan litium anoda jika suhu melampaui batas.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'thermal-runaway',
    term: {
      en: 'Thermal Runaway',
      id: 'Thermal Runaway (Pelarian Termal)',
    },
    aliases: {
      en: ['thermal runaway event', 'battery fire'],
      id: ['thermal runaway', 'pelarian termal'],
    },
    category: 'ev-battery',
    definition: {
      en: 'An uncontrollable positive feedback loop where an internal battery fault or overheating triggers self-sustaining exothermic chemical decomposition of the SEI layer, separator, and cathode.',
      id: 'Kondisi kegagalan berantai di mana korsleting internal atau panas berlebih memicu dekomposisi kimia eksotermik berulang pada lapisan SEI, separator, dan katoda.',
    },
    context: {
      en: 'Mitigated in modern EV packs through cell-to-cell aerogel insulation, directional blast vents, and glycol liquid cooling plates.',
      id: 'Dicegah pada kemasan baterai EV modern menggunakan isolasi aerogel antar-sel, katup pelepas tekanan terarah, dan pelat pendingin cairan glikol.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'sic-inverter',
    term: {
      en: 'Silicon-Carbide (SiC) Inverter',
      id: 'Inverter Silikon Karbida (SiC)',
    },
    aliases: {
      en: ['sic inverter', 'silicon carbide mosfet', 'wide bandgap inverter'],
      id: ['inverter sic', 'mosfet silikon karbida', 'inverter wide bandgap'],
    },
    category: 'ev-battery',
    definition: {
      en: 'A high-efficiency traction power inverter using wide-bandgap SiC MOSFET semiconductor switches to convert battery DC into 3-phase AC for the electric drive motor.',
      id: 'Inverter daya traksi berefisiensi tinggi yang memanfaatkan semikonduktor celah pita lebar SiC MOSFET untuk mengubah arus DC baterai menjadi AC 3-fasa untuk motor penggerak listrik.',
    },
    context: {
      en: 'Offers >99% electrical conversion efficiency and higher switching frequencies, extending total vehicle driving range by 5–8% over legacy silicon IGBT inverters.',
      id: 'Menghasilkan efisiensi konversi >99% dan frekuensi pensaklaran jauh lebih tinggi, menambah jarak tempuh kendaraan sebesar 5–8% dibanding IGBT silikon konvensional.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'regenerative-braking',
    term: {
      en: 'Regenerative Braking',
      id: 'Pengereman Regeneratif',
    },
    aliases: {
      en: ['regen', 'regen braking', 'energy recuperation'],
      id: ['pengereman regeneratif', 'regen', 'rekuperasi energi'],
    },
    category: 'ev-battery',
    definition: {
      en: 'An energy recovery mechanism where the vehicle’s electric traction motor acts as an electrical generator during deceleration, converting kinetic energy back into stored battery chemical energy.',
      id: 'Mekanisme pemulihan energi di mana motor listrik penggerak beralih fungsi menjadi generator listrik saat kendaraan melambat, mengubah energi kinetik kembali menjadi muatan kimia baterai.',
    },
    context: {
      en: 'Recovers up to 70–80% of braking kinetic energy in city driving, drastically reducing mechanical brake wear.',
      id: 'Mampu memulihkan hingga 70–80% energi kinetik pengereman saat berkendara di perkotaan dan meminimalkan keausan rem mekanis.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'aerodynamic-drag',
    term: {
      en: 'Aerodynamic Drag (Cd)',
      id: 'Koefisien Hambatan Udara (Cd)',
    },
    aliases: {
      en: ['drag coefficient', 'aerodynamic drag', 'air resistance'],
      id: ['koefisien drag', 'hambatan udara', 'hambatan aerodinamis'],
    },
    category: 'ev-battery',
    symbol: 'F_aero = 1/2 · ρ · C_d · A · v²',
    definition: {
      en: 'A dimensionless coefficient quantifying the resistance of an EV body moving through ambient air at velocity v, scaling quadratically with speed.',
      id: 'Koefisien tak berdimensi yang menyatakan besarnya hambatan fluida udara terhadap bodi kendaraan yang melaju pada kecepatan v, bertambah secara kuadratik terhadap kecepatan.',
    },
    context: {
      en: 'At highway cruising speeds (>100 km/h), overcoming aerodynamic drag consumes over 60% of the EV battery\'s discharge power.',
      id: 'Pada kecepatan jalan tol (>100 km/jam), mengatasi hambatan aerodinamis mengonsumsi lebih dari 60% daya pengosongan baterai EV.',
    },
    relatedTopicId: 'ev-battery',
  },
  {
    id: 'sei-layer',
    term: {
      en: 'Solid-Electrolyte Interphase (SEI)',
      id: 'Lapisan Interfasa SEI',
    },
    aliases: {
      en: ['SEI', 'SEI layer', 'solid electrolyte interphase'],
      id: ['lapisan sei', 'sei', 'solid-electrolyte interphase'],
    },
    category: 'ev-battery',
    definition: {
      en: 'A passivation layer that forms on the graphite anode during the initial charging cycles from electrolyte decomposition products, preventing further solvent reduction while allowing Li+ transport.',
      id: 'Lapisan pasivasi yang terbentuk secara alami pada anoda grafit selama siklus pengisian pertama dari produk dekomposisi elektrolit, yang melindungi anoda dari degradasi namun tetap melewatkan ion Li+.',
    },
    context: {
      en: 'Stable SEI is critical for long battery calendar life; excessive thickening increases internal resistance and capacity fade.',
      id: 'SEI yang stabil sangat krusial untuk masa pakai baterai jangka panjang; penebalan berlebih meningkatkan hambatan internal dan degradasi kapasitas.',
    },
    relatedTopicId: 'ev-battery',
  },
  // ================= PULMONOLOGY & PNEUMONIA =================
  {
    id: 'cap',
    term: {
      en: 'Community-Acquired Pneumonia (CAP)',
      id: 'Pneumonia Komunitas (CAP)',
    },
    aliases: {
      en: ['CAP', 'community acquired pneumonia', 'lobar pneumonia'],
      id: ['cap', 'pneumonia komunitas', 'pneumonia lobaris'],
    },
    category: 'pulmonology',
    symbol: 'CAP',
    definition: {
      en: 'Acute infection and inflammatory consolidation of the pulmonary parenchyma acquired outside of hospitals or long-term care facilities, most commonly caused by Streptococcus pneumoniae.',
      id: 'Infeksi inflamasi akut dan konsolidasi parenkim paru yang didapat di luar rumah sakit atau fasilitas perawatan jangka panjang, paling sering dipicu oleh Streptococcus pneumoniae.',
    },
    context: {
      en: 'Evaluated using clinical risk prediction rules such as CURB-65 and the Pneumonia Severity Index (PSI/PORT).',
      id: 'Dievaluasi menggunakan instrumen stratifikasi risiko klinis seperti skor CURB-65 dan Pneumonia Severity Index (PSI/PORT).',
    },
    relatedTopicId: 'pulmonology-pneumonia',
  },
  {
    id: 'hap-vap',
    term: {
      en: 'Hospital-Acquired / Ventilator-Associated Pneumonia (HAP/VAP)',
      id: 'Pneumonia Nosokomial & Terkait Ventilator (HAP/VAP)',
    },
    aliases: {
      en: ['HAP', 'VAP', 'nosocomial pneumonia', 'ventilator-associated pneumonia'],
      id: ['hap', 'vap', 'pneumonia nosokomial', 'pneumonia ventilator'],
    },
    category: 'pulmonology',
    symbol: 'HAP/VAP',
    definition: {
      en: 'Pneumonia developing ≥48 hours following hospital admission (HAP) or endotracheal intubation (VAP), frequently driven by multidrug-resistant pathogens (Pseudomonas, MRSA, Acinetobacter).',
      id: 'Pneumonia yang terjadi ≥48 jam setelah admisi rumah sakit (HAP) atau pasca intubasi endotrakeal (VAP), kerap disebabkan kuman resistan obat (Pseudomonas, MRSA, Acinetobacter).',
    },
    context: {
      en: 'Pathophysiology centers around oropharyngeal colonization, microaspiration past endotracheal tube cuffs, and biofilm formation.',
      id: 'Patofisiologinya berpusat pada kolonisasi orofaring, mikroaspirasi di sekitar balon cuff pipa endotrakeal, dan pembentukan biofilm lumen.',
    },
    relatedTopicId: 'pulmonology-pneumonia',
  },
  {
    id: 'curb65',
    term: {
      en: 'CURB-65 Score',
      id: 'Skor CURB-65',
    },
    aliases: {
      en: ['CURB-65', 'curb 65', 'curb-65 score', 'CURB score'],
      id: ['skor curb-65', 'curb 65', 'curb-65'],
    },
    category: 'pulmonology',
    symbol: 'CURB-65',
    definition: {
      en: 'A 6-point clinical prediction score (Confusion, Urea > 7 mmol/L, Respiratory rate ≥ 30, Blood pressure < 90/60, Age ≥ 65) predicting 30-day mortality and guiding outpatient vs inpatient disposition in CAP.',
      id: 'Skor prediksi klinis 6-poin (Konfusi, Urea > 7 mmol/L, Laju napas ≥ 30, Tekanan darah < 90/60, Usia ≥ 65) untuk memprediksi mortalitas 30-hari dan menentukan rawat jalan vs rawat inap pada CAP.',
    },
    context: {
      en: 'Scores of 0–1 are low-risk for outpatient care; scores ≥3 mandate inpatient admission and critical care assessment.',
      id: 'Skor 0–1 berisiko rendah untuk rawat jalan; skor ≥3 mewajibkan rawat inap dan evaluasi perawatan intensif.',
    },
    relatedTopicId: 'pulmonology-pneumonia',
  },
  {
    id: 'tuberculosis',
    term: {
      en: 'Mycobacterium tuberculosis',
      id: 'Tuberkulosis Paru (TB)',
    },
    aliases: {
      en: ['TB', 'tuberculosis', 'mtb', 'consumption', 'mycobacterium'],
      id: ['tb', 'tbc', 'tuberkulosis', 'mycobacterium tuberculosis'],
    },
    category: 'pulmonology',
    symbol: 'Mtb',
    definition: {
      en: 'An acid-fast, slow-growing obligate aerobic bacillus whose lipid-rich mycolic acid cell wall and cord factor promote intracellular survival inside macrophages, inducing caseating granulomatous inflammation.',
      id: 'Basil tahan asam aerob obligat yang tumbuh lambat, dengan dinding sel kaya asam mikolat dan cord factor yang memungkinkannya bertahan hidup di dalam makrofag dan memicu granuloma kaseosa.',
    },
    context: {
      en: 'Standard 6-month treatment follows 2HRZE/4HR; rapid molecular diagnosis is performed via GeneXpert MTB/RIF Ultra.',
      id: 'Regimen standar 6-bulan menggunakan 2HRZE/4HR; diagnosis molekuler cepat ditegakkan melalui GeneXpert MTB/RIF Ultra.',
    },
    relatedTopicId: 'pulmonology-pneumonia',
  },
  {
    id: 'ards',
    term: {
      en: 'Acute Respiratory Distress Syndrome (ARDS)',
      id: 'Sindrom Distres Pernapasan Akut (ARDS)',
    },
    aliases: {
      en: ['ARDS', 'acute respiratory distress syndrome', 'diffuse alveolar damage'],
      id: ['ards', 'sindrom distres pernapasan akut', 'diffuse alveolar damage'],
    },
    category: 'pulmonology',
    symbol: 'ARDS',
    definition: {
      en: 'A life-threatening form of non-cardiogenic pulmonary edema and diffuse alveolar damage (DAD) characterized by bilateral radiographic infiltrates, surfactant collapse, eosinophilic hyaline membranes, and PaO2/FiO2 ≤ 300 mmHg.',
      id: 'Bentuk edema paru non-kardiogenik yang mengancam jiwa dengan kerusakan alveolar difus (DAD), ditandai infiltrat bilateral, kolaps surfaktan, membran hialin eosinofilik, dan rasio PaO2/FiO2 ≤ 300 mmHg.',
    },
    context: {
      en: 'Managed with ARDSNet lung-protective low tidal volume ventilation (4–8 mL/kg PBW) and prone positioning for ≥16 h/day.',
      id: 'Ditatalaksana dengan ventilasi proteksi volume tidal rendah (4–8 mL/kg PBW) dan posisi prone selama ≥16 jam/hari.',
    },
    relatedTopicId: 'pulmonology-pneumonia',
  },
  {
    id: 'alveolar-consolidation',
    term: {
      en: 'Alveolar Consolidation',
      id: 'Konsolidasi Alveolar',
    },
    aliases: {
      en: ['consolidation', 'lobar consolidation', 'alveolar exudate'],
      id: ['konsolidasi', 'konsolidasi alveolar', 'eksudat alveolar'],
    },
    category: 'pulmonology',
    definition: {
      en: 'The pathological replacement of air inside alveolar spaces by inflammatory exudate, polymorphonuclear neutrophils, fibrin, and cellular debris, transforming spongy lung tissue into a dense, solid mass.',
      id: 'Penggantian udara di dalam ruang alveolus oleh eksudat inflamasi, neutrofil, benang fibrin, dan debris seluler, mengubah jaringan paru berongga menjadi massa padat kedap udara.',
    },
    context: {
      en: 'Produces physical findings of dullness to percussion, bronchial breathing, egophony, and radiological air bronchograms.',
      id: 'Menghasilkan tanda fisik perkusi redup, suara napas bronkial, egofoni, serta gambaran radiologis air bronchogram.',
    },
    relatedTopicId: 'pulmonology-pneumonia',
  },
  // ================= CARDIOLOGY & CARDIAC ARREST =================
  {
    id: 'stemi',
    term: {
      en: 'ST-Elevation Myocardial Infarction (STEMI)',
      id: 'Infark Miokard dengan Elevasi Segmen ST (STEMI)',
    },
    aliases: {
      en: ['STEMI', 'ST elevation myocardial infarction', 'transmural myocardial infarction'],
      id: ['STEMI', 'infark miokard elevasi ST', 'infark transmural'],
    },
    category: 'cardiology',
    definition: {
      en: 'A severe cardiovascular emergency caused by acute, complete, and persistent thrombotic occlusion of an epicardial coronary artery, producing transmural myocardial necrosis and diagnostic ST elevation on ECG.',
      id: 'Kegawatdaruratan kardiovaskular berat akibat oklusi trombotik total dan persisten pada arteri koroner epikardium, memicu nekrosis miokardium transmural dan elevasi segmen ST diagnostik pada EKG.',
    },
    context: {
      en: 'Requires emergent reperfusion via primary percutaneous coronary intervention (PCI) with Door-to-Balloon time ≤ 90 minutes.',
      id: 'Memerlukan reperfusi darurat via intervensi koroner perkutan (PCI) primer dengan target Door-to-Balloon ≤ 90 menit.',
    },
    relatedTopicId: 'cardiac-arrest',
  },
  {
    id: 'nstemi',
    term: {
      en: 'Non-ST-Elevation Myocardial Infarction (NSTEMI)',
      id: 'Infark Miokard Tanpa Elevasi Segmen ST (NSTEMI)',
    },
    aliases: {
      en: ['NSTEMI', 'non-ST elevation MI', 'subendocardial infarction'],
      id: ['NSTEMI', 'infark miokard non-elevasi ST', 'infark subendokardium'],
    },
    category: 'cardiology',
    definition: {
      en: 'An acute coronary syndrome caused by partial or transient coronary artery obstruction leading to subendocardial myocardial necrosis, confirmed by elevated cardiac troponins without persistent ST-elevation.',
      id: 'Sindrom koroner akut akibat obstruksi parsial atau sementara pada arteri koroner yang menimbulkan nekrosis miokardium subendokardium, dibuktikan oleh kenaikan troponin tanpa elevasi ST persisten.',
    },
    context: {
      en: 'Manifests with ST depressions, T-wave inversions, or non-specific ECG findings, stratified using TIMI and GRACE risk scores.',
      id: 'Bermanifestasi dengan depresi ST, inversi gelombang T, atau EKG non-spesifik, distratifikasi dengan skor risiko TIMI dan GRACE.',
    },
    relatedTopicId: 'cardiac-arrest',
  },
  {
    id: 'angina-pectoris',
    term: {
      en: 'Angina Pectoris',
      id: 'Angina Pektoris',
    },
    aliases: {
      en: ['angina', 'stable angina', 'unstable angina', 'cardiac chest pain'],
      id: ['angina', 'angina stabil', 'angina pektoris', 'nyeri dada kardiak'],
    },
    category: 'cardiology',
    definition: {
      en: 'Substernal chest discomfort, pressure, or tightness provoked by myocardial ischemia when myocardial oxygen demand exceeds coronary arterial oxygen supply.',
      id: 'Rasa tertekan, berat, atau nyeri di area substernal yang dipicu oleh iskemia miokardium ketika kebutuhan oksigen melampaui pasokan arteri koroner.',
    },
    context: {
      en: 'Categorized into Stable Angina (exertional, relieved by rest/nitroglycerin), Unstable Angina (crescendo/rest, no troponin rise), and Vasospastic/Prinzmetal Angina.',
      id: 'Diklasifikasikan menjadi Angina Stabil (saat aktivitas, reda dengan istirahat/nitrat), Angina Tidak Stabil (saat istirahat, troponin normal), dan Angina Prinzmetal/Vasospastik.',
    },
    relatedTopicId: 'cardiac-arrest',
  },
  {
    id: 'ventricular-fibrillation',
    term: {
      en: 'Ventricular Fibrillation (VF)',
      id: 'Fibrilasi Ventrikel (VF)',
    },
    aliases: {
      en: ['VF', 'V-fib', 'ventricular fibrillation'],
      id: ['VF', 'fibrilasi ventrikel', 'v-fib'],
    },
    category: 'cardiology',
    definition: {
      en: 'A lethal cardiac dysrhythmia characterized by chaotic, disorganized ventricular electrical activity without mechanical ventricular contraction, causing immediate cardiac arrest and zero forward cardiac output.',
      id: 'Disritmia jantung letal yang ditandai oleh aktivitas listrik ventrikel yang kacau dan tidak terorganisir tanpa kontraksi mekanis ventrikel, memicu henti jantung seketika dan hilangnya curah jantung.',
    },
    context: {
      en: 'The primary shockable rhythm in sudden cardiac arrest, treated with immediate unsynchronized electrical defibrillation and CPR.',
      id: 'Irama shockable utama pada henti jantung mendadak, ditangani dengan defibrilasi listrik asinkron seketika dan RJP.',
    },
    relatedTopicId: 'cardiac-arrest',
  },
  {
    id: 'coronary-perfusion-pressure',
    term: {
      en: 'Coronary Perfusion Pressure (CPP)',
      id: 'Tekanan Perfusi Koroner (CPP)',
    },
    aliases: {
      en: ['CPP', 'myocardial perfusion pressure'],
      id: ['CPP', 'tekanan perfusi miokardium'],
    },
    category: 'cardiology',
    symbol: 'CPP',
    definition: {
      en: 'The physiological pressure gradient driving coronary capillary blood flow to the myocardium during diastole, calculated as Aortic Diastolic Pressure minus Left Ventricular End-Diastolic Pressure (or Right Atrial Pressure during CPR).',
      id: 'Gradien tekanan fisiologis yang mengalirkan darah kapiler koroner ke miokardium saat diastol, dihitung dari Tekanan Diastolik Aorta dikurangi Tekanan Akhir Diastolik Ventrikel Kiri (atau Tekanan Atrium Kanan saat RJP).',
    },
    context: {
      en: 'A minimum CPP of 15 mmHg during CPR decompression is essential for achieving Return of Spontaneous Circulation (ROSC).',
      id: 'Target CPP minimum 15 mmHg selama fase dekompresi RJP mutlak diperlukan untuk mencapai Return of Spontaneous Circulation (ROSC).',
    },
    relatedTopicId: 'cardiac-arrest',
  },
  // ================= HYPERTENSION & VASCULAR HEMODYNAMICS =================
  {
    id: 'raas-axis',
    term: {
      en: 'Renin-Angiotensin-Aldosterone System (RAAS)',
      id: 'Sistem Renin-Angiotensin-Aldosteron (RAAS)',
    },
    aliases: {
      en: ['RAAS', 'renin-angiotensin system', 'RAS'],
      id: ['RAAS', 'sistem renin angiotensin', 'aksis RAAS'],
    },
    category: 'hypertension',
    definition: {
      en: 'A systemic neurohumoral endocrine pathway regulating arterial blood pressure, extracellular fluid volume, and systemic vascular resistance via sequential enzymatic conversion of angiotensinogen to Ang I and Ang II, and aldosterone release.',
      id: 'Jalur endokrin neurohumoral sistemik yang mengatur tekanan darah arteri, volume cairan ekstraseluler, dan resistansi vaskular perifer melalui konversi enzimatik bertahap dari angiotensinogen ke Ang I dan Ang II, serta sekresi aldosteron.',
    },
    context: {
      en: 'Target of major first-line antihypertensive drug classes including ACE inhibitors, ARBs, and mineralocorticoid receptor antagonists.',
      id: 'Sasaran utama kelas obat antihipertensi lini pertama mencakup inhibitor ACE, ARB, dan antagonis reseptor mineralokortikoid.',
    },
    relatedTopicId: 'hypertension',
  },
  {
    id: 'mean-arterial-pressure',
    term: {
      en: 'Mean Arterial Pressure (MAP)',
      id: 'Tekanan Arteri Rata-rata (MAP)',
    },
    aliases: {
      en: ['MAP', 'mean blood pressure'],
      id: ['MAP', 'tekanan arteri rata-rata'],
    },
    category: 'hypertension',
    symbol: 'MAP',
    definition: {
      en: 'The time-weighted average arterial pressure throughout a complete cardiac cycle, representing the physiological driving perfusion pressure delivering blood to vital organs (MAP = DBP + 1/3[SBP - DBP]).',
      id: 'Rata-rata tertimbang tekanan arteri sepanjang satu siklus jantung penuh, yang mewakili tekanan perfusi pendorong fisiologis ke organ-organ vital (MAP = TDD + 1/3[TDS - TDD]).',
    },
    context: {
      en: 'Normal resting MAP is 70–100 mmHg; titrated cautiously in hypertensive emergencies to prevent cerebral watershed infarction.',
      id: 'Nilai MAP istirahat normal berkisar 70–100 mmHg; dititrasi hati-hati pada krisis hipertensi emergensi guna mencegah stroke perbatasan.',
    },
    relatedTopicId: 'hypertension',
  },
  {
    id: 'pulse-wave-velocity',
    term: {
      en: 'Pulse Wave Velocity (PWV)',
      id: 'Kecepatan Gelombang Nadi (PWV)',
    },
    aliases: {
      en: ['PWV', 'aortic pulse wave velocity', 'carotid-femoral PWV'],
      id: ['PWV', 'kecepatan gelombang denyut', 'kecepatan rambat nadi'],
    },
    category: 'hypertension',
    symbol: 'PWV',
    definition: {
      en: 'The velocity at which the pressure wave generated by left ventricular ejection travels along the arterial tree, serving as the clinical gold standard metric for central arterial stiffness.',
      id: 'Kecepatan perambatan gelombang tekanan yang dihasilkan oleh ejeksi ventrikel kiri melintasi percabangan arteri, merupakan baku emas klinis untuk mengukur kekakuan arteri sentral.',
    },
    context: {
      en: 'PWV > 10 m/s indicates advanced arterial stiffening and drives isolated systolic hypertension through premature wave reflection.',
      id: 'Nilai PWV > 10 m/s menandai kekakuan arteri lanjut dan memicu hipertensi sistolik terisolasi akibat gelombang pantul prematur.',
    },
    relatedTopicId: 'hypertension',
  },
  {
    id: 'hypertensive-emergency',
    term: {
      en: 'Hypertensive Emergency',
      id: 'Hipertensi Emergensi',
    },
    aliases: {
      en: ['hypertensive crisis with TOD', 'malignant hypertension', 'hypertensive emergency'],
      id: ['krisis hipertensi emergensi', 'hipertensi maligna', 'hipertensi emergensi'],
    },
    category: 'hypertension',
    definition: {
      en: 'Severe elevation in arterial blood pressure (>180/120 mmHg) accompanied by acute, progressive Target Organ Damage involving the brain, heart, aorta, kidneys, or retina.',
      id: 'Peningkatan berat tekanan darah arteri (>180/120 mmHg) yang disertai oleh bukti kerusakan organ target akut yang mengancam nyawa pada otak, jantung, aorta, ginjal, atau retina.',
    },
    context: {
      en: 'Mandates immediate ICU admission and parenteral IV antihypertensive titration (reducing MAP by 20–25% in the first hour).',
      id: 'Menuntut perawatan intensif di ICU dan titrasi obat antihipertensi parenteral IV segera (menurunkan MAP 20–25% di jam pertama).',
    },
    relatedTopicId: 'hypertension',
  },
  {
    id: 'pulmonary-arterial-hypertension',
    term: {
      en: 'Pulmonary Arterial Hypertension (PAH)',
      id: 'Hipertensi Arteri Pulmonal (PAH)',
    },
    aliases: {
      en: ['PAH', 'WHO Group 1 PH', 'pulmonary hypertension'],
      id: ['PAH', 'hipertensi pulmonal', 'PH grup 1 WHO'],
    },
    category: 'hypertension',
    definition: {
      en: 'A progressive precapillary pulmonary vasculopathy defined by resting mean pulmonary arterial pressure >20 mmHg, pulmonary vascular resistance ≥2 Wood units, and PCWP ≤15 mmHg on right heart catheterization.',
      id: 'Vaskulopati paru prekapiler progresif yang ditandai oleh peningkatan tekanan arteri pulmonalis rata-rata >20 mmHg, resistansi vaskular paru ≥2 Wood unit, dan PCWP ≤15 mmHg pada kateterisasi jantung kanan.',
    },
    context: {
      en: 'Characterized by plexiform lesions and vascular remodeling, treated with targeted endothelin antagonists, PDE-5 inhibitors, and prostacyclin analogs.',
      id: 'Dicirikan oleh lesi pleksiform dan remodeling vaskular mikroskopis, diobati dengan antagonis endotelin, inhibitor PDE-5, dan analog prostasiklin.',
    },
    relatedTopicId: 'hypertension',
  },

  // ================= ECOLOGY & BIOMES =================
  {
    id: 'whittaker-diagram',
    term: {
      en: 'Whittaker Biome Diagram',
      id: 'Diagram Bioma Whittaker',
    },
    aliases: {
      en: ['whittaker model', 'whittaker classification', 'biome space'],
      id: ['model whittaker', 'klasifikasi whittaker'],
    },
    category: 'ecology',
    definition: {
      en: 'A bivariate climatological framework developed by Robert Whittaker mapping global terrestrial biomes across coordinates of Mean Annual Temperature (MAT, -15°C to +30°C) and Mean Annual Precipitation (MAP, 0 to 450 cm/yr).',
      id: 'Kerangka klimatologi bivariat yang dikembangkan oleh Robert Whittaker yang memetakan bioma darat global pada koordinat Suhu Rata-rata Tahunan (MAT, -15°C hingga +30°C) dan Presipitasi Rata-rata Tahunan (MAP, 0 hingga 450 cm/tahun).',
    },
    context: {
      en: 'Defines triangular biome envelopes showing how thermal limits and hydrological availability jointly constrain planetary life distribution.',
      id: 'Mendefinisikan amplop bioma segitiga yang menunjukkan bagaimana batas termal dan ketersediaan air bersama-sama membatasi distribusi kehidupan di Bumi.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'hadley-cell',
    term: {
      en: 'Hadley Circulation Cell',
      id: 'Sel Sirkulasi Hadley',
    },
    aliases: {
      en: ['hadley cell', 'tropical circulation'],
      id: ['sel hadley', 'sirkulasi tropis'],
    },
    category: 'ecology',
    definition: {
      en: 'A planetary-scale tropical atmospheric circulation cell characterized by convective rising air at the Intertropical Convergence Zone (ITCZ) and dynamic subsidence at approximately 30° North and South latitudes.',
      id: 'Sel sirkulasi atmosfer tropis skala planet yang dicirikan oleh kenaikan udara konvektif di ITCZ dan subsiden dinamis di sekitar lintang 30° Utara dan Selatan.',
    },
    context: {
      en: 'Adiabatic warming of sinking air in the descending branch creates the world’s great subtropical desert belts (e.g., Sahara, Arabian, Sonoran).',
      id: 'Pemanasan adiabatik udara yang turun di cabang subsiden melahirkan sabuk gurun subtropis dunia (seperti Sahara, Arab, Sonora).',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'itcz',
    term: {
      en: 'Intertropical Convergence Zone (ITCZ)',
      id: 'Zona Konvergensi Antar-Tropis (ITCZ)',
    },
    aliases: {
      en: ['ITCZ', 'thermal equator', 'doldrums'],
      id: ['ITCZ', 'ekuator termal'],
    },
    category: 'ecology',
    definition: {
      en: 'The low-pressure equatorial trough where the Northeast and Southeast Trade Winds converge, driving deep convective updrafts and heavy tropical precipitation.',
      id: 'Palung tekanan rendah khatulistiwa tempat bertemunya Angin Pasat Timur Laut dan Tenggara, memicu arus konveksi naik dan curah hujan tropis lebat.',
    },
    context: {
      en: 'Migrates seasonally with solar declination, driving wet and dry seasons across tropical savannas and monsoon forests.',
      id: 'Bergeser secara musiman mengikuti deklinasi matahari, mengendalikan musim hujan dan kemarau di sabana tropis dan hutan muson.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'permafrost',
    term: {
      en: 'Permafrost',
      id: 'Permafrost',
    },
    aliases: {
      en: ['cryolithosphere', 'permanently frozen ground'],
      id: ['tanah beku abadi'],
    },
    category: 'ecology',
    definition: {
      en: 'Subsurface soil, sediment, or rock that remains continuously at or below 0°C (32°F) for two or more consecutive years, underlying an active layer that thaws seasonally.',
      id: 'Lapisan tanah, sedimen, atau batuan bawah tanah yang suhunya berada secara kontinu pada atau di bawah 0°C selama dua tahun berturut-turut atau lebih.',
    },
    context: {
      en: 'Stores an estimated 1400–1600 Gt of ancient organic carbon, making its thaw a major positive climate feedback mechanism.',
      id: 'Menyimpan sekitar 1400–1600 Gt karbon organik purba, sehingga pencairannya menjadi mekanisme umpan balik iklim positif yang kritis.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'cryoturbation',
    term: {
      en: 'Cryoturbation (Frost Churning)',
      id: 'Krioturbasi (Pengadukan Beku)',
    },
    aliases: {
      en: ['frost churning', 'frost heaving'],
      id: ['pengadukan es tanah'],
    },
    category: 'ecology',
    definition: {
      en: 'The mechanical mixing and sorting of soil horizons driven by repeated freeze-thaw cycles and differential volume expansion of ice wedges in permafrost terrains.',
      id: 'Percampuran dan pemilahan mekanis horizon tanah akibat siklus beku-cair berulang dan pemuaian volume es pada lanskap permafrost.',
    },
    context: {
      en: 'Forms patterned ground including stone polygons, ice-wedge nets, and pingos across Arctic tundra Gelisols.',
      id: 'Membentuk pola tanah beraturan (patterned ground) seperti poligon batu dan irisan es pada tanah Gelisol tundra Arktik.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'stefan-equation',
    term: {
      en: "Stefan's Permafrost Thaw Equation",
      id: 'Persamaan Pencairan Stefan',
    },
    aliases: {
      en: ['Stefan equation', 'active layer formula'],
      id: ['rumus stefan'],
    },
    category: 'ecology',
    symbol: 'D = \\sqrt{\\frac{2 k_t \\cdot \\text{DDT}}{\\rho L}}',
    definition: {
      en: 'A thermodynamic heat-transfer formulation calculating the maximum depth D of active-layer thaw as a function of thermal conductivity, Thawing Degree Days (DDT), and latent heat of fusion.',
      id: 'Formulasi perpindahan panas termodinamika yang menghitung kedalaman maksimum D pencairan lapisan aktif sebagai fungsi konduktivitas termal, Thawing Degree Days (DDT), dan kalor laten fusi.',
    },
    context: {
      en: 'Demonstrates that thaw depth scales with the square root of cumulative warm degree days due to overlying thermal resistance.',
      id: 'Membuktikan bahwa kedalaman pencairan bertambah sebanding dengan akar kuadrat derajat-hari hangat kumulatif akibat resistansi termal lapisan atas.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'spodosol',
    term: {
      en: 'Spodosol (Podzol)',
      id: 'Spodosol (Podzol)',
    },
    aliases: {
      en: ['podzol', 'podzolic soil'],
      id: ['tanah podzol'],
    },
    category: 'ecology',
    definition: {
      en: 'An acidic, strongly leached soil order characteristic of coniferous boreal taiga forests, featuring an ash-gray eluvial albic E horizon overlying an illuvial spodic Bs horizon enriched in amorphous Fe/Al-humus complexes.',
      id: 'Ordo tanah masif masam dan tercuci kuat khas hutan taiga konifer boreal, dengan horizon eluvial albik E abu-abu keputihan di atas horizon spodis iluvial Bs kaya kompleks Fe/Al-humus.',
    },
    context: {
      en: 'Driven by slow decomposition of resinous conifer needles producing chelating fulvic acids under cold climates.',
      id: 'Dipicu oleh lambatnya dekomposisi serasah jarum konifer beresin yang menghasilkan asam fulvat pengkhelat di bawah iklim dingin.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'podzolization',
    term: {
      en: 'Podzolization',
      id: 'Podzolisasi',
    },
    aliases: {
      en: ['cheluviation', 'spodic pedogenesis'],
      id: ['proses podzolisasi'],
    },
    category: 'ecology',
    definition: {
      en: 'A pedogenic process whereby organic acids leached from acidic conifer needle litter chelate iron (Fe) and aluminum (Al) ions, translocating them downward from the upper horizon.',
      id: 'Proses pembentukan tanah di mana asam organik dari serasah jarum konifer mengkhelat ion besi (Fe) dan aluminium (Al), melarutkan dan memindahkannya ke horizon bawah.',
    },
    context: {
      en: 'Creates the diagnostic bleached quartz E horizon and red-brown spodic B horizon in boreal forest biomes.',
      id: 'Menciptakan horizon E kuarsa pucat dan horizon B spodis cokelat-kemerahan pada bioma hutan boreal.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'beer-lambert-canopy',
    term: {
      en: 'Canopy Beer-Lambert Extinction Law',
      id: 'Hukum Pelemahan Kanopi Beer-Lambert',
    },
    aliases: {
      en: ['canopy light attenuation', 'beer lambert law'],
      id: ['atenuasi cahaya kanopi'],
    },
    category: 'ecology',
    symbol: 'I(z) = I_0 · exp(-k · LAI)',
    definition: {
      en: 'Mathematical formulation describing exponential attenuation of Photosynthetically Active Radiation (PAR) through a plant canopy as a function of cumulative Leaf Area Index (LAI) and extinction coefficient k.',
      id: 'Formulasi matematika yang menjelaskan penurunan eksponensial radiasi aktif fotosintesis (PAR) melalui kanopi tanaman sebagai fungsi Indeks Luas Daun (LAI) dan koefisien pelemahan k.',
    },
    context: {
      en: 'Explains understory light limitations in temperate deciduous forests where forest floor PAR drops to <2% of full sunlight.',
      id: 'Menjelaskan keterbatasan cahaya lantai hutan gugur sedang di mana radiasi PAR turun hingga <2% dari sinar matahari terbuka.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'mollisol',
    term: {
      en: 'Mollisol',
      id: 'Mollisol',
    },
    aliases: {
      en: ['prairie soil', 'chernozem'],
      id: ['tanah prairi', 'chernozem'],
    },
    category: 'ecology',
    definition: {
      en: 'A highly fertile soil order characteristic of temperate grasslands, characterized by a deep, dark, organic-rich mollic epipedon (>25 cm thick) with granular structure and base saturation >50%.',
      id: 'Ordo tanah sangat subur khas padang rumput beriklim sedang, dicirikan oleh epipedon molik tebal berwarna gelap kaya bahan organik (>25 cm) dengan struktur remah dan kejenuhan basa >50%.',
    },
    context: {
      en: 'Formed by continuous in situ turnover of dense below-ground fibrous grass root networks (root-to-shoot ratio >4:1).',
      id: 'Terbentuk melalui pergantian in situ berulang dari sistem akar serabut rumput yang padat di bawah tanah (rasio akar-pucuk >4:1).',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'crassulacean-acid-metabolism',
    term: {
      en: 'Crassulacean Acid Metabolism (CAM)',
      id: 'Metabolisme Asam Krasulasea (CAM)',
    },
    aliases: {
      en: ['CAM photosynthesis', 'nocturnal CO2 fixation'],
      id: ['fotosintesis CAM', 'fiksasi malat CAM'],
    },
    category: 'ecology',
    definition: {
      en: 'A photosynthetic carbon fixation adaptation in xerophytic succulents where stomata open nocturnally to fix CO₂ via Phosphoenolpyruvate Carboxylase (PEPC) into vacuolar malic acid, which is decarboxylated behind closed stomata during the day.',
      id: 'Adaptasi fiksasi karbon fotosintesis pada sukulen gurun di mana stomata membuka di malam hari untuk memfiksasi CO₂ melalui enzim PEPC menjadi asam malat vakuola, yang didekarboksilasi saat siang hari dalam kondisi stomata tertutup.',
    },
    context: {
      en: 'Maximizes Water-Use Efficiency by avoiding daytime transpiration under extreme Vapor Pressure Deficits (VPD).',
      id: 'Memaksimalkan Efisiensi Penggunaan Air dengan menghindari transpirasi siang hari pada Defisit Tekanan Uap (VPD) ekstrem.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'water-use-efficiency',
    term: {
      en: 'Water-Use Efficiency (WUE)',
      id: 'Efisiensi Penggunaan Air (WUE)',
    },
    aliases: {
      en: ['WUE', 'photosynthetic water efficiency'],
      id: ['WUE'],
    },
    category: 'ecology',
    symbol: 'WUE = A / E',
    definition: {
      en: 'The ratio of net photosynthetic carbon assimilation rate (A) to transpirational water loss (E), quantifying biomass produced per unit of water consumed.',
      id: 'Rasio antara laju asimilasi karbon fotosintesis bersih (A) terhadap kehilangan air transpirasi (E), mengukur biomassa yang dihasilkan per satuan air yang dikonsumsi.',
    },
    context: {
      en: 'CAM plants attain the highest WUE (10–20 mmol C/mol H₂O), followed by C4 grasses (4–6) and C3 plants (1–3).',
      id: 'Tumbuhan CAM mencapai WUE tertinggi (10–20 mmol C/mol H₂O), diikuti rumput C4 (4–6) dan tumbuhan C3 (1–3).',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'biological-soil-crust',
    term: {
      en: 'Biological Soil Crust (Biocrust)',
      id: 'Kerak Tanah Biologis (Biocrust)',
    },
    aliases: {
      en: ['biocrust', 'cryptobiotic crust'],
      id: ['kerak kriptobiotik'],
    },
    category: 'ecology',
    definition: {
      en: 'A complex photosynthetic and diazotrophic micro-ecosystem of cyanobacteria, lichens, and mosses inhabiting the top millimeters of arid and semi-arid soils.',
      id: 'Mikro-ekosistem fotosintetik dan diazotrofik kompleks yang terdiri dari sianobakteri, lumut kerak, dan lumut daun yang mendiami lapisan beberapa milimeter teratas tanah arid.',
    },
    context: {
      en: 'Secretes exopolysaccharides to cement soil particles against wind erosion and contributes up to 70% of nitrogen fixation in desert biomes.',
      id: 'Menyekresikan eksopolisakarida untuk menyemen butiran tanah dari erosi angin dan menyumbang hingga 70% fiksasi nitrogen di bioma gurun.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'sclerophyll',
    term: {
      en: 'Sclerophyllous Vegetation',
      id: 'Vegetasi Sklerofil',
    },
    aliases: {
      en: ['sclerophyll', 'chaparral shrubs'],
      id: ['tumbuhan sklerofil'],
    },
    category: 'ecology',
    definition: {
      en: 'Evergreen vegetation characterized by small, stiff, leathery leaves with thick waxy cuticles and highly lignified tissues adapted to Mediterranean summer droughts and recurrent crown fire regimes.',
      id: 'Vegetasi selalu hijau yang memiliki daun kecil, kaku, dan liat dengan kutikula tebal serta jaringan terlignifikasi kuat yang teradaptasi terhadap kemarau musim panas Mediterania dan kebakaran hutan periodik.',
    },
    context: {
      en: 'Dominates California chaparral, Mediterranean maquis, South African fynbos, and Australian mallee ecosystems.',
      id: 'Mendominasi ekosistem chaparral California, maquis Mediterania, fynbos Afrika Selatan, dan mallee Australia.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'oxisol',
    term: {
      en: 'Oxisol (Ferralsol)',
      id: 'Oxisol (Ferralsol)',
    },
    aliases: {
      en: ['ferralsol', 'laterite soil'],
      id: ['tanah laterit', 'feralsol'],
    },
    category: 'ecology',
    definition: {
      en: 'An intensely weathered tropical soil order composed almost exclusively of insoluble iron and aluminum sesquioxides (hematite, gibbsite) and 1:1 kaolinite clay, with extremely low cation-exchange capacity and severe phosphorus fixation.',
      id: 'Ordo tanah tropis yang mengalami pelapukan sangat lanjut, tersusun hampir murni atas seskuioksida besi dan aluminium tidak larut serta liat kaolinit 1:1, dengan KTK sangat rendah dan fiksasi fosfor tinggi.',
    },
    context: {
      en: 'Supports hyper-diverse tropical rainforests purely through tight closed-loop mycorrhizal surface litter nutrient recycling.',
      id: 'Menopang hutan hujan tropis murni melalui siklus hara serasah mikoriza tertutup di permukaan tanah dangkal.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'buttress-roots',
    term: {
      en: 'Buttress Roots',
      id: 'Akar Banir (Akar Papan)',
    },
    aliases: {
      en: ['plank buttress', 'tree buttresses'],
      id: ['akar banir', 'akar papan'],
    },
    category: 'ecology',
    definition: {
      en: 'Massive, vertically flattened, planar root outgrowths extending 5–10 meters up emergent tropical tree trunks, serving as tensile brackets that anchor trees in shallow topsoils against windthrow.',
      id: 'Perluasan akar berbentuk papan pipih masif yang menjulang 5–10 meter ke atas batang pohon emergen tropis, berfungsi sebagai penopang tegangan tarik penahan angin pada tanah dangkal.',
    },
    context: {
      en: 'Biomechanical adaptation to shallow aerobic soil conditions where deep taproot development is prevented by seasonal waterlogging.',
      id: 'Adaptasi biomekanika terhadap kondisi tanah aerobik dangkal di mana perkembangan akar tunggang terhambat oleh genangan air.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'sverdrup-critical-depth',
    term: {
      en: "Sverdrup's Critical Depth",
      id: 'Kedalaman Kritis Sverdrup',
    },
    aliases: {
      en: ['critical depth hypothesis', 'sverdrup bloom'],
      id: ['kedalaman kritis sverdrup'],
    },
    category: 'ecology',
    symbol: 'z_crit',
    definition: {
      en: 'The threshold depth of surface vertical mixing at which integrated water-column phytoplankton gross photosynthesis exactly balances integrated community respiration.',
      id: 'Ambang batas kedalaman pengadukan vertikal permukaan di mana fotosintesis kotor fitoplankton kolom air tepat mengimbangi respirasi seluruh komunitas.',
    },
    context: {
      en: 'A spring phytoplankton bloom can initiate only when seasonal stratification shoals the mixed layer shallower than z_crit (z_mix < z_crit).',
      id: 'Ledakan fitoplankton musim semi hanya dapat terjadi saat stratifikasi musiman mendangkalkan lapisan campuran di atas z_crit (z_mix < z_crit).',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'aragonite-saturation',
    term: {
      en: 'Aragonite Saturation State',
      id: 'Derajat Kejenuhan Aragonit',
    },
    aliases: {
      en: ['omega arag', 'carbonate saturation'],
      id: ['saturasi aragonit'],
    },
    category: 'ecology',
    symbol: 'Ω_arag',
    definition: {
      en: 'The thermodynamic ratio of the ion activity product of calcium ([Ca²⁺]) and carbonate ([CO₃²⁻]) ions in seawater to the apparent stoichiometric solubility product K\'_sp of aragonite mineral.',
      id: 'Rasio termodinamika produk aktivitas ion kalsium ([Ca²⁺]) dan karbonat ([CO₃²⁻]) di air laut terhadap produk kelarutan stoikiometri K\'_sp mineral aragonit.',
    },
    context: {
      en: 'Reef-building corals require Ω_arag > 3.5 for optimal calcification; ocean acidification lowers Ω_arag toward dissolution (<1).',
      id: 'Karang pembangun terumbu membutuhkan Ω_arag > 3,5 untuk kalsifikasi optimal; asidifikasi samudra menurunkan Ω_arag menuju kondisi pelarutan (<1).',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'coral-bleaching',
    term: {
      en: 'Coral Bleaching',
      id: 'Pemutihan Karang (Coral Bleaching)',
    },
    aliases: {
      en: ['mass bleaching', 'thermal coral stress'],
      id: ['pemutihan karang'],
    },
    category: 'ecology',
    definition: {
      en: 'The breakdown of mutualism between scleractinian coral animals and their endosymbiotic dinoflagellates (Symbiodiniaceae) triggered by elevated Sea Surface Temperatures and high irradiance.',
      id: 'Keruntuhan simbiosis mutualisme antara hewan karang dan dinoflagellata endosimbionnya (Symbiodiniaceae) yang dipicu oleh peningkatan Suhu Permukaan Laut dan radiasi matahari tinggi.',
    },
    context: {
      en: 'Photosystem II failure in symbionts generates cytotoxic Reactive Oxygen Species (ROS), prompting host polyp expulsion and exposing the stark white calcium carbonate skeleton.',
      id: 'Kerusakan Fotosistem II pada simbion menghasilkan ROS beracun, memicu pengeluaran paksa simbion oleh inang polip dan memperlihatkan kerangka kapur putih.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'dimictic-lake',
    term: {
      en: 'Dimictic Lake Overturn',
      id: 'Perputaran Danau Dimiktik',
    },
    aliases: {
      en: ['dimictic circulation', 'lake overturn'],
      id: ['sirkulasi dimiktik'],
    },
    category: 'ecology',
    definition: {
      en: 'The limnological circulation cycle of temperate freshwater lakes that undergo complete vertical water mixing twice per year (in spring and autumn) when surface waters reach the maximum water density temperature of 3.98°C.',
      id: 'Siklus sirkulasi limnologi danau air tawar beriklim sedang yang mengalami perputaran vertikal penuh dua kali setahun (musim semi dan gugur) saat air permukaan mencapai kerapatan maksimum 3,98°C.',
    },
    context: {
      en: 'Re-oxygenates deep benthic hypolimnetic sediments and replenishes depleted surface epilimnetic nutrients.',
      id: 'Mengoksigenasi kembali sedimen dasar hipolimnion dan memasok kembali nutrisi ke permukaan epilimnion.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'lindeman-efficiency',
    term: {
      en: "Lindeman's Trophic Transfer Efficiency",
      id: 'Efisiensi Transfer Trofik Lindeman',
    },
    aliases: {
      en: ['10% rule', 'ecological efficiency'],
      id: ['hukum 10% lindeman'],
    },
    category: 'ecology',
    symbol: '\\lambda_n = \\frac{P_n}{P_{n-1}} \\approx 10\\%',
    definition: {
      en: 'The proportion of energy transferred from one trophic level to the next, averaging approximately 10% due to non-consumed biomass, egestion, and metabolic cellular respiration heat dissipation.',
      id: 'Proporsi energi yang ditransfer dari satu tingkat trofik ke tingkat berikutnya, rata-rata bernilai sekitar 10% akibat biomassa tak termakan, egesti, dan disipasi panas respirasi seluler.',
    },
    context: {
      en: 'Explains why food chains are thermodynamically restricted to 4–5 links and drives biomagnification of persistent toxins in apex predators.',
      id: 'Menjelaskan mengapa rantai makanan dibatasi secara termodinamika hanya 4–5 tingkat dan mendorong biomagnifikasi racun pada predator puncak.',
    },
    relatedTopicId: 'biomes-ecology',
  },
  {
    id: 'redfield-ratio',
    term: {
      en: 'Marine Redfield Ratio',
      id: 'Rasio Redfield Samudra',
    },
    aliases: {
      en: ['Redfield stoichiometry', 'C:N:P ratio'],
      id: ['rasio redfield'],
    },
    category: 'ecology',
    symbol: '106 C : 16 N : 1 P',
    definition: {
      en: 'The remarkably constant atomic ratio of carbon, nitrogen, and phosphorus found in marine phytoplankton and deep unperturbed seawater, discovered by Alfred Redfield in 1934.',
      id: 'Rasio atomik antara karbon, nitrogen, dan fosfor yang sangat konstan pada fitoplankton laut dan air samudra dalam, ditemukan oleh Alfred Redfield pada tahun 1934.',
    },
    context: {
      en: 'Reflects fundamental biochemical stoichiometry of proteins (N), nucleic acids/ATP (P), and structural carbohydrates (C).',
      id: 'Mencerminkan stoikiometri biokimiawi esensial dari protein (N), asam nukleat/ATP (P), dan karbohidrat struktural (C).',
    },
    relatedTopicId: 'biomes-ecology',
  },
  // ================= HYBRID ELECTRIC VEHICLES =================
  {
    id: 'mhev',
    term: {
      en: 'Mild Hybrid Electric Vehicle (MHEV)',
      id: 'Kendaraan Mild Hybrid (MHEV)',
    },
    aliases: {
      en: ['mild hybrid', '48V hybrid', 'MHEV', '48-volt hybrid'],
      id: ['mild hybrid', 'hibrida ringan', 'MHEV'],
    },
    category: 'hybrid',
    symbol: 'MHEV (48V)',
    pronunciation: '/maɪld ˈhaɪ.brɪd/',
    definition: {
      en: 'An electrified vehicle that pairs an internal combustion engine with a low-voltage (typically 48V) starter-generator and a small lithium buffer battery (0.4–1.0 kWh). It supports smooth start-stop, crankshaft torque assist, and regenerative coasting, but cannot propel the vehicle on electricity alone.',
      id: 'Kendaraan elektrifikasi yang memadukan mesin pembakaran internal dengan starter-generator tegangan rendah (umumnya 48V) dan baterai litium penyangga kecil (0,4–1,0 kWh). Sistem ini mendukung start-stop halus, bantuan torsi kruk as, dan peluncuran regeneratif, namun tidak dapat melaju murni bertenaga listrik.',
    },
    context: {
      en: 'Operates within the Safety Extra-Low Voltage (SELV ≤ 60V) limit to deliver 10–15% fuel economy gains without requiring high-voltage interlocks.',
      id: 'Bekerja dalam batas aman Safety Extra-Low Voltage (SELV ≤ 60V) untuk menghemat 10–15% BBM tanpa membutuhkan interlock tegangan tinggi yang mahal.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'hev',
    term: {
      en: 'Full Hybrid Electric Vehicle (HEV)',
      id: 'Kendaraan Full Hybrid (HEV)',
    },
    aliases: {
      en: ['full hybrid', 'strong hybrid', 'HEV', 'series-parallel hybrid'],
      id: ['full hybrid', 'hibrida penuh', 'HEV'],
    },
    category: 'hybrid',
    symbol: '\\text{HEV } (200\\text{V}-300\\text{V})',
    pronunciation: '/fʊl ˈhaɪ.brɪd/',
    definition: {
      en: 'A high-voltage hybrid vehicle that integrates an internal combustion engine (often Atkinson cycle), two electric motor-generators, and a 1.3–2.0 kWh battery via a planetary power-split transmission (e-CVT). It can propel the vehicle in pure EV stealth mode at low speeds and captures substantial regenerative braking energy without external plug-in charging.',
      id: 'Kendaraan hibrida tegangan tinggi yang memadukan mesin bensin (sering kali siklus Atkinson), dua motor-generator listrik, dan baterai 1,3–2,0 kWh melalui transmisi pembagi daya roda gigi planet (e-CVT). Mampu melaju murni bertenaga listrik pada kecepatan rendah dan memulihkan energi pengereman masif tanpa colokan listrik luar.',
    },
    context: {
      en: 'Exemplified by Toyota Hybrid Synergy Drive, continuously optimizing engine RPM to achieve thermal efficiencies exceeding 40%.',
      id: 'Dipelopori oleh Toyota Hybrid Synergy Drive, secara kontinu mengoptimalkan RPM mesin untuk meraih efisiensi termal di atas 40%.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'phev',
    term: {
      en: 'Plug-in Hybrid Electric Vehicle (PHEV)',
      id: 'Kendaraan Plug-in Hybrid (PHEV)',
    },
    aliases: {
      en: ['plug-in hybrid', 'PHEV', 'plug in hybrid'],
      id: ['plug-in hybrid', 'hibrida colok', 'PHEV'],
    },
    category: 'hybrid',
    symbol: '\\text{PHEV } (350\\text{V}-400\\text{V})',
    pronunciation: '/plʌɡ ɪn ˈhaɪ.brɪd/',
    definition: {
      en: 'A hybrid vehicle equipped with a high-capacity traction battery (12–25 kWh) that can be recharged from an external electrical grid outlet. It operates in pure electric Charge-Depleting (CD) mode for 50–100 km before switching to hybrid Charge-Sustaining (CS) mode.',
      id: 'Kendaraan hibrida yang dibekali baterai traksi berkapasitas besar (12–25 kWh) yang dapat diisi ulang dari stopkontak jaringan listrik eksternal. Beroperasi dalam mode listrik murni (Charge-Depleting) sejauh 50–100 km sebelum beralih ke mode hibrida (Charge-Sustaining).',
    },
    context: {
      en: 'Features an onboard AC charger (3.3–11 kW) and a disconnect clutch (K0) that allows high-speed electric cruising without engine friction drag.',
      id: 'Memiliki pengisi daya AC onboard (3,3–11 kW) dan kopling pemutus (K0) yang memungkinkan laju kencang bertenaga listrik tanpa gesekan mesin bensin.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'erev',
    term: {
      en: 'Extended-Range Electric Vehicle (EREV)',
      id: 'Kendaraan Listrik Jangkauan Diperluas (EREV)',
    },
    aliases: {
      en: ['extended-range EV', 'range extender', 'EREV', 'series hybrid', 'REx'],
      id: ['extended-range EV', 'range extender', 'EREV', 'hibrida seri'],
    },
    category: 'hybrid',
    symbol: 'EREV / REx',
    pronunciation: '/ɪkˈstɛn.dɪd reɪndʒ iː viː/',
    definition: {
      en: 'A pure series hybrid vehicle where the drive wheels are propelled 100% by electric traction motors at all times. An onboard internal combustion engine is mechanically decoupled from the wheels, acting solely as a steady-state electric generator to recharge the 30–45 kWh battery buffer when depleted.',
      id: 'Kendaraan hibrida seri murni di mana roda penggerak digerakkan 100% oleh motor traksi listrik setiap saat. Mesin pembakaran internal sama sekali tidak memiliki hubungan mekanis ke roda, melainkan murni bekerja sebagai generator listrik stasioner untuk mengisi baterai penyangga 30–45 kWh saat menipis.',
    },
    context: {
      en: 'Eliminates range anxiety while running the generator engine exclusively at its optimal Brake Specific Fuel Consumption (BSFC) sweet spot (~41% thermal efficiency).',
      id: 'Meniadakan kecemasan jarak tempuh (range anxiety) sekaligus mengoperasikan mesin generator tepat di titik efisiensi konsumsi bahan bakar (BSFC) terbaiknya (~41% efisiensi termal).',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'planetary-power-split',
    term: {
      en: 'Epicyclic Planetary Power-Split Device (PSD)',
      id: 'Pembagi Daya Roda Gigi Planet Episiklik (PSD)',
    },
    aliases: {
      en: ['power split device', 'PSD', 'planetary gear set', 'epicyclic gear train'],
      id: ['power split device', 'roda gigi planet', 'PSD'],
    },
    category: 'hybrid',
    symbol: 'ω_c(1 + ρ) = ω_s + ρ ω_r',
    pronunciation: '/ˌɛp.ɪˈsaɪ.klɪk plæn.ɪˌtɛr.i/',
    definition: {
      en: 'A compact epicyclic gear mechanism consisting of a central Sun gear (coupled to MG1), Planet Carrier (coupled to the engine), and outer Ring gear (coupled to MG2 and wheels). It splits engine mechanical torque between direct wheel drive and electrical generation.',
      id: 'Mekanisme roda gigi episiklik kompak yang terdiri dari roda gigi Matahari (Sun gear terhubung ke MG1), Pembawa Planet (Planet Carrier terhubung ke mesin), dan roda gigi Cincin luar (Ring gear terhubung ke MG2 dan roda). Mekanisme ini membagi torsi mesin antara penggerak roda langsung dan pembangkitan listrik.',
    },
    context: {
      en: 'Governed by the Willis kinematic equation, allowing continuous electro-mechanical variable transmission without belts, cones, or friction clutches.',
      id: 'Diatur oleh persamaan kinematika Willis, memungkinkan transmisi variabel kontinu elektro-mekanis tanpa sabuk atau kopling gesek.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'atkinson-cycle',
    term: {
      en: 'Atkinson Combustion Cycle',
      id: 'Siklus Pembakaran Atkinson',
    },
    aliases: {
      en: ['atkinson cycle', 'late intake valve closing', 'LIVC', 'miller cycle'],
      id: ['siklus atkinson', 'atkinson cycle'],
    },
    category: 'hybrid',
    symbol: 'r_e > r_c (expansion > compression)',
    pronunciation: '/ˈæt.kɪn.sən ˈsaɪ.kəl/',
    definition: {
      en: 'A thermodynamic four-stroke internal combustion cycle in which late intake valve closing (LIVC) makes the expansion ratio substantially larger than the effective compression ratio. This extracts more mechanical work from expanding combustion gases, boosting thermal efficiency above 40%.',
      id: 'Siklus termodinamika empat langkah pada mesin pembakaran internal di mana penutupan katup hisap terlambat (LIVC) membuat rasio ekspansi jauh lebih panjang daripada rasio kompresi efektif. Hal ini memeras lebih banyak kerja mekanis dari pemuaian gas, mendongkrak efisiensi termal melampaui 40%.',
    },
    context: {
      en: 'Inherently compromises low-RPM torque, which is compensated by the instantaneous low-end torque delivery of the hybrid electric motor.',
      id: 'Mengakibatkan torsi RPM rendah yang lebih lemah, yang kemudian disempurnakan secara instan oleh limpahan torsi motor listrik hibrida.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'bsg-isg',
    term: {
      en: 'Belt-driven / Integrated Starter Generator (BSG/ISG)',
      id: 'Starter Generator Sabuk / Terintegrasi (BSG/ISG)',
    },
    aliases: {
      en: ['BSG', 'ISG', 'BiSG', 'integrated starter generator', 'belt starter generator'],
      id: ['BSG', 'ISG', 'starter generator'],
    },
    category: 'hybrid',
    symbol: 'BSG / ISG (48V)',
    pronunciation: '/stɑːr.tər ˈdʒɛn.ə.reɪ.tər/',
    definition: {
      en: 'An electric motor-generator integrated into an internal combustion engine either via the accessory serpentine belt (P0 BSG) or directly mounted on the crankshaft flywheel (P1 ISG). It replaces both the alternator and the traditional starter motor.',
      id: 'Motor-generator listrik yang diintegrasikan ke mesin pembakaran internal melalui sabuk aksesori (P0 BSG) atau dibaut langsung pada poros engkol flywheel (P1 ISG). Komponen ini menggantikan alternator konvensional sekaligus motor dinamo starter.',
    },
    context: {
      en: 'Spins the engine from 0 to 800+ RPM in under 300 ms, eliminating start-stop vibration and providing immediate torque fill during turbocharger spool-up.',
      id: 'Memutar mesin dari 0 hingga 800+ RPM dalam waktu di bawah 300 ms, meniadakan getaran start-stop dan memberi dorongan torsi instan saat turbo mengisi tekanan.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'ecvt',
    term: {
      en: 'Electronic Continuously Variable Transmission (e-CVT)',
      id: 'Transmisi Variabel Kontinu Elektronik (e-CVT)',
    },
    aliases: {
      en: ['e-CVT', 'eCVT', 'hybrid e-CVT'],
      id: ['e-CVT', 'eCVT'],
    },
    category: 'hybrid',
    symbol: 'e-CVT',
    pronunciation: '/iː siː viː tiː/',
    definition: {
      en: 'A transmission topology that achieves stepless continuously variable gear ratios by electronically controlling the rotational speeds of motor-generators interacting with a planetary gear set, completely dispensing with hydraulic torque converters and friction belts.',
      id: 'Topologi transmisi yang menghasilkan rasio gigi tanpa jeda (stepless continuously variable) dengan mengendalikan kecepatan putar motor-generator yang berinteraksi dengan set roda gigi planet secara elektronik, tanpa konverter torsi atau sabuk gesek.',
    },
    context: {
      en: 'Eliminates mechanical shifting shock, gear hunting, and hydraulic pumping losses inherent to conventional automatic gearboxes.',
      id: 'Menghilangkan hentakan pergantian gigi, keraguan perpindahan rasio, dan kerugian pemompaan hidrolik pada girboks otomatis konvensional.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'k0-clutch',
    term: {
      en: 'K0 Engine Disconnect Clutch',
      id: 'Kopling Pemutus Mesin K0',
    },
    aliases: {
      en: ['K0 clutch', 'engine disconnect clutch', 'separator clutch'],
      id: ['kopling K0', 'kopling pemutus mesin'],
    },
    category: 'hybrid',
    symbol: 'K0 Clutch',
    pronunciation: '/keɪ zɪə.roʊ klʌtʃ/',
    definition: {
      en: 'An automated electro-hydraulic or electromechanical clutch positioned between the internal combustion engine crankshaft and the P2 electric motor in parallel and plug-in hybrids. Disengaging K0 decouples the engine so the electric motor propels the car with zero engine drag.',
      id: 'Kopling elektro-hidrolik atau elektro-mekanis otomatis yang ditempatkan di antara poros engkol mesin bensin dan motor listrik P2 pada sistem hibrida paralel dan plug-in. Membuka kopling K0 memutuskan hubungan mesin sehingga motor listrik dapat melajukan mobil tanpa hambatan gesek mesin.',
    },
    context: {
      en: 'Enables pure zero-emission electric driving up to highway speeds (135–140 km/h) in modern PHEVs.',
      id: 'Memungkinkan pengendaraan listrik murni bebas emisi hingga kecepatan jalan tol (135–140 km/jam) pada mobil PHEV modern.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'charge-depleting',
    term: {
      en: 'Charge-Depleting (CD) Mode',
      id: 'Mode Pengosongan Muatan (CD)',
    },
    aliases: {
      en: ['CD mode', 'charge depleting', 'EV mode in PHEV'],
      id: ['mode CD', 'charge depleting'],
    },
    category: 'hybrid',
    symbol: '\\text{CD Mode (SoC } 100\\% \\to 20\\%\\text{)}',
    pronunciation: '/tʃɑːrdʒ dɪˈpliː.tɪŋ/',
    definition: {
      en: 'The operational state of a Plug-in Hybrid or EREV wherein vehicle propulsion is supplied primarily or exclusively by grid-charged electricity from the high-voltage battery, allowing the battery State of Charge to systematically decline.',
      id: 'Status operasional pada mobil Plug-in Hybrid atau EREV di mana propulsi kendaraan disuplai secara utama atau eksklusif oleh listrik jaringan dari baterai tegangan tinggi, membiarkan persentase State of Charge baterai berkurang secara bertahap.',
    },
    context: {
      en: 'Persists until the battery SoC reaches the lower reserve floor (typically ~15–20%), triggering automatic transition to Charge-Sustaining mode.',
      id: 'Berlangsung hingga SoC baterai menyentuh batas cadangan bawah (umumnya ~15–20%), yang memicu peralihan otomatis ke mode Charge-Sustaining.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'charge-sustaining',
    term: {
      en: 'Charge-Sustaining (CS) Mode',
      id: 'Mode Penjagaan Muatan (CS)',
    },
    aliases: {
      en: ['CS mode', 'charge sustaining', 'hybrid mode in PHEV'],
      id: ['mode CS', 'charge sustaining'],
    },
    category: 'hybrid',
    symbol: '\\text{CS Mode (SoC } \\approx \\text{const)}',
    pronunciation: '/tʃɑːrdʒ səˈsteɪ.nɪŋ/',
    definition: {
      en: 'The operational state of a PHEV or EREV entered once the high-voltage battery has been depleted to its reserve buffer. The powertrain operates as a conventional full hybrid, dynamically balancing engine power and regenerative braking to maintain battery SoC within a stable equilibrium band.',
      id: 'Status operasional pada PHEV atau EREV yang diaktifkan setelah daya baterai tegangan tinggi terkuras hingga batas penyangga cadangan. Powertrain bekerja layaknya full hybrid konvensional, menyeimbangkan tenaga mesin dan rem regeneratif untuk menjaga SoC baterai dalam pita keseimbangan yang stabil.',
    },
    context: {
      en: 'Guarantees continuous peak driving performance and hill-climbing reserves even after grid-charged energy is exhausted.',
      id: 'Menjamin performa akselerasi puncak dan kemampuan menanjak tetap terjaga meskipun daya listrik colokan sudah habis terpakai.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'ecms',
    term: {
      en: 'Equivalent Consumption Minimization Strategy (ECMS)',
      id: 'Strategi Minimasi Konsumsi Ekuivalen (ECMS)',
    },
    aliases: {
      en: ['ECMS', 'equivalent fuel consumption', 'Hamiltonian energy management'],
      id: ['ECMS', 'strategi konsumsi ekuivalen'],
    },
    category: 'hybrid',
    symbol: 'H = \\dot{m}_{\\text{fuel}} + s(t) \\cdot \\frac{P_{\\text{batt}}}{\\text{LHV}}',
    pronunciation: '/iː siː ɛm ɛs/',
    definition: {
      en: 'A real-time energy management optimization algorithm that converts battery electrical power consumption into an equivalent instantaneous fuel mass flow rate via an equivalence factor s(t). By minimizing the resulting Hamiltonian at each control timestep, it calculates the optimal power split between engine and battery.',
      id: 'Algoritma optimasi manajemen energi real-time yang mengonversi konsumsi daya listrik baterai menjadi laju aliran massa bahan bakar ekuivalen melalui faktor s(t). Dengan meminimalkan fungsi Hamiltonian pada setiap langkah waktu kendali, algoritma ini menetapkan pembagian daya paling optimal antara mesin dan baterai.',
    },
    context: {
      en: 'Derived from Pontryagin\'s Minimum Principle, dynamically adapting s(t) based on current battery SoC and predicted navigation elevation profiles.',
      id: 'Diturunkan dari Prinsip Minimum Pontryagin, secara dinamis menyesuaikan nilai s(t) berdasarkan SoC baterai dan kontur elevasi jalan dari sistem navigasi.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'bsfc',
    term: {
      en: 'Brake Specific Fuel Consumption (BSFC)',
      id: 'Konsumsi Bahan Bakar Spesifik Efektif (BSFC)',
    },
    aliases: {
      en: ['BSFC', 'brake specific fuel consumption', 'specific fuel consumption'],
      id: ['BSFC', 'konsumsi bahan bakar spesifik'],
    },
    category: 'hybrid',
    symbol: '\\text{BSFC} = \\frac{\\dot{m}_{\\text{fuel}}}{P_{\\text{mech}}} \\quad [\\text{g/kWh}]',
    pronunciation: '/biː ɛs ɛf siː/',
    definition: {
      en: 'A measure of the fuel efficiency of any combustion engine, calculated as the fuel mass flow rate consumed per unit of mechanical shaft power output (measured in grams of fuel per kilowatt-hour, g/kWh). Lower values denote higher thermodynamic efficiency.',
      id: 'Ukuran efisiensi bahan bakar mesin pembakaran internal, dihitung sebagai laju massa bahan bakar yang dihabiskan per unit daya mekanis poros yang dihasilkan (dinyatakan dalam gram bahan bakar per kilowatt-jam, g/kWh). Semakin rendah nilainya, semakin tinggi efisiensi termodinamika mesin.',
    },
    context: {
      en: 'Modern Atkinson and EREV range-extender engines achieve minimum BSFC values around 205–215 g/kWh, corresponding to >41% brake thermal efficiency.',
      id: 'Mesin Atkinson dan generator range extender modern mampu meraih nilai BSFC serendah 205–215 g/kWh, setara dengan efisiensi termal efektif di atas 41%.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'p2-hybrid',
    term: {
      en: 'P2 Hybrid Powertrain Architecture',
      id: 'Arsitektur Powertrain Hibrida P2',
    },
    aliases: {
      en: ['P2 hybrid', 'P2 topology', 'transmission input hybrid'],
      id: ['hibrida P2', 'arsitektur P2'],
    },
    category: 'hybrid',
    symbol: 'P2 Architecture',
    pronunciation: '/piː tuː ˈhaɪ.brɪd/',
    definition: {
      en: 'A hybrid powertrain topology where the electric traction motor is located on the transmission input shaft, between the engine disconnect clutch (K0) and the multi-speed gearbox (such as an 8-speed automatic or dual-clutch transmission).',
      id: 'Topologi powertrain hibrida di mana motor traksi listrik ditempatkan pada poros input transmisi, persis di antara kopling pemutus mesin (K0) dan girboks multi-percepatan (seperti transmisi otomatis 8-kecepatan atau kopling ganda DCT).',
    },
    context: {
      en: 'Allows the electric motor to leverage all transmission gear ratios for high torque at low speeds and high efficiency at cruising speeds, while enabling complete engine-off electric propulsion.',
      id: 'Memungkinkan motor listrik memanfaatkan seluruh rasio gigi transmisi untuk menghasilkan torsi tinggi saat pelan dan efisiensi tinggi saat melaju cepat, sembari mendukung pengendaraan listrik saat mesin mati total.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'p4-eaxle',
    term: {
      en: 'P4 Electric Axle (e-Axle)',
      id: 'Gardan Listrik Belakang P4 (e-Axle)',
    },
    aliases: {
      en: ['P4 hybrid', 'e-Axle', 'electric all wheel drive', 'e-AWD'],
      id: ['gardan listrik P4', 'e-Axle', 'e-AWD'],
    },
    category: 'hybrid',
    symbol: 'P4 e-Axle',
    pronunciation: '/piː fɔːr iː ˈæks.əl/',
    definition: {
      en: 'An electric propulsion unit integrated directly onto the opposite axle of the primary engine drivetrain (typically the rear axle). It delivers on-demand electronic all-wheel drive (e-AWD) and maximizes regenerative braking energy recovery without requiring mechanical prop shafts or center transfer cases.',
      id: 'Unit propulsi motor listrik yang dipasang langsung pada as roda seberang dari penggerak mesin utama (biasanya di as roda belakang). Unit ini menghasilkan penggerak semua roda elektronik (e-AWD) instan dan memaksimalkan pemulihan energi rem tanpa poros transmisi tengah mekanis.',
    },
    context: {
      en: 'Dramatically improves vehicle traction on wet or icy roads while reducing vehicle curb weight by eliminating mechanical AWD hardware.',
      id: 'Meningkatkan traksi kendaraan secara signifikan di jalan licin atau bersalju sekaligus memangkas bobot kendaraan dengan meniadakan perangkat mekanis 4WD konvensional.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'hybridization-factor',
    term: {
      en: 'Hybridization Factor (HF)',
      id: 'Faktor Hibridisasi (HF)',
    },
    aliases: {
      en: ['hybridization factor', 'degree of electrification', 'electrification factor'],
      id: ['faktor hibridisasi', 'tingkat elektrifikasi'],
    },
    category: 'hybrid',
    symbol: 'HF = P_{\\text{EM}} / (P_{\\text{EM}} + P_{\\text{ICE}})',
    pronunciation: '/ˌhaɪ.brɪ.daɪˈzeɪ.ʃən ˈfæk.tər/',
    definition: {
      en: 'The mathematical ratio of peak electric motor power to total installed powertrain power (internal combustion engine plus electric motors). Quantifies the degree of vehicular electrification from micro hybrids (~0.05) to pure series range extenders (~1.0).',
      id: 'Rasio matematis antara tenaga puncak motor listrik terhadap total tenaga terpasang powertrain (mesin pembakaran dalam ditambah motor listrik). Mengukur tingkat elektrifikasi kendaraan dari mikro hibrida (~0,05) hingga perpanjangan jarak serial murni (~1,0).',
    },
    context: {
      en: 'A foundational benchmark metric used by automotive powertrain engineers to categorize hybrid system capabilities, regenerative brake limits, and battery sizing requirements.',
      id: 'Metrik acuan fundamental yang digunakan insinyur otomotif untuk mengklasifikasikan kapabilitas sistem hibrida, batas pengereman regeneratif, dan kapasitas baterai.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'tank-to-wheel',
    term: {
      en: 'Tank-to-Wheel (TTW) Efficiency',
      id: 'Efisiensi Tank-to-Wheel (TTW)',
    },
    aliases: {
      en: ['tank-to-wheel', 'TTW efficiency', 'tank to wheel'],
      id: ['tank-to-wheel', 'efisiensi tank-to-wheel'],
    },
    category: 'hybrid',
    symbol: '\\eta_{\\text{TTW}} = E_{\\text{tractive}} / E_{\\text{in}}',
    pronunciation: '/tæŋk tuː wiːl/',
    definition: {
      en: 'The ratio of net mechanical tractive energy delivered at the vehicle road wheels to the total chemical and electrical energy drawn from the fuel tank and battery pack during a drive cycle.',
      id: 'Rasio antara energi traksi mekanis netto yang tersalurkan ke roda kendaraan terhadap total energi kimia dan listrik yang dikonsumsi dari tangki bahan bakar dan baterai selama siklus berkendara.',
    },
    context: {
      en: 'Pure ICE vehicles achieve only 20–30% TTW efficiency in city driving due to idling and brake losses, whereas full hybrids and PHEVs exceed 40–50% TTW efficiency.',
      id: 'Mobil bensin konvensional hanya mencapai efisiensi TTW 20–30% di perkotaan akibat stasioner dan rugi pengereman, sedangkan mobil hybrid penuh dan PHEV melampaui efisiensi 40–50% TTW.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'series-hybrid',
    term: {
      en: 'Series Hybrid Architecture',
      id: 'Arsitektur Hibrida Serial',
    },
    aliases: {
      en: ['series hybrid', 'series powertrain', 'series architecture'],
      id: ['hibrida serial', 'arsitektur serial'],
    },
    category: 'hybrid',
    symbol: 'P_{\\text{ICE}} \\to \\text{Gen} \\to \\text{Motor}',
    pronunciation: '/ˈsɪə.riːz ˈhaɪ.brɪd/',
    definition: {
      en: 'A hybrid powertrain topology where the internal combustion engine is completely mechanically decoupled from the drive wheels, driving solely an electric generator that feeds the traction battery and electric drive motor.',
      id: 'Topologi powertrain hibrida di mana mesin bensin terputus secara mekanis dari roda penggerak, hanya memutar generator listrik untuk menyuplai baterai traksi dan motor penggerak.',
    },
    context: {
      en: 'Found in Extended-Range Electric Vehicles (EREV), allowing the combustion engine to operate continuously at its single most efficient BSFC plateau regardless of vehicle road speed.',
      id: 'Ditemukan pada Extended-Range Electric Vehicles (EREV), memungkinkan mesin beroperasi stabil pada titik efisiensi BSFC tertingginya tanpa terpengaruh kecepatan mobil.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  {
    id: 'parallel-hybrid',
    term: {
      en: 'Parallel Hybrid Architecture',
      id: 'Arsitektur Hibrida Paralel',
    },
    aliases: {
      en: ['parallel hybrid', 'parallel powertrain', 'parallel architecture'],
      id: ['hibrida paralel', 'arsitektur paralel'],
    },
    category: 'hybrid',
    symbol: '(P_{\\text{ICE}} + P_{\\text{EM}}) \\to \\text{Wheel}',
    pronunciation: '/ˈpær.ə.lel ˈhaɪ.brɪd/',
    definition: {
      en: 'A hybrid powertrain topology where both the internal combustion engine and the electric motor are mechanically linked to the drive wheels, allowing either or both to deliver tractive torque simultaneously.',
      id: 'Topologi powertrain hibrida di mana mesin pembakaran internal dan motor listrik terhubung secara mekanis ke roda penggerak, memungkinkan salah satu atau keduanya menyalurkan torsi traksi secara bersamaan.',
    },
    context: {
      en: 'Commonly realized through P2 configurations with an engine disconnect clutch (K0), providing high acceleration boost and highway cruising efficiency.',
      id: 'Umumnya diwujudkan melalui konfigurasi P2 dengan kopling pemutus mesin (K0), memberikan dorongan akselerasi tinggi dan efisiensi jelajah jalan bebas hambatan.',
    },
    relatedTopicId: 'hybrid-vehicles',
  },
  // ================= BATTERY STORAGE & UPCOMING CHEMISTRIES =================
  {
    id: 'bess',
    term: {
      en: 'Battery Energy Storage System (BESS)',
      id: 'Sistem Penyimpanan Energi Baterai (BESS)',
    },
    aliases: {
      en: ['BESS', 'grid storage', 'utility storage', 'containerized BESS'],
      id: ['BESS', 'penyimpanan jaringan', 'baterai skala jaringan'],
    },
    category: 'battery-storage',
    symbol: '\\text{BESS}',
    pronunciation: '/bɛs/',
    definition: {
      en: 'An electrochemical facility integrating battery cell modules, power conversion inverters, thermal HVAC cooling, and control systems to deliver utility-scale power dispatch, frequency regulation, and renewable buffering.',
      id: 'Fasilitas elektrokimia terpadu yang memadukan modul sel baterai, inverter konversi daya, pendingin termal HVAC, dan sistem kendali untuk menyalurkan daya skala utilitas, regulasi frekuensi, dan penyerapan energi terbarukan.',
    },
    context: {
      en: 'Critical infrastructure for stabilizing decarbonized power grids experiencing high penetration of intermittent solar and wind generation.',
      id: 'Infrastruktur kritis untuk menstabilkan jaringan listrik terdekarbonisasi yang memiliki penetrasi pembangkit surya dan angin intermiten tinggi.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'lcos',
    term: {
      en: 'Levelized Cost of Storage (LCOS)',
      id: 'Biaya Penyimpanan Tersamaratakan (LCOS)',
    },
    aliases: {
      en: ['LCOS', 'storage levelized cost', 'storage cost per MWh'],
      id: ['LCOS', 'biaya listrik tersamaratakan penyimpanan'],
    },
    category: 'battery-storage',
    symbol: '\\text{LCOS} = \\frac{\\text{Lifecycle Costs}}{\\text{Delivered Energy}}',
    pronunciation: '/ˈlɛv.əl.aɪzd kɒst əv ˈstɔː.rɪdʒ/',
    definition: {
      en: 'The discounted lifetime capital and operating cost of an energy storage system divided by the cumulative discounted electrical energy delivered over its operational life.',
      id: 'Total biaya modal dan operasional siklus hidup terdiskon dari sistem penyimpanan energi dibagi dengan energi listrik kumulatif terdiskon yang berhasil disalurkan sepanjang umur operasionalnya.',
    },
    context: {
      en: 'The standard economic benchmark used by utilities and investors to evaluate the economic feasibility of competing storage technologies.',
      id: 'Tolok ukur ekonomi standar yang digunakan utilitas dan investor untuk mengevaluasi kelayakan ekonomi berbagai teknologi penyimpanan energi.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'vrfb',
    term: {
      en: 'Vanadium Redox Flow Battery (VRFB)',
      id: 'Baterai Alir Redoks Vanadium (VRFB)',
    },
    aliases: {
      en: ['VRFB', 'vanadium flow battery', 'redox flow battery', 'RFB'],
      id: ['VRFB', 'baterai alir vanadium', 'baterai redoks alir'],
    },
    category: 'battery-storage',
    symbol: '\\text{V}^{2+}/\\text{V}^{3+} \\parallel \\text{VO}^{2+}/\\text{VO}_2^+',
    pronunciation: '/vəˈneɪ.di.əm ˈriː.dɒks fləʊ ˈbæt.ər.i/',
    definition: {
      en: 'A rechargeable flow battery that utilizes the four contiguous oxidation states of vanadium dissolved in aqueous acid solutions, storing chemical energy in external electrolyte tanks.',
      id: 'Baterai alir sekunder yang memanfaatkan empat tingkat oksidasi berurutan dari unsur vanadium yang dilarutkan dalam asam, menyimpan energi kimiawi di dalam tangki elektrolit eksternal.',
    },
    context: {
      en: 'Offers decoupled power and energy scaling with over 20,000 cycles and zero fire hazard, making it ideal for 6-to-24 hour stationary grid storage.',
      id: 'Menghadirkan pemisahan independen daya dan kapasitas energi dengan usia siklus melampaui 20.000 kali dan tanpa bahaya kebakaran, ideal untuk penyimpanan stasioner 6 hingga 24 jam.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'sodium-ion',
    term: {
      en: 'Sodium-Ion Battery (Na-ion)',
      id: 'Baterai Natrium-Ion (Na-ion)',
    },
    aliases: {
      en: ['Na-ion', 'sodium battery', 'sodium ion cell'],
      id: ['Na-ion', 'baterai natrium-ion', 'baterai garam'],
    },
    category: 'battery-storage',
    symbol: '\\text{Na}^+',
    pronunciation: '/ˈsəʊ.di.əm ˈaɪ.ən ˈbæt.ər.i/',
    definition: {
      en: 'An electrochemical secondary battery using sodium cations as charge carriers, paired with hard carbon anodes and earth-abundant layered oxide or Prussian blue cathodes.',
      id: 'Baterai sekunder elektrokimia yang menggunakan kation natrium sebagai pembawa muatan, dipadukan dengan anoda karbon keras serta katoda oksida berlapis atau Prussian blue yang melimpah di alam.',
    },
    context: {
      en: 'Provides low raw material costs, superior cold-temperature operation (-40°C), and zero-volt deep discharge transport safety using aluminum foil current collectors.',
      id: 'Menghadirkan biaya bahan baku rendah, kinerja suhu beku superior (-40°C), dan keamanan pengiriman pada 0 volt berkat penggunaan foil kolektor aluminium di kedua kutub.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'solid-state-battery',
    term: {
      en: 'All-Solid-State Battery (ASSB)',
      id: 'Baterai All-Solid-State (ASSB)',
    },
    aliases: {
      en: ['ASSB', 'solid state battery', 'solid electrolyte battery'],
      id: ['ASSB', 'baterai elektrolit padat', 'baterai solid state'],
    },
    category: 'battery-storage',
    symbol: '\\text{Li}_{\\text{metal}} \\parallel \\text{Solid Electrolyte}',
    pronunciation: '/ˈsɒl.ɪd steɪt ˈbæt.ər.i/',
    definition: {
      en: 'A battery architecture where flammable organic liquid electrolytes are replaced by solid ceramic, sulfide, or polymer ion conductors, enabling metallic lithium anodes.',
      id: 'Arsitektur baterai di mana cairan elektrolit organik yang mudah terbakar digantikan oleh konduktor ionik padat berupa keramik, sulfida, atau polimer, memungkinkan pemakaian anoda logam litium murni.',
    },
    context: {
      en: 'Pushes gravimetric energy densities beyond 400 Wh/kg while eliminating thermal runaway combustion risks under mechanical puncture or overcharge.',
      id: 'Mendongkrak densitas energi gravimetrik melampaui 400 Wh/kg sekaligus melenyapkan risiko kebakaran termal saat tertusuk atau mengalami pengisian berlebih.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'critical-current-density',
    term: {
      en: 'Critical Current Density (CCD)',
      id: 'Densitas Arus Kritis (CCD)',
    },
    aliases: {
      en: ['CCD', 'critical current', 'dendrite threshold'],
      id: ['CCD', 'densitas arus kritis', 'ambang batas dendrit'],
    },
    category: 'battery-storage',
    symbol: 'J_{\\text{CCD}}',
    pronunciation: '/ˈkrɪt.ɪ.kəl ˈkʌr.ənt ˈdɛn.sɪ.ti/',
    definition: {
      en: 'The upper threshold of charging current density in a solid-state cell above which metallic lithium dendrites nucleate along grain boundaries and cause short-circuits.',
      id: 'Batas atas densitas arus pengisian pada sel solid-state yang jika dilampaui akan memicu pertumbuhan dendrit logam litium di sepanjang batas butir dan menyebabkan korsleting.',
    },
    context: {
      en: 'A vital engineering metric determining how fast solid-state batteries can safely recharge without catastrophic failure.',
      id: 'Metrik rekayasa vital yang menentukan seberapa cepat baterai solid-state dapat diisi ulang dengan aman tanpa kegagalan katastropik.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'lithium-sulfur',
    term: {
      en: 'Lithium-Sulfur Battery (Li-S)',
      id: 'Baterai Litium-Sulfur (Li-S)',
    },
    aliases: {
      en: ['Li-S', 'lithium sulfur cell', 'Li-S battery'],
      id: ['Li-S', 'baterai litium sulfur'],
    },
    category: 'battery-storage',
    symbol: 'S_8 + 16\\text{Li}^+ + 16e^- \\rightleftharpoons 8\\text{Li}_2S',
    pronunciation: '/ˈlɪθ.i.əm ˈsʌl.fər ˈbæt.ər.i/',
    definition: {
      en: 'A multielectron conversion electrochemical system featuring an elemental sulfur cathode and lithium metal anode with a theoretical specific energy of 2,600 Wh/kg.',
      id: 'Sistem elektrokimia konversi multielektron yang mengandalkan katoda sulfur murni dan anoda logam litium dengan energi spesifik teoretis mencapai 2.600 Wh/kg.',
    },
    context: {
      en: 'Targeted for stratospheric pseudo-satellites, electric aviation, and high-altitude aerospace where lightweight mass is paramount.',
      id: 'Ditargetkan untuk satelit semu stratosfer, penerbangan listrik, dan kedirgantaraan ketinggian tinggi di mana bobot ultra-ringan menjadi prioritas utama.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'polysulfide-shuttle',
    term: {
      en: 'Polysulfide Shuttle Effect',
      id: 'Efek Bolak-Balik Polisulfida',
    },
    aliases: {
      en: ['polysulfide shuttle', 'shuttle mechanism', 'shuttle effect'],
      id: ['efek bolak-balik polisulfida', 'mekanisme bolak-balik polisulfida'],
    },
    category: 'battery-storage',
    symbol: '\\text{Li}_2\\text{S}_x \\xrightarrow{\\text{diffusion}} \\text{Anode}',
    pronunciation: '/ˌpɒl.iˈsʌl.faɪd ˈʃʌt.əl ɪˈfɛkt/',
    definition: {
      en: 'The parasitic dissolution and diffusion of intermediate long-chain lithium polysulfides from cathode to anode, causing severe self-discharge and active sulfur loss.',
      id: 'Pelarutan dan difusi parasitik molekul perantara polisulfida litium rantai panjang dari katoda menuju anoda, memicu pengosongan mandiri dan hilangnya material sulfur aktif.',
    },
    context: {
      en: 'Mitigated in next-generation cells through solid-state barriers, permselective functional coatings, and localized high-concentration electrolytes.',
      id: 'Dimitigasi pada sel masa depan melalui pemisah solid-state, pelapis fungsional selektif, dan elektrolit berkonsentrasi tinggi terlokalisasi.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'iron-air-battery',
    term: {
      en: 'Iron-Air Battery (Fe-Air)',
      id: 'Baterai Besi-Udara (Fe-Air)',
    },
    aliases: {
      en: ['Fe-Air', 'iron air cell', 'reversible rust battery'],
      id: ['Fe-Air', 'baterai besi udara', 'baterai karat bolak-balik'],
    },
    category: 'battery-storage',
    symbol: '2\\text{Fe} + \\text{O}_2 + 2\\text{H}_2\\text{O} \\rightleftharpoons 2\\text{Fe(OH)}_2',
    pronunciation: '/ˈaɪ.ən eər ˈbæt.ər.i/',
    definition: {
      en: 'A multi-day energy storage technology utilizing the reversible electrochemical oxidation and reduction of metallic iron in an alkaline electrolyte breathing ambient air.',
      id: 'Teknologi penyimpanan energi multi-hari yang memanfaatkan oksidasi dan reduksi elektrokimia bolak-balik dari logam besi dalam elektrolit alkalin yang menghirup udara luar.',
    },
    context: {
      en: 'Enables 100-hour continuous discharge for multi-day weather events (Dunkelflaute) at a capital cost below $25/kWh.',
      id: 'Memungkinkan pengosongan kontinu selama 100 jam untuk mengatasi cuaca ekstrem multi-hari (Dunkelflaute) dengan biaya modal di bawah $25/kWh.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'ldes',
    term: {
      en: 'Long-Duration Energy Storage (LDES)',
      id: 'Penyimpanan Energi Berdurasi Panjang (LDES)',
    },
    aliases: {
      en: ['LDES', 'long duration storage', 'multi-day storage'],
      id: ['LDES', 'penyimpanan durasi panjang', 'penyimpanan multi-hari'],
    },
    category: 'battery-storage',
    symbol: '\\text{LDES} \\ (t_{\\text{discharge}} \\ge 8\\text{h})',
    pronunciation: '/lɒŋ djʊˈreɪ.ʃən ˈɛn.ə.dʒi ˈstɔː.rɪdʒ/',
    definition: {
      en: 'Energy storage systems designed to deliver rated power continuously for 8 hours to multiple days, addressing multi-day renewable droughts and seasonal supply shifts.',
      id: 'Sistem penyimpanan energi yang dirancang untuk menyalurkan daya secara kontinu selama 8 jam hingga berhari-hari, mengatasi ketiadaan angin-surya multi-hari dan pergeseran pasokan musiman.',
    },
    context: {
      en: 'Encompasses flow batteries, iron-air systems, compressed air, and pumped hydro as grids transition toward 100% renewable generation.',
      id: 'Mencakup baterai alir, sistem besi-udara, udara terkompresi, dan pompa air hidro seiring transisi jaringan menuju 100% energi terbarukan.',
    },
    relatedTopicId: 'battery-storage',
  },
  {
    id: 'rte',
    term: {
      en: 'Round-Trip Efficiency (RTE)',
      id: 'Efisiensi Bolak-Balik (RTE)',
    },
    aliases: {
      en: ['RTE', 'AC-to-AC efficiency', 'cycle efficiency'],
      id: ['RTE', 'efisiensi AC-ke-AC', 'efisiensi siklus'],
    },
    category: 'battery-storage',
    symbol: '\\eta_{\\text{RTE}} = \\frac{E_{\\text{discharge}}}{E_{\\text{charge}}}',
    pronunciation: '/raʊnd trɪp ɪˈfɪʃ.ən.si/',
    definition: {
      en: 'The ratio of net usable electrical energy recovered during discharge to the total electrical energy supplied during charging, accounting for all electrochemical, inverter, and thermal cooling losses.',
      id: 'Rasio energi listrik netto yang berhasil disalurkan kembali saat pengosongan terhadap total energi listrik yang dimasukkan saat pengisian, mencakup semua rugi elektrokimia, inverter, dan pendingin termal.',
    },
    context: {
      en: 'Ranges from 88%–93% for lithium-ion, 68%–76% for flow batteries, and 45%–52% for iron-air systems.',
      id: 'Berkisar antara 88%–93% pada litium-ion, 68%–76% pada baterai alir, dan 45%–52% pada sistem besi-udara.',
    },
    relatedTopicId: 'battery-storage',
  },
  // ================= NUCLEAR REACTOR PHYSICS & SAFETY =================
  {
    id: 'nuclear-fission',
    term: {
      en: 'Nuclear Fission',
      id: 'Pembelahan Fisi Nuklir',
    },
    aliases: {
      en: ['fission', 'induced fission', 'nuclear splitting'],
      id: ['fisi nuklir', 'pembelahan inti', 'reaksi fisi'],
    },
    category: 'nuclear',
    symbol: 'Q = \\Delta m \\cdot c^2 \\approx 200\\text{ MeV}',
    pronunciation: '/ˈnuː.kli.ɚ ˈfɪʃ.ən/',
    definition: {
      en: 'The nuclear reaction in which a heavy nucleus (such as Uranium-235 or Plutonium-239) absorbs a neutron and splits into two lighter daughter nuclei, emitting 2 to 3 prompt neutrons and approximately 200 MeV of kinetic and radiative energy.',
      id: 'Reaksi nuklir di mana inti berat (seperti Uranium-235 atau Plutonium-239) menyerap neutron dan terbelah menjadi dua inti anak yang lebih ringan, memancarkan 2 hingga 3 neutron serentak dan energi kinetik serta radiasi sekitar 200 MeV.',
    },
    context: {
      en: 'Forms the foundational physical power-generation mechanism across all commercial civilian nuclear power plants.',
      id: 'Merupakan mekanisme fisis dasar pembangkitan daya pada seluruh pembangkit listrik tenaga nuklir komersial.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'criticality',
    term: {
      en: 'Criticality',
      id: 'Kekritisan Reaktor',
    },
    aliases: {
      en: ['critical state', 'chain reaction equilibrium'],
      id: ['kondisi kritis', 'kesetimbangan reaksi berantai'],
    },
    category: 'nuclear',
    symbol: 'k_{\\text{eff}} = 1.0',
    pronunciation: '/ˌkrɪt.ɪˈkæl.ə.ti/',
    definition: {
      en: 'The self-sustaining operational equilibrium state of a nuclear reactor core where the rate of neutron production exactly equals the rate of neutron loss (absorption plus leakage), resulting in a constant, stable fission power output.',
      id: 'Kondisi kesetimbangan operasional mandiri dari teras reaktor nuklir di mana laju produksi neutron tepat sama dengan laju kehilangan neutron (serapan ditambah kebocoran), menghasilkan daya fisi yang stabil dan konstan.',
    },
    context: {
      en: 'Subcritical (k < 1) cores shut down; supercritical (k > 1) cores increase power; prompt critical (k >= 1 + β) produces violent runaway.',
      id: 'Teras subkritis (k < 1) memadamkan daya; superkritis (k > 1) menaikkan daya; kritis serentak (k >= 1 + β) memicu lonjakan tak terkendali.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'keff',
    term: {
      en: 'Effective Multiplication Factor (k_eff)',
      id: 'Faktor Multiplikasi Efektif (k_eff)',
    },
    aliases: {
      en: ['k-effective', 'neutron multiplication', 'keff'],
      id: ['k-efektif', 'multiplikasi neutron', 'keff'],
    },
    category: 'nuclear',
    symbol: 'k_{\\text{eff}} = \\eta \\cdot f \\cdot p \\cdot \\epsilon \\cdot P_{\\text{FNL}} \\cdot P_{\\text{TNL}}',
    pronunciation: '/keɪ ɪˈfɛk.tɪv/',
    definition: {
      en: 'The ratio of the number of neutrons produced by fission in one generation to the total number of neutrons lost by absorption and leakage in the preceding generation.',
      id: 'Rasio jumlah neutron yang diproduksi oleh fisi pada satu generasi terhadap total jumlah neutron yang hilang akibat serapan dan kebocoran pada generasi sebelumnya.',
    },
    context: {
      en: 'Governed by the Six-Factor Formula in finite cores and adjusted in real-time via control rods and soluble chemical shim.',
      id: 'Ditentukan oleh Formula Enam-Faktor pada teras berdimensi terhingga dan diatur secara real-time melalui batang kendali dan chemical shim.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'control-rod',
    term: {
      en: 'Control Rod',
      id: 'Batang Kendali Reaktor',
    },
    aliases: {
      en: ['absorber rod', 'regulating rod', 'safety rod'],
      id: ['batang penyerap', 'batang pengatur', 'batang pengaman'],
    },
    category: 'nuclear',
    symbol: '\\sigma_a(^{10}\\text{B}) = 3840\\text{ b}',
    pronunciation: '/kənˈtroʊl rɑːd/',
    definition: {
      en: 'Movable mechanical rods containing strong neutron-absorbing materials (boron carbide, cadmium, silver-indium, or hafnium) inserted into fuel assemblies to manage reactivity, shape neutron flux, or rapidly terminate the chain reaction during SCRAM.',
      id: 'Batang mekanis bergerak yang mengandung material penyerap neutron kuat (boron karbida, kadmium, perak-indium, atau hafnium) yang dimasukkan ke bundel bahan bakar untuk mengendalikan reaktivitas, meratakan fluks neutron, atau menghentikan reaksi saat SCRAM.',
    },
    context: {
      en: 'Gravity-driven electromagnetic release mechanisms ensure fail-safe insertion in under 2 seconds during emergency trips.',
      id: 'Mekanisme pelepasan elektromagnetik berbasis gravitasi memastikan penancapan darurat fail-safe dalam waktu kurang dari 2 detik.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'neutron-moderator',
    term: {
      en: 'Neutron Moderator',
      id: 'Moderator Neutron',
    },
    aliases: {
      en: ['moderator', 'thermalizer'],
      id: ['moderator', 'penyerap energi kinetik neutron'],
    },
    category: 'nuclear',
    symbol: '\\xi = \\ln(E_1 / E_2)',
    pronunciation: '/ˈnuː.trɑːn ˈmɑː.də.reɪ.tɚ/',
    definition: {
      en: 'A low-atomic-mass material (light water, heavy water, or high-purity graphite) placed within the reactor core to decelerate fast 2-MeV fission neutrons to 0.025-eV thermal speeds via elastic collisions without parasitically capturing them.',
      id: 'Material bermassa atom rendah (air biasa, air berat, atau grafit berkemurnian tinggi) yang ditempatkan di dalam teras reaktor untuk memperlambat neutron fisi cepat 2 MeV ke kecepatan termal 0,025 eV melalui tumbukan elastis tanpa menyerapnya.',
    },
    context: {
      en: 'Thermalization boosts Uranium-235 fission cross-section by over two orders of magnitude (from ~1.5 barns to 585 barns).',
      id: 'Termalisasi meningkatkan penampang lintang fisi Uranium-235 lebih dari dua orde magnitudo (dari ~1,5 barn menjadi 585 barn).',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'delayed-neutrons',
    term: {
      en: 'Delayed Neutrons',
      id: 'Neutron Kasip',
    },
    aliases: {
      en: ['delayed neutron fraction', 'precursor neutrons', 'beta fraction'],
      id: ['fraksi neutron kasip', 'neutron prekursor'],
    },
    category: 'nuclear',
    symbol: '\\beta = \\frac{\\nu_d}{\\nu} \\approx 0.0065',
    pronunciation: '/dɪˈleɪd ˈnuː.trɑːnz/',
    definition: {
      en: 'The small fraction (~0.65% for U-235) of fission neutrons emitted seconds to minutes after fission by radioactive decay of neutron-rich fission fragments (precursors such as Br-87 and I-137), lengthening the effective reactor response time from milliseconds to tens of seconds.',
      id: 'Sebagian kecil fraksi (~0,65% pada U-235) neutron fisi yang dipancarkan beberapa detik hingga menit setelah fisi melalui peluruhan radioaktif fragmen fisi (prekursor seperti Br-87 dan I-137), memperpanjang waktu respons reaktor dari milidetik menjadi puluhan detik.',
    },
    context: {
      en: 'The fundamental physical reason commercial nuclear reactors can be safely controlled by mechanical and computer systems without prompt runaway.',
      id: 'Alasan fisis mendasar mengapa reaktor nuklir komersial dapat dikendalikan secara aman oleh sistem mekanis dan komputer tanpa lonjakan liar seketika.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'scram',
    term: {
      en: 'SCRAM (Emergency Reactor Trip)',
      id: 'Pemadaman Darurat SCRAM',
    },
    aliases: {
      en: ['reactor trip', 'emergency shutdown', 'SCRAM'],
      id: ['pemadaman darurat', 'reaktor trip', 'SCRAM'],
    },
    category: 'nuclear',
    symbol: 't_{\\text{drop}} < 2.0\\text{ s}',
    pronunciation: '/skræm/',
    definition: {
      en: 'The instantaneous, fail-safe emergency shutdown of a nuclear reactor achieved by rapidly inserting all control rods into the core under gravity and spring assist, inserting massive negative reactivity within seconds.',
      id: 'Pemadaman darurat reaktor nuklir secara fail-safe dan instan yang dilakukan dengan menjatuhkan seluruh batang kendali ke dalam teras menggunakan gravitasi dan pegas, menginjeksikan reaktivitas negatif masif dalam hitungan detik.',
    },
    context: {
      en: 'Automatically triggered by seismic sensors, high core pressure, loss of coolant flow, or manual operator trip switch.',
      id: 'Dipicu otomatis oleh sensor seismik gempa, tekanan tinggi teras, hilangnya aliran pendingin, atau sakelar manual operator.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'decay-heat',
    term: {
      en: 'Decay Heat',
      id: 'Panas Peluruhan Radioaktif',
    },
    aliases: {
      en: ['residual heat', 'fission product decay heat'],
      id: ['panas residual', 'panas peluruhan produk fisi'],
    },
    category: 'nuclear',
    symbol: '\\frac{P_d(t)}{P_0} \\propto t^{-0.2}',
    pronunciation: '/dɪˈkeɪ hiːt/',
    definition: {
      en: 'The heat generated by the radioactive beta-decay and gamma-decay of accumulated fission products after the reactor has been shut down via SCRAM, initially equal to approximately 6.5% to 7% of nominal operating thermal power.',
      id: 'Panas yang dihasilkan oleh peluruhan radioaktif beta dan gamma dari produk fisi yang terakumulasi setelah reaktor dipadamkan melalui SCRAM, yang awalnya setara dengan sekitar 6,5% hingga 7% dari daya termal nominal operasi.',
    },
    context: {
      en: 'Requires uninterrupted active or passive core cooling for days to weeks following shutdown to prevent fuel uncovery and cladding overheating.',
      id: 'Memerlukan pendinginan teras aktif atau pasif tanpa henti selama berhari-hari hingga berminggu-minggu setelah pemadaman guna mencegah terbukanya bahan bakar dan panas berlebih.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'pwr',
    term: {
      en: 'Pressurized Water Reactor (PWR)',
      id: 'Reaktor Air Bertekanan (PWR)',
    },
    aliases: {
      en: ['PWR', 'pressurized water nuclear plant'],
      id: ['PWR', 'reaktor air bertekanan'],
    },
    category: 'nuclear',
    symbol: 'p_{\\text{primary}} \\approx 15.5\\text{ MPa}',
    pronunciation: '/ˌpiː.dʌb.əl.juːˈɑːr/',
    definition: {
      en: 'The world\'s most widely deployed commercial nuclear reactor class, utilizing high-pressure liquid light water (15.5 MPa) to prevent bulk boiling in the primary loop, transferring heat via steam generators to a secondary turbine loop.',
      id: 'Kelas reaktor nuklir komersial yang paling banyak digunakan di dunia, memanfaatkan air biasa bertekanan tinggi (15,5 MPa) untuk mencegah pendidihan ruah di loop primer, mentransfer panas melalui steam generator ke loop sekunder turbin.',
    },
    context: {
      en: 'Accounts for ~68% of global operating nuclear reactors; keeps radioactive primary coolant strictly isolated inside containment.',
      id: 'Mencakup ~68% reaktor nuklir yang beroperasi di dunia; menjaga pendingin primer radioaktif terisolasi rapat di dalam kubah penahan.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'bwr',
    term: {
      en: 'Boiling Water Reactor (BWR)',
      id: 'Reaktor Air Mendidih (BWR)',
    },
    aliases: {
      en: ['BWR', 'direct cycle nuclear plant'],
      id: ['BWR', 'reaktor air mendidih'],
    },
    category: 'nuclear',
    symbol: 'p_{\\text{vessel}} \\approx 7.0\\text{ MPa}',
    pronunciation: '/ˌbiː.dʌb.əl.juːˈɑːr/',
    definition: {
      en: 'A commercial nuclear reactor class where ordinary water boils directly inside the reactor pressure vessel at 7.0 MPa, producing saturated steam that feeds directly to the electrical turbine in a direct single-loop Rankine cycle.',
      id: 'Kelas reaktor nuklir komersial di mana air biasa mendidih langsung di dalam bejana tekan reaktor pada 7,0 MPa, menghasilkan uap jenuh yang dialirkan langsung menuju turbin listrik dalam siklus Rankine satu loop langsung.',
    },
    context: {
      en: 'Eliminates steam generators and pressurizers, but requires radiation shielding around the turbine building due to short-lived N-16 carryover.',
      id: 'Meniadakan steam generator dan pressurizer, namun memerlukan perisai radiasi di gedung turbin akibat adanya uap radioaktif N-16 berumur pendek.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'smr',
    term: {
      en: 'Small Modular Reactor (SMR)',
      id: 'Small Modular Reactor (SMR)',
    },
    aliases: {
      en: ['SMR', 'modular reactor', 'integral reactor'],
      id: ['SMR', 'reaktor modular kecil'],
    },
    category: 'nuclear',
    symbol: 'P_e \\le 300\\text{ MWe}',
    pronunciation: '/ˌɛs.ɛmˈɑːr/',
    definition: {
      en: 'Factory-fabricated, rail-transportable nuclear fission reactors producing ≤ 300 MWe per unit, featuring integral reactor vessels (iPWR), underground containment, and multi-day passive walk-away safety.',
      id: 'Reaktor fisi nuklir terstandarisasi yang dirakit di pabrik dan dapat diangkut dengan kereta api, memproduksi daya ≤ 300 MWe per unit, memiliki bejana integral (iPWR), penempatan bawah tanah, dan keselamatan pasif mandiri multi-hari.',
    },
    context: {
      en: 'Compresses construction schedules to 2–3 years and drastically shrinks emergency planning zones to plant site boundaries.',
      id: 'Memangkas durasi konstruksi menjadi 2–3 tahun dan menyusutkan radius zona perencanaan darurat hingga batas tapak pembangkit.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'msr',
    term: {
      en: 'Molten Salt Reactor (MSR)',
      id: 'Reaktor Garam Cair (MSR)',
    },
    aliases: {
      en: ['MSR', 'LFTR', 'liquid fluoride thorium reactor'],
      id: ['MSR', 'reaktor garam cair', 'LFTR'],
    },
    category: 'nuclear',
    symbol: 'T_{\\text{melt}} < T_{\\text{core}}',
    pronunciation: '/ˌɛm.ɛsˈɑːr/',
    definition: {
      en: 'A Generation IV nuclear reactor architecture where nuclear fuel is dissolved directly into high-temperature molten fluoride or chloride salt (e.g. FLiBe) acting simultaneously as fuel and low-pressure primary coolant.',
      id: 'Arsitektur reaktor nuklir Generasi IV di mana bahan bakar nuklir dilarutkan langsung ke dalam garam fluorida atau klorida cair bersuhu tinggi (seperti FLiBe) yang bertindak sekaligus sebagai bahan bakar dan pendingin primer bertekanan rendah.',
    },
    context: {
      en: 'Operates at atmospheric pressure and incorporates freeze plugs that passively drain liquid fuel into subcritical cooling tanks if power fails.',
      id: 'Beroperasi pada tekanan atmosfer dan memiliki freeze plug yang mengalirkan bahan bakar cair secara pasif ke tangki pendingin subkritis jika terjadi kegagalan daya.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'triso',
    term: {
      en: 'TRISO Particle Fuel',
      id: 'Bahan Bakar Partikel TRISO',
    },
    aliases: {
      en: ['TRISO', 'pebble bed fuel', 'tri-isotropic fuel'],
      id: ['TRISO', 'bahan bakar TRISO', 'pebble fuel'],
    },
    category: 'nuclear',
    symbol: 'T_{\\text{fail}} > 1600^\\circ\\text{C}',
    pronunciation: '/ˈtraɪ.soʊ/',
    definition: {
      en: 'An advanced, meltdown-proof nuclear fuel format consisting of sub-millimeter fissile kernels coated in three isotropic pyrolytic carbon layers and a high-strength silicon carbide (SiC) ceramic shell.',
      id: 'Format bahan bakar nuklir mutakhir yang kebal terhadap pelelehan teras, terdiri atas kernel fisil sub-milimeter yang dilapisi tiga lapisan karbon pirolitik isotropik dan cangkang keramik silikon karbida (SiC) berkekuatan tinggi.',
    },
    context: {
      en: 'Hermetically contains fission gases up to >1,600°C without melting, utilized in Gen-IV High Temperature Gas-Cooled Reactors (HTGR).',
      id: 'Menahan gas fisi secara kedap hingga suhu >1.600°C tanpa meleleh, digunakan pada reaktor suhu tinggi berpendingin gas (HTGR) Generasi IV.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'defense-in-depth',
    term: {
      en: 'Defense-in-Depth',
      id: 'Pertahanan Berlapis (Defense-in-Depth)',
    },
    aliases: {
      en: ['multi-barrier defense', 'safety layers'],
      id: ['pertahanan berlapis', 'lapisan keselamatan'],
    },
    category: 'nuclear',
    symbol: 'L_1 \\to L_5',
    pronunciation: '/dɪˈfɛns ɪn dɛpθ/',
    definition: {
      en: 'The fundamental IAEA nuclear safety doctrine comprising five independent successive physical barriers and procedural levels ensuring that no single equipment failure, human error, or natural disaster can lead to an off-site radioactive release.',
      id: 'Doktrin keselamatan nuklir fundamental IAEA yang terdiri atas lima lapis penghalang fisik dan prosedural independen berurutan yang memastikan tidak ada satu kegagalan peralatan, kelalaian manusia, atau bencana alam yang dapat memicu pelepasan radioaktif ke luar tapak.',
    },
    context: {
      en: 'Physical barriers include ceramic fuel matrix, zircaloy cladding, reactor pressure vessel, and prestressed concrete containment dome.',
      id: 'Penghalang fisik meliputi matriks keramik bahan bakar, kelongsong zirkaloy, bejana tekan reaktor, dan kubah penahan beton bertulang.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'core-catcher',
    term: {
      en: 'Core Catcher (Corium Retention Crucible)',
      id: 'Penangkap Inti Leleh (Core Catcher)',
    },
    aliases: {
      en: ['core catcher', 'corium trap', 'sacrificial concrete crucible'],
      id: ['core catcher', 'penangkap corium', 'wadah beton pengorbanan'],
    },
    category: 'nuclear',
    symbol: 'T_{\\text{melt}} \\approx 2500^\\circ\\text{C}',
    pronunciation: '/kɔːr ˈkætʃ.ɚ/',
    definition: {
      en: 'A massive sacrificial crucible installed beneath the reactor vessel in Gen-III+ and Gen-IV reactors to catch, spread, chemically dilute, and passively water-flood molten corium if the pressure vessel ever breaches, permanently preventing basement burn-through.',
      id: 'Wadah pengorbanan masif yang dipasang di bawah bejana reaktor Gen-III+ dan Gen-IV untuk menangkap, meratakan, mengencerkan secara kimiawi, dan mendinginkan corium cair jika bejana tekan jebol, secara permanen mencegah penembusan lantai dasar reaktor.',
    },
    context: {
      en: 'Standard on European EPR, Russian VVER-1200, and Chinese Hualong One plants to guarantee severe accident containment.',
      id: 'Standar wajib pada PLTN EPR Eropa, VVER-1200 Rusia, dan Hualong One Tiongkok untuk menjamin integritas kubah saat kecelakaan terparah.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
  {
    id: 'passive-safety',
    term: {
      en: 'Passive Safety Systems',
      id: 'Sistem Keselamatan Pasif',
    },
    aliases: {
      en: ['walk-away safety', 'natural circulation cooling', 'inherent safety'],
      id: ['keselamatan pasif', 'walk-away safety', 'sirkulasi alami'],
    },
    category: 'nuclear',
    symbol: '\\Delta t \\ge 72\\text{ h}',
    pronunciation: '/ˈpæs.ɪv ˈseɪf.ti/',
    definition: {
      en: 'Engineered reactor safety systems that operate autonomously without alternating current (AC) electrical power, human intervention, or computer signals, relying exclusively on gravity, natural convective circulation, evaporation, and passive catalysis.',
      id: 'Sistem keselamatan reaktor terkayasa yang beroperasi secara mandiri tanpa pasokan listrik arus bolak-balik (AC), tindakan operator manusia, atau sinyal komputer, bersandar murni pada gravitasi, sirkulasi konveksi alami, penguapan, dan katalisis pasif.',
    },
    context: {
      en: 'Guarantees at least 72 hours of uninterrupted core and containment cooling following a total Station Blackout (SBO).',
      id: 'Menjamin pendinginan teras dan kubah penahan tanpa henti minimal selama 72 jam saat terjadi Station Blackout (SBO) total.',
    },
    relatedTopicId: 'nuclear-reactor',
  },
];

export function findGlossaryTerm(searchWord: string): GlossaryTermData | undefined {
  const normalized = searchWord.toLowerCase().trim().replace(/[.,;!?()]/g, '');
  return GLOSSARY_TERMS.find((item) => {
    if (item.id.toLowerCase() === normalized) return true;
    if (item.term.en.toLowerCase() === normalized || item.term.id.toLowerCase() === normalized) return true;
    if (item.aliases?.en.some((a) => a.toLowerCase() === normalized)) return true;
    if (item.aliases?.id.some((a) => a.toLowerCase() === normalized)) return true;
    return false;
  });
}
