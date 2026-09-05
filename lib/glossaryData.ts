export type GlossaryCategory =
  | 'quantum'
  | 'biology'
  | 'ev-battery'
  | 'pulmonology'
  | 'cardiology'
  | 'hypertension'
  | 'ecology'
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
    | 'biomes-ecology';
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
    symbol: 'D = √[(2 k_t DDT) / (ρ L)]',
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
    symbol: 'λ_n = P_n / P_(n-1) ≈ 10%',
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
