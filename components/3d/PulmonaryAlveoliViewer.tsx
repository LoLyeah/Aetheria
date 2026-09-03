'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import {
  Activity,
  RotateCcw,
  Sliders,
  Eye,
  Crosshair,
  Grid,
  ShieldAlert,
  ChevronRight,
  Info,
  Maximize2,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  X,
} from 'lucide-react';

export type PulmonaryCondition = 'normal' | 'cap' | 'hap_vap' | 'tuberculosis' | 'covid_ards';

interface ConditionData {
  key: PulmonaryCondition;
  title: { en: string; id: string };
  pathogen: string;
  pathologySummary: { en: string; id: string };
  histologyHallmark: { en: string; id: string };
  idsaGuideline: { en: string; id: string };
  defaultExudate: number; // 0 to 100
  defaultVq: number; // 0.1 to 1.5
  accentColor: string;
}

export const CONDITIONS: Record<PulmonaryCondition, ConditionData> = {
  normal: {
    key: 'normal',
    title: {
      en: 'Healthy Aerated Alveolus',
      id: 'Alveolus Sehat Berventilasi',
    },
    pathogen: 'Physiological Baseline',
    pathologySummary: {
      en: 'Patent alveolar sacs lined with thin Type I pneumocytes for gas diffusion (0.2–0.5 µm barrier) and surfactant-secreting Type II pneumocytes. Active gas exchange with optimal V/Q matching (~0.8).',
      id: 'Sakus alveolaris berongga dilapisi pneumosit Tipe I tipis untuk difusi gas (sawar 0.2–0.5 µm) dan pneumosit Tipe II penghasil surfaktan. Pertukaran gas optimal dengan kecocokan V/Q ideal (~0.8).',
    },
    histologyHallmark: {
      en: 'Delicate alveolar septa, surfactant monolayer, patent lumen, no intra-alveolar debris.',
      id: 'Septa alveolar tipis elastis, lapisan surfaktan utuh, lumen terbuka bebas debris.',
    },
    idsaGuideline: {
      en: 'Physiological baseline for alveolar-capillary gas exchange.',
      id: 'Kondisi fisiologis normal membran alveolar-kapiler.',
    },
    defaultExudate: 0,
    defaultVq: 0.85,
    accentColor: '#0ea5e9', // Sky blue
  },
  cap: {
    key: 'cap',
    title: {
      en: 'CAP: Lobar Consolidation',
      id: 'CAP: Konsolidasi Lobaris',
    },
    pathogen: 'Streptococcus pneumoniae',
    pathologySummary: {
      en: 'Red to Gray Hepatization. Alveoli are packed with dense purulent exudate, diapedesed neutrophils, polymerized fibrin meshes, and hemolyzed red cells, transforming spongy parenchyma into solid, airless tissue.',
      id: 'Hepatisasi Merah hingga Kelabu. Alveoli dipenuhi eksudat purulen padat, neutrofil, jaring fibrin terpolimerisasi, dan eritrosit lisis, mengubah spons paru menjadi jaringan padat tanpa rongga udara.',
    },
    histologyHallmark: {
      en: 'Alveolar lumen obliterated by neutrophilic-fibrinous exudate; congested septal capillaries.',
      id: 'Lumen alveolus terisi penuh eksudat neutrofil-fibrin; kapiler septa mengalami kongesti masif.',
    },
    idsaGuideline: {
      en: 'IDSA/ATS 2019 CAP: Risk-stratify with CURB-65 / PSI. Empirical High-dose Amoxicillin or Ceftriaxone + Azithromycin.',
      id: 'IDSA/ATS 2019 CAP: Stratifikasi risiko via CURB-65 / PSI. Amoksisilin dosis tinggi atau Seftriakson + Azitromisin.',
    },
    defaultExudate: 78,
    defaultVq: 0.22,
    accentColor: '#f43f5e', // Rose
  },
  hap_vap: {
    key: 'hap_vap',
    title: {
      en: 'HAP/VAP: Biofilm & MDR Pathogens',
      id: 'HAP/VAP: Biofilm & Kuman MDR',
    },
    pathogen: 'Pseudomonas aeruginosa / MRSA',
    pathologySummary: {
      en: 'Endotracheal tube cuff microaspiration and intraluminal bacterial biofilm colonization. Bacterial microcolonies release elastases and pyocyanin, causing necrotizing micro-abscesses and capillary thrombosis.',
      id: 'Mikroaspirasi di sekitar balon cuff pipa endotrakeal dan kolonisasi biofilm intralumen. Koloni kuman mensekresikan elastase dan piosianin, memicu mikro-abses nekrotikans dan trombosis kapiler.',
    },
    histologyHallmark: {
      en: 'Suppurative bronchopneumonia, mucus plugging, dense bacterial biofilm clusters, septal necrosis.',
      id: 'Bronkopneumonia supuratif, sumbatan lendir purulen, kluster biofilm bakteri, nekrosis septa.',
    },
    idsaGuideline: {
      en: 'IDSA/ATS 2016 HAP/VAP: Dual antipseudomonal agents (Beta-lactam + Fluoroquinolone/Aminoglycoside) plus Vancomycin/Linezolid for MRSA.',
      id: 'IDSA/ATS 2016 HAP/VAP: Terapi ganda antipseudomonas (Beta-laktam + Kuinolon/Aminoglikosida) plus Vankomisin/Linezolid untuk MRSA.',
    },
    defaultExudate: 82,
    defaultVq: 0.18,
    accentColor: '#eab308', // Amber
  },
  tuberculosis: {
    key: 'tuberculosis',
    title: {
      en: 'Tuberculosis: Caseating Granuloma',
      id: 'Tuberkulosis: Granuloma Kaseosa',
    },
    pathogen: 'Mycobacterium tuberculosis',
    pathologySummary: {
      en: 'Cell-mediated hypersensitivity reaction (Type IV). Central core of soft acellular caseous necrosis containing mycolic acid-rich bacilli, surrounded by palisading epithelioid histiocytes, Langhans multinucleated giant cells, and an outer CD4+ lymphocytic mantle.',
      id: 'Reaksi hipersensitivitas tipe lambat (Tipe IV). Inti nekrosis kaseosa amorf tanpa sel di tengah mengandung basil tahan asam, dikelilingi histiosit epitelioid, sel datia Langhans berinti tapal kuda, dan selubung limfosit T CD4+.',
    },
    histologyHallmark: {
      en: 'Central caseous necrosis, horseshoe-patterned Langhans giant cells, epithelioid rim, fibrotic capsule.',
      id: 'Nekrosis kaseosa sentral, sel datia Langhans berinti cincin/tapal kuda, histiosit epitelioid, simpai fibrotik.',
    },
    idsaGuideline: {
      en: 'WHO / ATS / IDSA 2024: GeneXpert MTB/RIF Ultra rapid molecular detection; standard 6-month 2HRZE/4HR regimen with pyridoxine.',
      id: 'WHO / ATS / IDSA 2024: Uji molekuler cepat GeneXpert MTB/RIF Ultra; regimen standar 6-bulan 2HRZE/4HR dengan suplemen piridoksin.',
    },
    defaultExudate: 65,
    defaultVq: 0.35,
    accentColor: '#d97706', // Warm Amber/Ochre
  },
  covid_ards: {
    key: 'covid_ards',
    title: {
      en: 'COVID-19 / Severe ARDS: DAD & Hyaline',
      id: 'COVID-19 / ARDS Berat: DAD & Hialin',
    },
    pathogen: 'SARS-CoV-2 (Spike-ACE2) / Inflammatory Insult',
    pathologySummary: {
      en: 'Diffuse Alveolar Damage (DAD). Viral-induced destruction of Type II pneumocytes halts surfactant production, inducing alveolar micro-collapse. Polymerized fibrin and necrotic debris form dense eosinophilic Hyaline Membranes lining alveolar walls, accompanied by capillary immunothrombosis.',
      id: 'Diffuse Alveolar Damage (DAD). Kematian pneumosit Tipe II mematikan produksi surfaktan dan memicu atelektasis mikro. Fibrin dan debris sel mati membentuk Membran Hialin eosinofilik tebal yang melapisi septa, disertai imunotrombosis mikrovaskular kapiler.',
    },
    histologyHallmark: {
      en: 'Dense pinkish hyaline membranes lining alveolar ducts; widespread microvascular platelet-fibrin thrombi.',
      id: 'Membran hialin eosinofilik pekat melapisi dinding duktus alveolar; mikrotrombus fibrin kapiler difus.',
    },
    idsaGuideline: {
      en: 'Berlin ARDS Criteria & IDSA/ATS ICU rules: Lung-protective low-tidal ventilation (4–8 mL/kg PBW), prone positioning ≥16 h/d, Dexamethasone.',
      id: 'Kriteria Konsensus Berlin & IDSA/ATS: Ventilasi proteksi paru volume tidal rendah (4–8 mL/kg PBW), posisi prone ≥16 jam/hari, Deksametason.',
    },
    defaultExudate: 90,
    defaultVq: 0.12,
    accentColor: '#ef4444', // Red
  },
};

interface HotspotInfo {
  id: string;
  title: { en: string; id: string };
  description: { en: string; id: string };
  pos: [number, number, number];
}

const ALVEOLAR_HOTSPOTS: HotspotInfo[] = [
  {
    id: 'bronchiole',
    title: {
      en: 'Terminal Bronchiole & Alveolar Duct',
      id: 'Bronkiolus Terminalis & Duktus Alveolar',
    },
    description: {
      en: 'The conductive airway branch transitioning into gas-exchanging acini. Lacks cartilage, lined by ciliated cuboidal cells and Clara/Club cells.',
      id: 'Saluran napas konduktif yang bermuara ke unit acinus penukar gas. Tidak bertulang rawan, dilapisi sel kuboid bersilia dan sel Club.',
    },
    pos: [0, 2.2, 0],
  },
  {
    id: 'acinus',
    title: {
      en: 'Alveolar Sac Cluster (Acinus)',
      id: 'Kluster Sakus Alveolaris (Acinus)',
    },
    description: {
      en: 'Terminal cluster of micro-alveoli providing ~100–140 m² of surface area for passive O2 and CO2 diffusion in the healthy adult lung.',
      id: 'Kumpulan mikrosakus alveolus terminal yang menyediakan ~100–140 m² luas permukaan untuk difusi pasif O2 dan CO2 pada paru sehat.',
    },
    pos: [0, 0, 0.8],
  },
  {
    id: 'capillaries',
    title: {
      en: 'Pulmonary Capillary Meshwork',
      id: 'Anyaman Kapiler Pulmonal',
    },
    description: {
      en: 'Dense microvascular capillary network encasing alveoli. Deoxygenated blood (pulmonary artery) exchanges gas to emerge fully oxygenated (pulmonary vein).',
      id: 'Jaringan mikrovaskular kapiler padat yang membungkus alveolus. Darah vena campuran mengalir dan menyerap O2 untuk menjadi darah arteri teroksigenasi.',
    },
    pos: [1.3, -0.4, 0],
  },
  {
    id: 'membrane',
    title: {
      en: 'Alveolar-Capillary Diffusion Barrier',
      id: 'Sawar Difusi Alveolar-Kapiler',
    },
    description: {
      en: 'Ultra-thin anatomical barrier (0.2–0.5 µm) formed by Type I pneumocyte epithelium, fused basal lamina, and capillary endothelium. Thickened in pneumonia and ARDS.',
      id: 'Sawar anatomis sangat tipis (0.2–0.5 µm) yang terdiri dari epitel pneumosit Tipe I, lamina basalis fusi, dan endotel kapiler. Menebal drastis pada pneumonia dan ARDS.',
    },
    pos: [-1.2, 0.2, 0.5],
  },
  {
    id: 'type2',
    title: {
      en: 'Type II Pneumocyte & Surfactant Layer',
      id: 'Pneumosit Tipe II & Lapisan Surfaktan',
    },
    description: {
      en: 'Cuboidal stem cells containing lamellar bodies that synthesize dipalmitoylphosphatidylcholine (DPPC) surfactant, lowering alveolar surface tension and preventing end-expiratory collapse.',
      id: 'Sel kuboid yang memiliki badan lamelar penyintesis surfaktan DPPC. Menurunkan tegangan permukaan alveolar guna mencegah kolaps atelektasis saat ekspirasi.',
    },
    pos: [0.6, 0.8, -0.6],
  },
];

export const PulmonaryAlveoliViewer: React.FC = () => {
  const { language } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);

  // State
  const [selectedCondition, setSelectedCondition] = useState<PulmonaryCondition>('normal');
  const [isCutaway, setIsCutaway] = useState<boolean>(true);
  const [exudateLevel, setExudateLevel] = useState<number>(0);
  const [ventilationRate, setVentilationRate] = useState<number>(4.2); // L/min
  const [perfusionRate, setPerfusionRate] = useState<number>(5.0); // L/min
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [showHelperGrid, setShowHelperGrid] = useState<boolean>(true);
  const [showClinicalDock, setShowClinicalDock] = useState<boolean>(false);

  // CURB-65 Interactive Checklist State
  const [curbC, setCurbC] = useState<boolean>(false);
  const [curbU, setCurbU] = useState<boolean>(false);
  const [curbR, setCurbR] = useState<boolean>(false);
  const [curbB, setCurbB] = useState<boolean>(false);
  const [curb65, setCurb65] = useState<boolean>(false);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const exudateMeshRef = useRef<THREE.Mesh | null>(null);
  const gasParticlesRef = useRef<THREE.Points | null>(null);
  const debrisParticlesRef = useRef<THREE.Points | null>(null);
  const capillaryGroupRef = useRef<THREE.Group | null>(null);
  const helperGroupRef = useRef<THREE.Group | null>(null);
  const autoRotateRef = useRef<boolean>(isAutoRotating);

  useEffect(() => {
    autoRotateRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Current condition data
  const condData = CONDITIONS[selectedCondition];

  const handleSelectCondition = useCallback((condKey: PulmonaryCondition) => {
    setSelectedCondition(condKey);
    const data = CONDITIONS[condKey];
    setExudateLevel(data.defaultExudate);
    setVentilationRate(Number((data.defaultVq * 5.0).toFixed(1)));
  }, []);

  // Calculated V/Q and oxygenation metrics
  const vqRatio = useMemo(() => {
    if (perfusionRate <= 0) return 0;
    // Effective alveolar ventilation reduced by exudate occlusion
    const effectiveVentilation = ventilationRate * (1 - (exudateLevel / 100) * 0.85);
    return Number((effectiveVentilation / perfusionRate).toFixed(2));
  }, [ventilationRate, perfusionRate, exudateLevel]);

  // Alveolar Gas Equation approximation: P_A O2 = FiO2(760-47) - PaCO2/0.8
  // With FiO2 = 0.21, PaCO2 = 40 => P_A O2 ≈ 100 mmHg in ideal conditions
  const estimatedPaO2 = useMemo(() => {
    // Normal is ~95-100 mmHg. Lower V/Q drops PaO2 precipitously (shunt)
    const basePaO2 = Math.min(100, Math.max(35, Math.round(98 * (vqRatio / 0.84))));
    return basePaO2;
  }, [vqRatio]);

  const estimatedSaO2 = useMemo(() => {
    // Hill equation sigmoid estimation
    const p = estimatedPaO2;
    const sao2 = Math.min(99, Math.max(55, Math.round((Math.pow(p, 2.7) / (Math.pow(p, 2.7) + Math.pow(26.6, 2.7))) * 100)));
    return sao2;
  }, [estimatedPaO2]);

  const estimatedAaGradient = useMemo(() => {
    // Ideal PAO2 is ~102. Aa = PAO2 - PaO2.
    return Math.max(4, 102 - estimatedPaO2);
  }, [estimatedPaO2]);

  // CURB-65 total score
  const curbScore = (curbC ? 1 : 0) + (curbU ? 1 : 0) + (curbR ? 1 : 0) + (curbB ? 1 : 0) + (curb65 ? 1 : 0);

  // -------------------------------------------------------------
  // THREE.JS SCENE INITIALIZATION & CLEANUP
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x020617); // Obsidian slate-950

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 2. WebGL Renderer with High Precision
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup (Surgical Laboratory Aesthetics)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainKeyLight.position.set(5, 8, 7);
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    fillLight.position.set(-6, -3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xff4444, 0.8, 15);
    rimLight.position.set(0, -4, 4);
    scene.add(rimLight);

    // 4. Master Rotational Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    masterGroupRef.current = masterGroup;

    // 5. Build 3D Helper Grid & Coordinate Axes
    const helperGroup = new THREE.Group();
    helperGroupRef.current = helperGroup;
    scene.add(helperGroup);

    const gridHelper = new THREE.GridHelper(8, 16, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -2.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    helperGroup.add(gridHelper);

    // Coordinate Axes (Red: +X Lateral, Green: +Y Cranial, Blue: +Z Anterior)
    const axesHelper = new THREE.AxesHelper(2.5);
    axesHelper.position.set(-3.2, -2.0, -1.5);
    helperGroup.add(axesHelper);

    // 6. Interaction Event Listeners (Orbit & Pinch)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0.15;
    let targetRotY = -0.3;
    let targetZoom = 7.5;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
      targetRotX = Math.max(-1.3, Math.min(1.3, targetRotX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.005;
      targetZoom = Math.max(3.5, Math.min(12.0, targetZoom));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Touch Support
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const factor = (touchStartDist - dist) * 0.01;
        touchStartDist = dist;
        targetZoom += factor;
        targetZoom = Math.max(3.5, Math.min(12.0, targetZoom));
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.z += (targetZoom - camera.position.z) * 0.08;
      camera.lookAt(0, 0, 0);

      // Smooth rotation
      if (autoRotateRef.current && !isDragging) {
        targetRotY += 0.004;
      }
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.08;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.08;

      // Animate gas diffusion particles
      if (gasParticlesRef.current) {
        const posAttr = gasParticlesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          // Flow downwards into alveoli then disperse
          arr[i + 1] -= delta * 0.8;
          if (arr[i + 1] < -1.8) {
            arr[i + 1] = 2.4;
            arr[i] = (Math.random() - 0.5) * 0.6;
            arr[i + 2] = (Math.random() - 0.5) * 0.6;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Animate capillary pulsatile flow
      if (capillaryGroupRef.current) {
        const pulse = 1.0 + Math.sin(time * 3.5) * 0.015;
        capillaryGroupRef.current.scale.set(pulse, pulse, pulse);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Helper Grid Visibility
  useEffect(() => {
    if (helperGroupRef.current) {
      helperGroupRef.current.visible = showHelperGrid;
    }
  }, [showHelperGrid]);

  // -------------------------------------------------------------
  // REBUILD 3D ANATOMICAL STRUCTURES ON STATE CHANGE
  // -------------------------------------------------------------
  useEffect(() => {
    const group = masterGroupRef.current;
    if (!group) return;

    // Clean previous meshes
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    // A. Terminal Bronchiole Airway Cylinder & Y-Branch
    const bronchioleMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.35,
      metalness: 0.1,
      wireframe: false,
    });

    const stemGeo = new THREE.CylinderGeometry(0.32, 0.45, 1.6, 24, 1, true);
    const stemMesh = new THREE.Mesh(stemGeo, bronchioleMat);
    stemMesh.position.set(0, 2.0, 0);
    group.add(stemMesh);

    // Left and Right Branch Bronchioles
    const branchGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.9, 20, 1, true);
    const leftBranch = new THREE.Mesh(branchGeo, bronchioleMat);
    leftBranch.position.set(-0.45, 1.0, 0);
    leftBranch.rotation.z = Math.PI / 4.5;
    group.add(leftBranch);

    const rightBranch = new THREE.Mesh(branchGeo, bronchioleMat);
    rightBranch.position.set(0.45, 1.0, 0);
    rightBranch.rotation.z = -Math.PI / 4.5;
    group.add(rightBranch);

    // B. Alveolar Sac Clusters (Acinus of 7 Interconnected Spheres)
    const alveolarCenters: [number, number, number][] = [
      [0, 0, 0], // Central Hub
      [-0.85, -0.2, 0.6], // Anterolateral Left
      [0.85, -0.2, 0.6], // Anterolateral Right
      [-0.95, -0.3, -0.5], // Posterolateral Left
      [0.95, -0.3, -0.5], // Posterolateral Right
      [0, -0.9, 0.4], // Inferior Center
      [0, -0.6, -0.7], // Postero-inferior
    ];

    const isHap = selectedCondition === 'hap_vap';
    const isTb = selectedCondition === 'tuberculosis';
    const isCovid = selectedCondition === 'covid_ards';
    const isCap = selectedCondition === 'cap';

    // Alveolar Wall Material
    const wallColor = isCovid
      ? 0xf43f5e // Pinkish/inflamed hyaline wall
      : isTb
      ? 0xd97706 // Caseous amber wall
      : isCap
      ? 0xe11d48 // Hyperemic deep red/congested
      : 0x38bdf8; // Healthy translucent cyan/sky

    const alveolarWallMat = new THREE.MeshPhysicalMaterial({
      color: wallColor,
      roughness: 0.15,
      transmission: isCutaway ? 0.4 : 0.85,
      opacity: isCutaway ? 0.75 : 0.65,
      transparent: true,
      ior: 1.35,
      side: isCutaway ? THREE.FrontSide : THREE.DoubleSide,
    });

    alveolarCenters.forEach(([cx, cy, cz], idx) => {
      // If cutaway is enabled, clip front half of spheres
      const thetaLength = isCutaway && idx === 0 ? Math.PI : Math.PI * 2;
      const sphereGeo = new THREE.SphereGeometry(
        0.82,
        32,
        24,
        0,
        thetaLength,
        0,
        Math.PI
      );

      const sphereMesh = new THREE.Mesh(sphereGeo, alveolarWallMat);
      sphereMesh.position.set(cx, cy, cz);
      group.add(sphereMesh);

      // C. Type II Pneumocytes (Surfactant-producing cuboidal cells)
      if (!isCovid) {
        const type2Geo = new THREE.SphereGeometry(0.08, 12, 12);
        const type2Mat = new THREE.MeshStandardMaterial({
          color: 0x10b981, // Green
          emissive: 0x059669,
          emissiveIntensity: 0.4,
          roughness: 0.2,
        });
        for (let k = 0; k < 3; k++) {
          const t2Mesh = new THREE.Mesh(type2Geo, type2Mat);
          const ang1 = (k * 2 * Math.PI) / 3 + idx;
          t2Mesh.position.set(
            cx + Math.cos(ang1) * 0.76,
            cy + Math.sin(ang1) * 0.76,
            cz + (Math.random() - 0.5) * 0.4
          );
          group.add(t2Mesh);
        }
      }
    });

    // D. Intra-Alveolar Inflammatory Exudate & Consolidation Mesh
    if (exudateLevel > 0) {
      const exudateScale = (exudateLevel / 100) * 0.78;
      const exudateGeo = new THREE.SphereGeometry(exudateScale, 24, 20);

      let exudateColor = 0xf59e0b; // Purulent Amber
      let exudateRoughness = 0.5;
      if (isCap) {
        exudateColor = 0xb91c1c; // Rust-colored red hepatization
        exudateRoughness = 0.3;
      } else if (isHap) {
        exudateColor = 0x65a30d; // Greenish Pseudomonas biofilm
        exudateRoughness = 0.6;
      } else if (isTb) {
        exudateColor = 0xfef08a; // Cheesy pale-yellow caseous necrosis
        exudateRoughness = 0.8;
      } else if (isCovid) {
        exudateColor = 0xf43f5e; // Eosinophilic hyaline fibrin exudate
        exudateRoughness = 0.2;
      }

      const exudateMat = new THREE.MeshStandardMaterial({
        color: exudateColor,
        roughness: exudateRoughness,
        metalness: 0.1,
        transparent: true,
        opacity: Math.min(0.92, (exudateLevel / 100) * 0.95),
      });

      alveolarCenters.forEach(([cx, cy, cz]) => {
        const exMesh = new THREE.Mesh(exudateGeo, exudateMat);
        exMesh.position.set(cx, cy - (1 - exudateScale) * 0.35, cz);
        group.add(exMesh);
      });
      exudateMeshRef.current = exudateMat as any;
    }

    // E. Pulmonary Capillary Network Meshwork (Red = Oxygenated, Blue = Deoxygenated)
    const capGroup = new THREE.Group();
    capillaryGroupRef.current = capGroup;
    group.add(capGroup);

    const capMatDeox = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Blue
      roughness: 0.25,
      metalness: 0.2,
    });
    const capMatOx = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Bright Red
      roughness: 0.25,
      metalness: 0.2,
    });

    // Create 12 wrapping capillary rings around the acinus
    for (let c = 0; c < 14; c++) {
      const ringGeo = new THREE.TorusGeometry(1.65 + Math.sin(c) * 0.15, 0.045, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeo, c % 2 === 0 ? capMatDeox : capMatOx);
      ringMesh.rotation.x = Math.PI * (c / 14);
      ringMesh.rotation.y = Math.PI * (c / 7);
      ringMesh.position.set(0, -0.3, 0);
      capGroup.add(ringMesh);
    }

    // F. Gas Diffusion Particles (O2 Cyan & CO2 Amber)
    const pCount = selectedCondition === 'normal' ? 650 : Math.max(120, Math.round(650 * (1 - exudateLevel / 100)));
    const pGeo = new THREE.BufferAttribute(new Float32Array(pCount * 3), 3);
    const pArr = pGeo.array as Float32Array;

    for (let i = 0; i < pCount; i++) {
      pArr[i * 3] = (Math.random() - 0.5) * 1.8;
      pArr[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      pArr[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }

    const pBufferGeo = new THREE.BufferGeometry();
    pBufferGeo.setAttribute('position', pGeo);

    const pMat = new THREE.PointsMaterial({
      color: isCovid || isCap ? 0xf87171 : 0x38bdf8,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const gasPoints = new THREE.Points(pBufferGeo, pMat);
    group.add(gasPoints);
    gasParticlesRef.current = gasPoints;

    // G. Tuberculosis Granuloma Specific Histology: Langhans Giant Cells & Fibrous Mantle
    if (isTb) {
      const giantCellGeo = new THREE.TorusGeometry(0.24, 0.06, 12, 24);
      const giantCellMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Amber
        roughness: 0.3,
      });
      // 4 Langhans Giant Cells with horseshoe ring nuclei
      for (let g = 0; g < 4; g++) {
        const gc = new THREE.Mesh(giantCellGeo, giantCellMat);
        gc.position.set(
          Math.cos((g * Math.PI) / 2) * 1.3,
          -0.4 + Math.sin((g * Math.PI) / 2) * 0.4,
          0.7
        );
        group.add(gc);
      }
    }
  }, [selectedCondition, isCutaway, exudateLevel]);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-slate-100 select-none">
      {/* 1. TOP HEADER & PATHOLOGY CONDITION SELECTOR */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>IDSA / ATS CLINICAL PATHOPHYSIOLOGY SUITE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <Wind className="w-6 h-6 text-rose-500" />
            <span>{condData.title[language]}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'en' ? 'Etiology: ' : 'Etiologi: '}
            <span className="font-semibold text-rose-400">{condData.pathogen}</span>
          </p>
        </div>

        {/* Condition Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(CONDITIONS) as PulmonaryCondition[]).map((condKey) => {
            const cond = CONDITIONS[condKey];
            const isActive = selectedCondition === condKey;
            return (
              <button
                key={condKey}
                onClick={() => handleSelectCondition(condKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm ring-1 ring-rose-500/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: cond.accentColor }}
                />
                <span>{cond.title[language].split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN 3D INTERACTIVE STAGE & OVERLAYS */}
      <div className="relative w-full h-[460px] sm:h-[540px] bg-slate-950 overflow-hidden">
        {/* Three.js Canvas Container */}
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Top-Left: Physiological Status & Alveolar Gas Telemetry */}
        <div className="absolute top-4 left-4 z-20 max-w-[260px] p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono space-y-1.5 shadow-xl">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              <span>Gas Exchange Matrix</span>
            </span>
            <span className={vqRatio < 0.3 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
              {vqRatio < 0.3 ? 'SHUNT V/Q=0' : 'MATCHED'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">V/Q Ratio:</span>
            <span className="font-bold text-white">{vqRatio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Estimated PaO2:</span>
            <span className={`font-bold ${estimatedPaO2 < 60 ? 'text-red-400' : 'text-emerald-400'}`}>
              {estimatedPaO2} mmHg
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Arterial SaO2:</span>
            <span className={`font-bold ${estimatedSaO2 < 90 ? 'text-red-400' : 'text-emerald-400'}`}>
              {estimatedSaO2}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">A-a Gradient:</span>
            <span className={`font-bold ${estimatedAaGradient > 25 ? 'text-amber-400' : 'text-white'}`}>
              {estimatedAaGradient} mmHg
            </span>
          </div>
          <div className="flex justify-between pt-0.5 border-t border-slate-800/60">
            <span className="text-slate-400">Occlusion:</span>
            <span className="font-bold text-rose-400">{exudateLevel}%</span>
          </div>
        </div>

        {/* Top-Right: Quick Controls (Grid, Cutaway, Reset) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setShowHelperGrid(!showHelperGrid)}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
              showHelperGrid
                ? 'bg-rose-500/20 border border-rose-400/40 text-rose-300'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle 3D Helper Grid & Coordinate Axes (Red: +X, Green: +Y, Blue: +Z)"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">3D Grid</span>
          </button>

          <button
            onClick={() => setIsCutaway(!isCutaway)}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
              isCutaway
                ? 'bg-sky-500/20 border border-sky-400/40 text-sky-300'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Anatomical Cutaway (Peek inside Alveolar Lumen)"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">{isCutaway ? 'Cutaway' : 'Exterior'}</span>
          </button>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-slate-800 border border-slate-700 text-slate-200'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400'
            }`}
            title="Toggle Orbit Auto-Rotation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowClinicalDock(!showClinicalDock)}
            className={`px-3 py-2 rounded-xl text-xs font-bold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
              showClinicalDock
                ? 'bg-amber-500/30 border border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">CURB-65 / ICU</span>
          </button>
        </div>

        {/* Bottom Hotspots Anatomical Navigator */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            {ALVEOLAR_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(isSelected ? null : spot)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-white text-slate-900 font-bold shadow-lg ring-2 ring-rose-500'
                      : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <Crosshair className="w-3 h-3 text-rose-400" />
                  <span>{spot.title[language].split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* 3D Coordinate Legend Pill */}
          <div className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-400 hidden md:flex items-center gap-2 pointer-events-auto">
            <span>Axes:</span>
            <span className="text-red-400 font-bold">+X Lateral</span>
            <span className="text-emerald-400 font-bold">+Y Cranial</span>
            <span className="text-sky-400 font-bold">+Z Anterior</span>
          </div>
        </div>

        {/* Interactive Hotspot Card Modal */}
        {activeHotspot && (
          <div className="absolute top-20 left-4 sm:left-6 z-25 max-w-sm p-4 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-rose-500/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                {activeHotspot.title[language]}
              </span>
              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {activeHotspot.description[language]}
            </p>
          </div>
        )}

        {/* CLINICAL EVALUATOR DOCK (CURB-65 & IDSA/ATS ICU CRITERIA) */}
        {showClinicalDock && (
          <div className="absolute inset-y-4 right-4 z-30 w-full max-w-md p-4 sm:p-5 rounded-2xl bg-slate-950/95 backdrop-blur-lg border border-amber-500/40 shadow-2xl overflow-y-auto space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">IDSA / ATS Clinical Evaluator</h3>
                  <p className="text-[10px] text-slate-400">CURB-65 & Severe ICU Admission Criteria</p>
                </div>
              </div>
              <button
                onClick={() => setShowClinicalDock(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CURB-65 Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  CURB-65 Score Checklist
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Total: {curbScore} / 5
                </span>
              </div>

              {[
                { label: 'C — Acute Mental Confusion / Disorientation', state: curbC, setter: setCurbC },
                { label: 'U — Blood Urea Nitrogen > 19 mg/dL (>7 mmol/L)', state: curbU, setter: setCurbU },
                { label: 'R — Respiratory Rate ≥ 30 breaths/min', state: curbR, setter: setCurbR },
                { label: 'B — SBP < 90 mmHg or DBP ≤ 60 mmHg', state: curbB, setter: setCurbB },
                { label: '65 — Patient Age ≥ 65 Years', state: curb65, setter: setCurb65 },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => item.setter(!item.state)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                    item.state
                      ? 'bg-amber-500/20 border-amber-500/60 text-white font-semibold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    item.state ? 'bg-amber-500 border-amber-400 text-black' : 'border-slate-700'
                  }`}>
                    {item.state && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                </button>
              ))}
            </div>

            {/* Clinical Disposition Recommendation */}
            <div className={`p-3 rounded-xl border text-xs space-y-1 ${
              curbScore >= 3
                ? 'bg-red-500/15 border-red-500/50 text-red-200'
                : curbScore === 2
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                : 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {curbScore >= 3 ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                <span>
                  {curbScore >= 3
                    ? 'Severe Pneumonia (Mortality 15–40%)'
                    : curbScore === 2
                    ? 'Moderate Risk (Mortality ~9.2%)'
                    : 'Low Risk (Mortality <1.5%)'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {curbScore >= 3
                  ? 'Urgent Hospital Admission required; evaluate for direct Medical ICU transfer per IDSA/ATS guidelines.'
                  : curbScore === 2
                  ? 'Short inpatient stay in general ward or closely supervised outpatient management.'
                  : 'Safe for outpatient therapy (Oral Amoxicillin 1g TID or Doxycycline 100mg BID).'}
              </p>
            </div>

            {/* IDSA/ATS Severe Pneumonia ICU Rule */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                IDSA/ATS Mandatory ICU Admission Rule:
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Direct ICU admission is warranted if patient exhibits <strong className="text-white">≥ 1 Major Criterion</strong> (Invasive Mechanical Ventilation or Septic Shock requiring vasopressors) OR <strong className="text-white">≥ 3 Minor Criteria</strong> (RR ≥30, PaO2/FiO2 ≤250, Multilobar infiltrates, Confusion, Uremia, Leukopenia, Thrombocytopenia, Hypothermia, Hypotension).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM PHYSIOLOGICAL PARAMETER SLIDERS & GUIDELINES PANEL */}
      <div className="p-5 bg-slate-950 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slider 1: Alveolar Exudate Occlusion */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              {language === 'en' ? 'Alveolar Exudate / Occlusion' : 'Eksudat / Oklusi Alveolar'}
            </span>
            <span className="font-mono font-bold text-rose-400">{exudateLevel}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={exudateLevel}
            onChange={(e) => setExudateLevel(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 leading-tight">
            {language === 'en'
              ? 'Controls intra-alveolar purulent fluid, cellular diapedesis, and diffusion barrier thickness.'
              : 'Mengatur akumulasi eksudat purulen, diapedesis leukosit, dan ketebalan sawar difusi.'}
          </p>
        </div>

        {/* Slider 2: Alveolar Ventilation (V_A) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-sky-400" />
              {language === 'en' ? 'Alveolar Ventilation (V̇_A)' : 'Ventilasi Alveolar (V̇_A)'}
            </span>
            <span className="font-mono font-bold text-sky-400">{ventilationRate} L/min</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="8.0"
            step="0.1"
            value={ventilationRate}
            onChange={(e) => setVentilationRate(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 leading-tight">
            {language === 'en'
              ? 'Tidal volume and respiratory rate delivering oxygen into terminal acini.'
              : 'Volume tidal dan frekuensi napas yang menghantarkan oksigen ke acinus terminal.'}
          </p>
        </div>

        {/* Slider 3: Capillary Perfusion (Q) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'en' ? 'Capillary Blood Flow (Q̇)' : 'Aliran Darah Kapiler (Q̇)'}
            </span>
            <span className="font-mono font-bold text-emerald-400">{perfusionRate} L/min</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="10.0"
            step="0.1"
            value={perfusionRate}
            onChange={(e) => setPerfusionRate(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 leading-tight">
            {language === 'en'
              ? 'Pulmonary microvascular cardiac output perfusing adjacent alveolar capillaries.'
              : 'Curah jantung mikrovaskular yang membasahi kapiler perialveolar.'}
          </p>
        </div>
      </div>

      {/* 4. CLINICAL PRACTICE GUIDELINE STRIP (IDSA / ATS / WHO) */}
      <div className="px-5 py-3.5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <span className="text-slate-300 font-mono text-[11px]">
            <strong className="text-amber-400 uppercase font-bold">Evidence-Based Clinical Guidance: </strong>
            {condData.idsaGuideline[language]}
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 shrink-0">
          Consensus: <span className="text-white font-bold">IDSA / ATS / WHO / Berlin</span>
        </div>
      </div>
    </div>
  );
};
