import { Topic } from '@/types/learning';

export const hybridVehiclesTopic: Topic = {
  id: 'hybrid-vehicles',
  title: {
    en: 'Hybrid Electric Vehicles & Powertrain Electrification',
    id: 'Kendaraan Listrik Hibrida & Elektrifikasi Powertrain',
  },
  tagline: {
    en: 'Mild Hybrid (48V), Series-Parallel HEV, Plug-in PHEV, and Range-Extender EREV thermodynamic & electrical dynamics.',
    id: 'Dinamika termodinamika & elektrikal Mild Hybrid (48V), Series-Parallel HEV, Plug-in PHEV, dan Range-Extender EREV.',
  },
  description: {
    en: 'Explore the complete engineering taxonomy of hybrid automotive propulsion. From 48V Belt-driven Starter Generators (BSG) smoothing start-stop transitions to planetary gear electro-mechanical power-split continuously variable transmissions (e-CVT / Atkinson cycle engines), parallel multi-clutch P0–P4 PHEV architectures, and pure series Range-Extender (EREV) systems where an internal combustion engine acts strictly as an optimal-BSFC generator. Simulate real-time mechanical and electrical torque split, planetary sun/carrier/ring gear kinematics, battery buffer state-of-charge management, and regenerative braking deceleration in living 3D.',
    id: 'Pelajari taksonomi rekayasa lengkap propulsi otomotif hibrida. Mulai dari Belt-driven Starter Generator (BSG) 48V yang meniadakan getaran start-stop hingga transmisi power-split roda gigi planet e-CVT (mesin siklus Atkinson), arsitektur paralel multi-clutch P0–P4 pada PHEV, serta sistem serial murni Extended-Range Electric Vehicle (EREV) di mana mesin bensin beroperasi eksklusif sebagai generator berefisiensi termal puncak (BSFC minimum). Simulasikan pembagian torsi mekanis dan elektrikal, kinematika roda gigi planet, manajemen SoC baterai penyangga, dan deselerasi pengereman regeneratif dalam 3D interaktif.',
  },
  category: {
    en: 'Automotive & Powertrain Engineering',
    id: 'Rekayasa Otomotif & Powertrain',
  },
  colorAccent: 'orange',
  badgeColor: 'from-orange-500 to-amber-600',
  iconName: 'Car',
  modules: [
    // -------------------------------------------------------------
    // PART 1: MILD HYBRID ELECTRIC VEHICLES (MHEV) & 48V ARCHITECTURE
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-1',
      topicId: 'hybrid-vehicles',
      order: 1,
      title: {
        en: 'Mild Hybrid (MHEV) & 48V Starter-Generator Electrification',
        id: 'Mild Hybrid (MHEV) & Elektrifikasi Starter-Generator 48V',
      },
      shortDescription: {
        en: '48V Belt-driven and Integrated Starter Generators (BSG/ISG), crankshaft torque assist, regenerative coasting, and start-stop NVH.',
        id: 'Starter Generator berpenggerak sabuk dan terintegrasi (48V BSG/ISG), asistensi torsi kruk as, peluncuran regeneratif, dan NVH start-stop.',
      },
      durationMinutes: 20,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'hybrid-powertrain',
      sections: [
        {
          id: 'hyb-1-sec-1',
          title: {
            en: '1. The 48-Volt Dual-Voltage Electrical Bus Architecture',
            id: '1. Arsitektur Bus Listrik Tegangan Ganda 48-Volt',
          },
          content: {
            en: 'Mild Hybrid Electric Vehicles (MHEVs) represent the foundational entry point into automotive electrification. Unlike full hybrids that operate at hazardous high voltages (200V–800V DC requiring dedicated orange high-voltage safety conduits and galvanic isolation interlocks), MHEVs exploit the 48-volt direct current standard—the precise upper boundary of international low-voltage electrical safety regulations (SELV: Safety Extra-Low Voltage, defined as ≤ 60V DC under ISO 6469-3):\n\n• Dual-Voltage Architecture: Modern MHEVs maintain two parallel electrical subsystems joined by a bidirectional buck-boost DC-DC converter (typically 1.5–3.0 kW continuous throughput). The legacy 12V lead-acid or small lithium network continues to power low-voltage electronic control units (ECUs), cabin ambient lighting, door latches, and infotainment. The isolated 48V bus energizes high-power dynamic accessories: electric superchargers (e-turbos spinning at >70,000 RPM within 250 ms), active electromechanical anti-roll stabilization bars (48V actuators providing up to 1,200 Nm of counter-roll torque), electric air conditioning compressors, and the primary starter-generator machine.\n• 48V Lithium-ion Buffer Battery: A compact 0.4–1.0 kWh battery pack (using LFP, NMC, or LTO chemistries) provides high discharge/charge C-rates (15C–30C continuous). It absorbs high-amperage braking kinetic bursts (up to 12–15 kW) and discharges rapid bursts of electric assist.\n• Starter-Generator Machine Configurations:\n  - P0 Architecture: Belt-driven Starter Generator (BSG or BiSG) mounted on the engine accessory drive belt. It replaces the traditional alternator, driving the crankshaft through an elastomeric ribbed serpentine belt with a dynamic dual-tensioner pulley system.\n  - P1 Architecture: Crankshaft-mounted Integrated Starter Generator (ISG) sandwiched directly between the engine flywheel and clutch/torque converter. Zero belt slippage, near-instantaneous spin-up speeds, and higher peak torque coupling (>150 Nm).\n  - P2 Architecture: Motor mounted at transmission input, separated from the ICE via an electromechanical disconnect clutch, allowing brief pure electric coasting ("sailing" with engine shut off).',
            id: 'Kendaraan Mild Hybrid Electric Vehicle (MHEV) merupakan pintu masuk paling efisien menuju elektrifikasi propulsi otomotif. Berbeda dengan full hybrid yang beroperasi pada tegangan tinggi berbahaya (200V–800V DC yang memerlukan pipa isolasi oranye khusus dan interlock proteksi sentuhan), MHEV memanfaatkan standar 48-volt arus searah—batas atas regulasi keselamatan voltase rendah internasional (SELV: Safety Extra-Low Voltage, ditetapkan ≤ 60V DC berdasarkan ISO 6469-3):\n\n• Arsitektur Tegangan Ganda (Dual-Voltage): MHEV modern mempertahankan dua jaringan kelistrikan paralel yang dijembatani konverter DC-DC buck-boost dua arah (kapasitas 1,5–3,0 kW kontinu). Jaringan lama 12V (aki timbal-asam atau litium kecil) tetap menyuplai unit kendali mesin (ECU), lampu kabin, sensor bodi, dan sistem infotainment. Sedangkan bus 48V menopang aktuator beban tinggi: kompresor AC elektrik, supercharger elektrik (e-turbo yang berputar >70.000 RPM dalam 250 ms untuk meniadakan lag), stabilisator suspensi aktif anti-roll 48V (torsi penahan hingga 1.200 Nm), serta mesin starter-generator utama.\n• Baterai Penyangga Litium-ion 48V: Modul baterai berkapasitas ringkas 0,4–1,0 kWh (sel LFP, NMC, atau LTO) yang mampu menerima dan melepas laju arus sangat tinggi (15C–30C). Baterai ini menyerap daya kinetik pengereman hingga 12–15 kW dan menyalurkannya kembali sebagai dorongan akselerasi instan.\n• Konfigurasi Penempatan Mesin Starter-Generator:\n  - Arsitektur P0: Belt-driven Starter Generator (BSG/BiSG) yang terpasang pada sabuk aksesori mesin menggantikan alternator konvensional. Menggerakkan poros engkol melalui sabuk bergerigi dengan sistem puli penegang ganda aktif.\n  - Arsitektur P1: Integrated Starter Generator (ISG) yang dibaut langsung pada roda gila (flywheel) poros engkol di depan kopling. Meniadakan risiko selip sabuk, memungkinkan akselerasi putaran mesin sekejap mata, dan menyalurkan torsi puncak lebih tinggi (>150 Nm).\n  - Arsitektur P2: Motor terpasang pada poros input transmisi dengan kopling pemutus mekanis terhadap mesin bensin, memungkinkan mobil meluncur halus ("engine-off coasting/sailing") dengan mesin bensin mati total pada kecepatan jalan bebas hambatan.',
          },
          formula: 'P_{\\text{BSG}} = V_{\\text{bus}} \\cdot I_{\\text{bus}} = T_{\\text{crank}} \\cdot \\omega_{\\text{crank}} + I^2 R_{\\text{int}} + P_{\\text{iron}}',
          formulaExplanation: {
            en: 'Electrical-mechanical power conservation for a 48V starter-generator. Total electrical power delivered by the 48V bus converts into mechanical cranking torque at engine angular velocity (T_crank · ω_crank) minus internal copper Joule heating (I² R_int) and core iron hysteresis/eddy-current losses (P_iron).',
            id: 'Konservasi daya listrik-mekanis pada starter-generator 48V. Daya listrik total dari bus 48V diubah menjadi torsi mekanis poros engkol pada kecepatan sudut mesin (T_crank · ω_crank) dikurangi rugi panas tembaga Joule (I² R_int) dan rugi histeresis/arus pusar inti besi (P_iron).',
          },
          variables: [
            {
              symbol: 'V_{\\text{bus}}',
              name: { en: '48V Subsystem Bus Voltage', id: 'Tegangan Bus Subsistem 48V' },
              unit: 'V (nominal 48V, operating 36V–54V)',
              description: {
                en: 'Operating terminal voltage of the 48V lithium-ion buffer pack.',
                id: 'Tegangan terminal operasi paket baterai penyangga litium-ion 48V.',
              },
            },
            {
              symbol: 'I_{\\text{bus}}',
              name: { en: 'Bus Current', id: 'Arus Listrik Bus' },
              unit: 'A (up to 250A peak)',
              description: {
                en: 'Current drawn during electric torque boost or delivered during regenerative braking.',
                id: 'Arus listrik yang ditarik saat boost torsi atau dialirkan saat pengereman regeneratif.',
              },
            },
            {
              symbol: 'T_{\\text{crank}}',
              name: { en: 'Crankshaft Cranking/Assist Torque', id: 'Torsi Bantuan Poros Engkol' },
              unit: 'Nm (typical 40–80 Nm at belt, 150–200 Nm at crank)',
              description: {
                en: 'Instantaneous mechanical torque delivered directly to the engine crankshaft.',
                id: 'Torsi mekanis instan yang diteruskan langsung ke poros engkol mesin.',
              },
            },
            {
              symbol: '\\omega_{\\text{crank}}',
              name: { en: 'Crankshaft Angular Speed', id: 'Kecepatan Sudut Poros Engkol' },
              unit: 'rad/s (RPM × π / 30)',
              description: {
                en: 'Rotational speed of the internal combustion engine crankshaft.',
                id: 'Kecepatan putaran rotasi poros engkol mesin pembakaran internal.',
              },
            },
            {
              symbol: 'R_{\\text{int}}',
              name: { en: 'Internal Stator Winding Resistance', id: 'Resistansi Belitan Stator Internal' },
              unit: 'mΩ (typical 8–18 mΩ)',
              description: {
                en: 'Phase winding resistance causing I²R Joule heating copper losses.',
                id: 'Resistansi belitan kawat fasa tembaga yang memicu rugi panas Joule I²R.',
              },
            },
            {
              symbol: 'P_{\\text{iron}}',
              name: { en: 'Core Magnetic Iron Losses', id: 'Rugi Magnetik Inti Besi' },
              unit: 'W',
              description: {
                en: 'Electromagnetic eddy-current and hysteresis losses in the stator laminations.',
                id: 'Rugi arus pusar dan histeresis elektromagnetik pada inti laminasi stator.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Architecture Position', 'Mechanical Coupling', 'Max Boost Power', 'Regen Efficiency', 'Engine-Off Sailing Ability'],
              id: ['Posisi Arsitektur', 'Kopling Mekanis', 'Daya Boost Maksimum', 'Efisiensi Regenerasi', 'Kemampuan Meluncur Mesin Mati'],
            },
            rows: [
              {
                en: ['P0 (Belt-Driven BSG)', 'Serpentine belt to front engine accessory pulley', '10–12 kW peak', '~50–65% (Belt friction losses)', 'No (Engine must turn if wheels turn unless detached)'],
                id: ['P0 (BSG Sabuk Aksesori)', 'Sabuk bergerigi ke puli aksesori depan mesin', '10–12 kW puncak', '~50–65% (Rugi gesekan sabuk)', 'Tidak (Mesin tetap berputar kecuali terputus transmisi)'],
              },
              {
                en: ['P1 (Crankshaft ISG)', 'Bolted directly to crankshaft/flywheel hub', '12–16 kW peak', '~70–80% (Zero belt slip)', 'No (Direct rigid connection to engine rotating mass)'],
                id: ['P1 (ISG Roda Gila)', 'Dibaut langsung pada poros engkol / flywheel', '12–16 kW puncak', '~70–80% (Bebas selip sabuk)', 'Tidak (Terhubung kaku dengan massa berputar mesin)'],
              },
              {
                en: ['P2 (Transmission Input)', 'Between disconnect clutch and gearbox input shaft', '15–25 kW peak', '~85–90% (ICE can be mechanically decoupled)', 'Yes (Clutch disengages, vehicle sails on electric momentum)'],
                id: ['P2 (Input Transmisi)', 'Di antara kopling pemutus dan input gearbox', '15–25 kW puncak', '~85–90% (Mesin bensin dapat dilepas mekanis)', 'Ya (Kopling terbuka, mobil meluncur mulus tanpa mesin menyala)'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'MHEVs operate strictly within the Safety Extra-Low Voltage (SELV ≤ 60V) standard, eliminating the high cost of galvanic isolation interlocks.',
              'A bidirectional DC-DC converter exchanges energy between the 48V high-power buffer network and the 12V vehicle electronics network.',
              'MHEVs cannot propel the vehicle on electric power alone for prolonged driving cycles, but deliver 10–15% fuel economy gains by eliminating idle fuel burn and capturing braking energy.',
            ],
            id: [
              'MHEV beroperasi ketat di dalam standar voltase aman ekstra rendah (SELV ≤ 60V), memangkas biaya mahal interlock isolasi keselamatan.',
              'Konverter DC-DC dua arah mendistribusikan energi antara jaringan penyimpan daya 48V dan jaringan kelistrikan umum 12V.',
              'MHEV tidak dapat melajukan mobil murni dengan motor listrik untuk jarak jauh, namun memangkas konsumsi BBM sebesar 10–15% melalui eliminasi stasioner dan pemulihan energi kinetik.',
            ],
          },
        },
        {
          id: 'hyb-1-sec-2',
          title: {
            en: '2. Crankshaft Torque Assist, Turbo-Lag Compensation & Start-Stop NVH',
            id: '2. Asistensi Torsi Kruk As, Kompensasi Turbo-Lag & NVH Start-Stop',
          },
          content: {
            en: 'The core operational advantages of a 48V MHEV powertrain lie in dynamic transient engine management:\n\n1. Seamless Start-Stop Operation (< 350 ms): Traditional 12V pinion-gear starter motors engage with an audible mechanical solenoid click and shake the vehicle chassis due to low cranking rotational velocity (~120 RPM), passing through engine natural resonant frequencies. In contrast, a 48V BSG or ISG spins the crankshaft directly to idle speed (800–1,000 RPM) within 250–300 ms before injecting fuel or triggering ignition. This enables completely imperceptible engine restart at traffic lights or during coasting.\n2. Torque Assist and Turbo-Lag Elimination: Small-displacement turbocharged engines (downsized for highway thermal efficiency) suffer from low-end transient hesitation because exhaust gas enthalpy is insufficient to spool the turbocharger turbine wheel below 1,800 RPM. The 48V starter-generator instantly injects up to 60–120 Nm of electric torque into the crankshaft within 50 milliseconds of accelerator pedal tip-in, bridging the torque curve until turbo boost pressure reaches steady state.\n3. Coasting and Engine-Off Sailing: When cruising at highway speeds (e.g., 50–130 km/h) and the driver lifts off the throttle, advanced 48V systems decouple the transmission or shut off fuel injection completely, letting the vehicle glide silently with near-zero aerodynamic and frictional engine braking losses.',
            id: 'Keunggulan operasional utama powertrain MHEV 48V terletak pada manajemen transien dinamika mesin bensin:\n\n1. Sistem Start-Stop Nyaris Tanpa Getaran (< 350 ms): Motor starter pinion 12V konvensional bekerja dengan bunyi sentakan mekanis keras dan mengguncang sasis karena putaran awalnya rendah (~120 RPM) yang melewati frekuensi resonansi mesin. Sebaliknya, BSG atau ISG 48V memutar poros engkol langsung ke putaran stasioner (800–1.000 RPM) dalam waktu 250–300 ms sebelum bahan bakar disemprotkan dan busi dinyalakan. Hasilnya, penyalaan mesin di lampu merah berlangsung mulus tanpa getaran (NVH sangat halus).\n2. Asistensi Torsi & Eliminasi Turbo-Lag: Mesin kubikasi kecil berturbocharger (downsizing) sering mengalami lag respons akselerasi bawah karena entalpi gas buang belum cukup memutar turbin turbo di bawah 1.800 RPM. Motor 48V langsung menyuntikkan torsi listrik instan 60–120 Nm ke kruk as dalam 50 milidetik sejak pedal gas diinjak, mengisi kekosongan torsi hingga tekanan boost turbo terbentuk sempurna.\n3. Peluncuran Bebas Hambatan (Coasting / Sailing): Saat melaju stabil di jalan tol dan pengemudi melepas pedal gas, sistem 48V mematikan suplai bahan bakar atau memutus kopling transmisi, membiarkan mobil meluncur bebas tanpa hambatan tahanan kompresi mesin (engine braking).',
          },
          formula: 'T_{\\text{crank, net}} = T_{\\text{ICE}}(\\omega, p_{\\text{boost}}) + i_{\\text{belt}} \\cdot T_{\\text{BSG}}(I_{\\text{bus}}) - J_{\\text{eq}} \\frac{d\\omega}{dt}',
          formulaExplanation: {
            en: 'Net crankshaft accelerating torque balancing engine combustion torque, gear/pulley ratio multiplied BSG electric motor torque, and combined rotational drivetrain inertia (J_eq dω/dt).',
            id: 'Torsi percepatan netto kruk as yang memadukan torsi pembakaran internal mesin, torsi motor listrik BSG dikali rasio puli sabuk, dan inersia putar ekuivalen drivetrain (J_eq dω/dt).',
          },
          variables: [
            {
              symbol: 'T_{\\text{ICE}}',
              name: { en: 'Engine Combustion Torque', id: 'Torsi Pembakaran Mesin' },
              unit: 'Nm',
              description: {
                en: 'Torque generated by the internal combustion engine as a function of RPM and manifold boost pressure.',
                id: 'Torsi yang dihasilkan mesin pembakaran internal sebagai fungsi RPM dan tekanan boost intake manifold.',
              },
            },
            {
              symbol: 'i_{\\text{belt}}',
              name: { en: 'Accessory Belt Pulley Ratio', id: 'Rasio Puli Sabuk Aksesori' },
              unit: 'Dimensionless (typical 2.5–3.0)',
              description: {
                en: 'Speed ratio between the engine crankshaft damper pulley and BSG rotor pulley.',
                id: 'Rasio perbandingan putaran antara puli poros engkol mesin dan puli motor BSG.',
              },
            },
            {
              symbol: 'T_{\\text{BSG}}',
              name: { en: 'BSG Motor Electromagnetic Torque', id: 'Torsi Elektromagnetik Motor BSG' },
              unit: 'Nm (typical 40–80 Nm at motor shaft)',
              description: {
                en: 'Electromagnetic boost or regenerative braking torque delivered by the 48V machine.',
                id: 'Torsi dorong elektromagnetik atau pengereman regeneratif yang disalurkan motor 48V.',
              },
            },
            {
              symbol: 'J_{\\text{eq}}',
              name: { en: 'Equivalent Drivetrain Rotational Inertia', id: 'Inersia Putar Ekuivalen Drivetrain' },
              unit: 'kg·m²',
              description: {
                en: 'Effective rotational inertia of reciprocating pistons, crankshaft, flywheel, and reflected transmission gears.',
                id: 'Inersia rotasi efektif piston, kruk as, roda gila, dan pantulan inersia transmisi.',
              },
            },
            {
              symbol: '\\frac{d\\omega}{dt}',
              name: { en: 'Crankshaft Angular Acceleration', id: 'Percepatan Sudut Kruk As' },
              unit: 'rad/s²',
              description: {
                en: 'Rate of change of engine rotational speed during start-stop spin-up or dynamic acceleration.',
                id: 'Laju perubahan kecepatan sudut mesin saat proses start-stop atau akselerasi dinamis.',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'Eliminating Low-End Turbo Hesitation in Downsized 2.0L Powertrains',
              id: 'Menghilangkan Gejala Turbo-Lag pada Mesin Downsized 2.0L Turbo',
            },
            context: {
              en: 'A modern 2.0-liter turbocharged four-cylinder engine produces 300 hp at 5,500 RPM with a large twin-scroll turbocharger, but takes 1.4 seconds to reach 90% peak torque when accelerating from 1,200 RPM.',
              id: 'Mesin 2.0-liter empat silinder turbocharger menghasilkan 300 hp pada 5.500 RPM dengan turbo twin-scroll besar, namun membutuhkan waktu 1,4 detik untuk mencapai 90% torsi puncak saat berakselerasi dari 1.200 RPM.',
            },
            analysis: {
              en: 'By integrating a 48V 14 kW P0 belt-starter generator paired with an electric auxiliary compressor (e-turbo), the powertrain injects 80 Nm of immediate electric torque within 80 ms, while the 48V electric compressor pressurizes the intake manifold to 1.5 bar before the exhaust turbine spools.',
              id: 'Dengan memasang sistem BSG 48V 14 kW tipe P0 yang dipadu kompresor elektrik 48V (e-turbo), sistem menyuntikkan torsi instan 80 Nm dalam 80 ms, sementara kompresor elektrik memampatkan udara masuk hingga 1,5 bar sebelum turbin gas buang berputar penuh.',
            },
            takeaway: {
              en: 'Transient acceleration response matches that of a naturally aspirated 3.5L V6 engine while reducing WLTP urban fuel consumption by 14.2%.',
              id: 'Respons akselerasi instan menyamai mesin 3.5L V6 naturally aspirated dengan penurunan konsumsi bahan bakar perkotaan WLTP sebesar 14,2%.',
            },
          },
          keyTakeaways: {
            en: [
              '48V BSG and ISG eliminate start-stop vibration by cranking the engine through resonance directly to 800+ RPM in under 300 ms.',
              'Immediate low-RPM electric torque fill bridges the boost delay (turbo lag) inherent to heavily downsized turbocharged engines.',
              'Kinetic energy recaptured during deceleration recharges the 48V buffer battery without requiring any plug-in charging cables.',
            ],
            id: [
              'BSG dan ISG 48V meniadakan getaran start-stop dengan memutar kruk as langsung melompati frekuensi resonansi hingga 800+ RPM dalam waktu di bawah 300 ms.',
              'Penyaluran torsi elektrik instan di RPM rendah menutup jeda tekanan dorong (turbo lag) pada mesin bensin berukuran kecil.',
              'Energi kinetik yang dipulihkan saat deselerasi mengisi ulang baterai 48V tanpa memerlukan pengisian kabel eksternal sama sekali.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyb-q1-1',
          question: {
            en: 'Why do Mild Hybrid Electric Vehicles (MHEVs) utilize a 48-volt electrical bus instead of high-voltage systems (200V–800V)?',
            id: 'Mengapa kendaraan Mild Hybrid (MHEV) menggunakan jaringan kelistrikan 48-volt dan bukan sistem tegangan tinggi (200V–800V)?',
          },
          options: {
            en: [
              '48V is below the 60V DC Safety Extra-Low Voltage (SELV) threshold, eliminating the cost and weight of high-voltage isolation conduits and interlocks',
              '48V generates higher electric power than 400V systems',
              'Lead-acid batteries cannot operate below 48 volts',
              '48V eliminates the need for an internal combustion engine entirely',
            ],
            id: [
              '48V berada di bawah ambang batas keselamatan SELV (≤ 60V DC), sehingga menghemat biaya dan bobot sistem proteksi insulasi tegangan tinggi',
              'Tegangan 48V menghasilkan daya listrik yang lebih besar daripada sistem 400V',
              'Aki timbal-asam tidak dapat bekerja di bawah tegangan 48 volt',
              '48V meniadakan kebutuhan akan mesin pembakaran internal secara total',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Under international electrical safety standards (such as ISO 6469-3), voltages at or below 60V DC are classified as Safety Extra-Low Voltage (SELV). They do not pose fatal electric shock risks, avoiding orange protective conduits and active chassis isolation monitoring.',
            id: 'Berdasarkan standar keselamatan listrik internasional (seperti ISO 6469-3), tegangan DC hingga 60V dikategorikan sebagai Safety Extra-Low Voltage (SELV). Tegangan ini aman dari bahaya sengatan listrik mematikan, sehingga tidak memerlukan pipa pelindung oranye khusus dan sensor kebocoran isolasi bodi yang mahal.',
          },
        },
        {
          id: 'hyb-q1-2',
          question: {
            en: 'What is the primary operational difference between a P0 and a P2 Mild Hybrid configuration?',
            id: 'Apakah perbedaan operasional utama antara konfigurasi Mild Hybrid P0 dan P2?',
          },
          options: {
            en: [
              'P0 is belt-driven at the engine front, whereas P2 is positioned at the transmission input with a clutch allowing engine-off sailing',
              'P0 connects directly to the rear differential, while P2 drives the alternator',
              'P0 uses alternating current, while P2 uses direct current only',
              'P0 allows pure electric driving for 50 kilometers, whereas P2 cannot',
            ],
            id: [
              'P0 digerakkan sabuk di depan mesin bensin, sedangkan P2 berada di input transmisi dengan kopling pemutus untuk mode peluncuran mesin mati (sailing)',
              'P0 terhubung langsung ke gardan belakang, sedangkan P2 menggerakkan alternator',
              'P0 menggunakan arus bolak-balik, sedangkan P2 hanya menggunakan arus searah',
              'P0 mampu melaju murni bertenaga listrik sejauh 50 km, sedangkan P2 tidak bisa',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In a P0 architecture, the starter-generator is coupled via a serpentine belt to the crankshaft accessory drive. In a P2 architecture, the electric machine is located between the engine disconnect clutch and the transmission input shaft, allowing the engine to stop while the car rolls on electric momentum.',
            id: 'Pada arsitektur P0, motor starter-generator dihubungkan sabuk serpentine ke puli kruk as. Pada arsitektur P2, motor listrik terletak di antara kopling pemutus mesin dan poros transmisi, memungkinkan mesin bensin mati total saat mobil meluncur tanpa hambatan friksi.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: FULL HYBRID ELECTRIC VEHICLES (HEV) & PLANETARY POWER-SPLIT
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-2',
      topicId: 'hybrid-vehicles',
      order: 2,
      title: {
        en: 'Full Hybrid (HEV) & Planetary Power-Split e-CVT Dynamics',
        id: 'Full Hybrid (HEV) & Dinamika Power-Split Roda Gigi Planet e-CVT',
      },
      shortDescription: {
        en: 'Series-Parallel architecture, planetary epicyclic gear sets (Sun, Carrier, Ring), MG1/MG2 dual motor-generators, and Atkinson cycle efficiency.',
        id: 'Arsitektur Seri-Paralel, roda gigi episiklik planet (Sun, Carrier, Ring), motor-generator ganda MG1/MG2, dan efisiensi siklus Atkinson.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'hybrid-powertrain',
      sections: [
        {
          id: 'hyb-2-sec-1',
          title: {
            en: '1. Epicyclic Planetary Gear Train Kinematics and the e-CVT Concept',
            id: '1. Kinematika Roda Gigi Planet Episiklik & Konsep e-CVT',
          },
          content: {
            en: 'Full Hybrid Electric Vehicles (HEVs)—exemplified by Toyota\'s Hybrid Synergy Drive (HSD)—utilize a Series-Parallel architecture centered around a single epicyclic planetary gear power-split device (PSD). Unlike conventional automatic transmissions with discrete stepped planetary gear clutches, or mechanical belt-and-pulley CVTs that suffer from hydraulic pump parasitic drag and belt friction wear, the hybrid e-CVT has no clutches, torque converter, or belts:\n\n• The Three Planetary Elements:\n  1. Sun Gear (Center, Teeth $Z_s$): Coupled directly to Motor-Generator 1 (MG1). MG1 functions primarily as an engine starter, electrical generator, and dynamic speed controller.\n  2. Planet Carrier (Spider, carrying planet pinions): Mechanically locked to the crankshaft of the Atkinson-cycle internal combustion engine (ICE).\n  3. Ring Gear (Outer Annulus, Teeth $Z_r$): Mechanically meshed with the final drive differential leading to the driving wheels, and rigidly coupled to Motor-Generator 2 (MG2).\n\n• Kinematic Willis Equation: The angular velocities of the three elements are constrained by the planetary gear tooth ratio $\\rho = Z_r / Z_s$ (typically $\\rho \\approx 2.6$):\n$$\\omega_c (1 + \\rho) = \\omega_s + \\rho \\omega_r$$\nBecause the wheel speed directly locks the ring gear speed ($\\omega_r = i_{\\text{diff}} \\cdot \\omega_{\\text{wheel}}$), the hybrid control computer continuously varies the electrical rotation of MG1 ($\\omega_s$) to place the internal combustion engine ($\\omega_c$) at its most fuel-efficient RPM, regardless of vehicle road speed!\n\n• Torque Split Principle: Planetary gear static force balance dictates that torque applied at the engine carrier splits in a fixed invariant mechanical ratio:\n$$T_s = -\\frac{1}{1 + \\rho} T_{\\text{ICE}} \\quad \\text{and} \\quad T_r = \\frac{\\rho}{1 + \\rho} T_{\\text{ICE}}$$\nApproximately 72% of engine mechanical torque transfers directly to the ring gear (wheels), while 28% of torque reacts against MG1, turning it as an electrical generator. The generated electricity flows through the bidirectional inverter to drive MG2, rejoining mechanical torque at the wheels.',
            id: 'Full Hybrid Electric Vehicle (HEV)—yang dipelopori oleh sistem Toyota Hybrid Synergy Drive (HSD)—mengandalkan arsitektur Seri-Paralel berbasis mekanisme pembagi daya roda gigi planet episiklik (Power-Split Device / PSD). Berbeda dengan transmisi otomatis konvensional bergigi rasio tetap atau CVT sabuk baja yang rentan selip dan gesekan hidrolis, e-CVT hibrida tidak memerlukan kopling gesek, konverter torsi, ataupun sabuk baja:\n\n• Tiga Elemen Roda Gigi Planet:\n  1. Roda Gigi Matahari (Sun Gear, Jumlah gigi $Z_s$): Terhubung langsung ke Motor-Generator 1 (MG1). MG1 bertindak sebagai starter mesin, generator listrik, serta pengatur kecepatan putar mesin bensin.\n  2. Pembawa Planet (Planet Carrier): Mengikat roda gigi planet kecil dan terhubung langsung ke poros engkol mesin pembakaran internal (ICE) siklus Atkinson.\n  3. Roda Gigi Cincin (Ring Gear / Annulus, Jumlah gigi $Z_r$): Terhubung kaku dengan poros penggerak roda melalui gardan akhir (final drive), dan terhubung langsung ke Motor-Generator 2 (MG2).\n\n• Persamaan Kinematika Willis: Kecepatan sudut ketiga komponen diikat oleh rasio jumlah gigi roda gigi cincin terhadap matahari $\\rho = Z_r / Z_s$ (umumnya $\\rho \\approx 2,6$):\n$$\\omega_c (1 + \\rho) = \\omega_s + \\rho \\omega_r$$\nKarena kecepatan roda mobil mengunci kecepatan ring gear ($\\omega_r = i_{\\text{diff}} \\cdot \\omega_{\\text{wheel}}$), komputer kendali hibrida dapat mengatur kecepatan putar MG1 ($\\omega_s$) secara elektrik untuk memposisikan putaran mesin bensin ($\\omega_c$) pada titik efisiensi termal puncak, berapa pun kecepatan laju mobil di jalan!\n\n• Prinsip Pembagian Torsi (Torque Split): Keseimbangan gaya statis roda gigi planet menetapkan bahwa torsi mesin bensin selalu terbagi dalam proporsi mekanis tetap:\n$$T_s = -\\frac{1}{1 + \\rho} T_{\\text{ICE}} \\quad \\text{dan} \\quad T_r = \\frac{\\rho}{1 + \\rho} T_{\\text{ICE}}$$\nSekitar 72% torsi mesin disalurkan langsung secara mekanis ke roda gigi cincin (menuju roda), sementara 28% torsi ditahan oleh MG1 yang berputar sebagai generator. Arus listrik hasil putaran MG1 disalurkan lewat inverter ke MG2 untuk kembali menghasilkan dorongan torsi mekanis di roda.',
          },
          formula: '\\omega_{\\text{ICE}} = \\frac{1}{1 + \\rho} \\omega_{\\text{MG1}} + \\frac{\\rho}{1 + \\rho} \\omega_{\\text{wheels}} \\cdot i_{\\text{final}}',
          formulaExplanation: {
            en: 'Willis planetary gear kinematic speed equation rearranged for engine speed. By modulating MG1 angular velocity through inverter field-oriented control, the engine RPM is completely decoupled from wheel road velocity.',
            id: 'Persamaan kinematika roda gigi planet Willis yang disusun ulang untuk kecepatan putar mesin. Melalui modulasi kecepatan sudut MG1 oleh inverter, RPM mesin bensin dapat diatur sepenuhnya bebas dari kecepatan laju roda kendaraan.',
          },
          variables: [
            {
              symbol: '\\rho',
              name: { en: 'Planetary Gear Ratio (Zr / Zs)', id: 'Rasio Roda Gigi Planet (Zr / Zs)' },
              unit: 'Dimensionless (typical 2.5–2.8)',
              description: {
                en: 'Ratio of outer ring gear teeth to central sun gear teeth.',
                id: 'Rasio perbandingan jumlah gigi ring luar terhadap roda gigi matahari tengah.',
              },
            },
            {
              symbol: '\\omega_{\\text{MG1}}',
              name: { en: 'Motor-Generator 1 Angular Velocity', id: 'Kecepatan Sudut MG1' },
              unit: 'rad/s (can rotate forward or reverse)',
              description: {
                en: 'Rotational speed of MG1 acting on the central sun gear.',
                id: 'Kecepatan putar motor MG1 yang bertumpu pada roda gigi matahari.',
              },
            },
            {
              symbol: '\\omega_{\\text{wheels}}',
              name: { en: 'Driven Wheel Angular Velocity', id: 'Kecepatan Sudut Roda Penggerak' },
              unit: 'rad/s (v_vehicle / r_tire)',
              description: {
                en: 'Rotational velocity of the road wheels.',
                id: 'Kecepatan sudut putaran roda kendaraan di atas aspal.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Driving Mode', 'ICE State', 'MG1 Function', 'MG2 Function', 'Net Energy Path'],
              id: ['Mode Berkendara', 'Kondisi Mesin Bensin', 'Fungsi MG1', 'Fungsi MG2', 'Alur Energi Bersih'],
            },
            rows: [
              {
                en: ['EV Silent Launch (0–40 km/h)', 'OFF (0 RPM, zero fuel consumption)', 'Free-spinning reverse (no reaction torque)', 'Primary propulsion motor drawing from high-voltage battery', 'Battery → Inverter → MG2 → Wheels'],
                id: ['Peluncuran Senyap EV (0–40 km/jam)', 'MATI (0 RPM, tanpa konsumsi bensin)', 'Berputar bebas mundur tanpa beban torsi', 'Motor penggerak utama menarik daya dari baterai traksi', 'Baterai → Inverter → MG2 → Roda'],
              },
              {
                en: ['Cruising at Steady Speed', 'ON (Operating at peak BSFC sweet spot)', 'Generates electricity from mechanical reaction torque', 'Provides supplementary tractive torque at ring gear', 'ICE splits: ~72% direct mechanical + 28% electrical via MG1→MG2'],
                id: ['Jelajah Kecepatan Konstan', 'MENYALA (Pada titik efisiensi BSFC puncak)', 'Menghasilkan listrik dari torsi reaksi mekanis planet', 'Menyalurkan torsi mekanis tambahan di ring gear', 'Mesin terbagi: ~72% mekanis langsung + 28% elektrik via MG1→MG2'],
              },
              {
                en: ['Full Throttle Acceleration', 'ON (Operating at maximum rated kW power)', 'Generates electricity & holds optimal engine RPM', 'Draws maximum power from BOTH battery and MG1', 'ICE mechanical + MG1 electric + Battery discharge → Combined torque at wheels'],
                id: ['Akselerasi Penuh (Kickdown)', 'MENYALA (Pada kurva daya maksimum)', 'Menghasilkan listrik & menahan putaran ideal mesin', 'Menarik daya puncak dari Baterai DAN pasokan listrik MG1', 'Torsi mekanis mesin + Torsi elektrik MG2 bertenaga baterai bergabung di roda'],
              },
              {
                en: ['Regenerative Deceleration', 'OFF (Fuel shut off, 0 RPM)', 'Stationary or zero-torque freewheeling', 'Acts as high-capacity 3-phase AC generator', 'Kinetic Wheel Inertia → MG2 generator → Inverter → Battery recharge'],
                id: ['Deselerasi Pengereman Regeneratif', 'MATI (Injeksi bahan bakar ditutup, 0 RPM)', 'Diam atau berputar bebas tanpa torsi', 'Bekerja sebagai generator listrik 3-fase berdaya tinggi', 'Inersia Kinetik Roda → Generator MG2 → Inverter → Pengisian Baterai'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'The e-CVT replaces traditional friction clutches and belts with a single planetary gear set and two motor-generators.',
              'Engine RPM is continuously optimized by adjusting MG1 speed, allowing the engine to run at its highest thermal efficiency regardless of road speed.',
              'Full hybrids capture significant kinetic braking energy and enable pure electric creeping in stop-and-go urban congestion.',
            ],
            id: [
              'e-CVT menggantikan kopling gesek dan sabuk konvensional dengan sebuah set roda gigi planet serta dua motor-generator.',
              'RPM mesin selalu dioptimalkan melalui pengaturan putaran MG1, menjaga mesin bekerja pada efisiensi termal tertinggi pada kecepatan berapa pun.',
              'Full hybrid memulihkan energi pengereman secara masif dan memungkinkan melaju senyap bertenaga listrik pada kemacetan stop-and-go perkotaan.',
            ],
          },
        },
        {
          id: 'hyb-2-sec-2',
          title: {
            en: '2. The Atkinson / Miller Combustion Cycle and Thermal Efficiency Gains',
            id: '2. Siklus Pembakaran Atkinson / Miller & Peningkatan Efisiensi Termal',
          },
          content: {
            en: 'In conventional Otto-cycle engines, the compression ratio equals the expansion ratio ($r_c = r_e$). Compressing the fuel-air mixture too high induces knock/pre-ignition, while releasing exhaust gas while still pressurized discards substantial usable thermal expansion energy into the tailpipe.\n\n• The Atkinson Cycle Mechanism: By keeping intake valves open significantly past Bottom Dead Center (late intake valve closing, LIVC) during the compression stroke, a portion of the trapped fuel-air charge is pushed back into the intake plenum. This effectively decouples the effective compression ratio from the expansion ratio:\n$$\\text{Expansion Ratio } (r_e \\approx 13.5:1) > \\text{Effective Compression Ratio } (r_c \\approx 9.5:1)$$\nBecause the working gas expands much further before the exhaust valve opens, more thermal energy is converted into mechanical crankshaft work, dropping exhaust temperature and elevating peak brake thermal efficiency to >40–41% (compared to ~28–33% for standard Otto engines).\n\n• Why Atkinson Requires a Hybrid Drivetrain: The drawback of late intake valve closing is reduced volumetric efficiency at low engine RPM, resulting in weak low-end torque. In an ordinary vehicle, this would make acceleration sluggish. However, in a full hybrid powertrain, the high-torque electric motor (MG2, delivering 150–250 Nm of instantaneous torque from 0 RPM) compensates for the engine\'s low-end torque deficit, creating seamless acceleration while preserving peak thermal efficiency.',
            id: 'Pada mesin bensin siklus Otto konvensional, rasio kompresi bernilai sama dengan rasio ekspansi ($r_c = r_e$). Menekan campuran bensin-udara terlalu padat dapat memicu detonasi (knocking), sedangkan membuang gas sisa pembakaran yang masih bertekanan tinggi membuang banyak energi kalor ke knalpot secara sia-sia.\n\n• Mekanisme Siklus Atkinson: Dengan menahan katup hisap tetap terbuka beberapa derajat setelah Titik Mati Bawah (Late Intake Valve Closing / LIVC) saat langkah kompresi dimulai, sebagian udara-bensin didorong kembali ke manifold hisap. Hal ini memisahkan rasio kompresi efektif dari rasio ekspansi:\n$$\\text{Rasio Ekspansi } (r_e \\approx 13,5:1) > \\text{Rasio Kompresi Efektif } (r_c \\approx 9,5:1)$$\nKarena gas pembakaran diekspansikan jauh lebih tuntas sebelum katup buang terbuka, lebih banyak energi kalor diubah menjadi kerja mekanis putaran kruk as, menurunkan suhu gas buang dan mendongkrak efisiensi termal puncak mesin hingga >40–41% (dibandingkan ~28–33% pada mesin siklus Otto biasa).\n\n• Mengapa Siklus Atkinson Wajib Dipadukan dengan Sistem Hibrida: Konsekuensi penutupan katup hisap yang terlambat adalah penurunan efisiensi volumetrik pada putaran rendah, yang membuat torsi awal mesin lemah. Pada mobil konvensional, ini akan membuat akselerasi awal terasa sangat lamban. Namun pada mobil hybrid, motor listrik MG2 (yang menyuplai torsi instan 150–250 Nm dari 0 RPM) menutup kekurangan torsi awal tersebut secara instan, menghasilkan akselerasi mulus dan responsif dengan konsumsi bensin yang sangat irit.',
          },
          formula: '\\eta_{\\text{th, Atkinson}} = 1 - \\frac{1}{r_c^{\\gamma - 1}} \\left[ \\frac{(r_e / r_c)^\\gamma - 1}{\\gamma (r_e / r_c - 1)} \\right] \\approx 1 - \\frac{T_{\\text{exhaust}}}{T_{\\text{combustion}}}',
          formulaExplanation: {
            en: 'Theoretical thermal efficiency of the Atkinson cycle with asymmetric expansion (r_e > r_c). Greater expansion ratio extracts maximum thermodynamic work from combustion gases before exhaust valve opening.',
            id: 'Efisiensi termal teoretis siklus Atkinson dengan ekspansi asimetris (r_e > r_c). Rasio ekspansi yang lebih panjang mengekstraksi kerja termodinamika maksimum dari gas pembakaran sebelum katup buang dibuka.',
          },
          variables: [
            {
              symbol: 'r_e',
              name: { en: 'Expansion Ratio (V_4 / V_3)', id: 'Rasio Ekspansi (V_4 / V_3)' },
              unit: 'Dimensionless (typical 13.0:1 – 14.5:1)',
              description: {
                en: 'Geometric cylinder volume ratio at exhaust valve opening relative to top dead center volume.',
                id: 'Rasio volume silinder saat katup buang terbuka terhadap volume ruang bakar titik mati atas.',
              },
            },
            {
              symbol: 'r_c',
              name: { en: 'Effective Compression Ratio (V_1 / V_2)', id: 'Rasio Kompresi Efektif (V_1 / V_2)' },
              unit: 'Dimensionless (typical 9.0:1 – 10.5:1)',
              description: {
                en: 'Trapped cylinder volume ratio after late intake valve closing relative to clearance volume.',
                id: 'Rasio volume silinder efektif setelah katup hisap tertutup rapat terhadap volume ruang bakar.',
              },
            },
            {
              symbol: '\\gamma',
              name: { en: 'Specific Heat Ratio (Cp / Cv)', id: 'Rasio Kalor Jenis (Cp / Cv)' },
              unit: 'Dimensionless (≈ 1.30–1.35 for hot combustion gases)',
              description: {
                en: 'Isentropic expansion index of the working air-fuel combustion gas mixture.',
                id: 'Indeks ekspansi isentropik campuran gas pembakaran bensin-udara bersuhu tinggi.',
              },
            },
            {
              symbol: 'T_{\\text{exhaust}}',
              name: { en: 'Exhaust Gas Temperature', id: 'Suhu Gas Buang' },
              unit: 'K (°C + 273.15, typical 750–900 K)',
              description: {
                en: 'Thermodynamic gas temperature upon exhaust valve opening, reduced due to extended expansion.',
                id: 'Suhu termodinamika gas saat katup buang terbuka, lebih dingin berkat ekspansi lebih panjang.',
              },
            },
            {
              symbol: 'T_{\\text{combustion}}',
              name: { en: 'Peak In-Cylinder Combustion Temperature', id: 'Suhu Pembakaran Puncak Silinder' },
              unit: 'K (typical 2,200–2,500 K)',
              description: {
                en: 'Maximum flame front temperature achieved after stoichiometric fuel-air spark ignition.',
                id: 'Suhu puncak rambatan api pembakaran setelah penyalaan busi stoikiometris.',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'Atkinson Engine Efficiency Optimization in Urban Taxi Fleets',
              id: 'Optimalisasi Efisiensi Mesin Atkinson pada Armada Taksi Perkotaan',
            },
            context: {
              en: 'Urban taxi fleets experience continuous stop-and-go driving with average speeds under 22 km/h and frequent idling, yielding poor fuel economy (12–15 L/100km) in conventional ICE vehicles.',
              id: 'Armada taksi perkotaan menghadapi pola berkendara macet merayap (stop-and-go) dengan kecepatan rata-rata di bawah 22 km/jam dan stasioner tinggi, menghabiskan 12–15 L/100km pada mobil bensin biasa.',
            },
            analysis: {
              en: 'Full hybrid vehicles utilize high-capacity regenerative braking to capture kinetic energy during hundreds of daily stops, store it in the 1.6 kWh NiMH/LFP battery buffer, and launch the vehicle electrically. When the 2.5L Atkinson engine starts, it operates exclusively in its 41% thermal efficiency sweet spot (2,000–2,800 RPM).',
              id: 'Kendaraan full hybrid menggunakan pengereman regeneratif berkapasitas besar untuk menyerap energi kinetik selama ratusan kali berhenti setiap hari, menyimpannya di baterai penyangga 1,6 kWh, dan melajukan mobil murni dengan listrik saat start. Saat mesin 2.5L Atkinson menyala, ia langsung bekerja di rentang efisiensi termal terbaiknya (41% di 2.000–2.800 RPM).',
            },
            takeaway: {
              en: 'Real-world fleet fuel consumption dropped to 4.3 L/100km—a massive 65% fuel burn reduction with brake pad lifespans exceeding 150,000 km due to regenerative braking.',
              id: 'Konsumsi bahan bakar riil turun drastis menjadi 4,3 L/100km—penghematan sebesar 65% dengan usia kampas rem melampaui 150.000 km berkat pengereman regeneratif.',
            },
          },
          keyTakeaways: {
            en: [
              'The Atkinson cycle achieves superior thermal efficiency (>40%) by extending expansion ratio beyond compression ratio via late intake valve closure.',
              'Weak low-RPM Atkinson engine torque is seamlessly compensated by the instantaneous low-end torque of electric motor MG2.',
              'The planetary power-split e-CVT architecture achieves continuous variable speed modulation without hydraulic slippage or high-friction wear components.',
            ],
            id: [
              'Siklus Atkinson menghasilkan efisiensi termal tinggi (>40%) dengan membuat rasio ekspansi lebih panjang dari kompresi melalui penutupan katup hisap terlambat.',
              'Kelemahan torsi RPM rendah pada mesin Atkinson ditambal secara instan oleh torsi melimpah motor listrik MG2.',
              'Arsitektur e-CVT pembagi daya roda gigi planet menghasilkan modulasi rasio kontinu tanpa selip hidrolik atau keausan sabuk gesek.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyb-q2-1',
          question: {
            en: 'In a Series-Parallel planetary gear power-split hybrid transmission (e-CVT), which component is mechanically coupled to the Planet Carrier?',
            id: 'Pada transmisi hybrid power-split roda gigi planet (e-CVT), komponen apakah yang terhubung langsung secara mekanis ke Planet Carrier?',
          },
          options: {
            en: [
              'The internal combustion engine (ICE) crankshaft',
              'The high-voltage traction battery pack',
              'The vehicle front brake calipers',
              'Motor-Generator 1 (MG1)',
            ],
            id: [
              'Poros engkol mesin pembakaran internal (ICE)',
              'Paket baterai traksi tegangan tinggi',
              'Kaliper rem roda depan kendaraan',
              'Motor-Generator 1 (MG1)',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In standard Series-Parallel e-CVT systems (e.g. Toyota HSD), the Planet Carrier is coupled directly to the internal combustion engine crankshaft, the Sun Gear connects to MG1, and the Ring Gear connects to MG2 and the final drive.',
            id: 'Pada sistem e-CVT Seri-Paralel standar (misalnya Toyota HSD), Planet Carrier dihubungkan langsung ke poros engkol mesin bensin, Roda Gigi Matahari (Sun Gear) ke MG1, dan Roda Gigi Cincin (Ring Gear) ke MG2 serta gardan penggerak roda.',
          },
        },
        {
          id: 'hyb-q2-2',
          question: {
            en: 'How does an Atkinson-cycle engine achieve a thermal efficiency exceeding 40% compared to a conventional Otto-cycle engine?',
            id: 'Bagaimana mesin bersiklus Atkinson mampu mencapai efisiensi termal melampaui 40% dibandingkan mesin siklus Otto konvensional?',
          },
          options: {
            en: [
              'By keeping intake valves open longer into the compression stroke, making the expansion ratio significantly larger than the effective compression ratio',
              'By injecting nitrous oxide directly into the cylinders',
              'By eliminating the exhaust valves completely',
              'By burning hydrogen instead of gasoline',
            ],
            id: [
              'Dengan menahan katup hisap terbuka lebih lama di langkah kompresi, sehingga rasio ekspansi menjadi jauh lebih panjang dibanding rasio kompresi efektif',
              'Dengan menyuntikkan gas nitro oksida langsung ke dalam silinder',
              'Dengan meniadakan katup buang sama sekali',
              'Dengan membakar bahan bakar hidrogen murni',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Delayed intake valve closure (LIVC) reduces pumping losses and allows combustion gases to expand further before exhaust valve opening, extracting more mechanical energy per gram of fuel.',
            id: 'Penutupan katup hisap yang terlambat (LIVC) menekan kerugian pemompaan dan memungkinkan gas hasil pembakaran berekspansi lebih panjang sebelum katup buang terbuka, memeras lebih banyak energi mekanis dari setiap tetes bahan bakar.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 3: PLUG-IN HYBRID ELECTRIC VEHICLES (PHEV) & MULTI-CLUTCH TOPOLOGIES
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-3',
      topicId: 'hybrid-vehicles',
      order: 3,
      title: {
        en: 'Plug-in Hybrid (PHEV) & Multi-Clutch Parallel Electrification',
        id: 'Plug-in Hybrid (PHEV) & Elektrifikasi Paralel Multi-Kopling',
      },
      shortDescription: {
        en: 'External AC charging, high-voltage 12–25 kWh battery packs, K0 disconnect clutches, P2/P3/P4 transmission layouts, and blended mode control.',
        id: 'Pengisian AC eksternal, baterai tegangan tinggi 12–25 kWh, kopling pemutus K0, posisi transmisi P2/P3/P4, dan kendali mode blended.',
      },
      durationMinutes: 24,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'hybrid-powertrain',
      sections: [
        {
          id: 'hyb-3-sec-1',
          title: {
            en: '1. High-Voltage Pack Sizing & P0–P4 Drivetrain Integration Architectures',
            id: '1. Kapasitas Baterai Tegangan Tinggi & Arsitektur Drivetrain P0–P4',
          },
          content: {
            en: 'Plug-in Hybrid Electric Vehicles (PHEVs) bridge the gap between internal combustion and full battery electric vehicles (BEVs). They feature high-voltage battery packs (typically 12–25 kWh, 350V–400V DC) equipped with onboard AC chargers (3.3 kW to 11 kW Type 2, with modern models adding 50 kW DC CCS fast charging), enabling 50–100 km of real-world pure electric zero-emission range:\n\n• Motor Position Taxonomy (P0 to P4 Classification):\n  - P0: Front-end accessory belt-driven starter-generator (used for smooth engine restart in multi-motor PHEVs).\n  - P1: Directly bolted to engine crankshaft upstream of the main clutch. Cannot be disconnected from engine rotation.\n  - P2 Architecture (Industry Standard for Euro/US PHEVs): Positioned between the engine disconnect clutch (commonly designated the "K0 clutch") and the transmission input. When K0 is open, the electric motor drives the gearbox and wheels with the engine completely stationary, enabling pure electric driving up to 140 km/h. When K0 closes, engine torque and electric motor torque sum together in parallel through multi-gear transmissions (e.g. 8-speed or dual-clutch DCT).\n  - P3 Architecture: Positioned at transmission output or final drive reduction gear. Maximizes regenerative braking efficiency because energy does not pass through gearbox gear ratios.\n  - P4 Architecture: Electric axle (e-Axle) mounted on the opposite axle (typically rear wheels). Provides instantaneous all-wheel drive (e-AWD) without any mechanical center propeller shaft or transfer case.',
            id: 'Plug-in Hybrid Electric Vehicle (PHEV) menjadi jembatan teknologi antara kendaraan bensin konvensional dan mobil listrik murni (BEV). PHEV dibekali baterai traksi tegangan tinggi berkapasitas besar (12–25 kWh, 350V–400V DC) serta port pengisian daya AC onboard (3,3 kW–11 kW Type 2, dan beberapa model terbaru mendukung pengisian cepat DC 50 kW), yang memberikan jarak tempuh murni listrik sejauh 50–100 km:\n\n• Klasifikasi Taksonomi Posisi Motor (P0 hingga P4):\n  - P0: Motor penggerak sabuk aksesori di depan mesin (berfungsi menyalakan mesin bensin dengan mulus).\n  - P1: Terbaut langsung pada poros engkol di depan kopling utama (tidak bisa dipisahkan dari putaran mesin).\n  - Arsitektur P2 (Standar Industri PHEV Eropa & Amerika): Terpasang di antara kopling pemutus mesin (disebut kopling K0) dan poros input transmisi. Saat kopling K0 terbuka, motor listrik menggerakkan transmisi dan roda dengan mesin bensin mati total, memungkinkan pengendaraan murni EV hingga kecepatan 140 km/jam. Saat K0 ditutup, torsi mesin bensin dan motor listrik dijumlahkan secara paralel melalui transmisi multi-percepatan (misal 8-speed AT atau kopling ganda DCT).\n  - Arsitektur P3: Terpasang pada poros output transmisi atau gigi reduksi akhir. Mengoptimalkan efisiensi pengereman regeneratif karena energi tidak tereduksi gesekan rasio gigi transmisi.\n  - Arsitektur P4: Terpasang di gardan belakang (e-Axle). Menghasilkan sistem penggerak semua roda (e-AWD) secara instan tanpa membutuhkan poros kopel (propeller shaft) atau transfer case mekanis yang berat.',
          },
          formula: 'T_{\\text{drivetrain, parallel}} = i_{\\text{gear}} \\cdot \\left[ T_{\\text{EM, P2}} + u_{\\text{K0}} \\cdot T_{\\text{ICE}}(\\omega) \\right] + i_{\\text{rear}} \\cdot T_{\\text{EM, P4}}',
          formulaExplanation: {
            en: 'Parallel torque summation equation for a P2+P4 PHEV architecture. Wheel tractive torque combines P2 electric motor torque and K0-clutched engine torque through transmission ratio i_gear, plus independent P4 rear electric axle torque.',
            id: 'Persamaan penjumlahan torsi paralel pada arsitektur PHEV P2+P4. Torsi traksi roda memadukan torsi motor P2 dan torsi mesin bensin (dikendalikan status kopling K0 u_K0) melalui rasio transmisi i_gear, ditambah torsi motor listrik belakang P4.',
          },
          variables: [
            {
              symbol: 'u_{\\text{K0}}',
              name: { en: 'K0 Disconnect Clutch State', id: 'Status Kopling Pemutus K0' },
              unit: 'Binary [0 = Open / Disengaged, 1 = Locked / Engaged]',
              description: {
                en: 'Electromechanical state of the disconnect clutch separating engine from P2 motor.',
                id: 'Status elektromekanis kopling yang memisahkan mesin bensin dari motor listrik P2.',
              },
            },
            {
              symbol: 'T_{\\text{EM, P2}}',
              name: { en: 'P2 Electric Motor Torque', id: 'Torsi Motor Listrik P2' },
              unit: 'Nm (typical 250–400 Nm)',
              description: {
                en: 'Torque supplied by the primary transmission-integrated electric motor.',
                id: 'Torsi yang disuplai oleh motor listrik utama terintegrasi transmisi.',
              },
            },
            {
              symbol: 'i_{\\text{gear}}',
              name: { en: 'Transmission Gear Ratio', id: 'Rasio Gigi Transmisi' },
              unit: 'Dimensionless (e.g. 4.7 in 1st gear to 0.67 in 8th gear)',
              description: {
                en: 'Current selected mechanical gear ratio in the stepped automatic/DCT gearbox.',
                id: 'Rasio roda gigi mekanis yang aktif pada transmisi otomatis/DCT.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Position', 'Location in Drivetrain', 'Pure EV Propulsion', 'Transmission Gear Benefit', 'Regen during Braking'],
              id: ['Posisi', 'Lokasi pada Drivetrain', 'Propulsi Murni EV', 'Manfaat Rasio Gigi', 'Regenerasi saat Rem'],
            },
            rows: [
              {
                en: ['P1', 'Crankshaft upstream of main clutch', 'No (Forces engine rotation)', 'Yes (Through transmission)', 'Fair (~65%, engine friction drag)'],
                id: ['P1', 'Poros engkol sebelum kopling utama', 'Tidak (Memaksa mesin ikut berputar)', 'Ya (Melalui transmisi)', 'Sedang (~65%, ada hambatan friksi mesin)'],
              },
              {
                en: ['P2', 'Between K0 clutch and gearbox input', 'Yes (K0 clutch open)', 'Yes (Motor utilizes all gearbox gear ratios)', 'High (~85%, engine disconnected)'],
                id: ['P2', 'Di antara kopling K0 dan input gearbox', 'Ya (Kopling K0 terbuka)', 'Ya (Motor memanfaatkan semua gigi rasio)', 'Tinggi (~85%, mesin bensin terputus)'],
              },
              {
                en: ['P3', 'Transmission output shaft', 'Yes (Engine decoupled)', 'No (Direct drive fixed ratio to axle)', 'Very High (~90%, bypasses gearbox friction)'],
                id: ['P3', 'Poros output transmisi', 'Ya (Mesin bensin terputus)', 'Tidak (Rasio tetap langsung ke as roda)', 'Sangat Tinggi (~90%, bebas friksi transmisi)'],
              },
              {
                en: ['P4', 'Opposite axle (e-Axle rear wheels)', 'Yes (Direct axle electric drive)', 'No (Dedicated single-speed reduction gear)', 'Maximum (~92%, provides true e-AWD braking)'],
                id: ['P4', 'Gardan roda seberang (e-Axle belakang)', 'Ya (Penggerak listrik langsung as roda)', 'Tidak (Gigi reduksi tunggal terdedikasi)', 'Maksimal (~92%, pengereman e-AWD seimbang)'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'PHEVs utilize 12–25 kWh high-voltage packs to provide 50–100 km of pure electric zero-emission commuting.',
              'The K0 disconnect clutch in P2 architectures permits pure EV driving up to highway speeds without spinning the combustion engine.',
              'P4 electric rear axles enable electronic all-wheel drive (e-AWD) without requiring heavy mechanical driveshafts.',
            ],
            id: [
              'PHEV memanfaatkan baterai tegangan tinggi 12–25 kWh untuk menghadirkan jarak tempuh 50–100 km murni listrik bebas emisi.',
              'Kopling pemutus K0 pada arsitektur P2 memungkinkan mobil melaju murni listrik hingga kecepatan jalan tol tanpa memutar mesin bensin.',
              'Gardan elektrik P4 menghadirkan fitur penggerak semua roda (e-AWD) canggih tanpa poros kopel mekanis yang berat.',
            ],
          },
        },
        {
          id: 'hyb-3-sec-2',
          title: {
            en: '2. Energy Management: Charge-Depleting (CD) vs Charge-Sustaining (CS) & ECMS',
            id: '2. Manajemen Energi: Charge-Depleting (CD) vs Charge-Sustaining (CS) & ECMS',
          },
          content: {
            en: 'The supervisor control software inside a PHEV operates across two primary global operating regimes:\n\n1. Charge-Depleting (CD) Mode: Starting with a fully plugged-in battery (State of Charge 100% to ~20%), the supervisory controller operates the vehicle almost exclusively on electric power. The internal combustion engine remains locked at 0 RPM unless the driver commands wide-open throttle (kickdown past the pedal detent switch) requesting peak system overtaking power.\n2. Charge-Sustaining (CS) Mode: Once battery SoC falls to its minimum threshold (~15–20%), the powertrain seamlessly shifts into full hybrid mode. It sustains the battery charge level using regenerative braking and opportunistic engine charging, ensuring the vehicle maintains continuous acceleration and hill-climbing reserves.\n3. Equivalent Consumption Minimization Strategy (ECMS): Real-time optimal control calculates the instantaneous equivalence factor ($s(t)$) that converts electrical kilowatt-hours into equivalent grams of gasoline. At each millisecond, the vehicle computer minimizes the instantaneous Hamiltonian cost function:\n$$H(t) = \\dot{m}_{\\text{fuel}}(P_{\\text{ICE}}) + s(t) \\cdot \\frac{P_{\\text{batt}}}{\\text{LHV}_{\\text{fuel}}}$$\nWhen battery SoC is high, $s(t)$ is small, favoring pure electric propulsion; when SoC is depleted, $s(t)$ rises, forcing the engine to start and carry the road load.',
            id: 'Perangkat lunak pengendali utama (Vehicle Supervisory Controller) pada PHEV mengelola dua rezim operasi utama:\n\n1. Mode Pengosongan Baterai (Charge-Depleting / CD): Dimulai saat baterai penuh dari colokan listrik (State of Charge 100% hingga ~20%), mobil melaju nyaris 100% bertenaga listrik. Mesin bensin tetap mati (0 RPM) kecuali pengemudi menginjak pedal gas penuh melewati batas sakelar kickdown untuk meminta tenaga akselerasi darurat maksimum.\n2. Mode Penjagaan Baterai (Charge-Sustaining / CS): Ketika SoC baterai mencapai ambang bawah (~15–20%), sistem beralih otomatis ke mode full hybrid konvensional. Sistem menjaga sisa muatan baterai melalui pengereman regeneratif dan pengisian opportunistik dari mesin bensin, memastikan mobil tetap bertenaga saat tanjakan terjal.\n3. Strategi Minimasi Konsumsi Ekuivalen (ECMS): Algoritma optimasi real-time menghitung faktor ekuivalensi ($s(t)$) yang mengonversi energi listrik kilowatt-jam menjadi gram bensin ekuivalen. Setiap milidetik, komputer meminimalkan fungsi biaya Hamiltonian instan:\n$$H(t) = \\dot{m}_{\\text{fuel}}(P_{\\text{ICE}}) + s(t) \\cdot \\frac{P_{\\text{batt}}}{\\text{LHV}_{\\text{fuel}}}$$\nSaat SoC baterai tinggi, nilai $s(t)$ kecil sehingga sistem memprioritaskan motor listrik; saat baterai tiris, nilai $s(t)$ membesar sehingga mesin bensin dinyalakan untuk menanggung beban jalan.',
          },
          formula: 'H(P_{\\text{ICE}}, P_{\\text{batt}}) = \\dot{m}_{\\text{fuel}}(P_{\\text{ICE}}) + s(t) \\cdot \\frac{P_{\\text{batt}}}{\\text{LHV}_{\\text{fuel}}} \\quad \\text{subject to } P_{\\text{ICE}} + P_{\\text{batt}} = P_{\\text{road}}',
          formulaExplanation: {
            en: 'Equivalent Consumption Minimization Strategy (ECMS) cost function. Minimizes the sum of fuel mass flow rate and virtual fuel equivalent of battery electrical power through equivalence factor s(t).',
            id: 'Fungsi biaya strategi ECMS (Equivalent Consumption Minimization Strategy). Meminimalkan jumlah laju aliran massa bensin dan ekuivalen bahan bakar virtual dari daya listrik baterai melalui faktor s(t).',
          },
          variables: [
            {
              symbol: 'H',
              name: { en: 'Instantaneous Hamiltonian Cost', id: 'Biaya Hamiltonian Instan' },
              unit: 'g/s equivalent',
              description: {
                en: 'Total virtual fuel consumption rate to be minimized at each control time step.',
                id: 'Laju konsumsi bahan bakar virtual total yang harus diminimalkan pada setiap langkah kendali.',
              },
            },
            {
              symbol: '\\dot{m}_{\\text{fuel}}',
              name: { en: 'Engine Fuel Mass Flow Rate', id: 'Laju Aliran Massa Bahan Bakar Mesin' },
              unit: 'g/s (derived from engine BSFC map)',
              description: {
                en: 'Actual rate of gasoline consumption as a function of engine combustion power output.',
                id: 'Laju konsumsi bensin aktual sebagai fungsi keluaran daya pembakaran mesin.',
              },
            },
            {
              symbol: 's(t)',
              name: { en: 'Equivalence Factor (Co-state)', id: 'Faktor Ekuivalensi (Co-state)' },
              unit: 'Dimensionless',
              description: {
                en: 'Lagrange multiplier weighting future fuel replenishment cost against immediate electric discharge.',
                id: 'Pengali Lagrange yang menimbang biaya pengisian bahan bakar di masa depan terhadap pengosongan listrik seketika.',
              },
            },
            {
              symbol: 'P_{\\text{batt}}',
              name: { en: 'Battery Electrical Terminal Power', id: 'Daya Terminal Listrik Baterai' },
              unit: 'kW (positive discharging, negative charging)',
              description: {
                en: 'Net chemical-electrical power exchanged across high-voltage battery terminals.',
                id: 'Daya listrik-kimia netto yang keluar atau masuk melalui terminal baterai tegangan tinggi.',
              },
            },
            {
              symbol: '\\text{LHV}_{\\text{fuel}}',
              name: { en: 'Fuel Lower Heating Value', id: 'Nilai Kalor Bawah Bahan Bakar (LHV)' },
              unit: 'MJ/kg (≈ 44.0 MJ/kg for gasoline)',
              description: {
                en: 'Usable chemical combustion energy content per unit mass of liquid fuel.',
                id: 'Kandungan energi pembakaran kimia yang dapat dimanfaatkan per satuan massa bahan bakar cair.',
              },
            },
            {
              symbol: 'P_{\\text{road}}',
              name: { en: 'Instantaneous Road Load Demand', id: 'Kebutuhan Daya Beban Jalan Instan' },
              unit: 'kW',
              description: {
                en: 'Driver tractive power request satisfying aerodynamic drag, rolling resistance, and acceleration.',
                id: 'Permintaan daya traksi pengemudi untuk mengatasi hambatan angin, gesekan ban, dan percepatan.',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'Cold Engine Kick-In Protection During Emergency Highway Passing',
              id: 'Perlindungan Pelumasan Mesin Dingin saat Kickdown Darurat di Jalan Tol',
            },
            context: {
              en: 'In cold winter weather (-10°C), a PHEV cruises in pure EV mode at 110 km/h with engine oil at sub-zero temperatures. The driver abruptly executes a full kickdown to overtake an obstacle.',
              id: 'Pada cuaca musim dingin (-10°C), sebuah mobil PHEV melaju dalam mode listrik murni pada kecepatan 110 km/jam dengan oli mesin masih dingin membeku. Pengemudi tiba-tiba menginjak kickdown penuh untuk menyalip.',
            },
            analysis: {
              en: 'Applying full combustion load to a cold engine within milliseconds risks bore scuffing and bearing damage. Advanced PHEVs maintain an electric oil pre-lubrication pump and use the P2 electric motor to deliver 100% of the initial 0.5-second acceleration spike, ramping engine power progressively over 2 seconds.',
              id: 'Membebani mesin dingin dengan beban penuh dalam hitungan milidetik berisiko merusak dinding silinder dan bantalan kruk as. Sistem PHEV modern menggunakan pompa oli elektrik dan memanfaatkan motor listrik P2 untuk menyuplai 100% sentakan awal akselerasi selama 0,5 detik pertama, sementara mesin bensin dinaikkan tenaganya secara bertahap selama 2 detik.',
            },
            takeaway: {
              en: 'Instant electric torque protects internal engine mechanics from thermal shock while guaranteeing zero lag for emergency driver maneuvers.',
              id: 'Torsi listrik instan melindungi komponen internal mesin dari syok termal sekaligus memastikan respon akselerasi darurat tanpa jeda.',
            },
          },
          keyTakeaways: {
            en: [
              'Charge-Depleting (CD) mode prioritizes electric driving until battery SoC drops to ~20%.',
              'Charge-Sustaining (CS) mode operates as an efficient full hybrid to preserve battery reserve.',
              'ECMS supervisory control solves real-time Hamiltonian optimization to split power between fuel and electricity with maximum thermodynamic efficiency.',
            ],
            id: [
              'Mode Charge-Depleting (CD) memprioritaskan pengendaraan listrik murni hingga SoC baterai turun ke ~20%.',
              'Mode Charge-Sustaining (CS) beralih menjadi full hybrid efisien untuk menjaga sisa muatan baterai.',
              'Kendali supervisory ECMS menyelesaikan kalkulasi optimasi Hamiltonian secara real-time untuk membagi daya antara bensin dan listrik dengan efisiensi maksimal.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyb-q3-1',
          question: {
            en: 'What is the role of the K0 disconnect clutch in a P2 Plug-in Hybrid (PHEV) architecture?',
            id: 'Apakah peran utama kopling pemutus K0 pada arsitektur Plug-in Hybrid (PHEV) posisi P2?',
          },
          options: {
            en: [
              'It mechanically disconnects the internal combustion engine from the P2 motor and transmission, enabling pure electric driving without engine pumping drag',
              'It connects the 12V battery directly to the spark plugs',
              'It acts as the vehicle ABS brake disc',
              'It disconnects the steering wheel from the front wheels',
            ],
            id: [
              'Memutuskan hubungan mekanis mesin bensin dari motor P2 dan transmisi, memungkinkan mobil melaju murni listrik tanpa hambatan kompresi mesin',
              'Menghubungkan aki 12V langsung ke busi pengapian',
              'Berfungsi sebagai piringan rem cakram ABS kendaraan',
              'Memutuskan hubungan roda kemudi dari roda depan',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'When the K0 clutch is disengaged (open), the combustion engine remains stationary (0 RPM) while the P2 electric motor drives the gearbox and wheels. When more power is needed, K0 closes to combine engine and electric power.',
            id: 'Saat kopling K0 terbuka, mesin bensin mati total (0 RPM) sementara motor listrik P2 bebas memutar transmisi dan roda. Saat tenaga lebih besar dibutuhkan, kopling K0 menutup untuk menggabungkan tenaga bensin dan listrik secara paralel.',
          },
        },
        {
          id: 'hyb-q3-2',
          question: {
            en: 'In PHEV energy management, what defines the transition from Charge-Depleting (CD) to Charge-Sustaining (CS) mode?',
            id: 'Pada manajemen energi PHEV, hal apakah yang menandai transisi dari mode Charge-Depleting (CD) ke Charge-Sustaining (CS)?',
          },
          options: {
            en: [
              'The battery State of Charge (SoC) decreasing to a predetermined lower threshold (typically ~15–20%)',
              'The vehicle exceeding 200 km/h',
              'The fuel tank becoming completely empty',
              'The driver turning on the cabin air conditioner',
            ],
            id: [
              'Tingkat State of Charge (SoC) baterai menurun mencapai ambang batas bawah tertentu (umumnya ~15–20%)',
              'Kecepatan kendaraan melampaui 200 km/jam',
              'Tangki bahan bakar bensin kosong total',
              'Pengemudi menyalakan AC kabin',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'A PHEV operates in Charge-Depleting (CD) mode using grid energy until the battery reaches its depletion threshold (~15–20% SoC), at which point it switches to Charge-Sustaining (CS) full hybrid mode.',
            id: 'PHEV beroperasi dalam mode Charge-Depleting (CD) memanfaatkan energi listrik colokan hingga baterai mencapai ambang batas bawah (~15–20% SoC), lalu otomatis berpindah ke mode Charge-Sustaining (CS) full hybrid.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 4: EXTENDED-RANGE ELECTRIC VEHICLES (EREV) & SERIES POWERTRAINS
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-4',
      topicId: 'hybrid-vehicles',
      order: 4,
      title: {
        en: 'Extended-Range EV (EREV) & Pure Series Powertrain Systems',
        id: 'Extended-Range EV (EREV) & Sistem Powertrain Seri Murni',
      },
      shortDescription: {
        en: 'Mechanically decoupled ICE operating as a quasi-stationary optimal-BSFC generator, 30–45 kWh battery buffer, and high-power electric traction.',
        id: 'Mesin pembakaran internal terisolasi mekanis sebagai generator stasioner BSFC optimal, baterai penyangga 30–45 kWh, dan traksi motor listrik bertenaga tinggi.',
      },
      durationMinutes: 26,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'hybrid-powertrain',
      sections: [
        {
          id: 'hyb-4-sec-1',
          title: {
            en: '1. The Decoupled Pure Series Architecture and Stationary Engine Operation',
            id: '1. Arsitektur Seri Murni Terisolasi & Pengoperasian Mesin Stasioner',
          },
          content: {
            en: 'Extended-Range Electric Vehicles (EREVs)—popularized in modern high-end SUVs and sedans (such as Li Auto / Li Xiang and the historic Chevrolet Volt in series mode)—represent a pure series hybrid architecture:\n\n• Zero Mechanical Coupling to the Wheels: The internal combustion engine has NO mechanical driveshaft, clutch, or gear connection to the wheels. The vehicle is 100% driven by electric traction motors (typically 150 kW to 350 kW PMSM motors mounted on the front and rear axles).\n• The Engine as a Pure Electric Generator ("Range Extender"): A compact displacement engine (typically 1.2L to 1.5L turbocharged four-cylinder) is directly coupled to a high-efficiency permanent magnet generator. The generator converts all mechanical shaft energy into alternating current, which an onboard AC-DC rectifier feeds into the high-voltage DC bus.\n• Stationary Optimal BSFC Operation: In a conventional car, the engine constantly revs up and down through thousands of gear shifts, spending 80% of its operating life in dreadful low-efficiency transient regions (throttle throttling losses, incomplete combustion, running rich). In an EREV, because the engine is mechanically decoupled from vehicle velocity, the electronic controller commands the engine to run strictly along its single most efficient contour on the Brake Specific Fuel Consumption (BSFC) map (e.g. exactly 2,400 RPM at 85% load, where thermal efficiency peaks at >41% and BSFC drops to ~210 g/kWh). The engine either runs in this pristine steady-state regime or shuts off completely.\n• Battery Sizing: EREVs feature large battery packs (30–45 kWh), providing 150–220 km of pure EV range, backed up by a 50–65 liter gasoline tank that expands total cross-country driving range to >1,100–1,300 km without charging pauses.',
            id: 'Extended-Range Electric Vehicle (EREV)—yang sangat populer pada mobil premium modern (seperti Li Auto / Li Xiang serta Chevrolet Volt pada mode seri)—mengusung arsitektur hibrida seri murni (pure series hybrid):\n\n• Nol Hubungan Mekanis ke Roda: Mesin pembakaran internal sama sekali TIDAK memiliki poros penggerak, kopling, atau gigi rasio yang terhubung ke roda. Kendaraan digerakkan 100% oleh motor traksi listrik (umumnya motor PMSM 150 kW hingga 350 kW di as roda depan dan belakang).\n• Mesin Bensin sebagai Pembangkit Listrik Murni ("Range Extender"): Mesin bensin kompak (biasanya 1.2L–1.5L turbo empat silinder) dikopel langsung ke generator listrik magnet permanen berdaya tinggi. Generator mengubah seluruh energi mekanis kruk as menjadi listrik AC, yang kemudian disearahkan oleh inverter ke bus DC tegangan tinggi.\n• Beroperasi Konstan di Titik BSFC Terbaik: Pada mobil konvensional, RPM mesin naik-turun secara liar mengikuti injakan gas dan pergantian gigi transmisi, sehingga 80% waktunya terbuang di area efisiensi rendah. Pada EREV, karena mesin tidak terhubung ke roda, komputer mesin dapat menyetel putaran mesin secara stasioner tepat di kurva efisiensi termal tertinggi pada peta BSFC (Brake Specific Fuel Consumption)—misalnya konstan di 2.400 RPM pada beban 85%, di mana efisiensi termal mencapai puncaknya (>41% dan BSFC serendah ~210 g/kWh). Mesin hanya menyala di titik terbaik ini atau mati total jika baterai penuh.\n• Kapasitas Baterai: EREV dibekali paket baterai cukup besar (30–45 kWh) yang memberikan jarak tempuh murni listrik 150–220 km, didukung tangki bensin 50–65 liter yang melipatgandakan jangkauan jelajah hingga >1.100–1.300 km tanpa rasa cemas kehabisan baterai (eliminasi range anxiety).',
          },
          formula: 'P_{\\text{elec, gen}} = \\omega_{\\text{ICE, opt}} \\cdot T_{\\text{ICE, opt}} \\cdot \\eta_{\\text{gen}} \\ge \\bar{P}_{\\text{road, sustained}}',
          formulaExplanation: {
            en: 'Continuous electrical power generation in an EREV. The engine operates at its optimal BSFC operating point (ω_opt, T_opt), generating electric power through generator efficiency η_gen to balance average sustained highway road-load power.',
            id: 'Pembangkitan daya listrik kontinu pada EREV. Mesin beroperasi konstan pada titik efisiensi BSFC optimal (ω_opt, T_opt), memproduksi daya listrik melalui generator berefisiensi η_gen untuk mengimbangi rata-rata daya beban jalan raya secara berkelanjutan.',
          },
          variables: [
            {
              symbol: 'P_{\\text{elec, gen}}',
              name: { en: 'Generator Electrical Power Output', id: 'Daya Listrik Keluaran Generator' },
              unit: 'kW (typically 60–100 kW continuous)',
              description: {
                en: 'Electrical power supplied by the range extender to the high-voltage bus.',
                id: 'Daya listrik yang disuplai generator range-extender ke bus baterai tegangan tinggi.',
              },
            },
            {
              symbol: '\\eta_{\\text{gen}}',
              name: { en: 'Generator Conversion Efficiency', id: 'Efisiensi Konversi Generator' },
              unit: 'Fraction (typically 0.94–0.96)',
              description: {
                en: 'Electrical efficiency of the permanent magnet generator and AC-DC rectifier.',
                id: 'Efisiensi listrik generator magnet permanen dan penyearah AC-DC.',
              },
            },
            {
              symbol: '\\bar{P}_{\\text{road}}',
              name: { en: 'Sustained Highway Road Load', id: 'Daya Beban Jalan Tol Berkelanjutan' },
              unit: 'kW (typically 25–45 kW at 120 km/h)',
              description: {
                en: 'Average mechanical power consumed by aerodynamic and rolling drag at highway speed.',
                id: 'Daya mekanis rata-rata yang terserap oleh hambatan angin dan ban pada kecepatan tinggi.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Metric / Feature', 'Mild Hybrid (MHEV)', 'Full Hybrid (HEV)', 'Plug-in Hybrid (PHEV)', 'Range Extender (EREV)', 'Battery EV (BEV)'],
              id: ['Metrik / Fitur', 'Mild Hybrid (MHEV)', 'Full Hybrid (HEV)', 'Plug-in Hybrid (PHEV)', 'Range Extender (EREV)', 'Mobil Listrik (BEV)'],
            },
            rows: [
              {
                en: ['Battery Capacity', '0.4 – 1.0 kWh', '1.3 – 2.0 kWh', '12 – 25 kWh', '30 – 45 kWh', '60 – 110 kWh'],
                id: ['Kapasitas Baterai', '0,4 – 1,0 kWh', '1,3 – 2,0 kWh', '12 – 25 kWh', '30 – 45 kWh', '60 – 110 kWh'],
              },
              {
                en: ['Electrical Voltage', '48 V DC (SELV)', '200 – 300 V DC', '350 – 400 V DC', '350 – 450 V DC', '400 – 800 V DC'],
                id: ['Tegangan Kelistrikan', '48 V DC (SELV)', '200 – 300 V DC', '350 – 400 V DC', '350 – 450 V DC', '400 – 800 V DC'],
              },
              {
                en: ['Pure Electric Range', '0 km (Assist only)', '2 – 4 km (Low speed)', '50 – 100 km', '150 – 220 km', '400 – 700 km'],
                id: ['Jarak Tempuh Murni Listrik', '0 km (Hanya assist)', '2 – 4 km (Kecepatan rendah)', '50 – 100 km', '150 – 220 km', '400 – 700 km'],
              },
              {
                en: ['External Wall Plug', 'No', 'No', 'Yes (AC + optional DC)', 'Yes (AC + Fast DC)', 'Yes (AC + Ultra-fast DC)'],
                id: ['Colokan Pengisian Eksternal', 'Tidak Ada', 'Tidak Ada', 'Ada (AC + opsional DC)', 'Ada (AC + DC Cepat)', 'Ada (AC + DC Ultra-cepat)'],
              },
              {
                en: ['Mechanical Connection of Engine to Wheels', 'Yes (Direct crankshaft/belt)', 'Yes (Planetary gear power split)', 'Yes (Parallel clutch to gearbox)', 'NO (100% mechanically decoupled)', 'None (No combustion engine)'],
                id: ['Hubungan Mekanis Mesin ke Roda', 'Ada (Sabuk/kruk as langsung)', 'Ada (Power-split roda gigi planet)', 'Ada (Kopling paralel ke transmisi)', 'TIDAK ADA (Terisolasi 100%)', 'Tidak Ada (Tanpa mesin bensin)'],
              },
              {
                en: ['Primary Propulsion Source', 'ICE supplemented by 48V motor', 'ICE + Electric Motor blended', 'Electric motor (CD) or combined (CS)', '100% Electric Motor at all times', '100% Electric Motor at all times'],
                id: ['Sumber Penggerak Utama', 'Mesin dibantu motor 48V', 'Kombinasi mesin bensin & motor', 'Motor listrik (CD) atau kombinasi (CS)', '100% Motor Listrik setiap saat', '100% Motor Listrik setiap saat'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'In an EREV, the internal combustion engine is completely mechanically decoupled from the road wheels, functioning solely as a steady-state electric generator.',
              'Because the engine operates at its optimal Brake Specific Fuel Consumption (BSFC) sweet spot, thermal efficiency is maximized and tailpipe emissions are minimized.',
              'A 30–45 kWh battery delivers substantial zero-emission electric range for city commuting, while the gasoline range extender eliminates highway range anxiety.',
            ],
            id: [
              'Pada EREV, mesin bensin sama sekali tidak memiliki sambungan mekanis ke roda jalan, beroperasi murni sebagai generator listrik stasioner.',
              'Karena mesin bensin beroperasi tepat di titik efisiensi BSFC terbaiknya, efisiensi termal menjadi maksimal dan emisi gas buang sangat rendah.',
              'Baterai 30–45 kWh menyediakan jarak tempuh listrik memadai untuk perkotaan, sementara generator bensin meniadakan kecemasan jarak tempuh (range anxiety).',
            ],
          },
        },
        {
          id: 'hyb-4-sec-2',
          title: {
            en: '2. Comparative Thermodynamic Efficiency Analysis Across All Hybrid Taxonomies',
            id: '2. Analisis Efisiensi Termodinamika Komparatif Seluruh Taksonomi Hibrida',
          },
          content: {
            en: 'To understand when each hybrid architecture excels, engineers analyze the "well-to-wheel" and "tank-to-wheel" energy conversion efficiency chains:\n\n1. Conversion Penalty in Series Topologies: In an EREV, energy undergoes multiple conversion steps: Chemical Fuel → Mechanical Crankshaft Work ($\\eta_{\\text{ICE}} \\approx 41\\%$) → Electric Generator ($\\eta_{\\text{gen}} \\approx 95\\%$) → Inverter Rectification ($\\eta_{\\text{inv}} \\approx 98\\%$) → Battery Charge/Discharge ($\\eta_{\\text{batt}} \\approx 95\\%$) → Traction Inverter ($\\eta_{\\text{inv}} \\approx 98\\%$) → Electric Traction Motor ($\\eta_{\\text{motor}} \\approx 96\\%$) → Final Reduction Gear ($\\eta_{\\text{gear}} \\approx 98\\%$). Multiplying these yields a net tank-to-wheel efficiency of ~32%. At steady 130 km/h highway cruising, a direct-mechanical-drive parallel HEV or PHEV can actually be 5–10% more fuel-efficient than an EREV because mechanical gears have a 97–98% direct transmission efficiency without cascading electrical conversion losses!\n2. The City Driving Paradigm: In congested urban environments, the EREV and PHEV overwhelmingly outperform conventional cars and MHEVs. Constant deceleration recaptures up to 70% of vehicle kinetic energy through regenerative braking, zero fuel is burned while stopped, and the engine rarely needs to fire.\n3. The Decarbonization Continuum: Automotive powertrains form an evolutionary continuum toward zero carbon: ICE (100% fossil, ~25% efficiency) → MHEV (~12% CO2 reduction) → HEV (~35% CO2 reduction) → PHEV/EREV (>70% fossil displacement via grid charging) → BEV (100% electrified, >85% tank-to-wheel efficiency, zero tailpipe emissions).',
            id: 'Untuk memahami kapan setiap arsitektur hibrida bekerja paling optimal, para insinyur menganalisis rantai efisiensi konversi energi dari tangki ke roda (tank-to-wheel):\n\n1. Kerugian Konversi Berganda pada Topologi Seri: Pada EREV, energi mengalami banyak tahapan perubahan bentuk: Kimia Bahan Bakar → Mekanis Poros Engkol ($\\eta_{\\text{ICE}} \\approx 41\\%$) → Generator Listrik ($\\eta_{\\text{gen}} \\approx 95\\%$) → Penyearah Inverter ($\\eta_{\\text{inv}} \\approx 98\\%$) → Simpan/Tarik Baterai ($\\eta_{\\text{batt}} \\approx 95\\%$) → Inverter Traksi ($\\eta_{\\text{inv}} \\approx 98\\%$) → Motor Traksi ($\\eta_{\\text{motor}} \\approx 96\\%$) → Gigi Reduksi ($\\eta_{\\text{gear}} \\approx 98\\%$). Perkalian seluruh faktor ini menghasilkan efisiensi tank-to-wheel sekitar ~32%. Pada kecepatan jalan tol konstan 130 km/jam, sistem HEV/PHEV paralel langsung justru bisa lebih hemat 5–10% dibanding EREV karena gigi mekanis menyalurkan tenaga dengan efisiensi 97–98% tanpa rugi konversi listrik beruntun!\n2. Paradigma Pengendaraan Perkotaan: Di jalanan kota yang macet, EREV dan PHEV unggul mutlak dibanding mobil bensin biasa dan MHEV. Deselerasi berulang-ulang menyerap kembali hingga 70% energi kinetik lewat pengereman regeneratif, nol bahan bakar terbuang saat macet, dan mesin bensin hampir tidak pernah perlu menyala.\n3. Kontinum Dekarbonisasi Mobilitas: Powertrain otomotif membentuk spektrum evolusi menuju nol emisi: Mesin Bensin Tradisional (100% fosil, efisiensi ~25%) → MHEV (reduksi CO2 ~12%) → HEV (reduksi CO2 ~35%) → PHEV/EREV (substitusi fosil >70% via listrik PLN) → BEV (100% elektrifikasi, efisiensi >85%, nol emisi knalpot).',
          },
          formula: '\\eta_{\\text{tank-to-wheel, series}} = \\eta_{\\text{ICE}} \\cdot \\eta_{\\text{gen}} \\cdot \\eta_{\\text{inv}}^2 \\cdot \\eta_{\\text{batt}} \\cdot \\eta_{\\text{motor}} \\cdot \\eta_{\\text{gear}}',
          formulaExplanation: {
            en: 'Compound series energy transmission efficiency. Illustrates the multiple energy conversion steps inherent to pure series hybrid / EREV powertrains during fuel-generated operation.',
            id: 'Efisiensi transmisi energi gabungan pada sistem seri. Menggambarkan tahapan perubahan energi berganda pada powertrain seri murni / EREV saat beroperasi menggunakan bahan bakar cair.',
          },
          variables: [
            {
              symbol: '\\eta_{\\text{ICE}}',
              name: { en: 'Engine Brake Thermal Efficiency', id: 'Efisiensi Termal Efektif Mesin' },
              unit: 'Fraction (typical 0.40–0.41 at sweet spot)',
              description: {
                en: 'Fraction of fuel chemical combustion energy converted into mechanical crankshaft work.',
                id: 'Fraksi energi pembakaran bahan bakar yang berhasil diubah menjadi kerja mekanis poros engkol.',
              },
            },
            {
              symbol: '\\eta_{\\text{gen}}',
              name: { en: 'Generator Conversion Efficiency', id: 'Efisiensi Konversi Generator' },
              unit: 'Fraction (typical 0.94–0.96)',
              description: {
                en: 'Efficiency of the permanent magnet synchronous generator converting shaft torque to AC current.',
                id: 'Efisiensi generator magnet permanen dalam mengubah torsi mekanis menjadi arus listrik AC.',
              },
            },
            {
              symbol: '\\eta_{\\text{inv}}',
              name: { en: 'Inverter Conversion Efficiency', id: 'Efisiensi Konversi Inverter' },
              unit: 'Fraction (typical 0.97–0.99, squared for two conversion steps)',
              description: {
                en: 'Silicon carbide (SiC) power electronics efficiency during AC-to-DC rectification and DC-to-AC drive inversion.',
                id: 'Efisiensi modul elektronika daya (SiC) saat penyearahan AC ke DC dan pembalikan DC ke AC.',
              },
            },
            {
              symbol: '\\eta_{\\text{batt}}',
              name: { en: 'Battery Electrochemical Efficiency', id: 'Efisiensi Elektrokimia Baterai' },
              unit: 'Fraction (typical 0.94–0.96)',
              description: {
                en: 'Coulombic and internal ohmic charge/discharge efficiency of the lithium-ion cells.',
                id: 'Efisiensi pengisian/pengosongan sel litium-ion memperhitungkan resistansi internal dan rugi kalor.',
              },
            },
            {
              symbol: '\\eta_{\\text{motor}}',
              name: { en: 'Traction Motor Mechanical Efficiency', id: 'Efisiensi Mekanis Motor Traksi' },
              unit: 'Fraction (typical 0.95–0.97)',
              description: {
                en: 'Efficiency of the main drive electric motor converting electrical power into tractive shaft torque.',
                id: 'Efisiensi motor listrik penggerak utama dalam mengonversi daya listrik menjadi torsi poros traksi.',
              },
            },
            {
              symbol: '\\eta_{\\text{gear}}',
              name: { en: 'Single-Speed Gearbox Efficiency', id: 'Efisiensi Reduksi Gigi Tunggal' },
              unit: 'Fraction (typical 0.97–0.98)',
              description: {
                en: 'Mechanical gear meshing efficiency of the final drive reduction ratio.',
                id: 'Efisiensi kontak mekanis roda gigi reduksi akhir menuju as roda.',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'High-Altitude Continuous Mountain Pass Towing in an EREV',
              id: 'Uji Beban Menanjak di Pegunungan Tinggi pada Sistem EREV',
            },
            context: {
              en: 'A 2,400 kg EREV SUV with an empty battery (15% SoC) tows a 2,000 kg trailer up a continuous 8% mountain grade at 90 km/h for 45 minutes.',
              id: 'Sebuah SUV EREV berbobot 2.400 kg dengan baterai tiris (15% SoC) menarik trailer 2.000 kg menaiki tanjakan 8% pada kecepatan 90 km/jam selama 45 menit.',
            },
            analysis: {
              en: 'Towing uphill requires ~110 kW of continuous mechanical tractive power ($P = F_{\\text{grade}} \\cdot v$). If the onboard range-extender generator is only rated at 75 kW continuous output, a 35 kW power deficit emerges. If the battery buffer is depleted, the vehicle controller must derate the traction motor to prevent stalling, slowing the vehicle to 62 km/h to match generator output.',
              id: 'Menanjak membutuhkan daya traksi kontinu ~110 kW ($P = F_{\\text{grade}} \\cdot v$). Jika generator range extender hanya berdaya 75 kW kontinu, terjadi defisit daya 35 kW. Jika baterai sudah habis, komputer akan menurunkan tenaga motor traksi secara otomatis (derating) sehingga mobil melambat ke 62 km/jam agar sesuai daya generator.',
            },
            takeaway: {
              en: 'Proper sizing of the range-extender generator must balance peak sustained continuous aerodynamic and gravitational road load to avoid low-SoC power curtailment.',
              id: 'Kapasitas generator range extender harus diperhitungkan matang agar mampu mengimbangi beban tanjakan kontinu terberat demi mencegah penurunan tenaga (derating) saat baterai tiris.',
            },
          },
          keyTakeaways: {
            en: [
              'Series hybrids incur multiple cascading electrical conversion losses, making direct-drive parallel hybrids slightly more efficient at steady high-speed highway cruising.',
              'In urban and suburban driving, EREVs and PHEVs achieve near-zero tailpipe emissions by relying primarily on grid electricity stored in high-capacity battery packs.',
              'The automotive powertrain landscape offers a tiered continuum from 48V MHEVs to HEVs, PHEVs, EREVs, and ultimately fully electric BEVs.',
            ],
            id: [
              'Sistem hibrida seri memiliki kerugian konversi listrik beruntun, sehingga sistem paralel mekanis langsung sedikit lebih efisien pada kecepatan tinggi jalan tol.',
              'Pada penggunaan harian perkotaan, EREV dan PHEV menghasilkan emisi knalpot nyaris nol dengan mengandalkan listrik rumah di baterai berkapasitas besar.',
              'Lanskap powertrain otomotif membentuk jenjang elektrifikasi bertahap: dari MHEV 48V, HEV, PHEV, EREV, hingga mobil listrik murni BEV.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyb-q4-1',
          question: {
            en: 'In an Extended-Range Electric Vehicle (EREV), how is mechanical torque from the internal combustion engine delivered to the road wheels?',
            id: 'Pada Extended-Range Electric Vehicle (EREV), bagaimanakah torsi mekanis dari mesin pembakaran internal disalurkan ke roda kendaraan?',
          },
          options: {
            en: [
              'It is NOT delivered mechanically to the wheels at all; the engine acts strictly as an electric generator, and wheels are 100% driven by electric motors',
              'Via a 10-speed dual-clutch transmission and mechanical driveshaft',
              'Through a belt-driven continuously variable transmission (CVT)',
              'Via the front differential ring gear directly',
            ],
            id: [
              'TIDAK disalurkan secara mekanis sama sekali ke roda; mesin bensin murni bekerja sebagai generator listrik, dan roda 100% digerakkan oleh motor listrik',
              'Melalui transmisi kopling ganda 10-percepatan dan poros kopel mekanis',
              'Melalui transmisi sabuk CVT mekanis konvensional',
              'Melalui roda gigi cincin diferensial depan secara langsung',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In a pure series hybrid / EREV, there is zero physical mechanical coupling between the combustion engine and the drive wheels. The engine drives a generator, which feeds electricity to the battery buffer or directly to the electric traction motors.',
            id: 'Pada sistem hibrida seri murni / EREV, tidak ada sambungan mekanis apa pun antara mesin bensin dan roda penggerak. Mesin bensin hanya memutar generator listrik untuk mengisi baterai atau mengaliri daya langsung ke motor listrik penggerak roda.',
          },
        },
        {
          id: 'hyb-q4-2',
          question: {
            en: 'Why is an internal combustion engine inside an EREV capable of achieving lower emissions and higher fuel efficiency than the same engine in a conventional non-hybrid vehicle?',
            id: 'Mengapa mesin pembakaran internal pada EREV mampu menghasilkan emisi lebih rendah dan efisiensi bahan bakar lebih tinggi daripada mesin serupa di mobil konvensional?',
          },
          options: {
            en: [
              'Because it is mechanically decoupled from road speed and can operate steadily at its single optimal Brake Specific Fuel Consumption (BSFC) sweet spot',
              'Because EREVs do not require lubricating engine oil',
              'Because the engine runs in reverse direction to reduce friction',
              'Because it runs without atmospheric oxygen',
            ],
            id: [
              'Karena terisolasi mekanis dari kecepatan laju mobil sehingga dapat bekerja konstan pada titik efisiensi konsumsi bahan bakar (BSFC) terbaiknya',
              'Karena mesin EREV tidak membutuhkan oli pelumas mesin',
              'Karena mesin berputar ke arah sebaliknya untuk memangkas gesekan',
              'Karena mesin bekerja tanpa memerlukan oksigen atmosfer',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In an EREV, the engine does not accelerate or decelerate with stop-and-go traffic. It operates in a steady-state quasi-stationary regime at peak thermal efficiency (~41% at 2,400 RPM), completely avoiding wasteful transient throttle conditions.',
            id: 'Pada EREV, putaran mesin tidak perlu naik-turun mengikuti kondisi lalu lintas jalanan. Mesin bekerja stabil pada titik efisiensi termal puncak (~41% di 2.400 RPM), sepenuhnya terhindar dari pemborosan bahan bakar akibat transien pembukaan gas.',
          },
        },
      ],
    },
  ],
};
