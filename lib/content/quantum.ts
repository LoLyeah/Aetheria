import { Topic } from '@/types/learning';

export const quantumMechanicsTopic: Topic = {
  id: 'quantum-mechanics',
  title: {
    en: 'Quantum Mechanics & Atomic Orbitals',
    id: 'Mekanika Kuantum & Orbital Atom',
  },
  tagline: {
    en: 'Wave functions, probability clouds, and the fundamental behavior of subatomic matter.',
    id: 'Fungsi gelombang, awan probabilitas, dan perilaku fundamental materi subatomik.',
  },
  description: {
    en: 'Dive into the quantum realm. Discover how the Schrödinger wave equation replaces classic planetary Bohr orbits with probabilistic electron probability clouds (psi squared), explore wave-particle duality through real-time double-slit interference, and manipulate quantum tunneling barriers in real-time 3D.',
    id: 'Selami dunia kuantum. Pelajari bagaimana persamaan gelombang Schrödinger menggantikan orbit planet klasik Bohr dengan awan probabilitas elektron (psi kuadrat), amati dualitas gelombang-partikel melalui interferensi celah ganda langsung, dan atur rintangan penembusan kuantum (quantum tunneling) dalam visualisasi 3D real-time.',
  },
  category: {
    en: 'Fundamental Physics',
    id: 'Fisika Fundamental',
  },
  colorAccent: 'sky',
  badgeColor: 'from-sky-500 to-indigo-600',
  iconName: 'Atom',
  modules: [
    {
      id: 'qm-mod-1',
      topicId: 'quantum-mechanics',
      order: 1,
      title: {
        en: 'Atomic Structure & The Four Quantum Numbers',
        id: 'Struktur Atom & Empat Bilangan Kuantum',
      },
      shortDescription: {
        en: 'From the classical planetary Bohr model to the modern quantum mechanical wavefunction formulation.',
        id: 'Dari model atom tata surya klasik Bohr hingga formulasi fungsi gelombang mekanika kuantum modern.',
      },
      durationMinutes: 15,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'orbital-cloud',
      sections: [
        {
          id: 'qm-1-sec-1',
          title: {
            en: '1. The Failure of Classical Mechanics at the Atomic Scale',
            id: '1. Kegagalan Mekanika Klasik pada Skala Atom',
          },
          content: {
            en: 'In classical electrodynamics, an accelerating charged particle (like an electron orbiting a positively charged nucleus) must continuously radiate electromagnetic energy according to Larmor\'s formula. If this were true, an electron would spiral inward into the nucleus in less than 10 picoseconds, causing all matter in the universe to collapse.\n\nIn 1913, Niels Bohr introduced quantized angular momentum, proposing fixed discrete energy orbits. However, the Bohr model failed for multi-electron atoms and could not explain chemical bonding or spectral line splitting (Zeeman effect). In 1926, Erwin Schrödinger synthesized Louis de Broglie\'s wave-particle duality into the time-independent Schrödinger wave equation, proving electrons are not localized tiny spheres, but standing spatial probability waves.',
            id: 'Dalam elektrodinamika klasik, partikel bermuatan yang dipercepat (seperti elektron yang mengorbit inti bermuatan positif) harus terus-menerus memancarkan energi elektromagnetik menurut rumus Larmor. Jika ini benar, elektron akan jatuh spiral ke dalam inti dalam waktu kurang dari 10 pikodetik, menyebabkan seluruh materi di alam semesta runtuh.\n\nPada tahun 1913, Niels Bohr memperkenalkan momentum sudut terkuantisasi dengan orbit energi diskrit tertentu. Namun, model Bohr gagal untuk atom berelektron banyak dan tidak dapat menjelaskan ikatan kimia atau pembelahan garis spektrum (efek Zeeman). Pada tahun 1926, Erwin Schrödinger memformulasikan persamaan gelombang bebas-waktu yang membuktikan bahwa elektron bukanlah bola partikel kecil yang bergerak di rel pasti, melainkan gelombang probabilitas spasial stasioner.',
          },
          formula: '-\\frac{\\hbar^2}{2m}\\nabla^2\\psi(\\mathbf{r}) + V(\\mathbf{r})\\psi(\\mathbf{r}) = E\\psi(\\mathbf{r})',
          formulaExplanation: {
            en: 'The Time-Independent Schrödinger Equation for an electron in a potential field V(r), where ħ is the reduced Planck constant, m is electron mass, and E is total quantized energy.',
            id: 'Persamaan Schrödinger Bebas-Waktu untuk elektron dalam medan potensial V(r), di mana ħ adalah konstanta Planck tereduksi, m adalah massa elektron, dan E adalah energi terkuantisasi total.',
          },
          keyTakeaways: {
            en: [
              'Electrons do not travel in circular deterministic tracks; they exist as three-dimensional probability distributions.',
              'The wavefunction ψ itself is complex-valued, but |ψ|² represents the exact spatial probability density of finding the electron.',
              'Quantization emerges naturally from boundary conditions applied to the wave equation.',
            ],
            id: [
              'Elektron tidak bergerak pada lintasan melingkar deterministik; elektron ada sebagai distribusi probabilitas spasial tiga dimensi.',
              'Fungsi gelombang ψ bernilai kompleks, namun |ψ|² mewakili kerapatan probabilitas menemukan elektron di ruang tertentu.',
              'Kuantisasi muncul secara alami dari syarat batas matematis yang diterapkan pada persamaan gelombang.',
            ],
          },
        },
        {
          id: 'qm-1-sec-2',
          title: {
            en: '2. The Four Quantum Numbers (n, l, m_l, m_s)',
            id: '2. Empat Bilangan Kuantum (n, l, m_l, m_s)',
          },
          content: {
            en: 'Solving the Schrödinger equation in spherical polar coordinates (r, θ, φ) yields three spatial quantum numbers, plus an intrinsic relativistic spin quantum number:\n\n1. Principal Quantum Number (n = 1, 2, 3...): Determines the primary energy shell and overall radial size of the orbital.\n2. Azimuthal / Orbital Angular Momentum (l = 0, 1, ..., n-1): Defines the geometric shape of the orbital (l=0: s orbital [spherical], l=1: p orbital [dumb-bell/bilobed], l=2: d orbital [cloverleaf], l=3: f orbital [complex octalobal]).\n3. Magnetic Quantum Number (m_l = -l, ..., 0, ..., +l): Dictates the spatial 3D orientation of the angular momentum vector in space (2l + 1 possible orientations).\n4. Spin Projection (m_s = +1/2 or -1/2): The intrinsic quantum spin angular momentum of the fermion, governed by the Pauli Exclusion Principle.',
            id: 'Penyelesaian persamaan Schrödinger dalam koordinat bola (r, θ, φ) menghasilkan tiga bilangan kuantum spasial, ditambah bilangan kuantum spin intrinsik relativistik:\n\n1. Bilangan Kuantum Utama (n = 1, 2, 3...): Menentukan kulit energi utama dan ukuran radial keseluruhan dari orbital.\n2. Bilangan Kuantum Azimut / Momentum Sudut (l = 0, 1, ..., n-1): Menentukan bentuk geometris orbital (l=0: orbital s [bola], l=1: orbital p [cuping ganda], l=2: orbital d [semanggi], l=3: orbital f [oktalobal kompleks]).\n3. Bilangan Kuantum Magnetik (m_l = -l, ..., 0, ..., +l): Menentukan orientasi spasial 3D dari vektor momentum sudut di ruang (tersedia 2l + 1 orientasi).\n4. Bilangan Kuantum Spin (m_s = +1/2 atau -1/2): Momentum sudut spin intrinsik elektron, yang diatur oleh Prinsip Larangan Pauli.',
          },
          keyTakeaways: {
            en: [
              'No two electrons in a single atom can occupy identical sets of the four quantum numbers (Pauli Principle).',
              'Energy increases with (n + l) according to the Madelung / Aufbau ordering rule.',
              'Radial nodes = n - l - 1; Angular planar/conical nodes = l.',
            ],
            id: [
              'Tidak ada dua elektron dalam satu atom yang dapat memiliki keempat bilangan kuantum yang identik (Prinsip Pauli).',
              'Tingkat energi meningkat seiring nilai (n + l) sesuai kaidah pengisian Aufbau / Madelung.',
              'Simpul radial (radial nodes) = n - l - 1; Simpul sudut (angular nodes) = l.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q1-1',
          question: {
            en: 'For a 3p orbital, what are the values of the principal (n) and azimuthal (l) quantum numbers?',
            id: 'Untuk orbital 3p, berapakah nilai bilangan kuantum utama (n) dan azimut (l)?',
          },
          options: {
            en: ['n = 3, l = 1', 'n = 3, l = 0', 'n = 2, l = 1', 'n = 3, l = 2'],
            id: ['n = 3, l = 1', 'n = 3, l = 0', 'n = 2, l = 1', 'n = 3, l = 2'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'For any 3p orbital, the principal shell number is n = 3, and the subshell symbol "p" corresponds to angular momentum quantum number l = 1.',
            id: 'Untuk orbital 3p, nomor kulit utama adalah n = 3, dan simbol subkulit "p" menyatakan bilangan kuantum momentum sudut l = 1.',
          },
        },
        {
          id: 'qm-q1-2',
          question: {
            en: 'What does the square of the absolute value of the wave function, |ψ(r)|², physically represent?',
            id: 'Apakah arti fisik dari kuadrat nilai mutlak fungsi gelombang, |ψ(r)|²?',
          },
          options: {
            en: [
              'The exact physical speed of the orbiting electron',
              'The probability density per unit volume of locating the electron at position r',
              'The electric voltage potential of the nucleus',
              'The deterministic radius of the electron orbit',
            ],
            id: [
              'Kecepatan fisik pasti elektron saat mengorbit',
              'Kerapatan probabilitas per satuan volume untuk menemukan elektron pada posisi r',
              'Potensial tegangan listrik dari inti atom',
              'Jari-jari pasti deterministik dari orbit elektron',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'According to Max Born\'s probabilistic interpretation, |ψ(r)|² dV gives the probability of finding the electron within an infinitesimal volume dV around coordinate r.',
            id: 'Berdasarkan interpretasi probabilitas Max Born, |ψ(r)|² dV memberikan probabilitas menemukan elektron di dalam volume infinitesimal dV di sekitar koordinat r.',
          },
        },
        {
          id: 'qm-q1-3',
          question: {
            en: 'How many total spatial orbital orientations (values of m_l) exist for a d-subshell (l = 2)?',
            id: 'Berapa banyak total orientasi orbital spasial (nilai m_l) yang ada untuk subkulit d (l = 2)?',
          },
          options: {
            en: ['3 orientations (-1, 0, 1)', '5 orientations (-2, -1, 0, 1, 2)', '7 orientations (-3 to 3)', '1 orientation (0)'],
            id: ['3 orientasi (-1, 0, 1)', '5 orientasi (-2, -1, 0, 1, 2)', '7 orientasi (-3 hingga 3)', '1 orientasi (0)'],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'The number of magnetic quantum number states is given by 2l + 1. For l = 2, 2(2) + 1 = 5 distinct orientations (d_xy, d_yz, d_xz, d_x²-y², d_z²).',
            id: 'Jumlah nilai bilangan kuantum magnetik dirumuskan dengan 2l + 1. Untuk l = 2, maka 2(2) + 1 = 5 orientasi berbeda (d_xy, d_yz, d_xz, d_x²-y², d_z²).',
          },
        },
      ],
    },
    {
      id: 'qm-mod-2',
      topicId: 'quantum-mechanics',
      order: 2,
      title: {
        en: '3D Wave Functions & Real Spherical Harmonics',
        id: 'Fungsi Gelombang 3D & Harmonik Bola Nyata',
      },
      shortDescription: {
        en: 'Decompose the hydrogen wave function into radial wave components R(r) and angular spherical harmonics Y(θ, φ).',
        id: 'Uraikan fungsi gelombang hidrogen menjadi komponen radial R(r) dan harmonik bola sudut Y(θ, φ).',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'orbital-cloud',
      sections: [
        {
          id: 'qm-2-sec-1',
          title: {
            en: '1. Radial and Angular Separation of Variables',
            id: '1. Pemisahan Variabel Radial dan Sudut',
          },
          content: {
            en: 'Because the electrostatic Coulomb potential between a proton and an electron is spherically symmetric, the 3D partial differential equation separates cleanly:\n\nψ_{n,l,m}(r, θ, φ) = R_{n,l}(r) · Y_{l}^{m}(θ, φ)\n\n• The Radial Function R_{n,l}(r) consists of associated Laguerre polynomials multiplied by an exponential decay factor e^{-r / (n a_0)}, where a_0 is the Bohr radius (~0.529 Å).\n• The Spherical Harmonics Y_{l}^{m}(θ, φ) are composed of associated Legendre polynomials P_l^m(cos θ) and azimuthal phase e^{i m φ}. In real chemistry, we take linear combinations to produce real orbitals with distinct lobes and node planes.',
            id: 'Karena potensial Coulomb elektrostatik antara proton dan elektron bersifat simetris bola, persamaan diferensial parsial 3D dapat dipisahkan secara rapi:\n\nψ_{n,l,m}(r, θ, φ) = R_{n,l}(r) · Y_{l}^{m}(θ, φ)\n\n• Fungsi Radial R_{n,l}(r) terdiri dari polinomial Laguerre terasosiasi dikalikan dengan faktor peluruhan eksponensial e^{-r / (n a_0)}, di mana a_0 adalah jari-jari Bohr (~0.529 Å).\n• Harmonik Bola Y_{l}^{m}(θ, φ) terdiri dari polinomial Legendre terasosiasi P_l^m(cos θ) dan fase azimut e^{i m φ}. Dalam kimia nyata, kombinasi linier digunakan untuk menghasilkan orbital nyata dengan cuping dan bidang simpul (nodal plane) yang khas.',
          },
          formula: 'P(r) dr = r^2 |R_{n,l}(r)|^2 dr',
          formulaExplanation: {
            en: 'Radial Probability Density function P(r), showing the likelihood of finding an electron in a thin spherical shell between radius r and r + dr.',
            id: 'Fungsi Kerapatan Probabilitas Radial P(r), yang menunjukkan peluang menemukan elektron di dalam kulit bola tipis antara jari-jari r dan r + dr.',
          },
          keyTakeaways: {
            en: [
              'For a 1s orbital, maximum probability density is at r = 0, but total radial probability P(r) peaks at exactly r = a_0 (the Bohr radius).',
              'Higher n shells expand further radially with multiple internal nodal shells.',
              'The wave function phase (positive vs negative amplitude) is fundamental to molecular orbital hybridization (bonding σ vs antibonding σ*).',
            ],
            id: [
              'Untuk orbital 1s, kerapatan probabilitas maksimum ada di r = 0, namun peluang radial total P(r) mencapai puncak tepat di r = a_0 (jari-jari Bohr).',
              'Kulit n yang lebih tinggi meluas lebih jauh secara radial dengan beberapa kulit simpul internal.',
              'Fase fungsi gelombang (amplitudo positif vs negatif) sangat penting dalam hibridisasi orbital molekul (ikatan σ versus anti-ikatan σ*).',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q2-1',
          question: {
            en: 'How many total nodal planes (where ψ = 0) pass through the nucleus for a 2p_z orbital (l = 1)?',
            id: 'Berapa banyak bidang simpul (di mana ψ = 0) yang melewati inti atom untuk orbital 2p_z (l = 1)?',
          },
          options: {
            en: ['1 nodal plane (the xy plane)', '2 nodal planes', '0 nodal planes', '3 nodal planes'],
            id: ['1 bidang simpul (bidang xy)', '2 bidang simpul', '0 bidang simpul', '3 bidang simpul'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'An orbital with angular quantum number l has exactly l angular nodal planes. For p_z (l=1), the xy plane (where z = 0) is the sole nodal plane.',
            id: 'Orbital dengan bilangan kuantum sudut l memiliki tepat l bidang simpul sudut. Untuk p_z (l=1), bidang xy (di mana z = 0) merupakan satu-satunya bidang simpul.',
          },
        },
      ],
    },
    {
      id: 'qm-mod-3',
      topicId: 'quantum-mechanics',
      order: 3,
      title: {
        en: 'Wave-Particle Duality & The Double-Slit Experiment',
        id: 'Dualitas Gelombang-Partikel & Eksperimen Celah Ganda',
      },
      shortDescription: {
        en: 'Observe the transition between coherent wave interference and decoherent classical particles under measurement.',
        id: 'Amati transisi antara interferensi gelombang koheren dan partikel klasik terdekoherensi saat dilakukan pengukuran.',
      },
      durationMinutes: 18,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'double-slit',
      sections: [
        {
          id: 'qm-3-sec-1',
          title: {
            en: '1. The Core Mystery of Quantum Measurement',
            id: '1. Misteri Utama Pengukuran Kuantum',
          },
          content: {
            en: 'When individual electrons or photons are fired one by one through a barrier with two slits onto a detector screen, each particle lands as a localized, discrete dot. However, over time, the statistical accumulation of dots reveals an unmistakable wave interference pattern of alternating constructive and destructive fringes.\n\nEven when particles are fired with hours between them (preventing any particle-particle interaction), the interference pattern still forms: each single electron passes through both slits simultaneously as a probability wave ψ = ψ_1 + ψ_2.\n\nCrucially, when a detector is placed at either slit to observe which path the electron took ("which-way" information), the wave function collapses / decoheres, and the interference fringes vanish entirely, replaced by two classical particle bands.',
            id: 'Ketika elektron atau foton tunggal ditembakkan satu per satu melewati penghalang dengan dua celah ke layar detektor, setiap partikel mendarat sebagai titik diskrit yang terlokalisasi. Namun, seiring waktu, akumulasi statistik titik-titik tersebut membentuk pola interferensi gelombang yang jelas berupa garis-garis terang dan gelap bergantian.\n\nBahkan jika partikel ditembakkan dengan jeda waktu lama (mencegah interaksi antar-partikel), pola interferensi tetap terbentuk: setiap elektron tunggal melewati kedua celah secara bersamaan sebagai gelombang probabilitas ψ = ψ_1 + ψ_2.\n\nYang paling menarik, ketika detektor dipasang di salah satu celah untuk mengetahui celah mana yang dilewati partikel, fungsi gelombang mengalami keruntuhan (collapse/decoherence), dan pola interferensi lenyap sepenuhnya, digantikan oleh dua garis partikel klasik.',
          },
          formula: 'I(x) = |\\psi_1(x) + \\psi_2(x)|^2 = |\\psi_1|^2 + |\\psi_2|^2 + 2\\text{Re}(\\psi_1^* \\psi_2)',
          formulaExplanation: {
            en: 'Intensity distribution on the screen. The cross-term 2 Re(ψ1* ψ2) generates quantum interference. When measured, this cross-term vanishes.',
            id: 'Distribusi intensitas pada layar. Suku silang 2 Re(ψ1* ψ2) menghasilkan interferensi kuantum. Saat diukur, suku silang ini lenyap.',
          },
          keyTakeaways: {
            en: [
              'Quantum entities exhibit complementary wave-like and particle-like characteristics depending on the experimental measurement setup.',
              'Acquiring "which-way" information eliminates phase coherence and destroys interference fringes.',
              'Matter waves obey the de Broglie relation: λ = h / p.',
            ],
            id: [
              'Entitas kuantum menunjukkan sifat komplementer mirip gelombang dan mirip partikel tergantung pengaturan pengukuran eksperimen.',
              'Mendapatkan informasi "jalur mana" yang dilalui akan menghilangkan koherensi fase dan melenyapkan pola interferensi.',
              'Gelombang materi mematuhi hubungan de Broglie: λ = h / p.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q3-1',
          question: {
            en: 'What happens to the screen pattern in a double-slit experiment when a detector is activated to determine which slit each electron passed through?',
            id: 'Apa yang terjadi pada pola layar dalam eksperimen celah ganda ketika detektor diaktifkan untuk mengetahui celah mana yang dilewati setiap elektron?',
          },
          options: {
            en: [
              'The interference fringes disappear and two classical bands appear',
              'The interference fringes become twice as bright',
              'The electrons are completely absorbed by the slits',
              'A circular diffraction ring forms',
            ],
            id: [
              'Pola garis interferensi menghilang dan muncul dua garis partikel klasik',
              'Pola interferensi menjadi dua kali lebih terang',
              'Elektron terserap seluruhnya oleh celah',
              'Terbentuk cincin difraksi melingkar',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Detecting the path of the particle destroys the quantum phase superposition (decoherence), collapsing the wave distribution into two classical probability peaks.',
            id: 'Mendeteksi lintasan partikel merusak superposisi fase kuantum (dekoherensi), meruntuhkan distribusi gelombang menjadi dua puncak probabilitas klasik.',
          },
        },
      ],
    },
    {
      id: 'qm-mod-4',
      topicId: 'quantum-mechanics',
      order: 4,
      title: {
        en: 'Quantum Tunneling & The Bloch Sphere',
        id: 'Penembusan Kuantum (Tunneling) & Bola Bloch',
      },
      shortDescription: {
        en: 'Analyze how wavefunctions penetrate classically forbidden finite potential barriers and visualize qubit superposition.',
        id: 'Analisis bagaimana fungsi gelombang menembus rintangan potensial yang secara klasik terlarang dan visualisasikan superposisi qubit.',
      },
      durationMinutes: 22,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'quantum-tunneling',
      sections: [
        {
          id: 'qm-4-sec-1',
          title: {
            en: '1. Quantum Tunneling Across Finite Potential Barriers',
            id: '1. Penembusan Kuantum Melewati Rintangan Potensial',
          },
          content: {
            en: 'In classical physics, a particle with kinetic energy E < V_0 cannot cross a potential barrier of height V_0; it rebounds with 100% certainty. In quantum mechanics, the wave function inside the barrier becomes an exponentially decaying evanescent wave:\n\nψ(x) ~ e^{-κ x}, where κ = sqrt(2m(V_0 - E)) / ħ\n\nIf the barrier width L is finite, the wave function does not reach zero at the exit face. It emerges with reduced amplitude, allowing the particle to appear on the other side with non-zero transmission probability T ≈ e^{-2κL}.\n\nQuantum tunneling is essential to modern technology and astrophysics: it enables nuclear fusion in the Sun, flash memory NAND gates, and Scanning Tunneling Microscopy (STM).',
            id: 'Dalam fisika klasik, partikel dengan energi kinetik E < V_0 tidak dapat melompati rintangan potensial setinggi V_0; partikel akan memantul 100%. Namun dalam mekanika kuantum, fungsi gelombang di dalam rintangan menjadi gelombang evanesen yang meluruh secara eksponensial:\n\nψ(x) ~ e^{-κ x}, di mana κ = sqrt(2m(V_0 - E)) / ħ\n\nJika ketebalan rintangan L berhingga, fungsi gelombang tidak bernilai nol di ujung rintangan. Gelombang tersebut keluar dengan amplitudo yang lebih kecil, memberikan probabilitas transmisi bukan nol T ≈ e^{-2κL} bagi partikel untuk menembus rintangan.\n\nPenembusan kuantum sangat penting bagi teknologi modern dan astrofisika: memungkinkan fusi nuklir di Matahari, memori flash NAND, dan mikroskop penerowongan payaran (STM).',
          },
          formula: 'T \\approx 16 \\frac{E}{V_0} \\left(1 - \\frac{E}{V_0}\\right) e^{-2 \\kappa L}',
          formulaExplanation: {
            en: 'Transmission coefficient T through a rectangular potential barrier of width L and height V0 for a particle with energy E < V0.',
            id: 'Koefisien transmisi T melalui rintangan potensial persegi panjang dengan lebar L dan tinggi V0 untuk partikel berenergi E < V0.',
          },
          keyTakeaways: {
            en: [
              'Tunneling probability decreases exponentially with barrier thickness L and with the square root of particle mass m.',
              'Alpha decay in radioactive nuclei is governed by quantum tunneling through the Coulomb electrostatic barrier.',
              'Qubits on the Bloch sphere represent superpositions of |0⟩ and |1⟩ with state vector |ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩.',
            ],
            id: [
              'Peluang tunneling berkurang secara eksponensial terhadap ketebalan rintangan L dan akar kuadrat massa partikel m.',
              'Peluruhan alfa pada inti radioaktif dikendalikan oleh penembusan kuantum melalui rintangan Coulomb elektrostatik.',
              'Qubit pada Bola Bloch mewakili superposisi dari |0⟩ dan |1⟩ dengan vektor keadaan |ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q4-1',
          question: {
            en: 'If the thickness (L) of a potential barrier is doubled, how does the quantum tunneling transmission probability scale approximately?',
            id: 'Jika ketebalan (L) dari rintangan potensial digandakan, bagaimana perkiraan skala probabilitas transmisi tunneling kuantum?',
          },
          options: {
            en: [
              'It decreases exponentially as e^(-2 * 2κL)',
              'It is halved linearly (T / 2)',
              'It remains unchanged because energy E is constant',
              'It drops to exactly zero',
            ],
            id: [
              'Berkurang secara eksponensial menjadi e^(-2 * 2κL)',
              'Berkurang separuh secara linier (T / 2)',
              'Tetap sama karena energi E konstan',
              'Turun menjadi tepat nol',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Because transmission probability is dominated by the exponential factor e^{-2κL}, doubling barrier width L squares the attenuation factor, causing a severe exponential drop.',
            id: 'Karena probabilitas transmisi didominasi oleh faktor eksponensial e^{-2κL}, penggandaan lebar rintangan L mengkuadratkan faktor atenuasi, menyebabkan penurunan eksponensial yang sangat tajam.',
          },
        },
      ],
    },
  ],
};
