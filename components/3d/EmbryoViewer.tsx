'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { Layers, Heart, Activity, Radio, Play, Pause, RotateCcw, Info, Sliders, Maximize2 } from 'lucide-react';

export type GestationalStage = 'w1' | 'w4' | 'w8' | 'w12' | 'w20' | 'w36';

interface StageData {
  key: GestationalStage;
  week: number;
  title: { en: string; id: string };
  period: { en: string; id: string };
  crl: string;
  weight: string;
  heartRate: string;
  milestones: { en: string[]; id: string[] };
  scale: number;
}

const STAGES: Record<GestationalStage, StageData> = {
  w1: {
    key: 'w1',
    week: 1,
    title: { en: 'Day 4–6: Blastocyst & Inner Cell Mass', id: 'Hari 4–6: Blastokista & Embrioblas' },
    period: { en: 'Pre-embryonic Cleavage', id: 'Pembelahan Pra-embrio' },
    crl: '0.15 mm',
    weight: '< 0.001 g',
    heartRate: 'None (Pre-vascular)',
    milestones: {
      en: [
        'Blastocyst cavity (blastocoel) expansion',
        'Segregation into outer trophoblast and inner pluripotent embryoblast',
        'Initial apposition to posterior uterine endometrium',
      ],
      id: [
        'Ekspansi rongga blastokista (blastosel)',
        'Pemisahan trofoblas luar dan embrioblas pluripoten dalam',
        'Awal perlekatan pada endometrium rahim posterior',
      ],
    },
    scale: 0.8,
  },
  w4: {
    key: 'w4',
    week: 4,
    title: { en: 'Week 4: C-Shaped Embryo & Heart Tube', id: 'Minggu 4: Embrio Melengkung-C & Tabung Jantung' },
    period: { en: 'Early Embryonic Gastrulation', id: 'Gastrulasi Embrio Awal' },
    crl: '4.0 mm',
    weight: '0.04 g',
    heartRate: '105 bpm (Peristaltic pumping)',
    milestones: {
      en: [
        'Closure of cranial and caudal neural tube',
        'Primitive peristaltic heart tube begins beating',
        '28 paired paraxial somites visible along embryonic axis',
      ],
      id: [
        'Penutupan tabung saraf kranial dan kaudal',
        'Tabung jantung primitif mulai berdenyut secara peristaltik',
        '28 pasang somit paraksial tampak di sepanjang sumbu embrio',
      ],
    },
    scale: 1.2,
  },
  w8: {
    key: 'w8',
    week: 8,
    title: { en: 'Week 8: Organogenesis & Digital Rays', id: 'Minggu 8: Organogenesis & Jari-Jari Tangan/Kaki' },
    period: { en: 'Late Embryonic Period', id: 'Akhir Periode Embrionik' },
    crl: '30 mm (3.0 cm)',
    weight: '1.0 g',
    heartRate: '160 bpm',
    milestones: {
      en: [
        'Apoptosis separates webbed digital rays into distinct fingers and toes',
        'Facial features merge: eye pigment, primitive eyelids, external ear pinna',
        'End of embryonic period; all essential organs present in rudimentary state',
      ],
      id: [
        'Apoptosis memisahkan jaringan interdigital menjadi jari tangan dan kaki',
        'Fitur wajah menyatu: pigmen mata, kelopak mata awal, daun telinga luar',
        'Akhir periode embrio; seluruh organ vital telah ada dalam bentuk awal',
      ],
    },
    scale: 1.6,
  },
  w12: {
    key: 'w12',
    week: 12,
    title: { en: 'Week 12: Primary Skeletal Ossification', id: 'Minggu 12: Osifikasi Tulang Primer' },
    period: { en: 'Early Fetal Period', id: 'Awal Periode Fetus' },
    crl: '60 mm (6.0 cm)',
    weight: '14 g',
    heartRate: '150 bpm',
    milestones: {
      en: [
        'Primary ossification centers appear in long bones and cranial base',
        'External genitalia differentiate; biological sex can be determined',
        'Fetus swallows amniotic fluid and produces primitive urine',
      ],
      id: [
        'Pusat osifikasi primer muncul di tulang panjang dan dasar tengkorak',
        'Genitalia eksternal berdiferensiasi; jenis kelamin dapat diidentifikasi',
        'Janin menelan cairan amnion dan mulai memproduksi urin primitif',
      ],
    },
    scale: 2.0,
  },
  w20: {
    key: 'w20',
    week: 20,
    title: { en: 'Week 20: Vernix, Lanugo & Quickening', id: 'Minggu 20: Verniks, Lanugo & Gerakan Janin' },
    period: { en: 'Mid-Gestation Second Trimester', id: 'Trimester Kedua Pertengahan' },
    crl: '160 mm (16.0 cm)',
    weight: '300 g',
    heartRate: '140 bpm',
    milestones: {
      en: [
        'Mother perceives active fetal kicking and rotations (quickening)',
        'Fine lanugo hair and protective waxy vernix caseosa coat the epidermis',
        'Brain undergoes rapid myelination and sensory neuron mapping',
      ],
      id: [
        'Ibu mulai merasakan tendangan dan gerakan aktif janin (quickening)',
        'Rambut halus lanugo dan lapisan lilin verniks kaseosa melindungi kulit',
        'Otak mengalami mielinisasi cepat dan pemetaan neuron sensorik',
      ],
    },
    scale: 2.4,
  },
  w36: {
    key: 'w36',
    week: 36,
    title: { en: 'Week 36+: Full Term Maturation & Birth Readiness', id: 'Minggu 36+: Kematangan Cukup Bulan & Siap Lahir' },
    period: { en: 'Late Third Trimester', id: 'Akhir Trimester Ketiga' },
    crl: '360 mm (36.0 cm)',
    weight: '2,800 g',
    heartRate: '130 bpm',
    milestones: {
      en: [
        'Alveolar surfactant reaches mature L/S ratio > 2.0 for breathing',
        'Subcutaneous adipose fat layer provides neonatal thermal insulation',
        'Cephalic vertex presentation into the maternal pelvic inlet',
      ],
      id: [
        'Surfaktan alveolus mencapai kematangan penuh (rasio L/S > 2.0) untuk bernapas',
        'Lapisan lemak subkutan memberikan isolasi termal bagi bayi baru lahir',
        'Posisi kepala di bawah (presentasi sefalik) masuk ke panggul ibu',
      ],
    },
    scale: 2.8,
  },
};

export const EmbryoViewer: React.FC = () => {
  const { language } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentStageKey, setCurrentStageKey] = useState<GestationalStage>('w8');
  const [showSkin, setShowSkin] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [showHeart, setShowHeart] = useState<boolean>(true);
  const [showAmnion, setShowAmnion] = useState<boolean>(false);
  const [isUltrasoundMode, setIsUltrasoundMode] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const heartMeshRef = useRef<THREE.Mesh | null>(null);

  const stageData = STAGES[currentStageKey];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 9);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Warm Anatomical Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff1e6, 1.8);
    mainLight.position.set(6, 8, 8);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.2);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    // Model root group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Mouse Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      modelGroup.rotation.y += dx * 0.007;
      modelGroup.rotation.x += dy * 0.007;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => (isDragging = false);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(4, Math.min(18, camera.position.z + e.deltaY * 0.01));
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.005;
      }

      // Heart pulsation animation (rhythmic heartbeat)
      if (heartMeshRef.current) {
        const bpmSpeed = currentStageKey === 'w4' ? 4 : currentStageKey === 'w8' ? 6 : 5;
        const pulse = 1 + 0.12 * Math.sin(elapsedTime * bpmSpeed);
        heartMeshRef.current.scale.set(pulse, pulse, pulse);
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

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
    };
  }, [isRotating, currentStageKey]);

  // Reconstruct 3D Anatomical Embryo Geometry when stage or layers change
  useEffect(() => {
    const group = modelGroupRef.current;
    if (!group) return;

    // Clear existing children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    const isUS = isUltrasoundMode;

    // Materials Palette (Anatomical vs Ultrasound Sonogram Mode)
    const skinMat = new THREE.MeshPhysicalMaterial({
      color: isUS ? 0x94a3b8 : 0xfbcfe8,
      roughness: isUS ? 0.8 : 0.35,
      metalness: 0.05,
      transmission: isUS ? 0 : 0.45,
      thickness: 0.8,
      transparent: true,
      opacity: isUS ? 0.85 : showSkin ? 0.85 : 0.12,
      wireframe: isUS,
      wireframeLinewidth: 1,
    });

    const boneMat = new THREE.MeshStandardMaterial({
      color: isUS ? 0xffffff : 0xfef08a,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: showSkeleton ? 0.95 : 0.05,
    });

    const heartMat = new THREE.MeshStandardMaterial({
      color: isUS ? 0x38bdf8 : 0xe11d48,
      emissive: isUS ? 0x0284c7 : 0x9f1239,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: showHeart ? 0.95 : 0.05,
    });

    // 1. STAGE: BLASTOCYST (Week 1 / Day 5)
    if (currentStageKey === 'w1') {
      // Outer spherical trophoblast shell
      const trophoGeo = new THREE.SphereGeometry(1.6, 32, 32);
      const trophoMat = new THREE.MeshPhysicalMaterial({
        color: isUS ? 0x64748b : 0xf472b6,
        transparent: true,
        opacity: 0.5,
        wireframe: isUS,
        transmission: 0.6,
      });
      group.add(new THREE.Mesh(trophoGeo, trophoMat));

      // Inner Cell Mass (Cluster of pluripotent embryoblast spheres)
      const icmGroup = new THREE.Group();
      icmGroup.position.set(0.6, 0.6, 0);
      for (let i = 0; i < 16; i++) {
        const cellGeo = new THREE.SphereGeometry(0.24, 16, 16);
        const cellMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4 });
        const cell = new THREE.Mesh(cellGeo, cellMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const rad = Math.random() * 0.45;
        cell.position.set(rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta), rad * Math.cos(phi));
        icmGroup.add(cell);
      }
      group.add(icmGroup);
    }

    // 2. STAGE: WEEK 4 (C-Shaped Embryo)
    else if (currentStageKey === 'w4') {
      // Curved C-shaped trunk curve
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 1.6, 0), // Cranial neural fold
        new THREE.Vector3(1.8, 1.2, 0),
        new THREE.Vector3(1.5, -1.4, 0),
        new THREE.Vector3(-0.6, -1.2, 0) // Caudal tail bud
      );

      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.55, 20, false);
      const trunkMesh = new THREE.Mesh(tubeGeo, skinMat);
      group.add(trunkMesh);

      // Cranial Head Bulge
      const headGeo = new THREE.SphereGeometry(0.85, 24, 24);
      headGeo.scale(1.1, 1.3, 1.0);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headMesh.position.set(0, 1.6, 0);
      group.add(headMesh);

      // Primitive Heart Bulge
      const heartGeo = new THREE.SphereGeometry(0.42, 20, 20);
      const heartMesh = new THREE.Mesh(heartGeo, heartMat);
      heartMesh.position.set(0.5, 0.4, 0.35);
      heartMeshRef.current = heartMesh;
      group.add(heartMesh);

      // Somites (Paraxial segmented blocks along curve)
      if (showSkeleton) {
        const somitesGroup = new THREE.Group();
        const points = curve.getPoints(24);
        points.forEach((p, idx) => {
          if (idx % 2 === 0) {
            const somGeo = new THREE.BoxGeometry(0.2, 0.15, 0.7);
            const somMesh = new THREE.Mesh(somGeo, boneMat);
            somMesh.position.copy(p);
            somitesGroup.add(somMesh);
          }
        });
        group.add(somitesGroup);
      }
    }

    // 3. STAGE: WEEK 8 - 36 (Full Morphological Body)
    else {
      const isLate = currentStageKey === 'w20' || currentStageKey === 'w36';

      // Head / Cranium
      const headGeo = new THREE.SphereGeometry(isLate ? 1.4 : 1.1, 32, 32);
      headGeo.scale(1.0, 1.2, 1.1);
      const head = new THREE.Mesh(headGeo, skinMat);
      head.position.set(0, 1.6, 0);
      group.add(head);

      // Facial Features (Optic vesicles, nose, jaw)
      const eyeGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1 });
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(0.45, 1.65, 0.95);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(-0.45, 1.65, 0.95);
      head.add(eyeL);
      head.add(eyeR);

      // Torso / Chest & Abdomen
      const torsoGeo = new THREE.CylinderGeometry(0.85, 0.95, 2.2, 32);
      const torso = new THREE.Mesh(torsoGeo, skinMat);
      torso.position.set(0, -0.2, 0);
      torso.rotation.x = 0.15;
      group.add(torso);

      // 4-Chamber Pulsating Heart
      const heartGeo = new THREE.SphereGeometry(0.38, 24, 24);
      const heartMesh = new THREE.Mesh(heartGeo, heartMat);
      heartMesh.position.set(0.15, 0.45, 0.45);
      heartMeshRef.current = heartMesh;
      group.add(heartMesh);

      // Limbs: Arms & Hands
      const armGeo = new THREE.CylinderGeometry(0.2, 0.18, 1.1, 16);
      const armL = new THREE.Mesh(armGeo, skinMat);
      armL.position.set(1.1, 0.2, 0.2);
      armL.rotation.z = -0.4;
      armL.rotation.x = 0.3;
      group.add(armL);

      const armR = new THREE.Mesh(armGeo, skinMat);
      armR.position.set(-1.1, 0.2, 0.2);
      armR.rotation.z = 0.4;
      armR.rotation.x = 0.3;
      group.add(armR);

      // Limbs: Legs & Feet
      const legGeo = new THREE.CylinderGeometry(0.25, 0.22, 1.3, 16);
      const legL = new THREE.Mesh(legGeo, skinMat);
      legL.position.set(0.65, -1.5, 0.4);
      legL.rotation.x = 0.6;
      legL.rotation.z = -0.2;
      group.add(legL);

      const legR = new THREE.Mesh(legGeo, skinMat);
      legR.position.set(-0.65, -1.5, 0.4);
      legR.rotation.x = 0.6;
      legR.rotation.z = 0.2;
      group.add(legR);

      // Skeletal Backbone / Ribcage
      if (showSkeleton) {
        const spineGroup = new THREE.Group();
        for (let i = 0; i < 12; i++) {
          const vertGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 12);
          const vert = new THREE.Mesh(vertGeo, boneMat);
          vert.position.set(0, 0.8 - i * 0.18, -0.45);
          spineGroup.add(vert);

          if (i > 2 && i < 10) {
            // Rib arcs
            const ribGeo = new THREE.TorusGeometry(0.65, 0.04, 8, 24, Math.PI);
            const rib = new THREE.Mesh(ribGeo, boneMat);
            rib.position.set(0, 0.8 - i * 0.18, 0);
            rib.rotation.x = Math.PI / 2;
            spineGroup.add(rib);
          }
        }
        group.add(spineGroup);
      }

      // Umbilical Cord
      const cordCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.4, 0.8),
        new THREE.Vector3(0.5, -0.8, 1.8),
        new THREE.Vector3(1.2, -1.2, 2.4),
      ]);
      const cordGeo = new THREE.TubeGeometry(cordCurve, 24, 0.15, 12, false);
      const cordMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
      const cord = new THREE.Mesh(cordGeo, cordMat);
      group.add(cord);
    }

    // 4. Amniotic Sac Membrane (Optional layer)
    if (showAmnion) {
      const amnionGeo = new THREE.SphereGeometry(3.6, 32, 32);
      amnionGeo.scale(1.0, 1.2, 1.1);
      const amnionMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.2,
        roughness: 0.1,
        transmission: 0.8,
        side: THREE.BackSide,
      });
      group.add(new THREE.Mesh(amnionGeo, amnionMat));
    }
  }, [currentStageKey, showSkin, showSkeleton, showHeart, showAmnion, isUltrasoundMode]);

  return (
    <div className="flex flex-col gap-4 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Header & Stage Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-mono">
              3D Gestational Morphogenesis
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'en' ? 'Interactive 3D Embryonic & Fetal Anatomy' : 'Anatomi 3D Janin & Embrio Interaktif'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en'
              ? 'Examine anatomical germ layer morphogenesis, organogenesis, cardiac looping, and ultrasound imaging.'
              : 'Teliti morfogenesis lapisan germinal, organogenesis, pembentukan jantung, dan visualisasi USG.'}
          </p>
        </div>

        {/* Ultrasound vs Anatomical Render Mode Switch */}
        <button
          onClick={() => setIsUltrasoundMode(!isUltrasoundMode)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isUltrasoundMode
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
          }`}
        >
          <Radio className={`w-4 h-4 ${isUltrasoundMode ? 'animate-pulse' : ''}`} />
          <span>{isUltrasoundMode ? 'Ultrasound (USG) Scan Active' : 'Switch to Ultrasound Mode'}</span>
        </button>
      </div>

      {/* Gestational Timeline Scrubber */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'en' ? 'Gestational Age Timeline' : 'Garis Waktu Usia Kehamilan'}
          </span>
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            {stageData.period[language]}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {(Object.keys(STAGES) as GestationalStage[]).map((key) => {
            const st = STAGES[key];
            const isSelected = currentStageKey === key;
            return (
              <button
                key={key}
                onClick={() => setCurrentStageKey(key)}
                className={`py-2 px-1 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-xs font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 font-medium'
                }`}
              >
                <div className="text-[10px] opacity-75">{st.week === 1 ? 'Day 5' : `Wk ${st.week}`}</div>
                <div className="text-xs truncate">{st.week === 1 ? 'Blastocyst' : `Week ${st.week}`}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Canvas Stage + Anatomical Metrics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Canvas Stage */}
        <div className="lg:col-span-3 relative h-[420px] sm:h-[480px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing canvas-container" />

          {/* Floating Stage Header Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-rose-400">
              {stageData.title[language]}
            </div>
            {isUltrasoundMode && (
              <div className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-700 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-ping" /> Sonogram Mode
              </div>
            )}
          </div>

          {/* Biometrics Callout Overlay */}
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-xs text-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">CRL:</span>
              <span className="font-mono font-bold text-rose-400">{stageData.crl}</span>
            </div>
            <div className="h-3 w-px bg-slate-700 mx-1" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">{language === 'en' ? 'Weight' : 'Berat'}:</span>
              <span className="font-mono font-bold text-emerald-400">{stageData.weight}</span>
            </div>
            <div className="h-3 w-px bg-slate-700 mx-1" />
            <div className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span className="font-mono font-bold text-rose-400">{stageData.heartRate}</span>
            </div>
          </div>

          {/* Rotation Control Buttons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md"
              title="Pause/Play Rotation"
            >
              {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Sidebar: Anatomical Layer Toggles & Milestones */}
        <div className="flex flex-col gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'en' ? 'Anatomical Layers' : 'Lapisan Anatomi'}
          </h4>

          {/* Layer Checkboxes */}
          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {language === 'en' ? 'Ectoderm & Surface Skin' : 'Ektoderm & Kulit Permukaan'}
              </span>
              <input
                type="checkbox"
                checked={showSkin}
                onChange={(e) => setShowSkin(e.target.checked)}
                className="w-4 h-4 rounded text-rose-500 accent-rose-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {language === 'en' ? 'Skeletal & Vertebral Axis' : 'Sumbu Rangka & Vertebra'}
              </span>
              <input
                type="checkbox"
                checked={showSkeleton}
                onChange={(e) => setShowSkeleton(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {language === 'en' ? 'Cardiovascular Heart Tube' : 'Jantung & Pembuluh Darah'}
              </span>
              <input
                type="checkbox"
                checked={showHeart}
                onChange={(e) => setShowHeart(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {language === 'en' ? 'Amniotic Sac & Fluid' : 'Kantung & Cairan Amnion'}
              </span>
              <input
                type="checkbox"
                checked={showAmnion}
                onChange={(e) => setShowAmnion(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 accent-sky-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Clinical Development Milestones */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
            <h5 className="font-bold text-slate-700 dark:text-slate-200">
              {language === 'en' ? 'Developmental Milestones' : 'Milestone Perkembangan'}
            </h5>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {stageData.milestones[language].map((m, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
