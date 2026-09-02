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
    en: 'Dive into the quantum realm. Discover how the Schrödinger wave equation replaces classic planetary Bohr orbits with probabilistic electron clouds (|ψ|²), explore wave-particle duality through real-time double-slit interference, and manipulate quantum tunneling barriers in real-time 3D.',
    id: 'Selami dunia kuantum. Pelajari bagaimana persamaan gelombang Schrödinger menggantikan orbit planet klasik Bohr dengan awan probabilitas elektron (|ψ|²), amati dualitas gelombang-partikel melalui interferensi celah ganda langsung, dan atur rintangan penembusan kuantum (quantum tunneling) dalam visualisasi 3D real-time.',
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
      durationMinutes: 18,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'orbital-cloud',
      sections: [
        {
          id: 'qm-1-sec-1',
          title: {
            en: '1. The Crisis of Classical Electrodynamics at the Atomic Scale',
            id: '1. Krisis Elektrodinamika Klasik pada Skala Atom',
          },
          content: {
            en: 'In classical Newtonian and Maxwellian electrodynamics, any accelerated charged particle—such as an electron in centripetal orbital motion around a positively charged nucleus—must continuously radiate electromagnetic energy at power $P = \\frac{q^2 a^2}{6\\pi \\varepsilon_0 c^3}$ (Larmor\'s radiation formula).\n\nIf classical physics were valid at subatomic dimensions, the electron would shed its entire kinetic and potential energy within approximately 16 picoseconds ($1.6 \\times 10^{-11}$ s), spiraling inexorably into the nuclear center. Consequently, stable macroscopic matter and chemical elements could not exist in our universe.\n\nIn 1913, Niels Bohr introduced the radical postulate that electron orbital angular momentum is quantized in integer units of $\\hbar$: $L = m_e v r = n\\hbar$. While this successfully predicted the Rydberg emission lines of atomic hydrogen, the semi-classical Bohr-Sommerfeld model failed to explain multi-electron atoms, chemical bonding geometry, or spectral fine-structure splitting.',
            id: 'Dalam elektrodinamika klasik Newton dan Maxwell, setiap partikel bermuatan yang mengalami percepatan—seperti elektron dalam gerak orbit sentripetal mengelilingi inti bermuatan positif—harus terus-menerus memancarkan energi gelombang elektromagnetik dengan daya radiasi $P = \\frac{q^2 a^2}{6\\pi \\varepsilon_0 c^3}$ (rumus radiasi Larmor).\n\nJika hukum fisika klasik berlaku pada skala subatomik, elektron akan kehilangan seluruh energi kinetik dan potensialnya dalam waktu sekitar 16 pikodetik ($1.6 \\times 10^{-11}$ detik), jatuh secara spiral dan menabrak inti atom. Akibatnya, materi stabil dan ikatan kimia tidak akan pernah terbentuk di alam semesta.\n\nPada tahun 1913, Niels Bohr mengajukan postulat revolusioner bahwa momentum sudut orbital elektron terkuantisasi dalam kelipatan bulat $\\hbar$: $L = m_e v r = n\\hbar$. Walaupun berhasil memprediksi spektrum emisi atom hidrogen (deret Rydberg), model semi-klasik Bohr-Sommerfeld gagal menjelaskan atom berelektron banyak, geometri ikatan kimia, serta pembelahan garis halus spektroskopi.',
          },
          formula: '-\\frac{\\hbar^2}{2m_e} \\nabla^2 \\psi(\\mathbf{r}) + V(\\mathbf{r})\\psi(\\mathbf{r}) = E\\psi(\\mathbf{r})',
          formulaExplanation: {
            en: 'The Time-Independent Schrödinger Equation (TISE) in three dimensions for an electron of mass m_e subject to an electrostatic Coulomb potential V(r) = -e² / (4πε₀r), yielding stationary energy eigenstates E and spatial probability wavefunctions ψ(r).',
            id: 'Persamaan Schrödinger Bebas-Waktu 3D untuk elektron bermassa m_e dalam medan potensial Coulomb V(r) = -e² / (4πε₀r), yang menghasilkan keadaan stasioner energi E dan fungsi gelombang probabilitas spasial ψ(r).',
          },
          variables: [
            {
              symbol: '\\hbar',
              name: { en: 'Reduced Planck Constant', id: 'Konstanta Planck Tereduksi' },
              unit: 'J·s (1.0545718 × 10⁻³⁴)',
              description: {
                en: 'Fundamental quantum action scaling factor (h / 2π).',
                id: 'Faktor skala aksi kuantum fundamental (h / 2π).',
              },
            },
            {
              symbol: '\\nabla^2',
              name: { en: 'Laplacian Operator', id: 'Operator Laplacian' },
              unit: 'm⁻²',
              description: {
                en: 'Three-dimensional spatial divergence of the gradient: ∂²/∂x² + ∂²/∂y² + ∂²/∂z².',
                id: 'Divergensi spasial 3 dimensi dari gradien: ∂²/∂x² + ∂²/∂y² + ∂²/∂z².',
              },
            },
            {
              symbol: '\\psi(\\mathbf{r})',
              name: { en: 'Stationary Wavefunction', id: 'Fungsi Gelombang Stasioner' },
              unit: 'm⁻³/²',
              description: {
                en: 'Complex spatial probability amplitude describing the quantum state.',
                id: 'Amplitudo probabilitas spasial kompleks yang mendeskripsikan keadaan kuantum.',
              },
            },
            {
              symbol: 'V(\\mathbf{r})',
              name: { en: 'Coulombic Potential Energy', id: 'Energi Potensial Coulomb' },
              unit: 'Joules / eV',
              description: {
                en: 'Attractive central force potential between proton nucleus and electron.',
                id: 'Potensial gaya tarik pusat antara inti proton dan elektron.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Electrons do not traverse classical deterministic circular tracks; they exist as three-dimensional stationary standing waves.',
              'The wavefunction ψ itself is a complex probability amplitude; its modulus squared |ψ(r)|² defines the spatial probability density.',
              'Quantization of energy emerges rigorously from boundary conditions requiring ψ to be single-valued, continuous, and normalizable.',
            ],
            id: [
              'Elektron tidak bergerak pada lintasan melingkar deterministik, melainkan eksis sebagai gelombang stasioner probabilitas 3D.',
              'Fungsi gelombang ψ bernilai kompleks; kuadrat modulusnya |ψ(r)|² mendefinisikan kerapatan probabilitas menemukan elektron.',
              'Kuantisasi energi muncul secara matematis dari syarat batas yang mewajibkan ψ bernilai tunggal, kontinu, dan ternormalisasi.',
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
            en: 'Solving the Schrödinger equation for a central Coulomb potential requires transforming Cartesian coordinates (x, y, z) into spherical polar coordinates (r, θ, φ). Applying separation of variables $\\psi(r, \\theta, \\phi) = R(r) Y(\\theta, \\phi)$ yields three fundamental integer spatial quantum numbers, augmented by a fourth intrinsic relativistic spin quantum number:\n\n1. Principal Quantum Number (n ∈ {1, 2, 3, ...}): Defines the main energy level shell and radial distance scale. For hydrogen-like systems, $E_n = -\\frac{13.6\\text{ eV}}{n^2}$.\n2. Azimuthal / Orbital Angular Momentum (l ∈ {0, 1, ..., n-1}): Governs orbital geometry and magnitude of orbital angular momentum $L = \\hbar\\sqrt{l(l+1)}$. (l=0: s [sharp/spherical], l=1: p [principal/bilobed], l=2: d [diffuse/cloverleaf], l=3: f [fundamental/complex octalobe]).\n3. Magnetic Quantum Number ($m_l \\in \\{-l, ..., 0, ..., +l\\}$): Dictates the 3D spatial orientation of the angular momentum vector relative to an external magnetic axis (2l + 1 states).\n4. Spin Magnetic Quantum Number ($m_s = \\pm 1/2$): The intrinsic angular momentum of the electron ($S = \\hbar\\sqrt{3/4}$), governed by the Dirac relativistic equation.',
            id: 'Penyelesaian persamaan Schrödinger pada potensial Coulomb pusat memerlukan transformasi koordinat Kartesius (x, y, z) ke koordinat polar bola (r, θ, φ). Pemisahan variabel $\\psi(r, \\theta, \\phi) = R(r) Y(\\theta, \\phi)$ menghasilkan tiga bilangan kuantum spasial bulat fundamental, ditambah bilangan kuantum spin relativistik intrinsik:\n\n1. Bilangan Kuantum Utama (n ∈ {1, 2, 3, ...}): Menentukan kulit energi utama dan skala radial atom. Untuk sistem hidrogen, $E_n = -\\frac{13.6\\text{ eV}}{n^2}$.\n2. Bilangan Kuantum Azimut / Momentum Sudut (l ∈ {0, 1, ..., n-1}): Menentukan geometri orbital dan besarnya momentum sudut orbital $L = \\hbar\\sqrt{l(l+1)}$. (l=0: s [bola], l=1: p [cuping ganda], l=2: d [semanggi], l=3: f [oktalobal]).\n3. Bilangan Kuantum Magnetik ($m_l \\in \\{-l, ..., 0, ..., +l\\}$): Menentukan orientasi spasial 3D vektor momentum sudut terhadap sumbu magnetik luar (sebanyak 2l + 1 orientasi).\n4. Bilangan Kuantum Spin ($m_s = \\pm 1/2$): Momentum sudut intrinsik elektron ($S = \\hbar\\sqrt{3/4}$) yang dijelaskan oleh persamaan relativistik Dirac.',
          },
          comparisonTable: {
            headers: {
              en: ['Quantum Number', 'Symbol', 'Allowed Values', 'Physical Property Determined', 'Geometric Influence'],
              id: ['Bilangan Kuantum', 'Simbol', 'Nilai yang Diizinkan', 'Sifat Fisik yang Ditentukan', 'Pengaruh Geometris'],
            },
            rows: [
              {
                en: ['Principal', 'n', '1, 2, 3, 4, ...', 'Total energy level & size', 'Radial distance from nucleus'],
                id: ['Utama', 'n', '1, 2, 3, 4, ...', 'Tingkat energi & ukuran total', 'Jarak radial rata-rata dari inti'],
              },
              {
                en: ['Azimuthal', 'l', '0, 1, ..., n-1', 'Orbital angular momentum |L|', 'Orbital geometric shape (s, p, d, f)'],
                id: ['Azimut', 'l', '0, 1, ..., n-1', 'Besar momentum sudut orbital |L|', 'Bentuk geometri orbital (s, p, d, f)'],
              },
              {
                en: ['Magnetic', 'm_l', '-l, ..., 0, ..., +l', 'Spatial orientation of L along z-axis', 'Directional lobe orientation (x, y, z)'],
                id: ['Magnetik', 'm_l', '-l, ..., 0, ..., +l', 'Orientasi proyeksi L pada sumbu-z', 'Arah orientasi spasial cuping orbital'],
              },
              {
                en: ['Spin Projection', 'm_s', '+1/2, -1/2', 'Intrinsic magnetic moment projection', 'Two-fold spin degeneracy (Up / Down)'],
                id: ['Proyeksi Spin', 'm_s', '+1/2, -1/2', 'Momen magnetik intrinsik elektron', 'Degenerasi spin (Spin Atas / Spin Bawah)'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'The Stern-Gerlach Experiment & Quantum Spin Quantization',
              id: 'Eksperimen Stern-Gerlach & Kuantisasi Spin Kuantum',
            },
            context: {
              en: 'In 1922, Otto Stern and Walther Gerlach fired a collimated beam of neutral silver atoms through an inhomogeneous magnetic field ∂B_z/∂z to test spatial quantization.',
              id: 'Pada tahun 1922, Otto Stern dan Walther Gerlach menembakkan berkas atom perak netral melewati medan magnet non-homogen ∂B_z/∂z untuk menguji kuantisasi spasial.',
            },
            analysis: {
              en: 'Classical physics predicted a continuous smear of deflected atoms on the detector plate. Instead, the beam split into exactly two discrete deflection traces corresponding to intrinsic spin projections ms = +1/2 and ms = -1/2.',
              id: 'Fisika klasik memprediksi jejak berkas akan menyebar secara kontinu. Namun, berkas justru terbelah menjadi tepat dua garis diskrit terpisah yang membuktikan kuantisasi spin intrinsik ms = +1/2 dan ms = -1/2.',
            },
            takeaway: {
              en: 'Intrinsic quantum spin is a purely quantum relativistic observable without any classical mechanical spinning ball analogue.',
              id: 'Spin kuantum intrinsik adalah besaran kuantum murni tanpa analogi mekanis klasik bola yang berputar.',
            },
          },
          keyTakeaways: {
            en: [
              'The Pauli Exclusion Principle states that no two fermions in the same quantum system may possess an identical set of all four quantum numbers (n, l, ml, ms).',
              'Total degenerate quantum states in shell n equals 2n².',
              'Radial nodes = n - l - 1; Angular nodal surfaces = l.',
            ],
            id: [
              'Prinsip Larangan Pauli menyatakan bahwa tidak ada dua fermion dalam sistem kuantum yang sama yang dapat memiliki keempat bilangan kuantum identik.',
              'Total jumlah keadaan kuantum degenerasi pada kulit n adalah 2n².',
              'Simpul radial = n - l - 1; Simpul sudut (angular nodal planes) = l.',
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
        id: 'Fungsi Gelombang 3D & Harmonisa Bola Riil',
      },
      shortDescription: {
        en: 'Separating the radial and angular solutions, calculating probability density distributions, and visualizing phase lobes.',
        id: 'Pemisahan solusi radial dan sudut, perhitungan distribusi kerapatan probabilitas, dan visualisasi cuping fase.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'orbital-cloud',
      sections: [
        {
          id: 'qm-2-sec-1',
          title: {
            en: '1. Radial-Angular Separation of the Hydrogen Wavefunction',
            id: '1. Pemisahan Radial-Sudut pada Fungsi Gelombang Hidrogen',
          },
          content: {
            en: 'The complete three-dimensional spatial wavefunction for an electron in a hydrogenic atom is factored into a purely radial function $R_{nl}(r)$ and an angular spherical harmonic function $Y_l^{m_l}(\\theta, \\phi)$:\n\n$$\\psi_{nlm_l}(r, \\theta, \\phi) = R_{nl}(r) Y_l^{m_l}(\\theta, \\phi)$$\n\n• Radial Function $R_{nl}(r)$: Involves Associated Laguerre Polynomials $L_{n-l-1}^{2l+1}(\\rho)$ and an exponential decay factor $e^{-\\rho/2}$, where $\\rho = \\frac{2Zr}{n a_0}$. It determines how electron probability decays radially away from the nucleus.\n• Spherical Harmonics $Y_l^{m_l}(\\theta, \\phi)$: Constructed from Associated Legendre Polynomials $P_l^{|m_l|}(\\cos\\theta)$ and complex exponential phases $e^{i m_l \\phi}$. They govern the 3D angular lobes and nodal cones.',
            id: 'Fungsi gelombang spasial tiga dimensi lengkap untuk elektron pada atom mirip-hidrogen difaktorkan menjadi fungsi radial murni $R_{nl}(r)$ dan fungsi harmonisa bola sudut $Y_l^{m_l}(\\theta, \\phi)$:\n\n$$\\psi_{nlm_l}(r, \\theta, \\phi) = R_{nl}(r) Y_l^{m_l}(\\theta, \\phi)$$\n\n• Fungsi Radial $R_{nl}(r)$: Melibatkan Polinomial Laguerre Terasosiasi $L_{n-l-1}^{2l+1}(\\rho)$ dan faktor peluruhan eksponensial $e^{-\\rho/2}$, dengan $\\rho = \\frac{2Zr}{n a_0}$. Menentukan bagaimana probabilitas elektron meluruh seiring pertambahan jarak dari inti.\n• Harmonisa Bola $Y_l^{m_l}(\\theta, \\phi)$: Dibangun dari Polinomial Legendre Terasosiasi $P_l^{|m_l|}(\\cos\\theta)$ dan fase eksponensial kompleks $e^{i m_l \\phi}$. Menentukan cuping orientasi spasial dan simpul angular 3D.',
          },
          formula: 'R_{nl}(r) = -\\sqrt{\\left(\\frac{2Z}{n a_0}\\right)^3 \\frac{(n-l-1)!}{2n [(n+l)!]^3}} e^{-\\rho/2} \\rho^l L_{n+l}^{2l+1}(\\rho)',
          formulaExplanation: {
            en: 'The generalized analytical radial wavefunction where a₀ = 0.529177 Å is the Bohr radius, Z is nuclear charge, and L is the associated Laguerre polynomial.',
            id: 'Fungsi gelombang radial analitis umum di mana a₀ = 0.529177 Å adalah jari-jari Bohr, Z adalah muatan inti, dan L adalah polinomial Laguerre terasosiasi.',
          },
          derivationSteps: [
            {
              title: { en: 'Separation of Variables', id: 'Pemisahan Variabel' },
              math: '\\psi(r,\\theta,\\phi) = R(r)\\Theta(\\theta)\\Phi(\\phi)',
              explanation: {
                en: 'Substituting the product into the Laplacian in spherical coordinates decouples the radial differential equation from the angular terms.',
                id: 'Substitusi produk fungsi ke dalam Laplacian koordinat bola memisahkan persamaan diferensial radial dari suku sudut.',
              },
            },
            {
              title: { en: 'Azimuthal Phase Solution', id: 'Solusi Fase Azimut' },
              math: '\\frac{d^2\\Phi}{d\\phi^2} = -m_l^2\\Phi \\implies \\Phi(\\phi) = \\frac{1}{\\sqrt{2\\pi}} e^{i m_l \\phi}',
              explanation: {
                en: 'Single-valued boundary condition Φ(φ + 2π) = Φ(φ) forces ml to be strictly an integer.',
                id: 'Syarat batas nilai tunggal Φ(φ + 2π) = Φ(φ) mewajibkan ml berupa bilangan bulat.',
              },
            },
            {
              title: { en: 'Radial Probability Peak vs Nucleus Density', id: 'Puncak Peluang Radial vs Kerapatan di Inti' },
              math: 'P(r) dr = r^2 |R_{nl}(r)|^2 dr',
              explanation: {
                en: 'Although |ψ(0)|² is maximum at the nucleus for 1s, the spherical shell volume element dV = 4πr²dr causes the total radial probability P(r) to peak exactly at r = a₀.',
                id: 'Meskipun |ψ(0)|² bernilai maksimum di titik inti (r=0) untuk orbital 1s, elemen volume kulit bola dV = 4πr²dr membuat peluang radial total P(r) memuncak tepat pada r = a₀.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Radial distribution function P(r) = r²|R(r)|² reveals the true radial probability of locating the electron at distance r.',
              'Linear combinations of complex eigenfunctions produce real-valued chemical orbitals (e.g. px = (Y₁¹ + Y₁⁻¹)/√2).',
              'Wavefunction lobes have alternating positive (+) and negative (-) mathematical phase signs critical for covalent bonding.',
            ],
            id: [
              'Fungsi distribusi radial P(r) = r²|R(r)|² mengungkapkan peluang radial sebenarnya menemukan elektron pada jarak r.',
              'Kombinasi linier fungsi gelombang kompleks menghasilkan orbital kimia riil (misal px = (Y₁¹ + Y₁⁻¹)/√2).',
              'Cuping orbital memiliki tanda fase matematis positif (+) dan negatif (-) yang krusial dalam pembentukan ikatan kovalen.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q2-1',
          question: {
            en: 'Why does the total radial probability density P(r) for a 1s orbital peak at the Bohr radius (a₀) even though |ψ(r)|² is highest at the nucleus (r = 0)?',
            id: 'Mengapa kerapatan probabilitas radial total P(r) untuk orbital 1s memuncak pada jari-jari Bohr (a₀) padahal |ψ(r)|² tertinggi di inti (r = 0)?',
          },
          options: {
            en: [
              'Because the spherical shell volume element grows proportionally to r² (dV = 4πr² dr)',
              'Because the electron repels the proton nucleus',
              'Because of centrifugal force pushing the electron outward',
              'Because the wavefunction changes sign at a₀',
            ],
            id: [
              'Karena elemen volume kulit bola meningkat sebanding dengan r² (dV = 4πr² dr)',
              'Karena elektron menolak proton di inti atom',
              'Karena gaya sentrifugal mendorong elektron keluar',
              'Karena fungsi gelombang berganti tanda pada r = a₀',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The radial probability is P(r) = r² |R(r)|². Even though |R(r)|² is highest at r = 0, the multiplying factor r² equals 0 at the origin, creating a peak at r = a₀.',
            id: 'Probabilitas radial adalah P(r) = r² |R(r)|². Walaupun |R(r)|² bernilai maksimum di r = 0, faktor pengali r² bernilai 0 di titik pusat, sehingga kurva memuncak di r = a₀.',
          },
        },
      ],
    },
    {
      id: 'qm-mod-3',
      topicId: 'quantum-mechanics',
      order: 3,
      title: {
        en: 'Wave-Particle Duality & Double-Slit Interference',
        id: 'Dualitas Gelombang-Partikel & Interferensi Celah Ganda',
      },
      shortDescription: {
        en: 'How single photons and electrons generate interference fringes, and the collapse of the wavefunction under observation.',
        id: 'Bagaimana foton dan elektron tunggal menghasilkan pola interferensi, dan runtuhnya fungsi gelombang akibat pengamatan.',
      },
      durationMinutes: 22,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'double-slit',
      sections: [
        {
          id: 'qm-3-sec-1',
          title: {
            en: '1. The de Broglie Hypothesis & Matter Waves',
            id: '1. Hipotesis de Broglie & Gelombang Materi',
          },
          content: {
            en: 'In 1924, Louis de Broglie proposed that wave-particle duality is not exclusive to light, but a universal property of all matter. Any particle possessing momentum $p = mv$ possesses an associated quantum matter wavelength:\n\n$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$\n\nWhen a monochromatic beam of electrons (or buckyballs, C₆₀ molecules) passes through two closely spaced slits separated by distance $d$, the spatial probability wave splits and propagates through both slits simultaneously. The waves interfere constructively and destructively on the detection screen located distance $L$ away.',
            id: 'Pada tahun 1924, Louis de Broglie mengusulkan bahwa dualitas gelombang-partikel tidak hanya berlaku untuk cahaya, melainkan merupakan sifat universal seluruh materi. Setiap partikel bermomentum $p = mv$ memiliki panjang gelombang materi kuantum:\n\n$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$\n\nKetika berkas elektron (atau molekul buckyball C₆₀) melewati dua celah sempit yang berjarak $d$, gelombang probabilitas spasial membelah dan merambat melalui kedua celah secara simultan. Gelombang tersebut mengalami interferensi konstruktif dan destruktif pada layar detektor berjarak $L$.',
          },
          formula: 'I(\\theta) = I_0 \\left(\\frac{\\sin \\beta}{\\beta}\\right)^2 \\cos^2 \\alpha, \\quad \\alpha = \\frac{\\pi d \\sin\\theta}{\\lambda}, \\quad \\beta = \\frac{\\pi a \\sin\\theta}{\\lambda}',
          formulaExplanation: {
            en: 'Combined Fraunhofer double-slit intensity distribution where a is the individual slit aperture width, d is inter-slit separation, and θ is the angular position on the detector.',
            id: 'Distribusi intensitas celah ganda Fraunhofer gabungan di mana a adalah lebar celah individual, d adalah jarak antar-celah, dan θ adalah posisi sudut pada layar.',
          },
          caseStudy: {
            title: {
              en: 'Davisson-Germer Nickel Crystal Diffraction (1927)',
              id: 'Difraksi Kristal Nikel Davisson-Germer (1927)',
            },
            context: {
              en: 'Clinton Davisson and Lester Germer scattered 54 eV electrons onto a single-crystal nickel target.',
              id: 'Clinton Davisson dan Lester Germer menembakkan elektron berenergi 54 eV ke target kristal tunggal nikel.',
            },
            analysis: {
              en: 'The scattered electrons showed sharp angular intensity maxima at 50° that precisely matched Bragg\'s law for de Broglie matter waves (λ = 0.165 nm).',
              id: 'Elektron yang dihamburkan menunjukkan puncak intensitas tajam pada sudut 50° yang cocok dengan hukum Bragg untuk gelombang materi de Broglie (λ = 0.165 nm).',
            },
            takeaway: {
              en: 'Definitively established the wave nature of electrons, laying the foundation for modern Transmission Electron Microscopy (TEM).',
              id: 'Secara definitif membuktikan sifat gelombang elektron, membuka jalan bagi Mikroskop Elektron Transmisi (TEM) modern.',
            },
          },
          keyTakeaways: {
            en: [
              'Interference fringes accumulate particle-by-particle over time, proving probability amplitudes interfere, not classical physical fluids.',
              'Fringe spacing on the screen is given by Δy = λL / d.',
              'Attempting to determine which slit the particle passed through collapses the spatial coherent superposition into a classical incoherent sum.',
            ],
            id: [
              'Pola interferensi terbentuk partikel demi partikel seiring waktu, membuktikan bahwa amplitudo probabilitas yang berinterferensi.',
              'Jarak antar garis terang adalah Δy = λL / d.',
              'Upaya mendeteksi celah mana yang dilewati partikel meruntuhkan superposisi koheren menjadi penjumlahan inkoheren klasik.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q3-1',
          question: {
            en: 'What happens to the fringe spacing Δy on the screen if the electron beam kinetic energy is increased (increasing velocity v)?',
            id: 'Apa yang terjadi pada jarak antar-garis terang (Δy) di layar jika energi kinetik berkas elektron ditingkatkan (kecepatan v bertambah)?',
          },
          options: {
            en: [
              'Fringe spacing decreases (fringes compress closer together)',
              'Fringe spacing increases (fringes spread further apart)',
              'The interference pattern disappears completely',
              'The fringes remain completely unchanged',
            ],
            id: [
              'Jarak antar-garis terang mengecil (pola garis saling merapat)',
              'Jarak antar-garis terang membesar (pola garis semakin melebar)',
              'Pola interferensi menghilang sama sekali',
              'Pola garis tidak mengalami perubahan sama sekali',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Higher electron velocity increases momentum p, which decreases the de Broglie wavelength λ = h/p. Since fringe spacing is Δy = λL/d, smaller λ compresses the fringes.',
            id: 'Kecepatan elektron yang lebih tinggi meningkatkan momentum p, sehingga memperpendek panjang gelombang de Broglie λ = h/p. Karena jarak garis Δy = λL/d, panjang gelombang yang lebih pendek membuat garis-garis merapat.',
          },
        },
      ],
    },
    {
      id: 'qm-mod-4',
      topicId: 'quantum-mechanics',
      order: 4,
      title: {
        en: 'Potential Barrier Tunneling & The Bloch Sphere',
        id: 'Penembusan Rintangan Potensial & Bola Bloch',
      },
      shortDescription: {
        en: 'Quantum evanescent wave transmission through classically forbidden energy barriers, and 2-level qubit superposition geometry.',
        id: 'Transmisi gelombang evanescent kuantum melalui rintangan energi yang terlarang secara klasik, dan geometri superposisi qubit 2-level.',
      },
      durationMinutes: 24,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'quantum-tunneling',
      sections: [
        {
          id: 'qm-4-sec-1',
          title: {
            en: '1. Finite Rectangular Potential Barrier & Evanescent Decay',
            id: '1. Rintangan Potensial Persegi Berhingga & Peluruhan Evanescent',
          },
          content: {
            en: 'In classical mechanics, a particle with total energy $E$ incident on a potential barrier of height $V_0 > E$ will be reflected with 100% certainty ($R = 1, T = 0$).\n\nIn quantum mechanics, solving the Schrödinger equation inside the barrier region ($0 \\le x \\le a$) where $V_0 > E$ yields an exponential evanescent decay solution:\n\n$$\\psi_{II}(x) = A e^{-\\kappa x} + B e^{\\kappa x}, \\quad \\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}$$\n\nIf the barrier width $a$ is sufficiently narrow, the exponential tail does not decay to zero before reaching the exit boundary ($x = a$). A finite oscillatory wavefunction $\\psi_{III}(x) = C e^{ikx}$ emerges on the other side, giving a non-zero quantum transmission probability $T > 0$.',
            id: 'Dalam mekanika klasik, partikel dengan energi total $E$ yang membentur rintangan potensial setinggi $V_0 > E$ akan dipantulkan kembali dengan kepastian 100% ($R = 1, T = 0$).\n\nDalam mekanika kuantum, penyelesaian persamaan Schrödinger di dalam rintangan ($0 \\le x \\le a$) di mana $V_0 > E$ menghasilkan solusi peluruhan eksponensial (evanescent):\n\n$$\\psi_{II}(x) = A e^{-\\kappa x} + B e^{\\kappa x}, \\quad \\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}$$\n\nJika lebar rintangan $a$ cukup tipis, ekor gelombang eksponensial belum mencapai nol saat tiba di batas keluar ($x = a$). Fungsi gelombang osilatori $\\psi_{III}(x) = C e^{ikx}$ muncul di sisi seberang, menghasilkan probabilitas transmisi kuantum bernilai positif $T > 0$.',
          },
          formula: 'T \\approx 16 \\frac{E}{V_0} \\left(1 - \\frac{E}{V_0}\\right) e^{-2\\kappa a}, \\quad \\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}',
          formulaExplanation: {
            en: 'Transmission coefficient T in the thick-barrier limit (κa >> 1), demonstrating exponential sensitivity to barrier width a and particle mass m.',
            id: 'Koefisien transmisi T pada limit rintangan tebal (κa >> 1), yang menunjukkan sensitivitas eksponensial terhadap ketebalan rintangan a dan massa partikel m.',
          },
          caseStudy: {
            title: {
              en: 'Scanning Tunneling Microscopy (STM) & Flash Memory',
              id: 'Scanning Tunneling Microscopy (STM) & Memori Flash',
            },
            context: {
              en: 'Invented by Gerd Binnig and Heinrich Rohrer (Nobel Prize 1986), STM scans an atomically sharp metal tip ~1 nm above a conducting surface.',
              id: 'Ditemukan oleh Gerd Binnig dan Heinrich Rohrer (Nobel Fisika 1986), STM mengarahkan ujung jarum logam runcing atomik ~1 nm di atas permukaan konduktor.',
            },
            analysis: {
              en: 'Because tunnel current I ∝ e^(-2κd), changing the tip-to-sample distance by just 0.1 nm (1 Å) alters the tunneling current by a factor of 10×.',
              id: 'Karena arus tunneling I ∝ e^(-2κd), perubahan jarak jarum-sampel sebesar 0.1 nm (1 Å) mengubah kuat arus sebesar 10 kali lipat.',
            },
            takeaway: {
              en: 'Enables sub-angstrom topographic resolution capable of imaging and manipulating individual surface atoms.',
              id: 'Memungkinkan resolusi topografi sub-angstrom untuk memetakan dan memanipulasi atom individual satu per satu.',
            },
          },
          keyTakeaways: {
            en: [
              'Tunneling probability decays exponentially with barrier thickness a and the square root of particle mass m.',
              'Nuclear alpha decay, solar core proton-proton fusion, and modern sub-3nm MOSFET gate leakage are all direct manifestations of quantum tunneling.',
              'The Bloch Sphere maps any two-level quantum qubit state vector |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩ onto the surface of a unit sphere in Hilbert space.',
            ],
            id: [
              'Peluang penembusan kuantum meluruh secara eksponensial terhadap ketebalan rintangan a dan akar massa partikel m.',
              'Peluruhan alfa nuklir, fusi proton-proton di inti matahari, dan kebocoran gerbang transistor sub-3nm adalah manifestasi langsung dari quantum tunneling.',
              'Bola Bloch memetakan vektor keadaan qubit 2-level |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩ pada permukaan bola satuan di ruang Hilbert.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'qm-q4-1',
          question: {
            en: 'If the barrier width (a) in a quantum tunneling experiment is doubled, what happens to the transmission probability T (assuming thick barrier approximation)?',
            id: 'Jika lebar rintangan (a) dalam eksperimen quantum tunneling digandakan menjadi 2×, apa yang terjadi pada peluang transmisi T?',
          },
          options: {
            en: [
              'It decreases exponentially (approximately squared decay e^(-4κa))',
              'It decreases by exactly 50%',
              'It remains unchanged because energy E is constant',
              'It increases due to wave buildup',
            ],
            id: [
              'Menurun secara eksponensial tajam (mendekati kuadrat peluruhan e^(-4κa))',
              'Menurun tepat sebesar 50%',
              'Tetap sama karena energi partikel E konstan',
              'Meningkat akibat akumulasi gelombang',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Because transmission depends exponentially on barrier width T ∝ e^(-2κa), doubling a to 2a squares the exponential attenuation e^(-4κa), causing an exponential drop in transmission.',
            id: 'Karena transmisi bergantung secara eksponensial pada lebar rintangan T ∝ e^(-2κa), menggandakan a menjadi 2a mengkuadratkan faktor atenuasi e^(-4κa), menyebabkan penurunan transmisi yang sangat drastis.',
          },
        },
      ],
    },
  ],
};
