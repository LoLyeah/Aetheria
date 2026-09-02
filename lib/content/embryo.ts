import { Topic } from '@/types/learning';

export const fetusDevelopmentTopic: Topic = {
  id: 'fetus-development',
  title: {
    en: 'Human Embryology & Fetal Development',
    id: 'Embriologi Manusia & Perkembangan Janin',
  },
  tagline: {
    en: 'From single-cell zygote to fully formed neonate: anatomical stages in living 3D.',
    id: 'Dari zigot sel tunggal hingga bayi cukup bulan: tahapan anatomi dalam 3D.',
  },
  description: {
    en: 'Explore the biological timeline of human prenatal morphogenesis. Scrutinize early gastrulation and the three primary germ layers, watch the embryonic heart tube establish primitive circulation, inspect limb bud chondrogenesis, and interact with layered anatomical systems, placental nutrient transport, and ultrasound imaging in 3D.',
    id: 'Jelajahi garis waktu biologis morfogenesis prenatal manusia. Pelajari proses gastrulasi awal dan tiga lapisan germinal primer, amati tabung jantung embrio yang mulai memompa sirkulasi primitif, teliti pembentukan kuncup anggota tubuh, serta operasikan sistem anatomi berlapis, pertukaran nutrisi plasenta, dan tampilan ultrasonografi (USG) dalam 3D.',
  },
  category: {
    en: 'Developmental Biology & Medicine',
    id: 'Biologi Perkembangan & Kedokteran',
  },
  colorAccent: 'rose',
  badgeColor: 'from-rose-500 to-amber-500',
  iconName: 'HeartPulse',
  modules: [
    {
      id: 'emb-mod-1',
      topicId: 'fetus-development',
      order: 1,
      title: {
        en: 'Weeks 1–4: Blastocyst, Implantation & Gastrulation',
        id: 'Minggu 1–4: Blastokista, Implantasi & Gastrulasi',
      },
      shortDescription: {
        en: 'From cleavage of the single-cell zygote to the establishment of the three primary germ layers and neural tube.',
        id: 'Dari pembelahan sel zigot hingga pembentukan tiga lapisan germinal primer dan tabung saraf.',
      },
      durationMinutes: 18,
      difficulty: 'Beginner',
      difficultyId: 'Pemula',
      interactiveType: 'embryo-timeline',
      sections: [
        {
          id: 'emb-1-sec-1',
          title: {
            en: '1. Fertilization and the Cleavage Continuum (Days 1–7)',
            id: '1. Fertilisasi dan Rangkaian Pembelahan (Hari 1–7)',
          },
          content: {
            en: 'Following fertilization in the ampulla of the uterine tube, the diploid zygote undergoes rapid mitotic cleavage divisions without cytoplasmic growth within the confining zona pellucida. By Day 3–4, it forms a compact 16-cell sphere termed the morula.\n\nFluid accumulation under hydrostatic pressure expands the central blastocoele cavity, transforming the morula into a hollow blastocyst comprising:\n• Outer Trophoblast (Trophectoderm): Differentiates upon endometrial contact into inner mononuclear cytotrophoblasts and an invasive outer multinucleated syncytiotrophoblast that secretes human chorionic gonadotropin (hCG).\n• Inner Cell Mass (Embryoblast): Pluripotent stem cells situated at the embryonic pole that will differentiate into the entire embryo proper.\n\nBetween Days 6 and 8, the syncytiotrophoblast degrades the maternal extracellular matrix, securing interstitial implantation in the posterior-superior uterine wall.',
            id: 'Setelah fertilisasi di ampula tuba falopi, zigot diploid menjalani pembelahan mitosis cepat (cleavage) tanpa pertambahan ukuran sel di dalam selubung zona pelusida. Pada Hari ke 3–4, terbentuk bola padat 16 sel yang disebut morula.\n\nAkumulasi cairan di bawah tekanan hidrostatik memperluas rongga blastosel sentral, mengubah morula menjadi blastokista berongga yang terdiri dari:\n• Trofoblas Luar: Berdiferensiasi saat menempel pada endometrium menjadi sitotrofoblas mononuklear dalam dan sinsisiotrofoblas multinuklear luar yang mensekresikan hormon human chorionic gonadotropin (hCG).\n• Massa Sel Dalam (Embrioblas): Sel-sel punca pluripoten di kutub embrionik yang akan membentuk seluruh jaringan tubuh embrio.\n\nAntara Hari ke-6 hingga ke-8, sinsisiotrofoblas mendegradasi matriks ekstraseluler rahim untuk menuntaskan proses implantasi interstisial pada dinding rahim posterior-superior.',
          },
          formula: '\\text{Zygote (1 cell)} \\xrightarrow{\\text{Cleavage}} \\text{Morula (16 cells)} \\xrightarrow{\\text{Cavitation}} \\text{Blastocyst} \\xrightarrow{\\text{Gastrulation}} \\text{Trilaminar Disc}',
          formulaExplanation: {
            en: 'Chronological morphological progression during the first three weeks of human embryogenesis.',
            id: 'Kemajuan morfologis kronologis selama tiga minggu pertama embriogenesis manusia.',
          },
          comparisonTable: {
            headers: {
              en: ['Primary Germ Layer', 'Embryonic Origin', 'Epithelial & Organ Derivatives', 'Clinical Pathology Associated'],
              id: ['Lapisan Germinal Primer', 'Asal Embrionik', 'Turunan Epitel & Organ', 'Patologi Klinis Terkait'],
            },
            rows: [
              {
                en: ['Ectoderm', 'Epiblast surface', 'CNS (brain, spinal cord), retina, epidermis, hair, neural crest', 'Anencephaly, Spina Bifida, Hirschsprung disease'],
                id: ['Ektoderm', 'Permukaan Epiblas', 'Sistem Saraf Pusat (otak, sumsum tulang belakang), retina, epidermis kulit, neural crest', 'Anensefali, Spina Bifida, Penyakit Hirschsprung'],
              },
              {
                en: ['Mesoderm', 'Ingressed Epiblast cells', 'Axial skeleton, skeletal/cardiac muscle, kidneys, gonads, blood vessels', 'Congenital heart defects, Renal agenesis, Scoliosis'],
                id: ['Mesoderm', 'Sel Epiblas yang Mengalami Ingresi', 'Tulang aksial, otot rangka/jantung, ginjal, gonad, pembuluh darah', 'Defek septum jantung bawaan, Agenesis ginjal, Skoliosis'],
              },
              {
                en: ['Endoderm', 'Displaced Hypoblast layer', 'GI tract lining, respiratory epithelium, liver parenchyma, pancreas, thyroid', 'Tracheoesophageal fistula, Biliary atresia'],
                id: ['Endoderm', 'Lapisan Hipoblas yang Tergeser', 'Lapisan saluran cerna, epitel pernapasan, parenkim hati, pankreas, tiroid', 'Fistula trakeoesofagus, Atresia bilier'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Gastrulation converts the bilaminar embryonic disc (epiblast + hypoblast) into a trilaminar embryo with definitive Ectoderm, Mesoderm, and Endoderm.',
              'The primitive streak and node establish the cranial-caudal, dorsal-ventral, and left-right anatomical axes.',
              'Neural tube closure finishes by Day 28; periconceptional folic acid supplementation (400–800 µg/day) prevents up to 70% of neural tube defects.',
            ],
            id: [
              'Gastrulasi mengubah lempeng bilaminar (epiblas + hipoblas) menjadi lempeng trilaminar dengan Ektoderm, Mesoderm, dan Endoderm definitif.',
              'Alur primitif (primitive streak) dan nodus primitif menetapkan sumbu anatomi kranial-kaudal, dorsal-ventral, dan kiri-kanan.',
              'Penutupan tabung saraf tuntas pada Hari ke-28; suplementasi asam folat (400–800 µg/hari) mencegah hingga 70% defek tabung saraf.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q1-1',
          question: {
            en: 'Which primary germ layer gives rise to the central nervous system, brain, and epidermal skin layer?',
            id: 'Lapisan germinal primer manakah yang menghasilkan sistem saraf pusat, otak, dan lapisan kulit epidermis?',
          },
          options: {
            en: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Trophoblast'],
            id: ['Ektoderm', 'Mesoderm', 'Endoderm', 'Trofoblas'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The ectoderm forms both neuroectoderm (brain, spinal cord) and surface ectoderm (epidermis, hair, sensory receptors).',
            id: 'Ektoderm membentuk neuroektoderm (otak, sumsum tulang belakang) dan ektoderm permukaan (epidermis, rambut, reseptor sensorik).',
          },
        },
        {
          id: 'emb-q1-2',
          question: {
            en: 'Around which post-conception day does the primary embryonic heart tube begin to pump primitive blood?',
            id: 'Sekitar hari keberapa pasca-konsepsi tabung jantung embrio primer mulai berdenyut dan memompa darah primitif?',
          },
          options: {
            en: ['Day 21–22 (Week 4)', 'Day 6 (Implantation)', 'Day 45 (Week 7)', 'Day 90 (Week 13)'],
            id: ['Hari 21–22 (Minggu 4)', 'Hari 6 (Implantasi)', 'Hari 45 (Minggu 7)', 'Hari 90 (Minggu 13)'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The cardiovascular system is the first functional organ system in the embryo; the primitive cardiac tube begins rhythmic peristaltic contractions by Day 21–22.',
            id: 'Sistem kardiovaskular adalah sistem organ fungsional pertama dalam embrio; tabung jantung primitif mulai berkontraksi ritmis peristaltik pada Hari ke 21–22.',
          },
        },
      ],
    },
    {
      id: 'emb-mod-2',
      topicId: 'fetus-development',
      order: 2,
      title: {
        en: 'Weeks 5–8: Organogenesis & Limb Morphogenesis',
        id: 'Minggu 5–8: Organogenesis & Morfogenesis Anggota Tubuh',
      },
      shortDescription: {
        en: 'The critical embryonic period of rapid organ formation, limb bud emergence, and facial feature differentiation.',
        id: 'Periode kritis embriogenesis: pembentukan organ vital, tunas anggota badan, dan diferensiasi fitur wajah.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'embryo-timeline',
      sections: [
        {
          id: 'emb-2-sec-1',
          title: {
            en: '1. Limb Bud Morphogenesis & Molecular Signaling Axes',
            id: '1. Morfogenesis Kuncup Anggota Tubuh & Sinyal Molekuler',
          },
          content: {
            en: 'During Weeks 5 to 8, all major external and internal organ systems are established. Limb development begins at Day 26–28 with the outpouching of lateral plate mesoderm covered by a specialized rim of pseudostratified ectoderm known as the Apical Ectodermal Ridge (AER).\n\nThree coordinated molecular signaling centers orchestrate limb patterning:\n• Proximo-Distal Axis: Regulated by FGF-4 and FGF-8 secreted by the AER, maintaining underlying mesenchymal cells in a highly proliferative, undifferentiated state (Progress Zone).\n• Antero-Posterior Axis: Governed by the Zone of Polarizing Activity (ZPA) located at the posterior limb border, which secretes Sonic Hedgehog (Shh) morphogen gradients to specify digit identity (thumb = digit 1 to little finger = digit 5).\n• Dorso-Ventral Axis: Patterned by Wnt-7a in the dorsal ectoderm inducing Lmx-1 expression.',
            id: 'Selama Minggu ke-5 hingga ke-8, seluruh sistem organ internal dan eksternal utama terbentuk. Pembentukan tunas anggota gerak dimulai pada Hari ke 26–28 melalui tonjolan mesoderm lempeng lateral yang dilapisi tepi ektoderm khusus bernama Apical Ectodermal Ridge (AER).\n\nTiga pusat sinyal molekuler terkoordinasi mengatur pola spasial anggota gerak:\n• Sumbu Proksimal-Distal: Diatur oleh sekresi FGF-4 dan FGF-8 dari AER yang mempertahankan mesenkim di bawahnya dalam keadaan proliferasi aktif.\n• Sumbu Anterior-Posterior: Diatur oleh Zone of Polarizing Activity (ZPA) di tepi posterior yang melepaskan gradien konsentrasi Sonic Hedgehog (Shh) untuk menentukan identitas jari (ibu jari = digit 1 hingga kelingking = digit 5).\n• Sumbu Dorso-Ventral: Ditentukan oleh ekspresi Wnt-7a pada ektoderm dorsal yang menginduksi gen Lmx-1.',
          },
          caseStudy: {
            title: {
              en: 'Thalidomide Embryopathy & Critical Teratogenic Windows',
              id: 'Embriopati Talidomid & Jendela Kritis Teratogenesis',
            },
            context: {
              en: 'In the late 1950s, thalidomide was prescribed as a non-barbiturate sedative for morning sickness.',
              id: 'Pada akhir 1950-an, talidomid diresepkan sebagai obat penenang untuk meredakan morning sickness pada ibu hamil.',
            },
            analysis: {
              en: 'Maternal exposure strictly between gestational Days 20 and 36 targeted cereblon (CRBN), destabilizing SALL4 transcription factors and disrupting angiogenesis, causing severe phocomelia (seal-like shortened limbs) and amelia.',
              id: 'Paparan maternal antara Hari ke 20 hingga 36 menargetkan protein sereblon (CRBN), mendegradasi faktor transkripsi SALL4 dan menghambat angiogenesis, menyebabkan fokomelia berat dan amelia.',
            },
            takeaway: {
              en: 'Weeks 3 to 8 represent the maximum susceptibility window for major congenital structural malformations.',
              id: 'Minggu ke-3 hingga ke-8 merupakan jendela kerentanan tertinggi terhadap malformasi struktural kongenital berat.',
            },
          },
          keyTakeaways: {
            en: [
              'Digital rays undergo programmed apoptosis (interdigital cell death) mediated by BMP signaling to separate fingers and toes.',
              'Cardiac looping converts the straight primitive heart tube into the four-chambered spatial geometry by Day 28–35.',
              'By the end of Week 8 (Day 56), the embryonic period concludes, and the organism is classified as a fetus.',
            ],
            id: [
              'Sinar digital menjalani apoptosis terprogram (kematian sel interdigital) yang dimediasi sinyal BMP untuk memisahkan jari-jemari tangan dan kaki.',
              'Perputaran jantung (cardiac looping) mengubah tabung jantung lurus menjadi geometri empat ruang pada Hari ke 28–35.',
              'Pada akhir Minggu ke-8 (Hari 56), periode embriogenesis berakhir dan organisme secara klinis diklasifikasikan sebagai janin (fetus).',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q2-1',
          question: {
            en: 'Which morphogen signaling gradient secreted by the Zone of Polarizing Activity (ZPA) establishes the anterior-posterior digit identity (e.g., thumb vs. little finger)?',
            id: 'Gradien konsentrasi morfogen apakah yang disekresikan oleh Zone of Polarizing Activity (ZPA) untuk menentukan identitas jari anterior-posterior?',
          },
          options: {
            en: ['Sonic Hedgehog (Shh)', 'Insulin-like Growth Factor (IGF-1)', 'Laminin', 'Myoglobin'],
            id: ['Sonic Hedgehog (Shh)', 'Insulin-like Growth Factor (IGF-1)', 'Laminin', 'Mioglobin'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Sonic hedgehog (Shh) is the principal morphogen produced by the ZPA; highest Shh concentrations specify posterior digits (little finger), while absence specifies anterior digits (thumb).',
            id: 'Sonic hedgehog (Shh) adalah morfogen utama dari ZPA; konsentrasi Shh tertinggi menghasilkan digit posterior (kelingking), sedangkan ketiadaan Shh membentuk digit anterior (ibu jari).',
          },
        },
      ],
    },
    {
      id: 'emb-mod-3',
      topicId: 'fetus-development',
      order: 3,
      title: {
        en: 'Weeks 9–24: Fetal Growth, Hematopoiesis & Organ Maturation',
        id: 'Minggu 9–24: Pertumbuhan Janin, Hematopoiesis & Maturasi Organ',
      },
      shortDescription: {
        en: 'Linear skeletal ossification, fetal hemoglobin oxygen dynamics, and progressive pulmonary alveolar differentiation.',
        id: 'Osifikasi rangka linier, dinamika afinitas oksigen hemoglobin janin, dan diferensiasi alveolar paru progresif.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'embryo-timeline',
      sections: [
        {
          id: 'emb-3-sec-1',
          title: {
            en: '1. Crown-Rump Growth Kinetics & Fetal Hemoglobin (HbF) Dynamics',
            id: '1. Kinetika Pertumbuhan Crown-Rump & Dinamika Hemoglobin Janin (HbF)',
          },
          content: {
            en: 'The fetal period (Week 9 to birth) is characterized by rapid somatic growth, tissue differentiation, and physiological maturation. Crown-Rump Length (CRL) scales predictably with gestational age.\n\nTo extract oxygen efficiently across the placental villous membrane where maternal arterial pO₂ is relatively low (~30–35 mmHg), the fetus synthesizes Fetal Hemoglobin (HbF, $\\alpha_2 \\gamma_2$):\n• The $\\gamma$-globin chains substitute serine for histidine at position 143, reducing affinity for 2,3-bisphosphoglycerate (2,3-BPG).\n• This shifts the oxygen-hemoglobin dissociation curve significantly to the left ($P_{50} \\approx 19\\text{ mmHg}$ for HbF vs $27\\text{ mmHg}$ for adult HbA), ensuring high oxygen saturation in the fetal bloodstream.',
            id: 'Periode janin (Minggu ke-9 hingga kelahiran) ditandai dengan pertumbuhan somatik yang sangat pesat, diferensiasi jaringan, dan pematangan fungsi fisiologis. Panjang Crown-Rump Length (CRL) berkorelasi linier dengan usia gestasi.\n\nUntuk menyerap oksigen secara efektif melintasi membran vili plasenta di mana tekanan parsial oksigen darah maternal relatif rendah (~30–35 mmHg), janin memproduksi Hemoglobin Fetal (HbF, $\\alpha_2 \\gamma_2$):\n• Rantai $\\gamma$-globin mengganti asam amino histidin dengan serin pada posisi 143, sehingga menurunkan afinitas pengikatan terhadap 2,3-bisfosfogliserat (2,3-BPG).\n• Hal ini menggeser kurva disosiasi oksihemoglobin secara signifikan ke arah kiri ($P_{50} \\approx 19\\text{ mmHg}$ untuk HbF vs $27\\text{ mmHg}$ untuk HbA dewasa), memastikan saturasi oksigen darah janin tetap tinggi.',
          },
          formula: 'P_{50}(\\text{HbF}) \\approx 19\\text{ mmHg} < P_{50}(\\text{HbA}) \\approx 27\\text{ mmHg}',
          formulaExplanation: {
            en: 'The left-shifted oxygen binding curve of fetal hemoglobin enables passive oxygen extraction from maternal oxyhemoglobin across the intervillous space (Double Bohr Effect).',
            id: 'Kurva disosiasi bergeser ke kiri pada HbF memungkinkan penarikan oksigen dari oksihemoglobin maternal melintasi ruang intervili plasenta (Efek Bohr Ganda).',
          },
          keyTakeaways: {
            en: [
              'Between Weeks 20 and 24, Type II pneumocytes initiate dipalmitoylphosphatidylcholine (surfactant) synthesis, lowering alveolar surface tension.',
              'Fetal movements (quickening) are typically perceived by the mother between Weeks 16 and 20.',
              'Primary ossification centers expand within the long bones, visible on clinical radiographs and ultrasound.',
            ],
            id: [
              'Antara Minggu ke-20 dan 24, pneumosit tipe II mulai memproduksi surfaktan (dipalmitoilfosfatidilkolin) untuk menurunkan tegangan permukaan alveolus.',
              'Gerakan janin (quickening) mulai dirasakan oleh ibu antara Minggu ke-16 dan ke-20.',
              'Pusat osifikasi primer meluas pada tulang panjang, terlihat jelas pada pencitraan radiografi dan USG.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q3-1',
          question: {
            en: 'Why does Fetal Hemoglobin (HbF, α₂γ₂) have a higher oxygen binding affinity than adult hemoglobin (HbA, α₂β₂)?',
            id: 'Mengapa Hemoglobin Janin (HbF, α₂γ₂) memiliki afinitas pengikatan oksigen yang lebih tinggi daripada hemoglobin dewasa (HbA, α₂β₂)?',
          },
          options: {
            en: [
              'Because the γ-chains have lower binding affinity for 2,3-bisphosphoglycerate (2,3-BPG)',
              'Because fetal blood operates at a much higher temperature',
              'Because fetal red blood cells lack cell membranes',
              'Because fetal hemoglobin contains four iron atoms instead of two',
            ],
            id: [
              'Karena rantai γ memiliki afinitas pengikatan yang lebih rendah terhadap 2,3-bisfosfogliserat (2,3-BPG)',
              'Karena darah janin bekerja pada suhu yang jauh lebih tinggi',
              'Karena sel darah merah janin tidak memiliki membran sel',
              'Karena hemoglobin janin mengandung empat atom besi dan bukan dua',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The γ-globin subunit has a neutral serine residue instead of positively charged histidine-143, reducing 2,3-BPG binding and shifting the curve left to bind O₂ avidly.',
            id: 'Subunit γ-globin memiliki residu serin netral yang menggantikan histidin-143 bermuatan positif, sehingga mengurangi pengikatan 2,3-BPG dan menggeser kurva ke kiri untuk mengikat O₂ dengan kuat.',
          },
        },
      ],
    },
    {
      id: 'emb-mod-4',
      topicId: 'fetus-development',
      order: 4,
      title: {
        en: 'Weeks 25–40: Placental Transport & Ultrasound Hemodynamics',
        id: 'Minggu 25–40: Transpor Plasenta & Hemodinamik Ultrasonografi',
      },
      shortDescription: {
        en: 'Three fetal circulatory shunts, placental counter-current hemodynamics, and Doppler ultrasound velocity shifts.',
        id: 'Tiga pirau sirkulasi janin, hemodinamika arus balik plasenta, dan pergeseran frekuensi Doppler USG.',
      },
      durationMinutes: 22,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'ultrasound-scan',
      sections: [
        {
          id: 'emb-4-sec-1',
          title: {
            en: '1. The Three Specialized Fetal Circulatory Shunts',
            id: '1. Tiga Pirau Khusus Sirkulasi Janin',
          },
          content: {
            en: 'Because the fetal lungs are fluid-filled and non-functional for gas exchange, and hepatic metabolism is partially bypassed, the fetal cardiovascular system operates with three specialized anatomical shunts:\n\n1. Ductus Venosus: Shunts ~50% of oxygen-rich blood from the umbilical vein directly into the inferior vena cava (IVC), bypassing hepatic sinusoidal microcirculation.\n2. Foramen Ovale: An interatrial valve that directs high-velocity oxygenated blood from the IVC straight into the left atrium, ensuring preferential delivery of oxygen to the ascending aorta, coronary arteries, and developing brain.\n3. Ductus Arteriosus: A muscular vascular conduit connecting the pulmonary artery directly to the descending aorta, diverting ~90% of right ventricular output away from the high-resistance pulmonary capillary bed.\n\nAt birth, lung expansion drops pulmonary vascular resistance, umbilical cord clamping eliminates placental low-resistance flow, and left atrial pressure rises, slamming the valve of the foramen ovale shut and initiating ductus arteriosus constriction.',
            id: 'Karena paru-paru janin terisi cairan dan belum berfungsi untuk pertukaran gas, serta metabolisme hati dilewati sebagian, sirkulasi janin mengandalkan tiga pirau pembuluh darah khusus:\n\n1. Duktus Venosus: Mengalirkan ~50% darah kaya oksigen dari vena umbilikalis langsung ke vena kava inferior (IVC), melewati jaringan sinusoid hati.\n2. Foramen Ovale: Katup sekat antar-atrium yang mengarahkan darah kaya oksigen dari IVC langsung ke atrium kiri, memprioritaskan suplai oksigen ke aorta asendens, arteri koroner, dan otak janin.\n3. Duktus Arteriosus: Saluran vaskular berotot yang menghubungkan arteri pulmonalis langsung ke aorta desendens, mengalihkan ~90% curah ventrikel kanan dari pembuluh paru beresistensi tinggi.\n\nSaat lahir, ekspansi udara paru-paru menurunkan resistensi vaskular pulmonal secara drastis, penjepitan tali pusat menghilangkan sirkulasi plasenta, dan tekanan atrium kiri meningkat tajam, menutup foramen ovale serta memicu konstriksi duktus arteriosus.',
          },
          formula: 'v = \\frac{\\Delta f \\cdot c}{2 f_0 \\cos\\theta}, \\quad \\text{Pulsatility Index (PI)} = \\frac{v_{\\max} - v_{\\min}}{v_{\\text{mean}}}',
          formulaExplanation: {
            en: 'Doppler ultrasound shift equation for calculating blood flow velocity (v) in the umbilical and middle cerebral arteries, where Δf is Doppler frequency shift, c is speed of sound in tissue (1540 m/s), f₀ is transducer frequency, and θ is insonation angle.',
            id: 'Persamaan pergeseran Doppler USG untuk menghitung kecepatan aliran darah (v) pada arteri umbilikalis dan arteri serebri media, di mana Δf adalah pergeseran frekuensi, c adalah kecepatan suara pada jaringan (1540 m/s), f₀ adalah frekuensi transduser, dan θ adalah sudut insonasi.',
          },
          caseStudy: {
            title: {
              en: 'Brain-Sparing Effect in Fetal Growth Restriction (FGR)',
              id: 'Efek Brain-Sparing pada Fetal Growth Restriction (FGR)',
            },
            context: {
              en: 'In severe placental insufficiency, Doppler assessment reveals elevated resistance in the umbilical artery (absent or reversed end-diastolic velocity).',
              id: 'Pada insufisiensi plasenta berat, pemeriksaan Doppler menunjukkan peningkatan resistensi pada arteri umbilikalis (aliran end-diastolik hilang atau berbalik arah).',
            },
            analysis: {
              en: 'The fetus autoregulates cerebral circulation, causing marked vasodilation in the Middle Cerebral Artery (MCA) with lowered Pulsatility Index to maintain brain oxygenation at the expense of somatic organs.',
              id: 'Janin melakukan autoregulasi sirkulasi serebral, memicu vasodilatasi arteri serebri media (MCA) dengan Pulsatility Index yang sangat rendah untuk mempertahankan suplai oksigen ke otak.',
            },
            takeaway: {
              en: 'MCA Doppler and ductus venosus waveforms are critical parameters for determining emergency preterm delivery timing.',
              id: 'Bentuk gelombang Doppler MCA dan duktus venosus adalah parameter klinis krusial dalam menentukan waktu terminasi kehamilan darurat.',
            },
          },
          keyTakeaways: {
            en: [
              'Ductus venosus closes after birth to form the ligamentum venosum; foramen ovale becomes the fossa ovalis; ductus arteriosus becomes the ligamentum arteriosum.',
              'Biometric ultrasound parameters include Biparietal Diameter (BPD), Head Circumference (HC), Abdominal Circumference (AC), and Femur Length (FL).',
              'Surfactant replacement therapy and antenatal corticosteroid administration accelerate pulmonary readiness in premature deliveries.',
            ],
            id: [
              'Duktus venosus menutup pasca kelahiran membentuk ligamentum venosum; foramen ovale menjadi fossa ovalis; duktus arteriosus menjadi ligamentum arteriosum.',
              'Parameter biometri USG meliputi Biparietal Diameter (BPD), Lingkar Kepala (HC), Lingkar Abdomen (AC), dan Panjang Femur (FL).',
              'Terapi penggantian surfaktan dan pemberian kortikosteroid antenatal mempercepat kesiapan paru pada kelahiran prematur.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q4-1',
          question: {
            en: 'Which vascular shunt carries oxygenated blood directly from the umbilical vein into the inferior vena cava, partially bypassing the fetal liver?',
            id: 'Pirau vaskular manakah yang membawa darah beroksigen langsung dari vena umbilikalis ke vena kava inferior, melewati jaringan hati janin?',
          },
          options: {
            en: ['Ductus Venosus', 'Ductus Arteriosus', 'Foramen Ovale', 'Hypogastric Artery'],
            id: ['Duktus Venosus', 'Duktus Arteriosus', 'Foramen Ovale', 'Arteri Hipogastrika'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The ductus venosus connects the intra-abdominal umbilical vein directly to the inferior vena cava, preserving high oxygen tension for cardiac and cerebral perfusion.',
            id: 'Duktus venosus menghubungkan vena umbilikalis langsung ke vena kava inferior, mempertahankan kadar oksigen tinggi untuk perfusi jantung dan otak.',
          },
        },
      ],
    },
  ],
};
