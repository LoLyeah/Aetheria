import { Topic } from '@/types/learning';

export const cardiacArrestTopic: Topic = {
  id: 'cardiac-arrest',
  title: {
    en: 'Cardiac Arrest & Acute Coronary Syndromes',
    id: 'Henti Jantung & Sindrom Koroner Akut',
  },
  tagline: {
    en: 'STEMI, NSTEMI, Angina Pectoris, Lethal Arrhythmias, CPR Hemodynamics, and Defibrillation Physics.',
    id: 'STEMI, NSTEMI, Angina Pektoris, Aritmia Letal, Hemodinamika RJP, dan Fisika Defibrilasi.',
  },
  description: {
    en: 'Master acute cardiovascular emergencies and ischemic heart disease: from atherothrombotic plaque rupture and subendocardial ischemia to 12-lead ECG localization, High-Sensitivity Troponin kinetics, lethal arrest dysrhythmias (VF, pVT, PEA, Asystole), biphasic defibrillation biophysics, and high-quality CPR coronary perfusion hemodynamics.',
    id: 'Kuasai kegawatdaruratan kardiovaskular akut dan penyakit jantung iskemik: dari ruptur plak aterotrombotik dan iskemia subendokardium hingga lokalisasi EKG 12-sadapan, kinetika Troponin sensitivitas tinggi, disritmia henti jantung (VF, pVT, PEA, Asistol), biofisika defibrilasi bifasik, serta hemodinamika perfusi koroner pada RJP berkualitas tinggi.',
  },
  category: {
    en: 'Cardiology & Emergency Medicine',
    id: 'Kardiologi & Kedokteran Gawat Darurat',
  },
  colorAccent: 'red',
  badgeColor: 'from-red-600 to-rose-700',
  iconName: 'HeartCrack',
  modules: [
    // -------------------------------------------------------------
    // PART 1: STEMI & TRANSMURAL MYOCARDIAL INFARCTION
    // -------------------------------------------------------------
    {
      id: 'cardiac-mod-1',
      topicId: 'cardiac-arrest',
      order: 1,
      title: {
        en: 'STEMI: Transmural Infarction, Plaque Rupture & Emergent Reperfusion',
        id: 'STEMI: Infark Transmural, Ruptur Plak & Reperfusi Darurat',
      },
      shortDescription: {
        en: 'Coronary atherothrombosis, ST-elevation ECG localization, primary PCI vs fibrinolytics, and coronary perfusion mechanics.',
        id: 'Aterotrombosis koroner, lokalisasi elevasi ST pada EKG, PCI primer vs fibrinolitik, dan mekanika perfusi koroner.',
      },
      durationMinutes: 25,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'cardiac-hemodynamics',
      sections: [
        {
          id: 'cardiac-1-sec-1',
          title: {
            en: '1. Coronary Atherothrombosis & The Plaque Rupture Cascade',
            id: '1. Aterotrombosis Koroner & Kaskade Ruptur Plak',
          },
          content: {
            en: 'Acute ST-Elevation Myocardial Infarction (STEMI) represents complete, sudden, and persistent luminal occlusion of an epicardial coronary artery, resulting in transmural myocardial necrosis across the entire thickness of the ventricular wall supplied by that vessel.\n\nThe cascade begins with the rupture or erosion of an unstable, thin-cap fibroatheroma (TCFA). The thin fibrous cap (<65 µm) degrades through the enzymatic action of matrix metalloproteinases (MMP-1, MMP-9, MMP-13) secreted by activated foam cell macrophages and T-lymphocytes within the atheromatous core.\n\nUpon fibrous cap rupture, highly thrombogenic subendothelial core components—predominantly tissue factor (TF) and fibrillar collagen—are exposed to circulating platelets and coagulation factors:\n1. Platelet Adhesion: von Willebrand factor (vWF) binds platelet surface receptor glycoprotein Ib-IX-V.\n2. Platelet Activation & Degranulation: Thrombin, ADP, and thromboxane A2 (TXA2) trigger intracellular calcium release, conformational change, and surface expression of Glycoprotein IIb/IIIa (integrin αIIbβ3).\n3. Platelet Aggregation & Thrombus Propagation: Fibrinogen bridges adjacent GPIIb/IIIa receptors, forming a dense platelet mesh ("white thrombus"). Concurrently, the coagulation cascade produces cross-linked fibrin and captures red blood cells, yielding an occlusive "red thrombus" that halts epicardial blood flow within minutes.',
            id: 'Infark Miokard dengan Elevasi Segmen ST (STEMI) merupakan oklusi luminal mendadak, lengkap, dan persisten pada arteri koroner epikardium, yang mengakibatkan nekrosis miokardium transmural mencakup seluruh ketebalan dinding ventrikel yang diperdarahi oleh pembuluh darah tersebut.\n\nKaskade ini diawali oleh ruptur atau erosi fibroateroma berkapsul tipis yang tidak stabil (TCFA). Kapsul fibrosa tipis (<65 µm) terdegradasi akibat kerja enzimatik matriks metaloproteinase (MMP-1, MMP-9, MMP-13) yang disekresikan oleh makrofag sel busa teraktivasi dan limfosit T di dalam inti ateroma.\n\nKetika kapsul fibrosa pecah, komponen inti subendotel yang sangat trombogenik—terutama faktor jaringan (tissue factor/TF) dan kolagen fibrilar—terpapar pada trombosit dan faktor koagulasi yang bersirkulasi:\n1. Adhesi Trombosit: Faktor von Willebrand (vWF) berikatan dengan reseptor permukaan glikoprotein Ib-IX-V pada trombosit.\n2. Aktivasi & Degranulasi: Trombin, ADP, dan tromboksan A2 (TXA2) memicu lonjakan kalsium intraseluler, perubahan konformasi, dan ekspresi reseptor Glikoprotein IIb/IIIa (integrin αIIbβ3).\n3. Agregasi Trombosit & Propagasi Trombus: Molekul fibrinogen menjembatani reseptor GPIIb/IIIa yang berdekatan, membentuk jaring trombosit padat ("trombus putih"). Bersamaan dengan itu, kaskade koagulasi menghasilkan fibrin taut silang yang menjerat sel darah merah, membentuk "trombus merah" oklusif total yang menghentikan perfusi epikardium dalam hitungan menit.',
          },
          formula: '\\text{CPP} = P_\\text{aortic, diastolic} - P_\\text{LVEDP}',
          formulaExplanation: {
            en: 'Coronary Perfusion Pressure (CPP) represents the net physiological driving pressure that drives myocardial capillary blood flow through the coronary bed during diastole. In STEMI, rising left ventricular end-diastolic pressure (LVEDP) due to acute ischemic diastolic stiffness severely impairs microvascular perfusion.',
            id: 'Tekanan Perfusi Koroner (CPP) menyatakan tekanan pendorong fisiologis bersih yang mengalirkan darah kapiler miokardium melalui jalinan koroner selama fase diastolik. Pada STEMI, peningkatan tekanan akhir diastolik ventrikel kiri (LVEDP) akibat kekakuan diastolik iskemik akut sangat memperburuk perfusi mikrovaskular.',
          },
          variables: [
            {
              symbol: 'P_\\text{aortic, diastolic}',
              name: { en: 'Aortic Diastolic Pressure', id: 'Tekanan Diastolik Aorta' },
              unit: 'mmHg',
              description: {
                en: 'Systemic diastolic arterial pressure supporting retrograde coronary flow during diastole.',
                id: 'Tekanan arteri diastolik sistemik yang menopang aliran koroner retrograd saat diastol.',
              },
            },
            {
              symbol: 'P_\\text{LVEDP}',
              name: { en: 'Left Ventricular End-Diastolic Pressure', id: 'Tekanan Akhir Diastolik Ventrikel Kiri' },
              unit: 'mmHg',
              description: {
                en: 'Backpressure exerted by blood in the left ventricle against subendocardial microvasculature.',
                id: 'Tekanan balik yang diberikan oleh volume darah di ventrikel kiri terhadap mikrovaskular subendokardium.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'STEMI is triggered by acute plaque rupture of a thin-cap fibroatheroma followed by occlusive red/white thrombus.',
              'Coronary perfusion occurs primarily during diastole, governed by CPP = Diastolic Aortic Pressure - LVEDP.',
            ],
            id: [
              'STEMI dipicu oleh ruptur akut fibroateroma berkapsul tipis yang diikuti oleh pembentukan trombus oklusif total.',
              'Perfusi koroner terjadi terutama saat diastol, dikendalikan oleh formula CPP = Tekanan Diastolik Aorta - LVEDP.',
            ],
          },
        },
        {
          id: 'cardiac-1-sec-2',
          title: {
            en: '2. 12-Lead ECG Localization & Transmural Vector Electrophysiology',
            id: '2. Lokalisasi EKG 12-Sadapan & Elektrofisiologis Vektor Transmural',
          },
          content: {
            en: 'Complete coronary occlusion halts aerobic oxidative phosphorylation in the ischemic zone within 8 to 10 seconds. Intracellular ATP depletion deactivates the Na+/K+-ATPase pump, leading to intracellular sodium accumulation and extracellular potassium accumulation. This causes a partial diastolic depolarization and shortening of the action potential duration in ischemic myocytes.\n\nThis voltage gradient between healthy myocardium and ischemic myocardium produces a "systolic injury current" oriented directly toward the epicardial electrode, registered on the surface ECG as ST-segment elevation (J-point elevation):\n\n- Anterior Wall (LAD - Left Anterior Descending artery): V1, V2, V3, V4. Massive risk of acute pump failure and cardiogenic shock.\n- Anteroseptal: V1–V3 (septal perforator branches of LAD).\n- Lateral Wall (LCx - Left Circumflex artery / Diagonal LAD): Leads I, aVL, V5, V6.\n- Inferior Wall (RCA - Right Coronary Artery in 85% right-dominant hearts, or LCx in 15%): Leads II, III, aVF. Frequently accompanied by reciprocal ST depression in leads I and aVL.\n- Right Ventricular Infarction: Right-sided leads V3R–V4R with ST elevation ≥1 mm. Highly preload-dependent; nitrates and diuretics are strictly contraindicated.\n- Posterior Wall Infarction: Horizontal ST depression, tall upright R waves, and upright T waves in V1–V3 (confirmed by ST elevation ≥0.5 mm in posterior leads V7–V9).',
            id: 'Oklusi koroner total menghentikan fosforilasi oksidatif aerobik di zona iskemik dalam 8 hingga 10 detik. Deplesi ATP intraseluler menonaktifkan pompa Na+/K+-ATPase, memicu akumulasi natrium intraseluler dan kalium ekstraseluler. Kondisi ini menyebabkan depolarisasi parsial fase diastolik serta pemendekan durasi potensial aksi pada miosit iskemik.\n\nGradien voltase antara miokardium sehat dan iskemik ini menghasilkan "arus cedera sistolik" (systolic injury current) yang mengarah tegak lurus ke elektroda epikardium, terekam pada EKG permukaan sebagai elevasi segmen ST (elevasi titik J):\n\n- Dinding Anterior (LAD - Left Anterior Descending): Sadapan V1, V2, V3, V4. Risiko tinggi gagal pompa ventrikel dan syok kardiogenik masif.\n- Anteroseptal: V1–V3 (cabang perforator septal LAD).\n- Dinding Lateral (LCx - Left Circumflex / Diagonal LAD): Sadapan I, aVL, V5, V6.\n- Dinding Inferior (RCA - Right Coronary Artery pada 85% dominansi kanan): Sadapan II, III, aVF. Kerap disertai depresi ST resiprokal di sadapan I dan aVL.\n- Infark Ventrikel Kanan: Sadapan sisi kanan V3R–V4R dengan elevasi ST ≥1 mm. Sangat bergantung pada preload; nitrat dan diuretik mutlak dikontraindikasikan.\n- Dinding Posterior: Depresi ST horizontal, gelombang R tinggi dominan, dan gelombang T tegak di V1–V3 (dikonfirmasi melalui elevasi ST ≥0.5 mm di sadapan posterior V7–V9).',
          },
          comparisonTable: {
            headers: {
              en: ['Infarction Territory', 'Culprit Coronary Artery', 'Diagnostic Leads', 'Reciprocal ECG Leads'],
              id: ['Wilayah Infark', 'Arteri Koroner Penyebab', 'Sadapan Diagnostik', 'Sadapan Resiprokal EKG'],
            },
            rows: [
              {
                en: ['Anterior / Anteroseptal', 'Left Anterior Descending (LAD)', 'V1, V2, V3, V4', 'II, III, aVF (occasional)'],
                id: ['Anterior / Anteroseptal', 'Left Anterior Descending (LAD)', 'V1, V2, V3, V4', 'II, III, aVF (kadang-kadang)'],
              },
              {
                en: ['Inferior', 'Right Coronary Artery (RCA) (85%)', 'II, III, aVF', 'I, aVL (marked ST depression)'],
                id: ['Inferior', 'Right Coronary Artery (RCA) (85%)', 'II, III, aVF', 'I, aVL (depresi ST tegas)'],
              },
              {
                en: ['Lateral / High Lateral', 'Left Circumflex (LCx) / Diagonal', 'I, aVL, V5, V6', 'II, III, aVF'],
                id: ['Lateral / High Lateral', 'Left Circumflex (LCx) / Diagonal', 'I, aVL, V5, V6', 'II, III, aVF'],
              },
              {
                en: ['Posterior', 'Distal RCA / LCx', 'V7, V8, V9 (ST elevation ≥0.5mm)', 'V1, V2, V3 (tall R, ST depression)'],
                id: ['Posterior', 'Distal RCA / LCx', 'V7, V8, V9 (elevasi ST ≥0.5mm)', 'V1, V2, V3 (R tinggi, depresi ST)'],
              },
              {
                en: ['Right Ventricle (RV)', 'Proximal RCA', 'V3R, V4R (ST elevation ≥1mm)', 'I, aVL'],
                id: ['Ventrikel Kanan (RV)', 'Proksimal RCA', 'V3R, V4R (elevasi ST ≥1mm)', 'I, aVL'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'ST elevation reflects an epicardial injury current directing away from normal myocardium toward the active electrode.',
              'Always acquire V3R–V4R in inferior STEMI to exclude right ventricular infarction before giving vasodilators.',
            ],
            id: [
              'Elevasi segmen ST mencerminkan arus cedera epikardium yang mengarah langsung ke elektroda pencatat.',
              'Selalu rekam sadapan V3R–V4R pada STEMI inferior guna menyingkirkan infark ventrikel kanan sebelum pemberian vasodilator.',
            ],
          },
        },
        {
          id: 'cardiac-1-sec-3',
          title: {
            en: '3. Emergent Reperfusion Timelines: Primary PCI vs Fibrinolytic Therapy',
            id: '3. Garis Waktu Reperfusi Darurat: PCI Primer vs Terapi Fibrinolitik',
          },
          content: {
            en: 'Time is myocardium: irreversible cardiomyocyte coagulative necrosis begins after 20 minutes of complete ischemia and spreads as a wavefront from the subendocardium to the epicardium, becoming near-total within 6 hours. ACC/AHA and ESC guidelines delineate strict benchmark timelines for reperfusion:\n\n1. Primary Percutaneous Coronary Intervention (PCI): The gold standard strategy whenever feasible.\n- Door-to-Balloon (D2B) Time: ≤90 minutes from first medical contact (FMC) in PCI-capable facilities.\n- FMC-to-Wire Crossing: ≤120 minutes if requiring inter-hospital transfer to a PCI center.\n- Procedure: Balloon angioplasty with second-generation drug-eluting stent (DES) implantation, restoring TIMI Grade 3 brisk ante-grade flow.\n\n2. Fibrinolytic Pharmacotherapy: Indicated when expected transfer time to primary PCI exceeds 120 minutes and symptoms are <12 hours old.\n- Door-to-Needle (D2N) Time: ≤30 minutes.\n- Agents: Fibrin-specific tissue plasminogen activators (tPA, Tenecteplase TNK-tPA, Reteplase rPA) that convert plasminogen to plasmin, cleaving fibrin networks.\n- Absolute Contraindications: Any prior intracranial hemorrhage, known structural cerebral vascular malformation, ischemic stroke within 3 months, active internal bleeding, or suspected aortic dissection.\n- Rescue PCI: Mandatory if fibrinolysis fails (<50% ST-segment resolution at 60–90 minutes post-bolus).',
            id: 'Time is myocardium: nekrosis koagulatif kardiomiosit yang ireversibel dimulai setelah 20 menit iskemia total dan menyebar sebagai gelombang muka (wavefront) dari subendokardium ke epikardium, menjadi nekrosis transmural nyaris total dalam 6 jam. Pedoman ACC/AHA dan ESC menetapkan batas waktu baku untuk reperfusi:\n\n1. Percutaneous Coronary Intervention (PCI) Primer: Strategi baku emas utama jika fasilitas memungkinkan.\n- Door-to-Balloon (D2B) Time: ≤90 menit sejak kontak medis pertama (FMC) di rumah sakit berkemampuan PCI.\n- FMC-to-Wire Crossing: ≤120 menit jika pasien memerlukan transfer antar-rumah sakit ke pusat rujukan PCI.\n- Tindakan: Angioplasti balon disertai pemasangan stent berlapis obat (Drug-Eluting Stent/DES) generasi kedua guna memulihkan aliran antegrad normal TIMI Derajat 3.\n\n2. Farmakoterapi Fibrinolitik: Diindikasikan jika estimasi waktu transfer untuk PCI primer melampaui 120 menit dan durasi gejala <12 jam.\n- Door-to-Needle (D2N) Time: ≤30 menit.\n- Obat Pilihan: Fibrin-specific tissue plasminogen activators (tPA, Tenekteplase TNK-tPA, Reteplase rPA) yang mengaktivasi plasminogen menjadi plasmin pemotong polimer fibrin.\n- Kontraindikasi Mutlak: Riwayat perdarahan intrakranial kapan pun, malformasi vaskular serebral struktural, stroke iskemik dalam 3 bulan, perdarahan internal aktif, atau kecurigaan diseksi aorta.\n- Rescue PCI: Wajib segera dikerjakan jika fibrinolisis gagal (resolusi elevasi segmen ST <50% pada evaluasi 60–90 menit pasca-bolus).',
          },
          caseStudy: {
            title: {
              en: 'Emergency Case: Hyperacute Anterior STEMI with Ventricular Fibrillation',
              id: 'Kasus Kegawatdaruratan: Anterior STEMI Hiperakut dengan Fibrilasi Ventrikel',
            },
            context: {
              en: 'A 54-year-old male with hypertension and smoking history collapses with crushing retrosternal chest pain and diaphoresis. EMS arrives in 8 minutes, records ECG showing 5mm ST elevation in V1–V4 with hyperacute T waves. During transport, patient suddenly loses consciousness with pulseless gasping.',
              id: 'Pria 54 tahun dengan riwayat hipertensi dan merokok mendadak mengalami nyeri dada retrosternal menjalar hebat disertai keringat dingin. Tim ambulans tiba dalam 8 menit, mencatat EKG menunjukkan elevasi ST 5mm di V1–V4 dengan gelombang T hiperakut. Saat transportasi, pasien mendadak tidak sadarkan diri dan mengalami napas agonal tanpa nadi.',
            },
            analysis: {
              en: 'Monitor reveals coarse Ventricular Fibrillation (VF) triggered by phase 1b ischemic re-entry. EMS executes immediate 200J biphasic asynchronous defibrillation, follows with 2 minutes of continuous high-quality chest compressions, achieves ROSC, and transfers directly to catheterization lab (door-to-balloon time 58 minutes). Coronary angiography demonstrates 100% thrombotic occlusion of proximal LAD. Successful aspiration thrombectomy and DES placement restores TIMI 3 flow.',
              id: 'Monitor menampilkan Fibrilasi Ventrikel (VF) kasar akibat re-entry iskemik fase 1b. Tim melakukan defibrilasi asinkron bifasik 200J seketika, dilanjutkan 2 menit RJP berkualitas tinggi tanpa henti, mencapai ROSC, dan langsung mengantar pasien ke lab kateterisasi (waktu door-to-balloon 58 menit). Angiografi menunjukkan oklusi trombotik 100% di LAD proksimal. Aspirasi trombus dan penanaman DES berhasil memulihkan aliran koroner TIMI 3.',
            },
            takeaway: {
              en: 'Early defibrillation in shockable ischemic arrest coupled with rapid emergent primary PCI (<90 min) yields maximum myocardial salvage and intact neurological survival.',
              id: 'Defibrilasi dini pada henti jantung iskemik ritme shockable yang dipadukan dengan PCI primer darurat (<90 menit) menghasilkan penyelamatan miokardium maksimal dan kelangsungan hidup neurologis utuh.',
            },
          },
          keyTakeaways: {
            en: [
              'Primary PCI is the preferred reperfusion therapy with a target Door-to-Balloon time ≤ 90 minutes.',
              'Fibrinolytic therapy requires Door-to-Needle ≤ 30 minutes if PCI transfer delay exceeds 120 minutes.',
            ],
            id: [
              'PCI primer adalah terapi reperfusi pilihan utama dengan target Door-to-Balloon ≤ 90 menit.',
              'Terapi fibrinolitik menuntut Door-to-Needle ≤ 30 menit jika penundaan transfer PCI melampaui 120 menit.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'card-q1-1',
          question: {
            en: 'In an acute transmural inferior STEMI involving the RCA, which ECG leads display diagnostic ST-segment elevation?',
            id: 'Pada infark transmural inferior STEMI akut yang melibatkan RCA, sadapan EKG manakah yang memperlihatkan elevasi segmen ST diagnostik?',
          },
          options: {
            en: [
              'Leads V1 through V4',
              'Leads II, III, and aVF',
              'Leads I, aVL, V5, and V6',
              'Leads V3R and V4R exclusively',
            ],
            id: [
              'Sadapan V1 sampai V4',
              'Sadapan II, III, dan aVF',
              'Sadapan I, aVL, V5, dan V6',
              'Hanya sadapan V3R dan V4R semata',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'The inferior wall of the left ventricle is monitored by leads II, III, and aVF, which face the diaphragmatic myocardial surface and register ST elevation during RCA (or dominant LCx) occlusion.',
            id: 'Dinding inferior ventrikel kiri dipantau oleh sadapan II, III, dan aVF yang menghadap ke permukaan diafragmatika miokardium dan mencatat elevasi segmen ST saat terjadi oklusi RCA (atau LCx dominan).',
          },
        },
        {
          id: 'card-q1-2',
          question: {
            en: 'What is the benchmark Door-to-Balloon (D2B) time for primary PCI in a STEMI patient presenting directly to a PCI-capable center?',
            id: 'Berapakah target batas waktu Door-to-Balloon (D2B) untuk PCI primer pada pasien STEMI yang tiba langsung di fasilitas berkemampuan PCI?',
          },
          options: {
            en: ['≤ 30 minutes', '≤ 60 minutes', '≤ 90 minutes', '≤ 180 minutes'],
            id: ['≤ 30 menit', '≤ 60 menit', '≤ 90 menit', '≤ 180 menit'],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'ACC/AHA and ESC guidelines mandate a Door-to-Balloon time of ≤90 minutes for primary percutaneous coronary intervention in PCI-capable hospitals to maximize myocardial salvage.',
            id: 'Pedoman ACC/AHA dan ESC memandatkan batas waktu Door-to-Balloon ≤90 menit untuk intervensi koroner perkutan primer di rumah sakit dengan fasilitas PCI demi memaksimalkan penyelamatan jaringan miokardium.',
          },
        },
        {
          id: 'card-q1-3',
          question: {
            en: 'A patient with an inferior STEMI develops severe hypotension (BP 70/40 mmHg) immediately after sublingual nitroglycerin. What is the most likely underlying condition?',
            id: 'Pasien dengan STEMI inferior mendadak mengalami hipotensi berat (TD 70/40 mmHg) sesaat setelah pemberian nitrogliserin sublingual. Kondisi apakah yang paling mungkin mendasarinya?',
          },
          options: {
            en: [
              'Concomitant Right Ventricular (RV) Infarction',
              'Left ventricular anterior aneurysm rupture',
              'Severe aortic stenosis with bicuspid valve',
              'Acute bronchospastic anaphylactoid reaction',
            ],
            id: [
              'Infark Ventrikel Kanan (RV) penyerta',
              'Ruptur aneurisma anterior ventrikel kiri',
              'Stenosis aorta berat dengan katup bikuspid',
              'Reaksi anafilaktoid bronkospasme akut',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Right ventricular infarction occurs in ~30–50% of inferior STEMIs. The ischemic RV is extremely preload-dependent to generate forward stroke volume; venodilators like nitrates precipitously drop RV filling pressure and cardiac output.',
            id: 'Infark ventrikel kanan terjadi pada ~30–50% kasus STEMI inferior. Ventrikel kanan yang iskemik sangat bergantung pada preload untuk menghasilkan stroke volume; venodilator seperti nitrat secara drastis menurunkan tekanan pengisian RV dan curah jantung.',
          },
        },
        {
          id: 'card-q1-4',
          question: {
            en: 'Which pathological change defines a "vulnerable plaque" (thin-cap fibroatheroma) prone to acute rupture?',
            id: 'Perubahan patologis manakah yang mencirikan "plak rentan" (thin-cap fibroatheroma) yang sangat mudah pecah?',
          },
          options: {
            en: [
              'Thick collagen fibrous cap (>200 µm) with extensive dense calcification',
              'Fibrous cap thickness <65 µm, large necrotic lipid core, and macrophage infiltration',
              'Intact endothelial monolayer without inflammatory cytokine signaling',
              'Diffuse medial smooth muscle cell proliferation without lipid accumulation',
            ],
            id: [
              'Kapsul fibrosa kolagen tebal (>200 µm) dengan kalsifikasi padat merata',
              'Ketebalan kapsul fibrosa <65 µm, inti nekrotik lipid besar, dan infiltrasi makrofag',
              'Lapisan endotel utuh tanpa sinyal sitokin inflamasi',
              'Proliferasi difus sel otot polos tunika media tanpa akumulasi lipid',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Vulnerable plaques are thin-cap fibroatheromas characterized by a thin fibrous cap (<65 µm), a large necrotic lipid pool (>40% of plaque volume), and dense macrophage infiltration releasing matrix metalloproteinases.',
            id: 'Plak rentan adalah thin-cap fibroatheroma dengan karakteristik kapsul fibrosa tipis (<65 µm), inti lipid nekrotik luas (>40% volume plak), dan infiltrasi makrofag aktif pemecah kolagen via matriks metaloproteinase.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: NSTEMI, UNSTABLE ANGINA & ISCHEMIC CASCADES
    // -------------------------------------------------------------
    {
      id: 'cardiac-mod-2',
      topicId: 'cardiac-arrest',
      order: 2,
      title: {
        en: 'NSTEMI & Angina Pectoris: Ischemic Cascades & Risk Stratification',
        id: 'NSTEMI & Angina Pektoris: Kaskade Iskemia & Stratifikasi Risiko',
      },
      shortDescription: {
        en: 'Subendocardial ischemia, high-sensitivity Troponin kinetics, TIMI/GRACE risk scoring, Stable vs Unstable Angina, and Prinzmetal vasospasm.',
        id: 'Iskemia subendokardium, kinetika Troponin sensitivitas tinggi, skor TIMI/GRACE, Angina Stabil vs Tidak Stabil, dan vasospasme Prinzmetal.',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'cardiac-hemodynamics',
      sections: [
        {
          id: 'cardiac-2-sec-1',
          title: {
            en: '1. The Spectrum of Angina Pectoris: Stable, Unstable, and Prinzmetal Vasospasm',
            id: '1. Spektrum Angina Pektoris: Stabil, Tidak Stabil, dan Vasospasme Prinzmetal',
          },
          content: {
            en: 'Myocardial ischemia develops whenever myocardial oxygen demand (MVO2) outstrips coronary arterial oxygen supply. Myocardial oxygen consumption is determined by heart rate, systolic wall tension (Laplace\'s law: σ = P·r / 2h), and myocardial contractility.\n\nAngina pectoris presents in multiple distinct pathophysiological phenotypes:\n1. Stable Angina: Predictable retrosternal chest discomfort precipitated by physical exertion or emotional distress and relieved by rest or sublingual nitroglycerin within 5 minutes. Driven by a fixed atherosclerotic plaque obstructing ≥70% of lumen diameter. Graded using the Canadian Cardiovascular Society (CCS) Functional Classification:\n- Class I: Angina only with strenuous, rapid, or prolonged exertion.\n- Class II: Slight limitation of ordinary activity (e.g., walking >2 blocks or climbing >1 flight of stairs at normal pace).\n- Class III: Marked limitation of ordinary physical activity (e.g., walking 1–2 blocks or climbing 1 flight of stairs).\n- Class IV: Inability to perform any physical activity without angina, or angina at rest.\n\n2. Unstable Angina (UA): An acute coronary syndrome characterized by rest angina (>20 min), new-onset severe angina (CCS III within 2 months), or crescendo angina (distinctly more frequent, longer, or lower threshold), without detectable elevation in cardiac biomarkers.\n\n3. Vasospastic (Prinzmetal) Angina: Focal epicardial coronary artery vasospasm causing transient transmural ischemia with transient ST-segment elevation. Occurs characteristically at rest (midnight to early morning) in younger patients without flow-limiting atherosclerotic stenosis, driven by hyperreactivity of coronary vascular smooth muscle to vasoconstrictor stimuli (endothelin-1, autonomic sympathetic surges, serotonin). Calcium channel blockers (e.g., Diltiazem, Amlodipine) and nitrates are first-line.',
            id: 'Iskemia miokardium terjadi setiap kali kebutuhan oksigen miokardium (MVO2) melampaui pasokan oksigen dari arteri koroner. Konsumsi oksigen miokardium ditentukan oleh denyut jantung, tegangan dinding sistolik (hukum Laplace: σ = P·r / 2h), dan kontraktilitas miokardium.\n\nAngina pektoris bermanifestasi dalam beberapa fenotipe patofisiologis yang berbeda:\n1. Angina Stabil: Rasa tidak nyaman di retrosternal yang dapat diprediksi, dipicu oleh aktivitas fisik atau stres emosional dan mereda dengan istirahat atau nitrogliserin sublingual dalam 5 menit. Disebabkan oleh plak aterosklerosis stabil yang menyumbat ≥70% lumen. Diklasifikasikan menurut Canadian Cardiovascular Society (CCS):\n- Kelas I: Angina hanya timbul pada aktivitas fisik berat, cepat, atau lama.\n- Kelas II: Keterbatasan ringan pada aktivitas biasa (berjalan >2 blok atau menaiki >1 lantai tangga pada kecepatan normal).\n- Kelas III: Keterbatasan nyata pada aktivitas biasa (berjalan 1–2 blok atau menaiki 1 lantai tangga).\n- Kelas IV: Ketidakmampuan melakukan aktivitas fisik apa pun tanpa rasa tidak nyaman, atau angina timbul saat istirahat.\n\n2. Angina Tidak Stabil (Unstable Angina/UA): Suatu sindrom koroner akut dengan karakteristik angina saat istirahat (>20 menit), angina awitan baru yang berat (CCS III dalam 2 bulan), atau angina kresendo (frekuensi makin sering, durasi makin panjang, atau ambang pemicu makin rendah), tanpa peningkatan biomarker nekrosis miokardium.\n\n3. Angina Vasospastik (Prinzmetal): Spasme fokal arteri koroner epikardium yang menyebabkan iskemia transmural transien disertai elevasi segmen ST sementara. Khas timbul saat istirahat (tengah malam hingga dini hari) pada pasien usia muda tanpa stenosis aterosklerosis bermakna, dipicu oleh hiperreaktivitas otot polos pembuluh darah terhadap stimulan vasokonstriktor (endotelin-1, lonjakan simpatis, serotonin). Penyekat saluran kalsium (CCB) dan nitrat merupakan terapi lini pertama.',
          },
          formula: '\\text{RPP} = \\text{HR} \\times \\text{SBP}',
          formulaExplanation: {
            en: 'The Rate-Pressure Product (RPP, or Double Product) is an easily measured clinical hemodynamic surrogate for myocardial oxygen consumption (MVO2). During clinical stress testing, the ischemic threshold is reached when myocardial oxygen requirements exceed fixed stenotic coronary flow.',
            id: 'Rate-Pressure Product (RPP, atau Double Product) merupakan pengganti klinis hemodinamika non-invasif untuk konsumsi oksigen miokardium (MVO2). Pada uji latih beban jantung, ambang iskemik tercapai saat kebutuhan oksigen melebihi kapasitas cadangan aliran koroner stenotik.',
          },
          variables: [
            {
              symbol: 'HR',
              name: { en: 'Heart Rate', id: 'Denyut Jantung' },
              unit: 'beats per minute (bpm)',
              description: {
                en: 'Frequency of ventricular contractions per minute.',
                id: 'Frekuensi kontraksi ventrikel per menit.',
              },
            },
            {
              symbol: 'SBP',
              name: { en: 'Systolic Blood Pressure', id: 'Tekanan Darah Sistolik' },
              unit: 'mmHg',
              description: {
                en: 'Peak pressure generated in the ascending aorta during ventricular ejection.',
                id: 'Tekanan puncak pada aorta asenden selama ejeksi ventrikel.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Stable angina reflects demand-led ischemia through fixed plaques; unstable angina reflects supply-led fissure of plaques.',
              'Prinzmetal angina produces transient ST-elevation due to hyperreactive coronary vasospasm without fixed plaque rupture.',
            ],
            id: [
              'Angina stabil mencerminkan iskemia akibat peningkatan beban (demand); angina tidak stabil mencerminkan penurunan suplai akibat fisura plak.',
              'Angina Prinzmetal menimbulkan elevasi ST sementara akibat spasme otot polos koroner tanpa adanya ruptur plak menetap.',
            ],
          },
        },
        {
          id: 'cardiac-2-sec-2',
          title: {
            en: '2. NSTEMI Pathophysiology & High-Sensitivity Troponin Kinetics',
            id: '2. Patofisiologi NSTEMI & Kinetika Troponin Sensitivitas Tinggi',
          },
          content: {
            en: 'Non-ST-Elevation Myocardial Infarction (NSTEMI) occurs when a non-occlusive mural thrombus or severe microembolization produces subendocardial ischemia sufficient to cause myocyte necrosis. Because the subendocardium is subjected to the highest compressive intraventricular wall tension and has the most tenuous coronary capillary reserve, it is uniquely susceptible to ischemic injury.\n\nUnlike STEMI, epicardial flow is partially preserved, preventing the transmural epicardial injury current. Consequently, the 12-lead ECG shows:\n- ST-segment depression (horizontal or downsloping ≥0.5 mm in ≥2 contiguous leads)\n- T-wave inversion (deep symmetrical inversion ≥1 mm in leads with prominent R waves)\n- Or non-specific ST-T changes in up to 30% of patients.\n\nDiagnosis is confirmed by the detection of cardiac biomarkers: High-Sensitivity Cardiac Troponin I (hs-cTnI) or Troponin T (hs-cTnT). The modern European Society of Cardiology (ESC) 0h/1h or 0h/2h diagnostic algorithms rely on rapid delta kinetics:\n1. Rule-Out Criteria: Baseline hs-cTn very low, with no significant 1-hour rise (1-hour Δ < cut-off), permitting safe early discharge when combined with low clinical risk scores.\n2. Rule-In Criteria: Baseline hs-cTn significantly elevated or exhibiting a marked 1-hour rise (1-hour Δ ≥ cut-off), mandating urgent admission and invasive evaluation.\n3. Observe Zone: Equivocal kinetics requiring a 3-hour biomarker draw and echocardiography.',
            id: 'Infark Miokard Tanpa Elevasi Segmen ST (NSTEMI) terjadi ketika trombus mural non-oklusif atau mikroembolisasi distal menimbulkan iskemia subendokardium yang cukup berat untuk memicu nekrosis miosit. Karena lapisan subendokardium mengalami tegangan kompresi intraventrikel tertinggi dan memiliki cadangan kapiler paling rentan, lapisan ini sangat peka terhadap cedera iskemik.\n\nBerbeda dengan STEMI, aliran arteri epikardium tetap berlangsung sebagian, mencegah timbulnya arus cedera epikardium transmural. Akibatnya, EKG 12-sadapan memperlihatkan:\n- Depresi segmen ST (horizontal atau landai ke bawah ≥0.5 mm pada ≥2 sadapan anatomis berdampingan)\n- Inversi gelombang T (inversi simetris dalam ≥1 mm pada sadapan dengan gelombang R dominan)\n- Atau perubahan non-spesifik ST-T pada hingga 30% pasien.\n\nDiagnosis ditegakkan melalui deteksi biomarker spesifik jantung: High-Sensitivity Cardiac Troponin I (hs-cTnI) atau Troponin T (hs-cTnT). Algoritma diagnosis 0h/1h atau 0h/2h dari European Society of Cardiology (ESC) mengandalkan perubahan kinetika (delta):\n1. Kriteria Rule-Out: Nilai dasar hs-cTn sangat rendah tanpa kenaikan bermakna pada jam ke-1 (Δ 1-jam < cut-off), memungkinkan pemulangan aman jika dipadukan dengan skor risiko klinis rendah.\n2. Kriteria Rule-In: Nilai dasar hs-cTn meningkat tinggi atau memperlihatkan lonjakan cepat pada jam ke-1 (Δ 1-jam ≥ cut-off), mengindikasikan rawat inap segera dan evaluasi invasif.\n3. Zona Observasi: Kinetika meragukan yang memerlukan pemeriksaan lanjutan pada jam ke-3 dan ekokardiografi.',
          },
          comparisonTable: {
            headers: {
              en: ['Clinical Entity', 'Coronary Thrombosis', '12-Lead ECG Findings', 'Cardiac Troponin Level'],
              id: ['Entitas Klinis', 'Trombosis Koroner', 'Temuan EKG 12-Sadapan', 'Kadar Troponin Jantung'],
            },
            rows: [
              {
                en: ['Stable Angina', 'Fixed atherosclerotic plaque (no active thrombosis)', 'Normal at rest; ST depression with exercise', 'Normal (undetectable necrosis)'],
                id: ['Angina Stabil', 'Plak aterosklerosis stabil (tanpa trombosis aktif)', 'Normal saat istirahat; depresi ST saat latihan', 'Normal (tidak ada nekrosis terdeteksi)'],
              },
              {
                en: ['Unstable Angina', 'Non-occlusive mural thrombus or plaque fissure', 'Transient ST depression or T-wave inversion', 'Normal (below 99th percentile URL)'],
                id: ['Angina Tidak Stabil', 'Trombus mural non-oklusif atau fisura plak', 'Depresi ST transien atau inversi gelombang T', 'Normal (di bawah persentil ke-99 URL)'],
              },
              {
                en: ['NSTEMI', 'Non-occlusive thrombus with distal microembolization', 'Persistent ST depression, T inversion, or flat T', 'Elevated (rising/falling pattern >99th percentile)'],
                id: ['NSTEMI', 'Trombus non-oklusif dengan mikroembolisasi distal', 'Depresi ST persisten, inversi gelombang T', 'Meningkat (pola naik/turun >persentil ke-99)'],
              },
              {
                en: ['STEMI', 'Complete 100% occlusive red/white thrombus', 'Persistent ST elevation, hyperacute T, new LBBB', 'Massively elevated with rapid steep curve'],
                id: ['STEMI', 'Trombus oklusif total 100% (trombus merah/putih)', 'Elevasi ST persisten, T hiperakut, LBBB baru', 'Meningkat sangat tinggi dengan kurva curam'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'NSTEMI causes subendocardial necrosis, presenting with ST depression or T inversion and troponin elevation.',
              'Unstable Angina and NSTEMI share identical clinical presentations but differ solely by the presence of troponin release.',
            ],
            id: [
              'NSTEMI menyebabkan nekrosis subendokardium, dengan temuan depresi ST atau inversi T serta kenaikan troponin.',
              'Angina Tidak Stabil dan NSTEMI memiliki tampilan klinis serupa tetapi dibedakan secara tegas oleh pelepasan troponin.',
            ],
          },
        },
        {
          id: 'cardiac-2-sec-3',
          title: {
            en: '3. Clinical Risk Scoring (GRACE & TIMI) and Guideline Pharmacotherapy',
            id: '3. Skor Risiko Klinis (GRACE & TIMI) dan Farmakoterapi Pedoman',
          },
          content: {
            en: 'Risk stratification in NSTEMI/UA dictates the timing of coronary angiography (invasive strategy) and the intensity of antithrombotic therapy:\n\n1. Risk Scoring Systems:\n- TIMI Risk Score (0 to 7 points): Age ≥65, ≥3 CAD risk factors, known CAD (stenosis ≥50%), aspirin use in past 7 days, severe angina (≥2 episodes in 24h), ST deviation ≥0.5 mm, and elevated cardiac biomarkers.\n- GRACE Score: Incorporates age, heart rate, systolic BP, serum creatinine, Killip class of heart failure, cardiac arrest at admission, ST deviation, and elevated enzymes to predict in-hospital and 6-month mortality.\n\n2. Timing of Invasive Strategy:\n- Immediate Invasive (<2 hours): Refractory angina, hemodynamic instability, cardiogenic shock, recurrent life-threatening arrhythmias, or acute heart failure.\n- Early Invasive (<24 hours): GRACE score >140, dynamic ST/T changes, or verified troponin elevation.\n- Selective Invasive: Low-risk patients (GRACE <109, TIMI 0–1) undergoing non-invasive ischemia testing.\n\n3. Comprehensive Medical Management:\n- Dual Antiplatelet Therapy (DAPT): Aspirin (162–325 mg loading, then 81 mg daily) plus a potent P2Y12 inhibitor (Ticagrelor 180 mg loading, 90 mg BID; or Prasugrel 60 mg loading for PCI; Clopidogrel 300–600 mg if others contraindicated).\n- Parenteral Anticoagulation: Enoxaparin (1 mg/kg SC q12h), Unfractionated Heparin (weight-adjusted IV bolus and infusion, targeting aPTT 50–70s), or Fondaparinux (2.5 mg SC daily).\n- Anti-Ischemic Therapy: Beta-blockers (reduce MVO2 via negative inotropy/chronotropy), sublingual/IV nitroglycerin (coronary vasodilation and preload reduction), and high-intensity statins (Atorvastatin 80 mg for plaque stabilization and pleiotropic anti-inflammatory actions).',
            id: 'Stratifikasi risiko pada NSTEMI/UA menentukan waktu pelaksanaan angiografi koroner (strategi invasif) dan intensitas terapi antitrombotik:\n\n1. Sistem Skor Risiko:\n- Skor Risiko TIMI (0 hingga 7 poin): Usia ≥65 tahun, ≥3 faktor risiko PJK, riwayat PJK (stenosis ≥50%), penggunaan aspirin dalam 7 hari terakhir, episode angina berat (≥2 kali dalam 24 jam), deviasi ST ≥0.5 mm, dan biomarker jantung positif.\n- Skor GRACE: Menggabungkan usia, laju nadi, tekanan darah sistolik, kreatinin serum, kelas Killip gagal jantung, henti jantung saat admisi, deviasi ST, dan enzim jantung untuk memprediksi mortalitas rumah sakit dan 6 bulan.\n\n2. Waktu Strategi Invasif:\n- Invasif Segera (<2 jam): Angina refrakter, instabilitas hemodinamik, syok kardiogenik, aritmia letal berulang, atau gagal jantung akut.\n- Invasif Dini (<24 jam): Skor GRACE >140, perubahan dinamis ST/T, atau peningkatan troponin terverifikasi.\n- Invasif Selektif: Pasien risiko rendah (GRACE <109, TIMI 0–1) yang dievaluasi dengan uji iskemia non-invasif.\n\n3. Tata Laksana Medis Komprehensif:\n- Terapi Antiplatelet Ganda (DAPT): Aspirin (loading 162–325 mg, lanjut 81 mg/hari) ditambah inhibitor P2Y12 kuat (Tikagrelor loading 180 mg, 90 mg 2x/hari; atau Prasugrel loading 60 mg saat PCI; Klopidogrel 300–600 mg jika ada kontraindikasi).\n- Antikoagulasi Parenteral: Enoksaparin (1 mg/kgBB SK tiap 12 jam), Heparin Fraksi Standar (bolus dan infus IV berdasar berat badan, target aPTT 50–70 detik), atau Fondaparinuks (2.5 mg SK tiap 24 jam).\n- Terapi Anti-Iskemik: Penyekat beta (menurunkan MVO2 lewat efek inotropik/kronotropik negatif), nitrogliserin sublingual/IV (vasodilatasi koroner dan penurunan preload), serta statin intensitas tinggi (Atorvastatin 80 mg untuk stabilisasi plak dan efek antiinflamasi pleiotropik).',
          },
          keyTakeaways: {
            en: [
              'High-risk NSTEMI (GRACE >140) mandates early invasive coronary angiography within 24 hours.',
              'DAPT (Aspirin + potent P2Y12 inhibitor) paired with parenteral anticoagulation forms the cornerstone of acute management.',
            ],
            id: [
              'Pasien NSTEMI risiko tinggi (skor GRACE >140) memerlukan angiografi koroner invasif dini dalam 24 jam.',
              'Kombinasi DAPT (Aspirin + inhibitor P2Y12 kuat) dan antikoagulan parenteral adalah pilar utama terapi fase akut.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'card-q2-1',
          question: {
            en: 'What fundamental clinical feature differentiates Unstable Angina from NSTEMI?',
            id: 'Ciri klinis mendasar manakah yang membedakan Angina Pektoris Tidak Stabil dari NSTEMI?',
          },
          options: {
            en: [
              'The presence of persistent ST-segment elevation on a 12-lead ECG',
              'The detection of elevated cardiac biomarkers (Troponin I/T) indicating myocyte necrosis in NSTEMI',
              'The severity of chest pain radiating to the left arm',
              'The patient age and presence of diabetic autonomic neuropathy',
            ],
            id: [
              'Adanya elevasi segmen ST yang persisten pada EKG 12-sadapan',
              'Terdeteksinya peningkatan biomarker jantung (Troponin I/T) yang membuktikan nekrosis miosit pada NSTEMI',
              'Tingkat keparahan nyeri dada yang menjalar ke lengan kiri',
              'Usia pasien dan adanya neuropati otonom diabetik',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Both Unstable Angina and NSTEMI present with acute ischemic discomfort and potential ST-depression/T-inversion, but only NSTEMI causes myocyte necrosis resulting in detectable elevation of cardiac troponin.',
            id: 'Baik Angina Tidak Stabil maupun NSTEMI bermanifestasi dengan rasa tidak nyaman iskemik akut serta kemungkinan depresi ST/inversi T, namun hanya NSTEMI yang menimbulkan nekrosis miosit sehingga troponin jantung terdeteksi meningkat.',
          },
        },
        {
          id: 'card-q2-2',
          question: {
            en: 'Which class of medication is considered first-line for relieving coronary vasospasm in Prinzmetal (Vasospastic) Angina, whereas beta-blockers may exacerbate spasm?',
            id: 'Golongan obat manakah yang merupakan terapi lini pertama untuk mengatasi spasme arteri koroner pada Angina Prinzmetal, sementara penyekat beta dapat memperparah spasme?',
          },
          options: {
            en: [
              'Calcium Channel Blockers (CCBs) like Diltiazem or Amlodipine',
              'High-dose non-selective beta-blockers (Propranolol)',
              'Direct thrombin inhibitors (Dabigatran)',
              'Potassium-sparing diuretics (Spironolactone)',
            ],
            id: [
              'Penyekat Saluran Kalsium (CCB) seperti Diltiazem atau Amlodipin',
              'Penyekat beta non-selektif dosis tinggi (Propranolol)',
              'Inhibitor trombin langsung (Dabigatran)',
              'Diuretik hemat kalium (Spironolakton)',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Calcium channel blockers promote vascular smooth muscle relaxation and prevent recurrent vasospastic episodes in Prinzmetal angina. Non-selective beta-blockers may leave alpha-1 vasoconstriction unopposed, worsening spasm.',
            id: 'Penyekat saluran kalsium merelaksasi otot polos pembuluh darah koroner dan mencegah vasospasme berulang pada Angina Prinzmetal. Penyekat beta non-selektif sebaliknya dapat membiarkan vasokonstriksi reseptor alfa-1 tanpa hambatan sehingga memperburuk spasme.',
          },
        },
        {
          id: 'card-q2-3',
          question: {
            en: 'According to ESC and ACC/AHA guidelines, an NSTEMI patient with refractory angina, cardiogenic shock, or sustained ventricular arrhythmias requires which timing for invasive coronary angiography?',
            id: 'Menurut pedoman ESC dan ACC/AHA, pasien NSTEMI dengan angina refrakter, syok kardiogenik, atau aritmia ventrikel menetap memerlukan strategi invasif dengan rentang waktu berapa?',
          },
          options: {
            en: [
              'Immediate invasive strategy (<2 hours)',
              'Early invasive strategy within 24 hours',
              'Delayed invasive strategy within 72 hours',
              'Non-invasive outpatient stress echocardiography only',
            ],
            id: [
              'Strategi invasif segera (<2 jam)',
              'Strategi invasif dini dalam 24 jam',
              'Strategi invasif tertunda dalam 72 jam',
              'Evaluasi non-invasif rawat jalan dengan ekokardiografi beban',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Very high-risk criteria in NSTEMI (refractory chest pain, hemodynamically unstable, acute cardiogenic shock, or malignant ventricular arrhythmias) mandate emergent coronary angiography within 2 hours.',
            id: 'Kriteria risiko sangat tinggi pada NSTEMI (angina refrakter, hemodinamik tidak stabil, syok kardiogenik, atau aritmia ventrikel letal) menuntut angiografi koroner darurat dalam waktu <2 jam.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 3: CARDIAC ARREST RHYTHMS & DEFIBRILLATION BIOPHYSICS
    // -------------------------------------------------------------
    {
      id: 'cardiac-mod-3',
      topicId: 'cardiac-arrest',
      order: 3,
      title: {
        en: 'Cardiac Arrest: Shockable vs Non-Shockable Rhythms & Defibrillation Physics',
        id: 'Henti Jantung: Irama Shockable vs Non-Shockable & Fisika Defibrilasi',
      },
      shortDescription: {
        en: 'Ventricular Fibrillation (VF), pulseless VT, PEA, Asystole, biphasic defibrillation impedance, and current density thermodynamics.',
        id: 'Fibrilasi Ventrikel (VF), VT tanpa nadi, PEA, Asistol, impedansi defibrilasi bifasik, dan termodinamika densitas arus.',
      },
      durationMinutes: 30,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'cardiac-hemodynamics',
      sections: [
        {
          id: 'cardiac-3-sec-1',
          title: {
            en: '1. The Electrophysiology of Sudden Cardiac Arrest: 4 Core Arrest Rhythms',
            id: '1. Elektrofisiologi Henti Jantung Mendadak: 4 Irama Henti Jantung Utama',
          },
          content: {
            en: 'Sudden Cardiac Arrest (SCA) is the abrupt cessation of mechanical cardiac pump function, causing instantaneous collapse of arterial blood pressure, loss of cerebral perfusion within 5–10 seconds, and respiratory arrest.\n\nElectrocardiographically, cardiac arrest is categorized into Shockable and Non-Shockable rhythms:\n\n1. SHOCKABLE RHYTHMS (Fibrillatory/Tachycardic): Characterized by organized or disorganized rapid electrical activity amenable to electrical termination:\n- Ventricular Fibrillation (VF): Completely disorganized, chaotic electrical activity characterized by continuous variation in waveform amplitude, shape, and timing (coarse VF >0.2 mV vs fine VF <0.2 mV). Multiple roving micro-reentrant wavelets extinguish coordinated ventricular mechanical systole; cardiac output is zero.\n- Pulseless Ventricular Tachycardia (pVT): Rapid, regular, wide-complex ventricular rhythm (rate >100–300 bpm, typically monomorphic or polymorphic/Torsades de Pointes) that fails to generate adequate ventricular diastolic filling time, resulting in impalpable pulses.\n\n2. NON-SHOCKABLE RHYTHMS (Akinetic/Electromechanical Dissociation): Electrical defibrillation is ineffective and strictly contraindicated:\n- Pulseless Electrical Activity (PEA): Organized or semi-organized electrical activity (sinus bradycardia, idioventricular rhythm, bundle branch blocks) on the monitor in the complete absence of a detectable mechanical pulse. Caused by profound mechanical obstruction, extreme preload depletion, or severe metabolic/electrolyte poisoning.\n- Asystole ("Flatline"): Complete absence of ventricular electrical and mechanical activity (<0.1 mV amplitude). Confirm lead connections, gain setting, and verify in at least two orthogonal leads to avoid mistaking fine VF for asystole.',
            id: 'Henti Jantung Mendadak (Sudden Cardiac Arrest/SCA) adalah penghentian tiba-tiba fungsi mekanik pompa jantung, yang memicu kolaps tekanan darah arteri seketika, hilangnya perfusi serebral dalam 5–10 detik, dan henti napas.\n\nSecara elektrokardiografi, henti jantung diklasifikasikan menjadi irama Shockable (dapat didefibrilasi) dan Non-Shockable (tidak dapat didefibrilasi):\n\n1. IRAMA SHOCKABLE:\n- Fibrilasi Ventrikel (Ventricular Fibrillation/VF): Aktivitas listrik yang sama sekali tidak terorganisir dan kacau, dengan variasi terus-menerus dalam amplitudo, bentuk, dan interval gelombang (VF kasar >0.2 mV vs VF halus <0.2 mV). Gelombang mikro-reentrant multipel meniadakan sistol mekanik ventrikel yang terkoordinasi; curah jantung seketika menjadi nol.\n- Ventrikular Takikardia Tanpa Nadi (Pulseless VT/pVT): Irama ventrikel kompleks lebar reguler yang sangat cepat (laju >100–300 kali/menit, baik monomorfik maupun polimorfik/Torsades de Pointes) yang meniadakan waktu pengisian diastolik, sehingga nadi tidak teraba sama sekali.\n\n2. IRAMA NON-SHOCKABLE: Defibrilasi listrik tidak bermanfaat dan dikontraindikasikan:\n- Pulseless Electrical Activity (PEA): Tampak aktivitas listrik terorganisir pada monitor (seperti sinus bradikardia, irama idioventrikular, atau blok berkas cabang), namun tanpa adanya denyut nadi mekanik yang dapat diraba. Dipicu oleh obstruksi mekanik berat, deplesi preload ekstrem, atau gangguan metabolik toksik berat.\n- Asistol ("Garis Lurus"): Ketiadaan total seluruh aktivitas listrik dan mekanik ventrikel (amplitudo <0.1 mV). Selalu periksa sambungan kabel sadapan, tombol gain/amplitudo, dan konfirmasi pada sekurang-kurangnya dua sadapan ortogonal untuk memastikan bukan VF halus.',
          },
          comparisonTable: {
            headers: {
              en: ['Arrest Rhythm Category', 'Specific Rhythm', 'Primary Pathophysiology', 'Primary Definitive Therapy'],
              id: ['Kategori Irama Henti Jantung', 'Irama Spesifik', 'Patofisiologi Utama', 'Terapi Definitif Utama'],
            },
            rows: [
              {
                en: ['Shockable', 'Ventricular Fibrillation (VF)', 'Chaotic multi-wavelet reentrant ventricular activation', 'Immediate Electrical Defibrillation (Biphasic 120–200J)'],
                id: ['Shockable', 'Fibrilasi Ventrikel (VF)', 'Aktivasi ventrikel reentrant multi-wavelet kacau balau', 'Defibrilasi Listrik Segera (Bifasik 120–200J)'],
              },
              {
                en: ['Shockable', 'Pulseless VT (pVT)', 'Rapid monomorphic/polymorphic ventricular macro-reentry', 'Immediate Electrical Defibrillation (Unsynchronized shock)'],
                id: ['Shockable', 'VT Tanpa Nadi (pVT)', 'Makro-reentry ventrikel monomorfik/polimorfik cepat', 'Defibrilasi Listrik Segera (Kejut asinkron)'],
              },
              {
                en: ['Non-Shockable', 'Pulseless Electrical Activity (PEA)', 'Organized rhythm without cardiac stroke volume (5H/5T)', 'High-quality CPR + Epinephrine 1mg + Reverse 5H/5T'],
                id: ['Non-Shockable', 'Pulseless Electrical Activity (PEA)', 'Irama teratur tanpa curah sekuncup mekanik (5H/5T)', 'RJP berkualitas + Epinefrin 1mg + Koreksi 5H/5T'],
              },
              {
                en: ['Non-Shockable', 'Asystole', 'Complete cessation of cardiac electrical depolarization', 'High-quality CPR + Epinephrine 1mg + Reverse 5H/5T'],
                id: ['Non-Shockable', 'Asistol', 'Penghentian total depolarisasi listrik miokardium', 'RJP berkualitas + Epinefrin 1mg + Koreksi 5H/5T'],
              },
            ],
          },
          keyTakeaways: {
            en: [
              'Shockable rhythms (VF, pulseless VT) require immediate defibrillation within seconds of identification.',
              'Non-shockable rhythms (PEA, Asystole) require uninterrupted CPR, epinephrine, and rapid identification of the 5 H\'s and 5 T\'s.',
            ],
            id: [
              'Irama shockable (VF, pulseless VT) menuntut defibrilasi listrik seketika tanpa penundaan.',
              'Irama non-shockable (PEA, asistol) memerlukan RJP tanpa henti, epinefrin, dan pelacakan cepat penyebab 5H dan 5T.',
            ],
          },
        },
        {
          id: 'cardiac-3-sec-2',
          title: {
            en: '2. Physics of Electrical Defibrillation: Waveforms, Current Density & Transthoracic Impedance',
            id: '2. Fisika Defibrilasi Listrik: Bentuk Gelombang, Densitas Arus & Impedansi Transtoraks',
          },
          content: {
            en: 'Electrical defibrillation works by passing a critical threshold electrical current through the fibrillating myocardium. According to the "critical mass hypothesis" (Zipes et al.), depolarizing approximately 75% to 90% of ventricular myocardial mass simultaneously renders the cells refractory, extinguishing chaotic re-entrant wavelets and enabling the physiological pacemaker (SA node) to resume organized sinus pacing.\n\nKey Physical Principles:\n1. Delivered Energy vs Delivered Current: Defibrillator dials select energy (Joules: E = 1/2 · C · V^2), but it is transmyocardial peak current (Amperes) that drives successful defibrillation.\n2. Transthoracic Impedance (TTI): Human chest electrical resistance ranges from 25 to 150 Ω (average ~70–80 Ω). High impedance blunts delivered current according to Ohm\'s law (I = V / R). TTI is minimized by: applying conductive gel pads, delivering shocks at end-expiration, using firm paddle pressure (~8–10 kg), and selecting anterolateral pad placement (right infraclavicular sternal pad + left mid-axillary apical pad).\n3. Biphasic vs Monophasic Waveforms:\n- Monophasic (Obsolete): Current flows in a single direction. Requires high energy (360 Joules) and causes significant post-shock myocardial thermal and electrical injury.\n- Biphasic Truncated Exponential (BTE) / Rectilinear Biphasic: Current flows from Electrode A to B, then reverses direction midway through the discharge. Reversal of polarity sweeps residual membrane charge, achieving equal or superior defibrillation efficacy at significantly lower energy levels (120–200 Joules) with markedly reduced myocardial stunning.',
            id: 'Defibrilasi listrik bekerja dengan melewatkan arus listrik yang melampaui ambang kritis melalui miokardium yang berfibrilasi. Berdasarkan "hipotesis massa kritis" (Zipes et al.), mendepolarisasikan sekitar 75% hingga 90% massa miokardium ventrikel secara serempak akan membuat sel-sel tersebut masuk ke periode refrakter absolut, memadamkan sirkuit re-entry kacau dan memberi peluang bagi pemacu alami (nodus SA) untuk mengambil alih irama sinus yang teratur.\n\nPrinsip Fisika Utama:\n1. Energi vs Arus yang Dihantarkan: Tombol defibrilator memilih energi (Joule: E = 1/2 · C · V^2), namun densitas arus puncak transmiokardial (Ampere) yang sebenarnya menentukan keberhasilan terminasi aritmia.\n2. Impedansi Transtoraks (TTI): Resistansi listrik dinding dada manusia berkisar antara 25 hingga 150 Ω (rata-rata ~70–80 Ω). Impedansi tinggi memperkecil arus yang terhantar berdasarkan Hukum Ohm (I = V / R). TTI diminimalkan dengan: penggunaan gel/pad konduktif berkualitas, pelepasan kejut pada akhir ekspirasi, penekanan pedal yang mantap (~8–10 kg), dan penempatan bantalan anterolateral yang tepat.\n3. Gelombang Bifasik vs Monofasik:\n- Monofasik (Usang): Arus mengalir satu arah saja. Membutuhkan energi tinggi (360 Joule) dan memicu cedera termal miokardium pasca-kejut yang signifikan.\n- Bifasik (Biphasic Truncated Exponential): Arus mengalir dari Elektroda A ke B, lalu membalik arah di pertengahan pelepasan pulsa. Pembalikan polaritas ini menyapu muatan membran residual, menghasilkan keberhasilan defibrilasi yang setara atau lebih unggul pada dosis energi jauh lebih rendah (120–200 Joule) dengan meminimalkan stunning miokardium.',
          },
          formula: 'I(t) = \\frac{V_0}{R_\\text{TTI}} \\, e^{-t / (R_\\text{TTI} C)}',
          formulaExplanation: {
            en: 'Exponential RC discharge equation modeling peak trans-thoracic current delivered during defibrillation. Peak current is inversely proportional to transthoracic impedance (R_TTI) and directly proportional to capacitor charge voltage (V_0).',
            id: 'Persamaan pelepasan RC eksponensial yang memodelkan arus puncak transtoraks yang dihantarkan saat defibrilasi. Arus puncak berbanding terbalik dengan impedansi dinding dada (R_TTI) dan berbanding lurus dengan tegangan kapasitor (V_0).',
          },
          variables: [
            {
              symbol: 'I(t)',
              name: { en: 'Delivered Current', id: 'Arus Terhantar' },
              unit: 'Amperes (A)',
              description: {
                en: 'Current passing across the chest and myocardium over time.',
                id: 'Arus listrik yang melintasi dinding dada dan miokardium terhadap waktu.',
              },
            },
            {
              symbol: 'V_0',
              name: { en: 'Initial Capacitor Voltage', id: 'Tegangan Awal Kapasitor' },
              unit: 'Volts (V, typically 1,000–2,500 V)',
              description: {
                en: 'High voltage stored on the defibrillator internal capacitor bank.',
                id: 'Tegangan tinggi yang tersimpan dalam bank kapasitor internal defibrilator.',
              },
            },
            {
              symbol: 'R_\\text{TTI}',
              name: { en: 'Transthoracic Impedance', id: 'Impedansi Transtoraks' },
              unit: 'Ohms (Ω, typically 50–100 Ω)',
              description: {
                en: 'Total electrical resistance opposing current flow across chest tissues.',
                id: 'Resistansi listrik total jaringan dinding dada terhadap aliran arus.',
              },
            },
            {
              symbol: 'C',
              name: { en: 'Capacitance', id: 'Kapasitansi' },
              unit: 'Farads (µF)',
              description: {
                en: 'Defibrillator discharge capacitance.',
                id: 'Kapasitansi rangkaian pelepasan defibrilator.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Defibrillation depolarizes a critical mass of myocardium simultaneously, resetting the cardiac conduction system.',
              'Biphasic waveforms achieve higher termination rates at lower energy (120–200J) compared to monophasic 360J shocks.',
            ],
            id: [
              'Defibrilasi mendepolarisasi massa kritis miokardium secara serentak untuk mereset sistem konduksi jantung.',
              'Gelombang bifasik memberikan keberhasilan terminasi lebih tinggi pada dosis energi lebih rendah (120–200J) dibandingkan monofasik 360J.',
            ],
          },
        },
        {
          id: 'cardiac-3-sec-3',
          title: {
            en: '3. Reversible Etiologies: The Universal 5 H\'s and 5 T\'s',
            id: '3. Etiologi Reversibel: 5H dan 5T Universal',
          },
          content: {
            en: 'In non-shockable arrest (PEA and Asystole), survival hinges upon rapidly identifying and reversing underlying precipitating conditions, codified internationally as the 5 H\'s and 5 T\'s:\n\nTHE 5 H\'s:\n1. Hypovolemia: Severe hemorrhage, profound dehydration. Treat with rapid crystalloid or blood product resuscitation.\n2. Hypoxia: Airway obstruction, severe ARDS, tension hypoxemia. Treat with high-flow oxygenation, bag-valve mask, and definitive endotracheal intubation.\n3. Hydrogen Ion (Acidosis): Severe metabolic/lactic acidosis. Ensure effective ventilation to blow off CO2; administer sodium bicarbonate in severe metabolic acidosis or hyperkalemia.\n4. Hypokalemia / Hyperkalemia: Hyperkalemia (>6.5 mEq/L, e.g., renal failure) produces sine wave ECG and PEA arrest. Treat immediately with IV Calcium Gluconate (membrane stabilization), Insulin + Dextrose, and Albuterol.\n5. Hypothermia: Core body temperature <30°C. Resuscitation efforts must continue with active internal rewarming ("Not dead until warm and dead").\n\nTHE 5 T\'s:\n1. Tension Pneumothorax: Tracheal deviation, unilateral absent breath sounds, jugular venous distention. Immediate needle thoracostomy (2nd intercostal space mid-clavicular or 4th/5th intercostal anterior axillary line) followed by tube thoracostomy.\n2. Tamponade (Cardiac): Pericardial fluid under pressure causing diastolic collapse of right ventricle. Emergent bedside ultrasound and subxiphoid pericardiocentesis.\n3. Toxins: Overdoses (Opioids → Naloxone; Beta-blockers → Glucagon; Calcium channel blockers → Calcium/High-dose insulin; TCAs → Sodium Bicarbonate).\n4. Thrombosis (Pulmonary Embolism): Massive saddle PE causing acute cor pulmonale. Administer systemic thrombolysis (Alteplase 50–100 mg bolus) during CPR.\n5. Thrombosis (Coronary): Massive STEMI. Provide mechanical CPR and transfer for emergent extracorporeal membrane oxygenation (E-CPR) and percutaneous revascularization.',
            id: 'Pada henti jantung non-shockable (PEA dan Asistol), kelangsungan hidup pasien bergantung sepenuhnya pada kecepatan mengidentifikasi dan mengoreksi penyebab mendasar, yang dirumuskan secara internasional sebagai 5H dan 5T:\n\n5H (THE 5 H\'s):\n1. Hipovolemia: Perdarahan masif, dehidrasi berat. Terapi dengan resusitasi cairan kristaloid cepat atau produk darah.\n2. Hipoksia: Obstruksi saluran napas, ARDS berat. Tangani dengan oksigenasi aliran tinggi, ventilasi bag-valve-mask, dan intubasi endotrakeal definitif.\n3. Hidrogen Ion (Asidosis): Asidosis laktat/metabolik berat. Pastikan ventilasi adekuat untuk membuang CO2; berikan natrium bikarbonat pada asidosis metabolik berat terbukti.\n4. Hipo/Hiperkalemia: Hiperkalemia berat (>6.5 mEq/L) menimbulkan gelombang sinus lebar hingga henti jantung PEA. Berikan Kalsium Glukonat IV seketika (stabilisasi membran), Insulin + Dekstrosa, serta nebulisasi albuterol.\n5. Hipotermia: Suhu inti tubuh <30°C. Lakukan penghangatan aktif internal; resusitasi dilanjutkan hingga suhu tubuh mendekati normal.\n\n5T (THE 5 T\'s):\n1. Tension Pneumothorax: Suara napas unilateral hilang, deviasi trakea, distensi vena jugularis. Dekompresi jarum darurat (ICS 2 linea mid-klavikula atau ICS 4/5 linea aksilaris anterior) dilanjutkan pemasangan selang dada (chest tube).\n2. Tamponade Jantung: Akumulasi cairan perikardium menekan ventrikel kanan. USG jantung darurat (bedside POCUS) dan perikardiosentesis subxifoid segera.\n3. Toksin: Overdosis obat (Opioid → Nalokson; Penyekat beta → Glukagon; Penyekat saluran kalsium → Kalsium/Insulin dosis tinggi; Antidepresan trisiklik → Natrium Bikarbonat).\n4. Trombosis Pulmonal (Emboli Paru Masif): Emboli pelana masif menyumbat arteri pulmonalis. Pertimbangkan trombolisis sistemik (Alteplase) saat RJP berlangsung.\n5. Trombosis Koroner (STEMI Masif): Sindrom koroner akut oklusif. Teruskan RJP berkualitas tinggi dan pertimbangkan resusitasi ekstrakorporeal (E-CPR) serta kateterisasi darurat.',
          },
          keyTakeaways: {
            en: [
              'PEA and asystole are secondary manifestations of profound systemic disturbances; reversing the 5 H\'s and 5 T\'s is the only path to ROSC.',
              'Empirical treatment with IV calcium is life-saving in hyperkalemic arrest but detrimental in digoxin toxicity.',
            ],
            id: [
              'PEA dan asistol merupakan manifestasi sekunder dari gangguan sistemik berat; mengoreksi 5H dan 5T adalah satu-satunya jalan menuju ROSC.',
              'Pemberian kalsium intravena menyelamatkan jiwa pada henti jantung akibat hiperkalemia, tetapi berbahaya pada intoksikasi digoksin.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'card-q3-1',
          question: {
            en: 'Which of the following cardiac arrest rhythms indicates that immediate electrical defibrillation is required?',
            id: 'Irama henti jantung manakah berikut ini yang mengindikasikan bahwa defibrilasi listrik harus segera dilakukan?',
          },
          options: {
            en: [
              'Asystole confirmed in two leads',
              'Sinus bradycardia at 30 bpm without palpable pulse (PEA)',
              'Coarse Ventricular Fibrillation (VF)',
              'Idioventricular escape rhythm at 20 bpm',
            ],
            id: [
              'Asistol yang dikonfirmasi pada dua sadapan',
              'Sinus bradikardia 30 kali/menit tanpa nadi teraba (PEA)',
              'Fibrilasi Ventrikel (VF) Kasar',
              'Irama lolos idioventrikular 20 kali/menit',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Coarse Ventricular Fibrillation is a classic shockable rhythm requiring immediate asynchronous electrical defibrillation to depolarize the chaotic wavelets and restore sinus rhythm.',
            id: 'Fibrilasi Ventrikel kasar adalah irama shockable klasik yang membutuhkan defibrilasi listrik asinkron segera guna mendepolarisasi sirkuit re-entry kacau dan memulihkan irama sinus.',
          },
        },
        {
          id: 'card-q3-2',
          question: {
            en: 'Why is a biphasic waveform superior to an older monophasic waveform in clinical defibrillation?',
            id: 'Mengapa bentuk gelombang bifasik lebih unggul daripada gelombang monofasik terdahulu dalam defibrilasi klinis?',
          },
          options: {
            en: [
              'It requires higher electrical energy (>400J) to penetrate thick chests',
              'It terminates VF with equal or greater success at lower energy levels (120–200J), causing less myocardial injury',
              'It does not require electrical conductive gel pads',
              'It only works in pediatric patients under 25 kg',
            ],
            id: [
              'Memerlukan energi listrik lebih tinggi (>400J) agar mampu menembus dinding dada tebal',
              'Menterminasi VF dengan keberhasilan setara atau lebih tinggi pada dosis energi lebih rendah (120–200J), sehingga meminimalkan cedera miokardium',
              'Tidak memerlukan penggunaan bantalan gel konduktif',
              'Hanya bekerja efektif pada pasien anak-anak di bawah 25 kg',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Biphasic waveforms reverse current flow midway through the discharge, enabling effective defibrillation at 120–200 Joules with significantly less post-shock myocardial dysfunction compared to 360 Joule monophasic shocks.',
            id: 'Gelombang bifasik membalik arah aliran arus di pertengahan pelepasan muatan, memungkinkan terminasi efektif pada 120–200 Joule dengan derajat disfungsi miokardium pasca-kejut yang jauh lebih ringan dibanding 360 Joule monofasik.',
          },
        },
        {
          id: 'card-q3-3',
          question: {
            en: 'A dialysis patient suffers cardiac arrest. ECG reveals wide, slurred QRS complexes forming a continuous sine-wave pattern. Which initial intervention is paramount?',
            id: 'Pasien cuci darah rutin mengalami henti jantung. EKG memperlihatkan kompleks QRS sangat lebar yang menyatu membentuk pola gelombang sinus (sine-wave). Intervensi awal apakah yang terpenting?',
          },
          options: {
            en: [
              'IV Calcium Chloride or Calcium Gluconate for cardiac membrane stabilization',
              'High-dose subcutaneous epinephrine injection',
              'Immediate synchronized cardioversion at 50 Joules',
              'Intravenous infusion of 3% hypertonic saline',
            ],
            id: [
              'Kalsium Klorida atau Kalsium Glukonat intravena untuk stabilisasi membran miosit',
              'Suntikan epinefrin subkutan dosis tinggi',
              'Kardioversi tersinkronisasi segera pada 50 Joule',
              'Infus intravena salin hipertonik 3%',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'A sine-wave ECG pattern is pathognomonic for severe hyperkalemia. Intravenous calcium antagonizes the toxic membrane depolarizing effects of potassium on the cardiac conduction system within minutes.',
            id: 'Pola EKG sine-wave merupakan tanda patognomonik hiperkalemia berat. Kalsium intravena secara cepat menstabilkan ambang potensial aksi membran miosit dan mencegah kolaps konduksi jantung total.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 4: CPR HEMODYNAMICS & POST-CARDIAC ARREST SYNDROME
    // -------------------------------------------------------------
    {
      id: 'cardiac-mod-4',
      topicId: 'cardiac-arrest',
      order: 4,
      title: {
        en: 'High-Quality CPR Hemodynamics & Post-Cardiac Arrest Syndrome (PCAS)',
        id: 'Hemodinamika RJP Berkualitas Tinggi & Sindrom Pasca Henti Jantung (PCAS)',
      },
      shortDescription: {
        en: 'Thoracic pump vs cardiac pump theory, Coronary Perfusion Pressure (CPP >= 15 mmHg), capnography (ETCO2), and Targeted Temperature Management (TTM).',
        id: 'Teori pompa toraks vs pompa jantung, Tekanan Perfusi Koroner (CPP >= 15 mmHg), kapnografi (ETCO2), dan Manajemen Suhu Terarah (TTM).',
      },
      durationMinutes: 25,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'cardiac-hemodynamics',
      sections: [
        {
          id: 'cardiac-4-sec-1',
          title: {
            en: '1. Hemodynamics of Closed-Chest CPR: Cardiac Pump vs Thoracic Pump Theory',
            id: '1. Hemodinamika RJP Kompresi Dada: Teori Pompa Jantung vs Pompa Toraks',
          },
          content: {
            en: 'External closed-chest cardiopulmonary resuscitation (CPR) generates only 20% to 30% of normal physiological cardiac output and approximately 10% to 15% of baseline myocardial blood flow. Forward blood flow during chest compressions is governed by two complementary physiological mechanisms:\n\n1. Cardiac Pump Theory: Direct mechanical squeezing of the heart between the sternum and the thoracic vertebrae raises intracardiac pressure above aortic and pulmonary arterial pressure, forcing blood out through the aortic and pulmonary valves. Closure of the atrioventricular valves prevents retrograde flow into the atria.\n\n2. Thoracic Pump Theory: Rhythmic downward compression of the entire thoracic cage elevates intrathoracic pressure globally. Extrathoracic veins collapse at the thoracic inlet, creating a pressure gradient from the intrathoracic arterial tree to the lower-resistance extrathoracic systemic arterial circulation.\n\nHigh-Quality CPR Parameters Mandated by ILCOR & AHA:\n- Compression Depth: At least 5 cm (2 inches), not exceeding 6 cm in adults.\n- Compression Rate: 100 to 120 compressions per minute (faster rates impair ventricular diastolic refill; slower rates fail to build adequate perfusion pressure).\n- Complete Chest Recoil: Allowing full elastic chest rebound without leaning on the sternum. Incomplete recoil elevates intrathoracic pressure during decompression, choking venous return to the right atrium and halving coronary perfusion.\n- Minimizing Interruptions: Maintaining a Chest Compression Fraction (CCF) >80%.\n- Avoiding Hyperventilation: Ventilate at 10 breaths/min (1 breath every 6s). Hyperventilation raises intrathoracic pressure, blunts venous return, and induces cerebral vasoconstriction via hypocapnia.',
            id: 'Resusitasi Jantung Paru (RJP) kompresi dada luar hanya menghasilkan 20% hingga 30% dari curah jantung fisiologis normal dan sekitar 10% hingga 15% dari aliran darah miokardium dasar. Aliran darah antegrad selama kompresi dada dikendalikan oleh dua mekanisme fisiologis yang saling melengkapi:\n\n1. Teori Pompa Jantung (Cardiac Pump Theory): Penekanan mekanis langsung pada organ jantung di antara sternum dan kolumna vertebra torakalis meningkatkan tekanan intrakardiak melampaui tekanan aorta dan arteri pulmonalis, mendorong darah mengalir keluar melalui katup semilunar. Penutupan katup atrioventrikular mencegah aliran balik ke atrium.\n\n2. Teori Pompa Toraks (Thoracic Pump Theory): Penekanan ritmis pada seluruh rongga dada meningkatkan tekanan intratoraks secara merata. Vena ekstratoraks kolaps di pintu masuk toraks, menciptakan gradien tekanan dari pembuluh darah intratoraks ke sirkulasi sistemik ekstratoraks beresistansi lebih rendah.\n\nParameter RJP Berkualitas Tinggi Menurut ILCOR & AHA:\n- Kedalaman Kompresi: Sekurang-kurangnya 5 cm (2 inci), dan tidak melebihi 6 cm pada orang dewasa.\n- Kecepatan Kompresi: 100 hingga 120 kali per menit (kecepatan berlebih membatasi waktu pengisian ventrikel; kecepatan terlalu lambat gagal membangun tekanan perfusi arteri).\n- Rekoil Dada Sempurna (Full Chest Recoil): Melepaskan penekanan sternum seutuhnya di setiap kompresi. Bersandar pada dada meningkatkan tekanan intratoraks fase relaksasi, menyumbat aliran balik vena ke atrium kanan, dan memotong separuh perfusi koroner.\n- Minimalkan Jeda Kompresi: Mempertahankan Fraksi Kompresi Dada (Chest Compression Fraction/CCF) >80%.\n- Hindari Hiperventilasi: Cukup berikan 10 napas/menit (1 napas tiap 6 detik). Hiperventilasi meningkatkan tekanan intratoraks dan memicu vasokonstriksi serebral akibat hipokapnia berat.',
          },
          formula: '\\text{CPP}_\\text{CPR} = P_\\text{art, decompression} - P_\\text{RA, decompression} \\ge 15\\text{ mmHg}',
          formulaExplanation: {
            en: 'Coronary Perfusion Pressure (CPP) during CPR decompression phase is the single most critical physiological predictor of Return of Spontaneous Circulation (ROSC). Animal and clinical studies demonstrate that achieving a CPP ≥ 15 mmHg is mandatory for successful defibrillation and myocardial resuscitation.',
            id: 'Tekanan Perfusi Koroner (CPP) selama fase dekompresi RJP merupakan prediktor fisiologis tunggal terpenting bagi kembalinya sirkulasi spontan (ROSC). Berbagai uji klinis membuktikan bahwa pencapaian CPP ≥ 15 mmHg merupakan syarat mutlak bagi keberhasilan defibrilasi dan resusitasi miokardium.',
          },
          variables: [
            {
              symbol: 'P_\\text{art, decompression}',
              name: { en: 'Aortic Diastolic Relaxation Pressure', id: 'Tekanan Relaksasi Diastolik Aorta' },
              unit: 'mmHg',
              description: {
                en: 'Aortic pressure during the decompression phase of chest compressions.',
                id: 'Tekanan pada pangkal aorta selama fase dekompresi dada.',
              },
            },
            {
              symbol: 'P_\\text{RA, decompression}',
              name: { en: 'Right Atrial Decompression Pressure', id: 'Tekanan Dekompresi Atrium Kanan' },
              unit: 'mmHg',
              description: {
                en: 'Backpressure in the right atrium opposing coronary sinus drainage.',
                id: 'Tekanan balik pada atrium kanan yang melawan aliran drainase sinus koroner.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Chest compression quality directly determines coronary perfusion pressure during the diastolic relaxation phase.',
              'A minimum CPP of 15 mmHg is required to achieve Return of Spontaneous Circulation (ROSC).',
            ],
            id: [
              'Kualitas kompresi dada menentukan secara langsung tekanan perfusi koroner selama fase relaksasi diastolik.',
              'Target CPP minimum 15 mmHg mutlak diperlukan guna meraih Return of Spontaneous Circulation (ROSC).',
            ],
          },
        },
        {
          id: 'cardiac-4-sec-2',
          title: {
            en: '2. Real-Time Resuscitation Monitoring: Waveform Capnography & ROSC Detection',
            id: '2. Pemantauan Resusitasi Real-Time: Kapnografi Gelombang & Deteksi ROSC',
          },
          content: {
            en: 'Monitoring the physiological effectiveness of ongoing CPR in real time transforms resuscitation from blind protocol execution to targeted hemodynamics:\n\n1. End-Tidal CO2 (ETCO2) Waveform Capnography: In an intubated patient during cardiac arrest, carbon dioxide delivered to the lungs is strictly limited by pulmonary blood flow (i.e., cardiac output generated by CPR). Therefore:\n- ETCO2 < 10 mmHg: Reflects poor cardiac output and substandard CPR compressions (or endotracheal tube dislodgement). Rescuer fatigue must be corrected immediately.\n- ETCO2 > 20 mmHg: Indicates high-quality CPR generating adequate perfusion.\n- Sudden Abrupt Sustained Rise in ETCO2 (typically jumping to ≥35–40 mmHg): The earliest, most reliable non-invasive indicator of Return of Spontaneous Circulation (ROSC). It occurs because the restored native heartbeat suddenly surges un-cleared venous blood containing accumulated CO2 through the pulmonary capillaries.\n\n2. Invasive Arterial Line Monitoring: When an arterial catheter is in place, the relaxation/diastolic arterial pressure serves as a direct surrogate for coronary perfusion. Rescuers should titrate chest compressions and vasoactive medications (Epinephrine 1 mg IV q3–5 min or Vasopressin) to maintain diastolic arterial pressure >20 mmHg.',
            id: 'Pemantauan efektivitas fisiologis RJP secara real-time mengubah resusitasi dari sekadar menjalankan protokol kaku menjadi terapi hemodinamika terarah:\n\n1. Kapnografi Gelombang End-Tidal CO2 (ETCO2): Pada pasien henti jantung terintubasi, jumlah CO2 yang dialirkan ke paru dibatasi langsung oleh curah jantung yang dihasilkan oleh kompresi RJP. Oleh karena itu:\n- ETCO2 < 10 mmHg: Menandakan curah jantung sangat rendah akibat kompresi kurang optimal (atau intubasi esofagus). Penolong harus segera berganti akibat kelelahan.\n- ETCO2 > 20 mmHg: Menandakan RJP berkualitas tinggi yang menghasilkan perfusi sistemik adekuat.\n- Lonjakan Mendadak dan Bertahan pada ETCO2 (melonjak hingga ≥35–40 mmHg): Indikator non-invasif paling awal dan paling andal atas terjadinya Return of Spontaneous Circulation (ROSC). Hal ini terjadi karena kembalinya denyut jantung spontan seketika mengalirkan darah vena kaya CO2 ke kapiler paru.\n\n2. Pemantauan Jalur Arteri Invasif (Arterial Line): Bila kanul arteri terpasang, tekanan diastolik relaksasi menjadi penanda langsung perfusi koroner. Kompresi dan vasopresor ditargetkan untuk mempertahankan tekanan diastolik arteri >20 mmHg.',
          },
          keyTakeaways: {
            en: [
              'Quantitative waveform capnography reflects pulmonary blood flow generated by chest compressions.',
              'A sudden spike of ETCO2 to 40 mmHg heralds ROSC without requiring CPR interruption for pulse checks.',
            ],
            id: [
              'Kapnografi gelombang kuantitatif mencerminkan curah jantung yang dihasilkan oleh kompresi dada.',
              'Lonjakan mendadak ETCO2 hingga ≥40 mmHg menandai ROSC tanpa perlu menghentikan kompresi untuk meraba nadi.',
            ],
          },
        },
        {
          id: 'cardiac-4-sec-3',
          title: {
            en: '3. Post-Cardiac Arrest Syndrome (PCAS) & Targeted Temperature Management (TTM)',
            id: '3. Sindrom Pasca Henti Jantung (PCAS) & Manajemen Suhu Terarah (TTM)',
          },
          content: {
            en: 'Achievement of ROSC is merely the beginning of resuscitation. Patients enter Post-Cardiac Arrest Syndrome (PCAS), a complex pathological condition driven by whole-body ischemia-reperfusion injury composed of four key pillars:\n\n1. Post-Cardiac Arrest Brain Injury: Cerebral edema, loss of cerebrovascular autoregulation, hyperpyrexic secondary neuronal injury, and neurotoxic calcium/glutamate excitotoxicity.\n2. Post-Cardiac Arrest Myocardial Dysfunction: Global myocardial "stunning" characterized by transient left ventricular ejection fraction reduction (<30–40%) and elevated filling pressures, typically responsive to inotropes (Dobutamine, Epinephrine) and resolving over 48–72 hours.\n3. Systemic Ischemia/Reperfusion Response: A sepsis-like cytokine storm (TNF-α, IL-6, IL-1β) inducing diffuse endothelial activation, capillary leak, and systemic vasodilation.\n4. Persistent Precipitating Pathology: The underlying cause of arrest (e.g., acute coronary occlusion, pulmonary embolism, severe metabolic toxicity).\n\nKey Post-ROSC Clinical Management Priorities:\n- Emergent Coronary Angiography: Immediate catheterization lab activation for any patient with STEMI on post-ROSC ECG, or those in cardiogenic shock without an obvious non-cardiac etiology.\n- Targeted Temperature Management (TTM): Maintaining a constant core body temperature strictly between 32°C and 36°C (or strict normothermia <37.5°C) for at least 24 hours using endovascular cooling catheters or surface cooling pads with closed-loop feedback. TTM blunts the secondary apoptotic cascade, suppresses cerebral metabolic oxygen demand ($CMRO_2$ drops ~6% per 1°C reduction), and prevents lethal post-anoxic hyperthermia.\n- Hemodynamic & Oxygenation Targets: Mean Arterial Pressure (MAP) target ≥65–75 mmHg; PaO2 80–100 mmHg (avoiding hyperoxia which generates neurotoxic reactive oxygen species); PaCO2 35–45 mmHg (avoiding hyperventilation cerebral ischemia).',
            id: 'Tercapainya ROSC hanyalah awal dari proses penyelamatan. Pasien memasuki kondisi kompleks yang disebut Sindrom Pasca Henti Jantung (Post-Cardiac Arrest Syndrome/PCAS), akibat cedera iskemia-reperfusi menyeluruh yang mencakup 4 pilar:\n\n1. Cedera Otak Pasca Henti Jantung: Edema serebral, hilangnya autoregulasi vaskular otak, cedera neuronal sekunder akibat demam, serta eksitotoksisitas glutamat dan kalsium intraseluler.\n2. Disfungsi Miokardium Pasca Henti Jantung: "Stunning" miokardium global yang ditandai dengan penurunan fraksi ejeksi ventrikel kiri (<30–40%) dan peningkatan tekanan pengisian, yang umumnya membaik dalam 48–72 jam dengan dukungan inotropik.\n3. Respon Iskemia/Reperfusi Sistemik: Badai sitokin inflamasi menyerupai sepsis (TNF-α, IL-6) yang memicu aktivasi endotel luas, kebocoran kapiler, dan vasodilatasi sistemik.\n4. Patologi Pemicu yang Masih Menetap: Penyebab utama henti jantung (misalnya oklusi koroner akut, emboli paru masif).\n\nPrioritas Tata Laksana Pasca-ROSC:\n- Angiografi Koroner Segera: Aktivasi lab kateterisasi darurat untuk seluruh pasien dengan gambaran STEMI pada EKG pasca-ROSC atau pasien syok kardiogenik.\n- Targeted Temperature Management (TTM): Menjaga suhu inti tubuh stabil antara 32°C hingga 36°C (atau normotermia ketat <37.5°C) selama sekurang-kurangnya 24 jam. TTM meredam kaskade apoptosis sekunder, menurunkan laju metabolisme oksigen otak ($CMRO_2$ turun ~6% tiap penurunan 1°C), dan mencegah hipertermia pasca-anoksia yang mematikan.\n- Target Hemodinamik & Oksigenasi: Target Tekanan Arteri Rata-rata (MAP) ≥65–75 mmHg; PaO2 80–100 mmHg (hindari hiperoksia yang memicu radikal bebas toksik); PaCO2 35–45 mmHg (hindari hiperventilasi yang memicu iskemia serebral).',
          },
          keyTakeaways: {
            en: [
              'Post-Cardiac Arrest Syndrome (PCAS) requires aggressive intensive care focused on brain protection and hemodynamic support.',
              'Targeted Temperature Management (TTM) prevents hyperthermic secondary brain injury and optimizes neurological recovery.',
            ],
            id: [
              'Sindrom Pasca Henti Jantung (PCAS) memerlukan perawatan intensif agresif yang difokuskan pada proteksi otak dan hemodinamika.',
              'Targeted Temperature Management (TTM) mencegah cedera otak sekunder akibat demam dan mengoptimalkan pemulihan neurologis.',
            ],
          },
        },
      ],
      quiz: [
        {
          id: 'card-q4-1',
          question: {
            en: 'During adult CPR, why must rescuers avoid leaning on the patient\'s chest between compressions?',
            id: 'Saat melakukan RJP pada orang dewasa, mengapa penolong dilarang bersandar pada dada pasien di antara kompresi?',
          },
          options: {
            en: [
              'Incomplete chest recoil prevents normal passive venous return to the right heart, reducing coronary perfusion pressure',
              'It causes early rib fractures and increases gastric inflation',
              'It accelerates the heart rate beyond 150 bpm',
              'It triggers refractory ventricular fibrillation',
            ],
            id: [
              'Rekoil dada yang tidak sempurna menghambat aliran balik vena pasif ke jantung kanan, sehingga memotong tekanan perfusi koroner',
              'Dapat memicu fraktur iga dini dan meningkatkan inflasi lambung',
              'Meningkatkan denyut jantung hingga melampaui 150 kali/menit',
              'Memicu timbulnya fibrilasi ventrikel refrakter',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Allowing complete chest recoil generates negative intrathoracic pressure that pulls venous blood into the right atrium, essential for filling the coronary circulation during the diastolic decompression phase.',
            id: 'Membiarkan dinding dada berekrekoil sempurna menghasilkan tekanan intratoraks negatif yang menarik darah vena ke atrium kanan, yang sangat krusial bagi pengisian sirkulasi koroner pada fase dekompresi.',
          },
        },
        {
          id: 'card-q4-2',
          question: {
            en: 'During resuscitation of an intubated cardiac arrest patient, the capnography monitor displays an abrupt increase in ETCO2 from 14 mmHg to 42 mmHg. What does this signify?',
            id: 'Saat resusitasi pasien henti jantung terintubasi, monitor kapnografi menunjukkan lonjakan mendadak nilai ETCO2 dari 14 mmHg menjadi 42 mmHg. Apakah arti klinis dari temuan ini?',
          },
          options: {
            en: [
              'Sudden Return of Spontaneous Circulation (ROSC)',
              'Accidental esophageal intubation',
              'Development of tension pneumothorax',
              'Rescuer fatigue requiring immediate chest compressor rotation',
            ],
            id: [
              'Terjadinya Return of Spontaneous Circulation (ROSC) mendadak',
              'Intubasi endotrakeal tidak sengaja masuk ke esofagus',
              'Timbulnya komplikasi tension pneumothorax',
              'Kelelahan penolong yang menuntut pergantian kompresor seketika',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'An abrupt, sustained spike in ETCO2 (typically ≥35–40 mmHg) reflects a sudden surge in cardiac output and pulmonary perfusion, representing the earliest non-invasive indicator of ROSC.',
            id: 'Peningkatan mendadak dan bertahan pada nilai ETCO2 (biasanya ≥35–40 mmHg) mencerminkan lonjakan cepat curah jantung dan perfusi pulmonal, yang merupakan tanda non-invasif paling awal dari ROSC.',
          },
        },
        {
          id: 'card-q4-3',
          question: {
            en: 'What is the primary rationale for Targeted Temperature Management (TTM) in comatose patients following ROSC?',
            id: 'Apakah alasan fisiologis utama penerapan Targeted Temperature Management (TTM) pada pasien koma pasca-ROSC?',
          },
          options: {
            en: [
              'To eliminate the need for mechanical ventilation and sedation',
              'To mitigate cerebral reperfusion injury, suppress metabolic oxygen demand, and prevent fever-induced secondary neuronal apoptosis',
              'To increase systemic vascular resistance and cure cardiogenic shock',
              'To accelerate liver clearance of antithrombotic medications',
            ],
            id: [
              'Untuk meniadakan kebutuhan ventilasi mekanik dan sedasi',
              'Untuk meredam cedera reperfusi serebral, menekan kebutuhan metabolisme oksigen otak, dan mencegah apoptosis neuronal sekunder akibat demam',
              'Untuk meningkatkan resistansi vaskular sistemik dan mengatasi syok kardiogenik',
              'Untuk mempercepat metabolisme hepar terhadap obat antitrombotik',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'TTM (32–36°C or strict normothermia) reduces cerebral metabolic rate by ~6% per degree Celsius, suppresses free radical generation, decreases neuroinflammation, and prevents hyperthermia-induced neuronal death.',
            id: 'TTM (32–36°C atau normotermia ketat) menurunkan laju metabolisme serebral sekitar 6% tiap penurunan 1°C, menekan pembentukan radikal bebas, meredakan neuroinflamasi, dan mencegah kematian neuron akibat hipertermia.',
          },
        },
      ],
    },
  ],
};
