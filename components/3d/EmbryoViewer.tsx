'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import {
  Heart,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Info,
  Volume2,
  VolumeX,
  Crosshair,
  ShieldAlert,
  Ruler,
  Layers,
  ChevronRight,
  Scan,
  Baby,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { TelemetryHUD } from './TelemetryHUD';

export type GestationalStage = 'w1' | 'w4' | 'w8' | 'w12' | 'w20' | 'w36';
export type ViewMode = 'anatomy' | 'ultrasound' | 'ossification';
export type CleavageSubStage = 'zygote' | '4cell' | 'morula' | 'blastocyst';
export type CaliperMeasurement = 'none' | 'crl' | 'bpd' | 'hc' | 'ac' | 'fl';

interface MilestoneDetail {
  id: string;
  name: { en: string; id: string };
  summary: { en: string; id: string };
  clinicalNote: { en: string; id: string };
  focusPos: [number, number, number];
  cameraPos: [number, number, number];
}

interface BiometryData {
  crlMm: number;
  bpdMm?: number;
  hcMm?: number;
  acMm?: number;
  flMm?: number;
  hadlockGaDays?: number;
}

interface StageData {
  key: GestationalStage;
  week: number;
  carnegieStage?: string;
  title: { en: string; id: string };
  period: { en: string; id: string };
  crl: string;
  weight: string;
  heartRate: number; // BPM (0 if pre-cardiac)
  heartRateLabel: { en: string; id: string };
  description: { en: string; id: string };
  milestones: MilestoneDetail[];
  cameraInit: [number, number, number];
  biometry: BiometryData;
}

export const STAGES: Record<GestationalStage, StageData> = {
  w1: {
    key: 'w1',
    week: 1,
    carnegieStage: 'Carnegie Stage 1–3',
    title: {
      en: 'Week 1: Fertilization, Cleavage & Cavitated Blastocyst',
      id: 'Minggu 1: Fertilisasi, Pembelahan & Blastokista Berkavitasi',
    },
    period: { en: 'Pre-embryonic Cleavage Continuum', id: 'Rangkaian Pembelahan Pra-embrio' },
    crl: '0.15 mm',
    weight: '< 0.001 g',
    heartRate: 0,
    heartRateLabel: {
      en: 'Pre-vascular (Nutrient Diffusion)',
      id: 'Pra-vaskular (Difusi Nutrisi)',
    },
    description: {
      en: 'From the single-cell diploid zygote through mitotic cleavage (2, 4, 8 cells) to the 16-cell compacted morula. Fluid accumulation under hydrostatic pressure generates the blastocoel cavity, segregating the outer trophectoderm from the inner cell mass (embryoblast) as it hatches from the zona pellucida.',
      id: 'Dari zigot diploid sel tunggal melalui pembelahan mitosis (2, 4, 8 sel) hingga morula padat 16 sel. Akumulasi cairan di bawah tekanan hidrostatik membentuk rongga blastosel, memisahkan trofoblas luar dari massa sel dalam (embrioblas) saat menetas dari zona pelusida.',
    },
    cameraInit: [0, 0, 5.8],
    biometry: { crlMm: 0.15 },
    milestones: [
      {
        id: 'trophoblast',
        name: { en: 'Outer Trophectoderm Monolayer', id: 'Lapisan Monolayer Trofoblas' },
        summary: {
          en: 'Polarized epithelial sphere that adheres to the endometrium and differentiates into invasive syncytiotrophoblast.',
          id: 'Lapisan epitel terpolarisasi yang menempel pada endometrium dan berdiferensiasi menjadi sinsisiotrofoblas invasif.',
        },
        clinicalNote: {
          en: 'Secretes human chorionic gonadotropin (hCG) to maintain the corpus luteum and progesterone secretion, preventing menstruation.',
          id: 'Mensekresi hormon hCG untuk mempertahankan korpus luteum dan sekresi progesteron, mencegah menstruasi.',
        },
        focusPos: [0, 1.25, 0],
        cameraPos: [0, 1.6, 4.5],
      },
      {
        id: 'epiblast',
        name: { en: 'Epiblast (Pluripotent Embryonic Disc)', id: 'Epiblas (Lempeng Embrio Pluripoten)' },
        summary: {
          en: 'Columnar pluripotent cells situated adjacent to the future amniotic cavity; origin of all three definitive germ layers.',
          id: 'Sel-sel kolumnar pluripoten di dekat rongga amnion masa depan; asal mula seluruh tiga lapisan germinal definitif.',
        },
        clinicalNote: {
          en: 'Source of true human embryonic stem cells (hESCs). Primitive streak formation here initiates gastrulation.',
          id: 'Sumber sel punca embrionik manusia (hESC). Pembentukan primitive streak di sini mengawali proses gastrulasi.',
        },
        focusPos: [-0.35, 0.45, 0.25],
        cameraPos: [-0.6, 0.75, 4.2],
      },
      {
        id: 'hypoblast',
        name: { en: 'Hypoblast (Primitive Endoderm)', id: 'Hipoblas (Endoderm Primitif)' },
        summary: {
          en: 'Cuboidal cell layer lining the blastocoelic roof that migrates to form Heuser membrane and primary yolk sac.',
          id: 'Lapisan sel kuboid yang membatasi atap rongga blastosel dan bermigrasi membentuk membran Heuser serta kantung kuning telur primer.',
        },
        clinicalNote: {
          en: 'Establishes the cranial-caudal axis of the human embryo through anterior visceral endoderm (AVE) signaling.',
          id: 'Menetapkan sumbu kranial-kaudal embrio manusia melalui sinyal anterior visceral endoderm (AVE).',
        },
        focusPos: [-0.35, -0.05, 0.25],
        cameraPos: [-0.65, 0.25, 4.2],
      },
      {
        id: 'zona_pellucida',
        name: { en: 'Zona Pellucida Hatching Window', id: 'Jendela Penetasan Zona Pelusida' },
        summary: {
          en: 'Proteolytic degradation of the glycoprotein matrix by strypsin enzymes allowing blastocyst implantation.',
          id: 'Degradasi proteolitik matriks glikoprotein oleh enzim stripsin yang memungkinkan implantasi blastokista.',
        },
        clinicalNote: {
          en: 'Premature hatching predisposes to tubal ectopic pregnancy; failure of hatching causes primary implantation failure.',
          id: 'Penetasan dini memicu kehamilan ektopik tuba; kegagalan menetas menyebabkan kegagalan implantasi primer.',
        },
        focusPos: [1.3, -0.4, 0],
        cameraPos: [1.7, -0.2, 4.5],
      },
    ],
  },
  w4: {
    key: 'w4',
    week: 4,
    carnegieStage: 'Carnegie Stage 13',
    title: {
      en: 'Week 4: Neurulation, Somites & Cardiac Looping',
      id: 'Minggu 4: Neurulasi, Somit & Perputaran Jantung',
    },
    period: { en: 'Early Embryonic Gastrulation & Folding', id: 'Gastrulasi & Pelipatan Embrio Awal' },
    crl: '4.5 mm',
    weight: '0.04 g',
    heartRate: 105,
    heartRateLabel: {
      en: '105 bpm (Primitive Peristaltic Tube)',
      id: '105 bpm (Tabung Jantung Peristaltik)',
    },
    description: {
      en: 'The human embryo undergoes craniocaudal and lateral body folding, assuming its classic C-shaped flexure. Cranial neural folds fuse, 28–32 paraxial somite pairs segment the dorsal neural axis, and the primitive cardiac tube loops rightward initiating directional peristaltic blood flow.',
      id: 'Embrio manusia mengalami pelipatan tubuh kraniokaudal dan lateral, membentuk lengkungan khas berbentuk C. Tabung saraf menutup, 28–32 pasang somit paraksial mensegmentasi sumbu dorsal, dan tabung jantung primitif melengkung ke kanan memulai sirkulasi peristaltik.',
    },
    cameraInit: [0, 0, 5.5],
    biometry: { crlMm: 4.5, hadlockGaDays: 28 },
    milestones: [
      {
        id: 'branchial_arches',
        name: { en: 'Pharyngeal (Branchial) Arches 1 & 2', id: 'Lengkung Faring (Insang) 1 & 2' },
        summary: {
          en: '1st Mandibular/Maxillary and 2nd Hyoid arches bordered by deep pharyngeal clefts, innervated by cranial nerves V and VII.',
          id: 'Lengkung Mandibula/Maksila ke-1 dan Hioid ke-2 yang dibatasi celah faring dalam, dipersarafi saraf kranial V dan VII.',
        },
        clinicalNote: {
          en: 'Disrupted cranial neural crest migration results in severe first arch syndromes (Treacher Collins, Pierre Robin sequence).',
          id: 'Gangguan migrasi krista neural kranial memicu sindrom lengkung pertama berat (Treacher Collins, Pierre Robin).',
        },
        focusPos: [0.45, 0.45, 0.28],
        cameraPos: [0.85, 0.65, 3.6],
      },
      {
        id: 'cardiac_bulge',
        name: { en: 'Bulbus Cordis & Looping Heart Tube', id: 'Tonjolan Bulbus Kordis & Tabung Jantung Berdenyut' },
        summary: {
          en: 'Prominent ventral cardiac prominence displaying rhythmic peristaltic contractions at ~105 bpm.',
          id: 'Tonjolan jantung ventral yang menonjol dengan denyut peristaltik ritmis sekitar 105 denyut per menit.',
        },
        clinicalNote: {
          en: 'D-looping (dextral looping) specifies ventricular left-right asymmetry; L-looping results in L-transposition of the great arteries.',
          id: 'D-looping (perputaran ke kanan) menentukan asimetri ventrikel; L-looping memicu transposisi arteri besar bawaan.',
        },
        focusPos: [0.32, 0.12, 0.38],
        cameraPos: [0.72, 0.28, 3.5],
      },
      {
        id: 'somites',
        name: { en: 'Paraxial Somites (30 Metameric Pairs)', id: 'Somit Paraksial (30 Pasang Metamerik)' },
        summary: {
          en: 'Segmental mesodermal blocks flanking the neural tube differentiating into sclerotome, myotome, and dermatome.',
          id: 'Blok mesoderm segmental di sisi tabung saraf yang berdiferensiasi menjadi sklerotom, miotom, dan dermatom.',
        },
        clinicalNote: {
          en: 'Defective somite segmentation during this stage induces congenital scoliosis and hemivertebra formation.',
          id: 'Defek segmentasi somit pada fase ini menyebabkan skoliosis kongenital dan pembentukan hemivertebra.',
        },
        focusPos: [-0.45, 0.35, 0.05],
        cameraPos: [-0.95, 0.5, 3.8],
      },
      {
        id: 'limb_buds',
        name: { en: 'Upper Limb Paddle Bud & AER', id: 'Tunas Anggota Gerak Atas & AER' },
        summary: {
          en: 'Outgrowth of somatic lateral plate mesoderm capped by the Apical Ectodermal Ridge (Fgf-8 / Fgf-4 signaling).',
          id: 'Pertumbuhan mesoderm lempeng lateral somatik dilapisi Apical Ectodermal Ridge (sinyal Fgf-8 / Fgf-4).',
        },
        clinicalNote: {
          en: 'Extremely vulnerable teratogenic window: maternal thalidomide ingestion between days 20–36 arrests AER signaling causing phocomelia.',
          id: 'Jendela teratogenesis kritis: konsumsi talidomid antara hari 20–36 menghentikan sinyal AER dan memicu fokomelia.',
        },
        focusPos: [0.22, -0.22, 0.46],
        cameraPos: [0.65, -0.12, 3.6],
      },
    ],
  },
  w8: {
    key: 'w8',
    week: 8,
    carnegieStage: 'Carnegie Stage 23',
    title: {
      en: 'Week 8: Organogenesis & Digital Ray Apoptosis',
      id: 'Minggu 8: Organogenesis & Apoptosis Jari Tangan',
    },
    period: { en: 'End of Embryonic Period (Transition to Fetus)', id: 'Akhir Periode Embrio (Transisi ke Janin)' },
    crl: '30 mm',
    weight: '1.0 g',
    heartRate: 165,
    heartRateLabel: {
      en: '165 bpm (Peak Embryonic Rate)',
      id: '165 bpm (Puncak Detak Jantung Embrio)',
    },
    description: {
      en: 'Concluding Carnegie Stage 23. The embryonic head represents ~48% of total CRL. Programmed cell death (apoptosis) sculpts individual fingers and toes from hand/foot paddle plates. Rapid midgut elongation and liver expansion produce the physiological umbilical hernia.',
      id: 'Menuntaskan Carnegie Stage 23. Kepala embrio menyumbang ~48% panjang CRL. Kematian sel terprogram (apoptosis) memisahkan jari-jemari tangan dan kaki. Pemanjangan pesat usus tengah menghasilkan hernia umbilikalis fisiologis.',
    },
    cameraInit: [0, 0, 5.8],
    biometry: { crlMm: 30.0, hadlockGaDays: 56 },
    milestones: [
      {
        id: 'digital_apoptosis',
        name: { en: 'Separated Digits (BMP Interdigital Apoptosis)', id: 'Pemisahan Jari (Apoptosis Interdigital BMP)' },
        summary: {
          en: 'Bmp-4 and Bmp-7 mediated programmed cell death in the interdigital necrotic zones fully separating 5 fingers and 5 toes.',
          id: 'Kematian sel terprogram dimediasi Bmp-4 dan Bmp-7 pada zona interdigital yang memisahkan sempurna 5 jari tangan dan 5 jari kaki.',
        },
        clinicalNote: {
          en: 'Failure of interdigital apoptosis results in syndactyly (webbed fingers/toes), the most prevalent congenital limb defect.',
          id: 'Kegagalan apoptosis interdigital menghasilkan sindaktili (jari berselaput), anomali anggota gerak kongenital tersering.',
        },
        focusPos: [0.35, -0.22, 0.42],
        cameraPos: [0.75, -0.1, 3.6],
      },
      {
        id: 'physiological_hernia',
        name: { en: 'Physiological Umbilical Midgut Hernia', id: 'Hernia Umbilikalis Usus Tengah Fisiologis' },
        summary: {
          en: 'Herniation of expanding intestinal U-shaped loop into the proximal umbilical cord due to temporary abdominal volume constraint.',
          id: 'Penonjolan lengkung usus berbentuk U ke dalam pangkal tali pusat akibat keterbatasan volume rongga perut sementara.',
        },
        clinicalNote: {
          en: 'Completely normal until week 10–11. Failure of midgut return by week 12 constitutes an omphalocele (covered by amnion and peritoneum).',
          id: 'Sepenuhnya normal hingga minggu 10–11. Kegagalan kembalinya usus pada minggu ke-12 didiagnosis sebagai omfalokel.',
        },
        focusPos: [0.0, -0.38, 0.65],
        cameraPos: [0.35, -0.25, 3.8],
      },
      {
        id: 'auricular_hillocks',
        name: { en: 'Auricular Hillocks of His (External Pinna)', id: 'Tonjolan Aurikular His (Daun Telinga Luar)' },
        summary: {
          en: 'Six mesenchymal swellings derived from arches 1 and 2 merging into the definitive external ear auricle on the lateral neck.',
          id: 'Enam tonjolan mesenkim dari lengkung faring 1 dan 2 yang menyatu membentuk daun telinga luar pada leher lateral.',
        },
        clinicalNote: {
          en: 'Initially positioned low on the cervical region; mandibular growth elevates them to orbital eye level by week 12.',
          id: 'Awalnya terletak rendah di daerah leher; pertumbuhan mandibula mengangkatnya sejajar mata pada minggu ke-12.',
        },
        focusPos: [0.95, 0.65, 0.05],
        cameraPos: [1.4, 0.75, 3.8],
      },
      {
        id: 'pigmented_retina',
        name: { en: 'Pigmented Retina & Eyelid Grooves', id: 'Retina Berpigmen & Lekukan Kelopak Mata' },
        summary: {
          en: 'Dense melanin synthesis within the retinal pigment epithelium clearly visible through developing translucent eyelid folds.',
          id: 'Sintesis melanin pekat pada epitel pigmen retina yang tampak jelas menembus lipatan kelopak mata transparan.',
        },
        clinicalNote: {
          en: 'Eyelids will fuse completely by week 10 and remain sealed until gestational week 26 to protect corneal development.',
          id: 'Kelopak mata akan menyatu erat pada minggu ke-10 dan tetap tertutup hingga minggu ke-26 untuk melindungi kornea.',
        },
        focusPos: [0.55, 0.75, 0.8],
        cameraPos: [0.95, 0.85, 3.6],
      },
    ],
  },
  w12: {
    key: 'w12',
    week: 12,
    carnegieStage: 'End of 1st Trimester',
    title: {
      en: 'Week 12: Skeletal Ossification & Hernia Reduction',
      id: 'Minggu 12: Osifikasi Rangka & Reduksi Hernia',
    },
    period: { en: 'Early Fetal Period (1st Trimester Completion)', id: 'Periode Janin Awal (Penyelesaian Trimester 1)' },
    crl: '85 mm',
    weight: '14 g',
    heartRate: 155,
    heartRateLabel: {
      en: '155 bpm (Doppler Detectable)',
      id: '155 bpm (Dapat Dideteksi Doppler)',
    },
    description: {
      en: 'Marks the end of the first trimester. Intestinal loops retract from the umbilical cord into the enlarged abdominal cavity (rotating 270° counterclockwise). Primary endochondral and intramembranous ossification centers solidify the skull calvarium, 12 rib pairs, and long bone diaphyses.',
      id: 'Menandai akhir trimester pertama. Lengkung usus kembali masuk dari tali pusat ke rongga perut (berputar 270° berlawanan arah jarum jam). Pusat osifikasi endokondral dan intramembranosa memadatkan lempeng tengkorak, 12 pasang iga, dan diafisis tulang panjang.',
    },
    cameraInit: [0, 0, 6.0],
    biometry: { crlMm: 85.0, bpdMm: 21.0, hcMm: 74.0, acMm: 62.0, flMm: 8.5, hadlockGaDays: 84 },
    milestones: [
      {
        id: 'primary_ossification',
        name: { en: 'Primary Diaphyseal Bone Collars (Femur & Skull)', id: 'Kerah Tulang Diafisis Primer (Femur & Tengkorak)' },
        summary: {
          en: 'Vascular osteogenic invasion depositing hydroxyapatite bone collars within hyaline cartilage shafts of long bones.',
          id: 'Invasi osteogenik vaskular yang mendepositkan hidroksiapatit pada batang tulang rawan hialin tulang panjang.',
        },
        clinicalNote: {
          en: 'Femur length (FL) and Biparietal Diameter (BPD) become standardized biometric ultrasound indices for gestational age dating.',
          id: 'Panjang femur (FL) dan BPD menjadi indeks biometri USG standar untuk penentuan usia kehamilan akurat.',
        },
        focusPos: [0.48, -0.95, 0.3],
        cameraPos: [0.85, -0.7, 3.8],
      },
      {
        id: 'hernia_reduction',
        name: { en: 'Complete Midgut Reduction into Abdomen', id: 'Reduksi Usus Tuntas ke Rongga Perut' },
        summary: {
          en: 'Intestines return permanently into the abdominal cavity, securing anatomical peritoneal fixation of cecum and ascending colon.',
          id: 'Usus kembali menetap di rongga abdomen, mengunci fiksasi peritoneum anatomis sekum dan kolon asendens.',
        },
        clinicalNote: {
          en: 'Persistence of herniated bowel loops outside the abdominal wall beyond week 12 mandates urgent karyotype analysis.',
          id: 'Persistensi lengkung usus di luar dinding perut melampaui minggu ke-12 memerlukan analisis kariotipe darurat.',
        },
        focusPos: [0.0, -0.32, 0.55],
        cameraPos: [0.35, -0.2, 3.8],
      },
      {
        id: 'three_vessel_cord',
        name: { en: '3-Vessel Umbilical Cord (2 Arteries, 1 Vein)', id: 'Tali Pusat 3 Pembuluh (2 Arteri, 1 Vena)' },
        summary: {
          en: 'Hydrated Wharton jelly enveloping two spiraling umbilical arteries and one wide umbilical vein connected to placental plate.',
          id: 'Jeli Wharton terhidrasi yang menyelimuti dua arteri umbilikalis spiral dan satu vena lebar ke lempeng plasenta.',
        },
        clinicalNote: {
          en: 'Single Umbilical Artery (SUA) occurs in ~1% of pregnancies and is associated with renal and cardiovascular abnormalities.',
          id: 'Arteri umbilikalis tunggal (SUA) terjadi pada ~1% kehamilan dan berkaitan dengan anomali ginjal serta jantung.',
        },
        focusPos: [0.1, -0.3, 0.85],
        cameraPos: [0.45, -0.15, 3.8],
      },
      {
        id: 'nuchal_translucency',
        name: { en: 'Nuchal Translucency (NT) Sagittal Plane', id: 'Bidang Sagital Nuchal Translucency (NT)' },
        summary: {
          en: 'Subcutaneous fluid pocket behind the fetal neck measured strictly in midsagittal profile between 11+0 and 13+6 weeks.',
          id: 'Rongga cairan subkutan di belakang leher janin diukur ketat pada profil midsagital antara 11+0 hingga 13+6 minggu.',
        },
        clinicalNote: {
          en: 'NT measurement > 3.0 mm strongly correlates with trisomy 21 (Down syndrome), Turner syndrome, and cardiac defects.',
          id: 'Pengukuran NT > 3,0 mm berkorelasi kuat dengan trisomi 21 (Down syndrome), sindrom Turner, dan defek jantung bawaan.',
        },
        focusPos: [0.0, 0.75, 0.4],
        cameraPos: [0.4, 0.85, 3.8],
      },
    ],
  },
  w20: {
    key: 'w20',
    week: 20,
    carnegieStage: 'Mid-Gestation Anatomy Scan',
    title: {
      en: 'Week 20: Vernix, Lanugo & 4-Chamber Heart Symmetry',
      id: 'Minggu 20: Verniks, Lanugo & Simetri Jantung 4 Ruang',
    },
    period: { en: 'Second Trimester Comprehensive Anatomy Scan', id: 'Pemindaian Anatomi Lengkap Trimester Kedua' },
    crl: '165 mm (Full Length: 25 cm)',
    weight: '300 g',
    heartRate: 140,
    heartRateLabel: {
      en: '140 bpm (Stable Autonomic Baseline)',
      id: '140 bpm (Garis Dasar Otonom Stabil)',
    },
    description: {
      en: 'The benchmark epoch for the comprehensive structural anatomy ultrasound. The skin is shielded from amniotic fluid maceration by lipid-rich vernix caseosa and fine lanugo hair. Coordinated neuromuscular reflexes enable active sucking, swallowing, and quickening perception by the mother.',
      id: 'Tonggak standar pemindaian ultrasonografi anatomi struktural lengkap. Kulit terlindung dari maserasi air ketuban oleh verniks kaseosa kaya lipid dan rambut lanugo halus. Refleks neuromuskular memungkinkan isap ibu jari dan gerakan tendangan aktif.',
    },
    cameraInit: [0, 0, 6.2],
    biometry: { crlMm: 165.0, bpdMm: 48.0, hcMm: 175.0, acMm: 150.0, flMm: 33.0, hadlockGaDays: 140 },
    milestones: [
      {
        id: 'four_chamber',
        name: { en: 'Four-Chamber Cardiac Symmetry & Foramen Ovale', id: 'Simetri Jantung 4 Ruang & Foramen Ovale' },
        summary: {
          en: 'Balanced left and right ventricles, intact interventricular septum, and mobile foramen ovale flap shunting right-to-left.',
          id: 'Ventrikel kiri dan kanan simetris, septum interventrikel utuh, dan katup foramen ovale membuka pirau kanan-ke-kiri.',
        },
        clinicalNote: {
          en: 'Mandatory standard screening view: rules out hypoplastic left heart syndrome, large ventricular septal defects (VSD), and AVSD.',
          id: 'Bidang skrining USG wajib: menyingkirkan sindrom hipoplastik jantung kiri dan defek septum ventrikel (VSD).',
        },
        focusPos: [0.1, 0.22, 0.48],
        cameraPos: [0.45, 0.32, 3.6],
      },
      {
        id: 'vernix_lanugo',
        name: { en: 'Vernix Caseosa & Fine Lanugo Coat', id: 'Lapisan Verniks Kaseosa & Rambut Lanugo' },
        summary: {
          en: 'Sebaceous gland lipid secretions mixed with desquamated corneocytes providing waterproof antimicrobial epidermal barrier.',
          id: 'Sekresi lipid kelenjar sebasea bercampur sel korneosit yang menghasilkan pelindung epidermis kedap air dan antimikroba.',
        },
        clinicalNote: {
          en: 'Protects against fluid loss and maceration; lanugo hair helps anchor the vernix coat to the immature stratum corneum.',
          id: 'Melindungi kulit janin dari maserasi air ketuban; lanugo berfungsi menahan lapisan verniks pada kulit.',
        },
        focusPos: [0.35, 0.35, 0.6],
        cameraPos: [0.75, 0.5, 3.8],
      },
      {
        id: 'ossified_vertebrae',
        name: { en: 'Vertebral Ossification & Acoustic Shadowing', id: 'Osifikasi Kolumna Vertebra & Bayangan Akustik' },
        summary: {
          en: 'Three ossification centers per vertebra (one centrum, two neural arch laminae) creating crisp acoustic ultrasound shadows.',
          id: 'Tiga pusat osifikasi per vertebra (satu korpus, dua lamina arkus) yang menghasilkan bayangan akustik USG tajam.',
        },
        clinicalNote: {
          en: 'Serial axial ultrasound sweeps verify intact skin covering over the posterior spine, excluding spina bifida aperta.',
          id: 'Pemindaian aksial serial memastikan penutupan kulit intak di atas tulang belakang, menyingkirkan spina bifida.',
        },
        focusPos: [-0.2, 0.25, -0.55],
        cameraPos: [-0.85, 0.35, 4.0],
      },
      {
        id: 'quickening_grasp',
        name: { en: 'Active Thumb Sucking & Grasp Reflex', id: 'Refleks Isap Ibu Jari & Genggaman Aktif' },
        summary: {
          en: 'Myelinated corticospinal tracts allowing coordinated limb movement, thumb opposition, and tactile facial exploration.',
          id: 'Traktus kortikospinal bermielin yang memungkinkan gerakan terkoordinasi, oposisi ibu jari, dan eksplorasi taktil wajah.',
        },
        clinicalNote: {
          en: 'Provides clinical reassurance of intact central nervous system and brainstem neuromotor integrity.',
          id: 'Memberikan konfirmasi klinis atas integritas neuromotorik sistem saraf pusat dan batang otak janin.',
        },
        focusPos: [0.35, 0.85, 0.6],
        cameraPos: [0.75, 0.95, 3.6],
      },
    ],
  },
  w36: {
    key: 'w36',
    week: 36,
    carnegieStage: 'Late 3rd Trimester',
    title: {
      en: 'Week 36+: Cephalic Presentation & Term Maturation',
      id: 'Minggu 36+: Presentasi Kepala & Pematangan Aterm',
    },
    period: { en: 'Term Fetal Maturation (Neonatal Readiness)', id: 'Pematangan Janin Cukup Bulan (Kesiapan Neonatus)' },
    crl: '340 mm (Full Length: 48–50 cm)',
    weight: '2,750 g',
    heartRate: 130,
    heartRateLabel: {
      en: '130 bpm (Mature Autonomic Control)',
      id: '130 bpm (Kendali Otonom Matang)',
    },
    description: {
      en: 'Nearing full term. The fetus assumes the cephalic vertex posture with head engaged in the maternal pelvic brim. Abundant subcutaneous white adipose tissue fills out skin folds. Cranial sutures and open fontanelles allow essential cranial bone molding during passage through the birth canal.',
      id: 'Mendekati masa cukup bulan. Janin mengadopsi postur presentasi kepala (verteks) yang masuk ke pintu atas panggul. Lemak putih subkutan menghaluskan lipatan kulit. Sutura kranium dan fontanela terbuka memungkinkan molding kepala saat persalinan.',
    },
    cameraInit: [0, 0, 6.4],
    biometry: { crlMm: 340.0, bpdMm: 90.0, hcMm: 320.0, acMm: 325.0, flMm: 70.0, hadlockGaDays: 252 },
    milestones: [
      {
        id: 'cephalic_vertex',
        name: { en: 'Cephalic Vertex Presentation (Pelvic Engagement)', id: 'Presentasi Kepala Verteks (Masuk Pintu Panggul)' },
        summary: {
          en: 'Flexed head positioned downward into the pelvic inlet with the occiput presenting, achieving optimal labor biomechanics.',
          id: 'Kepala fleksi menghadap ke bawah di pintu atas panggul dengan ubun-ubun kecil memimpin, biomekanika persalinan optimal.',
        },
        clinicalNote: {
          en: 'Present in 95% of term singletons. Non-cephalic presentations (breech, transverse lie) necessitate external version or Cesarean.',
          id: 'Terjadi pada 95% kehamilan tunggal aterm. Presentasi sungsang memerlukan versi luar atau operasi sesar terencana.',
        },
        focusPos: [0.0, -0.85, 0.25],
        cameraPos: [0.35, -0.7, 4.0],
      },
      {
        id: 'cranial_fontanelles',
        name: { en: 'Cranial Sutures & Diamond Fontanelle', id: 'Sutura Kranium & Fontanela Mayor (Ubun-Ubun)' },
        summary: {
          en: 'Fibrous suture lines and flexible fontanelles separating calvarial bone plates (frontal, parietal, occipital).',
          id: 'Garis sutura fibrosa dan fontanela lentur yang memisahkan lempeng tulang tengkorak (frontal, parietal, oksipital).',
        },
        clinicalNote: {
          en: 'Permits reversible calvarial bone overlap (cranial molding) during delivery and rapid post-natal brain volume expansion.',
          id: 'Memungkinkan tumpang tindih lempeng tulang kepala (molding) saat persalinan dan ekspansi volume otak pasca lahir.',
        },
        focusPos: [0.0, -1.25, 0.65],
        cameraPos: [0.35, -1.05, 3.8],
      },
      {
        id: 'fetal_shunts',
        name: { en: 'The 3 Specialized Fetal Circulatory Shunts', id: '3 Pirau Sirkulasi Janin Khusus' },
        summary: {
          en: 'Ductus Venosus (liver bypass), Foramen Ovale (interatrial shunt), and Ductus Arteriosus (pulmonary bypass to aorta).',
          id: 'Duktus Venosus (melewati hati), Foramen Ovale (pirau antar-atrium), dan Duktus Arteriosus (pirau paru ke aorta desendens).',
        },
        clinicalNote: {
          en: 'At birth, pulmonary expansion drops vascular resistance and cord clamping closes foramen ovale and initiates ductus arteriosus constriction.',
          id: 'Saat lahir, pengembangan paru menurunkan resistensi vaskular dan penjepitan tali pusat menutup foramen ovale serta memicu konstriksi duktus arteriosus.',
        },
        focusPos: [0.12, 0.45, 0.7],
        cameraPos: [0.45, 0.55, 3.8],
      },
      {
        id: 'helical_cord_placenta',
        name: { en: 'Helical Umbilical Cord & Placental Cake', id: 'Tali Pusat Spiral & Lempeng Plasenta' },
        summary: {
          en: 'Two spiral umbilical arteries and one wide umbilical vein enveloped in hydrated Wharton jelly matrix, attached to placental cotyledons.',
          id: 'Dua arteri umbilikalis spiral dan satu vena lebar dalam jeli Wharton terhidrasi, menempel pada kotiledon lempeng plasenta.',
        },
        clinicalNote: {
          en: 'High turgor pressure of Wharton’s jelly prevents vascular collapse from cord compression during uterine contractions.',
          id: 'Tekanan turgor tinggi jeli Wharton mencegah kolaps pembuluh darah akibat kompresi tali pusat selama his persalinan.',
        },
        focusPos: [0.2, 0.35, 1.6],
        cameraPos: [0.6, 0.5, 4.2],
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// Parametric Organic Mesh Lofting Utilities
// -----------------------------------------------------------------------------

function createOrganicLoftedGeometry(
  curve: THREE.CatmullRomCurve3,
  radiusProfile: (t: number) => number,
  tubularSegments: number = 64,
  radialSegments: number = 24,
  flattenXFactor: (t: number) => number = () => 1.0,
  flattenZFactor: (t: number) => number = () => 1.0
): THREE.BufferGeometry {
  const points = curve.getPoints(tubularSegments);
  const frenetFrames = curve.computeFrenetFrames(tubularSegments, false);

  const vertices: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const pt = points[i];
    const normal = frenetFrames.normals[i];
    const binormal = frenetFrames.binormals[i];
    const baseRadius = Math.max(0.02, radiusProfile(t));
    const fx = flattenXFactor(t);
    const fz = flattenZFactor(t);

    for (let j = 0; j <= radialSegments; j++) {
      const u = j / radialSegments;
      const angle = u * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const rx = cosA * baseRadius * fx;
      const rz = sinA * baseRadius * fz;

      const vx = pt.x + normal.x * rx + binormal.x * rz;
      const vy = pt.y + normal.y * rx + binormal.y * rz;
      const vz = pt.z + normal.z * rx + binormal.z * rz;

      vertices.push(vx, vy, vz);

      const nx = normal.x * cosA + binormal.x * sinA;
      const ny = normal.y * cosA + binormal.y * sinA;
      const nz = normal.z * cosA + binormal.z * sinA;
      const len = Math.hypot(nx, ny, nz) || 1;
      normals.push(nx / len, ny / len, nz / len);

      uvs.push(u, t);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // Cranial end cap (hemispherical closure)
  const cranialCapCenterIndex = vertices.length / 3;
  const cPt = points[0];
  const cTangent = frenetFrames.tangents[0];
  vertices.push(cPt.x, cPt.y, cPt.z);
  normals.push(-cTangent.x, -cTangent.y, -cTangent.z);
  uvs.push(0.5, 0.0);

  for (let j = 0; j < radialSegments; j++) {
    indices.push(cranialCapCenterIndex, j, j + 1);
  }

  // Caudal end cap
  const caudalCapCenterIndex = vertices.length / 3;
  const caudalPt = points[tubularSegments];
  const caudalTangent = frenetFrames.tangents[tubularSegments];
  vertices.push(caudalPt.x, caudalPt.y, caudalPt.z);
  normals.push(caudalTangent.x, caudalTangent.y, caudalTangent.z);
  uvs.push(0.5, 1.0);

  const lastRingStart = tubularSegments * (radialSegments + 1);
  for (let j = 0; j < radialSegments; j++) {
    indices.push(caudalCapCenterIndex, lastRingStart + j + 1, lastRingStart + j);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  return geometry;
}

// -----------------------------------------------------------------------------
// Procedural High-Fidelity Anatomical Sculpting Generators
// -----------------------------------------------------------------------------

/**
 * Procedurally sculpts an organic human embryonic/fetal cranium and facial geometry
 * by applying continuous anatomical heightfield deformations across a subdivided sphere.
 * Deformations produce cranial vaults (forehead, parietal curves, occiput), orbital sockets,
 * smooth nasal bridge & tip, cheeks with buccal fat, philtrum, upper/lower lips, chin, and jawline.
 */
function createSculptedFetalHeadGeometry(
  stage: GestationalStage,
  radius: number = 1.3,
  widthSegs: number = 48,
  heightSegs: number = 48
): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(radius, widthSegs, heightSegs);
  const pos = geo.attributes.position;
  const count = pos.count;

  // Stage-specific morphogenetic parameter scalers
  const cheekFullness = stage === 'w8' ? 0.05 : stage === 'w12' ? 0.09 : stage === 'w20' ? 0.15 : 0.22;
  const chinProminence = stage === 'w8' ? 0.07 : stage === 'w12' ? 0.14 : stage === 'w20' ? 0.18 : 0.22;
  const noseLength = stage === 'w8' ? 0.11 : stage === 'w12' ? 0.17 : stage === 'w20' ? 0.22 : 0.26;
  const foreheadSlope = stage === 'w8' ? 0.16 : stage === 'w12' ? 0.14 : stage === 'w20' ? 0.12 : 0.10;

  for (let i = 0; i < count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    const nx = x / radius;
    const ny = y / radius;
    const nz = z / radius;

    // 1. Anteroposterior cranial elongation (mesaticephalic skull ratio)
    z *= 1.08;

    // 2. Biparietal lateral expansion (widest upper-posterior skull across parietal bones)
    if (ny > 0.0 && nz < 0.25) {
      const pFactor = Math.exp(-((ny - 0.35) ** 2) / 0.18 - ((nz + 0.15) ** 2) / 0.22);
      x *= 1.0 + 0.15 * pFactor;
    }

    // 3. Frontal bossing (smooth prominent fetal forehead dome)
    if (ny > 0.15 && nz > 0.2) {
      const fFactor = Math.exp(-((ny - 0.42) ** 2) / 0.12 - (nx ** 2) / 0.22) * Math.max(0, nz);
      z += radius * foreheadSlope * fFactor;
    }

    // 4. Occipital protuberance (curved posterior skull base)
    if (ny > -0.25 && nz < -0.2) {
      const oFactor = Math.exp(-((ny - 0.1) ** 2) / 0.20 - (nx ** 2) / 0.28) * (-nz);
      z -= radius * 0.14 * oFactor;
    }

    // 5. Temporal indentations (subtle narrowing above zygomatic arch)
    if (Math.abs(nx) > 0.45 && ny > -0.05 && ny < 0.45 && nz > -0.2 && nz < 0.4) {
      const tFactor = Math.exp(-((Math.abs(nx) - 0.65) ** 2) / 0.05 - ((ny - 0.2) ** 2) / 0.08);
      x *= 1.0 - 0.07 * tFactor;
    }

    // 6. Facial Sculpting (Anterior, lower cranium: nz > 0.15, ny < 0.35)
    if (nz > 0.15 && ny < 0.35) {
      // 6a. Orbital socket depressions (left & right eye cavities)
      const dEyeL = Math.hypot(nx - 0.36, ny - 0.08);
      const dEyeR = Math.hypot(nx + 0.36, ny - 0.08);
      const eyeDepression = (Math.exp(-(dEyeL ** 2) / 0.022) + Math.exp(-(dEyeR ** 2) / 0.022)) * Math.max(0, nz);
      z -= radius * 0.13 * eyeDepression;

      // 6b. Supraorbital brow ridge
      if (ny > 0.12 && ny < 0.28) {
        const browFactor = Math.exp(-((ny - 0.19) ** 2) / 0.015 - ((Math.abs(nx) - 0.32) ** 2) / 0.035) * nz;
        z += radius * 0.06 * browFactor;
      }

      // 6c. Nasal bridge and tip
      if (Math.abs(nx) < 0.28 && ny > -0.15 && ny < 0.2) {
        // Nasal bridge between orbits
        const bridge = Math.exp(-(nx ** 2) / 0.014) * Math.max(0, 1 - Math.abs(ny - 0.06) / 0.14);
        // Nasal tip bulb
        const tip = Math.exp(-(nx ** 2) / 0.016 - ((ny + 0.03) ** 2) / 0.018) * nz;
        z += radius * noseLength * (bridge * 0.5 + tip * 0.85);

        // Nostril depression under tip
        if (ny < -0.02 && ny > -0.08 && Math.abs(nx) < 0.14) {
          y += radius * 0.03 * Math.exp(-(nx ** 2) / 0.008);
        }
      }

      // 6d. Cheeks (buccal fat fullness)
      if (ny > -0.3 && ny < 0.05 && Math.abs(nx) > 0.2 && Math.abs(nx) < 0.65) {
        const cheek = Math.exp(-((ny + 0.12) ** 2) / 0.035 - ((Math.abs(nx) - 0.38) ** 2) / 0.04) * nz;
        z += radius * cheekFullness * cheek;
        x += Math.sign(x) * radius * cheekFullness * 0.4 * cheek;
      }

      // 6e. Philtrum groove (midline groove above upper lip)
      if (Math.abs(nx) < 0.12 && ny > -0.16 && ny < -0.04) {
        const philtrum = Math.exp(-(nx ** 2) / 0.004) * Math.max(0, 1 - Math.abs(ny + 0.1) / 0.07);
        z -= radius * 0.035 * philtrum;
      }

      // 6f. Upper lip contour
      if (Math.abs(nx) < 0.24 && ny > -0.19 && ny < -0.11) {
        const upperLip = Math.exp(-((ny + 0.15) ** 2) / 0.006 - (nx ** 2) / 0.022);
        z += radius * 0.075 * upperLip;
      }

      // 6g. Oral fissure / mouth crease
      if (Math.abs(nx) < 0.26 && ny > -0.22 && ny < -0.16) {
        const mouthCrease = Math.exp(-((ny + 0.19) ** 2) / 0.004 - (nx ** 2) / 0.03);
        z -= radius * 0.055 * mouthCrease;
      }

      // 6h. Lower lip contour
      if (Math.abs(nx) < 0.22 && ny > -0.27 && ny < -0.20) {
        const lowerLip = Math.exp(-((ny + 0.235) ** 2) / 0.006 - (nx ** 2) / 0.02);
        z += radius * 0.065 * lowerLip;
      }

      // 6i. Chin (mental protuberance)
      if (Math.abs(nx) < 0.3 && ny > -0.48 && ny < -0.28) {
        const chin = Math.exp(-((ny + 0.37) ** 2) / 0.018 - (nx ** 2) / 0.032) * nz;
        z += radius * chinProminence * chin;
        y += radius * chinProminence * 0.25 * chin;
      }
    }

    // 7. Submandibular jawline & cervical neck blending (Inferior cranium: ny < -0.5)
    if (ny < -0.5) {
      const neckFactor = Math.min(1.0, (-ny - 0.5) / 0.4);
      const blend = 1.0 - neckFactor * 0.35;
      x *= blend;
      z *= blend;
    }

    pos.setXYZ(i, x, y, z);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Creates anatomically recessed, delicate eyelids with palpebral crease.
 * In Week 8, shows the retinal pigment epithelium disc through translucent tissue.
 */
function createSculptedFetalEyelids(
  isLeft: boolean,
  stage: GestationalStage,
  skinMat: THREE.Material
): THREE.Group {
  const eyeGroup = new THREE.Group();
  const side = isLeft ? 1 : -1;
  const eyeRadius = stage === 'w8' ? 0.2 : stage === 'w12' ? 0.22 : stage === 'w20' ? 0.26 : 0.3;

  if (stage === 'w8') {
    // Week 8: Retinal pigment epithelium clearly visible under translucent lid
    const sclera = new THREE.Mesh(
      new THREE.SphereGeometry(eyeRadius, 20, 20),
      skinMat
    );
    sclera.scale.set(1.0, 0.8, 0.45);
    eyeGroup.add(sclera);

    const pupil = new THREE.Mesh(
      new THREE.CircleGeometry(eyeRadius * 0.65, 24),
      new THREE.MeshBasicMaterial({ color: 0x09090b })
    );
    pupil.position.set(0, 0, eyeRadius * 0.38);
    eyeGroup.add(pupil);
  } else {
    // Week 12, 20, 36: Fused eyelids with palpebral crease
    const upperLidGeo = new THREE.SphereGeometry(eyeRadius, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const upperLid = new THREE.Mesh(upperLidGeo, skinMat);
    upperLid.scale.set(1.08, 0.62, 0.42);
    upperLid.rotation.x = Math.PI * 0.46;
    eyeGroup.add(upperLid);

    const lowerLidGeo = new THREE.SphereGeometry(eyeRadius * 0.96, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const lowerLid = new THREE.Mesh(lowerLidGeo, skinMat);
    lowerLid.scale.set(1.05, 0.58, 0.4);
    lowerLid.rotation.x = -Math.PI * 0.46;
    eyeGroup.add(lowerLid);

    // Fine palpebral slit crease line
    const slitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-eyeRadius * 0.85, 0, eyeRadius * 0.32),
      new THREE.Vector3(0, eyeRadius * 0.06, eyeRadius * 0.4),
      new THREE.Vector3(eyeRadius * 0.85, 0, eyeRadius * 0.32),
    ]);
    const slitLine = new THREE.Mesh(
      new THREE.TubeGeometry(slitCurve, 16, 0.015, 6, false),
      new THREE.MeshBasicMaterial({ color: 0x7f1d1d })
    );
    eyeGroup.add(slitLine);
  }

  eyeGroup.rotation.y = side * 0.35;
  eyeGroup.rotation.z = side * -0.08;
  return eyeGroup;
}

/**
 * Creates an anatomical external ear auricle (pinna) with helix rim, conchal bowl, tragus, and lobule.
 * In Week 8, renders the 6 auricular hillocks of His coalescing on the lateral neck.
 */
function createSculptedFetalEar(
  isLeft: boolean,
  stage: GestationalStage,
  skinMat: THREE.Material
): THREE.Group {
  const earGroup = new THREE.Group();
  const side = isLeft ? 1 : -1;
  const s = stage === 'w8' ? 0.75 : stage === 'w12' ? 0.9 : stage === 'w20' ? 1.1 : 1.25;

  if (stage === 'w8') {
    // Week 8: 6 Auricular Hillocks of His derived from arches 1 & 2
    for (let h = 0; h < 6; h++) {
      const angle = (h / 5) * Math.PI * 0.9 - Math.PI * 0.45;
      const nodule = new THREE.Mesh(
        new THREE.SphereGeometry(0.065 * s, 12, 12),
        skinMat
      );
      nodule.position.set(Math.sin(angle) * 0.12 * s, Math.cos(angle) * 0.16 * s, (h % 2 === 0 ? 0.02 : -0.02) * s);
      earGroup.add(nodule);
    }
  } else {
    // Week 12, 20, 36: Anatomical external pinna with outer helix, antihelix, concha, and lobule
    const helixCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.22 * s, 0.02 * s),
      new THREE.Vector3(0.12 * s * side, -0.15 * s, 0.05 * s),
      new THREE.Vector3(0.16 * s * side, 0.05 * s, 0.08 * s),
      new THREE.Vector3(0.12 * s * side, 0.22 * s, 0.06 * s),
      new THREE.Vector3(0, 0.25 * s, 0.03 * s),
      new THREE.Vector3(-0.08 * s * side, 0.15 * s, 0),
    ]);
    const helixMesh = new THREE.Mesh(
      new THREE.TubeGeometry(helixCurve, 24, 0.042 * s, 10, false),
      skinMat
    );
    earGroup.add(helixMesh);

    const concha = new THREE.Mesh(
      new THREE.SphereGeometry(0.14 * s, 16, 16),
      skinMat
    );
    concha.scale.set(0.35, 1.2, 0.8);
    concha.position.set(0.04 * s * side, 0.02 * s, 0.02 * s);
    earGroup.add(concha);

    const tragus = new THREE.Mesh(
      new THREE.SphereGeometry(0.05 * s, 10, 10),
      skinMat
    );
    tragus.position.set(-0.08 * s * side, -0.04 * s, 0.06 * s);
    earGroup.add(tragus);
  }

  earGroup.rotation.y = side * 0.45;
  earGroup.rotation.x = 0.08;
  return earGroup;
}

/**
 * Creates an organic articulated fetal hand with palm, thenar mass, and 5 delicate articulated fingers.
 */
function createSculptedFetalHand(
  isLeft: boolean,
  stage: GestationalStage,
  skinMat: THREE.Material,
  pose: 'chest' | 'mouth' | 'relaxed' = 'chest'
): THREE.Group {
  const hand = new THREE.Group();
  const side = isLeft ? 1 : -1;
  const s = stage === 'w8' ? 0.7 : stage === 'w12' ? 0.88 : stage === 'w20' ? 1.05 : 1.2;

  // 1. Contoured palm
  const palmGeo = new THREE.SphereGeometry(0.16 * s, 18, 18);
  palmGeo.scale(1.2, 0.55, 1.35);
  const palm = new THREE.Mesh(palmGeo, skinMat);
  hand.add(palm);

  // Thenar eminence (thumb base prominence)
  const thenar = new THREE.Mesh(
    new THREE.SphereGeometry(0.09 * s, 12, 12),
    skinMat
  );
  thenar.scale.set(1.1, 0.7, 1.2);
  thenar.position.set(-0.1 * s * side, -0.02 * s, -0.05 * s);
  hand.add(thenar);

  // 2. Five Articulated Fingers
  const fingerLengths = [0.22, 0.32, 0.36, 0.33, 0.26];
  const fingerRadii = [0.038, 0.034, 0.035, 0.033, 0.028];

  // Thumb: Abducted and opposed
  const thumbBase = new THREE.Vector3(-0.12 * s * side, 0.01 * s, -0.02 * s);
  const thumbCurl = pose === 'mouth' && !isLeft ? 0.45 : 0.35;
  const thumbPts = [
    thumbBase,
    new THREE.Vector3(thumbBase.x - 0.08 * s * side, thumbBase.y + 0.06 * s, thumbBase.z + 0.08 * s),
    new THREE.Vector3(thumbBase.x - 0.12 * s * side, thumbBase.y + 0.12 * s, thumbBase.z + 0.15 * s + thumbCurl * 0.05),
  ];
  const thumbCurve = new THREE.CatmullRomCurve3(thumbPts);
  const thumbMesh = new THREE.Mesh(
    new THREE.TubeGeometry(thumbCurve, 12, fingerRadii[0] * s, 8, false),
    skinMat
  );
  hand.add(thumbMesh);

  const thumbTip = new THREE.Mesh(
    new THREE.SphereGeometry(fingerRadii[0] * s * 1.05, 10, 10),
    skinMat
  );
  thumbTip.position.copy(thumbPts[2]);
  hand.add(thumbTip);

  // Four Fingers (Index, Middle, Ring, Little)
  for (let f = 0; f < 4; f++) {
    const spread = (f - 1.5) * 0.085 * s;
    const len = fingerLengths[f + 1] * s;
    const r = fingerRadii[f + 1] * s;

    const flexAngle = pose === 'mouth' && !isLeft
      ? 0.75 + f * 0.08
      : pose === 'chest'
      ? 0.55 + f * 0.06
      : 0.42;

    const basePt = new THREE.Vector3(spread * side, 0.01 * s, 0.14 * s);
    const midPt = new THREE.Vector3(
      spread * side * 1.05,
      basePt.y - Math.sin(flexAngle) * len * 0.5,
      basePt.z + Math.cos(flexAngle) * len * 0.55
    );
    const tipPt = new THREE.Vector3(
      spread * side * 1.1,
      midPt.y - Math.sin(flexAngle * 1.6) * len * 0.45,
      midPt.z + Math.cos(flexAngle * 1.6) * len * 0.4
    );

    const fCurve = new THREE.CatmullRomCurve3([basePt, midPt, tipPt]);
    const fMesh = new THREE.Mesh(
      new THREE.TubeGeometry(fCurve, 12, r, 8, false),
      skinMat
    );
    hand.add(fMesh);

    const fTip = new THREE.Mesh(
      new THREE.SphereGeometry(r * 1.06, 10, 10),
      skinMat
    );
    fTip.position.copy(tipPt);
    hand.add(fTip);
  }

  return hand;
}

/**
 * Creates an organic articulated fetal foot with rounded calcaneus (heel), plantar arch,
 * malleoli ankle prominences, forefoot metatarsal pad, and 5 delicate articulated toes.
 */
function createSculptedFetalFoot(
  isLeft: boolean,
  stage: GestationalStage,
  skinMat: THREE.Material
): THREE.Group {
  const foot = new THREE.Group();
  const side = isLeft ? 1 : -1;
  const s = stage === 'w8' ? 0.7 : stage === 'w12' ? 0.88 : stage === 'w20' ? 1.05 : 1.25;

  // 1. Calcaneus (Heel)
  const heelGeo = new THREE.SphereGeometry(0.13 * s, 16, 16);
  heelGeo.scale(0.95, 1.1, 1.2);
  const heel = new THREE.Mesh(heelGeo, skinMat);
  heel.position.set(0, -0.06 * s, -0.16 * s);
  foot.add(heel);

  // 2. Midfoot with longitudinal plantar arch
  const midfootGeo = new THREE.SphereGeometry(0.14 * s, 16, 16);
  midfootGeo.scale(1.15, 0.8, 1.4);
  const midfoot = new THREE.Mesh(midfootGeo, skinMat);
  midfoot.position.set(0, -0.04 * s, 0.04 * s);
  foot.add(midfoot);

  // 3. Forefoot Pad (Ball of foot)
  const forefootGeo = new THREE.SphereGeometry(0.145 * s, 16, 16);
  forefootGeo.scale(1.28, 0.65, 0.95);
  const forefoot = new THREE.Mesh(forefootGeo, skinMat);
  forefoot.position.set(0, -0.05 * s, 0.2 * s);
  foot.add(forefoot);

  // 4. Malleoli (Medial & Lateral Ankle Prominences)
  const malleolusMed = new THREE.Mesh(
    new THREE.SphereGeometry(0.065 * s, 10, 10),
    skinMat
  );
  malleolusMed.position.set(-0.13 * s * side, 0.04 * s, -0.08 * s);
  foot.add(malleolusMed);

  const malleolusLat = new THREE.Mesh(
    new THREE.SphereGeometry(0.06 * s, 10, 10),
    skinMat
  );
  malleolusLat.position.set(0.13 * s * side, 0.02 * s, -0.08 * s);
  foot.add(malleolusLat);

  // 5. Five Sculpted Toes (Hallux to digit 5)
  const toeLengths = [0.15, 0.135, 0.125, 0.11, 0.095];
  const toeRadii = [0.042, 0.035, 0.033, 0.031, 0.028];

  for (let t = 0; t < 5; t++) {
    const toeSpread = (-0.11 + t * 0.055) * s * side;
    const len = toeLengths[t] * s;
    const r = toeRadii[t] * s;

    const basePt = new THREE.Vector3(toeSpread, -0.05 * s, 0.26 * s);
    const midPt = new THREE.Vector3(toeSpread * 1.02, -0.06 * s, 0.26 * s + len * 0.55);
    const tipPt = new THREE.Vector3(toeSpread * 1.04, -0.08 * s, 0.26 * s + len);

    const toeCurve = new THREE.CatmullRomCurve3([basePt, midPt, tipPt]);
    const toeMesh = new THREE.Mesh(
      new THREE.TubeGeometry(toeCurve, 10, r, 8, false),
      skinMat
    );
    foot.add(toeMesh);

    const toeTip = new THREE.Mesh(
      new THREE.SphereGeometry(r * 1.08, 10, 10),
      skinMat
    );
    toeTip.position.copy(tipPt);
    foot.add(toeTip);
  }

  return foot;
}

/**
 * Creates an organic, integrated cranial and facial anatomical group.
 * Locks the sculpted cranium, eyelids with palpebral crease / retinal pigments,
 * lateral ear pinnae, and (for term fetuses) calvarial sutures & anterior fontanelle
 * into a single coordinated parent-child transformation tree.
 */
function createSculptedFetalHeadGroup(
  stage: GestationalStage,
  radius: number,
  skinMat: THREE.Material,
  boneMat: THREE.Material
): THREE.Group {
  const headGroup = new THREE.Group();

  // 1. Sculpted Craniofacial Mesh
  const headGeo = createSculptedFetalHeadGeometry(
    stage,
    radius,
    stage === 'w36' ? 56 : stage === 'w20' ? 54 : stage === 'w12' ? 52 : 48,
    stage === 'w36' ? 56 : stage === 'w20' ? 54 : stage === 'w12' ? 52 : 48
  );
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.renderOrder = 4;
  headGroup.add(headMesh);

  // 2. Eyes & Eyelids (precisely mounted in orbital socket depressions)
  // Orbital depression centers: nx = ±0.36, ny = 0.08, depressed z = 0.88 * radius
  const eyeX = 0.36 * radius;
  const eyeY = 0.08 * radius;
  const eyeZ = 0.88 * radius;

  const eyeL = createSculptedFetalEyelids(true, stage, skinMat);
  eyeL.position.set(eyeX, eyeY, eyeZ);
  eyeL.rotation.y = 0.32;
  eyeL.rotation.x = -0.04;
  headGroup.add(eyeL);

  const eyeR = createSculptedFetalEyelids(false, stage, skinMat);
  eyeR.position.set(-eyeX, eyeY, eyeZ);
  eyeR.rotation.y = -0.32;
  eyeR.rotation.x = -0.04;
  headGroup.add(eyeR);

  // 3. External Ear Pinnae / Auricular Hillocks (mounted on lateral cranium/neck)
  const earX = 0.95 * radius;
  const earY = stage === 'w8' ? -0.12 * radius : -0.04 * radius;
  const earZ = -0.10 * radius;

  const earL = createSculptedFetalEar(true, stage, skinMat);
  earL.position.set(earX, earY, earZ);
  headGroup.add(earL);

  const earR = createSculptedFetalEar(false, stage, skinMat);
  earR.position.set(-earX, earY, earZ);
  headGroup.add(earR);

  // 4. Term Cranial Sutures & Diamond Anterior Fontanelle (Bregma) on vertex calvarium
  if (stage === 'w36') {
    const fontanelleShape = new THREE.Shape();
    fontanelleShape.moveTo(0, 0.18);
    fontanelleShape.lineTo(0.14, 0);
    fontanelleShape.lineTo(0, -0.18);
    fontanelleShape.lineTo(-0.14, 0);
    fontanelleShape.closePath();
    const fontanelleGeo = new THREE.ShapeGeometry(fontanelleShape);
    const fontanelleMesh = new THREE.Mesh(fontanelleGeo, boneMat);
    fontanelleMesh.position.set(0, 0.96 * radius, 0.35 * radius);
    fontanelleMesh.rotation.x = -Math.PI * 0.35;
    fontanelleMesh.renderOrder = 5;
    headGroup.add(fontanelleMesh);

    const sSagittal = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.72), boneMat);
    sSagittal.position.set(0, 0.96 * radius, 0.35 * radius);
    sSagittal.rotation.x = -Math.PI * 0.35;
    sSagittal.renderOrder = 5;
    headGroup.add(sSagittal);

    const sCoronal = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.02, 0.04), boneMat);
    sCoronal.position.set(0, 0.96 * radius, 0.35 * radius);
    sCoronal.rotation.x = -Math.PI * 0.35;
    sCoronal.renderOrder = 5;
    headGroup.add(sCoronal);
  }

  return headGroup;
}

// -----------------------------------------------------------------------------
// Procedural Canvas Textures for Epidermal Pigment, Vernix, & Sonogram
// -----------------------------------------------------------------------------

function createProceduralTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    draw(ctx, width, height);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function generateAnatomicalSkinTexture(stage: GestationalStage, isUSG: boolean): THREE.CanvasTexture {
  return createProceduralTexture(512, 512, (ctx, w, h) => {
    if (isUSG) {
      // Diagnostic Ultrasound Acoustic Echogenicity Texture with fine speckle noise
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const speckle = (Math.random() - 0.5) * 55;
        const base = Math.min(255, Math.max(0, 42 + speckle));
        data[i] = base;
        data[i + 1] = base + 3;
        data[i + 2] = base + 6;
      }
      ctx.putImageData(imgData, 0, 0);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      for (let s = 0; s < 20; s++) {
        const y = Math.random() * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + (Math.random() - 0.5) * 6);
        ctx.stroke();
      }
      return;
    }

    const grad = ctx.createLinearGradient(0, 0, w, h);
    if (stage === 'w1') {
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(0.5, '#e2e8f0');
      grad.addColorStop(1, '#cbd5e1');
    } else if (stage === 'w4') {
      grad.addColorStop(0, '#fed7aa');
      grad.addColorStop(0.5, '#fecdd3');
      grad.addColorStop(1, '#fda4af');
    } else if (stage === 'w8') {
      grad.addColorStop(0, '#ffe4e6');
      grad.addColorStop(0.5, '#fecdd3');
      grad.addColorStop(1, '#fda4af');
    } else if (stage === 'w12') {
      grad.addColorStop(0, '#ffedd5');
      grad.addColorStop(0.5, '#fed7aa');
      grad.addColorStop(1, '#fecdd3');
    } else if (stage === 'w20') {
      grad.addColorStop(0, '#fed7aa');
      grad.addColorStop(0.6, '#fecdd3');
      grad.addColorStop(1, '#fb7185');
    } else {
      // w36: Subcutaneous adipose tone
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#fed7aa');
      grad.addColorStop(0.8, '#fecdd3');
      grad.addColorStop(1, '#fda4af');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Microvascular capillary arborization
    ctx.lineWidth = 0.8;
    for (let c = 0; c < 16; c++) {
      ctx.strokeStyle = c % 2 === 0 ? 'rgba(225, 29, 72, 0.10)' : 'rgba(185, 28, 28, 0.06)';
      ctx.beginPath();
      let sx = Math.random() * w;
      let sy = Math.random() * h;
      ctx.moveTo(sx, sy);
      for (let s = 0; s < 5; s++) {
        sx += (Math.random() - 0.5) * 45;
        sy += (Math.random() - 0.5) * 45;
        ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Week 20: Vernix caseosa lipid deposits
    if (stage === 'w20') {
      for (let v = 0; v < 40; v++) {
        const vx = Math.random() * w;
        const vy = Math.random() * h;
        const vr = Math.random() * 18 + 6;
        const vGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
        vGrad.addColorStop(0, 'rgba(255, 255, 255, 0.40)');
        vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = vGrad;
        ctx.beginPath();
        ctx.arc(vx, vy, vr, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

function generateBoneTexture(isOssification: boolean, isUSG: boolean): THREE.CanvasTexture {
  return createProceduralTexture(256, 256, (ctx, w, h) => {
    if (isUSG) {
      // Bone reflects ultrasound strongly = Hyperechoic brilliant white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      for (let y = 0; y < h; y += 5) {
        ctx.fillRect(0, y, w, 1.2);
      }
      return;
    }

    if (isOssification) {
      // Golden hydroxyapatite mineralization gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.5, '#fde047');
      grad.addColorStop(1, '#eab308');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(161, 98, 7, 0.3)';
      ctx.lineWidth = 1.2;
      for (let o = 0; o < 9; o++) {
        const ox = ((o % 3) + 0.5) * (w / 3);
        const oy = (Math.floor(o / 3) + 0.5) * (h / 3);
        for (let r = 5; r <= 20; r += 5) {
          ctx.beginPath();
          ctx.arc(ox, oy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      return;
    }

    // Cartilage / Chondroid hyaline matrix
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  });
}

// -----------------------------------------------------------------------------
// Component Implementation
// -----------------------------------------------------------------------------

export const EmbryoViewer: React.FC = () => {
  const { language, settings, selectedModuleId } = useLearning();

  // Determine stage based on current learning module if appropriate
  const initialStage: GestationalStage = useMemo(() => {
    if (selectedModuleId === 'emb-mod-1') return 'w4';
    if (selectedModuleId === 'emb-mod-2') return 'w8';
    if (selectedModuleId === 'emb-mod-3') return 'w12';
    if (selectedModuleId === 'emb-mod-4') return 'w36';
    return 'w8';
  }, [selectedModuleId]);

  const initialViewMode: ViewMode = useMemo(() => {
    if (selectedModuleId === 'emb-mod-4') return 'ultrasound';
    return 'anatomy';
  }, [selectedModuleId]);

  // Selected Stage & View Mode
  const [currentStageKey, setCurrentStageKey] = useState<GestationalStage>(initialStage);
  const [cleavageSubStage, setCleavageSubStage] = useState<CleavageSubStage>('blastocyst');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [hoveredMilestoneName, setHoveredMilestoneName] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [audioHeartbeatEnabled, setAudioHeartbeatEnabled] = useState<boolean>(false);

  // Layer Toggles
  const [showSkin, setShowSkin] = useState<boolean>(true);
  const [skinOpacity, setSkinOpacity] = useState<number>(0.88);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [showCardio, setShowCardio] = useState<boolean>(true);
  const [showUmbilicalPlacenta, setShowUmbilicalPlacenta] = useState<boolean>(true);
  const [showHotspotMarkers, setShowHotspotMarkers] = useState<boolean>(true);
  const [showShuntsOnly, setShowShuntsOnly] = useState<boolean>(false);
  const [caliperMode, setCaliperMode] = useState<CaliperMeasurement>('none');
  const [showSectorBeam, setShowSectorBeam] = useState<boolean>(true);

  // Telemetry state
  const [fps, setFps] = useState<number>(60);
  const [drawCalls, setDrawCalls] = useState<number>(0);
  const [triangles, setTriangles] = useState<number>(0);

  // Refs
  const mountRef = useRef<HTMLDivElement | null>(null);
  const ultrasoundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const heartMeshRef = useRef<THREE.Mesh | null>(null);
  const foramenFlapRef = useRef<THREE.Mesh | null>(null);
  const hotspotsGroupRef = useRef<THREE.Group | null>(null);
  const caliperGroupRef = useRef<THREE.Group | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);

  // Camera Target Interpolation
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(...STAGES[initialStage].cameraInit));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const currentStage = STAGES[currentStageKey];

  // Web Audio Heartbeat Synthesizer (S1 lub + S2 dub)
  const playHeartClick = useCallback(() => {
    if (!audioHeartbeatEnabled || settings.soundEffects === false) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      // S1 (Lub - AV valve closure)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(36, now + 0.08);
      gain1.gain.setValueAtTime(0.16, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      // S2 (Dub - Semilunar aortic/pulmonary valve closure)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(115, now + 0.11);
      osc2.frequency.exponentialRampToValueAtTime(42, now + 0.17);
      gain2.gain.setValueAtTime(0.11, now + 0.11);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.11);
      osc2.stop(now + 0.18);
    } catch {}
  }, [audioHeartbeatEnabled, settings.soundEffects]);

  const playHeartClickRef = useRef(playHeartClick);
  useEffect(() => {
    playHeartClickRef.current = playHeartClick;
  }, [playHeartClick]);

  // Stage Switch Handler
  const handleStageSelect = (stageKey: GestationalStage) => {
    setCurrentStageKey(stageKey);
    const targetStage = STAGES[stageKey];
    setSelectedMilestoneId(null);
    targetCamPos.current.set(...targetStage.cameraInit);
    targetLookAt.current.set(0, 0, 0);
  };

  // Milestone Click Handler
  const handleMilestoneClick = (milestone: MilestoneDetail) => {
    if (selectedMilestoneId === milestone.id) {
      setSelectedMilestoneId(null);
      targetCamPos.current.set(...currentStage.cameraInit);
      targetLookAt.current.set(0, 0, 0);
    } else {
      setSelectedMilestoneId(milestone.id);
      targetCamPos.current.set(...milestone.cameraPos);
      targetLookAt.current.set(...milestone.focusPos);
    }
  };

  const handleMilestoneClickRef = useRef(handleMilestoneClick);
  useEffect(() => {
    handleMilestoneClickRef.current = handleMilestoneClick;
  });

  // Reset Camera View
  const handleResetCamera = () => {
    setSelectedMilestoneId(null);
    targetCamPos.current.set(...currentStage.cameraInit);
    targetLookAt.current.set(0, 0, 0);
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  // Caliper auto-camera alignment
  const handleCaliperSelect = (mode: CaliperMeasurement) => {
    if (caliperMode === mode) {
      setCaliperMode('none');
      return;
    }
    setCaliperMode(mode);

    // Obstetric scan plane camera auto-alignment
    if (mode === 'crl') {
      // True sagittal plane
      targetCamPos.current.set(0, 0, currentStage.cameraInit[2]);
      targetLookAt.current.set(0, 0, 0);
    } else if (mode === 'bpd') {
      // Axial transthalamic plane
      if (currentStageKey === 'w36') {
        targetCamPos.current.set(0, -0.85, 3.8);
        targetLookAt.current.set(0, -0.85, 0.15);
      } else {
        targetCamPos.current.set(0, 1.2, 3.8);
        targetLookAt.current.set(0, 1.15, 0);
      }
    } else if (mode === 'hc') {
      // Tilted oblique axial plane to reveal circumference ellipse clearly
      if (currentStageKey === 'w36') {
        targetCamPos.current.set(0, -2.8, 3.2);
        targetLookAt.current.set(0, -0.85, 0.15);
      } else {
        targetCamPos.current.set(0, 2.7, 3.2);
        targetLookAt.current.set(0, 1.15, 0);
      }
    } else if (mode === 'ac') {
      // Tilted oblique abdominal transverse plane to reveal circumference ellipse
      if (currentStageKey === 'w36') {
        targetCamPos.current.set(0, -1.8, 3.4);
        targetLookAt.current.set(0, 0.45, 0.05);
      } else {
        targetCamPos.current.set(0, 1.8, 3.4);
        targetLookAt.current.set(0, -0.15, 0.06);
      }
    } else if (mode === 'fl') {
      // Longitudinal femur diaphysis
      if (currentStageKey === 'w36') {
        targetCamPos.current.set(0.6, 1.1, 3.6);
        targetLookAt.current.set(0.5, 1.0, 0.4);
      } else {
        targetCamPos.current.set(0.55, -0.9, 3.6);
        targetLookAt.current.set(0.48, -0.95, 0.3);
      }
    }
  };

  // 1. Initialize Three.js WebGL Scene with Universal Pointer Events & Raycasting
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.copy(targetCamPos.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: settings.graphicsQuality !== 'performance',
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);

    const maxPr =
      settings.graphicsQuality === 'performance'
        ? 1.0
        : settings.graphicsQuality === 'balanced'
        ? Math.min(window.devicePixelRatio, 1.25)
        : Math.min(window.devicePixelRatio, 2.0);
    renderer.setPixelRatio(maxPr);

    if (settings.graphicsQuality === 'high') {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.88);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.3);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbae6fd, 1.3);
    fillLight.position.set(-6, -2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.1);
    rimLight.position.set(0, -6, -6);
    scene.add(rimLight);

    // Root model group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Hotspots group attached inside modelGroup
    const hotspotsGroup = new THREE.Group();
    modelGroup.add(hotspotsGroup);
    hotspotsGroupRef.current = hotspotsGroup;

    // Calipers group attached inside modelGroup
    const caliperGroup = new THREE.Group();
    modelGroup.add(caliperGroup);
    caliperGroupRef.current = caliperGroup;

    // Subtle laboratory ground shadow disc
    const groundGeo = new THREE.CircleGeometry(3.6, 32);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, -2.2, 0);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Universal Pointer Drag & Touch Handling
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let initialPinchDistance = 0;
    const activePointers = new Map<number, { x: number; y: number }>();

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size === 1) {
        isDragging = true;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      } else if (activePointers.size === 2) {
        // Pinch zoom initiation
        const pts = Array.from(activePointers.values());
        initialPinchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (activePointers.has(e.pointerId)) {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }

      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Check 3D Hotspots Raycasting
      if (cameraRef.current && hotspotsGroupRef.current && !isDragging) {
        raycaster.setFromCamera(pointerNdc, cameraRef.current);
        const intersects = raycaster.intersectObjects(hotspotsGroupRef.current.children, true);
        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          const milestoneData = (hitObj as any).userData?.milestone as MilestoneDetail | undefined;
          if (milestoneData) {
            renderer.domElement.style.cursor = 'pointer';
            setHoveredMilestoneName(milestoneData.name[language]);
          }
        } else {
          renderer.domElement.style.cursor = 'grab';
          setHoveredMilestoneName(null);
        }
      }

      if (activePointers.size === 2) {
        // Two-finger pinch zoom along camera direction vector
        const pts = Array.from(activePointers.values());
        const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const diff = currentDist - initialPinchDistance;
        initialPinchDistance = currentDist;
        const camDir = targetCamPos.current.clone().sub(targetLookAt.current);
        const curLen = camDir.length();
        const newLen = THREE.MathUtils.clamp(curLen - diff * 0.015, 2.5, 12.0);
        targetCamPos.current.copy(targetLookAt.current).add(camDir.normalize().multiplyScalar(newLen));
        return;
      }

      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;
    };

    const onPointerUp = (e: PointerEvent) => {
      activePointers.delete(e.pointerId);
      if (activePointers.size < 2) {
        initialPinchDistance = 0;
      }
      if (activePointers.size === 0) {
        isDragging = false;
      }
    };

    const onClick = (e: MouseEvent) => {
      // Raycasting select milestone on click
      if (!cameraRef.current || !hotspotsGroupRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNdc, cameraRef.current);
      const intersects = raycaster.intersectObjects(hotspotsGroupRef.current.children, true);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        const milestoneData = (hitObj as any).userData?.milestone as MilestoneDetail | undefined;
        if (milestoneData && handleMilestoneClickRef.current) {
          handleMilestoneClickRef.current(milestoneData);
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const camDir = targetCamPos.current.clone().sub(targetLookAt.current);
      const curLen = camDir.length();
      const newLen = THREE.MathUtils.clamp(curLen + e.deltaY * 0.006, 2.5, 12.0);
      targetCamPos.current.copy(targetLookAt.current).add(camDir.normalize().multiplyScalar(newLen));
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('click', onClick);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Animation & Render Loop
    let animationFrameId: number;
    let lastTime = 0;
    let totalElapsedTime = 0;
    let frameCounter = 0;
    let fpsTimer = 0;
    let beatTimer = 0;

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (fpsTimer === 0) {
        fpsTimer = timestamp;
        lastTime = timestamp;
      }

      frameCounter++;
      if (timestamp - fpsTimer >= 500) {
        setFps((frameCounter * 1000) / (timestamp - fpsTimer));
        frameCounter = 0;
        fpsTimer = timestamp;
      }

      const rawDelta = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      const speedMultiplier = settingsRef.current.physicsSpeed || 1.0;
      const delta = rawDelta * (isPlayingRef.current ? speedMultiplier : 0);
      totalElapsedTime += delta;

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.06);
        currentLookAt.current.lerp(targetLookAt.current, 0.06);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Auto-Rotation
      if (settingsRef.current.autoRotate3D !== false && !isDragging && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.22 * delta;
      }

      // Cardiac Pulsation & Foramen Ovale Shunt Valve Flap
      const bpm = STAGES[currentStageKey]?.heartRate || 0;
      if (bpm > 0 && isPlayingRef.current) {
        const beatFreq = (bpm / 60) * Math.PI * 2;
        const pulse = 1 + Math.sin(totalElapsedTime * beatFreq) * 0.12;

        if (heartMeshRef.current) {
          heartMeshRef.current.scale.set(pulse, pulse, pulse);
        }

        // Oscillate foramen ovale valve flap
        if (foramenFlapRef.current) {
          const flapSwing = Math.sin(totalElapsedTime * beatFreq) * 0.35;
          foramenFlapRef.current.rotation.y = flapSwing;
        }

        beatTimer += delta;
        const beatInterval = 60 / bpm;
        if (beatTimer >= beatInterval) {
          beatTimer %= beatInterval;
          if (playHeartClickRef.current) playHeartClickRef.current();
        }
      }

      renderer.render(scene, camera);
      setDrawCalls(renderer.info.render.calls);
      setTriangles(renderer.info.render.triangles);
    };

    animate(0);

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const nw = container.clientWidth || 720;
      const nh = container.clientHeight || 520;
      if (nw === 0 || nh === 0) return;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      dom.removeEventListener('click', onClick);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      ro.disconnect();

      // Deep GPU Resource Disposal
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      texturesRef.current.forEach((t) => t.dispose());
      texturesRef.current = [];
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [settings.graphicsQuality, currentStageKey, language]);

  // 2. High-Precision Organic Developmental Geometry & Anatomical Model Builder
  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;

    // Deep recursive cleanup of previous model hierarchy to eliminate memory leaks
    const childrenToPurge: THREE.Object3D[] = [];
    group.children.forEach((child) => {
      if (child !== hotspotsGroupRef.current && child !== caliperGroupRef.current) {
        childrenToPurge.push(child);
      }
    });

    childrenToPurge.forEach((child) => {
      child.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      group.remove(child);
    });

    texturesRef.current.forEach((t) => t.dispose());
    texturesRef.current = [];

    const isUSG = viewMode === 'ultrasound';
    const isOssification = viewMode === 'ossification';

    // Procedural Textures
    const skinTexture = generateAnatomicalSkinTexture(currentStageKey, isUSG);
    const boneTexture = generateBoneTexture(isOssification, isUSG);
    texturesRef.current.push(skinTexture, boneTexture);

    // Dermal skin opacity & transmission
    const targetSkinOpacity = isOssification
      ? 0.22
      : showShuntsOnly || (selectedMilestoneId === 'fetal_shunts')
      ? 0.25
      : showSkin
      ? (isUSG ? 0.78 : skinOpacity)
      : 0;

    // Living Dermal Material
    const skinMat = new THREE.MeshPhysicalMaterial({
      map: skinTexture,
      color: isUSG ? 0x475569 : isOssification ? 0xf8fafc : 0xfbcfe8,
      roughness: isUSG ? 0.92 : 0.35,
      metalness: 0.05,
      clearcoat: isUSG ? 0 : 0.35,
      clearcoatRoughness: 0.25,
      transmission: isUSG ? 0 : isOssification ? 0.78 : 0.22,
      thickness: 0.6,
      transparent: true,
      opacity: targetSkinOpacity,
      depthWrite: !isOssification && targetSkinOpacity > 0.4,
      side: THREE.DoubleSide,
    });

    // Cartilage Material
    const cartilageMat = new THREE.MeshStandardMaterial({
      color: isUSG ? 0x94a3b8 : 0x38bdf8,
      roughness: 0.3,
      emissive: 0x0284c7,
      emissiveIntensity: isOssification ? 0.4 : 0.1,
      transparent: true,
      opacity: showSkeleton ? 0.75 : 0,
    });

    // Bone / Ossification Material
    const boneMat = new THREE.MeshStandardMaterial({
      map: boneTexture,
      color: isUSG ? 0xffffff : isOssification ? 0xfef08a : 0xf8fafc,
      roughness: 0.3,
      emissive: isOssification ? 0xd97706 : isUSG ? 0xffffff : 0x000000,
      emissiveIntensity: isOssification ? 0.55 : isUSG ? 0.7 : 0,
      transparent: true,
      opacity: showSkeleton ? 0.95 : 0,
    });

    // Blood / Heart Material
    const bloodMat = new THREE.MeshStandardMaterial({
      color: isUSG ? 0xef4444 : 0xe11d48,
      roughness: 0.3,
      emissive: 0x991b1b,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: showCardio ? 0.96 : 0,
    });

    // Highly Oxygenated Blood Material (Umbilical Vein, Ductus Venosus, Aorta)
    const oxyBloodMat = new THREE.MeshStandardMaterial({
      color: isUSG ? 0xef4444 : 0xf43f5e,
      roughness: 0.25,
      emissive: 0xe11d48,
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: showCardio ? 0.95 : 0,
    });

    // Deoxygenated Blood Material (SVC, Umbilical Arteries)
    const deoxyBloodMat = new THREE.MeshStandardMaterial({
      color: isUSG ? 0x3b82f6 : 0x2563eb,
      roughness: 0.25,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: showCardio ? 0.95 : 0,
    });

    // Umbilical Cord Wharton's Jelly Material
    const umbilicalMat = new THREE.MeshPhysicalMaterial({
      color: isUSG ? 0x64748b : 0x67e8f9,
      roughness: 0.2,
      transmission: isUSG ? 0 : 0.68,
      transparent: true,
      opacity: showUmbilicalPlacenta ? 0.82 : 0,
      clearcoat: 0.6,
    });

    // Subgroups for rendering isolation
    const skeletonGroup = new THREE.Group();
    skeletonGroup.renderOrder = 1;
    const cardioGroup = new THREE.Group();
    cardioGroup.renderOrder = 2;
    const placentaGroup = new THREE.Group();
    placentaGroup.renderOrder = 3;

    group.add(skeletonGroup);
    group.add(cardioGroup);
    group.add(placentaGroup);

    // -------------------------------------------------------------
    // STAGE 1: WEEK 1 - CLEAVAGE CONTINUUM TO CAVITATED BLASTOCYST
    // -------------------------------------------------------------
    if (currentStageKey === 'w1') {
      if (cleavageSubStage === 'zygote') {
        // Single Cell Zygote with Translucent Zona Pellucida, Polar Bodies, & 2 Pronuclei
        const zpGeo = new THREE.SphereGeometry(1.85, 36, 36);
        const zpMat = new THREE.MeshPhysicalMaterial({
          color: 0x93c5fd,
          transmission: 0.86,
          opacity: 0.55,
          transparent: true,
          roughness: 0.1,
          clearcoat: 0.8,
        });
        group.add(new THREE.Mesh(zpGeo, zpMat));

        // Vitelline perivitelline fluid space & Ooplasm
        const zygoteCell = new THREE.Mesh(
          new THREE.SphereGeometry(1.42, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0xfecdd3, roughness: 0.38 })
        );
        group.add(zygoteCell);

        // First and Second Polar Bodies in perivitelline space
        const pbMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 });
        const pb1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), pbMat);
        pb1.position.set(0.95, 0.95, 0.2);
        group.add(pb1);

        const pb2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 14), pbMat);
        pb2.position.set(1.15, 0.72, 0.1);
        group.add(pb2);

        // Male & Female Pronuclei
        const pnMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.2,
          emissive: 0x0284c7,
          emissiveIntensity: 0.3,
        });
        const pn1 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 18), pnMat);
        pn1.position.set(-0.35, 0.1, 0.2);
        group.add(pn1);

        const pn2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 18), pnMat);
        pn2.position.set(0.35, -0.1, -0.1);
        group.add(pn2);
      } else if (cleavageSubStage === '4cell') {
        // 4-Cell Blastomere Stage inside Zona Pellucida
        const zpGeo = new THREE.SphereGeometry(1.9, 36, 36);
        const zpMat = new THREE.MeshPhysicalMaterial({
          color: 0x93c5fd,
          transmission: 0.88,
          opacity: 0.45,
          transparent: true,
          roughness: 0.1,
        });
        group.add(new THREE.Mesh(zpGeo, zpMat));

        const blastoCoords = [
          [-0.62, 0.62, 0],
          [0.62, 0.62, 0],
          [-0.62, -0.62, 0],
          [0.62, -0.62, 0],
        ];
        blastoCoords.forEach(([x, y, z]) => {
          const bGeo = new THREE.SphereGeometry(0.72, 24, 24);
          const bMesh = new THREE.Mesh(bGeo, skinMat);
          bMesh.position.set(x, y, z);
          group.add(bMesh);

          const nMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, emissive: 0x0284c7, emissiveIntensity: 0.25 })
          );
          nMesh.position.set(x, y, z);
          group.add(nMesh);
        });
      } else if (cleavageSubStage === 'morula') {
        // 16-Cell Morula with E-Cadherin Compaction
        const zpGeo = new THREE.SphereGeometry(1.9, 36, 36);
        const zpMat = new THREE.MeshPhysicalMaterial({
          color: 0x93c5fd,
          transmission: 0.88,
          opacity: 0.4,
          transparent: true,
        });
        group.add(new THREE.Mesh(zpGeo, zpMat));

        // Fibonacci sphere distribution of blastomeres
        for (let i = 0; i < 16; i++) {
          const phi = Math.acos(-1 + (2 * i) / 16);
          const theta = Math.sqrt(16 * Math.PI) * phi;
          const r = 1.02;
          const x = r * Math.cos(theta) * Math.sin(phi);
          const y = r * Math.sin(theta) * Math.sin(phi);
          const z = r * Math.cos(phi);

          const cell = new THREE.Mesh(new THREE.SphereGeometry(0.44, 18, 18), skinMat);
          cell.position.set(x, y, z);
          group.add(cell);
        }
      } else {
        // Cavitated Blastocyst (Day 5–6) with Outer Trophectoderm & Bilaminar Disc
        const trophoGeo = new THREE.SphereGeometry(1.75, 36, 36);
        const trophoMat = new THREE.MeshPhysicalMaterial({
          color: isUSG ? 0x94a3b8 : 0xe0e7ff,
          transmission: isUSG ? 0 : 0.72,
          roughness: 0.28,
          transparent: true,
          opacity: showSkin ? 0.75 : 0,
          depthWrite: true,
        });
        const trophoMesh = new THREE.Mesh(trophoGeo, trophoMat);
        group.add(trophoMesh);

        // Thinning / Hatching Zona Pellucida Ring
        const zpHatchCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(1.4, -0.7, 0),
          new THREE.Vector3(1.7, 0, 0.4),
          new THREE.Vector3(1.4, 0.7, 0),
          new THREE.Vector3(1.1, 0, -0.4),
        ], true);
        const zpHatchMesh = new THREE.Mesh(
          new THREE.TubeGeometry(zpHatchCurve, 32, 0.08, 12, true),
          new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.5 })
        );
        group.add(zpHatchMesh);

        // Fluid-Filled Blastocoelic Cavity (Refractive sphere interior)
        const blastocoel = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 24, 24),
          new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            transmission: 0.9,
            opacity: 0.35,
            transparent: true,
            roughness: 0.05,
          })
        );
        blastocoel.position.set(0.2, -0.2, 0);
        group.add(blastocoel);

        // Pluripotent Embryoblast: Bilaminar Embryonic Disc
        // Epiblast Disc (Columnar pluripotent blue disc facing dorsal amniotic cavity)
        const epiGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.18, 24);
        const epiMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.3,
          emissive: 0x0284c7,
          emissiveIntensity: 0.4,
        });
        const epiblastMesh = new THREE.Mesh(epiGeo, epiMat);
        epiblastMesh.position.set(-0.38, 0.45, 0.25);
        epiblastMesh.rotation.x = Math.PI * 0.2;
        group.add(epiblastMesh);

        // Hypoblast Disc (Cuboidal primitive endoderm amber disc facing blastocoel)
        const hypoGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.14, 24);
        const hypoMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.4,
          emissive: 0xd97706,
          emissiveIntensity: 0.35,
        });
        const hypoblastMesh = new THREE.Mesh(hypoGeo, hypoMat);
        hypoblastMesh.position.set(-0.38, 0.25, 0.25);
        hypoblastMesh.rotation.x = Math.PI * 0.2;
        group.add(hypoblastMesh);
      }
    }

    // -------------------------------------------------------------
    // STAGE 2: WEEK 4 - CARNEGIE STAGE 13 (C-SHAPED EMBRYO)
    // -------------------------------------------------------------
    else if (currentStageKey === 'w4') {
      const w4Group = new THREE.Group();

      // Continuous C-Flexure Parametric Body Loft
      const embryoCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.25, 1.4, 0.0),   // Forebrain / Telencephalon
        new THREE.Vector3(0.85, 1.15, 0.08), // Midbrain / Mesencephalon apex flexure
        new THREE.Vector3(1.05, 0.55, 0.12), // Hindbrain / Rhombencephalon
        new THREE.Vector3(0.75, 0.05, 0.18), // Cervical flexure
        new THREE.Vector3(0.25, -0.45, 0.15),// Thoracic / Abdominal midgut
        new THREE.Vector3(-0.4, -0.8, 0.08), // Lumbar / Pelvic curve
        new THREE.Vector3(-0.9, -0.3, 0.0),  // Curled Caudal Tail Bud
      ]);

      const bodyGeo = createOrganicLoftedGeometry(
        embryoCurve,
        (t) => {
          if (t < 0.22) return 0.58 + t * 0.45; // Cranial vault
          if (t < 0.4) return 0.68 - (t - 0.22) * 0.55; // Cervical notch
          if (t < 0.65) return 0.62 + Math.sin(((t - 0.4) / 0.25) * Math.PI) * 0.22; // Thoracic bulge
          return Math.max(0.08, 0.58 * (1 - (t - 0.65) / 0.35)); // Tapering caudal tail
        },
        64,
        24
      );
      const bodyMesh = new THREE.Mesh(bodyGeo, skinMat);
      bodyMesh.renderOrder = 4;
      w4Group.add(bodyMesh);

      // Bilateral Pharyngeal (Branchial) Arches 1 & 2 in cervical notch
      [-1, 1].forEach((side) => {
        const arch1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.36, 16), skinMat);
        arch1.position.set(0.68, 0.58, side * 0.28);
        arch1.rotation.z = Math.PI / 4;
        arch1.rotation.x = side * 0.2;
        w4Group.add(arch1);

        const arch2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.32, 16), skinMat);
        arch2.position.set(0.52, 0.38, side * 0.28);
        arch2.rotation.z = Math.PI / 4;
        arch2.rotation.x = side * 0.2;
        w4Group.add(arch2);
      });

      // 30 Paraxial Somite Pairs flanking the neural tube along the dorsal ridge
      const somitePoints = embryoCurve.getPoints(32);
      const frenetFrames = embryoCurve.computeFrenetFrames(32, false);
      const somiteGeo = new THREE.BoxGeometry(0.10, 0.08, 0.10);
      const somiteMat = isUSG ? boneMat : new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.4 });

      somitePoints.forEach((pt, idx) => {
        if (idx > 3 && idx < 29) {
          const norm = frenetFrames.normals[idx];
          const binorm = frenetFrames.binormals[idx];
          const sL = new THREE.Mesh(somiteGeo, somiteMat);
          sL.position.set(
            pt.x + norm.x * 0.22 + binorm.x * 0.16,
            pt.y + norm.y * 0.22 + binorm.y * 0.16,
            pt.z + norm.z * 0.22 + binorm.z * 0.16
          );
          skeletonGroup.add(sL);

          const sR = new THREE.Mesh(somiteGeo, somiteMat);
          sR.position.set(
            pt.x + norm.x * 0.22 - binorm.x * 0.16,
            pt.y + norm.y * 0.22 - binorm.y * 0.16,
            pt.z + norm.z * 0.22 - binorm.z * 0.16
          );
          skeletonGroup.add(sR);
        }
      });

      // Primitive Cardiac Tube (D-Looping S-shape)
      const heartTubeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.2, -0.05, 0.35), // Sinus venosus / atrium
        new THREE.Vector3(0.38, 0.12, 0.42), // Looping ventricle
        new THREE.Vector3(0.42, 0.32, 0.36), // Bulbus cordis
        new THREE.Vector3(0.35, 0.45, 0.28), // Truncus arteriosus
      ]);
      const heartTubeGeo = new THREE.TubeGeometry(heartTubeCurve, 24, 0.14, 16, false);
      const heartTubeMesh = new THREE.Mesh(heartTubeGeo, bloodMat);
      cardioGroup.add(heartTubeMesh);
      heartMeshRef.current = heartTubeMesh;

      // Limb Buds (Upper paddle bud with AER rim + Lower bud)
      const armBudGeo = new THREE.SphereGeometry(0.24, 16, 16);
      armBudGeo.scale(1.5, 0.75, 0.5);
      const armBudL = new THREE.Mesh(armBudGeo, skinMat);
      armBudL.position.set(0.22, -0.22, 0.46);
      w4Group.add(armBudL);

      const armBudR = new THREE.Mesh(armBudGeo, skinMat);
      armBudR.position.set(0.22, -0.22, -0.46);
      w4Group.add(armBudR);

      const legBudGeo = new THREE.SphereGeometry(0.18, 14, 14);
      legBudGeo.scale(1.3, 0.6, 0.5);
      const legBudL = new THREE.Mesh(legBudGeo, skinMat);
      legBudL.position.set(-0.35, -0.68, 0.3);
      w4Group.add(legBudL);

      const legBudR = new THREE.Mesh(legBudGeo, skinMat);
      legBudR.position.set(-0.35, -0.68, -0.3);
      w4Group.add(legBudR);

      // Bilateral Otic Pits & Lens Placodes
      [-1, 1].forEach((side) => {
        const eyePit = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 14, 14),
          new THREE.MeshBasicMaterial({ color: 0x09090b })
        );
        eyePit.position.set(0.78, 0.92, side * 0.26);
        w4Group.add(eyePit);

        const oticPit = new THREE.Mesh(
          new THREE.SphereGeometry(0.065, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x1e293b })
        );
        oticPit.position.set(0.96, 0.72, side * 0.22);
        w4Group.add(oticPit);
      });

      // Connecting Stalk (future umbilical cord base)
      const stalkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.1, -0.35, 0.2),
        new THREE.Vector3(0.3, -0.5, 0.6),
        new THREE.Vector3(0.5, -0.7, 1.1),
      ]);
      const stalkMesh = new THREE.Mesh(new THREE.TubeGeometry(stalkCurve, 16, 0.12, 12, false), umbilicalMat);
      placentaGroup.add(stalkMesh);

      group.add(w4Group);
    }

    // -------------------------------------------------------------
    // STAGE 3: WEEK 8 - CARNEGIE STAGE 23 (ORGANOGENESIS & DIGITS)
    // -------------------------------------------------------------
    else if (currentStageKey === 'w8') {
      const embryoGroup = new THREE.Group();

      // Proportioned Sculpted Embryonic Head (~48% of total CRL) with integrated eyes & auricular hillocks
      const headGroup = createSculptedFetalHeadGroup('w8', 1.16, skinMat, boneMat);
      headGroup.position.set(0, 0.85, 0);
      headGroup.rotation.x = 0.12; // Pronounced cervical flexure
      embryoGroup.add(headGroup);

      // Anatomically Sculpted Torso Curve
      const torsoCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.48, 0),
        new THREE.Vector3(0.05, 0.08, 0.08),
        new THREE.Vector3(-0.02, -0.38, 0.06),
        new THREE.Vector3(-0.12, -0.85, 0),
      ]);
      const torsoGeo = createOrganicLoftedGeometry(
        torsoCurve,
        (t) => 0.82 - t * 0.22,
        32,
        24,
        () => 1.05,
        () => 0.95
      );
      const torsoMesh = new THREE.Mesh(torsoGeo, skinMat);
      torsoMesh.renderOrder = 4;
      embryoGroup.add(torsoMesh);

      // 4-Chamber Embryonic Heart
      const heartGeo = new THREE.SphereGeometry(0.34, 24, 24);
      heartGeo.scale(1.1, 1.3, 0.95);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.1, 0.12, 0.42);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Physiological Umbilical Midgut Hernia (expanded intestinal loops herniating into cord)
      const herniaGeo = new THREE.SphereGeometry(0.38, 24, 24);
      herniaGeo.scale(1.18, 0.92, 1.05);
      const herniaMesh = new THREE.Mesh(
        herniaGeo,
        new THREE.MeshStandardMaterial({ color: isUSG ? 0x94a3b8 : 0xf472b6, roughness: 0.35 })
      );
      herniaMesh.position.set(0.0, -0.38, 0.65);
      herniaMesh.renderOrder = 4;
      embryoGroup.add(herniaMesh);

      // Week 8 Umbilical Cord Proximal Stalk
      const cord8Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, -0.38, 0.65),
        new THREE.Vector3(0.18, -0.52, 1.25),
        new THREE.Vector3(0.35, -0.68, 1.85),
      ]);
      const cord8Mesh = new THREE.Mesh(new THREE.TubeGeometry(cord8Curve, 24, 0.14, 14, false), umbilicalMat);
      placentaGroup.add(cord8Mesh);

      // Sculpted Upper Limbs with Separated Apoptotic Digits (5 Fingers)
      [-1, 1].forEach((side) => {
        const isL = side === 1;
        const armCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.58, 0.22, 0.22),
          new THREE.Vector3(side * 0.72, -0.02, 0.36),
          new THREE.Vector3(side * 0.45, -0.18, 0.44),
        ]);
        const armGeo = createOrganicLoftedGeometry(
          armCurve,
          (t) => 0.14 - t * 0.04,
          20,
          14
        );
        embryoGroup.add(new THREE.Mesh(armGeo, skinMat));

        const hand = createSculptedFetalHand(isL, 'w8', skinMat, 'chest');
        hand.position.set(side * 0.35, -0.22, 0.42);
        hand.rotation.z = side * -0.4;
        hand.rotation.y = side * 0.3;
        embryoGroup.add(hand);
      });

      // Sculpted Lower Limbs with Separated Toes
      [-1, 1].forEach((side) => {
        const isL = side === 1;
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.42, -0.65, 0.18),
          new THREE.Vector3(side * 0.48, -0.82, 0.42),
          new THREE.Vector3(side * 0.32, -0.92, 0.48),
        ]);
        const legGeo = createOrganicLoftedGeometry(
          legCurve,
          (t) => 0.17 - t * 0.05,
          20,
          14
        );
        embryoGroup.add(new THREE.Mesh(legGeo, skinMat));

        const foot = createSculptedFetalFoot(isL, 'w8', skinMat);
        foot.position.set(side * 0.26, -0.94, 0.52);
        foot.rotation.x = -0.3;
        foot.rotation.y = side * 0.25;
        embryoGroup.add(foot);
      });

      // Chondrified Cartilage Vertebral Column
      for (let v = 0; v < 18; v++) {
        const vMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.07, 14), cartilageMat);
        vMesh.position.set(0, 0.5 - v * 0.085, -0.36);
        skeletonGroup.add(vMesh);
      }

      group.add(embryoGroup);
    }

    // -------------------------------------------------------------
    // STAGE 4: WEEK 12 - PRIMARY OSSIFICATION & HERNIA REDUCTION
    // -------------------------------------------------------------
    else if (currentStageKey === 'w12') {
      const fetusGroup = new THREE.Group();

      // Sculpted Fetal Head with Anatomical Cranial Vaults, Orbits, Eyelids & Profile
      const headGroup = createSculptedFetalHeadGroup('w12', 1.28, skinMat, boneMat);
      headGroup.position.set(0, 1.15, 0);
      fetusGroup.add(headGroup);

      // Nuchal Translucency (NT): Physiological subcutaneous fluid pocket behind cervical neck
      const ntPocketGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.38, 16);
      ntPocketGeo.scale(1.2, 1.0, 0.65);
      const ntPocketMat = isUSG
        ? new THREE.MeshBasicMaterial({ color: 0x020617 })
        : new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            transmission: 0.85,
            opacity: 0.55,
            transparent: true,
            roughness: 0.1,
          });
      const ntPocket = new THREE.Mesh(ntPocketGeo, ntPocketMat);
      ntPocket.position.set(0, 0.72, -0.42);
      ntPocket.rotation.x = -0.15;
      fetusGroup.add(ntPocket);

      // Organic Torso Loft (Midgut hernia completely reduced into abdominal cavity)
      const torso12Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.82, 0),
        new THREE.Vector3(0, 0.38, 0.06),
        new THREE.Vector3(0, -0.22, 0.04),
        new THREE.Vector3(0, -0.65, 0.02),
        new THREE.Vector3(0, -1.05, 0),
      ]);
      const torso12Geo = createOrganicLoftedGeometry(
        torso12Curve,
        (t) => 0.88 + Math.sin(t * Math.PI) * 0.16,
        36,
        24,
        () => 1.05,
        () => 0.95
      );
      const torso12Mesh = new THREE.Mesh(torso12Geo, skinMat);
      torso12Mesh.renderOrder = 4;
      fetusGroup.add(torso12Mesh);

      // Sculpted Upper Limbs in Fetal Flexion Posture (resting across upper chest)
      [-1, 1].forEach((side) => {
        const isL = side === 1;
        const armCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.68, 0.45, 0.16),
          new THREE.Vector3(side * 0.82, 0.22, 0.28),
          new THREE.Vector3(side * 0.68, -0.06, 0.38),
          new THREE.Vector3(side * 0.42, 0.06, 0.48),
          new THREE.Vector3(side * 0.22, 0.16, 0.52),
        ]);
        const armGeo = createOrganicLoftedGeometry(
          armCurve,
          (t) => {
            if (t < 0.3) return 0.16 - t * 0.05;
            if (t < 0.6) return 0.13;
            if (t < 0.85) return 0.14 - (t - 0.6) * 0.04;
            return 0.095;
          },
          28,
          16
        );
        fetusGroup.add(new THREE.Mesh(armGeo, skinMat));

        const hand = createSculptedFetalHand(isL, 'w12', skinMat, 'chest');
        hand.position.set(side * 0.18, 0.16, 0.54);
        hand.rotation.z = side * -0.55;
        hand.rotation.y = side * 0.35;
        hand.rotation.x = -0.2;
        fetusGroup.add(hand);
      });

      // Sculpted Lower Limbs in Fetal Flexion Posture (hips and knees flexed)
      [-1, 1].forEach((side) => {
        const isL = side === 1;
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.48, -0.95, 0.18),
          new THREE.Vector3(side * 0.56, -1.22, 0.32),
          new THREE.Vector3(side * 0.48, -1.48, 0.45),
          new THREE.Vector3(side * 0.34, -1.26, 0.62),
          new THREE.Vector3(side * 0.22, -1.10, 0.72),
        ]);
        const legGeo = createOrganicLoftedGeometry(
          legCurve,
          (t) => {
            if (t < 0.35) return 0.19 - t * 0.06;
            if (t < 0.6) return 0.15;
            if (t < 0.85) return 0.155 - (t - 0.6) * 0.05;
            return 0.105;
          },
          28,
          16
        );
        fetusGroup.add(new THREE.Mesh(legGeo, skinMat));

        const foot = createSculptedFetalFoot(isL, 'w12', skinMat);
        foot.position.set(side * 0.18, -1.06, 0.76);
        foot.rotation.x = -0.35;
        foot.rotation.y = side * 0.3;
        foot.rotation.z = side * 0.15;
        fetusGroup.add(foot);
      });

      // Primary Skeletal Ossification Centers
      const skullBones = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.065, 16, 32), boneMat);
      skullBones.position.set(0, 1.15, 0);
      skullBones.rotation.x = Math.PI / 2;
      skeletonGroup.add(skullBones);

      // 12 Rib Pairs
      for (let r = 0; r < 12; r++) {
        const rib = new THREE.Mesh(
          new THREE.TorusGeometry(0.8 - r * 0.02, 0.045, 12, 24, Math.PI * 1.4),
          boneMat
        );
        rib.position.set(0, 0.42 - r * 0.11, 0.08);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.z = Math.PI * 0.3;
        skeletonGroup.add(rib);
      }

      // Long Bone Diaphyses (Femurs & Humeri aligned with limb paths)
      [-1, 1].forEach((side) => {
        // Femur shaft along thigh path (matches FL caliper)
        const femurBone = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.65, 12), boneMat);
        femurBone.position.set(side * 0.50, -1.22, 0.32);
        femurBone.rotation.x = 0.52;
        femurBone.rotation.z = side * 0.15;
        skeletonGroup.add(femurBone);

        // Humerus shaft along upper arm
        const humerusBone = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.55, 12), boneMat);
        humerusBone.position.set(side * 0.76, 0.32, 0.22);
        humerusBone.rotation.z = side * -0.55;
        humerusBone.rotation.x = 0.25;
        skeletonGroup.add(humerusBone);
      });

      // 4-Chamber Heart
      const heartGeo = new THREE.SphereGeometry(0.4, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.12, 0.2, 0.46);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Helical 3-Vessel Umbilical Cord (Wharton's jelly + 2 spiral arteries + 1 vein) & Placenta
      const cord12Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, -0.32, 0.55),
        new THREE.Vector3(0.28, -0.12, 1.25),
        new THREE.Vector3(0.12, 0.28, 1.85),
        new THREE.Vector3(-0.3, 0.65, 2.45),
      ]);
      const cord12Mesh = new THREE.Mesh(new THREE.TubeGeometry(cord12Curve, 36, 0.14, 14, false), umbilicalMat);
      placentaGroup.add(cord12Mesh);

      // Spiral umbilical vessels
      const uSpiral1: THREE.Vector3[] = [];
      const uSpiral2: THREE.Vector3[] = [];
      const uVeinPts: THREE.Vector3[] = [];
      for (let s = 0; s <= 30; s++) {
        const t = s / 30;
        const pt = cord12Curve.getPoint(t);
        const theta = t * Math.PI * 6;
        uSpiral1.push(new THREE.Vector3(pt.x + Math.cos(theta) * 0.05, pt.y + Math.sin(theta) * 0.05, pt.z));
        uSpiral2.push(new THREE.Vector3(pt.x + Math.cos(theta + Math.PI) * 0.05, pt.y + Math.sin(theta + Math.PI) * 0.05, pt.z));
        uVeinPts.push(new THREE.Vector3(pt.x, pt.y, pt.z));
      }
      placentaGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(uSpiral1), 24, 0.028, 8, false), deoxyBloodMat));
      placentaGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(uSpiral2), 24, 0.028, 8, false), deoxyBloodMat));
      placentaGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(uVeinPts), 24, 0.045, 8, false), oxyBloodMat));

      const placentaDisc12 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 0.18, 32),
        new THREE.MeshStandardMaterial({ color: isUSG ? 0x64748b : 0x881337, roughness: 0.5 })
      );
      placentaDisc12.position.set(-0.3, 0.7, 2.5);
      placentaDisc12.rotation.x = Math.PI / 3;
      placentaGroup.add(placentaDisc12);

      group.add(fetusGroup);
    }

    // -------------------------------------------------------------
    // STAGE 5: WEEK 20 - MID-GESTATION 4-CHAMBER HEART & VERNIX
    // -------------------------------------------------------------
    else if (currentStageKey === 'w20') {
      const fetusGroup = new THREE.Group();

      // Formed Sculpted Fetal Head with Full Craniofacial Features & Buccal Fat Pads
      const headGroup = createSculptedFetalHeadGroup('w20', 1.34, skinMat, boneMat);
      headGroup.position.set(0, 1.25, 0);
      fetusGroup.add(headGroup);

      // Organic Plump Torso Loft with Subcutaneous Adipose
      const torso20Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.88, 0),
        new THREE.Vector3(0, 0.42, 0.08),
        new THREE.Vector3(0, -0.15, 0.06),
        new THREE.Vector3(0, -0.68, 0.04),
        new THREE.Vector3(0, -1.15, 0),
      ]);
      const torso20Geo = createOrganicLoftedGeometry(
        torso20Curve,
        (t) => 0.98 + Math.sin(t * Math.PI) * 0.2,
        36,
        24,
        () => 1.05,
        () => 0.95
      );
      const torso20Mesh = new THREE.Mesh(torso20Geo, skinMat);
      torso20Mesh.renderOrder = 4;
      fetusGroup.add(torso20Mesh);

      // Limbs in Active Thumb-Sucking / Grasp Reflex Posture
      // Right Arm: reaching toward mouth with thumb touching oral fissure
      const armR20Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.72, 0.52, 0.18),
        new THREE.Vector3(-0.78, 0.38, 0.38),
        new THREE.Vector3(-0.62, 0.22, 0.55),
        new THREE.Vector3(-0.35, 0.55, 0.72),
        new THREE.Vector3(-0.10, 0.82, 0.92),
      ]);
      const armR20Geo = createOrganicLoftedGeometry(
        armR20Curve,
        (t) => 0.17 - t * 0.06,
        24,
        16
      );
      fetusGroup.add(new THREE.Mesh(armR20Geo, skinMat));

      const handR20 = createSculptedFetalHand(false, 'w20', skinMat, 'mouth');
      handR20.position.set(0.06, 0.98, 1.15); // Right at mouth level
      handR20.rotation.y = -0.55;
      handR20.rotation.x = -0.3;
      handR20.rotation.z = 0.4;
      fetusGroup.add(handR20);

      // Left Arm: resting comfortably across chest
      const armL20Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.72, 0.52, 0.18),
        new THREE.Vector3(0.82, 0.28, 0.32),
        new THREE.Vector3(0.68, -0.02, 0.45),
        new THREE.Vector3(0.42, 0.15, 0.55),
        new THREE.Vector3(0.20, 0.26, 0.60),
      ]);
      const armL20Geo = createOrganicLoftedGeometry(
        armL20Curve,
        (t) => 0.17 - t * 0.06,
        24,
        16
      );
      fetusGroup.add(new THREE.Mesh(armL20Geo, skinMat));

      const handL20 = createSculptedFetalHand(true, 'w20', skinMat, 'chest');
      handL20.position.set(0.18, 0.26, 0.62);
      handL20.rotation.z = -0.5;
      handL20.rotation.y = 0.35;
      fetusGroup.add(handL20);

      // Lower Limbs in Crossed / Tucked Fetal Flexion
      const legL20Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.52, -0.88, 0.22),
        new THREE.Vector3(0.64, -1.18, 0.38),
        new THREE.Vector3(0.52, -1.45, 0.55),
        new THREE.Vector3(0.32, -1.25, 0.75),
        new THREE.Vector3(0.12, -1.05, 0.85),
      ]);
      const legL20Geo = createOrganicLoftedGeometry(
        legL20Curve,
        (t) => 0.22 - t * 0.09,
        24,
        16
      );
      fetusGroup.add(new THREE.Mesh(legL20Geo, skinMat));

      const footL20 = createSculptedFetalFoot(true, 'w20', skinMat);
      footL20.position.set(0.08, -1.02, 0.88);
      footL20.rotation.x = -0.4;
      footL20.rotation.y = 0.35;
      fetusGroup.add(footL20);

      const legR20Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.52, -0.88, 0.22),
        new THREE.Vector3(-0.62, -1.20, 0.35),
        new THREE.Vector3(-0.48, -1.48, 0.52),
        new THREE.Vector3(-0.25, -1.32, 0.72),
        new THREE.Vector3(-0.06, -1.15, 0.82),
      ]);
      const legR20Geo = createOrganicLoftedGeometry(
        legR20Curve,
        (t) => 0.22 - t * 0.09,
        24,
        16
      );
      fetusGroup.add(new THREE.Mesh(legR20Geo, skinMat));

      const footR20 = createSculptedFetalFoot(false, 'w20', skinMat);
      footR20.position.set(-0.04, -1.12, 0.85);
      footR20.rotation.x = -0.4;
      footR20.rotation.y = -0.3;
      fetusGroup.add(footR20);

      // Balanced 4-Chamber Heart & Great Vessels with Foramen Ovale
      const heartGeo = new THREE.SphereGeometry(0.46, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.1, 0.22, 0.5);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Mobile Foramen Ovale Flap
      const flapGeo = new THREE.PlaneGeometry(0.16, 0.22);
      const flapMesh = new THREE.Mesh(flapGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
      flapMesh.position.set(0.1, 0.22, 0.52);
      cardioGroup.add(flapMesh);
      foramenFlapRef.current = flapMesh;

      // Aorta & Pulmonary Trunk
      const aortaCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.12, 0.35, 0.5),
        new THREE.Vector3(0.08, 0.55, 0.45),
        new THREE.Vector3(-0.05, 0.62, 0.3),
        new THREE.Vector3(-0.08, 0.2, 0.1),
      ]);
      const aortaMesh = new THREE.Mesh(new THREE.TubeGeometry(aortaCurve, 20, 0.08, 12, false), oxyBloodMat);
      cardioGroup.add(aortaMesh);

      // Ductus Arteriosus Shunt connecting Pulmonary Artery to Aorta
      const ductusArtCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.18, 0.48, 0.45),
        new THREE.Vector3(0.05, 0.52, 0.38),
        new THREE.Vector3(-0.05, 0.55, 0.32),
      ]);
      const ductusArtMesh = new THREE.Mesh(new THREE.TubeGeometry(ductusArtCurve, 14, 0.06, 10, false), oxyBloodMat);
      cardioGroup.add(ductusArtMesh);

      // Ductus Venosus Shunt (Umbilical vein bypassing liver directly to IVC)
      const ductusVenCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, -0.28, 0.55),
        new THREE.Vector3(0.06, -0.05, 0.42),
        new THREE.Vector3(0.08, 0.12, 0.38),
      ]);
      const ductusVenMesh = new THREE.Mesh(new THREE.TubeGeometry(ductusVenCurve, 16, 0.07, 10, false), oxyBloodMat);
      cardioGroup.add(ductusVenMesh);

      // Cranial Calvarium Ossification Ring
      const skullBones20 = new THREE.Mesh(new THREE.TorusGeometry(1.30, 0.07, 16, 32), boneMat);
      skullBones20.position.set(0, 1.25, 0);
      skullBones20.rotation.x = Math.PI / 2;
      skeletonGroup.add(skullBones20);

      // Vertebral Column & Ribs
      for (let v = 0; v < 22; v++) {
        const vMesh = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.28), boneMat);
        vMesh.position.set(0, 0.7 - v * 0.1, -0.65);
        skeletonGroup.add(vMesh);
      }

      for (let r = 0; r < 12; r++) {
        const rib = new THREE.Mesh(
          new THREE.TorusGeometry(0.9 - r * 0.02, 0.045, 12, 24, Math.PI * 1.5),
          boneMat
        );
        rib.position.set(0, 0.55 - r * 0.11, 0.08);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.z = Math.PI * 0.25;
        skeletonGroup.add(rib);
      }

      // Long bone diaphyses (Femurs & Humeri)
      [-1, 1].forEach((side) => {
        const femurBone = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), boneMat);
        femurBone.position.set(side * 0.58, -1.18, 0.38);
        femurBone.rotation.x = 0.55;
        femurBone.rotation.z = side * 0.18;
        skeletonGroup.add(femurBone);

        const humerusBone = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.68, 12), boneMat);
        humerusBone.position.set(side * 0.76, 0.38, 0.26);
        humerusBone.rotation.z = side * -0.52;
        humerusBone.rotation.x = 0.28;
        skeletonGroup.add(humerusBone);
      });

      // Umbilical Cord & Placenta
      const cord20Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, -0.28, 0.6),
        new THREE.Vector3(0.4, 0.0, 1.4),
        new THREE.Vector3(0.2, 0.5, 2.1),
        new THREE.Vector3(-0.3, 0.8, 2.6),
      ]);
      const cord20Mesh = new THREE.Mesh(new THREE.TubeGeometry(cord20Curve, 32, 0.16, 14, false), umbilicalMat);
      placentaGroup.add(cord20Mesh);

      const placentaDisc20 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, 0.2, 32),
        new THREE.MeshStandardMaterial({ color: isUSG ? 0x64748b : 0x881337, roughness: 0.5 })
      );
      placentaDisc20.position.set(-0.3, 0.9, 2.7);
      placentaDisc20.rotation.x = Math.PI / 3;
      placentaGroup.add(placentaDisc20);

      group.add(fetusGroup);
    }

    // -------------------------------------------------------------
    // STAGE 6: WEEK 36+ - FULL-TERM CEPHALIC VERTEX PRESENTATION
    // -------------------------------------------------------------
    else if (currentStageKey === 'w36') {
      const fullTermGroup = new THREE.Group();

      // Cephalic Presentation: Head Engaged Low toward maternal pelvic inlet
      // Vertex points downward (-Y) towards pelvic floor, chin tucked towards chest (+Y), face facing forward (+Z)
      const headGroup = createSculptedFetalHeadGroup('w36', 1.48, skinMat, boneMat);
      headGroup.position.set(0, -0.85, 0.15);
      headGroup.rotation.z = Math.PI;
      headGroup.rotation.x = -0.22;
      fullTermGroup.add(headGroup);

      // Cranial Calvarium Ossification Ring (Vertex engaged)
      const skullBones36 = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.08, 16, 32), boneMat);
      skullBones36.position.set(0, -0.85, 0.15);
      skullBones36.rotation.x = Math.PI / 2;
      skeletonGroup.add(skullBones36);

      // Organic Full-Term Torso Loft (Filled out by abundant subcutaneous white adipose tissue)
      const torso36Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.2, 0.1),
        new THREE.Vector3(0, 0.35, 0.05),
        new THREE.Vector3(0, 0.95, -0.05),
        new THREE.Vector3(0, 1.55, 0.0), // Rump upper pole
      ]);
      const torso36Geo = createOrganicLoftedGeometry(
        torso36Curve,
        (t) => 1.25 + Math.sin(t * Math.PI) * 0.22,
        36,
        24,
        () => 1.05,
        () => 0.95
      );
      const torso36Mesh = new THREE.Mesh(torso36Geo, skinMat);
      torso36Mesh.renderOrder = 4;
      fullTermGroup.add(torso36Mesh);

      // Crossed Upper Limbs tightly packed over Chest near face
      [-1, 1].forEach((side) => {
        const isL = side === 1;
        const armCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.95, 0.42, 0.25),
          new THREE.Vector3(side * 0.88, 0.18, 0.42),
          new THREE.Vector3(side * 0.65, -0.05, 0.52),
          new THREE.Vector3(side * 0.32, -0.15, 0.60),
          new THREE.Vector3(side * 0.15, -0.22, 0.65),
        ]);
        const armGeo = createOrganicLoftedGeometry(
          armCurve,
          (t) => 0.22 - t * 0.08,
          24,
          16
        );
        fullTermGroup.add(new THREE.Mesh(armGeo, skinMat));

        const hand = createSculptedFetalHand(isL, 'w36', skinMat, 'chest');
        hand.position.set(side * 0.12, -0.22, 0.68);
        hand.rotation.z = side * -0.6;
        hand.rotation.x = -0.3;
        fullTermGroup.add(hand);
      });

      // Lower Limbs Flexed tightly against Abdomen in Intrauterine Vertex Posture
      [-1, 1].forEach((side) => {
        const isL = side === 1;
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.7, 1.35, 0.2), // Hip
          new THREE.Vector3(side * 0.78, 0.92, 0.52),
          new THREE.Vector3(side * 0.7, 0.45, 0.8), // Knee
          new THREE.Vector3(side * 0.48, 0.62, 0.92),
          new THREE.Vector3(side * 0.28, 0.82, 0.98), // Ankle
        ]);
        const legGeo = createOrganicLoftedGeometry(
          legCurve,
          (t) => 0.28 - t * 0.12,
          28,
          16
        );
        fullTermGroup.add(new THREE.Mesh(legGeo, skinMat));

        const foot = createSculptedFetalFoot(isL, 'w36', skinMat);
        foot.position.set(side * 0.24, 0.86, 1.02);
        foot.rotation.x = 0.4;
        foot.rotation.y = side * 0.35;
        fullTermGroup.add(foot);

        // Femur diaphysis bone (matches FL caliper)
        const femurBone = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.92, 14), boneMat);
        femurBone.position.set(side * 0.7, 0.9, 0.5);
        femurBone.rotation.x = 0.65;
        femurBone.rotation.z = side * 0.15;
        skeletonGroup.add(femurBone);

        // Humerus diaphysis bone in folded upper arm
        const humerusBone = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.75, 12), boneMat);
        humerusBone.position.set(side * 0.88, 0.28, 0.35);
        humerusBone.rotation.z = side * -0.55;
        humerusBone.rotation.x = 0.3;
        skeletonGroup.add(humerusBone);
      });

      // Term Vertebral Column (24 vertebrae along curved spine) & 12 Rib Pairs
      const spine36Pts = torso36Curve.getPoints(24);
      spine36Pts.forEach((pt) => {
        const vMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.35), boneMat);
        vMesh.position.set(pt.x, pt.y, pt.z - 0.45);
        skeletonGroup.add(vMesh);
      });

      for (let r = 0; r < 12; r++) {
        const rib = new THREE.Mesh(
          new THREE.TorusGeometry(1.1 - r * 0.025, 0.055, 12, 24, Math.PI * 1.5),
          boneMat
        );
        rib.position.set(0, 0.15 + r * 0.09, 0.12);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.z = Math.PI * 0.25;
        skeletonGroup.add(rib);
      }

      // 4-Chamber Heart in Thorax
      const heartGeo = new THREE.SphereGeometry(0.52, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.15, 0.45, 0.85);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Mobile Foramen Ovale Interatrial Flap
      const flap36Geo = new THREE.PlaneGeometry(0.2, 0.28);
      const flap36Mesh = new THREE.Mesh(flap36Geo, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
      flap36Mesh.position.set(0.15, 0.45, 0.88);
      cardioGroup.add(flap36Mesh);
      foramenFlapRef.current = flap36Mesh;

      // The Three Fetal Circulatory Shunts (Module 4 Core Curriculum)
      // 1. Ductus Venosus (Umbilical vein bypassing liver into IVC)
      const dvCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.1, 0.05, 1.1),
        new THREE.Vector3(0.12, 0.22, 0.95),
        new THREE.Vector3(0.14, 0.38, 0.85),
      ]);
      const dvMesh = new THREE.Mesh(new THREE.TubeGeometry(dvCurve, 20, 0.09, 12, false), oxyBloodMat);
      cardioGroup.add(dvMesh);

      // 2. Ductus Arteriosus (Pulmonary trunk to descending aorta)
      const daCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.24, 0.58, 0.85),
        new THREE.Vector3(0.1, 0.64, 0.72),
        new THREE.Vector3(-0.08, 0.68, 0.65),
      ]);
      const daMesh = new THREE.Mesh(new THREE.TubeGeometry(daCurve, 16, 0.08, 10, false), oxyBloodMat);
      cardioGroup.add(daMesh);

      // Ascending & Descending Aorta
      const aorta36Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.16, 0.55, 0.85),
        new THREE.Vector3(0.12, 0.72, 0.75),
        new THREE.Vector3(-0.08, 0.75, 0.65),
        new THREE.Vector3(-0.12, 0.35, 0.45),
        new THREE.Vector3(-0.1, 0.0, 0.35),
      ]);
      const aorta36Mesh = new THREE.Mesh(new THREE.TubeGeometry(aorta36Curve, 24, 0.1, 12, false), oxyBloodMat);
      cardioGroup.add(aorta36Mesh);

      // Helical Umbilical Cord (Wharton's Jelly + 2 Arteries + 1 Vein) & Placenta
      const cordCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.1, 0.05, 1.1),
        new THREE.Vector3(0.5, 0.35, 1.7),
        new THREE.Vector3(0.2, 0.75, 2.3),
        new THREE.Vector3(-0.4, 1.15, 2.7),
      ]);
      const cordMesh = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 32, 0.18, 16, false), umbilicalMat);
      placentaGroup.add(cordMesh);

      // Helical Spiral Umbilical Arteries inside cord
      const spiralPts1: THREE.Vector3[] = [];
      const spiralPts2: THREE.Vector3[] = [];
      const cordSubdivs = 40;
      for (let s = 0; s <= cordSubdivs; s++) {
        const t = s / cordSubdivs;
        const pt = cordCurve.getPoint(t);
        const theta = t * Math.PI * 6;
        spiralPts1.push(new THREE.Vector3(pt.x + Math.cos(theta) * 0.08, pt.y + Math.sin(theta) * 0.08, pt.z));
        spiralPts2.push(new THREE.Vector3(pt.x + Math.cos(theta + Math.PI) * 0.08, pt.y + Math.sin(theta + Math.PI) * 0.08, pt.z));
      }
      const ua1Mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(spiralPts1), 32, 0.04, 8, false), deoxyBloodMat);
      const ua2Mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(spiralPts2), 32, 0.04, 8, false), deoxyBloodMat);
      placentaGroup.add(ua1Mesh);
      placentaGroup.add(ua2Mesh);

      // Placental Disc Cake Plate
      const placentaDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(1.55, 1.55, 0.22, 32),
        new THREE.MeshStandardMaterial({ color: isUSG ? 0x64748b : 0x881337, roughness: 0.5 })
      );
      placentaDisc.position.set(-0.4, 1.25, 2.8);
      placentaDisc.rotation.x = Math.PI / 3;
      placentaGroup.add(placentaDisc);

      group.add(fullTermGroup);
    }

    // -------------------------------------------------------------
    // Hotspot Pinpoints in 3D Space with Interactive UserData
    // -------------------------------------------------------------
    const hGroup = hotspotsGroupRef.current;
    if (hGroup) {
      while (hGroup.children.length > 0) {
        const c = hGroup.children[0];
        if ((c as any).geometry) (c as any).geometry.dispose();
        if ((c as any).material) (c as any).material.dispose();
        hGroup.remove(c);
      }

      if (showHotspotMarkers) {
        currentStage.milestones.forEach((m) => {
          const isSelected = selectedMilestoneId === m.id;
          const markerGeo = new THREE.SphereGeometry(isSelected ? 0.14 : 0.09, 16, 16);
          const markerMat = new THREE.MeshBasicMaterial({
            color: isSelected ? 0x38bdf8 : 0xf43f5e,
          });
          const markerMesh = new THREE.Mesh(markerGeo, markerMat);
          markerMesh.position.set(...m.focusPos);
          markerMesh.userData = { milestone: m };
          hGroup.add(markerMesh);

          if (isSelected) {
            const ringGeo = new THREE.RingGeometry(0.18, 0.25, 32);
            const ringMat = new THREE.MeshBasicMaterial({
              color: 0x38bdf8,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.85,
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.position.set(...m.focusPos);
            ringMesh.userData = { milestone: m };
            hGroup.add(ringMesh);
          }
        });
      }
    }

    // -------------------------------------------------------------
    // Interactive Biometric Caliper 3D Overlays (CRL, BPD, HC, AC, FL)
    // -------------------------------------------------------------
    const cGroup = caliperGroupRef.current;
    if (cGroup) {
      while (cGroup.children.length > 0) {
        const c = cGroup.children[0];
        if ((c as any).geometry) (c as any).geometry.dispose();
        if ((c as any).material) (c as any).material.dispose();
        cGroup.remove(c);
      }

      if (caliperMode !== 'none') {
        const caliperMat = new THREE.LineDashedMaterial({
          color: 0xfacc15,
          dashSize: 0.14,
          gapSize: 0.07,
          depthTest: false,
        });

        let p1 = new THREE.Vector3();
        let p2 = new THREE.Vector3();
        let isRingCaliper = false;
        let ringCenter = new THREE.Vector3();
        let ringRadiusX = 1.0;
        let ringRadiusY = 1.0;

        if (caliperMode === 'crl') {
          // Crown-Rump Length: from cranial vertex to caudal rump
          if (currentStageKey === 'w4') {
            p1.set(0.25, 1.4, 0.0);
            p2.set(-0.9, -0.3, 0.0);
          } else if (currentStageKey === 'w8') {
            p1.set(0, 2.01, 0); // Head crown vertex
            p2.set(-0.12, -0.85, 0); // Caudal rump
          } else if (currentStageKey === 'w12') {
            p1.set(0, 2.43, 0);
            p2.set(0, -1.05, 0);
          } else if (currentStageKey === 'w20') {
            p1.set(0, 2.59, 0);
            p2.set(0, -1.15, 0);
          } else if (currentStageKey === 'w36') {
            // Cephalic vertex: head engaged downwards! Crown vertex at -2.33, Rump at +1.65
            p1.set(0, -2.33, 0.15);
            p2.set(0, 1.65, 0);
          }
        } else if (caliperMode === 'bpd') {
          // Biparietal Diameter: transverse diameter touching outer calvarial bone plates
          if (currentStageKey === 'w36') {
            p1.set(-1.48, -0.85, 0.15);
            p2.set(1.48, -0.85, 0.15);
          } else if (currentStageKey === 'w20') {
            p1.set(-1.34, 1.25, 0);
            p2.set(1.34, 1.25, 0);
          } else {
            // w12
            p1.set(-1.24, 1.15, 0);
            p2.set(1.24, 1.15, 0);
          }
        } else if (caliperMode === 'hc') {
          // Head Circumference: ellipse around fetal skull calvarium
          isRingCaliper = true;
          if (currentStageKey === 'w36') {
            ringCenter.set(0, -0.85, 0.15);
            ringRadiusX = 1.48;
            ringRadiusY = 1.54;
          } else if (currentStageKey === 'w20') {
            ringCenter.set(0, 1.25, 0);
            ringRadiusX = 1.34;
            ringRadiusY = 1.40;
          } else {
            ringCenter.set(0, 1.15, 0);
            ringRadiusX = 1.24;
            ringRadiusY = 1.30;
          }
        } else if (caliperMode === 'ac') {
          // Abdominal Circumference: transverse perimeter around mid-abdomen
          isRingCaliper = true;
          if (currentStageKey === 'w36') {
            ringCenter.set(0, 0.45, 0.05);
            ringRadiusX = 1.42;
            ringRadiusY = 1.42;
          } else if (currentStageKey === 'w20') {
            ringCenter.set(0, -0.1, 0.06);
            ringRadiusX = 1.14;
            ringRadiusY = 1.14;
          } else {
            ringCenter.set(0, -0.15, 0.04);
            ringRadiusX = 0.96;
            ringRadiusY = 0.96;
          }
        } else if (caliperMode === 'fl') {
          // Femur Length: strictly along ossified diaphysis of femur bone
          if (currentStageKey === 'w36') {
            // Term flexed thigh diaphysis endpoints
            p1.set(0.70, 1.27, 0.22);
            p2.set(0.70, 0.53, 0.78);
          } else if (currentStageKey === 'w20') {
            // Week 20 femur diaphysis endpoints
            p1.set(0.58, -0.84, 0.17);
            p2.set(0.58, -1.52, 0.59);
          } else {
            // Week 12 femur diaphysis endpoints
            p1.set(0.50, -0.94, 0.16);
            p2.set(0.50, -1.50, 0.48);
          }
        }

        if (isRingCaliper) {
          const ringPts: THREE.Vector3[] = [];
          for (let a = 0; a <= 64; a++) {
            const rad = (a / 64) * Math.PI * 2;
            ringPts.push(
              new THREE.Vector3(
                ringCenter.x + Math.cos(rad) * ringRadiusX,
                ringCenter.y,
                ringCenter.z + Math.sin(rad) * ringRadiusY
              )
            );
          }
          const ringLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts), caliperMat);
          ringLine.computeLineDistances();
          ringLine.renderOrder = 999;
          cGroup.add(ringLine);
        } else {
          const caliperGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
          const line = new THREE.Line(caliperGeo, caliperMat);
          line.computeLineDistances();
          line.renderOrder = 999;
          cGroup.add(line);

          // Crosshair end caps
          const crosshairGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.12, 0, 0),
            new THREE.Vector3(0.12, 0, 0),
            new THREE.Vector3(0, -0.12, 0),
            new THREE.Vector3(0, 0.12, 0),
          ]);
          const crossMat = new THREE.LineBasicMaterial({ color: 0xfacc15, depthTest: false });

          const cap1 = new THREE.LineSegments(crosshairGeo, crossMat);
          cap1.position.copy(p1);
          cap1.renderOrder = 999;
          cGroup.add(cap1);

          const cap2 = new THREE.LineSegments(crosshairGeo, crossMat);
          cap2.position.copy(p2);
          cap2.renderOrder = 999;
          cGroup.add(cap2);
        }
      }
    }
  }, [
    currentStageKey,
    cleavageSubStage,
    currentStage.milestones,
    viewMode,
    showSkin,
    skinOpacity,
    showSkeleton,
    showCardio,
    showUmbilicalPlacenta,
    showHotspotMarkers,
    showShuntsOnly,
    selectedMilestoneId,
    caliperMode,
  ]);

  // 3. Diagnostic Real-Time Pulsed Doppler Spectral Waveform Canvas
  useEffect(() => {
    if (viewMode !== 'ultrasound') return;
    const canvas = ultrasoundCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const renderWaveform = () => {
      animId = requestAnimationFrame(renderWaveform);
      const w = canvas.width;
      const h = canvas.height;
      const bpm = currentStage.heartRate;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Doppler Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let y = 10; y < h; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const baselineY = h - 20;
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(w, baselineY);
      ctx.stroke();

      if (bpm === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText(
          language === 'en'
            ? 'NO PULSATILE DOPPLER FLOW (DIFFUSION PHASE)'
            : 'TIDAK ADA ALIRAN DOPPLER BERDENYUT (FASE DIFUSI)',
          15,
          h / 2
        );
        return;
      }

      offset += (bpm / 60) * 2.8 * (settings.physicsSpeed || 1.0);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const t = (x + offset) * 0.04;
        const cycle = t % (Math.PI * 2);

        let val = 0;
        if (cycle < Math.PI * 0.5) {
          // Sharp systolic ejection peak
          val = Math.sin((cycle / 0.5) * Math.PI) * 44;
        } else if (cycle < Math.PI * 1.1) {
          // Dicrotic notch and secondary diastolic wave
          val = Math.sin(((cycle - Math.PI * 0.5) / 0.6) * Math.PI) * 16;
        } else {
          // Forward continuous diastolic flow
          val = 8 + Math.sin(cycle) * 2.5;
        }

        const y = baselineY - val;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Clinical Doppler Indices Overlay
      const psv = (bpm * 0.34).toFixed(1);
      const edv = (bpm * 0.09).toFixed(1);
      const ri = (1 - Number(edv) / Number(psv)).toFixed(2);
      const pi = ((Number(psv) - Number(edv)) / ((Number(psv) + Number(edv)) / 2)).toFixed(2);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px monospace';
      ctx.fillText(
        `PSV: ${psv} cm/s | EDV: ${edv} cm/s | RI: ${ri} | PI: ${pi}`,
        10,
        15
      );
    };

    renderWaveform();
    return () => cancelAnimationFrame(animId);
  }, [viewMode, currentStage.heartRate, settings.physicsSpeed, language]);

  const selectedMilestone = useMemo(() => {
    return currentStage.milestones.find((m) => m.id === selectedMilestoneId) || currentStage.milestones[0];
  }, [currentStage, selectedMilestoneId]);

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header & Developmental Timeline Navigation */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60">
                {currentStage.carnegieStage || `Week ${currentStage.week}`}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {currentStage.period[language]}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {currentStage.title[language]}
            </h2>
          </div>

          {/* Imaging View Mode Selector */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            {[
              { id: 'anatomy', label: { en: '3D Anatomy', id: 'Anatomi 3D' } },
              { id: 'ultrasound', label: { en: 'USG Sonogram', id: 'Sonogram USG' } },
              { id: 'ossification', label: { en: 'Ossification', id: 'Osifikasi Tulang' } },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setViewMode(m.id as ViewMode)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === m.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Gestational Stage Timeline Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {(Object.keys(STAGES) as GestationalStage[]).map((key) => {
            const st = STAGES[key];
            const active = currentStageKey === key;
            return (
              <button
                key={key}
                onClick={() => handleStageSelect(key)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 shadow-2xs'
                    : 'border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className={active ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500'}>
                    Wk {st.week}
                  </span>
                  {st.heartRate > 0 && <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />}
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                  {st.crl}
                </div>
              </button>
            );
          })}
        </div>

        {/* Week 1 Cleavage Continuum Selector */}
        {currentStageKey === 'w1' && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <span className="font-mono text-[11px] text-slate-500 font-bold">
              {language === 'en' ? 'Cleavage Continuum:' : 'Rangkaian Pembelahan:'}
            </span>
            {[
              { id: 'zygote', label: { en: '1-Cell Zygote', id: 'Zigot 1-Sel' } },
              { id: '4cell', label: { en: '4-Cell Cleavage', id: 'Pembelahan 4-Sel' } },
              { id: 'morula', label: { en: '16-Cell Morula', id: 'Morula 16-Sel' } },
              { id: 'blastocyst', label: { en: 'Blastocyst (Day 5–6)', id: 'Blastokista (Hari 5–6)' } },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setCleavageSubStage(sub.id as CleavageSubStage)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                  cleavageSubStage === sub.id
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sub.label[language]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main 3D Viewport & Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        {/* 3D Canvas Viewport (8 Cols) */}
        <div className="lg:col-span-8 relative bg-slate-950 flex flex-col justify-between overflow-hidden">
          {/* Telemetry HUD */}
          <TelemetryHUD
            fps={fps}
            drawCalls={drawCalls}
            triangles={triangles}
            particleCount={0}
          />

          {/* Top-Left Biometric & Landmark Overlay HUD */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none font-mono text-[11px] bg-slate-950/85 backdrop-blur-md text-slate-300 border border-slate-800 rounded-xl p-3 space-y-1 shadow-lg max-w-[280px]">
            <div className="text-xs text-rose-400 font-bold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{currentStage.heartRateLabel[language]}</span>
            </div>
            <div className="text-slate-400">
              CRL ({language === 'en' ? 'Crown-Rump' : 'Panjang Kepala-Bokong'}):{' '}
              <span className="text-white font-bold">{currentStage.crl}</span>
            </div>
            <div className="text-slate-400">
              {language === 'en' ? 'Estimated Mass:' : 'Estimasi Massa:'}{' '}
              <span className="text-white font-bold">{currentStage.weight}</span>
            </div>

            {caliperMode !== 'none' && (
              <div className="text-amber-400 font-bold pt-1 border-t border-slate-800">
                {language === 'en' ? 'Caliper:' : 'Kaliper:'} {caliperMode.toUpperCase()} ={' '}
                {caliperMode === 'crl'
                  ? `${currentStage.biometry.crlMm.toFixed(1)} mm`
                  : caliperMode === 'bpd'
                  ? `${currentStage.biometry.bpdMm?.toFixed(1) || 'N/A'} mm`
                  : caliperMode === 'hc'
                  ? `${currentStage.biometry.hcMm?.toFixed(1) || 'N/A'} mm`
                  : caliperMode === 'ac'
                  ? `${currentStage.biometry.acMm?.toFixed(1) || 'N/A'} mm`
                  : `${currentStage.biometry.flMm?.toFixed(1) || 'N/A'} mm`}
                {currentStage.biometry.hadlockGaDays && (
                  <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                    GA: ~{Math.round(currentStage.biometry.hadlockGaDays / 7)}w {currentStage.biometry.hadlockGaDays % 7}d
                  </span>
                )}
              </div>
            )}

            {hoveredMilestoneName && (
              <div className="text-sky-400 font-bold pt-1 border-t border-slate-800 flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-sky-400" />
                <span className="truncate">{hoveredMilestoneName}</span>
              </div>
            )}
          </div>

          {/* WebGL Canvas Container */}
          <div
            ref={mountRef}
            className="w-full min-h-[480px] h-[480px] sm:h-[520px] lg:h-full cursor-grab active:cursor-grabbing"
          />

          {/* Ultrasound Sector Beam Fan Overlay in USG Mode */}
          {viewMode === 'ultrasound' && showSectorBeam && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <svg className="w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="sectorGrad" cx="50%" cy="0%" r="90%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                    <stop offset="75%" stopColor="#0284c7" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                  </radialGradient>
                </defs>
                <path d="M 50 0 L 98 96 A 85 85 0 0 1 2 96 Z" fill="url(#sectorGrad)" stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
                <line x1="50" y1="0" x2="50" y2="96" stroke="#38bdf8" strokeWidth="0.2" strokeDasharray="2 2" opacity="0.5" />
                <circle cx="50" cy="0" r="30" fill="none" stroke="#38bdf8" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.4" />
                <circle cx="50" cy="0" r="60" fill="none" stroke="#38bdf8" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.4" />
                <circle cx="50" cy="0" r="90" fill="none" stroke="#38bdf8" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.4" />
              </svg>
            </div>
          )}

          {/* Ultrasound Real-Time Spectral Waveform Dock */}
          {viewMode === 'ultrasound' && (
            <div className="absolute bottom-16 left-3 right-3 z-20 bg-slate-950/90 border border-slate-800 rounded-xl p-2 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
                <span className="flex items-center gap-1 text-sky-400 font-bold">
                  <Activity className="w-3 h-3" />
                  {language === 'en' ? 'Pulsed Spectral Doppler Hemodynamics' : 'Hemodinamik Doppler Spektral Berdenyut'}
                </span>
                <span>
                  Sweep: {currentStage.heartRate > 0 ? (60 / currentStage.heartRate).toFixed(2) : 0}s / beat
                </span>
              </div>
              <canvas
                ref={ultrasoundCanvasRef}
                width={500}
                height={65}
                className="w-full h-[65px] rounded bg-slate-950"
              />
            </div>
          )}

          {/* Bottom Floating Controls Toolbar */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                title={
                  language === 'en'
                    ? isPlaying ? 'Pause Simulation' : 'Play Simulation'
                    : isPlaying ? 'Jeda Simulasi' : 'Jalankan Simulasi'
                }
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleResetCamera}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                title={language === 'en' ? 'Reset Camera Orientation' : 'Atur Ulang Orientasi Kamera'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {currentStage.heartRate > 0 && (
                <button
                  onClick={() => setAudioHeartbeatEnabled(!audioHeartbeatEnabled)}
                  className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-mono text-[11px] font-bold transition-all cursor-pointer ${
                    audioHeartbeatEnabled
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={
                    language === 'en'
                      ? 'Toggle Audio Doppler Heartbeat'
                      : 'Nyalakan Detak Jantung Audio Doppler'
                  }
                >
                  {audioHeartbeatEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{currentStage.heartRate} BPM</span>
                </button>
              )}
            </div>

            {/* Layer Visibility & Biometric Tools */}
            <div className="flex items-center flex-wrap gap-1">
              <button
                onClick={() => setShowSkin(!showSkin)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showSkin ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {language === 'en' ? 'Skin' : 'Kulit'}
              </button>
              <button
                onClick={() => setShowSkeleton(!showSkeleton)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showSkeleton ? 'bg-sky-950/60 text-sky-300 border border-sky-800' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {language === 'en' ? 'Skeleton' : 'Rangka'}
              </button>
              <button
                onClick={() => setShowCardio(!showCardio)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showCardio ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {language === 'en' ? 'Cardio & Shunts' : 'Jantung & Pirau'}
              </button>
              {(currentStageKey === 'w20' || currentStageKey === 'w36') && (
                <button
                  onClick={() => setShowShuntsOnly(!showShuntsOnly)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                    showShuntsOnly ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800 font-bold' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={language === 'en' ? 'Isolate 3 Circulatory Shunts (DV, FO, DA)' : 'Isolasi 3 Pirau Sirkulasi (DV, FO, DA)'}
                >
                  {language === 'en' ? 'Shunts Focus' : 'Fokus Pirau'}
                </button>
              )}
              <button
                onClick={() => setShowUmbilicalPlacenta(!showUmbilicalPlacenta)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showUmbilicalPlacenta
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {language === 'en' ? 'Placenta & Cord' : 'Plasenta & Tali Pusat'}
              </button>
              <button
                onClick={() => setShowHotspotMarkers(!showHotspotMarkers)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showHotspotMarkers ? 'bg-amber-950/60 text-amber-300 border border-amber-800' : 'text-slate-500 hover:text-slate-300'
                }`}
                title={language === 'en' ? 'Toggle 3D Anatomical Sites' : 'Alihkan Titik Anatomi 3D'}
              >
                {language === 'en' ? 'Hotspots' : 'Titik Anatomi'}
              </button>

              {/* Biometric Caliper Selector */}
              <div className="flex items-center gap-1 border-l border-slate-800 pl-1 ml-1">
                <button
                  onClick={() => handleCaliperSelect('crl')}
                  className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                    caliperMode === 'crl'
                      ? 'bg-yellow-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={language === 'en' ? 'Biometric Caliper: Crown-Rump Length' : 'Kaliper Biometri: Crown-Rump Length'}
                >
                  <Ruler className="w-3 h-3" />
                  <span>CRL</span>
                </button>
                {currentStage.biometry.bpdMm && (
                  <button
                    onClick={() => handleCaliperSelect('bpd')}
                    className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      caliperMode === 'bpd'
                        ? 'bg-yellow-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={language === 'en' ? 'Biometric Caliper: Biparietal Diameter' : 'Kaliper Biometri: Biparietal Diameter'}
                  >
                    <span>BPD</span>
                  </button>
                )}
                {currentStage.biometry.hcMm && (
                  <button
                    onClick={() => handleCaliperSelect('hc')}
                    className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      caliperMode === 'hc'
                        ? 'bg-yellow-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={language === 'en' ? 'Biometric Caliper: Head Circumference' : 'Kaliper Biometri: Lingkar Kepala'}
                  >
                    <span>HC</span>
                  </button>
                )}
                {currentStage.biometry.acMm && (
                  <button
                    onClick={() => handleCaliperSelect('ac')}
                    className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      caliperMode === 'ac'
                        ? 'bg-yellow-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={language === 'en' ? 'Biometric Caliper: Abdominal Circumference' : 'Kaliper Biometri: Lingkar Abdomen'}
                  >
                    <span>AC</span>
                  </button>
                )}
                {currentStage.biometry.flMm && (
                  <button
                    onClick={() => handleCaliperSelect('fl')}
                    className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      caliperMode === 'fl'
                        ? 'bg-yellow-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={language === 'en' ? 'Biometric Caliper: Femur Length' : 'Kaliper Biometri: Panjang Femur'}
                  >
                    <span>FL</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Anatomy & Clinical Inspector (4 Cols) */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <span>{language === 'en' ? 'Developmental Milestones' : 'Tonggak Perkembangan'}</span>
              <span className="text-rose-500 font-bold">
                {currentStage.milestones.length} {language === 'en' ? 'sites' : 'titik'}
              </span>
            </div>

            {/* Milestones Button List */}
            <div className="space-y-2">
              {currentStage.milestones.map((m) => {
                const isSelected = selectedMilestoneId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleMilestoneClick(m)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {m.name[language]}
                      </div>
                      <Crosshair
                        className={`w-3.5 h-3.5 transition-colors ${
                          isSelected ? 'text-rose-500' : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-normal">
                      {m.summary[language]}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Milestone Clinical Details Card */}
            {selectedMilestone && (
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{language === 'en' ? 'Clinical Embryology Insight' : 'Wawasan Embriologi Klinis'}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedMilestone.clinicalNote[language]}
                </p>
              </div>
            )}
          </div>

          {/* Overview Narrative Card */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="font-bold text-slate-900 dark:text-slate-200 mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-500" />
              <span>{language === 'en' ? 'Morphogenetic Summary' : 'Ringkasan Morfogenesis'}</span>
            </div>
            {currentStage.description[language]}
          </div>
        </div>
      </div>
    </div>
  );
};
