'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import {
  Activity,
  Gauge,
  Sliders,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Info,
  Layers,
  Heart,
  Pill,
  Sparkles,
} from 'lucide-react';

export type HypertensionType =
  | 'normotensive'
  | 'stage1'
  | 'stage2'
  | 'crisis_emergency'
  | 'renovascular'
  | 'isolated_systolic'
  | 'pheochromocytoma'
  | 'pulmonary_htn';

interface HypertensionDetails {
  key: HypertensionType;
  name: { en: string; id: string };
  categoryTag: { en: string; id: string };
  sbp: number;
  dbp: number;
  svr: number; // dynes·s/cm⁵ (normal 900–1400)
  pwv: number; // m/s (normal 5–7 m/s)
  mediaLumenRatio: number; // normal ~0.25
  pathophysiology: { en: string; id: string };
  guidelineAction: { en: string; id: string };
  color: string;
}

export const HTN_CONDITIONS: Record<HypertensionType, HypertensionDetails> = {
  normotensive: {
    key: 'normotensive',
    name: { en: 'Optimal Normotensive Baseline', id: 'Normotensi Fisiologis Optimal' },
    categoryTag: { en: 'Physiological', id: 'Fisiologis' },
    sbp: 118,
    dbp: 76,
    svr: 1100,
    pwv: 6.0,
    mediaLumenRatio: 0.25,
    pathophysiology: {
      en: 'Healthy vascular endothelium with abundant nitric oxide (NO) bioavailability, optimal media-to-lumen ratio, and elastic aortic Windkessel buffering.',
      id: 'Endotel vaskular sehat dengan bioavailabilitas NO tinggi, rasio media-lumen optimal, dan elastisitas peredam Windkessel aorta utuh.',
    },
    guidelineAction: {
      en: 'Maintain healthy lifestyle, low sodium diet (<2g/day), and regular aerobic exercise.',
      id: 'Pertahankan gaya hidup sehat, diet rendah natrium (<2g/hari), dan olahraga aerobik teratur.',
    },
    color: '#10b981', // emerald
  },
  stage1: {
    key: 'stage1',
    name: { en: 'Stage 1 Essential Hypertension', id: 'Hipertensi Esensial Derajat 1' },
    categoryTag: { en: 'Primary (Essential)', id: 'Primer (Esensial)' },
    sbp: 136,
    dbp: 86,
    svr: 1480,
    pwv: 8.2,
    mediaLumenRatio: 0.32,
    pathophysiology: {
      en: 'Early neurohumoral dysregulation, sympathetic overdrive, mild RAAS activation, and early eutrophic inward arteriolar remodeling.',
      id: 'Disregulasi neurohumoral dini, hiperaktivitas simpatis, aktivasi aksis RAAS ringan, dan remodeling arteriol eutrofik awal.',
    },
    guidelineAction: {
      en: 'Lifestyle modification for 3–6 months; initiate single-agent first-line therapy if 10-year ASCVD risk ≥10%.',
      id: 'Modifikasi gaya hidup 3–6 bulan; mulai terapi obat lini pertama bila risiko ASCVD 10-tahun ≥10%.',
    },
    color: '#f59e0b', // amber
  },
  stage2: {
    key: 'stage2',
    name: { en: 'Stage 2 Essential Hypertension', id: 'Hipertensi Esensial Derajat 2' },
    categoryTag: { en: 'Primary (Essential)', id: 'Primer (Esensial)' },
    sbp: 158,
    dbp: 98,
    svr: 1850,
    pwv: 10.5,
    mediaLumenRatio: 0.42,
    pathophysiology: {
      en: 'Established vascular hypertrophy, media smooth muscle proliferation, collagen deposition, and diminished endothelial NO bioavailability.',
      id: 'Hipertrofi vaskular menetap, proliferasi otot polos media, penimbunan kolagen, dan penurunan bioavailabilitas NO endotel.',
    },
    guidelineAction: {
      en: 'Mandates prompt dual combination therapy from different classes (e.g., ACEi/ARB + DHP-CCB).',
      id: 'Wajib terapi kombinasi ganda segera dari dua kelas berbeda (misalnya ACEi/ARB + DHP-CCB).',
    },
    color: '#f97316', // orange
  },
  crisis_emergency: {
    key: 'crisis_emergency',
    name: { en: 'Hypertensive Emergency (Crisis with TOD)', id: 'Hipertensi Emergensi (Krisis dengan TOD)' },
    categoryTag: { en: 'Hypertensive Crisis', id: 'Krisis Hipertensi' },
    sbp: 218,
    dbp: 132,
    svr: 2600,
    pwv: 15.8,
    mediaLumenRatio: 0.58,
    pathophysiology: {
      en: 'Vascular autoregulation failure. Extreme endothelial shear stress produces necrotizing arteriolitis, microangiopathy, and acute target organ injury.',
      id: 'Kegagalan total autoregulasi vaskular. Shear stress ekstrem memicu arteriolitis nekrotikans, mikroangiopati, dan kerusakan organ target akut.',
    },
    guidelineAction: {
      en: 'ADMIT TO ICU: Titrate parenteral IV antihypertensives (Nicardipine, Labetalol). Reduce MAP by max 20–25% in hour 1.',
      id: 'RAWAT ICU SEGERA: Titrasi obat antihipertensi IV (Nikardipin, Labetalol). Turunkan MAP maks 20–25% pada jam ke-1.',
    },
    color: '#dc2626', // red
  },
  renovascular: {
    key: 'renovascular',
    name: { en: 'Renovascular HTN (Renal Artery Stenosis)', id: 'Hipertensi Renovaskular (Stenosis Arteri Renalis)' },
    categoryTag: { en: 'Secondary Endocrine/Renal', id: 'Sekunder Endokrin/Renal' },
    sbp: 178,
    dbp: 106,
    svr: 2150,
    pwv: 11.8,
    mediaLumenRatio: 0.46,
    pathophysiology: {
      en: 'Unilateral/bilateral renal artery narrowing triggers massive juxtaglomerular renin hypersecretion (Goldblatt mechanism). Severe Ang II vasoconstriction.',
      id: 'Penyempitan arteri renalis memicu hipersekresi Renin jukstaglomerulus masif (mekanisme Goldblatt). Vasokonstriksi Ang II hebat.',
    },
    guidelineAction: {
      en: 'Screen with Renal Duplex Ultrasound/CTA. Balloon angioplasty for FMD; medical therapy with statins/CCB for ARAS.',
      id: 'Skrining USG Doppler Dupleks/CTA renal. Angioplasti balon untuk FMD; terapi medis dengan statin/CCB untuk ARAS.',
    },
    color: '#9333ea', // purple
  },
  isolated_systolic: {
    key: 'isolated_systolic',
    name: { en: 'Isolated Systolic Hypertension (Elderly)', id: 'Hipertensi Sistolik Terisolasi (Lansia)' },
    categoryTag: { en: 'Vascular Stiffening', id: 'Kekakuan Vaskular' },
    sbp: 174,
    dbp: 68,
    svr: 1680,
    pwv: 14.5,
    mediaLumenRatio: 0.44,
    pathophysiology: {
      en: 'Age-related elastin degradation, collagen cross-linking, and severe aortic stiffening. High PWV causes wave reflection in systole, creating wide pulse pressure (106 mmHg).',
      id: 'Degenerasi elastin dan ikatan silang kolagen aorta. PWV tinggi memicu gelombang pantul di akhir sistol, memperlebar tekanan nadi (106 mmHg).',
    },
    guidelineAction: {
      en: 'First-line therapy with DHP Calcium Channel Blockers (Amlodipine) or Thiazide-like Diuretics (Chlorthalidone).',
      id: 'Terapi lini pertama dengan CCB Dihidropiridin (Amlodipin) atau Diuretik serupa Tiazid (Klortalidon).',
    },
    color: '#0284c7', // light blue
  },
  pheochromocytoma: {
    key: 'pheochromocytoma',
    name: { en: 'Pheochromocytoma (Adrenergic Surge)', id: 'Feokromositoma (Lonjakan Adrenergik)' },
    categoryTag: { en: 'Secondary Neuroendocrine', id: 'Sekunder Neuroendokrin' },
    sbp: 235,
    dbp: 138,
    svr: 3100,
    pwv: 16.2,
    mediaLumenRatio: 0.52,
    pathophysiology: {
      en: 'Chromaffin cell neuroendocrine tumor hypersecreting norepinephrine/epinephrine. Intense alpha-1 vasoconstrictor storms and tachycardia.',
      id: 'Tumor neuroendokrin sel kromafin medula adrenal penyekresi norepinefrin berlebih. Badai vasokonstriksi alfa-1 hebat dan takikardia.',
    },
    guidelineAction: {
      en: 'MANDATORY RULE: Alpha-blocker FIRST (Phenoxybenzamine), then Beta-blocker. Surgical laparoscopic adrenalectomy.',
      id: 'ATURAN MUTLAK: Penyekat alfa TERLEBIH DAHULU (Fenoksibenzamin), baru Penyekat beta. Adrenalektomi bedah.',
    },
    color: '#b91c1c', // dark red
  },
  pulmonary_htn: {
    key: 'pulmonary_htn',
    name: { en: 'Pulmonary Arterial Hypertension (WHO Grp 1)', id: 'Hipertensi Arteri Pulmonal (Grup 1 WHO)' },
    categoryTag: { en: 'Pulmonary Vasculopathy', id: 'Vaskulopati Pulmonal' },
    sbp: 120, // systemic may be normal
    dbp: 80,
    svr: 1200,
    pwv: 7.2,
    mediaLumenRatio: 0.62, // severe pulmonary arteriolar medial hypertrophy
    pathophysiology: {
      en: 'Precapillary pulmonary arteriopathy with intimal hyperplasia, smooth muscle hypertrophy, and plexiform lesions. mPAP > 20 mmHg, PVR > 2 Wood units.',
      id: 'Arteriopati pulmonal prekapiler dengan hiperplasia intima, hipertrofi tunika media, dan lesi pleksiform. mPAP > 20 mmHg, PVR > 2 Wood unit.',
    },
    guidelineAction: {
      en: 'Targeted dual/triple combination: Endothelin Receptor Antagonist (Macitentan) + PDE-5 Inhibitor (Sildenafil) + Prostacyclin.',
      id: 'Kombinasi tertarget ganda/tiga: Antagonis Reseptor Endotelin (Masitentan) + Inhibitor PDE-5 (Sildenafil) + Prostasiklin.',
    },
    color: '#0d9488', // teal
  },
};

export const HypertensionVascularViewer: React.FC = () => {
  const { language } = useLearning();

  // Selected Condition & Interactive Overrides
  const [condition, setCondition] = useState<HypertensionType>('stage2');
  const [sbpOverride, setSbpOverride] = useState<number>(158);
  const [dbpOverride, setDbpOverride] = useState<number>(98);
  const [isDrugActive, setIsDrugActive] = useState<boolean>(false);
  const [showLayers, setShowLayers] = useState<boolean>(true);
  const [showRbcFlow, setShowRbcFlow] = useState<boolean>(true);

  // Canvas Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const vesselGroupRef = useRef<THREE.Group | null>(null);
  const intimaMeshRef = useRef<THREE.Mesh | null>(null);
  const mediaMeshRef = useRef<THREE.Mesh | null>(null);
  const adventitiaMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const curData = HTN_CONDITIONS[condition];

  // Effective Blood Pressure factoring in Antihypertensive therapy
  const effectiveSbp = useMemo(() => {
    return isDrugActive ? Math.round(sbpOverride * 0.78) : sbpOverride;
  }, [sbpOverride, isDrugActive]);

  const effectiveDbp = useMemo(() => {
    return isDrugActive ? Math.round(dbpOverride * 0.8) : dbpOverride;
  }, [dbpOverride, isDrugActive]);

  const effectiveMap = useMemo(() => {
    return Math.round(effectiveDbp + (1 / 3) * (effectiveSbp - effectiveDbp));
  }, [effectiveSbp, effectiveDbp]);

  const effectiveMapRef = useRef<number>(effectiveMap);
  useEffect(() => {
    effectiveMapRef.current = effectiveMap;
  }, [effectiveMap]);

  const pulsePressure = effectiveSbp - effectiveDbp;

  // Sync state when condition changes
  const handleSelectCondition = (type: HypertensionType) => {
    setCondition(type);
    const data = HTN_CONDITIONS[type];
    setSbpOverride(data.sbp);
    setDbpOverride(data.dbp);
    setIsDrugActive(false);
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
    camera.position.set(0, 1.6, 5.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    backLight.position.set(-5, -4, -4);
    scene.add(backLight);

    // Root Group
    const vesselGroup = new THREE.Group();
    vesselGroup.rotation.x = 0.35;
    vesselGroup.rotation.y = -0.4;
    vesselGroupRef.current = vesselGroup;
    scene.add(vesselGroup);

    // --- 3D ARTERIAL CROSS-SECTION (CYLINDRICAL LAYERS) ---
    // 1. Tunica Intima (Inner endothelial lining)
    const intimaGeo = new THREE.CylinderGeometry(0.85, 0.85, 3.2, 36, 1, true);
    const intimaMat = new THREE.MeshStandardMaterial({
      color: 0xfecdd3, // delicate pink endothelial sheen
      roughness: 0.25,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
    const intimaMesh = new THREE.Mesh(intimaGeo, intimaMat);
    intimaMeshRef.current = intimaMesh;
    vesselGroup.add(intimaMesh);

    // 2. Tunica Media (Vascular smooth muscle layer - changes thickness with remodeling)
    const mediaGeo = new THREE.CylinderGeometry(1.22, 1.22, 3.18, 36, 1, true);
    const mediaMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48, // muscular crimson red
      roughness: 0.45,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const mediaMesh = new THREE.Mesh(mediaGeo, mediaMat);
    mediaMeshRef.current = mediaMesh;
    vesselGroup.add(mediaMesh);

    // 3. Tunica Adventitia (Outer connective tissue sheath)
    const adventitiaGeo = new THREE.CylinderGeometry(1.45, 1.45, 3.16, 36, 1, true);
    const adventitiaMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // collagenous grayish-white
      roughness: 0.6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      wireframe: false,
    });
    const adventitiaMesh = new THREE.Mesh(adventitiaGeo, adventitiaMat);
    adventitiaMeshRef.current = adventitiaMesh;
    vesselGroup.add(adventitiaMesh);

    // Internal Elastic Lamina Rings (concentric rings showing elastic integrity)
    for (let i = -1.2; i <= 1.2; i += 0.4) {
      const ringGeo = new THREE.TorusGeometry(0.86, 0.015, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = i;
      vesselGroup.add(ring);
    }

    // --- BLOOD FLOW PARTICLES (ERYTHROCYTE STREAM) ---
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.sqrt(Math.random()) * 0.72;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2; // along cylinder axis
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Parabolic laminar flow: faster velocity at center, slower near wall
      const rRatio = radius / 0.72;
      velocities[i] = 1.0 - rRatio * rRatio;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xff3b30,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    vesselGroup.add(particles);

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
      if (!isDragging || !vesselGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      vesselGroupRef.current.rotation.y += deltaX * 0.008;
      vesselGroupRef.current.rotation.x += deltaY * 0.008;
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
      if (!isDragging || e.touches.length !== 1 || !vesselGroupRef.current) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      vesselGroupRef.current.rotation.y += deltaX * 0.008;
      vesselGroupRef.current.rotation.x += deltaY * 0.008;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Pulsatile Vessel Wall Movement (systolic distension)
      if (vesselGroupRef.current) {
        // Pulse frequency proportional to heart rate (~75 bpm)
        const pulse = 1.0 + Math.sin(elapsed * 7.5) * 0.035;
        intimaMesh.scale.set(pulse, 1.0, pulse);
        mediaMesh.scale.set(pulse, 1.0, pulse);
      }

      // Move Blood Flow Particles
      if (particlesRef.current) {
        const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const posArr = posAttr.array as Float32Array;

        // Flow speed driven by MAP / SVR
        const baseSpeed = (effectiveMapRef.current / 100) * 1.8;

        for (let i = 0; i < particleCount; i++) {
          const vFactor = velocities[i];
          posArr[i * 3 + 1] += baseSpeed * vFactor * delta;

          // Recycle particle when exiting top of cylinder
          if (posArr[i * 3 + 1] > 1.6) {
            posArr[i * 3 + 1] = -1.6;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

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

  // Adjust Visual Wall Thickness Based on Remodeling / Drug
  useEffect(() => {
    if (!mediaMeshRef.current || !intimaMeshRef.current) return;

    // Remodeling ratio increases media wall thickness while compressing internal lumen
    const ratio = curData.mediaLumenRatio;
    const drugAdjustment = isDrugActive ? -0.12 : 0;
    const activeRatio = Math.max(0.2, ratio + drugAdjustment);

    // Media thickness scaling
    const mediaScale = 1.0 + (activeRatio - 0.25) * 1.2;
    mediaMeshRef.current.scale.set(mediaScale, 1.0, mediaScale);

    // Colors: Hypertensive stress turns media deeper dark crimson
    const mediaMat = mediaMeshRef.current.material as THREE.MeshStandardMaterial;
    if (condition === 'crisis_emergency' || condition === 'pheochromocytoma') {
      mediaMat.color.setHex(0x881337); // ischemic dark crimson
    } else if (condition === 'isolated_systolic') {
      mediaMat.color.setHex(0xb91c1c);
    } else {
      mediaMat.color.setHex(0xe11d48);
    }

    if (particlesRef.current) {
      particlesRef.current.visible = showRbcFlow;
    }
  }, [condition, curData, isDrugActive, showRbcFlow]);

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      {/* 1. MAIN 3D ARTERIAL CROSS-SECTION VIEWPORT */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Top Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: curData.color }}
            >
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {curData.name[language]}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {curData.categoryTag[language]}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? `Clinical Target: ${effectiveSbp}/${effectiveDbp} mmHg (MAP ${effectiveMap} mmHg)`
                  : `Tekanan Klinis: ${effectiveSbp}/${effectiveDbp} mmHg (MAP ${effectiveMap} mmHg)`}
              </p>
            </div>
          </div>

          {/* Quick Display Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRbcFlow(!showRbcFlow)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showRbcFlow
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'en' ? 'Erythrocyte Stream' : 'Aliran Eritrosit'}
            </button>
            <button
              onClick={() => setIsDrugActive(!isDrugActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                isDrugActive
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>
                {isDrugActive
                  ? (language === 'en' ? 'Antihypertensive Active (-20%)' : 'Antihipertensi Aktif (-20%)')
                  : (language === 'en' ? 'Apply First-Line Drug' : 'Berikan Obat Lini-1')}
              </span>
            </button>
          </div>
        </div>

        {/* 3D Arterial Canvas */}
        <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Telemetry HUD */}
          <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300 pointer-events-none select-none">
            <div className="flex items-center justify-between gap-5">
              <span className="text-slate-500">Blood Pressure:</span>
              <span className="font-bold text-white">
                {effectiveSbp} / {effectiveDbp} mmHg
              </span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="text-slate-500">Mean Arterial (MAP):</span>
              <span
                className={`font-bold ${effectiveMap > 130 ? 'text-rose-400' : effectiveMap > 105 ? 'text-amber-400' : 'text-emerald-400'}`}
              >
                {effectiveMap} mmHg
              </span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="text-slate-500">Pulse Pressure:</span>
              <span
                className={`font-bold ${pulsePressure > 60 ? 'text-sky-400' : 'text-slate-300'}`}
              >
                {pulsePressure} mmHg
              </span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="text-slate-500">Pulse Wave Vel (PWV):</span>
              <span
                className={`font-bold ${curData.pwv > 10 ? 'text-rose-400' : 'text-slate-300'}`}
              >
                {curData.pwv} m/s
              </span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="text-slate-500">Media/Lumen Ratio:</span>
              <span className="font-bold text-slate-300">{curData.mediaLumenRatio}</span>
            </div>
          </div>

          {/* Anatomical Layer Annotation */}
          <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-200" />
              <span>Tunica Intima (Endothelium)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Tunica Media (VSMCs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Tunica Adventitia</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800/80 backdrop-blur-xs">
            {language === 'en' ? 'Click & Drag to Rotate Arteriole' : 'Klik & Geser untuk Memutar Arteriol'}
          </div>
        </div>

        {/* Dynamic Pathology Overview */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Info className="w-4 h-4 text-sky-500" />
            <span>{language === 'en' ? 'Vascular Pathophysiology Analysis' : 'Analisis Patofisiologi Vaskular'}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {curData.pathophysiology[language]}
          </p>
        </div>
      </div>

      {/* 2. RIGHT CLINICAL CONTROL PANEL */}
      <div className="w-full xl:w-[380px] flex flex-col gap-4">
        {/* HYPERTENSION TYPE SELECTOR */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'HYPERTENSIVE PHENOTYPES' : 'FENOTIPE HIPERTENSI'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
            {(Object.keys(HTN_CONDITIONS) as HypertensionType[]).map((key) => {
              const item = HTN_CONDITIONS[key];
              const isSelected = condition === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectCondition(key)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold border-transparent shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="truncate">{item.name[language]}</div>
                    <div
                      className={`text-[10px] truncate ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400'}`}
                    >
                      {item.sbp}/{item.dbp} mmHg • {item.categoryTag[language]}
                    </div>
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* HEMODYNAMIC PARAMETER SLIDERS */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
            <Gauge className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'HEMODYNAMIC PARAMETERS' : 'PARAMETER HEMODINAMIKA'}</span>
          </div>

          {/* SBP Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span>{language === 'en' ? 'Systolic Blood Pressure (SBP)' : 'Tekanan Darah Sistolik (TDS)'}</span>
              <span className="font-mono font-bold text-rose-500">{sbpOverride} mmHg</span>
            </div>
            <input
              type="range"
              min={90}
              max={240}
              value={sbpOverride}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSbpOverride(val);
                if (val <= dbpOverride) {
                  setDbpOverride(Math.max(40, val - 10));
                }
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* DBP Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span>{language === 'en' ? 'Diastolic Blood Pressure (DBP)' : 'Tekanan Darah Diastolik (TDD)'}</span>
              <span className="font-mono font-bold text-indigo-500">{dbpOverride} mmHg</span>
            </div>
            <input
              type="range"
              min={50}
              max={150}
              value={dbpOverride}
              onChange={(e) => {
                const val = Number(e.target.value);
                setDbpOverride(val);
                if (val >= sbpOverride) {
                  setSbpOverride(Math.min(260, val + 10));
                }
              }}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Reset button */}
          <button
            onClick={() => handleSelectCondition(condition)}
            className="w-full py-2 px-3 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Reset to Preset' : 'Reset ke Setelan Awal'}</span>
          </button>
        </div>

        {/* GUIDELINE CLINICAL ACTION CARD */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>{language === 'en' ? 'AHA / ESC Guideline Directives' : 'Pedoman Klinis AHA & ESC'}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            {curData.guidelineAction[language]}
          </p>
        </div>
      </div>
    </div>
  );
};
