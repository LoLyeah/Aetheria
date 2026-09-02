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
    en: 'Explore the miraculous biological timeline of human prenatal morphogenesis. Scrutinize early gastrulation and the three primary germ layers, watch the embryonic heart tube establish primitive circulation, inspect limb bud chondrogenesis, and interact with layered anatomical systems, placental nutrient transport, and ultrasound imaging in 3D.',
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
      durationMinutes: 16,
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
            en: 'Upon fertilization in the ampulla of the uterine tube, the diploid zygote begins rapid mitotic cleavage without cellular growth, forming a solid 16-cell sphere known as a morula by Day 3–4.\n\nFluid accumulates inside, converting the morula into a hollow blastocyst comprising:\n1. Outer Trophoblast: Responsible for chorionic sac formation and uterine wall implantation (starting Day 6–7).\n2. Inner Cell Mass (Embryoblast): Pluripotent cells that will form the entire embryo proper.\n\nDuring implantation, the trophoblast differentiates into the inner cytotrophoblast and outer multinucleated syncytiotrophoblast, which secretes human chorionic gonadotropin (hCG) to sustain the corpus luteum.',
            id: 'Setelah pembuahan di ampula tuba falopi, zigot diploid memulai pembelahan mitosis cepat tanpa penambahan ukuran sel, membentuk bola padat 16 sel yang disebut morula pada Hari ke 3–4.\n\nCairan menumpuk di bagian dalam, mengubah morula menjadi blastokista berongga yang terdiri dari:\n1. Trofoblas Luar: Bertanggung jawab untuk pembentukan kantung korion dan implantasi dinding rahim (mulai Hari ke 6–7).\n2. Massa Sel Dalam (Embrioblas): Sel-sel pluripoten yang akan berkembang menjadi seluruh tubuh embrio.\n\nSelama implantasi, trofoblas berdiferensiasi menjadi sitotrofoblas dalam dan sinsisiotrofoblas luar berinti banyak, yang menyekresikan hormon human chorionic gonadotropin (hCG) untuk mempertahankan korpus luteum.',
          },
          formula: '\\text{Zygote} \\longrightarrow \\text{Morula (16 cells)} \\longrightarrow \\text{Blastocyst (Inner Cell Mass + Trophoblast)} \\longrightarrow \\text{Bilaminar Disc}',
          formulaExplanation: {
            en: 'The chronological morphological sequence during the first seven post-conception days.',
            id: 'Urutan morfologis kronologis selama tujuh hari pertama pasca-konsepsi.',
          },
          keyTakeaways: {
            en: [
              'The blastocyst implants into the posterior-superior uterine endometrium around day 6–8.',
              'Gastrulation converts the bilaminar disc (epiblast + hypoblast) into the trilaminar embryonic disc (Ectoderm, Mesoderm, Endoderm).',
              'The primitive node and streak establish the cranial-caudal and left-right anatomical axes.',
            ],
            id: [
              'Blastokista berimplantasi pada endometrium rahim posterior-superior sekitar hari ke 6–8.',
              'Gastrulasi mengubah lempeng bilaminar (epiblas + hipoblas) menjadi lempeng embrionik trilaminar (Ektoderm, Mesoderm, Endoderm).',
              'Nodus primitif dan alur primitif (primitive streak) menetapkan sumbu anatomi kranial-kaudal dan kiri-kanan.',
            ],
          },
        },
        {
          id: 'emb-1-sec-2',
          title: {
            en: '2. The Three Primary Germ Layers & Neural Tube Closure',
            id: '2. Tiga Lapisan Germinal Primer & Penutupan Tabung Saraf',
          },
          content: {
            en: 'Through epiblast cell ingression during Week 3 gastrulation, three distinct germ layers differentiate:\n\n• Ectoderm: Gives rise to the central and peripheral nervous system, retina, epidermis, hair, nails, and enamel.\n• Mesoderm: Forms the paraxial somites (axial skeleton, skeletal muscle), intermediate mesoderm (urogenital system), and lateral plate mesoderm (circulatory system, heart, connective tissue).\n• Endoderm: Forms the epithelial lining of the gastrointestinal tract, respiratory system, liver, gallbladder, and pancreas.\n\nBy Day 22, the neural plate folds along the notochord to form the neural tube. The cranial neuropore closes around Day 25, followed by the caudal neuropore at Day 28.',
            id: 'Melalui ingresi sel epiblas selama gastrulasi Minggu ke-3, terbentuk tiga lapisan germinal utama:\n\n• Ektoderm: Menghasilkan sistem saraf pusat dan perifer, retina, epidermis kulit, rambut, kuku, dan enamel gigi.\n• Mesoderm: Membentuk somit paraksial (tulang aksial, otot rangka), mesoderm intermediat (sistem urogenital), dan mesoderm lempeng lateral (sistem sirkulasi, jantung, jaringan ikat).\n• Endoderm: Membentuk lapisan epitel saluran pencernaan, sistem pernapasan, hati, kantung empedu, dan pankreas.\n\nPada Hari ke-22, lempeng saraf melipat di sepanjang notokorda membentuk tabung saraf. Neuropor kranial menutup sekitar Hari ke-25, diikuti oleh neuropor kaudal pada Hari ke-28.',
          },
          keyTakeaways: {
            en: [
              'Folic acid intake prior to conception reduces neural tube defects (e.g., spina bifida, anencephaly) by up to 70%.',
              'The notochord acts as the primary embryonic inducer for overlying ectoderm neuralization.',
              'Neural crest cells migrate extensively to form craniofacial cartilage, melanocytes, and sympathetic ganglia.',
            ],
            id: [
              'Asupan asam folat sebelum konsepsi mengurangi risiko defek tabung saraf (misal spina bifida, anensefali) hingga 70%.',
              'Notokorda bertindak sebagai penginduksi embrio primer untuk neuralisasi ektoderm di atasnya.',
              'Sel krista neural bermigrasi luas untuk membentuk kartilago kraniofasial, melanosit, dan ganglia simpatis.',
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
            en: '1. Pharyngeal Arches, Cardiac Looping & Limb Buds',
            id: '1. Lengkung Faring, Looping Jantung & Tunas Anggota Tubuh',
          },
          content: {
            en: 'Between weeks 5 and 8, the embryo undergoes intense organogenesis. This is the period of highest susceptibility to teratogenic agents (drugs, radiation, viral infections):\n\n• Upper and Lower Limb Buds: Appear at day 26–28 as paddle-shaped mesodermal outgrowths with an apical ectodermal ridge (AER). By week 7, programmed apoptosis in interdigital tissue forms separate fingers and toes.\n• Cardiac Looping: The linear heart tube bends and loops to the right (dextral looping), placing the primitive atria cranial and dorsal to the developing ventricles.\n• Pharyngeal (Branchial) Arches: Five pairs of arches form the jaw (mandibular arch I), ossicles of the middle ear, hyoid apparatus, and thyroid/parathyroid glandular foundations.',
            id: 'Antara minggu ke-5 dan ke-8, embrio mengalami organogenesis intensif. Ini adalah periode dengan kerentanan tertinggi terhadap agen teratogenik (obat keras, radiasi, infeksi virus):\n\n• Tunas Anggota Tubuh Atas dan Bawah: Muncul pada hari ke 26–28 sebagai tonjolan mesodermal berbentuk dayung dengan apical ectodermal ridge (AER). Pada minggu ke-7, apoptosis terprogram pada jaringan interdigital memisahkan jari-jari tangan dan kaki.\n• Looping Jantung: Tabung jantung linier melipat dan berputar ke kanan (dextral looping), menempatkan atrium primitif di posisi kranial dan dorsal terhadap ventrikel.\n• Lengkung Faring (Branchial Arches): Lima pasang lengkung membentuk rahang (lengkung mandibular I), tulang pendengaran telinga tengah, aparatus hioid, dan dasar kelenjar tiroid/paratiroid.',
          },
          keyTakeaways: {
            en: [
              'By the end of Week 8, the embryonic stage concludes: all fundamental adult organ systems are established in rudimentary form.',
              'Crown-Rump Length (CRL) reaches approximately 30 mm (1.2 inches) by the 8th week.',
              'The heart rate accelerates from ~100 bpm at week 5 to a peak of ~170 bpm at week 9.',
            ],
            id: [
              'Pada akhir Minggu ke-8, fase embrio berakhir: semua sistem organ dewasa fundamental telah terbentuk dalam wujud rudimenter.',
              'Panjang Puncak Kepala-Bokong (CRL) mencapai sekitar 30 mm pada minggu ke-8.',
              'Denyut jantung janin meningkat dari ~100 bpm di minggu ke-5 hingga puncaknya ~170 bpm pada minggu ke-9.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q2-1',
          question: {
            en: 'Why are weeks 3 through 8 called the most critical teratogenic window during human prenatal development?',
            id: 'Mengapa minggu ke-3 hingga ke-8 disebut sebagai jendela teratogenik paling kritis selama perkembangan prenatal manusia?',
          },
          options: {
            en: [
              'Because this is the window of primary organogenesis, where major anatomical organs form and are most vulnerable to disruption',
              'Because the fetus begins to breathe atmospheric air',
              'Because the placenta stops functioning',
              'Because maternal blood mixes directly with fetal blood',
            ],
            id: [
              'Karena ini adalah periode organogenesis primer, di mana organ anatomi utama terbentuk dan sangat rentan terhadap kerusakan',
              'Karena janin mulai menghirup udara atmosfer',
              'Karena plasenta berhenti berfungsi',
              'Karena darah ibu bercampur langsung dengan darah janin',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Organogenesis occurs during weeks 3–8. Exposure to teratogens (e.g., thalidomide, rubella) during this window causes severe congenital structural malformations.',
            id: 'Organogenesis terjadi pada minggu 3–8. Paparan teratogen (misal talidomid, rubela) selama rentang ini menyebabkan malformasi struktural kongenital yang berat.',
          },
        },
      ],
    },
    {
      id: 'emb-mod-3',
      topicId: 'fetus-development',
      order: 3,
      title: {
        en: 'Weeks 9–24: Fetal Growth, Skeletal Ossification & Ultrasound',
        id: 'Minggu 9–24: Pertumbuhan Fetal, Osifikasi Tulang & USG',
      },
      shortDescription: {
        en: 'Rapid somatic growth, endochondral bone ossification, fetal circulation shunts, and clinical ultrasound biometry.',
        id: 'Pertumbuhan somatik pesat, osifikasi endokondral tulang, pirau sirkulasi janin, dan biometri USG klinis.',
      },
      durationMinutes: 22,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'ultrasound-scan',
      sections: [
        {
          id: 'emb-3-sec-1',
          title: {
            en: '1. Fetal Circulation Shunts (Ductus Venosus, Foramen Ovale, Ductus Arteriosus)',
            id: '1. Pirau Sirkulasi Janin (Duktus Venosus, Foramen Ovale, Duktus Arteriosus)',
          },
          content: {
            en: 'Because the fetal lungs are non-functional and fluid-filled, fetal circulation depends on three unique vascular shunts to route oxygenated blood from the placenta directly to the brain and heart:\n\n1. Ductus Venosus: Shunts ~50% of oxygen-rich blood from the umbilical vein directly into the inferior vena cava (IVC), bypassing the liver capillary bed.\n2. Foramen Ovale: An interatrial valve flap that directs highly oxygenated IVC blood from the right atrium straight into the left atrium, ensuring the carotid arteries and coronary arteries receive the highest oxygen tension.\n3. Ductus Arteriosus: Connects the pulmonary trunk to the descending aorta, diverting deoxygenated right ventricular blood away from the high-resistance pulmonary vascular bed into the lower body and umbilical arteries.\n\nAt birth, first breath lowers pulmonary vascular resistance, reversing atrial pressure and closing the foramen ovale within minutes.',
            id: 'Karena paru-paru janin belum berfungsi dan terisi cairan, sirkulasi janin mengandalkan tiga pirau (shunt) vaskular unik untuk mengalirkan darah teroksigenasi dari plasenta langsung ke otak dan miokardium:\n\n1. Duktus Venosus: Mengalirkan ~50% darah kaya oksigen dari vena umbilikalis langsung ke vena kava inferior (IVC), melewati jaringan kapiler hati.\n2. Foramen Ovale: Katup interatrial yang mengalirkan darah beroksigen tinggi dari atrium kanan langsung ke atrium kiri, memastikan arteri karotis dan koroner menerima kadar oksigen tertinggi.\n3. Duktus Arteriosus: Menghubungkan batang pulmonal ke aorta desendens, mengalihkan darah ventrikel kanan dari resistensi paru yang tinggi ke tubuh bagian bawah dan arteri umbilikalis.\n\nSaat lahir, tarikan napas pertama menurunkan resistensi vaskular paru, membalikkan tekanan atrium dan menutup foramen ovale dalam hitungan menit.',
          },
          formula: '\\text{Umbilical Vein (80\\% } O_2) \\longrightarrow \\text{Ductus Venosus} \\longrightarrow \\text{IVC} \\longrightarrow \\text{Foramen Ovale} \\longrightarrow \\text{Left Ventricle} \\longrightarrow \\text{Brain & Coronaries}',
          formulaExplanation: {
            en: 'Preferential high-oxygen blood route in the fetal circulatory hierarchy.',
            id: 'Jalur preferensial darah beroksigen tinggi dalam hierarki sirkulasi janin.',
          },
          keyTakeaways: {
            en: [
              'Ultrasound biometry measures Crown-Rump Length (CRL), Biparietal Diameter (BPD), Head Circumference (HC), and Femur Length (FL) for gestational dating.',
              'Fetal movements (quickening) are typically felt by the mother between weeks 16 and 20.',
              'By week 20, lanugo hair and vernix caseosa coat the skin to protect against amniotic fluid maceration.',
            ],
            id: [
              'Biometri USG mengukur CRL, Diameter Biparietal (BPD), Lingkar Kepala (HC), dan Panjang Femur (FL) untuk penentuan usia kehamilan akurat.',
              'Gerakan janin (quickening) umumnya mulai dirasakan ibu antara minggu ke-16 hingga ke-20.',
              'Pada minggu ke-20, rambut halus lanugo dan verniks kaseosa melapisi kulit untuk melindungi dari maserasi cairan amnion.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q3-1',
          question: {
            en: 'Which fetal vascular structure directs oxygen-rich blood from the right atrium directly into the left atrium, bypassing the non-aerated fetal lungs?',
            id: 'Struktur vaskular janin manakah yang mengalirkan darah kaya oksigen dari atrium kanan langsung ke atrium kiri, melewati paru-paru yang belum bernapas?',
          },
          options: {
            en: ['Foramen Ovale', 'Ductus Arteriosus', 'Ductus Venosus', 'Ligamentum Teres'],
            id: ['Foramen Ovale', 'Duktus Arteriosus', 'Duktus Venosus', 'Ligamentum Teres'],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The foramen ovale is an aperture between the right and left atrium allowing physiological right-to-left shunting in utero.',
            id: 'Foramen ovale adalah celah katup antara atrium kanan dan kiri yang memungkinkan pirau fisiologis dari kanan ke kiri in utero.',
          },
        },
      ],
    },
    {
      id: 'emb-mod-4',
      topicId: 'fetus-development',
      order: 4,
      title: {
        en: 'Weeks 25–40: Viability, Alveolar Surfactant & Birth Readiness',
        id: 'Minggu 25–40: Viabilitas, Surfaktan Paru & Kesiapan Kelahiran',
      },
      shortDescription: {
        en: 'Third trimester neuromuscular maturation, pulmonary surfactant synthesis by type II pneumocytes, and preparation for extrauterine life.',
        id: 'Pematangan neuromuskular trimester ketiga, sintesis surfaktan paru oleh pneumosit tipe II, dan adaptasi ekstrauterin.',
      },
      durationMinutes: 18,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'embryo-timeline',
      sections: [
        {
          id: 'emb-4-sec-1',
          title: {
            en: '1. Pulmonary Surfactant & The Threshold of Viability',
            id: '1. Surfaktan Paru & Batas Viabilitas Janin',
          },
          content: {
            en: 'Fetal viability (the ability to survive extrauterine life with specialized neonatal intensive care) begins around Week 24, where primitive terminal sacs (saccular stage) and vascularized capillary networks form.\n\nCrucially, Type II Alveolar Pneumocytes begin producing pulmonary surfactant (a lipoprotein complex predominantly dipalmitoylphosphatidylcholine [DPPC]) around week 24–28, reaching functional maturity around Week 34–35. Surfactant lowers surface tension at the air-liquid alveolar interface according to Laplace\'s law:\n\nΔP = 2γ / r\n\nWithout adequate surfactant, small alveoli (small radius r) develop immense collapsing pressure, leading to neonatal respiratory distress syndrome (NRDS). In the final weeks, brown adipose tissue (BAT) accumulates for non-shivering thermogenesis, and maternal IgG antibodies cross the syncytiotrophoblast to endow the newborn with passive immunity.',
            id: 'Viabilitas janin (kemampuan bertahan hidup di luar rahim dengan perawatan intensif neonatal) dimulai sekitar Minggu ke-24, ketika kantung terminal primitif (stadium sakular) dan jaringan kapiler terbentuk.\n\nYang paling penting, Sel Pneumosit Tipe II mulai memproduksi surfaktan paru (kompleks lipoprotein dipalmitoilfosfatidilkolin [DPPC]) sekitar minggu 24–28, mencapai kematangan fungsional penuh pada Minggu ke 34–35. Surfaktan menurunkan tegangan permukaan pada antarmuka udara-cairan alveolus sesuai hukum Laplace:\n\nΔP = 2γ / r\n\nTanpa surfaktan yang cukup, alveolus kecil (jari-jari r kecil) mengalami tekanan kolaps yang sangat tinggi, menyebabkan sindrom distres pernapasan neonatus (NRDS). Pada minggu-minggu terakhir, jaringan lemak cokelat (brown adipose tissue) menumpuk untuk termogenesis, dan antibodi IgG ibu menembus sinsisiotrofoblas untuk memberikan imunitas pasif.',
          },
          formula: '\\Delta P = \\frac{2 \\gamma}{r} \\quad \\text{(Laplace\'s Law for Spherical Alveoli)}',
          formulaExplanation: {
            en: 'Collapsing pressure ΔP is inversely proportional to alveolar radius r and directly proportional to surface tension γ. Surfactant dramatically decreases γ.',
            id: 'Tekanan kolaps alveolus ΔP berbanding terbalik dengan jari-jari r dan berbanding lurus dengan tegangan permukaan γ. Surfaktan secara drastis menurunkan γ.',
          },
          keyTakeaways: {
            en: [
              'Lecithin/Sphingomyelin (L/S) ratio in amniotic fluid > 2.0 indicates mature fetal lung development.',
              'Average full-term parameters: gestational age 38–40 weeks, weight 3.2–3.6 kg, crown-heel length 50 cm.',
              'During the 9th month, the fetus shifts to the cephalic (vertex) presentation with head engaged in the maternal pelvic inlet.',
            ],
            id: [
              'Rasio Lesitin/Sfingomielin (L/S) dalam cairan amnion > 2.0 mengindikasikan kematangan paru janin yang adekuat.',
              'Parameter rata-rata cukup bulan: usia kehamilan 38–40 minggu, berat badan 3.2–3.6 kg, panjang kepala-tumit 50 cm.',
              'Pada bulan ke-9, janin biasanya berada pada posisi presentasi sefalik (kepala di bawah) yang masuk ke pintu atas panggul ibu.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'emb-q4-1',
          question: {
            en: 'What is the primary physiological function of pulmonary surfactant produced by fetal Type II pneumocytes?',
            id: 'Apa fungsi fisiologis utama dari surfaktan paru yang diproduksi oleh sel pneumosit tipe II janin?',
          },
          options: {
            en: [
              'It lowers alveolar surface tension, preventing alveolar collapse during expiration',
              'It thickens the alveolar wall to prevent fluid leaking',
              'It provides glucose directly to the red blood cells',
              'It accelerates cardiac contraction rate',
            ],
            id: [
              'Menurunkan tegangan permukaan alveolus, mencegah kolapsnya alveolus saat ekspirasi',
              'Menebalkan dinding alveolus untuk mencegah kebocoran cairan',
              'Memberikan glukosa langsung ke sel darah merah',
              'Mempercepat denyut kontraksi jantung',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Pulmonary surfactant disrupts water molecule hydrogen bonding at the alveolar surface, dramatically reducing surface tension and work of breathing.',
            id: 'Surfaktan paru memutus ikatan hidrogen molekul air pada permukaan alveolus, secara drastis mengurangi tegangan permukaan dan kerja otot pernapasan.',
          },
        },
      ],
    },
  ],
};
