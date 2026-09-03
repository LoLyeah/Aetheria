'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import {
  Layers,
  Heart,
  Activity,
  Radio,
  Play,
  Pause,
  RotateCcw,
  Info,
  Sliders,
  Maximize2,
  Volume2,
  VolumeX,
  Eye,
  Crosshair,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Grid,
} from 'lucide-react';
import { TelemetryHUD } from './TelemetryHUD';

export type GestationalStage = 'w1' | 'w4' | 'w8' | 'w12' | 'w20' | 'w36';
export type ViewMode = 'anatomy' | 'ultrasound' | 'ossification';

interface MilestoneDetail {
  id: string;
  name: { en: string; id: string };
  summary: { en: string; id: string };
  clinicalNote: { en: string; id: string };
  focusPos: [number, number, number];
  cameraPos: [number, number, number];
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
  heartRateLabel: string;
  description: { en: string; id: string };
  milestones: MilestoneDetail[];
  cameraInit: [number, number, number];
}

export const STAGES: Record<GestationalStage, StageData> = {
  w1: {
    key: 'w1',
    week: 1,
    carnegieStage: 'Carnegie Stage 3',
    title: {
      en: 'Day 4–6: Blastocyst & Hatching Embryoblast',
      id: 'Hari 4–6: Blastokista & Penetasan Embrioblas',
    },
    period: { en: 'Pre-embryonic Cleavage', id: 'Pembelahan Pra-embrio' },
    crl: '0.15 mm',
    weight: '< 0.001 g',
    heartRate: 0,
    heartRateLabel: 'Pre-vascular (Diffusion)',
    description: {
      en: 'Following morula cavitation, fluid accumulation generates the blastocoel. The outer trophoblast differentiates into invasive syncytiotrophoblast while the inner cell mass segregates into epiblast and hypoblast.',
      id: 'Setelah kavitasi morula, akumulasi cairan membentuk rongga blastosel. Trofoblas luar berdiferensiasi menjadi sinsisiotrofoblas invasif sementara massa sel dalam terbagi menjadi epiblas dan hipoblas.',
    },
    cameraInit: [0, 0, 7],
    milestones: [
      {
        id: 'trophoblast',
        name: { en: 'Outer Trophectoderm Shell', id: 'Lapisan Luar Trofoblas' },
        summary: {
          en: 'Monolayer of polarized epithelial cells mediating maternal implantation.',
          id: 'Lapisan sel epitel terpolarisasi yang memediasi implantasi ke endometrium.',
        },
        clinicalNote: {
          en: 'Secretes human chorionic gonadotropin (hCG) to maintain the corpus luteum and progesterone synthesis.',
          id: 'Mensekresi hormon hCG untuk mempertahankan korpus luteum dan sintesis progesteron.',
        },
        focusPos: [0, 1.2, 0],
        cameraPos: [0, 1.5, 5],
      },
      {
        id: 'epiblast',
        name: { en: 'Epiblast & Primitive Ectoderm', id: 'Epiblas & Ektoderm Primitif' },
        summary: {
          en: 'Columnar pluripotent cells giving rise to all three embryonic germ layers.',
          id: 'Sel-sel kolumnar pluripoten yang menjadi asal seluruh tiga lapisan germinal embrio.',
        },
        clinicalNote: {
          en: 'Source of all embryonic tissues through the subsequent process of primitive streak gastrulation.',
          id: 'Sumber seluruh jaringan embrio melalui proses gastrulasi jalur primitif berikutnya.',
        },
        focusPos: [-0.4, 0.5, 0.2],
        cameraPos: [-0.5, 0.8, 4.5],
      },
      {
        id: 'hypoblast',
        name: { en: 'Hypoblast (Primitive Endoderm)', id: 'Hipoblas (Endoderm Primitif)' },
        summary: {
          en: 'Cuboidal cell layer lining the blastocoelic cavity forming Heuser membrane.',
          id: 'Lapisan sel kuboid yang membatasi rongga blastosel dan membentuk membran Heuser.',
        },
        clinicalNote: {
          en: 'Guides primitive extraembryonic endoderm formation and establishes cranial-caudal polarity.',
          id: 'Memandu pembentukan endoderm ekstraembrionik dan menetapkan polaritas kranial-kaudal.',
        },
        focusPos: [-0.4, -0.1, 0.2],
        cameraPos: [-0.6, 0.2, 4.5],
      },
      {
        id: 'zona_pellucida',
        name: { en: 'Zona Pellucida Hatching', id: 'Penetasan Zona Pellucida' },
        summary: {
          en: 'Dissolution of the glycoprotein coat allowing blastocyst adhesion.',
          id: 'Pelepasan selubung glikoprotein yang memungkinkan pelekatan blastokista.',
        },
        clinicalNote: {
          en: 'Premature hatching can lead to ectopic tubal implantation; failure to hatch causes infertility.',
          id: 'Penetasan dini dapat memicu kehamilan ektopik; kegagalan menetas menyebabkan infertilitas.',
        },
        focusPos: [1.2, -0.6, 0],
        cameraPos: [1.5, -0.4, 5.2],
      },
    ],
  },
  w4: {
    key: 'w4',
    week: 4,
    carnegieStage: 'Carnegie Stage 13',
    title: {
      en: 'Week 4: Neurulation & C-Shaped Cardiac Looping',
      id: 'Minggu 4: Neurulasi & Lengkungan Jantung Bentuk-C',
    },
    period: { en: 'Early Embryonic Gastrulation', id: 'Gastrulasi Embrio Awal' },
    crl: '4.5 mm',
    weight: '0.04 g',
    heartRate: 105,
    heartRateLabel: '105 bpm (Peristaltic Tube)',
    description: {
      en: 'The embryo assumes its classic C-shaped flexure. Cranial neural folds fuse, 28–32 paraxial somite pairs segment the dorsal axis, and the primitive cardiac tube loops rightward initiating peristaltic circulation.',
      id: 'Embrio membentuk lengkungan khas berbentuk C. Tabung saraf kranial menutup, 28–32 pasang somit paraksial mensegmentasi sumbu dorsal, dan tabung jantung primitif melengkung ke kanan memulai sirkulasi peristaltik.',
    },
    cameraInit: [0, 0, 6.5],
    milestones: [
      {
        id: 'branchial_arches',
        name: { en: 'Pharyngeal (Branchial) Arches', id: 'Lengkung Faring (Insang)' },
        summary: {
          en: '1st Mandibular/Maxillary and 2nd Hyoid arches forming craniofacial skeletal elements.',
          id: 'Lengkung Mandibula/Maksila ke-1 dan Hioid ke-2 pembentuk tulang wajah.',
        },
        clinicalNote: {
          en: 'Neural crest cell migration defects here cause Treacher Collins and Pierre Robin syndromes.',
          id: 'Defek migrasi krista neural di area ini menyebabkan sindrom Treacher Collins dan Pierre Robin.',
        },
        focusPos: [0.35, 0.55, 0.35],
        cameraPos: [0.75, 0.7, 4.0],
      },
      {
        id: 'cardiac_bulge',
        name: { en: 'Bulbus Cordis & Ventricle Bulge', id: 'Tonjolan Bulbus Kordis & Ventrikel' },
        summary: {
          en: 'Massive ventral heart prominence exhibiting rhythmic unidirectional peristalsis.',
          id: 'Tonjolan jantung ventral yang menunjukkan denyut peristaltik searah.',
        },
        clinicalNote: {
          en: 'First functional organ system in the developing human conceptus, beating at ~105 bpm.',
          id: 'Sistem organ pertama yang berfungsi pada manusia, berdenyut sekitar 105 bpm.',
        },
        focusPos: [0.32, 0.12, 0.35],
        cameraPos: [0.72, 0.25, 3.8],
      },
      {
        id: 'somites',
        name: { en: 'Paraxial Somites (28–32 Pairs)', id: 'Somit Paraksial (28–32 Pasang)' },
        summary: {
          en: 'Segmental mesodermal blocks differentiating into sclerotome, myotome, and dermatome.',
          id: 'Blok mesoderm segmental yang berdiferensiasi menjadi sklerotom, miotom, dan dermatom.',
        },
        clinicalNote: {
          en: 'Determines the metameric organization of spinal vertebrae, ribs, and somatic musculature.',
          id: 'Menentukan organisasi segmental tulang belakang, tulang rusuk, dan otot somatik.',
        },
        focusPos: [-0.4, 0.3, 0],
        cameraPos: [-1.0, 0.4, 4.0],
      },
      {
        id: 'limb_buds',
        name: { en: 'Upper Limb Paddle Bud & AER', id: 'Tunas Anggota Gerak Atas & AER' },
        summary: {
          en: 'Ectodermal-mesenchymal outgrowth guided by the Apical Ectodermal Ridge (Fgf8/10).',
          id: 'Pertumbuhan ektoderm-mesenkim dipandu oleh Apical Ectodermal Ridge (Fgf8/10).',
        },
        clinicalNote: {
          en: 'Disruption by teratogens like thalidomide induces phocomelia or amelia limb reductions.',
          id: 'Gangguan zat teratogen seperti talidomid memicu reduksi ekstremitas (fokomelia).',
        },
        focusPos: [0.48, -0.22, 0.42],
        cameraPos: [0.85, -0.15, 3.9],
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
    period: { en: 'End of Embryonic Period', id: 'Akhir Periode Embrionik' },
    crl: '30 mm',
    weight: '1.0 g',
    heartRate: 165,
    heartRateLabel: '165 bpm (Peak Embryonic Rate)',
    description: {
      en: 'Concluding the embryonic phase. The head represents 48% of total CRL. Programmed cell death (apoptosis) sculpts individual fingers and toes from paddle rays. Rapid intestinal elongation produces the physiological umbilical hernia.',
      id: 'Menutup fase embrio. Kepala menyumbang 48% panjang CRL. Kematian sel terprogram (apoptosis) memisahkan jari tangan dan kaki. Pemanjangan usus menghasilkan hernia umbilikalis fisiologis.',
    },
    cameraInit: [0, 0, 6.6],
    milestones: [
      {
        id: 'digital_apoptosis',
        name: { en: 'Interdigital Apoptosis (Digits Separation)', id: 'Apoptosis Interdigital (Pemisahan Jari)' },
        summary: {
          en: 'Bmp-mediated programmed necrosis in the interdigital necrotic zones freeing fingers.',
          id: 'Nekrosis terprogram dimediasi Bmp pada zona interdigital yang membebaskan jari.',
        },
        clinicalNote: {
          en: 'Failure of apoptosis results in syndactyly (webbed digits), the most common hand malformation.',
          id: 'Kegagalan apoptosis menghasilkan sindaktili (jari berselaput), anomali tangan paling umum.',
        },
        focusPos: [0.65, -0.25, 0.55],
        cameraPos: [1.05, -0.15, 4.5],
      },
      {
        id: 'physiological_hernia',
        name: { en: 'Physiological Umbilical Midgut Hernia', id: 'Hernia Umbilikalis Usus Fisiologis' },
        summary: {
          en: 'Expanding midgut loops herniate into the base of the umbilical cord due to liver growth.',
          id: 'Lengkung usus tengah menonjol ke pangkal tali pusat akibat desakan pertumbuhan hati.',
        },
        clinicalNote: {
          en: 'Completely physiological until week 10–11. Failure of midgut return creates an omphalocele.',
          id: 'Sepenuhnya fisiologis hingga minggu 10–11. Kegagalan kembali menyebabkan omfalokel.',
        },
        focusPos: [0.0, -0.42, 0.70],
        cameraPos: [0.3, -0.35, 4.5],
      },
      {
        id: 'auricular_hillocks',
        name: { en: 'Auricular Hillocks of His (Ear)', id: 'Tonjolan Aurikular His (Telinga)' },
        summary: {
          en: 'Six mesenchymal swellings derived from arches 1 and 2 merging into the external pinna.',
          id: 'Enam tonjolan mesenkim dari lengkung 1 dan 2 yang menyatu membentuk daun telinga.',
        },
        clinicalNote: {
          en: 'Positioned low on the lateral neck at this stage; subsequent mandibular growth lifts them to eye level.',
          id: 'Awalnya terletak rendah di leher lateral; pertumbuhan mandibula mengangkatnya sejajar mata.',
        },
        focusPos: [-1.12, 0.82, 0.05],
        cameraPos: [-1.6, 0.95, 4.5],
      },
      {
        id: 'pigmented_retina',
        name: { en: 'Pigmented Retina & Translucent Eyelids', id: 'Retina Berpigmen & Kelopak Mata' },
        summary: {
          en: 'Melanin deposition in the retinal pigmented epithelium clearly visible through eyelids.',
          id: 'Deposisi melanin pada epitel pigmen retina tampak jelas melalui lipatan kelopak mata.',
        },
        clinicalNote: {
          en: 'Eyelids will fuse completely by week 10 and remain sealed until the 26th gestational week.',
          id: 'Kelopak mata akan menyatu pada minggu ke-10 dan tetap tertutup hingga minggu ke-26.',
        },
        focusPos: [0.64, 0.90, 0.96],
        cameraPos: [1.05, 1.0, 4.5],
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
    period: { en: 'Early Fetal Period', id: 'Periode Janin Awal' },
    crl: '85 mm',
    weight: '14 g',
    heartRate: 155,
    heartRateLabel: '155 bpm (Doppler Detectable)',
    description: {
      en: 'Marks the end of the first trimester. Intestinal loops retract from the umbilical cord into the enlarged abdominal cavity. Primary endochondral and intramembranous ossification centers solidify the skull, ribs, and long bone diaphyses.',
      id: 'Menandai akhir trimester pertama. Lengkung usus kembali masuk dari tali pusat ke rongga perut. Pusat osifikasi endokondral dan intramembranosa memadatkan tengkorak, tulang rusuk, dan diafisis tulang panjang.',
    },
    cameraInit: [0, 0, 6.5],
    milestones: [
      {
        id: 'primary_ossification',
        name: { en: 'Primary Diaphyseal Ossification Centers', id: 'Pusat Osifikasi Diafisis Primer' },
        summary: {
          en: 'Vascular invasion of hyaline cartilage models depositing hydroxyapatite bone collars.',
          id: 'Invasi vaskular model tulang rawan hialin yang mendepositkan hidroksiapatit.',
        },
        clinicalNote: {
          en: 'Femur length (FL) and biparietal diameter (BPD) become standardized biometric ultrasound indices.',
          id: 'Panjang femur (FL) dan diameter biparietal (BPD) menjadi indeks biometri USG standar.',
        },
        focusPos: [0.55, -0.85, 0.35],
        cameraPos: [0.95, -0.7, 4.2],
      },
      {
        id: 'hernia_reduction',
        name: { en: 'Complete Midgut Hernia Reduction', id: 'Reduksi Lengkap Hernia Usus' },
        summary: {
          en: 'Intestines rotate 270° counterclockwise and settle permanently within peritoneal space.',
          id: 'Usus berputar 270° berlawanan arah jarum jam dan menetap di rongga peritoneum.',
        },
        clinicalNote: {
          en: 'Ultrasonographic presence of herniated bowel past 12+0 weeks mandates screening for chromosomal aneuploidies.',
          id: 'Adanya hernia usus setelah 12+0 minggu memerlukan skrining untuk aneuploidi kromosom.',
        },
        focusPos: [0.0, -0.35, 0.62],
        cameraPos: [0.3, -0.25, 4.2],
      },
      {
        id: 'micturition',
        name: { en: 'Renal Glomerular Micturition (Urine)', id: 'Miksi Glomerulus Ginjal (Urin)' },
        summary: {
          en: 'Functional metanephric nephrons produce urine contributing directly to amniotic fluid.',
          id: 'Nefron metanefrik fungsional memproduksi urin yang berkontribusi langsung pada cairan ketuban.',
        },
        clinicalNote: {
          en: 'Fetal swallowing and renal clearance establish the dynamic amniotic fluid circulation loop.',
          id: 'Menelan cairan dan pembersihan ginjal membentuk sirkulasi dinamis cairan ketuban.',
        },
        focusPos: [-0.2, -0.35, 0.35],
        cameraPos: [-0.5, -0.25, 4.2],
      },
      {
        id: 'cervical_extension',
        name: { en: 'Cervical Flexure Straightening', id: 'Pelurusan Lengkungan Leher' },
        summary: {
          en: 'Neck elongates elevating the chin from the sternum; auricles migrate level with the orbit.',
          id: 'Leher memanjang mengangkat dagu dari dada; daun telinga bermigrasi sejajar mata.',
        },
        clinicalNote: {
          en: 'Enables precise nuchal translucency (NT) thickness measurements for trisomy 21 screening.',
          id: 'Memungkinkan pengukuran ketebalan nuchal translucency (NT) untuk skrining sindrom Down.',
        },
        focusPos: [0.0, 0.6, 0.3],
        cameraPos: [0.3, 0.8, 4.2],
      },
    ],
  },
  w20: {
    key: 'w20',
    week: 20,
    carnegieStage: 'Mid-Gestation Scan',
    title: {
      en: 'Week 20: Vernix, Lanugo & 4-Chamber Heart',
      id: 'Minggu 20: Verniks, Lanugo & Jantung 4-Ruang',
    },
    period: { en: 'Second Trimester Anatomy Scan', id: 'Pemindaian Anatomi Trimester Kedua' },
    crl: '165 mm (Full: 25 cm)',
    weight: '300 g',
    heartRate: 140,
    heartRateLabel: '140 bpm (Rhythmic & Stable)',
    description: {
      en: 'Target of the comprehensive mid-trimester structural anatomy scan. The skin is shielded by lipid-rich vernix caseosa and downy lanugo. Neuromuscular reflexes allow active limb extension and grasping. Cardiovascular shunts bypass pulmonary resistance.',
      id: 'Target USG struktural trimester kedua. Kulit dilindungi lapisan lemak verniks kaseosa dan rambut lanugo halus. Refleks neuromuskular memungkinkan peregangan aktif dan refleks menggenggam.',
    },
    cameraInit: [0, 0, 6.6],
    milestones: [
      {
        id: 'vernix_lanugo',
        name: { en: 'Vernix Caseosa & Fine Lanugo Hair', id: 'Verniks Kaseosa & Rambut Lanugo Halus' },
        summary: {
          en: 'Sebaceous lipid barrier protecting fragile epidermis from amniotic maceration.',
          id: 'Penghalang lipid sebasea yang melindungi epidermis dari maserasi cairan ketuban.',
        },
        clinicalNote: {
          en: 'Contains antimicrobial peptides and promotes skin acid mantle formation after birth.',
          id: 'Mengandung peptida antimikroba dan membantu pembentukan mantel asam pelindung kulit pasca lahir.',
        },
        focusPos: [0.35, 0.3, 0.65],
        cameraPos: [0.7, 0.5, 4.4],
      },
      {
        id: 'four_chamber',
        name: { en: 'Four-Chamber Cardiac Symmetry', id: 'Simetri Jantung Empat Ruang' },
        summary: {
          en: 'Balanced left and right ventricles with active right-to-left foramen ovale shunt.',
          id: 'Ventrikel kiri dan kanan simetris dengan pirau foramen ovale kanan-ke-kiri.',
        },
        clinicalNote: {
          en: 'Standard screening plane ruling out hypoplastic left heart syndrome and VSDs.',
          id: 'Bidang skrining wajib USG untuk mendeteksi defek septum ventrikel (VSD).',
        },
        focusPos: [0.1, 0.22, 0.50],
        cameraPos: [0.45, 0.32, 4.0],
      },
      {
        id: 'ossified_vertebrae',
        name: { en: 'Vertebral Ossification & Rib Cage', id: 'Osifikasi Tulang Belakang & Rusuk' },
        summary: {
          en: 'Distinct acoustic shadowing from posterior laminar neural arches and thoracic ribs.',
          id: 'Bayangan akustik USG yang jelas dari arkus neuralis lamina dan tulang rusuk.',
        },
        clinicalNote: {
          en: 'Serial axial sweeps confirm intact skin coverage over the spine, excluding spina bifida aperta.',
          id: 'Pemeriksaan aksial serial memastikan penutupan kulit di atas tulang belakang (menyingkirkan spina bifida).',
        },
        focusPos: [-0.2, 0.2, -0.5],
        cameraPos: [-0.8, 0.3, 4.4],
      },
      {
        id: 'quickening_grasp',
        name: { en: 'Quickening & Coordinated Thumb Sucking', id: 'Gerakan Janin & Isap Ibu Jari' },
        summary: {
          en: 'Mature corticospinal tracts enabling maternal perception of fetal movement.',
          id: 'Traktus kortikospinal matang yang memungkinkan ibu merasakan tendangan pertama.',
        },
        clinicalNote: {
          en: 'Reflects intact vestibular-spinal neuromuscular coordination.',
          id: 'Mencerminkan koordinasi neuromuskular vestibular-spinal yang intak.',
        },
        focusPos: [0.45, 0.7, 0.65],
        cameraPos: [0.85, 0.9, 4.2],
      },
    ],
  },
  w36: {
    key: 'w36',
    week: 36,
    carnegieStage: 'Late 3rd Trimester',
    title: {
      en: 'Week 36+: Vertex Presentation & Neonatal Readiness',
      id: 'Minggu 36+: Presentasi Kepala & Kesiapan Neonatal',
    },
    period: { en: 'Term Fetal Maturation', id: 'Pematangan Janin Aterm' },
    crl: '340 mm (Full: 48 cm)',
    weight: '2,700 g',
    heartRate: 130,
    heartRateLabel: '130 bpm (Mature FHR Baseline)',
    description: {
      en: 'Nearing full term. The fetus assumes the cephalic vertex posture engaging the maternal pelvic brim. Abundant subcutaneous white adipose tissue fills out skin folds. Cranial fontanelles enable overlapping during vaginal birth.',
      id: 'Mendekati masa cukup bulan. Janin mengadopsi posisi presentasi kepala menghadap panggul ibu. Jaringan lemak putih subkutan menghaluskan lipatan kulit. Fontanela tengkorak memungkinkan tumpang-tindih saat persalinan.',
    },
    cameraInit: [0, 0, 6.8],
    milestones: [
      {
        id: 'cephalic_vertex',
        name: { en: 'Cephalic Vertex Presentation', id: 'Presentasi Kepala (Verteks)' },
        summary: {
          en: 'Head engaged into the pelvic inlet with occiput presenting for optimal labor mechanics.',
          id: 'Kepala masuk ke pintu atas panggul dengan ubun-ubun kecil sebagai penunjuk persalinan.',
        },
        clinicalNote: {
          en: 'Optimal position for non-traumatic vaginal delivery, present in 95% of singleton term pregnancies.',
          id: 'Posisi paling ideal untuk persalinan normal, ditemui pada 95% kehamilan tunggal aterm.',
        },
        focusPos: [0.0, -0.85, 0.25],
        cameraPos: [0.3, -0.7, 4.5],
      },
      {
        id: 'cranial_fontanelles',
        name: { en: 'Cranial Sutures & Fontanelles', id: 'Sutura & Fontanela Kranium' },
        summary: {
          en: 'Diamond-shaped anterior fontanelle and triangular posterior fontanelle between calvarial plates.',
          id: 'Ubun-ubun besar berbentuk belah ketupat dan ubun-ubun kecil di antara lempeng tengkorak.',
        },
        clinicalNote: {
          en: 'Permits temporary head molding during passage through the maternal birth canal.',
          id: 'Memungkinkan proses molding (penyesuaian bentuk kepala) saat melewati jalan lahir.',
        },
        focusPos: [0.0, -1.3, 0.7],
        cameraPos: [0.3, -1.1, 4.2],
      },
      {
        id: 'subcutaneous_fat',
        name: { en: 'Subcutaneous Adipose Layer', id: 'Lapisan Lemak Subkutan' },
        summary: {
          en: 'White adipose deposition providing essential postpartum thermal insulation and energy.',
          id: 'Deposisi lemak putih yang penting untuk isolasi termal dan energi pasca kelahiran.',
        },
        clinicalNote: {
          en: 'Rapid accumulation in the final 4 weeks prevents neonatal hypothermia and hypoglycemia.',
          id: 'Akumulasi pesat pada 4 minggu terakhir mencegah hipotermia dan hipoglikemia neonatal.',
        },
        focusPos: [0.35, 0.3, 0.7],
        cameraPos: [0.75, 0.45, 4.5],
      },
      {
        id: 'helical_cord',
        name: { en: 'Helical Umbilical Cord & Wharton’s Jelly', id: 'Tali Pusat Spiral & Jeli Wharton' },
        summary: {
          en: 'Two coiled umbilical arteries and one vein enveloped in resilient viscoelastic glycosaminoglycans.',
          id: 'Dua arteri umbilikalis spiral dan satu vena yang diselimuti glikosaminoglikan viskoelastis.',
        },
        clinicalNote: {
          en: 'Wharton’s jelly protects vessels against torsion, compression, and true knots during fetal movement.',
          id: 'Jeli Wharton mencegah penekanan pembuluh darah dan simpul mati saat janin bergerak aktif.',
        },
        focusPos: [0.1, -0.05, 0.9],
        cameraPos: [0.4, 0.1, 4.5],
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// Procedural Canvas Texture Generation for Anatomical Surfaces & Diagnostic USG
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

function generateSkinTexture(stage: GestationalStage, isUSG: boolean): THREE.CanvasTexture {
  return createProceduralTexture(512, 512, (ctx, w, h) => {
    if (isUSG) {
      // Ultrasound acoustic echogenicity with fine speckle noise
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#475569');
      grad.addColorStop(1, '#334155');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 900; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 1.5 + 0.5;
        const alpha = Math.random() * 0.22;
        ctx.fillStyle = i % 2 === 0 ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    if (stage === 'w1') {
      // Pearlescent blastomere cellular mosaic
      const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 2);
      grad.addColorStop(0, '#e0e7ff');
      grad.addColorStop(1, '#c7d2fe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x += 32) {
        for (let y = 0; y < h; y += 32) {
          ctx.beginPath();
          ctx.arc(x + 16, y + 16, 14, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      return;
    }

    // Living embryonic & fetal dermal base
    const skinGrad = ctx.createLinearGradient(0, 0, w, h);
    if (stage === 'w4' || stage === 'w8') {
      skinGrad.addColorStop(0, '#fed7aa'); // peach-blush
      skinGrad.addColorStop(0.5, '#fecdd3');
      skinGrad.addColorStop(1, '#fda4af');
    } else if (stage === 'w12') {
      skinGrad.addColorStop(0, '#fed7aa');
      skinGrad.addColorStop(1, '#fecdd3');
    } else if (stage === 'w20') {
      skinGrad.addColorStop(0, '#fbcfe8');
      skinGrad.addColorStop(1, '#fed7aa');
    } else {
      skinGrad.addColorStop(0, '#fecdd3');
      skinGrad.addColorStop(1, '#fed7aa');
    }
    ctx.fillStyle = skinGrad;
    ctx.fillRect(0, 0, w, h);

    // Superficial micro-capillary arborization
    ctx.lineWidth = 1.2;
    for (let c = 0; c < 14; c++) {
      ctx.strokeStyle = c % 2 === 0 ? 'rgba(225, 29, 72, 0.14)' : 'rgba(185, 28, 28, 0.10)';
      ctx.beginPath();
      let sx = Math.random() * w;
      let sy = Math.random() * h;
      ctx.moveTo(sx, sy);
      for (let s = 0; s < 5; s++) {
        sx += (Math.random() - 0.5) * 60;
        sy += (Math.random() - 0.5) * 60;
        ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Week 20: Vernix caseosa lipid plaques
    if (stage === 'w20') {
      for (let v = 0; v < 36; v++) {
        const vx = Math.random() * w;
        const vy = Math.random() * h;
        const vr = Math.random() * 24 + 10;
        const vGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
        vGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
        vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = vGrad;
        ctx.beginPath();
        ctx.arc(vx, vy, vr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Week 36: Skin flexion creases
    if (stage === 'w36') {
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.15)';
      ctx.lineWidth = 2;
      for (let cr = 0; cr < 8; cr++) {
        const cy = (cr + 1) * (h / 9);
        ctx.beginPath();
        ctx.moveTo(20, cy + (Math.random() - 0.5) * 10);
        ctx.bezierCurveTo(w * 0.33, cy + 8, w * 0.66, cy - 8, w - 20, cy + 4);
        ctx.stroke();
      }
    }
  });
}

function generateSkinBumpTexture(): THREE.CanvasTexture {
  return createProceduralTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const gray = Math.random() > 0.5 ? 140 : 115;
      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.fillRect(x, y, 2, 2);
    }
  });
}

function generateHeartTexture(isUSG: boolean): THREE.CanvasTexture {
  return createProceduralTexture(512, 512, (ctx, w, h) => {
    if (isUSG) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, w - 40, h - 40);
      return;
    }

    // Striated myocardial muscle base
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#881337');
    grad.addColorStop(0.5, '#be123c');
    grad.addColorStop(1, '#9f1239');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Diagonal cardiac muscle fibers
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.28)';
    ctx.lineWidth = 2;
    for (let f = -w; f < w * 2; f += 8) {
      ctx.beginPath();
      ctx.moveTo(f, 0);
      ctx.lineTo(f + h * 0.8, h);
      ctx.stroke();
    }

    // Interventricular coronary sulcus groove
    ctx.strokeStyle = '#fda4af';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, 0);
    ctx.bezierCurveTo(w * 0.45, h * 0.4, w * 0.55, h * 0.7, w * 0.65, h);
    ctx.stroke();

    // Coronary artery branches (Scarlet red)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, 0);
    ctx.bezierCurveTo(w * 0.4, h * 0.3, w * 0.52, h * 0.65, w * 0.6, h);
    ctx.stroke();

    // Coronary vein branches (Royal blue)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.38, 0);
    ctx.bezierCurveTo(w * 0.48, h * 0.35, w * 0.58, h * 0.7, w * 0.68, h);
    ctx.stroke();
  });
}

function generateEyeTexture(): THREE.CanvasTexture {
  return createProceduralTexture(256, 256, (ctx, w, h) => {
    // Sclera white background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Outer limbus dark boundary
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(cx, cy, 92, 0, Math.PI * 2);
    ctx.fill();

    // Retinal pigmented iris ring
    const irisGrad = ctx.createRadialGradient(cx, cy, 32, cx, cy, 88);
    irisGrad.addColorStop(0, '#18181b');
    irisGrad.addColorStop(0.6, '#27272a');
    irisGrad.addColorStop(1, '#09090b');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 88, 0, Math.PI * 2);
    ctx.fill();

    // Radial melanocyte spokes
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 1.5;
    for (let a = 0; a < Math.PI * 2; a += 0.12) {
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 36, cy + Math.sin(a) * 36);
      ctx.lineTo(cx + Math.cos(a) * 85, cy + Math.sin(a) * 85);
      ctx.stroke();
    }

    // Jet black central pupil
    ctx.fillStyle = '#050505';
    ctx.beginPath();
    ctx.arc(cx, cy, 35, 0, Math.PI * 2);
    ctx.fill();

    // Specular corneal reflection glint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(cx - 20, cy - 20, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function generateBoneTexture(isOssification: boolean, isUSG: boolean): THREE.CanvasTexture {
  return createProceduralTexture(256, 256, (ctx, w, h) => {
    if (isUSG) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      for (let y = 0; y < h; y += 8) {
        ctx.fillRect(0, y, w, 2);
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

      // Osteon concentric rings
      ctx.strokeStyle = 'rgba(202, 138, 4, 0.35)';
      ctx.lineWidth = 1.5;
      for (let o = 0; o < 8; o++) {
        const ox = ((o % 3) + 0.5) * (w / 3);
        const oy = (Math.floor(o / 3) + 0.5) * (h / 3);
        for (let r = 6; r <= 24; r += 6) {
          ctx.beginPath();
          ctx.arc(ox, oy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      return;
    }

    // Cartilage / Pre-osseous matrix
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  });
}

export const EmbryoViewer: React.FC = () => {
  const { language, settings } = useLearning();

  // Selected Stage & Milestone state (start in full overview so camera is not zoomed into a specific organ)
  const [currentStageKey, setCurrentStageKey] = useState<GestationalStage>('w8');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('anatomy');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [audioHeartbeatEnabled, setAudioHeartbeatEnabled] = useState<boolean>(false);

  // Layer Visibility
  const [showSkin, setShowSkin] = useState<boolean>(true);
  const [skinOpacity, setSkinOpacity] = useState<number>(0.85);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [showCardio, setShowCardio] = useState<boolean>(true);
  const [showAmniotic, setShowAmniotic] = useState<boolean>(false);
  const [showHotspotMarkers, setShowHotspotMarkers] = useState<boolean>(false);
  const [showGridAxes, setShowGridAxes] = useState<boolean>(true);

  // Telemetry state
  const [fps, setFps] = useState<number>(60);
  const [drawCalls, setDrawCalls] = useState<number>(0);
  const [triangles, setTriangles] = useState<number>(0);

  // Derived cell / particle count based on stage and density setting
  const particleCount =
    currentStageKey === 'w1'
      ? Math.round(180 * ((settings.particleDensity || 100) / 100))
      : 0;

  // Doppler audio synthesis ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextBeatTimeRef = useRef<number>(0);

  // Three.js Mount & Scene Refs
  const mountRef = useRef<HTMLDivElement | null>(null);
  const ultrasoundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const helpersGroupRef = useRef<THREE.Group | null>(null);
  const heartMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const hotspotsGroupRef = useRef<THREE.Group | null>(null);
  const skeletonGroupRef = useRef<THREE.Group | null>(null);
  const cardioGroupRef = useRef<THREE.Group | null>(null);
  const skinMeshRef = useRef<THREE.Mesh | THREE.Group | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);

  // Camera Target Interpolation
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(...STAGES['w8'].cameraInit));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Dynamic references to prevent WebGL tearing down on settings change
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const showGridAxesRef = useRef(showGridAxes);
  useEffect(() => {
    showGridAxesRef.current = showGridAxes;
    if (helpersGroupRef.current) {
      helpersGroupRef.current.visible = showGridAxes;
    }
  }, [showGridAxes]);

  const currentStageKeyRef = useRef(currentStageKey);
  useEffect(() => {
    currentStageKeyRef.current = currentStageKey;
  }, [currentStageKey]);

  // Current stage data
  const currentStage = STAGES[currentStageKey];

  // Web Audio Heartbeat Synthesizer
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
      // Lub sound (S1) - lower frequency resonance
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.08);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      // Dub sound (S2) - slightly higher pitch, shorter interval
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(50, now + 0.18);
      gain2.gain.setValueAtTime(0.14, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.19);
    } catch {}
  }, [audioHeartbeatEnabled, settings.soundEffects]);

  const playHeartClickRef = useRef(playHeartClick);
  useEffect(() => {
    playHeartClickRef.current = playHeartClick;
  }, [playHeartClick]);

  // Stage Switch Handler (starts with whole embryo in view)
  const handleStageSelect = (stageKey: GestationalStage) => {
    setCurrentStageKey(stageKey);
    const targetStage = STAGES[stageKey];
    setSelectedMilestoneId(null);
    targetCamPos.current.set(...targetStage.cameraInit);
    targetLookAt.current.set(0, 0, 0);
  };

  // Milestone Click Handler (toggle selection / focus zoom)
  const handleMilestoneClick = (milestone: MilestoneDetail) => {
    if (selectedMilestoneId === milestone.id) {
      // Deselect and return camera to full view
      setSelectedMilestoneId(null);
      targetCamPos.current.set(...currentStage.cameraInit);
      targetLookAt.current.set(0, 0, 0);
    } else {
      setSelectedMilestoneId(milestone.id);
      targetCamPos.current.set(...milestone.cameraPos);
      targetLookAt.current.set(...milestone.focusPos);
    }
  };

  // Reset Camera View
  const handleResetCamera = () => {
    setSelectedMilestoneId(null);
    targetCamPos.current.set(...currentStage.cameraInit);
    targetLookAt.current.set(0, 0, 0);
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  // 1. Initialize Three.js WebGL/WebGPU Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 500;

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

    // Apply Graphics Quality Pixel Ratio
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff7ed, 1.8);
    dirLight1.position.set(6, 10, 8);
    scene.add(dirLight1);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xf43f5e, 1.2, 10);
    pointLight.position.set(0, 0.5, 2);
    scene.add(pointLight);

    // Root model group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Hotspot group attached inside modelGroup so it rotates identically with the embryo
    const hotspotsGroup = new THREE.Group();
    modelGroup.add(hotspotsGroup);
    hotspotsGroupRef.current = hotspotsGroup;

    // Helper Grid and Coordinate Axes Group
    const helpersGroup = new THREE.Group();
    helpersGroup.name = 'helpersGroup';
    helpersGroup.visible = showGridAxesRef.current;
    scene.add(helpersGroup);
    helpersGroupRef.current = helpersGroup;

    // Floor Grid Helper (12x12 units, 24 divisions) placed beneath the embryo at y = -2.2
    const gridFloor = new THREE.GridHelper(12, 24, 0x38bdf8, 0x1e293b);
    gridFloor.position.set(0, -2.2, 0);
    helpersGroup.add(gridFloor);

    // Subtle origin plane grid at y = 0
    const gridOrigin = new THREE.GridHelper(8, 16, 0x0284c7, 0x0f172a);
    gridOrigin.position.set(0, 0, 0);
    helpersGroup.add(gridOrigin);

    // 3D Coordinate Axes (length = 3.0 units) centered at origin (0, 0, 0)
    // Red: +X (Lateral/Right), Green: +Y (Cranial/Superior), Blue: +Z (Ventral/Anterior)
    const axesHelper = new THREE.AxesHelper(3.0);
    (axesHelper.material as THREE.Material).depthTest = false;
    axesHelper.renderOrder = 999;
    helpersGroup.add(axesHelper);

    // Visual tip spheres for the axes:
    // +X (Red sphere)
    const xTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xef4444, depthTest: false })
    );
    xTip.position.set(3.0, 0, 0);
    xTip.renderOrder = 999;
    helpersGroup.add(xTip);

    // +Y (Green sphere)
    const yTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x22c55e, depthTest: false })
    );
    yTip.position.set(0, 3.0, 0);
    yTip.renderOrder = 999;
    helpersGroup.add(yTip);

    // +Z (Blue sphere)
    const zTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, depthTest: false })
    );
    zTip.position.set(0, 0, 3.0);
    zTip.renderOrder = 999;
    helpersGroup.add(zTip);

    // Origin core marker (Yellow diamond at 0, 0, 0)
    const originCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.08),
      new THREE.MeshBasicMaterial({ color: 0xfacc15, wireframe: true, depthTest: false })
    );
    originCore.renderOrder = 999;
    helpersGroup.add(originCore);

    // Drag-to-rotate interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      targetCamPos.current.z = THREE.MathUtils.clamp(
        targetCamPos.current.z + e.deltaY * 0.006,
        3.5,
        14
      );
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Animation & Physics Loop
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

      // Apply Physics Speed Multiplier
      const speedMultiplier = settingsRef.current.physicsSpeed || 1.0;
      const delta = rawDelta * (isPlayingRef.current ? speedMultiplier : 0);
      totalElapsedTime += delta;

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.06);
        currentLookAt.current.lerp(targetLookAt.current, 0.06);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Default 3D Auto-Rotation when not dragging
      if (settingsRef.current.autoRotate3D !== false && !isDragging && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.25 * delta;
      }

      // Heart Pulsation Physics
      const stageKey = currentStageKeyRef.current;
      const bpm = STAGES[stageKey]?.heartRate || 0;
      if (bpm > 0 && isPlayingRef.current) {
        const beatFreq = (bpm / 60) * Math.PI * 2;
        const pulse = 1 + Math.sin(totalElapsedTime * beatFreq) * 0.12;

        if (heartMeshRef.current) {
          heartMeshRef.current.scale.set(pulse, pulse, pulse);
        }

        // Trigger Audio Heartbeat on systolic peak
        beatTimer += delta;
        const beatInterval = 60 / bpm;
        if (beatTimer >= beatInterval) {
          beatTimer %= beatInterval;
          if (playHeartClickRef.current) playHeartClickRef.current();
        }
      }

      // Render Scene
      renderer.render(scene, camera);

      // Extract telemetry info
      setDrawCalls(renderer.info.render.calls);
      setTriangles(renderer.info.render.triangles);
    };

    animate(0);

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const nw = container.clientWidth || 700;
      const nh = container.clientHeight || 500;
      if (nw === 0 || nh === 0) return;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = nw / nh;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(nw, nh);
        }
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
      texturesRef.current.forEach((t) => t.dispose());
      texturesRef.current = [];
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [settings.graphicsQuality]);

  // 2. Rebuild 3D Model Anatomy When Stage, View Mode, or Quality Changes
  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;

    // Clear previous stage meshes and textures, preserving hotspotsGroup
    while (group.children.length > 0) {
      const child = group.children[0];
      if (child === hotspotsGroupRef.current) {
        group.remove(child);
        continue;
      }
      if ((child as any).geometry) (child as any).geometry.dispose();
      if ((child as any).material) {
        if (Array.isArray((child as any).material)) {
          (child as any).material.forEach((m: any) => m.dispose());
        } else {
          (child as any).material.dispose();
        }
      }
      group.remove(child);
    }

    texturesRef.current.forEach((t) => t.dispose());
    texturesRef.current = [];

    // Material definitions based on View Mode
    const isUSG = viewMode === 'ultrasound';
    const isOssification = viewMode === 'ossification';

    // Procedural Textures
    const skinTexture = generateSkinTexture(currentStageKey, isUSG);
    const skinBumpTexture = generateSkinBumpTexture();
    const heartTexture = generateHeartTexture(isUSG);
    const eyeTexture = generateEyeTexture();
    const boneTexture = generateBoneTexture(isOssification, isUSG);

    texturesRef.current.push(skinTexture, skinBumpTexture, heartTexture, eyeTexture, boneTexture);

    // Skin / Ectoderm material - Solid standard material for crisp visibility
    const skinMat = new THREE.MeshStandardMaterial({
      map: skinTexture,
      bumpMap: skinBumpTexture,
      bumpScale: 0.02,
      color: isUSG ? 0x64748b : 0xfbcfe8,
      roughness: isUSG ? 0.85 : 0.4,
      metalness: 0.04,
      transparent: true,
      opacity: showSkin ? (isUSG ? 0.75 : skinOpacity) : 0,
      depthWrite: showSkin && (isUSG || skinOpacity > 0.35),
    });

    // Cartilage Material (Translucent cyan)
    const cartilageMat = new THREE.MeshStandardMaterial({
      color: isUSG ? 0x94a3b8 : 0x38bdf8,
      roughness: 0.4,
      transparent: true,
      opacity: showSkeleton ? 0.8 : 0,
    });

    // Bone / Ossification Material (Bright golden ivory / hyperechoic white)
    const boneMat = new THREE.MeshStandardMaterial({
      map: boneTexture,
      color: isUSG ? 0xffffff : isOssification ? 0xfef08a : 0xf8fafc,
      roughness: 0.3,
      emissive: isOssification ? 0xd97706 : isUSG ? 0xffffff : 0x000000,
      emissiveIntensity: isOssification ? 0.45 : isUSG ? 0.6 : 0,
      transparent: true,
      opacity: showSkeleton ? 0.96 : 0,
    });

    // Cardiac Blood / Heart Material
    const bloodMat = new THREE.MeshStandardMaterial({
      map: heartTexture,
      color: isUSG ? 0xef4444 : 0xe11d48,
      roughness: 0.3,
      emissive: 0x991b1b,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: showCardio ? 0.98 : 0,
    });

    // Umbilical Venous Material (Oxygenated bright red)
    const veinMat = new THREE.MeshStandardMaterial({
      color: isUSG ? 0x3b82f6 : 0xf43f5e,
      roughness: 0.3,
      transparent: true,
      opacity: showCardio ? 0.9 : 0,
    });

    // Sub-groups for layer toggling & strict render ordering
    const skeletonGroup = new THREE.Group();
    skeletonGroup.renderOrder = 1;
    const cardioGroup = new THREE.Group();
    cardioGroup.renderOrder = 2;

    skeletonGroupRef.current = skeletonGroup;
    cardioGroupRef.current = cardioGroup;
    group.add(skeletonGroup);
    group.add(cardioGroup);

    if (hotspotsGroupRef.current) {
      group.add(hotspotsGroupRef.current);
    }

    // Dynamic particle density multiplier (50%, 75%, 100%)
    const densityRatio = (settings.particleDensity || 100) / 100;

    // -------------------------------------------------------------
    // STAGE BUILDERS: High-Precision Developmental Morphogenesis
    // -------------------------------------------------------------

    if (currentStageKey === 'w1') {
      // -----------------------------------------------------------
      // WEEK 1: BLASTOCYST, TROPHOBLAST & EMBRYOBLAST
      // -----------------------------------------------------------
      const trophoGeo = new THREE.SphereGeometry(1.8, 32, 32);
      const trophoMat = new THREE.MeshStandardMaterial({
        map: skinTexture,
        color: isUSG ? 0x94a3b8 : 0xe0e7ff,
        opacity: showSkin ? 0.75 : 0,
        transparent: true,
        roughness: 0.3,
        depthWrite: true,
      });
      const trophoMesh = new THREE.Mesh(trophoGeo, trophoMat);
      group.add(trophoMesh);
      skinMeshRef.current = trophoMesh;

      // Dissolving Zona Pellucida ring
      const zpGeo = new THREE.TorusGeometry(2.0, 0.08, 16, 64);
      const zpMat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
      });
      const zpMesh = new THREE.Mesh(zpGeo, zpMat);
      zpMesh.rotation.x = Math.PI / 3;
      group.add(zpMesh);

      // Inner Cell Mass (Embryoblast) Cluster: Epiblast & Hypoblast
      const cellCount = Math.round(180 * densityRatio);
      const cellGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const epiMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
      const hypoMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });

      for (let i = 0; i < cellCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * (Math.PI / 2);
        const r = 0.6 * Math.cbrt(Math.random());
        const x = r * Math.sin(phi) * Math.cos(theta) - 0.5;
        const y = r * Math.sin(phi) * Math.sin(theta) + 0.6;
        const z = r * Math.cos(phi);

        const isEpiblast = y > 0.55;
        const cMesh = new THREE.Mesh(cellGeo, isEpiblast ? epiMat : hypoMat);
        cMesh.position.set(x, y, z);
        group.add(cMesh);
      }
    } else if (currentStageKey === 'w4') {
      // -----------------------------------------------------------
      // WEEK 4: C-SHAPED EMBRYO & BRANCHIAL ARCHES
      // -----------------------------------------------------------
      const cCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.4, 1.45, 0),
        new THREE.Vector3(0.95, 0.85, 0.15),
        new THREE.Vector3(0.85, 0.2, 0.25),
        new THREE.Vector3(0.35, -0.35, 0.25),
        new THREE.Vector3(-0.45, -0.85, 0.1),
        new THREE.Vector3(-0.9, -0.25, 0),
      ]);

      const bodyGeo = new THREE.TubeGeometry(cCurve, 64, 0.5, 24, false);
      const bodyMesh = new THREE.Mesh(bodyGeo, skinMat);
      bodyMesh.renderOrder = 4;
      group.add(bodyMesh);
      skinMeshRef.current = bodyMesh;

      // 28-32 Paraxial Somite Pairs flanking neural axis
      const somiteGeo = new THREE.BoxGeometry(0.12, 0.09, 0.12);
      const somiteMat = isUSG ? boneMat : new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.5 });
      const somitePoints = cCurve.getPoints(24);

      somitePoints.forEach((pt, idx) => {
        if (idx > 2 && idx < 22) {
          const s1 = new THREE.Mesh(somiteGeo, somiteMat);
          s1.position.set(pt.x - 0.22, pt.y, pt.z + 0.2);
          skeletonGroup.add(s1);

          const s2 = new THREE.Mesh(somiteGeo, somiteMat);
          s2.position.set(pt.x - 0.22, pt.y, pt.z - 0.2);
          skeletonGroup.add(s2);
        }
      });

      // Branchial Arches (1st, 2nd, 3rd Pharyngeal arches)
      const arch1Geo = new THREE.CylinderGeometry(0.16, 0.2, 0.42, 16);
      const arch1 = new THREE.Mesh(arch1Geo, skinMat);
      arch1.position.set(0.65, 0.65, 0.32);
      arch1.rotation.z = Math.PI / 4;
      arch1.renderOrder = 4;
      group.add(arch1);

      const arch2Geo = new THREE.CylinderGeometry(0.14, 0.16, 0.38, 16);
      const arch2 = new THREE.Mesh(arch2Geo, skinMat);
      arch2.position.set(0.48, 0.42, 0.32);
      arch2.rotation.z = Math.PI / 4;
      arch2.renderOrder = 4;
      group.add(arch2);

      // Primitive Cardiac Bulge (Beating Heart)
      const heartGeo = new THREE.SphereGeometry(0.36, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.32, 0.12, 0.35);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Optic placodes / early eye pits
      const eyePits = [-0.18, 0.18];
      eyePits.forEach((zOffset) => {
        const pit = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2 })
        );
        pit.position.set(0.85, 0.95, 0.15 + zOffset);
        group.add(pit);
      });

      // Bilateral Upper Limb Paddle Buds
      const armBudGeo = new THREE.SphereGeometry(0.2, 16, 16);
      armBudGeo.scale(1.3, 0.7, 0.6);
      const armBudR = new THREE.Mesh(armBudGeo, skinMat);
      armBudR.position.set(0.15, -0.22, 0.42);
      armBudR.renderOrder = 4;
      group.add(armBudR);

      const armBudL = new THREE.Mesh(armBudGeo, skinMat);
      armBudL.position.set(0.15, -0.22, -0.42);
      armBudL.renderOrder = 4;
      group.add(armBudL);

      // Bilateral Lower Limb Paddle Buds
      const legBudGeo = new THREE.SphereGeometry(0.16, 14, 14);
      legBudGeo.scale(1.2, 0.6, 0.6);
      const legBudR = new THREE.Mesh(legBudGeo, skinMat);
      legBudR.position.set(-0.35, -0.72, 0.25);
      legBudR.renderOrder = 4;
      group.add(legBudR);

      const legBudL = new THREE.Mesh(legBudGeo, skinMat);
      legBudL.position.set(-0.35, -0.72, -0.25);
      legBudL.renderOrder = 4;
      group.add(legBudL);
    } else if (currentStageKey === 'w8') {
      // -----------------------------------------------------------
      // WEEK 8: ORGANOGENESIS & DIGITAL RAY APOPTOSIS
      // -----------------------------------------------------------
      // Perfectly centered within the viewport: Head top at y = 1.95, toes at y = -1.25
      const embryoCenter = new THREE.Group();
      embryoCenter.position.set(0, 0.1, 0);

      // Large Embryonic Head (48% of CRL)
      const headGeo = new THREE.SphereGeometry(1.15, 32, 32);
      headGeo.scale(1.0, 1.1, 1.05);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headMesh.position.set(0, 0.85, 0);
      headMesh.renderOrder = 4;
      embryoCenter.add(headMesh);
      skinMeshRef.current = headMesh;

      // Embryonic Torso with curved spinal contour
      const torsoGeo = new THREE.CylinderGeometry(0.72, 0.95, 1.5, 32);
      const torsoMesh = new THREE.Mesh(torsoGeo, skinMat);
      torsoMesh.position.set(0, -0.05, 0);
      torsoMesh.renderOrder = 4;
      embryoCenter.add(torsoMesh);

      // Bilateral Eyes: Fronto-lateral surface with retinal iris disc, pupil, and corneal dome
      const createEye = (isLeft: boolean) => {
        const eyeGroup = new THREE.Group();
        const xPos = isLeft ? 0.64 : -0.64;
        eyeGroup.position.set(xPos, 0.9, 0.96);

        // Angle eye naturally outward along the craniofacial curve
        eyeGroup.rotation.y = isLeft ? 0.55 : -0.55;
        eyeGroup.rotation.x = -0.08;

        // White sclera base
        const sclera = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 20, 20),
          new THREE.MeshStandardMaterial({
            color: isUSG ? 0x94a3b8 : 0xf8fafc,
            roughness: 0.25,
          })
        );
        sclera.scale.set(1.0, 1.0, 0.4);
        eyeGroup.add(sclera);

        // Retinal Pigmented Iris Disk with textured melanin
        const irisMesh = new THREE.Mesh(
          new THREE.CircleGeometry(0.16, 24),
          new THREE.MeshStandardMaterial({
            map: eyeTexture,
            color: isUSG ? 0x334155 : 0xffffff,
            roughness: 0.2,
          })
        );
        irisMesh.position.set(0, 0, 0.085);
        eyeGroup.add(irisMesh);

        // Transparent Corneal Lens Dome
        const cornea = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.1,
            transparent: true,
            opacity: 0.65,
          })
        );
        cornea.position.set(0, 0, 0.08);
        cornea.rotation.x = Math.PI / 2;
        eyeGroup.add(cornea);

        return eyeGroup;
      };

      embryoCenter.add(createEye(true));
      embryoCenter.add(createEye(false));

      // Facial Landmarks: Nasal prominence & nostrils
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skinMat);
      nose.scale.set(1.2, 0.8, 1.0);
      nose.position.set(0, 0.72, 1.05);
      nose.renderOrder = 4;
      embryoCenter.add(nose);

      // Auricular hillocks of His (Primitive external ears)
      const earGeo = new THREE.SphereGeometry(0.15, 14, 14);
      earGeo.scale(0.5, 1.3, 0.9);
      const earL = new THREE.Mesh(earGeo, skinMat);
      earL.position.set(1.12, 0.82, 0.05);
      earL.renderOrder = 4;
      embryoCenter.add(earL);

      const earR = new THREE.Mesh(earGeo, skinMat);
      earR.position.set(-1.12, 0.82, 0.05);
      earR.renderOrder = 4;
      embryoCenter.add(earR);

      // 4-Chamber Embryonic Heart (mid-thoracic, anatomically seated)
      const heartComplex = new THREE.Group();
      heartComplex.position.set(0.12, 0.08, 0.42);

      const ventricleGeo = new THREE.SphereGeometry(0.28, 24, 24);
      ventricleGeo.scale(1.1, 1.3, 1.0);
      const ventricles = new THREE.Mesh(ventricleGeo, bloodMat);
      heartComplex.add(ventricles);

      const aortaGeo = new THREE.TorusGeometry(0.18, 0.06, 12, 24, Math.PI);
      const aorta = new THREE.Mesh(aortaGeo, bloodMat);
      aorta.position.set(-0.05, 0.28, 0);
      aorta.rotation.z = -Math.PI / 4;
      heartComplex.add(aorta);

      cardioGroup.add(heartComplex);
      heartMeshRef.current = ventricles;

      // Physiological Umbilical Hernia (Midgut loops in proximal umbilical cord)
      const herniaGeo = new THREE.SphereGeometry(0.36, 20, 20);
      herniaGeo.scale(1.1, 0.9, 0.9);
      const herniaMat = new THREE.MeshStandardMaterial({
        color: isUSG ? 0x94a3b8 : 0xf472b6,
        roughness: 0.35,
      });
      const herniaMesh = new THREE.Mesh(herniaGeo, herniaMat);
      herniaMesh.position.set(0.0, -0.42, 0.7);
      herniaMesh.renderOrder = 4;
      embryoCenter.add(herniaMesh);

      // Both Upper Limbs with individual apoptotic separated fingers
      const createHand = (isLeft: boolean) => {
        const arm = new THREE.Group();
        arm.position.set(isLeft ? 0.72 : -0.72, 0.05, 0.35);

        // Humerus
        const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.095, 0.48, 14), skinMat);
        upperArm.rotation.z = isLeft ? -0.45 : 0.45;
        upperArm.renderOrder = 4;
        arm.add(upperArm);

        // Forearm flexed at elbow
        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.42, 14), skinMat);
        forearm.position.set(isLeft ? 0.15 : -0.15, -0.32, 0.12);
        forearm.rotation.x = 0.4;
        forearm.rotation.z = isLeft ? 0.3 : -0.3;
        forearm.renderOrder = 4;
        arm.add(forearm);

        // Hand plate with 5 distinct fingers
        const handGroup = new THREE.Group();
        handGroup.position.set(isLeft ? 0.22 : -0.22, -0.46, 0.22);
        const palm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.16), skinMat);
        palm.renderOrder = 4;
        handGroup.add(palm);

        for (let f = 0; f < 5; f++) {
          const fingerGeo = new THREE.CylinderGeometry(0.024, 0.032, 0.22, 10);
          const finger = new THREE.Mesh(fingerGeo, skinMat);
          const angle = (f - 2) * 0.26;
          finger.position.set(Math.sin(angle) * 0.14, -0.06, Math.cos(angle) * 0.12);
          finger.rotation.z = angle + (isLeft ? 0.1 : -0.1);
          finger.renderOrder = 4;
          handGroup.add(finger);
        }
        arm.add(handGroup);
        return arm;
      };

      embryoCenter.add(createHand(true));
      embryoCenter.add(createHand(false));

      // Both Lower Limbs (Left and Right with 5 toes)
      const createFoot = (isLeft: boolean) => {
        const leg = new THREE.Group();
        leg.position.set(isLeft ? 0.48 : -0.48, -0.75, 0.22);

        // Thigh
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.52, 14), skinMat);
        thigh.rotation.x = 0.55;
        thigh.rotation.z = isLeft ? 0.15 : -0.15;
        thigh.renderOrder = 4;
        leg.add(thigh);

        // Knee and lower leg
        const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.085, 0.45, 14), skinMat);
        lowerLeg.position.set(0, -0.25, 0.25);
        lowerLeg.rotation.x = -0.2;
        lowerLeg.renderOrder = 4;
        leg.add(lowerLeg);

        // Foot plate with 5 distinct toes
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.28), skinMat);
        foot.position.set(0, -0.48, 0.32);
        foot.renderOrder = 4;
        leg.add(foot);

        return leg;
      };

      embryoCenter.add(createFoot(true));
      embryoCenter.add(createFoot(false));

      // Sclerotome cartilage vertebrae
      for (let v = 0; v < 16; v++) {
        const vGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.07, 16);
        const vMesh = new THREE.Mesh(vGeo, cartilageMat);
        vMesh.position.set(0, 0.5 - v * 0.09, -0.38);
        skeletonGroup.add(vMesh);
      }

      group.add(embryoCenter);
    } else if (currentStageKey === 'w12') {
      // -----------------------------------------------------------
      // WEEK 12: PRIMARY OSSIFICATION & HERNIA REDUCTION
      // -----------------------------------------------------------
      const fetusGroup = new THREE.Group();
      fetusGroup.position.set(0, 0.0, 0);

      // Proportionate Fetal Head
      const headGeo = new THREE.SphereGeometry(1.3, 32, 32);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headMesh.position.set(0, 1.15, 0);
      headMesh.renderOrder = 4;
      fetusGroup.add(headMesh);
      skinMeshRef.current = headMesh;

      // Closed Eyelids
      const createEyelids = (isLeft: boolean) => {
        const lidGeo = new THREE.SphereGeometry(0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const lid = new THREE.Mesh(lidGeo, skinMat);
        lid.scale.set(1.0, 0.6, 0.5);
        lid.position.set(isLeft ? 0.6 : -0.6, 1.18, 0.95);
        lid.rotation.x = Math.PI / 2;
        lid.rotation.y = isLeft ? 0.3 : -0.3;
        lid.renderOrder = 4;
        return lid;
      };
      fetusGroup.add(createEyelids(true));
      fetusGroup.add(createEyelids(false));

      // Formed Nose & Lips
      const nose12 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.18), skinMat);
      nose12.position.set(0, 1.05, 1.15);
      nose12.renderOrder = 4;
      fetusGroup.add(nose12);

      const mouth12 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.1), skinMat);
      mouth12.position.set(0, 0.88, 1.1);
      mouth12.renderOrder = 4;
      fetusGroup.add(mouth12);

      // Formed Ears
      const ear12Geo = new THREE.SphereGeometry(0.18, 14, 14);
      ear12Geo.scale(0.4, 1.2, 0.8);
      const ear12L = new THREE.Mesh(ear12Geo, skinMat);
      ear12L.position.set(1.22, 1.12, 0.02);
      ear12L.renderOrder = 4;
      fetusGroup.add(ear12L);

      const ear12R = new THREE.Mesh(ear12Geo, skinMat);
      ear12R.position.set(-1.22, 1.12, 0.02);
      ear12R.renderOrder = 4;
      fetusGroup.add(ear12R);

      // Torso
      const torsoGeo = new THREE.CylinderGeometry(0.85, 0.98, 1.8, 32);
      const torsoMesh = new THREE.Mesh(torsoGeo, skinMat);
      torsoMesh.position.set(0, -0.15, 0);
      torsoMesh.renderOrder = 4;
      fetusGroup.add(torsoMesh);

      // Bilateral Upper Limbs (Both Left and Right arms with articulated hands)
      const createArm12 = (isLeft: boolean) => {
        const arm = new THREE.Group();
        arm.position.set(isLeft ? 0.8 : -0.8, 0.25, 0.2);

        // Upper arm
        const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.65, 14), skinMat);
        upper.rotation.z = isLeft ? -0.5 : 0.5;
        upper.renderOrder = 4;
        arm.add(upper);

        // Forearm flexed
        const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.08, 0.55, 14), skinMat);
        fore.position.set(isLeft ? 0.2 : -0.2, -0.4, 0.18);
        fore.rotation.x = 0.4;
        fore.renderOrder = 4;
        arm.add(fore);

        // Hand plate
        const hand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.22), skinMat);
        hand.position.set(isLeft ? 0.24 : -0.24, -0.65, 0.3);
        hand.renderOrder = 4;
        arm.add(hand);

        return arm;
      };
      fetusGroup.add(createArm12(true));
      fetusGroup.add(createArm12(false));

      // Bilateral Lower Limbs (Both Left and Right legs with feet)
      const createLeg12 = (isLeft: boolean) => {
        const leg = new THREE.Group();
        leg.position.set(isLeft ? 0.5 : -0.5, -0.95, 0.18);

        // Thigh
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.72, 14), skinMat);
        thigh.rotation.x = 0.45;
        thigh.rotation.z = isLeft ? 0.15 : -0.15;
        thigh.renderOrder = 4;
        leg.add(thigh);

        // Lower leg
        const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.6, 14), skinMat);
        lower.position.set(0, -0.32, 0.3);
        lower.renderOrder = 4;
        leg.add(lower);

        // Foot
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.32), skinMat);
        foot.position.set(0, -0.62, 0.4);
        foot.renderOrder = 4;
        leg.add(foot);

        return leg;
      };
      fetusGroup.add(createLeg12(true));
      fetusGroup.add(createLeg12(false));

      // Primary Skeletal Ossification Centers
      // Cranial Calvarial Bones (Frontal, Parietal, Occipital)
      const skullBoneGeo = new THREE.TorusGeometry(1.22, 0.06, 16, 32);
      const skullBone = new THREE.Mesh(skullBoneGeo, boneMat);
      skullBone.position.set(0, 1.15, 0);
      skullBone.rotation.x = Math.PI / 2;
      skeletonGroup.add(skullBone);

      // Ossified Rib Cage (12 pairs)
      for (let r = 0; r < 11; r++) {
        const ribGeo = new THREE.TorusGeometry(0.8 - r * 0.02, 0.04, 12, 24, Math.PI * 1.4);
        const rib = new THREE.Mesh(ribGeo, boneMat);
        rib.position.set(0, 0.4 - r * 0.12, 0.08);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.z = Math.PI * 0.3;
        skeletonGroup.add(rib);
      }

      // Bilateral Ossified Long Bones: Diaphyses of Femurs & Humeri
      const boneSides = [1, -1];
      boneSides.forEach((side) => {
        const femur = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.65, 14), boneMat);
        femur.position.set(side * 0.5, -1.05, 0.3);
        femur.rotation.x = 0.45;
        femur.rotation.z = side * 0.15;
        skeletonGroup.add(femur);

        const humerus = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.55, 14), boneMat);
        humerus.position.set(side * 0.8, 0.25, 0.2);
        humerus.rotation.z = side * -0.5;
        skeletonGroup.add(humerus);
      });

      // 4-Chamber Heart & Great Vessels
      const heartGeo = new THREE.SphereGeometry(0.4, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.12, 0.2, 0.46);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      group.add(fetusGroup);
    } else if (currentStageKey === 'w20') {
      // -----------------------------------------------------------
      // WEEK 20: 2ND TRIMESTER ANATOMY SCAN & VERNIX/LANUGO
      // -----------------------------------------------------------
      const fetusGroup = new THREE.Group();
      fetusGroup.position.set(0, 0, 0);

      // Fully Formed Fetal Head
      const headGeo = new THREE.SphereGeometry(1.35, 32, 32);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headMesh.position.set(0, 1.25, 0);
      headMesh.renderOrder = 4;
      fetusGroup.add(headMesh);
      skinMeshRef.current = headMesh;

      // Eyelids & Facial Profile
      const browL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.12), skinMat);
      browL.position.set(0.52, 1.38, 0.95);
      browL.rotation.z = -0.15;
      browL.renderOrder = 4;
      fetusGroup.add(browL);

      const browR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.12), skinMat);
      browR.position.set(-0.52, 1.38, 0.95);
      browR.rotation.z = 0.15;
      browR.renderOrder = 4;
      fetusGroup.add(browR);

      const nose20 = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.26, 16), skinMat);
      nose20.position.set(0, 1.18, 1.22);
      nose20.rotation.x = Math.PI / 2;
      nose20.renderOrder = 4;
      fetusGroup.add(nose20);

      const lips20 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.12), skinMat);
      lips20.position.set(0, 0.98, 1.18);
      lips20.renderOrder = 4;
      fetusGroup.add(lips20);

      const chin20 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), skinMat);
      chin20.position.set(0, 0.82, 1.12);
      chin20.renderOrder = 4;
      fetusGroup.add(chin20);

      // Ears
      const ear20Geo = new THREE.SphereGeometry(0.2, 16, 16);
      ear20Geo.scale(0.4, 1.2, 0.8);
      const ear20L = new THREE.Mesh(ear20Geo, skinMat);
      ear20L.position.set(1.25, 1.2, 0.05);
      ear20L.renderOrder = 4;
      fetusGroup.add(ear20L);

      const ear20R = new THREE.Mesh(ear20Geo, skinMat);
      ear20R.position.set(-1.25, 1.2, 0.05);
      ear20R.renderOrder = 4;
      fetusGroup.add(ear20R);

      // Torso
      const bodyGeo = new THREE.CylinderGeometry(0.95, 1.1, 2.1, 32);
      const bodyMesh = new THREE.Mesh(bodyGeo, skinMat);
      bodyMesh.position.set(0, -0.1, 0);
      bodyMesh.renderOrder = 4;
      fetusGroup.add(bodyMesh);

      // Vertebral Column with spinous processes
      for (let v = 0; v < 22; v++) {
        const vGeo = new THREE.BoxGeometry(0.32, 0.08, 0.28);
        const vMesh = new THREE.Mesh(vGeo, boneMat);
        vMesh.position.set(0, 0.7 - v * 0.1, -0.65);
        skeletonGroup.add(vMesh);
      }

      // Rib Cage & Iliac Pelvic Bones
      for (let r = 0; r < 12; r++) {
        const ribGeo = new THREE.TorusGeometry(0.9 - r * 0.02, 0.045, 12, 24, Math.PI * 1.5);
        const rib = new THREE.Mesh(ribGeo, boneMat);
        rib.position.set(0, 0.55 - r * 0.11, 0.08);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.z = Math.PI * 0.25;
        skeletonGroup.add(rib);
      }

      const pelvisGeo = new THREE.TorusGeometry(0.72, 0.11, 16, 24);
      const pelvis = new THREE.Mesh(pelvisGeo, boneMat);
      pelvis.position.set(0, -0.85, 0);
      pelvis.rotation.x = Math.PI / 2;
      skeletonGroup.add(pelvis);

      // 4-Chamber Heart with Foramen Ovale & Great Vessels
      const heartGeo = new THREE.SphereGeometry(0.46, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.1, 0.22, 0.5);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Both Upper Limbs (Bilateral flexed in active sucking reflex posture)
      const createArm20 = (isLeft: boolean) => {
        const arm = new THREE.Group();
        arm.position.set(isLeft ? 0.85 : -0.85, 0.35, 0.25);

        // Upper arm
        const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.7, 16), skinMat);
        upper.rotation.z = isLeft ? -0.65 : 0.65;
        upper.rotation.x = 0.35;
        upper.renderOrder = 4;
        arm.add(upper);

        // Forearm flexed upwards toward face
        const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.6, 16), skinMat);
        fore.position.set(isLeft ? -0.25 : 0.25, 0.18, 0.42);
        fore.rotation.x = 0.8;
        fore.rotation.z = isLeft ? 0.4 : -0.4;
        fore.renderOrder = 4;
        arm.add(fore);

        // Hand near chin / mouth
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 14), skinMat);
        hand.scale.set(1.2, 0.8, 1.4);
        hand.position.set(isLeft ? -0.38 : 0.38, 0.42, 0.65);
        hand.renderOrder = 4;
        arm.add(hand);

        return arm;
      };
      fetusGroup.add(createArm20(true));
      fetusGroup.add(createArm20(false));

      // Both Lower Limbs (Bilateral thighs flexed against lower abdomen)
      const createLeg20 = (isLeft: boolean) => {
        const leg = new THREE.Group();
        leg.position.set(isLeft ? 0.52 : -0.52, -0.88, 0.22);

        // Thigh
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.15, 0.85, 16), skinMat);
        thigh.rotation.x = 0.75;
        thigh.rotation.z = isLeft ? 0.2 : -0.2;
        thigh.renderOrder = 4;
        leg.add(thigh);

        // Lower leg
        const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 0.75, 16), skinMat);
        lower.position.set(0, -0.22, 0.48);
        lower.rotation.x = -0.3;
        lower.renderOrder = 4;
        leg.add(lower);

        // Foot
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.4), skinMat);
        foot.position.set(0, -0.55, 0.65);
        foot.renderOrder = 4;
        leg.add(foot);

        return leg;
      };
      fetusGroup.add(createLeg20(true));
      fetusGroup.add(createLeg20(false));

      group.add(fetusGroup);
    } else if (currentStageKey === 'w36') {
      // -----------------------------------------------------------
      // WEEK 36+: FULL-TERM VERTEX PRESENTATION
      // -----------------------------------------------------------
      const fullTermGroup = new THREE.Group();
      fullTermGroup.position.set(0, 0, 0);

      // Cephalic presentation: Head engaged downwards toward cervix
      const headGeo = new THREE.SphereGeometry(1.5, 32, 32);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headMesh.position.set(0, -0.85, 0.15);
      headMesh.renderOrder = 4;
      fullTermGroup.add(headMesh);
      skinMeshRef.current = headMesh;

      // Diamond Anterior Fontanelle & Cranial Sutures
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.8), boneMat);
      s1.position.set(0, -0.85, 1.55);
      skeletonGroup.add(s1);

      const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.12), boneMat);
      s2.position.set(0, -0.85, 1.55);
      skeletonGroup.add(s2);

      // Facial Features (Head down)
      const eye36L = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), skinMat);
      eye36L.position.set(0.52, -1.02, 0.92);
      eye36L.rotation.x = Math.PI / 2;
      eye36L.renderOrder = 4;
      fullTermGroup.add(eye36L);

      const eye36R = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), skinMat);
      eye36R.position.set(-0.52, -1.02, 0.92);
      eye36R.rotation.x = Math.PI / 2;
      eye36R.renderOrder = 4;
      fullTermGroup.add(eye36R);

      const nose36 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), skinMat);
      nose36.position.set(0, -1.18, 1.15);
      nose36.renderOrder = 4;
      fullTermGroup.add(nose36);

      const ear36Geo = new THREE.SphereGeometry(0.24, 16, 16);
      ear36Geo.scale(0.4, 1.2, 0.8);
      const ear36L = new THREE.Mesh(ear36Geo, skinMat);
      ear36L.position.set(1.35, -0.82, 0.12);
      ear36L.renderOrder = 4;
      fullTermGroup.add(ear36L);

      const ear36R = new THREE.Mesh(ear36Geo, skinMat);
      ear36R.position.set(-1.35, -0.82, 0.12);
      ear36R.renderOrder = 4;
      fullTermGroup.add(ear36R);

      // Plump Torso with Subcutaneous Adipose Tissue
      const bodyGeo = new THREE.CylinderGeometry(1.25, 1.4, 2.3, 32);
      const bodyMesh = new THREE.Mesh(bodyGeo, skinMat);
      bodyMesh.position.set(0, 0.5, 0);
      bodyMesh.renderOrder = 4;
      fullTermGroup.add(bodyMesh);

      // Both Upper Limbs (Crossed over chest)
      const createArm36 = (isLeft: boolean) => {
        const arm = new THREE.Group();
        arm.position.set(isLeft ? 1.0 : -1.0, 0.85, 0.3);

        const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.8, 16), skinMat);
        upper.rotation.z = isLeft ? -0.8 : 0.8;
        upper.renderOrder = 4;
        arm.add(upper);

        const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.75, 16), skinMat);
        fore.position.set(isLeft ? -0.35 : 0.35, -0.25, 0.4);
        fore.rotation.z = isLeft ? 0.9 : -0.9;
        fore.rotation.x = 0.4;
        fore.renderOrder = 4;
        arm.add(fore);

        return arm;
      };
      fullTermGroup.add(createArm36(true));
      fullTermGroup.add(createArm36(false));

      // Both Lower Limbs (Flexed tightly in intrauterine vertex presentation)
      const createLeg36 = (isLeft: boolean) => {
        const leg = new THREE.Group();
        leg.position.set(isLeft ? 0.7 : -0.7, 1.35, 0.2);

        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.9, 16), skinMat);
        thigh.rotation.x = 0.9;
        thigh.rotation.z = isLeft ? 0.25 : -0.25;
        thigh.renderOrder = 4;
        leg.add(thigh);

        const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.15, 0.85, 16), skinMat);
        lower.position.set(0, 0.15, 0.65);
        lower.rotation.x = -0.4;
        lower.renderOrder = 4;
        leg.add(lower);

        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.45), skinMat);
        foot.position.set(0, 0.35, 0.9);
        foot.renderOrder = 4;
        leg.add(foot);

        return leg;
      };
      fullTermGroup.add(createLeg36(true));
      fullTermGroup.add(createLeg36(false));

      // 4-Chamber Heart
      const heartGeo = new THREE.SphereGeometry(0.52, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, bloodMat);
      heartMesh.position.set(0.15, 0.45, 0.85);
      cardioGroup.add(heartMesh);
      heartMeshRef.current = heartMesh;

      // Helical Umbilical Cord (2 arteries, 1 vein) with Wharton's Jelly
      const cordCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.1, 0.05, 1.1),
        new THREE.Vector3(0.5, 0.35, 1.7),
        new THREE.Vector3(0.2, 0.75, 2.3),
        new THREE.Vector3(-0.4, 1.15, 2.7),
      ]);
      const cordGeo = new THREE.TubeGeometry(cordCurve, 32, 0.18, 16, false);
      const cordMat = new THREE.MeshStandardMaterial({
        color: isUSG ? 0x64748b : 0x38bdf8,
        opacity: 0.85,
        transparent: true,
        roughness: 0.3,
      });
      const cordMesh = new THREE.Mesh(cordGeo, cordMat);
      cordMesh.renderOrder = 3;
      cardioGroup.add(cordMesh);

      group.add(fullTermGroup);
    }

    // -------------------------------------------------------------
    // Hotspot Markers in 3D Space
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
          hGroup.add(markerMesh);

          // Pulsing halo ring for selected milestone
          if (isSelected) {
            const ringGeo = new THREE.RingGeometry(0.18, 0.24, 32);
            const ringMat = new THREE.MeshBasicMaterial({
              color: 0x38bdf8,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.8,
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.position.set(...m.focusPos);
            hGroup.add(ringMesh);
          }
        });
      }
    }
  }, [
    currentStageKey,
    currentStage.milestones,
    viewMode,
    showSkin,
    skinOpacity,
    showSkeleton,
    showCardio,
    showHotspotMarkers,
    selectedMilestoneId,
    settings.particleDensity,
  ]);

  // 3. Real-Time Pulsed Doppler Spectral Waveform Canvas
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
      for (let y = 10; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Zero baseline
      const baselineY = h - 25;
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(w, baselineY);
      ctx.stroke();

      if (bpm === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.fillText('NO PULSATILE DOPPLER FLOW (DIFFUSION PHASE)', 15, h / 2);
        return;
      }

      // Waveform trace
      offset += (bpm / 60) * 2.2 * (settings.physicsSpeed || 1.0);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const t = (x + offset) * 0.04;
        const cycle = t % (Math.PI * 2);

        // Cardiac systole peak + dicrotic notch
        let val = 0;
        if (cycle < Math.PI * 0.6) {
          val = Math.sin(cycle / 0.6 * Math.PI) * 45;
        } else if (cycle < Math.PI * 1.2) {
          val = Math.sin((cycle - Math.PI * 0.6) / 0.6 * Math.PI) * 18;
        } else {
          val = 6 + Math.sin(cycle) * 2; // End-diastolic flow
        }

        const y = baselineY - val;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Clinical Doppler Metrics overlay
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px monospace';
      ctx.fillText(`PSV: ${(bpm * 0.32).toFixed(1)} cm/s | EDV: ${(bpm * 0.08).toFixed(1)} cm/s | RI: 0.74`, 10, 16);
    };

    renderWaveform();

    return () => cancelAnimationFrame(animId);
  }, [viewMode, currentStage.heartRate, settings.physicsSpeed]);

  const selectedMilestone = useMemo(() => {
    return currentStage.milestones.find((m) => m.id === selectedMilestoneId) || currentStage.milestones[0];
  }, [currentStage, selectedMilestoneId]);

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Top Header & Epoch Selector */}
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
      </div>

      {/* Main 3D Viewport & Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* 3D Canvas Viewport (8 Cols) */}
        <div className="lg:col-span-8 relative bg-slate-950 flex flex-col justify-between overflow-hidden">
          {/* Real-time Telemetry HUD (controlled by settings.showFpsOverlay) */}
          <TelemetryHUD
            fps={fps}
            drawCalls={drawCalls}
            triangles={triangles}
            particleCount={particleCount}
          />

          {/* Top-Left Biometric Overlay HUD */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none font-mono text-[11px] bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-800 rounded-xl p-3 space-y-1">
            <div className="text-xs text-rose-400 font-bold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{currentStage.heartRateLabel}</span>
            </div>
            <div className="text-slate-400">
              CRL (Crown-Rump Length): <span className="text-white font-bold">{currentStage.crl}</span>
            </div>
            <div className="text-slate-400">
              Estimated Mass: <span className="text-white font-bold">{currentStage.weight}</span>
            </div>
          </div>

          {/* Top-Right 3D Space Reference HUD */}
          {showGridAxes && (
            <div className="absolute top-3 right-3 z-20 pointer-events-none font-mono text-[10px] bg-slate-950/85 backdrop-blur-md text-slate-300 border border-slate-800 rounded-xl p-2.5 space-y-1.5 shadow-xl max-w-[210px]">
              <div className="text-[11px] font-bold text-sky-400 flex items-center gap-1.5 border-b border-slate-800/80 pb-1">
                <Grid className="w-3.5 h-3.5 text-sky-400" />
                <span>{language === 'en' ? '3D Space Reference' : 'Referensi Ruang 3D'}</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block shrink-0" />
                  <span>+X: {language === 'en' ? 'Lateral / Right (±3.0)' : 'Lateral / Kanan (±3.0)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                  <span>+Y: {language === 'en' ? 'Cranial / Superior' : 'Kranial / Superior'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500 inline-block shrink-0" />
                  <span>+Z: {language === 'en' ? 'Ventral / Anterior' : 'Ventral / Anterior'}</span>
                </div>
              </div>
              <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                <span>Origin (0, 0, 0)</span>
                <span>Floor y = -2.2</span>
              </div>
            </div>
          )}

          {/* WebGL Canvas Container */}
          <div ref={mountRef} className="w-full min-h-[460px] h-[460px] sm:h-[500px] lg:h-full cursor-grab active:cursor-grabbing" />

          {/* Ultrasound Real-Time Spectral Waveform Dock */}
          {viewMode === 'ultrasound' && (
            <div className="absolute bottom-16 left-3 right-3 z-20 bg-slate-950/90 border border-slate-800 rounded-xl p-2 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
                <span className="flex items-center gap-1 text-sky-400 font-bold">
                  <Activity className="w-3 h-3" /> Pulsed Spectral Doppler Waveform
                </span>
                <span>Sweep: {(currentStage.heartRate > 0 ? (60 / currentStage.heartRate).toFixed(2) : 0)}s / beat</span>
              </div>
              <canvas ref={ultrasoundCanvasRef} width={500} height={70} className="w-full h-[70px] rounded bg-slate-950" />
            </div>
          )}

          {/* Bottom Floating Controls Toolbar */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleResetCamera}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                title="Reset Camera Orientation"
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
                  title={language === 'en' ? 'Toggle Audio Doppler Heartbeat' : 'Nyalakan Detak Jantung Audio Doppler'}
                >
                  {audioHeartbeatEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{currentStage.heartRate} BPM</span>
                </button>
              )}
            </div>

            {/* Layer Visibility Toggles */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSkin(!showSkin)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showSkin ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Skin
              </button>
              <button
                onClick={() => setShowSkeleton(!showSkeleton)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showSkeleton ? 'bg-sky-950/60 text-sky-300 border border-sky-800' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Skeleton
              </button>
              <button
                onClick={() => setShowCardio(!showCardio)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showCardio ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Cardio
              </button>
              <button
                onClick={() => setShowHotspotMarkers(!showHotspotMarkers)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  showHotspotMarkers ? 'bg-amber-950/60 text-amber-300 border border-amber-800' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Toggle 3D Hotspot Markers"
              >
                Hotspots
              </button>
              <button
                onClick={() => setShowGridAxes(!showGridAxes)}
                className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
                  showGridAxes ? 'bg-sky-950/60 text-sky-300 border border-sky-800' : 'text-slate-500 hover:text-slate-300'
                }`}
                title={language === 'en' ? 'Toggle 3D Reference Grid & Coordinate Axes' : 'Tampilkan Grid & Sumbu Koordinat 3D'}
              >
                <Grid className="w-3 h-3" />
                <span>{language === 'en' ? 'Grid & Axes' : 'Grid & Sumbu'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Anatomy Inspector (4 Cols) */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <span>{language === 'en' ? 'Developmental Milestones' : 'Tonggak Perkembangan'}</span>
              <span className="text-rose-500 font-bold">{currentStage.milestones.length} key sites</span>
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
