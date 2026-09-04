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
  HeartCrack,
  ShieldAlert,
  ChevronRight,
  Info,
  Maximize2,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Flame,
  X,
} from 'lucide-react';

export type CardiacCondition =
  | 'normal'
  | 'angina'
  | 'stemi'
  | 'nstemi'
  | 'vf'
  | 'pvt'
  | 'asystole';

interface ConditionDetails {
  key: CardiacCondition;
  title: { en: string; id: string };
  pathology: { en: string; id: string };
  ecgFinding: { en: string; id: string };
  guidelineAction: { en: string; id: string };
  defaultOcclusion: number; // 0 to 100%
  defaultHr: number;
  shockable: boolean;
  accentColor: string;
}

export const CARDIAC_CONDITIONS: Record<CardiacCondition, ConditionDetails> = {
  normal: {
    key: 'normal',
    title: { en: 'Normal Sinus Rhythm (NSR)', id: 'Irama Sinus Normal (NSR)' },
    pathology: {
      en: 'Physiological baseline. Fully patent epicardial coronary arteries, synchronized atrial-ventricular excitation, CPP ~60 mmHg.',
      id: 'Kondisi fisiologis normal. Arteri koroner paten tanpa hambatan, eksitasi atrioventrikular sinkron, CPP ~60 mmHg.',
    },
    ecgFinding: {
      en: 'Regular P waves, narrow QRS (<120ms), isoelectric ST segment, upright T waves. Rate: 60–100 bpm.',
      id: 'Gelombang P teratur, QRS sempit (<120ms), segmen ST isoelektrik, gelombang T tegak. Laju: 60–100 bpm.',
    },
    guidelineAction: {
      en: 'Routine cardiovascular risk surveillance and lifestyle optimization.',
      id: 'Pemantauan risiko kardiovaskular berkala dan gaya hidup sehat.',
    },
    defaultOcclusion: 0,
    defaultHr: 72,
    shockable: false,
    accentColor: '#10b981', // emerald
  },
  angina: {
    key: 'angina',
    title: { en: 'Stable Angina Pectoris', id: 'Angina Pektoris Stabil' },
    pathology: {
      en: 'Fixed atherosclerotic plaque occluding ~75% of coronary lumen. Demand-supply mismatch during physical exertion.',
      id: 'Plak aterosklerosis stabil menyumbat ~75% lumen koroner. Ketidakseimbangan pasokan dan kebutuhan oksigen saat aktivitas.',
    },
    ecgFinding: {
      en: 'Normal at rest; transient horizontal or downsloping ST-segment depression (≥1 mm) during stress.',
      id: 'Normal saat istirahat; depresi segmen ST horizontal/downsloping transien (≥1 mm) saat uji beban.',
    },
    guidelineAction: {
      en: 'Sublingual Nitroglycerin PRN, Beta-blocker, Statin, and Aspirin. Elective coronary angiography if refractory.',
      id: 'Nitrogliserin sublingual bila perlu, Penyekat beta, Statin, dan Aspirin. Angiografi elektif bila refrakter.',
    },
    defaultOcclusion: 75,
    defaultHr: 95,
    shockable: false,
    accentColor: '#f59e0b', // amber
  },
  stemi: {
    key: 'stemi',
    title: { en: 'Acute Anterior STEMI (LAD Occlusion)', id: 'STEMI Anterior Akut (Oklusi LAD)' },
    pathology: {
      en: 'Acute rupture of thin-cap fibroatheroma with 100% occlusive thrombus in proximal LAD. Transmural anterior myocardial infarction.',
      id: 'Ruptur akut fibroateroma kapsul tipis dengan trombus oklusif 100% di LAD proksimal. Infark miokardium anterior transmural.',
    },
    ecgFinding: {
      en: 'Tombstone convex ST elevation ≥2 mm in leads V1–V4 with reciprocal ST depression in II, III, aVF.',
      id: 'Elevasi segmen ST konveks "tombstone" ≥2 mm di sadapan V1–V4 dengan depresi ST resiprokal di II, III, aVF.',
    },
    guidelineAction: {
      en: 'EMERGENT PRIMARY PCI within 90 minutes (Door-to-Balloon). Dual Antiplatelet Therapy (DAPT) + Heparin.',
      id: 'PCI PRIMER DARURAT dalam 90 menit (Door-to-Balloon). Antiplatelet Ganda (DAPT) + Heparin.',
    },
    defaultOcclusion: 100,
    defaultHr: 110,
    shockable: false,
    accentColor: '#ef4444', // red
  },
  nstemi: {
    key: 'nstemi',
    title: { en: 'NSTEMI (Subendocardial Ischemia)', id: 'NSTEMI (Iskemia Subendokardium)' },
    pathology: {
      en: 'Incomplete mural thrombus with microvascular distal embolization causing subendocardial myocyte necrosis and troponin release.',
      id: 'Trombus mural non-oklusif dengan mikroembolisasi distal memicu nekrosis miosit subendokardium dan pelepasan troponin.',
    },
    ecgFinding: {
      en: 'Persistent horizontal ST depression ≥0.5 mm and deep symmetrical T-wave inversions. No ST elevation.',
      id: 'Depresi ST horizontal persisten ≥0.5 mm dan inversi gelombang T simetris dalam. Tanpa elevasi ST.',
    },
    guidelineAction: {
      en: 'DAPT + Anticoagulation (Enoxaparin/Heparin). Early invasive coronary angiography (<24h if GRACE >140).',
      id: 'DAPT + Antikoagulan (Enoksaparin/Heparin). Angiografi invasif dini (<24 jam bila skor GRACE >140).',
    },
    defaultOcclusion: 88,
    defaultHr: 86,
    shockable: false,
    accentColor: '#f97316', // orange
  },
  vf: {
    key: 'vf',
    title: { en: 'Ventricular Fibrillation (VF)', id: 'Fibrilasi Ventrikel (VF)' },
    pathology: {
      en: 'Chaotic micro-reentrant wavelets. Zero synchronized ventricular systole; cardiac output = 0; pulse absent. Cardiac arrest.',
      id: 'Sirkuit mikro-reentry kacau balau. Tiada sistol terkoordinasi; curah jantung = 0; nadi hilang. Henti jantung mendadak.',
    },
    ecgFinding: {
      en: 'Chaotic, irregular fibrillatory baseline with no identifiable P, QRS, or T waveforms. Coarse VF transitioning to fine VF.',
      id: 'Garis dasar fibrilasi ireguler tanpa gelombang P, QRS, atau T yang dapat diidentifikasi. VF kasar menuju halus.',
    },
    guidelineAction: {
      en: 'SHOCKABLE ARREST: Immediate unsynchronized defibrillation (200J Biphasic) + High-Quality CPR + Epinephrine 1mg.',
      id: 'IRAMA SHOCKABLE: Defibrilasi asinkron seketika (200J Bifasik) + RJP berkualitas tinggi + Epinefrin 1mg.',
    },
    defaultOcclusion: 100,
    defaultHr: 0,
    shockable: true,
    accentColor: '#dc2626', // dark red
  },
  pvt: {
    key: 'pvt',
    title: { en: 'Pulseless Ventricular Tachycardia (pVT)', id: 'VT Tanpa Nadi (pVT)' },
    pathology: {
      en: 'Rapid ventricular ectopic pacemaker (rate >200 bpm). Diastolic filling time is near zero; pulseless hemodynamic collapse.',
      id: 'Pemacu ektopik ventrikel sangat cepat (laju >200 bpm). Waktu pengisian diastol nihil; kolaps sirkulasi tanpa nadi.',
    },
    ecgFinding: {
      en: 'Wide, monomorphic, regular ventricular tachycardia without palpable peripheral pulses.',
      id: 'Takikardia ventrikel reguler monomorfik kompleks lebar tanpa adanya denyut nadi perifer teraba.',
    },
    guidelineAction: {
      en: 'SHOCKABLE ARREST: Immediate unsynchronized defibrillation (200J Biphasic) + CPR + Amiodarone 300mg IV.',
      id: 'IRAMA SHOCKABLE: Defibrilasi asinkron seketika (200J Bifasik) + RJP + Amiodaron 300mg IV.',
    },
    defaultOcclusion: 95,
    defaultHr: 220,
    shockable: true,
    accentColor: '#e11d48', // rose
  },
  asystole: {
    key: 'asystole',
    title: { en: 'Asystole (Electrical Standstill)', id: 'Asistol (Henti Listrik Jantung)' },
    pathology: {
      en: 'Complete cessation of cardiac electrical depolarization and mechanical contraction. End-stage hypoxia/ischemia.',
      id: 'Penghentian total depolarisasi listrik dan kontraksi mekanik jantung. Stadium akhir hipoksia/iskemia.',
    },
    ecgFinding: {
      en: 'Flatline (<0.1 mV electrical amplitude) verified across at least 2 orthogonal leads.',
      id: 'Garis lurus datar (amplitudo <0.1 mV) yang dikonfirmasi pada minimal 2 sadapan ortogonal.',
    },
    guidelineAction: {
      en: 'NON-SHOCKABLE ARREST: DO NOT SHOCK. High-Quality CPR without interruption + Epinephrine 1mg IV + Search 5H/5T.',
      id: 'IRAMA NON-SHOCKABLE: JANGAN DEFIBRILASI. RJP tanpa henti + Epinefrin 1mg IV + Lacak penyebab 5H dan 5T.',
    },
    defaultOcclusion: 100,
    defaultHr: 0,
    shockable: false,
    accentColor: '#64748b', // slate
  },
};

const CARDIAC_CATEGORIES: {
  category: { en: string; id: string };
  conditions: CardiacCondition[];
}[] = [
  {
    category: { en: 'Baseline Rhythm', id: 'Irama Fisiologis' },
    conditions: ['normal'],
  },
  {
    category: { en: 'Coronary Ischemia (ACS)', id: 'Iskemia Koroner (SKA)' },
    conditions: ['angina', 'nstemi', 'stemi'],
  },
  {
    category: { en: 'Shockable Arrest (Defib)', id: 'Henti Jantung Shockable' },
    conditions: ['vf', 'pvt'],
  },
  {
    category: { en: 'Non-Shockable Arrest (CPR)', id: 'Henti Jantung Non-Shockable' },
    conditions: ['asystole'],
  },
];

export const CardiacArrestViewer: React.FC = () => {
  const { language } = useLearning();

  // State
  const [condition, setCondition] = useState<CardiacCondition>('stemi');
  const [occlusionPct, setOcclusionPct] = useState<number>(100);
  const [isCprActive, setIsCprActive] = useState<boolean>(false);
  const [cprRate, setCprRate] = useState<number>(110);
  const [shockFlash, setShockFlash] = useState<boolean>(false);
  const [showVessels, setShowVessels] = useState<boolean>(true);
  const [showIschemiaZone, setShowIschemiaZone] = useState<boolean>(true);
  const [troponinLevel, setTroponinLevel] = useState<number>(1850); // ng/L

  // Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const heartGroupRef = useRef<THREE.Group | null>(null);
  const ischemicMeshRef = useRef<THREE.Mesh | null>(null);
  const thrombusMeshRef = useRef<THREE.Mesh | null>(null);
  const vesselGroupRef = useRef<THREE.Group | null>(null);
  const ecgPointsRef = useRef<number[]>([]);
  const shockAnimRef = useRef<number>(0);
  const shockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const conditionRef = useRef<CardiacCondition>(condition);
  const isCprActiveRef = useRef<boolean>(isCprActive);
  const cprRateRef = useRef<number>(cprRate);

  useEffect(() => {
    conditionRef.current = condition;
  }, [condition]);

  useEffect(() => {
    isCprActiveRef.current = isCprActive;
  }, [isCprActive]);

  useEffect(() => {
    cprRateRef.current = cprRate;
  }, [cprRate]);

  useEffect(() => {
    return () => {
      if (shockTimerRef.current) clearTimeout(shockTimerRef.current);
    };
  }, []);

  const curData = CARDIAC_CONDITIONS[condition];
  const curDataRef = useRef(curData);
  useEffect(() => {
    curDataRef.current = curData;
  }, [curData]);

  // Sync parameters on condition change
  const handleSelectCondition = (cond: CardiacCondition) => {
    setCondition(cond);
    const data = CARDIAC_CONDITIONS[cond];
    setOcclusionPct(data.defaultOcclusion);
    if (cond === 'normal') setTroponinLevel(6);
    else if (cond === 'angina') setTroponinLevel(12);
    else if (cond === 'stemi') setTroponinLevel(4200);
    else if (cond === 'nstemi') setTroponinLevel(840);
    else if (cond === 'vf' || cond === 'pvt') setTroponinLevel(5600);
    else setTroponinLevel(7200);
  };

  // Defibrillation Action
  const handleDeliverShock = () => {
    if (!curData.shockable && condition !== 'vf' && condition !== 'pvt') return;
    setShockFlash(true);
    shockAnimRef.current = 1.0;
    if (shockTimerRef.current) clearTimeout(shockTimerRef.current);
    shockTimerRef.current = setTimeout(() => {
      setShockFlash(false);
      // Successful defibrillation conversion to Sinus Rhythm
      setCondition('normal');
      setOcclusionPct(20);
      setIsCprActive(false);
    }, 800);
  };

  // 1. THREE.JS 3D SCENE INITIALIZATION
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(4, 8, 6);
    scene.add(dirLight1);

    const rimLight = new THREE.DirectionalLight(0xef4444, 1.2);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Root Group
    const heartGroup = new THREE.Group();
    heartGroupRef.current = heartGroup;
    scene.add(heartGroup);

    // --- ANATOMICAL HEART GEOMETRY ---
    // Left & Right Ventricle Core (Conical / Torus modified shape)
    const ventricleGeo = new THREE.SphereGeometry(1.3, 36, 32);
    ventricleGeo.scale(1.0, 1.35, 0.9);
    const ventricleMat = new THREE.MeshStandardMaterial({
      color: 0xbe123c, // deep cardiac red
      roughness: 0.35,
      metalness: 0.1,
    });
    const ventricles = new THREE.Mesh(ventricleGeo, ventricleMat);
    ventricles.position.set(0, -0.2, 0);
    ventricles.rotation.z = 0.15;
    heartGroup.add(ventricles);

    // Atria Base (Superior cardiac chambers)
    const atriaGeo = new THREE.SphereGeometry(0.85, 28, 24);
    atriaGeo.scale(1.3, 0.7, 0.9);
    const atriaMat = new THREE.MeshStandardMaterial({
      color: 0x9f1239,
      roughness: 0.45,
    });
    const atria = new THREE.Mesh(atriaGeo, atriaMat);
    atria.position.set(0.1, 1.15, -0.2);
    heartGroup.add(atria);

    // Aortic Arch & Pulmonary Trunk
    const aortaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.9, 0),
      new THREE.Vector3(0.2, 1.6, -0.1),
      new THREE.Vector3(-0.4, 2.0, -0.3),
      new THREE.Vector3(-0.8, 1.5, -0.5),
    ]);
    const aortaGeo = new THREE.TubeGeometry(aortaCurve, 30, 0.28, 16, false);
    const aortaMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.3,
    });
    const aortaMesh = new THREE.Mesh(aortaGeo, aortaMat);
    heartGroup.add(aortaMesh);

    // Brachiocephalic branches off the arch
    const archBranches = [
      new THREE.Vector3(0.1, 1.8, -0.15),
      new THREE.Vector3(-0.1, 1.95, -0.25),
      new THREE.Vector3(-0.35, 1.9, -0.35),
    ];
    archBranches.forEach((pos) => {
      const branchGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.45, 12);
      const branch = new THREE.Mesh(branchGeo, aortaMat);
      branch.position.copy(pos);
      heartGroup.add(branch);
    });

    // Superior Vena Cava
    const svcGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.2, 16);
    const svcMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.4 });
    const svc = new THREE.Mesh(svcGeo, svcMat);
    svc.position.set(0.9, 1.3, -0.35);
    heartGroup.add(svc);

    // --- CORONARY ARTERY SYSTEM ---
    const vesselGroup = new THREE.Group();
    vesselGroupRef.current = vesselGroup;
    heartGroup.add(vesselGroup);

    // Left Anterior Descending (LAD) Artery Branching down anterior interventricular groove
    const ladCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.15, 0.9, 0.8),
      new THREE.Vector3(0.1, 0.4, 0.95),
      new THREE.Vector3(-0.05, -0.2, 0.98),
      new THREE.Vector3(-0.2, -0.8, 0.82),
      new THREE.Vector3(-0.3, -1.35, 0.5),
    ]);
    const ladGeo = new THREE.TubeGeometry(ladCurve, 32, 0.055, 12, false);
    const ladMat = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      roughness: 0.2,
      emissive: 0x880000,
      emissiveIntensity: 0.3,
    });
    const ladMesh = new THREE.Mesh(ladGeo, ladMat);
    vesselGroup.add(ladMesh);

    // Diagonal branches off LAD
    const diagCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 0.4, 0.95),
      new THREE.Vector3(0.45, 0.05, 0.85),
      new THREE.Vector3(0.7, -0.4, 0.6),
    ]);
    const diagGeo = new THREE.TubeGeometry(diagCurve, 20, 0.038, 10, false);
    const diagMesh = new THREE.Mesh(diagGeo, ladMat);
    vesselGroup.add(diagMesh);

    // Right Coronary Artery (RCA) in right atrioventricular groove
    const rcaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, 0.85, 0.7),
      new THREE.Vector3(0.85, 0.6, 0.4),
      new THREE.Vector3(1.1, 0.1, -0.1),
      new THREE.Vector3(0.9, -0.5, -0.4),
    ]);
    const rcaGeo = new THREE.TubeGeometry(rcaCurve, 28, 0.05, 10, false);
    const rcaMesh = new THREE.Mesh(rcaGeo, ladMat);
    vesselGroup.add(rcaMesh);

    // Acute Occluding Thrombus (Sphere localized on proximal LAD)
    const thrombusGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const thrombusMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8,
      emissive: 0x220000,
    });
    const thrombus = new THREE.Mesh(thrombusGeo, thrombusMat);
    thrombus.position.set(0.1, 0.4, 0.95);
    thrombusMeshRef.current = thrombus;
    vesselGroup.add(thrombus);

    // --- ISCHEMIC / INFARCTION NECROSIS OVERLAY ZONE ---
    // Overlay mesh representing ischemic anterior wall discoloration
    const ischemicGeo = new THREE.SphereGeometry(0.7, 24, 20);
    ischemicGeo.scale(1.1, 1.4, 0.6);
    const ischemicMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b, // cyanotic purple-blue
      roughness: 0.6,
      transparent: true,
      opacity: 0.82,
      blending: THREE.NormalBlending,
    });
    const ischemicMesh = new THREE.Mesh(ischemicGeo, ischemicMat);
    ischemicMesh.position.set(-0.15, -0.5, 0.65);
    ischemicMeshRef.current = ischemicMesh;
    heartGroup.add(ischemicMesh);

    // Shock Flash Sphere (hidden until shock)
    const flashGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const flashMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    scene.add(flashMesh);

    // Mouse drag rotation controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !heartGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      heartGroupRef.current.rotation.y += deltaX * 0.008;
      heartGroupRef.current.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch drag rotation controls
    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1 || !heartGroupRef.current) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      heartGroupRef.current.rotation.y += deltaX * 0.008;
      heartGroupRef.current.rotation.x += deltaY * 0.008;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Shock animation decay
      if (shockAnimRef.current > 0) {
        flashMat.opacity = shockAnimRef.current * 0.6;
        shockAnimRef.current -= 0.04;
        if (shockAnimRef.current < 0) shockAnimRef.current = 0;
      } else {
        flashMat.opacity = 0;
      }

      // Heartbeat dynamics based on condition and CPR
      if (heartGroupRef.current) {
        // Slow natural rotation
        heartGroupRef.current.rotation.y += 0.003;

        let scaleOsc = 1.0;
        const currentCond = conditionRef.current;
        const activeCpr = isCprActiveRef.current;
        const rateCpr = cprRateRef.current;

        if (activeCpr) {
          // Rhythmic CPR chest compressions (100–120 cpm)
          const cprFreq = (rateCpr / 60) * Math.PI * 2;
          const compression = Math.max(0, Math.sin(elapsed * cprFreq));
          scaleOsc = 1.0 - compression * 0.12;
        } else if (currentCond === 'normal') {
          // Normal sinusoidal lub-dub contraction
          const tNorm = elapsed * (72 / 60) * Math.PI * 2;
          const beat = Math.pow(Math.sin(tNorm), 6) * 0.08 + Math.pow(Math.sin(tNorm + 0.35), 8) * 0.05;
          scaleOsc = 1.0 + beat;
        } else if (currentCond === 'angina') {
          const tNorm = elapsed * (95 / 60) * Math.PI * 2;
          scaleOsc = 1.0 + Math.pow(Math.sin(tNorm), 6) * 0.07;
        } else if (currentCond === 'stemi') {
          // Tachycardic contractility with anterior wall hypokinesis
          const tNorm = elapsed * (110 / 60) * Math.PI * 2;
          scaleOsc = 1.0 + Math.pow(Math.sin(tNorm), 4) * 0.05;
        } else if (currentCond === 'nstemi') {
          const tNorm = elapsed * (86 / 60) * Math.PI * 2;
          scaleOsc = 1.0 + Math.pow(Math.sin(tNorm), 4) * 0.06;
        } else if (currentCond === 'vf') {
          // Chaotic high-frequency low-amplitude fibrillation tremor
          const jiggleX = (Math.sin(elapsed * 28) + Math.cos(elapsed * 45)) * 0.025;
          const jiggleY = (Math.cos(elapsed * 33) + Math.sin(elapsed * 51)) * 0.025;
          heartGroupRef.current.position.set(jiggleX, jiggleY, 0);
          scaleOsc = 1.0 + Math.sin(elapsed * 40) * 0.02;
        } else if (currentCond === 'pvt') {
          // Very rapid monomorphic tachycardia
          const tFast = elapsed * (220 / 60) * Math.PI * 2;
          scaleOsc = 1.0 + Math.sin(tFast) * 0.04;
        } else if (currentCond === 'asystole') {
          // Akinetic standstill
          scaleOsc = 1.0;
          heartGroupRef.current.position.set(0, 0, 0);
        }

        heartGroupRef.current.scale.set(scaleOsc, scaleOsc, scaleOsc);
      }

      // Render 3D frame
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
      if (rendererRef.current && rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update Dynamic Meshes on State Change
  useEffect(() => {
    if (thrombusMeshRef.current) {
      const scale = (occlusionPct / 100) * 1.5;
      thrombusMeshRef.current.scale.set(scale, scale, scale);
      thrombusMeshRef.current.visible = occlusionPct > 15 && showVessels;
    }

    if (ischemicMeshRef.current) {
      ischemicMeshRef.current.visible =
        showIschemiaZone &&
        (condition === 'stemi' ||
          condition === 'nstemi' ||
          condition === 'vf' ||
          condition === 'pvt' ||
          condition === 'asystole' ||
          occlusionPct > 60);

      // Adjust ischemia zone color intensity based on condition
      const mat = ischemicMeshRef.current.material as THREE.MeshStandardMaterial;
      if (condition === 'stemi' || condition === 'vf' || condition === 'asystole') {
        mat.color.setHex(0x0f172a); // dark cyanotic necrotic
        mat.opacity = 0.88;
      } else if (condition === 'nstemi') {
        mat.color.setHex(0x312e81); // subendocardial deep indigo
        mat.opacity = 0.65;
      } else {
        mat.color.setHex(0x4338ca);
        mat.opacity = 0.45;
      }
    }

    if (vesselGroupRef.current) {
      vesselGroupRef.current.visible = showVessels;
    }
  }, [condition, occlusionPct, showVessels, showIschemiaZone]);

  // 2. 2D REAL-TIME SYNCHRONIZED ECG MONITOR STRIP
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let xOffset = 0;
    const speed = 2.4;

    const drawGrid = () => {
      ctx.fillStyle = '#020617'; // deep obsidian
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ECG Grid Lines (0.2s large squares, 0.04s small squares)
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Calculate voltage at time t based on current rhythm
    const getVoltage = (t: number): number => {
      const activeCpr = isCprActiveRef.current;
      const rateCpr = cprRateRef.current;
      const currentCond = conditionRef.current;
      const currentCurData = curDataRef.current;

      if (activeCpr) {
        // CPR artifact: rhythmic sinusoidal compression spikes
        const cprPhase = (t * (rateCpr / 60) * 1.5) % 1;
        return Math.sin(cprPhase * Math.PI * 2) * 28 + (Math.random() - 0.5) * 6;
      }

      if (currentCond === 'asystole') {
        // Tiny baseline drift/noise
        return (Math.random() - 0.5) * 2;
      }

      if (currentCond === 'vf') {
        // Ventricular fibrillation: chaotic superposition of multiple unsynchronized sine waves
        return (
          Math.sin(t * 16) * 14 +
          Math.sin(t * 27) * 11 +
          Math.cos(t * 43) * 8 +
          (Math.random() - 0.5) * 6
        );
      }

      if (currentCond === 'pvt') {
        // Rapid regular wide monomorphic QRS without P or T waves
        const phase = (t * 3.6) % 1;
        if (phase < 0.35) {
          return Math.sin((phase / 0.35) * Math.PI) * 48;
        }
        return -Math.sin(((phase - 0.35) / 0.65) * Math.PI) * 22;
      }

      // Sinus Rhythms (Normal, Angina, STEMI, NSTEMI)
      const hr = currentCurData.defaultHr || 75;
      const period = 60 / hr;
      const cycle = (t % period) / period; // 0 to 1

      // Baseline isoelectric
      let v = 0;

      // P wave (Atrial Depolarization)
      if (cycle > 0.1 && cycle < 0.22) {
        v = Math.sin(((cycle - 0.1) / 0.12) * Math.PI) * 6;
      }
      // PR Segment (isoelectric)
      else if (cycle >= 0.22 && cycle < 0.28) {
        v = 0;
      }
      // Q Wave
      else if (cycle >= 0.28 && cycle < 0.3) {
        v = -5;
      }
      // R Wave (Ventricular Depolarization)
      else if (cycle >= 0.3 && cycle < 0.35) {
        v = 45;
      }
      // S Wave
      else if (cycle >= 0.35 && cycle < 0.38) {
        v = -14;
      }
      // ST Segment & T Wave (Ventricular Repolarization)
      else if (cycle >= 0.38 && cycle < 0.75) {
        const stProgress = (cycle - 0.38) / 0.37;

        if (currentCond === 'stemi') {
          // Tombstone massive ST-segment elevation (+25 units)
          v = 24 * Math.sin(stProgress * Math.PI) + 12;
        } else if (currentCond === 'nstemi') {
          // Horizontal ST depression (-12 units) with inverted T wave
          v = -10 - 8 * Math.sin(stProgress * Math.PI);
        } else if (currentCond === 'angina') {
          // ST depression (-8 units)
          v = -8 + 10 * Math.sin(stProgress * Math.PI);
        } else {
          // Normal isoelectric ST + upright gentle T wave
          v = 12 * Math.sin(stProgress * Math.PI);
        }
      }

      return v;
    };

    let tCount = 0;
    const points: number[] = new Array(canvas.width).fill(canvas.height / 2);

    const renderEcg = () => {
      animId = requestAnimationFrame(renderEcg);
      tCount += 0.016;

      drawGrid();

      // Push new voltage point
      const midY = canvas.height / 2;
      const v = getVoltage(tCount);
      const y = midY - v;

      points.shift();
      points.push(y);

      // Draw ECG trace
      const accent = curDataRef.current.accentColor;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(i, points[i]);
        else ctx.lineTo(i, points[i]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    renderEcg();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Derived Telemetry Metrics
  const calculatedCpp = useMemo(() => {
    if (isCprActive) {
      // During CPR, CPP depends on rate and depth
      return Math.round(12 + (cprRate / 120) * 8);
    }
    if (condition === 'normal') return 64;
    if (condition === 'angina') return 52;
    if (condition === 'stemi') return 24;
    if (condition === 'nstemi') return 38;
    return 0; // VF, pVT, Asystole
  }, [condition, isCprActive, cprRate]);

  const calculatedEtco2 = useMemo(() => {
    if (isCprActive) {
      return Math.round(18 + (calculatedCpp / 20) * 16);
    }
    if (condition === 'normal') return 38;
    if (condition === 'angina') return 37;
    if (condition === 'stemi') return 32;
    if (condition === 'nstemi') return 35;
    return 6; // arrest with minimal pulmonary flow
  }, [condition, isCprActive, calculatedCpp]);

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      {/* 1. LEFT MAIN 3D SIMULATOR VIEWPORT */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Viewport Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: curData.accentColor }}
            >
              <HeartCrack className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {curData.title[language]}
                </h2>
                {curData.shockable ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30">
                    SHOCKABLE
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">
                    NON-SHOCKABLE
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {curData.ecgFinding[language]}
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVessels(!showVessels)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showVessels
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'en' ? 'Coronary Tree' : 'Pohon Koroner'}
            </button>
            <button
              onClick={() => setShowIschemiaZone(!showIschemiaZone)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showIschemiaZone
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'en' ? 'Infarct Zone' : 'Zona Infark'}
            </button>
          </div>
        </div>

        {/* 3D Heart Canvas Container */}
        <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Defibrillation Shock Visual Flash Overlay */}
          {shockFlash && (
            <div className="absolute inset-0 bg-sky-300/40 backdrop-blur-xs flex items-center justify-center pointer-events-none transition-opacity duration-300">
              <div className="px-6 py-3 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-sky-400 shadow-2xl flex items-center gap-3">
                <Zap className="w-6 h-6 text-sky-500 transition-transform duration-300 scale-110" />
                <span className="font-mono text-sm font-black text-sky-600 dark:text-sky-400 tracking-wider">
                  200J BIPHASIC SHOCK DELIVERED • CONVERTED TO SINUS RHYTHM
                </span>
              </div>
            </div>
          )}

          {/* Live 3D Overlay Telemetry HUD */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs font-mono space-y-1 text-slate-300 pointer-events-none select-none">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">CPP Perfusion:</span>
              <span
                className={`font-bold ${calculatedCpp >= 15 ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {calculatedCpp} mmHg
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">ETCO2 Level:</span>
              <span
                className={`font-bold ${calculatedEtco2 >= 30 ? 'text-emerald-400' : 'text-amber-400'}`}
              >
                {calculatedEtco2} mmHg
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">hs-cTnI Troponin:</span>
              <span
                className={`font-bold ${troponinLevel > 50 ? 'text-rose-400' : 'text-slate-300'}`}
              >
                {troponinLevel} ng/L
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">LAD Stenosis:</span>
              <span className="font-bold text-slate-200">{occlusionPct}%</span>
            </div>
          </div>

          {/* 3D Viewport Hint */}
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800/80 backdrop-blur-xs">
            {language === 'en' ? 'Click & Drag to Rotate 3D Heart' : 'Klik & Geser untuk Memutar Jantung 3D'}
          </div>
        </div>

        {/* 2. REAL-TIME 12-LEAD SYNCHRONIZED ECG CANVAS STRIP */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-200 tracking-wider">
                LEAD II RHYTHM MONITOR STRIP (25 mm/s • 10 mm/mV)
              </span>
            </div>
            <span style={{ color: curData.accentColor }} className="font-bold">
              {isCprActive
                ? (language === 'en' ? 'CPR ARTIFACT WAVE' : 'GELOMBANG ARTEFAK RJP')
                : curData.title[language]}
            </span>
          </div>

          <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
            <canvas ref={ecgCanvasRef} width={750} height={96} className="w-full h-full block" />
          </div>
        </div>
      </div>

      {/* 2. RIGHT CLINICAL CONTROL CONSOLE */}
      <div className="w-full xl:w-[380px] flex flex-col gap-4">
        {/* RHYTHM / CONDITION SELECTOR */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'CARDIAC RHYTHM & PATHOLOGY' : 'IRAMA & PATOLOGI KARDIAK'}</span>
          </div>

          <div className="space-y-3">
            {CARDIAC_CATEGORIES.map((cat) => (
              <div key={cat.category.en} className="space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                  {cat.category[language]}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-1.5">
                  {cat.conditions.map((condKey) => {
                    const item = CARDIAC_CONDITIONS[condKey];
                    const isSelected = condition === condKey;
                    return (
                      <button
                        key={condKey}
                        onClick={() => handleSelectCondition(condKey)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold border-transparent shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="truncate pr-2">
                          <div className="truncate">{item.title[language]}</div>
                          <div
                            className={`text-[10px] truncate ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'}`}
                          >
                            {item.shockable
                              ? (language === 'en' ? 'Shockable Rhythm' : 'Irama Shockable')
                              : (language === 'en' ? 'Non-Shockable / Ischemia' : 'Non-Shockable / Iskemia')}
                          </div>
                        </div>
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.accentColor }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE EMERGENCY ACTIONS: DEFIBRILLATION & CPR */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <Radio className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'RESUSCITATION INTERVENTIONS' : 'INTERVENSI RESUSITASI'}</span>
          </div>

          {/* Defibrillation Shock Trigger */}
          <button
            onClick={handleDeliverShock}
            disabled={!curData.shockable && condition !== 'vf' && condition !== 'pvt'}
            className={`w-full py-3.5 px-4 rounded-xl font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer ${
              curData.shockable || condition === 'vf' || condition === 'pvt'
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>
              {language === 'en' ? 'DELIVER 200J BIPHASIC SHOCK' : 'BERIKAN KEJUT 200J BIFASIK'}
            </span>
          </button>

          {/* High-Quality CPR Mode Toggle */}
          <button
            onClick={() => setIsCprActive(!isCprActive)}
            className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              isCprActive
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <HeartCrack className="w-4 h-4" />
            <span>
              {isCprActive
                ? (language === 'en' ? 'ACTIVE CPR COMPRESSIONS (110 CPM)' : 'RJP AKTIF (110 CPM)')
                : (language === 'en' ? 'START CLOSED-CHEST CPR' : 'MULAI RJP KOMPRESI DADA')}
            </span>
          </button>

          {/* Coronary Occlusion Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span>{language === 'en' ? 'LAD Plaque Occlusion' : 'Oklusi Plak LAD'}</span>
              <span className="font-mono font-bold text-rose-500">{occlusionPct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={occlusionPct}
              onChange={(e) => setOcclusionPct(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        {/* GUIDELINE CLINICAL PEARL */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <Info className="w-4 h-4 text-sky-500" />
            <span>{language === 'en' ? 'ACLS / ESC Guideline Directives' : 'Panduan ACLS & ESC'}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            {curData.guidelineAction[language]}
          </p>
        </div>
      </div>
    </div>
  );
};
