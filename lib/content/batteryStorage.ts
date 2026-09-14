import { Topic } from '@/types/learning';

export const batteryStorageTopic: Topic = {
  id: 'battery-storage',
  title: {
    en: 'Battery Storage Technologies & Next-Generation Chemistries',
    id: 'Teknologi Penyimpanan Baterai & Kimia Generasi Masa Depan',
  },
  tagline: {
    en: 'Grid-scale BESS, Redox Flow Batteries, LCOS thermodynamics, and upcoming Sodium-ion, Solid-State, and Iron-Air systems.',
    id: 'BESS skala jaringan, Baterai Alir Redoks, keekonomian LCOS, serta sistem masa depan Natrium-ion, Solid-State, dan Besi-Udara.',
  },
  description: {
    en: 'Dive deep into the thermodynamic, electrochemical, and system-level architecture of stationary battery energy storage systems (BESS) and next-generation storage chemistries. Analyze utility-scale containerized BESS thermodynamics, power conversion systems (PCS), levelized cost of storage (LCOS), and long-duration vanadium redox flow batteries (VRFB). Explore upcoming breakthroughs transforming the grid and heavy transportation: earth-abundant Sodium-ion (Na-ion), dendrite-immune All-Solid-State Batteries (ASSB), high-energy Lithium-Sulfur (Li-S), and 100-hour multi-day reversible-rusting Iron-Air storage in interactive 3D.',
    id: 'Pelajari secara mendalam arsitektur termodinamika, elektrokimia, dan rekayasa sistem penyimpanan energi baterai (BESS) stasioner serta kimia baterai generasi masa depan. Analisis termodinamika kontainer BESS skala utilitas, sistem konversi daya (PCS), biaya penyimpanan tersamaratakan (LCOS), dan baterai alir redoks vanadium (VRFB) berdurasi panjang. Eksplorasi terobosan masa depan yang merevolusi jaringan listrik dan transportasi: Natrium-ion (Na-ion) berbiaya rendah, Baterai Solid-State (ASSB) kebal dendrit, Litium-Sulfur (Li-S) berdensitas tinggi, dan baterai Besi-Udara (Iron-Air) 100 jam berkarat bolak-balik dalam 3D interaktif.',
  },
  category: {
    en: 'Energy Storage & Grid Engineering',
    id: 'Penyimpanan Energi & Rekayasa Jaringan Listrik',
  },
  colorAccent: 'teal',
  badgeColor: 'from-teal-500 to-cyan-600',
  iconName: 'BatteryCharging',
  modules: [
    // -------------------------------------------------------------
    // PART 1: GRID-SCALE BESS ARCHITECTURE & ELECTRICAL INTEGRATION
    // -------------------------------------------------------------
    {
      id: 'bess-mod-1',
      topicId: 'battery-storage',
      order: 1,
      title: {
        en: 'Grid-Scale BESS Architecture & Electrical Integration',
        id: 'Arsitektur BESS Skala Jaringan & Integrasi Elektrikal',
      },
      shortDescription: {
        en: 'Utility-scale containerized storage, C&I topology, Power Conversion Systems (PCS), thermal balancing, and grid stabilization services.',
        id: 'Penyimpanan kontainer skala utilitas, topologi C&I, Sistem Konversi Daya (PCS), manajemen termal, dan layanan stabilisasi jaringan.',
      },
      durationMinutes: 20,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'battery-storage-lab',
      sections: [
        {
          id: 'bess-1-sec-1',
          title: {
            en: '1. Utility-Scale BESS Topologies and Grid-Support Services',
            id: '1. Topologi BESS Skala Utilitas & Layanan Pendukung Jaringan',
          },
          content: {
            en: 'Modern decarbonized power grids rely heavily on non-synchronous renewable generation (solar photovoltaic and wind turbines), which exhibit intermittency and zero intrinsic mechanical rotational inertia. Battery Energy Storage Systems (BESS) provide sub-second bi-directional power dispatch to maintain system stability, power quality, and economic dispatch:\n\n• Frequency Control Ancillary Services (FCAS / FCR): Inverters dynamically inject or absorb active power within 100–250 milliseconds in response to grid frequency deviations (dF/dt rate of change of frequency - RoCoF), arresting frequency nadirs before under-frequency load shedding (UFLS) triggers.\n• Peak Shaving and Energy Arbitrage: Storing low-cost surplus generation during midday solar peak irradiance and discharging during evening peak demand (the "duck curve" belly-to-neck transition).\n• Capacity Firming & Curtailment Mitigation: Smoothing abrupt renewable fluctuations caused by cloud transients or wind gusts, transforming variable generators into dispatchable utility assets.\n• Black Start and Synthetic Inertia: Grid-forming inverters (GFM) establish voltage and frequency reference frames autonomously without an external grid signal, synthesizing virtual inertia to stabilize weak grids.',
            id: 'Jaringan listrik modern terdekarbonisasi sangat bergantung pada pembangkit terbarukan non-sinkron (surya PV dan turbin angin) yang bersifat fluktuatif dan tidak memiliki inersia mekanis rotasional. Battery Energy Storage Systems (BESS) menghadirkan penyaluran daya dua arah berkecepatan sub-detik untuk menjaga kestabilan sistem, kualitas daya, dan keekonomian transmisi:\n\n• Layanan Pendukung Frekuensi (FCAS / FCR): Inverter secara dinamis menginjeksikan atau menyerap daya aktif dalam 100–250 milidetik saat frekuensi grid menyimpang (laju perubahan frekuensi RoCoF), mencegah pemadaman darurat (UFLS).\n• Peak Shaving & Arbitrase Energi: Menyimpan kelebihan daya berbiaya murah saat puncak radiasi surya siang hari dan menyalurkannya saat beban puncak petang hari (mengatasi fenomena "duck curve").\n• Capacity Firming & Mitigasi Curtailment: Meratakan lonjakan daya intermiten akibat pergerakan awan atau hembusan angin, mengubah pembangkit variabel menjadi aset utilitas yang dapat dijadwalkan.\n• Black Start & Inersia Sintetis: Inverter grid-forming (GFM) membentuk referensi tegangan dan frekuensi secara mandiri tanpa sinyal grid eksternal, mensintesis inersia virtual untuk menstabilkan jaringan listrik yang lemah.',
          },
          formula: '\\text{LCOS} = \\frac{\\text{CAPEX}_0 + \\sum_{t=1}^{N} \\frac{\\text{OPEX}_t + C_{\\text{charging},t} + C_{\\text{replace},t}}{(1 + r)^t} - \\frac{S_N}{(1+r)^N}}{\\sum_{t=1}^{N} \\frac{E_{\\text{discharge},t}}{(1 + r)^t}}',
          formulaExplanation: {
            en: 'Levelized Cost of Storage (LCOS) formulation. The numerator aggregates initial capital expenditure (CAPEX) plus discounted annual operating expenses, charging electricity costs, and mid-life augmentation, minus terminal salvage value (S_N). The denominator accumulates total discounted usable electrical energy delivered to the grid across asset lifetime N.',
            id: 'Formulasi Biaya Penyimpanan Tersamaratakan (LCOS). Pembilang menggabungkan belanja modal awal (CAPEX) ditambah biaya operasional tahunan yang didiskontokan, biaya listrik pengisian daya, dan augmentasi penggantian baterai, dikurangi nilai sisa akhir (S_N). Penyebut mengakumulasi total energi listrik netto yang dialirkan ke grid sepanjang umur aset N.',
          },
          variables: [
            {
              symbol: '\\text{LCOS}',
              name: { en: 'Levelized Cost of Storage', id: 'Biaya Penyimpanan Tersamaratakan' },
              unit: '$/MWh',
              description: {
                en: 'Total lifecycle cost per unit of cumulative delivered electricity.',
                id: 'Total biaya siklus hidup per unit listrik yang disalurkan ke sistem.',
              },
            },
            {
              symbol: '\\text{CAPEX}_0',
              name: { en: 'Overnight Capital Expenditure', id: 'Belanja Modal Awal' },
              unit: '$',
              description: {
                en: 'Initial cost of battery cells, racks, inverters, transformers, balance of plant (BOP), and civil works.',
                id: 'Biaya awal sel baterai, rak, inverter, trafo, balance of plant (BOP), dan konstruksi sipil.',
              },
            },
            {
              symbol: 'C_{\\text{charging},t}',
              name: { en: 'Annual Charging Electricity Cost', id: 'Biaya Listrik Pengisian Tahunan' },
              unit: '$/year',
              description: {
                en: 'Cost of input electrical energy divided by the system round-trip efficiency (RTE).',
                id: 'Biaya energi input dibagi efisiensi bolak-balik (RTE) sistem.',
              },
            },
            {
              symbol: 'r',
              name: { en: 'Discount Rate / WACC', id: 'Tingkat Diskonto / WACC' },
              unit: '%',
              description: {
                en: 'Weighted average cost of capital reflecting project financing risk.',
                id: 'Biaya modal rata-rata tertimbang yang mencerminkan risiko pembiayaan proyek.',
              },
            },
            {
              symbol: 'E_{\\text{discharge},t}',
              name: { en: 'Net Annual Discharged Energy', id: 'Energi Pengosongan Tahunan Netto' },
              unit: 'MWh/year',
              description: {
                en: 'Annual energy delivered accounting for calendar and cycle degradation.',
                id: 'Energi yang disalurkan tahunan dengan memperhitungkan degradasi kalender dan siklus.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Net Present Value of Lifecycle Storage Costs',
                id: 'Langkah 1: Nilai Sekarang Bersih Biaya Siklus Hidup'
              },
              math: '\\text{NPV}_{\\text{cost}} = \\text{CAPEX}_0 + \\sum_{t=1}^{N} \\frac{\\text{OPEX}_t + \\frac{P_{\\text{elec},t} \\cdot E_{\\text{discharge},t}}{\\eta_{\\text{RTE}}} + C_{\\text{aug},t}}{(1 + r)^t} - \\frac{S_N}{(1+r)^N}',
              explanation: {
                en: 'Charging cost directly incorporates system Round-Trip Efficiency (η_RTE). If RTE is 85%, 1.176 MWh must be purchased to deliver 1.0 MWh of revenue energy.',
                id: 'Biaya pengisian memasukkan langsung Efisiensi Bolak-Balik (η_RTE). Jika RTE 85%, dibutuhkan pembelian 1,176 MWh untuk menyalurkan 1,0 MWh energi komersial.',
              },
            },
            {
              title: {
                en: 'Step 2: Discounted Cumulative Usable Energy Generation',
                id: 'Langkah 2: Akumulasi Energi Tersalurkan Terdiskon'
              },
              math: 'E_{\\text{discounted}} = \\sum_{t=1}^{N} \\frac{E_0 \\cdot \\text{DoD} \\cdot \\text{Cycles}_t \\cdot \\text{SoH}(t)}{(1 + r)^t}',
              explanation: {
                en: 'Delivered energy degrades each year based on State of Health (SoH), cycling depth of discharge (DoD), and nominal capacity E_0.',
                id: 'Energi tersalurkan menyusut setiap tahun bergantung pada State of Health (SoH), kedalaman pengosongan (DoD), dan kapasitas nominal E_0.',
              },
            },
            {
              title: {
                en: 'Step 3: LCOS Equilibrium Formulation',
                id: 'Langkah 3: Formulasi Keseimbangan LCOS'
              },
              math: '\\text{LCOS} = \\frac{\\text{NPV}_{\\text{cost}}}{E_{\\text{discounted}}}',
              explanation: {
                en: 'Equates the minimum levelized revenue per MWh required over lifetime N to achieve an NPV of zero.',
                id: 'Menghitung pendapatan minimum tersamaratakan per MWh yang dibutuhkan selama umur proyek N agar NPV bernilai nol.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['BESS Service Mode', 'Response Time', 'Typical Duration', 'Cycling Frequency', 'Primary Revenue Stream'],
              id: ['Mode Layanan BESS', 'Waktu Respons', 'Durasi Khas', 'Frekuensi Siklus', 'Sumber Pendapatan Utama'],
            },
            rows: [
              {
                en: ['Frequency Response (FCR/FFR)', '< 500 ms', '15 min – 1 hour', 'Dynamic micro-cycles (Continuous)', 'Capacity readiness payments'],
                id: ['Respons Frekuensi (FCR/FFR)', '< 500 ms', '15 mnt – 1 jam', 'Mikro-siklus dinamis (Kontinu)', 'Pembayaran kesiapan kapasitas'],
              },
              {
                en: ['Renewable Peak Shaving', '1 – 5 minutes', '2 – 4 hours', '1 – 2 full cycles / day', 'Peak demand charge avoidance'],
                id: ['Peak Shaving Terbarukan', '1 – 5 menit', '2 – 4 jam', '1 – 2 siklus penuh / hari', 'Pengurangan tarif beban puncak'],
              },
              {
                en: ['Wholesale Energy Arbitrage', 'Minutes', '4 – 8 hours', '1 – 2 full cycles / day', 'Day-ahead & real-time price spread'],
                id: ['Arbitrase Energi Grosir', 'Menit', '4 – 8 jam', '1 – 2 siklus penuh / hari', 'Selisih harga pasar listrik'],
              },
              {
                en: ['Black Start Grid Restoration', '< 1 second', '2 – 6 hours', 'Infrequent (Emergency contingency)', 'Grid security availability tariff'],
                id: ['Pemulihan Black Start', '< 1 detik', '2 – 6 jam', 'Jarang (Darurat kontinjensi)', 'Tarif ketersediaan ketahanan grid'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'Hornsdale Power Reserve (Tesla Big Battery) FCAS Contingency Response',
              id: 'Respon Kontinjensi FCAS Hornsdale Power Reserve di Australia Selatan',
            },
            context: {
              en: 'In South Australia, the tripping of a 560 MW coal-fired unit caused grid frequency to plunge towards 49.5 Hz at a critical RoCoF of 0.35 Hz/s, threatening a statewide cascading blackout.',
              id: 'Di Australia Selatan, pemadaman mendadak unit PLTU batubara 560 MW menyebabkan frekuensi jaringan merosot ke 49,5 Hz dengan RoCoF kritis 0,35 Hz/s yang mengancam pemadaman total.',
            },
            analysis: {
              en: 'The 150 MW / 193.5 MWh lithium iron phosphate and NMC BESS injected 100 MW of active power into the National Electricity Market within 140 milliseconds—over 10 times faster than conventional fossil spinning reserve turbines.',
              id: 'BESS 150 MW / 193,5 MWh menginjeksikan 100 MW daya aktif ke dalam jaringan transmisi hanya dalam waktu 140 milidetik—lebih dari 10 kali lebih cepat daripada turbin gas cadangan putar konvensional.',
            },
            takeaway: {
              en: 'Fast frequency response from inverter-based BESS prevented under-frequency load shedding, stabilized the islanded grid within 4 seconds, and cut frequency regulation market costs by over 90%.',
              id: 'Respons frekuensi cepat dari inverter BESS mencegah pelepasan beban darurat, menstabilkan frekuensi dalam 4 detik, dan memangkas biaya regulasi pasar frekuensi lebih dari 90%.',
            },
          },
          keyTakeaways: {
            en: [
              'Containerized utility BESS integrates battery racks, liquid thermal management plates, bidirectional PCS inverters, and medium-voltage step-up transformers into a 20ft/40ft footprint.',
              'Levelized Cost of Storage (LCOS) is critically governed by round-trip efficiency (RTE), cycle life degradation, and upfront turnkey CAPEX.',
              'Grid-forming (GFM) inverters enable virtual synchronous machine emulation, offering black-start restoration and synthetic inertia to renewable-dominant grids.',
            ],
            id: [
              'BESS kontainer skala utilitas menyatukan rak baterai, pelat pendingin cair, inverter PCS dua arah, dan transformator penaik tegangan menengah dalam kontainer 20ft/40ft.',
              'Levelized Cost of Storage (LCOS) sangat ditentukan oleh efisiensi bolak-balik (RTE), degradasi usia siklus, dan modal CAPEX awal.',
              'Inverter Grid-forming (GFM) memungkinkan emulasi mesin sinkron virtual, menghadirkan pemulihan black-start dan inersia sintetis pada jaringan bersumber terbarukan.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bess-q1-1',
          question: {
            en: 'Why is Round-Trip Efficiency (RTE) one of the primary drivers of Levelized Cost of Storage (LCOS)?',
            id: 'Mengapa Efisiensi Bolak-Balik (RTE) merupakan salah satu faktor penentu utama Biaya Penyimpanan Tersamaratakan (LCOS)?',
          },
          options: {
            en: [
              'Lower RTE directly inflates the electricity input required per MWh of usable discharged energy',
              'RTE only influences the transformer voltage ratio, not operational expenditure',
              'Higher RTE reduces the structural footprint of the container enclosure',
              'RTE determines the chemical fire suppression concentration in NFPA 855 codes',
            ],
            id: [
              'RTE yang lebih rendah secara langsung memperbesar kebutuhan energi listrik input per MWh energi netto yang dapat disalurkan',
              'RTE hanya memengaruhi rasio tegangan transformator, bukan biaya operasional',
              'RTE yang lebih tinggi mengurangi dimensi fisik tapak kontainer',
              'RTE menentukan konsentrasi agen pemadam kebakaran kimia dalam standar NFPA 855',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Every unit of efficiency lost during the charge-discharge cycle means additional energy must be purchased to recharge the battery, directly magnifying lifetime charging operating costs (C_charging / η_RTE).',
            id: 'Setiap unit efisiensi yang hilang selama siklus pengisian-pengosongan berarti energi tambahan harus dibeli untuk mengisi ulang baterai, secara langsung memperbesar biaya operasional pengisian (C_charging / η_RTE).',
          },
        },
        {
          id: 'bess-q1-2',
          question: {
            en: 'What unique capability distinguishes Grid-Forming (GFM) inverters from traditional Grid-Following (GFL) inverters?',
            id: 'Kemampuan khusus apa yang membedakan inverter Grid-Forming (GFM) dari inverter konvensional Grid-Following (GFL)?',
          },
          options: {
            en: [
              'GFM inverters can establish an independent voltage and frequency source without needing an existing grid signal',
              'GFM inverters can only operate when connected to high-voltage direct current (HVDC) lines',
              'GFM inverters eliminate the need for thermal cooling liquid systems',
              'GFM inverters convert DC directly into mechanical shaft rotation without magnetic fields',
            ],
            id: [
              'Inverter GFM mampu membentuk sumber tegangan dan frekuensi mandiri tanpa memerlukan sinyal referensi jaringan eksternal',
              'Inverter GFM hanya dapat beroperasi jika terhubung ke saluran transmisi arus searah tegangan tinggi (HVDC)',
              'Inverter GFM meniadakan kebutuhan sistem pendingin cairan termal',
              'Inverter GFM mengubah DC langsung menjadi putaran mekanis poros tanpa medan magnet',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Grid-following inverters measure the grid phase angle via a Phase-Locked Loop (PLL) and synchronize to it. In contrast, grid-forming inverters act as a voltage source, enabling black-start restoration and synthetic rotational inertia.',
            id: 'Inverter grid-following mengukur sudut fasa jaringan melalui Phase-Locked Loop (PLL) dan menyinkronkan arus keluaran. Sebaliknya, inverter grid-forming bertindak sebagai sumber tegangan mandiri yang memungkinkan pemulihan black-start dan inersia sintetis.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: REDOX FLOW BATTERIES & LONG-DURATION ENERGY STORAGE
    // -------------------------------------------------------------
    {
      id: 'bess-mod-2',
      topicId: 'battery-storage',
      order: 2,
      title: {
        en: 'Redox Flow Batteries & Long-Duration Energy Storage (LDES)',
        id: 'Baterai Alir Redoks & Penyimpanan Energi Berdurasi Panjang (LDES)',
      },
      shortDescription: {
        en: 'Decoupled power and energy scaling, Vanadium redox couples (VRFB), membrane ion crossover, and pump fluid dynamics.',
        id: 'Pemisahan independen daya dan energi, pasangan redoks Vanadium (VRFB), migrasi ion melintasi membran, dan dinamika fluida pompa.',
      },
      durationMinutes: 22,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'battery-storage-lab',
      sections: [
        {
          id: 'bess-2-sec-1',
          title: {
            en: '1. Vanadium Redox Flow Electrochemistry and Stack Decoupling',
            id: '1. Elektrokimia Alir Redoks Vanadium & Pemisahan Stack-Tangki',
          },
          content: {
            en: 'Conventional enclosed batteries (such as Li-ion or lead-acid) house their active electrochemical materials directly inside each cell casing, locking energy capacity ($E$, in MWh) and power capability ($P$, in MW) in a fixed geometric ratio. Redox Flow Batteries (RFBs) fundamentally decouple power and energy by dissolving electroactive species in external liquid electrolyte reservoirs and pumping them through an electrochemical reaction cell stack:\n\n• The Vanadium Advantage: The All-Vanadium Redox Flow Battery (VRFB) exploits the four contiguous oxidation states of vanadium dissolved in aqueous sulfuric acid ($H_2SO_4$):\n  - Negative Half-Cell (Anolyte): $V^{2+} \\rightleftharpoons V^{3+} + e^- \\quad (E^0 = -0.26\\text{ V vs SHE})$\n  - Positive Half-Cell (Catholyte): $VO^{2+} + H_2O \\rightleftharpoons VO_2^+ + 2H^+ + e^- \\quad (E^0 = +1.00\\text{ V vs SHE})$\n  - Standard Cell Potential: $E^0_{\\text{cell}} = 1.26\\text{ V}$ (operating open-circuit voltage typically 1.40–1.60 V at full state of charge).\n• Elimination of Cross-Contamination: Because the same elemental metal exists on both sides of the ion-exchange membrane (e.g., DuPont Nafion perfluorosulfonic acid), any transmembrane crossover of vanadium ions simply causes minor self-discharge rather than permanent chemical poisoning of the electrodes, allowing infinite electrolyte rebalancing without capacity destruction.\n• Independent Sizing: Power rating (MW) is governed entirely by the geometric surface area and count of membrane-electrode assemblies (MEAs) in the cell stack. Energy capacity (MWh) is scaled solely by adding larger bulk storage tanks and more electrolyte volume.',
            id: 'Baterai tertutup konvensional (seperti Li-ion atau timbal-asam) menempatkan material aktif elektrokimia langsung di dalam casing sel, mengunci kapasitas energi ($E$, dalam MWh) dan daya ($P$, dalam MW) dalam rasio geometris yang kaku. Redox Flow Batteries (RFB) memisahkan daya dan energi secara independen dengan melarutkan spesies elektroaktif dalam tangki elektrolit cair eksternal dan memompanya melintasi tumpukan sel reaksi (cell stack):\n\n• Keunggulan Kimiawi Vanadium: All-Vanadium Redox Flow Battery (VRFB) memanfaatkan empat tingkat oksidasi berurutan dari unsur vanadium yang dilarutkan dalam asam sulfat encer ($H_2SO_4$):\n  - Setengah-Sel Negatif (Anolit): $V^{2+} \\rightleftharpoons V^{3+} + e^- \\quad (E^0 = -0,26\\text{ V vs SHE})$\n  - Setengah-Sel Positif (Katolit): $VO^{2+} + H_2O \\rightleftharpoons VO_2^+ + 2H^+ + e^- \\quad (E^0 = +1,00\\text{ V vs SHE})$\n  - Potensial Sel Standar: $E^0_{\\text{sel}} = 1,26\\text{ V}$ (tegangan rangkaian terbuka operasional biasanya 1,40–1,60 V pada muatan penuh).\n• Bebas Kontaminasi Silang: Karena unsur logam yang sama digunakan di kedua sisi membran penukar ion (seperti sulfonat perfluorinasi Nafion), perembesan ion vanadium melintasi membran hanya menyebabkan pelepasan muatan mandiri sementara tanpa meracuni elektroda secara permanen, sehingga larutan dapat diseimbangkan kembali secara tak terbatas.\n• Desain Independen: Daya nominal (MW) ditentukan oleh luas permukaan dan jumlah susunan elektroda membran (MEA) dalam stack. Kapasitas energi (MWh) diskalakan secara independen hanya dengan memperbesar volume tangki dan volume cairan elektrolit.',
          },
          formula: 'E_{\\text{cell}} = E^0 - \\frac{RT}{F} \\ln \\left( \\frac{[V^{3+}][VO^{2+}][H^+]^2}{[V^{2+}][VO_2^+]} \\right) - I R_{\\text{internal}} - \\eta_{\\text{act}} - \\eta_{\\text{conc}}',
          formulaExplanation: {
            en: 'Nernstian open-circuit cell potential adjusted for irreversible operational losses. Overpotentials include activation polarization (η_act), ohmic resistance across membrane and fluid (I·R_internal), and mass-transport concentration polarization (η_conc) influenced by electrolyte flow rate.',
            id: 'Potensial sel rangkaian terbuka Nernst dengan koreksi rugi operasional ireversibel. Kerugian meliputi polarisasi aktivasi (η_act), resistansi ohmik membran dan fluida (I·R_internal), serta polarisasi konsentrasi transpor massa (η_conc) yang dipengaruhi laju alir pompa.',
          },
          variables: [
            {
              symbol: 'E_{\\text{cell}}',
              name: { en: 'Operating Cell Potential', id: 'Potensial Operasional Sel' },
              unit: 'V',
              description: {
                en: 'Terminal voltage delivered under active current discharge.',
                id: 'Tegangan terminal sel saat mengalirkan arus listrik.',
              },
            },
            {
              symbol: 'E^0',
              name: { en: 'Standard Cell Potential', id: 'Potensial Standar Sel' },
              unit: 'V',
              description: {
                en: 'Standard reduction potential difference (+1.26 V at 25°C).',
                id: 'Selisih potensial reduksi standar (+1,26 V pada 25°C).',
              },
            },
            {
              symbol: 'R_{\\text{internal}}',
              name: { en: 'Area-Specific Stack Resistance', id: 'Resistansi Stack Spesifik Area' },
              unit: 'Ω·cm²',
              description: {
                en: 'Sum of ion-exchange membrane resistance, bipolar plate contact resistance, and electrolyte resistivity.',
                id: 'Total hambatan membran ion, pelat bipolar grafit, dan resistivitas larutan elektrolit.',
              },
            },
            {
              symbol: '\\eta_{\\text{conc}}',
              name: { en: 'Concentration Overpotential', id: 'Overpotensial Konsentrasi' },
              unit: 'V',
              description: {
                en: 'Depletion of reactant ions near porous carbon felt electrode surfaces at high current densities.',
                id: 'Penipisan konsentrasi ion reaktan di permukaan felt karbon berpori pada densitas arus tinggi.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Coupled Anode and Cathode Redox Thermodynamics',
                id: 'Langkah 1: Termodinamika Pasangan Redoks Anoda dan Katoda'
              },
              math: '\\Delta G^0 = -n F E^0_{\\text{cell}} = -1 \\cdot (96485\\text{ C/mol}) \\cdot (1.259\\text{ V}) = -121.5\\text{ kJ/mol}',
              explanation: {
                en: 'Negative Gibbs free energy indicates spontaneous forward discharge converting stored chemical potential into electrical work.',
                id: 'Nilai energi bebas Gibbs negatif membuktikan reaksi pengosongan spontan yang mengubah potensial kimiawi menjadi kerja listrik.',
              },
            },
            {
              title: {
                en: 'Step 2: Flow Decoupled Energy-to-Power Scaling Ratio',
                id: 'Langkah 2: Rasio Penskalaan Independen Energi terhadap Daya'
              },
              math: '\\text{Duration } t = \\frac{E_{\\text{total}}}{P_{\\text{rated}}} = \\frac{V_{\\text{tank}} \\cdot C_V \\cdot F \\cdot U_{\\text{nom}} \\cdot \\text{SoC}_{\\text{range}}}{N_{\\text{cells}} \\cdot A_{\\text{cell}} \\cdot j \\cdot U_{\\text{nom}}} = \\frac{V_{\\text{tank}} \\cdot C_V \\cdot F \\cdot \\text{SoC}_{\\text{range}}}{N_{\\text{cells}} \\cdot A_{\\text{cell}} \\cdot j}',
              explanation: {
                en: 'Increasing duration from 4 hours to 12 or 24 hours requires only expanding tank volume (V_tank) without rebuilding the expensive cell stack (N_cells · A_cell).',
                id: 'Meningkatkan durasi dari 4 jam menjadi 12 atau 24 jam hanya memerlukan penambahan volume tangki (V_tank) tanpa perlu menambah tumpukan sel mahal (N_cells · A_cell).',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Storage Parameter', 'Vanadium Flow (VRFB)', 'Lithium Iron Phosphate (LFP)', 'Zinc-Bromine Flow (Zn-Br₂)'],
              id: ['Parameter Penyimpanan', 'Alir Vanadium (VRFB)', 'Litium Besi Fosfat (LFP)', 'Alir Seng-Bromin (Zn-Br₂)'],
            },
            rows: [
              {
                en: ['Energy-to-Power Decoupling', 'Fully independent (tanks vs stack)', 'Coupled (fixed cell design)', 'Fully independent (external tanks)'],
                id: ['Pemisahan Energi & Daya', 'Sepenuhnya mandiri (tangki vs stack)', 'Terkunci (desain sel tetap)', 'Sepenuhnya mandiri (tangki eksternal)'],
              },
              {
                en: ['Cycle Life (at 100% DoD)', '> 20,000 cycles (Zero degradation)', '3,500 – 6,000 cycles', '> 10,000 cycles (requires strip cycle)'],
                id: ['Usia Siklus (100% DoD)', '> 20.000 siklus (Tanpa degradasi)', '3.500 – 6.000 siklus', '> 10.000 siklus (perlu siklus pelarutan)'],
              },
              {
                en: ['Round-Trip Efficiency (AC-AC)', '68% – 76% (Pump parasitics)', '88% – 93% (Highly efficient)', '65% – 72% (Parasitic pumping)'],
                id: ['Efisiensi Bolak-Balik (AC-AC)', '68% – 76% (Rugi parasitik pompa)', '88% – 93% (Sangat efisien)', '65% – 72% (Rugi pompa fluida)'],
              },
              {
                en: ['Thermal Runaway Risk', 'Zero (Aqueous non-flammable)', 'Low (Cathode stable to 270°C)', 'Zero (Aqueous haloid solution)'],
                id: ['Risiko Thermal Runaway', 'Nol (Larutan air tak bisa terbakar)', 'Rendah (Katoda stabil s/d 270°C)', 'Nol (Larutan halida berbasis air)'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'Dalian Rongke Power 100 MW / 400 MWh VRFB Peak-Shaving Station',
              id: 'Pusat Penyimpanan VRFB 100 MW / 400 MWh Dalian Rongke di Tiongkok',
            },
            context: {
              en: 'The Liaoning grid suffered acute wind curtailment during frigid winter nights while facing sudden peak electricity spikes from industrial heating in early morning hours.',
              id: 'Jaringan listrik Liaoning menghadapi pemborosan daya angin (curtailment) di malam musim dingin dan lonjakan beban industri mendadak di pagi hari.',
            },
            analysis: {
              en: 'A 100 MW / 400 MWh utility-scale VRFB facility was integrated to absorb up to 400 MWh of surplus wind generation nightly, cycling 100% depth of discharge with non-flammable water-based electrolytes.',
              id: 'Fasilitas VRFB skala utilitas 100 MW / 400 MWh dibangun untuk menyerap hingga 400 MWh surplus daya angin setiap malam dengan pengosongan 100% menggunakan elektrolit berbasis air anti-terbakar.',
            },
            takeaway: {
              en: 'Demonstrated zero capacity fade over thousands of deep cycles and proved the economic viability of flow batteries for Long-Duration Energy Storage (LDES > 4 hours).',
              id: 'Membuktikan tidak adanya penurunan kapasitas selama ribuan siklus dalam dan menegaskan kelayakan ekonomi baterai alir untuk penyimpanan durasi panjang (LDES > 4 jam).',
            },
          },
          keyTakeaways: {
            en: [
              'Vanadium Redox Flow Batteries store active energy species in liquid tanks, completely decoupling system duration (MWh) from continuous inverter power (MW).',
              'The use of four vanadium valence states (V²⁺, V³⁺, VO²⁺, VO₂⁺) allows infinite reconditioning without permanent chemical electrode contamination.',
              'Round-trip efficiency is lower than lithium-ion due to pump hydraulic parasitics and membrane area resistance, but CAPEX per incremental kWh drops sharply for 8+ hour applications.',
            ],
            id: [
              'Baterai Alir Redoks Vanadium menyimpan material aktif dalam tangki cairan, memisahkan durasi sistem (MWh) secara independen dari daya inverter kontinu (MW).',
              'Pemanfaatan empat tingkat valensi vanadium (V²⁺, V³⁺, VO²⁺, VO₂⁺) memungkinkan rekondisi elektrolit tak terbatas tanpa kontaminasi elektroda permanen.',
              'Efisiensi bolak-balik lebih rendah dari litium-ion akibat beban parasitik pompa dan hambatan membran, namun biaya marjinal per kWh turun drastis untuk durasi di atas 8 jam.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bess-q2-1',
          question: {
            en: 'What architectural characteristic makes redox flow batteries uniquely scalable for 10-to-24 hour storage compared to lithium-ion packs?',
            id: 'Karakteristik arsitektur apa yang membuat baterai alir redoks sangat terukur untuk durasi 10 hingga 24 jam dibanding baterai litium-ion?',
          },
          options: {
            en: [
              'Expanding duration requires only larger electrolyte tanks and liquid volume without increasing cell stack count',
              'Flow batteries operate at ultra-high pressures exceeding 300 bar',
              'The cell voltage increases linearly with the volume of electrolyte in the tanks',
              'Flow batteries do not require electrical balance-of-plant inverters',
            ],
            id: [
              'Menambah durasi hanya memerlukan tangki elektrolit dan volume cairan yang lebih besar tanpa memperbanyak tumpukan sel elektrokimia',
              'Baterai alir beroperasi pada tekanan ultra-tinggi melampaui 300 bar',
              'Tegangan sel meningkat secara linier mengikuti volume elektrolit di dalam tangki',
              'Baterai alir tidak membutuhkan inverter konversi daya elektrikal',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In flow batteries, power is dictated by stack area and energy is dictated by tank volume. Therefore, adding storage hours only costs the price of additional tank capacity and vanadium electrolyte solution.',
            id: 'Pada baterai alir, daya ditentukan oleh luas stack dan energi ditentukan oleh volume tangki. Oleh karena itu, menambah durasi hanya memerlukan biaya tangki dan larutan vanadium tambahan yang jauh lebih terjangkau.',
          },
        },
        {
          id: 'bess-q2-2',
          question: {
            en: 'Why does membrane crossover in an All-Vanadium Redox Flow Battery (VRFB) avoid destroying cell capacity permanently?',
            id: 'Mengapa perembesan ion melintasi membran pada All-Vanadium Redox Flow Battery (VRFB) tidak merusak kapasitas sel secara permanen?',
          },
          options: {
            en: [
              'Both positive and negative electrolytes share the same element (vanadium) across different valence states',
              'The crossover ions evaporate spontaneously into the atmosphere',
              'Vanadium forms a solid diamond interphase on the separator',
              'The membrane operates at absolute zero temperature preventing diffusion',
            ],
            id: [
              'Kedua sisi elektrolit positif dan negatif menggunakan unsur dasar yang sama (vanadium) dalam tingkat valensi yang berbeda',
              'Ion yang merembes menguap secara spontan ke atmosfer luar',
              'Vanadium membentuk lapisan intan padat pada separator',
              'Membran beroperasi pada suhu nol mutlak sehingga mencegah difusi ion',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Because vanadium is used on both sides (V²⁺/V³⁺ in anolyte and VO²⁺/VO₂⁺ in catholyte), crossover simply leads to a reversible state-of-charge imbalance that can be fully recovered by electrical or chemical rebalancing.',
            id: 'Karena vanadium digunakan di kedua sisi (V²⁺/V³⁺ pada anolit dan VO²⁺/VO₂⁺ pada katolit), migrasi ion hanya menyebabkan ketidakseimbangan muatan sementara yang dapat dipulihkan sepenuhnya melalui penyeimbangan ulang larutan.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 3: UPCOMING COMMERCIALIZED CHEMISTRIES: SODIUM-ION (NA-ION)
    // -------------------------------------------------------------
    {
      id: 'bess-mod-3',
      topicId: 'battery-storage',
      order: 3,
      title: {
        en: 'Sodium-Ion Battery Electrochemistry & Supply Chain Resilience',
        id: 'Elektrokimia Baterai Natrium-Ion & Ketahanan Rantai Pasok',
      },
      shortDescription: {
        en: 'Abundant sodium precursors, hard carbon intercalation mechanisms, Prussian white cathodes, and zero-volt transport safety.',
        id: 'Prekursor natrium melimpah, mekanisme interkalasi karbon keras, katoda Prussian white, dan keamanan transportasi nol volt.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'battery-storage-lab',
      sections: [
        {
          id: 'bess-3-sec-1',
          title: {
            en: '1. Fundamentals of Sodium-Ion Intercalation and Structural Physics',
            id: '1. Prinsip Interkalasi Natrium-Ion & Fisika Struktur',
          },
          content: {
            en: 'While lithium-ion chemistry dominates mobile devices and high-end automotive powertrains, geopolitical concentration of lithium reserves, nickel supply bottlenecks, and cobalt ethics create urgent demand for alternative electrochemical carriers. Sodium (Na) is the sixth most abundant element in the Earth\'s crust (over 1,000 times more abundant than lithium), extracted cheaply from ubiquitous sea salt ($NaCl$) and soda ash ($Na_2CO_3$):\n\n• Ionic Size and Hard Carbon Anodes: The ionic radius of $\\text{Na}^+$ ($1.02\\text{ \\AA}$) is substantially larger than $\\text{Li}^+$ ($0.76\\text{ \\AA}$). Consequently, sodium ions cannot stably intercalate into graphite crystalline interlayer spacings without forming thermodynamically unstable stage-1 binary compounds ($NaC_{64}$). Instead, sodium batteries utilize nongraphitizable "Hard Carbon" (disordered turbostratic carbon derived from biomass or synthetic polymers).\n• Storage Mechanism: Sodium stores energy in hard carbon via a dual-stage "adsorption-insertion" process:\n  - High-potential sloping region (> 0.1 V vs $\\text{Na}/\\text{Na}^+$): Defect and curved graphene edge surface adsorption.\n  - Low-potential plateau region (< 0.1 V vs $\\text{Na}/\\text{Na}^+$): Intercalation between turbostratic graphene nanolayers and pore-filling condensation within closed nanopores.\n• Aluminum Current Collectors on Both Electrodes: Unlike lithium, sodium does not form an electrochemical alloy with aluminum ($Al$) at low negative potentials ($< 0.3\\text{ V}$). This allows cell manufacturers to replace expensive and heavy copper ($Cu$) foil on the anode with lightweight aluminum foil on both anode and cathode, substantially reducing manufacturing cost and cell weight.\n• Zero-Volt Deep Discharge Safety: Because aluminum does not dissolve at 0.0V (unlike copper which undergoes catastrophic anodic oxidative dissolution when a Li-ion cell is fully discharged), Sodium-ion cells can be safely shorted and transported at true 0.0 V State-of-Charge with zero fire risk.',
            id: 'Meskipun kimia litium-ion mendominasi perangkat elektronik dan mobil listrik premium, keterbatasan cadangan litium, kelangkaan nikel, dan isu kobalt mendorong kebutuhan mendesak akan pembawa muatan alternatif. Natrium (Na) adalah unsur keenam paling melimpah di kerak Bumi (lebih dari 1.000 kali lipat cadangan litium), dapat diekstraksi murah dari garam laut ($NaCl$) dan soda ash ($Na_2CO_3$):\n\n• Jari-Jari Ionik & Anoda Karbon Keras (Hard Carbon): Radius ion $\\text{Na}^+$ ($1,02\\text{ \\AA}$) jauh lebih besar daripada $\\text{Li}^+$ ($0,76\\text{ \\AA}$). Akibatnya, ion natrium tidak dapat berinterkalasi stabil ke dalam kisi grafit kristalin biasa. Sebagai gantinya, baterai natrium menggunakan "Hard Carbon" (karbon turbostratik non-grafitisasi dengan orientasi acak).\n• Mekanisme Penyimpanan: Natrium menyimpan energi pada karbon keras melalui proses dua tahap "adsorpsi-insersi":\n  - Wilayah kurva miring (> 0,1 V vs $\\text{Na}/\\text{Na}^+$): Adsorpsi ion pada cacat kisi dan tepi lapisan grafena.\n  - Wilayah dataran rendah (< 0,1 V vs $\\text{Na}/\\text{Na}^+$): Interkalasi antar lapisan lembaran turbostratik dan pengisian kondensasi ke dalam pori-pori tertutup nano.\n• Kolektor Arus Aluminium di Kedua Elektroda: Berbeda dengan litium, natrium tidak membentuk paduan (alloy) dengan aluminium ($Al$) pada potensial rendah ($< 0,3\\text{ V}$). Hal ini memungkinkan produsen menggantikan foil tembaga ($Cu$) yang mahal dan berat di anoda dengan aluminium di anoda dan katoda sekaligus, memangkas biaya dan bobot sel.\n• Keamanan Transportasi 0 Volt: Karena aluminium tidak larut pada tegangan 0,0 V (berbeda dengan tembaga yang larut secara destruktif saat sel Li-ion kosong total), baterai Natrium-ion dapat dikosongkan total hingga 0,0 V dan dikirimkan tanpa risiko kebakaran.',
          },
          formula: 'q_{\\text{total}} = \\int_{E_{\\text{cutoff}}}^{E_{\\text{slope}}} \\left( -\\frac{dq}{dE} \\right)_{\\text{adsorp}} dE + \\int_{E_{\\text{slope}}}^{E_{\\text{plateau}}} \\left( -\\frac{dq}{dE} \\right)_{\\text{intercal}} dE',
          formulaExplanation: {
            en: 'Deconvolution of cumulative specific charge capacity in hard carbon anodes. The integral separates the high-voltage capacitive surface adsorption regime from the low-potential quasi-metallic pore-filling plateau regime.',
            id: 'Dekonvolusi kapasitas muatan spesifik kumulatif anoda karbon keras. Integral memisahkan rezim adsorpsi kapasitif permukaan tegangan tinggi dari rezim interkalasi dan pengisian pori nano berpotensial rendah.',
          },
          variables: [
            {
              symbol: 'q_{\\text{total}}',
              name: { en: 'Total Anode Specific Capacity', id: 'Kapasitas Spesifik Anoda Total' },
              unit: 'mAh/g',
              description: {
                en: 'Specific electrochemical charge capacity of hard carbon (~300–350 mAh/g).',
                id: 'Kapasitas muatan elektrokimia spesifik karbon keras (~300–350 mAh/g).',
              },
            },
            {
              symbol: 'E_{\\text{plateau}}',
              name: { en: 'Low-Potential Plateau Threshold', id: 'Ambang Dataran Rendah' },
              unit: 'V vs Na/Na⁺',
              description: {
                en: 'Operating potential boundary below 0.1 V where sodium clusters condense inside closed nanopores.',
                id: 'Batas potensial di bawah 0,1 V saat klaster ion natrium terkondensasi dalam nanopori tertutup.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Cathode Crystal Lattices (Prussian White vs Layered Oxides)',
                id: 'Langkah 1: Kisi Kristal Katoda (Prussian White vs Oksida Berlapis)'
              },
              math: '\\text{Na}_2\\text{Fe}[\\text{Fe(CN)}_6] \\rightleftharpoons \\text{Fe}[\\text{Fe(CN)}_6] + 2\\text{Na}^+ + 2e^-',
              explanation: {
                en: 'Prussian White framework features open 3D metal-organic channels allowing rapid Na⁺ migration with minimal volume strain (< 1.5%), enabling 15-minute ultra-fast charging.',
                id: 'Struktur rangka Prussian White memiliki saluran terbuka 3D yang memungkinkan difusi cepat Na⁺ dengan regangan volume minimal (< 1,5%), mendukung pengisian cepat 15 menit.',
              },
            },
            {
              title: {
                en: 'Step 2: Low-Temperature Kinetic Overpotential Immunity',
                id: 'Langkah 2: Ketahanan Kinetika pada Suhu Sub-Nol'
              },
              math: 'D_{\\text{Na}^+} = D_0 \\exp\\left(-\\frac{E_a}{R T}\\right) \\quad \\text{where } E_{a,\\text{Na}} < E_{a,\\text{Li}} \\text{ in desolvation}',
              explanation: {
                en: 'Due to weaker electrostatic solvation sheath bonding compared to Li⁺, Na⁺ desolvation activation energy is lower, preserving > 85% capacity at -20°C and functioning down to -40°C.',
                id: 'Karena ikatan cangkang solvasi elektrostatik yang lebih lemah dibanding Li⁺, energi aktivasi desolvasi Na⁺ lebih rendah, mempertahankan > 85% kapasitas pada -20°C dan tetap beroperasi hingga -40°C.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Metric', 'Sodium-Ion (Na-ion)', 'Lithium Iron Phosphate (LFP)', 'Nickel Manganese Cobalt (NMC-811)'],
              id: ['Metrik', 'Natrium-Ion (Na-ion)', 'Litium Besi Fosfat (LFP)', 'Nikel Mangan Kobalt (NMC-811)'],
            },
            rows: [
              {
                en: ['Cell Specific Energy', '140 – 165 Wh/kg', '160 – 195 Wh/kg', '260 – 300 Wh/kg'],
                id: ['Energi Spesifik Sel', '140 – 165 Wh/kg', '160 – 195 Wh/kg', '260 – 300 Wh/kg'],
              },
              {
                en: ['Anode Current Collector', 'Aluminum Foil ($Al$)', 'Copper Foil ($Cu$)', 'Copper Foil ($Cu$)'],
                id: ['Kolektor Arus Anoda', 'Foil Aluminium ($Al$)', 'Foil Tembaga ($Cu$)', 'Foil Tembaga ($Cu$)'],
              },
              {
                en: ['Discharge to 0.0V Storage', 'Safe (Zero damage, 0V shipping)', 'Destructive (Copper dissolution)', 'Destructive (Severe cell hazard)'],
                id: ['Penyimpanan Pengosongan 0,0V', 'Aman (Tanpa kerusakan, kirim 0V)', 'Merusak (Pelarutan tembaga)', 'Merusak (Bahaya kebakaran besar)'],
              },
              {
                en: ['-20°C Capacity Retention', '85% – 92%', '60% – 70%', '75% – 82%'],
                id: ['Retensi Kapasitas pada -20°C', '85% – 92%', '60% – 70%', '75% – 82%'],
              },
              {
                en: ['Raw Material Abundance', 'Ubiquitous (Sea salt, soda ash)', 'Geopolitically constrained Li', 'Critically scarce Ni & Co'],
                id: ['Kelimpahan Bahan Baku', 'Sangat melimpah (Garam laut)', 'Terkonsentrasi geopolitik (Li)', 'Langka & kritis (Ni & Co)'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'Commercial Grid BESS Deployment: 100 MWh Fuxin Sodium-ion Storage Plant',
              id: 'Penerapan BESS Skala Komersial: Pembangkit Natrium-ion 100 MWh Fuxin',
            },
            context: {
              en: 'Northeast China experiences bitter winter ambient temperatures dropping to -30°C, causing conventional LFP battery packs to lose substantial capacity and require costly parasitic thermal heating.',
              id: 'Tiongkok Timur Laut mengalami suhu musim dingin ekstrem hingga -30°C yang menyebabkan baterai LFP kehilangan banyak kapasitas dan memboroskan daya pemanas termal.',
            },
            analysis: {
              en: 'A 100 MWh utility sodium-ion storage plant was commissioned using Prussian White cathodes and hard carbon anodes. The system achieved sub-zero cycling without thermal pre-heating and cut raw material cell costs by 35%.',
              id: 'Pusat penyimpanan natrium-ion 100 MWh dibangun dengan katoda Prussian White dan anoda karbon keras. Sistem mampu bersiklus pada suhu beku tanpa pemanasan awal dan memangkas biaya sel 35%.',
            },
            takeaway: {
              en: 'Sodium-ion provides superior cold-weather resilience and total supply chain insulation from lithium commodity price volatility for stationary storage and urban transit.',
              id: 'Natrium-ion menghadirkan ketahanan cuaca dingin luar biasa dan membebaskan proyek penyimpanan energi dari fluktuasi harga komoditas litium global.',
            },
          },
          keyTakeaways: {
            en: [
              'Sodium-ion batteries utilize hard carbon anodes and aluminum current collectors on both sides, eliminating expensive copper and enabling safe zero-volt shipping.',
              'While gravimetric density (150–165 Wh/kg) is slightly below LFP, raw material costs and cold-temperature kinetics are vastly superior.',
              'Prussian blue analogues and layered transition metal oxides provide resilient open lattice frameworks capable of rapid 4C fast charging.',
            ],
            id: [
              'Baterai Natrium-ion menggunakan anoda karbon keras dan foil aluminium di kedua elektroda, meniadakan tembaga mahal dan memungkinkan pengiriman aman pada 0 volt.',
              'Meskipun densitas gravimetrik (150–165 Wh/kg) sedikit di bawah LFP, biaya bahan baku dan performa suhu dingin jauh lebih unggul.',
              'Analog Prussian blue dan oksida logam berlapis menghadirkan kerangka kristal terbuka yang mendukung pengisian cepat 4C.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bess-q3-1',
          question: {
            en: 'Why can Sodium-ion battery anodes utilize aluminum current collector foils instead of copper foils?',
            id: 'Mengapa anoda baterai Natrium-ion dapat menggunakan foil kolektor aluminium dan bukan tembaga?',
          },
          options: {
            en: [
              'Sodium does not electrochemically alloy with aluminum at low operating potentials, preventing foil embrittlement',
              'Aluminum is magnetically attracted to sodium ions',
              'Copper melts at standard battery operating temperatures',
              'Aluminum foil acts as an ion-exchange membrane separating the electrodes',
            ],
            id: [
              'Natrium tidak membentuk paduan (alloy) elektrokimia dengan aluminium pada potensial kerja rendah sehingga foil tidak rapuh',
              'Aluminium memiliki gaya tarik magnetik terhadap ion natrium',
              'Tembaga meleleh pada suhu kerja standar baterai',
              'Foil aluminium bertindak sebagai membran penukar ion yang memisahkan elektroda',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Unlike lithium, which alloys with aluminum below 0.3V (causing mechanical pulverization), sodium does not alloy with aluminum at room temperature, allowing lightweight and inexpensive aluminum foil on both negative and positive electrodes.',
            id: 'Berbeda dengan litium yang membentuk paduan dengan aluminium di bawah 0,3V (menyebabkan foil hancur), natrium tidak bereaksi dengan aluminium pada suhu kamar, sehingga foil aluminium yang ringan dan murah dapat digunakan di kedua kutub.',
          },
        },
        {
          id: 'bess-q3-2',
          question: {
            en: 'What unique safety advantage arises from the absence of copper current collectors in Sodium-ion cells?',
            id: 'Keunggulan keselamatan unik apa yang diperoleh dari ditiadakannya kolektor arus tembaga pada sel Natrium-ion?',
          },
          options: {
            en: [
              'Cells can be completely discharged to 0.0 Volts for transport without causing copper dissolution and internal short-circuits',
              'Cells no longer require external electronic battery management systems (BMS)',
              'Cells can be submerged in boiling water without heating up',
              'The open circuit voltage increases to over 12.0 Volts per single cell',
            ],
            id: [
              'Sel dapat dikosongkan total hingga 0,0 Volt saat pengiriman tanpa merusak anoda akibat pelarutan tembaga yang memicu korsleting internal',
              'Sel tidak lagi memerlukan sistem manajemen baterai elektronik (BMS)',
              'Sel dapat direbus dalam air mendidih tanpa mengalami pemanasan',
              'Tegangan rangkaian terbuka sel tunggal melonjak melampaui 12,0 Volt',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'When conventional Li-ion cells drop to 0V, copper oxidizes into Cu²⁺ ions that later precipitate as metallic dendrites upon recharge, causing fires. Sodium cells with aluminum foils can stay at 0V indefinitely with zero hazard.',
            id: 'Saat sel Li-ion konvensional turun ke 0V, tembaga teroksidasi menjadi ion Cu²⁺ yang membentuk dendrit pemicu kebakaran saat diisi ulang. Baterai Na-ion dengan foil aluminium aman disimpan pada 0V tanpa risiko apa pun.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 4: SOLID-STATE & MULTIELECTRON LITHIUM-SULFUR (LI-S)
    // -------------------------------------------------------------
    {
      id: 'bess-mod-4',
      topicId: 'battery-storage',
      order: 4,
      title: {
        en: 'Solid-State & Multielectron Lithium-Sulfur Batteries',
        id: 'Baterai Solid-State & Litium-Sulfur Multielektron',
      },
      shortDescription: {
        en: 'Solid ceramic/sulfide electrolytes, metallic lithium electrodeposition, critical current density (CCD), and the polysulfide shuttle effect.',
        id: 'Elektrolit keramik/sulfida padat, elektrodeposisi litium metalik, densitas arus kritis (CCD), dan efek bolak-balik polisulfida.',
      },
      durationMinutes: 24,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'battery-storage-lab',
      sections: [
        {
          id: 'bess-4-sec-1',
          title: {
            en: '1. All-Solid-State Batteries (ASSB) and Metal Anode Interfaces',
            id: '1. Baterai All-Solid-State (ASSB) & Antarmuka Anoda Logam',
          },
          content: {
            en: 'Current commercial lithium-ion cells rely on flammable organic liquid carbonates (EC/DMC with $LiPF_6$) and graphite anodes. Two fundamental electrochemical barriers cap their performance: energy density saturation (~300 Wh/kg) and thermal runaway risk. All-Solid-State Batteries (ASSBs) eliminate volatile liquids by replacing them with solid ion-conducting inorganic ceramics or sulfides:\n\n• The Metallic Lithium Holy Grail: Metallic lithium offers the highest theoretical specific capacity ($3,860\\text{ mAh/g}$ vs $372\\text{ mAh/g}$ for graphite) and the lowest standard electrochemical reduction potential ($-3.04\\text{ V vs SHE}$). However, liquid electrolytes form uneven Solid Electrolyte Interphases (SEI) leading to ramified lithium dendrites that short-circuit cells. Solid electrolytes act as physical and chemo-mechanical barriers.\n• Solid Electrolyte Classes:\n  - Sulfides ($Li_{10}GeP_2S_{12}$ LGPS, Argyrodite $Li_6PS_5Cl$): Exceptionally high ionic conductivities ($10^{-2}\\text{ S/cm}$ at room temperature, rivaling liquid electrolytes) and mechanical softness that allows good grain boundary contact under moderate stack pressures (1–5 MPa).\n  - Garnet Oxides ($Li_7La_3Zr_2O_{12}$ LLZO): Highly stable against metallic lithium, chemically non-flammable up to > 1000°C, but hard and brittle, requiring high-temperature sintering.\n• Critical Current Density (CCD): The maximum charging current density beyond which lithium dendrites nucleate along solid electrolyte grain boundaries and crack propagation paths. Operating below $J_{\\text{CCD}}$ is mandatory for cycle stability.',
            id: 'Baterai litium-ion komersial saat ini bergantung pada cairan pelarut karbonat organik yang mudah terbakar (EC/DMC dengan $LiPF_6$) dan anoda grafit. Dua batasan fundamental menghalangi kemajuannya: saturasi densitas energi (~300 Wh/kg) dan risiko kebakaran termal (thermal runaway). Baterai All-Solid-State (ASSB) meniadakan cairan mudah terbakar dengan menggantikannya dengan keramik atau sulfida padat penghantar ion:\n\n• Keunggulan Puncak Litium Metalik: Logam litium murni menghadirkan kapasitas spesifik teoretis tertinggi ($3.860\\text{ mAh/g}$ dibandingkan $372\\text{ mAh/g}$ pada grafit) dan potensial reduksi terendah ($-3,04\\text{ V vs SHE}$). Namun, cairan elektrolit membentuk dendrit tajam yang memicu korsleting. Elektrolit padat bertindak sebagai penghalang fisik dan mekanis.\n• Klasifikasi Elektrolit Padat:\n  - Sulfida ($Li_{10}GeP_2S_{12}$ LGPS, Argyrodite $Li_6PS_5Cl$): Konduktivitas ionik sangat tinggi ($10^{-2}\\text{ S/cm}$ pada suhu kamar, setara cairan elektrolit) dan sifat mekanis lunak yang memastikan kontak antarmuka rapat di bawah tekanan tumpukan 1–5 MPa.\n  - Oksida Garnet ($Li_7La_3Zr_2O_{12}$ LLZO): Sangat stabil bersentuhan dengan logam litium, tahan api hingga > 1000°C, namun bersifat getas dan memerlukan sintering suhu tinggi.\n• Densitas Arus Kritis (Critical Current Density - CCD): Ambang batas laju arus pengisian maksimum yang bila dilampaui akan memicu pertumbuhan dendrit litium di sepanjang batas butir keramik padat.',
          },
          formula: 'J_{\\text{CCD}} = \\frac{2 F \\cdot D_{\\text{Li}} \\cdot C_{\\text{Li}}}{\\delta_{\\text{interface}}} \\cdot \\frac{\\sigma_{\\text{solid}} \\cdot \\Omega_{\\text{Li}}}{R_{\\text{crack}} \\cdot (1 - \\nu^2)}',
          formulaExplanation: {
            en: 'Monroe-Newman & Chazalviel critical current density threshold. Dendrite penetration through solid electrolyte grain boundaries occurs when local interfacial current exceeds electro-chemo-mechanical creep dissipation.',
            id: 'Formulasi ambang densitas arus kritis Monroe-Newman & Chazalviel. Penetrasi dendrit litium menembus batas butir elektrolit padat terjadi ketika arus lokal melampaui kemampuan disipasi relaksasi mekanis padatan.',
          },
          variables: [
            {
              symbol: 'J_{\\text{CCD}}',
              name: { en: 'Critical Current Density', id: 'Densitas Arus Kritis' },
              unit: 'mA/cm²',
              description: {
                en: 'Maximum continuous current density achievable before dendrite short-circuiting occurs.',
                id: 'Densitas arus kontinu maksimum sebelum terjadi penetrasi dendrit yang memicu korsleting.',
              },
            },
            {
              symbol: '\\sigma_{\\text{solid}}',
              name: { en: 'Solid State Ionic Conductivity', id: 'Konduktivitas Ionik Elektrolit Padat' },
              unit: 'mS/cm',
              description: {
                en: 'Bulk lithium-ion mobility through the crystal lattice.',
                id: 'Mobilitas ion litium melintasi kisi kristal elektrolit padat.',
              },
            },
            {
              symbol: '\\Omega_{\\text{Li}}',
              name: { en: 'Molar Volume of Metallic Lithium', id: 'Volume Molar Litium Metalik' },
              unit: 'cm³/mol',
              description: {
                en: 'Specific volume change during electrochemical lithium plating and stripping.',
                id: 'Perubahan volume spesifik selama pelapisan dan pelarutan elektrokimia litium.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Multielectron Chemistry of Lithium-Sulfur (Li-S)',
                id: 'Langkah 1: Kimia Multielektron Litium-Sulfur (Li-S)'
              },
              math: 'S_8 + 16\\text{Li}^+ + 16e^- \\rightleftharpoons 8\\text{Li}_2S \\quad (\\text{Theoretical Capacity: } 1675\\text{ mAh/g}, \\text{ Energy: } 2600\\text{ Wh/kg})',
              explanation: {
                en: 'Sulfur accepts two electrons per sulfur atom via multi-step liquid-to-solid phase transformations: Octasulfur S₈ dissolves into long-chain soluble polysulfides (Li₂S₈, Li₂S₆, Li₂S₄) before precipitating as insoluble short-chain Li₂S₂ and Li₂S.',
                id: 'Sulfur menerima dua elektron per atom melalui transformasi bertahap: Oktasulfur S₈ larut menjadi polisulfida rantai panjang (Li₂S₈, Li₂S₆, Li₂S₄) sebelum mengendap menjadi Li₂S₂ dan Li₂S.',
              },
            },
            {
              title: {
                en: 'Step 2: Polysulfide Shuttle Effect and Solid-State Mitigation',
                id: 'Langkah 2: Efek Bolak-Balik Polisulfida & Mitigasi Elektrolit Padat'
              },
              math: '\\text{Cathode: } \\text{Li}_2\\text{S}_x \\xrightarrow{\\text{diffusion}} \\text{Anode: } \\text{Li}_2\\text{S}_x + (2y - 2)\\text{Li} \\rightarrow y\\text{Li}_2\\text{S}_{x/y} \\quad (\\text{Parasitic shuttle loss})',
              explanation: {
                en: 'In liquid cells, soluble polysulfides migrate to the lithium anode and react corrosively, causing rapid self-discharge. Solid electrolytes physically block polysulfide diffusion completely.',
                id: 'Pada sel berpelarut cair, polisulfida terlarut bermigrasi ke anoda litium dan memicu korosi parasitik. Elektrolit padat memblokir difusi molekul polisulfida secara fisik.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Architecture', 'Gravimetric Density', 'Electrolyte Flammability', 'Operating Pressure', 'Primary Commercial Horizon'],
              id: ['Arsitektur', 'Densitas Gravimetrik', 'Sifat Mudah Terbakar', 'Tekanan Tumpukan', 'Fase Komersialisasi Utama'],
            },
            rows: [
              {
                en: ['Liquid NMC-811', '250 – 280 Wh/kg', 'High (Organic carbonate flashpoint ~30°C)', 'Atmospheric (0.1 MPa)', 'Mature production'],
                id: ['Cair NMC-811', '250 – 280 Wh/kg', 'Tinggi (Titik nyala pelarut ~30°C)', 'Atmosferik (0,1 MPa)', 'Produksi massal matang'],
              },
              {
                en: ['All-Solid-State (Sulfide)', '380 – 450 Wh/kg', 'Non-flammable (Solid ceramic/sulfide)', 'Moderate (2 – 5 MPa compression)', 'Pilot manufacturing / 2026–2028 EV'],
                id: ['All-Solid-State (Sulfida)', '380 – 450 Wh/kg', 'Tidak terbakar (Padat keramik/sulfida)', 'Sedang (Kompresi 2 – 5 MPa)', 'Fasilitas percontohan / 2026–2028 EV'],
              },
              {
                en: ['Solid-State Lithium-Sulfur (Li-S)', '450 – 550 Wh/kg', 'Non-flammable (Solid-state barrier)', 'High (5 – 10 MPa)', 'Aviation, HAPS drones, Long-range'],
                id: ['Solid-State Litium-Sulfur (Li-S)', '450 – 550 Wh/kg', 'Tidak terbakar (Hambatan padat)', 'Tinggi (5 – 10 MPa)', 'Penerbangan, drone HAPS, Jarak jauh'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'High-Altitude Pseudo-Satellite (HAPS) Flight with Lithium-Sulfur Cells',
              id: 'Penerbangan Satelit Pseudo Ketinggian Tinggi (HAPS) dengan Sel Litium-Sulfur',
            },
            context: {
              en: 'Solar-powered stratospheric pseudo-satellites (such as the Airbus Zephyr) must store enough energy during daylight hours to sustain continuous flight through 14 hours of night at -70°C without excess weight.',
              id: 'Pesawat tanpa awak stratosfer bertenaga surya (seperti Airbus Zephyr) harus menyimpan energi di siang hari untuk terbang selama 14 jam malam pada suhu -70°C tanpa menambah bobot pesawat.',
            },
            analysis: {
              en: 'Integrating lightweight Lithium-Sulfur pouch cells exceeding 430 Wh/kg allowed the aircraft to remain airborne for over 64 consecutive days in the stratosphere, halving battery pack mass compared to conventional aerospace LFP or NMC packs.',
              id: 'Penggunaan sel kantong Litium-Sulfur berdensitas di atas 430 Wh/kg memungkinkan pesawat mengudara terus-menerus selama lebih dari 64 hari di stratosfer dengan memangkas bobot baterai hingga separuhnya.',
            },
            takeaway: {
              en: 'Multielectron conversion chemistry unlocks transformative gravimetric energy density unreachable by standard intercalation transition metal oxides.',
              id: 'Kimia konversi multielektron menghadirkan lompatan densitas energi gravimetrik yang mustahil diraih oleh katoda oksida logam interkalasi standar.',
            },
          },
          keyTakeaways: {
            en: [
              'All-Solid-State Batteries replace flammable liquid solvents with solid ceramics or sulfides, eliminating fire hazards and permitting pure metallic lithium anodes.',
              'Critical Current Density (CCD) dictates charging speed limits to prevent lithium dendrite growth across grain boundaries.',
              'Lithium-Sulfur delivers transformative energy density (> 450 Wh/kg) by transferring 2 electrons per sulfur atom, while solid electrolytes prevent the destructive polysulfide shuttle.',
            ],
            id: [
              'Baterai All-Solid-State menggantikan cairan pelarut mudah terbakar dengan keramik atau sulfida padat, meniadakan bahaya api dan mengizinkan pemakaian anoda litium metalik.',
              'Densitas Arus Kritis (CCD) menentukan batas kecepatan pengisian daya untuk mencegah pertumbuhan dendrit di sepanjang batas butir kristal.',
              'Litium-Sulfur menghadirkan densitas energi transformatif (> 450 Wh/kg) melalui transfer 2 elektron per atom sulfur, di mana elektrolit padat mencegah fenomena perembesan polisulfida.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bess-q4-1',
          question: {
            en: 'What primary electrochemical limitation in liquid Lithium-Sulfur cells is resolved by implementing a solid-state electrolyte separator?',
            id: 'Kelemahan elektrokimia utama apa pada sel Litium-Sulfur cair yang diatasi oleh penerapan separator elektrolit padat?',
          },
          options: {
            en: [
              'The polysulfide shuttle effect, where soluble intermediate polysulfides diffuse to the anode and corrode the lithium metal',
              'The vaporization of copper busbars at room temperature',
              'The sudden decay of cathode potential to negative values',
              'The mechanical explosion of the aluminum pouch casing',
            ],
            id: [
              'Efek bolak-balik polisulfida, di mana molekul polisulfida terlarut berdifusi ke anoda dan mengorosi logam litium secara parasitik',
              'Penguapan busbar tembaga pada suhu ruangan',
              'Penurunan mendadak potensial katoda ke nilai negatif',
              'Ledakan mekanis pada casing kantong aluminium',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In liquid electrolytes, long-chain polysulfides (Li₂S₈, Li₂S₆) dissolve and migrate freely across the separator to the anode, causing severe parasitic self-discharge. Dense solid electrolytes act as an impermeable physical barrier.',
            id: 'Dalam elektrolit cair, molekul polisulfida larut dan bermigrasi melintasi separator menuju anoda litium, memicu pengosongan mandiri yang parah. Elektrolit padat padat bertindak sebagai penghalang fisik yang tak tertembus.',
          },
        },
        {
          id: 'bess-q4-2',
          question: {
            en: 'Why is external mechanical stack pressure (typically 1 to 5 MPa) required for sulfide-based All-Solid-State battery modules during operation?',
            id: 'Mengapa tekanan tumpukan mekanis eksternal (biasanya 1 hingga 5 MPa) diperlukan pada modul baterai All-Solid-State berbasis sulfida selama beroperasi?',
          },
          options: {
            en: [
              'To maintain microscopic intimate physical contact between solid particles during repeated expansion and contraction of the lithium anode',
              'To prevent atmospheric nitrogen from entering through the welded steel container',
              'To liquefy the solid ceramic electrolyte into a supercritical fluid',
              'To double the speed of sound through the battery casing',
            ],
            id: [
              'Untuk menjaga kontak fisik mikroskopis antar partikel padat selama siklus ekspansi dan kontraksi berulang pada anoda logam litium',
              'Untuk mencegah masuknya gas nitrogen atmosfer ke dalam kontainer baja las',
              'Untuk mencairkan elektrolit keramik padat menjadi fluida superkritis',
              'Untuk melipatgandakan kecepatan suara di dalam casing baterai',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Unlike liquids which conform naturally to rough surfaces, solid particles lose contact when lithium metal strips and plates during cycling, creating high-resistance interfacial voids unless maintained under active spring compression.',
            id: 'Berbeda dengan cairan yang membasahi permukaan secara alami, partikel padat kehilangan kontak saat logam litium larut dan mengendap selama pengisian, menimbulkan rongga hampa berhambatan tinggi kecuali diberi tekanan pegas konstan.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 5: MULTI-DAY LONG-DURATION STORAGE: IRON-AIR & METAL-AIR
    // -------------------------------------------------------------
    {
      id: 'bess-mod-5',
      topicId: 'battery-storage',
      order: 5,
      title: {
        en: 'Iron-Air & Multi-Day Metal-Air Energy Storage',
        id: 'Baterai Besi-Udara & Penyimpanan Multi-Hari Logam-Udara',
      },
      shortDescription: {
        en: 'Reversible iron rusting electrochemistry, 100-hour discharge economics, alkaline KOH kinetics, and seasonal grid decarbonization.',
        id: 'Elektrokimia karat besi bolak-balik, keekonomian pengosongan 100 jam, kinetika KOH alkalin, dan dekarbonisasi musiman jaringan listrik.',
      },
      durationMinutes: 22,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'battery-storage-lab',
      sections: [
        {
          id: 'bess-5-sec-1',
          title: {
            en: '1. Reversible Rusting Chemistry and 100-Hour Long-Duration Storage',
            id: '1. Kimia Perkaratan Bolak-Balik & Penyimpanan 100 Jam Multi-Hari',
          },
          content: {
            en: 'While lithium-ion and sodium-ion excel at 2-to-4 hour intraday energy shifting, achieving a 100% renewable power grid requires multi-day and seasonal resilience. Extended periods of low solar and wind production (known as "Dunkelflaute" in meteorology) can last from 3 to 7 consecutive days, during which standard lithium BESS packs drain completely within hours. Iron-Air ($Fe\\text{-Air}$) batteries provide an ultra-low-cost solution designed specifically for 100-hour continuous discharge:\n\n• The Reversible Rust Principle: The battery operates on the cyclical oxidation (rusting) and reduction (unrusting) of iron in an aqueous alkaline potassium hydroxide ($KOH$) electrolyte:\n  - Discharge (Rusting): The metallic iron ($Fe$) anode oxidizes, releasing electrons and reacting with hydroxide ions to form iron hydroxide:\n    $$\\text{Anode: } \\text{Fe} + 2\\text{OH}^- \\rightarrow \\text{Fe(OH)}_2 + 2e^- \\quad (E^0 = -0.877\\text{ V vs SHE})$$\n    At the breathing air cathode, atmospheric oxygen ($O_2$) is reduced via the Oxygen Reduction Reaction (ORR):\n    $$\\text{Cathode: } \\text{O}_2 + 2\\text{H}_2\\text{O} + 4e^- \\rightarrow 4\\text{OH}^- \\quad (E^0 = +0.401\\text{ V vs SHE})$$\n    Net Reaction: $2\\text{Fe} + \\text{O}_2 + 2\\text{H}_2\\text{O} \\rightarrow 2\\text{Fe(OH)}_2 \\quad (E_{\\text{cell}}^0 = 1.278\\text{ V})$\n  - Charge (Unrusting): Electrical energy drives the reverse reaction: iron hydroxide is reduced back to metallic iron while oxygen gas is released back into the atmosphere via the Oxygen Evolution Reaction (OER).\n• Radical Raw Material Economics: Iron is the most abundant and inexpensive engineering metal on Earth ($< \\$0.10/\\text{kg}$ vs $> \\$15/\\text{kg}$ for lithium), and atmospheric oxygen costs nothing. This reduces the cell-level capital expenditure below $\\$20/\\text{kWh}$, compared to $\\$80–\\$120/\\text{kWh}$ for lithium-ion.\n• Thermodynamic Trade-Offs: The round-trip efficiency of iron-air batteries is modest (45%–55%) due to high overpotentials in the bifunctional air electrode (ORR/OER) and parasitic hydrogen evolution ($2\\text{H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2 + 2\\text{OH}^-$). However, for multi-day emergency backup that cycles only 30–50 times per year, low CAPEX is vastly more important than high efficiency.',
            id: 'Kendati baterai litium-ion dan natrium-ion sangat unggul untuk pergeseran beban harian 2 hingga 4 jam, jaringan listrik 100% terbarukan memerlukan ketahanan multi-hari dan musiman. Periode panjang tanpa angin dan surya (dikenal sebagai "Dunkelflaute" dalam meteorologi) dapat berlangsung 3 hingga 7 hari berturut-turut, di mana BESS litium standar akan terkuras habis hanya dalam beberapa jam. Baterai Besi-Udara ($Fe\\text{-Air}$) menghadirkan solusi berbiaya ultra-murah yang dirancang khusus untuk durasi pengosongan kontinu 100 jam:\n\n• Prinsip Karat Bolak-Balik: Baterai ini bekerja berdasarkan siklus oksidasi (berkarat) dan reduksi (menghilangkan karat) dari logam besi di dalam larutan alkalin kalium hidroksida ($KOH$):\n  - Pengosongan (Berkarat): Anoda besi metalik ($Fe$) teroksidasi, melepaskan elektron dan bereaksi dengan ion hidroksida membentuk besi hidroksida:\n    $$\\text{Anoda: } \\text{Fe} + 2\\text{OH}^- \\rightarrow \\text{Fe(OH)}_2 + 2e^- \\quad (E^0 = -0,877\\text{ V vs SHE})$$\n    Pada katoda udara "bernapas", oksigen atmosfer ($O_2$) direduksi melalui Reaksi Reduksi Oksigen (ORR):\n    $$\\text{Katoda: } \\text{O}_2 + 2\\text{H}_2\\text{O} + 4e^- \\rightarrow 4\\text{OH}^- \\quad (E^0 = +0,401\\text{ V vs SHE})$$\n    Reaksi Total: $2\\text{Fe} + \\text{O}_2 + 2\\text{H}_2\\text{O} \\rightarrow 2\\text{Fe(OH)}_2 \\quad (E_{\\text{sel}}^0 = 1,278\\text{ V})$\n  - Pengisian (Penghilangan Karat): Energi listrik membalik reaksi: besi hidroksida direduksi kembali menjadi lempengan besi metalik sementara gas oksigen dilepaskan kembali ke udara bebas melalui Reaksi Evolusi Oksigen (OER).\n• Keekonomian Bahan Baku Revolusioner: Besi adalah logam rekayasa paling melimpah dan murah di Bumi ($< \\$0,10/\\text{kg}$ dibandingkan $> \\$15/\\text{kg}$ untuk litium), dan oksigen atmosferik tersedia gratis tanpa batas. Hal ini memangkas biaya modal sel di bawah $\\$20/\\text{kWh}$, dibandingkan $\\$80–\\$120/\\text{kWh}$ pada litium-ion.\n• Kompromi Termodinamika: Efisiensi bolak-balik baterai besi-udara berkisar antara 45%–55% akibat overpotensial kinetika elektroda udara (ORR/OER) dan reaksi parasit evolusi hidrogen ($2\\text{H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2 + 2\\text{OH}^-$). Namun untuk cadangan darurat multi-hari yang hanya bersiklus 30–50 kali per tahun, CAPEX yang sangat murah jauh lebih menentukan daripada efisiensi tinggi.',
          },
          formula: 'E_{\\text{net}} = \\Delta E^0 - \\eta_{\\text{ORR/OER}} - \\eta_{\\text{Fe}} - I R_{\\text{sol}} \\quad | \\quad \\eta_{\\text{RTE}} = \\frac{E_{\\text{discharge}}}{E_{\\text{charge}}} = \\frac{V_{\\text{dis}} \\cdot Q_{\\text{dis}}}{V_{\\text{chg}} \\cdot Q_{\\text{chg}}} \\approx 0.50',
          formulaExplanation: {
            en: 'Cell operational potential and round-trip efficiency equation. The wide voltage hysteresis between charge (~1.70 V) and discharge (~0.85 V) reflects the overpotentials of the oxygen and iron electrodes.',
            id: 'Potensial operasional sel dan efisiensi bolak-balik. Histeresis tegangan yang lebar antara pengisian (~1,70 V) dan pengosongan (~0,85 V) mencerminkan overpotensial elektroda oksigen dan besi.',
          },
          variables: [
            {
              symbol: '\\eta_{\\text{ORR/OER}}',
              name: { en: 'Bifunctional Air Electrode Overpotential', id: 'Overpotensial Elektroda Udara Bifungsional' },
              unit: 'V',
              description: {
                en: 'Kinetic polarization losses during oxygen reduction (discharge) and oxygen evolution (charge).',
                id: 'Rugi polarisasi kinetik selama reduksi oksigen (pengosongan) dan evolusi oksigen (pengisian).',
              },
            },
            {
              symbol: '\\eta_{\\text{RTE}}',
              name: { en: 'Round-Trip Energy Efficiency', id: 'Efisiensi Energi Bolak-Balik' },
              unit: '%',
              description: {
                en: 'Net AC-to-AC system efficiency of the multi-day storage asset (typically 45%–52%).',
                id: 'Efisiensi sistem AC-ke-AC netto dari aset penyimpanan multi-hari (umumnya 45%–52%).',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Suppression of Parasitic Hydrogen Evolution (HER)',
                id: 'Langkah 1: Penekanan Reaksi Parasit Evolusi Hidrogen (HER)'
              },
              math: '2\\text{H}_2\\text{O} + 2e^- \\rightleftharpoons \\text{H}_2 + 2\\text{OH}^- \\quad (E^0 = -0.828\\text{ V vs SHE})',
              explanation: {
                en: 'The standard potential of iron oxidation (-0.877 V) lies slightly more negative than water reduction (-0.828 V). Doping iron anodes with bismuth (Bi) or sulfide additives increases HER overpotential by > 200 mV, raising Coulombic efficiency above 95%.',
                id: 'Potensial standar oksidasi besi (-0,877 V) sedikit lebih negatif daripada reduksi air (-0,828 V). Penambahan aditif bismut (Bi) atau sulfida meningkatkan overpotensial HER sebesar > 200 mV, mendongkrak efisiensi Coulombic di atas 95%.',
              },
            },
            {
              title: {
                en: 'Step 2: LCOS Dominance in Multi-Day 100-Hour Storage',
                id: 'Langkah 2: Dominasi LCOS pada Penyimpanan Multi-Hari 100 Jam'
              },
              math: '\\text{CAPEX}_{\\text{total}} = P \\cdot C_{\\text{power}} + (P \\cdot t) \\cdot C_{\\text{energy}} \\quad \\text{For } t = 100\\text{ h: } \\text{CAPEX} \\approx 100 \\cdot C_{\\text{energy}}',
              explanation: {
                en: 'At 100 hours of discharge duration, energy capacity cost (C_energy) accounts for over 90% of total capital expenditure. An iron-air system at $20/kWh costs 5x less capital than lithium-ion at $100/kWh.',
                id: 'Pada durasi pengosongan 100 jam, biaya energi (C_energy) mendominasi lebih dari 90% belanja modal total. Sistem besi-udara pada $20/kWh membutuhkan modal 5 kali lebih rendah dibanding litium-ion pada $100/kWh.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Storage Technology', 'Nominal Duration', 'Estimated CAPEX ($/kWh)', 'Round-Trip Efficiency', 'Geographic Siting Constraints'],
              id: ['Teknologi Penyimpanan', 'Durasi Nominal', 'Estimasi CAPEX ($/kWh)', 'Efisiensi Bolak-Balik', 'Batasan Lokasi Geografis'],
            },
            rows: [
              {
                en: ['Lithium Iron Phosphate (LFP)', '2 – 4 hours', '$120 – $180 / kWh', '88% – 92%', 'Anywhere (Modular container)'],
                id: ['Litium Besi Fosfat (LFP)', '2 – 4 jam', '$120 – $180 / kWh', '88% – 92%', 'Fleksibel di mana saja (Kontainer)'],
              },
              {
                en: ['Iron-Air Multi-Day BESS', '100 hours (4+ days)', '< $25 / kWh', '45% – 52%', 'Anywhere (Modular container)'],
                id: ['Besi-Udara Multi-Hari', '100 jam (4+ hari)', '< $25 / kWh', '45% – 52%', 'Fleksibel di mana saja (Kontainer)'],
              },
              {
                en: ['Pumped Storage Hydropower (PSH)', '8 – 24 hours', '$80 – $160 / kWh', '70% – 80%', 'Severe (Requires twin mountain reservoirs)'],
                id: ['Pembangkit Pompa Air (PSH)', '8 – 24 jam', '$80 – $160 / kWh', '70% – 80%', 'Ketat (Perlu dua waduk elevasi gunung)'],
              },
              {
                en: ['Hydrogen Underground Caverns', 'Weeks to Months', '$40 – $70 / kWh', '30% – 42%', 'Requires salt caverns & gas turbines'],
                id: ['Hidrogen Gua Garam Bawah Tanah', 'Mingguan s/d Bulanan', '$40 – $70 / kWh', '30% – 42%', 'Perlu gua garam & turbin gas'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'Grid Dunkelflaute Defense: Form Energy 100-Hour Iron-Air Multi-Day Pilot',
              id: 'Ketahanan Dunkelflaute: Proyek Percontohan Besi-Udara 100 Jam Form Energy',
            },
            context: {
              en: 'Upper Midwest utilities face severe polar vortex events where temperatures drop below -25°C, solar insolation approaches zero for consecutive days, and extreme ice freezes wind turbine blades.',
              id: 'Perusahaan listrik Midwest AS menghadapi badai kutub ekstrem di mana suhu anjlok di bawah -25°C, radiasi surya mendekati nol selama berhari-hari, dan es membekukan bilah turbin angin.',
            },
            analysis: {
              en: 'Deploying a 10 MW / 1,000 MWh Iron-Air multi-day storage system provides 100 continuous hours of full-load power output, bridging the 4-day deficit without firing coal or peaking gas generators.',
              id: 'Pemasangan sistem penyimpanan besi-udara 10 MW / 1.000 MWh menghadirkan pasokan daya beban penuh selama 100 jam tanpa henti, menjembatani defisit 4 hari tanpa menyalakan generator batubara atau gas.',
            },
            takeaway: {
              en: '100-hour iron-air systems eliminate the multi-day renewable reliability gap at a fraction of the capital expenditure of over-building short-duration lithium-ion packs.',
              id: 'Sistem besi-udara 100 jam menuntaskan celah keandalan energi terbarukan multi-hari dengan biaya modal yang jauh lebih hemat dibanding memasang baterai litium-ion berlebihan.',
            },
          },
          keyTakeaways: {
            en: [
              'Iron-Air batteries utilize reversible electrochemical rusting (Fe ⇌ Fe(OH)₂) and atmospheric oxygen to provide 100 hours of continuous multi-day storage.',
              'Cell capital expenditure (< $20/kWh) is dramatically lower than all other battery chemistries due to the ultra-abundance of iron and ambient air.',
              'While round-trip efficiency (45%–52%) is lower than lithium, it is ideally matched for low-frequency, long-duration grid resilience and seasonal decarbonization.',
            ],
            id: [
              'Baterai Besi-Udara memanfaatkan proses perkaratan elektrokimia bolak-balik (Fe ⇌ Fe(OH)₂) dan oksigen atmosfer untuk menyediakan penyimpanan 100 jam multi-hari.',
              'Biaya modal sel (< $20/kWh) jauh lebih murah dibanding kimia baterai lainnya berkat kelimpahan luar biasa dari besi dan udara bebas.',
              'Meskipun efisiensi bolak-balik (45%–52%) lebih rendah dari litium, teknologi ini sangat optimal untuk cadangan ketahanan jaringan berdurasi panjang dan dekarbonisasi musiman.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'bess-q5-1',
          question: {
            en: 'Why is Iron-Air technology far more economically viable for 100-hour storage than Lithium-ion, despite its lower round-trip efficiency?',
            id: 'Mengapa teknologi Besi-Udara jauh lebih layak secara ekonomi untuk durasi penyimpanan 100 jam dibanding Litium-ion, kendati efisiensi bolak-baliknya lebih rendah?',
          },
          options: {
            en: [
              'At 100 hours of duration, capital energy cost ($/kWh) dominates over 90% of system expense, and iron/air raw materials cost under $20/kWh',
              'Iron-air cells generate electricity directly from radioactive decay',
              'Lithium cannot conduct electricity for durations longer than 4 hours',
              'Iron-air systems do not produce any heat during charging or discharging',
            ],
            id: [
              'Pada durasi 100 jam, biaya modal energi ($/kWh) mendominasi lebih dari 90% total biaya sistem, di mana bahan baku besi dan udara berharga di bawah $20/kWh',
              'Sel besi-udara menghasilkan listrik secara langsung dari peluruhan radioaktif',
              'Litium tidak mampu menghantarkan listrik untuk durasi lebih dari 4 jam',
              'Sistem besi-udara sama sekali tidak melepaskan panas selama pengisian atau pengosongan',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'For long-duration applications cycling only tens of times per year to buffer multi-day weather events, low CAPEX per kWh is paramount. The ultra-low cost of iron and ambient air outcompetes lithium-ion capital costs by a factor of five.',
            id: 'Untuk penyimpanan multi-hari yang hanya bersiklus puluhan kali per tahun saat terjadi cuaca ekstrem, biaya modal per kWh adalah faktor terpenting. Murahnya besi dan udara bebas mengungguli biaya modal litium-ion hingga lima kali lipat.',
          },
        },
        {
          id: 'bess-q5-2',
          question: {
            en: 'What occurs chemically during the charging phase of an Iron-Air battery?',
            id: 'Apa yang terjadi secara kimiawi selama fase pengisian daya pada baterai Besi-Udara?',
          },
          options: {
            en: [
              'Iron hydroxide is reduced back into metallic iron while oxygen gas is released back into the atmosphere',
              'Metallic iron burns into iron oxide rust while consuming pure nitrogen gas',
              'Water is permanently converted into solid sulfuric acid crystals',
              'The air cathode absorbs all atmospheric carbon dioxide permanently',
            ],
            id: [
              'Besi hidroksida direduksi kembali menjadi lempengan besi metalik sementara gas oksigen dilepaskan kembali ke atmosfer',
              'Besi metalik terbakar menjadi karat besi sembari mengonsumsi gas nitrogen murni',
              'Air diubah secara permanen menjadi kristal asam sulfat padat',
              'Katoda udara menyerap seluruh karbon dioksida atmosfer secara permanen',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'During recharge, electrical power reverses the rust reaction: Fe(OH)₂ + 2e⁻ → Fe + 2OH⁻ (unrusting the iron anode), and 4OH⁻ → O₂ + 2H₂O + 4e⁻ releases oxygen back into ambient air via the Oxygen Evolution Reaction (OER).',
            id: 'Saat diisi ulang, daya listrik membalik reaksi perkaratan: Fe(OH)₂ + 2e⁻ → Fe + 2OH⁻ (mengembalikan karat menjadi besi metalik), dan 4OH⁻ → O₂ + 2H₂O + 4e⁻ melepaskan gas oksigen kembali ke atmosfer via reaksi OER.',
          },
        },
      ],
    },
  ],
};
