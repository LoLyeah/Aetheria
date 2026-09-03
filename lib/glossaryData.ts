export type GlossaryCategory =
  | 'quantum'
  | 'biology'
  | 'ev-battery'
  | 'pulmonology'
  | 'cardiology'
  | 'hypertension'
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
    | 'hypertension';
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
