import { Topic } from '@/types/learning';

export const hypertensionTopic: Topic = {
  id: 'hypertension',
  title: {
    en: 'Hypertension & Vascular Hemodynamics',
    id: 'Hipertensi & Hemodinamika Vaskular',
  },
  tagline: {
    en: 'Essential, Secondary, Isolated Systolic, Hypertensive Crises, Gestational, and Pulmonary Hypertension.',
    id: 'Hipertensi Primer, Sekunder, Sistolik Terisolasi, Krisis Hipertensi, Gestasional, dan Hipertensi Pulmonal.',
  },
  description: {
    en: 'Master the comprehensive spectrum of clinical hypertension: neurohumoral renin-angiotensin-aldosterone system (RAAS) regulation, vascular wall remodeling, endothelial shear stress, all secondary etiologies (endocrine, renovascular, aortic coarctation), hypertensive emergencies vs urgencies, arterial stiffness and pulse wave velocity (PWV), gestational preeclampsia, and WHO Group 1–5 pulmonary arterial hypertension.',
    id: 'Kuasai spektrum komprehensif hipertensi klinis: regulasi neurohumoral aksis RAAS, remodeling dinding vaskular, shear stress endotel, etiologi sekunder lengkap (endokrin, renovaskular, koarktasio aorta), krisis hipertensi emergensi vs urgensi, kekakuan arteri dan kecepatan gelombang nadi (PWV), preeklamsia gestasional, serta hipertensi pulmonal Grup WHO 1–5.',
  },
  category: {
    en: 'Cardiovascular Medicine & Hemodynamics',
    id: 'Kedokteran Kardiovaskular & Hemodinamika',
  },
  colorAccent: 'amber',
  badgeColor: 'from-amber-600 to-orange-700',
  iconName: 'Gauge',
  modules: [
    // -------------------------------------------------------------
    // PART 1: PRIMARY (ESSENTIAL) HYPERTENSION & HEMODYNAMICS
    // -------------------------------------------------------------
    {
      id: 'hyp-mod-1',
      topicId: 'hypertension',
      order: 1,
      title: {
        en: 'Primary (Essential) Hypertension & Hemodynamic Regulation',
        id: 'Hipertensi Primer (Esensial) & Regulasi Hemodinamika',
      },
      shortDescription: {
        en: 'Mean Arterial Pressure (MAP = CO × SVR), RAAS axis, sympathetic overdrive, endothelial dysfunction, and vascular wall remodeling.',
        id: 'Tekanan Arteri Rata-rata (MAP = CO × SVR), aksis RAAS, hiperaktivitas simpatis, disfungsi endotel, dan remodeling dinding arteri.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'vascular-hemodynamics',
      sections: [
        {
          id: 'hyp-1-sec-1',
          title: {
            en: '1. Hemodynamic Fundamentals: The Darcy-Poiseuille Law of Circulation',
            id: '1. Dasar Hemodinamika: Hukum Darcy-Poiseuille Sirkulasi',
          },
          content: {
            en: 'Systemic arterial blood pressure is fundamentally determined by the product of Cardiac Output (CO) and Systemic Vascular Resistance (SVR), analogous to Ohm\'s law in electric circuits:\n\nMAP = CO × SVR\n\nWhere Cardiac Output is the product of Heart Rate (HR) and Stroke Volume (SV). Systemic Vascular Resistance resides primarily within small resistance arteries and arterioles (luminal diameter 50–300 µm). According to the Hagen-Poiseuille equation for laminar viscous fluid flow:\n\nR = (8 · η · L) / (π · r^4)\n\nBecause resistance is inversely proportional to the fourth power of the vessel radius (r^4), a tiny 16% reduction in arteriolar radius doubles vascular resistance (2^1 = 1.19^4)! Consequently, subtle changes in arteriolar smooth muscle tone and structural luminal caliber exert profound amplification upon systemic blood pressure.\n\nIn early, borderline essential hypertension (particularly in young adults), elevated cardiac output and sympathetic overdrive often initiate the disease. Over time, autoregulatory vasoconstriction elevates SVR while cardiac output normalizes, transitioning into established high-resistance hypertension.',
            id: 'Tekanan darah arteri sistemik pada dasarnya ditentukan oleh hasil kali antara Curah Jantung (Cardiac Output/CO) dan Resistansi Vaskular Sistemik (Systemic Vascular Resistance/SVR), analog dengan Hukum Ohm pada sirkuit listrik:\n\nMAP = CO × SVR\n\nDi mana Curah Jantung adalah hasil kali Denyut Jantung (HR) dan Curah Sekuncup (Stroke Volume/SV). Resistansi vaskular sistemik berpusat terutama pada arteri resistansi kecil dan arteriol (diameter lumen 50–300 µm). Mengacu pada persamaan aliran fluida viskos laminar Hagen-Poiseuille:\n\nR = (8 · η · L) / (π · r^4)\n\nKarena resistansi berbanding terbalik dengan jari-jari lumen pangkat empat (r^4), penurunan jari-jari arteriol sekecil 16% saja akan melipatgandakan resistansi vaskular sebanyak dua kali lipat! Akibatnya, sedikit saja peningkatan tonus vasokonstriksi atau penyempitan struktural arteriol akan memperbesar tekanan darah secara eksponensial.\n\nPada hipertensi primer dini (khususnya usia muda), hiperaktivitas simpatis dan peningkatan curah jantung kerap menjadi pemicu awal. Seiring waktu, vasokonstriksi autoregulasi meningkatkan SVR sementara curah jantung kembali normal, menetap sebagai hipertensi resistansi tinggi.',
          },
          formula: '\\text{MAP} = \\text{CO} \\times \\text{SVR} = (\\text{HR} \\times \\text{SV}) \\times \\left( \\frac{8\\eta L}{\\pi r^4} \\right)',
          formulaExplanation: {
            en: 'The Darcy-Poiseuille formulation demonstrating that systemic Mean Arterial Pressure is exquisitely sensitive to arteriolar radius (r^4). Minute arteriolar narrowing dramatically elevates systemic afterload.',
            id: 'Formulasi Darcy-Poiseuille yang membuktikan bahwa Tekanan Arteri Rata-rata sangat peka terhadap jari-jari arteriol (r^4). Penyempitan arteriol mikroskopis secara drastis meningkatkan afterload sistemik.',
          },
          variables: [
            {
              symbol: 'MAP',
              name: { en: 'Mean Arterial Pressure', id: 'Tekanan Arteri Rata-rata' },
              unit: 'mmHg',
              description: {
                en: 'Average arterial perfusion pressure throughout one cardiac cycle.',
                id: 'Tekanan perfusi arteri rata-rata sepanjang satu siklus jantung.',
              },
            },
            {
              symbol: 'CO',
              name: { en: 'Cardiac Output', id: 'Curah Jantung' },
              unit: 'L/min',
              description: {
                en: 'Volume of blood pumped by the left ventricle per minute.',
                id: 'Volume darah yang dipompakan oleh ventrikel kiri tiap menit.',
              },
            },
            {
              symbol: 'SVR',
              name: { en: 'Systemic Vascular Resistance', id: 'Resistansi Vaskular Sistemik' },
              unit: 'dynes·s/cm⁵',
              description: {
                en: 'Total resistance opposed by the systemic microvascular bed.',
                id: 'Resistansi total yang diberikan oleh jalinan mikrovaskular sistemik.',
              },
            },
            {
              symbol: 'r',
              name: { en: 'Internal Arteriolar Radius', id: 'Jari-jari Lumen Arteriol' },
              unit: 'micrometers (µm)',
              description: {
                en: 'Internal radius of precapillary resistance vessels.',
                id: 'Jari-jari dalam pembuluh darah resistansi prekapiler.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Blood pressure is the product of cardiac output and systemic vascular resistance (MAP = CO × SVR).',
              'Poiseuille\'s law dictates that small resistance arterioles (r^4 dependence) are the primary regulators of SVR.',
            ],
            id: [
              'Tekanan darah adalah hasil kali curah jantung dan resistansi vaskular sistemik (MAP = CO × SVR).',
              'Hukum Poiseuille menegaskan bahwa arteriol resistansi kecil (ketergantungan r^4) adalah pengendali utama SVR.',
            ],
          },
        },
        {
          id: 'hyp-1-sec-2',
          title: {
            en: '2. Pathophysiological Mechanisms: RAAS, Sympathetic Overdrive & Vascular Remodeling',
            id: '2. Mekanisme Patofisiologis: Aksis RAAS, Tonus Simpatis & Remodeling Vaskular',
          },
          content: {
            en: 'Essential (primary) hypertension accounts for approximately 90–95% of all hypertensive adults. Its pathogenesis involves complex multi-system neurohumoral dysregulation:\n\n1. Renin-Angiotensin-Aldosterone System (RAAS):\n- Juxtaglomerular apparatus granular cells in the renal afferent arteriole release Renin in response to renal hypoperfusion, beta-1 sympathetic activation, or low macula densa sodium delivery.\n- Renin cleaves hepatic Angiotensinogen into Angiotensin I (inactive decapeptide).\n- Angiotensin-Converting Enzyme (ACE, predominantly on pulmonary and vascular endothelial surfaces) hydrolyzes Ang I into Angiotensin II (Ang II, potent octapeptide).\n- Ang II binds Angiotensin II Type 1 receptors (AT1R) causing: immediate potent arteriolar vasoconstriction, renal tubular sodium reabsorption, stimulation of adrenal zona glomerulosa aldosterone secretion, reactive oxygen species (ROS) generation via NADPH oxidase, and vascular smooth muscle hypertrophy.\n\n2. Sympathetic Nervous System (SNS) Overdrive: Resetting of arterial baroreflex set-points, elevated central sympathetic outflow, and increased renal sympathetic nerve activity (inducing both afferent signaling to the hypothalamus and efferent renin hypersecretion).\n\n3. Vascular Wall Remodeling:\n- Eutrophic Inward Remodeling: In mild-to-moderate essential hypertension, vascular smooth muscle cells rearrange around a smaller lumen without increasing cross-sectional wall area, elevating the media-to-lumen ratio (M/L).\n- Hypertrophic Remodeling: In severe long-standing hypertension, smooth muscle cells hypertrophy and deposit collagen types I and III, reducing vascular lumen diameter and diminishing compliance.\n- Endothelial Dysfunction: Reduced bioavailability of endothelium-derived Nitric Oxide (NO) due to oxidative superoxide (O2•-) scavenging, uncoupling endothelial nitric oxide synthase (eNOS) and favoring vasoconstrictor endothelin-1.',
            id: 'Hipertensi esensial (primer) mencakup sekitar 90–95% dari seluruh kasus hipertensi dewasa. Patogenesisnya melibatkan disregulasi neurohumoral multi-organ yang kompleks:\n\n1. Aksis Renin-Angiotensin-Aldosteron (RAAS):\n- Sel granular aparatus jukstaglomerulus di arteriol aferen ginjal melepaskan Renin sebagai respon terhadap hipoperfusi renal, stimulasi simpatis beta-1, atau penurunan natrium di makula densa.\n- Renin memecah Angiotensinogen asal hepar menjadi Angiotensin I (dekapeptida inaktif).\n- Angiotensin-Converting Enzyme (ACE, terutama di endotel kapiler paru dan vaskular) menghidrolisis Ang I menjadi Angiotensin II (Ang II, oktapeptida sangat poten).\n- Ang II berikatan dengan reseptor AT1 (AT1R) memicu: vasokonstriksi arteriol kuat, reabsorpsi natrium tubulus renal, stimulasi sekresi aldosteron oleh zona glomerulosa adrenal, pembentukan Reactive Oxygen Species (ROS) via NADPH oksidase, dan hipertrofi otot polos vaskular.\n\n2. Hiperaktivitas Saraf Simpatis (SNS Overdrive): Pengesetan ulang (resetting) sensitivitas barorefleks arteri, peningkatan impuls simpatis sentral, dan peningkatan aktivitas saraf simpatis renal.\n\n3. Remodeling Dinding Vaskular:\n- Eutrophic Inward Remodeling: Pada hipertensi primer ringan-sedang, sel otot polos menyusun ulang posisinya mengelilingi lumen yang lebih sempit tanpa menambah luas penampang total dinding, meningkatkan rasio media-terhadap-lumen (M/L).\n- Hypertrophic Remodeling: Pada hipertensi berat menahun, sel otot polos mengalami hipertrofi dan menimbun kolagen tipe I dan III, mempersempit lumen dan melenyapkan elastisitas arteri.\n- Disfungsi Endotel: Penurunan bioavailabilitas Nitric Oxide (NO) akibat netralisasi oleh radikal superoksida (O2•-), memicu uncoupling enzim eNOS dan dominansi vasokonstriktor endotelin-1.',
          },
          keyTakeaways: {
            en: [
              'Angiotensin II exerts powerful vasoconstriction, aldosterone release, and vascular remodeling via AT1 receptors.',
              'Chronic hypertension induces eutrophic inward remodeling and endothelial dysfunction, perpetuating elevated SVR.',
            ],
            id: [
              'Angiotensin II memicu vasokonstriksi kuat, pelepasan aldosteron, dan remodeling vaskular melalui reseptor AT1.',
              'Hipertensi kronis memicu eutrophic inward remodeling dan disfungsi endotel yang melanggengkan peningkatan SVR.',
            ],
          },
        },
        {
          id: 'hyp-1-sec-3',
          title: {
            en: '3. ACC/AHA 2017 & ESC/ESH 2024 Guidelines: Diagnostic Thresholds and Pharmacotherapy',
            id: '3. Pedoman ACC/AHA 2017 & ESC/ESH 2024: Ambang Diagnostik dan Farmakoterapi',
          },
          content: {
            en: 'Standardized clinical blood pressure measurement requires a calibrated device, appropriate cuff size (bladder encircling 80% of arm circumference), patient seated quietly for 5 minutes, arm supported at heart level, with avoidance of caffeine, smoking, and exercise for 30 minutes.\n\nACC/AHA 2017 Blood Pressure Classification:\n- Normal: SBP < 120 mmHg AND DBP < 80 mmHg.\n- Elevated: SBP 120–129 mmHg AND DBP < 80 mmHg.\n- Stage 1 Hypertension: SBP 130–139 mmHg OR DBP 80–89 mmHg.\n- Stage 2 Hypertension: SBP ≥ 140 mmHg OR DBP ≥ 90 mmHg.\n\n(ESC/ESH 2024 similarly categorizes BP: Non-elevated <120/<70, Elevated 120–139/70–89, and Hypertension ≥140/90 mmHg).\n\nFirst-Line Evidence-Based Pharmacotherapy:\n1. Angiotensin-Converting Enzyme Inhibitors (ACEi: Lisinopril, Ramipril) or Angiotensin Receptor Blockers (ARB: Losartan, Valsartan, Telmisartan): First choice in diabetic kidney disease, proteinuria, or heart failure with reduced ejection fraction. (Note: Combining ACEi and ARB is strictly contraindicated due to hyperkalemia and renal failure risk).\n2. Dihydropyridine Calcium Channel Blockers (DHP-CCBs: Amlodipine, Nifedipine GITS): Inhibit L-type voltage-gated calcium channels in vascular smooth muscle, causing arteriolar vasodilation. Highly effective across all demographics and preferred in isolated systolic hypertension.\n3. Thiazide & Thiazide-like Diuretics (Chlorthalidone, Indapamide, Hydrochlorothiazide): Inhibit the Na+/Cl- cotransporter (NCCT) in the renal distal convoluted tubule, inducing initial natriuresis followed by sustained reduction in peripheral vascular resistance.\n- Guideline Standard: For Stage 2 hypertension (>20/10 mmHg above goal), initiate therapy with two first-line agents of different classes simultaneously (ideally single-pill combination).',
            id: 'Pengukuran tekanan darah klinis terstandarisasi memerlukan sfigmomanometer terkalibrasi, ukuran manset yang tepat (kantung melingkari 80% lingkar lengan), pasien duduk tenang 5 menit, lengan bertumpu setinggi jantung, serta bebas kafein, rokok, dan olahraga selama 30 menit.\n\nKlasifikasi Tekanan Darah ACC/AHA 2017:\n- Normal: TDS < 120 mmHg DAN TDD < 80 mmHg.\n- Meningkat (Elevated): TDS 120–129 mmHg DAN TDD < 80 mmHg.\n- Hipertensi Derajat 1: TDS 130–139 mmHg ATAU TDD 80–89 mmHg.\n- Hipertensi Derajat 2: TDS ≥ 140 mmHg ATAU TDD ≥ 90 mmHg.\n\nFarmakoterapi Lini Pertama Berbasis Bukti:\n1. Inhibitor ACE (Lisinopril, Ramipril) atau Angiotensin Receptor Blocker (ARB: Losartan, Valsartan, Telmisartan): Pilihan utama pada penyakit ginjal diabetik, proteinuria, atau gagal jantung fraksi ejeksi menurun. (Catatan: Kombinasi ACEi dan ARB bersamaan dilarang keras karena risiko hiperkalemia dan gagal ginjal akut).\n2. Dihidropiridin Penyekat Saluran Kalsium (DHP-CCB: Amlodipin, Nifedipin GITS): Menghambat saluran kalsium tipe-L pada otot polos arteri, menghasilkan vasodilatasi perifer efektif. Pilihan utama pada hipertensi sistolik terisolasi.\n3. Diuretik Serupa Tiazid (Klortalidon, Indapamid, Hidroklorotiazid): Menghambat kotransporter Na+/Cl- (NCCT) di tubulus kontortus distal ginjal, memicu natriuresis awal yang diikuti penurunan SVR jangka panjang.\n- Standar Pedoman: Pada Hipertensi Derajat 2 (>20/10 mmHg di atas target), terapi harus segera dimulai dengan kombinasi dua obat lini pertama dari kelas berbeda (idealnya kombinasi pil tunggal/single-pill combination).',
          },
          comparisonTable: {
            headers: {
              en: ['Drug Class', 'Key Prototype Agents', 'Primary Mechanism of Action', 'Compelling Indications'],
              id: ['Kelas Obat', 'Contoh Obat Utama', 'Mekanisme Kerja Utama', 'Indikasi Klinis Utama'],
            },
            rows: [
              {
                en: ['ACE Inhibitor (ACEi)', 'Lisinopril, Ramipril, Enalapril', 'Blocks conversion of Ang I to Ang II; blunts bradykinin breakdown', 'CKD with proteinuria, Diabetes, Post-MI, HFrEF'],
                id: ['Inhibitor ACE (ACEi)', 'Lisinopril, Ramipril, Enalapril', 'Menghambat konversi Ang I ke Ang II; menghambat pemecahan bradikinin', 'PGK dengan proteinuria, Diabetes, Pasca-IMA, HFrEF'],
              },
              {
                en: ['Angiotensin Receptor Blocker (ARB)', 'Losartan, Valsartan, Telmisartan', 'Selective competitive antagonism of the AT1 receptor', 'ACEi cough intolerance, CKD, Diabetes, Heart Failure'],
                id: ['Angiotensin Receptor Blocker (ARB)', 'Losartan, Valsartan, Telmisartan', 'Antagonis kompetitif selektif reseptor AT1', 'Batuk intoleran ACEi, PGK, Diabetes, Gagal Jantung'],
              },
              {
                en: ['DHP Calcium Channel Blocker', 'Amlodipine, Nifedipine GITS', 'Blocks L-type Ca2+ influx in vascular smooth muscle', 'Isolated Systolic HTN, Angina pectoris, Elderly, Stroke prevention'],
                id: ['DHP Penyekat Saluran Kalsium', 'Amlodipin, Nifedipin GITS', 'Menghambat influks kalsium tipe-L otot polos vaskular', 'Hipertensi Sistolik Terisolasi, Angina, Lansia, Pencegahan Stroke'],
              },
              {
                en: ['Thiazide-like Diuretic', 'Chlorthalidone, Indapamide', 'Inhibits distal tubule Na+/Cl- cotransporter; promotes natriuresis', 'Osteoporosis (reduces calciuria), Heart failure, Stroke prevention'],
                id: ['Diuretik Serupa Tiazid', 'Klortalidon, Indapamid', 'Menghambat kotransporter Na+/Cl- tubulus distal; memicu natriuresis', 'Osteoporosis (menurunkan kalsiuria), Gagal jantung, Pencegahan Stroke'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Stage 2 HTN (≥140/90 mmHg) mandates initial combination therapy with two different drug classes.',
              'First-line classes comprise ACEi/ARB, DHP-CCB, and thiazide-like diuretics.',
            ],
            id: [
              'Hipertensi Derajat 2 (≥140/90 mmHg) menuntut terapi kombinasi awal dua kelas obat berbeda.',
              'Tiga pilar kelas lini pertama mencakup ACEi/ARB, DHP-CCB, dan diuretik serupa tiazid.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyp-q1-1',
          question: {
            en: 'According to Poiseuille\'s Law of fluid dynamics, how does a 50% reduction in arteriolar lumen radius affect vascular resistance?',
            id: 'Berdasarkan Hukum Poiseuille tentang dinamika fluida, bagaimanakah pengaruh penyempitan jari-jari lumen arteriol sebesar 50% terhadap resistansi vaskular?',
          },
          options: {
            en: [
              'Resistance doubles (increases 2-fold)',
              'Resistance increases 4-fold',
              'Resistance increases 16-fold (2^4)',
              'Resistance remains unchanged due to myogenic reflex',
            ],
            id: [
              'Resistansi meningkat 2 kali lipat',
              'Resistansi meningkat 4 kali lipat',
              'Resistansi meningkat 16 kali lipat (2^4)',
              'Resistansi tetap tidak berubah akibat refleks miogenik',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Poiseuille\'s law states that resistance is inversely proportional to the radius to the fourth power (R ∝ 1/r^4). Halving the radius increases resistance by (1/0.5)^4 = 2^4 = 16 times.',
            id: 'Hukum Poiseuille menyatakan resistansi berbanding terbalik dengan jari-jari pangkat empat (R ∝ 1/r^4). Mengurangi separuh jari-jari (0.5) akan meningkatkan resistansi sebesar (1/0.5)^4 = 2^4 = 16 kali lipat.',
          },
        },
        {
          id: 'hyp-q1-2',
          question: {
            en: 'Which enzyme is responsible for converting Angiotensin I to the potent vasoconstrictor Angiotensin II?',
            id: 'Enzim manakah yang bertanggung jawab mengonversi Angiotensin I menjadi vasokonstriktor poten Angiotensin II?',
          },
          options: {
            en: [
              'Renin',
              'Angiotensin-Converting Enzyme (ACE)',
              'Aldosterone Synthase (CYP11B2)',
              'Neutral Endopeptidase (Neprilysin)',
            ],
            id: [
              'Renin',
              'Angiotensin-Converting Enzyme (ACE)',
              'Aldosteron Sintase (CYP11B2)',
              'Neutral Endopeptidase (Neprilisin)',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Angiotensin-Converting Enzyme (ACE), located predominantly on the luminal surface of pulmonary and systemic endothelial cells, cleaves two amino acids from Angiotensin I to form Angiotensin II.',
            id: 'Angiotensin-Converting Enzyme (ACE), yang berlokasi terutama pada permukaan luminal sel endotel vaskular dan kapiler paru, memotong dua asam amino dari Angiotensin I untuk membentuk Angiotensin II.',
          },
        },
        {
          id: 'hyp-q1-3',
          question: {
            en: 'According to the 2017 ACC/AHA hypertension guidelines, a persistent blood pressure of 146/94 mmHg is classified as:',
            id: 'Berdasarkan pedoman hipertensi ACC/AHA 2017, tekanan darah persisten sebesar 146/94 mmHg diklasifikasikan sebagai:',
          },
          options: {
            en: ['Elevated Blood Pressure', 'Stage 1 Hypertension', 'Stage 2 Hypertension', 'Hypertensive Emergency'],
            id: ['Tekanan Darah Meningkat (Elevated)', 'Hipertensi Derajat 1', 'Hipertensi Derajat 2', 'Hipertensi Emergensi'],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Stage 2 Hypertension is defined by an SBP ≥ 140 mmHg OR a DBP ≥ 90 mmHg. With SBP 146 and DBP 94, both criteria exceed the Stage 2 threshold.',
            id: 'Hipertensi Derajat 2 didefinisikan sebagai TDS ≥ 140 mmHg ATAU TDD ≥ 90 mmHg. Dengan TDS 146 dan TDD 94, kedua nilai telah melampaui ambang batas Derajat 2.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: SECONDARY HYPERTENSION: ALL MAJOR ETIOLOGIES
    // -------------------------------------------------------------
    {
      id: 'hyp-mod-2',
      topicId: 'hypertension',
      order: 2,
      title: {
        en: 'Secondary Hypertension: Endocrine, Renovascular & Mechanical Etiologies',
        id: 'Hipertensi Sekunder: Etiologi Endokrin, Renovaskular & Mekanis',
      },
      shortDescription: {
        en: 'Renal artery stenosis, Primary Aldosteronism (Conn\'s), Pheochromocytoma, Cushing\'s, Aortic Coarctation, and Obstructive Sleep Apnea.',
        id: 'Stenosis arteri renalis, Aldosteronisme Primer (Conn), Feokromositoma, Sindrom Cushing, Koarktasio Aorta, dan Obstructive Sleep Apnea.',
      },
      durationMinutes: 30,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'vascular-hemodynamics',
      sections: [
        {
          id: 'hyp-2-sec-1',
          title: {
            en: '1. Clinical Suspicion and Diagnostic Workup of Secondary Hypertension',
            id: '1. Kecurigaan Klinis dan Evaluasi Diagnostik Hipertensi Sekunder',
          },
          content: {
            en: 'Secondary hypertension represents high blood pressure caused by an identifiable and potentially curable underlying pathological condition, accounting for 5–10% of all hypertensive adults and up to 30% of young adults (<35 years).\n\n"Red Flags" Mandating Thorough Secondary Workup:\n1. Age of onset <30 years without family history, or new severe onset >55 years.\n2. Resistant Hypertension: Blood pressure remaining ≥130/80 mmHg despite adherence to maximum tolerated doses of at least 3 antihypertensive agents of different classes (including a diuretic).\n3. Abrupt loss of blood pressure control in a previously stable hypertensive patient.\n4. Hypertensive Urgency/Emergency presentation.\n5. Severe unprovoked or diuretic-induced hypokalemia (pointing toward hyperaldosteronism).\n6. Asymmetric kidneys or worsening renal function (creatinine rise >30%) after initiating an ACE inhibitor or ARB (pathognomonic for bilateral renal artery stenosis).\n7. Discrepancy between upper and lower extremity pulses/blood pressures.\n8. Paroxysmal triad: episodic headache, sweating (diaphoresis), and palpitations/tachycardia (suggestive of pheochromocytoma).',
            id: 'Hipertensi sekunder merupakan peningkatan tekanan darah yang dipicu oleh penyakit yang dapat diidentifikasi dan berpotensi disembuhkan, mencakup 5–10% populasi dewasa hipertensi dan hingga 30% pada usia muda (<35 tahun).\n\nTanda Waspada (Red Flags) yang Mewajibkan Pelacakan Hipertensi Sekunder:\n1. Awitan usia <30 tahun tanpa riwayat keluarga, atau awitan berat baru pada usia >55 tahun.\n2. Hipertensi Resisten: Tekanan darah tetap ≥130/80 mmHg meskipun patuh meminum dosis maksimal 3 obat antihipertensi dari kelas berbeda (salah satunya diuretik).\n3. Hilangnya kontrol tekanan darah mendadak pada pasien yang sebelumnya stabil.\n4. Presentasi klinis krisis hipertensi (urgensi atau emergensi).\n5. Hipokalemia tanpa pemicu jelas atau dipicu oleh diuretik dosis rendah (mengarah ke hiperaldosteronisme).\n6. Ukuran ginjal asimetris atau perburukan fungsi ginjal (kenaikan kreatinin >30%) sesaat setelah pemberian ACE inhibitor atau ARB (patognomonik stenosis arteri renalis bilateral).\n7. Perbedaan nyata denyut nadi atau tekanan darah antara ekstremitas atas dan bawah.\n8. Trias paroksismal: sakit kepala episodik, keringat dingin membasahi (diaforesis), dan palpitasi takikardia (mencurigakan feokromositoma).',
          },
          keyTakeaways: {
            en: [
              'Secondary hypertension must be actively investigated in young patients, resistant hypertension, and acute worsening.',
              'An acute rise in serum creatinine >30% following ACEi/ARB initiation strongly indicates renovascular disease.',
            ],
            id: [
              'Hipertensi sekunder wajib dilacak aktif pada usia muda, hipertensi resisten, dan perburukan mendadak.',
              'Peningkatan kreatinin serum akut >30% pasca-pemberian ACEi/ARB sangat mencurigakan penyakit renovaskular.',
            ],
          },
        },
        {
          id: 'hyp-2-sec-2',
          title: {
            en: '2. Renovascular Hypertension & The Goldblatt Phenomenon',
            id: '2. Hipertensi Renovaskular & Fenomena Goldblatt',
          },
          content: {
            en: 'Renovascular hypertension is driven by critical narrowing (≥70%) of one or both main renal arteries, decreasing renal perfusion pressure and triggering the classical Goldblatt "two-kidney, one-clip" physiology:\n\n1. Pathological Subtypes:\n- Atherosclerotic Renal Artery Stenosis (ARAS, 85–90%): Typically affects older males with generalized atherosclerosis; localized to the ostium and proximal third of the main renal artery.\n- Fibromuscular Dysplasia (FMD, 10–15%): Non-inflammatory, non-atherosclerotic vascular dysplasia affecting young females (15–50 years). The "string-of-beads" sign on angiography reflects medial fibroplasia with alternating aneurysmal dilatations and fibromuscular rings in the middle-to-distal renal artery.\n\n2. Pathophysiological Cascade:\n- Renal hypoperfusion at the juxtaglomerular apparatus triggers massive hypersecretion of Renin.\n- Systemic Angiotensin II levels surge, inducing intense systemic arteriolar vasoconstriction and aldosterone-mediated sodium retention.\n- In unilateral stenosis, the contralateral healthy kidney attempts pressure natriuresis, maintaining normal volume while renin remains high. In bilateral stenosis, volume expansion suppresses renin, causing refractory volume-overload hypertension and flash pulmonary edema (Pickering syndrome).\n\n3. Diagnosis & Revascularization:\n- Screening: Renal duplex Doppler ultrasonography (renal-aortic peak systolic velocity ratio RAR > 3.5), CT angiography (CTA), or MR angiography (MRA).\n- Treatment: FMD responds dramatically to balloon angioplasty without stenting. ARAS is primarily managed with guideline medical therapy, reserving stenting for flash pulmonary edema or refractory hypertension.',
            id: 'Hipertensi renovaskular dipicu oleh penyempitan kritis (≥70%) pada satu atau kedua arteri renalis utama, menurunkan tekanan perfusi ginjal dan mengaktifkan fisiologi klasik Goldblatt "two-kidney, one-clip":\n\n1. Subtipe Patologis:\n- Atherosclerotic Renal Artery Stenosis (ARAS, 85–90%): Umumnya terjadi pada pria usia lanjut dengan riwayat aterosklerosis difus; mengenai ostium dan sepertiga proksimal arteri renalis utama.\n- Fibromuscular Dysplasia (FMD, 10–15%): Displasia vaskular non-aterosklerotik dan non-inflamasi pada wanita usia muda (15–50 tahun). Gambaran khas "untaian manik-manik" (string-of-beads) pada angiografi mencerminkan fibroplasia tunika media dengan cincin fibrosa berselang-seling dilatasi aneurisma pada segmen media-distal.\n\n2. Kaskade Patofisiologi:\n- Penurunan tekanan perfusi di aparatus jukstaglomerulus memicu hipersekresi Renin masif.\n- Lonjakan Angiotensin II sistemik memicu vasokonstriksi arteriol hebat dan retensi natrium via aldosteron.\n- Pada stenosis unilateral, ginjal kontralateral yang sehat melakukan pressure natriuresis sehingga renin tetap tinggi. Pada stenosis bilateral, retensi cairan menekan renin, memicu hipertensi hipervolemia refrakter dan edema paru mendadak (Sindrom Pickering).\n\n3. Diagnosis & Terapi:\n- Skrining: USG Doppler Dupleks arteri renalis (rasio kecepatan puncak sistolik renal-aorta RAR > 3.5), CTA, atau MRA.\n- Tatalaksana: Kasus FMD memberikan respon istimewa terhadap angioplasti balon tanpa stent. Kasus ARAS ditangani terutama dengan terapi medis komprehensif, dengan opsi pemasangan stent untuk edema paru berulang atau hipertensi refrakter.',
          },
          keyTakeaways: {
            en: [
              'Fibromuscular dysplasia (FMD) causes renovascular hypertension in young females via medial fibroplasia.',
              'Bilateral renal artery stenosis presents with flash pulmonary edema and acute renal failure upon ACEi/ARB exposure.',
            ],
            id: [
              'Fibromuscular dysplasia (FMD) memicu hipertensi renovaskular pada wanita muda via fibroplasia tunika media.',
              'Stenosis arteri renalis bilateral bermanifestasi sebagai edema paru kilat dan gagal ginjal akut bila diberi ACEi/ARB.',
            ],
          },
        },
        {
          id: 'hyp-2-sec-3',
          title: {
            en: '3. Endocrine Hypertensive Disorders: Conn\'s, Pheochromocytoma & Cushing\'s',
            id: '3. Gangguan Hipertensi Endokrin: Sindrom Conn, Feokromositoma & Cushing',
          },
          content: {
            en: 'Endocrine disorders represent the most common curable causes of secondary hypertension:\n\n1. Primary Aldosteronism (Conn\'s Syndrome):\n- Etiology: Aldosterone-producing adrenal adenoma (30–40%) or bilateral idiopathic adrenal hyperplasia (60–70%).\n- Pathophysiology: Autonomous, unsuppressible aldosterone secretion binds mineralocorticoid receptors in principal cells of the renal cortical collecting tubule, upregulating epithelial sodium channels (ENaC) and Na+/K+-ATPase pumps. This causes excessive sodium reabsorption, volume expansion, and urinary excretion of potassium and hydrogen ions.\n- Diagnostic Screen: Aldosterone-to-Renin Ratio (ARR). Elevated plasma aldosterone concentration (PAC >15 ng/dL) with suppressed plasma renin activity (PRA <1.0 ng/mL/h) yields an ARR > 20–30. Confirmed by oral salt loading or IV saline infusion test.\n- Treatment: Unilateral adrenalectomy for adenomas; Mineralocorticoid Receptor Antagonists (MRA: Spironolactone or Eplerenone) for bilateral hyperplasia.\n\n2. Pheochromocytoma & Functional Paraganglioma:\n- Rare neuroendocrine tumors derived from chromaffin cells of the adrenal medulla (85%) or extra-adrenal sympathetic paraganglia (15%), hypersecreting catecholamines (norepinephrine, epinephrine, dopamine).\n- Clinical Manifestations: Paroxysmal surges in blood pressure accompanied by the classic "five Ps": Paroxysmal hypertension, Pounding headache, Perspiration (diaphoresis), Palpitations, and Pallor.\n- Diagnostic Screen: 24-hour urinary fractionated metanephrines or plasma free metanephrines (sensitivity >97%). Localized by adrenal CT/MRI and 123I-MIBG or 68Ga-DOTATATE PET.\n- Perioperative Rule: Alpha-blockade FIRST (Phenoxybenzamine or Doxazosin for 10–14 days) before beta-blockers! Administering a beta-blocker first leaves alpha-mediated vasoconstriction completely unopposed, precipitating catastrophic hypertensive crisis.\n\n3. Cushing\'s Syndrome:\n- Glucocorticoid excess (ACTH-secreting pituitary adenoma, ectopic ACTH, or adrenal cortisol-secreting tumor). Excess cortisol saturates renal 11β-hydroxysteroid dehydrogenase type 2 (11β-HSD2), directly stimulating mineralocorticoid receptors and increasing vascular sensitivity to circulating catecholamines.',
            id: 'Gangguan endokrin merupakan penyebab sekunder hipertensi paling umum yang berpotensi disembuhkan secara total:\n\n1. Aldosteronisme Primer (Sindrom Conn):\n- Etiologi: Adenoma adrenal penghasil aldosteron (30–40%) atau hiperplasia adrenal idiopatik bilateral (60–70%).\n- Patofisiologi: Sekresi aldosteron otonom tanpa henti berikatan dengan reseptor mineralokortikoid di sel prinsipalis tubulus kolektivus ginjal, meningkatkan ekspresi saluran natrium epitelial (ENaC) dan pompa Na+/K+-ATPase. Hal ini memicu retensi natrium berlebih, ekspansi volume plasma, serta ekskresi berlebih ion kalium dan hidrogen ke urin.\n- Skrining Diagnostik: Rasio Aldosteron-terhadap-Renin (ARR). Kadar aldosteron plasma (PAC >15 ng/dL) disertai aktivitas renin plasma yang tersupresi (PRA <1.0 ng/mL/jam) menghasilkan nilai ARR > 20–30. Dikonfirmasi dengan uji beban salin intravena.\n- Terapi: Adrenalektomi laparoskopi untuk adenoma unilateral; Antagonis Reseptor Mineralokortikoid (Spironolakton atau Eplerenon) untuk hiperplasia bilateral.\n\n2. Feokromositoma & Paraganglioma:\n- Tumor neuroendokrin langka dari sel kromafin medula adrenal (85%) atau paraganglia simpatis (15%), yang menyekresi katekolamin (norepinefrin, epinefrin) secara berlebih.\n- Manifestasi Klinis: Lonjakan tekanan darah paroksismal disertai "5P": Paroxysmal hypertension, Pounding headache (sakit kepala berdenyut), Perspiration (keringat banjir), Palpitations (jantung berdebar), dan Pallor (wajah pucat).\n- Skrining Diagnostik: Metanefrin bebas plasma atau fraksi metanefrin urin 24 jam (sensitivitas >97%). Lokalisasi dengan CT/MRI adrenal dan PET 68Ga-DOTATATE.\n- Aturan Pra-Bedah Mutlak: Berikan penyekat ALFA TERLEBIH DAHULU (Fenoksibenzamin atau Doksazosin selama 10–14 hari) sebelum penyekat beta! Pemberian penyekat beta terlebih dahulu akan menyebabkan vasokonstriksi reseptor alfa-1 tanpa tandingan, memicu krisis hipertensi fatal.\n\n3. Sindrom Cushing:\n- Kelebihan hormon glukokortikoid (adenoma hipofisis ACTH, ACTH ektopik, atau tumor korteks adrenal). Kelebihan kortisol melampaui kapasitas enzim 11β-HSD2 ginjal, sehingga kortisol langsung berikatan dengan reseptor mineralokortikoid dan meningkatkan sensitivitas vaskular terhadap katekolamin.',
          },
          keyTakeaways: {
            en: [
              'Primary aldosteronism presents with hypertension, suppressed renin, and unprovoked hypokalemia (screen with ARR).',
              'In pheochromocytoma, alpha-blockade MUST always precede beta-blockade to prevent unopposed alpha vasoconstriction.',
            ],
            id: [
              'Aldosteronisme primer bermanifestasi dengan hipertensi, renin tersupresi, dan hipokalemia (skrining via rasio ARR).',
              'Pada feokromositoma, penyekat alfa HARUS selalu diberikan sebelum penyekat beta demi mencegah vasokonstriksi alfa tanpa hambatan.',
            ],
          },
        },
        {
          id: 'hyp-2-sec-4',
          title: {
            en: '4. Mechanical, Sleep-Related & Drug-Induced Hypertension: Coarctation, OSA and Exogenous Agents',
            id: '4. Hipertensi Mekanis, Terkait Tidur & Induksi Obat: Koarktasio, OSA dan Agen Eksogen',
          },
          content: {
            en: 'A comprehensive evaluation of secondary hypertension must encompass mechanical and environmental factors:\n\n1. Coarctation of the Aorta:\n- Congenital localized narrowing of the aortic lumen, typically distal to the origin of the left subclavian artery near the ligamentum arteriosum (associated with bicuspid aortic valve in >50% and Turner syndrome).\n- Physical Signs: Upper extremity hypertension with diminished, delayed femoral pulses (radial-femoral delay), and a systolic blood pressure gradient between arms and legs >20 mmHg. Chest radiograph demonstrates inferior rib notching (Roesler sign) from dilated intercostal collateral arteries and the "Figure-of-3" sign on the aortic contour.\n\n2. Obstructive Sleep Apnea (OSA):\n- The most prevalent secondary contributor to drug-resistant hypertension (present in up to 70–80% of resistant cases).\n- Repeated pharyngeal airway collapse induces nocturnal intermittent hypoxemia and hypercapnia, exciting peripheral and central chemoreceptors. This triggers extreme sympathetic neural bursts, nocturnal blood pressure surges, loss of normal nocturnal dipping, and daytime vascular endothelial remodeling. Diagnosis requires polysomnography (Apnea-Hypopnea Index AHI ≥ 15/h); CPAP therapy significantly lowers 24-hour MAP.\n\n3. Exogenous & Drug-Induced Hypertension:\n- NSAIDs & COX-2 Inhibitors: Inhibit renal prostacyclin (PGI2) and PGE2 synthesis, causing renal vasoconstriction, blunt natriuresis, and an average BP increase of 5–10 mmHg.\n- Estrogen-containing Oral Contraceptives: Stimulate hepatic angiotensinogen synthesis.\n- Sympathomimetics & Decongestants: Pseudoephedrine, cocaine, amphetamines.\n- Calcineurin Inhibitors: Cyclosporine, Tacrolimus (intense renal arteriolar vasoconstriction).\n- Natural Licorice (Glycyrrhizin): Inhibits 11β-HSD2, enabling normal cortisol to act as a potent mineralocorticoid (apparent mineralocorticoid excess).',
            id: 'Evaluasi menyeluruh hipertensi sekunder wajib mencakup faktor mekanis, gangguan tidur, dan agen eksogen:\n\n1. Koarktasio Aorta:\n- Penyempitan kongenital lumen aorta desenden, umumnya di sebelah distal pangkal arteri subklavia kiri dekat ligamentum arteriosum (berkaitan dengan katup aorta bikuspid pada >50% dan sindrom Turner).\n- Tanda Fisik: Hipertensi ekstremitas atas dengan denyut nadi femoralis yang melemah dan terlambat (radial-femoral delay), serta perbedaan tekanan darah sistolik antara lengan dan tungkai >20 mmHg. Rontgen toraks memperlihatkan erosi kosta inferior (rib notching/Roesler sign) akibat dilatasi arteri kolateral interkostal dan tanda "angka 3" pada kontur aorta.\n\n2. Obstructive Sleep Apnea (OSA):\n- Kontributor sekunder paling umum pada hipertensi resisten (ditemukan pada 70–80% kasus resisten).\n- Kolaps saluran napas faring berulang saat tidur memicu hipoksemia dan hiperkapnia intermiten yang mengaktivasi kemoreseptor. Hal ini memicu lonjakan simpatis ekstrem, hilangnya penurunan tekanan darah nokturnal (non-dipping), dan remodeling vaskular siang hari. Ditegakkan dengan polisomnografi (skor AHI ≥ 15/jam); terapi CPAP terbukti menurunkan tekanan darah secara bermakna.\n\n3. Hipertensi Akibat Obat & Zat Eksogen:\n- NSAID & Inhibitor COX-2: Menghambat sintesis prostasiklin ginjal (PGI2) dan PGE2, memicu vasokonstriksi renal, retensi natrium, dan kenaikan tekanan darah 5–10 mmHg.\n- Kontrasepsi Oral Berestrogen: Merangsang sintesis angiotensinogen oleh hepar.\n- Dekongestan & Simpatomimetik: Pseudoefedrin, kokain, amfetamin.\n- Inhibitor Kalsineurin: Siklosporin, Takrolimus (vasokonstriksi arteriol renalis kuat).\n- Licorice Alami (Asam Glisirizat): Menghambat enzim 11β-HSD2, membiarkan kortisol normal bertindak sebagai mineralokortikoid kuat (pseudohiperaldosteronisme).',
          },
          comparisonTable: {
            headers: {
              en: ['Secondary Etiology', 'Key Physical Hallmark', 'Primary Diagnostic Test', 'Definitive Treatment'],
              id: ['Etiologi Sekunder', 'Tanda Fisik Utama', 'Pemeriksaan Diagnostik Utama', 'Tatalaksana Definitif'],
            },
            rows: [
              {
                en: ['Coarctation of the Aorta', 'Radial-femoral pulse delay, arm-leg SBP gradient >20 mmHg', 'Echocardiography / CT Angiography of the chest', 'Transcatheter balloon angioplasty / Stenting or surgery'],
                id: ['Koarktasio Aorta', 'Radial-femoral delay, gradien TDS lengan-tungkai >20 mmHg', 'Ekokardiografi / CT Angiografi toraks', 'Angioplasti balon / Pemasangan stent transkateter atau bedah'],
              },
              {
                en: ['Obstructive Sleep Apnea (OSA)', 'Habitual loud snoring, daytime somnolence, neck circ >17in', 'Overnight Polysomnography (AHI ≥ 15/h)', 'Nocturnal Continuous Positive Airway Pressure (CPAP)'],
                id: ['Obstructive Sleep Apnea (OSA)', 'Mendengkur keras, kantuk siang hari, lingkar leher >43 cm', 'Polisomnografi semalam (skor AHI ≥ 15/jam)', 'Continuous Positive Airway Pressure (CPAP) malam hari'],
              },
              {
                en: ['Drug-Induced (NSAIDs)', 'Bilateral lower extremity edema, worsening creatinine', 'Comprehensive medication history reconciliation', 'Discontinuation of offending NSAID; switch to Acetaminophen'],
                id: ['Induksi Obat (NSAID)', 'Edema perifer bilateral, kenaikan kreatinin serum', 'Rekonsiliasi riwayat konsumsi obat lengkap', 'Penghentian NSAID pemicu; ganti dengan Parasetamol'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Coarctation of the aorta is diagnosed by radial-femoral delay and upper-to-lower extremity blood pressure gradients.',
              'OSA is present in the vast majority of resistant hypertension; CPAP therapy effectively lowers systemic BP.',
            ],
            id: [
              'Koarktasio aorta didiagnosis melalui radial-femoral delay dan gradien tekanan darah ekstremitas atas-bawah.',
              'OSA ditemukan pada sebagian besar kasus hipertensi resisten; terapi CPAP efektif menurunkan tekanan darah.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyp-q2-1',
          question: {
            en: 'A 28-year-old female presents with severe hypertension (175/105 mmHg). Renal angiography reveals alternating areas of stenosis and aneurysmal dilatation resembling a "string of beads" in the mid-to-distal right renal artery. What is the diagnosis?',
            id: 'Wanita 28 tahun datang dengan hipertensi berat (175/105 mmHg). Angiografi renalis memperlihatkan area stenosis berselang-seling dilatasi aneurisma menyerupai "untaian manik-manik" pada segmen media-distal arteri renalis kanan. Apakah diagnosisnya?',
          },
          options: {
            en: [
              'Atherosclerotic Renal Artery Stenosis',
              'Fibromuscular Dysplasia (FMD)',
              'Polyarteritis Nodosa',
              'Renal Cell Carcinoma',
            ],
            id: [
              'Stenosis Aterosklerosis Arteri Renalis',
              'Fibromuscular Dysplasia (FMD)',
              'Poliarteritis Nodosa',
              'Karsinoma Sel Ginjal',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Fibromuscular dysplasia is a non-atherosclerotic vascular disease classically affecting young women, displaying the pathognomonic "string-of-beads" sign on angiography due to medial fibroplasia.',
            id: 'Fibromuscular dysplasia merupakan penyakit vaskular non-aterosklerotik yang khas menyerang wanita usia muda, dengan tampilan patognomonik "string-of-beads" (untaian manik-manik) pada angiografi akibat fibroplasia tunika media.',
          },
        },
        {
          id: 'hyp-q2-2',
          question: {
            en: 'In preparing a patient with confirmed pheochromocytoma for surgical adrenalectomy, why must an alpha-adrenergic blocker be initiated prior to a beta-adrenergic blocker?',
            id: 'Dalam mempersiapkan pasien feokromositoma untuk adrenalektomi bedah, mengapa penyekat alfa-adrenergik harus diberikan sebelum penyekat beta-adrenergik?',
          },
          options: {
            en: [
              'To prevent profound bradycardia caused by vagal overstimulation',
              'To avoid unopposed alpha-1 receptor vasoconstriction, which can precipitate a catastrophic hypertensive crisis',
              'To stimulate hepatic gluconeogenesis and prevent hypoglycemia',
              'To prevent severe orthostatic hypotension during general anesthesia',
            ],
            id: [
              'Untuk mencegah bradikardia berat akibat stimulasi berlebih saraf vagus',
              'Untuk menghindari vasokonstriksi reseptor alfa-1 tanpa hambatan yang dapat memicu krisis hipertensi fatal',
              'Untuk merangsang glukoneogenesis hepar dan mencegah hipoglikemia',
              'Untuk mencegah hipotensi ortostatik berat selama anestesi umum',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Blocking beta-2 mediated vasodilation with a beta-blocker while alpha-1 receptors remain exposed to circulating catecholamines leaves vasoconstriction unopposed, precipitating severe hypertensive crises.',
            id: 'Memblokade vasodilatasi reseptor beta-2 dengan penyekat beta saat reseptor alfa-1 masih terpapar kadar katekolamin tinggi akan menyebabkan vasokonstriksi tanpa tandingan, memicu krisis hipertensi masif.',
          },
        },
        {
          id: 'hyp-q2-3',
          question: {
            en: 'A 42-year-old male with resistant hypertension has persistent hypokalemia (serum K+ 2.8 mEq/L) despite oral potassium supplementation. His Aldosterone-to-Renin Ratio (ARR) is markedly elevated at 45. What is the most likely diagnosis?',
            id: 'Pria 42 tahun dengan hipertensi resisten mengalami hipokalemia menetap (K+ serum 2.8 mEq/L) meskipun telah mendapat suplementasi kalium oral. Rasio Aldosteron-terhadap-Renin (ARR) melonjak tinggi di angka 45. Apakah diagnosis yang paling mungkin?',
          },
          options: {
            en: [
              'Primary Aldosteronism (Conn\'s syndrome)',
              'Secondary Hyperaldosteronism due to renal failure',
              'Bartter syndrome',
              'Addison\'s disease',
            ],
            id: [
              'Aldosteronisme Primer (Sindrom Conn)',
              'Hiperaldosteronisme Sekunder akibat gagal ginjal',
              'Sindrom Bartter',
              'Penyakit Addison',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The combination of resistant hypertension, spontaneous hypokalemia, suppressed plasma renin, elevated aldosterone, and an ARR > 30 is diagnostic for Primary Aldosteronism.',
            id: 'Kombinasi hipertensi resisten, hipokalemia spontan, renin plasma tersupresi, aldosteron meningkat, dan rasio ARR > 30 merupakan tanda diagnostik untuk Aldosteronisme Primer.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 3: HYPERTENSIVE CRISES & TARGET ORGAN DAMAGE
    // -------------------------------------------------------------
    {
      id: 'hyp-mod-3',
      topicId: 'hypertension',
      order: 3,
      title: {
        en: 'Hypertensive Emergencies, Crises & Target Organ Damage',
        id: 'Kegawatdaruratan Hipertensi, Krisis & Kerusakan Organ Target',
      },
      shortDescription: {
        en: 'Hypertensive Urgency vs Emergency (BP > 180/120 mmHg), acute encephalopathy, aortic dissection, MAP titration, and IV vasodilators.',
        id: 'Hipertensi Urgensi vs Emergensi (BP > 180/120 mmHg), ensefalopati akut, diseksi aorta, titrasi MAP, dan vasodilator intravena.',
      },
      durationMinutes: 30,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'vascular-hemodynamics',
      sections: [
        {
          id: 'hyp-3-sec-1',
          title: {
            en: '1. The Crucial Dichotomy: Hypertensive Urgency vs Hypertensive Emergency',
            id: '1. Dikotomi Krusial: Hipertensi Urgensi vs Hipertensi Emergensi',
          },
          content: {
            en: 'A Hypertensive Crisis is defined by severe blood pressure elevation: Systolic BP > 180 mmHg and/or Diastolic BP > 120 mmHg. Clinical management and triage are dictated entirely by one decisive factor:\n\n1. Hypertensive Urgency:\n- Severe blood pressure elevation (>180/>120 mmHg) in an asymptomatic or minimally symptomatic patient (mild headache, generalized anxiety) WITHOUT evidence of acute or progressive Target Organ Damage (TOD).\n- Pathophysiology: Vascular autoregulation remains compensated. Microvascular endothelial integrity is maintained.\n- Management: Hospital admission and rapid IV blood pressure reduction are NOT indicated and may be harmful. Re-institute or adjust oral antihypertensive therapy (e.g., Captopril, Labetalol, Amlodipine), ensure medication adherence, and arrange close outpatient follow-up within 24–72 hours.\n\n2. Hypertensive Emergency:\n- Severe blood pressure elevation (>180/>120 mmHg) ACCOMPANIED by acute, progressive, life-threatening Target Organ Damage.\n- Pathophysiology: Mechanical shear stress overcomes vascular endothelial autoregulatory capacity, inducing acute endothelial denudation, fibrinoid necrosis of arteriolar walls, platelet aggregation, microangiopathic hemolytic anemia, and tissue ischemia.\n- Management: Immediate admission to an Intensive Care Unit (ICU) for continuous intra-arterial blood pressure monitoring and intravenous parenteral vasodilator/adrenergic antagonist titration.',
            id: 'Krisis Hipertensi didefinisikan sebagai peningkatan tekanan darah yang sangat tinggi: TDS > 180 mmHg dan/atau TDD > 120 mmHg. Penentuan derajat kegawatan dan tatalaksana didikte oleh satu faktor pembeda utama:\n\n1. Hipertensi Urgensi:\n- Peningkatan tekanan darah berat (>180/>120 mmHg) pada pasien tanpa gejala atau dengan gejala ringan (sakit kepala ringan, kecemasan) TANPA bukti Kerusakan Organ Target (Target Organ Damage/TOD) akut atau progresif.\n- Patofisiologi: Autoregulasi vaskular masih mampu mengompensasi. Integritas endotel mikrovaskular tetap terpelihara.\n- Tatalaksana: Rawat inap intensif dan penurunan tekanan darah intravena cepat TIDAK diindikasikan bahkan berpotensi berbahaya. Cukup berikan obat antihipertensi oral (misalnya Kaptopril, Labetalol, Amlodipin), evaluasi kepatuhan obat, dan rencanakan rawat jalan dalam 24–72 jam.\n\n2. Hipertensi Emergensi:\n- Peningkatan tekanan darah berat (>180/>120 mmHg) yang DISERTAI bukti kerusakan organ target akut yang mengancam nyawa.\n- Patofisiologi: Shear stress mekanik melampaui batas autoregulasi endotel, memicu nekrosis fibrinoid pada dinding arteriol, agregasi trombosit, anemia hemolitik mikroangiopatik, dan iskemia organ vital.\n- Tatalaksana: Wajib rawat di Unit Perawatan Intensif (ICU) untuk pemantauan invasif kanul arteri dan titrasi obat antihipertensi parenteral intravena berkelanjutan.',
          },
          keyTakeaways: {
            en: [
              'The absolute blood pressure number does NOT distinguish urgency from emergency; the presence of acute Target Organ Damage does.',
              'Hypertensive urgency is treated with oral medications over 24–48 hours; emergencies require immediate IV titration in an ICU.',
            ],
            id: [
              'Angka absolut tekanan darah TIDAK membedakan urgensi dari emergensi; keberadaan kerusakan organ target akutlah yang membedakannya.',
              'Hipertensi urgensi diterapi dengan obat oral dalam 24–48 jam; emergensi menuntut titrasi intravena darurat di ruang ICU.',
            ],
          },
        },
        {
          id: 'hyp-3-sec-2',
          title: {
            en: '2. Spectrum of Acute Target Organ Damage (TOD)',
            id: '2. Spektrum Kerusakan Organ Target Akut (Target Organ Damage)',
          },
          content: {
            en: 'Acute target organ damage manifests across five major anatomical domains:\n\n1. Central Nervous System:\n- Hypertensive Encephalopathy: Breakdown of the blood-brain barrier resulting in diffuse cerebral vasogenic edema, papilledema, altered mental status, seizures, and coma (reversible upon controlled BP reduction).\n- Acute Ischemic Stroke: In candidates for IV thrombolysis, BP must be carefully lowered to <185/110 mmHg prior to alteplase/tenecteplase and maintained <180/105 mmHg.\n- Acute Intracerebral Hemorrhage (ICH): Rapid controlled SBP titration to 140 mmHg reduces hematoma expansion.\n\n2. Cardiovascular System:\n- Acute Aortic Dissection (Stanford Type A or B): Intimal tear driven by shear stress (dP/dt). Requires ultra-rapid reduction of SBP to <120 mmHg and heart rate to <60 bpm within 20 minutes (IV beta-blocker FIRST, then vasodilator).\n- Acute Pulmonary Edema / Flash Pulmonary Edema: Left ventricular afterload mismatch causing abrupt rise in LVEDP, pulmonary capillary wedge pressure >20 mmHg, and alveolar flooding. IV Nitroglycerin or Nitroprusside reduces afterload instantly.\n- Acute Coronary Syndrome (STEMI/NSTEMI): Severe afterload increases myocardial oxygen demand, worsening transmural ischemia.\n\n3. Renal System:\n- Acute Kidney Injury (AKI) & Malignant Nephrosclerosis: Onion-skin hyperplastic arteriolitis, necrotizing glomerulitis, acute oliguria, hematuria, and rapidly rising creatinine.\n\n4. Ophthalmological System:\n- Keith-Wagener-Barker Grade IV Retinopathy: Bilateral optic disc edema (papilledema), flame-shaped retinal hemorrhages, hard exudates forming a macular star, and cotton-wool spots (ischemic nerve fiber microinfarcts).\n\n5. Obstetric System: Preeclampsia with severe features and Eclampsia (seizures).',
            id: 'Kerusakan organ target akut terbagi ke dalam lima ranah anatomis utama:\n\n1. Sistem Saraf Pusat:\n- Ensefalopati Hipertensi: Jebolnya sawar darah-otak yang memicu edema serebral vasogenik difus, papiledema, penurunan kesadaran, kejang, dan koma (reversibel dengan penurunan tekanan darah terarah).\n- Stroke Iskemik Akut: Pada kandidat trombolisis IV, tekanan darah harus diturunkan hati-hati ke <185/110 mmHg sebelum pemberian obat dan dipertahankan <180/105 mmHg.\n- Perdarahan Intraserebral Akut (ICH): Penurunan TDS terarah ke target 140 mmHg membatasi ekspansi hematoma.\n\n2. Sistem Kardiovaskular:\n- Diseksi Aorta Akut (Stanford Tipe A atau B): Robekan intima aorta akibat shear stress denyut (dP/dt). Menuntut penurunan ultra-cepat TDS ke <120 mmHg dan laju nadi ke <60 kali/menit dalam 20 menit (Penyekat beta IV TERLEBIH DAHULU, baru vasodilator).\n- Edema Paru Kardiogenik Akut: Afterload berlebih memicu lonjakan tekanan pengisian ventrikel kiri dan banjir cairan di alveoli. Nitrogliserin IV menurunkan afterload seketika.\n- Sindrom Koroner Akut (STEMI/NSTEMI): Peningkatan afterload drastis memperberat kebutuhan oksigen miokardium dan memperluas nekrosis.\n\n3. Sistem Renal:\n- Gagal Ginjal Akut & Nefrosklerosis Maligna: Arteriolitis hiperplastik berlapis (onion-skin), nekrosis fibrinoid glomerulus, oliguria akut, dan hematuria.\n\n4. Sistem Oftalmologi:\n- Retinopati Keith-Wagener-Barker Derajat IV: Papiledema bilateral, perdarahan retina bentuk lidah api (flame-shaped), eksudat keras bintang makula, dan bercak katun wol.\n\n5. Sistem Obstetri: Preeklamsia dengan gejala berat dan Eklamsia (kejang obstetrik).',
          },
          comparisonTable: {
            headers: {
              en: ['Emergency Entity', 'First-Line IV Medications', 'Target Blood Pressure', 'Timeframe'],
              id: ['Entitas Emergensi', 'Obat IV Lini Pertama', 'Target Tekanan Darah', 'Rentang Waktu'],
            },
            rows: [
              {
                en: ['Acute Aortic Dissection', 'IV Esmolol / Labetalol + Nicardipine', 'SBP < 120 mmHg and HR < 60 bpm', 'Within 20 minutes'],
                id: ['Diseksi Aorta Akut', 'Esmolol / Labetalol IV + Nikardipin', 'TDS < 120 mmHg dan HR < 60 bpm', 'Dalam 20 menit'],
              },
              {
                en: ['Acute Pulmonary Edema', 'IV Nitroglycerin / Nitroprusside + Loop diuretic', 'SBP reduction by 20–30%', 'Within 1 hour'],
                id: ['Edema Paru Akut', 'Nitrogliserin / Nitroprusid IV + Diuretik loop', 'Penurunan TDS sebesar 20–30%', 'Dalam 1 jam'],
              },
              {
                en: ['Hypertensive Encephalopathy', 'IV Nicardipine / Labetalol', 'Reduce MAP by 20–25%', 'First 1 hour, then 160/100 over 2–6h'],
                id: ['Ensefalopati Hipertensi', 'Nikardipin / Labetalol IV', 'Turunkan MAP sebesar 20–25%', '1 jam pertama, lalu 160/100 dlm 2–6 jam'],
              },
              {
                en: ['Preeclampsia / Eclampsia', 'IV Labetalol / Hydralazine + IV Magnesium Sulfate', 'SBP < 140 mmHg, DBP < 90 mmHg', 'Within 1 hour'],
                id: ['Preeklamsia / Eklamsia', 'Labetalol / Hidralazin IV + MgSO4 IV', 'TDS < 140 mmHg, TDD < 90 mmHg', 'Dalam 1 jam'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Aortic dissection requires immediate aggressive reduction of SBP < 120 mmHg and HR < 60 bpm within 20 minutes.',
              'In most other emergencies, lower MAP by no more than 20–25% in the first hour to prevent ischemic organ hypoperfusion.',
            ],
            id: [
              'Diseksi aorta memerlukan penurunan agresif TDS < 120 mmHg dan denyut jantung < 60 bpm dalam 20 menit.',
              'Pada mayoritas emergensi lainnya, turunkan MAP tidak lebih dari 20–25% di jam pertama demi mencegah hipoperfusi serebral.',
            ],
          },
        },
        {
          id: 'hyp-3-sec-3',
          title: {
            en: '3. Cerebral Autoregulation Physics and Parenteral Pharmacotherapy',
            id: '3. Fisika Autoregulasi Serebral dan Farmakoterapi Parenteral',
          },
          content: {
            en: 'The human brain maintains steady Cerebral Blood Flow (CBF ~50 mL/100g/min) across a Mean Arterial Pressure range of approximately 60 to 150 mmHg through myogenic arteriolar vasodilation and vasoconstriction.\n\nIn chronic hypertension, this autoregulatory curve shifts rightward to higher pressures (e.g., 110 to 180 mmHg) to protect cerebral capillaries from hypertensive hydrostatic breakdown. Consequently, if a clinician precipitous drops blood pressure to "normal" (e.g., 120/80 mmHg), cerebral perfusion pressure plummets below the shifted lower autoregulatory limit, causing devastating ischemic watershed stroke and watershed myocardial infarction!\n\nGeneral Rule for Hypertensive Emergencies:\n- Reduce MAP by a maximum of 20% to 25% within the first hour.\n- If stable, reduce toward 160/100 mmHg over the subsequent 2 to 6 hours.\n- Normalize gradually over 24 to 48 hours.\n\nParenteral Antihypertensive Agents:\n1. Nicardipine: Second-generation dihydropyridine CCB; highly vascular-selective with predictable titratability (5–15 mg/h IV infusion).\n2. Clevidipine: Ultra-short-acting third-generation CCB metabolized by blood and tissue esterases (half-life ~1–2 minutes), ideal for rapid titration without organ accumulation.\n3. Labetalol: Combined alpha-1 and non-selective beta-blocker (ratio 1:7 IV). Preserves cardiac output while reducing SVR.\n4. Esmolol: Ultra-short-acting cardioselective beta-1 blocker (half-life 9 minutes); agent of choice for acute aortic dissection shear rate control.\n5. Sodium Nitroprusside: Potent direct arterial and venous NO donor. Requires intra-arterial line and protection from light; carries risk of lethal cyanide and thiocyanate toxicity during prolonged or high-dose (>2 µg/kg/min) infusions.',
            id: 'Otak manusia mempertahankan Aliran Darah Serebral (Cerebral Blood Flow/CBF ~50 mL/100g/menit) konstan pada rentang Tekanan Arteri Rata-rata sekitar 60 hingga 150 mmHg melalui vasokonstriksi dan vasodilatasi miogenik arteriol.\n\nPada penderita hipertensi kronis, kurva autoregulasi ini bergeser ke kanan (misalnya ke rentang 110 hingga 180 mmHg) guna melindungi kapiler otak dari tekanan hidrostatik tinggi. Akibatnya, jika dokter menurunkan tekanan darah terlalu cepat ke angka "normal" populasi umum (seperti 120/80 mmHg), tekanan perfusi serebral akan anjlok di bawah ambang batas bawah autoregulasi baru tersebut, memicu stroke iskemik infark perbatasan (watershed stroke) dan infark miokardium!\n\nAturan Emas Hipertensi Emergensi:\n- Turunkan MAP maksimal 20% hingga 25% dalam 1 jam pertama.\n- Jika stabil, turunkan bertahap ke arah 160/100 mmHg dalam 2 hingga 6 jam berikutnya.\n- Normalisasi bertahap dilakukan dalam 24 hingga 48 jam.\n\nObat Antihipertensi Parenteral Intravena:\n1. Nikardipin: CCB dihidropiridin generasi kedua; sangat selektif vaskular dengan titrasi mudah diprediksi (infus IV 5–15 mg/jam).\n2. Klevidipin: CCB generasi ketiga dengan masa kerja sangat singkat yang dimetabolisme oleh esterase darah (waktu paruh ~1–2 menit), memungkinkan kendali instan tanpa bioakumulasi organ.\n3. Labetalol: Penyekat ganda reseptor alfa-1 dan beta non-selektif (rasio 1:7 IV). Menurunkan SVR tanpa memicu takikardia refleks.\n4. Esmolol: Penyekat beta-1 kardioselektif ultra-singkat (waktu paruh 9 menit); obat pilihan utama pada diseksi aorta akut.\n5. Natrium Nitroprusid: Donor NO langsung pada vena dan arteriol. Memerlukan jalur kanul arteri invasif; membawa risiko keracunan sianida dan tiosianat bila diberikan dalam dosis tinggi atau jangka panjang.',
          },
          formula: '\\text{MAP} = \\text{DBP} + \\frac{1}{3}(\\text{SBP} - \\text{DBP}) = \\frac{2\\text{DBP} + \\text{SBP}}{3}',
          formulaExplanation: {
            en: 'Formula for Mean Arterial Pressure (MAP). Diastole constitutes approximately two-thirds of the cardiac cycle duration at resting heart rates, weighting diastolic pressure twice as heavily as systolic pressure.',
            id: 'Rumus Tekanan Arteri Rata-rata (MAP). Fase diastol mencakup sekitar dua pertiga durasi siklus jantung pada denyut istirahat normal, sehingga tekanan diastolik diberi bobot dua kali lebih besar daripada tekanan sistolik.',
          },
          variables: [
            {
              symbol: 'SBP',
              name: { en: 'Systolic Blood Pressure', id: 'Tekanan Darah Sistolik' },
              unit: 'mmHg',
              description: {
                en: 'Peak pressure during ventricular contraction.',
                id: 'Tekanan puncak saat kontraksi ventrikel.',
              },
            },
            {
              symbol: 'DBP',
              name: { en: 'Diastolic Blood Pressure', id: 'Tekanan Darah Diastolik' },
              unit: 'mmHg',
              description: {
                en: 'Minimum pressure during ventricular relaxation.',
                id: 'Tekanan terendah saat relaksasi ventrikel.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Chronic hypertension shifts the cerebral autoregulatory curve to the right; rapid normalization causes ischemic stroke.',
              'Titrate MAP downward by no more than 20–25% in the first hour for general hypertensive emergencies.',
            ],
            id: [
              'Hipertensi kronis menggeser kurva autoregulasi serebral ke kanan; normalisasi terburu-buru memicu stroke iskemik.',
              'Titrasi MAP turun maksimal 20–25% pada jam pertama untuk penanganan emergensi umum.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyp-q3-1',
          question: {
            en: 'A 60-year-old male with long-standing untreated hypertension arrives with BP 220/130 mmHg, confusion, lethargy, and bilateral papilledema on fundoscopy. What is the appropriate initial target for blood pressure reduction during the first hour?',
            id: 'Pria 60 tahun dengan hipertensi lama tanpa obat datang dengan TD 220/130 mmHg, disorientasi, letargi, dan papiledema bilateral pada funduskopi. Berapakah target penurunan tekanan darah awal yang aman dalam 1 jam pertama?',
          },
          options: {
            en: [
              'Immediate reduction to normal 120/80 mmHg within 15 minutes',
              'Reduction of Mean Arterial Pressure (MAP) by no more than 20% to 25%',
              'Reduction of systolic BP to <100 mmHg to eliminate brain edema',
              'No blood pressure reduction; discharge on oral hydrochlorothiazide',
            ],
            id: [
              'Penurunan seketika ke batas normal 120/80 mmHg dalam 15 menit',
              'Penurunan Tekanan Arteri Rata-rata (MAP) tidak melebihi 20% hingga 25%',
              'Penurunan TDS ke <100 mmHg demi melenyapkan edema serebral',
              'Tidak perlu penurunan tekanan darah; cukup berikan hidroklorotiazid oral',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'In hypertensive encephalopathy, cerebral autoregulation is shifted rightward. Lowering MAP by more than 20–25% in the first hour risks dropping perfusion pressure below the critical autoregulatory threshold, precipitating watershed cerebral infarction.',
            id: 'Pada ensefalopati hipertensi, kurva autoregulasi telah bergeser ke kanan. Penurunan MAP melampaui 20–25% di jam pertama berisiko menjatuhkan tekanan perfusi di bawah ambang kritis, memicu infark perbatasan serebral.',
          },
        },
        {
          id: 'hyp-q3-2',
          question: {
            en: 'In a patient with acute Stanford Type A aortic dissection presenting with BP 200/115 mmHg, what is the mandatory immediate target SBP and timeframe?',
            id: 'Pada pasien dengan diseksi aorta akut Stanford Tipe A dengan TD 200/115 mmHg, berapakah target penurunan TDS dan rentang waktu yang diwajibkan?',
          },
          options: {
            en: [
              'SBP < 120 mmHg and heart rate < 60 bpm within 20 minutes',
              'SBP 160 mmHg over 24 to 48 hours',
              'DBP < 100 mmHg over 6 hours',
              'Maintain SBP > 180 mmHg to preserve spinal cord perfusion',
            ],
            id: [
              'TDS < 120 mmHg dan laju nadi < 60 kali/menit dalam 20 menit',
              'TDS 160 mmHg secara bertahap dalam 24 hingga 48 jam',
              'TDD < 100 mmHg dalam 6 jam',
              'Pertahankan TDS > 180 mmHg demi perfusi medula spinalis',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Acute aortic dissection is the critical exception to the slow-reduction rule: shearing forces (dP/dt) must be rapidly minimized by reducing SBP < 120 mmHg and HR < 60 bpm within 20 minutes using IV beta-blockers and vasodilators.',
            id: 'Diseksi aorta akut adalah pengecualian mutlak terhadap aturan penurunan bertahap: gaya robek aorta (dP/dt) harus dipadamkan secepat mungkin dengan mencapai TDS < 120 mmHg dan HR < 60 bpm dalam 20 menit menggunakan penyekat beta IV dan vasodilator.',
          },
        },
        {
          id: 'hyp-q3-3',
          question: {
            en: 'Which toxic metabolite can accumulate and cause severe lactic acidosis, confusion, and death during prolonged or high-dose infusion of Sodium Nitroprusside?',
            id: 'Metabolit toksik apakah yang dapat terakumulasi dan memicu asidosis laktat berat, disorientasi, serta kematian selama infus Natrium Nitroprusid dosis tinggi atau berkepanjangan?',
          },
          options: {
            en: [
              'Cyanide and Thiocyanate',
              'Methemoglobin and Bilirubin',
              'Uric acid crystals',
              'Formic acid',
            ],
            id: [
              'Sianida dan Tiosianat',
              'Methemoglobin dan Bilirubin',
              'Kristal asam urat',
              'Asam format',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Sodium nitroprusside contains 5 cyanide groups per molecule. Metabolism releases free cyanide, which is converted by hepatic rhodanase into thiocyanate; toxicity causes cellular hypoxia, lactic acidosis, and neurological deterioration.',
            id: 'Molekul natrium nitroprusid mengandung 5 gugus sianida. Metabolisme melepaskan ion sianida bebas yang diubah hepar menjadi tiosianat; akumulasinya memicu hipoksia seluler, asidosis laktat berat, dan koma.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 4: SPECIALIZED PHENOTYPES: ISOLATED SYSTOLIC, GESTATIONAL, WHITE COAT & PULMONARY HTN
    // -------------------------------------------------------------
    {
      id: 'hyp-mod-4',
      topicId: 'hypertension',
      order: 4,
      title: {
        en: 'Specialized Hypertensive Phenotypes: Isolated Systolic, Gestational, White Coat & Pulmonary HTN',
        id: 'Fenotipe Khusus Hipertensi: Sistolik Terisolasi, Gestasional, White Coat & Hipertensi Pulmonal',
      },
      shortDescription: {
        en: 'Arterial stiffness & PWV in the elderly, resistant hypertension, ABPM diurnal dipping, preeclampsia/eclampsia, and WHO Pulmonary HTN Groups 1–5.',
        id: 'Kekakuan arteri & PWV pada lansia, hipertensi resisten, profil dipping ABPM, preeklamsia/eklamsia, dan Hipertensi Pulmonal Grup WHO 1–5.',
      },
      durationMinutes: 30,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'vascular-hemodynamics',
      sections: [
        {
          id: 'hyp-4-sec-1',
          title: {
            en: '1. Isolated Systolic Hypertension (ISH), Arterial Stiffness & Pulse Wave Velocity',
            id: '1. Hipertensi Sistolik Terisolasi (ISH), Kekakuan Arteri & Pulse Wave Velocity',
          },
          content: {
            en: 'Isolated Systolic Hypertension (ISH), defined as SBP ≥ 140 mmHg with DBP < 90 mmHg, represents the predominant hypertensive phenotype in adults over 60 years of age, affecting >65% of elderly hypertensives.\n\nBiomechanics of Arterial Aging:\n1. Loss of the Windkessel Effect: In youth, the compliant ascending aorta distends during ventricular ejection (storing 50% of the stroke volume) and recoils elastically during diastole, maintaining continuous forward flow and adequate coronary perfusion pressure.\n2. Elastocalcinosis & Collagen Cross-linking: Aging, chronic pulsatile wall fatigue, and advanced glycation end-products (AGEs) fracture vascular elastin lamellae. Inflexible type I collagen replaces elastin in the tunica media, causing severe central arterial stiffening.\n3. Accelerated Pulse Wave Velocity (PWV): According to the Moens-Korteweg equation, the speed at which the systolic pressure pulse propagates along the arterial tree is directly proportional to the elastic modulus (E) of the arterial wall:\n\nPWV = √( (E · h) / (2 · r · ρ) )\n\nIn elastic vessels, PWV is slow (~4–6 m/s); the reflected pressure wave from peripheral vascular bifurcations returns during DIASTOLE, naturally boosting diastolic coronary perfusion. In stiff arteries (PWV > 10 m/s), the reflected wave speeds backward prematurely, arriving in late SYSTOLE. This exerts a deleterious double impact: it augments central aortic peak systolic pressure (increasing left ventricular afterload and myocardial oxygen demand) while causing diastolic pressure to fall (impairing coronary perfusion).\n\nFirst-line pharmacotherapy for ISH centers on Dihydropyridine Calcium Channel Blockers (Amlodipine) and Thiazide-like diuretics.',
            id: 'Hipertensi Sistolik Terisolasi (Isolated Systolic Hypertension/ISH), didefinisikan sebagai TDS ≥ 140 mmHg dengan TDD < 90 mmHg, merupakan fenotipe hipertensi paling dominan pada individu berusia di atas 60 tahun, mencakup >65% populasi lansia hipertensi.\n\nBiomekanika Penuaan Vaskular:\n1. Hilangnya Efek Windkessel: Pada masa muda, aorta asenden yang elastis meregang saat ejeksi ventrikel (menampung 50% stroke volume) dan mengempis elastis saat diastol, memelihara aliran antegrad dan tekanan perfusi koroner.\n2. Elastokalsinosis & Ikatan Silang Kolagen: Penuaan, kelelahan regangan pulsasil dinding arteri, dan produk akhir glikasi lanjutan (AGEs) memutus serat elastin tunika media. Serat kolagen tipe I yang kaku menggantikan elastin, memicu kekakuan aorta sentral yang parah.\n3. Akselerasi Kecepatan Gelombang Nadi (Pulse Wave Velocity/PWV): Berdasarkan persamaan Moens-Korteweg, kecepatan perambatan gelombang denyut sistolik berbanding lurus dengan modulus elastisitas (E) dinding arteri:\n\nPWV = √( (E · h) / (2 · r · ρ) )\n\nPada pembuluh darah elastis, PWV berjalan lambat (~4–6 m/s); gelombang pantul dari percabangan pembuluh darah perifer kembali ke pangkal aorta saat fase DIASTOL, meningkatkan tekanan pengisian koroner. Pada arteri yang kaku (PWV > 10 m/s), gelombang pantul melesat kembali terlalu dini, tiba di akhir SISTOL. Hal ini memicu dua kerugian fatal: menaikkan tekanan puncak sistolik aorta (menambah beban afterload ventrikel kiri dan MVO2) sekaligus menjatuhkan tekanan diastolik (memangkas perfusi arteri koroner).\n\nObat lini pertama pilihan untuk ISH adalah Penyekat Saluran Kalsium Dihidropiridin (Amlodipin) dan Diuretik serupa Tiazid.',
          },
          formula: '\\text{PWV} = \\sqrt{\\frac{E \\cdot h}{2r\\rho}}',
          formulaExplanation: {
            en: 'The Moens-Korteweg equation for Pulse Wave Velocity (PWV). Arterial wall stiffening (elevated Young\'s modulus E) directly accelerates pulse wave propagation, causing early wave reflection and isolated systolic hypertension.',
            id: 'Persamaan Moens-Korteweg untuk Pulse Wave Velocity (PWV). Kekakuan dinding arteri (peningkatan modulus elastisitas E) secara langsung mempercepat laju gelombang nadi, memicu gelombang pantul dini dan hipertensi sistolik terisolasi.',
          },
          variables: [
            {
              symbol: 'PWV',
              name: { en: 'Pulse Wave Velocity', id: 'Kecepatan Gelombang Nadi' },
              unit: 'm/s (meters per second)',
              description: {
                en: 'Speed of the arterial pressure wave along the vascular tree; >10 m/s indicates significant arterial stiffness.',
                id: 'Kecepatan gelombang tekanan nadi merambat di dinding arteri; >10 m/s menandakan kekakuan vaskular bermakna.',
              },
            },
            {
              symbol: 'E',
              name: { en: 'Young\'s Modulus of Elasticity', id: 'Modulus Elastisitas Young' },
              unit: 'Pascals (Pa)',
              description: {
                en: 'Intrinsic stiffness and elasticity of the vascular media.',
                id: 'Kekakuan intrinsik dan elastisitas tunika media pembuluh darah.',
              },
            },
            {
              symbol: 'h',
              name: { en: 'Arterial Wall Thickness', id: 'Ketebalan Dinding Arteri' },
              unit: 'millimeters (mm)',
              description: {
                en: 'Thickness of the vessel wall.',
                id: 'Ketebalan dinding pembuluh darah.',
              },
            },
            {
              symbol: '\\rho',
              name: { en: 'Blood Density', id: 'Massa Jenis Darah' },
              unit: 'kg/m³ (~1,060 kg/m³)',
              description: {
                en: 'Physical density of circulating whole blood.',
                id: 'Kerapatan massa fisik darah lengkap.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Isolated systolic hypertension in the elderly is driven by arterial stiffening and loss of the Windkessel effect.',
              'Increased PWV causes early wave reflection in late systole, augmenting pulse pressure (wide PP = SBP - DBP).',
            ],
            id: [
              'Hipertensi sistolik terisolasi pada lansia dipicu oleh kekakuan dinding aorta dan hilangnya efek Windkessel.',
              'Peningkatan PWV memicu gelombang pantul tiba di akhir sistol, memperlebar tekanan nadi (PP = TDS - TDD).',
            ],
          },
        },
        {
          id: 'hyp-4-sec-2',
          title: {
            en: '2. Ambulatory BP Monitoring (ABPM): Diurnal Dipping, White Coat & Masked Hypertension',
            id: '2. Pemantauan Tekanan Darah Ambulatori (ABPM): Profil Dipping, White Coat & Masked Hypertension',
          },
          content: {
            en: '24-hour Ambulatory Blood Pressure Monitoring (ABPM) represents the gold standard for clinical blood pressure assessment, removing clinic bias and revealing circadian hemodynamic rhythms:\n\n1. Diagnostic Categories:\n- Sustained Normotension: Normal clinic BP (<130/80) AND normal 24h ABPM (<125/75).\n- Sustained Hypertension: Elevated clinic BP (≥130/80) AND elevated 24h ABPM (≥125/75).\n- White Coat Hypertension: Elevated office/clinic BP (≥130/80) but persistently normal out-of-office 24h ABPM (<125/75, daytime <130/80). Driven by conditioned anxiety-related sympathetic activation in medical settings.\n- Masked Hypertension: Normal clinic BP (<130/80) but elevated out-of-office 24h ABPM (≥125/75). Highly treacherous; carries cardiovascular morbidity and mortality comparable to sustained hypertension, frequently seen in smokers, alcohol consumers, and high-stress professions.\n\n2. Circadian Dipping Patterns (Nocturnal Blood Pressure):\n- Normal Dipper: Nocturnal BP drops by 10% to 20% compared to daytime averages, driven by physiological parasympathetic dominance during sleep.\n- Non-Dipper: Nocturnal drop <10%. Strongly associated with autonomic neuropathy, chronic kidney disease, obstructive sleep apnea, and high risk of left ventricular hypertrophy and stroke.\n- Reverse Dipper (Riser): Nighttime BP exceeds daytime BP. Associated with the highest risk of all-cause mortality and heart failure.\n\n3. Resistant Hypertension: Blood pressure that remains above goal despite concurrent use of 3 antihypertensive drug classes at maximally tolerated doses (one being a diuretic). Adding low-dose Spironolactone (25–50 mg daily) is the proven most effective fourth-line intervention.',
            id: 'Pemantauan Tekanan Darah Ambulatori 24 Jam (ABPM) merupakan baku emas diagnostik hipertensi, mengeliminasi bias ruang periksa serta menyingkap ritme sirkadian hemodinamika:\n\n1. Kategori Diagnostik:\n- Normotensi Sejati: TD klinik normal (<130/80) DAN ABPM 24 jam normal (<125/75).\n- Hipertensi Menetap: TD klinik tinggi (≥130/80) DAN ABPM 24 jam tinggi (≥125/75).\n- White Coat Hypertension (Hipertensi Jas Putih): TD klinik meningkat (≥130/80) namun ABPM 24 jam normal (<125/75, siang hari <130/80). Dipicu oleh lonjakan simpatis reaktif akibat kecemasan di hadapan tenaga medis.\n- Masked Hypertension (Hipertensi Terselubung): TD klinik tampak normal (<130/80) namun ABPM 24 jam meningkat (≥125/75). Sangat berbahaya karena risiko morbiditas kardiovaskularnya setara dengan hipertensi menetap, kerap terjadi pada perokok, peminum alkohol, dan stres kerja tinggi.\n\n2. Pola Penurunan Nokturnal (Circadian Dipping):\n- Dipper Normal: Tekanan darah malam hari turun 10% hingga 20% dibanding rata-rata siang, mencerminkan dominansi parasimpatis normal saat tidur.\n- Non-Dipper: Penurunan nokturnal <10%. Sangat berkaitan dengan neuropati otonom, penyakit ginjal kronis, OSA, dan risiko tinggi hipertrofi ventrikel kiri serta stroke.\n- Reverse Dipper (Riser): Tekanan darah malam hari justru lebih tinggi dibanding siang. Membawa risiko mortalitas kardiovaskular dan gagal jantung tertinggi.\n\n3. Hipertensi Resisten: Tekanan darah tidak mencapai target kendali meski telah patuh mengonsumsi kombinasi 3 kelas obat antihipertensi dosis optimal (salah satunya diuretik). Penambahan Spironolakton dosis rendah (25–50 mg/hari) adalah terapi lini keempat paling efektif berdasarkan uji klinis PATHWAY-2.',
          },
          comparisonTable: {
            headers: {
              en: ['Clinical Phenotype', 'Office Blood Pressure', '24h ABPM Average', 'Cardiovascular Risk Profile'],
              id: ['Fenotipe Klinis', 'Tekanan Darah Klinik', 'Rata-rata ABPM 24 Jam', 'Profil Risiko Kardiovaskular'],
            },
            rows: [
              {
                en: ['Normotension', '<130/80 mmHg', '<125/75 mmHg', 'Lowest baseline risk'],
                id: ['Normotensi', '<130/80 mmHg', '<125/75 mmHg', 'Risiko dasar terendah'],
              },
              {
                en: ['White Coat HTN', '≥130/80 mmHg', '<125/75 mmHg', 'Intermediate; monitor annually'],
                id: ['Hipertensi Jas Putih', '≥130/80 mmHg', '<125/75 mmHg', 'Menengah; pantau berkala tiap tahun'],
              },
              {
                en: ['Masked HTN', '<130/80 mmHg', '≥125/75 mmHg', 'High (comparable to sustained HTN)'],
                id: ['Hipertensi Terselubung', '<130/80 mmHg', '≥125/75 mmHg', 'Tinggi (setara hipertensi menetap)'],
              },
              {
                en: ['Sustained HTN', '≥130/80 mmHg', '≥125/75 mmHg', 'Highest risk of target organ damage'],
                id: ['Hipertensi Menetap', '≥130/80 mmHg', '≥125/75 mmHg', 'Risiko kerusakan organ target tertinggi'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Masked hypertension carries a high cardiovascular event rate equal to sustained hypertension.',
              'Non-dipping and reverse dipping on ABPM represent powerful independent predictors of stroke and heart failure.',
            ],
            id: [
              'Hipertensi terselubung (masked) membawa risiko kardiovaskular setara dengan hipertensi menetap.',
              'Pola non-dipping dan reverse dipping pada ABPM merupakan prediktor independen kuat untuk stroke dan gagal jantung.',
            ],
          },
        },
        {
          id: 'hyp-4-sec-3',
          title: {
            en: '3. Gestational Hypertension, Preeclampsia & Eclampsia',
            id: '3. Hipertensi Gestasional, Preeklamsia & Eklamsia',
          },
          content: {
            en: 'Hypertensive disorders of pregnancy complicate 5–10% of all pregnancies and remain a leading cause of maternal and fetal mortality worldwide:\n\n1. Definitions & Classifications:\n- Chronic Hypertension: High BP diagnosed prior to pregnancy or before 20 weeks of gestation.\n- Gestational Hypertension: New-onset SBP ≥ 140 mmHg and/or DBP ≥ 90 mmHg after 20 weeks gestation in the absence of proteinuria or systemic features.\n- Preeclampsia: New-onset hypertension after 20 weeks gestation with Proteinuria (≥300 mg/24h or protein/creatinine ratio ≥0.3) OR new-onset maternal organ dysfunction: thrombocytopenia (platelets <100,000/µL), renal insufficiency (creatinine >1.1 mg/dL), impaired liver function (transaminases 2x normal, right upper quadrant pain), pulmonary edema, or new-onset visual/cerebral symptoms.\n- Eclampsia: New-onset generalized tonic-clonic seizures in a preeclamptic woman.\n- HELLP Syndrome: Hemolysis (microangiopathic), Elevated Liver enzymes, and Low Platelets.\n\n2. Pathophysiological Mechanism: Defective Endovascular Trophoblast Invasion:\n- In normal pregnancy, extravillous trophoblasts invade the maternal myometrium and remodel high-resistance, low-capacity spiral arteries into low-resistance, high-capacitance vascular conduits.\n- In preeclampsia, trophoblast invasion fails. The ischemic placenta releases anti-angiogenic factors—soluble fms-like tyrosine kinase-1 (sFlt-1) and soluble endoglin (sEng)—into the maternal circulation.\n- sFlt-1 binds and neutralizes maternal Vascular Endothelial Growth Factor (VEGF) and Placental Growth Factor (PlGF), precipitating widespread systemic endothelial injury, loss of fenestrations (glomerular endotheliosis), microvascular thrombosis, and intense vasoconstriction.\n\n3. Evidence-Based Clinical Management:\n- Antihypertensive Agents in Pregnancy: Oral Labetalol, Extended-release Nifedipine, and Methyldopa. (ACE inhibitors, ARBs, and Direct Renin Inhibitors are strictly teratogenic, causing fetal renal dysgenesis and oligohydramnios!).\n- Seizure Prophylaxis: Intravenous Magnesium Sulfate (4–6 g loading over 20 min, then 1–2 g/h infusion) is the gold standard for eclampsia prevention and treatment.\n- Definitive Cure: Delivery of the placenta.',
            id: 'Gangguan hipertensi pada kehamilan mempersulit 5–10% kehamilan dan tetap menjadi penyebab utama mortalitas maternal dan perinatal di seluruh dunia:\n\n1. Definisi & Klasifikasi:\n- Hipertensi Kronis: Tekanan darah tinggi yang telah ada sebelum kehamilan atau didiagnosis sebelum usia kehamilan 20 minggu.\n- Hipertensi Gestasional: Awitan baru TDS ≥ 140 mmHg dan/atau TDD ≥ 90 mmHg setelah usia kehamilan 20 minggu tanpa disertai proteinuria atau disfungsi organ sistemik.\n- Preeklamsia: Awitan baru hipertensi setelah 20 minggu kehamilan disertai Proteinuria (≥300 mg/24 jam atau rasio protein/kreatinin ≥0.3) ATAU bukti disfungsi organ target: trombositopenia (trombosit <100.000/µL), gangguan ginjal (kreatinin >1.1 mg/dL), gangguan fungsi hati (transaminase melonjak 2x normal, nyeri kuadran kanan atas), edema paru, atau gejala visual/serebral baru.\n- Eklamsia: Timbulnya kejang tonik-klonik umum baru pada wanita preeklamsia.\n- Sindrom HELLP: Hemolysis (anemia hemolitik mikroangiopatik), Elevated Liver enzymes, dan Low Platelets.\n\n2. Mekanisme Patofisiologi: Kegagalan Invasi Trofoblas Endovaskular:\n- Pada kehamilan normal, trofoblas ekstravilus menginvasi miometrium ibu dan merombak arteri spiralis beresistansi tinggi menjadi pembuluh berkapasitas besar dan beresistansi rendah.\n- Pada preeklamsia, invasi trofoblas gagal. Plasenta yang hipoksik melepaskan faktor anti-angiogenik masif—soluble fms-like tyrosine kinase-1 (sFlt-1) dan soluble endoglin (sEng)—ke sirkulasi ibu.\n- Molekul sFlt-1 mengikat dan menetralkan VEGF dan PlGF maternal, memicu kerusakan endotel sistemik luas, endoteliosis glomerulus, kebocoran kapiler, trombosis mikrovaskular, dan vasokonstriksi hebat.\n\n3. Tata Laksana Medis Berbasis Bukti:\n- Obat Antihipertensi Aman Kehamilan: Labetalol oral, Nifedipin lepas lambat, dan Metildopa. (ACE inhibitor, ARB, dan inhibitor renin dilarang keras karena teratogenik memicu agenesis ginjal janin!).\n- Pencegahan Kejang: Magnesium Sulfat intravena (MgSO4 loading 4–6 g dalam 20 menit, lanjut infus 1–2 g/jam) adalah baku emas pencegahan dan tatalaksana kejang eklamsia.\n- Terapi Definitif: Terminasi kehamilan dan persalinan plasenta.',
          },
          keyTakeaways: {
            en: [
              'Preeclampsia is driven by placental anti-angiogenic factors (sFlt-1) causing widespread maternal endothelial injury.',
              'ACE inhibitors and ARBs are strictly contraindicated in pregnancy; IV Magnesium Sulfate is the drug of choice for eclampsia prevention.',
            ],
            id: [
              'Preeklamsia dipicu oleh faktor anti-angiogenik plasenta (sFlt-1) yang menyebabkan cedera endotel maternal sistemik.',
              'Inhibitor ACE dan ARB mutlak dikontraindikasikan pada kehamilan; Magnesium Sulfat IV adalah pilihan utama pencegahan kejang.',
            ],
          },
        },
        {
          id: 'hyp-4-sec-4',
          title: {
            en: '4. Pulmonary Hypertension (PH): WHO Groups 1 to 5 & Right Ventricular Hemodynamics',
            id: '4. Hipertensi Pulmonal: Grup WHO 1 hingga 5 & Hemodinamika Ventrikel Kanan',
          },
          content: {
            en: 'Pulmonary Hypertension (PH) is a distinct hemodynamic pathophysiological state defined by an elevated Mean Pulmonary Arterial Pressure (mPAP) > 20 mmHg measured at rest via invasive Right Heart Catheterization (RHC).\n\nThe WHO 5-Group Clinical Classification:\n1. Group 1: Pulmonary Arterial Hypertension (PAH): True precapillary microvascular arteriopathy (pulmonary vascular resistance PVR ≥ 2 Wood units, pulmonary capillary wedge pressure PCWP ≤ 15 mmHg). Driven by endothelial proliferation, smooth muscle hypertrophy, and plexiform lesions. Etiologies: Idiopathic, Heritable (BMPR2 gene mutation), Connective Tissue Diseases (Systemic Sclerosis), Congenital Heart Disease (Eisenmenger syndrome), and HIV.\n2. Group 2: PH Secondary to Left Heart Disease (Most common, ~70%): Post-capillary PH (PCWP > 15 mmHg) driven by elevated left ventricular diastolic filling pressures (Heart Failure with preserved EF HFpEF, HFrEF, Mitral/Aortic valvular disease).\n3. Group 3: PH Secondary to Lung Diseases and/or Hypoxia: Precapillary PH caused by chronic alveolar hypoxic vasoconstriction and capillary loss (COPD, Idiopathic Pulmonary Fibrosis, Sleep apnea).\n4. Group 4: Chronic Thromboembolic Pulmonary Hypertension (CTEPH): Mechanical obstruction of pulmonary arterial branches by non-resolving organized fibrotic thromboemboli. Potentially curable via Pulmonary Endarterectomy (PEA) or Balloon Pulmonary Angioplasty (BPA).\n5. Group 5: PH with Unclear/Multifactorial Mechanisms (Hematologic, sarcoidosis, metabolic disorders).\n\nTargeted Pharmacotherapy for Group 1 PAH (Targeting 3 Distinct Molecular Pathways):\n- Endothelin Pathway: Endothelin Receptor Antagonists (ERAs: Bosentan, Macitentan, Ambrisentan) block vasoconstrictor ET-A/B receptors.\n- Nitric Oxide Pathway: Phosphodiesterase-5 Inhibitors (PDE-5i: Sildenafil, Tadalafil) and Soluble Guanylate Cyclase stimulators (Riociguat) elevate intracellular cyclic GMP, promoting smooth muscle relaxation.\n- Prostacyclin Pathway: Prostacyclin analogs and IP-receptor agonists (Epoprostenol IV, Treprostinil, Selexipag) elevate cyclic AMP, producing potent pulmonary vasodilation and anti-proliferative actions.',
            id: 'Hipertensi Pulmonal (Pulmonary Hypertension/PH) merupakan kondisi hemodinamika spesifik yang didefinisikan sebagai peningkatan Tekanan Arteri Pulmonalis Rata-rata (Mean Pulmonary Arterial Pressure/mPAP) > 20 mmHg saat istirahat yang diukur melalui Kateterisasi Jantung Kanan (RHC) invasif.\n\nKlasifikasi Klinis 5 Grup WHO:\n1. Grup 1: Pulmonary Arterial Hypertension (PAH): Arteriopati mikrovaskular prekapiler murni (resistansi vaskular paru PVR ≥ 2 Wood unit, tekanan baji kapiler paru PCWP ≤ 15 mmHg). Dicirikan oleh proliferasi sel endotel, hipertrofi otot polos, dan lesi pleksiform. Etiologi: Idiopatik, Genetik (mutasi gen BMPR2), Penyakit Jaringan Ikat (Sklerosis Sistemik), Penyakit Jantung Bawaan (Sindrom Eisenmenger), dan HIV.\n2. Grup 2: PH Akibat Penyakit Jantung Kiri (Paling sering, ~70%): PH pascakapiler (PCWP > 15 mmHg) akibat transmisi balik tekanan diastolik ventrikel kiri yang tinggi (gagal jantung HFpEF, HFrEF, stenosis/regurgitasi katup mitral/aorta).\n3. Grup 3: PH Akibat Penyakit Paru dan/atau Hipoksia: Vasokonstriksi hipoksik kronis dan pemusnahan kapiler paru (PPOK, Fibrosis Paru Idiopatik, sleep apnea).\n4. Grup 4: Chronic Thromboembolic Pulmonary Hypertension (CTEPH): Obstruksi mekanis kronis cabang arteri pulmonalis oleh tromboemboli fibrotik yang terorganisasi. Berpotensi sembuh total via bedah Pulmonary Endarterectomy (PEA) atau angioplasti balon (BPA).\n5. Grup 5: PH dengan Mekanisme Tidak Jelas/Multifaktor (Gangguan hematologi, sarkoidosis, penyakit metabolik).\n\nFarmakoterapi Tertarget untuk Grup 1 PAH (Menyasar 3 Jalur Molekuler):\n- Jalur Endotelin: Antagonis Reseptor Endotelin (ERA: Bosentan, Masitentan, Ambrisentan) menghambat reseptor vasokonstriktor ET-A/B.\n- Jalur Nitric Oxide: Inhibitor PDE-5 (Sildenafil, Tadalafil) dan stimulator sGC (Riociguat) meningkatkan cGMP intraseluler untuk relaksasi otot polos.\n- Jalur Prostasiklin: Analog prostasiklin dan agonis reseptor IP (Epoprostenol IV, Treprostinil, Selexipag) memicu vasodilatasi pulmonal kuat dan efek antiproliferatif.',
          },
          comparisonTable: {
            headers: {
              en: ['WHO PH Group', 'Underlying Category', 'Hemodynamic Profile (RHC)', 'Key Therapeutic Strategy'],
              id: ['Grup PH WHO', 'Kategori Penyebab', 'Profil Hemodinamika (RHC)', 'Strategi Terapi Utama'],
            },
            rows: [
              {
                en: ['Group 1 (PAH)', 'Precapillary pulmonary arteriopathy', 'mPAP >20, PCWP ≤15, PVR ≥2 Wood units', 'Targeted vasodilators (ERAs, PDE-5i, Prostacyclins)'],
                id: ['Grup 1 (PAH)', 'Arteriopati pulmonal prekapiler', 'mPAP >20, PCWP ≤15, PVR ≥2 Wood unit', 'Vasodilator target (ERA, PDE-5i, Prostasiklin)'],
              },
              {
                en: ['Group 2 (Left Heart)', 'Postcapillary passive congestion', 'mPAP >20, PCWP >15 mmHg', 'Optimize underlying heart failure (Diuretics, GDMT)'],
                id: ['Grup 2 (Jantung Kiri)', 'Kongesti pasif pascakapiler', 'mPAP >20, PCWP >15 mmHg', 'Optimalkan gagal jantung dasar (Diuretik, GDMT)'],
              },
              {
                en: ['Group 3 (Hypoxic Lung)', 'Hypoxic vasoconstriction & capillary loss', 'mPAP >20, PCWP ≤15 mmHg', 'Long-term oxygen therapy (LTOT), treat COPD/ILD'],
                id: ['Grup 3 (Paru Hipoksik)', 'Vasokonstriksi hipoksia & destruksi kapiler', 'mPAP >20, PCWP ≤15 mmHg', 'Terapi oksigen jangka panjang (LTOT), obati PPOK/ILD'],
              },
              {
                en: ['Group 4 (CTEPH)', 'Organized chronic thromboemboli', 'mPAP >20, mismatched V/Q scan defects', 'Pulmonary Endarterectomy (PEA) / Riociguat'],
                id: ['Grup 4 (CTEPH)', 'Tromboemboli fibrotik kronis terorganisasi', 'mPAP >20, defek perfusi V/Q mismatch', 'Pulmonary Endarterectomy (PEA) / Riosiguat'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Pulmonary hypertension is defined by mPAP > 20 mmHg on right heart catheterization.',
              'Group 1 PAH benefits from targeted dual/triple vasodilator therapy; Group 2 left-heart disease requires heart failure optimization.',
            ],
            id: [
              'Hipertensi pulmonal ditegakkan oleh nilai mPAP > 20 mmHg pada kateterisasi jantung kanan.',
              'PAH Grup 1 mendapat manfaat besar dari terapi kombinasi vasodilator terarah; Grup 2 memerlukan terapi optimal gagal jantung.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'hyp-q4-1',
          question: {
            en: 'In elderly patients with Isolated Systolic Hypertension (ISH), what primary physical vascular change explains the wide pulse pressure and elevated systolic blood pressure?',
            id: 'Pada pasien lansia dengan Hipertensi Sistolik Terisolasi (ISH), perubahan fisik vaskular apakah yang mendasari melebarnya tekanan nadi dan tingginya tekanan sistolik?',
          },
          options: {
            en: [
              'Loss of elastic fibers and progressive stiffening of the aortic wall, causing accelerated Pulse Wave Velocity (PWV)',
              'Severe renal artery stenosis with excess aldosterone production',
              'Diffuse arteriolar vasodilation reducing peripheral vascular resistance',
              'Transient hypercalcemia increasing cardiac contractility',
            ],
            id: [
              'Degenerasi serat elastin dan kekakuan progresif dinding aorta, memicu akselerasi Pulse Wave Velocity (PWV)',
              'Stenosis arteri renalis berat disertai produksi aldosteron berlebih',
              'Vasodilatasi arteriol difus yang menurunkan resistansi vaskular sistemik',
              'Hiperkalsemia transien yang meningkatkan kontraktilitas miokardium',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Age-related loss of compliant elastin in the aorta and replacement with rigid collagen elevates PWV, causing the reflected pressure wave to return early in systole and generating isolated systolic hypertension with wide pulse pressure.',
            id: 'Hilangnya elastin elastis aorta akibat penuaan dan penggantiannya dengan kolagen kaku meningkatkan PWV, menyebabkan gelombang pantul kembali lebih awal saat fase sistol sehingga memicu hipertensi sistolik terisolasi.',
          },
        },
        {
          id: 'hyp-q4-2',
          question: {
            en: 'Which class of antihypertensive agents is strictly contraindicated throughout all trimesters of pregnancy due to risks of fetal renal agenesis, oligohydramnios, and skull hypoplasia?',
            id: 'Golongan obat antihipertensi manakah yang mutlak dikontraindikasikan di seluruh trimester kehamilan karena risiko agenesis ginjal janin, oligohidramnion, dan hipoplasia kranial?',
          },
          options: {
            en: [
              'ACE Inhibitors and Angiotensin Receptor Blockers (ARBs)',
              'Dihydropyridine Calcium Channel Blockers (Nifedipine)',
              'Centrally acting alpha-2 agonists (Methyldopa)',
              'Selective beta-1 blockers (Labetalol)',
            ],
            id: [
              'Inhibitor ACE dan Angiotensin Receptor Blocker (ARB)',
              'DHP Penyekat Saluran Kalsium (Nifedipin)',
              'Agonis alfa-2 sentral (Metildopa)',
              'Penyekat beta selektif (Labetalol)',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'ACE inhibitors and ARBs impair fetal renal development, leading to renal dysgenesis, severe oligohydramnios (Potter sequence), pulmonary hypoplasia, and fetal death; they are strictly contraindicated in pregnancy.',
            id: 'Inhibitor ACE dan ARB merusak perkembangan ginjal janin, memicu disgenesis renal, oligohidramnion berat (sekuens Potter), hipoplasia pulmonal, dan kematian janin; keduanya mutlak dilarang pada kehamilan.',
          },
        },
        {
          id: 'hyp-q4-3',
          question: {
            en: 'A 35-year-old female presents with progressive exertional dyspnea. Right heart catheterization confirms precapillary Pulmonary Arterial Hypertension (mPAP 42 mmHg, PCWP 11 mmHg, PVR 5.8 Wood units). Her workup confirms WHO Group 1 PAH. Which targeted drug mechanism is appropriate for her disease?',
            id: 'Wanita 35 tahun datang dengan sesak napas yang kian memberat saat aktivitas. Kateterisasi jantung kanan membuktikan Hipertensi Arteri Pulmonal prekapiler (mPAP 42 mmHg, PCWP 11 mmHg, PVR 5.8 Wood unit) yang masuk dalam kriteria Grup 1 WHO. Mekanisme obat tertarget manakah yang sesuai untuk kondisinya?',
          },
          options: {
            en: [
              'Endothelin Receptor Antagonism (e.g., Macitentan) or PDE-5 Inhibition (e.g., Sildenafil)',
              'High-dose systemic loop diuretics and fluid restriction alone',
              'Non-selective beta-blockers to decrease right ventricular heart rate',
              'Surgical coronary artery bypass grafting',
            ],
            id: [
              'Antagonis Reseptor Endotelin (misal Masitentan) atau Inhibitor PDE-5 (misal Sildenafil)',
              'Diuretik loop sistemik dosis tinggi dan restriksi cairan semata',
              'Penyekat beta non-selektif untuk menurunkan denyut ventrikel kanan',
              'Operasi bedah pintas arteri koroner (CABG)',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Group 1 PAH is treated with targeted pulmonary vasodilators that address the endothelin pathway (ERAs like macitentan/ambrisentan), nitric oxide pathway (PDE-5i like sildenafil/tadalafil, sGC stimulators), or prostacyclin pathway.',
            id: 'PAH Grup 1 diobati dengan vasodilator pulmonal tertarget yang menyasar jalur endotelin (ERA seperti masitentan/ambrisentan), jalur nitric oxide (PDE-5i seperti sildenafil/tadalafil), atau jalur prostasiklin.',
          },
        },
      ],
    },
  ],
};
