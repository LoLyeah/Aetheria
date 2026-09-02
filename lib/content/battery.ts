import { Topic } from '@/types/learning';

export const evBatteryTopic: Topic = {
  id: 'ev-battery',
  title: {
    en: 'EV Battery Technology & Electrical Powertrain Efficiency',
    id: 'Teknologi Baterai EV & Efisiensi Powertrain Listrik',
  },
  tagline: {
    en: 'Electrochemistry, 4680 cell architecture, SiC inverters, and real-time powertrain thermodynamics.',
    id: 'Elektrokimia, arsitektur sel 4680, inverter SiC, dan termodinamika powertrain real-time.',
  },
  description: {
    en: 'Master the high-voltage engineering driving electric mobility. Explore lithium-ion intercalation physics in NMC and LFP cells, inspect thermal cooling ribbons inside 4680 battery packs, analyze SiC inverter and PMSM electric motor efficiency maps, and simulate vehicle range and power flow under dynamic road gradients, speed profiles, and ambient temperatures in 3D.',
    id: 'Kuasai rekayasa tegangan tinggi yang menggerakkan mobilitas listrik modern. Pelajari fisika interkalasi ion litium pada sel NMC dan LFP, amati pita pendingin termal di dalam modul baterai 4680, analisis peta efisiensi inverter SiC dan motor listrik PMSM, serta simulasikan jangkauan jarak dan aliran daya kendaraan pada berbagai kontur tanjakan, kecepatan, dan suhu lingkungan dalam 3D.',
  },
  category: {
    en: 'Energy & Electrical Engineering',
    id: 'Energi & Rekayasa Elektro',
  },
  colorAccent: 'emerald',
  badgeColor: 'from-emerald-500 to-teal-600',
  iconName: 'Zap',
  modules: [
    {
      id: 'bat-mod-1',
      topicId: 'ev-battery',
      order: 1,
      title: {
        en: 'Lithium-ion & Solid-State Electrochemical Mechanics',
        id: 'Mekanika Elektrokimia Litium-ion & Baterai Solid-State',
      },
      shortDescription: {
        en: 'Reversible lithium-ion intercalation, cathode crystal structures (NMC vs LFP), and solid-state electrolyte interfaces.',
        id: 'Interkalasi ion litium bolak-balik, struktur kristal katoda (NMC vs LFP), dan antarmuka elektrolit padat.',
      },
      durationMinutes: 18,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'cell-cross-section',
      sections: [
        {
          id: 'bat-1-sec-1',
          title: {
            en: '1. The Intercalation Mechanism and Cell Chemistry',
            id: '1. Mekanisme Interkalasi dan Kimia Sel',
          },
          content: {
            en: 'A lithium-ion secondary cell stores chemical potential energy via reversible "rocking-chair" intercalation of Li⁺ ions between two host interstitial crystal lattices:\n\n• Anode (Negative Electrode during discharge): Typically synthetic graphite sheets (Li_x C_6) or silicon-doped carbon composites. During discharge, lithium atoms oxidize into Li⁺ ions and electrons.\n• Cathode (Positive Electrode during discharge): Transition metal oxide or phosphate matrix, primarily:\n  - NMC (Nickel-Manganese-Cobalt, e.g., LiNi_{0.8}Mn_{0.1}Co_{0.1}O_2): High energy density (~250–300 Wh/kg), ideal for long-range performance.\n  - LFP (Lithium Iron Phosphate, LiFePO_4): Exceptional thermal stability (runaway threshold > 270°C), cobalt-free, and long cycle life (> 3,000 cycles at 80% DoD).\n• Electrolyte & Separator: A non-aqueous organic carbonate liquid with dissolved LiPF_6 salt, paired with a microporous polyethylene/polypropylene separator (12–20 µm) that conducts Li⁺ ions while insulating electronic flow.',
            id: 'Sel sekunder litium-ion menyimpan energi potensial kimia melalui mekanisme interkalasi "kursi goyang" (rocking-chair) bolak-balik ion Li⁺ di antara dua kisi kristal inang:\n\n• Anoda (Elektroda Negatif saat pengosongan): Umumnya lembaran grafit sintetis (Li_x C_6) atau komposit karbon-silikon. Saat pengosongan (discharge), atom litium teroksidasi menjadi ion Li⁺ dan elektron.\n• Katoda (Elektroda Positif saat pengosongan): Matriks oksida atau fosfat logam transisi, terutama:\n  - NMC (Nikel-Mangan-Kobalt, misal LiNi_{0.8}Mn_{0.1}Co_{0.1}O_2): Densitas energi tinggi (~250–300 Wh/kg), ideal untuk jarak tempuh jauh.\n  - LFP (Litium Besi Fosfat, LiFePO_4): Stabilitas termal luar biasa (titik runaway > 270°C), bebas kobalt, dan usia siklus sangat panjang (> 3.000 siklus pada 80% DoD).\n• Elektrolit & Separator: Cairan karbonat organik non-akuatik dengan garam LiPF_6 terlarut, dipadukan dengan separator mikropori polietilen/polipropilen (12–20 µm) yang menghantarkan ion Li⁺ namun menyekat aliran elektron.',
          },
          formula: '\\text{Discharge: } \\text{Li}_x\\text{C}_6 \\longrightarrow \\text{C}_6 + x\\text{Li}^+ + x\\text{e}^- \\quad | \\quad \\text{Li}_{1-x}\\text{MO}_2 + x\\text{Li}^+ + x\\text{e}^- \\longrightarrow \\text{LiMO}_2',
          formulaExplanation: {
            en: 'Half-cell electrochemical redox reactions occurring simultaneously at the anode and cathode during discharge.',
            id: 'Reaksi redoks elektrokimia setengah sel yang terjadi secara simultan pada anoda dan katoda saat pengosongan daya.',
          },
          keyTakeaways: {
            en: [
              'Solid Electrolyte Interphase (SEI) passivates the graphite anode on the initial formation cycle, critical for long-term cycling.',
              'Solid-state batteries replace flammable liquid electrolytes with solid ceramics/sulfides, eliminating dendritic short-circuit risks.',
              'Cell open-circuit voltage (OCV) is dictated by the chemical potential difference between anode and cathode via the Nernst relationship.',
            ],
            id: [
              'Lapisan Solid Electrolyte Interphase (SEI) mempasivasi anoda grafit pada siklus formasi awal, sangat penting untuk ketahanan siklus jangka panjang.',
              'Baterai solid-state menggantikan cairan elektrolit yang mudah terbakar dengan keramik/sulfida padat, mengeliminasi risiko korsleting dendrit.',
              'Tegangan rangkaian terbuka sel (OCV) ditentukan oleh selisih potensial kimiawi antara anoda dan katoda melalui persamaan Nernst.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q1-1',
          question: {
            en: 'What is the key advantage of Lithium Iron Phosphate (LFP) chemistry compared to Nickel-Manganese-Cobalt (NMC)?',
            id: 'Apa keunggulan utama dari kimia baterai Litium Besi Fosfat (LFP) dibandingkan dengan Nikel-Mangan-Kobalt (NMC)?',
          },
          options: {
            en: [
              'Significantly superior thermal stability and higher cycle life at lower raw material cost',
              'Much higher volumetric energy density (> 400 Wh/kg)',
              'Extremely fast charging below -30°C without preconditioning',
              'Zero internal electrical resistance',
            ],
            id: [
              'Stabilitas termal yang jauh lebih unggul dan usia siklus lebih panjang dengan biaya material lebih terjangkau',
              'Densitas energi volumetrik yang jauh lebih tinggi (> 400 Wh/kg)',
              'Pengisian daya sangat cepat di bawah suhu -30°C tanpa pemanasan awal',
              'Resistansi listrik internal bernilai nol mutlak',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'LFP olivine structure features exceptionally strong P-O covalent bonds that resist oxygen release during thermal stress, preventing thermal runaway up to ~270°C.',
            id: 'Struktur olivin LFP memiliki ikatan kovalen P-O yang sangat kuat sehingga tahan terhadap pelepasan gas oksigen saat suhu tinggi, mencegah thermal runaway hingga suhu ~270°C.',
          },
        },
      ],
    },
    {
      id: 'bat-mod-2',
      topicId: 'ev-battery',
      order: 2,
      title: {
        en: 'Battery Pack Architecture, Cell Formats & Thermal Management',
        id: 'Arsitektur Baterai Pack, Format Sel & Manajemen Termal',
      },
      shortDescription: {
        en: 'From 4680 tabless cylindrical, prismatic, and pouch cells to active liquid cooling serpentines and BMS balancing.',
        id: 'Dari sel silinder 4680 tanpa-tab, prismatik, dan pouch hingga pendingin cairan aktif dan penyeimbangan BMS.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'cell-cross-section',
      sections: [
        {
          id: 'bat-2-sec-1',
          title: {
            en: '1. Cell Form Factors (4680 Cylindrical vs Prismatic vs Pouch)',
            id: '1. Format Bentuk Sel (Silinder 4680 vs Prismatik vs Pouch)',
          },
          content: {
            en: 'EV battery packs aggregate hundreds to thousands of individual cells in series (S) for voltage and parallel (P) for capacity:\n\n1. 4680 Cylindrical Cells (46 mm diameter x 80 mm height): Feature a "tabless" shingled electrode design that reduces electron travel distance from 1000 mm to just 50 mm, dropping internal electrical resistance (ESR) by 5-10x and dramatically curbing ohmic I²R heating during high-power supercharging.\n2. Prismatic Aluminum Cans: High volumetric packaging efficiency, ideal for Cell-to-Pack (CTP) structural architectures that eliminate intermediate modules.\n3. Pouch Cells: Lightweight polymer laminate enclosures with excellent packing density, but require external mechanical compression to prevent delamination during expansion.\n\nThermal Management: Active glycol-water cooling plates or serpentine ribbon extrusions maintain cell temperatures within the optimal 20°C–35°C window, preventing lithium plating at low temperatures and accelerated degradation at high temperatures.',
            id: 'Paket baterai EV menggabungkan ratusan hingga ribuan sel individual dalam rangkaian seri (S) untuk menaikkan tegangan dan paralel (P) untuk menambah kapasitas:\n\n1. Sel Silinder 4680 (diameter 46 mm x tinggi 80 mm): Memiliki desain elektroda "tabless" (tanpa tab konvensional) yang memangkas jarak tempuh elektron dari 1000 mm menjadi hanya 50 mm, menurunkan resistansi internal (ESR) sebesar 5-10 kali lipat dan mengurangi panas resistif I²R secara drastis saat pengisian super cepat.\n2. Sel Prismatik (Kaleng Aluminium): Efisiensi pengemasan volumetrik tinggi, sangat cocok untuk arsitektur Cell-to-Pack (CTP) yang meniadakan modul perantara.\n3. Sel Pouch: Wadah laminasi polimer ringan dengan densitas pengepakan tinggi, namun memerlukan kompresi mekanis eksternal untuk mencegah delaminasi saat elektroda memuai.\n\nManajemen Termal: Pelat pendingin aktif atau pipa bergelombang cairan glikol-air menjaga suhu sel tetap dalam rentang optimal 20°C–35°C, mencegah pengendapan litium (plating) pada suhu dingin dan degradasi kimia pada suhu panas.',
          },
          formula: '\\dot{Q}_{gen} = I^2 R_{int} + I T \\frac{\\partial U_{OCV}}{\\partial T}',
          formulaExplanation: {
            en: 'Bernardi equation for cell heat generation rate, consisting of irreversible Joule heating (I² R_int) and reversible entropic reaction heating.',
            id: 'Persamaan Bernardi untuk laju pembangkitan panas sel baterai, terdiri dari pemanasan Joule ireversibel (I² R_int) dan pemanasan reaksi entropik reversibel.',
          },
          keyTakeaways: {
            en: [
              'Tabless cylindrical architecture reduces internal thermal gradient, enabling faster 250 kW+ fast charging without localized hot spots.',
              'The Battery Management System (BMS) actively monitors individual cell voltages, temperatures, State of Charge (SoC), and State of Health (SoH).',
              'Thermal runaway propagation is blocked through aerogel thermal barriers, phase-change materials, and directional blast valves.',
            ],
            id: [
              'Arsitektur tabless mengurangi gradien termal internal, memungkinkan pengisian daya cepat 250 kW+ tanpa titik panas lokal (hot spots).',
              'Sistem Manajemen Baterai (BMS) memantau tegangan sel, suhu, State of Charge (SoC), dan State of Health (SoH) secara real-time.',
              'Penyebaran thermal runaway dicegah menggunakan lapisan isolasi aerogel, material pengubah fase (PCM), dan katup pelepas tekanan terarah.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q2-1',
          question: {
            en: 'Why does the "tabless" design in 4680 cylindrical battery cells allow much higher charging currents without overheating?',
            id: 'Mengapa desain "tabless" pada sel silinder 4680 memungkinkan arus pengisian daya yang jauh lebih tinggi tanpa panas berlebih?',
          },
          options: {
            en: [
              'It drastically shortens the electron electrical path length, reducing internal resistance and Joule (I²R) heating',
              'It replaces lithium with liquid hydrogen',
              'It operates without any cathode material',
              'It uses freezing cold nitrogen gas inside the can',
            ],
            id: [
              'Secara drastis memperpendek jalur tempuh elektron konduksi, menurunkan resistansi internal dan pemanasan Joule (I²R)',
              'Menggantikan litium dengan hidrogen cair',
              'Bekerja tanpa menggunakan material katoda',
              'Menggunakan gas nitrogen beku di dalam sel',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In conventional cells, current travels along the entire length of the wound jellyroll foil strip. The tabless design conducts current continuously along the edge, shortening the path from ~1 m to ~50 mm.',
            id: 'Pada sel konvensional, arus listrik harus menempuh seluruh panjang gulungan foil elektroda. Desain tabless menghantarkan arus di sepanjang tepi gulungan secara paralel, memperpendek jarak dari ~1 m menjadi hanya ~50 mm.',
          },
        },
      ],
    },
    {
      id: 'bat-mod-3',
      topicId: 'ev-battery',
      order: 3,
      title: {
        en: 'SiC Inverters, PMSM Motors & Regenerative Braking',
        id: 'Inverter SiC, Motor PMSM & Pengereman Regeneratif',
      },
      shortDescription: {
        en: 'Silicon Carbide wide-bandgap semiconductors, permanent magnet synchronous motors, and kinetic energy recovery.',
        id: 'Semikonduktor pita celah lebar Silikon Karbida (SiC), motor sinkron magnet permanen, dan pemulihan energi kinetik.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'ev-powertrain',
      sections: [
        {
          id: 'bat-3-sec-1',
          title: {
            en: '1. Inverter Efficiency & Silicon Carbide (SiC) MOSFETs',
            id: '1. Efisiensi Inverter & MOSFET Silikon Karbida (SiC)',
          },
          content: {
            en: 'The traction inverter converts DC battery pack energy (400V or 800V) into variable-frequency, variable-amplitude 3-phase AC power for the traction motor using Pulse Width Modulation (PWM):\n\n• Silicon Carbide (SiC) vs Silicon IGBT: SiC wide-bandgap (3.2 eV) semiconductors exhibit 10x higher breakdown field strength, enabling switching frequencies above 20–40 kHz with ultra-low switching losses. This yields inverter efficiencies exceeding 98.5% and extends driving range by 5–10% under urban stop-and-go cycles.\n• Permanent Magnet Synchronous Motors (PMSM): Utilize high-coercivity Neodymium-Iron-Boron (NdFeB) magnets embedded in the rotor (IPMSM) to deliver peak efficiency > 96% and instantaneous high torque.\n• Regenerative Braking: During deceleration, the PMSM operates as an alternator, converting vehicle kinetic energy back into electrical current fed into the battery pack, recovering up to 60–85% of braking energy.',
            id: 'Inverter traksi mengubah energi DC paket baterai (400V atau 800V) menjadi daya AC 3-fase dengan frekuensi dan amplitudo variabel untuk menggerakkan motor menggunakan Pulse Width Modulation (PWM):\n\n• Silikon Karbida (SiC) vs IGBT Silikon Konvensional: Semikonduktor wide-bandgap SiC (3.2 eV) memiliki kekuatan medan tembus 10x lebih tinggi, memungkinkan frekuensi pensaklaran di atas 20–40 kHz dengan rugi daya switching sangat rendah. Hal ini menghasilkan efisiensi inverter melampaui 98.5% dan menambah jarak tempuh 5–10% pada rute perkotaan.\n• Motor Sinkron Magnet Permanen (PMSM): Memanfaatkan magnet Neodimium-Besi-Boron (NdFeB) tertanam di dalam rotor (IPMSM) untuk memberikan efisiensi puncak > 96% dan torsi instan.\n• Pengereman Regeneratif (Regen): Saat deselerasi, motor PMSM beralih fungsi menjadi generator listrik, mengubah energi kinetik mobil kembali menjadi arus listrik yang mengisi baterai, memulihkan 60–85% energi pengereman.',
          },
          formula: 'P_{regen} = \\eta_{motor} \\cdot \\eta_{inv} \\cdot (m \\cdot a_{brake} \\cdot v - F_{drag} \\cdot v)',
          formulaExplanation: {
            en: 'Regenerative electrical power captured during vehicle braking, where η represents motor and inverter conversion efficiencies.',
            id: 'Daya listrik regeneratif yang ditangkap saat pengereman kendaraan, di mana η menyatakan efisiensi konversi motor dan inverter.',
          },
          keyTakeaways: {
            en: [
              '800V high-voltage architectures halve electrical current for identical power (P = V · I), reducing I²R copper cable losses by 75%.',
              'Regenerative braking dramatically reduces mechanical friction brake pad wear and brake dust emissions.',
              'Field-Oriented Control (FOC) algorithms optimize d-axis and q-axis stator currents for maximum torque per ampere (MTPA).',
            ],
            id: [
              'Arsitektur tegangan tinggi 800V membagi dua arus listrik untuk daya yang sama (P = V · I), memangkas rugi tembus tembaga I²R sebesar 75%.',
              'Pengereman regeneratif sangat mengurangi keausan kampas rem mekanis dan emisi partikel debu rem.',
              'Algoritma Field-Oriented Control (FOC) mengoptimalkan arus stator sumbu-d dan sumbu-q untuk torsi maksimum per ampere (MTPA).',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q3-1',
          question: {
            en: 'Why do modern 800V EV architectures produce significantly lower thermal resistive losses than 400V systems for the same power output?',
            id: 'Mengapa arsitektur EV 800V modern menghasilkan rugi resistif panas yang jauh lebih rendah daripada sistem 400V untuk daya keluaran yang sama?',
          },
          options: {
            en: [
              'Because doubling voltage halves the current (I = P/V), reducing ohmic heat losses (I²R) by 75%',
              'Because 800V uses superconducting copper wire that operates at room temperature',
              'Because the motor does not need magnetic fields at 800V',
              'Because 800V batteries do not produce any chemical heat',
            ],
            id: [
              'Karena menggandakan tegangan akan memotong separuh arus listrik (I = P/V), sehingga rugi panas ohmic (I²R) berkurang sebesar 75%',
              'Karena 800V menggunakan kabel superkonduktor suhu ruangan',
              'Karena motor tidak memerlukan medan magnet pada 800V',
              'Karena baterai 800V tidak menghasilkan panas kimia',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Joule heating is proportional to current squared (I²R). Operating at 800V halves the current for the same power throughput, reducing resistive cable and busbar losses by a factor of 4.',
            id: 'Pemanasan Joule sebanding dengan kuadrat arus listrik (I²R). Beroperasi pada 800V memotong separuh arus pada daya yang sama, mengurangi rugi resistif kabel dan busbar hingga 4 kali lipat (75%).',
          },
        },
      ],
    },
    {
      id: 'bat-mod-4',
      topicId: 'ev-battery',
      order: 4,
      title: {
        en: 'Vehicle Dynamics, Aerodynamics & Full Powertrain Simulation',
        id: 'Dinamika Kendaraan, Aerodinamika & Simulasi Powertrain Lengkap',
      },
      shortDescription: {
        en: 'Simulate aerodynamic drag, rolling resistance, hill gradient forces, HVAC electrical draw, and real-time range.',
        id: 'Simulasikan hambatan aerodinamis, gesekan ban, gaya gravitasi tanjakan, beban daya AC/HVAC, dan estimasi jarak tempuh.',
      },
      durationMinutes: 25,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'ev-powertrain',
      sections: [
        {
          id: 'bat-4-sec-1',
          title: {
            en: '1. Tractive Forces and Road Load Equation',
            id: '1. Gaya Traksi dan Persamaan Beban Jalan Kendaraan',
          },
          content: {
            en: 'The total tractive mechanical force F_{total} required to propel an electric vehicle at velocity v is governed by three primary physical resistance components:\n\n1. Aerodynamic Drag Force: F_{aero} = 0.5 · ρ · C_d · A · v² (proportional to velocity squared; dominates at highway speeds > 80 km/h).\n2. Rolling Resistance: F_{roll} = C_{rr} · m · g · cos(θ) (tire hysteretic deformation).\n3. Gradient Force: F_{grade} = m · g · sin(θ) (gravitational load when climbing or descending hills).\n\nTotal electrical power drawn from the battery is:\nP_{elec} = (F_{total} · v) / (η_{trans} · η_{motor} · η_{inv}) + P_{HVAC} + P_{aux}\n\nCold ambient temperatures (-10°C) increase air density ρ, elevate tire rolling resistance, increase internal cell resistance R_{int}, and require 2–4 kW of PTC/heat-pump cabin heating, causing a noticeable reduction in winter range.',
            id: 'Total gaya mekanik traksi F_{total} yang dibutuhkan untuk menggerakkan mobil listrik pada kecepatan v ditentukan oleh tiga komponen resistansi fisik utama:\n\n1. Gaya Hambat Aerodinamis: F_{aero} = 0.5 · ρ · C_d · A · v² (sebanding dengan kuadrat kecepatan; sangat mendominasi pada kecepatan jalan tol > 80 km/jam).\n2. Hambatan Gelinding Ban (Rolling Resistance): F_{roll} = C_{rr} · m · g · cos(θ) (histeresis deformasi ban).\n3. Gaya Kemiringan Tanjakan: F_{grade} = m · g · sin(θ) (beban gravitasi saat menanjak atau menurun).\n\nTotal daya listrik yang ditarik dari paket baterai adalah:\nP_{elec} = (F_{total} · v) / (η_{trans} · η_{motor} · η_{inv}) + P_{HVAC} + P_{aux}\n\nSuhu lingkungan dingin (-10°C) meningkatkan kerapatan udara ρ, menaikkan hambatan gesek ban, meningkatkan resistansi internal baterai R_{int}, dan memerlukan 2–4 kW daya pompa kalor (heat-pump) kabin, mengurangi jarak tempuh musim dingin.',
          },
          formula: 'F_{total} = \\frac{1}{2} \\rho C_d A v^2 + C_{rr} m g \\cos(\\theta) + m g \\sin(\\theta) + m a',
          formulaExplanation: {
            en: 'Complete longitudinal vehicle dynamics equation for tractive effort at velocity v and acceleration a.',
            id: 'Persamaan lengkap dinamika longitudinal kendaraan untuk gaya traksi pada kecepatan v dan percepatan a.',
          },
          keyTakeaways: {
            en: [
              'Because aerodynamic drag scales with velocity squared, cruising at 130 km/h consumes ~40% more energy per km than cruising at 100 km/h.',
              'Heat-pump thermal systems with multi-port octovalves harvest waste heat from battery and inverter, slashing HVAC consumption by up to 60%.',
              'Energy efficiency is measured in Wh/km or kWh/100km (lower is more efficient).',
            ],
            id: [
              'Karena hambatan aerodinamis berskala kuadratik terhadap kecepatan, berkendara pada 130 km/jam menghabiskan energi ~40% lebih banyak per km daripada 100 km/jam.',
              'Sistem pompa kalor terintegrasi dengan katup multi-arah (octovalve) memanfaatkan panas buang baterai dan inverter, memangkas konsumsi daya AC hingga 60%.',
              'Efisiensi konsumsi energi diukur dalam satuan Wh/km atau kWh/100km (semakin kecil angka Wh/km, semakin hemat energi).',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q4-1',
          question: {
            en: 'If vehicle speed is increased from 60 km/h to 120 km/h (doubled), by what factor does the aerodynamic power requirement (P_aero = F_aero * v) increase?',
            id: 'Jika kecepatan kendaraan dinaikkan dari 60 km/jam menjadi 120 km/jam (dua kali lipat), berapa faktor kenaikan kebutuhan daya aerodinamis (P_aero = F_aero * v)?',
          },
          options: {
            en: ['8 times (2³ = 8, cubic increase in power)', '2 times (linear)', '4 times (quadratic)', '16 times'],
            id: ['8 kali lipat (2³ = 8, kenaikan kubik pada daya)', '2 kali lipat (linier)', '4 kali lipat (kuadrat)', '16 kali lipat'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'While aerodynamic drag force F_aero is proportional to v², power is force times velocity: P_aero = F_aero · v ∝ v³. Doubling speed increases aerodynamic power consumption by 2³ = 8x.',
            id: 'Gaya hambat aerodinamis F_aero sebanding dengan v², sedangkan daya adalah gaya dikalikan kecepatan: P_aero = F_aero · v ∝ v³. Menggandakan kecepatan menaikkan kebutuhan daya aerodinamis sebesar 2³ = 8 kali lipat.',
          },
        },
      ],
    },
  ],
};
