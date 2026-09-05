import { Topic } from '@/types/learning';

export const biomesEcologyTopic: Topic = {
  id: 'biomes-ecology',
  title: {
    en: 'Global Biomes, Climatology & Ecosystem Dynamics',
    id: 'Bioma Global, Klimatologi & Dinamika Ekosistem',
  },
  tagline: {
    en: 'Whittaker biome envelopes, atmospheric circulation cells, marine stratification, trophic cascades, and biosphere resilience.',
    id: 'Diagram bioma Whittaker, sirkulasi sel atmosfer, stratifikasi oseanografi, kaskade trofik, dan resiliensi biosfer.',
  },
  description: {
    en: 'Explore the biophysical principles governing the global distribution of life: from planetary insolation, tri-cellular atmospheric circulation, and Whittaker climate envelopes to cryospheric permafrost physics, temperate phenology, xerophytic adaptations, coral reef calcification, trophic energetics, and Anthropocene tipping points.',
    id: 'Pelajari prinsip-prinsip biofisika yang mengatur distribusi kehidupan di bumi: dari radiasi surya global, sirkulasi atmosfer tri-seluler, dan diagram iklim Whittaker hingga fisika permafrost kriosfer, fenologi hutan sedang, adaptasi xerofitik, kalsifikasi terumbu karang, energetika trofik, dan titik kritis Antroposen.',
  },
  category: {
    en: 'Ecology & Earth Systems Science',
    id: 'Ekologi & Sains Sistem Bumi',
  },
  colorAccent: 'emerald',
  badgeColor: 'from-emerald-600 to-teal-700',
  iconName: 'Globe',
  modules: [
    // =============================================================
    // PART 1: WHITTAKER CLIMATOLOGY & ATMOSPHERIC CIRCULATION
    // =============================================================
    {
      id: 'biome-mod-1',
      topicId: 'biomes-ecology',
      order: 1,
      title: {
        en: 'Part 1: Whittaker Climatology & Planetary Atmospheric Circulation',
        id: 'Bagian 1: Klimatologi Whittaker & Sirkulasi Atmosfer Planet',
      },
      shortDescription: {
        en: 'Radiative equilibrium, tri-cellular Hadley-Ferrel-Polar circulation, adiabatic lapse rates, and the Whittaker-Budyko climatological envelope.',
        id: 'Keseimbangan radiatif, sirkulasi tri-seluler Hadley-Ferrel-Polar, laju penurunan adiabatik, dan diagram klimatologi Whittaker-Budyko.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-1-sec-1',
          title: {
            en: '1. Solar Insolation, Axial Tilt & Latitudinal Energy Imbalance',
            id: '1. Insolasi Surya, Kemiringan Sumbu & Ketidakseimbangan Energi Latitudinal',
          },
          content: {
            en: 'The fundamental driver of planetary climate and biome distribution is the latitudinal gradient in solar insolation. The Earth orbits the Sun with an axial obliquity of approximately 23.44°, which modulates the solar zenith angle θ_z and produces seasonal shifts in the Intertropical Convergence Zone (ITCZ).\n\nAt the top of the atmosphere, the solar constant S_0 is approximately 1361 W/m². However, because the Earth is a rotating oblate spheroid, this radiant flux is distributed over the global spherical surface area (4πR²), yielding an average incoming insolation of S_0 / 4 ≈ 340 W/m².\n\nThe planetary energy balance equation balances absorbed shortwave solar flux against outgoing longwave terrestrial radiation (OLR):\n\n(1 - α) · (S_0 / 4) = ε · σ · T_e⁴\n\nWhere α is the planetary albedo (~0.30) and σ is the Stefan-Boltzmann constant. Due to geometric beam spreading (Lambert’s cosine law) and longer optical pathlengths through the atmosphere at high latitudes, the tropics experience a net annual radiative surplus (insolation > OLR), whereas polar regions experience a net annual radiative deficit (OLR > insolation). Planetary atmospheric and oceanic circulations operate as a giant thermodynamic heat engine, transporting approximately 5 to 6 Petawatts (PW) of thermal energy poleward to prevent catastrophic equatorial runaway heating and polar deep freeze.',
            id: 'Pendorong fundamental iklim bumi dan persebaran bioma adalah gradien latitudinal dalam insolasi matahari. Bumi mengorbit Matahari dengan kemiringan sumbu rotasi (oblikuitas) sekitar 23,44°, yang memodulasi sudut zenit matahari θ_z dan menghasilkan pergeseran musiman Zona Konvergensi Antar-Tropis (ITCZ).\n\nDi batas atas atmosfer, konstanta matahari S_0 bernilai sekitar 1361 W/m². Namun, karena bumi merupakan bola berputar, fluks radiasi ini terdistribusi ke seluruh luas permukaan bola (4πR²), menghasilkan insolasi rata-rata datang sebesar S_0 / 4 ≈ 340 W/m².\n\nPersamaan keseimbangan energi planet menyeimbangkan fluks gelombang pendek surya yang diserap terhadap radiasi gelombang panjang bumi yang dipancarkan ke luar angkasa (OLR):\n\n(1 - α) · (S_0 / 4) = ε · σ · T_e⁴\n\nDi mana α adalah albedo planet (~0,30) dan σ adalah konstanta Stefan-Boltzmann. Akibat penyebaran berkas geometris (hukum kosinus Lambert) dan lintasan optik atmosfer yang lebih panjang di lintang tinggi, daerah tropis mengalami surplus radiasi tahunan bersih (insolasi > OLR), sedangkan daerah kutub mengalami defisit radiasi tahunan bersih (OLR > insolasi). Sirkulasi atmosfer dan laut global bertindak sebagai mesin termodinamika raksasa yang mentranspor sekitar 5 hingga 6 Petawatt (PW) energi termal ke arah kutub.',
          },
          formula: '(1 - \\alpha) \\frac{S_0}{4} = \\varepsilon \\sigma T_e^4',
          formulaExplanation: {
            en: 'Planetary Zero-Dimensional Radiative Equilibrium: Equates net absorbed shortwave solar radiation to outgoing longwave blackbody radiation emitted by Earth at effective temperature T_e.',
            id: 'Keseimbangan Radiasi Nol-Dimensi Planet: Menyamakan radiasi gelombang pendek surya bersih yang diserap dengan radiasi benda hitam gelombang panjang yang dipancarkan Bumi pada suhu efektif T_e.',
          },
          variables: [
            {
              symbol: 'S_0',
              name: { en: 'Solar Constant', id: 'Konstanta Surya' },
              unit: 'W/m²',
              description: {
                en: 'Total solar irradiance at the top of the Earth atmosphere (~1361 W/m²).',
                id: 'Total iradiansi surya di batas atas atmosfer Bumi (~1361 W/m²).',
              },
            },
            {
              symbol: '\\alpha',
              name: { en: 'Planetary Albedo', id: 'Albedo Planet' },
              unit: 'dimensionless (0-1)',
              description: {
                en: 'Fraction of incident solar radiation reflected back to space (~0.30).',
                id: 'Fraksi radiasi surya datang yang dipantulkan kembali ke luar angkasa (~0,30).',
              },
            },
            {
              symbol: '\\sigma',
              name: { en: 'Stefan-Boltzmann Constant', id: 'Konstanta Stefan-Boltzmann' },
              unit: 'W/(m²·K⁴)',
              description: {
                en: 'Physical constant of blackbody radiation (5.670374 × 10⁻⁸ W/m²K⁴).',
                id: 'Konstanta fisika radiasi benda hitam (5,670374 × 10⁻⁸ W/m²K⁴).',
              },
            },
            {
              symbol: 'T_e',
              name: { en: 'Effective Radiating Temperature', id: 'Suhu Radiasi Efektif' },
              unit: 'K',
              description: {
                en: 'Effective blackbody emission temperature of Earth (~255 K / -18°C without greenhouse effect).',
                id: 'Suhu emisi benda hitam efektif Bumi (~255 K / -18°C tanpa efek rumah kaca).',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Equatorial regions receive maximum annual insolation per unit area, creating a steep poleward thermal gradient.',
              'Axial tilt of 23.44° causes seasonal migration of solar zenith and precipitation bands.',
            ],
            id: [
              'Wilayah khatulistiwa menerima insolasi tahunan maksimum per satuan luas, menciptakan gradien termal curam ke arah kutub.',
              'Kemiringan sumbu 23,44° menyebabkan pergeseran musiman zenit matahari dan sabuk presipitasi.',
            ],
          },
        },
        {
          id: 'biome-1-sec-2',
          title: {
            en: '2. Tri-Cellular Atmospheric Circulation & Coriolis Geostrophy',
            id: '2. Sirkulasi Atmosfer Tri-Seluler & Geostrofi Coriolis',
          },
          content: {
            en: 'Because the Earth is a rapidly rotating sphere, poleward heat transport cannot occur via a single hemispheric convection cell. Instead, planetary rotation introduces the Coriolis acceleration (a_c = 2Ω × v), which fragments atmospheric circulation into three distinct cells per hemisphere:\n\n1. Hadley Cell (0° to 30° latitude): Intense equatorial heating triggers deep convective updrafts along the ITCZ, driving adiabatic cooling, condensation, and torrential convective rainfall (sustaining tropical rainforests). In the upper troposphere, air diverges poleward, cools radiatively, and deflects eastward due to Coriolis force. Around 30°N and 30°S, the cooled air descends dynamically in the Subtropical High-Pressure Ridge. Adiabatic compression warms and dries this descending air, suppressing cloud formation and producing the world’s great subtropical deserts (e.g., Sahara, Arabian, Sonoran, Kalahari, Great Australian).\n\n2. Ferrel Cell (30° to 60° latitude): An indirect, thermally reverse cell driven by eddy momentum fluxes and synoptic baroclinic storm systems. Surface winds blow poleward and deflect eastward, generating the prevailing Mid-Latitude Westerlies.\n\n3. Polar Cell (60° to 90° latitude): Extremely cold, dense polar air sinks at the poles, generating polar high pressure and diverging equatorward as the Polar Easterlies. The collision between warm mid-latitude westerlies and cold polar air at approximately 60° latitude forms the Polar Front, a region of intense cyclogenesis, rising air, and heavy precipitation that sustains temperate deciduous and boreal forests.',
            id: 'Karena Bumi berputar cepat pada porosnya, transportasi panas ke kutub tidak dapat terjadi melalui satu sel konveksi tunggal. Rotasi planet memunculkan percepatan Coriolis (a_c = 2Ω × v), yang memecah sirkulasi atmosfer menjadi tiga sel di setiap belahan bumi:\n\n1. Sel Hadley (lintang 0° hingga 30°): Pemanasan khatulistiwa intens memicu arus konveksi naik masif di sepanjang ITCZ, menyebabkan pendinginan adiabatik, kondensasi, dan hujan lebat (menopang hutan hujan tropis). Di troposfer atas, udara memancar ke kutub, mendingin secara radiatif, dan berbelok ke timur. Di sekitar lintang 30°U dan 30°S, udara dingin turun (subsiden) di Sabuk Tekanan Tinggi Subtropis. Kompresi adiabatik memanaskan dan mengeringkan udara turun ini, melenyapkan awan dan membentuk sabuk gurun subtropis dunia (Sahara, Arab, Sonora, Kalahari, Australia).\n\n2. Sel Ferrel (lintang 30° hingga 60°): Sel tidak langsung yang digerakkan oleh perturbasi siklonik dan gelombang baroklinik. Angin permukaan berhembus ke arah kutub dan membelok ke timur, membentuk Angin Barat (Prevailing Westerlies).\n\n3. Sel Polar (lintang 60° hingga 90°): Udara kutub yang sangat dingin dan padat turun di kutub, menciptakan tekanan tinggi kutub dan bergerak ke khatulistiwa sebagai Angin Timur Kutub (Polar Easterlies). Pertemuan antara udara barat yang hangat dan udara kutub yang dingin di sekitar lintang 60° membentuk Front Kutub, wilayah siklogenesis aktif dengan presipitasi tinggi yang menopang hutan gugur sedang dan taiga boreal.',
          },
          comparisonTable: {
            headers: {
              en: ['Atmospheric Cell', 'Latitudinal Domain', 'Vertical Motion', 'Surface Pressure', 'Associated Terrestrial Biomes'],
              id: ['Sel Atmosfer', 'Domain Lintang', 'Gerak Vertikal', 'Tekanan Permukaan', 'Bioma Terestrial Terkait'],
            },
            rows: [
              {
                en: ['Hadley Cell (Equatorial branch)', '0° - 10° N/S', 'Strong Convective Ascent', 'Equatorial Low (Doldrums / ITCZ)', 'Tropical Rainforest, Peat Swamp Forest'],
                id: ['Sel Hadley (Cabang Ekuator)', '0° - 10° LU/LS', 'Konveksi Naik Kuat', 'Tekanan Rendah Ekuator (ITCZ)', 'Hutan Hujan Tropis, Hutan Rawa Gambut'],
              },
              {
                en: ['Hadley Cell (Subtropical branch)', '20° - 35° N/S', 'Dynamic Subsidence (Adiabatic warming)', 'Subtropical High (Horse Latitudes)', 'Hot Deserts, Semi-Arid Shrublands'],
                id: ['Sel Hadley (Cabang Subtropis)', '20° - 35° LU/LS', 'Subsiden Dinamis (Pemanasan adiabatik)', 'Tekanan Tinggi Subtropis', 'Gurun Panas, Semak Semi-Arid'],
              },
              {
                en: ['Ferrel Cell', '35° - 60° N/S', 'Baroclinic Uplift & Frontal Mixing', 'Subpolar Low Belt', 'Temperate Deciduous Forest, Temperate Grasslands'],
                id: ['Sel Ferrel', '35° - 60° LU/LS', 'Pengangkatan Baroklinik & Frontal', 'Sabuk Tekanan Rendah Subpolar', 'Hutan Gugur Beriklim Sedang, Padang Rumput'],
              },
              {
                en: ['Polar Cell', '65° - 90° N/S', 'Thermal Subsidence of Dense Freezing Air', 'Polar High', 'Boreal Taiga, Arctic & Alpine Tundra, Polar Desert'],
                id: ['Sel Polar', '65° - 90° LU/LS', 'Subsiden Termal Udara Sangat Dingin', 'Tekanan Tinggi Kutub', 'Taiga Boreal, Tundra Arktik/Alpin, Gurun Kutub'],
              },
            ],
          },
        },
        {
          id: 'biome-1-sec-3',
          title: {
            en: '3. Orographic Lifting, Lapse Rates & Continentality',
            id: '3. Pengangkatan Orografik, Laju Penurunan Adiabatik & Kontinentalitas',
          },
          content: {
            en: 'While latitude dictates general insolation, regional climate envelopes are shaped by adiabatic lapse rates and continentality.\n\nAs moist air masses encounter mountain ranges, they are forced upward (orographic lifting). The parcel expands under lower atmospheric pressure and cools at the Dry Adiabatic Lapse Rate (Γ_d ≈ 9.8°C/km) until reaching dewpoint at the Lifting Condensation Level (LCL). Once saturated, water vapor condenses, releasing latent heat of vaporization (L_v ≈ 2.5 × 10⁶ J/kg), which offsets cooling and reduces the cooling rate to the Moist Adiabatic Lapse Rate (Γ_m ≈ 4–6°C/km).\n\nAfter shedding moisture on the windward slope, the dry air parcel descends the leeward slope, warming rapidly at the dry lapse rate (Γ_d = 9.8°C/km). This generates a severe rain shadow and hot, dry foehn/chinook winds on the leeward side, establishing cold or rain-shadow desert biomes (e.g., the Great Basin behind the Sierra Nevada, the Patagonian Desert behind the Andes).\n\nContinentality expresses the thermal inertia contrast between land and ocean: water possesses a specific heat capacity (c_p ≈ 4184 J/kg·K) roughly four times greater than dry rock and soil (c_p ≈ 800–1000 J/kg·K). Maritime regions experience buffered annual temperature ranges (low continentality), whereas continental interiors (e.g., Siberia, central Canada) experience extreme seasonal swings exceeding 60°C.',
            id: 'Meskipun garis lintang menentukan insolasi umum, pola iklim regional dibentuk oleh laju penurunan adiabatik dan kontinentalitas.\n\nKetika massa udara lembap membentur barisan pegunungan, udara dipaksa naik (pengangkatan orografik). Parsel udara memuai di bawah tekanan atmosfer yang lebih rendah dan mendingin pada Laju Penurunan Adiabatik Kering (Γ_d ≈ 9,8°C/km) hingga mencapai titik embun pada Lifting Condensation Level (LCL). Begitu jenuh, uap air terkondensasi dan melepaskan kalor laten penguapan (L_v ≈ 2,5 × 10⁶ J/kg), yang mengurangi laju pendinginan menjadi Laju Penurunan Adiabatik Basah (Γ_m ≈ 4–6°C/km).\n\nSetelah mencurahkan hujan di lereng hadap angin (windward), udara kering meluncur turun di lereng bayangan angin (leeward), memanas cepat pada laju kering (Γ_d = 9,8°C/km). Hal ini menciptakan bayangan hujan ekstrem dan angin fohn/chinook yang panas dan kering, melahirkan bioma gurun bayangan hujan (seperti Great Basin di balik Sierra Nevada, Gurun Patagonia di balik Pegunungan Andes).\n\nKontinentalitas menyatakan kontras inersia termal antara daratan dan lautan: air memiliki kapasitas kalor jenis (c_p ≈ 4184 J/kg·K) sekitar 4 kali lebih besar daripada batuan dan tanah kering (c_p ≈ 800–1000 J/kg·K). Wilayah maritim memiliki fluktuasi suhu tahunan yang sempit, sedangkan pedalaman benua (seperti Siberia dan Kanada tengah) mengalami variasi musim ekstrem yang melebihi 60°C.',
          },
          formula: '\\frac{d e_s}{dT} = \\frac{L_v \\cdot e_s}{R_v \\cdot T^2}',
          formulaExplanation: {
            en: 'Clausius-Clapeyron Equation: Defines the exponential increase in saturation vapor pressure e_s with air temperature T (~7% increase per 1°C of warming).',
            id: 'Persamaan Clausius-Clapeyron: Menentukan peningkatan eksponensial tekanan uap jenuh e_s terhadap suhu udara T (~7% peningkatan per kenaikan 1°C).',
          },
          variables: [
            {
              symbol: 'e_s',
              name: { en: 'Saturation Vapor Pressure', id: 'Tekanan Uap Jenuh' },
              unit: 'hPa / kPa',
              description: {
                en: 'Partial pressure of water vapor in equilibrium with liquid water at temperature T.',
                id: 'Tekanan parsial uap air dalam keseimbangan dengan air cair pada suhu T.',
              },
            },
            {
              symbol: 'L_v',
              name: { en: 'Latent Heat of Vaporization', id: 'Kalor Laten Penguapan' },
              unit: 'J/kg',
              description: {
                en: 'Energy required to transform unit mass of water from liquid to gas (~2.501 × 10⁶ J/kg at 0°C).',
                id: 'Energi yang dibutuhkan untuk mengubah satu satuan massa air dari cair ke gas (~2,501 × 10⁶ J/kg pada 0°C).',
              },
            },
            {
              symbol: 'R_v',
              name: { en: 'Specific Gas Constant for Water Vapor', id: 'Konstanta Gas Spesifik Uap Air' },
              unit: 'J/(kg·K)',
              description: {
                en: 'Gas constant for water vapor (461.5 J/(kg·K)).',
                id: 'Konstanta gas untuk uap air (461,5 J/(kg·K)).',
              },
            },
          ],
        },
        {
          id: 'biome-1-sec-4',
          title: {
            en: '4. The Whittaker Biome Space & Budyko Hydrological Framework',
            id: '4. Ruang Bioma Whittaker & Kerangka Hidrologi Budyko',
          },
          content: {
            en: 'In 1975, ecologist Robert Whittaker demonstrated that the global distribution of major terrestrial biomes can be mapped within a two-dimensional climate space defined by Mean Annual Temperature (MAT, ranging from -15°C to +30°C) and Mean Annual Precipitation (MAP, ranging from 0 to >450 cm/yr).\n\nThe Whittaker diagram categorizes biomes into triangular envelopes:\n- Cold extremes (< -5°C): Tundra dominates at low-to-moderate precipitation; continuous ice sheets dominate where ablation is lower than accumulation.\n- Subpolar cold (-5°C to +3°C): Boreal taiga covers vast areas with 40 to 150 cm/yr precipitation.\n- Temperate (3°C to 18°C): Moisture gradient stratifies the landscape from Temperate Desert (MAP < 25 cm) to Temperate Grassland (25–75 cm) to Temperate Deciduous Forest (75–200 cm) and Temperate Rainforest (> 200 cm).\n- Tropical (> 18°C): Aridity drives the transition from Subtropical Desert (< 30 cm) to Thorn Woodland/Savanna (50–150 cm) to Tropical Seasonal Forest (150–250 cm) to Tropical Rainforest (> 250 cm).\n\nMikhail Budyko expanded this physically via the Budyko Aridity Index (Φ = R_n / (λ · P)), which compares net surface radiation R_n (energy available to evaporate water) to precipitation P multiplied by latent heat λ. When Φ > 1, the ecosystem is water-limited (arid/semi-arid where evaporative demand exceeds rainfall); when Φ < 1, the ecosystem is energy-limited (humid/tropical where rainfall exceeds potential evapotranspiration).',
            id: 'Pada tahun 1975, pakar ekologi Robert Whittaker membuktikan bahwa persebaran global bioma terestrial utama dapat dipetakan dalam ruang iklim dua dimensi yang ditentukan oleh Suhu Rata-rata Tahunan (MAT, -15°C hingga +30°C) dan Presipitasi Rata-rata Tahunan (MAP, 0 hingga >450 cm/tahun).\n\nDiagram Whittaker mengelompokkan bioma ke dalam amplop batas segitiga:\n- Ekstrem dingin (< -5°C): Tundra mendominasi pada presipitasi rendah hingga sedang; tudung es abadi berada di daerah dengan akumulasi es melebihi ablasi.\n- Dingin subpolar (-5°C hingga +3°C): Taiga boreal membentang luas pada presipitasi 40 hingga 150 cm/tahun.\n- Beriklim sedang (3°C hingga 18°C): Gradien kelembapan membagi lanskap dari Gurun Beriklim Sedang (MAP < 25 cm), Padang Rumput Sedang (25–75 cm), Hutan Gugur Sedang (75–200 cm), hingga Hutan Hujan Sedang (> 200 cm).\n- Tropis (> 18°C): Ketersediaan air mengendalikan transisi dari Gurun Subtropis (< 30 cm), Sabana/Hutan Berduri (50–150 cm), Hutan Musim Tropis (150–250 cm), hingga Hutan Hujan Tropis (> 250 cm).\n\nMikhail Budyko memperdalam formulasi fisik ini melalui Indeks Kekeringan Budyko (Φ = R_n / (λ · P)), yang membandingkan radiasi bersih permukaan R_n (energi yang tersedia untuk evaporasi) terhadap presipitasi P dikalikan kalor laten λ. Jika Φ > 1, ekosistem berada dalam batas air (water-limited, di mana permintaan evaporasi melebihi curah hujan); jika Φ < 1, ekosistem berada dalam batas energi (energy-limited, di mana curah hujan melebihi evapotranspirasi potensial).',
          },
          formula: '\\Phi = \\frac{R_n}{\\lambda \\cdot P}',
          formulaExplanation: {
            en: 'Budyko Aridity Index: Dimensionless ratio of net surface radiation R_n (potential evaporative energy demand) to precipitation latent heat flux (λ · P). Values > 1 indicate water limitation; values < 1 indicate energy limitation.',
            id: 'Indeks Kekeringan Budyko: Rasio tak berdimensi antara radiasi bersih permukaan R_n (permintaan energi evaporasi potensial) terhadap fluks kalor laten presipitasi (λ · P). Nilai > 1 menandakan keterbatasan air; nilai < 1 menandakan keterbatasan energi.',
          },
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Surface Energy & Water Coupling',
                id: 'Langkah 1: Penggabungan Energi & Air Permukaan',
              },
              math: 'R_n = \\lambda E + H + G',
              explanation: {
                en: 'Net radiation R_n is partitioned into latent heat flux (λE), sensible heat flux (H), and ground conductive heat flux (G). Over annual timescales, G ≈ 0.',
                id: 'Radiasi bersih R_n dibagi menjadi fluks kalor laten (λE), fluks kalor sensibel (H), dan fluks panas tanah konduktif (G). Dalam skala tahunan, G ≈ 0.',
              },
            },
            {
              title: {
                en: 'Step 2: Hydrological Conservation Boundary',
                id: 'Langkah 2: Batas Konservasi Hidrologi',
              },
              math: 'P = E + Q + \\Delta S',
              explanation: {
                en: 'Precipitation P equals actual evapotranspiration E plus runoff Q and storage change ΔS (where ΔS ≈ 0 over multiple years).',
                id: 'Presipitasi P sama dengan evapotranspirasi aktual E ditambah limpasan permukaan Q dan perubahan cadangan air ΔS (di mana ΔS ≈ 0 dalam jangka panjang).',
              },
            },
            {
              title: {
                en: 'Step 3: Asymptotic Evaporation Limits',
                id: 'Langkah 3: Batas Asimtotik Evaporasi',
              },
              math: '\\frac{E}{P} \\le \\min(1, \\Phi)',
              explanation: {
                en: 'Actual evapotranspiration cannot exceed precipitation (E ≤ P, water limit) nor net available radiative energy (λE ≤ R_n, energy limit).',
                id: 'Evapotranspirasi aktual tidak dapat melampaui presipitasi (E ≤ P, batas air) maupun energi radiasi bersih yang tersedia (λE ≤ R_n, batas energi).',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'The Atacama Hyper-Aridity Triple Mechanism',
              id: 'Mekanisme Tiga Lapis Hiper-Ariditas Gurun Atacama',
            },
            context: {
              en: 'The Atacama Desert in northern Chile is the driest non-polar desert on Earth, with some weather stations recording zero precipitation over multiple decades.',
              id: 'Gurun Atacama di Chili utara adalah gurun non-kutub terkering di Bumi, dengan beberapa stasiun meteorologi mencatat nol curah hujan selama beberapa dekade berturut-turut.',
            },
            analysis: {
              en: 'The extreme dryness of the Atacama is created by three compounding climatological factors:\n1. Subtropical High-Pressure Subsidence: Positioned at 24°S beneath the sinking branch of the Hadley Cell.\n2. Humboldt (Peru) Cold Current: The upwelling of frigid Antarctic deep water cools coastal surface air, creating a persistent marine temperature inversion that locks moisture into low stratus fog (camanchaca) and completely prevents vertical convective cloud development.\n3. The Andean Rain Shadow: The 5000m Andean cordillera completely blocks moist Amazonian trade winds from the east.',
              id: 'Kekeringan ekstrem Atacama tercipta oleh tiga faktor klimatologis yang saling menguatkan:\n1. Subsiden Tekanan Tinggi Subtropis: Terletak di lintang 24°LS tepat di bawah cabang turun Sel Hadley.\n2. Arus Dingin Humboldt (Peru): Upwelling air dingin Antarktika mendinginkan udara permukaan pesisir, menciptakan inversi suhu laut persisten yang memerangkap kelembapan dalam kabut stratus rendah (camanchaca) dan sepenuhnya mencegah pertumbuhan awan konvektif.\n3. Bayangan Hujan Andes: Pegunungan Andes setinggi 5000m memblokir total angin pasat Amazon yang lembap dari arah timur.',
            },
            takeaway: {
              en: 'Biome formation is determined by the intersection of planetary-scale circulation, regional oceanic boundary currents, and orographic topography.',
              id: 'Pembentukan bioma ditentukan oleh perpaduan antara sirkulasi skala planet, arus batas samudra regional, dan topografi orografis.',
            },
          },
        },
      ],
      quiz: [
        {
          id: 'biome-q1-1',
          question: {
            en: 'Why do the world’s major hot deserts concentrate around 25°–35° North and South latitudes?',
            id: 'Mengapa sebagian besar gurun panas utama di dunia terkonsentrasi di sekitar lintang 25°–35° Utara dan Selatan?',
          },
          options: {
            en: [
              'Because the descending limb of the Hadley Cell causes dynamic subsidence and adiabatic warming that disperses cloud cover.',
              'Because solar insolation is strictly higher at 30° latitude than at the equator throughout the entire year.',
              'Because the Coriolis force reaches zero at 30° latitude, preventing wind circulation.',
              'Because oceanic evaporation ceases completely at subtropical latitudes.',
            ],
            id: [
              'Karena cabang turun Sel Hadley menyebabkan subsiden dinamis dan pemanasan adiabatik yang melenyapkan tutupan awan.',
              'Karena insolasi matahari di lintang 30° secara absolut lebih tinggi daripada di khatulistiwa sepanjang tahun.',
              'Karena gaya Coriolis bernilai nol di lintang 30°, sehingga menghentikan sirkulasi angin.',
              'Karena evaporasi samudra terhenti sama sekali di lintang subtropis.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Subtropical high-pressure ridges at ~30° latitude are formed by the descending branch of the Hadley Cell. As air sinks, adiabatic compression increases temperature and lowers relative humidity, creating hyper-arid conditions.',
            id: 'Sabuk tekanan tinggi subtropis di lintang ~30° terbentuk oleh cabang turun Sel Hadley. Saat udara turun, kompresi adiabatik menaikkan suhu dan menurunkan kelembapan relatif, menciptakan kondisi hiper-arid.',
          },
        },
        {
          id: 'biome-q1-2',
          question: {
            en: 'What occurs according to the Clausius-Clapeyron relation when atmospheric temperature increases by 1°C?',
            id: 'Apakah yang terjadi menurut hubungan Clausius-Clapeyron saat suhu atmosfer meningkat sebesar 1°C?',
          },
          options: {
            en: [
              'Saturation vapor pressure decreases linearly by 15%.',
              'Atmospheric water vapor holding capacity increases by approximately 7%.',
              'The latent heat of vaporization doubles.',
              'Planetary albedo instantly drops to zero.',
            ],
            id: [
              'Tekanan uap jenuh menurun secara linier sebesar 15%.',
              'Kapasitas atmosfer dalam menampung uap air meningkat sekitar 7%.',
              'Kalor laten penguapan meningkat dua kali lipat.',
              'Albedo planet seketika anjlok menjadi nol.',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'The Clausius-Clapeyron relation dictates that saturation vapor pressure increases exponentially with temperature at a rate of approximately 7% per degree Celsius in typical atmospheric ranges.',
            id: 'Hubungan Clausius-Clapeyron menetapkan bahwa tekanan uap jenuh meningkat secara eksponensial terhadap suhu dengan laju sekitar 7% per kenaikan derajat Celsius pada rentang atmosfer troposfer.',
          },
        },
        {
          id: 'biome-q1-3',
          question: {
            en: 'In the Whittaker biome classification, which two physical climatic variables define the primary biome envelope coordinates?',
            id: 'Dalam klasifikasi bioma Whittaker, dua variabel iklim fisik manakah yang menentukan koordinat utama amplop bioma?',
          },
          options: {
            en: [
              'Soil pH and Photosynthetically Active Radiation (PAR)',
              'Surface Wind Speed and Atmospheric Pressure',
              'Mean Annual Temperature (MAT) and Mean Annual Precipitation (MAP)',
              'Solar Zenith Angle and Relative Humidity',
            ],
            id: [
              'pH Tanah dan Radiasi Aktif Fotosintesis (PAR)',
              'Kecepatan Angin Permukaan dan Tekanan Atmosfer',
              'Suhu Rata-rata Tahunan (MAT) dan Presipitasi Rata-rata Tahunan (MAP)',
              'Sudut Zenit Matahari dan Kelembapan Relatif',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Whittaker’s model maps global terrestrial biomes on a two-dimensional grid of Mean Annual Temperature (MAT) and Mean Annual Precipitation (MAP).',
            id: 'Model Whittaker memetakan bioma darat global pada kisi dua dimensi yang tersusun atas Suhu Rata-rata Tahunan (MAT) dan Presipitasi Rata-rata Tahunan (MAP).',
          },
        },
        {
          id: 'biome-q1-4',
          question: {
            en: 'Under the Budyko framework, what does an aridity index value of Φ = 2.5 signify?',
            id: 'Berdasarkan kerangka Budyko, apakah arti dari nilai indeks kekeringan Φ = 2,5?',
          },
          options: {
            en: [
              'An arctic polar desert with negative surface radiation.',
              'An energy-limited ecosystem with constant water saturation and deep peat formation.',
              'A tropical rainforest with zero runoff and maximum cloud cover.',
              'A water-limited ecosystem where potential evaporative energy exceeds precipitation by a factor of 2.5 (arid/semi-arid).',
            ],
            id: [
              'Gurun kutub arktik dengan radiasi permukaan bernilai negatif.',
              'Ekosistem dengan keterbatasan energi dengan kejenuhan air konstan dan pembentukan gambut dalam.',
              'Hutan hujan tropis dengan limpasan nol dan tutupan awan maksimum.',
              'Ekosistem dengan keterbatasan air di mana permintaan energi evaporasi potensial melebihi curah hujan sebesar 2,5 kali (arid/semi-arid).',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'When Φ > 1, the radiative energy available to evaporate water (R_n) exceeds the water supplied by precipitation (λP), defining a water-limited arid or semi-arid regime.',
            id: 'Ketika Φ > 1, energi radiasi yang tersedia untuk menguapkan air (R_n) melampaui pasokan air dari presipitasi (λP), mendefinisikan rezim arid atau semi-arid dengan keterbatasan air.',
          },
        },
      ],
    },

    // =============================================================
    // PART 2: CRYOSPHERIC & HIGH-LATITUDE BIOMES: TUNDRA & TAIGA
    // =============================================================
    {
      id: 'biome-mod-2',
      topicId: 'biomes-ecology',
      order: 2,
      title: {
        en: 'Part 2: Cryospheric & High-Latitude Biomes: Tundra & Boreal Taiga',
        id: 'Bagian 2: Bioma Kriosfer & Lintang Tinggi: Tundra & Taiga Boreal',
      },
      shortDescription: {
        en: 'Permafrost cryoturbation, Stefan thaw depth kinetics, needleleaf xeromorphy, and Spodosol pedogenesis.',
        id: 'Krioturbasi permafrost, kinetika kedalaman pencairan Stefan, xeromorfi daun jarum, dan pedogenesis Spodosol.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-2-sec-1',
          title: {
            en: '1. Arctic Tundra Cryolithology & Active Layer Dynamics',
            id: '1. Kriolitologi Tundra Arktik & Dinamika Lapisan Aktif',
          },
          content: {
            en: 'The Arctic and Alpine Tundra biomes occupy high-latitude regions poleward of the latitudinal treeline (~60°N to 75°N) and high mountain elevations above the alpine timberline. The defining physical feature of tundra is permafrost: ground that remains at or below 0°C continuously for two or more consecutive years.\n\nPermafrost consists of two vertical structural zones:\n1. The Permafrost Base / Table: Permanently frozen mineral and organic soil, frequently cemented by interstitial ice lenses, wedge ice, and massive ground ice bodies.\n2. The Active Layer: The uppermost surface horizon (10 to 100 cm thick) that undergoes seasonal thaw during the brief arctic summer (50 to 90 frost-free days) and refreezes during autumn.\n\nBecause the underlying permafrost is impermeable to liquid water, summer meltwater cannot percolate downward into deep aquifers, leading to widespread surface waterlogging, bog formation, and anaerobic soil conditions despite low annual precipitation (often < 250 mm/yr). Repeated freeze-thaw cycles produce cryoturbation (frost churning), which sorts soil grains by particle size and creates distinctive patterned ground, including polygonal ice-wedge networks, stone rings, and frost blisters (pingos).',
            id: 'Bioma Tundra Arktik dan Alpin menempati wilayah lintang tinggi di utara batas pertumbuhan pohon (treeline, ~60°LU hingga 75°LU) serta puncak pegunungan tinggi di atas timberline. Ciri fisik mendasar tundra adalah permafrost: lapisan tanah yang suhunya berada pada atau di bawah 0°C secara terus-menerus selama dua tahun berturut-turut atau lebih.\n\nPermafrost terdiri atas dua zona struktural vertikal:\n1. Dasar/Meja Permafrost (Permafrost Table): Lapisan tanah mineral dan organik yang membeku permanen, sering kali disemen oleh lensa es interstisial, irisan es (ice wedges), dan es tanah masif.\n2. Lapisan Aktif (Active Layer): Lapisan permukaan teratas (tebal 10 hingga 100 cm) yang mencair selama musim panas arktik yang singkat (50 hingga 90 hari bebas beku) dan membeku kembali saat musim gugur.\n\nKarena lapisan permafrost di bawahnya kedap air cair, air lelehan musim panas tidak dapat meresap ke akuifer dalam, menyebabkan genangan air luas, pembentukan rawa gambut, dan kondisi tanah anaerobik meskipun curah hujan tahunan rendah (sering kali < 250 mm/tahun). Siklus beku-cair berulang memicu krioturbasi (pengadukan akibat pembekuan), yang memilah partikel tanah berdasarkan ukuran dan membentuk pola tanah unik (patterned ground), seperti poligon irisan es, cincin batu, dan pingo.',
          },
          formula: 'D = \\sqrt{\\frac{2 \\cdot k_t \\cdot \\text{DDT}}{\\rho \\cdot L}}',
          formulaExplanation: {
            en: 'Stefan’s Permafrost Thaw Equation: Calculates the maximum seasonal active-layer thaw depth D as a function of thermal conductivity k_t, Thawing Degree Days (DDT), dry density ρ, and latent heat of fusion L.',
            id: 'Persamaan Pencairan Stefan untuk Permafrost: Menghitung kedalaman maksimum pencairan lapisan aktif musiman D sebagai fungsi konduktivitas termal k_t, Thawing Degree Days (DDT), kerapatan kering ρ, dan kalor laten fusi L.',
          },
          variables: [
            {
              symbol: 'D',
              name: { en: 'Active Layer Thaw Depth', id: 'Kedalaman Pencairan Lapisan Aktif' },
              unit: 'm',
              description: {
                en: 'Maximum depth of seasonal thaw during summer period.',
                id: 'Kedalaman maksimum pencairan musiman selama periode musim panas.',
              },
            },
            {
              symbol: 'k_t',
              name: { en: 'Thawed Soil Thermal Conductivity', id: 'Konduktivitas Termal Tanah Cair' },
              unit: 'W/(m·K)',
              description: {
                en: 'Rate of heat conduction through thawed organic and mineral matrix (~1.0–1.8 W/(m·K)).',
                id: 'Laju konduksi panas melalui matriks organik dan mineral yang mencair (~1,0–1,8 W/(m·K)).',
              },
            },
            {
              symbol: '\\text{DDT}',
              name: { en: 'Degree Days of Thawing', id: 'Derajat Hari Pencairan' },
              unit: '°C·days',
              description: {
                en: 'Cumulative integral of daily mean air temperatures above 0°C over the thaw season.',
                id: 'Integral kumulatif suhu udara rata-rata harian di atas 0°C sepanjang musim pencairan.',
              },
            },
            {
              symbol: 'L',
              name: { en: 'Latent Heat of Fusion of Ice', id: 'Kalor Laten Fusi Es' },
              unit: 'J/kg',
              description: {
                en: 'Enthalpy change required to melt ice to water (3.34 × 10⁵ J/kg).',
                id: 'Perubahan entalpi yang diperlukan untuk mencairkan es menjadi air (3,34 × 10⁵ J/kg).',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Quasi-Steady Conductive Heat Flux',
                id: 'Langkah 1: Fluks Panas Konduksi Kuasi-Tunak',
              },
              math: 'q = -k_t \\frac{\\partial T}{\\partial z} \\approx k_t \\frac{T_s - T_f}{D}',
              explanation: {
                en: 'Assuming a linear temperature profile across thawed soil of instantaneous depth D, conductive heat flux driving the thaw interface downward is proportional to thermal conductivity k_t and surface temperature T_s above freezing (T_f = 0°C).',
                id: 'Dengan mengasumsikan profil suhu linier sepanjang tanah mencair sedalam D, fluks panas konduksi yang mendorong batas pencairan ke bawah sebanding dengan konduktivitas termal k_t dan suhu permukaan T_s di atas titik beku (T_f = 0°C).',
              },
            },
            {
              title: {
                en: 'Step 2: Latent Heat Energy Balance at Phase-Change Interface',
                id: 'Langkah 2: Keseimbangan Energi Kalor Laten pada Batas Transisi Fase',
              },
              math: 'q = \\rho L \\frac{dD}{dt} = k_t \\frac{T_s}{D}',
              explanation: {
                en: 'At the moving freezing front (z = D), heat conducted from the surface is consumed exclusively to melt interstitial pore ice, releasing latent heat of fusion L per unit volume (ρ L dD/dt).',
                id: 'Pada batas pembekuan bergerak (z = D), panas konduksi dari permukaan seluruhnya diserap untuk mencairkan es pori tanah, melepaskan kalor laten fusi L per satuan volume (ρ L dD/dt).',
              },
            },
            {
              title: {
                en: 'Step 3: Variable Separation & Degree-Day Integration',
                id: 'Langkah 3: Pemisahan Variabel & Integrasi Derajat-Hari',
              },
              math: '\\int_0^D D \\, dD = \\frac{k_t}{\\rho L} \\int_0^t T_s(t) \\, dt \\implies \\frac{D^2}{2} = \\frac{k_t}{\\rho L} \\text{DDT}',
              explanation: {
                en: 'Integrating both sides yields D = √[(2 k_t · DDT) / (ρ L)], proving active layer thaw depth scales strictly with the square root of cumulative thawing degree days due to the increasing thermal resistance of the thawed soil column.',
                id: 'Integrasi kedua sisi menghasilkan D = √[(2 k_t · DDT) / (ρ L)], membuktikan bahwa kedalaman pencairan bertambah sebanding dengan akar kuadrat derajat-hari pencairan akibat meningkatnya resistansi termal kolom tanah yang telah mencair.',
              },
            },
          ],
        },
        {
          id: 'biome-2-sec-2',
          title: {
            en: '2. Tundra Plant Ecophysiology & Cryo-Adaptations',
            id: '2. Ekofisiologi & Adaptasi Tanaman Tundra terhadap Suhu Beku',
          },
          content: {
            en: 'Tundra vegetation faces multiple severe physiological stressors: sub-zero temperatures, intense wind abrasion from blowing ice crystals, short growing seasons, physiological drought during winter (when water is frozen and unavailable), and extreme seasonal photoperiods (continuous 24-hour sunlight in summer versus polar night in winter).\n\nKey evolutionary adaptations include:\n1. Prostrate Cushion and Dwarf Shrub Architecture: Species such as Salix polaris (polar willow) and Dryas octopetala grow within a boundary layer of calm, warmed air just 5 to 15 cm above the ground surface. Solar heating of dark soil surfaces raises ground temperatures 5°C to 10°C above ambient air temperature.\n2. Anthocyanin Photoprotection: High-latitude plants accumulate photoprotective anthocyanins and carotenoids to absorb excess ultraviolet (UV-B) and high-irradiance visible light, preventing photoinhibition of Photosystem II when low temperatures slow down Calvin-Benson enzymatic kinetics.\n3. Supercooling and Extracellular Freezing: Tundra plants accumulate low-molecular-weight cryoprotectants (proline, sucrose, raffinose family oligosaccharides) and ice-nucleating proteins in extracellular spaces. Water is drawn out of protoplasts to freeze harmlessly in intercellular voids, preventing intracellular ice crystal formation that would rupture cell membranes.',
            id: 'Vegetasi tundra menghadapi berbagai tekanan fisiologis ekstrem: suhu di bawah nol, abrasi angin kencang akibat kristal es, musim tanam singkat, kekeringan fisiologis saat musim dingin (air membeku dan tidak dapat diserap akar), serta fotoperiode musiman ekstrem (matahari 24 jam penuh di musim panas versus malam kutub di musim dingin).\n\nAdaptasi evolusioner utama meliputi:\n1. Morfologi Bantalan Menjalar (Prostrate Cushion) & Semak Kerdil: Spesies seperti Salix polaris (willow kutub) dan Dryas octopetala tumbuh di dalam lapisan batas mikro (micro-boundary layer) setinggi 5 hingga 15 cm di atas permukaan tanah. Pemanasan matahari pada tanah gelap menaikkan suhu mikro 5°C hingga 10°C di atas suhu udara ambien.\n2. Fotoproteksi Antosianin: Tumbuhan lintang tinggi mengumpulkan antosianin dan karotenoid fotoprotektif untuk menyerap kelebihan radiasi ultraviolet (UV-B) dan cahaya tampak berintensitas tinggi, mencegah fotoinhibisi pada Fotosistem II saat suhu dingin memperlambat kinetika enzimatik siklus Calvin-Benson.\n3. Pembekuan Ekstraseluler & Supercooling: Tumbuhan tundra mengonsentrasikan zat krioprotektan molekul rendah (prolin, sukrosa, rafinosa) dan protein pengintian es di ruang ekstraseluler. Air ditarik keluar dari sitoplasma untuk membeku secara aman di rongga antar-sel, mencegah kristal es intraseluler yang dapat merobek membran sel.',
          },
          keyTakeaways: {
            en: [
              'Tundra plants exploit boundary layer thermal buffering by growing in compact, low-stature prostrate forms.',
              'Extracellular freezing prevents lethal cellular membrane puncture from sharp ice crystal growth.',
            ],
            id: [
              'Tumbuhan tundra memanfaatkan penyangga termal lapisan batas mikro dengan tumbuh dalam bentuk bantalan kerdil merayap.',
              'Pembekuan ekstraseluler mencegah perforasi membran sel yang mematikan akibat pertumbuhan kristal es runcing.',
            ],
          },
        },
        {
          id: 'biome-2-sec-3',
          title: {
            en: '3. Boreal Taiga Ecology & Coniferous Xeromorphy',
            id: '3. Ekologi Taiga Boreal & Morfologi Xeromorfik Konifer',
          },
          content: {
            en: 'The Boreal Forest (Taiga, from Russian тайга) is the world’s largest contiguous terrestrial biome, encircling the northern hemisphere across Russia, Scandinavia, Canada, and Alaska (~50°N to 65°N). It represents approximately 29% of global forest cover.\n\nThe dominant flora consists of evergreen needleleaf gymnosperms: Picea (spruce), Abies (fir), Pinus (pine), and the deciduous conifer Larix (larch), which dominates extreme continental eastern Siberia where winter temperatures drop below -60°C.\n\nConifers exhibit specialized xeromorphic and cold adaptations:\n1. Conical Tiered Crown Architecture: Steeply angled branches shed heavy wet snow loads, preventing branch mechanical failure (snow snap).\n2. Needleleaf Morphology & Thick Cuticle: Needles present a minimal surface-area-to-volume ratio, with deeply sunken stomata and thick waxy cuticles that minimize transpirational water loss during winter when roots cannot absorb water from frozen soils (winter desiccation).\n3. Tracheid Xylem Anatomy: Gymnosperm xylem consists exclusively of narrow single-celled tracheids (diameter 10–25 µm), unlike the wide vessel elements of angiosperms (50–300 µm). Narrow lumens minimize the risk of freeze-thaw cavitation (air embolism formation when dissolved gas bubbles nucleate during thawing under negative xylem pressure).',
            id: 'Hutan Boreal (Taiga, dari bahasa Rusia тайга) adalah bioma terestrial terluas dan bersambung di dunia, melingkari belahan bumi utara di seluruh Rusia, Skandinavia, Kanada, dan Alaska (~50°LU hingga 65°LU). Bioma ini mencakup sekitar 29% tutupan hutan global.\n\nFlora dominan terdiri dari gimnosperma berdaun jarum selalu hijau: Picea (spruce), Abies (fir), Pinus (pinus), dan konifer meranggas Larix (larch) yang mendominasi kawasan Siberia timur dengan musim dingin ekstrem di bawah -60°C.\n\nKonifer memiliki adaptasi xeromorfik dan ketahanan dingin yang sangat terspesialisasi:\n1. Arsitektur Kanopi Kerucut Berundak: Cabang pohon yang condong curam memudahkan salju tebal meluncur jatuh, mencegah patahnya dahan akibat beban mekanis salju.\n2. Morfologi Daun Jarum & Kutikula Tebal: Daun jarum memiliki rasio luas permukaan terhadap volume yang sangat rendah, dengan stomata terlindung jauh di dalam celah dan lapisan lilin tebal yang meminimalkan kehilangan air transpirasi saat musim dingin ketika akar tidak dapat menyerap air tanah beku.\n3. Anatomi Xilem Trakeid: Xilem gimnosperma tersusun murni atas trakeid sel tunggal yang sempit (diameter 10–25 µm), berbeda dengan elemen pembuluh (vessel) angiosperma yang lebar (50–300 µm). Lumen sempit meminimalkan risiko kavitasi beku-cair (emboli udara saat gelembung gas terlarut memuai saat pencairan di bawah tekanan negatif xilem).',
          },
          comparisonTable: {
            headers: {
              en: ['Ecological Parameter', 'Arctic Tundra', 'Boreal Taiga'],
              id: ['Parameter Ekologis', 'Tundra Arktik', 'Taiga Boreal'],
            },
            rows: [
              {
                en: ['Mean Annual Temperature (MAT)', '-12°C to -4°C', '-5°C to +3°C'],
                id: ['Suhu Rata-rata Tahunan (MAT)', '-12°C hingga -4°C', '-5°C hingga +3°C'],
              },
              {
                en: ['Growing Season Duration', '50–90 days', '90–150 days'],
                id: ['Durasi Musim Tumbuh', '50–90 hari', '90–150 hari'],
              },
              {
                en: ['Dominant Vegetation Structure', 'Dwarf prostrate shrubs, sedges, lichens, mosses', 'Coniferous needleleaf evergreen & deciduous canopy'],
                id: ['Struktur Vegetasi Dominan', 'Semak kerdil menjalar, teki-tekian, lumut kerak, lumut daun', 'Kanopi konifer daun jarum selalu hijau & meranggas'],
              },
              {
                en: ['Soil Classification', 'Gelisols (permafrost within 100 cm)', 'Spodosols / Podzols (acidic, strongly leached)'],
                id: ['Klasifikasi Tanah', 'Gelisols (permafrost dalam kedalaman 100 cm)', 'Spodosols / Podzol (asam, tercuci kuat)'],
              },
              {
                en: ['Carbon Reservoir Partitioning', '> 85% in frozen permafrost organic matter', '~65% in soil/peat, ~35% in living woody biomass'],
                id: ['Partisi Cadangan Karbon', '> 85% tersimpan dalam bahan organik permafrost beku', '~65% dalam tanah/gambut, ~35% dalam biomassa kayu hidup'],
              },
            ],
          },
        },
        {
          id: 'biome-2-sec-4',
          title: {
            en: '4. Podzolization Pedogenesis & Boreal Fire Cycles',
            id: '4. Pedogenesis Podzolisasi & Siklus Kebakaran Hutan Boreal',
          },
          content: {
            en: 'Boreal forest soils are categorized as Spodosols (in USDA taxonomy) or Podzols. They develop through the process of podzolization:\n\n1. Conifer needle litter contains high concentrations of recalcitrant resins, lignin, and polyphenolic organic acids (tannins, fulvic acids).\n2. Decomposition is extremely slow due to cold temperatures and acidic conditions (pH 3.5 to 4.5).\n3. Organic acids percolate downward with snowmelt water, chelating and mobilizing free iron (Fe³⁺) and aluminum (Al³⁺) ions from the upper mineral soil.\n4. This intense leaching bleaches the upper horizon into an ash-gray, quartz-rich eluvial layer (the E horizon or albic horizon).\n5. Deeper down (30–60 cm), the chelates precipitate due to higher pH and microbial oxidation, forming a dark, reddish-brown illuvial spodic horizon (B_s / B_hs) enriched in amorphous iron oxides and humus.\n\nWildfire is the primary natural disturbance regime in the boreal forest, operating on a return interval of 50 to 200 years. Stand-replacing crown fires consume overstory canopies and open serotinous cones (e.g., Pinus banksiana), whose resin melts at ~50°C, releasing seeds onto mineral ash seedbeds free of fungal pathogens and competing understory.',
            id: 'Tanah hutan boreal diklasifikasikan sebagai Spodosol (taksonomi USDA) atau Podzol. Tanah ini terbentuk melalui proses podzolisasi:\n\n1. Serasah daun jarum konifer mengandung konsentrasi tinggi resin tahan dekomposisi, lignin, dan asam organik polifenol (tanin, asam fulvat).\n2. Dekomposisi berjalan sangat lambat akibat suhu dingin dan kondisi asam (pH 3,5 hingga 4,5).\n3. Asam organik meresap ke bawah bersama air lelehan salju, mengkhelat dan memobilisasi ion besi (Fe³⁺) dan aluminium (Al³⁺) bebas dari lapisan tanah mineral atas.\n4. Pencucian intensif ini memutihkan lapisan atas menjadi horizon eluvial abu-abu keputihan kaya kuarsa (horizon E atau horizon albik).\n5. Lebih dalam (30–60 cm), senyawa khelat mengendap kembali akibat kenaikan pH dan oksidasi mikroba, membentuk horizon spodis iluvial (B_s / B_hs) berwarna cokelat-kemerahan gelap yang kaya oksida besi amorf dan humus.\n\nKebakaran hutan adalah rezim gangguan alami utama di taiga boreal, berulang dalam interval 50 hingga 200 tahun. Kebakaran tajuk (crown fire) menghanguskan kanopi dan membuka konus serotini (seperti Pinus banksiana), yang resinnya meleleh pada suhu ~50°C untuk melepaskan biji ke hamparan abu mineral subur yang bebas patogen jamur.',
          },
          caseStudy: {
            title: {
              en: 'Siberian Thermokarst & Methane Permafrost Feedback',
              id: 'Thermokarst Siberia & Umpan Balik Metana Permafrost',
            },
            context: {
              en: 'Arctic amplification has warmed northern high latitudes at more than three times the global average rate, accelerating active layer deepening across the Siberian Yedoma permafrost.',
              id: 'Amplifikasi Arktik telah memanaskan lintang tinggi utara tiga kali lebih cepat daripada rata-rata pemanasan global, mempercepat penebalan lapisan aktif di permafrost Yedoma Siberia.',
            },
            analysis: {
              en: 'Yedoma deposits contain an estimated 400 to 500 Gigatons of ancient Pleistocene carbon preserved in frozen silt and ice wedges. As the active layer penetrates deeper:\n1. Massive ground ice melts, causing ground subsidence, collapse, and lake formation (thermokarst lakes).\n2. Submerged organic matter decomposes under anoxic benthic conditions via methanogenic archaea.\n3. Methane gas (CH₄, with a 100-year Global Warming Potential ~28–36× that of CO₂) bubbles directly to the surface via ebullition, escaping into the atmosphere.\n4. Atmospheric warming intensifies, driving further permafrost thaw in a dangerous self-reinforcing biogeochemical feedback loop.',
              id: 'Deposit Yedoma mengandung sekitar 400 hingga 500 Gigaton karbon purba Pleistosen yang terawetkan dalam endapan debu beku dan irisan es. Saat lapisan aktif menembus lebih dalam:\n1. Es tanah masif mencair, menyebabkan amblesan tanah dan pembentukan danau runtuhan (danau thermokarst).\n2. Bahan organik yang terendam membusuk di bawah kondisi benthik anoksik melalui kerja arkea metanogenik.\n3. Gas metana (CH₄, dengan Potensi Pemanasan Global 100-tahun ~28–36× lebih kuat dari CO₂) muncul ke permukaan melalui ebulisi dan lepas ke atmosfer.\n4. Pemanasan atmosfer meningkat, memicu pencairan permafrost lebih lanjut dalam lingkaran umpan balik biogeokimia yang saling memperkuat.',
            },
            takeaway: {
              en: 'Cryospheric biomes hold globally significant carbon stocks whose thermodynamic phase transitions represent planetary tipping risks.',
              id: 'Bioma kriosfer menyimpan cadangan karbon global masif yang transisi fase termodinamikanya memicu risiko titik kritis bumi.',
            },
          },
        },
      ],
      quiz: [
        {
          id: 'biome-q2-1',
          question: {
            en: 'In Stefan’s permafrost thaw equation, what is the mathematical relationship between the active-layer thaw depth D and Thawing Degree Days (DDT)?',
            id: 'Dalam persamaan pencairan permafrost Stefan, bagaimanakah hubungan matematis antara kedalaman pencairan lapisan aktif D dan Thawing Degree Days (DDT)?',
          },
          options: {
            en: [
              'Thaw depth D increases linearly with DDT (D ∝ DDT).',
              'Thaw depth D scales with the square root of DDT (D ∝ √DDT).',
              'Thaw depth D scales with the cube of DDT (D ∝ DDT³).',
              'Thaw depth D is inversely proportional to DDT.',
            ],
            id: [
              'Kedalaman pencairan D meningkat secara linier terhadap DDT (D ∝ DDT).',
              'Kedalaman pencairan D sebanding dengan akar kuadrat dari DDT (D ∝ √DDT).',
              'Kedalaman pencairan D sebanding dengan pangkat tiga DDT (D ∝ DDT³).',
              'Kedalaman pencairan D berbanding terbalik dengan DDT.',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Stefan’s formulation shows D = √[(2 k_t DDT) / (ρ L)], meaning active layer thaw depth increases as the square root of cumulative thawing degree days due to the increasing thermal resistance of the already-thawed overlying soil.',
            id: 'Formulasi Stefan menunjukkan D = √[(2 k_t DDT) / (ρ L)], artinya kedalaman pencairan lapisan aktif bertambah sebanding dengan akar kuadrat dari derajat-hari pencairan akibat meningkatnya hambatan termal dari lapisan tanah atas yang sudah mencair.',
          },
        },
        {
          id: 'biome-q2-2',
          question: {
            en: 'Why are gymnosperm tracheids less vulnerable to freeze-thaw induced cavitation than wide angiosperm vessels?',
            id: 'Mengapa trakeid gimnosperma lebih tahan terhadap kavitasi akibat siklus beku-cair dibandingkan pembuluh xilem angiosperma yang lebar?',
          },
          options: {
            en: [
              'Gymnosperms actively pump potassium ions to lower the water freezing point to -80°C.',
              'Tracheids contain high-pressure liquid helium that prevents freezing.',
              'Tracheids possess much smaller lumen diameters (10–25 µm), which restricts the maximum diameter of gas bubbles formed during freezing.',
              'Tracheids lack cell walls completely.',
            ],
            id: [
              'Gimnosperma secara aktif memompa ion kalium untuk menurunkan titik beku air hingga -80°C.',
              'Trakeid mengandung helium cair bertekanan tinggi yang mencegah pembekuan.',
              'Trakeid memiliki diameter lumen yang jauh lebih kecil (10–25 µm), yang membatasi ukuran maksimum gelembung gas saat pembekuan.',
              'Trakeid tidak memiliki dinding sel sama sekali.',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Narrow xylem conduits limit bubble coalescence. When ice thaws, tiny bubbles in small conduits dissolve back into solution before negative xylem tension can expand them into catastrophic cavitations.',
            id: 'Diameter saluran xilem yang sempit membatasi penggabungan gelembung gas terlarut. Saat es mencair, gelembung kecil di saluran sempit dapat larut kembali sebelum tarikan tegangan negatif xilem memperluasnya menjadi kavitasi emboli yang merusak.',
          },
        },
        {
          id: 'biome-q2-3',
          question: {
            en: 'Which soil diagnostic process produces the ash-gray, bleached eluvial E horizon in boreal Spodosols?',
            id: 'Proses pembentukan tanah manakah yang menghasilkan horizon eluvial E abu-abu keputihan pada tanah Spodosol boreal?',
          },
          options: {
            en: [
              'Podzolization: Organic acid leaching chelating and stripping iron (Fe) and aluminum (Al) downward.',
              'Laterization: Rapid leaching of silica leaving iron and aluminum oxides in the surface.',
              'Salinization: Capillary rise of sodium chloride in hyper-arid soils.',
              'Gleization: High pH alkaline reduction under desert conditions.',
            ],
            id: [
              'Podzolisasi: Pencucian asam organik yang mengkhelat dan melarutkan besi (Fe) dan aluminium (Al) ke lapisan bawah.',
              'Laterisasi: Pencucian cepat silika yang menyisakan oksida besi dan aluminium di permukaan.',
              'Salinisasi: Kenaikan kapiler natrium klorida pada tanah hiper-arid.',
              'Gleisasi: Reduksi alkali pH tinggi pada kondisi gurun.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In podzolization, fulvic and tannic acids from conifer needle breakdown mobilize Fe and Al, stripping them from the eluvial (E) horizon and leaving bleached quartz sand.',
            id: 'Pada podzolisasi, asam fulvat dan tanat dari penguraian serasah jarum konifer memobilisasi Fe dan Al, melarutkannya dari horizon eluvial (E) dan menyisakan pasir kuarsa putih pucat.',
          },
        },
        {
          id: 'biome-q2-4',
          question: {
            en: 'What ecological role is served by serotinous cones in boreal conifers like Jack Pine (Pinus banksiana)?',
            id: 'Peran ekologis apakah yang dijalankan oleh konus serotini pada konifer boreal seperti Pinus banksiana?',
          },
          options: {
            en: [
              'They bury themselves underground via hygroscopic drills.',
              'They produce nectar to attract hummingbirds in mid-winter.',
              'They absorb toxic permafrost methane and convert it into oxygen.',
              'They remain sealed by resin until forest fire heat melts the seal, releasing seeds onto nutrient-rich post-fire mineral beds.',
            ],
            id: [
              'Konus menenggelamkan diri ke dalam tanah melalui bor higroskopis.',
              'Konus memproduksi nektar untuk memikat burung kolibri di tengah musim dingin.',
              'Konus menyerap metana permafrost beracun dan mengubahnya menjadi oksigen.',
              'Konus tetap tersegel rapat oleh resin hingga panas api membukanya, melepaskan benih ke hamparan abu mineral subur pascakebakaran.',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'Serotiny is an evolutionary fire adaptation: resin-sealed cones protect seeds until a fire clears the overstory and exposes nutrient-dense mineral soil with minimal competition.',
            id: 'Serotini adalah adaptasi evolusioner terhadap api: konus tersegel resin melindungi benih hingga kebakaran hutan melenyapkan kompetitor dan membuka tanah mineral kaya nutrisi.',
          },
        },
      ],
    },

    // =============================================================
    // PART 3: MID-LATITUDE TEMPERATE BIOMES: FORESTS & GRASSLANDS
    // =============================================================
    {
      id: 'biome-mod-3',
      topicId: 'biomes-ecology',
      order: 3,
      title: {
        en: 'Part 3: Mid-Latitude Temperate Biomes: Deciduous Forests & Grasslands',
        id: 'Bagian 3: Bioma Beriklim Sedang: Hutan Gugur & Padang Rumput',
      },
      shortDescription: {
        en: 'Canopy Beer-Lambert light extinction, anthocyanin autumn phenology, deep fibrous root architecture, and Mollisol soil genesis.',
        id: 'Pelemahan cahaya Beer-Lambert kanopi, fenologi gugur antosianin, arsitektur akar serabut dalam, dan genesis tanah Mollisol.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-3-sec-1',
          title: {
            en: '1. Temperate Deciduous Canopy Stratification & Phenology',
            id: '1. Stratifikasi Kanopi Hutan Gugur Sedang & Fenologi Musiman',
          },
          content: {
            en: 'Temperate Deciduous Forests develop in mid-latitude zones (35°N to 50°N in eastern North America, western Europe, and eastern Asia) characterized by four distinct seasons, moderate temperatures (MAT 8°C to 15°C), and evenly distributed precipitation (750 to 1500 mm/yr).\n\nThe vertical forest architecture exhibits pronounced multi-tier stratification:\n1. Dominant Overstory Canopy (25–35 m): Quercus (oak), Acer (maple), Fagus (beech), and Betula (birch).\n2. Subcanopy / Understory Trees (10–20 m): Cornus (dogwood), Carpinus (hornbeam).\n3. Shrub Layer (1–5 m): Viburnum, Vaccinium.\n4. Herbaceous Forest Floor Layer (0–1 m): Spring ephemerals (e.g., Trillium, Erythronium).\n\nSpring ephemerals exhibit high photosynthetic rates in early spring before the overstory leafs out, exploiting high solar irradiance at ground level. As the canopy closes, solar radiation attenuates exponentially through the foliage according to the Beer-Lambert formulation: I(z) = I_0 · exp(-k · LAI(z)), reducing photosynthetically active radiation (PAR) reaching the forest floor to less than 2% of full sunlight.\n\nIn autumn, shortening photoperiods and declining temperatures induce leaf senescence. Chlorophyll synthesis ceases, and existing chlorophyll molecules are enzymatically catabolized to recover nitrogen. This unmasks yellow/orange carotenoids and xanthophylls, while cool sunny days stimulate de novo synthesis of crimson anthocyanin pigments to protect senescing chloroplasts from photo-oxidative stress.',
            id: 'Hutan Gugur Beriklim Sedang berkembang di wilayah lintang menengah (35°LU hingga 50°LU di timur Amerika Utara, Eropa barat, dan Asia timur) yang ditandai dengan empat musim nyata, suhu moderat (MAT 8°C hingga 15°C), dan presipitasi terdistribusi merata (750 hingga 1500 mm/tahun).\n\nArsitektur vertikal hutan menunjukkan stratifikasi multi-lapis yang tegas:\n1. Kanopi Utama Atas (25–35 m): Quercus (ek), Acer (mapel), Fagus (beech), dan Betula (birch).\n2. Subkanopi / Pohon Lapisan Bawah (10–20 m): Cornus, Carpinus.\n3. Lapisan Semak (1–5 m): Viburnum, Vaccinium.\n4. Lapisan Herba Lantai Hutan (0–1 m): Tumbuhan efemeral musim semi (seperti Trillium, Erythronium).\n5. Tumbuhan efemeral musim semi memanfaatkan jendela cahaya tinggi di awal musim semi sebelum daun kanopi pohon atas tumbuh. Saat kanopi menutup, radiasi matahari melemah secara eksponensial menurut formulasi Beer-Lambert: I(z) = I_0 · exp(-k · LAI(z)), sehingga radiasi fotosintesis (PAR) yang mencapai lantai hutan turun hingga kurang dari 2% sinar matahari penuh.\n\nDi musim gugur, pemendekan panjang hari dan penurunan suhu memicu senesensi (penuaan daun). Sintesis klorofil terhenti, dan klorofil yang ada dirombak secara enzimatik untuk mendaur ulang nitrogen. Hal ini menampakkan pigmen karotenoid dan xantofil kuning/oranye, sementara hari cerah yang sejuk memicu sintesis pigmen antosianin merah tua untuk melindungi kloroplas yang menua dari kerusakan fotooksidatif.',
          },
          formula: 'I(z) = I_0 \\cdot e^{-k \\cdot \\text{LAI}(z)}',
          formulaExplanation: {
            en: 'Beer-Lambert Canopy Light Extinction Law: Describes exponential attenuation of Photosynthetically Active Radiation I(z) through a canopy of cumulative Leaf Area Index LAI(z) with extinction coefficient k.',
            id: 'Hukum Pelemahan Cahaya Kanopi Beer-Lambert: Menjelaskan penurunan eksponensial radiasi fotosintesis I(z) melalui kanopi dengan Indeks Luas Daun kumulatif LAI(z) dan koefisien pelemahan k.',
          },
          variables: [
            {
              symbol: 'I(z)',
              name: { en: 'Transmitted Irradiance at Depth z', id: 'Iradiansi Tertransmisi pada Kedalaman z' },
              unit: 'µmol/(m²·s) / W/m²',
              description: {
                en: 'Photosynthetically Active Radiation reaching canopy depth z.',
                id: 'Radiasi aktif fotosintesis yang mencapai kedalaman kanopi z.',
              },
            },
            {
              symbol: 'I_0',
              name: { en: 'Incident Solar Irradiance Above Canopy', id: 'Iradiansi Surya Datang di Atas Kanopi' },
              unit: 'µmol/(m²·s)',
              description: {
                en: 'Radiation flux density entering the top of the canopy.',
                id: 'Kerapatan fluks radiasi yang memasuki bagian teratas kanopi.',
              },
            },
            {
              symbol: 'k',
              name: { en: 'Canopy Light Extinction Coefficient', id: 'Koefisien Pelemahan Cahaya Kanopi' },
              unit: 'dimensionless',
              description: {
                en: 'Determined by leaf inclination angle (typically 0.4–0.7 for broadleaf deciduous forests).',
                id: 'Ditentukan oleh sudut kemiringan daun (biasanya 0,4–0,7 untuk hutan gugur berdaun lebar).',
              },
            },
            {
              symbol: '\\text{LAI}',
              name: { en: 'Leaf Area Index', id: 'Indeks Luas Daun' },
              unit: 'm² leaf / m² ground',
              description: {
                en: 'Total one-sided green leaf area per unit ground surface area (ranging from 4 to 8 in peak summer).',
                id: 'Total luas daun hijau satu sisi per satuan luas permukaan tanah (berkisar 4 hingga 8 saat puncak musim panas).',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Differential Interception by Leaf Layer',
                id: 'Langkah 1: Intersepsi Diferensial oleh Lapisan Daun',
              },
              math: 'dI = -k \\cdot I(z) \\, d\\text{LAI}',
              explanation: {
                en: 'Consider a horizontal canopy sublayer of infinitesimal leaf area index dLAI. The fraction of radiant flux intercepted is proportional to the extinction coefficient k (projected leaf area normal to incident beams) and the local irradiance I(z).',
                id: 'Tinjau lapisan kanopi horizontal dengan indeks luas daun infinitesimal dLAI. Fraksi fluks radiasi yang diintersepsi sebanding dengan koefisien ekstingsi k (proyeksi luas daun tegak lurus arah berkas datang) dan iradiansi lokal I(z).',
              },
            },
            {
              title: {
                en: 'Step 2: Separation of Variables & Integration',
                id: 'Langkah 2: Pemisahan Variabel & Integrasi',
              },
              math: '\\int_{I_0}^{I(z)} \\frac{dI}{I} = -k \\int_0^{\\text{LAI}(z)} d\\text{LAI} \\implies \\ln\\left(\\frac{I(z)}{I_0}\\right) = -k \\cdot \\text{LAI}(z)',
              explanation: {
                en: 'Integrating from the top of the canopy (LAI = 0, irradiance = I_0) down to cumulative leaf depth LAI(z) yields the natural logarithm of canopy transmittance.',
                id: 'Integrasi dari batas teratas kanopi (LAI = 0, iradiansi = I_0) hingga kedalaman daun kumulatif LAI(z) menghasilkan logaritma natural dari transmitansi kanopi.',
              },
            },
            {
              title: {
                en: 'Step 3: Exponential Formulation & Sunlit Floor Fraction',
                id: 'Langkah 3: Formulasi Eksponensial & Fraksi Cahaya Lantai Hutan',
              },
              math: 'I(z) = I_0 \\cdot e^{-k \\cdot \\text{LAI}(z)}',
              explanation: {
                en: 'Exponentiating recovers the classic Beer-Lambert canopy law. For closed summer canopies with LAI = 6.0 and k = 0.65, transmitted PAR is I = I_0 · exp(-3.9) ≈ 0.02 I_0, explaining why ground flora are restricted to early spring ephemerals.',
                id: 'Eksponensiasi menghasilkan hukum kanopi Beer-Lambert klasik. Untuk kanopi musim panas rimbun dengan LAI = 6,0 dan k = 0,65, PAR yang tembus adalah I = I_0 · exp(-3,9) ≈ 0,02 I_0 (hanya 2%), menjelaskan mengapa herba lantai hutan terestriksi pada efemeral musim semi.',
              },
            },
          ],
        },
        {
          id: 'biome-3-sec-2',
          title: {
            en: '2. Alfisol Pedogenesis & Forest Nutrient Cycling',
            id: '2. Pedogenesis Alfisol & Siklus Hara Hutan Gugur',
          },
          content: {
            en: 'The soils beneath temperate deciduous forests are classified primarily as Alfisols (or Luvisols in the FAO World Reference Base). Alfisols are characterized by moderate-to-high base saturation (> 35%), neutral to slightly acidic pH (5.5 to 6.8), and a distinct clay accumulation layer.\n\nPedogenic horizons in Alfisols:\n1. O Horizon (Forest Floor): Moderately thick layer of decomposing leaf litter (mull humus), with rapid earthworm incorporation.\n2. A Horizon: Dark mineral horizon enriched in humified organic matter with excellent crumb structure.\n3. E Horizon: Eluvial horizon leached of clay particles and iron.\n4. Bt Horizon (Argillic horizon): Illuvial subsurface accumulation of silicate clay translocated downward by percolating water (illuviation), displaying clay films (argillans) on ped faces.\n\nBecause deciduous trees shed nutrient-rich foliage annually, temperate forests maintain rapid, semi-closed internal nutrient recycling. Calcium (Ca²⁺), magnesium (Mg²⁺), and potassium (K⁺) returned in leaf fall neutralize organic acidity and maintain high base saturation, preventing the intense leaching seen in boreal Podzols.',
            id: 'Tanah di bawah hutan gugur sedang diklasifikasikan terutama sebagai Alfisol (atau Luvisol dalam sistem FAO). Alfisol memiliki ciri kejenuhan basa sedang hingga tinggi (> 35%), pH netral hingga agak masam (5,5 hingga 6,8), serta horizon akumulasi liat yang nyata.\n\nHorizon pedogenik pada Alfisol:\n1. Horizon O (Lantai Hutan): Lapisan serasah daun gugur yang terdekomposisi cukup cepat (humus mull) dengan bantuan aktivitas cacing tanah yang aktif.\n2. Horizon A: Lapisan mineral atas berwarna gelap yang kaya bahan organik terhumifikasi dengan struktur remah yang sangat gembur.\n3. Horizon E: Lapisan eluvial yang tercuci dari partikel liat dan besi.\n4. Horizon Bt (Horizon Argilik): Lapisan akumulasi iluvial liat silikat di bawah permukaan yang berpindah ke bawah bersama air perkolasi, ditandai oleh selaput liat (argillan) pada permukaan agregat tanah.\n\nKarena pohon gugur menggugurkan daun kaya nutrisi setiap tahun, hutan sedang mempertahankan daur ulang hara internal yang efisien. Kalsium (Ca²⁺), magnesium (Mg²⁺), dan kalium (K⁺) yang dikembalikan oleh serasah menetralkan keasaman organik dan menjaga kejenuhan basa tetap tinggi.',
          },
          comparisonTable: {
            headers: {
              en: ['Pedogenic Property', 'Boreal Spodosol', 'Temperate Alfisol', 'Prairie Mollisol'],
              id: ['Sifat Pedogenik', 'Spodosol Boreal', 'Alfisol Hutan Sedang', 'Mollisol Padang Rumput'],
            },
            rows: [
              {
                en: ['Dominant Vegetation', 'Coniferous evergreen needleleaf', 'Broadleaf deciduous forest', 'Perennial deep-rooted grasses'],
                id: ['Vegetasi Dominan', 'Konifer selalu hijau daun jarum', 'Hutan gugur berdaun lebar', 'Rumput abadi berakar dalam'],
              },
              {
                en: ['Soil pH Range', '3.5 - 4.5 (strongly acidic)', '5.5 - 6.8 (slightly acidic to neutral)', '6.5 - 8.0 (neutral to slightly alkaline)'],
                id: ['Rentang pH Tanah', '3,5 - 4,5 (sangat masam)', '5,5 - 6,8 (agak masam hingga netral)', '6,5 - 8,0 (netral hingga agak basa)'],
              },
              {
                en: ['Base Saturation (% BS)', '< 35% in subsoil', '> 35% in argillic Bt horizon', '> 50% throughout entire profile'],
                id: ['Kejenuhan Basa (% BS)', '< 35% di lapisan bawah', '> 35% di horizon argilik Bt', '> 50% di seluruh profil tanah'],
              },
              {
                en: ['Organic Matter Depth', 'Concentrated in superficial O-layer', 'Shallow A horizon (5–15 cm)', 'Deep Mollic epipedon (30–100 cm)'],
                id: ['Kedalaman Bahan Organik', 'Terkonsentrasi di lapisan O tipis', 'Horizon A dangkal (5–15 cm)', 'Epipedon molik sangat dalam (30–100 cm)'],
              },
            ],
          },
        },
        {
          id: 'biome-3-sec-3',
          title: {
            en: '3. Temperate Grasslands & Below-Ground Root Architecture',
            id: '3. Padang Rumput Beriklim Sedang & Arsitektur Perakaran Dalam',
          },
          content: {
            en: 'Temperate Grasslands (known as Prairies in North America, Steppes in Eurasia, Pampas in South America, and Veld in South Africa) occupy continental interiors where precipitation (250 to 900 mm/yr) is insufficient to support closed tree canopies but sufficient to prevent desertification.\n\nGrasslands are divided by precipitation into three longitudinal belts:\n1. Tallgrass Prairie (MAP 750–900 mm): Dominated by Andropogon gerardii (big bluestem) and Sorghastrum nutans, reaching heights > 2 m.\n2. Mixed-Grass Prairie (MAP 400–750 mm): Co-dominance of tall and short grasses (Schizachyrium scoparium, Pascopyrum smithii).\n3. Shortgrass Steppe (MAP 250–400 mm): Bouteloua gracilis (blue grama) and Buchloe dactyloides (buffalograss).\n\nThe defining ecophysiological hallmark of temperate grasses is their inverted biomass distribution: over 60% to 80% of total plant biomass resides below ground in a dense, fibrous root network penetrating 1.5 to 3 meters deep. The root-to-shoot ratio typically exceeds 4:1. This massive subterranean root system provides immense drought resistance, enables rapid resprouting after herbivory or fire, and fuels massive soil carbon sequestration.',
            id: 'Padang Rumput Beriklim Sedang (dikenal sebagai Prairi di Amerika Utara, Stepa di Eurasia, Pampa di Amerika Selatan, dan Veld di Afrika Selatan) menempati kawasan pedalaman benua di mana curah hujan (250 hingga 900 mm/tahun) tidak mencukupi untuk mendukung kanopi pohon tertutup tetapi cukup untuk mencegah penggurunan.\n\nPadang rumput terbagi menurut presipitasi menjadi tiga sabuk longitudinal:\n1. Prairi Rumput Tinggi (MAP 750–900 mm): Didominasi oleh Andropogon gerardii dan Sorghastrum nutans, mencapai tinggi > 2 m.\n2. Prairi Campuran (MAP 400–750 mm): Ko-dominansi rumput tinggi dan pendek (Schizachyrium scoparium, Pascopyrum smithii).\n3. Stepa Rumput Pendek (MAP 250–400 mm): Bouteloua gracilis dan Buchloe dactyloides (rumput kerbau).\n\nCiri khas ekofisiologis rumput beriklim sedang adalah distribusi biomassa terbalik: lebih dari 60% hingga 80% total biomassa tumbuhan berada di bawah tanah dalam bentuk jaringan akar serabut padat yang menembus sedalam 1,5 hingga 3 meter. Rasio akar-terhadap-pucuk (root-to-shoot ratio) umumnya melebihi 4:1. Sistem perakaran bawah tanah masif ini memberikan ketahanan luar biasa terhadap kekeringan, memungkinkan pertunasan cepat setelah dimakan herbivora atau terbakar, serta menyerap karbon tanah dalam jumlah sangat besar.',
          },
          formula: '\\frac{dC_{\\text{soil}}}{dt} = I_{\\text{root}} + I_{\\text{litter}} - k_{\\text{decomp}} \\cdot C_{\\text{soil}}',
          formulaExplanation: {
            en: 'Soil Organic Carbon Mass-Balance Formulation: Dynamics of soil carbon stock C_soil governed by root turnover inputs I_root, surface litterfall I_litter, and first-order microbial decomposition rate k_decomp.',
            id: 'Formulasi Keseimbangan Massa Karbon Organik Tanah: Dinamika cadangan karbon tanah C_soil yang dikendalikan oleh masukan pergantian akar I_root, guguran serasah I_litter, dan laju dekomposisi mikroba orde pertama k_decomp.',
          },
          variables: [
            {
              symbol: 'C_{\\text{soil}}',
              name: { en: 'Soil Organic Carbon Stock', id: 'Cadangan Karbon Organik Tanah' },
              unit: 'kg C / m²',
              description: {
                en: 'Total mass of organic carbon stored within the soil profile.',
                id: 'Total massa karbon organik yang tersimpan di dalam profil tanah.',
              },
            },
            {
              symbol: 'I_{\\text{root}}',
              name: { en: 'Belowground Root Turnover Input', id: 'Masukan Pergantian Akar Bawah Tanah' },
              unit: 'kg C / (m²·yr)',
              description: {
                en: 'Carbon flux delivered directly into the subsoil via continuous root mortality and rhizodeposition.',
                id: 'Fluks karbon yang dialirkan langsung ke lapisan tanah bawah melalui kematian akar dan rizodeposisi.',
              },
            },
            {
              symbol: 'k_{\\text{decomp}}',
              name: { en: 'Decomposition Rate Constant', id: 'Konstanta Laju Dekomposisi' },
              unit: '1 / yr',
              description: {
                en: 'First-order microbial decomposition constant, suppressed in subsoil by mineral-organic complexation.',
                id: 'Konstanta dekomposisi mikroba orde pertama, ditekan di lapisan bawah oleh kompleksasi mineral-organik.',
              },
            },
          ],
        },
        {
          id: 'biome-3-sec-4',
          title: {
            en: '4. Mollisol Genesis & Pyric Herbivory Dynamics',
            id: '4. Genesis Tanah Mollisol & Dinamika Herbivori-Api (Pyric Herbivory)',
          },
          content: {
            en: 'Temperate grasslands produce Mollisols (from Latin mollis, soft), widely recognized as the most fertile agricultural soils on Earth. Mollisols are characterized by a deep, dark, organic-rich surface horizon known as a mollic epipedon, often extending 30 to 100 cm deep.\n\nUnlike forest soils where organic matter enters exclusively from the surface via litterfall, grassland carbon enters directly across the entire root profile. Annually, approximately one-third of the dense fibrous root system dies and sloughs off in situ, undergoing decomposition by mycorrhizae and earthworms. This incorporates humic polymers uniformly throughout the upper meter of soil, producing high cation-exchange capacity (CEC), neutral pH, and base saturation exceeding 50%.\n\nGrassland ecosystems are dynamically stabilized by pyric herbivory—the synergistic coupling of natural wildfire and grazing by large migratory ungulates (e.g., American bison, saiga antelope). Fire consumes standing dead biomass and prevents woody tree encroachment. Ungulates selectively graze newly resprouted, nitrogen-rich post-fire burn patches, maintaining an open structural mosaic of variable grass heights that supports high biodiversity.',
            id: 'Padang rumput beriklim sedang membentuk tanah Mollisol (dari bahasa Latin mollis, lunak), yang diakui secara luas sebagai tanah pertanian paling subur di dunia. Mollisol memiliki horizon permukaan yang tebal, gelap, dan sangat kaya bahan organik yang disebut epipedon molik, sering kali mencapai kedalaman 30 hingga 100 cm.\n\nBerbeda dengan tanah hutan di mana bahan organik hanya masuk dari permukaan melalui serasah daun, karbon padang rumput masuk langsung ke seluruh kedalaman profil akar. Setiap tahun, sekitar sepertiga dari sistem akar serabut yang padat mati dan meluruh in situ, mengalami penguraian oleh mikoriza dan cacing tanah. Proses ini menyebarkan polimer humus secara seragam di seluruh lapisan satu meter teratas tanah, menghasilkan Kapasitas Tukar Kation (KTK) tinggi, pH netral, dan kejenuhan basa melebihi 50%.\n\nEkosistem padang rumput distabilkan secara dinamis oleh pyric herbivory—sinergi antara kebakaran alami dan penggembalaan oleh ungulata migratori besar (seperti bison Amerika atau antelop saiga). Kebakaran melahap biomassa mati dan mencegah invasi pohon berkayu. Herbivora secara selektif memakan tunas rumput segar kaya nitrogen yang tumbuh di area bekas terbakar, mempertahankan mosaik padang terbuka dengan keanekaragaman hayati tinggi.',
          },
          caseStudy: {
            title: {
              en: 'The 1930s Dust Bowl: Destruction of Prairie Root Architecture',
              id: 'Dust Bowl 1930-an: Penghancuran Arsitektur Akar Prairi',
            },
            context: {
              en: 'In the early 20th century, millions of hectares of native shortgrass and mixed-grass prairie across the US Great Plains were plowed under for intensive wheat monoculture.',
              id: 'Pada awal abad ke-20, jutaan hektar prairi rumput pendek dan campuran asli di Great Plains AS dibajak habis untuk monokultur gandum intensif.',
            },
            analysis: {
              en: 'Deep mechanized tillage severed the perennial fibrous root networks that had stabilized the Mollisol soil aggregates for millennia. When a severe prolonged drought struck in 1931–1939, wheat crops failed completely, leaving bare, desiccated topsoil exposed to high winds. Without root binding and mycorrhizal glomalin glues, aeolian erosion stripped over 75% of topsoil across 400,000 km², creating catastrophic dust storms ("black blizzards") and triggering mass human displacement.',
              id: 'Pembajakan mekanis yang dalam memutus jaringan akar serabut abadi yang telah mengikat agregat tanah Mollisol selama ribuan tahun. Saat kekeringan parah berkepanjangan melanda pada 1931–1939, tanaman gandum mati total, menyisakan tanah lapisan atas yang kering dan telanjang terpapar angin kencang. Tanpa pengikat akar dan perekat glomalin mikoriza, erosi angin melenyapkan lebih dari 75% tanah pucuk di area seluas 400.000 km², memicu badai debu raksasa ("black blizzards") dan eksodus massal manusia.',
            },
            takeaway: {
              en: 'Perennial below-ground root architecture is an indispensable biophysical stabilizing agent preventing catastrophic land degradation.',
              id: 'Arsitektur perakaran serabut abadi di bawah tanah merupakan agen penstabil biofisika mutlak yang mencegah degradasi tanah katastropik.',
            },
          },
        },
      ],
      quiz: [
        {
          id: 'biome-q3-1',
          question: {
            en: 'In a temperate deciduous forest, if incident irradiance is 1500 µmol/m²s, canopy extinction coefficient k = 0.5, and peak summer Leaf Area Index LAI = 6.0, what is the irradiance reaching the forest floor?',
            id: 'Pada hutan gugur sedang, jika iradiansi datang adalah 1500 µmol/m²s, koefisien pelemahan k = 0,5, dan Indeks Luas Daun kanopi LAI = 6,0, berapakah iradiansi yang mencapai lantai hutan?',
          },
          options: {
            en: [
              '0 µmol/m²s (complete absolute darkness)',
              '~750 µmol/m²s (50% of incident light)',
              '~74.7 µmol/m²s (~5% of incident light, I = 1500 · e^(-3.0))',
              '~1200 µmol/m²s',
            ],
            id: [
              '0 µmol/m²s (gelap gulita absolut)',
              '~750 µmol/m²s (50% dari cahaya datang)',
              '~74,7 µmol/m²s (~5% dari cahaya datang, I = 1500 · e^(-3,0))',
              '~1200 µmol/m²s',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Using Beer-Lambert’s law: I = I_0 · e^(-k · LAI) = 1500 · e^(-0.5 · 6.0) = 1500 · e^(-3) = 1500 / 20.0855 ≈ 74.7 µmol/m²s.',
            id: 'Menggunakan hukum Beer-Lambert: I = I_0 · e^(-k · LAI) = 1500 · e^(-0,5 · 6,0) = 1500 · e^(-3) = 1500 / 20,0855 ≈ 74,7 µmol/m²s.',
          },
        },
        {
          id: 'biome-q3-2',
          question: {
            en: 'Why do autumn deciduous leaves produce anthocyanin pigments de novo during leaf senescence?',
            id: 'Mengapa daun pohon gugur musim gugur mensintesis pigmen antosianin secara de novo saat proses senesensi daun?',
          },
          options: {
            en: [
              'To shield vulnerable senescing chloroplasts from photo-oxidative stress while the tree mobilizes and reabsorbs leaf nitrogen.',
              'To attract migrating monarch butterflies to feed on leaf sap.',
              'To accelerate leaf freezing so branches shed foliage faster.',
              'To poison herbivores before the winter dormancy period.',
            ],
            id: [
              'Untuk melindungi kloroplas yang rentan dari stres fotooksidatif saat pohon memobilisasi dan menyerap kembali nitrogen daun.',
              'Untuk memikat kupu-kupu raja yang bermigrasi agar memakan getah daun.',
              'Untuk mempercepat pembekuan daun agar cabang segera menggugurkannya.',
              'Untuk meracuni herbivora sebelum periode dormansi musim dingin.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Anthocyanins act as light filters and powerful antioxidants, shielding dismantling photosynthetic machinery from photo-inhibition and oxidative burst while the plant salvages essential nitrogen from enzymes.',
            id: 'Antosianin bertindak sebagai tabir surya dan antioksidan kuat, melindungi aparatus fotosintesis yang sedang dirombak dari foto-inhibisi sementara pohon menyerap kembali nitrogen esensial dari enzim.',
          },
        },
        {
          id: 'biome-q3-3',
          question: {
            en: 'What fundamental morphological trait differentiates prairie grasses from temperate forest trees regarding biomass allocation?',
            id: 'Ciri morfologis mendasar apakah yang membedakan rumput prairi dengan pohon hutan sedang terkait alokasi biomassa?',
          },
          options: {
            en: [
              'Trees allocate 95% of their total biomass below ground.',
              'Prairie grasses have woody stems that store 90% of their carbon in above-ground bark.',
              'Prairie grasses lack roots and absorb water directly through stomata.',
              'Prairie grasses allocate over 60–80% of their total biomass below ground into massive fibrous root networks (root-to-shoot ratio > 4).',
            ],
            id: [
              'Pohon mengalokasikan 95% total biomassa mereka di bawah tanah.',
              'Rumput prairi memiliki batang berkayu yang menyimpan 90% karbon di kulit luar atas.',
              'Rumput prairi tidak memiliki akar dan menyerap air langsung lewat stomata.',
              'Rumput prairi mengalokasikan lebih dari 60–80% total biomassa di bawah tanah ke dalam jaringan akar serabut masif (rasio akar-pucuk > 4).',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'Grassland plants feature high root-to-shoot ratios (>4:1), securing subterranean water access, drought resistance, and fire resilience while forming deep Mollisol carbon reservoirs.',
            id: 'Tumbuhan padang rumput memiliki rasio akar terhadap pucuk yang tinggi (>4:1), menjamin akses air tanah dalam, ketahanan kekeringan, dan resiliensi api sekaligus membentuk cadangan karbon Mollisol.',
          },
        },
        {
          id: 'biome-q3-4',
          question: {
            en: 'What defines the diagnostic mollic epipedon of agricultural Mollisol soils?',
            id: 'Karakteristik apakah yang mendefinisikan epipedon molik diagnostik pada tanah Mollisol pertanian?',
          },
          options: {
            en: [
              'A bleached ash-gray layer with pH < 3.5 and zero organic matter.',
              'A thick (> 25 cm), dark surface horizon with high organic matter, granular crumb structure, and base saturation > 50%.',
              'A dense subsurface layer of pure calcium sulfate gypsum crystals.',
              'A toxic red layer of insoluble aluminum oxide hydroxides.',
            ],
            id: [
              'Lapisan abu-abu keputihan dengan pH < 3,5 dan tanpa bahan organik sama sekali.',
              'Horizon permukaan tebal (> 25 cm), berwarna gelap dengan bahan organik tinggi, struktur remah granular, dan kejenuhan basa > 50%.',
              'Lapisan padat bawah tanah yang tersusun atas kristal murni gipsum kalsium sulfat.',
              'Lapisan merah beracun yang kaya hidroksida aluminium oksida tidak larut.',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'A mollic epipedon is defined by thick dark coloring, high organic carbon content from decaying grass roots, soft crumb consistency, and high base saturation (> 50%).',
            id: 'Epipedon molik didefinisikan oleh warna gelap yang tebal, kandungan karbon organik tinggi dari pelapukan akar rumput, konsistensi remah yang lunak, dan kejenuhan basa tinggi (> 50%).',
          },
        },
      ],
    },

    // =============================================================
    // PART 4: ARID & SEMI-ARID BIOMES: DESERTS & SCLEROPHYLL
    // =============================================================
    {
      id: 'biome-mod-4',
      topicId: 'biomes-ecology',
      order: 4,
      title: {
        en: 'Part 4: Arid & Semi-Arid Biomes: Deserts & Mediterranean Sclerophyll',
        id: 'Bagian 4: Bioma Arid & Semi-Arid: Gurun & Sklerofil Mediterania',
      },
      shortDescription: {
        en: 'Crassulacean Acid Metabolism kinetics, cryptobiotic soil crusts, Water-Use Efficiency, and pyrogenic chaparral adaptations.',
        id: 'Kinetika Metabolisme Asam Krasulasea (CAM), kerak tanah kriptobiotik, Efisiensi Penggunaan Air, dan adaptasi pirogenik semak kaparal.',
      },
      durationMinutes: 25,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-4-sec-1',
          title: {
            en: '1. Global Desert Geomorphology & Zonation Mechanics',
            id: '1. Geomorfologi Gurun Global & Mekanika Zonasi Arid',
          },
          content: {
            en: 'Deserts occupy approximately 33% of the Earth’s land surface, defined climatologically by extreme precipitation deficit where potential evapotranspiration (PET) exceeds mean annual precipitation (P) by a factor of two or more (Budyko index Φ ≥ 2.0; MAP typically < 250 mm/yr).\n\nDeserts originate through four distinct climatological mechanisms:\n1. Subtropical High-Pressure Deserts (Hadley Subsidence): Sahara, Arabian, Thar, Great Victoria.\n2. Rain-Shadow Deserts: Great Basin, Mojave, Patagonian, Taklamakan.\n3. Continental Interior Deserts: Gobi, Kyzylkum (isolated thousands of kilometers from oceanic moisture sources).\n4. Coastal Cold-Current Deserts: Atacama, Namib (coastal upwelling of cold marine water stabilizes atmosphere and prevents convection).\n\nGeomorphically, deserts are dominated by wind (aeolian) and episodic flash-flood processes. Less than 20% of global deserts consist of sandy dunes (erg). The vast majority are rocky plateaus (hamada) or gravel-covered desert pavements (reg), where deflation (wind removal of fine silt and clay) leaves a tightly packed surface layer of interlocking stones coated with dark desert varnish (manganese and iron oxides oxidized by microcolonial fungi).',
            id: 'Gurun mencakup sekitar 33% luas daratan Bumi, yang secara klimatologis didefinisikan oleh defisit presipitasi ekstrem di mana evapotranspirasi potensial (PET) melampaui presipitasi tahunan rata-rata (P) sebesar dua kali lipat atau lebih (indeks Budyko Φ ≥ 2,0; MAP umumnya < 250 mm/tahun).\n\nGurun terbentuk melalui empat mekanisme klimatologis yang berbeda:\n1. Gurun Tekanan Tinggi Subtropis (Subsiden Hadley): Sahara, Arab, Thar, Victoria Besar.\n2. Gurun Bayangan Hujan: Great Basin, Mojave, Patagonia, Taklamakan.\n3. Gurun Pedalaman Benua: Gobi, Kyzylkum (terisolasi ribuan kilometer dari uap air samudra).\n4. Gurun Pesisir Arus Dingin: Atacama, Namib (upwelling air laut dingin menstabilkan atmosfer dan mencegah konveksi awan hujan).\n\nSecara geomorfologi, gurun didominasi oleh proses angin (eolian) dan banjir bandang episodik. Kurang dari 20% gurun di dunia berupa bukit pasir (erg). Sebagian besar berupa dataran tinggi berbatu (hamada) atau hamparan kerikil berpepatah (reg), di mana deflasi angin meniup partikel halus dan menyisakan lapisan batu terkunci rapat berlapis pernis gurun gelap (oksida mangan dan besi yang dioksidasi jamur mikrokranial).',
          },
          keyTakeaways: {
            en: [
              'Deserts are water-limited systems where potential evapotranspiration far outstrips actual precipitation.',
              'Sandy ergs represent a minority of desert surfaces; rocky hamadas and gravel regs dominate geomorphology.',
            ],
            id: [
              'Gurun adalah sistem dengan keterbatasan air di mana evapotranspirasi potensial jauh melampaui curah hujan.',
              'Bukit pasir erg hanya mencakup sebagian kecil gurun; hamparan batu hamada dan kerikil reg mendominasi lanskap.',
            ],
          },
        },
        {
          id: 'biome-4-sec-2',
          title: {
            en: '2. Crassulacean Acid Metabolism (CAM) & Water-Use Efficiency',
            id: '2. Metabolisme Asam Krasulasea (CAM) & Efisiensi Penggunaan Air',
          },
          content: {
            en: 'Xerophytic desert plants maximize Water-Use Efficiency (WUE = net photosynthesis A / transpiration E). Under hot daytime desert conditions, Vapor Pressure Deficit (VPD = e_s(T_leaf) - e_a) reaches extreme levels (4 to 8 kPa), causing catastrophic transpirational water loss if stomata open.\n\nTo overcome this physical barrier, succulents (Cactaceae, Crassulaceae, Agavaceae) evolved Crassulacean Acid Metabolism (CAM), a temporal separation of carbon fixation:\n\n1. Nocturnal Phase (Nighttime): Stomata open in cool nocturnal air when VPD is low (typically < 1.0 kPa). Atmospheric CO₂ diffuses inward and is hydrated by carbonic anhydrase into HCO₃⁻. Phosphoenolpyruvate carboxylase (PEPC) fixes this bicarbonate onto phosphoenolpyruvate (PEP), forming oxaloacetate, which is reduced to malate. Malic acid is actively pumped across the tonoplast and stored in the massive central vacuole, causing tissue acidification.\n\n2. Diurnal Phase (Daytime): Stomata close tightly, halting transpirational water loss. Vacuolar malic acid is transported back into the cytosol and decarboxylated (via NAD-malic enzyme, NADP-ME, or PEP carboxykinase), releasing concentrated CO₂ internally. High internal partial pressures of CO₂ (> 1000 ppm) saturate RuBisCO in the chloroplasts, completely suppressing photorespiration.\n\nCAM plants achieve remarkable Water-Use Efficiency, losing only 50 to 100 g of H₂O per gram of CO₂ fixed, compared to 250–500 g for C4 plants and 400–800 g for C3 plants.',
            id: 'Tumbuhan xerofit gurun memaksimalkan Efisiensi Penggunaan Air (WUE = fotosintesis bersih A / transpirasi E). Di bawah terik siang hari gurun, Defisit Tekanan Uap (VPD = e_s(T_daun) - e_a) mencapai tingkat ekstrem (4 hingga 8 kPa), yang akan memicu transpirasi mematikan jika stomata terbuka.\n\nUntuk mengatasi tantangan biofisika ini, tumbuhan sukulen (Cactaceae, Crassulaceae, Agavaceae) mengembangkan Metabolisme Asam Krasulasea (CAM), yaitu pemisahan temporal fiksasi karbon:\n\n1. Fase Nokturnal (Malam Hari): Stomata membuka di udara malam yang sejuk saat VPD rendah (< 1,0 kPa). CO₂ atmosfer berdifusi masuk dan diubah menjadi HCO₃⁻. Fosfoenolpiruvat karboksilase (PEPC) mengikat bikarbonat ini pada fosfoenolpiruvat (PEP), membentuk oksaloasetat yang lalu direduksi menjadi malat. Asam malat dipompa aktif menembus tonoplas dan disimpan di vakuola tengah yang besar, meningkatkan keasaman jaringan.\n2. Fase Diurnal (Siang Hari): Stomata menutup rapat, menghentikan kehilangan air transpirasi. Asam malat vakuola ditranspor kembali ke sitosol dan mengalami dekarboksilasi, melepaskan CO₂ konsentrasi tinggi di dalam jaringan daun. Tekanan parsial CO₂ internal yang tinggi (> 1000 ppm) menjenuhkan enzim RuBisCO di kloroplas, sepenuhnya melenyapkan fotorespirasi.\n\nTumbuhan CAM mencapai efisiensi luar biasa, hanya kehilangan 50 hingga 100 g H₂O per gram CO₂ yang difiksasi, dibandingkan dengan 250–500 g pada tumbuhan C4 dan 400–800 g pada tumbuhan C3.',
          },
          formula: '\\text{WUE} = \\frac{A}{E} = \\frac{c_a \\cdot (1 - c_i/c_a)}{1.6 \\cdot \\text{VPD}}',
          formulaExplanation: {
            en: 'Leaf Water-Use Efficiency: Formulates net assimilation rate A over transpirational flux E as a function of ambient CO₂ c_a, intercellular CO₂ c_i, and atmospheric vapor pressure deficit VPD.',
            id: 'Efisiensi Penggunaan Air Daun: Memformulasikan laju asimilasi bersih A terhadap fluks transpirasi E sebagai fungsi CO₂ ambien c_a, CO₂ antarsel c_i, dan defisit tekanan uap atmosfer VPD.',
          },
          variables: [
            {
              symbol: 'A',
              name: { en: 'Net CO₂ Assimilation Rate', id: 'Laju Asimilasi Bersih CO₂' },
              unit: 'µmol CO₂ / (m²·s)',
              description: {
                en: 'Photosynthetic carbon uptake minus respiratory release.',
                id: 'Penyerapan karbon fotosintesis dikurangi pelepasan respirasi.',
              },
            },
            {
              symbol: 'E',
              name: { en: 'Transpiration Rate', id: 'Laju Transpirasi' },
              unit: 'mmol H₂O / (m²·s)',
              description: {
                en: 'Evaporative water flux departing through stomatal pores.',
                id: 'Fluks air evaporasi yang keluar melalui pori stomata.',
              },
            },
            {
              symbol: '\\text{VPD}',
              name: { en: 'Vapor Pressure Deficit', id: 'Defisit Tekanan Uap' },
              unit: 'kPa',
              description: {
                en: 'Difference between saturation vapor pressure at leaf temperature and actual ambient atmospheric vapor pressure.',
                id: 'Selisih antara tekanan uap jenuh pada suhu daun dengan tekanan uap aktual udara ambien.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Fickian Flux Equations for CO₂ and H₂O',
                id: 'Langkah 1: Persamaan Fluks Fick untuk CO₂ dan H₂O',
              },
              math: 'A = g_c (c_a - c_i), \\qquad E = g_w (w_i - w_a) = g_w \\cdot \\text{VPD} / P_{\\text{atm}}',
              explanation: {
                en: 'Net photosynthetic assimilation A is governed by stomatal conductance to CO₂ (g_c) across the concentration gradient (c_a - c_i). Transpiration E is driven by stomatal conductance to water vapor (g_w) across the vapor pressure deficit VPD.',
                id: 'Asimilasi fotosintesis bersih A dikendalikan oleh konduktansi stomata terhadap CO₂ (g_c) melintasi gradien konsentrasi (c_a - c_i). Transpirasi E didorong oleh konduktansi stomata terhadap uap air (g_w) melintasi defisit tekanan uap VPD.',
              },
            },
            {
              title: {
                en: 'Step 2: Binary Diffusivity Ratio in Air',
                id: 'Langkah 2: Rasio Difusivitas Biner dalam Udara',
              },
              math: '\\frac{g_w}{g_c} = \\frac{D_{\\text{H}_2\\text{O}}}{D_{\\text{CO}_2}} \\approx 1.6',
              explanation: {
                en: 'Because water vapor molecules are lighter than carbon dioxide molecules, water diffuses through stomatal apertures 1.6 times faster than CO₂ in gaseous air.',
                id: 'Karena molekul uap air lebih ringan daripada molekul karbon dioksida, uap air berdifusi melalui pori stomata 1,6 kali lebih cepat dibandingkan CO₂ di udara.',
              },
            },
            {
              title: {
                en: 'Step 3: Derivation of Water-Use Efficiency & CAM Nocturnal Advantage',
                id: 'Langkah 3: Penurunan Efisiensi Penggunaan Air & Keunggulan Nokturnal CAM',
              },
              math: '\\text{WUE} = \\frac{A}{E} = \\frac{g_c (c_a - c_i)}{1.6 \\, g_c \\, \\text{VPD}} = \\frac{c_a (1 - c_i/c_a)}{1.6 \\, \\text{VPD}}',
              explanation: {
                en: 'Dividing A by E cancels stomatal conductance g_c, demonstrating that WUE is inversely proportional to VPD. By shifting stomatal opening to nighttime when VPD drops from 5.0 kPa to 0.8 kPa, CAM plants achieve a 5- to 10-fold increase in water-use efficiency over C3 plants.',
                id: 'Membagi A dengan E mengeliminasi konduktansi stomata g_c, membuktikan bahwa WUE berbanding terbalik dengan VPD. Dengan menggeser pembukaan stomata ke malam hari saat VPD turun dari 5,0 kPa menjadi 0,8 kPa, tumbuhan CAM mencapai efisiensi penggunaan air 5 hingga 10 kali lebih tinggi dibandingkan tumbuhan C3.',
              },
            },
          ],
        },
        {
          id: 'biome-4-sec-3',
          title: {
            en: '3. Biological Soil Crusts & Desert Ephemerals',
            id: '3. Kerak Tanah Biologis (Biocrust) & Efemeral Gurun',
          },
          content: {
            en: 'In the interspaces between widely dispersed desert shrubs, the soil surface is stabilized by Biological Soil Crusts (biocrusts). Biocrusts are intimate consortia of cyanobacteria (predominantly filamentous Microcoleus vaginatus), lichens, and mosses inhabiting the top 1 to 4 mm of soil.\n\nBiocrust ecological functions:\n1. Soil Mechanical Stabilization: Filamentous cyanobacteria secrete sticky exopolysaccharide (EPS) sheaths that physically bind sand grains together into an erosion-resistant crust that withstands wind deflation and water sheetwash.\n2. Biological Nitrogen Fixation: Heterocystous cyanobacteria (e.g., Nostoc, Scytonema) and lichen photobionts fix atmospheric dinitrogen (N₂), contributing up to 70% of total nitrogen inputs in arid ecosystems.\n3. Moisture Retention & Infiltration: Dark biocrusts increase surface roughness, trapping dew and micro-runoff.\n\nConcurrently, annual desert ephemerals (therophytes) survive prolonged multi-year droughts as desiccation-resistant seeds buried in the soil seed bank. Seeds possess chemical germination inhibitors (abscisic acid) that are leached out only by threshold rain pulses exceeding 20–25 mm. Following rain, ephemerals germinate, flower, set seed, and senesce within 3 to 6 weeks, carpeting the desert floor in explosive, synchronized floral blooms.',
            id: 'Di ruang terbuka di antara semak-semak gurun yang jarang, permukaan tanah distabilkan oleh Kerak Tanah Biologis (Biocrust). Biocrust merupakan konsorsium mikroskopis antara sianobakteri (terutama Microcoleus vaginatus berfilamen), lumut kerak, dan lumut daun yang mendiami lapisan 1 hingga 4 mm teratas tanah.\n\nFungsi ekologis biocrust:\n1. Stabilisasi Mekanis Tanah: Sianobakteri berfilamen mengeluarkan selubung eksopolisakarida (EPS) lengket yang mengikat butiran pasir menjadi kerak padat tahan erosi dari terpaan angin dan gerusan air hujan.\n2. Fiksasi Nitrogen Biologis: Sianobakteri berheterokista (seperti Nostoc dan Scytonema) mengikat dinitrogen (N₂) atmosfer, menyumbang hingga 70% dari seluruh masukan nitrogen di ekosistem gurun.\n3. Retensi Kelembapan: Biocrust berwarna gelap meningkatkan kekasaran permukaan mikro, memerangkap embun dan limpasan air hujan.\n\nBersamaan dengan itu, tumbuhan efemeral tahunan (terofit) bertahan hidup melewati kekeringan panjang bertahun-tahun dalam bentuk biji dorman di dalam bank biji tanah. Biji memiliki inhibitor perkecambahan kimiawi (asam absisat) yang hanya dapat tercuci bersih oleh curahan hujan deras yang melebihi 20–25 mm. Pasca hujan, efemeral berkecambah, berbunga, menghasilkan biji baru, dan mati dalam waktu 3 hingga 6 minggu dalam ledakan bunga serempak yang spektakuler.',
          },
          caseStudy: {
            title: {
              en: 'The Mojave Desert Saguaro-Nurse Plant Facilitation',
              id: 'Fasilitasi Tanaman Pengasuh (Nurse Plant) pada Kaktus Saguaro',
            },
            context: {
              en: 'In the Sonoran and Mojave deserts, young seedlings of the giant columnar cactus Carnegiea gigantea (saguaro) face near-total mortality if germinating in exposed open soil.',
              id: 'Di Gurun Sonora dan Mojave, anakan muda kaktus raksasa Carnegiea gigantea (saguaro) mengalami mortalitas hampir 100% jika berkecambah di tanah terbuka tanpa naungan.',
            },
            analysis: {
              en: 'Ecological surveys show that > 95% of surviving saguaro seedlings establish beneath the canopy of "nurse plants", primarily the nitrogen-fixing legume Olneya tesota (desert ironwood) or Larrea tridentata (creosote bush). The nurse canopy modulates microclimate:\n1. Daytime Maximum Temperature Reduction: Lowers soil surface temperatures by up to 15°C, preventing thermal tissue necrosis.\n2. Radiative Buffering at Night: Traps ground longwave radiation, keeping winter minimum temperatures 2°C to 4°C warmer and protecting frost-sensitive seedlings.\n3. Nutrient Island Effect: Enriches subcanopy soil with organic nitrogen, phosphorus, and moisture.',
              id: 'Survei ekologi membuktikan bahwa > 95% anakan saguaro yang sintas tumbuh tepat di bawah kanopi "tanaman pengasuh" (nurse plant), terutama pohon legum pengikat nitrogen Olneya tesota atau semak Larrea tridentata. Kanopi pengasuh memodulasi iklim mikro:\n1. Penurunan Suhu Maksimum Siang: Menurunkan suhu permukaan tanah hingga 15°C, mencegah nekrosis jaringan akibat panas.\n2. Penahan Radiasi Malam: Memerangkap radiasi gelombang panjang tanah, menjaga suhu minimum musim dingin 2°C hingga 4°C lebih hangat dan melindungi anakan dari pembekuan.\n3. Efek Pulau Nutrisi (Nutrient Island): Memperkaya tanah di bawah kanopi dengan nitrogen organik, fosfor, dan kelembapan.',
            },
            takeaway: {
              en: 'Facilitation and positive species interactions often supersede competitive exclusion in physically extreme, abiotic-stress-dominated environments.',
              id: 'Fasilitasi dan interaksi positif antar-spesies kerap mengungguli kompetisi di lingkungan bertekanan fisik ekstrem.',
            },
          },
        },
        {
          id: 'biome-4-sec-4',
          title: {
            en: '4. Mediterranean Sclerophyllous Shrublands & Pyrogenicity',
            id: '4. Semak Sklerofil Mediterania & Adaptasi Pirogenik',
          },
          content: {
            en: 'The Mediterranean Biome (Chaparral in California, Matorral in Chile, Fynbos in South Africa, Maquis in the Mediterranean basin, and Mallee in southwestern Australia) occurs exclusively on the west coasts of continents between 30° and 45° latitude.\n\nIt features a unique climate decoupling: hot, dry summers (controlled by subtropical high-pressure subsidence) juxtaposed with cool, wet winters (controlled by westerly cyclonic frontal systems).\n\nVegetation is characterized by sclerophyllous evergreen shrubs (e.g., Adenostoma, Arctostaphylos, Quercus dumosa):\n1. Sclerophylly: Leaves are small, stiff, leathery, and heavily cutinized, with thick lignified cell walls that prevent wilting and maintain structural integrity during extreme summer water stress (xylem water potentials dropping below -4 to -8 MPa).\n2. Volatile Terpenes and Resins: Sclerophyll leaves contain high concentrations of flammable essential oils and terpenes, making the chaparral inherently pyrogenic (fire-promoting).\n3. Fire-Stimulated Regeneration: Chaparral operates on a 30 to 60-year fire cycle. Shrubs feature dual regeneration strategies: obligate resprouters regenerate vigorously from massive underground woody root crowns (lignotubers/burls), while obligate seeders accumulate dormant soil seed banks whose germination is triggered by chemical compounds in smoke called karrikins (butenolides derived from burning cellulose).',
            id: 'Bioma Mediterania (disebut Chaparral di California, Matorral di Chili, Fynbos di Afrika Selatan, Maquis di cekungan Mediterania, dan Mallee di barat daya Australia) terletak khusus di pantai barat benua antara lintang 30° dan 45°.\n\nBioma ini memiliki iklim unik yang terbalik: musim panas yang panas dan kering (akibat subsiden tekanan tinggi subtropis) berpadu dengan musim dingin yang sejuk dan basah (akibat sistem front siklonik angin barat).\n\nVegetasi didominasi oleh semak selalu hijau sklerofil (seperti Adenostoma, Arctostaphylos, Quercus dumosa):\n1. Sklerofili: Daun berukuran kecil, kaku, liat seperti kulit, dan berlapis kutin tebal dengan dinding sel terlignifikasi kuat yang mencegah layu saat musim panas kering ekstrem (potensial air xilem turun hingga di bawah -4 hingga -8 MPa).\n2. Terpen dan Minyak Atsiri Volatil: Daun sklerofil mengandung minyak atsiri dan terpen yang sangat mudah terbakar, membuat semak kaparal secara alami bersifat pirogenik (memicu api).\n3. Regenerasi Terstimulasi Api: Ekosistem ini beroperasi dalam siklus kebakaran 30 hingga 60 tahun. Semak memiliki dua strategi regenerasi: obligate resprouters yang bertunas kembali dari umbi kayu bawah tanah (lignotuber), serta obligate seeders yang memiliki bank biji tanah yang perkecambahannya dipicu oleh senyawa kimia dalam asap kebakaran yang disebut karrikin (butenolida dari selulosa terbakar).',
          },
          comparisonTable: {
            headers: {
              en: ['Biophysical Trait', 'Subtropical Hot Desert', 'Mediterranean Chaparral'],
              id: ['Ciri Biofisika', 'Gurun Panas Subtropis', 'Semak Kaparal Mediterania'],
            },
            rows: [
              {
                en: ['Annual Rainfall Pattern', 'Hyper-arid (< 200 mm), unpredictable rain pulses', 'Winter-wet / Summer-dry (300–800 mm)'],
                id: ['Pola Presipitasi Tahunan', 'Hiper-arid (< 200 mm), curahan episodik tak terduga', 'Musim dingin basah / Musim panas kering (300–800 mm)'],
              },
              {
                en: ['Dominant Photosynthetic Pathway', 'CAM in succulents, C4 in grasses, C3 in phreatophytes', 'Sclerophyllous C3 evergreen shrubs'],
                id: ['Jalur Fotosintesis Dominan', 'CAM pada sukulen, C4 pada rumput, C3 pada freatofit', 'Semak C3 sklerofil selalu hijau'],
              },
              {
                en: ['Fire Return Interval', 'Rare (> 100–500 yrs due to fuel discontinuity)', 'Frequent (30–60 yrs, crown fire regime)'],
                id: ['Interval Kebakaran', 'Sangat jarang (> 100–500 tahun karena bahan bakar terputus)', 'Sering (30–60 tahun, rezim kebakaran tajuk)'],
              },
              {
                en: ['Post-Fire Seed Trigger', 'Moisture pulse leaching ABA from seed coat', 'Combustion chemicals (karrikins) and heat scarification'],
                id: ['Pemicu Biji Pascakebakaran', 'Curahan air mencuci asam absisat dari kulit biji', 'Senyawa kimia asap (karrikin) dan skarifikasi panas'],
              },
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'biome-q4-1',
          question: {
            en: 'What enzymatic reaction drives nocturnal carbon dioxide fixation in CAM succulents?',
            id: 'Reaksi enzimatik apakah yang menggerakkan fiksasi karbon dioksida nokturnal pada tumbuhan sukulen CAM?',
          },
          options: {
            en: [
              'ATP synthase reverses to pump CO₂ directly into the nucleus.',
              'RuBisCO fixes CO₂ onto ribulose-1,5-bisphosphate in pitch-black darkness.',
              'Nitrogenase converts dissolved CO₂ into urea.',
              'Phosphoenolpyruvate Carboxylase (PEPC) fixes bicarbonate onto PEP to synthesize oxaloacetate and malate.',
            ],
            id: [
              'ATP sintase bekerja terbalik untuk memompa CO₂ langsung ke dalam nukleus.',
              'RuBisCO memfiksasi CO₂ pada ribulosa-1,5-bisfosfat dalam kegelapan malam.',
              'Nitrogenase mengubah CO₂ terlarut menjadi urea.',
              'Fosfoenolpiruvat Karboksilase (PEPC) memfiksasi bikarbonat pada PEP untuk mensintesis oksaloasetat dan malat.',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'At night, stomata open and PEPC fixes HCO₃⁻ onto phosphoenolpyruvate, generating oxaloacetate which is reduced to malic acid and stored in vacuoles.',
            id: 'Di malam hari, stomata terbuka dan PEPC memfiksasi HCO₃⁻ pada fosfoenolpiruvat, menghasilkan oksaloasetat yang direduksi menjadi asam malat dan disimpan dalam vakuola.',
          },
        },
        {
          id: 'biome-q4-2',
          question: {
            en: 'Why is the Water-Use Efficiency (WUE) of CAM plants 5 to 10 times higher than that of C3 plants?',
            id: 'Mengapa Efisiensi Penggunaan Air (WUE) pada tumbuhan CAM 5 hingga 10 kali lebih tinggi dibandingkan tumbuhan C3?',
          },
          options: {
            en: [
              'CAM plants absorb water through cosmic radiation without transpiration.',
              'CAM stomata open only at night when ambient temperatures are low and Vapor Pressure Deficit (VPD) is minimal.',
              'CAM plants possess zero stomata across their entire epidermis.',
              'CAM chloroplasts convert oxygen into water via reverse respiration.',
            ],
            id: [
              'Tumbuhan CAM menyerap air melalui radiasi kosmis tanpa transpirasi.',
              'Stomata CAM hanya membuka di malam hari saat suhu sejuk dan Defisit Tekanan Uap (VPD) minimal.',
              'Tumbuhan CAM sama sekali tidak memiliki stomata di seluruh epidermisnya.',
              'Kloroplas CAM mengubah oksigen menjadi air melalui respirasi terbalik.',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Transpiration rate scales linearly with VPD. Opening stomata at night when VPD is 0.5–1.0 kPa rather than during the day when VPD is 4–6 kPa minimizes water loss per mole of CO₂ assimilated.',
            id: 'Laju transpirasi sebanding lurus dengan VPD. Membuka stomata di malam hari saat VPD rendah (0,5–1,0 kPa) alih-alih di siang hari saat VPD tinggi (4–6 kPa) sangat meminimalkan kehilangan air per mol CO₂ yang diasimilasi.',
          },
        },
        {
          id: 'biome-q4-3',
          question: {
            en: 'What specific chemical compound in wildfire smoke breaks seed dormancy in Mediterranean chaparral post-fire annuals?',
            id: 'Senyawa kimia spesifik apakah dalam asap kebakaran hutan yang memecah dormansi biji tumbuhan tahunan kaparal Mediterania pascakebakaran?',
          },
          options: {
            en: [
              'Sulfur dioxide (SO₂)',
              'Carbon monoxide gas (CO)',
              'Karrikins (butenolides derived from pyrolyzed cellulose)',
              'Nitric acid mist',
            ],
            id: [
              'Sulfur dioksida (SO₂)',
              'Gas karbon monoksida (CO)',
              'Karrikin (butenolida turunan pirolisis selulosa)',
              'Uap asam nitrat pekat',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Karrikins are potent plant growth regulators found in wildfire smoke that bind to the KAI2 receptor protein, triggering germination of fire-adapted seed banks.',
            id: 'Karrikin adalah regulator pertumbuhan tanaman dalam asap kebakaran yang berikatan dengan protein reseptor KAI2, memicu perkecambahan bank biji adaptasi api.',
          },
        },
        {
          id: 'biome-q4-4',
          question: {
            en: 'What ecological role do cyanobacteria in biological soil crusts (biocrusts) perform in arid desert environments?',
            id: 'Peran ekologis apakah yang dijalankan sianobakteri pada kerak tanah biologis (biocrust) di lingkungan gurun arid?',
          },
          options: {
            en: [
              'They secrete exopolysaccharide sheaths that mechanically bind sand grains against aeolian erosion and fix atmospheric nitrogen.',
              'They create underground lava tubes that store groundwater.',
              'They consume quartz sand and turn it into diamond crystals.',
              'They generate supersonic sound waves that repel grazing insects.',
            ],
            id: [
              'Sianobakteri menyekresikan selubung eksopolisakarida yang mengikat butiran pasir dari erosi angin dan mengikat nitrogen atmosfer.',
              'Sianobakteri membuat lorong lava bawah tanah yang menyimpan air tanah.',
              'Sianobakteri memakan pasir kuarsa dan mengubahnya menjadi kristal intan.',
              'Sianobakteri menghasilkan gelombang suara ultrasonik yang mengusir serangga pemakan tumbuhan.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Cyanobacterial filaments physically bind mineral grains with sticky polysaccharide sheaths, preventing wind deflation while diazotrophic species fix atmospheric dinitrogen into bioavailable forms.',
            id: 'Filamen sianobakteri secara fisik mengikat butiran mineral pasir dengan selubung polisakarida lengket, mencegah erosi angin sembari mengikat dinitrogen atmosfer menjadi bentuk yang dapat diserap tanaman.',
          },
        },
      ],
    },

    // =============================================================
    // PART 5: EQUATORIAL & HUMID BIOMES: RAINFORESTS & SAVANNAS
    // =============================================================
    {
      id: 'biome-mod-5',
      topicId: 'biomes-ecology',
      order: 5,
      title: {
        en: 'Part 5: Equatorial & Humid Biomes: Tropical Rainforests & Savannas',
        id: 'Bagian 5: Bioma Ekuatorial & Lembap: Hutan Hujan Tropis & Sabana',
      },
      shortDescription: {
        en: 'Vertical canopy stratification, rapid mycorrhizal recycling in Oxisols, buttress root mechanics, and C4 photosynthetic quantum yields.',
        id: 'Stratifikasi kanopi vertikal, daur ulang mikoriza cepat pada tanah Oxisol, mekanika akar banir, dan hasil kuantum fotosintesis C4.',
      },
      durationMinutes: 25,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-5-sec-1',
          title: {
            en: '1. Tropical Rainforest Vertical Stratification & Microclimates',
            id: '1. Stratifikasi Vertikal & Iklim Mikro Hutan Hujan Tropis',
          },
          content: {
            en: 'Tropical Rainforests (Selva) represent the terrestrial apex of biodiversity and structural complexity, encircling the equator within 10°N and 10°S latitude (Amazon Basin, Congo Basin, Indo-Malayan Archipelago). They receive high, year-round solar irradiance, constant temperatures (MAT 25°C to 28°C), and abundant rainfall (MAP 2000 to >4000 mm/yr) without a severe dry season.\n\nThe vertical structure consists of five defined strata:\n1. Emergent Layer (45 to 70+ m): Widely spaced giant trees (e.g., Bertholletia excelsa, Ceiba pentandra, Dipterocarpus) that tower above the main canopy, enduring hurricane-force winds, intense solar radiation, and extreme diurnal temperature swings.\n2. Continuous Overstory Canopy (30 to 45 m): A continuous interlocking green ceiling that intercepts up to 80–90% of incident sunlight and dampens rainfall kinetic energy.\n3. Understory Layer (10 to 25 m): Slender trees and palms with large, shade-adapted leaves equipped with elongated drip tips that rapidly shed surface water films to prevent epiphyte colonisation and fungal sporulation.\n4. Shrub and Sapling Layer (2 to 8 m): Young trees awaiting canopy gaps.\n5. Forest Floor (0 to 2 m): Deep shade where photosynthetically active radiation (PAR) drops below 0.5–1.0% of full sunlight, illuminated only by fleeting, high-intensity sunflecks (brief beams of direct light penetrating canopy gaps that account for up to 60% of understory daily carbon assimilation).',
            id: 'Hutan Hujan Tropis (Selva) adalah puncak keanekaragaman hayati dan kompleksitas struktural terestrial bumi, melingkari khatulistiwa di antara lintang 10°LU dan 10°LS (Cekungan Amazon, Cekungan Kongo, Kepulauan Indo-Malaya). Kawasan ini menerima insolasi surya tinggi sepanjang tahun, suhu konstan (MAT 25°C hingga 28°C), dan curah hujan melimpah (MAP 2000 hingga >4000 mm/tahun) tanpa musim kemarau nyata.\n\nStruktur vertikal hutan terbagi menjadi lima strata:\n1. Lapisan Pohon Mencuat / Emergen (45 hingga 70+ m): Pohon raksasa berjarak renggang (seperti Shorea, Bertholletia excelsa, Ceiba pentandra) yang menjulang di atas kanopi utama, menantang terpaan angin kencang, radiasi matahari intens, dan fluktuasi suhu ekstrem.\n2. Kanopi Utama Bersambung (30 hingga 45 m): Lapisan mahkota daun yang saling mengunci rapat, menyerap 80–90% sinar matahari datang dan meredam energi kinetik tetesan hujan deras.\n3. Lapisan Bawah Kanopi / Understory (10 hingga 25 m): Pohon ramping dan palem dengan daun lebar ternaungi yang memiliki ujung menetes (drip tips) runcing untuk membuang lapisan air permukaan dengan cepat guna mencegah lumut kerak dan jamur.\n4. Lapisan Semak & Anakan (2 hingga 8 m): Anakan pohon yang berada dalam kondisi dormansi bayangan menunggu celah kanopi terbuka.\n5. Lantai Hutan (0 hingga 2 m): Zona teduh pekat di mana radiasi fotosintesis (PAR) anjlok hingga di bawah 0,5–1,0% dari sinar matahari terbuka, hanya diterangi oleh berkas cahaya sesaat (sunflecks) yang menyumbang hingga 60% asimilasi karbon harian tumbuhan bawah.',
          },
          formula: '\\text{NPP} = \\min\\left( \\frac{3000}{1 + e^{1.315 - 0.119 \\cdot T}}, \\; 3000 \\cdot \\left(1 - e^{-0.000664 \\cdot P}\\right) \\right)',
          formulaExplanation: {
            en: 'Lieth’s Miami Model for Terrestrial Net Primary Productivity (NPP): Formulates maximum annual dry matter production (g/m²·yr) as the minimum of a temperature-limited function NPP(T) and a precipitation-limited function NPP(P).',
            id: 'Model Miami Lieth untuk Produktivitas Primer Bersih (NPP): Memformulasikan produksi bahan kering tahunan maksimum (g/m²·tahun) sebagai nilai minimum antara fungsi pembatas suhu NPP(T) dan fungsi pembatas presipitasi NPP(P).',
          },
          variables: [
            {
              symbol: '\\text{NPP}',
              name: { en: 'Net Primary Productivity', id: 'Produktivitas Primer Bersih' },
              unit: 'g dry matter / (m²·yr)',
              description: {
                en: 'Net rate of organic carbon accumulation by photosynthetic vegetation after autotrophic respiration.',
                id: 'Laju bersih akumulasi karbon organik oleh vegetasi setelah dikurangi respirasi autotrofik.',
              },
            },
            {
              symbol: 'T',
              name: { en: 'Mean Annual Temperature', id: 'Suhu Rata-rata Tahunan' },
              unit: '°C',
              description: {
                en: 'Average ambient surface temperature.',
                id: 'Suhu permukaan ambien rata-rata tahunan.',
              },
            },
            {
              symbol: 'P',
              name: { en: 'Mean Annual Precipitation', id: 'Presipitasi Rata-rata Tahunan' },
              unit: 'mm / yr',
              description: {
                en: 'Total cumulative annual rainfall.',
                id: 'Total akumulasi curah hujan tahunan.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Temperature-Dependent Productivity Sigmoid',
                id: 'Langkah 1: Kurva Sigmoid Produktivitas Bergantung Suhu',
              },
              math: '\\text{NPP}_T = \\frac{3000}{1 + e^{1.315 - 0.119 T}}',
              explanation: {
                en: 'Enzymatic kinetics of photosynthesis accelerate with temperature following an Arrhenius curve until reaching an asymptotic plateau where maximum biological carbon assimilation rate (~3000 g DM/(m²·yr)) saturates under light-saturated tropical conditions.',
                id: 'Kinetika enzimatik fotosintesis terakselerasi oleh kenaikan suhu mengikuti kurva Arrhenius hingga mencapai batas asimtotik maksimum (~3000 g bahan kering/(m²·tahun)) dalam kondisi tropis jenuh cahaya.',
              },
            },
            {
              title: {
                en: 'Step 2: Precipitation-Dependent Exponential Saturation',
                id: 'Langkah 2: Saturasi Eksponensial Bergantung Presipitasi',
              },
              math: '\\text{NPP}_P = 3000 \\left(1 - e^{-0.000664 P}\\right)',
              explanation: {
                en: 'Water availability controls stomatal opening and transpiration. As annual rainfall P increases from 0 toward 4000 mm, moisture limitation relaxes exponentially toward the same asymptotic biological ceiling of 3000 g DM/(m²·yr).',
                id: 'Ketersediaan air mengendalikan pembukaan stomata dan transpirasi. Seiring peningkatan curah hujan tahunan P menuju 4000 mm, pembatasan kelembapan melemah secara eksponensial menuju batas biologis 3000 g/(m²·tahun).',
              },
            },
            {
              title: {
                en: 'Step 3: Liebig Minimum Law Coupling',
                id: 'Langkah 3: Penggabungan Hukum Minimum Liebig',
              },
              math: '\\text{NPP} = \\min(\\text{NPP}_T, \\text{NPP}_P)',
              explanation: {
                en: "Applying Justus von Liebig's Law of the Minimum dictates that whichever climatic resource is most limiting (thermal energy or water supply) constrains actual Net Primary Productivity, explaining why equatorial rainforests (high T and high P) maximize terrestrial carbon sequestration.",
                id: 'Menerapkan Hukum Minimum Justus von Liebig menentukan bahwa sumber daya iklim manapun yang paling membatasi (energi termal atau pasokan air) akan membatasi Produktivitas Primer Bersih aktual, menjelaskan mengapa hutan hujan khatulistiwa (T dan P tinggi) memaksimalkan sekuestrasi karbon terestrial.',
              },
            },
          ],
        },
        {
          id: 'biome-5-sec-2',
          title: {
            en: '2. Oxisol Pedogenesis & Tight Mycorrhizal Nutrient Cycling',
            id: '2. Pedogenesis Tanah Oxisol & Siklus Hara Mikoriza Tertutup',
          },
          content: {
            en: 'A profound ecological paradox of the tropical rainforest is that the world’s most luxuriant biomass stands upon some of the most nutrient-impoverished, deeply weathered soils on Earth: Oxisols (Ferralsols) and Ultisols.\n\nOver millions of years, continuous warm temperatures and torrential rain have subjected tropical soils to extreme chemical leaching (desilication and laterization):\n1. Primary silicate minerals (quartz, feldspars, micas) have been dissolved and leached away.\n2. Soluble basic cations (Ca²⁺, Mg²⁺, K⁺, Na⁺) have been completely stripped from the soil profile.\n3. The remaining mineral matrix consists almost entirely of insoluble sesquioxides of iron and aluminum (hematite Fe₂O₃, gibbsite Al(OH)₃) and 1:1 kaolinite clay, giving Oxisols their characteristic brick-red coloration.\n4. Oxisols possess extremely low Cation Exchange Capacity (CEC < 16 cmol/kg clay) and fix available inorganic phosphate (PO₄³⁻) into insoluble iron/aluminum precipitates.\n\nTo survive on this nutrient desert, the rainforest operates a virtually closed-loop direct nutrient recycling system. Over 80% of total ecosystem nutrients reside in living plant biomass, not in the soil. A dense, shallow root mat (0 to 20 cm depth) partnered with vesicular-arbuscular mycorrhizal (VAM) fungi intercepts decomposing organic matter within days. Litterfall is decomposed so rapidly by termites, saprophytic fungi, and bacteria (turnover time < 6 months) that mineralized nutrients are absorbed directly back into mycorrhizal hyphae before percolating rainwater can leach them into subsoil.',
            id: 'Paradoks ekologis paling menakjubkan dari hutan hujan tropis adalah bahwa biomassa paling lebat dan subur di Bumi justru berdiri di atas tanah yang paling miskin hara dan mengalami pelapukan paling lanjut: Oxisol (Ferralsol) dan Ultisol.\n\nSelama jutaan tahun, suhu panas konstan dan hujan lebat telah mencuci tanah tropis secara ekstrem (desilikasi dan laterisasi):\n1. Mineral silikat primer (kuarsa, feldspar, mika) telah larut dan tercuci habis.\n2. Kation basa terlarut (Ca²⁺, Mg²⁺, K⁺, Na⁺) telah terlepas seluruhnya dari profil tanah.\n3. Matriks mineral yang tersisa hampir murni tersusun atas seskuioksida besi dan aluminium yang tidak larut (hematit Fe₂O₃, gibsit Al(OH)₃) serta liat kaolinit 1:1, memberikan warna merah bata khas pada tanah Oxisol.\n4. Oxisol memiliki Kapasitas Tukar Kation yang sangat rendah (KTK < 16 cmol/kg liat) dan mengikat fosfat anorganik (PO₄³⁻) menjadi endapan besi/aluminium yang tidak dapat diserap akar.\n5. Untuk bertahan hidup, hutan hujan mengoperasikan siklus hara tertutup (closed-loop). Lebih dari 80% nutrisi ekosistem tersimpan di dalam biomassa tumbuhan hidup, bukan di dalam tanah. Jalinan akar permukaan dangkal (kedalaman 0 hingga 20 cm) yang bersimbiosis dengan jamur mikoriza arbuskular (VAM) menyergap serasah organik yang membusuk dalam hitungan hari. Dekomposisi berjalan sangat cepat oleh rayap, bakteri, dan jamur saprofit sehingga unsur hara langsung diserap kembali oleh hifa mikoriza sebelum air hujan sempat melarutkannya ke lapisan tanah bawah.',
          },
          comparisonTable: {
            headers: {
              en: ['Ecosystem Metric', 'Tropical Rainforest (Oxisol)', 'Temperate Deciduous Forest (Alfisol)'],
              id: ['Metrik Ekosistem', 'Hutan Hujan Tropis (Oxisol)', 'Hutan Gugur Sedang (Alfisol)'],
            },
            rows: [
              {
                en: ['Nutrient Partitioning', '> 80% in living biomass; < 20% in soil', '~40% in living biomass; ~60% in soil organic matter'],
                id: ['Partisi Cadangan Hara', '> 80% dalam biomassa hidup; < 20% dalam tanah', '~40% dalam biomassa hidup; ~60% dalam tanah'],
              },
              {
                en: ['Litter Decomposition Rate (k)', 'Very Rapid (turnover 0.2–0.6 years)', 'Moderate (turnover 1.5–3.0 years)'],
                id: ['Laju Dekomposisi Serasah (k)', 'Sangat Cepat (siklus 0,2–0,6 tahun)', 'Moderat (siklus 1,5–3,0 tahun)'],
              },
              {
                en: ['Soil Clay Mineralogy', 'Low-activity 1:1 kaolinite + Fe/Al sesquioxides', 'High-activity 2:1 smectites and illites'],
                id: ['Mineralogi Liat Tanah', 'Liat kaolinit 1:1 aktivitas rendah + seskuioksida Fe/Al', 'Liat smektit dan ilit 2:1 aktivitas tinggi'],
              },
              {
                en: ['Phosphorus Availability', 'Severely Occluded (fixed to Al/Fe surfaces)', 'Labile and readily exchangeable'],
                id: ['Ketersediaan Fosfor', 'Sangat Terfiksasi (terkunci pada permukaan Fe/Al)', 'Labil dan mudah dipertukarkan'],
              },
            ],
          },
        },
        {
          id: 'biome-5-sec-3',
          title: {
            en: '3. Buttress Roots, Lianas & Epiphytic Niches',
            id: '3. Akar Banir, Liana & Relung Epifit Kanopi',
          },
          content: {
            en: 'Because nutrient acquisition and aerobic respiration are confined to the top 20–30 cm of waterlogged tropical soil, emergent rainforest trees cannot develop deep anchoring taproots. Instead, giant canopy trees evolved massive, planar buttress roots (plank buttresses) that extend up to 5 to 10 meters up the trunk base and radiate outward up to 10 to 15 meters.\n\nBiomechanical studies reveal that buttress roots act as tensile structural brackets. When hurricane-force winds blow against the tree crown, the windward buttresses act under high tension, transferring horizontal lateral shear forces directly into the broad, shallow root plate and preventing tree uprooting (windthrow).\n\nAdditionally, high structural density fosters intense niche specialization:\n1. Lianas (Woody Vines): Structural parasites that exploit host tree trunks for mechanical support, deploying narrow stems with massive xylem vessels to deliver water to leaves deployed in full sunlight atop the canopy without investing in thick self-supporting woody trunks.\n2. Epiphytes (Orchids, Bromeliads): Non-parasitic plants living on tree branches. Bromeliads form rosette phytotelmata (water-storage tanks) that accumulate aquatic invertebrate communities and absorb dissolved organic nitrogen directly through foliar trichomes.',
            id: 'Karena penyerapan hara dan respirasi aerobik terbatas pada lapisan 20–30 cm teratas tanah tropis, pohon emergen tidak dapat mengembangkan akar tunggang dalam. Sebagai gantinya, pohon kanopi raksasa berevolusi membentuk akar banir (buttress roots) berbentuk papan masif yang menjulang 5 hingga 10 meter ke atas batang dan melebar 10 hingga 15 meter di atas tanah.\n\nStudi biomekanika membuktikan bahwa akar banir berfungsi sebagai penopang tegangan tarik struktural. Saat angin kencang menerpa kanopi, akar banir di sisi hadap angin mengalami tegangan tarik tinggi, menyalurkan gaya geser horizontal langsung ke lempeng akar permukaan yang lebar dan mencegah pohon tumbang.\n\nKepadatan struktural tinggi juga melahirkan spesialisasi relung yang unik:\n1. Liana (Tumbuhan Merambat Berkayu): Parasit struktural yang menumpang pada batang pohon inang untuk mencapai sinar matahari penuh di puncak kanopi tanpa harus menginvestasikan energi untuk membangun batang kayu tebal sendiri.\n2. Epifit (Anggrek, Bromelia): Tumbuhan non-parasit yang menempel di cabang kanopi. Bromelia membentuk roset tangki air (fitotelmata) yang menampung air hujan dan komunitas invertebrata air, menyerap nitrogen organik terlarut langsung melalui trikoma daun.',
          },
          caseStudy: {
            title: {
              en: 'Transcontinental Saharan Dust Deposition in the Amazon Basin',
              id: 'Deposisi Debu Transkontinental Sahara di Cekungan Amazon',
            },
            context: {
              en: 'The Amazon rainforest produces massive Net Primary Productivity despite standing on phosphorus-depleted Oxisols that have lost almost all original rock phosphorus over millions of years of weathering.',
              id: 'Hutan hujan Amazon menghasilkan Produktivitas Primer Bersih masif meskipun berdiri di atas tanah Oxisol yang telah kehilangan hampir seluruh fosfor batuan aslinya akibat pelapukan berjuta tahun.',
            },
            analysis: {
              en: 'Satellite observations (NASA CALIPSO LiDAR) and geochemical isotopic tracking demonstrate that the Amazon’s phosphorus deficit is offset by transoceanic atmospheric transport from Africa. Each year, approximately 27.7 million tons of mineral dust are swept from the hyper-arid Bodélé Depression in Chad across the Atlantic Ocean by the Easterly Trade Winds. Approximately 22,000 tons of this dust consists of bioavailable phosphorus derived from ancient dried Pleistocene diatom lakebed deposits, precisely matching the estimated annual hydrological loss of phosphorus flushed out by the Amazon River into the Atlantic.',
              id: 'Pengamatan satelit (LiDAR CALIPSO NASA) dan pelacakan isotop geokimia membuktikan bahwa defisit fosfor Amazon ditopang oleh transportasi atmosfer lintas samudra dari Afrika. Setiap tahun, sekitar 27,7 juta ton debu mineral tertiup dari Depresi Bodélé di Chad menyeberangi Samudra Atlantik oleh Angin Pasat Timur. Sekitar 22.000 ton debu ini mengandung fosfor yang berasal dari endapan fosil diatom danau purba Pleistosen, yang jumlahnya setara dengan jumlah fosfor yang hilang terhanyut oleh aliran Sungai Amazon ke samudra.',
            },
            takeaway: {
              en: 'Global biomes are functionally coupled across continents through planetary-scale atmospheric dust teleconnections.',
              id: 'Bioma global terhubung secara fungsional lintas benua melalui telekoneksi debu atmosfer skala planet.',
            },
          },
        },
        {
          id: 'biome-5-sec-4',
          title: {
            en: '4. Tropical Savannas & C4 Grassland Dynamics',
            id: '4. Sabana Tropis & Dinamika Rumput C4',
          },
          content: {
            en: 'Tropical Savannas and Woodlands (e.g., the African Serengeti, South American Cerrado, Australian savanna) encircle rainforest belts between 10° and 20° latitude. They are characterized by high temperatures year-round (MAT 20°C to 28°C) but experience a distinct, pronounced dry season lasting 5 to 8 months, driven by the seasonal migration of the ITCZ.\n\nThe defining structural feature of the savanna is a continuous C4 grass understory interspersed with scattered, drought-deciduous trees (e.g., Acacia, Adansonia baobab).\n\nC4 photosynthetic physiology provides a decisive energetic advantage under hot, high-irradiance savanna climates:\n1. Spatial Separation of Carbon Fixation: In C4 mesophyll cells, CO₂ is fixed by PEPC (which has zero oxygenase affinity) into 4-carbon oxaloacetate/malate. Malate is transferred into specialized, gas-tight bundle sheath cells and decarboxylated, elevating internal CO₂ concentrations around RuBisCO to > 2000 ppm.\n2. Photorespiration Elimination: High bundle-sheath CO₂ suppresses the wasteful oxygenase activity of RuBisCO, preventing photorespiratory carbon loss that consumes up to 30–40% of photosynthetic energy in C3 plants at temperatures above 28°C–30°C.\n3. High Water-Use and Nitrogen-Use Efficiency: Because PEPC operates at high velocity even at low stomatal conductance, C4 grasses conserve water and maintain positive carbon gain during blistering dry seasons.',
            id: 'Sabana Tropis dan Hutan Terbuka (seperti Serengeti di Afrika, Cerrado di Amerika Selatan, sabana Australia) mengelilingi sabuk hutan hujan di antara lintang 10° dan 20°. Kawasan ini bersuhu panas sepanjang tahun (MAT 20°C hingga 28°C) tetapi mengalami musim kemarau nyata selama 5 hingga 8 bulan akibat pergeseran musiman ITCZ.\n\nCiri struktural utama sabana adalah hamparan rumput C4 yang bersambung dengan diselingi pohon gugur kekeringan yang tersebar renggang (seperti Acacia, Adansonia baobab).\n\nFisiologi fotosintesis C4 memberikan keunggulan energik di bawah iklim sabana yang panas dan terik:\n1. Pemisahan Spasial Fiksasi Karbon: Di dalam sel mesofil C4, CO₂ difiksasi oleh enzim PEPC (yang sama sekali tidak mengikat oksigen) menjadi asam malat berkarbon 4. Malat dialirkan ke dalam sel seludang pembuluh (bundle sheath) yang kedap gas dan didekarboksilasi, memompa konsentrasi CO₂ internal di sekitar RuBisCO hingga > 2000 ppm.\n2. Lenyapnya Fotorespirasi: Konsentrasi CO₂ seludang yang tinggi menekan aktivitas oksigenase RuBisCO, mencegah pemborosan energi fotorespirasi yang dapat membuang 30–40% energi fotosintesis pada tumbuhan C3 saat suhu melampaui 28°C–30°C.\n3. Efisiensi Penggunaan Air & Nitrogen Tinggi: Karena PEPC bekerja cepat meskipun stomata membuka sempit, rumput C4 menghemat air dan mempertahankan fotosintesis positif di tengah musim kemarau terik.',
          },
          formula: '\\Phi_{\\text{C4}} > \\Phi_{\\text{C3}} \\quad \\text{when } T_{\\text{leaf}} > 28^\\circ\\text{C}',
          formulaExplanation: {
            en: 'C4 Quantum Yield Crossover: The quantum yield of CO₂ assimilation (moles of CO₂ fixed per mole of absorbed photons) for C4 photosynthesis exceeds that of C3 plants when leaf temperature exceeds ~28°C, because C3 photorespiration accelerates exponentially with temperature.',
            id: 'Titik Silang Hasil Kuantum C4: Efisiensi kuantum asimilasi CO₂ (mol CO₂ yang difiksasi per mol foton yang diserap) pada tumbuhan C4 melampaui tumbuhan C3 saat suhu daun melebihi ~28°C, karena fotorespirasi C3 melonjak eksponensial terhadap suhu.',
          },
          variables: [
            {
              symbol: '\\Phi_{\\text{C4}}',
              name: { en: 'Quantum Yield of C4 Photosynthesis', id: 'Hasil Kuantum Fotosintesis C4' },
              unit: 'mol CO₂ / mol photons',
              description: {
                en: 'Photochemical efficiency of C4 pathway, remains constant (~0.053) regardless of temperature.',
                id: 'Efisiensi fotokimia jalur C4, relatif konstan (~0,053) terlepas dari suhu daun.',
              },
            },
            {
              symbol: '\\Phi_{\\text{C3}}',
              name: { en: 'Quantum Yield of C3 Photosynthesis', id: 'Hasil Kuantum Fotosintesis C3' },
              unit: 'mol CO₂ / mol photons',
              description: {
                en: 'Photochemical efficiency of C3 pathway, declines precipitously from ~0.08 at 15°C to < 0.04 at 35°C due to oxygenase competition.',
                id: 'Efisiensi fotokimia jalur C3, menurun drastis dari ~0,08 pada 15°C menjadi < 0,04 pada 35°C akibat kompetisi oksigenase.',
              },
            },
          ],
        },
      ],
      quiz: [
        {
          id: 'biome-q5-1',
          question: {
            en: 'Why do tropical rainforest Oxisols possess low fertility despite supporting luxuriant tree growth?',
            id: 'Mengapa tanah Oxisol hutan hujan tropis memiliki kesuburan rendah meskipun menopang pertumbuhan pohon yang sangat lebat?',
          },
          options: {
            en: [
              'Intense chemical leaching over millennia has stripped soluble base cations and primary minerals, while over 80% of ecosystem nutrients are held directly in living plant biomass.',
              'Tropical trees poison the soil by excreting hydrochloric acid from their roots.',
              'Microbes are completely absent from tropical soils due to heat.',
              'Rainforest soil is composed purely of volcanic ash that repels plant roots.',
            ],
            id: [
              'Pencucian kimiawi intensif selama jutaan tahun melarutkan kation basa dan mineral primer, sementara lebih dari 80% nutrisi ekosistem tersimpan langsung di dalam biomassa tumbuhan hidup.',
              'Pohon tropis meracuni tanah dengan mengeluarkan asam klorida dari akarnya.',
              'Mikroba sama sekali tidak ada di tanah tropis karena panas ekstrem.',
              'Tanah hutan hujan tersusun murni atas abu vulkanik yang menolak akar tanaman.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Continuous warm temperatures and torrential precipitation leach away soluble cations, leaving nutrient-poor iron/aluminum sesquioxides. Nutrients are cycled tightly in living biomass and surface root-mycorrhizal mats.',
            id: 'Suhu hangat konstan dan curah hujan lebat melarutkan kation basa terlarut, menyisakan seskuioksida besi/aluminium miskin hara. Nutrisi didaur ulang secara tertutup di dalam biomassa hidup dan jalinan mikoriza permukaan.',
          },
        },
        {
          id: 'biome-q5-2',
          question: {
            en: 'What biomechanical function is served by the prominent planar buttress roots of emergent tropical trees?',
            id: 'Fungsi biomekanika apakah yang dijalankan oleh akar banir papan masif pada pohon emergen hutan tropis?',
          },
          options: {
            en: [
              'They store liquid oxygen to prevent tree asphyxiation during floods.',
              'They drill deep holes down to the Earth mantle to extract magma heat.',
              'They act as tensile brackets, resisting lateral wind forces and anchoring tall canopy trees in shallow topsoils.',
              'They emit electrical pulses that stun herbivorous mammals.',
            ],
            id: [
              'Akar banir menyimpan oksigen cair untuk mencegah pohon tercekik saat banjir.',
              'Akar banir mengebor lubang ke mantel bumi untuk menyerap panas magma.',
              'Akar banir berfungsi sebagai penopang tegangan tarik, menahan gaya geser angin kencang dan menopang pohon tinggi pada tanah permukaan yang dangkal.',
              'Akar banir memancarkan pulsa listrik yang melumpuhkan mamalia pemakan daun.',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Because root penetration is restricted to shallow aerobic topsoil, broad planar buttresses act under tension on the windward side to transfer lateral wind loads across a large ground footprint.',
            id: 'Karena penetrasi akar terhambat pada lapisan aerobik permukaan yang dangkal, banir papan bekerja di bawah tegangan tarik pada sisi hadap angin untuk menyebarkan beban angin ke lempeng tanah yang luas.',
          },
        },
        {
          id: 'biome-q5-3',
          question: {
            en: 'At what leaf temperature does the photosynthetic quantum yield of C4 plants typically surpass that of C3 plants?',
            id: 'Pada suhu daun berapakah hasil kuantum fotosintesis tumbuhan C4 umumnya melampaui tumbuhan C3?',
          },
          options: {
            en: [
              'Below 5°C',
              'Above approximately 28°C to 30°C',
              'At exactly 0°C',
              'Only above 75°C',
            ],
            id: [
              'Di bawah 5°C',
              'Di atas sekitar 28°C hingga 30°C',
              'Tepat pada 0°C',
              'Hanya di atas 75°C',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'At temperatures above ~28°C, the oxygenase activity of RuBisCO increases in C3 plants, driving photorespiratory carbon losses that reduce C3 quantum yield below the temperature-stable quantum yield of C4 photosynthesis.',
            id: 'Pada suhu di atas ~28°C, aktivitas oksigenase RuBisCO meningkat pada tumbuhan C3, memicu pemborosan fotorespirasi yang menurunkan efisiensi kuantum C3 di bawah efisiensi kuantum fotosintesis C4 yang stabil terhadap suhu.',
          },
        },
        {
          id: 'biome-q5-4',
          question: {
            en: 'What primary external nutrient source fertilizes the Amazon Basin’s annual phosphorus deficit across the Atlantic Ocean?',
            id: 'Sumber nutrisi eksternal utama apakah yang menyuburkan defisit fosfor tahunan Cekungan Amazon melintasi Samudra Atlantik?',
          },
          options: {
            en: [
              'Deep ocean upwelling along the Pacific coast of Chile',
              'Ash clouds drifting from Icelandic volcanic eruptions',
              'Synthetic industrial fertilizer sprays from European airplanes',
              'Atmospheric mineral dust blown from the Bodélé Depression in the Saharan Desert',
            ],
            id: [
              'Upwelling laut dalam di sepanjang pesisir Pasifik Chili',
              'Awan abu yang melayang dari letusan gunung berapi Islandia',
              'Semprotan pupuk industri sintetis dari pesawat terbang Eropa',
              'Debu mineral atmosfer yang tertiup dari Depresi Bodélé di Gurun Sahara',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'Over 27 million tons of mineral dust from ancient diatom beds in the Saharan Bodélé Depression are transported annually by trade winds, supplying ~22,000 tons of bioavailable phosphorus to the Amazon.',
            id: 'Lebih dari 27 juta ton debu mineral dari dasar danau diatom purba di Depresi Bodélé Sahara tertiup setiap tahun oleh angin pasat, menyumbang ~22.000 ton fosfor yang dapat diserap ke Cekungan Amazon.',
          },
        },
      ],
    },

    // =============================================================
    // PART 6: AQUATIC & MARINE BIOMES: OCEAN STRATIFICATION
    // =============================================================
    {
      id: 'biome-mod-6',
      topicId: 'biomes-ecology',
      order: 6,
      title: {
        en: 'Part 6: Aquatic & Marine Biomes: Ocean Stratification & Limnology',
        id: 'Bagian 6: Bioma Akuatik & Laut: Stratifikasi Oseanografi & Limnologi',
      },
      shortDescription: {
        en: 'Pelagic depth zonation, Sverdrup critical depth blooms, aragonite saturation calcification, and dimictic thermal overturn.',
        id: 'Zonasi kedalaman pelagik, ledakan alga kedalaman kritis Sverdrup, kalsifikasi saturasi aragonit, dan perputaran termal danau dimiktik.',
      },
      durationMinutes: 25,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-6-sec-1',
          title: {
            en: '1. Marine Pelagic Vertical Zonation & Hydrostatic Pressure',
            id: '1. Zonasi Vertikal Pelagik Laut & Tekanan Hidrostatis',
          },
          content: {
            en: 'Oceans cover 71% of the Earth’s surface and represent 99% of the planet’s biosphere volume. The marine pelagic environment is structured vertically by solar irradiance attenuation, temperature thermoclines, and hydrostatic pressure.\n\nVertical Pelagic Strata:\n1. Epipelagic Zone (Photic / Sunlit Zone, 0 to 200 m): Only zone with sufficient Photosynthetically Active Radiation (PAR) for net positive photosynthesis. Contains 90% of all marine life.\n2. Mesopelagic Zone (Twilight Zone, 200 to 1000 m): Dim blue light insufficient for photosynthesis; home to bioluminescent fish, cephalopods, and the Diel Vertical Migration (the largest synchronous animal migration on Earth, where billions of organisms ascend to the surface at night to feed).\n3. Bathypelagic Zone (Midnight Zone, 1000 to 4000 m): Complete darkness except for biological luminescence; cold (1°C to 4°C); immense hydrostatic pressure.\n4. Abyssopelagic Zone (Abyssal Plain, 4000 to 6000 m): Covers 60% of the ocean floor; benthic plains blanketed in biogenic ooze.\n5. Hadalpelagic Zone (Trenches, > 6000 to 11,000 m): V-shaped subduction trenches (e.g., Mariana Trench); hydrostatic pressure exceeds 1000 atmospheres (100 MPa).\n\nHydrostatic pressure scales linearly with depth according to P(z) = P_0 + ρ · g · z (~1 atm added every 10 meters). Deep-sea organisms utilize piezolytes (e.g., trimethylamine N-oxide / TMAO) to prevent pressure-induced distortion of intracellular protein folding and incorporate polyunsaturated fatty acids to maintain homeoviscous membrane fluidity.',
            id: 'Samudra menutupi 71% permukaan Bumi dan mencakup 99% volume biosfer planet. Lingkungan pelagik laut terstruktur secara vertikal oleh pelemahan radiasi matahari, termoklin suhu, dan tekanan hidrostatis.\n\nStrata Pelagik Vertikal:\n1. Zona Epipelagik (Zona Fotik / Terang, 0 hingga 200 m): Satu-satunya zona dengan radiasi fotosintesis (PAR) yang cukup untuk fotosintesis bersih. Menampung 90% kehidupan laut.\n2. Zona Mesopelagik (Zona Senja / Twilight, 200 hingga 1000 m): Cahaya biru redup yang tidak mencukupi untuk fotosintesis; habitat hewan berbioluminesensi dan Diel Vertical Migration (migrasi massa hewan terbesar di Bumi, di mana miliaran organisme naik ke permukaan di malam hari untuk mencari makan).\n3. Zona Batipelagik (Zona Tengah Malam, 1000 hingga 4000 m): Gelap total; suhu dingin (1°C hingga 4°C); tekanan hidrostatis tinggi.\n4. Zona Abisopelagik (Dataran Abisal, 4000 hingga 6000 m): Menutupi 60% dasar laut; dataran luas yang diselimuti endapan lumpur biogenik.\n5. Zona Hadalpelagik (Palung Laut, > 6000 hingga 11.000 m): Palung subduksi curam (seperti Palung Mariana); tekanan hidrostatis melampaui 1000 atmosfer (100 MPa).\n\nTekanan hidrostatis bertambah secara linier terhadap kedalaman menurut P(z) = P_0 + ρ · g · z (~1 atm bertambah setiap kedalaman 10 meter). Organisme laut dalam menggunakan piezolit (seperti trimetilamina N-oksida / TMAO) untuk mencegah kerusakan lipatan protein dan memperkaya membran sel dengan asam lemak tak jenuh ganda agar membran tetap fleksibel.',
          },
          formula: 'P(z) = P_0 + \\rho \\cdot g \\cdot z',
          formulaExplanation: {
            en: 'Hydrostatic Pressure Formulation: Total pressure at water depth z equals atmospheric pressure P_0 plus the weight of the overlying fluid column per unit area.',
            id: 'Formulasi Tekanan Hidrostatis: Tekanan total pada kedalaman air z sama dengan tekanan atmosfer P_0 ditambah berat kolom fluida di atasnya per satuan luas.',
          },
          variables: [
            {
              symbol: 'P(z)',
              name: { en: 'Hydrostatic Pressure at Depth z', id: 'Tekanan Hidrostatis pada Kedalaman z' },
              unit: 'Pa / MPa / atm',
              description: {
                en: 'Total fluid pressure experienced by an aquatic organism at depth z.',
                id: 'Tekanan fluida total yang dialami organisme akuatik pada kedalaman z.',
              },
            },
            {
              symbol: '\\rho',
              name: { en: 'Seawater Density', id: 'Kerapatan Air Laut' },
              unit: 'kg/m³',
              description: {
                en: 'Mean seawater density (~1025 kg/m³ at surface, increasing slightly with depth).',
                id: 'Kerapatan rata-rata air laut (~1025 kg/m³ di permukaan, meningkat perlahan terhadap kedalaman).',
              },
            },
            {
              symbol: 'g',
              name: { en: 'Gravitational Acceleration', id: 'Percepatan Gravitasi' },
              unit: 'm/s²',
              description: {
                en: 'Standard planetary gravity (9.80665 m/s²).',
                id: 'Gravitasi standar bumi (9,80665 m/s²).',
              },
            },
          ],
        },
        {
          id: 'biome-6-sec-2',
          title: {
            en: '2. Sverdrup Critical Depth & Spring Phytoplankton Blooms',
            id: '2. Kedalaman Kritis Sverdrup & Ledakan Fitoplankton Musim Semi',
          },
          content: {
            en: 'Marine primary productivity is dominated by single-celled phytoplankton (diatoms, dinoflagellates, coccolithophores, cyanobacteria). Unlike terrestrial plants, phytoplankton circulate continuously within the turbulent surface mixed layer.\n\nIn 1953, oceanographer Harald Sverdrup formulated the Critical Depth Hypothesis to explain the explosive onset of spring phytoplankton blooms:\n\n1. Compensation Depth (z_comp): The exact depth at which phytoplankton gross photosynthetic rate equals autotrophic respiration rate (P_gross = R). Above z_comp, cells experience net carbon gain; below z_comp, cells experience net carbon loss.\n2. Critical Depth (z_crit): The depth to which the mixed layer can extend such that integrated gross photosynthesis across the entire water column precisely equals integrated community respiration: ∫₀^(z_crit) P(z) dz = ∫₀^(z_crit) R dz.\n\nIn winter, deep wind-driven convective mixing creates a deep mixed layer (z_mix > z_crit). Phytoplankton spend too much time in the dark depths below the photic zone; community respiration exceeds photosynthesis, and blooms cannot develop despite high nutrient concentrations.\n\nIn spring, increased solar insolation and warming stratify the upper ocean, causing the mixed layer to shoals dramatically (z_mix < z_crit). Phytoplankton are now retained in the well-lit photic zone where total column photosynthesis exceeds respiration, triggering massive phytoplankton blooms that fix up to 50 Gigatons of carbon annually.',
            id: 'Produktivitas primer laut didominasi oleh fitoplankton bersel tunggal (diatom, dinoflagellata, kokolitofor, sianobakteri). Berbeda dengan tumbuhan darat, fitoplankton bersirkulasi terus-menerus di dalam lapisan campuran permukaan (mixed layer) yang turbulen.\n\nPada tahun 1953, oseanografer Harald Sverdrup merumuskan Hipotesis Kedalaman Kritis untuk menjelaskan pemicu ledakan fitoplankton musim semi:\n\n1. Kedalaman Kompensasi (z_comp): Kedalaman di mana laju fotosintesis kotor fitoplankton tepat sama dengan laju respirasi autotrofik (P_gross = R). Di atas z_comp, sel mengalami pertambahan karbon bersih; di bawah z_comp, sel mengalami kehilangan karbon bersih.\n2. Kedalaman Kritis (z_crit): Kedalaman lapisan campuran maksimum di mana integral fotosintesis kotor di seluruh kolom air tepat sama dengan integral respirasi seluruh komunitas: ∫₀^(z_crit) P(z) dz = ∫₀^(z_crit) R dz.\n\nDi musim dingin, angin kencang mengaduk laut hingga lapisan campuran sangat dalam (z_mix > z_crit). Fitoplankton menghabiskan terlalu banyak waktu di kegelapan dalam; respirasi melebihi fotosintesis sehingga ledakan alga tidak dapat terjadi meskipun nutrisi melimpah.\n\nDi musim semi, peningkatan insolasi matahari dan pemanasan menstabilkan lapisan permukaan (z_mix < z_crit). Fitoplankton kini terperangkap di lapisan terang di mana fotosintesis kolom air melampaui respirasi, memicu ledakan fitoplankton masif yang menyerap hingga 50 Gigaton karbon per tahun.',
          },
          formula: 'z_{\\text{crit}} = \\frac{I_0}{I_c \\cdot K_d} \\left(1 - e^{-K_d \\cdot z_{\\text{crit}}}\\right)',
          formulaExplanation: {
            en: 'Sverdrup Critical Depth Equation: Relates critical mixed-layer threshold depth z_crit to surface incident irradiance I_0, phytoplankton compensation irradiance I_c, and diffuse light attenuation coefficient K_d.',
            id: 'Persamaan Kedalaman Kritis Sverdrup: Menghubungkan ambang batas kedalaman lapisan campuran z_crit dengan iradiansi permukaan I_0, iradiansi kompensasi I_c, dan koefisien pelemahan cahaya baur K_d.',
          },
          variables: [
            {
              symbol: 'z_{\\text{crit}}',
              name: { en: 'Critical Depth', id: 'Kedalaman Kritis' },
              unit: 'm',
              description: {
                en: 'Maximum depth of vertical mixing where column gross photosynthesis balances column respiration.',
                id: 'Kedalaman maksimum pengadukan vertikal di mana fotosintesis kotor kolom air seimbang dengan respirasi kolom.',
              },
            },
            {
              symbol: 'I_0',
              name: { en: 'Surface Solar Irradiance', id: 'Iradiansi Surya Permukaan' },
              unit: 'µmol photons / (m²·s)',
              description: {
                en: 'Photosynthetically active radiation entering sea surface.',
                id: 'Radiasi fotosintesis yang memasuki permukaan laut.',
              },
            },
            {
              symbol: 'I_c',
              name: { en: 'Compensation Irradiance', id: 'Iradiansi Kompensasi' },
              unit: 'µmol photons / (m²·s)',
              description: {
                en: 'Light level at which cell photosynthesis equals cellular respiration rate.',
                id: 'Tingkat intensitas cahaya di mana fotosintesis seluler tepat mengimbangi laju respirasi seluler.',
              },
            },
            {
              symbol: 'K_d',
              name: { en: 'Diffuse Light Attenuation Coefficient', id: 'Koefisien Pelemahan Cahaya Baur' },
              unit: '1 / m',
              description: {
                en: 'Rate of exponential light decay in seawater (~0.04 m⁻¹ in clear open ocean, >0.2 m⁻¹ in turbid coastal water).',
                id: 'Laju penurunan eksponensial cahaya di air laut (~0,04 m⁻¹ di samudra jernih, >0,2 m⁻¹ di perairan pesisir keruh).',
              },
            },
          ],
        },
        {
          id: 'biome-6-sec-3',
          title: {
            en: '3. Coral Reef Calcification & Ocean Acidification Kinetics',
            id: '3. Kalsifikasi Terumbu Karang & Kinetika Asidifikasi Laut',
          },
          content: {
            en: 'Coral Reefs occupy less than 0.1% of the ocean floor yet harbor over 25% of all marine species. Hermatypic (reef-building) corals represent an obligate mutualistic symbiosis between anthozoan coral animal polyps and photosynthetic dinoflagellate endosymbionts (family Symbiodiniaceae).\n\nThe endosymbionts reside within the coral gastrodermal cells, translocating up to 90–95% of their photosynthetically fixed glycerol, glucose, and amino acids to the coral host. In return, the coral provides metabolic waste products (NH₄⁺, PO₄³⁻, CO₂) and a protected, high-light calcification matrix.\n\nCorals precipitate an aragonite (metastable calcium carbonate, CaCO₃) skeleton beneath their basal ectoderm according to the reaction: Ca²⁺ + 2HCO₃⁻ ⇌ CaCO₃(s) + CO₂ + H₂O.\n\nBiogenic calcification is governed by the Aragonite Saturation State (Ω_arag = [Ca²⁺][CO₃²⁻] / K\'_sp(arag)). When Ω_arag > 3.5, calcification proceeds rapidly. As anthropogenic CO₂ dissolves into surface seawater, it reacts with water to form carbonic acid (H₂CO₃), which dissociates and consumes free carbonate ions: CO₂ + H₂O + CO₃²⁻ → 2HCO₃⁻. This drops oceanic pH (ocean acidification) and lowers Ω_arag toward undersaturation (Ω_arag < 1), causing skeletal dissolution and severely suppressing coral calcification rates.',
            id: 'Terumbu Karang menempati kurang dari 0,1% luas dasar laut namun menampung lebih dari 25% seluruh spesies laut. Karang hermatipik (pembangun terumbu) hidup dalam simbiosis mutualisme obligat antara polip hewan karang (kelas Anthozoa) dan endosimbion dinoflagellata fotosintetik (famili Symbiodiniaceae).\n\nEndosimbion mendiami sel gastrodermis karang, mentranslokasikan hingga 90–95% gliserol, glukosa, dan asam amino hasil fotosintesis kepada inang karang. Sebagai imbalannya, polip karang memasok produk sisa metabolisme (NH₄⁺, PO₄³⁻, CO₂) serta lingkungan terlindung untuk kalsifikasi.\n\nKarang mengendapkan kerangka aragonit (kalsium karbonat metastabil, CaCO₃) di bawah ektoderm basalnya menurut reaksi: Ca²⁺ + 2HCO₃⁻ ⇌ CaCO₃(s) + CO₂ + H₂O.\n\nKalsifikasi biogenik dikendalikan oleh Derajat Kejenuhan Aragonit (Ω_arag = [Ca²⁺][CO₃²⁻] / K\'_sp(arag)). Ketika Ω_arag > 3,5, kalsifikasi berlangsung cepat. Ketika emisi CO₂ antropogenik larut ke dalam air laut, gas ini bereaksi membentuk asam karbonat (H₂CO₃), yang melepaskan proton dan mengonsumsi ion karbonat bebas: CO₂ + H₂O + CO₃²⁻ → 2HCO₃⁻. Hal ini menurunkan pH laut (asidifikasi samudra) dan menurunkan Ω_arag mendekati kondisi tidak jenuh (Ω_arag < 1), yang memicu pelarutan kerangka kapur dan merusak laju kalsifikasi karang.',
          },
          formula: '\\Omega_{\\text{arag}} = \\frac{\\left[\\text{Ca}^{2+}\\right] \\left[\\text{CO}_3^{2-}\\right]}{K\'_{\\text{sp(arag)}}}',
          formulaExplanation: {
            en: 'Aragonite Saturation State: Ratio of the ion activity product of calcium and carbonate to the apparent stoichiometric solubility product K\'_sp. Corals require Ω_arag > 3.0–3.5 for optimal skeletal growth.',
            id: 'Derajat Kejenuhan Aragonit: Rasio produk aktivitas ion kalsium dan karbonat terhadap produk kelarutan stoikiometri K\'_sp. Karang membutuhkan Ω_arag > 3,0–3,5 untuk pertumbuhan kerangka kapur yang optimal.',
          },
          variables: [
            {
              symbol: '\\Omega_{\\text{arag}}',
              name: { en: 'Aragonite Saturation State', id: 'Derajat Kejenuhan Aragonit' },
              unit: 'dimensionless',
              description: {
                en: 'Thermodynamic driving factor for precipitation (>1) or dissolution (<1) of aragonite mineral.',
                id: 'Faktor pendorong termodinamika untuk presipitasi (>1) atau disolusi (<1) mineral aragonit.',
              },
            },
            {
              symbol: '[\\text{CO}_3^{2-}]',
              name: { en: 'Carbonate Ion Concentration', id: 'Konsentrasi Ion Karbonat' },
              unit: 'µmol / kg seawater',
              description: {
                en: 'Concentration of free carbonate ions, rapidly depleted as oceans absorb excess atmospheric CO₂.',
                id: 'Konsentrasi ion karbonat bebas, berkurang drastis seiring laut menyerap kelebihan CO₂ atmosfer.',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Marine Inorganic Carbonate Equilibria',
                id: 'Langkah 1: Keseimbangan Karbonat Anorganik Laut',
              },
              math: '\\text{CO}_2(g) \\rightleftharpoons \\text{CO}_2(aq) + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^- \\rightleftharpoons 2\\text{H}^+ + \\text{CO}_3^{2-}',
              explanation: {
                en: 'Atmospheric carbon dioxide dissolves into surface seawater, generating carbonic acid which dissociates into bicarbonate (HCO₃⁻) and carbonate (CO₃²⁻) ions governed by dissociation constants K₁ and K₂.',
                id: 'Karbon dioksida atmosfer larut ke dalam air laut permukaan, membentuk asam karbonat yang terdisosiasi menjadi ion bikarbonat (HCO₃⁻) dan karbonat (CO₃²⁻) yang diatur oleh konstanta disosiasi K₁ dan K₂.',
              },
            },
            {
              title: {
                en: 'Step 2: Ocean Acidification Proton Titration',
                id: 'Langkah 2: Titrasi Proton Asidifikasi Samudra',
              },
              math: '\\text{CO}_2 + \\text{H}_2\\text{O} + \\text{CO}_3^{2-} \\longrightarrow 2\\text{HCO}_3^-',
              explanation: {
                en: 'As anthropogenic CO₂ enters seawater, excess hydrogen ions are buffered by reacting with free carbonate ions, driving the net conversion of CO₃²⁻ into HCO₃⁻ and sharply depleting the ambient carbonate ion pool.',
                id: 'Saat CO₂ antropogenik memasuki air laut, kelebihan ion hidrogen disangga melalui reaksi dengan ion karbonat bebas, mendorong konversi bersih CO₃²⁻ menjadi HCO₃⁻ dan menguras cadangan ion karbonat ambien secara drastis.',
              },
            },
            {
              title: {
                en: 'Step 3: Solubility Product & Aragonite Undersaturation Threshold',
                id: 'Langkah 3: Produk Kelarutan & Ambang Ketidakjenuhan Aragonit',
              },
              math: '\\Omega_{\\text{arag}} = \\frac{[\\text{Ca}^{2+}][\\text{CO}_3^{2-}]}{K\'_{\\text{sp(arag)}}} < 1 \\implies \\Delta G = -R T \\ln \\Omega_{\\text{arag}} > 0',
              explanation: {
                en: 'When [CO₃²⁻] drops such that the ion activity product falls below the apparent stoichiometric solubility product K\'_sp, Ω_arag drops below 1.0. The Gibbs free energy of precipitation ΔG becomes positive, making calcification thermodynamically disfavored and causing spontaneous dissolution of exposed coral skeletons.',
                id: 'Ketika [CO₃²⁻] anjlok sehingga produk ion berada di bawah produk kelarutan stoikiometri K\'_sp, Ω_arag turun di bawah 1,0. Energi bebas Gibbs presipitasi ΔG bernilai positif, menjadikan kalsifikasi tidak disukai secara termodinamika dan memicu pelarutan spontan kerangka kapur karang.',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'Degree Heating Weeks (DHW) & Great Barrier Reef Mass Bleaching',
              id: 'Degree Heating Weeks (DHW) & Pemutihan Karang Masal Great Barrier Reef',
            },
            context: {
              en: 'Marine heatwaves have triggered repeated mass bleaching events across the 2,300 km expanse of the Australian Great Barrier Reef.',
              id: 'Gelombang panas laut (marine heatwaves) telah memicu peristiwa pemutihan massal berulang di sepanjang 2.300 km terumbu karang Great Barrier Reef Australia.',
            },
            analysis: {
              en: 'Thermal stress is quantified by NOAA using Degree Heating Weeks (DHW = cumulative weeks where Sea Surface Temperature exceeds maximum monthly mean by ≥1°C). When water temperatures exceed normal summer maxima by 1°C to 2°C for prolonged periods:\n1. Elevated temperatures and solar irradiance disrupt Photosystem II electron transport in the Symbiodiniaceae endosymbionts.\n2. Excess excitation energy generates cytotoxic Reactive Oxygen Species (ROS: singlet oxygen ¹O₂, superoxide O₂⁻, hydrogen peroxide H₂O₂).\n3. ROS leak into host cytoplasm, triggering oxidative damage and apoptosis.\n4. To survive, the coral host expels the damaged endosymbionts, revealing its stark white calcium carbonate skeleton (coral bleaching).\n5. If DHW > 4–8°C-weeks, corals suffer starvation and mortality; if stress subsides, surviving corals can re-acquire symbionts.',
              id: 'Stres termal diukur oleh NOAA menggunakan metrik Degree Heating Weeks (DHW = akumulasi mingguan saat Suhu Permukaan Laut melebihi rata-rata bulanan maksimum sebesar ≥1°C). Saat suhu melampaui batas normal sebesar 1°C hingga 2°C dalam waktu lama:\n1. Suhu tinggi dan cahaya kuat merusak rantai transpor elektron Fotosistem II pada endosimbion Symbiodiniaceae.\n2. Energi eksitasi berlebih menghasilkan Spesies Oksigen Reaktif yang sitotoksik (ROS: singlet oksigen ¹O₂, superoksida O₂⁻, hidrogen peroksida H₂O₂).\n3. ROS bocor ke sitoplasma inang karang, merusak protein dan memicu kematian sel terprogram (apoptosis).\n4. Untuk bertahan dari keracunan, inang karang memuntahkan endosimbion yang rusak, memperlihatkan kerangka kalsium karbonat putih polos di bawahnya (pemutihan karang / coral bleaching).\n5. Jika DHW > 4–8°C-minggu, karang mengalami kelaparan dan kematian massal.',
            },
            takeaway: {
              en: 'Thermal anomalies exceeding physiological thresholds break down foundational biogenic mutualisms, threatening entire marine trophic structures.',
              id: 'Anomali termal yang melampaui batas fisiologis merusak simbiosis mutualisme biogenik dasar, mengancam seluruh struktur jaring makanan laut.',
            },
          },
        },
        {
          id: 'biome-6-sec-4',
          title: {
            en: '4. Freshwater Limnology & Dimictic Lake Turnover',
            id: '4. Limnologi Air Tawar & Perputaran Termal Danau Dimiktik',
          },
          content: {
            en: 'Freshwater lentic (lake) ecosystems are governed by the unique anomalous density-temperature relationship of pure water, which reaches its maximum density at exactly 3.98°C (277.13 K), expanding upon both further heating and cooling (freezing).\n\nIn temperate zones, deep lakes exhibit a Dimictic Cycle (two complete seasonal mixing events per year):\n1. Summer Stratification: Solar heating establishes a warm, less-dense surface layer (Epilimnion), a sharp thermal gradient layer (Metalimnion / Thermocline), and a cold, dense, dark bottom layer (Hypolimnion at ~4°C). Density differences prevent mechanical wind mixing; benthic microbial decomposition consumes oxygen, driving the hypolimnion toward anoxia while surface phytoplankton deplete epilimnetic nutrients.\n2. Autumn Overturn: Surface water cools to 3.98°C, becomes denser than underlying water, and sinks. Wind drives complete top-to-bottom circulation, re-oxygenating deep benthic sediments and replenishing surface nutrients.\n3. Winter Inverse Stratification: Surface water cools below 3.98°C (expanding and becoming less dense) and freezes into an ice sheet at 0°C floating on denser 3.98°C water below, protecting aquatic organisms from solid freezing.\n4. Spring Overturn: Ice melts; surface water warms to 3.98°C, sinks, and triggers the second complete vertical overturn, fueling the spring phytoplankton bloom.',
            id: 'Ekosistem air tawar lentik (danau) dikendalikan oleh sifat anomali kerapatan air murni, yang mencapai kerapatan maksimumnya tepat pada suhu 3,98°C (277,13 K), dan memuai baik saat dipanaskan maupun saat didinginkan hingga membeku.\n\nDi zona beriklim sedang, danau dalam mengalami Siklus Dimiktik (dua kali perputaran vertikal penuh per tahun):\n1. Stratifikasi Musim Panas: Pemanasan matahari membentuk lapisan permukaan yang hangat dan ringan (Epilimnion), lapisan gradien suhu curam (Metalimnion / Termoklin), serta lapisan dasar yang dingin, padat, dan gelap (Hipolimnion pada suhu ~4°C). Perbedaan massa jenis mencegah percampuran angin; dekomposisi mikroba menghabiskan oksigen dasar dan memicu anoksia hipolimnion, sementara fitoplankton menguras nutrisi di permukaan.\n2. Perputaran Musim Gugur (Autumn Overturn): Air permukaan mendingin hingga 3,98°C, menjadi lebih padat dari air di bawahnya, lalu tenggelam. Angin mengaduk danau secara penuh dari permukaan hingga dasar, memasok oksigen kembali ke sedimen dasar dan mengembalikan nutrisi ke permukaan.\n3. Stratifikasi Terbalik Musim Dingin: Air permukaan mendingin di bawah 3,98°C (memuai dan menjadi lebih ringan) hingga membeku membentuk lapisan es 0°C yang mengapung di atas air 3,98°C di bawahnya, melindungi organisme air dari pembekuan padat.\n4. Perputaran Musim Semi (Spring Overturn): Es mencair; air permukaan menghangat hingga 3,98°C, tenggelam, dan memicu perputaran kedua yang menyulut ledakan alga musim semi.',
          },
          comparisonTable: {
            headers: {
              en: ['Lake Stratification Zone', 'Thermal Range', 'Dissolved Oxygen (Summer)', 'Nutrient Concentration (Summer)'],
              id: ['Zona Stratifikasi Danau', 'Rentang Suhu', 'Oksigen Terlarut (Musim Panas)', 'Konsentrasi Nutrisi (Musim Panas)'],
            },
            rows: [
              {
                en: ['Epilimnion (Surface)', '18°C - 26°C (warm, light)', 'High (aerated by wind and photosynthesis)', 'Depleted (consumed by phytoplankton)'],
                id: ['Epilimnion (Permukaan)', '18°C - 26°C (hangat, ringan)', 'Tinggi (aerasi angin & fotosintesis)', 'Terkuras (dihabiskan fitoplankton)'],
              },
              {
                en: ['Metalimnion (Thermocline)', 'Rapid decline (>1°C per meter)', 'Transition zone (oxycline)', 'Moderate gradient'],
                id: ['Metalimnion (Termoklin)', 'Penurunan drastis (>1°C per meter)', 'Zona transisi (oksiklin)', 'Gradien konsentrasi sedang'],
              },
              {
                en: ['Hypolimnion (Deep benthic)', '3.98°C - 6°C (dense, dark)', 'Very Low to Anoxic (< 2 mg/L)', 'High (enriched by settling dead biomass)'],
                id: ['Hipolimnion (Dasar dalam)', '3,98°C - 6°C (padat, dingin)', 'Sangat Rendah hingga Anoksik (< 2 mg/L)', 'Tinggi (diperkaya pembusukan serasah alga)'],
              },
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'biome-q6-1',
          question: {
            en: 'According to Sverdrup’s Critical Depth Hypothesis, what condition must be met for a spring phytoplankton bloom to initiate?',
            id: 'Menurut Hipotesis Kedalaman Kritis Sverdrup, kondisi apakah yang harus terpenuhi agar ledakan fitoplankton musim semi dapat dimulai?',
          },
          options: {
            en: [
              'The mixed layer depth must exceed the ocean floor depth.',
              'The depth of the surface mixed layer (z_mix) must become shallower than the critical depth (z_crit).',
              'Seawater salinity must drop to zero.',
              'Water temperature must drop below the freezing point of brine.',
            ],
            id: [
              'Kedalaman lapisan campuran harus melampaui kedalaman dasar samudra.',
              'Kedalaman lapisan campuran permukaan (z_mix) harus lebih dangkal daripada kedalaman kritis (z_crit).',
              'Salinitas air laut harus turun menjadi nol.',
              'Suhu air harus turun di bawah titik beku air asin.',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'When the mixed layer shoals above the critical depth (z_mix < z_crit), phytoplankton spend enough time in the sunlit photic zone that total integrated water-column photosynthesis exceeds community respiration.',
            id: 'Ketika lapisan campuran mendangkal di atas kedalaman kritis (z_mix < z_crit), fitoplankton menghabiskan cukup waktu di zona terang sehingga fotosintesis terpadu kolom air melampaui respirasi komunitas.',
          },
        },
        {
          id: 'biome-q6-2',
          question: {
            en: 'Why does ocean acidification directly inhibit biogenic calcification in reef-building corals?',
            id: 'Mengapa asidifikasi samudra secara langsung menghambat kalsifikasi biogenik pada karang pembangun terumbu?',
          },
          options: {
            en: [
              'Ocean acidification freezes the sea surface solid.',
              'Acidic water dissolves all calcium ions into pure metallic calcium.',
              'Acidification turns seawater into sulfuric acid within minutes.',
              'Excess dissolved CO₂ reacts with water and free carbonate ions (CO₃²⁻) to form bicarbonate (HCO₃⁻), severely depleting the carbonate ion pool needed for aragonite precipitation.',
            ],
            id: [
              'Asidifikasi samudra membekukan permukaan laut menjadi es padat.',
              'Air asam melarutkan seluruh ion kalsium menjadi logam kalsium murni.',
              'Asidifikasi mengubah air laut menjadi asam sulfat pekat dalam hitungan menit.',
              'Kelebihan CO₂ terlarut bereaksi dengan air dan ion karbonat bebas (CO₃²⁻) membentuk bikarbonat (HCO₃⁻), menguras ion karbonat yang dibutuhkan untuk pengendapan aragonit.',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'The chemical reaction CO₂ + H₂O + CO₃²⁻ → 2HCO₃⁻ consumes carbonate ions, lowering the aragonite saturation state Ω_arag and requiring corals to expend unsustainable metabolic energy to precipitate skeleton.',
            id: 'Reaksi kimia CO₂ + H₂O + CO₃²⁻ → 2HCO₃⁻ mengonsumsi ion karbonat bebas, menurunkan saturasi aragonit Ω_arag dan memaksa karang mengeluarkan energi metabolik berlebih untuk membentuk kerangka.',
          },
        },
        {
          id: 'biome-q6-3',
          question: {
            en: 'At what temperature does pure freshwater achieve its maximum thermodynamic density?',
            id: 'Pada suhu berapakah air tawar murni mencapai kerapatan termodinamika maksimumnya?',
          },
          options: {
            en: [
              '3.98°C (approximately 4°C)',
              '0.00°C',
              '10.0°C',
              '100.0°C',
            ],
            id: [
              '3,98°C (mendekati 4°C)',
              '0,00°C',
              '10,0°C',
              '100,0°C',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Water density peaks at 3.98°C because thermal contraction is offset by the initial formation of open, hexagonal hydrogen-bonded ice-like clusters as temperature drops toward 0°C.',
            id: 'Kerapatan air mencapai puncak pada 3,98°C karena kontraksi termal diimbangi oleh pembentukan awal struktur heksagonal ikatan hidrogen yang lebih renggang saat mendekati titik beku 0°C.',
          },
        },
        {
          id: 'biome-q6-4',
          question: {
            en: 'What cellular process triggers coral bleaching during marine heatwaves exceeding thermal Degree Heating Week (DHW) thresholds?',
            id: 'Proses seluler apakah yang memicu pemutihan karang (bleaching) saat gelombang panas laut melampaui ambang batas Degree Heating Weeks (DHW)?',
          },
          options: {
            en: [
              'Symbionts digest the coral animal host from the inside out.',
              'Coral polyps shed their skeleton to swim away into deeper cold trenches.',
              'Photosystem II failure in endosymbiotic dinoflagellates produces toxic Reactive Oxygen Species (ROS), prompting the coral host to expel the symbionts.',
              'Seawater salt crystals physically scratch off all algal pigment molecules.',
            ],
            id: [
              'Simbion memakan inang hewan karang dari dalam ke luar.',
              'Polip karang menanggalkan kerangka batunya untuk berenang ke palung dingin yang dalam.',
              'Kerusakan Fotosistem II pada dinoflagellata endosimbion menghasilkan Spesies Oksigen Reaktif (ROS) beracun, memaksa inang karang memuntahkan simbion.',
              'Kristal garam air laut secara fisik mengikis seluruh molekul pigmen alga.',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Photoinhibition at elevated temperatures damages the D1 protein of PSII, generating cytotoxic ROS that leak into the coral host cells, triggering active host expulsion of the bleached dinoflagellates.',
            id: 'Fotoinhibisi pada suhu tinggi merusak protein D1 Fotosistem II, menghasilkan ROS sitotoksik yang bocor ke sitoplasma inang, memicu pengeluaran aktif dinoflagellata yang rusak.',
          },
        },
      ],
    },

    // =============================================================
    // PART 7: TROPHIC CASCADES, BIOGEOCHEMISTRY & BOUNDARIES
    // =============================================================
    {
      id: 'biome-mod-7',
      topicId: 'biomes-ecology',
      order: 7,
      title: {
        en: 'Part 7: Trophic Cascades, Biogeochemical Cycles & Planetary Boundaries',
        id: 'Bagian 7: Dinamika Trofik, Siklus Biogeokimia & Batas Planet',
      },
      shortDescription: {
        en: 'Lindeman 10% thermodynamic efficiency, Lotka-Volterra kinetics, Redfield marine stoichiometry, and Anthropocene tipping points.',
        id: 'Efisiensi termodinamika 10% Lindeman, kinetika Lotka-Volterra, stoikiometri laut Redfield, dan titik kritis Antroposen.',
      },
      durationMinutes: 25,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'biome-globe',
      sections: [
        {
          id: 'biome-7-sec-1',
          title: {
            en: '1. Thermodynamic Energy Transfer & Lindeman’s Efficiency',
            id: '1. Transfer Energi Termodinamika & Efisiensi Lindeman',
          },
          content: {
            en: 'All biological life within the biosphere is subject to the First and Second Laws of Thermodynamics. Radiant solar energy captured by autotrophs (producers) flows through successive trophic levels in a unidirectional cascade, dissipating into degraded low-temperature thermal entropy at each step.\n\nIn 1942, Raymond Lindeman quantified this through the Ecological Transfer Efficiency (λ_n = P_n / P_(n-1)), defined as the ratio of production at trophic level n to production at trophic level n-1.\n\nBecause energy is lost through four major thermodynamic pathways:\n1. Unconsumed Biomass: Fraction of lower trophic biomass that dies without being eaten.\n2. Ingestion & Egestion Losses: Feces and undigested matter expelled.\n3. Respiration & Metabolic Maintenance: Massive expenditure of ATP for cellular homeothermy, active transport, and muscular locomotion.\n4. Heat Dissipation: Exothermic metabolic heat loss radiated to the environment.\n\nThe mean ecological transfer efficiency across natural ecosystems is approximately 10% (ranging from 5% to 20%). Consequently, available energetic flux diminishes by an order of magnitude at each successive Eltonian pyramid step: 10,000 J of solar energy converted by phytoplankton supports ~1,000 J of herbivorous zooplankton, ~100 J of primary carnivore forage fish, ~10 J of secondary carnivore pelagic fish, and only ~1 J of apex predator shark/tuna.\n\nThis energetic limitation dictates that food chains rarely exceed 4 to 5 trophic links and explains why persistent lipophilic environmental toxins (e.g., DDT, methylmercury, PCBs) undergo biomagnification, concentrating exponentially in top predators.',
            id: 'Seluruh kehidupan biologis di biosfer tunduk pada Hukum Pertama dan Kedua Termodinamika. Energi radiasi matahari yang ditangkap oleh autotrof (produsen) mengalir melalui tingkat trofik secara searah, terdisipasi menjadi entropi termal suhu rendah pada setiap tahapan.\n\nPada tahun 1942, Raymond Lindeman mengukur fenomena ini melalui Efisiensi Transfer Ekologis (λ_n = P_n / P_(n-1)), yang didefinisikan sebagai rasio produktivitas pada tingkat trofik n terhadap produktivitas pada tingkat trofik n-1.\n\nEnergi hilang melalui empat jalur termodinamika utama:\n1. Biomassa Tidak Terkonsumsi: Bagian dari biomassa tingkat bawah yang mati tanpa dimakan predator.\n2. Kehilangan Ingesti & Egesti: Feses dan bahan makanan yang tidak dapat dicerna.\n3. Respirasi & Pemeliharaan Metabolik: Penggunaan ATP dalam jumlah masif untuk mempertahankan homeostasis, transpor aktif, dan pergerakan.\n4. Disipasi Panas: Panas metabolik eksotermik yang diradiasikan ke lingkungan.\n\nRata-rata efisiensi transfer ekologis di ekosistem alami adalah sekitar 10% (berkisar antara 5% hingga 20%). Akibatnya, fluks energi berkurang satu tingkat magnitudo pada setiap anak tangga piramida Eltonian: 10.000 J energi yang difiksasi fitoplankton hanya mampu menopang ~1.000 J zooplankton herbivora, ~100 J ikan pemakan plankton, ~10 J ikan predator menengah, dan hanya ~1 J hiu atau paus pembunuh tingkat puncak.\n\nBatasan termodinamika ini menjelaskan mengapa rantai makanan jarang melampaui 4 hingga 5 tingkat dan mengapa racun lipofilik persisten (seperti metilmerkuri, DDT, PCB) mengalami biomagnifikasi masif pada predator puncak.',
          },
          formula: '\\lambda_n = \\frac{P_n}{P_{n-1}} \\approx 0.10',
          formulaExplanation: {
            en: 'Lindeman’s Trophic Transfer Efficiency: Ratio of secondary productivity at trophic level n (P_n) to productivity at the preceding trophic level (P_(n-1)), averaging approximately 10%.',
            id: 'Efisiensi Transfer Trofik Lindeman: Rasio produktivitas sekunder pada tingkat trofik n (P_n) terhadap produktivitas tingkat trofik sebelumnya (P_(n-1)), rata-rata bernilai sekitar 10%.',
          },
          variables: [
            {
              symbol: 'P_n',
              name: { en: 'Productivity at Trophic Level n', id: 'Produktivitas pada Tingkat Trofik n' },
              unit: 'kJ / (m²·yr) or g C / (m²·yr)',
              description: {
                en: 'Rate of biomass or energy accumulation at trophic level n.',
                id: 'Laju akumulasi biomassa atau energi pada tingkat trofik n.',
              },
            },
            {
              symbol: 'P_{n-1}',
              name: { en: 'Productivity at Preceding Trophic Level', id: 'Produktivitas Tingkat Trofik Sebelumnya' },
              unit: 'kJ / (m²·yr)',
              description: {
                en: 'Energy flux entering as prey from the lower trophic tier.',
                id: 'Fluks energi yang masuk sebagai mangsa dari tingkat trofik di bawahnya.',
              },
            },
          ],
        },
        {
          id: 'biome-7-sec-2',
          title: {
            en: '2. Nonlinear Population Kinetics & Lotka-Volterra Dynamics',
            id: '2. Kinetika Populasi Nonlinier & Dinamika Lotka-Volterra',
          },
          content: {
            en: 'Interactions between trophic tiers generate complex nonlinear population dynamics. The classic mathematical framework for predator-prey oscillations was formulated independently by Alfred Lotka (1925) and Vito Volterra (1926).\n\nThe Lotka-Volterra system couples prey population N with predator population P through two first-order differential equations:\n\nPrey: dN/dt = r · N - a · N · P\nPredator: dP/dt = b · a · N · P - m · P\n\nWhere r is prey intrinsic growth rate, a is predation attack rate, b is conversion efficiency of prey into predator offspring, and m is predator per capita mortality.\n\nIn phase space (N vs. P), this system yields closed concentric neutral orbits circling a neutrally stable equilibrium point: (N* = m / (b·a), P* = r / a). As prey populations surge, abundant food fuels an exponential predator increase with a quarter-cycle phase lag. Eventually, predator overconsumption causes the prey population to crash, subsequently starving the predators. With predation pressure alleviated, the prey population recovers, initiating another cyclical oscillation.\n\nWhen carrying capacity K and predator satiation (Holling Type II functional response) are incorporated, the system exhibits stable limit cycles or Hopf bifurcations, illustrating how predator removal can destabilize entire ecosystems.',
            id: 'Interaksi antar-tingkat trofik menghasilkan dinamika populasi nonlinier yang kompleks. Kerangka matematika klasik untuk osilasi predator-mangsa dirumuskan secara independen oleh Alfred Lotka (1925) dan Vito Volterra (1926).\n\nSistem Lotka-Volterra menggabungkan populasi mangsa N dengan populasi predator P melalui dua persamaan diferensial simultan:\n\nMangsa: dN/dt = r · N - a · N · P\nPredator: dP/dt = b · a · N · P - m · P\n\nDi mana r adalah laju pertumbuhan intrinsik mangsa, a adalah laju serangan predasi, b adalah efisiensi konversi mangsa menjadi keturunan predator, dan m adalah laju mortalitas alami predator.\n\nDalam ruang fase (N versus P), sistem ini menghasilkan kurva orbit tertutup konsentris yang mengitari titik ekuilibrium netral: (N* = m / (b·a), P* = r / a). Saat populasi mangsa melonjak, kelimpahan makanan memicu lonjakan populasi predator dengan jeda fase seperempat siklus. Konsumsi predator yang berlebih kemudian memicu anjloknya populasi mangsa, yang segera disusul oleh kelaparan dan kematian predator. Setelah tekanan predator mereda, populasi mangsa pulih kembali, memulai siklus baru.\n\nKetika kapasitas daya dukung lingkungan K dan respons fungsional kejenuhan predator Holling Tipe II diperhitungkan, sistem ini menunjukkan siklus batas stabil (limit cycles) atau bifurkasi Hopf.',
          },
          formula: '\\frac{dN}{dt} = rN - aNP, \\qquad \\frac{dP}{dt} = b a N P - m P',
          formulaExplanation: {
            en: 'Coupled Lotka-Volterra Predator-Prey Equations: Describes the non-linear reciprocal population oscillations of prey N and predator P over time.',
            id: 'Persamaan Predator-Mangsa Lotka-Volterra Terkopel: Menjelaskan osilasi populasi timbal balik non-linier antara mangsa N dan predator P dari waktu ke waktu.',
          },
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Prey Population Balance',
                id: 'Langkah 1: Keseimbangan Populasi Mangsa',
              },
              math: '\\frac{dN}{dt} = rN - aNP',
              explanation: {
                en: 'In the absence of predators (P = 0), prey grow exponentially (dN/dt = rN). Encounters with predators (N·P) result in prey mortality at attack rate a.',
                id: 'Tanpa adanya predator (P = 0), mangsa tumbuh eksponensial (dN/dt = rN). Pertemuan dengan predator (N·P) menghasilkan mortalitas mangsa pada laju a.',
              },
            },
            {
              title: {
                en: 'Step 2: Predator Population Balance',
                id: 'Langkah 2: Keseimbangan Populasi Predator',
              },
              math: '\\frac{dP}{dt} = b a N P - m P',
              explanation: {
                en: 'In the absence of prey (N = 0), predators decline exponentially (dP/dt = -mP). Consumed prey (a·N·P) are converted into predator reproduction with efficiency b.',
                id: 'Tanpa adanya mangsa (N = 0), predator mati eksponensial (dP/dt = -mP). Mangsa yang dimangsa (a·N·P) dikonversi menjadi keturunan predator dengan efisiensi b.',
              },
            },
            {
              title: {
                en: 'Step 3: Stationary Isoclines & Equilibrium',
                id: 'Langkah 3: Isoklin Stasioner & Titik Ekuilibrium',
              },
              math: 'N^* = \\frac{m}{b \\cdot a}, \\qquad P^* = \\frac{r}{a}',
              explanation: {
                en: 'Setting dN/dt = 0 and dP/dt = 0 yields the stationary equilibrium point around which the population state vector orbits indefinitely.',
                id: 'Menyamakan dN/dt = 0 dan dP/dt = 0 menghasilkan titik keseimbangan stasioner yang diitari oleh vektor keadaan populasi secara kontinu.',
              },
            },
          ],
        },
        {
          id: 'biome-7-sec-3',
          title: {
            en: '3. Stoichiometry & The Marine Redfield Ratio',
            id: '3. Stoikiometri Ekologi & Rasio Redfield Samudra',
          },
          content: {
            en: 'Ecosystems are governed not only by energy flow, but also by strict chemical stoichiometry—the relative balance of essential elements required to construct cellular machinery.\n\nIn 1934, oceanographer Alfred Redfield discovered that the elemental atomic ratio of carbon, nitrogen, and phosphorus in marine plankton across all major oceans is remarkably invariant:\n\n106 C : 16 N : 1 P\n\nRemarkably, the dissolved nitrate (NO₃⁻) to dissolved phosphate (PO₄³⁻) ratio in deep unperturbed seawater matches this biological ratio (16:1) with extraordinary precision. This stoichiometry arises from biochemical constraints:\n- Carbon (106): Structural lipids, carbohydrates, and protein backbones.\n- Nitrogen (16): Amino acids, proteins, enzymes (RuBisCO), and photosynthetic pigments.\n- Phosphorus (1): Ribosomal RNA (protein synthesis machinery), ATP/ADP energy currency, and phospholipid membranes.\n\nWhen N:P ratios in surface waters deviate below 16:1, diazotrophic cyanobacteria (Trichodesmium) fix atmospheric dinitrogen (N₂), restoring nitrogen balance. Conversely, when N:P ratios exceed 16:1, phosphorus limitation halts growth and excess nitrogen is removed by benthic anaerobic denitrification (NO₃⁻ → N₂O → N₂). The Redfield ratio demonstrates how microbial life biochemically regulates the elemental chemistry of the entire planetary ocean.',
            id: 'Ekosistem dikendalikan tidak hanya oleh aliran energi, tetapi juga oleh stoikiometri kimiawi yang ketat—keseimbangan relatif unsur-unsur esensial yang dibutuhkan untuk membangun mesin seluler.\n\nPada tahun 1934, oseanografer Alfred Redfield menemukan bahwa rasio atom unsur karbon, nitrogen, dan fosfor dalam plankton laut di seluruh samudra dunia bersifat konstan:\n\n106 C : 16 N : 1 P\n\nYang luar biasa, rasio nitrat terlarut (NO₃⁻) terhadap fosfat terlarut (PO₄³⁻) di samudra dalam yang belum terganggu sangat tepat mencerminkan rasio biologis ini (16:1). Stoikiometri ini lahir dari kebutuhan biokimiawi sel:\n- Karbon (106): Kerangka lipid struktural, karbohidrat, dan rantai protein.\n- Nitrogen (16): Asam amino, protein, enzim fotosintesis (RuBisCO), dan pigmen klorofil.\n- Fosfor (1): RNA ribosom (aparatus sintesis protein), nukleotida energi ATP/ADP, dan membran fosfolipid.\n\nKetika rasio N:P di permukaan laut turun di bawah 16:1, sianobakteri diazotrof (seperti Trichodesmium) mengikat gas dinitrogen (N₂) atmosfer, memulihkan keseimbangan nitrogen. Sebaliknya, jika rasio N:P melampaui 16:1, keterbatasan fosfor menghentikan pertumbuhan dan kelebihan nitrogen dieliminasi melalui denitrifikasi anaerobik di dasar laut (NO₃⁻ → N₂O → N₂). Rasio Redfield membuktikan bagaimana kehidupan mikroba mengatur komposisi kimia seluruh samudra bumi.',
          },
          formula: '106\\,\\text{C} : 16\\,\\text{N} : 1\\,\\text{P} \\quad (\\pm 20\\,\\text{C} : 4\\,\\text{N} : 1\\,\\text{P})',
          formulaExplanation: {
            en: 'Marine Redfield Ratio: Stoichiometric atomic ratio of carbon to nitrogen to phosphorus in marine phytoplankton and deep ocean water column.',
            id: 'Rasio Redfield Samudra: Rasio stoikiometri atomik antara karbon, nitrogen, dan fosfor pada fitoplankton laut dan air samudra dalam.',
          },
          caseStudy: {
            title: {
              en: 'Apex Wolf Reintroduction & Trophic Cascades in Yellowstone',
              id: 'Reintroduksi Serigala Puncak & Kaskade Trofik di Yellowstone',
            },
            context: {
              en: 'Following the eradication of gray wolves (Canis lupus) from Yellowstone National Park in the 1920s, elk populations exploded, precipitating widespread riparian ecosystem collapse.',
              id: 'Menyusul pemusnahan serigala abu-abu (Canis lupus) dari Taman Nasional Yellowstone pada tahun 1920-an, populasi rusa elk melonjak tanpa kendali, memicu keruntuhan ekosistem riparian luas.',
            },
            analysis: {
              en: 'In 1995, 14 wolves were reintroduced into Yellowstone, triggering a profound top-down trophic cascade:\n1. Behavior of Fear (Risk Landscapes): Elk altered their grazing behavior, abandoning open river valleys and gorges where they were vulnerable to wolf ambushes.\n2. Riparian Vegetation Recovery: Unchecked elk browsing had eliminated young willow (Salix) and aspen (Populus tremuloides). With grazing pressure relieved, willows expanded fourfold in height and density within a decade.\n3. Beaver Recolonization: Abundant willow provided winter food and dam construction materials for North American beavers (Castor canadensis), whose colonies multiplied from 1 to over 12.\n4. Geomorphic River Stabilization: Beaver dams trapped sediment, buffered seasonal flood pulses, created wetland habitats for amphibians and fish, and stabilized eroding river banks.',
              id: 'Pada tahun 1995, 14 ekor serigala direintroduksi ke Yellowstone, menyulut kaskade trofik top-down yang sangat masif:\n1. Lanskap Ketakutan (Landscape of Fear): Rusa elk mengubah perilaku merumputnya, meninggalkan lembah sungai terbuka tempat mereka rentan disergap serigala.\n2. Pemulihan Vegetasi Riparian: Tekanan merumput elk sebelumnya telah memusnahkan anakan pohon willow dan aspen. Setelah tekanan mereda, semak willow tumbuh kembali empat kali lipat lebih tinggi dan rimbun dalam satu dekade.\n3. Rekolonisasi Berang-berang: Willow yang melimpah menyediakan makanan dan bahan bendungan bagi berang-berang (Castor canadensis), yang koloninya berkembang dari 1 menjadi lebih dari 12 koloni.\n4. Stabilisasi Geomorfologi Sungai: Bendungan berang-berang mengendapkan sedimen, meredam banjir musiman, menciptakan habitat lahan basah bagi ikan dan amfibi, serta menstabilkan tebing sungai yang tererosi.',
            },
            takeaway: {
              en: 'Apex predators exert structural top-down regulatory control that cascades across trophic levels to alter physical fluvial geomorphology.',
              id: 'Predator puncak menjalankan kontrol regulasi top-down yang merambat menembus tingkatan trofik hingga mengubah geomorfologi fisik sungai.',
            },
          },
        },
        {
          id: 'biome-7-sec-4',
          title: {
            en: '4. Anthropocene Biome Shifts & Planetary Tipping Elements',
            id: '4. Pergeseran Bioma Antroposen & Titik Kritis Planet (Tipping Elements)',
          },
          content: {
            en: 'Human activities have pushed the Earth system into the Anthropocene epoch, transforming over 75% of ice-free terrestrial land into anthromes (anthropogenic biomes: croplands, grazing rangelands, urban settlements). Atmospheric greenhouse gas forcing (CO₂ > 425 ppm) is destabilizing planetary climate equilibrium, threatening several critical biosphere tipping elements:\n\n1. Amazon Rainforest Dieback Tipping Point: The Amazon generates up to 50% of its own rainfall through continuous forest evapo-transpiration ("flying rivers"). Coupled deforestation (surpassing 17–20% of basin area) and regional warming threatens to breach a catastrophic tipping point where forest moisture recycling collapses, triggering a self-amplifying transition into a degraded, fire-prone degraded savanna ecosystem.\n2. Boreal Forest Browning & Southward Contraction: Warming is accelerating bark beetle infestations, catastrophic mega-fires, and drought-induced mortality along the southern boreal boundary, while permafrost thaw destabilizes subarctic foundations.\n3. Marine Ecosystem Decoupling & Deoxygenation: Ocean warming stratifies surface waters, cutting off vertical oxygen replenishment and expanding oceanic Oxygen Minimum Zones (OMZs). Simultaneously, pervasive coral reef bleaching threatens the collapse of one-quarter of global marine biodiversity.\n\nRespecting planetary boundaries requires preserving biosphere integrity through ecological restoration, decarbonization, and connected biome corridors.',
            id: 'Aktivitas manusia telah mendorong sistem Bumi memasuki era Antroposen, mengubah lebih dari 75% daratan bebas es menjadi antrom (bioma antropogenik: lahan pertanian, padang penggembalaan, permukiman kota). Peningkatan gas rumah kaca atmosfer (CO₂ > 425 ppm) mengganggu keseimbangan iklim planet, mengancam titik-titik kritis biosfer (tipping elements):\n\n1. Titik Kritis Keruntuhan Hutan Hujan Amazon: Hutan Amazon menghasilkan hingga 50% curah hujannya sendiri melalui siklus evapotranspirasi kanopi ("sungai terbang / flying rivers"). Deforestasi (mendekati 17–20% luas cekungan) dan pemanasan global mengancam titik kritis di mana daur ulang kelembapan runtuh, memicu transisi permanen menjadi ekosistem sabana terdegradasi yang rawan kebakaran.\n2. Pengeringan Hutan Boreal (Boreal Browning): Pemanasan memicu ledakan hama kumbang kulit kayu, kebakaran hutan hebat, dan kematian akibat kekeringan di batas selatan taiga, sementara pencairan permafrost merusak struktur tanah subpolar.\n3. Deoksigenasi Samudra & Keruntuhan Terumbu Karang: Pemanasan laut memperkuat stratifikasi permukaan, menghambat sirkulasi oksigen ke kedalaman dan memperluas Zona Minimum Oksigen (OMZ). Bersamaan dengan itu, pemutihan karang global mengancam kepunahan seperempat keanekaragaman hayati laut.\n\nMenjaga batas aman planet menuntut perlindungan integritas biosfer melalui restorasi ekologis, dekarbonisasi energi, dan koridor bioma yang terhubung.',
          },
          comparisonTable: {
            headers: {
              en: ['Biosphere Tipping Element', 'Critical Threshold / Driver', 'Physical Mechanism', 'Planetary Consequence'],
              id: ['Titik Kritis Biosfer', 'Ambang Kritis / Pemicu', 'Mekanisme Fisik', 'Dampak Global Planet'],
            },
            rows: [
              {
                en: ['Amazon Rainforest Dieback', '20–25% deforestation + 2°C warming', 'Collapse of atmospheric moisture recycling ("flying rivers")', 'Release of ~100–150 Gt carbon; permanent savanna biome shift'],
                id: ['Keruntuhan Hutan Hujan Amazon', '20–25% deforestasi + 2°C pemanasan', 'Runtuhnya daur ulang uap air atmosfer ("sungai terbang")', 'Pelepasan ~100–150 Gt karbon; transisi permanen menjadi sabana'],
              },
              {
                en: ['Permafrost Thaw Methane Release', '> 1.5°C global warming above pre-industrial', 'Thermokarst lake formation; microbial anaerobic methanogenesis', 'Massive positive feedback accelerating global warming'],
                id: ['Pencairan Permafrost & Pelepasan Metana', '> 1,5°C pemanasan global di atas pra-industri', 'Pembentukan danau thermokarst; metanogenesis anaerobik mikroba', 'Umpan balik positif masif yang mempercepat pemanasan bumi'],
              },
              {
                en: ['Global Coral Reef Collapse', '> 1.5°C sustained sea surface warming', 'Chronic mass thermal bleaching and ocean acidification', 'Loss of 25% of marine biodiversity; collapse of coastal fisheries'],
                id: ['Keruntuhan Terumbu Karang Global', '> 1,5°C pemanasan suhu permukaan laut berkepanjangan', 'Pemutihan karang massal kronis & asidifikasi laut', 'Kepunahan 25% keanekaragaman laut; kehancuran perikanan pesisir'],
              },
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'biome-q7-1',
          question: {
            en: 'According to Lindeman’s thermodynamic efficiency principle, approximately what percentage of energetic production is transferred from one trophic level to the next?',
            id: 'Menurut prinsip efisiensi termodinamika Lindeman, kira-kira berapa persentase produksi energi yang ditransfer dari satu tingkat trofik ke tingkat berikutnya?',
          },
          options: {
            en: [
              '100% (governed by the conservation of mass)',
              '~90% (almost zero energy is lost)',
              '~10% (typically ranging from 5% to 20%)',
              '0.001%',
            ],
            id: [
              '100% (dikendalikan oleh kekekalan massa)',
              '~90% (hampir tidak ada energi yang hilang)',
              '~10% (biasanya berkisar antara 5% hingga 20%)',
              '0,001%',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Due to non-consumed biomass, unassimilated waste egestion, and massive metabolic heat dissipation from cellular respiration, ecological transfer efficiency averages approximately 10%.',
            id: 'Akibat biomassa tidak termakan, feses yang tidak tercerna, dan disipasi panas metabolik masif dari respirasi seluler, efisiensi transfer ekologis rata-rata hanya sekitar 10%.',
          },
        },
        {
          id: 'biome-q7-2',
          question: {
            en: 'What is the standard stoichiometric Redfield Ratio of carbon to nitrogen to phosphorus in marine phytoplankton?',
            id: 'Berapakah Rasio Redfield stoikiometri standar antara karbon, nitrogen, dan fosfor pada fitoplankton laut?',
          },
          options: {
            en: [
              '1 C : 1 N : 1 P',
              '106 C : 16 N : 1 P',
              '1000 C : 100 N : 10 P',
              '16 C : 106 N : 1 P',
            ],
            id: [
              '1 C : 1 N : 1 P',
              '106 C : 16 N : 1 P',
              '1000 C : 100 N : 10 P',
              '16 C : 106 N : 1 P',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Alfred Redfield demonstrated in 1934 that marine plankton consistently exhibit an atomic ratio of 106 Carbon : 16 Nitrogen : 1 Phosphorus, mirroring the dissolved inorganic ratio of deep ocean waters.',
            id: 'Alfred Redfield membuktikan pada tahun 1934 bahwa plankton laut secara konsisten memiliki rasio atom 106 Karbon : 16 Nitrogen : 1 Fosfor, yang mencerminkan rasio anorganik terlarut di air samudra dalam.',
          },
        },
        {
          id: 'biome-q7-3',
          question: {
            en: 'In the Lotka-Volterra predator-prey model, what produces the cyclical phase lag between prey and predator population peaks?',
            id: 'Dalam model predator-mangsa Lotka-Volterra, apakah yang menghasilkan jeda fase siklis antara puncak populasi mangsa dan puncak populasi predator?',
          },
          options: {
            en: [
              'Predators exclusively eat rocks when prey are scarce.',
              'Prey animals hibernate for exactly 50 years every cycle.',
              'Solar flares cause synchronized extinctions every decade.',
              'Predator population growth depends on prey density; predator numbers expand after prey become abundant, eventually over-consuming prey and initiating a collapse.',
            ],
            id: [
              'Predator hanya memakan bebatuan saat mangsa langka.',
              'Hewan mangsa berhibernasi tepat 50 tahun setiap siklus.',
              'Badai matahari memicu kepunahan serempak setiap satu dekade.',
              'Pertumbuhan populasi predator bergantung pada kerapatan mangsa; predator bertambah banyak setelah mangsa melimpah, hingga akhirnya memangsa berlebih dan memicu keruntuhan populasi mangsa.',
            ],
          },
          correctAnswerIndex: 3,
          explanation: {
            en: 'Predator reproductive increase requires time to convert consumed prey into offspring, creating an intrinsic quarter-cycle phase lag behind the prey population trajectory.',
            id: 'Peningkatan reproduksi predator membutuhkan waktu untuk mengonversi mangsa menjadi keturunan baru, menciptakan jeda fase seperempat siklus di belakang kurva populasi mangsa.',
          },
        },
        {
          id: 'biome-q7-4',
          question: {
            en: 'What self-reinforcing hydrological mechanism threatens to trigger the Amazon Rainforest dieback tipping point?',
            id: 'Mekanisme hidrologi penguat-diri (self-reinforcing) apakah yang mengancam titik kritis keruntuhan Hutan Hujan Amazon?',
          },
          options: {
            en: [
              'Deforestation disrupts forest evapo-transpiration ("flying rivers"), reducing regional precipitation and triggering further drought, fires, and savanna conversion.',
              'The Amazon River will reverse its flow direction back into the Andes Mountains.',
              'Underground earthquakes will drain all freshwater into the Pacific Ocean.',
              'Piranhas will consume the bark of all buttress trees.',
            ],
            id: [
              'Deforestasi merusak evapotranspirasi kanopi ("sungai terbang"), menurunkan curah hujan regional dan memicu kekeringan, kebakaran, serta transisi permanen menjadi sabana.',
              'Sungai Amazon akan berbalik arah mengalir kembali ke Pegunungan Andes.',
              'Gempa bumi bawah tanah akan menyedot seluruh air tawar ke Samudra Pasifik.',
              'Ikan piranha akan memakan habis kulit kayu seluruh pohon berbanir.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The Amazon recycles up to half of its own precipitation. Breaching critical deforestation thresholds collapses this biophysical moisture engine, locking in an irreversible transition to degraded savanna.',
            id: 'Hutan Amazon mendaur ulang hingga setengah dari curah hujannya sendiri. Melewati batas kritis deforestasi meruntuhkan mesin kelembapan biofisika ini, mengunci transisi permanen menjadi sabana gersang.',
          },
        },
      ],
    },
  ],
};
