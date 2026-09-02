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
    en: 'Master the engineering driving electric mobility. Explore lithium-ion intercalation physics in NMC and LFP cells, inspect thermal cooling ribbons inside 4680 battery packs, analyze SiC inverter and PMSM electric motor efficiency maps, and simulate vehicle range and power flow under dynamic road gradients, speed profiles, and ambient temperatures in 3D.',
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
            en: '1. The Intercalation Mechanism and Cathode Crystal Physics',
            id: '1. Mekanisme Interkalasi & Fisika Kristal Katoda',
          },
          content: {
            en: 'A lithium-ion secondary electrochemical cell stores chemical free energy via reversible "rocking-chair" intercalation of Li⁺ cations between two host crystalline lattices without destroying the host matrix:\n\n• Anode (Negative Electrode during discharge): Typically synthetic graphite sheets (Li_x C_6) with theoretical capacity 372 mAh/g, or silicon-doped graphite (up to ~4200 mAh/g for pure Si, though limited by 300% volume expansion). During discharge, lithium atoms oxidize into Li⁺ ions and release electrons into the external circuit.\n• Cathode (Positive Electrode during discharge): Transition metal oxide or polyanionic phosphate matrix:\n  - NMC (Nickel-Manganese-Cobalt, e.g. LiNi_{0.8}Mn_{0.1}Co_{0.1}O_2): Layered crystal structure offering high specific energy density (~250–300 Wh/kg), ideal for high-performance long-range EVs.\n  - LFP (Lithium Iron Phosphate, LiFePO_4): Olivine crystalline structure with strong P–O tetrahedral covalent bonds offering exceptional thermal stability (runaway threshold > 270°C), cobalt-free ethics, and superior cycle life (> 3,500 cycles at 80% Depth of Discharge).\n• Electrolyte & Separator: Non-aqueous alkyl carbonates (EC/DMC/EMC) with 1.0 M LiPF_6 salt, paired with a 12–16 µm microporous polyethylene/polypropylene separator coated with ceramic Al_2O_3.',
            id: 'Sel elektrokimia sekunder litium-ion menyimpan energi bebas kimia melalui interkalasi "kursi goyang" bolak-balik kation Li⁺ di antara dua kisi kristal inang tanpa merusak matriks struktur:\n\n• Anoda (Elektroda Negatif saat pengosongan): Umumnya lembaran grafit sintetis (Li_x C_6) dengan kapasitas teoretis 372 mAh/g, atau komposit karbon-silikon. Saat discharge, atom litium teroksidasi menjadi ion Li⁺ dan melepaskan elektron ke sirkuit eksternal.\n• Katoda (Elektroda Positif saat pengosongan): Matriks oksida logam transisi atau polianionik fosfat:\n  - NMC (Nikel-Mangan-Kobalt, misal LiNi_{0.8}Mn_{0.1}Co_{0.1}O_2): Struktur kristal berlapis dengan densitas energi spesifik tinggi (~250–300 Wh/kg), sangat ideal untuk EV performa tinggi dan jarak tempuh jauh.\n  - LFP (Litium Besi Fosfat, LiFePO_4): Struktur kristal olivin dengan ikatan kovalen tetrahedral P–O yang sangat kokoh, memberikan stabilitas termal luar biasa (titik runaway > 270°C), bebas kobalt, dan usia siklus sangat panjang (> 3.500 siklus pada 80% DoD).\n• Elektrolit & Separator: Pelarut karbonat organik (EC/DMC/EMC) dengan garam 1.0 M LiPF_6, dipadukan dengan separator mikropori polietilen/polipropilen 12–16 µm berlapis keramik Al_2O_3.',
          },
          formula: '\\text{Anode: } \\text{Li}_x\\text{C}_6 \\rightleftharpoons \\text{C}_6 + x\\text{Li}^+ + x\\text{e}^- \\quad | \\quad \\text{Cathode: } \\text{Li}_{1-x}\\text{MO}_2 + x\\text{Li}^+ + x\\text{e}^- \\rightleftharpoons \\text{LiMO}_2',
          formulaExplanation: {
            en: 'Coupled reversible half-cell redox reactions. The potential difference between cathode and anode dictates the open-circuit cell voltage (3.2V for LFP, 3.7V nominal for NMC).',
            id: 'Reaksi redoks setengah sel bolak-balik berpasangan. Selisih potensial kimia antara katoda dan anoda menentukan tegangan rangkaian terbuka (3.2V untuk LFP, 3.7V nominal untuk NMC).',
          },
          comparisonTable: {
            headers: {
              en: ['Chemistry', 'Nominal Voltage', 'Gravimetric Density', 'Cycle Life (80% DoD)', 'Thermal Runaway Threshold'],
              id: ['Kimia Sel', 'Tegangan Nominal', 'Densitas Gravimetrik', 'Usia Siklus (80% DoD)', 'Titik Awal Thermal Runaway'],
            },
            rows: [
              {
                en: ['LFP (LiFePO₄)', '3.2 V', '140–180 Wh/kg', '> 3,500 cycles', '> 270 °C (Ultra-stable)'],
                id: ['LFP (LiFePO₄)', '3.2 V', '140–180 Wh/kg', '> 3.500 siklus', '> 270 °C (Sangat Stabil)'],
              },
              {
                en: ['NMC-811', '3.7 V', '250–300 Wh/kg', '1,500–2,000 cycles', '~210 °C (Requires active cooling)'],
                id: ['NMC-811', '3.7 V', '250–300 Wh/kg', '1.500–2.000 siklus', '~210 °C (Perlu pendinginan aktif)'],
              },
              {
                en: ['All-Solid-State (Li metal)', '3.8–4.0 V', '> 400 Wh/kg', '> 2,000 cycles', '> 350 °C (Non-flammable solid)'],
                id: ['Solid-State (Li metal)', '3.8–4.0 V', '> 400 Wh/kg', '> 2.000 siklus', '> 350 °C (Padat tak mudah terbakar)'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Solid Electrolyte Interphase (SEI) passivates the graphite anode on the initial formation cycle, preventing continuous solvent reduction.',
              'Solid-state batteries replace flammable organic liquid electrolytes with solid inorganic ceramics or sulfides (LLZO, LPSCl), enabling metallic lithium anodes.',
              'Cell capacity degrades primarily through active lithium inventory loss (LLI) and cathode structural micro-cracking.',
            ],
            id: [
              'Lapisan Solid Electrolyte Interphase (SEI) mempasivasi anoda grafit pada siklus awal untuk mencegah dekomposisi pelarut berkelanjutan.',
              'Baterai solid-state menggantikan cairan elektrolit organik dengan elektrolit keramik atau sulfida padat (LLZO, LPSCl), memungkinkan penggunaan anoda litium metalik.',
              'Penurunan kapasitas sel terutama diakibatkan oleh hilangnya cadangan ion litium aktif (LLI) dan retak mikro pada kisi kristal katoda.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q1-1',
          question: {
            en: 'What is the key chemical advantage of Lithium Iron Phosphate (LFP) chemistry compared to Nickel-Manganese-Cobalt (NMC)?',
            id: 'Apa keunggulan kimia utama dari baterai Litium Besi Fosfat (LFP) dibandingkan dengan Nikel-Mangan-Kobalt (NMC)?',
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
            en: '1. Tabless 4680 Cylindrical vs Prismatic vs Pouch Form Factors',
            id: '1. Format Sel Silinder 4680 Tanpa-Tab vs Prismatik vs Pouch',
          },
          content: {
            en: 'EV battery packs aggregate individual electrochemical cells in series (S) for target voltage (400V or 800V) and parallel (P) for current capacity:\n\n1. 4680 Cylindrical Cells (46 mm diameter × 80 mm height): Incorporates a "tabless" shingled spiral foil edge design. By replacing two small localized current tabs with continuous electrical contact along the entire electrode strip, the electron electrical path length is reduced from ~1,000 mm to just 50 mm. This lowers internal Equivalent Series Resistance (ESR) by 5–10× and curbs Joule heating ($I^2 R$) during 250 kW+ DC fast charging.\n2. Prismatic Aluminum Cans: Rigid rectangular form factor optimized for Cell-to-Pack (CTP) structural integration, eliminating intermediate module packaging mass.\n3. Pouch Cells: Lightweight polymer-laminated aluminum enclosures offering high packaging efficiency, requiring controlled spring compression to prevent internal delamination during cycling.',
            id: 'Paket baterai EV menggabungkan sel elektrokimia secara seri (S) untuk mencapai tegangan sistem (400V atau 800V) dan paralel (P) untuk memperbesar kapasitas arus:\n\n1. Sel Silinder 4680 (diameter 46 mm × tinggi 80 mm): Menggunakan arsitektur elektroda "tabless" bersirip kontinu. Menggantikan dua tab titik kecil konvensional dengan kontak listrik menyeluruh di sepanjang tepi foil memangkas jarak tempuh elektron dari ~1.000 mm menjadi hanya 50 mm. Hal ini menurunkan resistansi seri internal (ESR) sebesar 5–10 kali lipat dan menekan panas Joule ($I^2 R$) saat pengisian cepat 250 kW+.\n2. Sel Prismatik (Kaleng Aluminium): Bentuk balok kokoh yang optimal untuk arsitektur struktural Cell-to-Pack (CTP), meniadakan modul perantara.\n3. Sel Pouch: Wadah laminasi polimer-aluminium yang sangat ringan dengan efisiensi ruang tinggi, memerlukan kompresi mekanis pegas untuk mencegah pemisahan lapisan (delaminasi) saat siklus ekspansi.',
          },
          formula: '\\dot{Q}_{\\text{gen}} = I^2 R_{\\text{int}} + I T \\frac{\\partial U_{\\text{OCV}}}{\\partial T}',
          formulaExplanation: {
            en: 'Bernardi heat generation equation for electrochemical cells, summing irreversible Joule ohmic dissipation (I² R_int) and reversible entropic reaction heating (I T ∂U/∂T).',
            id: 'Persamaan pembangkitan panas Bernardi untuk sel elektrokimia, menggabungkan disipasi ohmik Joule ireversibel (I² R_int) dan pemanasan reaksi entropik reversibel (I T ∂U/∂T).',
          },
          caseStudy: {
            title: {
              en: 'Thermal Runaway Mitigation in Structural Battery Packs',
              id: 'Mitigasi Thermal Runaway pada Paket Baterai Struktural',
            },
            context: {
              en: 'When an internal short circuit occurs in an NMC cell, internal temperature can exceed 600°C within milliseconds, producing flammable venting gases.',
              id: 'Ketika terjadi korsleting internal pada sel NMC, suhu internal dapat melampaui 600°C dalam hitungan milidetik, menghasilkan pelepasan gas mudah terbakar.',
            },
            analysis: {
              en: 'Modern packs utilize bottom-venting burst discs, inter-cell aerogel insulation (thermal conductivity k < 0.02 W/m·K), and bottom cold plates to evacuate heat before adjacent cells reach their thermal trigger point.',
              id: 'Paket baterai modern menggunakan katup ventilasi bawah (bottom-venting), isolasi aerogel antar-sel (konduktivitas k < 0.02 W/m·K), dan pelat pendingin bawah untuk membuang panas sebelum sel tetangga mencapai titik pemicu thermal runaway.',
            },
            takeaway: {
              en: 'Cell-level tabless architecture combined with directional venting completely prevents pack-level cascading propagation.',
              id: 'Arsitektur tabless pada sel dipadukan dengan ventilasi terarah mencegah perambatan berantai pada tingkat paket baterai.',
            },
          },
          keyTakeaways: {
            en: [
              'Glycol-water active thermal cooling serpentines maintain battery cells within the optimal operating range of 20°C to 35°C.',
              'The Battery Management System (BMS) performs active/passive cell balancing to align individual State of Charge (SoC) percentages.',
              '800V architectures halve the current (I = P/V) for equivalent power, reducing charging cable heat losses by 75% ($I^2 R$).',
            ],
            id: [
              'Pipa bergelombang pendingin cairan glikol-air aktif menjaga sel baterai tetap dalam rentang suhu ideal 20°C hingga 35°C.',
              'Sistem Manajemen Baterai (BMS) melakukan penyeimbangan sel aktif/pasif untuk menyelaraskan persentase State of Charge (SoC) antar-sel.',
              'Arsitektur 800V memotong arus menjadi setengahnya (I = P/V) untuk daya yang sama, mengurangi kerugian panas kabel pengisian daya sebesar 75% ($I^2 R$).',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q2-1',
          question: {
            en: 'How does the "tabless" electrode design in 4680 cylindrical cells reduce internal heat generation during rapid DC fast charging?',
            id: 'Bagaimana desain elektroda "tabless" pada sel silinder 4680 mengurangi panas internal saat pengisian cepat DC?',
          },
          options: {
            en: [
              'By reducing the electron conduction distance from ~1000 mm to ~50 mm, dramatically lowering Equivalent Series Resistance (ESR)',
              'By eliminating the cathode entirely',
              'By increasing the cell voltage to 48 volts per cell',
              'By replacing graphite with copper sheets',
            ],
            id: [
              'Dengan memangkas jarak konduksi elektron dari ~1000 mm menjadi ~50 mm, menurunkan resistansi seri (ESR) secara drastis',
              'Dengan meniadakan elektroda katoda sama sekali',
              'Dengan menaikkan tegangan sel menjadi 48 volt per sel',
              'Dengan menggantikan grafit dengan lembaran tembaga murni',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Continuous electrical contact along the edge of the jellyroll shingle reduces electrical path length by 95%, lowering ohmic I²R heat generation significantly.',
            id: 'Kontak listrik kontinu di sepanjang tepi gulungan memangkas jarak tempuh arus listrik hingga 95%, menurunkan timbulan panas resistif I²R secara signifikan.',
          },
        },
      ],
    },
    {
      id: 'bat-mod-3',
      topicId: 'ev-battery',
      order: 3,
      title: {
        en: 'Silicon-Carbide (SiC) Inverters & PMSM Electric Motors',
        id: 'Inverter Silikon-Karbida (SiC) & Motor Listrik PMSM',
      },
      shortDescription: {
        en: 'Wide-bandgap semiconductor switching efficiency, field-oriented motor control, and regenerative braking recapture.',
        id: 'Efisiensi switching semikonduktor wide-bandgap, kontrol motor berorientasi medan, dan pengereman regeneratif.',
      },
      durationMinutes: 22,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'ev-powertrain',
      sections: [
        {
          id: 'bat-3-sec-1',
          title: {
            en: '1. Wide-Bandgap Silicon-Carbide (SiC) vs Traditional Silicon IGBTs',
            id: '1. Semikonduktor Wide-Bandgap Silikon-Karbida (SiC) vs IGBT Silikon',
          },
          content: {
            en: 'The traction inverter converts DC battery pack voltage into variable-frequency, variable-voltage three-phase alternating current (AC) to drive the electric traction motor:\n\n• Wide-Bandgap Advantages: Silicon Carbide (SiC) MOSFETs have a 3× wider bandgap (3.26 eV vs 1.12 eV for Si) and a 10× higher dielectric breakdown electric field ($E_c \\approx 3\\text{ MV/cm}$). This allows for thinner drift layers with much lower on-state resistance ($R_{DS(\\text{on})}$).\n• Switching Frequency: SiC operates at switching frequencies of 20–100 kHz (vs 5–10 kHz for Si IGBTs) with negligible reverse recovery charge ($Q_{rr} \\approx 0$), cutting inverter energy losses by 70% and elevating peak inverter efficiency to > 99%.\n• Motor Topologies:\n  - Permanent Magnet Synchronous Motor (PMSM): Employs Neodymium-Iron-Boron (NdFeB) rotor magnets, achieving high power density (> 4 kW/kg) and unmatched efficiency (> 97%) in urban driving cycles.\n  - AC Induction Motor (Asynchronous): Zero parasitic drag when unpowered, ideal for dual-motor all-wheel-drive secondary axles.',
            id: 'Inverter traksi mengubah tegangan searah (DC) dari paket baterai menjadi arus bolak-balik (AC) tiga fase dengan frekuensi dan tegangan variabel untuk menggerakkan motor listrik traksi:\n\n• Keunggulan Wide-Bandgap: MOSFET Silikon Karbida (SiC) memiliki bandgap 3× lebih lebar (3.26 eV vs 1.12 eV pada Si) dan medan tembus dielektrik 10× lebih tinggi ($E_c \\approx 3\\text{ MV/cm}$). Hal ini memungkinkan lapisan drift yang jauh lebih tipis dengan resistansi on-state ($R_{DS(\\text{on})}$) yang sangat rendah.\n• Frekuensi Switching: SiC beroperasi pada frekuensi switching 20–100 kHz (dibandingkan 5–10 kHz pada IGBT silikon konvensional) tanpa muatan reverse recovery ($Q_{rr} \\approx 0$), memangkas kerugian daya inverter hingga 70% dan meningkatkan efisiensi puncak inverter menjadi > 99%.\n• Topologi Motor Listrik:\n  - Permanent Magnet Synchronous Motor (PMSM): Menggunakan magnet rotor Neodymium (NdFeB), mencapai densitas daya tinggi (> 4 kW/kg) dan efisiensi luar biasa (> 97%) pada siklus perkotaan.\n  - Motor Induksi AC (Asinkron): Bebas kerugian gesekan magnetik saat tidak diberi arus, ideal untuk motor kedua pada sistem penggerak semua roda (AWD).',
          },
          formula: 'P_{\\text{loss, inv}} = I_{\\text{rms}}^2 R_{DS(\\text{on})} + f_{\\text{sw}} (E_{\\text{on}} + E_{\\text{off}})',
          formulaExplanation: {
            en: 'Total traction inverter power loss consisting of conduction losses (I² R_DS(on)) and frequency-dependent switching transition losses (f_sw (E_on + E_off)).',
            id: 'Total kerugian daya inverter traksi yang terdiri dari kerugian konduksi resistif (I² R_DS(on)) dan kerugian transisi pensaklaran (f_sw (E_on + E_off)).',
          },
          keyTakeaways: {
            en: [
              'SiC inverters extend real-world EV range by 5% to 10% under identical battery capacity.',
              'Field-Oriented Control (FOC) decouples motor stator currents into torque-producing (I_q) and rotor flux-producing (I_d) orthogonal vectors.',
              'Regenerative braking reverses current flow during deceleration, recapturing up to 70% of vehicle kinetic energy back into the battery pack.',
            ],
            id: [
              'Inverter SiC meningkatkan jarak tempuh nyata EV sebesar 5% hingga 10% pada kapasitas baterai yang sama.',
              'Field-Oriented Control (FOC) memisahkan arus stator menjadi vektor ortogonal penghasil torsi (I_q) dan fluks rotor (I_d).',
              'Pengereman regeneratif membalikkan arah aliran arus saat deselerasi, meregenerasi hingga 70% energi kinetik kendaraan kembali ke baterai.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q3-1',
          question: {
            en: 'Why do Silicon Carbide (SiC) MOSFETs achieve higher electrical efficiency than traditional Silicon (Si) IGBTs in EV traction inverters?',
            id: 'Mengapa MOSFET Silikon Karbida (SiC) mencapai efisiensi listrik yang lebih tinggi daripada IGBT Silikon (Si) konvensional pada inverter EV?',
          },
          options: {
            en: [
              'Much wider semiconductor bandgap and lower on-resistance, drastically slashing switching and conduction power losses',
              'SiC semiconductors do not require electrical current',
              'SiC operates at absolute zero temperature',
              'SiC converts heat directly back into battery electricity',
            ],
            id: [
              'Bandgap semikonduktor yang jauh lebih lebar dan resistansi on-state lebih rendah, memangkas kerugian daya pensaklaran dan konduksi',
              'Semikonduktor SiC tidak membutuhkan arus listrik',
              'SiC beroperasi pada suhu nol mutlak',
              'SiC mengubah panas secara langsung kembali menjadi listrik baterai',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'SiC\'s wider bandgap (3.26 eV) and high critical electric field reduce conduction resistance and enable ultra-fast switching transitions with near-zero switching losses.',
            id: 'Bandgap SiC yang lebar (3.26 eV) dan medan listrik kritis yang tinggi menurunkan resistansi konduksi serta memungkinkan pensaklaran ultra-cepat dengan kerugian transisi yang sangat minim.',
          },
        },
      ],
    },
    {
      id: 'bat-mod-4',
      topicId: 'ev-battery',
      order: 4,
      title: {
        en: 'Vehicle Dynamics, Aerodynamics & Range Thermodynamics',
        id: 'Dinamika Kendaraan, Aerodinamika & Termodinamika Jarak Tempuh',
      },
      shortDescription: {
        en: 'Tractive force modeling, rolling resistance, aerodynamic drag Cd·A, and HVAC cabin thermal loads.',
        id: 'Pemodelan gaya traksi, resistansi gelinding roda, hambatan aerodinamis Cd·A, dan beban termal kabin HVAC.',
      },
      durationMinutes: 24,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'ev-powertrain',
      sections: [
        {
          id: 'bat-4-sec-1',
          title: {
            en: '1. The Complete Vehicle Road-Load Tractive Force Equation',
            id: '1. Persamaan Lengkap Gaya Traksi Beban Jalan Kendaraan',
          },
          content: {
            en: 'The net mechanical tractive force $F_{\\text{trac}}$ required to propel an electric vehicle at velocity $v$ and acceleration $a$ balances four physical resist forces:\n\n$$F_{\\text{trac}} = F_{\\text{aero}} + F_{\\text{roll}} + F_{\\text{grade}} + F_{\\text{accel}}$$\n\n1. Aerodynamic Drag ($F_{\\text{aero}} = \\frac{1}{2} \\rho_{\\text{air}} C_d A v^2$): Scales with the square of velocity ($v^2$), and its required power scales with the cube ($v^3$). At highway speeds (> 100 km/h), aerodynamic drag accounts for > 65% of all energy consumption.\n2. Rolling Resistance ($F_{\\text{roll}} = C_{rr} m g \\cos\\theta$): Hysteresis energy loss in tire rubber deformation, roughly velocity-independent.\n3. Road Gradient ($F_{\\text{grade}} = m g \\sin\\theta$): Gravitational force component on slopes.\n4. Inertial Acceleration ($F_{\\text{accel}} = m_{\\text{eff}} \\frac{dv}{dt}$): Overcoming vehicle inertia including rotational drivetrain components.\n\nCabin HVAC Thermal Load: Cabin climate conditioning (heat pump heating/cooling) consumes 1–5 kW continuously, heavily modulating real-world battery range under extreme winter/summer weather.',
            id: 'Gaya traksi mekanis total $F_{\\text{trac}}$ yang diperlukan untuk menggerakkan kendaraan listrik pada kecepatan $v$ dan percepatan $a$ mengimbangi empat gaya perlawanan fisik:\n\n$$F_{\\text{trac}} = F_{\\text{aero}} + F_{\\text{roll}} + F_{\\text{grade}} + F_{\\text{accel}}$$\n\n1. Hambatan Aerodinamis ($F_{\\text{aero}} = \\frac{1}{2} \\rho_{\\text{air}} C_d A v^2$): Meningkat sebanding dengan kuadrat kecepatan ($v^2$), dan kebutuhan dayanya meningkat kubik ($v^3$). Pada kecepatan jalan tol (> 100 km/jam), hambatan udara menyerap > 65% dari seluruh konsumsi energi baterai.\n2. Resistansi Gelinding ($F_{\\text{roll}} = C_{rr} m g \\cos\\theta$): Kerugian energi histeresis deformasi ban karet terhadap aspal.\n3. Kemiringan Tanjakan ($F_{\\text{grade}} = m g \\sin\\theta$): Komponen gaya gravitasi pada jalan menanjak atau menurun.\n4. Percepatan Inersial ($F_{\\text{accel}} = m_{\\text{eff}} \\frac{dv}{dt}$): Gaya untuk mengatasi kelembaman massa kendaraan dan komponen berputar.\n\nBeban Termal Kabin HVAC: Pengondisian udara kabin (heat pump pemanas/pendingin) mengonsumsi daya 1–5 kW secara terus-menerus, memengaruhi jarak tempuh nyata pada musim dingin atau terik panas.',
          },
          formula: 'P_{\\text{batt}} = \\frac{v}{\\eta_{\\text{drivetrain}}} \\left( \\frac{1}{2} \\rho C_d A v^2 + C_{rr} m g \\cos\\theta + m g \\sin\\theta + m \\frac{dv}{dt} \\right) + P_{\\text{HVAC}}',
          formulaExplanation: {
            en: 'Total electrical power drawn from the battery pack factoring in aerodynamic drag, rolling resistance, road grade, inertial acceleration, drivetrain efficiency (η), and auxiliary cabin HVAC loads.',
            id: 'Total daya listrik yang ditarik dari paket baterai dengan memperhitungkan hambatan aerodinamis, resistansi gelinding ban, tanjakan, akselerasi, efisiensi transmisi (η), dan beban AC kabin.',
          },
          keyTakeaways: {
            en: [
              'Because aerodynamic power scales with v³, cruising at 120 km/h requires ~73% more power than cruising at 90 km/h.',
              'Aerodynamic optimization (low drag coefficient Cd < 0.22 and streamlined underbody) is the most cost-effective method to extend high-speed EV range.',
              'Vapor-injection heat pump systems achieve Coefficients of Performance (COP) > 2.5, consuming 60% less energy than resistive PTC heaters in cold weather.',
            ],
            id: [
              'Karena daya aerodinamis meningkat dengan v³, melaju pada kecepatan 120 km/jam membutuhkan daya ~73% lebih besar dibanding 90 km/jam.',
              'Optimalisasi aerodinamika (koefisien hambatan Cd < 0.22 dan lantai bawah rata) adalah cara paling hemat biaya untuk memperpanjang jarak tempuh EV.',
              'Sistem heat pump injeksi uap mencapai Koefisien Performa (COP) > 2.5, menghemat 60% energi dibandingkan pemanas resistif PTC di cuaca dingin.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bat-q4-1',
          question: {
            en: 'How does the power required to overcome aerodynamic drag scale with vehicle speed (v)?',
            id: 'Bagaimanakah hubungan kebutuhan daya untuk mengatasi hambatan aerodinamis terhadap kecepatan kendaraan (v)?',
          },
          options: {
            en: ['It scales with the cube of speed (P ∝ v³)', 'It scales linearly with speed (P ∝ v)', 'It is constant at all speeds', 'It scales inversely with speed (P ∝ 1/v)'],
            id: ['Meningkat sebanding dengan pangkat tiga kecepatan (P ∝ v³)', 'Meningkat secara linier dengan kecepatan (P ∝ v)', 'Konstan pada seluruh kecepatan', 'Berbanding terbalik dengan kecepatan (P ∝ 1/v)'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Aerodynamic force is proportional to v² (F_aero = 0.5 ρ Cd A v²). Since mechanical power is P = F × v, power scales with the cube of speed (P ∝ v³).',
            id: 'Gaya aerodinamis berbanding lurus dengan v² (F_aero = 0.5 ρ Cd A v²). Karena daya mekanis adalah P = F × v, maka kebutuhan daya meningkat sebanding dengan pangkat tiga kecepatan (P ∝ v³).',
          },
        },
      ],
    },
  ],
};
