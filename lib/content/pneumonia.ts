import { Topic } from '@/types/learning';

export const pulmonologyPneumoniaTopic: Topic = {
  id: 'pulmonology-pneumonia',
  title: {
    en: 'Pneumonia & Pulmonary Infectious Pathophysiology',
    id: 'Pneumonia & Patofisiologi Infeksi Pulmonal',
  },
  tagline: {
    en: 'Alveolar consolidation, CAP, HAP/VAP, Tuberculosis, COVID-19, and IDSA/ATS severe pneumonia management.',
    id: 'Konsolidasi alveolar, CAP, HAP/VAP, Tuberkulosis, COVID-19, dan tatalaksana pneumonia berat berbasis panduan IDSA/ATS.',
  },
  description: {
    en: 'Master pulmonary infectious diseases from microscopic alveolar-capillary pathophysiology to evidence-based clinical practice. Investigate Community-Acquired Pneumonia (CAP) risk stratification (CURB-65, PSI), Hospital-Acquired & Ventilator-Associated Pneumonia (HAP/VAP) with multidrug-resistant pathogens, Mycobacterium tuberculosis granulomatous immunology, and severe viral pneumonia leading to Acute Respiratory Distress Syndrome (ARDS) guided by IDSA/ATS, WHO, and Berlin clinical criteria.',
    id: 'Kuasai patofisiologi dan tatalaksana klinis penyakit infeksi paru dari membran alveolar-kapiler hingga pedoman berbasis bukti. Pelajari stratifikasi risiko Pneumonia Komunitas (CAP) melalui skor CURB-65 dan PSI, penanganan HAP/VAP dengan patogen resistan banyak obat (MDR), imunologi granulomatosa Mycobacterium tuberculosis, serta pneumonia viral berat yang memicu ARDS berdasarkan kriteria konsensus IDSA/ATS, WHO, dan Berlin.',
  },
  category: {
    en: 'Clinical Pulmonology & Infectious Disease',
    id: 'Pulmonologi Klinis & Penyakit Menular',
  },
  colorAccent: 'rose',
  badgeColor: 'from-rose-500 to-amber-600',
  iconName: 'Activity',
  modules: [
    // -------------------------------------------------------------
    // PART 1: COMMUNITY-ACQUIRED PNEUMONIA (CAP)
    // -------------------------------------------------------------
    {
      id: 'pne-mod-1',
      topicId: 'pulmonology-pneumonia',
      order: 1,
      title: {
        en: 'Community-Acquired Pneumonia (CAP) & Risk Stratification',
        id: 'Pneumonia Komunitas (CAP) & Stratifikasi Risiko Klinis',
      },
      shortDescription: {
        en: 'Alveolar exudative consolidation, Streptococcus pneumoniae virulence, CURB-65/PSI scoring, and IDSA/ATS 2019 guidelines.',
        id: 'Konsolidasi eksudatif alveolar, virulensi Streptococcus pneumoniae, skor CURB-65/PSI, dan pedoman IDSA/ATS 2019.',
      },
      durationMinutes: 20,
      difficulty: 'Intermediate',
      difficultyId: 'Menengah',
      interactiveType: 'pulmonary-alveoli',
      sections: [
        {
          id: 'pne-1-sec-1',
          title: {
            en: '1. Alveolar Consolidation & The Four Classical Pathological Stages',
            id: '1. Konsolidasi Alveolar & Empat Tahap Patologis Klasik',
          },
          content: {
            en: 'Pneumonia is an acute inflammatory infection of the pulmonary parenchymal architecture distal to the terminal bronchioles, encompassing respiratory bronchioles, alveolar ducts, and alveolar sacs. When microbial pathogens evade upper airway mechanical filtration, aerodynamic impaction, and the mucociliary escalator, they deposit onto the delicate alveolar epithelial surface (composed of ultra-thin Type I pneumocytes and surfactant-synthesizing Type II pneumocytes).\n\nIn typical lobar pneumonia (classically driven by Streptococcus pneumoniae), the lung parenchyma progresses through four well-defined histopathological stages first characterized by Carl Rokitansky and Rudolf Virchow:\n\n1. Congestion (Hours 1–24): Bacterial multiplication induces immediate microvascular engorgement and capillary hyper-permeability. Protein-rich serous transudate and intra-alveolar edema accumulate with scattered erythrocytes and intra-alveolar bacteria.\n2. Red Hepatization (Days 2–4): Massive diapedesis of polymorphonuclear neutrophils (PMNs), continuous extravasation of erythrocytes, and extensive intra-alveolar fibrin mesh polymerization occur. The affected pulmonary lobe transforms into a heavy, firm, airless, liver-like consistency on gross pathology.\n3. Gray Hepatization (Days 4–7): Progressive hemolyzation of red blood cells and ongoing accumulation of fibrinopurulent exudate inside alveoli compress adjacent alveolar capillaries, producing a dry, grayish-brown surface.\n4. Resolution (Day 8 onwards): Intra-alveolar exudate undergoes enzymatic proteolysis driven by neutrophil elastase and plasmin. Alveolar macrophages engulf necrotic cellular debris, restoring aeration and normal alveolar microarchitecture without structural scarring in uncomplicated cases.',
            id: 'Pneumonia merupakan infeksi inflamasi akut pada parenkim paru di sebelah distal bronkiolus terminalis, yang mencakup bronkiolus respiratorius, duktus alveolaris, dan sakus alveolaris. Ketika mikroorganisme patogen menembus filtrasi mekanis saluran napas atas, impaksi aerodinamis, dan eskalator mukosiliar, mereka mengendap di permukaan epitel alveolar yang sangat tipis (terdiri dari sel pneumosit Tipe I dan pneumosit Tipe II penghasil surfaktan).\n\nPada pneumonia lobaris tipikal (yang paling sering disebabkan oleh Streptococcus pneumoniae), parenkim paru berkembang melalui empat tahap histopatologis klasik:\n\n1. Kongesti (Jam 1–24): Kolonisasi dan replikasi bakteri memicu vasodilatasi kapiler masif dan peningkatan permeabilitas membran alveolar-kapiler. Edema intra-alveolar serosa kaya protein terakumulasi bersama eritrosit dan bakteri aktif.\n2. Hepatisasi Merah (Hari 2–4): Terjadi diapedesis neutrofil masif, ekstravasasi eritrosit terus-menerus, dan polimerisasi benang fibrin dalam lumen alveolus. Lobus paru yang terdampak menjadi padat, kedap udara, dan konsistensinya menyerupai organ hati (liver-like consistency).\n3. Hepatisasi Kelabu (Hari 4–7): Eritrosit yang terperangkap mengalami hemolisis dan lisis enzimatik, sementara eksudat fibrinopurulen terus memadat dan menekan mikrosirkulasi kapiler di septa interalveolar, memberikan tampilan permukaan makroskopis kelabu-kecokelatan.\n4. Resolusi (Hari ke-8 ke atas): Eksudat intra-alveolar dicerna secara enzimatik oleh elastase neutrofil dan plasmin. Makrofag alveolar memfagosit sisa debris nekrotik, memungkinkan re-aerasi dan pemulihan arsitektur dinding alveolus tanpa jaringan parut permanen.',
          },
          formula: 'P_A\\text{O}_2 = \\left(P_\\text{atm} - P_{\\text{H}_2\\text{O}}\\right) \\times \\text{FiO}_2 - \\frac{P_a\\text{CO}_2}{R}',
          formulaExplanation: {
            en: 'The Alveolar Gas Equation calculates the theoretical partial pressure of oxygen in patent alveoli (P_A O_2). In pneumonic consolidation, alveolar exudate obliterates alveolar ventilation while capillary perfusion persists, causing severe right-to-left intrapulmonary shunt (V/Q = 0) and an elevated Alveolar-arterial oxygen gradient (A-a gradient = P_A O_2 - P_a O_2).',
            id: 'Persamaan Gas Alveolar menghitung tekanan parsial oksigen ideal dalam alveolus yang terventilasi (P_A O_2). Pada konsolidasi pneumonia, eksudat menutup ventilasi alveolar sementara aliran darah kapiler tetap mengalir, memicu pirau intrapulmonal kanan-ke-kiri (V/Q = 0) dan peningkatan gradien oksigen Alveolar-arterial (A-a gradient = P_A O_2 - P_a O_2).',
          },
          variables: [
            {
              symbol: 'P_\\text{atm}',
              name: { en: 'Barometric Atmospheric Pressure', id: 'Tekanan Barometrik Atmosfer' },
              unit: 'mmHg (760 at sea level)',
              description: {
                en: 'Total ambient barometric pressure.',
                id: 'Tekanan udara lingkungan sekitar permukaan laut.',
              },
            },
            {
              symbol: 'P_{\\text{H}_2\\text{O}}',
              name: { en: 'Water Vapor Pressure', id: 'Tekanan Uap Air Jenuh' },
              unit: 'mmHg (47 at 37°C)',
              description: {
                en: 'Saturated water vapor pressure at normal human core body temperature (37°C).',
                id: 'Tekanan uap air jenuh pada suhu inti tubuh normal 37°C.',
              },
            },
            {
              symbol: '\\text{FiO}_2',
              name: { en: 'Fraction of Inspired Oxygen', id: 'Fraksi Oksigen Terinspirasi' },
              unit: 'Fraction (0.21 in ambient room air)',
              description: {
                en: 'Concentration of oxygen in inspired gas.',
                id: 'Konsentrasi oksigen dalam udara inspirasi.',
              },
            },
            {
              symbol: 'R',
              name: { en: 'Respiratory Quotient', id: 'Koefisien Respirasi' },
              unit: 'Dimensionless (~0.8)',
              description: {
                en: 'Ratio of carbon dioxide production (V_CO2) to oxygen consumption (V_O2).',
                id: 'Rasio laju produksi CO2 terhadap konsumsi O2 pada metabolisme aerobik.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'Pneumonic consolidation transforms air-filled spongy acini into dense exudative parenchymal tissue.',
              'The four classical phases are Congestion, Red Hepatization, Gray Hepatization, and Resolution.',
              'Hypoxemia in pneumonia results primarily from low ventilation-perfusion units (V/Q mismatch) and true anatomical/pathological intrapulmonary shunting (V/Q = 0).',
            ],
            id: [
              'Konsolidasi pneumonia mengubah parenkim paru berongga udara menjadi massa jaringan padat berisi eksudat.',
              'Empat fase klasik pneumonia lobaris: Kongesti, Hepatisasi Merah, Hepatisasi Kelabu, dan Resolusi.',
              'Hipoksemia pada pneumonia terutama diakibatkan oleh ketidakcocokan ventilasi-perfusi (V/Q mismatch) dan pirau intrapulmonal sejati (V/Q = 0).',
            ],
          },
        },
        {
          id: 'pne-1-sec-2',
          title: {
            en: '2. Microbiological Etiology: Typical vs Atypical Pathogens',
            id: '2. Etiologi Mikrobiologis: Patogen Tipikal vs Atipikal',
          },
          content: {
            en: 'Community-Acquired Pneumonia is acquired outside of healthcare facilities. The microbial profile is stratified into typical and atypical pathogens:\n\n1. Typical Bacterial Pathogens:\n• Streptococcus pneumoniae (Pneumococcus): Responsible for >50% of bacterial CAP cases globally. Lancolate-shaped, Gram-positive diplococci possessing a virulent antiphagocytic polysaccharide capsule (>100 serotypes), cell-wall pneumolysin (a cholesterol-dependent pore-forming cytolysin that induces alveolar epithelial and endothelial necrosis), and secretory IgA proteases.\n• Haemophilus influenzae: Pleomorphic Gram-negative coccobacillus, frequently colonizing patients with Chronic Obstructive Pulmonary Disease (COPD) and tobacco smokers.\n• Moraxella catarrhalis: Gram-negative diplococcus producing beta-lactamase, also prevalent in underlying structural lung disease.\n• Staphylococcus aureus: Can cause severe necrotizing pneumonia with pneumatoceles, especially post-influenza viral infection (MRSA and MSSA strains, including PVL-toxin producers).\n\n2. Atypical Pathogens:\n• Mycoplasma pneumoniae: Lacks a peptidoglycan cell wall (intrinsically resistant to all beta-lactams!), prevalent in young adults, causes "walking pneumonia" with prominent interstitial infiltrates and extra-pulmonary cold agglutinin hemolytic anemia.\n• Legionella pneumophila: Intracellular Gram-negative rod acquired via aerosolized warm water systems (air conditioning cooling towers, showers). Presents with high fever, relative bradycardia (Faget sign), neurological confusion, severe diarrhea, and hyponatremia due to SIADH.\n• Chlamydophila pneumoniae: Obligate intracellular pathogen causing biphasic pharyngitis followed by subacute cough.',
            id: 'Pneumonia Komunitas didapat di luar lingkungan fasilitas perawatan kesehatan. Spektrum mikrobiologisnya dibagi menjadi patogen tipikal dan atipikal:\n\n1. Patogen Bakteri Tipikal:\n• Streptococcus pneumoniae (Pneumokokus): Penyebab >50% kasus CAP bakterial di seluruh dunia. Diplokokus Gram-positif berbentuk lanset dengan kapsul polisakarida antifagositik (>100 serotipe), pneumolisin (toksin sitolitik pembentuk pori yang merusak sel epitel dan endotel kapiler alveolar), serta enzim IgA protease sekretorik.\n• Haemophilus influenzae: Kokobasil Gram-negatif pleomorfik, sangat sering menyerang pasien dengan Penyakit Paru Obstruktif Kronik (PPOK) dan perokok aktif.\n• Moraxella catarrhalis: Diplokokus Gram-negatif penghasil enzim beta-laktamase.\n• Staphylococcus aureus: Memicu pneumonia nekrotikans berat dengan kavitas dan pneumatokel, terutama sebagai superinfeksi pasca-influenza (galur MSSA maupun MRSA penghasil toksin Panton-Valentine leukocidin / PVL).\n\n2. Patogen Atipikal:\n• Mycoplasma pneumoniae: Tidak memiliki dinding sel peptidoglikan (secara intrinsik resistan terhadap semua golongan antibiotik beta-laktam!), sering menyerang dewasa muda, memicu "walking pneumonia" dengan infiltrat interstisial dan anemia hemolitik autoimun (cold agglutinin).\n• Legionella pneumophila: Batang Gram-negatif intraseluler fakultatif yang ditularkan melalui aerosol sistem air hangat atau pendingin gedung. Gejala khas mencakup demam tinggi, bradikardia relatif (tanda Faget), konfusi mental, diare, serta hiponatremia sekunder akibat SIADH.\n• Chlamydophila pneumoniae: Bakteri intraseluler obligat yang memicu faringitis bifasik dan batuk subakut.',
          },
          comparisonTable: {
            headers: {
              en: ['Feature', 'Typical Pneumonia (e.g. S. pneumoniae)', 'Atypical Pneumonia (e.g. Mycoplasma, Legionella)'],
              id: ['Fitur Klinis', 'Pneumonia Tipikal (mis. S. pneumoniae)', 'Pneumonia Atipikal (mis. Mycoplasma, Legionella)'],
            },
            rows: [
              {
                en: ['Onset & Course', 'Acute, abrupt onset with single shaking chill (rigor)', 'Subacute, insidious onset with headache & dry cough'],
                id: ['Awitan & Perjalanan', 'Akut, mendadak dengan menggigil hebat (rigor)', 'Subakut, perlahan dengan nyeri kepala & batuk kering'],
              },
              {
                en: ['Sputum', 'Purulent, classically rust-colored (prune juice)', 'Scant, mucoid, or non-productive'],
                id: ['Karakteristik Dahak', 'Purulen, klasik berwarna merah karat (rust-colored)', 'Sedikit, mukoid, atau batuk non-produktif'],
              },
              {
                en: ['Physical Examination', 'Lobar consolidation: dullness, bronchial breath sounds, crackles', 'Minimal focal signs, diffuse bilateral scattered rhonchi'],
                id: ['Pemeriksaan Fisik', 'Tanda konsolidasi: redup, suara napas bronkial, krepitasi kasar', 'Tanda fokal minimal, ronki basah halus difus bilateral'],
              },
              {
                en: ['Chest Radiograph', 'Dense, contiguous lobar/segmental consolidation with air bronchograms', 'Diffuse bilateral patchy reticulonodular interstitial infiltrates'],
                id: ['Radiologi Toraks', 'Konsolidasi lobaris/segmental padat dengan air bronchogram jelas', 'Infiltrat interstisial retikulonodular difus bilateral'],
              },
              {
                en: ['Beta-Lactam Susceptibility', 'Generally susceptible (Amoxicillin, Ceftriaxone, Ampicillin-Sulbactam)', 'Intrinsically resistant to Beta-Lactams; requires Macrolides, Tetracyclines, or Quinolones'],
                id: ['Sensitivitas Beta-Laktam', 'Umumnya sensitif (Amoksisilin, Seftriakson, Ampisilin-Sulbaktam)', 'Resistan intrinsik terhadap Beta-Laktam; butuh Makrolida, Doksisiklin, atau Kuquinolon'],
              },
            ],
          },
        },
        {
          id: 'pne-1-sec-3',
          title: {
            en: '3. Clinical Risk Scoring: CURB-65 & Pneumonia Severity Index (PSI)',
            id: '3. Penilaian Risiko Klinis: Skor CURB-65 & Pneumonia Severity Index (PSI)',
          },
          content: {
            en: 'Objective risk stratification determines whether a patient can be safely managed in the outpatient setting, requires general ward hospitalization, or mandates direct Intensive Care Unit (ICU) admission.\n\nThe British Thoracic Society (BTS) CURB-65 score assigns 1 point for each of 5 objective clinical variables:\n• C (Confusion): Abbreviated Mental Test score ≤8 or acute disorientation in person, place, or time.\n• U (Urea): Blood urea nitrogen (BUN) > 19 mg/dL (> 7.0 mmol/L).\n• R (Respiratory Rate): Tachypnea with respiratory rate ≥ 30 breaths/minute.\n• B (Blood Pressure): Systolic BP < 90 mmHg OR Diastolic BP ≤ 60 mmHg.\n• 65 (Age): Age ≥ 65 years.\n\nRisk Stratification & Clinical Disposition:\n• CURB-65 Score 0–1: Low risk (30-day mortality <1.5%). Outpatient management is suitable.\n• CURB-65 Score 2: Moderate risk (30-day mortality ~9.2%). Hospitalization or closely monitored outpatient treatment.\n• CURB-65 Score 3–5: Severe pneumonia (30-day mortality 15%–40%). Urgent hospital admission; evaluate for direct ICU admission if score is 4 or 5.\n\nThe Pneumonia Severity Index (PSI / PORT Score) stratifies patients into 5 risk classes based on 20 demographic, comorbidity, physical exam, and laboratory/radiographic variables. The 2019 IDSA/ATS guidelines preferentially endorse the PSI over CURB-65 because of its superior sensitivity in identifying low-risk candidates safe for outpatient recovery.',
            id: 'Stratifikasi risiko objektif menentukan apakah pasien dapat dirawat jalan dengan aman, memerlukan rawat inap di bangsal umum, atau harus segera dirawat di Unit Perawatan Intensif (ICU).\n\nSkor CURB-65 (British Thoracic Society) memberikan 1 poin untuk masing-masing dari 5 variabel klinis objektif:\n• C (Confusion / Konfusi): Gangguan kesadaran akut atau skor uji mental tersingkat ≤8.\n• U (Urea): Kadar Blood Urea Nitrogen (BUN) > 19 mg/dL (> 7.0 mmol/L).\n• R (Respiratory Rate / Laju Napas): Takipnea dengan laju napas ≥ 30 kali/menit.\n• B (Blood Pressure / Tekanan Darah): Tekanan darah sistolik < 90 mmHg ATAU diastolik ≤ 60 mmHg.\n• 65 (Age / Usia): Usia pasien ≥ 65 tahun.\n\nStratifikasi Risiko & Disposisi Pasien:\n• Skor 0–1: Risiko rendah (mortalitas 30-hari <1.5%). Pasien aman untuk terapi rawat jalan.\n• Skor 2: Risiko sedang (mortalitas 30-hari ~9.2%). Pertimbangkan rawat inap singkat di bangsal atau rawat jalan dengan pengawasan ketat.\n• Skor 3–5: Pneumonia berat (mortalitas 15%–40%). Wajib rawat inap segera; evaluasi kebutuhan ICU jika skor 4 atau 5.\n\nPneumonia Severity Index (PSI / Skor PORT) mengelompokkan pasien ke dalam 5 kelas risiko berdasarkan 20 variabel demografi, penyakit penyerta, dan parameter laboratorium. Pedoman IDSA/ATS 2019 lebih merekomendasikan penggunaan skor PSI dibanding CURB-65 karena sensitivitasnya yang lebih tinggi dalam mengidentifikasi pasien risiko rendah.',
          },
          formula: '\\text{CURB-65} = C + U + R + B + 65 \\quad \\in \\{0, 1, 2, 3, 4, 5\\}',
          formulaExplanation: {
            en: 'Mathematical addition of 5 binary indicator variables (0 or 1 point each) predicting 30-day inpatient mortality in Community-Acquired Pneumonia.',
            id: 'Penjumlahan matematis dari 5 variabel indikator biner (masing-masing 0 atau 1 poin) untuk memprediksi mortalitas 30-hari pada Pneumonia Komunitas.',
          },
        },
        {
          id: 'pne-1-sec-4',
          title: {
            en: '4. IDSA/ATS 2019 Guideline-Directed Empirical Antimicrobial Regimens',
            id: '4. Regimen Antimikroba Empiris Berdasarkan Pedoman IDSA/ATS 2019',
          },
          content: {
            en: 'The 2019 Infectious Diseases Society of America / American Thoracic Society (IDSA/ATS) Clinical Practice Guideline established clear empirical therapeutic strategies:\n\n1. Outpatient Setting (Healthy Adults without Comorbidities or Antibiotics in Past 90 Days):\n• First-Line Choice: Amoxicillin (1 g PO TID) OR Doxycycline (100 mg PO BID).\n• Macrolide Monotherapy (Azithromycin 500 mg day 1, then 250 mg daily, or Clarithromycin 500 mg BID): ONLY recommended in regions where local pneumococcal macrolide resistance is documented to be < 25%!\n\n2. Outpatient Setting (With Chronic Comorbidities: COPD, Heart Failure, Diabetes, Chronic Renal/Liver Disease, Malignancy, or Asplenia):\n• Combination Therapy: Beta-Lactam (Amoxicillin-Clavulanate 875/125 mg BID or 2000/125 mg BID, Cefpodoxime 200 mg BID, or Cefuroxime 500 mg BID) PLUS Macrolide (Azithromycin) OR Doxycycline.\n• Alternative Monotherapy: Respiratory Fluoroquinolone (Levofloxacin 750 mg daily OR Moxifloxacin 400 mg daily).\n\n3. Inpatient Non-Severe CAP:\n• Standard Combination: IV Beta-Lactam (Ampicillin-Sulbactam 1.5–3 g q6h, Ceftriaxone 1–2 g daily, Cefotaxime 1–2 g q8h) PLUS Macrolide (IV/PO Azithromycin 500 mg daily).\n• Monotherapy: Respiratory Fluoroquinolone (Levofloxacin 750 mg IV/PO daily or Moxifloxacin 400 mg IV/PO daily).\n\nKey IDSA/ATS Updates: Routine use of Procalcitonin to withhold initial antibiotics is NOT recommended (clinical judgment should prevail). Sputum and blood cultures are not mandatory for routine non-severe outpatients, but are mandatory for severe inpatient CAP or when empirical MRSA/Pseudomonas coverage is indicated.',
            id: 'Pedoman Praktik Klinis IDSA/ATS 2019 menetapkan strategi terapi antimikroba empiris yang jelas dan berbasis bukti:\n\n1. Pasien Rawat Jalan (Dewasa Tanpa Komorbiditas Signifikan & Tanpa Riwayat Antibiotik 90 Hari Terakhir):\n• Pilihan Utama: Amoksisilin (1 g oral 3x/hari) ATAU Doksisiklin (100 mg oral 2x/hari).\n• Monoterapi Makrolida (Azitromisin 500 mg hari ke-1 dilanjutkan 250 mg 1x/hari, atau Klaritromisin 500 mg 2x/hari): HANYA direkomendasikan pada populasi dengan angka resistansi pneumokokus terhadap makrolida < 25%!\n\n2. Pasien Rawat Jalan (Dengan Penyakit Penyerta Kronis: PPOK, Gagal Jantung, Diabetes, Gagal Ginjal/Hati, Keganasan, atau Asplenia):\n• Terapi Kombinasi: Beta-Laktam (Amoksisilin-Klavulanat 875/125 mg 2x/hari, Sefpodoksim 200 mg 2x/hari, atau Sefuroksim 500 mg 2x/hari) DITAMBAH Makrolida (Azitromisin) ATAU Doksisiklin.\n• Monoterapi Alternatif: Fluorokuinolon Respiratorik (Levofloksasin 750 mg 1x/hari ATAU Moksifloksasin 400 mg 1x/hari).\n\n3. Pasien Rawat Inap Non-Berat di Bangsal:\n• Terapi Kombinasi Standar: Beta-Laktam IV (Ampisilin-Sulbaktam 1.5–3 g tiap 6 jam, Seftriakson 1–2 g 1x/hari) DITAMBAH Makrolida (Azitromisin 500 mg 1x/hari IV/oral).\n• Monoterapi Alternatif: Fluorokuinolon Respiratorik IV/oral (Levofloksasin 750 mg atau Moksifloksasin 400 mg).\n\nPoin Kunci IDSA/ATS: Penggunaan rutin Prokalsitonin untuk menunda antibiotik awal TIDAK direkomendasikan. Kultur sputum dan darah diwajibkan pada pasien rawat inap pneumonia berat atau pasien dengan faktor risiko MRSA/Pseudomonas.',
          },
        },
      ],
      caseStudy: {
        title: {
          en: 'Clinical Case: Acute Lobar Consolidation in an Elderly Patient',
          id: 'Kasus Klinis: Konsolidasi Lobaris Akut pada Pasien Usia Lanjut',
        },
        context: {
          en: 'A 68-year-old male with a history of hypertension presents to the emergency department with a 3-day history of acute fever (39.1°C), pleuritic right-sided chest pain, and productive cough with rust-colored sputum. On physical exam: BP 86/54 mmHg, HR 118 bpm, RR 34 breaths/min, SpO2 88% on room air. He is disoriented to time and place. Auscultation reveals bronchial breath sounds, egophony, and coarse crackles over the right lower lung base. Laboratory workup reveals WBC 18,500/µL with 88% neutrophils, BUN 24 mg/dL (8.6 mmol/L), and serum sodium 134 mEq/L. Chest radiograph confirms dense right lower lobe consolidation with air bronchograms.',
          id: 'Seorang pria berusia 68 tahun dengan riwayat hipertensi datang ke IGD dengan keluhan demam tinggi (39.1°C) sejak 3 hari, nyeri dada pleuritik sisi kanan, dan batuk produktif berdahak merah karat. Pemeriksaan fisik: TD 86/54 mmHg, Nadi 118x/menit, Laju Napas 34x/menit, SpO2 88% udara ruangan. Pasien mengalami disorientasi waktu dan tempat. Auskultasi menunjukkan suara napas bronkial, egofoni, dan ronki basah kasar di basal paru kanan. Hasil lab: Leukosit 18.500/µL (88% neutrofil), BUN 24 mg/dL (8.6 mmol/L), dan Natrium 134 mEq/L. Foto toraks mengonfirmasi konsolidasi padat di lobus inferior paru kanan disertai air bronchogram.',
        },
        analysis: {
          en: '1. CURB-65 Calculation: Confusion (1) + Urea > 7 mmol/L (1) + RR ≥ 30 (1) + Low BP < 90/60 (1) + Age ≥ 65 (1) = Total score of 5/5, indicating severe pneumonia with an estimated 30-day mortality exceeding 30%.\n2. Pathogen: Presentation is classic for Streptococcus pneumoniae lobar pneumonia (rust-colored sputum from red hepatization diapedesis).\n3. Management: Immediate hemodynamic resuscitation with isotonic crystalloids, high-flow supplemental oxygen, obtain paired blood cultures and sputum Gram stain/culture prior to antibiotics, and immediate initiation of IV Ceftriaxone + IV Azithromycin within 1 hour. Direct admission to the Medical Intensive Care Unit (MICU) is indicated due to septic shock and acute respiratory failure.',
          id: '1. Perhitungan CURB-65: Konfusi (1) + Urea > 7 mmol/L (1) + Laju Napas ≥ 30 (1) + Hipotensi (1) + Usia ≥ 65 (1) = Skor total 5/5, mengindikasikan pneumonia sangat berat dengan risiko mortalitas 30-hari >30%.\n2. Patogen Tersering: Gambaran klinis sangat khas untuk Streptococcus pneumoniae (dahak merah karat akibat ekstravasasi eritrosit pada fase hepatisasi merah).\n3. Penatalaksanaan: Resusitasi cairan kristaloid segera, suplementasi oksigen, pengambilan kultur darah dan sputum sebelum pemberian antibiotik, serta inisiasi antibiotik intravena Seftriakson + Azitromisin dalam 1 jam pertama. Pasien harus segera dirawat di ICU karena mengalami syok septik dan gagal napas akut.',
        },
        takeaway: {
          en: 'A CURB-65 score of ≥3 demands immediate inpatient care with continuous hemodynamic and respiratory monitoring.',
          id: 'Skor CURB-65 ≥3 memerlukan perawatan rawat inap intensif segera dengan pemantauan hemodinamik dan saturasi oksigen ketat.',
        },
      },
      quiz: [
        {
          id: 'pne-q1-1',
          question: {
            en: 'A 67-year-old female presents with acute fever and productive cough. Her vital signs are: BP 84/52 mmHg, RR 32/min, HR 105 bpm. She is oriented x3. Laboratory testing reveals BUN 26 mg/dL (9.3 mmol/L). What is her CURB-65 score and recommended initial disposition?',
            id: 'Wanita berusia 67 tahun datang dengan demam akut dan batuk produktif. Tanda vital: TD 84/52 mmHg, RR 32x/menit, Nadi 105x/menit. Pasien sadar penuh (kompos mentis). Hasil laboratorium: BUN 26 mg/dL (9.3 mmol/L). Berapakah skor CURB-65 pasien dan disposisi awal yang direkomendasikan?',
          },
          options: {
            en: [
              'Score 2; Outpatient therapy with oral amoxicillin',
              'Score 3; Hospital admission for inpatient monitoring',
              'Score 4; Urgent admission to inpatient care / consider ICU',
              'Score 1; Discharge with oral azithromycin monotherapy',
            ],
            id: [
              'Skor 2; Rawat jalan dengan amoksisilin oral',
              'Skor 3; Rawat inap di bangsal umum',
              'Skor 4; Rawat inap segera / pertimbangkan evaluasi ICU',
              'Skor 1; Rawat jalan dengan monoterapi azitromisin oral',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Points awarded: Confusion = 0 (she is oriented), Urea > 7 mmol/L = 1 (BUN is 9.3 mmol/L), Respiratory Rate ≥ 30 = 1 (RR 32), Blood pressure < 90/60 = 1 (BP 84/52), Age ≥ 65 = 1 (age 67). Total CURB-65 score = 4. Scores 3–5 signify severe pneumonia with high mortality risk, requiring urgent inpatient admission with critical care evaluation.',
            id: 'Poin yang diperoleh: Konfusi = 0 (sadar penuh), Urea > 7 mmol/L = 1 (BUN 9.3 mmol/L), RR ≥ 30 = 1 (RR 32), Tekanan Darah < 90/60 = 1 (TD 84/52), Usia ≥ 65 = 1 (usia 67). Total skor CURB-65 = 4. Skor 3–5 mengindikasikan pneumonia berat dengan risiko mortalitas tinggi yang memerlukan rawat inap segera dan evaluasi perawatan intensif.',
          },
        },
        {
          id: 'pne-q1-2',
          question: {
            en: 'During which histopathological phase of lobar pneumonia is the affected pulmonary lobe characterized by extravasated neutrophils, extensive polymerized fibrin, and intact red blood cells conferring a firm, liver-like consistency?',
            id: 'Pada tahap histopatologis manakah dari pneumonia lobaris lobus paru yang terdampak ditandai dengan ekstravasasi neutrofil, jaring fibrin terpolimerisasi, dan eritrosit utuh yang memberikan konsistensi padat menyerupai organ hati?',
          },
          options: {
            en: [
              'Congestion phase',
              'Red hepatization phase',
              'Gray hepatization phase',
              'Resolution phase',
            ],
            id: [
              'Fase kongesti',
              'Fase hepatisasi merah',
              'Fase hepatisasi kelabu',
              'Fase resolusi',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Red hepatization (days 2–4) is characterized by mass neutrophil and erythrocyte diapedesis with fibrin mesh formation inside the alveoli, creating a dark red, firm, liver-like consistency. Gray hepatization follows when erythrocytes hemolyze.',
            id: 'Hepatisasi merah (hari ke-2 hingga 4) ditandai dengan diapedesis masif neutrofil dan eritrosit disertai pembentukan jaring-jaring fibrin di dalam lumen alveolus, menghasilkan konsistensi padat berwarna merah gelap menyerupai hati. Hepatisasi kelabu terjadi setelah eritrosit mengalami lisis.',
          },
        },
        {
          id: 'pne-q1-3',
          question: {
            en: 'According to the 2019 IDSA/ATS guidelines, which of the following is recommended as FIRST-LINE outpatient therapy for a healthy 34-year-old adult with Community-Acquired Pneumonia and no chronic comorbidities or recent antibiotic use?',
            id: 'Berdasarkan pedoman IDSA/ATS 2019, manakah pilihan terapi lini pertama rawat jalan yang direkomendasikan untuk pasien dewasa usia 34 tahun tanpa komorbiditas kronis dan tanpa riwayat antibiotik 90 hari terakhir?',
          },
          options: {
            en: [
              'Oral Ciprofloxacin 500 mg BID',
              'Oral Amoxicillin 1 g TID or Oral Doxycycline 100 mg BID',
              'Intravenous Vancomycin + Piperacillin-Tazobactam',
              'Oral Azithromycin monotherapy regardless of regional macrolide resistance rates',
            ],
            id: [
              'Siprofloksasin oral 500 mg 2x/hari',
              'Amoksisilin oral 1 g 3x/hari atau Doksisiklin oral 100 mg 2x/hari',
              'Vankomisin intravena + Piperasilin-Tazobaktam',
              'Monoterapi Azitromisin oral tanpa memandang tingkat resistansi lokal',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'The 2019 IDSA/ATS guidelines recommend high-dose Amoxicillin (1 g TID) or Doxycycline (100 mg BID) as first-line empiric monotherapy in healthy outpatients. Macrolide monotherapy is only conditionally recommended if local pneumococcal macrolide resistance is documented <25%. Ciprofloxacin is NOT a respiratory fluoroquinolone and should not be used for pneumococcus.',
            id: 'Pedoman IDSA/ATS 2019 merekomendasikan Amoksisilin dosis tinggi (1 g 3x/hari) atau Doksisiklin (100 mg 2x/hari) sebagai lini pertama untuk pasien rawat jalan tanpa komorbiditas. Monoterapi makrolida hanya boleh diberikan jika resistansi pneumokokus lokal terhadap makrolida terbukti <25%. Siprofloksasin bukan merupakan fluorokuinolon respiratorik dan tidak efektif untuk Streptococcus pneumoniae.',
          },
        },
        {
          id: 'pne-q1-4',
          question: {
            en: 'A 28-year-old graduate student presents with dry hacking cough, low-grade fever, fatigue, and headache. Chest auscultation is unremarkable, but chest radiograph reveals prominent bilateral interstitial infiltrates. Laboratory testing reveals cold agglutinin titers of 1:128. What is the most likely pathogen?',
            id: 'Mahasiswa usia 28 tahun mengeluhkan batuk kering, demam sumeng-sumeng, lemas, dan sakit kepala. Pemeriksaan fisik dada normal, namun foto toraks menunjukkan infiltrat retikulonodular bilateral yang nyata. Hasil lab menunjukkan titer aglutinin dingin (cold agglutinin) 1:128. Apakah patogen yang paling mungkin?',
          },
          options: {
            en: [
              'Streptococcus pneumoniae',
              'Mycoplasma pneumoniae',
              'Klebsiella pneumoniae',
              'Pseudomonas aeruginosa',
            ],
            id: [
              'Streptococcus pneumoniae',
              'Mycoplasma pneumoniae',
              'Klebsiella pneumoniae',
              'Pseudomonas aeruginosa',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'Mycoplasma pneumoniae classically causes atypical "walking pneumonia" in adolescents and young adults, characterized by a discrepancy between mild physical findings and extensive bilateral radiographic infiltrates, accompanied by cold agglutinin IgM autoantibodies against erythrocyte I-antigens.',
            id: 'Mycoplasma pneumoniae secara klasik menyebabkan "walking pneumonia" pada dewasa muda, dengan ketidaksesuaian antara gejala klinis fisik yang ringan dengan infiltrat radiologis bilateral yang luas, disertai pembentukan autoantibodi IgM aglutinin dingin terhadap antigen I eritrosit.',
          },
        },
        {
          id: 'pne-q1-5',
          question: {
            en: 'Why does severe lobar pneumonia lead to arterial hypoxemia that is relatively refractory to supplemental oxygen therapy compared to simple hypoventilation?',
            id: 'Mengapa pneumonia lobaris berat menyebabkan hipoksemia arterial yang relatif refrakter terhadap suplementasi oksigen dibandingkan hipoventilasi sederhana?',
          },
          options: {
            en: [
              'Exudative alveolar consolidation creates true intrapulmonary shunting (V/Q = 0) where mixed venous blood bypasses ventilated lung units',
              'It causes isolated carbon monoxide poisoning of hemoglobin',
              'The alveolar-capillary membrane becomes impermeable to carbon dioxide while maintaining oxygen transport',
              'Alveolar surfactant production increases exponentially, preventing oxygen diffusion',
            ],
            id: [
              'Konsolidasi alveolar eksudatif menciptakan pirau intrapulmonal sejati (V/Q = 0) di mana darah vena campuran melewati unit alveolus tanpa pertukaran gas',
              'Terjadi keracunan karbon monoksida terisolasi pada hemoglobin',
              'Membran alveolar-kapiler menjadi tidak permeable terhadap CO2 sementara transpor O2 tetap berlangsung',
              'Produksi surfaktan alveolar meningkat secara berlebihan sehingga menghambat difusi oksigen',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'When alveoli are completely filled with inflammatory exudate, alveolar ventilation drops to zero while perfusion continues (V/Q = 0, right-to-left intrapulmonary shunt). Deoxygenated blood passes through non-ventilated alveoli unchanged; supplemental oxygen cannot reach these alveoli, making the shunt fraction refractory to 100% FiO2.',
            id: 'Ketika alveoli terisi penuh oleh eksudat inflamasi, ventilasi alveolar menjadi nol sementara perfusi kapiler terus mengalir (V/Q = 0, pirau intrapulmonal kanan-ke-kiri). Darah vena yang melewati alveoli ini tidak mendapatkan oksigen; suplementasi oksigen tidak dapat menembus eksudat padat tersebut, sehingga fraksi pirau menjadi refrakter terhadap peningkatan FiO2.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 2: HOSPITAL-ACQUIRED (HAP) & VENTILATOR-ASSOCIATED (VAP)
    // -------------------------------------------------------------
    {
      id: 'pne-mod-2',
      topicId: 'pulmonology-pneumonia',
      order: 2,
      title: {
        en: 'Hospital-Acquired (HAP) & Ventilator-Associated Pneumonia (VAP)',
        id: 'Pneumonia Nosokomial (HAP) & Terkait Ventilator (VAP)',
      },
      shortDescription: {
        en: 'Nosocomial epidemiology, endotracheal biofilm, MDR pathogens (Pseudomonas, MRSA, Acinetobacter), and IDSA/ATS 2016 guidelines.',
        id: 'Epidemiologi nosokomial, biofilm pipa endotrakeal, patogen MDR (Pseudomonas, MRSA, Acinetobacter), dan pedoman IDSA/ATS 2016.',
      },
      durationMinutes: 22,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'pulmonary-alveoli',
      sections: [
        {
          id: 'pne-2-sec-1',
          title: {
            en: '1. Nosocomial Definitions & Microaspiration Pathophysiology',
            id: '1. Definisi Nosokomial & Patofisiologi Mikroaspirasi',
          },
          content: {
            en: 'Hospital-Acquired Pneumonia (HAP) is defined as pneumonia occurring ≥ 48 hours after hospital admission that was not incubating at the time of admission.\nVentilator-Associated Pneumonia (VAP) is a distinct subset of HAP that develops ≥ 48 hours following endotracheal intubation and mechanical ventilation.\n\nPathogenesis & Endotracheal Biofilm:\n1. Oropharyngeal Colonization: Within 48 hours of hospital admission, the normal resident oropharyngeal flora (viridans streptococci) is replaced by virulent aerobic Gram-negative bacilli and Staphylococcus aureus, particularly in critically ill patients receiving broad-spectrum antibiotics, acid-suppressive therapy (H2-blockers, proton pump inhibitors that raise gastric pH and foster gastric bacterial overgrowth), or enteral tube feeding.\n2. Microaspiration Around Endotracheal Tube Cuff: Endotracheal tubes bypass the host\'s natural upper airway defense mechanisms (glottic closure, cough reflex, humidification). Subglottic secretions pool directly above the inflated tube cuff. Micro-channels in the cuff folds allow intermittent leakage of colonized secretions into the lower tracheobronchial tree.\n3. Endotracheal Biofilm Formation: Bacteria rapidly adhere to the synthetic polyvinyl chloride (PVC) inner lumen of the endotracheal tube, secreting an extracellular polysaccharide matrix (slime biofilm). During mechanical ventilator tidal cycles and suctioning catheters, microscopic fragments of the biofilm dislodge and embolize into distal lung units, causing acute bronchopneumonia.',
            id: 'Pneumonia Nosokomial (Hospital-Acquired Pneumonia / HAP) didefinisikan sebagai pneumonia yang terjadi ≥ 48 jam setelah pasien dirawat di rumah sakit dan tidak sedang dalam masa inkubasi saat admisi.\nPneumonia Terkait Ventilator (Ventilator-Associated Pneumonia / VAP) adalah subkelompok spesifik HAP yang terjadi ≥ 48 jam pasca intubasi endotrakeal dan pemasangan ventilasi mekanis.\n\nPatogenesis & Biofilm Pipa Endotrakeal:\n1. Kolonisasi Orofaring: Dalam waktu 48 jam setelah masuk rumah sakit, flora normal orofaring digantikan oleh bakteri Gram-negatif aerobik virulen dan Staphylococcus aureus, terutama pada pasien kritis yang menerima terapi penekan asam lambung (PPI atau H2 blocker yang menaikkan pH lambung dan memicu proliferasi kuman lambung).\n2. Mikroaspirasi di Sekitar Cuff Pipa Endotrakeal: Pipa endotrakeal melumpuhkan pertahanan alami saluran napas (refleks batuk, penutupan glotis). Sekret subglotis menumpuk di atas balon cuff endotrakeal. Lipatan mikro pada cuff memungkinkan kebocoran sekret yang terkontaminasi ke percabangan trakeobronkial distal.\n3. Pembentukan Biofilm Endotrakeal: Bakteri menempel pada lumen pipa PVC endotrakeal dan membentuk matriks ekstraseluler pelindung (biofilm). Turbulensi aliran ventilator dan kateter suction melepaskan fragmen biofilm ini ke bronkiolus dan alveoli, memicu bronkopneumonia purulen akut.',
          },
          formula: '\\text{CPIS} = \\text{Temp} + \\text{WBC} + \\text{Secretions} + \\text{PaO}_2/\\text{FiO}_2 + \\text{Radiograph} + \\text{Microbiology}',
          formulaExplanation: {
            en: 'The Clinical Pulmonary Infection Score (CPIS) integrates 6 clinical, physiological, and microbiological variables (range 0–12). A score > 6 strongly suggests the presence of Ventilator-Associated Pneumonia (VAP).',
            id: 'Clinical Pulmonary Infection Score (CPIS) mengintegrasikan 6 variabel klinis, fisiologis, dan mikrobiologis (rentang skor 0–12). Skor > 6 sangat mendukung diagnosis Pneumonia Terkait Ventilator (VAP).',
          },
          variables: [
            {
              symbol: '\\text{Temp}',
              name: { en: 'Core Body Temperature Score', id: 'Skor Suhu Tubuh Inti' },
              unit: '0 to 2 points',
              description: {
                en: 'Points awarded for hypothermia (<36°C) or fever (>38.4°C or >38.9°C).',
                id: 'Poin untuk hipotermia (<36°C) atau demam (>38.4°C atau >38.9°C).',
              },
            },
            {
              symbol: '\\text{WBC}',
              name: { en: 'Leukocyte Count Score', id: 'Skor Hitung Leukosit' },
              unit: '0 to 2 points',
              description: {
                en: 'Points for normal vs leukopenia (<4,000) or severe leukocytosis (>11,000).',
                id: 'Poin untuk leukopenia (<4.000/µL) atau leukositosis (>11.000/µL).',
              },
            },
            {
              symbol: '\\text{PaO}_2/\\text{FiO}_2',
              name: { en: 'Oxygenation Index Score', id: 'Skor Indeks Oksigenasi' },
              unit: '0 or 2 points',
              description: {
                en: '2 points if PaO2/FiO2 ≤ 240 in the absence of ARDS.',
                id: '2 poin jika rasio PaO2/FiO2 ≤ 240 tanpa adanya bukti ARDS primer.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'HAP and VAP occur ≥48 hours after hospital admission or endotracheal intubation, respectively.',
              'Endotracheal tube cuff micro-aspiration and intraluminal biofilm dislodgement are the primary drivers of VAP.',
              'Multidrug-Resistant (MDR) Gram-negative bacilli and MRSA dominate the nosocomial microbiological spectrum.',
            ],
            id: [
              'HAP dan VAP masing-masing terjadi ≥48 jam setelah admisi rumah sakit atau pasca intubasi.',
              'Mikroaspirasi di sekitar balon cuff pipa endotrakeal dan pelepasan biofilm lumen adalah pemicu utama VAP.',
              'Basil Gram-negatif MDR dan MRSA mendominasi spektrum mikrobiologis infeksi nosokomial paru.',
            ],
          },
        },
        {
          id: 'pne-2-sec-2',
          title: {
            en: '2. Multidrug-Resistant (MDR) Pathogens & Resistance Mechanisms',
            id: '2. Patogen Resistan Banyak Obat (MDR) & Mekanisme Resistansi',
          },
          content: {
            en: 'The microbiological landscape of HAP/VAP is dominated by the ESCAPE pathogens, characterized by complex chromosomal and plasmid-mediated resistance mechanisms:\n\n1. Pseudomonas aeruginosa:\n• Virulence: Exotoxin A (inhibits EF-2 protein synthesis, identical mechanism to diphtheria toxin), elastase (degrades pulmonary elastin and collagen), and pyocyanin (induces oxidative epithelial damage).\n• Mechanisms of Resistance: Derepression of chromosomal AmpC beta-lactamase, active multidrug efflux pumps (MexAB-OprM), loss of OprD outer membrane porin channels (causing imipenem resistance), and metallo-beta-lactamases (NDM, VIM).\n\n2. Methicillin-Resistant Staphylococcus aureus (MRSA):\n• Virulence: Alpha-hemolysin, leukocidins, and tissue-destructive proteases.\n• Resistance: Acquired mecA or mecC gene encoding Penicillin-Binding Protein 2a (PBP2a), which possesses extremely low binding affinity for virtually all standard beta-lactam antibiotics.\n\n3. Acinetobacter baumannii:\n• Highly persistent environmental survivor capable of desiccation resistance on hospital surfaces. Frequently Carbapenem-Resistant (CRAB) through carbapenem-hydrolyzing class D oxacillinases (OXA-23, OXA-24/40, OXA-58) and metallo-beta-lactamases.\n\n4. Enterobacterales (Klebsiella pneumoniae, Enterobacter cloacae, Escherichia coli):\n• Extended-Spectrum Beta-Lactamases (ESBLs: CTX-M, SHV, TEM) hydrolyzing penicillins and cephalosporins.\n• Carbapenemase producers (KPC, NDM, OXA-48), requiring novel beta-lactamase inhibitor combinations (Ceftazidime-Avibactam, Meropenem-Vaborbactam).',
            id: 'Lanskap mikrobiologis HAP/VAP didominasi oleh patogen nosokomial dengan mekanisme resistansi kompleks yang dimediasi oleh kromosom maupun plasmid:\n\n1. Pseudomonas aeruginosa:\n• Virulensi: Eksotoksin A (menghambat sintesis protein melalui inaktivasi EF-2), elastase (menghancurkan serat elastin dan kolagen alveolar), serta piosianin (memicu stres oksidatif pada epitel napas).\n• Mekanisme Resistansi: Derepresi enzim AmpC beta-laktamase kromosomal, pompa efluks obat aktif (MexAB-OprM), mutasi/kehilangan porin membran luar OprD (memicu resistansi imipenem), dan enzim metallo-beta-laktamase.\n2. Methicillin-Resistant Staphylococcus aureus (MRSA):\n• Virulensi: Alfa-toksin, leukosidin, dan enzim proteolitik.\n• Mekanisme Resistansi: Akuisisi gen mecA yang mengkode Penicillin-Binding Protein 2a (PBP2a), yang memiliki afinitas ikatan sangat rendah terhadap hampir seluruh antibiotik golongan beta-laktam.\n3. Acinetobacter baumannii:\n• Mampu bertahan hidup dalam jangka panjang di permukaan kering ruang rawat ICU. Sering resistan terhadap karbapenem (CRAB) melalui enzim karbapenemase kelas D (OXA-23, OXA-24) dan pompa efluks.\n4. Enterobacterales (Klebsiella pneumoniae, E. coli):\n• Penghasil Extended-Spectrum Beta-Lactamase (ESBL: CTX-M) yang menghidrolisis penisilin dan sefalosporin.\n• Penghasil enzim karbapenemase (KPC, NDM), yang membutuhkan kombinasi antibiotik baru seperti Seftazidim-Avibaktam.',
          },
        },
        {
          id: 'pne-2-sec-3',
          title: {
            en: '3. IDSA/ATS 2016 Guideline Empirical Treatment Algorithm for HAP/VAP',
            id: '3. Algoritma Terapi Empiris HAP/VAP Berdasarkan Pedoman IDSA/ATS 2016',
          },
          content: {
            en: 'The IDSA/ATS 2016 Guidelines recommend empirical regimens tailored strictly to individual risk factors for MDR pathogens and mortality:\n\n1. Risk Factors for MDR Pathogens in VAP:\n• Prior intravenous antibiotic use within the preceding 90 days.\n• Septic shock at the time of VAP onset.\n• Acute Respiratory Distress Syndrome (ARDS) preceding VAP.\n• Hospitalization of ≥ 5 days prior to the occurrence of VAP.\n• Acute renal replacement therapy prior to VAP onset.\n\n2. Empirical Regimen Construction:\n• MRSA Coverage: Add Vancomycin (15 mg/kg IV q8–12h with AUC-targeted dosing) OR Linezolid (600 mg IV q12h) if patient has risk factors for MDR, or if local ICU prevalence of S. aureus isolates that are methicillin-resistant exceeds 10–20%.\n• Dual Antipseudomonal Coverage: Prescribe two antipseudomonal agents from DIFFERENT classes (to avoid shared resistance) for patients with high risk of mortality, prior IV antibiotics in 90 days, or in ICUs where Gram-negative isolate resistance exceeds 10%:\n  - Agent 1 (Antipseudomonal Beta-Lactam): Piperacillin-Tazobactam (4.5 g IV q6h by extended infusion), Cefepime (2 g IV q8h), Ceftazidime (2 g IV q8h), Meropenem (1 g IV q8h), or Imipenem (500 mg IV q6h).\n  - Agent 2 (Non-Beta-Lactam Antipseudomonal): Fluoroquinolone (Ciprofloxacin 400 mg IV q8h or Levofloxacin 750 mg IV daily) OR Aminoglycoside (Amikacin 15–20 mg/kg daily or Gentamicin/Tobramycin 5–7 mg/kg daily) OR Polymyxin (Colistin/Polymyxin B in suspected carbapenemase producers).\n\n3. Duration of Therapy: A 7-day course of antimicrobial therapy is recommended for patients with uncomplicated HAP/VAP showing clinical improvement, reducing selective antimicrobial resistance pressure.',
            id: 'Pedoman IDSA/ATS 2016 merekomendasikan pemilihan regimen empiris yang disesuaikan secara ketat dengan faktor risiko resistansi MDR dan mortalitas:\n\n1. Faktor Risiko Patogen MDR pada VAP:\n• Penggunaan antibiotik intravena dalam 90 hari terakhir.\n• Adanya syok septik saat awitan VAP.\n• Terjadinya ARDS sebelum awitan VAP.\n• Lama rawat inap ≥ 5 hari sebelum timbulnya VAP.\n• Terapi pengganti ginjal akut (hemodialisis) sebelum awitan VAP.\n\n2. Struktur Regimen Empiris Komprehensif:\n• Cakupan MRSA: Berikan Vankomisin (15 mg/kg IV tiap 8–12 jam target AUC/MIC 400–600) ATAU Linezolid (600 mg IV tiap 12 jam) bila terdapat faktor risiko MDR atau prevalensi MRSA di ICU lokal >10–20%.\n• Cakupan Ganda Antipseudomonas: Berikan dua antibiotik antipseudomonas dari KELAS BERBEDA untuk pasien dengan risiko mortalitas tinggi atau riwayat antibiotik 90 hari terakhir:\n  - Agen 1 (Beta-Laktam Antipseudomonas): Piperasilin-Tazobaktam (4.5 g IV tiap 6 jam infus bertahap), Sefepim (2 g IV tiap 8 jam), Meropenem (1 g IV tiap 8 jam), atau Seftazidim (2 g IV tiap 8 jam).\n  - Agen 2 (Non-Beta-Laktam Antipseudomonas): Fluorokuinolon (Siprofloksasin 400 mg IV tiap 8 jam atau Levofloksasin 750 mg IV 1x/hari) ATAU Aminoglikosida (Amikasin 15–20 mg/kg 1x/hari).\n\n3. Durasi Terapi: Durasi antibiotik selama 7 hari direkomendasikan untuk pasien HAP/VAP tanpa komplikasi yang menunjukkan perbaikan klinis, guna menekan timbulnya resistansi kuman.',
          },
        },
      ],
      caseStudy: {
        title: {
          en: 'Clinical Case: New Infiltrate in an Intubated ICU Patient',
          id: 'Kasus Klinis: Infiltrat Baru pada Pasien ICU Terintubasi',
        },
        context: {
          en: 'A 56-year-old male involved in a polytrauma motor vehicle collision has been mechanically ventilated in the ICU for 8 days. He received empirical Ceftriaxone for a contaminated open tibial fracture during days 1–3. On day 8, he develops new purulent endotracheal secretions, a temperature spike to 39.3°C, and worsening oxygenation: PaO2/FiO2 decreases from 320 to 165 on PEEP 10 cmH2O. Suctioning reveals thick greenish secretions. WBC has increased from 8,200/µL to 21,400/µL. A portable chest radiograph demonstrates a new progressive bilateral lower lobe patchy alveolar infiltrates not present on previous imaging.',
          id: 'Pria berusia 56 tahun korban kecelakaan lalu lintas dengan politrauma telah dirawat di ICU dengan ventilasi mekanis selama 8 hari. Pasien sempat menerima Seftriakson profilaksis pada hari ke 1–3 untuk fraktur terbuka tibia. Pada hari ke-8, perawat melaporkan sekret endotrakeal berubah menjadi purulen kental kehijauan, suhu tubuh melonjak hingga 39.3°C, dan oksigenasi memburuk: rasio PaO2/FiO2 merosot dari 320 menjadi 165 pada PEEP 10 cmH2O. Leukosit melonjak dari 8.200/µL menjadi 21.400/µL. Foto toraks serial menunjukkan infiltrat alveolar bercak baru di lobus inferior bilateral.',
        },
        analysis: {
          en: '1. Diagnosis: Ventilator-Associated Pneumonia (VAP) occurring >48 hours after intubation (onset on day 8 = late-onset VAP).\n2. Risk Factors for MDR Pathogens: Hospitalization >5 days and prior broad-spectrum intravenous cephalosporin antibiotic exposure in past 90 days.\n3. Regimen Selection per IDSA/ATS 2016: Requires triple coverage incorporating: (a) MRSA agent (Vancomycin with AUC monitoring or Linezolid); (b) Antipseudomonal beta-lactam (Meropenem 1 g IV q8h or Cefepime 2 g IV q8h); and (c) Second antipseudomonal agent from a non-beta-lactam class (Amikacin 20 mg/kg IV daily or Ciprofloxacin 400 mg IV q8h).\n4. Diagnostics: Perform quantitative endotracheal aspirate (threshold ≥ 10^5 CFU/mL) or bronchoalveolar lavage (BAL, threshold ≥ 10^4 CFU/mL) prior to starting new antibiotic therapy.',
          id: '1. Diagnosis: Ventilator-Associated Pneumonia (VAP) yang muncul >48 jam pasca intubasi (awitan hari ke-8 = late-onset VAP).\n2. Faktor Risiko Patogen MDR: Lama rawat ICU >5 hari dan riwayat paparan antibiotik sefalosporin intravena dalam 90 hari terakhir.\n3. Regimen Sesuai IDSA/ATS 2016: Wajib mencakup terapi kombinasi tiga obat: (a) Agen anti-MRSA (Vankomisin atau Linezolid); (b) Beta-laktam antipseudomonas (Meropenem 1 g IV tiap 8 jam atau Sefepim 2 g IV tiap 8 jam); dan (c) Agen antipseudomonas kedua dari kelas berbeda (Amikasin 20 mg/kg IV atau Siprofloksasin 400 mg IV tiap 8 jam).\n4. Penegakan Diagnosis: Lakukan aspirat endotrakeal kuantitatif (nilai ambang ≥ 10^5 CFU/mL) atau bronchoalveolar lavage (BAL, ambang ≥ 10^4 CFU/mL) sebelum dosis pertama antibiotik baru.',
        },
        takeaway: {
          en: 'Late-onset VAP with prior antibiotic exposure mandates dual antipseudomonal coverage plus a dedicated anti-MRSA agent.',
          id: 'VAP awitan lanjut dengan riwayat antibiotik mewajibkan cakupan ganda antipseudomonas ditambah agen anti-MRSA.',
        },
      },
      quiz: [
        {
          id: 'pne-q2-1',
          question: {
            en: 'Which of the following defines Hospital-Acquired Pneumonia (HAP) according to the IDSA/ATS consensus definitions?',
            id: 'Manakah dari pernyataan berikut yang mendefinisikan Hospital-Acquired Pneumonia (HAP) sesuai konsensus IDSA/ATS?',
          },
          options: {
            en: [
              'Pneumonia occurring ≥ 48 hours after hospital admission that was not present at the time of admission',
              'Pneumonia developing within 12 hours of admission in a patient with a nursing home residence',
              'Pneumonia occurring strictly in the emergency department prior to ward transfer',
              'Pneumonia acquired in a school or daycare facility',
            ],
            id: [
              'Pneumonia yang terjadi ≥ 48 jam setelah admisi rumah sakit dan tidak sedang dalam masa inkubasi saat masuk',
              'Pneumonia yang berkembang dalam 12 jam setelah masuk pada pasien panti jompo',
              'Pneumonia yang didapat di instalasi gawat darurat sebelum transfer ke bangsal',
              'Pneumonia yang didapat di lingkungan sekolah atau tempat penitipan anak',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'HAP is defined as pneumonia developing 48 hours or more after hospital admission that was not incubating upon hospital entry. Pneumonia occurring ≥48 hours after endotracheal intubation is specifically classified as VAP.',
            id: 'HAP didefinisikan sebagai pneumonia yang timbul 48 jam atau lebih setelah pasien masuk rumah sakit dan tidak sedang berinkubasi saat awal dirawat. Bila terjadi ≥48 jam pasca intubasi endotrakeal, maka diklasifikasikan sebagai VAP.',
          },
        },
        {
          id: 'pne-q2-2',
          question: {
            en: 'Which genetic element in Methicillin-Resistant Staphylococcus aureus (MRSA) encodes the low-affinity Penicillin-Binding Protein 2a (PBP2a), conferring cross-resistance to almost all standard beta-lactams?',
            id: 'Elemen genetik manakah pada Methicillin-Resistant Staphylococcus aureus (MRSA) yang mengkode Penicillin-Binding Protein 2a (PBP2a) berdaya ikat rendah, memicu resistansi silang terhadap hampir seluruh beta-laktam standar?',
          },
          options: {
            en: [
              'vanA gene cluster',
              'mecA gene located on the Staphylococcal Cassette Chromosome (SCCmec)',
              'blaNDM-1 metallo-beta-lactamase',
              'rpoB RNA polymerase subunit gene',
            ],
            id: [
              'Klaster gen vanA',
              'Gen mecA yang terletak pada Staphylococcal Cassette Chromosome (SCCmec)',
              'Metallo-beta-laktamase blaNDM-1',
              'Gen subunit RNA polimerase rpoB',
            ],
          },
          correctAnswerIndex: 1,
          explanation: {
            en: 'The mecA gene (carried on the mobile genetic element SCCmec) encodes PBP2a, an altered transpeptidase with low binding affinity for beta-lactam rings, rendering all penicillins, cephalosporins (except ceftaroline), and carbapenems ineffective.',
            id: 'Gen mecA (yang dibawa oleh transposon kromosomal SCCmec) mengkode PBP2a, yaitu enzim transpeptidase teralterasi dengan afinitas ikatan sangat rendah terhadap cincin beta-laktam, menyebabkan seluruh penisilin, sefalosporin standar, dan karbapenem tidak dapat menghambat sintesis dinding selnya.',
          },
        },
        {
          id: 'pne-q2-3',
          question: {
            en: 'In an ICU patient with Ventilator-Associated Pneumonia, which of the following pairs represents two antipseudomonal agents from the SAME antimicrobial class that should NOT be combined for empiric dual Gram-negative coverage?',
            id: 'Pada pasien ICU dengan Ventilator-Associated Pneumonia, pasangan antibiotik antipseudomonas manakah yang berasal dari KELAS YANG SAMA sehingga TIDAK boleh dikombinasikan untuk terapi ganda empiris?',
          },
          options: {
            en: [
              'Cefepime plus Amikacin',
              'Piperacillin-Tazobactam plus Ciprofloxacin',
              'Meropenem plus Cefepime',
              'Ceftazidime plus Levofloxacin',
            ],
            id: [
              'Sefepim ditambah Amikasin',
              'Piperasilin-Tazobaktam ditambah Siprofloksasin',
              'Meropenem ditambah Sefepim',
              'Seftazidim ditambah Levofloksasin',
            ],
          },
          correctAnswerIndex: 2,
          explanation: {
            en: 'Meropenem and Cefepime are both beta-lactam antibiotics. Combining two beta-lactams shares resistance mechanisms (such as AmpC derepression, ESBLs, or efflux pumps) and provides no synergistic benefit. IDSA/ATS guidelines explicitly mandate choosing two antipseudomonal agents from DIFFERENT classes (e.g., Beta-lactam + Fluoroquinolone or Beta-lactam + Aminoglycoside).',
            id: 'Meropenem (karbapenem) dan Sefepim (sefalosporin) keduanya tergolong kelas antibiotik beta-laktam. Mengombinasikan dua beta-laktam memiliki mekanisme resistansi yang sama dan tidak memberikan efek sinergis. Pedoman IDSA/ATS mewajibkan pemilihan dua agen dari KELAS BERBEDA (mis. Beta-laktam + Aminoglikosida atau Beta-laktam + Fluorokuinolon).',
          },
        },
        {
          id: 'pne-q2-4',
          question: {
            en: 'What is the diagnostic quantitative bacterial colony threshold for establishing Ventilator-Associated Pneumonia via Bronchoalveolar Lavage (BAL)?',
            id: 'Berapakah nilai ambang batas hitung koloni bakteri kuantitatif untuk menegakkan diagnosis VAP melalui Bronchoalveolar Lavage (BAL)?',
          },
          options: {
            en: [
              '≥ 10^4 CFU/mL',
              '≥ 10^2 CFU/mL',
              '≥ 10^6 CFU/mL',
              '≥ 10^8 CFU/mL',
            ],
            id: [
              '≥ 10^4 CFU/mL',
              '≥ 10^2 CFU/mL',
              '≥ 10^6 CFU/mL',
              '≥ 10^8 CFU/mL',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The diagnostic threshold for Bronchoalveolar Lavage (BAL) is ≥ 10^4 colony-forming units (CFU)/mL. For protected specimen brush (PSB), it is ≥ 10^3 CFU/mL, and for non-invasive endotracheal aspirates, it is ≥ 10^5 CFU/mL.',
            id: 'Nilai ambang diagnostik kuantitatif untuk Bronchoalveolar Lavage (BAL) adalah ≥ 10^4 colony-forming units (CFU)/mL. Untuk protected specimen brush (PSB) ambangnya adalah ≥ 10^3 CFU/mL, sedangkan untuk aspirat endotrakeal non-invasif adalah ≥ 10^5 CFU/mL.',
          },
        },
        {
          id: 'pne-q2-5',
          question: {
            en: 'According to the IDSA/ATS 2016 guidelines, what is the recommended duration of antibiotic therapy for patients with uncomplicated HAP/VAP who show prompt clinical improvement?',
            id: 'Berdasarkan pedoman IDSA/ATS 2016, berapakah durasi terapi antibiotik yang direkomendasikan untuk pasien HAP/VAP tanpa komplikasi yang menunjukkan respons perbaikan klinis cepat?',
          },
          options: {
            en: [
              '7 days',
              '14 to 21 days',
              '3 days',
              '28 days',
            ],
            id: [
              '7 hari',
              '14 hingga 21 hari',
              '3 hari',
              '28 hari',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'A 7-day duration of antimicrobial therapy is strongly recommended for uncomplicated HAP/VAP showing clinical improvement, as trials demonstrate equivalent clinical cure rates, reduced hospital length of stay, and significantly fewer superinfections with drug-resistant organisms compared to 14-day courses.',
            id: 'Durasi terapi antibiotik selama 7 hari sangat direkomendasikan untuk HAP/VAP tanpa komplikasi yang membaik secara klinis. Uji klinis membuktikan angka kesembuhan yang setara dengan durasi 14 hari, namun dengan angka re-infeksi resistan obat dan efek samping yang jauh lebih rendah.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 3: TUBERCULOSIS (TB) & MYCOBACTERIAL PATHOGENESIS
    // -------------------------------------------------------------
    {
      id: 'pne-mod-3',
      topicId: 'pulmonology-pneumonia',
      order: 3,
      title: {
        en: 'Pulmonary Tuberculosis (TB) & Mycobacterial Pathogenesis',
        id: 'Tuberkulosis Paru & Patogenesis Mikobakterial',
      },
      shortDescription: {
        en: 'Mycobacterium tuberculosis immunopathology, caseating granuloma, GeneXpert NAAT, and WHO/ATS 2024 therapeutic regimens.',
        id: 'Imunopatologi Mycobacterium tuberculosis, granuloma kaseosa, NAAT GeneXpert, dan regimen tatalaksana WHO/ATS 2024.',
      },
      durationMinutes: 24,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'pulmonary-alveoli',
      sections: [
        {
          id: 'pne-3-sec-1',
          title: {
            en: '1. Cellular Architecture of Mycobacterium tuberculosis & Cord Factor',
            id: '1. Arsitektur Seluler Mycobacterium tuberculosis & Cord Factor',
          },
          content: {
            en: 'Mycobacterium tuberculosis (Mtb) is an obligate aerobic, non-motile, non-spore-forming, slow-growing rod-shaped bacillus (generation time 15–20 hours). It possesses an extraordinarily complex, lipid-rich cell envelope constituting >60% of its dry cellular weight, rendering it impervious to conventional Gram staining and resistant to osmotic lysis, chemical disinfectants, and acidic gastric contents.\n\nCell Wall Architecture & Acid-Fast Nature:\n1. Plasma Membrane: Deepest phospholipid bilayer containing lipoarabinomannan (LAM) anchors.\n2. Peptidoglycan Layer: Covalently bonded to arabinogalactan polymer polysaccharide chains.\n3. Mycolic Acid Barrier: Arabinogalactan is esterified to high-molecular-weight, branched alpha-alkyl, beta-hydroxy fatty acids termed mycolic acids (comprising 70–90 carbon atoms). This waxy layer retains carbolfuchsin dye upon acid-alcohol decolorization—the fundamental mechanism underlying Ziehl-Neelsen and Kinyoun acid-fast staining.\n4. Virulence Lipids (Trehalose 6,6\'-dimycolate / Cord Factor): Forms serpent-like microscopic cords. Cord factor inhibits phagosome-lysosome fusion inside host macrophages, induces production of tumor necrosis factor-alpha (TNF-alpha), and triggers chronic granulomatous tissue necrosis.',
            id: 'Mycobacterium tuberculosis (Mtb) adalah basil tahan asam berbentuk batang, aerob obligat, tidak membentuk spora, dan tumbuh sangat lambat (waktu generasi 15–20 jam). Dinding selnya sangat unik dan kaya lipid (>60% dari berat kering sel), menjadikannya impermeabel terhadap pewarnaan Gram konvensional serta sangat resistan terhadap lisis osmotik, desinfektan kimia, dan asam lambung.\n\nArsitektur Dinding Sel & Karakteristik Tahan Asam:\n1. Membran Plasma: Lapisan ganda fosfolipid yang mengikat molekul lipoarabinomannan (LAM).\n2. Lapisan Peptidoglikan: Terikat secara kovalen dengan polimer arabinogalaktan.\n3. Lapisan Asam Mikolat (Mycolic Acids): Arabinogalaktan diesterifikasi oleh asam lemak rantai panjang bercabang (70–90 atom karbon). Lapisan lilin ini mengikat kuat zat warna karbolfuksin sehingga tidak dapat dilunturkan oleh alkohol-asam—prinsip dasar pewarnaan tahan asam Ziehl-Neelsen.\n4. Cord Factor (Trehalose 6,6\'-dimycolate): Menyebabkan basil tersusun berjajar menyerupai tali pilin secara mikroskopis. Cord factor menghambat fusi fagosom-lisosom di dalam makrofag alveolar, menstimulasi pelepasan TNF-alfa berlebihan, dan memicu nekrosis kaseosa jaringan granuloma.',
          },
          formula: '\\text{Granuloma Ratio} = \\frac{\\text{Macrophage Core} + \\text{Langhans Giant Cells}}{\\text{CD4}^+\\text{ Th1 Lymphocytic Mantle}}',
          formulaExplanation: {
            en: 'The morphological balance between the central core of epithelioid histiocytes / Langhans multinucleated cells and the outer protective mantle of interferon-gamma (IFN-γ) secreting CD4+ Th1 lymphocytes, critical for containing mycobacterial bacilli within latent granulomas.',
            id: 'Keseimbangan histologis antara inti tengah histiosit epitelioid / sel raksasa Langhans dengan selubung luar limfosit T helper CD4+ (Th1) penghasil interferon-gamma (IFN-γ) yang mengurung replikasi basil dalam keadaan tuberkulosis laten.',
          },
          keyTakeaways: {
            en: [
              'The mycolic acid waxy lipid coat creates acid-fastness and extreme environmental resistance.',
              'Cord factor (trehalose dimycolate) inhibits phagosome-lysosome fusion, enabling intracellular survival within macrophages.',
              'CD4+ Th1 lymphocytes and the IFN-γ/TNF-α signaling axis are essential for granuloma containment.',
            ],
            id: [
              'Lapisan lilin asam mikolat memberikan sifat tahan asam dan resistansi tinggi terhadap lisis fagositik.',
              'Cord factor menghambat fusi fagosom dengan lisosom, memungkinkan basil bertahan hidup intraseluler dalam makrofag.',
              'Limfosit CD4+ Th1 serta poros IFN-γ dan TNF-α mutlak diperlukan untuk mengurung kuman dalam struktur granuloma.',
            ],
          },
        },
        {
          id: 'pne-3-sec-2',
          title: {
            en: '2. Immunopathogenesis: Primary Ghon Complex vs Post-Primary Cavitary Reactivation',
            id: '2. Imunopatogenesis: Kompleks Ghon Primer vs Reaktivasi Kavitasi Pasca-Primer',
          },
          content: {
            en: 'Transmission occurs exclusively via airborne droplet nuclei (1–5 µm) aerosolized during coughing, singing, or talking by patients with active cavitary pulmonary TB. Droplet nuclei remain suspended in ambient air for hours.\n\n1. Primary Infection & Ghon Complex:\n• Inhaled bacilli deposit in subpleural regions of the mid-to-lower lung lobes (maximal ventilation).\n• Alveolar macrophages phagocytose bacilli via complement receptors (CR3, CR4) and mannose receptors. Mtb blocks phagosomal acidification by excluding the host vacuolar H+-ATPase pump.\n• Bacilli replicate unchecked for 2–4 weeks, draining to regional hilar/mediastinal lymph nodes.\n• The Ghon Complex consists of: (a) A localized subpleural parenchymal granulomatous lesion (Ghon focus); and (b) Enlarged caseating regional hilar lymph nodes. In immunocompetent hosts, cell-mediated immunity develops: IL-12 from dendritic cells stimulates CD4+ T cells to differentiate into Th1 effectors, releasing IFN-gamma to activate macrophage nitric oxide synthase (iNOS), arresting bacterial replication. The complex calcifies into a radiographically visible Ranke Complex.\n\n2. Post-Primary / Reactivation Cavitation (Secondary TB):\n• Occurs when systemic cell-mediated immunity wanes (HIV co-infection, anti-TNF biologic therapy, malnutrition, diabetes, chronic corticosteroid use, senescence).\n• Reactivation characteristically localizes to the apical and posterior segments of the upper lobes (due to high alveolar ventilation-to-perfusion ratio V/Q and elevated local tissue oxygen tension PaO2 > 130 mmHg, favoring obligate aerobic growth).\n• Massive delayed-type hypersensitivity (DTH) tissue destruction causes liquefaction of the caseous necrotic core. Liquified debris empties into adjacent bronchioles, creating thick-walled gas-filled tuberculous cavities. These cavities harbor massive bacterial loads (10^7–10^9 bacilli per cavity), driving heavy infectious shedding and hemoptysis (erosion of bronchial arteries—Rasmussen aneurysm).',
            id: 'Penularan tuberkulosis terjadi secara eksklusif melalui droplet nuclei (1–5 µm) yang terhirup saat pasien TB aktif batuk atau berbicara. Droplet nuclei dapat melayang di udara selama berjam-jam.\n\n1. Infeksi Primer & Kompleks Ghon:\n• Basil terdeposit di daerah subpleural lobus tengah atau bawah paru (area dengan ventilasi tertinggi).\n• Makrofag alveolar memfagositosis basil. Mtb mencegah asidifikasi fagosom dengan memblokir pompa v-ATPase.\n• Basil bereplikasi selama 2–4 minggu dan menyebar ke kelenjar getah bening hilus regional.\n• Kompleks Ghon terdiri dari: (a) Fokus parenkim subpleural primer (Fokus Ghon); dan (b) Pembesaran kelenjar getah bening hilus yang mengalami kaseosa. Pada individu imunokompeten, imunitas seluler berkembang: IL-12 merangsang sel CD4+ berdiferensiasi menjadi sel Th1 yang memproduksi IFN-gamma untuk mengaktifkan makrofag membasmi basil. Kompleks ini mengalami kalsifikasi membentuk Kompleks Ranke.\n\n2. Tuberkulosis Pasca-Primer / Reaktivasi Kavitasi:\n• Terjadi saat daya tahan imunitas seluler menurun (koinfeksi HIV, terapi biologis anti-TNF, diabetes melitus, malnutrisi, usia lanjut).\n• Reaktivasi berlokasi khas di segmen apikal dan posterior lobus superior paru (karena area ini memiliki rasio V/Q tinggi dan tekanan parsial oksigen jaringan paling tinggi, sangat disukai basil aerob obligat).\n• Reaksi hipersensitivitas tipe lambat yang masif memicu likuefaksi nekrosis kaseosa. Jaringan nekrotik mencair dan mengalir ke bronkiolus, menyisakan rongga berdinding tebal berongga udara yang disebut kavitas tuberkulosis. Kavitas ini mengandung populasi basil sangat masif (10^7–10^9 basil), memicu penularan aerosol yang sangat tinggi dan batuk darah (hemoptisis akibat erosi aneurisma Rasmussen).',
          },
        },
        {
          id: 'pne-3-sec-3',
          title: {
            en: '3. Rapid Molecular Diagnostics & WHO / ATS / IDSA 2024 Treatment Guidelines',
            id: '3. Diagnostik Molekuler Cepat & Pedoman Terapi WHO / ATS / IDSA 2024',
          },
          content: {
            en: '1. Diagnostic Modalities:\n• GeneXpert MTB/RIF Ultra: Fully automated real-time nested PCR assay recommended by WHO as the initial diagnostic test for all suspected TB cases. Detects M. tuberculosis DNA and simultaneous mutations in the 81-base pair rifampicin resistance-determining region (RRDR) of the rpoB gene within 90 minutes with high sensitivity.\n• Sputum Smear Microscopy: Acid-fast bacilli (AFB) detection via Ziehl-Neelsen (bright red rods against blue background) or Auramine-O fluorescent stain (requires ≥ 5,000–10,000 bacilli/mL sputum).\n• Mycobacterial Culture: Liquid media (MGIT - BACTEC) detects growth within 10–14 days and serves as the gold standard for full phenotypic Drug Susceptibility Testing (DST).\n\n2. First-Line Regimen for Drug-Susceptible Pulmonary TB (6-Month Standard: 2HRZE / 4HR):\n• Intensive Phase (2 Months): Daily Rifampicin (R), Isoniazid (H), Pyrazinamide (Z), and Ethambutol (E) with fixed-dose combinations (FDCs).\n• Continuation Phase (4 Months): Daily Rifampicin (R) and Isoniazid (H).\n• Updated 2024 Alternative: A 4-month daily regimen (2HPMZ / 2HPM: Rifapentine, Moxifloxacin, Isoniazid, Pyrazinamide) is now endorsed by WHO/CDC for eligible adolescents and adults (≥12 years) with drug-susceptible TB.\n\n3. Multidrug-Resistant TB (MDR-TB = Resistance to at least Isoniazid AND Rifampicin):\n• WHO 2022/2024 Consolidated Guidelines recommend the 6-month all-oral BPaL / BPaLM regimen:\n  - B: Bedaquiline (inhibits mycobacterial ATP synthase subunit c)\n  - Pa: Pretomanid (inhibits mycolic acid biosynthesis and induces toxic nitric oxide release)\n  - L: Linezolid (inhibits 50S ribosomal protein synthesis; monitor for peripheral neuropathy and myelosuppression)\n  - M: Moxifloxacin (added in BPaLM if fluoroquinolone susceptibility is confirmed).',
            id: '1. Modalitas Diagnostik Modern:\n• GeneXpert MTB/RIF Ultra: Uji amplifikasi asam nukleat (NAAT) PCR real-time otomatis yang direkomendasikan WHO sebagai tes diagnostik awal lini pertama untuk semua terduga TB. Mampu mendeteksi DNA Mycobacterium tuberculosis sekaligus mutasi resistansi rifampisin pada gen rpoB dalam waktu 90 menit dengan akurasi sangat tinggi.\n• Mikroskopis Dahak BTA: Pewarnaan Ziehl-Neelsen (batang merah cerah dengan latar belakang biru) atau fluoresens Auramine-O (membutuhkan konsentrasi basil ≥ 5.000–10.000/mL dahak).\n• Kultur Mikobakteri: Media cair (MGIT BACTEC) mendeteksi pertumbuhan kuman dalam 10–14 hari dan merupakan baku emas untuk uji kepekaan obat fenotipik.\n\n2. Regimen Lini Pertama TB Sensitif Obat (Standar 6 Bulan: 2HRZE / 4HR):\n• Fase Intensif (2 Bulan): Rifampisin (R), Isoniazid (H), Pirazinamid (Z), dan Etambutol (E) setiap hari dalam bentuk Fixed-Dose Combination (FDC).\n• Fase Lanjutan (4 Bulan): Rifampisin (R) dan Isoniazid (H) setiap hari.\n• Alternatif 4 Bulan Terbaru (WHO/CDC): Regimen 4 bulan (2HPMZ / 2HPM: Rifapentin, Moksifloksasin, Isoniazid, Pirazinamid) untuk pasien usia ≥12 tahun dengan TB paru sensitif obat.\n\n3. Tuberkulosis Resistan Ganda (MDR-TB = Resistan terhadap Isoniazid DAN Rifampisin):\n• Pedoman WHO 2022/2024 merekomendasikan regimen oral 6 bulan BPaL / BPaLM:\n  - B: Bedaquiline (menghambat enzim ATP sintase subunit c mikobakteri)\n  - Pa: Pretomanid (menghambat biosintesis asam mikolat dinding sel)\n  - L: Linezolid (menghambat sintesis protein ribosom 50S; pantau neuropati dan supresi sumsum tulang)\n  - M: Moksifloksasin (ditambahkan bila terbukti sensitif terhadap fluorokuinolon).',
          },
        },
      ],
      caseStudy: {
        title: {
          en: 'Clinical Case: Chronic Cough, Night Sweats, and Upper Lobe Cavity',
          id: 'Kasus Klinis: Batuk Kronis, Keringat Malam, dan Kavitas Lobus Atas',
        },
        context: {
          en: 'A 42-year-old male immigrant presents with a 6-week history of productive cough, intermittent hemoptysis (streaks of blood in sputum), drenching night sweats, and an unintended 8 kg weight loss. He has a 20 pack-year smoking history. Vital signs: Temp 37.8°C, HR 88 bpm, RR 18/min, BP 118/76 mmHg, SpO2 96% on ambient air. Chest auscultation reveals post-tussive apical crackles and amphoric breath sounds over the right clavicle. A chest radiograph demonstrates a 3.5 cm thick-walled cavity with internal air-fluid level surrounded by satellite micronodules in the apical segment of the right upper lobe.',
          id: 'Pria berusia 42 tahun datang dengan riwayat batuk berdahak selama 6 minggu, batuk darah bercak (hemoptisis), keringat malam basah kuyup, dan penurunan berat badan 8 kg. Pasien memiliki riwayat merokok 20 pack-year. Tanda vital: Suhu 37.8°C, Nadi 88x/menit, Laju Napas 18x/menit, TD 118/76 mmHg, SpO2 96%. Auskultasi menunjukkan ronki basah apikal pasca-batuk dan suara napas amforik di bawah klavikula kanan. Foto toraks memperlihatkan kavitas berdinding tebal berdiameter 3.5 cm dengan batas air-fluid level dan mikronodul satelit di segmen apikal lobus superior kanan.',
        },
        analysis: {
          en: '1. Working Diagnosis: Active Post-Primary Cavitary Pulmonary Tuberculosis.\n2. Pathophysiology of Localization: The apical segments of the upper lobes exhibit the highest ventilation-to-perfusion (V/Q) ratio in the human lung and the highest regional tissue PO2, creating an ideal oxygen-rich environment for M. tuberculosis aerobic multiplication.\n3. Immediate Clinical Action: Place the patient immediately in an airborne infection isolation room (AIIR) with negative pressure ventilation (≥12 air changes/hour) and N95 respiratory protection for staff.\n4. Diagnostics: Send 2 morning sputum specimens for rapid molecular GeneXpert MTB/RIF Ultra and mycobacterial liquid culture (MGIT). If rifampicin-susceptible, initiate weight-based 2HRZE fixed-dose combination therapy immediately with pyridoxine (vitamin B6) co-administration to prevent isoniazid-induced peripheral neuropathy.',
          id: '1. Diagnosis Kerja: Tuberkulosis Paru Kavitasi Pasca-Primer Aktif.\n2. Alasan Lokasi Apikal: Segmen apikal lobus atas memiliki rasio V/Q paling tinggi dan tekanan oksigen jaringan tertinggi di paru manusia, menciptakan lingkungan aerob kaya oksigen yang sangat ideal bagi M. tuberculosis.\n3. Tindakan Segera: Tempatkan pasien di ruang isolasi tekanan negatif (Airborne Infection Isolation Room / AIIR) dengan pertukaran udara ≥12 kali/jam, dan gunakan masker respirator N95 bagi tenaga medis.\n4. Rencana Kerja: Kirim 2 sampel dahak untuk uji molekuler cepat GeneXpert MTB/RIF Ultra dan kultur BTA media cair. Jika terbukti sensitif rifampisin, segera inisiasi regimen FDC 2HRZE disertai suplementasi piridoksin (vitamin B6) untuk mencegah neuropati perifer akibat isoniazid.',
        },
        takeaway: {
          en: 'Airborne isolation and rapid molecular testing with GeneXpert MTB/RIF are the critical first steps in suspected cavitary tuberculosis.',
          id: 'Isolasi airborne dan pemeriksaan molekuler cepat GeneXpert MTB/RIF adalah langkah awal terpenting pada terduga TB kavitasi.',
        },
      },
      quiz: [
        {
          id: 'pne-q3-1',
          question: {
            en: 'Which virulence factor of Mycobacterium tuberculosis is composed of trehalose 6,6\'-dimycolate, inhibits phagosome-lysosome fusion inside alveolar macrophages, and induces classic serpentine cord formation?',
            id: 'Faktor virulensi Mycobacterium tuberculosis manakah yang tersusun dari trehalose 6,6\'-dimycolate, menghambat fusi fagosom dengan lisosom dalam makrofag alveolar, dan memicu formasi tali pilin (serpentine cord)?',
          },
          options: {
            en: [
              'Cord factor',
              'Pneumolysin',
              'Endotoxin A',
              'Protein A',
            ],
            id: [
              'Cord factor',
              'Pneumolisin',
              'Endotoksin A',
              'Protein A',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Cord factor (trehalose 6,6\'-dimycolate) is a cell wall glycolipid responsible for serpent-like cord growth in vitro. It inhibits phagosomal maturation and lysosomal fusion, allowing intracellular replication in macrophages, while inducing toxic TNF-alpha release and granuloma formation.',
            id: 'Cord factor (trehalose 6,6\'-dimycolate) adalah glikolipid dinding sel yang membentuk koloni menyerupai tali pilin. Molekul ini menghambat pematangan fagosom dan fusi lisosom di dalam makrofag, memungkinkan basil berkembang biak intraseluler, serta menstimulasi nekrosis kaseosa via pelepasan TNF-alfa.',
          },
        },
        {
          id: 'pne-q3-2',
          question: {
            en: 'Why does post-primary (reactivation) tuberculosis predominantly localize to the apical and posterior segments of the upper lobes of the lungs?',
            id: 'Mengapa tuberkulosis pasca-primer (reaktivasi) paling sering terlokalisasi di segmen apikal dan posterior lobus superior paru?',
          },
          options: {
            en: [
              'The apices have the highest ventilation-perfusion ratio (V/Q) and highest tissue oxygen tension (PaO2), favoring strict aerobic mycobacterial growth',
              'Mucociliary clearance is completely absent in the apices',
              'Alveolar macrophages cannot migrate into the upper lobes of the human lung',
              'Blood flow is highest in the lung apices compared to the bases due to gravity',
            ],
            id: [
              'Bagian apeks memiliki rasio ventilasi-perfusi (V/Q) dan tekanan parsial oksigen jaringan (PaO2) tertinggi, sangat mendukung kuman aerob obligat Mtb',
              'Eskalator mukosiliar sama sekali tidak ada di apeks paru',
              'Makrofag alveolar tidak dapat bermigrasi ke lobus superior paru manusia',
              'Aliran darah paling tinggi berada di apeks paru dibandingkan basal karena pengaruh gravitasi',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Due to gravitational effects in the upright human, blood perfusion drops much more rapidly towards the lung apex than ventilation does. Consequently, the apical V/Q ratio is very high (~3.0) and local alveolar PaO2 exceeds 130 mmHg, providing the hyperoxic environment required for obligate aerobic M. tuberculosis replication.',
            id: 'Akibat efek gravitasi pada posisi tegak, perfusi darah ke apeks paru menurun jauh lebih drastis dibanding penurunan ventilasi. Akibatnya, rasio V/Q di apeks sangat tinggi (~3.0) dan PaO2 alveolar mencapai >130 mmHg, menciptakan konsentrasi oksigen optimal bagi pertumbuhan kuman aerob obligat Mtb.',
          },
        },
        {
          id: 'pne-q3-3',
          question: {
            en: 'The GeneXpert MTB/RIF Ultra assay detects mutations in which gene to rapidly determine resistance to Rifampicin?',
            id: 'Pemeriksaan molekuler GeneXpert MTB/RIF Ultra mendeteksi mutasi pada gen manakah untuk menentukan resistansi terhadap Rifampisin secara cepat?',
          },
          options: {
            en: [
              'rpoB gene (encoding RNA polymerase beta subunit)',
              'katG gene (encoding catalase-peroxidase)',
              'inhA promoter region',
              'embB gene (encoding arabinosyl transferase)',
            ],
            id: [
              'Gen rpoB (mengkode subunit beta RNA polimerase)',
              'Gen katG (mengkode katalase-peroksidase)',
              'Regio promotor inhA',
              'Gen embB (mengkode arabinosil transferase)',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Rifampicin binds to the beta-subunit of bacterial DNA-dependent RNA polymerase encoded by the rpoB gene. Greater than 95% of rifampicin-resistant Mtb strains harbor mutations within the 81-base-pair rifampicin resistance-determining region (RRDR) of rpoB, which is amplified and detected by the GeneXpert assay.',
            id: 'Rifampisin bekerja dengan mengikat subunit beta dari enzim RNA polimerase mikobakteri yang dikode oleh gen rpoB. Lebih dari 95% galur Mtb yang resistan terhadap rifampisin memiliki mutasi pada regio 81-pasang basa (RRDR) gen rpoB, yang dideteksi secara spesifik oleh GeneXpert.',
          },
        },
        {
          id: 'pne-q3-4',
          question: {
            en: 'Which essential co-medication MUST be administered concurrently with Isoniazid to prevent drug-induced peripheral neuropathy?',
            id: 'Obat pendamping esensial manakah yang WAJIB diberikan bersamaan dengan Isoniazid guna mencegah efek samping neuropati perifer?',
          },
          options: {
            en: [
              'Pyridoxine (Vitamin B6)',
              'Cobalamin (Vitamin B12)',
              'Ascorbic acid (Vitamin C)',
              'Thiamine (Vitamin B1)',
            ],
            id: [
              'Piridoksin (Vitamin B6)',
              'Kobalamin (Vitamin B12)',
              'Asam askorbat (Vitamin C)',
              'Tiamin (Vitamin B1)',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Isoniazid competitively inhibits pyridoxal phosphokinase and increases urinary excretion of pyridoxine (Vitamin B6), leading to intracellular deficiency and symptomatic peripheral neuropathy. Co-administration of pyridoxine (25–50 mg daily) prevents this toxicity.',
            id: 'Isoniazid menghambat enzim piridoksal fosfokinase dan meningkatkan ekskresi piridoksin (Vitamin B6) melalui ginjal, memicu defisiensi B6 dan neuropati perifer. Pemberian suplemen piridoksin (25–50 mg/hari) mencegah komplikasi neurologis ini.',
          },
        },
        {
          id: 'pne-q3-5',
          question: {
            en: 'What is the standard WHO definition of Multidrug-Resistant Tuberculosis (MDR-TB)?',
            id: 'Apakah definisi standar WHO untuk Tuberkulosis Resistan Ganda (MDR-TB)?',
          },
          options: {
            en: [
              'Resistance to at least Isoniazid AND Rifampicin simultaneously',
              'Resistance to all four first-line agents (HRZE)',
              'Resistance to any single first-line anti-TB drug',
              'Resistance to fluoroquinolones and injectable aminoglycosides only',
            ],
            id: [
              'Resistansi terhadap sekurang-kurangnya Isoniazid DAN Rifampisin secara bersamaan',
              'Resistansi terhadap seluruh empat obat lini pertama (HRZE)',
              'Resistansi terhadap sembarang satu obat anti-TB lini pertama',
              'Resistansi hanya terhadap fluorokuinolon dan obat injeksi',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'MDR-TB is strictly defined as tuberculosis caused by an M. tuberculosis isolate resistant to at least both Isoniazid and Rifampicin, the two most potent first-line bactericidal anti-tuberculous drugs.',
            id: 'MDR-TB didefinisikan secara baku sebagai tuberkulosis yang disebabkan oleh kuman M. tuberculosis yang resistan sekurang-kurangnya terhadap Isoniazid DAN Rifampisin secara bersamaan, dua pilar bakterisidal terpenting dalam terapi TB.',
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // PART 4: COVID-19, SEVERE PNEUMONIA & ARDS PATHOPHYSIOLOGY
    // -------------------------------------------------------------
    {
      id: 'pne-mod-4',
      topicId: 'pulmonology-pneumonia',
      order: 4,
      title: {
        en: 'COVID-19 Viral Pneumonia, Severe Pneumonia & ARDS',
        id: 'Pneumonia Viral COVID-19, Pneumonia Berat & ARDS',
      },
      shortDescription: {
        en: 'SARS-CoV-2 spike-ACE2 binding, diffuse alveolar damage (DAD), IDSA/ATS ICU criteria, Berlin ARDS definitions, and lung-protective ventilation.',
        id: 'Ikatan spike-ACE2 SARS-CoV-2, diffuse alveolar damage (DAD), kriteria ICU IDSA/ATS, konsensus ARDS Berlin, dan ventilasi proteksi paru.',
      },
      durationMinutes: 26,
      difficulty: 'Advanced',
      difficultyId: 'Lanjutan',
      interactiveType: 'pulmonary-alveoli',
      sections: [
        {
          id: 'pne-4-sec-1',
          title: {
            en: '1. Viral Pathogenesis of SARS-CoV-2 & Diffuse Alveolar Damage (DAD)',
            id: '1. Patogenesis Viral SARS-CoV-2 & Diffuse Alveolar Damage (DAD)',
          },
          content: {
            en: 'Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2) is an enveloped, positive-sense, single-stranded RNA beta-coronavirus. Its surface spike (S) glycoprotein binds with high affinity to the human Angiotensin-Converting Enzyme 2 (ACE2) receptor, abundantly expressed on alveolar Type II pneumocytes and pulmonary vascular endothelial cells.\n\nPathophysiological Cascade:\n1. Viral Entry & Type II Pneumocyte Lysis: Host Transmembrane Protease Serine 2 (TMPRSS2) cleaves and primes the S protein at the S1/S2 junction, facilitating viral-host membrane fusion. Viral replication leads to pyroptotic lysis of Type II pneumocytes. Loss of Type II pneumocytes depletes pulmonary surfactant, precipitating alveolar surface tension collapse and micro-atelectasis.\n2. Hyper-Inflammatory Cytokine Release (Cytokine Storm): Innate immune sensing via Toll-like receptors (TLR3, TLR7, TLR8) and MDA5 activates NF-kappaB and the NLRP3 inflammasome, unleashing massive pro-inflammatory cytokines: Interleukin-6 (IL-6), Interleukin-1beta (IL-1beta), Tumor Necrosis Factor-alpha (TNF-alpha), and chemokines (CXCL10, CCL2).\n3. Diffuse Alveolar Damage (DAD): The histopathological hallmark of ARDS. Severe endothelial barrier disruption allows plasma proteins to flood the alveolar lumen. Fibrin polymerizes with necrotic pneumocyte debris, forming thick, eosinophilic, ribbon-like Hyaline Membranes that line alveolar septa, severely crippling oxygen diffusion capacity.\n4. Pulmonary Endothelialitis & Immunothrombosis: Unlike classic bacterial ARDS, severe COVID-19 features severe microvascular endothelialitis with widespread platelet-fibrin microthrombi inside pulmonary alveolar capillaries and neo-angiogenesis, creating profound ventilation-perfusion mismatch and "silent hypoxemia".',
            id: 'Severe Acute Respiratory Syndrome Coronavirus 2 (SARS-CoV-2) adalah virus RNA rantai tunggal sense-positif beramplop. Glikoprotein spike (S) pada permukaannya berikatan dengan afinitas tinggi pada reseptor Angiotensin-Converting Enzyme 2 (ACE2) manusia, yang diekspresikan secara melimpah pada pneumosit Tipe II dan endotel mikrovaskular paru.\n\nKaskade Patofisiologis:\n1. Masuknya Virus & Lisis Pneumosit Tipe II: Enzim protease pejamu TMPRSS2 memotong subunit spike S1/S2, memicu fusi membran virus dengan sel inang. Replikasi virus memicu piroptosis dan kematian sel pneumosit Tipe II. Kehilangan pneumosit Tipe II menyebabkan defisiensi surfaktan paru, memicu peningkatan tegangan permukaan dan kolaps alveolus (mikro-atelektasis).\n2. Badai Sitokin (Cytokine Storm): Pengenalan RNA virus via TLR3/7 dan MDA5 mengaktifkan faktor transkripsi NF-kB dan inflamasom NLRP3, memicu pelepasan badai sitokin proinflamasi masif: Interleukin-6 (IL-6), Interleukin-1beta (IL-1beta), TNF-alfa, dan kemokin.\n3. Diffuse Alveolar Damage (DAD): Ciri histopatologis utama ARDS. Kerusakan endotel dan epitel yang parah menyebabkan plasma kaya protein membanjiri rongga alveolus. Fibrin berpolimerisasi dengan sisa debris sel mati membentuk Membran Hialin (Hyaline Membranes) eosinofilik tebal yang melapisi septa alveolus, melumpuhkan difusi oksigen secara drastis.\n4. Endotelitis Pulmonal & Imunotrombosis: Berbeda dari ARDS bakterial biasa, COVID-19 berat ditandai dengan endotelitis mikrovaskular berat dan pembentukan mikrotrombus fibrin-trombosit di dalam kapiler alveolar (imunotrombosis), memicu "silent hypoxemia" dan pirau intrapulmonal berat.',
          },
          formula: '\\text{PaO}_2 / \\text{FiO}_2 \\le 300 \\text{ mmHg} \\quad (\\text{with PEEP } \\ge 5 \\text{ cmH}_2\\text{O})',
          formulaExplanation: {
            en: 'The Carrico Index (PaO2/FiO2 ratio) under standardized Positive End-Expiratory Pressure (PEEP ≥ 5 cmH2O), the cornerstone physiological metric defining the severity of Acute Respiratory Distress Syndrome (ARDS) under the Berlin consensus.',
            id: 'Indeks Carrico (rasio PaO2/FiO2) pada tekanan ekspirasi akhir positif terstandar (PEEP ≥ 5 cmH2O), metrik fisiologis utama penentu derajat keparahan ARDS berdasarkan konsensus Berlin.',
          },
          variables: [
            {
              symbol: '\\text{PaO}_2',
              name: { en: 'Arterial Oxygen Partial Pressure', id: 'Tekanan Parsial Oksigen Arteri' },
              unit: 'mmHg (measured via arterial blood gas)',
              description: {
                en: 'Direct polarographic measurement of dissolved oxygen tension in systemic arterial blood.',
                id: 'Tekanan oksigen terlarut dalam darah arteri sistemik dari analisis gas darah.',
              },
            },
            {
              symbol: '\\text{FiO}_2',
              name: { en: 'Fraction of Inspired Oxygen', id: 'Fraksi Oksigen Terinspirasi' },
              unit: 'Decimal (0.21 to 1.0)',
              description: {
                en: 'Fractional oxygen concentration delivered by mask or mechanical ventilator.',
                id: 'Fraksi konsentrasi oksigen yang dihantarkan melalui ventilator mekanis atau masker.',
              },
            },
          ],
          keyTakeaways: {
            en: [
              'SARS-CoV-2 infects Type II pneumocytes via ACE2/TMPRSS2, triggering surfactant depletion and diffuse alveolar damage (DAD).',
              'Eosinophilic hyaline membranes and pulmonary capillary immunothrombosis drive catastrophic gas exchange failure.',
              'Cytokine storm (IL-6, IL-1β, TNF-α) fuels systemic capillary leak and multi-organ dysfunction.',
            ],
            id: [
              'SARS-CoV-2 menginfeksi pneumosit Tipe II via reseptor ACE2/TMPRSS2, merusak produksi surfaktan dan memicu DAD.',
              'Membran hialin eosinofilik tebal dan imunotrombosis kapiler paru menjadi penyebab utama kegagalan pertukaran gas.',
              'Badai sitokin (IL-6, IL-1β, TNF-α) memicu kebocoran endotel sistemik dan disfungsi multiorgan.',
            ],
          },
        },
        {
          id: 'pne-4-sec-2',
          title: {
            en: '2. IDSA/ATS Consensus Criteria for Severe Pneumonia Mandating ICU Admission',
            id: '2. Kriteria Konsensus IDSA/ATS untuk Pneumonia Berat yang Wajib Masuk ICU',
          },
          content: {
            en: 'The IDSA/ATS consensus guidelines define Severe Pneumonia requiring direct Intensive Care Unit (ICU) admission using a validated rule comprising Major and Minor criteria:\n\nICU Admission Rule: Direct admission to the ICU is mandatory if the patient meets EITHER:\n• At least 1 MAJOR criterion; OR\n• At least 3 MINOR criteria.\n\n1. Major Criteria (Immediate Life-Threatening Instability):\n• Septic shock requiring vasopressor support (Norepinephrine).\n• Acute respiratory failure requiring invasive mechanical ventilation.\n\n2. Minor Criteria (High Risk of Rapid Deterioration):\n• Respiratory rate ≥ 30 breaths/minute.\n• Oxygenation impairment: PaO2/FiO2 ratio ≤ 250.\n• Multilobar infiltrates on chest radiography or CT.\n• Acute confusion or disorientation.\n• Uremia: Blood Urea Nitrogen (BUN) ≥ 20 mg/dL (7.14 mmol/L).\n• Leukopenia: White blood cell count < 4,000 cells/µL (as a consequence of severe overwhelming infection, not chemotherapy).\n• Thrombocytopenia: Platelet count < 100,000 cells/µL.\n• Hypothermia: Core body temperature < 36.0°C (96.8°F).\n• Hypotension requiring aggressive intravenous fluid resuscitation.\n\nClinical Utility: Meeting 3 or more minor criteria predicts a >30-fold increase in mortality risk and early decompensation if initially assigned to a general floor.',
            id: 'Pedoman konsensus IDSA/ATS mendefinisikan Pneumonia Berat yang mewajibkan perawatan langsung di Intensive Care Unit (ICU) menggunakan kombinasi kriteria Mayor dan Minor yang telah tervalidasi secara klinis:\n\nAturan Rawat ICU: Pasien wajib dirawat langsung di ICU apabila memenuhi SALAH SATU dari kondisi berikut:\n• Memenuhi sekurang-kurangnya 1 kriteria MAYOR; ATAU\n• Memenuhi sekurang-kurangnya 3 kriteria MINOR.\n\n1. Kriteria Mayor (Instabilitas Mengancam Jiwa Segera):\n• Syok septik yang membutuhkan obat vasopresor (mis. Norepinefrin).\n• Gagal napas akut yang membutuhkan ventilasi mekanis invasif (intubasi endotrakeal).\n\n2. Kriteria Minor (Risiko Tinggi Perburukan Cepat):\n• Laju napas takipnea: Laju napas ≥ 30 kali/menit.\n• Gangguan oksigenasi berat: Rasio PaO2/FiO2 ≤ 250.\n• Infiltrat multilobaris pada radiografi toraks atau CT-scan.\n• Konfusi atau disorientasi mental akut.\n• Uremia: BUN ≥ 20 mg/dL (≥ 7.14 mmol/L).\n• Leukopenia: Hitung leukosit < 4.000 sel/µL (akibat sepsis berat, bukan kemoterapi).\n• Trombositopenia: Hitung trombosit < 100.000 sel/µL.\n• Hipotermia: Suhu tubuh inti < 36.0°C.\n• Hipotensi yang membutuhkan resusitasi cairan intravena masif.\n\nMakna Klinis: Terpenuhinya ≥3 kriteria minor memprediksi lonjakan risiko kematian hingga >30 kali lipat jika pasien dipaksakan dirawat di bangsal biasa.',
          },
        },
        {
          id: 'pne-4-sec-3',
          title: {
            en: '3. Berlin Definition of ARDS & Lung-Protective Mechanical Ventilation',
            id: '3. Definisi Berlin ARDS & Ventilasi Mekanis Proteksi Paru',
          },
          content: {
            en: 'The Berlin Consensus Definition establishes explicit diagnostic parameters for Acute Respiratory Distress Syndrome (ARDS):\n\n1. Timing: Onset within 1 week of a known clinical insult (pneumonia, aspiration, sepsis) or new/worsening respiratory symptoms.\n2. Chest Imaging: Bilateral opacities on chest radiograph or CT not fully explained by pleural effusions, lobar/lung collapse, or nodules.\n3. Origin of Edema: Respiratory failure not fully explained by cardiogenic heart failure or fluid overload (objective assessment via echocardiography to exclude hydrostatic pulmonary edema).\n4. Oxygenation Severity (with minimum PEEP ≥ 5 cmH2O):\n• Mild ARDS: 200 mmHg < PaO2/FiO2 ≤ 300 mmHg.\n• Moderate ARDS: 100 mmHg < PaO2/FiO2 ≤ 200 mmHg.\n• Severe ARDS: PaO2/FiO2 ≤ 100 mmHg.\n\nEvidence-Based Therapeutic Interventions:\n1. Low-Tidal-Volume Lung-Protective Ventilation (ARDSNet Protocol):\n• Tidal volume (Vt) set to 4–8 mL/kg of Predicted Body Weight (PBW), calculated based on patient height and sex, NOT actual total body weight!\n• Plateau pressure target: Pplat ≤ 30 cmH2O to prevent alveolar overdistension (volutrauma / barotrauma).\n• Driving Pressure: ΔP = Pplat - PEEP target ≤ 14 cmH2O.\n2. Prone Positioning (PROSEVA Trial):\n• Mandatory in moderate-to-severe ARDS (PaO2/FiO2 < 150 mmHg) for ≥ 16 consecutive hours daily. Improves ventilation-perfusion matching, promotes dorsal alveolar recruitment, and homogenizes transpulmonary pressure gradients.\n3. Corticosteroids & Immunomodulation in COVID-19 ARDS:\n• Dexamethasone 6 mg daily for up to 10 days (RECOVERY Trial: 28-day mortality reduction in patients requiring oxygen or mechanical ventilation).\n• IL-6 Receptor Antagonist (Tocilizumab) or JAK Inhibitor (Baricitinib) in patients with rapid systemic inflammatory progression.\n4. Neuromuscular Blockade (Cisatracurium) for severe patient-ventilator dyssynchrony during the first 48 hours.\n5. Veno-Venous Extracorporeal Membrane Oxygenation (VV-ECMO): Evaluated per EOLIA criteria for refractory hypoxemic arrest (PaO2/FiO2 < 50 for > 3 hours or < 80 for > 6 hours despite maximal prone ventilation).',
            id: 'Konsensus Berlin menetapkan kriteria diagnostik eksplisit untuk Acute Respiratory Distress Syndrome (ARDS):\n\n1. Waktu Awitan: Dalam kurun waktu 1 minggu setelah pencetus klinis (pneumonia, aspirasi, sepsis) atau perburukan gejala respiratorik akut.\n2. Pencitraan Toraks: Opasitas bilateral pada foto toraks atau CT scan yang tidak sepenuhnya dapat dijelaskan oleh efusi pleura, atelektasis lobaris, atau nodul.\n3. Asal Edema: Gagal napas yang bukan disebabkan oleh gagal jantung kardiogenik primer atau kelebihan cairan (dibuktikan dengan ekokardiografi).\n4. Derajat Keparahan Oksigenasi (dengan PEEP minimal ≥ 5 cmH2O):\n• ARDS Ringan: 200 mmHg < PaO2/FiO2 ≤ 300 mmHg.\n• ARDS Sedang: 100 mmHg < PaO2/FiO2 ≤ 200 mmHg.\n• ARDS Berat: PaO2/FiO2 ≤ 100 mmHg.\n\nIntervensi Terapi Berbasis Bukti Ilmiah:\n1. Ventilasi Proteksi Paru Volume Tidal Rendah (Protokol ARDSNet):\n• Volume tidal (Vt) diatur pada 4–8 mL/kg Berat Badan Prediksi (Predicted Body Weight / PBW) berdasarkan tinggi badan dan jenis kelamin, BUKAN berat badan aktual!\n• Target tekanan plateau: Pplat ≤ 30 cmH2O untuk mencegah barotrauma dan volutrauma alveolar.\n• Driving Pressure: ΔP = Pplat - PEEP dengan target ≤ 14 cmH2O.\n2. Posisi Prone (Tengkurap - Uji Klinis PROSEVA):\n• Wajib diterapkan pada ARDS sedang-berat (PaO2/FiO2 < 150) selama minimal 16 jam berturut-turut per hari. Memperbaiki kesesuaian ventilasi-perfusi, membuka atelektasis dorsal, dan meratakan gradien tekanan transpulmonal.\n3. Kortikosteroid & Imunomodulasi pada ARDS COVID-19:\n• Deksametason 6 mg/hari selama hingga 10 hari (Uji RECOVERY: menurunkan mortalitas 28-hari secara signifikan pada pasien yang membutuhkan oksigen atau ventilator).\n• Antagonis Reseptor IL-6 (Tosilizumab) pada pasien dengan lonjakan penanda inflamasi sistemik cepat.\n4. Blokade Neuromuskular (Cisatracurium): Selama 48 jam pertama untuk mengatasi disinkroni napas ventilator-pasien yang berat.\n5. VV-ECMO (Extracorporeal Membrane Oxygenation): Berdasarkan kriteria uji EOLIA untuk hipoksemia refrakter berat (PaO2/FiO2 < 50 selama >3 jam atau < 80 selama >6 jam).',
          },
          comparisonTable: {
            headers: {
              en: ['Berlin ARDS Category', 'PaO2 / FiO2 Ratio (with PEEP ≥ 5 cmH2O)', '30-Day Hospital Mortality', 'Key Evidence-Based Strategy'],
              id: ['Kategori ARDS Berlin', 'Rasio PaO2 / FiO2 (PEEP ≥ 5 cmH2O)', 'Mortalitas Rumah Sakit 30-Hari', 'Strategi Berbasis Bukti Utama'],
            },
            rows: [
              {
                en: ['Mild ARDS', '200 to 300 mmHg', '~27%', 'Low tidal volume (6 mL/kg PBW), moderate PEEP, treat underlying etiology'],
                id: ['ARDS Ringan', '200 hingga 300 mmHg', '~27%', 'Volume tidal rendah (6 mL/kg PBW), PEEP moderat, obati etiologi primer'],
              },
              {
                en: ['Moderate ARDS', '100 to 200 mmHg', '~32%', 'High PEEP strategy, neuromuscular blockade if dyssynchronous, early prone trial if < 150'],
                id: ['ARDS Sedang', '100 hingga 200 mmHg', '~32%', 'Strategi PEEP tinggi, blokade neuromuskular jika asinkron, coba posisi prone jika < 150'],
              },
              {
                en: ['Severe ARDS', '≤ 100 mmHg', '~45%', 'Mandatory prone positioning (≥16 h/d), neuromuscular blockade, evaluate VV-ECMO (EOLIA)'],
                id: ['ARDS Berat', '≤ 100 mmHg', '~45%', 'Wajib posisi prone (≥16 jam/hari), relaksan otot, evaluasi VV-ECMO (kriteria EOLIA)'],
              },
            ],
          },
        },
      ],
      caseStudy: {
        title: {
          en: 'Clinical Case: Severe Viral Pneumonia with Rapid Progression to ARDS',
          id: 'Kasus Klinis: Pneumonia Viral Berat yang Memburuk Cepat Menjadi ARDS',
        },
        context: {
          en: 'A 58-year-old male with type 2 diabetes presents with 7 days of progressive dyspnea, dry cough, and high fevers following confirmed SARS-CoV-2 PCR positivity. On arrival: BP 124/76 mmHg, HR 122 bpm, RR 38/min, SpO2 78% on room air. Non-rebreather mask at 15 L/min improves SpO2 to only 86%. Arterial blood gas on 100% FiO2 reveals: pH 7.28, PaCO2 48 mmHg, PaO2 62 mmHg, HCO3 22 mEq/L (PaO2/FiO2 ratio = 62 mmHg). High-resolution chest CT shows extensive diffuse bilateral ground-glass opacities with dense dependent consolidation involving >70% of both lung fields. Transthoracic echocardiogram confirms normal left ventricular ejection fraction (62%) with no regional wall motion abnormalities and normal left atrial pressure.',
          id: 'Pria berusia 58 tahun dengan diabetes melitus tipe 2 datang dengan keluhan sesak napas berat yang memberat sejak 7 hari, batuk kering, dan demam tinggi setelah terkonfirmasi positif PCR SARS-CoV-2. Tanda vital: TD 124/76 mmHg, Nadi 122x/menit, Laju Napas 38x/menit, SpO2 78% udara ruangan. Terapi oksigen dengan Non-Rebreathing Mask (NRM) 15 L/menit hanya mampu menaikkan SpO2 menjadi 86%. Analisis Gas Darah pada FiO2 100%: pH 7.28, PaCO2 48 mmHg, PaO2 62 mmHg, HCO3 22 mEq/L (rasio PaO2/FiO2 = 62 mmHg). CT-scan toraks menunjukkan opasitas ground-glass difus bilateral dengan konsolidasi padat di area dependen mencakup >70% lapang paru. Ekokardiografi menunjukkan fungsi sistolik ventrikel kiri normal (LVEF 62%) tanpa tanda gagal jantung hidrostatik.',
        },
        analysis: {
          en: '1. Diagnosis: Severe ARDS (PaO2/FiO2 = 62 mmHg ≤ 100 on PEEP ≥ 5) secondary to Severe COVID-19 Viral Pneumonia with Diffuse Alveolar Damage.\n2. IDSA/ATS ICU Indication: Meets multiple minor criteria (RR ≥ 30, PaO2/FiO2 ≤ 250, multilobar infiltrates) and requires immediate invasive mechanical ventilation for refractory hypoxemic respiratory arrest (Major Criterion).\n3. Ventilator Strategy: Rapid sequence intubation, lung-protective ventilation with Vt = 6 mL/kg Predicted Body Weight (PBW), targeting Pplat ≤ 30 cmH2O and driving pressure ΔP ≤ 14 cmH2O.\n4. Immediate Therapeutic Package: Early prone positioning (minimum 16 hours continuous prone cycle per PROSEVA protocol), intravenous Dexamethasone 6 mg daily, continuous cisatracurium infusion for 48 hours to minimize patient-ventilator dyssynchrony, and alert the ECMO team for possible rescue VV-ECMO if PaO2/FiO2 remains <80 despite proning.',
          id: '1. Diagnosis: ARDS Berat (rasio PaO2/FiO2 = 62 mmHg ≤ 100) sekunder akibat Pneumonia Viral COVID-19 Berat dengan Diffuse Alveolar Damage (DAD).\n2. Indikasi ICU IDSA/ATS: Memenuhi kriteria mayor (kebutuhan ventilasi mekanis invasif akibat gagal napas refrakter) dan berbagai kriteria minor (RR ≥ 30, PaO2/FiO2 ≤ 250, infiltrat multilobaris bilateral).\n3. Tata Laksana Ventilator: Intubasi segera, ventilasi proteksi paru dengan Vt = 6 mL/kg PBW, target Pplat ≤ 30 cmH2O dan driving pressure ΔP ≤ 14 cmH2O.\n4. Intervensi Lanjutan: Posisi prone (tengkurap) sedini mungkin selama minimal 16 jam/hari berturut-turut, Deksametason 6 mg IV per hari, relaksan otot cisatracurium 48 jam pertama untuk menghilangkan disinkroni ventilator, serta kesiapsiagaan tim VV-ECMO jika PaO2/FiO2 tetap <80 pasca prone.',
        },
        takeaway: {
          en: 'Severe ARDS (PaO2/FiO2 ≤ 100) mandates lung-protective low-tidal ventilation (6 mL/kg PBW) and early prolonged prone positioning (≥16 hours/day).',
          id: 'ARDS derajat berat (PaO2/FiO2 ≤ 100) mewajibkan ventilasi proteksi volume tidal rendah (6 mL/kg PBW) dan posisi prone berkepanjangan (≥16 jam/hari).',
        },
      },
      quiz: [
        {
          id: 'pne-q4-1',
          question: {
            en: 'According to the Berlin Consensus Definition, what is the classification of ARDS in a mechanically ventilated patient with a PaO2/FiO2 ratio of 145 mmHg on PEEP of 10 cmH2O and bilateral pulmonary infiltrates?',
            id: 'Berdasarkan Definisi Konsensus Berlin, apakah klasifikasi ARDS pada pasien dengan rasio PaO2/FiO2 sebesar 145 mmHg pada PEEP 10 cmH2O dan infiltrat bilateral?',
          },
          options: {
            en: [
              'Moderate ARDS (ratio between 100 and 200 mmHg)',
              'Mild ARDS (ratio between 200 and 300 mmHg)',
              'Severe ARDS (ratio ≤ 100 mmHg)',
              'Not ARDS because PEEP must be ≥ 15 cmH2O',
            ],
            id: [
              'ARDS Sedang (rasio antara 100 dan 200 mmHg)',
              'ARDS Ringan (rasio antara 200 dan 300 mmHg)',
              'ARDS Berat (rasio ≤ 100 mmHg)',
              'Bukan ARDS karena nilai PEEP harus ≥ 15 cmH2O',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Under the Berlin definition (requiring minimum PEEP ≥ 5 cmH2O), ARDS oxygenation impairment is categorized as: Mild (200 < PaO2/FiO2 ≤ 300), Moderate (100 < PaO2/FiO2 ≤ 200), and Severe (PaO2/FiO2 ≤ 100). A ratio of 145 mmHg falls into the Moderate ARDS category.',
            id: 'Berdasarkan konsensus Berlin (dengan syarat PEEP minimal ≥ 5 cmH2O), derajat gangguan oksigenasi ARDS dibagi menjadi: Ringan (200 < PaO2/FiO2 ≤ 300), Sedang (100 < PaO2/FiO2 ≤ 200), dan Berat (PaO2/FiO2 ≤ 100). Rasio 145 mmHg termasuk dalam kategori ARDS Sedang.',
          },
        },
        {
          id: 'pne-q4-2',
          question: {
            en: 'Which of the following is considered a MAJOR criterion for direct ICU admission under the IDSA/ATS severe pneumonia guidelines?',
            id: 'Manakah di antara pilihan berikut yang merupakan kriteria MAYOR untuk indikasi rawat ICU langsung berdasarkan pedoman pneumonia berat IDSA/ATS?',
          },
          options: {
            en: [
              'Septic shock requiring vasopressors',
              'Respiratory rate ≥ 30 breaths/minute',
              'Blood Urea Nitrogen (BUN) ≥ 20 mg/dL',
              'Multilobar infiltrates on chest imaging',
            ],
            id: [
              'Syok septik yang membutuhkan obat vasopresor',
              'Laju napas takipnea ≥ 30 kali/menit',
              'Blood Urea Nitrogen (BUN) ≥ 20 mg/dL',
              'Infiltrat multilobaris pada pencitraan toraks',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The IDSA/ATS guidelines specify two MAJOR criteria: (1) Septic shock requiring vasopressor support; and (2) Acute respiratory failure requiring invasive mechanical ventilation. Meeting either major criterion warrants direct ICU admission. Tachypnea, elevated BUN, and multilobar infiltrates are minor criteria.',
            id: 'Pedoman IDSA/ATS menetapkan dua kriteria MAYOR: (1) Syok septik yang membutuhkan obat vasopresor; dan (2) Gagal napas akut yang memerlukan intubasi ventilasi mekanis invasif. Terpenuhinya salah satu kriteria mayor mewajibkan perawatan langsung di ICU. Takipnea, BUN meningkat, dan infiltrat multilobaris tergolong kriteria minor.',
          },
        },
        {
          id: 'pne-q4-3',
          question: {
            en: 'What is the recommended target tidal volume in lung-protective mechanical ventilation for Acute Respiratory Distress Syndrome (ARDSNet protocol)?',
            id: 'Berapakah target volume tidal yang direkomendasikan pada ventilasi mekanis proteksi paru untuk ARDS (protokol ARDSNet)?',
          },
          options: {
            en: [
              '4 to 8 mL/kg of Predicted Body Weight (PBW)',
              '10 to 12 mL/kg of Actual Total Body Weight',
              '15 mL/kg of Actual Total Body Weight',
              '2 mL/kg of Ideal Body Weight',
            ],
            id: [
              '4 hingga 8 mL/kg dari Predicted Body Weight (PBW / Berat Badan Prediksi)',
              '10 hingga 12 mL/kg dari Berat Badan Aktual',
              '15 mL/kg dari Berat Badan Aktual',
              '2 mL/kg dari Berat Badan Ideal',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The landmark ARDSNet trial established low-tidal-volume ventilation at 4–8 mL/kg of Predicted Body Weight (PBW)—calculated strictly from height and biological sex—to prevent alveolar overdistension volutrauma, while maintaining plateau pressure ≤ 30 cmH2O.',
            id: 'Uji klinis ARDSNet membuktikan bahwa pengaturan volume tidal rendah 4–8 mL/kg dari Predicted Body Weight (PBW)—dihitung dari tinggi badan dan jenis kelamin, bukan berat badan aktual—menurunkan mortalitas secara bermakna dengan mencegah volutrauma dan mempertahankan tekanan plateau ≤ 30 cmH2O.',
          },
        },
        {
          id: 'pne-q4-4',
          question: {
            en: 'In patients with moderate-to-severe ARDS (PaO2/FiO2 < 150 mmHg), the PROSEVA trial demonstrated that prone positioning provides significant mortality reduction when maintained for what minimum duration daily?',
            id: 'Pada pasien ARDS sedang-berat (PaO2/FiO2 < 150 mmHg), uji klinis PROSEVA membuktikan bahwa posisi prone (tengkurap) menurunkan angka kematian secara signifikan bila dipertahankan minimal selama berapa jam per hari?',
          },
          options: {
            en: [
              'At least 16 consecutive hours per day',
              '2 to 4 hours intermittently per day',
              '30 minutes after each meal',
              '72 hours continuously without repositioning',
            ],
            id: [
              'Minimal 16 jam berturut-turut per hari',
              '2 hingga 4 jam berselang-seling per hari',
              '30 menit setiap selesai makan',
              '72 jam terus-menerus tanpa jeda',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'The PROSEVA randomized trial demonstrated a dramatic 28-day mortality reduction (16% vs 32.8%) when prone positioning was applied early and sustained for at least 16 consecutive hours per session in severe ARDS.',
            id: 'Uji acak terkontrol PROSEVA menunjukkan penurunan mortalitas 28-hari yang dramatis (dari 32.8% menjadi 16%) ketika posisi prone diterapkan sejak dini dan dipertahankan minimal selama 16 jam berturut-turut per sesi pada ARDS berat.',
          },
        },
        {
          id: 'pne-q4-5',
          question: {
            en: 'What histological finding is recognized as the pathognomonic hallmark of Diffuse Alveolar Damage (DAD) in Acute Respiratory Distress Syndrome?',
            id: 'Temuan histopatologis manakah yang diakui sebagai ciri khas patognomonik dari Diffuse Alveolar Damage (DAD) pada ARDS?',
          },
          options: {
            en: [
              'Eosinophilic hyaline membranes composed of fibrin and necrotic cellular debris lining alveolar ducts and septa',
              'Caseous granulomas surrounded by Langhans giant cells',
              'Charcot-Leyden crystals and Curschmann spirals',
              'Non-caseating sarcoid granulomas with asteroid bodies',
            ],
            id: [
              'Membran hialin eosinofilik tebal yang tersusun dari fibrin dan debris sel nekrotik yang melapisi duktus dan septa alveolus',
              'Granuloma kaseosa yang dikelilingi sel datia Langhans',
              'Kristal Charcot-Leyden dan spiral Curschmann',
              'Granuloma sarkoid non-kaseosa dengan badan asteroid',
            ],
          },
          correctAnswerIndex: 0,
          explanation: {
            en: 'Hyaline membranes—dense, waxy, eosinophilic bands lining alveolar walls composed of polymerized fibrin, extravasated plasma proteins, and necrotic Type I pneumocyte cellular debris—are the hallmark of the acute exudative phase of Diffuse Alveolar Damage (DAD).',
            id: 'Membran hialin—lapisan pita eosinofilik tebal yang melapisi dinding alveolus, tersusun dari polimer fibrin, protein plasma yang bocor, dan sisa nekrosis pneumosit Tipe I—merupakan ciri histopatologis khas fase eksudatif akut dari Diffuse Alveolar Damage (DAD).',
          },
        },
      ],
    },
  ],
};
