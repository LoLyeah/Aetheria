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
    // PART 1: INTRODUCTION TO HYBRID ARCHITECTURES, MOTIVATION & DECARBONIZATION
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-1',
      topicId: 'hybrid-vehicles',
      order: 1,
      title: {
        en: 'Introduction to Hybrid Architectures, Motivation & Comparative Landscape',
        id: 'Pengantar Arsitektur Hibrida, Motivasi & Lanskap Komparatif',
      },
      shortDescription: {
        en: 'Thermodynamic motivations, tank-to-wheel efficiency, decarbonization imperatives, and the comparative engineering taxonomy from MHEV to EREV.',
        id: 'Motivasi termodinamika, efisiensi tank-to-wheel, urgensi dekarbonisasi, dan taksonomi rekayasa komparatif dari MHEV hingga EREV.',
      },
      durationMinutes: 18,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'hybrid-powertrain',
      sections: [
        {
          id: 'hyb-1-sec-1',
          title: {
            en: '1. Thermodynamic Inefficiencies of Pure ICE & The Decarbonization Imperative',
            id: '1. Inefisiensi Termodinamika ICE Murni & Urgensi Dekarbonisasi',
          },
          content: {
            en: 'Transportation accounts for approximately one-fifth of global carbon dioxide (CO₂) emissions, with road passenger and commercial vehicles contributing over 75% of the sector\'s carbon footprint. For over a century, light-duty passenger vehicles have relied almost exclusively on internal combustion engines (ICE) operating on four-stroke Otto (gasoline) or Diesel cycles. Despite generations of metallurgical, fluidic, and electronic refinements, conventional ICE powertrains suffer from severe intrinsic thermodynamic and operational inefficiencies:\n\n• Low Real-World Tank-to-Wheel (TTW) Thermal Efficiency: While modern laboratory-tuned combustion engines achieve peak brake thermal efficiencies of 38–41% (gasoline) or 42–45% (diesel) at high load near wide-open throttle, everyday urban and suburban drive cycles force the engine to operate primarily at light partial loads (10–25% rated torque). Under these throttled conditions, severe intake pumping losses across the throttle valve, mechanical friction (piston skirts, crankshaft journals, valvetrain), and auxiliary loads drag real-world cycle-average efficiency down to an abysmal 18–25%.\n• Idle Fuel Consumption: In conventional vehicles, when stopped at red lights or in heavy traffic congestion, the engine must spin continuously at 700–900 RPM to sustain accessory drive belts (mechanical AC compressor, power steering, 12V alternator) and lubrication oil pressure. During idle, fuel is consumed at zero vehicle velocity, yielding instantaneous zero miles per gallon (0 km/L) and 100% waste enthalpy.\n• Total Kinetic Energy Dissipation: During braking, 100% of the vehicle\'s forward kinetic energy (½ m v²) is converted through friction into useless waste heat at the brake discs and pads, permanently dissipating thousands of kilojoules into ambient air.\n• The Electrification Continuum: Hybridization resolves every one of these three thermodynamic handicaps. By adding an electrochemical energy storage buffer (high-voltage battery) and bidirectional electric motor-generators, hybrid powertrains recover deceleration kinetic energy through regenerative braking, eliminate idle fuel burn via instantaneous engine shutdown and restart, and allow the combustion engine to operate along its optimal Brake Specific Fuel Consumption (BSFC) island.',
            id: 'Sektor transportasi menyumbang sekitar seperlima emisi karbon dioksida (CO₂) global, di mana kendaraan jalan raya menyumbang lebih dari 75% dari jejak karbon tersebut. Selama lebih dari satu abad, kendaraan penumpang mengandalkan mesin pembakaran internal (ICE) empat langkah bersiklus Otto (bensin) atau Diesel. Terlepas dari berbagai inovasi metalurgi dan manajemen elektronik, powertrain ICE konvensional menghadapi kelemahan termodinamika dan operasional yang mendasar:\n\n• Efisiensi Termal Tank-to-Wheel (TTW) Nyata yang Rendah: Kendati mesin pembakaran modern mampu meraih efisiensi termal puncak 38–41% (bensin) atau 42–45% (diesel) pada beban tinggi di laboratorium, siklus berkendara harian di perkotaan memaksa mesin beroperasi pada beban parsial rendah (10–25% torsi nominal). Pada kondisi ini, kerugian pemompaan intake (throttling losses), gesekan mekanis (dinding piston, kruk as, katup), dan beban aksesori menurunkan efisiensi rata-rata siklus nyata hingga hanya 18–25%.\n• Pemborosan Bahan Bakar Saat Stasioner (Idling): Pada mobil konvensional yang berhenti di lampu merah atau kemacetan, mesin harus terus berputar pada 700–900 RPM hanya untuk memutar sabuk aksesori (kompresor AC, pompa oli, alternator 12V). Saat stasioner, bahan bakar terbakar tanpa perpindahan jarak (kecepatan nol km/jam), menghasilkan efisiensi nol km/L dan 100% entalpi terbuang.\n• Disipasi Total Energi Kinetik Pengereman: Saat memperlambat kendaraan, 100% energi kinetik laju (½ m v²) diubah menjadi panas gesek tak berguna pada piringan dan kampas rem, membuang ribuan kilojoule ke udara sekitar.\n• Kontinuum Elektrifikasi: Elektrifikasi hibrida secara tuntas mengatasi ketiga kelemahan termodinamika ini. Melalui penambahan baterai penyangga elektrokimia dan motor-generator listrik dua arah, sistem hibrida memulihkan energi deselerasi via pengereman regeneratif, mematikan mesin sepenuhnya saat berhenti atau meluncur bebas, serta menjaga mesin bensin beroperasi eksklusif pada kurva efisiensi termal terbaik (BSFC optimum).',
          },
          formula: '\\eta_{\\text{TTW}} = \\frac{E_{\\text{tractive}}}{E_{\\text{fuel}} + E_{\\text{elec}}} = \\frac{\\int_{0}^{t_{\\text{cycle}}} \\left( F_{\\text{aero}} + F_{\\text{rr}} + F_{\\text{grade}} + m a \\right) v \\, dt}{m_{\\text{fuel}} \\cdot \\text{LHV}_{\\text{fuel}} + \\Delta E_{\\text{battery}}}',
          formulaExplanation: {
            en: 'Tank-to-Wheel (TTW) energy efficiency equation. The numerator represents total tractive work delivered at the road wheels overcoming aerodynamic drag (F_aero), rolling resistance (F_rr), gravitational hill climb (F_grade), and inertial acceleration (m a). The denominator balances chemical energy from combusted fuel mass via its lower heating value (m_fuel · LHV_fuel) plus net electrical energy consumed from the traction battery buffer (ΔE_battery).',
            id: 'Formulasi efisiensi energi Tank-to-Wheel (TTW). Pembilang merepresentasikan kerja traksi mekanis total di roda jalan untuk mengatasi hambatan aerodinamika (F_aero), hambatan gelinding ban (F_rr), gaya gravitasi tanjakan (F_grade), dan percepatan inersia (m a). Penyebut menggabungkan energi kimia dari massa bahan bakar terkonsumsi via nilai kalor bawah (m_fuel · LHV_fuel) ditambah energi listrik netto yang ditarik dari baterai traksi (ΔE_battery).',
          },
          variables: [
            {
              symbol: '\\eta_{\\text{TTW}}',
              name: { en: 'Tank-to-Wheel Efficiency', id: 'Efisiensi Tank-to-Wheel' },
              unit: 'Dimensionless (0.0 to 1.0 or %)',
              description: {
                en: 'Ratio of useful mechanical traction energy at wheels to total energy drawn from vehicle onboard reservoirs.',
                id: 'Rasio energi traksi mekanis berguna di roda terhadap total energi yang diambil dari cadangan bahan bakar dan baterai kendaraan.',
              },
            },
            {
              symbol: 'E_{\\text{tractive}}',
              name: { en: 'Delivered Tractive Energy', id: 'Energi Traksi Tersalurkan' },
              unit: 'kJ or kWh',
              description: {
                en: 'Net mechanical work integrated along the vehicle trajectory overcoming road load forces.',
                id: 'Kerja mekanis netto yang diintegralkan sepanjang rute untuk mengatasi gaya beban jalan.',
              },
            },
            {
              symbol: 'm_{\\text{fuel}}',
              name: { en: 'Fuel Mass Consumed', id: 'Massa Bahan Bakar Terkonsumsi' },
              unit: 'kg',
              description: {
                en: 'Total mass of combustible hydrocarbon liquid fuel consumed during the driving schedule.',
                id: 'Total massa bahan bakar hidrokarbon cair yang dikonsumsi selama siklus berkendara.',
              },
            },
            {
              symbol: '\\text{LHV}_{\\text{fuel}}',
              name: { en: 'Lower Heating Value of Fuel', id: 'Nilai Kalor Bawah Bahan Bakar' },
              unit: 'MJ/kg (typical ~43.5 MJ/kg for gasoline)',
              description: {
                en: 'Specific enthalpy of combustion per unit fuel mass assuming water vapor in exhaust does not condense.',
                id: 'Entalpi pembakaran spesifik per satuan massa bahan bakar dengan asumsi uap air hasil bakar tidak mengembun.',
              },
            },
            {
              symbol: '\\Delta E_{\\text{battery}}',
              name: { en: 'Net Battery Energy Delta', id: 'Perubahan Energi Baterai Netto' },
              unit: 'kWh or MJ',
              description: {
                en: 'Difference in battery stored electrical energy between cycle start and finish (positive if discharged, negative if charged).',
                id: 'Selisih energi listrik tersimpan pada baterai antara awal dan akhir siklus (positif jika terkuras, negatif jika terisi).',
              },
            },
          ],
          derivationSteps: [
            {
              title: { en: '1. Fuel Chemical Energy Input Calculation', id: '1. Perhitungan Masukan Energi Kimia Bahan Bakar' },
              math: 'E_{\\text{fuel}} = m_{\\text{fuel}} \\cdot \\text{LHV}_{\\text{fuel}} = \\int \\dot{m}_{\\text{fuel}}(t) \\cdot \\text{LHV} \\, dt',
              explanation: {
                en: 'Instantaneous fuel mass flow rate (kg/s) integrated over cycle duration multiplied by fuel lower heating value yields total chemical heat input.',
                id: 'Laju aliran massa bahan bakar instan (kg/s) diintegrasikan terhadap durasi siklus dan dikalikan nilai kalor bawah menghasilkan total input energi kimia.',
              },
            },
            {
              title: { en: '2. Integration of Road-Load Forces to Determine Tractive Energy', id: '2. Integrasi Gaya Beban Jalan untuk Menentukan Energi Traksi' },
              math: 'F_{\\text{total}}(t) = \\frac{1}{2} \\rho_{\\text{air}} C_d A v(t)^2 + C_{\\text{rr}} m g \\cos\\theta + m g \\sin\\theta + m \\frac{dv}{dt}',
              explanation: {
                en: 'Aerodynamic resistance, rolling friction, gradient gravity, and linear inertial force sum to yield instantaneous road resistance.',
                id: 'Tahanan aerodinamika, gesekan ban, gravitasi tanjakan, dan gaya inersia percepatan dijumlahkan menghasilkan beban tahanan seketika.',
              },
            },
            {
              title: { en: '3. Braking Energy Dissipation vs. Regenerative Recovery', id: '3. Disipasi Energi Pengereman vs. Pemulihan Regeneratif' },
              math: 'E_{\\text{brake, regen}} = \\eta_{\\text{regen}} \\cdot \\int_{a < 0} m \\left| a(t) \\right| v(t) \\, dt',
              explanation: {
                en: 'In conventional ICE vehicles, this integral dissipates 100% to friction heat (η_regen = 0). In hybrids, electric machines recapture 60–85% of deceleration energy back into battery chemical potential.',
                id: 'Pada mobil ICE konvensional, integral ini 100% terbuang jadi panas (η_regen = 0). Pada hibrida, motor listrik menangkap kembali 60–85% energi deselerasi ke dalam baterai.',
              },
            },
            {
              title: { en: '4. Cycle-Averaged Tank-to-Wheel Efficiency Formulation', id: '4. Formulasi Efisiensi Tank-to-Wheel Rata-Rata Siklus' },
              math: '\\eta_{\\text{TTW}} = \\frac{\\int F_{\\text{tractive}} v \\, dt}{E_{\\text{fuel}} + \\Delta E_{\\text{battery}}} \\implies \\eta_{\\text{hybrid}} \\approx 1.4 - 1.8 \\times \\eta_{\\text{ICE}}',
              explanation: {
                en: 'By eliminating idle burn and recapturing deceleration energy, hybrids increase TTW efficiency from 18–22% up to 38–48% on urban WLTP cycles.',
                id: 'Dengan meniadakan konsumsi stasioner dan menyerap kembali energi pengereman, sistem hibrida melipatgandakan efisiensi TTW dari 18–22% menjadi 38–48% pada siklus perkotaan WLTP.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Powertrain Type', 'Operating Voltage', 'Battery Capacity', 'Typical TTW Efficiency', 'City Fuel Savings vs. Pure ICE', 'Pure Electric Range'],
              id: ['Jenis Powertrain', 'Tegangan Kerja', 'Kapasitas Baterai', 'Efisiensi TTW Tipikal', 'Penghematan BBM Kota vs ICE', 'Jarak Tempuh Listrik Murni'],
            },
            rows: [
              {
                en: ['Pure ICE (Gasoline)', '12V DC', '0.05–0.08 kWh (Lead-acid)', '18%–24%', 'Baseline (0%)', '0 km (Engine must run)'],
                id: ['ICE Murni (Bensin)', '12V DC', '0,05–0,08 kWh (Aki timbal)', '18%–24%', 'Titik Acuan (0%)', '0 km (Mesin wajib hidup)'],
              },
              {
                en: ['Mild Hybrid (MHEV)', '48V DC (SELV)', '0.4–0.9 kWh (Lithium-ion)', '26%–30%', '10%–15%', '0–1 km (Sailing / coasting only)'],
                id: ['Mild Hybrid (MHEV)', '48V DC (SELV)', '0,4–0,9 kWh (Litium-ion)', '26%–30%', '10%–15%', '0–1 km (Hanya meluncur bebas)'],
              },
              {
                en: ['Full Hybrid (HEV)', '200V–650V DC', '1.2–2.1 kWh (NMC/LFP/NiMH)', '36%–42%', '35%–50%', '2–5 km (Low-speed EV crawl)'],
                id: ['Full Hybrid (HEV)', '200V–650V DC', '1,2–2,1 kWh (NMC/LFP/NiMH)', '36%–42%', '35%–50%', '2–5 km (EV pelan dalam kota)'],
              },
              {
                en: ['Plug-in Hybrid (PHEV)', '300V–400V DC', '12–25 kWh (Lithium-ion)', '45%–60% (Blended)', '60%–80% (Grid-charged)', '50–110 km (Highway EV mode)'],
                id: ['Plug-in Hybrid (PHEV)', '300V–400V DC', '12–25 kWh (Litium-ion)', '45%–60% (Kombinasi)', '60%–80% (Dicas listrik)', '50–110 km (Mode EV jalan tol)'],
              },
              {
                en: ['Extended-Range (EREV)', '350V–800V DC', '30–45 kWh (Lithium-ion)', '50%–65% (Series electric)', '70%–85% (Grid-charged)', '150–220 km (Pure series EV)'],
                id: ['Extended-Range (EREV)', '350V–800V DC', '30–45 kWh (Litium-ion)', '50%–65% (Serial elektrik)', '70%–85% (Dicas listrik)', '150–220 km (EV serial murni)'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Conventional internal combustion engines achieve dismal urban tank-to-wheel efficiency (18–24%) due to throttle pumping losses, idle fuel burn, and complete brake heat dissipation.',
              'Electrification through hybridization directly eliminates idle fuel waste, captures deceleration kinetic energy via regenerative braking, and loads the engine at its peak thermal efficiency island.',
              'From a raw material perspective, the "1-6-90 rule" highlights that the lithium and nickel required for one 100 kWh long-range BEV can alternatively produce 6 PHEV batteries or 90 HEV batteries, delivering vastly superior aggregate CO₂ reduction across an entire vehicle fleet.',
            ],
            id: [
              'Mesin pembakaran internal konvensional menghasilkan efisiensi tank-to-wheel perkotaan yang sangat buruk (18–24%) akibat rugi pemompaan throttle, bahan bakar terbuang saat stasioner, dan pelepasan energi kinetik rem menjadi panas.',
              'Elektrifikasi hibrida secara langsung meniadakan pemborosan stasioner, menangkap kembali energi kinetik deselerasi via pengereman regeneratif, dan memaksa mesin bekerja pada pulau efisiensi termal terbaiknya.',
              'Dari perspektif ketersediaan bahan baku baterai, aturan "1-6-90" menunjukkan bahwa mineral litium dan nikel untuk satu mobil listrik murni 100 kWh dapat digunakan untuk memproduksi 6 baterai PHEV atau 90 baterai HEV, memotong emisi CO₂ kumulatif armada secara jauh lebih masif.',
            ],
          },
        },
        {
          id: 'hyb-1-sec-2',
          title: {
            en: '2. Engineering Taxonomy: Mechanical vs. Electrical Power Coupling Across Hybrid Topologies',
            id: '2. Taksonomi Rekayasa: Kopling Daya Mekanis vs. Elektrikal Lintas Topologi Hibrida',
          },
          content: {
            en: 'To systematically evaluate hybrid electric vehicles, automotive powertrain engineers classify systems along two fundamental axes: the physical power coupling topology (Series, Parallel, Series-Parallel / Power-Split) and the quantitative Degree of Electrification (Hybridization Factor, HF):\n\n1. Energy Flow Topologies:\n• Series Hybrid: There is zero mechanical connection between the internal combustion engine and the vehicle drive wheels. The engine operates exclusively as a stationary generator set, driving an electric generator (MG1) to feed electrical current to the traction motor (MG2) and battery pack. The vehicle drives 100% on electric torque at all times. This architecture is the foundational principle of Extended-Range Electric Vehicles (EREV) and diesel-electric locomotives.\n• Parallel Hybrid: Both the combustion engine and the electric motor are mechanically coupled to the driven wheels through a common transmission or gear train. Both power sources can propel the vehicle individually or combine their torque simultaneously for maximum acceleration. Mechanical power split is typically managed via an automated disconnect clutch (K0) and step-ratio automatic or dual-clutch transmission.\n• Series-Parallel (Power-Split) Hybrid: Combines the advantages of both topologies by utilizing an epicyclic planetary gearset (e-CVT) to mechanically link the engine, generator (MG1), and drive motor (MG2). Part of the engine power is transmitted directly to the wheels through mechanical gear teeth, while the remainder is converted to electricity to either charge the battery or power MG2. This completely decouples vehicle road speed from engine rotational speed, enabling the engine to dwell continuously at its optimal BSFC operating point.\n\n2. SAE P0–P4 Electric Machine Placement Classification:\n• P0: Motor belted to the engine accessory drive (BSG/BiSG). Lowest cost, limited regeneration due to belt friction (~10–12 kW).\n• P1: Motor mounted directly on the engine crankshaft/flywheel hub. No belt slip, but cannot disconnect from engine rotating inertia.\n• P2: Motor mounted between an engine disconnect clutch (K0) and transmission input. Allows pure EV driving with engine decoupled and shut down.\n• P3: Motor mounted on transmission output shaft or differential input. Very high regenerative efficiency as it bypasses gearbox gear mesh drag.\n• P4: Motor mounted directly on the opposite non-driven axle (e-Axle), creating on-demand electronic all-wheel drive (e-AWD) without a mechanical driveshaft.',
            id: 'Untuk mengevaluasi kendaraan hibrida secara ilmiah, para insinyur powertrain mengklasifikasikan sistem berdasarkan dua sumbu utama: topologi kopling daya fisik (Serial, Paralel, Serial-Paralel / Power-Split) serta derajat elektrifikasi kuantitatif (Faktor Hibridisasi, HF):\n\n1. Klasifikasi Topologi Aliran Energi:\n• Hibrida Serial (Series Hybrid): Sama sekali tidak ada hubungan mekanis langsung antara mesin pembakaran bensin dengan roda penggerak. Mesin beroperasi murni sebagai genset mini, memutar generator (MG1) untuk menyuplai arus listrik ke motor traksi (MG2) dan baterai. Mobil melaju 100% dengan torsi motor listrik setiap saat. Ini merupakan prinsip dasar Extended-Range Electric Vehicle (EREV) dan lokomotif diesel-elektrik.\n• Hibrida Paralel (Parallel Hybrid): Mesin bensin dan motor listrik terhubung secara mekanis ke roda melalui transmisi bersama. Keduanya dapat menggerakkan mobil secara mandiri atau memadukan torsinya secara serentak untuk akselerasi maksimal. Pembagian daya mekanis diatur melalui kopling pemutus otomatis (K0) dan transmisi otomatis bertingkat atau kopling ganda.\n• Hibrida Serial-Paralel (Power-Split): Memadukan keunggulan kedua topologi menggunakan girboks planet e-CVT yang menjembatani mesin, generator (MG1), dan motor traksi (MG2). Sebagian tenaga mesin disalurkan langsung secara mekanis ke roda, sementara sebagian lainnya diubah menjadi listrik untuk mengisi baterai atau memutar MG2. Ini memutus korelasi kaku antara kecepatan laju mobil dan RPM mesin, membiarkan mesin beroperasi stabil pada titik efisiensi puncak (BSFC minimum).\n\n2. Klasifikasi Posisi Motor Listrik SAE P0–P4:\n• P0: Motor terpasang pada sabuk aksesori mesin (BSG/BiSG). Biaya terendah, regenerasi terbatas oleh friksi sabuk (~10–12 kW).\n• P1: Motor terpasang langsung pada poros engkol / roda gila (flywheel). Bebas selip, namun tidak dapat dilepas dari inersia putar mesin.\n• P2: Motor terpasang di antara kopling pemutus mesin (K0) dan input transmisi. Mendukung pengendaraan listrik murni dengan mesin bensin mati total.\n• P3: Motor terpasang pada poros output transmisi atau diferensial. Efisiensi regenerasi sangat tinggi karena melewati gesekan girboks.\n• P4: Motor terpasang langsung pada as roda seberang (e-Axle), menghasilkan sistem penggerak semua roda elektronik (e-AWD) tanpa poros gardan tengah.',
          },
          formula: 'HF = \\frac{P_{\\text{EM, peak}}}{P_{\\text{EM, peak}} + P_{\\text{ICE, peak}}}, \\quad P_{\\text{wheel}}(t) = \\eta_{\\text{drivetrain}} \\cdot \\left[ \\alpha(t) \\cdot P_{\\text{ICE}} + \\beta(t) \\cdot P_{\\text{EM}} \\right]',
          formulaExplanation: {
            en: 'The Hybridization Factor (HF) and net instantaneous wheel power equation. HF defines the electrification fraction (from ~0.05 for 48V MHEV to ~1.0 for pure series EREV / BEV). In the wheel power equation, α(t) and β(t) represent dynamic power-split coupling coefficients dictated by the operational transmission state (pure EV, pure ICE, parallel boost, or regenerative braking).',
            id: 'Formulasi Faktor Hibridisasi (HF) dan daya mekanis roda seketika. HF mendefinisikan proporsi elektrifikasi (mulai dari ~0,05 pada MHEV 48V hingga ~1,0 pada EREV serial murni / BEV). Pada persamaan daya roda, koefisien α(t) dan β(t) mencerminkan status kopling transmisi hibrida (EV murni, mesin bensin murni, boost paralel, atau pengereman regeneratif).',
          },
          variables: [
            {
              symbol: 'HF',
              name: { en: 'Hybridization Factor', id: 'Faktor Hibridisasi' },
              unit: 'Dimensionless (0.0 to 1.0)',
              description: {
                en: 'Ratio of maximum rated electric machine power to total combined installed powertrain power.',
                id: 'Rasio daya puncak motor listrik terhadap total daya kombinasi seluruh sistem powertrain terpasang.',
              },
            },
            {
              symbol: 'P_{\\text{EM, peak}}',
              name: { en: 'Peak Electric Motor Power', id: 'Daya Puncak Motor Listrik' },
              unit: 'kW',
              description: {
                en: 'Combined maximum continuous or 30-second burst power output of electric traction motor(s).',
                id: 'Daya output kontinu atau lonjakan 30 detik gabungan dari motor traksi listrik.',
              },
            },
            {
              symbol: 'P_{\\text{ICE, peak}}',
              name: { en: 'Peak Internal Combustion Engine Power', id: 'Daya Puncak Mesin Pembakaran Internal' },
              unit: 'kW',
              description: {
                en: 'Maximum rated mechanical power developed by the internal combustion engine at wide-open throttle.',
                id: 'Daya mekanis maksimum yang dihasilkan mesin pembakaran dalam pada bukaan katup gas penuh.',
              },
            },
            {
              symbol: 'P_{\\text{wheel}}',
              name: { en: 'Delivered Tractive Wheel Power', id: 'Daya Traksi Tersalurkan ke Roda' },
              unit: 'kW',
              description: {
                en: 'Net mechanical power delivered directly at the vehicle contact patches with the road.',
                id: 'Daya mekanis bersih yang tersalurkan langsung ke permukaan kontak ban dengan aspal.',
              },
            },
            {
              symbol: '\\alpha(t), \\beta(t)',
              name: { en: 'Power Split State Coefficients', id: 'Koefisien Status Pembagian Daya' },
              unit: 'Binary or Continuous scalar [0, 1]',
              description: {
                en: 'Engagement multipliers determined by clutch engagement states (K0) and inverter modulation vector.',
                id: 'Pengali keterlibatan daya yang ditentukan status kopling transmisi (K0) dan modulasi inverter listrik.',
              },
            },
          ],
          derivationSteps: [
            {
              title: { en: '1. Definition of Installed Electrification Ratio (HF)', id: '1. Definisi Rasio Elektrifikasi Terpasang (HF)' },
              math: 'HF = \\frac{\\sum P_{\\text{EM}}}{\\sum P_{\\text{EM}} + P_{\\text{ICE}}} \\in [0, 1]',
              explanation: {
                en: 'Calculates the relative electrical propulsion capability of the vehicle. Micro/Mild hybrids operate at HF < 0.15; full hybrids at 0.25–0.45; PHEVs at 0.45–0.65; pure series EREVs at HF ≈ 0.70–1.0.',
                id: 'Menghitung kapabilitas propulsi listrik relatif kendaraan. Micro/Mild hybrid berada pada HF < 0,15; full hybrid pada 0,25–0,45; PHEV pada 0,45–0,65; dan EREV serial murni pada HF ≈ 0,70–1,0.',
              },
            },
            {
              title: { en: '2. Series Topology Tractive Power Formulation', id: '2. Formulasi Daya Traksi Topologi Serial' },
              math: 'P_{\\text{wheel, series}} = \\eta_{\\text{motor}} \\cdot \\eta_{\\text{gear}} \\cdot P_{\\text{MG2}} = \\eta_{\\text{drive}} \\cdot \\left[ \\eta_{\\text{gen}} \\eta_{\\text{inv}} P_{\\text{ICE}} + P_{\\text{batt, dis}} \\right]',
              explanation: {
                en: 'In pure series architectures (EREV), all traction torque is produced by MG2. Mechanical energy from the engine suffers double-conversion losses (mechanical -> electrical -> mechanical) but enables the engine to run at fixed peak BSFC.',
                id: 'Pada arsitektur serial murni (EREV), seluruh torsi roda berasal dari MG2. Energi mesin mengalami konversi ganda (mekanis -> listrik -> mekanis) namun membebaskan mesin beroperasi pada BSFC paling hemat.',
              },
            },
            {
              title: { en: '3. Parallel Topology Torque Summation Formulation', id: '3. Formulasi Penjumlahan Torsi Topologi Paralel' },
              math: 'T_{\\text{wheel, parallel}} = i_{\\text{gear}} \\cdot i_{\\text{final}} \\cdot \\left[ u_{\\text{K0}} \\cdot T_{\\text{ICE}}(\\omega_{\\text{in}}) + T_{\\text{EM}}(\\omega_{\\text{in}}) \\right]',
              explanation: {
                en: 'Torques from the engine and electric motor add directly onto the transmission input shaft, bypassing double conversion losses during high-speed highway cruising.',
                id: 'Torsi dari mesin bensin dan motor listrik dijumlahkan langsung pada poros transmisi, menghindari rugi konversi listrik ganda saat melaju di jalan tol.',
              },
            },
            {
              title: { en: '4. Series-Parallel Planetary Power Split Synthesis', id: '4. Sintesis Pembagian Daya Planet e-CVT Serial-Paralel' },
              math: 'P_{\\text{wheel, split}} = \\underbrace{\\frac{\\rho}{1 + \\rho} P_{\\text{ICE}}}_{\\text{Direct Mechanical Path}} + \\underbrace{\\eta_{\\text{elec}} \\left[ \\frac{1}{1 + \\rho} P_{\\text{ICE}} + P_{\\text{batt}} \\right]}_{\\text{Electrical Variator Path}}',
              explanation: {
                en: 'The epicyclic sun-carrier-ring gear divides engine power into an instantaneous direct mechanical branch and an electrical branch, dynamically optimizing overall powertrain efficiency.',
                id: 'Roda gigi planet (sun-carrier-ring) membagi daya mesin menjadi jalur mekanis langsung dan jalur variator elektrik, secara dinamis memaksimalkan efisiensi keseluruhan.',
              },
            },
          ],
          comparisonTable: {
            headers: {
              en: ['Topology', 'Engine-to-Wheel Link', 'Motor Function', 'Clutch / Gearbox Needs', 'Primary Thermodynamic Advantage'],
              id: ['Topologi', 'Hubungan Mesin ke Roda', 'Fungsi Motor Listrik', 'Kebutuhan Kopling / Girboks', 'Keunggulan Termodinamika Utama'],
            },
            rows: [
              {
                en: ['Series (EREV)', 'None (100% Decoupled)', 'Sole traction source (MG2) + dedicated generator (MG1)', 'Single-speed reduction gear, zero shift clutches', 'Engine operates continuously at single optimal BSFC sweet spot'],
                id: ['Serial (EREV)', 'Tidak Ada (Terputus 100%)', 'Penggerak utama tunggal (MG2) + generator khusus (MG1)', 'Gigi reduksi tunggal tanpa kopling transmisi bertingkat', 'Mesin beroperasi konstan pada titik efisiensi BSFC terbaik'],
              },
              {
                en: ['Parallel (P2 PHEV)', 'Direct mechanical link via K0 clutch', 'Boost assist, pure EV driving, and regenerative braking', 'Multi-speed AT/DCT with automated disconnect clutch (K0)', 'Zero double-conversion electrical losses during steady highway cruise'],
                id: ['Paralel (P2 PHEV)', 'Koneksi mekanis langsung via kopling K0', 'Asistensi boost, pengendaraan EV murni, dan rem regeneratif', 'Transmisi AT/DCT multi-rasio dengan kopling pemutus K0', 'Bebas kerugian konversi listrik ganda saat kecepatan tinggi di jalan tol'],
              },
              {
                en: ['Series-Parallel (HEV e-CVT)', 'Split epicyclic planetary gearing', 'MG1 acts as reaction generator; MG2 drives wheels & regens', 'Planetary gearset (sun, carrier, ring), no friction bands/belts', 'Continuous stepless speed decoupling allows peak engine efficiency'],
                id: ['Serial-Paralel (HEV e-CVT)', 'Terbagi via roda gigi planet episiklik', 'MG1 sebagai generator reaksi; MG2 penggerak & regenerasi', 'Satu set roda gigi planet tanpa sabuk/kopling friksi gesek', 'Pemisahan putaran rasio kontinu membiarkan mesin di efisiensi puncak'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'The Hybridization Factor (HF) provides a rigorous mathematical metric for classifying powertrains from mild assist (HF ~ 0.1) to pure series range extenders (HF ~ 1.0).',
              'Series hybrids completely uncouple the internal combustion engine from road speed variations, operating the engine as a stationary generator at minimum BSFC.',
              'Series-parallel power-split architectures leverage planetary kinematics to balance direct mechanical torque transmission with electrical speed decoupling, maximizing efficiency across diverse city and highway cycles.',
            ],
            id: [
              'Faktor Hibridisasi (HF) memberikan tolok ukur matematis yang ketat untuk mengklasifikasikan powertrain mulai dari mild hybrid (HF ~ 0,1) hingga EREV serial murni (HF ~ 1,0).',
              'Sistem hibrida serial memutus total keterkaitan antara putaran mesin bensin dan kecepatan laju mobil, mengoperasikan mesin sebagai genset stasioner pada konsumsi BBM spesifik (BSFC) terendah.',
              'Arsitektur serial-paralel power-split memanfaatkan kinematika roda gigi planet untuk menyeimbangkan penyaluran torsi mekanis langsung dengan variasi kecepatan elektrik, meraih efisiensi puncak di segala siklus.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyb-q1-1',
          question: {
            en: 'Which dimensionless parameter quantitatively defines the degree of powertrain electrification, and what fundamentally distinguishes a series hybrid from a parallel hybrid architecture?',
            id: 'Parameter tanpa dimensi manakah yang secara kuantitatif mendefinisikan tingkat elektrifikasi powertrain, dan apa perbedaan mendasar antara arsitektur hibrida serial dan paralel?',
          },
          options: {
            en: [
              'The Hybridization Factor (HF = P_EM / [P_EM + P_ICE]); in a series hybrid, the internal combustion engine has zero mechanical connection to the drive wheels, whereas in a parallel hybrid, both the engine and motor can deliver mechanical torque to the wheels simultaneously.',
              'The Brake Specific Fuel Consumption (BSFC); in a series hybrid, the engine is rigidly bolted to the transmission input shaft, while in a parallel hybrid, the engine only drives an alternator.',
              'The Volumetric Compression Ratio; in a series hybrid, the electric motor is mounted on the front accessory belt (P0), whereas in a parallel hybrid, the motor is mounted inside the battery pack.',
              'The Pulsatility Index; in a series hybrid, the vehicle must be plugged into a high-voltage AC wallbox, whereas parallel hybrids can only charge through lead-acid alternator circuits.',
            ],
            id: [
              'Faktor Hibridisasi (HF = P_EM / [P_EM + P_ICE]); pada hibrida serial, mesin bensin sama sekali tidak memiliki hubungan mekanis ke roda penggerak, sedangkan pada hibrida paralel, mesin dan motor listrik dapat menyalurkan torsi mekanis ke roda secara bersamaan.',
              'Brake Specific Fuel Consumption (BSFC); pada hibrida serial, mesin dibaut kaku ke poros transmisi roda, sedangkan pada hibrida paralel, mesin hanya memutar alternator 12V.',
              'Rasio Kompresi Volumetrik; pada hibrida serial, motor listrik dipasang pada sabuk aksesori (P0), sedangkan pada hibrida paralel motor diletakkan di dalam modul baterai.',
              'Indeks Pulsatilitas; pada hibrida serial mobil wajib dicolok ke charger AC eksternal, sedangkan hibrida paralel hanya mengisi daya via aki timbal-asam.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The Hybridization Factor (HF) is defined as the ratio of peak electric motor power to total installed power (P_EM / [P_EM + P_ICE]). In a series architecture (such as an EREV), the internal combustion engine is completely mechanically decoupled from the road wheels and operates strictly as a generator feeding electrical current to the traction battery and drive motor. In contrast, parallel architectures allow direct mechanical torque contribution from both the engine and electric motor to the driven wheels.',
            id: 'Faktor Hibridisasi (HF) didefinisikan sebagai rasio daya puncak motor listrik terhadap total daya terpasang (P_EM / [P_EM + P_ICE]). Pada arsitektur serial (seperti EREV), mesin bensin terputus secara mekanis dari roda jalan dan bekerja murni sebagai generator penyuplai arus ke baterai dan motor listrik traksi. Sebaliknya, arsitektur paralel memungkinkan penyaluran torsi mekanis langsung secara simultan dari mesin bensin dan motor listrik ke roda penggerak.',
          },
        },
        {
          id: 'hyb-q1-2',
          question: {
            en: 'Why does conventional stop-and-go urban driving cause severe thermal efficiency degradation in pure internal combustion engine (ICE) vehicles compared to hybrid electric vehicles?',
            id: 'Mengapa kondisi lalu lintas stop-and-go perkotaan menyebabkan penurunan efisiensi termal yang sangat parah pada mobil mesin bensin murni (ICE) dibandingkan mobil listrik hibrida?',
          },
          options: {
            en: [
              'Because urban driving produces excessive catalytic converter backpressure that chokes the intake manifold valves.',
              'Because pure ICE vehicles continuously burn fuel during idle at zero speed, suffer severe intake throttling pumping losses at light partial loads, and dissipate 100% of deceleration kinetic energy as friction heat instead of capturing it through regenerative braking.',
              'Because stop-and-go driving reduces ambient air density around the radiator, causing the combustion chambers to overcool and misfire.',
              'Because modern tires experience zero rolling resistance at speeds below 30 km/h, which confuses the engine electronic control unit.',
            ],
            id: [
              'Karena kondisi perkotaan memicu tekanan balik berlebih pada konverter katalitik yang menyumbat katup intake manifold.',
              'Karena mobil ICE murni terus membakar bensin saat berhenti (stasioner) pada kecepatan nol, mengalami rugi pemompaan intake akibat katup throttle pada beban rendah, serta membuang 100% energi kinetik pengereman menjadi panas alih-alih menyerapnya via rem regeneratif.',
              'Karena berkendara stop-and-go menurunkan kerapatan udara di sekitar radiator sehingga ruang bakar terlalu dingin dan gagal membakar bensin.',
              'Karena ban modern tidak memiliki hambatan gelinding di bawah 30 km/jam sehingga membingungkan unit kendali mesin (ECU).',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Conventional ICE vehicles suffer from three major urban thermodynamic penalties: (1) fuel burn during vehicle standstill (idling with 0 km/L economy), (2) high throttling pumping work across the intake butterfly valve at low load (10–25% torque), which drops engine thermal efficiency from ~38% down to 18–22%, and (3) complete dissipation of vehicle kinetic energy as useless friction heat in the brake pads. Hybrids eliminate idle fuel burn, operate the engine at optimal load, and recapture kinetic energy via regenerative braking.',
            id: 'Mobil bensin konvensional menderita tiga kerugian termodinamika besar di perkotaan: (1) pemborosan bahan bakar saat berhenti (idling dengan konsumsi 0 km/L), (2) kerugian pemompaan throttle intake yang tinggi pada beban parsial rendah (10–25% torsi) yang menjatuhkan efisiensi termal dari ~38% menjadi 18–22%, serta (3) pelepasan total energi kinetik kendaraan menjadi panas gesekan kampas rem. Sistem hibrida mengeliminasi bahan bakar stasioner, menjaga mesin pada beban optimum, dan memulihkan energi kinetik via pengereman regeneratif.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: MILD HYBRID ELECTRIC VEHICLES (MHEV) & 48V ARCHITECTURE
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-2',
      topicId: 'hybrid-vehicles',
      order: 2,
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
          id: 'hyb-2-sec-1',
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
          id: 'hyb-2-sec-2',
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
          id: 'hyb-q2-1',
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
          id: 'hyb-q2-2',
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
    // PART 3: FULL HYBRID ELECTRIC VEHICLES (HEV) & PLANETARY POWER-SPLIT
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-3',
      topicId: 'hybrid-vehicles',
      order: 3,
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
          id: 'hyb-3-sec-1',
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
          id: 'hyb-3-sec-2',
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
          id: 'hyb-q3-1',
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
          id: 'hyb-q3-2',
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
    // PART 4: PLUG-IN HYBRID ELECTRIC VEHICLES (PHEV) & MULTI-CLUTCH TOPOLOGIES
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-4',
      topicId: 'hybrid-vehicles',
      order: 4,
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
          id: 'hyb-4-sec-1',
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
          id: 'hyb-4-sec-2',
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
          id: 'hyb-q4-1',
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
          id: 'hyb-q4-2',
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
    // PART 5: EXTENDED-RANGE ELECTRIC VEHICLES (EREV) & SERIES POWERTRAINS
    // -------------------------------------------------------------
    {
      id: 'hyb-mod-5',
      topicId: 'hybrid-vehicles',
      order: 5,
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
          id: 'hyb-5-sec-1',
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
          id: 'hyb-5-sec-2',
          title: {
            en: '2. Cascading Electrical Conversion Losses & Highway Cruising Energetics',
            id: '2. Kerugian Konversi Listrik Beruntun & Energetika Jelajah Jalan Tol',
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
          id: 'hyb-q5-1',
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
          id: 'hyb-q5-2',
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
