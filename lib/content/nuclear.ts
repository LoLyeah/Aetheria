import { Topic } from '@/types/learning';

export const nuclearReactorTopic: Topic = {
  id: 'nuclear-reactor',
  title: {
    en: 'Nuclear Reactor Physics, Advanced Architectures & Disaster Mitigation',
    id: 'Fisika Reaktor Nuklir, Arsitektur Mutakhir & Mitigasi Bencana',
  },
  tagline: {
    en: 'Fission kinetics, Gen-IV SMRs, TRISO fuels, molten salts, defense-in-depth, and passive disaster mitigation.',
    id: 'Kinetika fisi, SMR Gen-IV, bahan bakar TRISO, garam cair, defense-in-depth, dan mitigasi bencana pasif.',
  },
  description: {
    en: 'Explore the fundamental physics, thermal-hydraulic engineering, operational mechanics, and multi-layered safety paradigms of nuclear fission reactors. Investigate mass defect, neutron cross-sections, four-factor and six-factor criticality equations, delayed neutron kinetics, and reactivity control. Trace the evolution from Gen-I Chicago Pile-1 to modern commercial PWR, BWR, CANDU, and RBMK fleets. Analyze next-generation Gen-IV systems (VHTR, MSR, SFR, LFR), Small Modular Reactors (SMRs), TRISO pebble beds, and fusion horizons. Examine forensic disaster post-mortems (Chernobyl, Three Mile Island, Fukushima) alongside advanced defense-in-depth engineering: negative Doppler feedback, SCRAM gravity kinetics, Wigner-Way decay heat removal, core catchers, and passive containment cooling in interactive 3D.',
    id: 'Pelajari fisika dasar, rekayasa termal-hidraulik, mekanika operasional, dan paradigma keselamatan berlapis dari reaktor fisi nuklir. Analisis cacat massa, penampang lintang neutron, persamaan kekritisan empat-faktor dan enam-faktor, kinetika neutron kasip, serta kendali reaktivitas. Telusuri evolusi dari Chicago Pile-1 Gen-I hingga armada komersial modern PWR, BWR, CANDU, dan RBMK. Telaah sistem masa depan Generasi IV (VHTR, MSR, SFR, LFR), Small Modular Reactor (SMR), bahan bakar TRISO pebble bed, dan horizon fusi nuklir. Kaji investigasi forensik bencana (Chernobyl, Three Mile Island, Fukushima) bersama rekayasa pertahanan berlapis mutakhir: umpan balik Doppler negatif, kinetika gravitasi SCRAM, pembuangan panas peluruhan Wigner-Way, core catcher, dan pendinginan penahan pasif dalam 3D interaktif.',
  },
  category: {
    en: 'Nuclear Engineering & Energy Physics',
    id: 'Rekayasa Nuklir & Fisika Energi',
  },
  colorAccent: 'amber',
  badgeColor: 'from-amber-500 to-yellow-600',
  iconName: 'ShieldAlert',
  modules: [
    // -------------------------------------------------------------
    // PART 1: NUCLEAR PHYSICS FOUNDATIONS & FISSION MECHANICS
    // -------------------------------------------------------------
    {
      id: 'nuc-mod-1',
      topicId: 'nuclear-reactor',
      order: 1,
      title: {
        en: 'Nuclear Physics Foundations & Fission Mechanics',
        id: 'Fondasi Fisika Nuklir & Mekanika Fisi',
      },
      shortDescription: {
        en: 'Nuclear binding energy, mass defect, fissile vs fertile nuclides, neutron cross-sections, and energy release.',
        id: 'Energi ikat inti, cacat massa, nuklida fisil vs fertil, penampang lintang neutron, dan pelepasan energi fisi.',
      },
      durationMinutes: 22,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'nuclear-reactor-lab',
      sections: [
        {
          id: 'nuc-1-sec-1',
          title: {
            en: '1. Mass Defect and Nuclear Binding Energy',
            id: '1. Cacat Massa dan Energi Ikat Inti',
          },
          content: {
            en: 'Nuclear fission releases extraordinary amounts of thermal energy per unit mass—approximately 200 MeV per fission event, or roughly 2 to 3 million times the energy density of chemical hydrocarbon combustion. This colossal energy release arises from mass defect (Δm), where the bound mass of an atomic nucleus is measurably smaller than the sum of its constituent free protons and neutrons.\n\nAccording to Einstein\'s mass-energy equivalence principle (E = Δm c²), this "missing" mass is released during nuclear formation as binding energy. Across the chart of nuclides, binding energy per nucleon (B/A) follows a characteristic curve: light nuclei (hydrogen, helium) release energy via nuclear fusion, while heavy, actinide nuclei (uranium, plutonium) release net binding energy when split into lighter, more tightly bound intermediate fission fragments (peaking near Iron-56 and Nickel-62 at ~8.8 MeV per nucleon, compared to ~7.6 MeV per nucleon for Uranium-235).',
            id: 'Fisi nuklir melepaskan energi termal yang sangat masif per satuan massa—sekitar 200 MeV per peristiwa fisi, atau kira-kira 2 hingga 3 juta kali densitas energi pembakaran hidrokarbon kimiawi. Pelepasan energi kolosal ini bersumber dari cacat massa (Δm), di mana massa terikat suatu inti atom terukur lebih kecil dibandingkan jumlah massa proton dan neutron bebas penyusunnya.\n\nBerdasarkan prinsip kesetaraan massa-energi Einstein (E = Δm c²), massa yang "hilang" ini dilepaskan selama pembentukan inti sebagai energi ikat. Pada diagram nuklida, energi ikat per nukleon (B/A) mengikuti kurva karakteristik: inti ringan (hidrogen, helium) melepaskan energi melalui fusi nuklir, sedangkan inti berat golongan aktinida (uranium, plutonium) melepaskan energi ikat netto ketika dibelah menjadi fragmen fisi intermediat yang terikat lebih erat (berpuncak di dekat Besi-56 dan Nikel-62 pada ~8,8 MeV per nukleon, dibandingkan ~7,6 MeV per nukleon pada Uranium-235).',
          },
          formula: 'B(A, Z) = a_v A - a_s A^{2/3} - a_c \\frac{Z(Z-1)}{A^{1/3}} - a_a \\frac{(A - 2Z)^2}{A} + \\delta(A, Z)',
          formulaExplanation: {
            en: 'The Bethe-Weizsäcker semi-empirical mass formula (liquid drop model). It models binding energy through five physical terms: volume energy (proportional to nucleon count A), surface tension correction (A^(2/3)), electrostatic Coulomb repulsion between Z protons, quantum asymmetry energy penalizing proton-neutron imbalance, and nucleon spin-pairing energy δ(A, Z).',
            id: 'Formula massa semi-empiris Bethe-Weizsäcker (model tetes cairan). Rumus ini memodelkan energi ikat melalui lima suku fisis: energi volume (sebanding dengan jumlah nukleon A), koreksi tegangan permukaan (A^(2/3)), tolakan elektrostatik Coulomb antar Z proton, energi asimetri kuantum akibat ketidakseimbangan proton-neutron, dan energi perpasangan spin nukleon δ(A, Z).',
          },
          variables: [
            {
              symbol: 'B(A, Z)',
              name: { en: 'Total Nuclear Binding Energy', id: 'Total Energi Ikat Inti' },
              unit: 'MeV',
              description: {
                en: 'Energy required to completely dissociate the nucleus into constituent free nucleons.',
                id: 'Energi yang diperlukan untuk menguraikan inti atom sepenuhnya menjadi nukleon bebas penyusunnya.',
              },
            },
            {
              symbol: 'A',
              name: { en: 'Mass Number (Nucleon Count)', id: 'Nomor Massa (Jumlah Nukleon)' },
              unit: 'dimensionless',
              description: {
                en: 'Total sum of protons and neutrons in the nucleus (A = Z + N).',
                id: 'Total penjumlahan proton dan neutron dalam inti (A = Z + N).',
              },
            },
            {
              symbol: 'Z',
              name: { en: 'Atomic Number (Proton Count)', id: 'Nomor Atom (Jumlah Proton)' },
              unit: 'dimensionless',
              description: {
                en: 'Number of protons in the nucleus, defining the chemical element.',
                id: 'Jumlah proton dalam inti yang menentukan unsur kimiawi.',
              },
            },
            {
              symbol: 'a_v',
              name: { en: 'Volume Energy Coefficient', id: 'Koefisien Energi Volume' },
              unit: 'MeV (~15.8 MeV)',
              description: {
                en: 'Attractive nuclear strong force saturation experienced by interior nucleons.',
                id: 'Saturasi gaya kuat nuklir tarik-menarik yang dialami oleh nukleon-nukleon di bagian dalam.',
              },
            },
            {
              symbol: '\\delta(A, Z)',
              name: { en: 'Pairing Term', id: 'Suku Perpasangan Nukleon' },
              unit: 'MeV',
              description: {
                en: 'Quantum spin-pairing bonus (+δ for even-even nuclei, 0 for odd-even, -δ for odd-odd).',
                id: 'Bonus perpasangan spin kuantum (+δ untuk inti genap-genap, 0 untuk ganjil-genap, -δ untuk ganjil-ganjil).',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Mass Defect Formulation',
                id: 'Langkah 1: Perumusan Cacat Massa',
              },
              math: '\\Delta m = \\left[ Z \\cdot m_p + (A - Z) \\cdot m_n \\right] - m_{\\text{nucleus}}',
              explanation: {
                en: 'The nuclear mass defect represents the difference between the sum of individual free proton and neutron rest masses and the experimentally measured bound nuclear mass.',
                id: 'Cacat massa inti menyatakan selisih antara jumlah massa diam proton dan neutron bebas individual dengan massa inti terikat hasil pengukuran eksperimental.',
              },
            },
            {
              title: {
                en: 'Step 2: Energy Equivalent Release',
                id: 'Langkah 2: Pelepasan Energi Setara',
              },
              math: 'Q_{\\text{fission}} = \\left[ m(^{235}_{92}\\text{U}) + m_n - \\sum m_{\\text{products}} \\right] c^2 \\approx 200\\text{ MeV}',
              explanation: {
                en: 'When Uranium-235 absorbs a thermal neutron, it splits into two intermediate-mass fission fragments plus 2 to 3 prompt neutrons. The mass deficit directly converts to kinetic energy and gamma radiation.',
                id: 'Ketika Uranium-235 menyerap neutron termal, ia terbelah menjadi dua fragmen fisi bermassa menengah ditambah 2 hingga 3 neutron serentak. Defisit massa tersebut langsung terkonversi menjadi energi kinetik dan radiasi gamma.',
              },
            },
          ],
        },
        {
          id: 'nuc-1-sec-2',
          title: {
            en: '2. Fissile vs. Fertile Isotopes & Neutron Energy Cross-Sections',
            id: '2. Isotop Fisil vs. Fertil & Penampang Lintang Energi Neutron',
          },
          content: {
            en: 'In nuclear engineering, heavy isotopes are classified based on their interaction with incident neutrons:\n\n• Fissile Nuclides: Capable of sustaining a nuclear chain reaction with neutrons of any kinetic energy, particularly low-energy thermal neutrons (~0.0253 eV at 20°C). Prime examples include Uranium-235 (0.72% of natural uranium), Plutonium-239, and Uranium-233. Fissile nuclides possess an odd number of neutrons; absorbing an additional neutron yields a quantum pairing energy bonus that immediately exceeds the fission barrier threshold (~5.8 MeV).\n• Fertile Nuclides: Cannot sustain a chain reaction directly with thermal neutrons, but can be converted ("bred") into fissile fuel via radiative neutron capture and subsequent beta-minus decays. Uranium-238 (99.28% of natural uranium) captures a neutron to become U-239, decaying to Neptunium-239 and then fissile Plutonium-239. Similarly, Thorium-232 captures a neutron to breed fissile Uranium-233.\n• Neutron Cross-Section (σ): Measured in barns (1 b = 10⁻²⁸ m²), the microscopic cross-section quantifies the probability of a nuclear reaction. At thermal energies, the fission cross-section of U-235 is ~585 barns (following the 1/v velocity law), whereas fast neutrons (2 MeV) experience a cross-section of only ~1 to 2 barns. This fundamental physics necessity dictates the use of moderators (light water, heavy water, or graphite) in thermal reactors to slow fast fission neutrons down to thermal energies.',
            id: 'Dalam rekayasa nuklir, isotop berat diklasifikasikan berdasarkan interaksinya dengan neutron yang datang:\n\n• Nuklida Fisil: Mampu mempertahankan reaksi berantai nuklir dengan neutron berenergi kinetik apa pun, terutama neutron termal berenergi rendah (~0,0253 eV pada 20°C). Contoh utamanya meliputi Uranium-235 (0,72% dari uranium alam), Plutonium-239, dan Uranium-233. Nuklida fisil memiliki jumlah neutron ganjil; penyerapan satu neutron tambahan memberikan bonus energi perpasangan kuantum yang langsung melampaui ambang batas penghalang fisi (~5,8 MeV).\n• Nuklida Fertil: Tidak dapat mempertahankan reaksi berantai secara langsung dengan neutron termal, namun dapat dikonversi ("dibiakkan") menjadi bahan bakar fisil melalui penangkapan neutron radiatif dan peluruhan beta-minus bertahap. Uranium-238 (99,28% dari uranium alam) menangkap neutron menjadi U-239, meluruh menjadi Neptunium-239, lalu menjadi Plutonium-239 yang fisil. Serupa dengan itu, Thorium-232 menangkap neutron untuk membiakkan Uranium-233 yang fisil.\n• Penampang Lintang Neutron (σ): Diukur dalam satuan barn (1 b = 10⁻²⁸ m²), penampang lintang mikroskopis mengukur probabilitas terjadinya reaksi nuklir. Pada energi termal, penampang lintang fisi U-235 mencapai ~585 barn (mengikuti hukum 1/v kecepatan), sedangkan neutron cepat (2 MeV) hanya mengalami penampang lintang ~1 hingga 2 barn. Kebutuhan fisika dasar inilah yang mewajibkan penggunaan moderator (air biasa, air berat, atau grafit) dalam reaktor termal untuk memperlambat neutron fisi cepat hingga ke energi termal.',
          },
          comparisonTable: {
            headers: {
              en: ['Nuclide', 'Classification', 'Thermal σ_f (barns)', 'Fast Threshold', 'Breeding Pathway'],
              id: ['Nuklida', 'Klasifikasi', 'σ_f Termal (barn)', 'Ambang Cepat', 'Jalur Pembiakan'],
            },
            rows: [
              {
                en: ['Uranium-235', 'Fissile', '585 b', 'None (thermal fissionable)', 'Direct natural primary fuel (0.72% natural abundance)'],
                id: ['Uranium-235', 'Fisil', '585 b', 'Tidak ada (dapat fisi termal)', 'Bahan bakar primer alam langsung (0,72% kelimpahan alam)'],
              },
              {
                en: ['Uranium-238', 'Fertile', '~0.00002 b', 'E_n > 1.0 MeV (~0.5 b)', '238U + n -> 239U -(β-)-> 239Np -(β-)-> 239Pu (fissile)'],
                id: ['Uranium-238', 'Fertil', '~0,00002 b', 'E_n > 1,0 MeV (~0,5 b)', '238U + n -> 239U -(β-)-> 239Np -(β-)-> 239Pu (fisil)'],
              },
              {
                en: ['Plutonium-239', 'Fissile', '748 b', 'None (thermal fissionable)', 'Bred in fast/thermal reactors from 238U fertile blankets'],
                id: ['Plutonium-239', 'Fisil', '748 b', 'Tidak ada (dapat fisi termal)', 'Dibiakkan dalam reaktor cepat/termal dari selimut fertil 238U'],
              },
              {
                en: ['Thorium-232', 'Fertile', '~0.00005 b', 'E_n > 1.2 MeV (~0.3 b)', '232Th + n -> 233Th -(β-)-> 233Pa -(β-)-> 233U (fissile)'],
                id: ['Thorium-232', 'Fertil', '~0,00005 b', 'E_n > 1,2 MeV (~0,3 b)', '232Th + n -> 233Th -(β-)-> 233Pa -(β-)-> 233U (fisil)'],
              },
              {
                en: ['Uranium-233', 'Fissile', '531 b', 'None (thermal fissionable)', 'Bred from Thorium fuel cycle; high η in thermal spectrum'],
                id: ['Uranium-233', 'Fisil', '531 b', 'Tidak ada (dapat fisi termal)', 'Dibiakkan dari siklus bahan bakar Thorium; η tinggi di spektrum termal'],
              },
            ],
          },
        },
        {
          id: 'nuc-1-sec-3',
          title: {
            en: '3. Fission Energy Partition and Prompt Neutron Spectrum',
            id: '3. Partisi Energi Fisi dan Spektrum Neutron Serentak',
          },
          content: {
            en: 'Each single fission event of Uranium-235 yields approximately 202.5 MeV of recoverable energy, partitioned predictably across multiple physical carriers:\n\n• Kinetic Energy of Fission Fragments (~168–170 MeV, 83.5%): Fission fragments are highly ionized, heavy nuclei moving at ~10⁷ m/s. They dissipate their immense kinetic energy within micrometers of fuel matrix via Coulomb collisions, appearing virtually instantaneously as volumetric core heat.\n• Prompt Neutrons (~4.8 MeV, 2.4%): An average of ν = 2.43 neutrons are emitted per fission event with a continuous energy distribution described by the empirical Watt fission spectrum: N(E) = C · sinh(√(2E)) · exp(-E), exhibiting a peak at 0.73 MeV and a mean energy of ~2.0 MeV.\n• Prompt Gamma Radiation (~7.0 MeV, 3.5%): High-energy photons emitted during nuclear de-excitation within 10⁻¹⁴ seconds.\n• Delayed Radiations (~21.7 MeV, 10.6%): Fission products are neutron-rich and decay over seconds, days, and centuries via beta-minus emission (~6.5 MeV), delayed gamma rays (~6.3 MeV), and antineutrinos (~8.9 MeV, which escape without depositing thermal energy). Delayed beta and gamma emissions constitute "decay heat", which requires continuous cooling long after reactor shutdown.',
            id: 'Setiap peristiwa fisi tunggal Uranium-235 menghasilkan sekitar 202,5 MeV energi yang dapat dimanfaatkan, terbagi secara terprediksi ke berbagai pembawa fisis:\n\n• Energi Kinetik Fragmen Fisi (~168–170 MeV, 83,5%): Fragmen fisi merupakan inti berat yang terionisasi tinggi dan bergerak dengan kecepatan ~10⁷ m/s. Fragmen ini melepaskan energi kinetiknya dalam jarak mikrometer di dalam matriks bahan bakar melalui tumbukan Coulomb, yang segera termanifestasi sebagai panas volumetrik teras.\n• Neutron Serentak (~4,8 MeV, 2,4%): Rata-rata ν = 2,43 neutron dipancarkan per peristiwa fisi dengan distribusi energi kontinu yang dijelaskan oleh spektrum fisi empiris Watt: N(E) = C · sinh(√(2E)) · exp(-E), dengan puncak pada 0,73 MeV dan energi rata-rata ~2,0 MeV.\n• Radiasi Gamma Serentak (~7,0 MeV, 3,5%): Foton berenergi tinggi yang dipancarkan selama de-eksitasi inti dalam rentang 10⁻¹⁴ detik.\n• Radiasi Tertunda (~21,7 MeV, 10,6%): Produk fisi memiliki kelebihan neutron dan meluruh selama berminggu-minggu hingga berabad-abad melalui emisi beta-minus (~6,5 MeV), sinar gamma tertunda (~6,3 MeV), dan antineutrino (~8,9 MeV yang lolos tanpa mendepositkan panas termal). Emisi beta dan gamma tertunda inilah yang membentuk "panas peluruhan" (decay heat) yang wajib terus didinginkan lama setelah reaktor dimatikan.',
          },
          caseStudy: {
            title: {
              en: 'Chicago Pile-1 (CP-1, 1942): First Artificial Self-Sustaining Chain Reaction',
              id: 'Chicago Pile-1 (CP-1, 1942): Reaksi Berantai Buatan Mandiri Pertama di Dunia',
            },
            context: {
              en: 'In December 1942, Enrico Fermi and his team built Chicago Pile-1 under the West Stands of Stagg Field at the University of Chicago. Lacking enriched uranium and light water cooling, they assembled 40,000 ultra-pure graphite blocks (as moderator) interleaved with 6 tons of uranium metal and 40 tons of uranium oxide pellets.',
              id: 'Pada Desember 1942, Enrico Fermi dan timnya membangun Chicago Pile-1 di bawah tribun Stadion Stagg di University of Chicago. Tanpa uranium yang diperkaya dan tanpa pendingin air biasa, mereka menyusun 40.000 balok grafit berkemurnian ultra-tinggi (sebagai moderator) yang diselingi dengan 6 ton logam uranium dan 40 ton pelet uranium oksida.',
            },
            analysis: {
              en: 'Fermi proved that high-purity graphite could reduce parasitic neutron capture sufficiently to achieve an effective multiplication factor k_eff > 1.0 using only natural uranium (0.7% U-235). Cadmium control rods were withdrawn incrementally while boron trifluoride neutron counters recorded the asymptotic flux rise, proving controlled nuclear fission at 0.5 Watts thermal.',
              id: 'Fermi membuktikan bahwa grafit berkemurnian tinggi dapat mengurangi penangkapan neutron parasitik sedemikian rupa sehingga mencapai faktor multiplikasi efektif k_eff > 1,0 hanya dengan menggunakan uranium alam (0,7% U-235). Batang kendali kadmium ditarik bertahap sementara pencacah neutron boron trifluorida mencatat kenaikan fluks asimtotik, membuktikan tercapainya fisi nuklir terkendali pada daya 0,5 Watt termal.',
            },
            takeaway: {
              en: 'Natural uranium reactors require exceptionally low-absorption moderators (graphite or heavy water). Light water absorbs too many thermal neutrons, necessitating isotopic enrichment to 3–5% U-235 for modern commercial LWRs.',
              id: 'Reaktor berbahan bakar uranium alam memerlukan moderator dengan serapan neutron yang sangat rendah (grafit atau air berat). Air biasa menyerap terlalu banyak neutron termal, sehingga mewajibkan pengayaan isotopik menjadi 3–5% U-235 untuk reaktor komersial modern (LWR).',
            },
          },
        },
      ],
      keyTakeaways: {
        en: [
          'Nuclear fission yields ~200 MeV per event, derived from the nuclear mass defect (E = Δmc²) and binding energy differential between actinides (~7.6 MeV/nucleon) and mid-mass fragments (~8.8 MeV/nucleon).',
          'Fissile nuclides (U-235, Pu-239, U-233) have odd neutron counts and undergo fission with thermal neutrons, whereas fertile nuclides (U-238, Th-232) capture neutrons to breed fissile isotopes.',
          'Over 80% of fission energy appears immediately as the kinetic energy of heavy fission fragments, while ~7% manifests as delayed decay heat from radioactive fission products.',
          'Fast fission neutrons are emitted with an average kinetic energy of ~2 MeV and must be moderated to ~0.025 eV to capitalize on U-235\'s 585-barn thermal cross-section.',
        ],
        id: [
          'Fisi nuklir menghasilkan ~200 MeV per peristiwa, berasal dari cacat massa inti (E = Δmc²) dan diferensial energi ikat antara aktinida (~7,6 MeV/nukleon) dan fragmen massa menengah (~8,8 MeV/nukleon).',
          'Nuklida fisil (U-235, Pu-239, U-233) memiliki jumlah neutron ganjil dan mengalami fisi dengan neutron termal, sedangkan nuklida fertil (U-238, Th-232) menyerap neutron untuk membiakkan isotop fisil.',
          'Lebih dari 80% energi fisi muncul seketika sebagai energi kinetik fragmen fisi berat, sedangkan ~7% muncul sebagai panas peluruhan tertunda dari produk fisi radioaktif.',
          'Neutron fisi cepat dipancarkan dengan energi kinetik rata-rata ~2 MeV dan harus dimoderasi hingga ~0,025 eV untuk memanfaatkan penampang lintang termal U-235 sebesar 585 barn.',
        ],
      },
      quiz: [
        {
          id: 'nuc-1-q1',
          question: {
            en: 'Why does Uranium-235 undergo fission with thermal (0.025 eV) neutrons, whereas Uranium-238 primarily undergoes radiative capture rather than thermal fission?',
            id: 'Mengapa Uranium-235 mengalami fisi dengan neutron termal (0,025 eV), sedangkan Uranium-238 justru cenderung mengalami penangkapan radiatif daripada fisi termal?',
          },
          options: {
            en: [
              'U-235 has an odd neutron number; absorbing an additional neutron provides pairing energy that exceeds its critical fission threshold.',
              'U-238 is an unstable gas that cannot maintain solid crystalline structure in the fuel matrix.',
              'U-235 has zero protons, eliminating Coulomb barrier repulsion completely.',
              'Thermal neutrons move too fast to interact with heavy Uranium-238 nuclei.',
            ],
            id: [
              'U-235 memiliki jumlah neutron ganjil; penyerapan neutron tambahan memberikan energi perpasangan yang melampaui ambang batas kritis fisinya.',
              'U-238 adalah gas tidak stabil yang tidak dapat mempertahankan struktur kisi kristal padat pada bahan bakar.',
              'U-235 memiliki nol proton, sehingga meniadakan gaya tolak penghalang Coulomb sepenuhnya.',
              'Neutron termal bergerak terlalu cepat untuk berinteraksi dengan inti berat Uranium-238.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'U-235 (92 protons, 143 neutrons) has an unpaired neutron. Absorbing an incident neutron pairs the spins, yielding ~6.5 MeV of excitation energy, exceeding the ~5.8 MeV fission barrier. For U-238 (even-even), absorbing a neutron forms an odd-neutron state yielding only ~4.8 MeV, below its 6.0 MeV fission threshold.',
            id: 'U-235 (92 proton, 143 neutron) memiliki neutron tidak berpasangan. Penyerapan satu neutron menjadikannya berpasangan, melepaskan energi eksitasi ~6,5 MeV yang melampaui ambang fisi ~5,8 MeV. Pada U-238 (genap-genap), penyerapan neutron menghasilkan keadaan ganjil yang hanya melepaskan ~4,8 MeV, di bawah ambang fisi 6,0 MeV.',
          },
        },
        {
          id: 'nuc-1-q2',
          question: {
            en: 'What fraction of total fission energy is released as prompt kinetic energy of the heavy fission fragments?',
            id: 'Berapa fraksi total energi fisi yang dilepaskan sebagai energi kinetik serentak dari fragmen-fragmen fisi berat?',
          },
          options: {
            en: [
              'Approximately 80% to 85% (~168–170 MeV)',
              'Less than 15% (~30 MeV)',
              'Exactly 50% (~100 MeV)',
              '100% of all energy is carried exclusively by prompt neutrons',
            ],
            id: [
              'Kira-kira 80% hingga 85% (~168–170 MeV)',
              'Kurang dari 15% (~30 MeV)',
              'Tepat 50% (~100 MeV)',
              '100% dari seluruh energi hanya dibawa oleh neutron serentak',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The kinetic energy of the heavy, highly ionized fission fragments accounts for ~168–170 MeV out of the ~202.5 MeV total energy released per fission event, deposited locally within micrometers inside the fuel pellet.',
            id: 'Energi kinetik fragmen fisi berat yang terionisasi tinggi menyumbang ~168–170 MeV dari total ~202,5 MeV energi yang dilepaskan per peristiwa fisi, dan terdeposit secara lokal dalam rentang mikrometer di dalam pelet bahan bakar.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: REACTOR PHYSICS & HOW A NUCLEAR REACTOR WORKS
    // -------------------------------------------------------------
    {
      id: 'nuc-mod-2',
      topicId: 'nuclear-reactor',
      order: 2,
      title: {
        en: 'Reactor Physics, Criticality & Operational Mechanics',
        id: 'Fisika Reaktor, Kekritisan & Mekanika Operasional',
      },
      shortDescription: {
        en: 'The nuclear chain reaction, six-factor criticality formula, delayed neutrons, reactivity control, and thermal hydraulics.',
        id: 'Reaksi berantai nuklir, formula kekritisan enam-faktor, neutron kasip, kendali reaktivitas, dan termal hidraulik.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'nuclear-reactor-lab',
      sections: [
        {
          id: 'nuc-2-sec-1',
          title: {
            en: '1. The Effective Multiplication Factor (k_eff) & Six-Factor Formula',
            id: '1. Faktor Multiplikasi Efektif (k_eff) & Formula Enam-Faktor',
          },
          content: {
            en: 'A nuclear reactor operates by maintaining a self-sustaining chain reaction. The core neutron balance across generations is quantified by the effective neutron multiplication factor (k_eff):\n\n• Subcritical (k_eff < 1.0): More neutrons are lost to absorption and parasitic leakage than produced; neutron flux and thermal power decline exponentially to zero.\n• Critical (k_eff = 1.0): Exactly one neutron from each fission event induces a subsequent fission in the next generation. Core power remains perfectly steady and stable.\n• Supercritical (k_eff > 1.0): Neutron population and power grow exponentially.\n\nIn finite commercial reactor cores, k_eff is calculated using the classic Six-Factor Formula: k_eff = η · f · p · ε · P_FNL · P_TNL, which accounts for both infinite-medium neutron physics (four factors) and geometric leakage probabilities.',
            id: 'Reaktor nuklir beroperasi dengan mempertahankan reaksi berantai yang mandiri. Keseimbangan populasi neutron antar generasi teras diukur oleh faktor multiplikasi neutron efektif (k_eff):\n\n• Subkritis (k_eff < 1,0): Jumlah neutron yang hilang akibat serapan dan kebocoran parasitik melebihi yang diproduksi; fluks neutron dan daya termal menurun eksponensial menuju nol.\n• Kritis (k_eff = 1,0): Tepat satu neutron dari setiap peristiwa fisi yang memicu fisi berikutnya pada generasi penerus. Daya teras konstan dan stabil secara sempurna.\n• Superkritis (k_eff > 1,0): Populasi neutron dan daya teras bertumbuh secara eksponensial.\n\nPada teras reaktor komersial berdimensi terhingga, k_eff dihitung menggunakan Formula Enam-Faktor klasik: k_eff = η · f · p · ε · P_FNL · P_TNL, yang memperhitungkan fisika neutron medium tak-hingga (empat faktor) serta probabilitas kebocoran geometris.',
          },
          formula: 'k_{\\text{eff}} = \\eta \\cdot f \\cdot p \\cdot \\epsilon \\cdot P_{\\text{FNL}} \\cdot P_{\\text{TNL}}',
          formulaExplanation: {
            en: 'The Six-Factor Criticality Formula. In an infinite medium, k_∞ = η · f · p · ε (the Four-Factor formula). In a physical core, leakage factors P_FNL (fast non-leakage probability) and P_TNL (thermal non-leakage probability) scale the effective multiplication factor down.',
            id: 'Formula Kekritisan Enam-Faktor. Pada medium tak-hingga, k_∞ = η · f · p · ε (formula empat-faktor). Pada teras fisik nyata, faktor probabilitas tidak bocor cepat P_FNL dan tidak bocor termal P_TNL menurunkan nilai faktor multiplikasi efektif.',
          },
          variables: [
            {
              symbol: 'k_{\\text{eff}}',
              name: { en: 'Effective Multiplication Factor', id: 'Faktor Multiplikasi Efektif' },
              unit: 'dimensionless',
              description: {
                en: 'Ratio of neutrons in generation (n+1) to neutrons in generation n.',
                id: 'Rasio jumlah neutron pada generasi (n+1) terhadap neutron pada generasi n.',
              },
            },
            {
              symbol: '\\eta',
              name: { en: 'Thermal Reproduction Factor', id: 'Faktor Reproduksi Termal' },
              unit: 'neutrons/absorption',
              description: {
                en: 'Average number of fission neutrons produced per thermal neutron absorbed in fuel.',
                id: 'Rata-rata jumlah neutron fisi yang diproduksi per neutron termal yang diserap bahan bakar.',
              },
            },
            {
              symbol: 'f',
              name: { en: 'Thermal Utilization Factor', id: 'Faktor Pemanfaatan Termal' },
              unit: 'dimensionless',
              description: {
                en: 'Probability that a thermal neutron is absorbed in fuel rather than coolant, cladding, or moderator.',
                id: 'Probabilitas bahwa neutron termal diserap oleh bahan bakar dan bukan oleh pendingin, kelongsong, atau moderator.',
              },
            },
            {
              symbol: 'p',
              name: { en: 'Resonance Escape Probability', id: 'Probabilitas Lolos Resonansi' },
              unit: 'dimensionless',
              description: {
                en: 'Fraction of fast neutrons that slow down to thermal energy without capture in U-238 resonance peaks.',
                id: 'Fraksi neutron cepat yang berhasil melambat ke energi termal tanpa tertangkap di puncak resonansi U-238.',
              },
            },
            {
              symbol: '\\epsilon',
              name: { en: 'Fast Fission Factor', id: 'Faktor Fisi Cepat' },
              unit: 'dimensionless',
              description: {
                en: 'Ratio of total fission neutrons (including fast fission of U-238) to neutrons from thermal fission alone (~1.03–1.08).',
                id: 'Rasio total neutron fisi (termasuk fisi cepat U-238) terhadap neutron dari fisi termal saja (~1,03–1,08).',
              },
            },
          ],
          derivationSteps: [
            {
              title: {
                en: 'Step 1: Infinite Medium Multiplication (Four Factors)',
                id: 'Langkah 1: Multiplikasi Medium Tak-Hingga (Empat Faktor)',
              },
              math: 'k_\\infty = \\epsilon \\cdot p \\cdot f \\cdot \\eta',
              explanation: {
                en: 'Starting with 1 thermal neutron absorbed in fuel: η fast neutrons are born. Fast fission factor ε boosts this to εη. Resonance escape probability p filters this to εηp thermal neutrons. Thermal utilization f ensures εηpf are absorbed in fuel, completing the generation.',
                id: 'Dimulai dari 1 neutron termal diserap bahan bakar: lahir η neutron cepat. Faktor fisi cepat ε melipatgandakannya menjadi εη. Probabilitas lolos resonansi p meloloskan εηp neutron termal. Pemanfaatan termal f memastikan εηpf diserap kembali oleh bahan bakar.',
              },
            },
            {
              title: {
                en: 'Step 2: Accounting for Core Geometric Leakage',
                id: 'Langkah 2: Memperhitungkan Kebocoran Geometris Teras',
              },
              math: 'P_{\\text{FNL}} = \\frac{1}{1 + L_f^2 B_g^2}, \\quad P_{\\text{TNL}} = \\frac{1}{1 + L_{\\text{th}}^2 B_g^2}',
              explanation: {
                en: 'Geometric buckling B_g² reflects core surface-to-volume ratio, while diffusion lengths L_f and L_th determine migration distances. Larger core volumes minimize leakage and maximize k_eff.',
                id: 'Buckling geometris B_g² mencerminkan rasio luas permukaan terhadap volume teras, sedangkan panjang difusi L_f dan L_th menentukan jarak migrasi. Volume teras yang lebih besar meminimalkan kebocoran dan memaksimalkan k_eff.',
              },
            },
          ],
        },
        {
          id: 'nuc-2-sec-2',
          title: {
            en: '2. Delayed Neutrons, Reactor Kinetics & The Inhour Equation',
            id: '2. Neutron Kasip, Kinetika Reaktor & Persamaan Inhour',
          },
          content: {
            en: 'Without delayed neutrons, safe physical control of a commercial nuclear reactor would be physically impossible:\n\n• Prompt Neutrons: Emitted within 10⁻¹⁴ seconds of fission. The mean prompt neutron lifetime in a thermal reactor is Λ ≈ 10⁻⁴ seconds (and as brief as 10⁻⁷ seconds in fast reactors). If a reactor were supercritical on prompt neutrons alone, core power would double every few milliseconds—far too rapid for mechanical control rod actuators or computer systems to arrest.\n• Delayed Neutrons: A small fraction (β ≈ 0.0065 for U-235, or 0.65%) of neutrons are emitted by radioactive fission product precursors (such as Bromine-87 and Iodine-137) following beta decay. Their emission is delayed by seconds to minutes (average precursor half-life t_d ≈ 12.7 seconds). This effectively stretches the reactor period from milliseconds to tens of seconds, providing ample time for mechanical and thermal control.\n• Prompt Criticality Threshold: If reactivity ρ = (k_eff - 1)/k_eff reaches or exceeds the delayed neutron fraction β (ρ ≥ β, or 1.0 dollar of reactivity), the reactor becomes prompt critical, resulting in an uncontrollable, explosive power excursion (the physical condition that occurred at Chernobyl). Commercial reactors are strictly engineered and licensed to operate within the "delayed critical" regime (0 < ρ < β).',
            id: 'Tanpa keberadaan neutron kasip (delayed neutrons), kendali fisis reaktor nuklir komersial secara aman akan mustahil dilakukan:\n\n• Neutron Serentak: Dipancarkan dalam rentang 10⁻¹⁴ detik setelah fisi. Masa hidup rata-rata neutron serentak pada reaktor termal adalah Λ ≈ 10⁻⁴ detik (dan bahkan sesingkat 10⁻⁷ detik pada reaktor cepat). Jika reaktor beroperasi superkritis hanya dengan neutron serentak, daya teras akan berlipat ganda setiap beberapa milidetik—jauh melampaui kemampuan aktuator mekanis batang kendali atau sistem komputer tercepat.\n• Neutron Kasip: Sebagian kecil fraksi (β ≈ 0,0065 untuk U-235, atau 0,65%) neutron dipancarkan oleh prekursor produk fisi radioaktif (seperti Bromin-87 dan Iodin-137) setelah mengalami peluruhan beta. Pemancarannya tertunda selama beberapa detik hingga menit (waktu paruh rata-rata prekursor t_d ≈ 12,7 detik). Fenomena ini secara efektif memperpanjang periode reaktor dari milidetik menjadi puluhan detik, menyediakan waktu yang sangat leluasa bagi pengendalian mekanis dan termal.\n• Ambang Kekritisan Serentak: Jika reaktivitas ρ = (k_eff - 1)/k_eff mencapai atau melampaui fraksi neutron kasip β (ρ ≥ β, atau 1,0 dollar reaktivitas), reaktor memasuki kondisi kritis serentak (prompt critical), memicu lonjakan daya eksplosif yang tak terkendali (kondisi yang terjadi pada bencana Chernobyl). Reaktor komersial dirancang dan diatur secara ketat untuk hanya beroperasi di zona "kritis kasip" (0 < ρ < β).',
          },
          formula: '\\rho = \\frac{\\Lambda}{T} + \\sum_{i=1}^{6} \\frac{\\beta_i}{1 + \\lambda_i T}',
          formulaExplanation: {
            en: 'The Inhour Equation relating reactor reactivity ρ to stable reactor asymptotic period T. Here, Λ is prompt generation time, β_i represents the six delayed neutron precursor group yields, and λ_i denotes their decay constants.',
            id: 'Persamaan Inhour yang menghubungkan reaktivitas reaktor ρ dengan periode asimtotik reaktor T. Di sini, Λ adalah waktu pembentukan neutron serentak, β_i adalah yield dari enam kelompok prekursor neutron kasip, dan λ_i adalah konstanta peluruhannya.',
          },
        },
        {
          id: 'nuc-2-sec-3',
          title: {
            en: '3. Reactivity Control Mechanisms & Thermal-Hydraulic Loops',
            id: '3. Mekanisme Kendali Reaktivitas & Loop Termal-Hidraulik',
          },
          content: {
            en: 'Commercial nuclear power plants balance fission kinetics with thermodynamic heat extraction via multi-layered control systems:\n\n1. Control Rods: Neutron-absorbing materials (Boron Carbide B₄C, Silver-Indium-Cadmium alloys, or Hafnium) configured into clusters that insert vertically into guide thimbles between fuel assemblies. Inserting rods increases parasitic thermal absorption, driving k_eff < 1.0; withdrawing rods raises reactivity.\n2. Chemical Shim: In Pressurized Water Reactors (PWRs), soluble boric acid (H₃BO₃) is dissolved directly into the primary coolant water. The concentration of dissolved Boron-10 (a strong thermal neutron absorber with σ_a ≈ 3,840 barns) is gradually adjusted over the 18-to-24-month fuel cycle to compensate for progressive fuel burnup and fissile depletion.\n3. Burnable Poisons: Solid neutron absorbers (Gadolinium Oxide Gd₂O₃ or Erbium) integrated directly into fuel pellets. They absorb excess reactivity in fresh fuel cores and burn out at roughly the same rate as U-235 depletes, maintaining a flat reactivity profile across operating cycles.\n4. Primary & Secondary Thermal Loops: In a standard indirect cycle (PWR), the primary loop maintains water under high pressure (~15.5 MPa) to prevent bulk boiling at temperatures of 315°C–325°C. Hot coolant flows through U-tube steam generators, transferring heat across Inconel alloy tube walls to the lower-pressure secondary loop (~6 MPa), boiling secondary water into dry saturated steam that spins high-pressure and low-pressure steam turbines coupled to an electrical generator.',
            id: 'Pembangkit listrik tenaga nuklir komersial menyeimbangkan kinetika fisi dengan ekstraksi panas termodinamika melalui sistem kendali berlapis:\n\n1. Batang Kendali: Material penyerap neutron kuat (Boron Karbida B₄C, paduan Perak-Indium-Kadmium, atau Hafnium) yang disusun dalam kluster dan dimasukkan secara vertikal ke dalam tabung pemandu di antara bundel bahan bakar. Memasukkan batang kendali meningkatkan serapan parasitik termal dan menurunkan k_eff < 1,0; menariknya akan menaikkan reaktivitas.\n2. Chemical Shim: Pada Reaktor Air Bertekanan (PWR), asam borat terlarut (H₃BO₃) dicampurkan langsung ke dalam air pendingin primer. Konsentrasi Boron-10 terlarut (penyerap neutron termal dengan σ_a ≈ 3.840 barn) diatur bertahap sepanjang siklus bahan bakar 18–24 bulan untuk mengompensasi penipisan bahan bakar fisil.\n3. Racun Bakar (Burnable Poisons): Penyerap neutron padat (Gadolinium Oksida Gd₂O₃ atau Erbium) yang diintegrasikan langsung ke dalam pelet bahan bakar. Racun ini menyerap kelebihan reaktivitas pada teras bahan bakar baru dan habis terbakar (burn out) seiring laju konsumsi U-235, menjaga kestabilan profil reaktivitas sepanjang siklus operasi.\n4. Loop Termal Primer & Sekunder: Pada siklus tidak langsung standar (PWR), loop primer menjaga air pada tekanan sangat tinggi (~15,5 MPa) untuk mencegah pendidihan ruah pada suhu 315°C–325°C. Pendingin panas mengalir melalui tabung generator uap (steam generator), mentransfer panas melintasi dinding tabung paduan Inconel ke loop sekunder bertekanan lebih rendah (~6 MPa), mendidihkan air sekunder menjadi uap kering yang memutar turbin uap untuk memutar generator listrik.',
          },
          derivationSteps: [
            {
              title: {
                en: 'Core Thermal Power Extraction Formulation',
                id: 'Formulasi Ekstraksi Daya Termal Teras',
              },
              math: '\\dot{Q}_{\\text{core}} = \\dot{m}_{\\text{coolant}} \\cdot c_p \\cdot \\left( T_{\\text{hot}} - T_{\\text{cold}} \\right)',
              explanation: {
                en: 'Primary thermal heat removal rate is the product of coolant mass flow rate, specific heat capacity, and temperature rise across the core (typically ΔT ≈ 30°C–40°C in a commercial 3,400 MWth PWR with ~18,000 kg/s flow).',
                id: 'Laju pembuangan panas termal primer adalah hasil kali laju aliran massa pendingin, kapasitas panas spesifik, dan kenaikan suhu melintasi teras (biasanya ΔT ≈ 30°C–40°C pada PWR 3.400 MWth dengan aliran ~18.000 kg/s).',
              },
            },
          ],
        },
      ],
      keyTakeaways: {
        en: [
          'Criticality (k_eff = 1.0) maintains a perfectly stable neutron population; subcritical cores (k_eff < 1.0) shut down, while supercritical cores (k_eff > 1.0) ramp power.',
          'The Six-Factor formula determines k_eff from microscopic fuel properties (η, f, p, ε) and macroscopic core geometric leakage probabilities (P_FNL, P_TNL).',
          'Delayed neutrons (β ≈ 0.65% for U-235) stretch the effective reactor response period from milliseconds to tens of seconds, making physical reactor control possible.',
          'Reactivity control combines fast mechanical control rods (B₄C, Ag-In-Cd), variable chemical shim (soluble boric acid), and burnable poisons (Gd₂O₃).',
        ],
        id: [
          'Kekritisan (k_eff = 1,0) menjaga populasi neutron tetap stabil; teras subkritis (k_eff < 1,0) memadamkan daya, sedangkan teras superkritis (k_eff > 1,0) menaikkan daya.',
          'Formula Enam-Faktor menentukan k_eff dari sifat bahan bakar mikroskopis (η, f, p, ε) dan probabilitas kebocoran geometris teras makroskopis (P_FNL, P_TNL).',
          'Neutron kasip (β ≈ 0,65% untuk U-235) memperpanjang periode respons efektif reaktor dari milidetik menjadi puluhan detik, memungkinkan kendali fisis reaktor.',
          'Kendali reaktivitas menggabungkan batang kendali mekanis cepat (B₄C, Ag-In-Cd), chemical shim variabel (asam borat terlarut), dan racun bakar (Gd₂O₃).',
        ],
      },
      quiz: [
        {
          id: 'nuc-2-q1',
          question: {
            en: 'What dangerous physical condition occurs if reactivity ρ exceeds the delayed neutron fraction β (ρ ≥ β)?',
            id: 'Kondisi fisis berbahaya apa yang terjadi jika reaktivitas ρ melampaui fraksi neutron kasip β (ρ ≥ β)?',
          },
          options: {
            en: [
              'The reactor becomes prompt critical, resulting in an uncontrolled exponential power rise within milliseconds.',
              'The coolant instantly freezes into solid ice due to endothermic absorption.',
              'The nuclear chain reaction immediately terminates because neutrons become too cold.',
              'The control rods are automatically ejected upwards by negative magnetic pressure.',
            ],
            id: [
              'Reaktor memasuki kondisi kritis serentak (prompt critical), memicu lonjakan daya eksponensial tak terkendali dalam hitungan milidetik.',
              'Pendingin langsung membeku menjadi es padat akibat penyerapan endotermik.',
              'Reaksi berantai nuklir seketika berhenti karena neutron menjadi terlalu dingin.',
              'Batang kendali secara otomatis terlempar ke atas oleh tekanan magnetik negatif.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'When ρ ≥ β, the reactor achieves criticality solely on prompt neutrons, bypassing the calming delayed neutron lifetime. The reactor period collapses from tens of seconds to milliseconds, causing catastrophic thermal runaway.',
            id: 'Ketika ρ ≥ β, reaktor mencapai kekritisan murni hanya dengan neutron serentak tanpa menunggu waktu tunda neutron kasip. Periode reaktor runtuh dari puluhan detik menjadi milidetik, memicu lonjakan termal katastropik.',
          },
        },
        {
          id: 'nuc-2-q2',
          question: {
            en: 'What is the primary operational purpose of soluble boric acid (chemical shim) in a commercial PWR primary coolant?',
            id: 'Apa tujuan operasional utama penambahan asam borat terlarut (chemical shim) pada pendingin primer PWR komersial?',
          },
          options: {
            en: [
              'To compensate for slow, long-term fuel burnup and fissile U-235 depletion across the multi-month operating cycle without requiring deeply inserted control rods.',
              'To lubricate the primary coolant pump impeller bearings at high temperatures.',
              'To chemically dissolve zirconium oxide scale from the fuel rod cladding.',
              'To color the water green so leaks can be spotted with the naked eye.',
            ],
            id: [
              'Untuk mengompensasi konsumsi bahan bakar jangka panjang dan penipisan U-235 sepanjang siklus operasi multi-bulan tanpa perlu menancapkan batang kendali terlalu dalam.',
              'Untuk melumasi bantalan impeler pompa pendingin primer pada suhu tinggi.',
              'Untuk melarutkan kerak zirkonium oksida secara kimiawi dari kelongsong batang bahan bakar.',
              'Untuk mewarnai air menjadi hijau agar kebocoran dapat dilihat langsung dengan mata telanjang.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Boron-10 is a strong thermal neutron absorber. Gradually decreasing boron concentration over the 18–24 month cycle offsets fissile fuel consumption, maintaining an even neutron flux profile without distorting power shapes with physical control rods.',
            id: 'Boron-10 adalah penyerap neutron termal yang sangat kuat. Menurunkan konsentrasi boron secara bertahap selama siklus 18–24 bulan mengimbangi pengurangan bahan bakar fisil, menjaga kerataan fluks neutron tanpa mendistorsi profil daya dengan batang kendali fisik.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 3: EVOLUTION OF REACTOR TYPES: PAST AND TODAY
    // -------------------------------------------------------------
    {
      id: 'nuc-mod-3',
      topicId: 'nuclear-reactor',
      order: 3,
      title: {
        en: 'Evolution of Reactor Types: Historical Pioneers to Modern Fleets',
        id: 'Evolusi Tipe Reaktor: Perintis Sejarah hingga Armada Modern',
      },
      shortDescription: {
        en: 'Comparative analysis of Gen-I prototypes and Gen-II/III commercial fleets: PWR, BWR, CANDU/PHWR, AGR, and RBMK.',
        id: 'Analisis komparatif prototipe Gen-I dan armada komersial Gen-II/III: PWR, BWR, CANDU/PHWR, AGR, dan RBMK.',
      },
      durationMinutes: 26,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'nuclear-reactor-lab',
      sections: [
        {
          id: 'nuc-3-sec-1',
          title: {
            en: '1. Generation I Pioneers & The Birth of Commercial Nuclear Power',
            id: '1. Perintis Generasi I & Lahirnya Daya Nuklir Komersial',
          },
          content: {
            en: 'The transition from wartime experimental piles to civilian power reactors occurred in the 1950s and 1960s (Generation I):\n\n• Chicago Pile-1 (1942) and X-10 Graphite Reactor (1943): Proof-of-concept uncooled or air-cooled graphite-moderated piles validating self-sustaining chain reactions and plutonium production.\n• Obninsk AM-1 (USSR, 1954): The world\'s first grid-connected nuclear power station (5 MWe), using graphite moderation and water cooling.\n• Shippingport Atomic Power Station (USA, 1957): The world\'s first full-scale commercial nuclear power plant (60 MWe), adapted from the U.S. Navy\'s pressurized water reactor propulsion program developed by Admiral Hyman Rickover for the submarine USS Nautilus (SSN-571).\n• Magnox (UK, 1956): First British commercial reactors (Calder Hall), utilizing natural uranium metal fuel clad in magnesium-aluminum alloy ("Magnox"), carbon dioxide gas coolant, and graphite moderation.',
            id: 'Transisi dari reaktor eksperimental masa perang ke reaktor daya sipil terjadi pada dekade 1950-an dan 1960-an (Generasi I):\n\n• Chicago Pile-1 (1942) dan X-10 Graphite Reactor (1943): Reaktor grafit tanpa pendingin atau berpendingin udara yang membuktikan kelayakan reaksi berantai mandiri dan produksi plutonium.\n• Obninsk AM-1 (Uni Soviet, 1954): Pembangkit listrik tenaga nuklir pertama di dunia yang tersambung ke jaringan listrik komersial (5 MWe), menggunakan moderator grafit dan pendingin air.\n• Shippingport Atomic Power Station (AS, 1957): PLTN komersial skala penuh pertama di dunia (60 MWe), diadopsi dari program propulsi reaktor air bertekanan Angkatan Laut AS yang dikembangkan oleh Laksamana Hyman Rickover untuk kapal selam USS Nautilus (SSN-571).\n• Magnox (Inggris, 1956): Reaktor komersial pertama Inggris (Calder Hall), memanfaatkan bahan bakar logam uranium alam berselubung paduan magnesium-aluminium ("Magnox"), pendingin gas karbon dioksida, dan moderator grafit.',
          },
        },
        {
          id: 'nuc-3-sec-2',
          title: {
            en: '2. Commercial Light Water Reactors: PWR vs. BWR',
            id: '2. Reaktor Air Biasa (LWR) Komersial: PWR vs. BWR',
          },
          content: {
            en: 'Today, Light Water Reactors (LWR) generate over 80% of the world\'s nuclear electricity, categorized into two dominant thermodynamic configurations:\n\n• Pressurized Water Reactor (PWR, ~68% of global fleet):\n  - Utilizes ordinary purified water (H₂O) simultaneously as coolant and moderator.\n  - Operates under immense primary pressure (15.5 MPa, ~153 atmospheres) to prevent bulk boiling even at 325°C.\n  - Dual-loop indirect Rankine cycle: Primary coolant transfers energy to a distinct secondary loop through massive steam generators. Radioactive primary water is strictly isolated inside containment; the steam driving the turbine is non-radioactive.\n  - Key designs: Westinghouse AP1000, Framatome EPR, Rosatom VVER-1200, Mitsubishi APWR, KEPCO APR-1400.\n\n• Boiling Water Reactor (BWR, ~15% of global fleet):\n  - Utilizes a direct single-loop Rankine cycle. Primary water operates at lower pressure (7.0 MPa, ~70 atmospheres), allowing bulk boiling directly inside the reactor pressure vessel.\n  - Steam separators and steam dryers located above the core separate saturated steam from liquid moisture before routing dry steam straight to the turbine.\n  - Eliminates external steam generators and pressurizers, reducing capital costs. However, steam driving the turbine contains short-lived radioactive nitrogen-16 (N-16, half-life 7.1 seconds), requiring radiation shielding around turbine halls during operation.\n  - Key designs: GE Hitachi BWR/6, ABWR (Advanced BWR), and ESBWR (Economic Simplified BWR).',
            id: 'Saat ini, Reaktor Air Biasa (Light Water Reactor / LWR) memproduksi lebih dari 80% listrik nuklir dunia, terbagi menjadi dua konfigurasi termodinamika utama:\n\n• Reaktor Air Bertekanan (PWR, ~68% armada global):\n  - Memanfaatkan air murni biasa (H₂O) sekaligus sebagai pendingin dan moderator.\n  - Beroperasi pada tekanan primer sangat tinggi (15,5 MPa, ~153 atmosfer) untuk mencegah pendidihan ruah bahkan pada suhu 325°C.\n  - Siklus Rankine tidak langsung dua loop: Pendingin primer mentransfer energi ke loop sekunder terpisah melalui steam generator raksasa. Air primer yang bersifat radioaktif terisolasi ketat di dalam kubah penahan; uap yang memutar turbin tidak terkontaminasi radioaktif.\n  - Desain terkemuka: Westinghouse AP1000, Framatome EPR, Rosatom VVER-1200, Mitsubishi APWR, KEPCO APR-1400.\n\n• Reaktor Air Mendidih (BWR, ~15% armada global):\n  - Menggunakan siklus Rankine langsung satu loop. Air primer beroperasi pada tekanan lebih rendah (7,0 MPa, ~70 atmosfer), memungkinkan terjadinya pendidihan langsung di dalam bejana reaktor.\n  - Separator uap dan pengering uap yang terpasang di atas teras memisahkan uap jenuh dari butiran air sebelum dialirkan langsung menuju turbin.\n  - Meniadakan steam generator eksternal dan pressurizer, sehingga memangkas biaya konstruksi modal. Namun, uap yang memutar turbin mengandung isotop radioaktif berumur pendek Nitrogen-16 (N-16, waktu paruh 7,1 detik), sehingga gedung turbin memerlukan perisai radiasi selama operasi.\n  - Desain terkemuka: GE Hitachi BWR/6, ABWR (Advanced BWR), dan ESBWR.',
          },
          formula: '\\eta_{\\text{th}} = \\frac{W_{\\text{net}}}{\\dot{Q}_{\\text{in}}} \\le 1 - \\frac{T_{\\text{cold}}}{T_{\\text{hot}}}',
          formulaExplanation: {
            en: 'Thermal cycle conversion efficiency governed by the Second Law of Thermodynamics (Carnot upper bound). Pressurized and boiling water reactors operate with core outlet temperatures near 285°C–325°C yielding ~33%–34% net electrical efficiency, whereas high-temperature gas reactors (AGR, VHTR) reaching 650°C–900°C achieve 42%–50% efficiency.',
            id: 'Efisiensi konversi siklus termal yang dibatasi oleh Hukum Kedua Termodinamika (batas atas Carnot). Reaktor air mendidih dan bertekanan beroperasi dengan suhu keluaran 285°C–325°C menghasilkan efisiensi listrik netto ~33%–34%, sedangkan reaktor gas suhu tinggi (AGR, VHTR) yang mencapai 650°C–900°C meraih efisiensi 42%–50%.',
          },
          variables: [
            {
              symbol: '\\eta_{\\text{th}}',
              name: { en: 'Thermal Efficiency', id: 'Efisiensi Termal' },
              unit: 'dimensionless (ratio)',
              description: {
                en: 'Fraction of reactor thermal power converted into net mechanical/electrical work.',
                id: 'Fraksi daya termal reaktor yang berhasil diubah menjadi kerja mekanik/listrik netto.',
              },
            },
            {
              symbol: 'W_{\\text{net}}',
              name: { en: 'Net Electrical Work Output', id: 'Kerja Listrik Netto Keluaran' },
              unit: 'MWe',
              description: {
                en: 'Net electrical power delivered to the external power grid.',
                id: 'Daya listrik netto yang dialirkan menuju jaringan transmisi listrik.',
              },
            },
            {
              symbol: '\\dot{Q}_{\\text{in}}',
              name: { en: 'Core Thermal Heat Input', id: 'Masukan Panas Termal Teras' },
              unit: 'MWth',
              description: {
                en: 'Total nuclear fission thermal power generated inside the reactor core.',
                id: 'Total daya panas fisi nuklir yang dibangkitkan di dalam teras reaktor.',
              },
            },
            {
              symbol: 'T_{\\text{hot}}',
              name: { en: 'Peak Cycle Temperature', id: 'Suhu Puncak Siklus' },
              unit: 'K',
              description: {
                en: 'Core coolant outlet temperature in Kelvin.',
                id: 'Suhu keluaran fluida pendingin teras dalam Kelvin.',
              },
            },
            {
              symbol: 'T_{\\text{cold}}',
              name: { en: 'Condenser Heat Sink Temperature', id: 'Suhu Pembuangan Panas Kondensor' },
              unit: 'K',
              description: {
                en: 'Cooling tower or ocean heat rejection temperature in Kelvin (~300 K).',
                id: 'Suhu pembuangan panas kondensor atau menara pendingin dalam Kelvin (~300 K).',
              },
            },
          ],
        },
        {
          id: 'nuc-3-sec-3',
          title: {
            en: '3. Heavy Water (CANDU), Gas-Cooled (AGR), and Graphite Channel (RBMK) Systems',
            id: '3. Reaktor Air Berat (CANDU), Berpendingin Gas (AGR), dan Kanal Grafit (RBMK)',
          },
          content: {
            en: 'Beyond light water systems, distinct national engineering strategies produced alternative reactor architectures:\n\n• Pressurized Heavy Water Reactor (PHWR / CANDU - Canada):\n  - Uses Deuterium Oxide (D₂O, heavy water) as both moderator and coolant. Deuterium has a thermal neutron capture cross-section of only 0.00052 barns (compared to 0.332 barns for hydrogen in H₂O)—over 600 times lower parasitic absorption.\n  - This extraordinary neutron economy enables CANDU reactors to run on unenriched natural uranium (0.71% U-235), completely bypassing uranium enrichment infrastructure.\n  - Core consists of a low-pressure calandria vessel penetrated by hundreds of horizontal pressurized fuel channels (pressure tubes), allowing on-line refueling while the reactor operates at 100% full power.\n\n• Advanced Gas-Cooled Reactor (AGR - UK):\n  - Carbon dioxide (CO₂) gas coolant at 4.1 MPa, graphite moderator, and stainless steel clad fuel.\n  - Operates at high core outlet temperatures (~650°C), achieving high thermal efficiency (~40–42%, the highest among commercial fleets).\n\n• High-Power Channel Reactor (RBMK - USSR):\n  - Graphite moderator blocks with individual vertical pressure tubes cooled by boiling light water.\n  - Critical flaw: positive void coefficient of reactivity under low power conditions. When water boiled or was lost, loss of neutron absorption in water caused reactivity to surge rather than decline. Combined with control rods that had graphite displacer tips (which momentarily inserted positive reactivity upon initial insertion), this fatal design flaw directly triggered the catastrophic explosion at Chernobyl Unit 4 in 1986.',
            id: 'Di luar sistem air biasa, strategi rekayasa nasional yang berbeda melahirkan arsitektur reaktor alternatif:\n\n• Reaktor Air Berat Bertekanan (PHWR / CANDU - Kanada):\n  - Menggunakan Deuterium Oksida (D₂O, air berat) sebagai moderator dan pendingin. Deuterium memiliki penampang lintang serapan neutron termal hanya 0,00052 barn (dibandingkan 0,332 barn pada hidrogen dalam H₂O)—lebih dari 600 kali lebih rendah serapan parasitiknya.\n  - Efisiensi neutron yang luar biasa ini memungkinkan reaktor CANDU berbahan bakar uranium alam tanpa pengayaan (0,71% U-235), meniadakan ketergantungan pada fasilitas pengayaan uranium.\n  - Terasnya berupa tangki calandria bertekanan rendah yang ditembus oleh ratusan tabung tekan bahan bakar horizontal, memungkinkan penggantian bahan bakar saat reaktor tetap beroperasi penuh (on-line refueling).\n\n• Advanced Gas-Cooled Reactor (AGR - Inggris):\n  - Pendingin gas karbon dioksida (CO₂) pada tekanan 4,1 MPa, moderator grafit, dan kelongsong baja tahan karat.\n  - Beroperasi pada suhu keluaran teras sangat tinggi (~650°C), menghasilkan efisiensi termal tertinggi di antara armada komersial (~40–42%).\n\n• Reaktor Kanal Berdaya Tinggi (RBMK - Uni Soviet):\n  - Blok moderator grafit dengan tabung tekan vertikal yang didinginkan oleh air biasa yang mendidih.\n  - Kelemahan fatal: koefisien reaktivitas kekosongan positif (positive void coefficient) pada daya rendah. Ketika air mendidih atau hilang, hilangnya serapan neutron oleh air justru menyebabkan reaktivitas melonjak naik. Dipadukan dengan ujung batang kendali berbahan grafit (yang justru menginjeksikan reaktivitas positif sesaat saat dimasukkan), cacat desain fatal inilah yang memicu ledakan katastropik Chernobyl Unit 4 pada tahun 1986.',
          },
          comparisonTable: {
            headers: {
              en: ['Reactor Type', 'Coolant', 'Moderator', 'Pressure (MPa)', 'Core Outlet (°C)', 'Efficiency (%)', 'Fuel Cycle'],
              id: ['Tipe Reaktor', 'Pendingin', 'Moderator', 'Tekanan (MPa)', 'Keluaran (°C)', 'Efisiensi (%)', 'Siklus Bahan Bakar'],
            },
            rows: [
              {
                en: ['PWR (Pressurized Water)', 'Light Water (H₂O)', 'Light Water (H₂O)', '15.5 MPa', '325°C', '33–34%', 'Enriched UO₂ (3–5% U-235)'],
                id: ['PWR (Air Bertekanan)', 'Air Biasa (H₂O)', 'Air Biasa (H₂O)', '15,5 MPa', '325°C', '33–34%', 'UO₂ Diperkaya (3–5% U-235)'],
              },
              {
                en: ['BWR (Boiling Water)', 'Light Water (H₂O)', 'Light Water (H₂O)', '7.0 MPa', '285°C', '33–34%', 'Enriched UO₂ (3–5% U-235)'],
                id: ['BWR (Air Mendidih)', 'Air Biasa (H₂O)', 'Air Biasa (H₂O)', '7,0 MPa', '285°C', '33–34%', 'UO₂ Diperkaya (3–5% U-235)'],
              },
              {
                en: ['PHWR (CANDU)', 'Heavy Water (D₂O)', 'Heavy Water (D₂O)', '10.0 MPa', '310°C', '30–32%', 'Natural Uranium (0.71% U-235)'],
                id: ['PHWR (CANDU)', 'Air Berat (D₂O)', 'Air Berat (D₂O)', '10,0 MPa', '310°C', '30–32%', 'Uranium Alam (0,71% U-235)'],
              },
              {
                en: ['AGR (Gas-Cooled)', 'Carbon Dioxide (CO₂)', 'Graphite', '4.1 MPa', '650°C', '40–42%', 'Enriched UO₂ (2.5–3.5% U-235)'],
                id: ['AGR (Pendingin Gas)', 'Karbon Dioksida (CO₂)', 'Grafit', '4,1 MPa', '650°C', '40–42%', 'UO₂ Diperkaya (2,5–3,5% U-235)'],
              },
              {
                en: ['RBMK (Graphite Channel)', 'Boiling Light Water', 'Graphite', '7.0 MPa', '284°C', '31%', 'Low-Enriched UO₂ (2.0–2.4% U-235)'],
                id: ['RBMK (Kanal Grafit)', 'Air Biasa Mendidih', 'Grafit', '7,0 MPa', '284°C', '31%', 'UO₂ Pengayaan Rendah (2,0–2,4% U-235)'],
              },
            ],
          },
          caseStudy: {
            title: {
              en: 'The French Messmer Plan (1974): Standardized Nuclear Fleet Buildout',
              id: 'Rencana Messmer Prancis (1974): Pembangunan Armada Nuklir Terstandarisasi',
            },
            context: {
              en: 'Following the 1973 global oil shock, French Prime Minister Pierre Messmer enacted a national energy security doctrine: "All Nuclear, All Electric". France committed to constructing dozens of standardized PWR units licensed from Westinghouse.',
              id: 'Menyusul krisis minyak global 1973, Perdana Menteri Prancis Pierre Messmer mencetuskan doktrin ketahanan energi nasional: "Semua Nuklir, Semua Listrik". Prancis berkomitmen membangun puluhan unit PWR terstandarisasi di bawah lisensi Westinghouse.',
            },
            analysis: {
              en: 'By standardizing identical reactor series (CP0, CPY, P4, N4), Framatome and EDF achieved massive economies of scale, shortened licensing timelines, and cross-trained operations staff. France commissioned 56 commercial reactors in under 25 years, slashing fossil fuel reliance and generating over 70% of national electricity from nuclear energy with one of the lowest carbon intensities in the world (<50 g CO₂/kWh).',
              id: 'Dengan menstandarisasi seri reaktor yang identik (CP0, CPY, P4, N4), Framatome dan EDF mencapai skala ekonomi masif, mempersingkat perizinan, dan memfasilitasi rotasi operator. Prancis mengoperasikan 56 reaktor komersial dalam kurun waktu kurang dari 25 tahun, memangkas ketergantungan bahan bakar fosil dan memproduksi lebih dari 70% listrik nasional dari nuklir dengan intensitas karbon terendah di dunia (<50 g CO₂/kWh).',
            },
            takeaway: {
              en: 'Standardized fleet design dramatically reduces construction risks, capital expenditures, and regulatory overhead compared to bespoke one-off reactor projects.',
              id: 'Desain armada terstandarisasi secara drastis memangkas risiko konstruksi, biaya belanja modal, dan beban regulasi dibandingkan proyek reaktor kustom yang dibangun satu per satu.',
            },
          },
        },
      ],
      keyTakeaways: {
        en: [
          'PWRs dominate commercial nuclear generation (~68%), isolating radioactive coolant via an indirect two-loop Rankine cycle with high-pressure water (15.5 MPa).',
          'BWRs employ a direct single-loop cycle boiling water directly in the core at 7 MPa, eliminating steam generators but requiring turbine radiation shielding.',
          'CANDU reactors utilize heavy water (D₂O) moderation to operate on unenriched natural uranium with continuous on-line refueling.',
          'The Soviet RBMK design suffered from a dangerous positive void coefficient and graphite displacer tips, a critical design defect corrected in modern reactors.',
        ],
        id: [
          'PWR mendominasi pembangkitan nuklir komersial (~68%), mengisolasi pendingin radioaktif melalui siklus Rankine dua-loop tidak langsung bertekanan tinggi (15,5 MPa).',
          'BWR menerapkan siklus satu-loop langsung yang mendidihkan air di dalam teras pada 7 MPa, meniadakan steam generator namun memerlukan perisai radiasi turbin.',
          'Reaktor CANDU memanfaatkan moderasi air berat (D₂O) untuk beroperasi dengan uranium alam tanpa pengayaan serta penggantian bahan bakar on-line.',
          'Desain RBMK Soviet memiliki cacat koefisien kekosongan positif yang berbahaya dan ujung displacer grafit, kelemahan fatal yang telah diperbaiki pada reaktor modern.',
        ],
      },
      quiz: [
        {
          id: 'nuc-3-q1',
          question: {
            en: 'Why is a CANDU (PHWR) reactor capable of operating on unenriched natural uranium (0.71% U-235), whereas a PWR requires 3–5% enriched fuel?',
            id: 'Mengapa reaktor CANDU (PHWR) mampu beroperasi dengan uranium alam tanpa pengayaan (0,71% U-235), sedangkan PWR memerlukan pengayaan 3–5%?',
          },
          options: {
            en: [
              'Heavy water (D₂O) has an exceptionally low neutron capture cross-section, minimizing parasitic neutron losses and preserving criticality with natural fuel.',
              'CANDU reactors operate at zero Kelvin, freezing parasitic neutron motion.',
              'Natural uranium contains more U-235 in Canada than anywhere else on Earth.',
              'Heavy water produces electric sparks that artificially split uranium nuclei without neutrons.',
            ],
            id: [
              'Air berat (D₂O) memiliki penampang lintang serapan neutron yang sangat rendah, meminimalkan kehilangan neutron parasitik dan menjaga kekritisan dengan uranium alam.',
              'Reaktor CANDU beroperasi pada nol Kelvin, membekukan pergerakan neutron parasitik.',
              'Uranium alam memiliki konsentrasi U-235 yang lebih tinggi di Kanada dibandingkan wilayah lain di Bumi.',
              'Air berat menghasilkan percikan listrik yang membelah inti uranium secara buatan tanpa memerlukan neutron.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Deuterium captures ~600 times fewer thermal neutrons than ordinary hydrogen (0.00052 b vs 0.332 b). This high neutron economy allows k_eff ≥ 1.0 even with natural uranium\'s low 0.71% U-235 content.',
            id: 'Deuterium menyerap neutron termal ~600 kali lebih sedikit dibandingkan hidrogen biasa (0,00052 b vs 0,332 b). Efisiensi neutron yang sangat tinggi ini memungkinkan k_eff ≥ 1,0 tercapai meskipun kandungan U-235 uranium alam hanya 0,71%.',
          },
        },
        {
          id: 'nuc-3-q2',
          question: {
            en: 'What fundamental thermodynamic difference distinguishes a Boiling Water Reactor (BWR) from a Pressurized Water Reactor (PWR)?',
            id: 'Perbedaan termodinamika mendasar apa yang membedakan Reaktor Air Mendidih (BWR) dari Reaktor Air Bertekanan (PWR)?',
          },
          options: {
            en: [
              'A BWR boils water directly inside the reactor vessel in a single direct loop, whereas a PWR uses high pressure to prevent boiling and transfers heat to a separate secondary loop.',
              'A BWR uses liquid sodium instead of water.',
              'A PWR emits exhaust directly into the open atmosphere without any condenser.',
              'A BWR has no control rods and cannot be shut down.',
            ],
            id: [
              'BWR mendidihkan air langsung di dalam bejana reaktor dalam satu loop langsung, sedangkan PWR menggunakan tekanan tinggi untuk mencegah pendidihan dan mentransfer panas ke loop sekunder terpisah.',
              'BWR menggunakan natrium cair sebagai pengganti air.',
              'PWR membuang uap langsung ke atmosfer terbuka tanpa menggunakan kondensor.',
              'BWR tidak memiliki batang kendali dan tidak dapat dimatikan.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'BWRs operate at ~7 MPa, allowing steam generation directly inside the core to feed the turbine directly. PWRs operate at ~15.5 MPa to keep coolant liquid, transferring heat via steam generators to an isolated secondary loop.',
            id: 'BWR beroperasi pada tekanan ~7 MPa sehingga uap terbentuk langsung di dalam teras untuk memutar turbin. PWR beroperasi pada ~15,5 MPa untuk menjaga pendingin tetap cair, mentransfer panas melalui steam generator ke loop sekunder yang terisolasi.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 4: THE FUTURE OF NUCLEAR REACTORS (GEN IV, SMRs, FUSION)
    // -------------------------------------------------------------
    {
      id: 'nuc-mod-4',
      topicId: 'nuclear-reactor',
      order: 4,
      title: {
        en: 'The Future of Nuclear Energy: Gen IV, SMRs, Advanced Fuels & Fusion',
        id: 'Masa Depan Energi Nuklir: Gen IV, SMR, Bahan Bakar Mutakhir & Fusi',
      },
      shortDescription: {
        en: 'Generation IV International Forum architectures, Small Modular Reactors (SMRs), TRISO pebble beds, and fusion horizons.',
        id: 'Arsitektur Generation IV International Forum, Small Modular Reactor (SMR), bahan bakar TRISO pebble bed, dan horizon fusi.',
      },
      durationMinutes: 28,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'nuclear-reactor-lab',
      sections: [
        {
          id: 'nuc-4-sec-1',
          title: {
            en: '1. Generation IV International Forum (GIF) Architectures',
            id: '1. Arsitektur Reaktor Generation IV International Forum (GIF)',
          },
          content: {
            en: 'The Generation IV International Forum (GIF) coordinates international research on six revolutionary nuclear systems engineered to deliver enhanced safety, closed fuel cycles, high thermal efficiency, and non-electricity cogeneration:\n\n1. Very High Temperature Reactor (VHTR / HTGR):\n   - Coolant: Helium gas (inert, single-phase, zero chemical reactivity with core materials).\n   - Moderator: Graphite.\n   - Outlet Temperature: 850°C to 1000°C.\n   - Primary Application: High-efficiency electricity generation via direct Brayton gas turbine cycles and thermo-chemical hydrogen co-generation (iodine-sulfur or sulfur-iodine cycle) for green industrial decarbonization.\n\n2. Molten Salt Reactor (MSR / LFTR):\n   - Fuel/Coolant: Liquid fluoride or chloride salts (e.g., LiF-BeF₂ "FLiBe" carrying dissolved UF₄ or ThF₄).\n   - Low Pressure: Operates near atmospheric pressure (~0.1–0.5 MPa), completely eliminating high-pressure steam explosion hazards.\n   - Passive Safety: If core overheating occurs, an actively cooled solid "freeze plug" of salt melts, allowing the entire liquid fuel charge to drain by gravity into subcritical underground holding tanks fitted with passive decay cooling.\n\n3. Sodium-Cooled Fast Reactor (SFR):\n   - Coolant: Liquid sodium metal (high boiling point of 883°C, operates at atmospheric pressure).\n   - Unmoderated Fast Neutron Spectrum: Fissions long-lived transuranic waste (Americium, Curium, Neptunium) and breeds fissile Pu-239 from abundant U-238 (breeding ratio BR > 1.0), multiplying fuel utilization sixty-fold.\n\n4. Lead-Cooled Fast Reactor (LFR):\n   - Coolant: Molten lead or Lead-Bismuth Eutectic (LBE, 125°C melting point).\n   - Advantages: Chemically inert with air and water (unlike sodium, lead does not burn or react violently with water), high thermal inertia, and robust natural circulation.',
            id: 'Generation IV International Forum (GIF) mengoordinasikan riset internasional terhadap enam sistem reaktor revolusioner yang dirancang untuk menghadirkan keselamatan mandiri, siklus bahan bakar tertutup, efisiensi termal tinggi, dan kogenerasi non-kelistrikan:\n\n1. Reaktor Suhu Sangat Tinggi (VHTR / HTGR):\n   - Pendingin: Gas Helium (inert, fase tunggal, tanpa reaktivitas kimiawi terhadap material teras).\n   - Moderator: Grafit.\n   - Suhu Keluaran: 850°C hingga 1000°C.\n   - Aplikasi Utama: Pembangkitan listrik efisiensi tinggi melalui siklus turbin gas Brayton langsung serta kogenerasi hidrogen termokimia (siklus iodin-belerang) untuk dekarbonisasi industri berat.\n\n2. Reaktor Garam Cair (Molten Salt Reactor / MSR / LFTR):\n   - Bahan Bakar/Pendingin: Garam fluorida atau klorida cair (seperti LiF-BeF₂ "FLiBe" yang melarutkan UF₄ atau ThF₄).\n   - Tekanan Rendah: Beroperasi pada tekanan mendekati atmosferik (~0,1–0,5 MPa), sepenuhnya meniadakan risiko ledakan uap bertekanan tinggi.\n   - Keselamatan Pasif: Jika terjadi pemanasan berlebih, "freeze plug" garam beku yang didinginkan secara aktif akan meleleh, sehingga seluruh bahan bakar cair mengalir secara gravitasi ke tangki penampung subkritis bawah tanah dengan pendinginan pasif.\n\n3. Reaktor Cepat Berpendingin Natrium (SFR):\n   - Pendingin: Logam natrium cair (titik didih tinggi 883°C, beroperasi pada tekanan atmosfer).\n   - Spektrum Neutron Cepat Tanpa Moderator: Membelah limbah aktinida berumur panjang (Amerisium, Kurium, Neptunium) dan membiakkan Pu-239 dari U-238 (breeding ratio BR > 1,0), melipatgandakan efisiensi bahan bakar hingga 60 kali lipat.\n\n4. Reaktor Cepat Berpendingin Timbal (LFR):\n   - Pendingin: Timbal cair atau paduan Eutektik Timbal-Bismut (LBE, titik leleh 125°C).\n   - Keunggulan: Bersifat inert terhadap udara dan air (tidak terbakar saat kontak dengan air seperti natrium), inersia termal masif, dan sirkulasi alami yang andal.',
          },
        },
        {
          id: 'nuc-4-sec-2',
          title: {
            en: '2. Small Modular Reactors (SMRs) & Microreactors',
            id: '2. Small Modular Reactor (SMR) & Mikroreaktor',
          },
          content: {
            en: 'Small Modular Reactors (SMRs) represent a paradigm shift in nuclear civil engineering and project finance:\n\n• Modular Definition: Electrical power output ≤ 300 MWe per module (compared to 1,000–1,600 MWe for conventional gigawatt-scale plants).\n• Factory Fabrication: Complete reactor modules are manufactured and assembled under clean factory quality controls, transported to the site via rail, ship, or truck, and installed in modular underground vaults. This dramatically compresses construction timelines from 8–10 years down to 2–3 years.\n• Integral Reactor Pressure Vessel (iPWR): SMR designs like NuScale VOYGR, Holtec SMR-300, and Rolls-Royce SMR house the reactor core, steam generators, and pressurizer inside a single integrated pressure vessel. This completely eliminates large external primary coolant loop piping, removing the classic Large Break Loss-of-Coolant Accident (LBLOCA) initiator entirely from the design basis.\n• Microreactors (1–20 MWe): Ultra-compact systems (e.g., Westinghouse eVinci, US DOD Project Pele) utilizing solid-state heat pipes rather than circulating liquid coolant pumps. Heat pipes use capillary sodium or potassium wick evaporation to transport heat silently with zero moving parts, providing autonomous power for remote mining, off-grid communities, forward operating bases, and data centers.',
            id: 'Small Modular Reactor (SMR) menghadirkan perubahan paradigma besar dalam rekayasa sipil nuklir dan pembiayaan proyek:\n\n• Definisi Modular: Daya keluaran listrik ≤ 300 MWe per modul (dibandingkan 1.000–1.600 MWe pada PLTN skala gigawatt konvensional).\n• Fabrikasi Pabrik: Modul reaktor utuh diproduksi dan dirakit di pabrik dengan kendali mutu presisi, diangkut ke lokasi menggunakan kereta api, kapal laut, atau truk khusus, lalu dipasang di kubah bawah tanah. Pendekatan ini memangkas durasi konstruksi dari 8–10 tahun menjadi 2–3 tahun.\n• Integral Reactor Pressure Vessel (iPWR): Desain SMR seperti NuScale VOYGR, Holtec SMR-300, dan Rolls-Royce SMR mengintegrasikan teras reaktor, steam generator, dan pressurizer di dalam satu bejana tekan tunggal. Hal ini sepenuhnya meniadakan pipa sirkulasi primer eksternal berdiameter besar, mengeliminasi skenario kecelakaan Large Break LOCA dari dasar desain.\n• Mikroreaktor (1–20 MWe): Sistem ultra-kompak (seperti Westinghouse eVinci, US DOD Project Pele) yang memanfaatkan pipa kalor padat (heat pipes) tanpa pompa pendingin mekanis sirkulasi cair. Pipa kalor memanfaatkan penguapan kapiler natrium atau kalium untuk mentransfer panas secara hening tanpa komponen bergerak, menyuplai daya mandiri untuk pertambangan terpencil, pangkalan militer, dan pusat data AI.',
          },
        },
        {
          id: 'nuc-4-sec-3',
          title: {
            en: '3. TRISO Fuels, Thorium Cycle & Nuclear Fusion Horizons',
            id: '3. Bahan Bakar TRISO, Siklus Thorium & Horizon Fusi Nuklir',
          },
          content: {
            en: 'Advanced fuels and alternative cycles eliminate core meltdown physics at the material level:\n\n• TRISO (TRI-structural ISOtropic) Particle Fuel:\n  - Each fuel pebble or compact contains thousands of sub-millimeter uranium kernels (enriched to 15.5% U-235, HALEU).\n  - Coated with four concentric isotropic barriers: 1. Porous carbon buffer layer; 2. Inner Pyrolytic Carbon (IPyC); 3. Silicon Carbide (SiC) high-strength ceramic layer; 4. Outer Pyrolytic Carbon (OPyC).\n  - The Silicon Carbide barrier remains structurally intact and hermetically retains fission gases and radioactive isotopes up to >1,600°C—temperatures higher than any conceivable physical accident in a high-temperature gas-cooled reactor. TRISO is effectively "meltdown-proof" by physical construction.\n\n• Thorium Fuel Cycle (²³²Th → ²³³U):\n  - Earth possesses 3 to 4 times more thorium reserves than uranium.\n  - Thorium is purely fertile; when irradiated in a reactor, it captures a neutron and beta-decays to Uranium-233, an outstanding thermal fissile fuel (high reproduction factor η).\n  - Produces negligible long-lived transuranic actinides (plutonium, americium, curium), reducing high-level waste storage timescales from 300,000 years down to under 300 years.\n\n• Nuclear Fusion Horizons & Hybrid Systems:\n  - Deuterium-Tritium (D-T) fusion: ²H + ³H → ⁴He (3.5 MeV) + n (14.1 MeV).\n  - Magnetic Confinement Fusion (Tokamaks like ITER, SPARC using High-Temperature Superconducting REBCO magnets; Stellarators like Wendelstein 7-X) and Inertial Confinement (NIF).\n  - Fission-Fusion Hybrids: High-energy 14.1 MeV fusion neutrons drive a subcritical blanket of depleted uranium or thorium, multiplying energy output and transmuting nuclear waste with zero possibility of supercritical runaway.',
            id: 'Bahan bakar mutakhir dan siklus alternatif mengeliminasi risiko pelelehan teras pada tingkat rekayasa material:\n\n• Bahan Bakar Partikel TRISO (TRI-structural ISOtropic):\n  - Setiap bola bahan bakar (pebble) atau silinder kompak mengandung ribuan kernel uranium sub-milimeter (pengayaan HALEU 15,5% U-235).\n  - Dilapisi oleh empat lapisan penghalang konsentris: 1. Lapisan penyangga karbon berpori; 2. Karbon Pirolitik Bagian Dalam (IPyC); 3. Keramik berkekuatan tinggi Silikon Karbida (SiC); 4. Karbon Pirolitik Bagian Luar (OPyC).\n  - Lapisan Silikon Karbida tetap utuh secara struktural dan menahan gas fisi radioaktif hingga suhu >1.600°C—suhu yang jauh melampaui kondisi kecelakaan ekstrem terburuk pada reaktor suhu tinggi. Bahan bakar TRISO secara fisis terbukti kebal pelelehan.\n\n• Siklus Bahan Bakar Thorium (²³²Th → ²³³U):\n  - Cadangan thorium di kerak Bumi melimpah 3 hingga 4 kali lipat lebih banyak dibandingkan uranium.\n  - Thorium bersifat fertil; saat disinari di dalam reaktor, ia menangkap neutron dan meluruh menjadi Uranium-233, bahan bakar fisil termal yang sangat unggul (faktor reproduksi η tinggi).\n  - Memproduksi limbah aktinida transuranik (plutonium, amerisium, kurium) yang sangat minim, memperpendek masa karantina limbah radioaktif tingkat tinggi dari 300.000 tahun menjadi di bawah 300 tahun.\n\n• Horizon Fusi Nuklir & Sistem Hibrida:\n  - Reaksi fusi Deuterium-Tritium (D-T): ²H + ³H → ⁴He (3,5 MeV) + n (14,1 MeV).\n  - Kurungan Magnetik (Tokamak seperti ITER, SPARC berbasis magnet superkonduktor suhu tinggi REBCO; Stellarator seperti Wendelstein 7-X) dan Kurungan Inersial (NIF).\n  - Sistem Hibrida Fisi-Fusi: Neutron fusi 14,1 MeV berenergi tinggi ditembakkan ke selimut subkritis uranium terdeplesi atau thorium, melipatgandakan energi dan memusnahkan limbah nuklir tanpa risiko reaksi liar superkritis.',
          },
          formula: '{}^{2}_{1}\\text{H} + {}^{3}_{1}\\text{H} \\longrightarrow {}^{4}_{2}\\text{He}\\,(3.52\\text{ MeV}) + n\\,(14.07\\text{ MeV}) + 17.59\\text{ MeV}',
          formulaExplanation: {
            en: 'The Deuterium-Tritium (D-T) nuclear fusion reaction energetics. Deuterium and tritium fuse under thermonuclear plasma conditions (>100 million Kelvin) to form Helium-4 and a high-energy 14.1 MeV fast neutron. In hybrid fission-fusion blankets, this fast neutron is leveraged to transmute nuclear waste or breed fissile Uranium-233 from abundant Thorium-232.',
            id: 'Energetika reaksi fusi nuklir Deuterium-Tritium (D-T). Deuterium dan tritium berfusi di bawah kondisi plasma termonuklir (>100 juta Kelvin) membentuk Helium-4 dan neutron cepat berenergi tinggi 14,1 MeV. Pada selimut hibrida fisi-fusi, neutron cepat ini dimanfaatkan untuk memusnahkan limbah nuklir atau membiakkan Uranium-233 dari kelimpahan Thorium-232.',
          },
          variables: [
            {
              symbol: '{}^{2}_{1}\\text{H}',
              name: { en: 'Deuterium Nucleus (²H)', id: 'Inti Deuterium (²H)' },
              unit: 'amu (~2.0141 u)',
              description: {
                en: 'Stable heavy hydrogen isotope with 1 proton and 1 neutron, abundant in seawater.',
                id: 'Isotop hidrogen berat stabil dengan 1 proton dan 1 neutron, melimpah di air laut.',
              },
            },
            {
              symbol: '{}^{3}_{1}\\text{H}',
              name: { en: 'Tritium Nucleus (³H)', id: 'Inti Tritium (³H)' },
              unit: 'amu (~3.0160 u)',
              description: {
                en: 'Radioactive hydrogen isotope (t_1/2 = 12.3 yrs) bred from lithium blankets (⁶Li + n → ⁴He + ³H).',
                id: 'Isotop hidrogen radioaktif (t_1/2 = 12,3 th) yang dibiakkan dari selimut litium (⁶Li + n → ⁴He + ³H).',
              },
            },
            {
              symbol: '{}^{4}_{2}\\text{He}',
              name: { en: 'Alpha Particle (Helium-4)', id: 'Partikel Alfa (Helium-4)' },
              unit: 'MeV (3.52 MeV)',
              description: {
                en: 'Charged reaction product trapped by magnetic fields to maintain internal plasma self-heating.',
                id: 'Produk reaksi bermuatan yang terperangkap oleh medan magnet untuk mempertahankan pemanasan mandiri plasma.',
              },
            },
            {
              symbol: 'n',
              name: { en: 'Fast Fusion Neutron', id: 'Neutron Fusi Cepat' },
              unit: 'MeV (14.07 MeV)',
              description: {
                en: 'Uncharged high-energy neutron that penetrates the vacuum vessel to heat coolant blankets and drive transmutation.',
                id: 'Neutron tak bermuatan berenergi tinggi yang menembus bejana vakum untuk memanaskan selimut pendingin dan memicu transmutasi.',
              },
            },
          ],
          caseStudy: {
            title: {
              en: 'Shidaowan HTR-PM (China, 2023): World\'s First Commercial Gen-IV Pebble-Bed Walk-Away Safety Test',
              id: 'Shidaowan HTR-PM (Tiongkok, 2023): Uji Walk-Away Safety Komersial Pertama Reaktor Gen-IV Dunia',
            },
            context: {
              en: 'In 2023, China connected the world\'s first commercial Generation IV high-temperature gas-cooled pebble-bed reactor (HTR-PM, 210 MWe) to the grid at Shidaowan. The reactor utilizes hundreds of thousands of spherical graphite pebbles containing TRISO particles cooled by helium.',
              id: 'Pada tahun 2023, Tiongkok menghubungkan reaktor komersial Generasi IV suhu tinggi pebble-bed pertama di dunia (HTR-PM, 210 MWe) ke jaringan listrik di Shidaowan. Reaktor ini memanfaatkan ratusan ribu bola grafit berisi partikel TRISO yang didinginkan oleh gas helium.',
            },
            analysis: {
              en: 'Engineers performed a deliberate, live walk-away safety test at full power: both helium primary coolant circulators were deliberately shut down, and active emergency cooling was isolated with zero control rod insertion. Strong negative temperature reactivity feedback halted the fission reaction autonomously, while residual decay heat dissipated passively via natural radiation and conduction through the vessel walls to the environment. Fuel temperatures stabilized far below the 1,620°C TRISO integrity limit with zero fuel damage.',
              id: 'Insinyur melakukan uji keselamatan "walk-away" nyata pada kondisi daya penuh: kedua sirkulator pendingin helium primer sengaja dimatikan, dan sistem pendinginan aktif diisolasi tanpa memasukkan batang kendali sama sekali. Umpan balik suhu negatif yang kuat secara mandiri menghentikan reaksi fisi, sementara sisa panas peluruhan terbuang secara pasif melalui radiasi alami dan konduksi melintasi dinding bejana ke lingkungan. Suhu bahan bakar stabil jauh di bawah batas ketahanan TRISO 1.620°C tanpa kerusakan apa pun.',
            },
            takeaway: {
              en: 'Inherent physical safety (negative Doppler feedback + TRISO temperature margins) renders catastrophic meltdowns physically impossible, eliminating dependence on off-site AC power or human intervention.',
              id: 'Keselamatan fisis inheren (umpan balik Doppler negatif + ketahanan suhu TRISO) membuat pelelehan teras secara fisis mustahil terjadi, meniadakan ketergantungan pada pasokan listrik AC darurat atau intervensi operator manusia.',
            },
          },
        },
      ],
      keyTakeaways: {
        en: [
          'Generation IV systems (VHTR, MSR, SFR, LFR) deliver higher thermal efficiencies, closed fuel cycles, actinide waste burning, and industrial high-heat cogeneration.',
          'Small Modular Reactors (≤ 300 MWe) utilize factory modular fabrication and integral vessels (iPWR) that eliminate large external piping and compress build times to 2–3 years.',
          'TRISO particle fuel embeds fissile kernels within silicon carbide ceramic containment barriers that withstand >1,600°C, rendering fuel elements meltdown-proof.',
          'Molten Salt Reactors (MSR) operate near atmospheric pressure with passive freeze plugs that drain liquid fuel by gravity into subcritical holding tanks during power excursions.',
        ],
        id: [
          'Sistem Generasi IV (VHTR, MSR, SFR, LFR) menghadirkan efisiensi termal tinggi, siklus bahan bakar tertutup, pemusnahan limbah aktinida, dan kogenerasi panas industri.',
          'Small Modular Reactor (≤ 300 MWe) menerapkan fabrikasi pabrik terstandarisasi dan bejana integral (iPWR) yang meniadakan pipa eksternal besar serta memangkas durasi konstruksi menjadi 2–3 tahun.',
          'Bahan bakar TRISO mengemas kernel fisil di dalam lapisan keramik silikon karbida yang tahan hingga >1.600°C, membuat bahan bakar kebal terhadap pelelehan teras.',
          'Reaktor Garam Cair (MSR) beroperasi pada tekanan atmosfer dengan freeze plug pasif yang mengalirkan bahan bakar cair secara gravitasi ke tangki penampung subkritis saat terjadi kenaikan suhu.',
        ],
      },
      quiz: [
        {
          id: 'nuc-4-q1',
          question: {
            en: 'What makes TRISO fuel particles physically capable of withstanding temperatures exceeding 1,600°C without releasing fission products?',
            id: 'Apa yang membuat partikel bahan bakar TRISO mampu secara fisis menahan suhu melampaui 1.600°C tanpa melepaskan produk fisi radioaktif?',
          },
          options: {
            en: [
              'Each microscopic kernel is sealed inside an ultra-high-strength silicon carbide (SiC) and pyrolytic carbon ceramic pressure vessel.',
              'TRISO particles are immersed in liquid nitrogen inside each pebble.',
              'The fuel kernels are made of pure diamond that never gets hot.',
              'Fission products inside TRISO dissolve into outer space via quantum tunneling.',
            ],
            id: [
              'Setiap kernel mikroskopis disegel di dalam bejana tekan keramik silikon karbida (SiC) berkekuatan ultra-tinggi dan karbon pirolitik.',
              'Partikel TRISO direndam di dalam nitrogen cair di dalam setiap bola bahan bakar.',
              'Kernel bahan bakar terbuat dari intan murni yang tidak pernah memanas.',
              'Produk fisi di dalam TRISO lenyap ke luar angkasa melalui penerowongan kuantum.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The silicon carbide (SiC) ceramic shell acts as an individual, hermetically sealed miniature containment vessel for every microscopic fuel particle, retaining radioactive fission gases up to >1,600°C.',
            id: 'Lapisan keramik silikon karbida (SiC) bertindak sebagai bejana penahan miniatur yang disegel kedap untuk setiap partikel bahan bakar mikroskopis, menahan gas fisi radioaktif hingga suhu >1.600°C.',
          },
        },
        {
          id: 'nuc-4-q2',
          question: {
            en: 'How does an integral PWR (iPWR) SMR design eliminate Large-Break Loss-of-Coolant Accidents (LBLOCA)?',
            id: 'Bagaimana desain SMR tipe integral PWR (iPWR) meniadakan skenario kecelakaan Large-Break Loss-of-Coolant Accident (LBLOCA)?',
          },
          options: {
            en: [
              'By housing the core, steam generators, and pressurizer within a single integrated vessel, eliminating large external primary loop coolant piping.',
              'By using solid copper blocks instead of coolant fluid.',
              'By continuously venting primary steam into the environment during operation.',
              'By eliminating the reactor core and using solar panels instead.',
            ],
            id: [
              'Dengan mengintegrasikan teras, steam generator, dan pressurizer di dalam satu bejana tunggal, meniadakan pipa sirkulasi primer eksternal berdiameter besar.',
              'Dengan menggunakan blok tembaga padat sebagai pengganti fluida pendingin.',
              'Dengan membuang uap primer secara kontinu ke lingkungan terbuka selama beroperasi.',
              'Dengan meniadakan teras reaktor dan menggantinya dengan panel surya.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'In an iPWR, all primary components are enclosed within the reactor pressure vessel. Because there are no large external primary coolant pipes connecting the vessel to external steam generators, large-pipe ruptures cannot occur.',
            id: 'Pada iPWR, semua komponen primer berada di dalam bejana tekan reaktor. Karena tidak ada pipa pendingin primer eksternal besar yang menghubungkan bejana ke steam generator terpisah, pecahnya pipa besar tidak dapat terjadi.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 5: NUCLEAR DISASTER MITIGATION & PASSIVE SAFETY
    // -------------------------------------------------------------
    {
      id: 'nuc-mod-5',
      topicId: 'nuclear-reactor',
      order: 5,
      title: {
        en: 'Nuclear Disaster Mitigation & Advanced Safety Engineering',
        id: 'Mitigasi Bencana Reaktor Nuklir & Rekayasa Keselamatan Mutakhir',
      },
      shortDescription: {
        en: 'Accident forensics (Chernobyl, TMI, Fukushima), Defense-in-Depth, passive safety systems, SCRAM kinetics, and core catchers.',
        id: 'Forensik bencana (Chernobyl, TMI, Fukushima), Defense-in-Depth, sistem keselamatan pasif, kinetika SCRAM, dan core catcher.',
      },
      durationMinutes: 30,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'nuclear-reactor-lab',
      sections: [
        {
          id: 'nuc-5-sec-1',
          title: {
            en: '1. Forensic Analysis of Historical Nuclear Accidents',
            id: '1. Analisis Forensik Kecelakaan Nuklir Bersejarah',
          },
          content: {
            en: 'Modern nuclear safety engineering is shaped by rigorous forensic investigations into historical commercial reactor disasters:\n\n• Three Mile Island Unit 2 (USA, 1979 - INES Level 5):\n  - Initiator: Minor secondary feedwater pump trip caused primary pressure to rise; Pilot-Operated Relief Valve (PORV) opened to relieve pressure but stuck open.\n  - Human-Machine Interface Failure: Control room instruments indicated the signal to close the valve was sent, leading operators to assume the valve was shut. Operators mistook high water levels in the pressurizer as indication the core was full of water and erroneously shut off emergency high-pressure injection pumps.\n  - Consequence: Loss of coolant caused severe core overheating and partial core melting (~50% of fuel melted). However, the robust prestressed reinforced concrete containment building remained completely intact, preventing significant atmospheric radioactive release (average public exposure was < 1 mrem, equivalent to a dental X-ray).\n\n• Chernobyl Unit 4 (USSR, 1986 - INES Level 7):\n  - Root Causes: Flawed RBMK-1000 design with large positive void coefficient and positive scram reactivity insertion flaw, combined with unauthorized low-power turbine rundown test where operators disabled automatic safety systems.\n  - Sequence: Inserting control rods displaced neutron-absorbing water with graphite displacer tips, inserting instantaneous positive reactivity. The reactor went prompt critical; thermal power surged to >100 times nominal within 4 seconds. Rapid steam overpressure ruptured pressure tubes, followed by zirconium-steam hydrogen combustion and an uncontained graphite fire that burned for 10 days in the absence of a containment structure.\n\n• Fukushima Daiichi (Japan, 2011 - INES Level 7):\n  - Initiator: Magnitude 9.0 Great East Japan Earthquake triggered automatic, successful SCRAM insertion on all operating units (Units 1, 2, 3). Off-site AC power lines were severed by the quake, triggering 13 emergency diesel generators (EDGs).\n  - The Tsunami: 41 minutes later, a 14-meter tsunami overtopped the plant\'s 5.7-meter sea wall, drowning the emergency diesel generators and electrical switchgear located in low-lying turbine building basements.\n  - Station Blackout (SBO) & Loss of Ultimate Heat Sink (LUHS): Complete loss of all AC electrical power. Without cooling, water boiled away, exposing zircaloy fuel cladding. At >900°C, zirconium reacted with steam in an exothermic reaction: Zr + 2H₂O → ZrO₂ + 2H₂ + ΔH. Massive hydrogen gas migrated into reactor service buildings, producing violent chemical hydrogen detonations that damaged secondary containment roofs and released radionuclides (I-131, Cs-137) into the environment.',
            id: 'Rekayasa keselamatan nuklir modern dibangun dari investigasi forensik mendalam terhadap kecelakaan reaktor komersial bersejarah:\n\n• Three Mile Island Unit 2 (AS, 1979 - Skala INES 5):\n  - Pemicu: Terhentinya pompa air pengisi sekunder memicu lonjakan tekanan primer; Pilot-Operated Relief Valve (PORV) terbuka untuk membuang tekanan namun kemudian macet dalam kondisi terbuka.\n  - Kegagalan Antarmuka Manusia-Mesin: Instrumen ruang kendali mengindikasikan sinyal penutupan katup telah dikirim, membuat operator keliru berasumsi katup telah tertutup. Operator melihat level air pressurizer yang tinggi dan mengira teras penuh air, sehingga mematikan pompa darurat injeksi tekanan tinggi.\n  - Dampak: Kehilangan pendingin memicu pelelehan parsial teras (~50% bahan bakar meleleh). Namun, kubah penahan beton bertulang prategang tetap kokoh dan utuh sempurna, mencegah pelepasan radioaktif masif ke atmosfer (paparan rata-rata warga sekitar < 1 mrem, setara rontgen gigi).\n\n• Chernobyl Unit 4 (Uni Soviet, 1986 - Skala INES 7):\n  - Penyebab Mendasar: Cacat desain RBMK-1000 dengan koefisien kekosongan positif besar dan efek scram positif dari ujung grafit, dipadukan dengan uji turbin daya rendah tidak resmi di mana operator melumpuhkan sistem pengaman otomatis.\n  - Kronologi: Masuknya batang kendali mendesak air penyerap neutron dengan ujung pendorong grafit, menginjeksikan reaktivitas positif seketika. Reaktor mencapai kritis serentak (prompt critical); daya termal melonjak >100 kali nominal dalam 4 detik. Ledakan uap menghancurkan tabung tekan, disusul pembakaran hidrogen zirkonium-uap dan kebakaran grafit selama 10 hari tanpa adanya struktur kubah penahan.\n\n• Fukushima Daiichi (Jepang, 2011 - Skala INES 7):\n  - Pemicu: Gempa berkekuatan M 9,0 memicu sistem pemadaman SCRAM darurat otomatis yang sukses di semua unit operasi (Unit 1, 2, 3). Jaringan transmisi listrik eksternal terputus oleh gempa, mengaktifkan 13 generator diesel darurat (EDG).\n  - Gelombang Tsunami: 41 menit berselang, tsunami setinggi 14 meter melompati tanggul laut setinggi 5,7 meter, merendam generator diesel darurat dan panel listrik di ruang bawah tanah gedung turbin.\n  - Station Blackout (SBO) & Kehilangan Sumber Pembuangan Panas: Pemadaman total seluruh pasokan listrik AC. Tanpa sirkulasi pendingin, air mendidih habis mengekspos kelongsong zirkaloy. Pada suhu >900°C, zirkonium bereaksi eksotermik dengan uap air: Zr + 2H₂O → ZrO₂ + 2H₂ + ΔH. Akumulasi gas hidrogen masif bocor ke gedung reaktor, memicu ledakan kimiawi hidrogen yang merusak atap gedung reaktor dan melepaskan radionuklida (I-131, Cs-137) ke lingkungan.',
          },
        },
        {
          id: 'nuc-5-sec-2',
          title: {
            en: '2. Decay Heat Physics & The Wigner-Way Formulation',
            id: '2. Fisika Panas Peluruhan & Formulasi Wigner-Way',
          },
          content: {
            en: 'A fundamental law of nuclear physics is that shutting down the fission chain reaction via SCRAM does not instantly drop thermal power to zero. Unstable radioactive fission products continue emitting energetic beta particles and gamma rays as they decay toward stable daughter isotopes:\n\n• Initial Shutdown Power (~6.5–7.0% of P₀): Immediately after SCRAM (t = 0), decay heat produces ~200 MWth in a 3,000 MWth reactor—equivalent to the output of a medium-sized thermal power station.\n• Decay Heat Timeline: Power decreases following a power law: ~1.5% after 1 hour, ~0.5% after 24 hours, and ~0.2% after 1 week. This heat must be continuously evacuated to prevent coolant boiling, fuel cladding oxidation, and core meltdown, even if the plant is completely cut off from offsite electrical power.',
            id: 'Hukum dasar fisika nuklir menyatakan bahwa penghentian reaksi berantai fisi melalui SCRAM tidak serta-merta menurunkan daya termal menjadi nol. Produk fisi radioaktif yang tidak stabil terus memancarkan partikel beta dan sinar gamma berenergi tinggi saat meluruh menuju isotop stabil:\n\n• Daya Awal Pemadaman (~6,5–7,0% dari P₀): Segera setelah SCRAM (t = 0), panas peluruhan menghasilkan ~200 MWth pada reaktor 3.000 MWth—setara dengan kapasitas pembangkit listrik termal skala menengah.\n• Kurva Penurunan Panas: Daya menurun mengikuti hukum pangkat: ~1,5% setelah 1 jam, ~0,5% setelah 24 jam, dan ~0,2% setelah 1 minggu. Panas ini wajib dibuang secara kontinu untuk mencegah pendidihan pendingin, oksidasi kelongsong bahan bakar, dan pelelehan teras, bahkan jika pembangkit terputus total dari pasokan listrik luar.',
          },
          formula: '\\frac{P_d(t)}{P_0} = 0.066 \\left[ t^{-0.2} - (t + t_0)^{-0.2} \\right]',
          formulaExplanation: {
            en: 'The Wigner-Way Decay Heat Formula. It estimates the ratio of decay heat power P_d(t) to operating thermal power P_0 at time t seconds after shutdown, following an operational run of t_0 seconds.',
            id: 'Formula Panas Peluruhan Wigner-Way. Rumus ini mengestimasi rasio daya panas peluruhan P_d(t) terhadap daya termal operasi P_0 pada waktu t detik setelah reaktor dimatikan, setelah beroperasi selama t_0 detik.',
          },
          variables: [
            {
              symbol: 'P_d(t)',
              name: { en: 'Decay Heat Thermal Power', id: 'Daya Termal Panas Peluruhan' },
              unit: 'MWth',
              description: {
                en: 'Residual thermal power generated by radioactive decay of fission products.',
                id: 'Daya termal residual yang dihasilkan oleh peluruhan radioaktif produk-produk fisi.',
              },
            },
            {
              symbol: 'P_0',
              name: { en: 'Nominal Operating Thermal Power', id: 'Daya Termal Operasi Nominal' },
              unit: 'MWth',
              description: {
                en: 'Steady-state thermal power prior to reactor shutdown.',
                id: 'Daya termal tunak sebelum reaktor dimatikan.',
              },
            },
            {
              symbol: 't',
              name: { en: 'Time Elapsed Since Shutdown', id: 'Waktu yang Berlalu Sejak Pemadaman' },
              unit: 'seconds',
              description: {
                en: 'Duration since control rods achieved full insertion.',
                id: 'Durasi waktu sejak batang kendali tertancap penuh ke dalam teras.',
              },
            },
            {
              symbol: 't_0',
              name: { en: 'Operating Time Prior to Shutdown', id: 'Durasi Operasi Sebelum Pemadaman' },
              unit: 'seconds',
              description: {
                en: 'Total continuous operating duration at power prior to shutdown.',
                id: 'Total durasi operasi kontinu pada daya sebelum pemadaman.',
              },
            },
          ],
        },
        {
          id: 'nuc-5-sec-3',
          title: {
            en: '3. Inherent Safety Feedbacks & SCRAM Kinetics',
            id: '3. Umpan Balik Keselamatan Inheren & Kinetika SCRAM',
          },
          content: {
            en: 'Nuclear safety requires intrinsic physical self-limiting properties before active systems even trigger:\n\n• Fuel Doppler Temperature Coefficient (α_f < 0): As fuel pellet temperature increases, thermal agitation broadens the microscopic neutron absorption resonance peaks of Uranium-238 (Doppler broadening). This immediately increases parasitic neutron capture, inserting negative reactivity within microseconds. This inherent physical feedback naturally dampens power surges.\n• Moderator Temperature Coefficient (MTC < 0): In light water reactors, heated water expands and becomes less dense. Lower moderator density reduces neutron thermalization, causing more neutrons to escape or be captured in resonances, reducing reactivity.\n• Negative Void Coefficient (α_v < 0): If primary water boils into steam voids, steam moderation is drastically poorer than liquid water, shutting down the chain reaction autonomously.\n• Electro-Mechanical SCRAM Kinetics: Control rods are suspended above the core by electromagnetic clutches. Any loss of electrical power, earthquake trip signal, or high-pressure sensor de-energizes the electromagnets, allowing gravity and spring assist to drop the rods into the core within 1.5 to 2.5 seconds, halting the fission chain reaction.',
            id: 'Keselamatan nuklir mewajibkan sifat pembatasan diri fisis inheren bahkan sebelum sistem aktif bekerja:\n\n• Koefisien Suhu Bahan Bakar Doppler (α_f < 0): Ketika suhu pelet bahan bakar naik, agitasi termal memperlebar puncak resonansi serapan neutron mikroskopis Uranium-238 (Doppler broadening). Hal ini seketika meningkatkan penangkapan neutron parasitik, menginjeksikan reaktivitas negatif dalam hitungan mikrodetik. Umpan balik fisis ini secara alami meredam lonjakan daya.\n• Koefisien Suhu Moderator (MTC < 0): Pada reaktor air biasa, pemanasan air menyebabkan ekspansi termal dan penurunan densitas. Penurunan densitas moderator mengurangi efektivitas termalisasi neutron, memicu lebih banyak neutron lolos atau terserap di resonansi, sehingga menurunkan reaktivitas.\n• Koefisien Kekosongan Negatif (α_v < 0): Jika air primer mendidih membentuk gelembung uap (void), uap memiliki kemampuan moderasi yang jauh lebih buruk daripada air cair, memadamkan reaksi berantai secara mandiri.\n• Kinetika Pemadaman Darurat SCRAM: Batang kendali digantung di atas teras oleh kopling elektromagnetik. Terputusnya aliran listrik, sinyal gempa bumi, atau deteksi tekanan tinggi akan memutus arus elektromagnet, sehingga gravitasi dan pegas menjatuhkan batang kendali ke dalam teras dalam 1,5 hingga 2,5 detik, menghentikan reaksi fisi seketika.',
          },
        },
        {
          id: 'nuc-5-sec-4',
          title: {
            en: '4. Generation III+ & IV Passive Safety Systems: PCCS, Core Catchers & Recombiners',
            id: '4. Sistem Keselamatan Pasif Gen III+ & IV: PCCS, Core Catcher & Rekombinator',
          },
          content: {
            en: 'Modern Generation III+ and IV reactors replace vulnerable active emergency diesel systems with passive safety systems driven purely by gravity, natural circulation, evaporation, and condensation:\n\n• Passive Containment Cooling System (PCCS):\n  - Large water storage tanks (e.g., Westinghouse AP1000, 3 million liters) placed high above the containment dome.\n  - During an accident, valves open fail-safe without AC power, allowing water to drain by gravity over the external steel containment vessel.\n  - External air chimney draws cool air upward via natural convection, evaporating the water film and dumping heat into the atmosphere indefinitely without requiring any pumps or diesel generators (providing at least 72 hours of complete walk-away autonomy).\n\n• Passive Autocatalytic Recombiners (PAR):\n  - Catalytic cartridges containing platinum or palladium plates installed throughout the containment building.\n  - At ambient temperatures, PARs chemically recombine hydrogen gas with atmospheric oxygen (2H₂ + O₂ → 2H₂O) without electrical power, spark, or human intervention, preventing hydrogen concentrations from reaching flammable limits (4% in air) and eliminating Fukushima-style hydrogen explosions.\n\n• Core Catcher (Corium Retention Crucible):\n  - In the ultra-rare event of a complete reactor pressure vessel melt-through, molten corium (a molten mixture of UO₂, ZrO₂, steel, and fission products at >2,000°C) flows into an engineered cavity beneath the vessel.\n  - The core catcher is filled with sacrificial oxidic concrete containing iron and aluminum oxides that dilute and chemically neutralize the corium, lowering its melting point and spreading it across a large surface area.\n  - Passive water channels beneath the crucible flood the corium bed from below, cooling it into a solid, stable ceramic mass and permanently preventing basement burn-through or groundwater contamination.',
            id: 'Reaktor modern Generasi III+ dan IV menggantikan sistem diesel darurat aktif yang rentan dengan sistem keselamatan pasif yang digerakkan murni oleh gravitasi, sirkulasi alami, penguapan, dan kondensasi:\n\n• Passive Containment Cooling System (PCCS):\n  - Tangki penampung air raksasa (seperti pada Westinghouse AP1000, berkapasitas 3 juta liter) diletakkan tinggi di atas kubah penahan.\n  - Saat terjadi kecelakaan, katup terbuka secara fail-safe tanpa pasokan listrik AC, mengalirkan air secara gravitasi ke permukaan bejana baja penahan.\n  - Cerobong udara eksternal menarik udara sejuk ke atas melalui konveksi alami, menguapkan lapisan air dan membuang panas ke atmosfer tanpa memerlukan pompa atau generator diesel (menghadirkan otonomi "walk-away" minimal 72 jam).\n\n• Passive Autocatalytic Recombiner (PAR):\n  - Kartrid katalitik berisi pelat platina atau paladium yang dipasang di seluruh gedung kubah penahan.\n  - Pada suhu ruang, PAR secara kimiawi mereaksikan kembali gas hidrogen dengan oksigen udara (2H₂ + O₂ → 2H₂O) tanpa listrik, percikan api, atau bantuan operator, mencegah konsentrasi hidrogen mencapai batas mudah terbakar (4% di udara) dan meniadakan risiko ledakan hidrogen seperti di Fukushima.\n\n• Core Catcher (Penangkap Inti Leleh Corium):\n  - Jika terjadi skenario ekstrem di mana bejana tekan reaktor jebol, lelehan corium (campuran cair UO₂, ZrO₂, baja, dan produk fisi pada suhu >2.000°C) akan mengalir ke bak penampung di bawah bejana.\n  - Core catcher diisi dengan beton oksida pengorbanan (sacrificial concrete) yang mengencerkan dan menetralkan corium secara kimiawi, menurunkan titik leburnya dan meratakannya di atas area yang luas.\n  - Saluran air pasif di bawah wadah membanjiri lapisan corium dari bawah, mendinginkannya menjadi massa keramik padat yang stabil dan secara permanen mencegah penembusan lantai dasar reaktor atau kontaminasi air tanah.',
          },
          caseStudy: {
            title: {
              en: 'AP1000 Station Blackout Full-Scale Passive Walk-Away Verification',
              id: 'Verifikasi Walk-Away Pasif Skala Penuh Station Blackout pada AP1000',
            },
            context: {
              en: 'Westinghouse designed the AP1000 Gen-III+ reactor to withstand a total Fukushima-style Station Blackout (complete loss of all offsite AC power, backup diesel generators, and battery exhaustion) without human intervention.',
              id: 'Westinghouse merancang reaktor AP1000 Gen-III+ untuk bertahan menghadapi Station Blackout total ala Fukushima (kehilangan seluruh pasokan listrik AC eksternal, generator diesel cadangan, dan habisnya baterai) tanpa intervensi manusia.',
            },
            analysis: {
              en: 'During regulatory thermal-hydraulic qualification testing, external power was severed with the reactor at 100% full power. Spring-loaded valves opened autonomously to trigger the Passive Residual Heat Removal Heat Exchanger (PRHR HX) submerged inside the In-containment Refueling Water Storage Tank (IRWST). Decay heat was transferred into the IRWST, boiling water and condensing steam on the interior containment steel shell, where external gravity-driven water drained over the dome. The plant sustained stable core temperatures below design limits for >72 hours with zero operator action and zero AC electrical power.',
              id: 'Selama pengujian kualifikasi termal-hidraulik regulasi, daya eksternal diputus saat reaktor beroperasi pada daya 100%. Katup berbeban pegas membuka secara mandiri untuk mengaktifkan Passive Residual Heat Removal Heat Exchanger (PRHR HX) yang terendam di dalam tangki IRWST. Panas peluruhan diserap ke dalam IRWST, mendidihkan air dan mengembunkan uap di dinding dalam bejana baja penahan, di mana air gravitasi eksternal membasahi kubah luar. Pembangkit mempertahankan suhu teras yang stabil di bawah batas desain selama >72 jam tanpa tindakan operator dan tanpa listrik AC.',
            },
            takeaway: {
              en: 'Passive safety replaces mechanical pumps and human-dependent intervention with immutable physical laws: gravity, condensation, and natural thermal convection.',
              id: 'Keselamatan pasif menggantikan pompa mekanis dan intervensi operator manusia dengan hukum fisika yang abadi: gravitasi, kondensasi, dan konveksi termal alami.',
            },
          },
        },
      ],
      keyTakeaways: {
        en: [
          'Historical nuclear accidents led to modern multi-barrier containment, hydrogen management, and inherent negative reactivity feedbacks.',
          'Radioactive decay heat (Wigner-Way formula) continues producing ~7% of operating thermal power immediately following shutdown, requiring continuous cooling.',
          'Negative Doppler temperature coefficients provide instantaneous microsecond-scale physical self-regulation during power transients.',
          'Passive safety systems (PCCS, GDCS, PARs, core catchers) rely exclusively on natural laws—gravity, natural convection, and passive catalysis—ensuring 72+ hours of autonomous walk-away safety.',
        ],
        id: [
          'Kecelakaan nuklir bersejarah melahirkan kubah penahan multi-lapis modern, manajemen hidrogen, dan umpan balik reaktivitas negatif inheren.',
          'Panas peluruhan radioaktif (formula Wigner-Way) terus memproduksi ~7% daya termal operasi segera setelah pemadaman, mewajibkan pendinginan kontinu.',
          'Koefisien suhu Doppler negatif memberikan regulasi diri fisis instan dalam skala mikrodetik saat terjadi lonjakan daya.',
          'Sistem keselamatan pasif (PCCS, GDCS, PAR, core catcher) bersandar murni pada hukum alam—gravitasi, konveksi alami, dan katalisis pasif—menjamin keselamatan mandiri minimal 72 jam.',
        ],
      },
      quiz: [
        {
          id: 'nuc-5-q1',
          question: {
            en: 'Why does a nuclear reactor still require continuous active or passive cooling long after a successful SCRAM shutdown?',
            id: 'Mengapa reaktor nuklir masih memerlukan pendinginan kontinu aktif atau pasif lama setelah pemadaman SCRAM darurat yang sukses?',
          },
          options: {
            en: [
              'Because radioactive decay of accumulated fission products continues generating significant thermal decay heat (~7% of nominal power initially).',
              'Because the uranium metal fuel burns in air like charcoal if not kept wet.',
              'Because control rods produce friction heat when resting at the bottom of the core.',
              'Because electrical turbines send reverse current back into the reactor vessel.',
            ],
            id: [
              'Karena peluruhan radioaktif produk fisi yang terakumulasi terus memproduksi panas peluruhan termal yang signifikan (~7% dari daya nominal pada awalnya).',
              'Karena logam uranium terbakar di udara seperti arang jika tidak dijaga tetap basah.',
              'Karena batang kendali menghasilkan panas gesekan saat berada di dasar teras.',
              'Karena turbin listrik mengalirkan arus balik kembali ke bejana reaktor.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Although SCRAM stops fission, unstable fission fragments undergo radioactive beta and gamma decay. This decay heat (described by the Wigner-Way formula) equals ~7% of nominal operating power at shutdown, declining to ~1.5% after 1 hour and ~0.5% after 1 day.',
            id: 'Meskipun SCRAM menghentikan fisi, fragmen fisi yang tidak stabil terus mengalami peluruhan radioaktif beta dan gamma. Panas peluruhan ini (dijelaskan oleh formula Wigner-Way) setara ~7% daya nominal saat pemadaman, turun menjadi ~1,5% setelah 1 jam dan ~0,5% setelah 1 hari.',
          },
        },
        {
          id: 'nuc-5-q2',
          question: {
            en: 'What is the role of a Passive Autocatalytic Recombiner (PAR) in a modern reactor containment building?',
            id: 'Apa fungsi Passive Autocatalytic Recombiner (PAR) di dalam gedung kubah penahan reaktor modern?',
          },
          options: {
            en: [
              'To passively recombine hydrogen gas with oxygen into water without electrical power or ignition, preventing flammable gas detonations.',
              'To split water into explosive hydrogen gas for turbine fuel.',
              'To filter carbon dioxide from the control room air.',
              'To actively spray cold water onto electrical transformers.',
            ],
            id: [
              'Untuk mereaksikan kembali gas hidrogen dengan oksigen menjadi air secara pasif tanpa listrik atau percikan api, mencegah ledakan gas.',
              'Untuk membelah air menjadi gas hidrogen eksplosif sebagai bahan bakar turbin.',
              'Untuk menyaring karbon dioksida dari udara ruang kendali.',
              'Untuk menyemprotkan air dingin secara aktif ke transformator listrik.',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'PARs use noble metal catalysts (platinum/palladium) to recombine hydrogen with ambient oxygen at room temperature into water vapor, eliminating the risk of Fukushima-style hydrogen explosions completely passively.',
            id: 'PAR menggunakan katalis logam mulia (platina/paladium) untuk mereaksikan hidrogen dengan oksigen pada suhu ruang menjadi uap air, mengeliminasi risiko ledakan hidrogen ala Fukushima secara pasif.',
          },
        },
      ],
    },
  ],
};
