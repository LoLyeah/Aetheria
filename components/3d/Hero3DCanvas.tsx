'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import { TopicId } from '@/types/learning';
import {
  Atom,
  HeartPulse,
  Zap,
  Rotate3d,
  Layers,
  Gauge,
  Sparkles,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Sliders,
  ChevronRight,
  ChevronDown,
  Check,
  Eye,
  Activity,
  HeartCrack,
  X,
  Info,
} from 'lucide-react';
import { attachCanvasControls } from '@/lib/canvasControls';

interface Hero3DCanvasProps {
  activeTopicId?: TopicId;
}

type RenderStyle = 'holographic' | 'pbr' | 'quantum-flux';

interface TopicOption {
  id: TopicId;
  label: { en: string; id: string };
  category: { en: string; id: string };
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: 'quantum-mechanics',
    label: { en: 'Quantum Physics', id: 'Fisika Kuantum' },
    category: { en: 'Atomic Orbitals & Spin', id: 'Orbital Atom & Spin' },
    icon: Atom,
    accentColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/20',
  },
  {
    id: 'fetus-development',
    label: { en: 'Embryonic Biology', id: 'Biologi Embrio' },
    category: { en: 'Morphogenesis & Carnegie Stages', id: 'Morfogenesis & Carnegie Stage' },
    icon: HeartPulse,
    accentColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/20',
  },
  {
    id: 'ev-battery',
    label: { en: 'EV 4680 Powertrain', id: 'Powertrain EV 4680' },
    category: { en: 'Electrochemistry & Jellyroll', id: 'Elektrokimia & Jellyroll' },
    icon: Zap,
    accentColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20',
  },
  {
    id: 'pulmonology-pneumonia',
    label: { en: 'Pulmonary Alveoli', id: 'Alveoli Paru & Pneumonia' },
    category: { en: 'Alveolar Gas Exchange', id: 'Pertukaran Gas Alveolar' },
    icon: Activity,
    accentColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/20',
  },
  {
    id: 'cardiac-arrest',
    label: { en: 'Cardiac Arrest & STEMI', id: 'Henti Jantung & STEMI' },
    category: { en: 'Hemodynamics & Resuscitation', id: 'Hemodinamika & Resusitasi' },
    icon: HeartCrack,
    accentColor: 'text-red-400',
    badgeBg: 'bg-red-500/20',
  },
  {
    id: 'hypertension',
    label: { en: 'Hypertension', id: 'Hipertensi Vaskular' },
    category: { en: 'Vascular Hemodynamics & SVR', id: 'Hemodinamika Vaskular & SVR' },
    icon: Gauge,
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/20',
  },
];

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  activeTopicId = 'quantum-mechanics',
}) => {
  const { language, navigateTo } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicId>(activeTopicId);
  const [prevActiveTopicId, setPrevActiveTopicId] = useState<TopicId>(activeTopicId);
  if (activeTopicId !== prevActiveTopicId) {
    setPrevActiveTopicId(activeTopicId);
    setSelectedTopic(activeTopicId);
  }
  const [renderStyle, setRenderStyle] = useState<RenderStyle>('holographic');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [particleDensity, setParticleDensity] = useState<'normal' | 'ultra'>('normal');
  const [fps, setFps] = useState<number>(60);
  const [showTelemetry, setShowTelemetry] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside and Escape key handler for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentTopicData = useMemo(() => {
    return TOPIC_OPTIONS.find((t) => t.id === selectedTopic) || TOPIC_OPTIONS[0];
  }, [selectedTopic]);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const animatedObjectsRef = useRef<{
    rotators: THREE.Object3D[];
    pulsers: { mesh: THREE.Mesh | THREE.Points; baseScale: number; speed: number }[];
    particles?: THREE.Points;
    explodedMeshes?: { mesh: THREE.Object3D; originalPos: THREE.Vector3; explodedPos: THREE.Vector3 }[];
  }>({ rotators: [], pulsers: [], explodedMeshes: [] });

  // State refs for animation loop
  const speedRef = useRef(simSpeed);
  const autoRotateRef = useRef(isAutoRotating);
  const explodedRef = useRef(isExploded);

  useEffect(() => {
    speedRef.current = simSpeed;
  }, [simSpeed]);

  useEffect(() => {
    autoRotateRef.current = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    explodedRef.current = isExploded;
  }, [isExploded]);

  // Initialize Three.js Engine
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 2.5, 30);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(0xf43f5e, 1.8, 30);
    accentLight.position.set(5, -5, -4);
    scene.add(accentLight);

    const masterGroup = new THREE.Group();
    masterGroupRef.current = masterGroup;
    scene.add(masterGroup);

    // Interactive Drag / Orbit Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetZoom = 9.0;
    let currentZoom = 9.0;

    container.setAttribute('role', 'region');
    container.setAttribute(
      'aria-label',
      'Interactive 3D Scientific Showcase. Use arrow keys or WASD to orbit, plus and minus to zoom, Space to toggle auto-rotation, R to reset camera.'
    );

    const detachControls = attachCanvasControls(container, {
      onRotate: (deltaX, deltaY) => {
        targetRotY += deltaX;
        targetRotX += deltaY;
        targetRotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotX));
      },
      onZoom: (deltaZoom) => {
        targetZoom += deltaZoom * 0.6;
        targetZoom = Math.max(4.0, Math.min(14.0, targetZoom));
      },
      onReset: () => {
        targetRotX = 0;
        targetRotY = 0;
        targetZoom = 9.0;
      },
      onToggleAutoRotate: () => {
        setIsAutoRotating((prev) => !prev);
      },
      onDragStateChange: (dragging) => {
        isDragging = dragging;
      },
    });

    // Render loop & FPS telemetry
    let animId: number;
    let lastFrameTime = 0;
    let elapsedTime = 0;
    let frameCount = 0;
    let lastFpsTime = 0;

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);

      if (lastFrameTime === 0) {
        lastFrameTime = timestamp;
        lastFpsTime = timestamp;
      }

      // Spike-safe delta (cap at 100ms in case of tab-switching)
      const rawDelta = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
      lastFrameTime = timestamp;
      elapsedTime += rawDelta;
      const time = elapsedTime * speedRef.current;

      // Auto-rotation
      if (autoRotateRef.current && !isDragging) {
        targetRotY += 0.006 * speedRef.current;
      }

      // Smooth damping for rotation
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      masterGroup.rotation.x = currentRotX;
      masterGroup.rotation.y = currentRotY;

      // Smooth damping for zoom
      currentZoom += (targetZoom - currentZoom) * 0.08;
      camera.position.z = currentZoom;
      camera.lookAt(0, 0, 0);

      // Animate rotators & wave pulsers
      const anims = animatedObjectsRef.current;
      anims.rotators.forEach((obj, idx) => {
        obj.rotation.z += 0.01 * (idx % 2 === 0 ? 1 : -1) * speedRef.current;
        obj.rotation.x += 0.005 * speedRef.current;
      });

      anims.pulsers.forEach((p) => {
        const scale = p.baseScale * (1 + Math.sin(time * p.speed) * 0.06);
        p.mesh.scale.set(scale, scale, scale);
      });

      // Explode interpolation
      if (anims.explodedMeshes && anims.explodedMeshes.length > 0) {
        anims.explodedMeshes.forEach((item) => {
          const dest = explodedRef.current ? item.explodedPos : item.originalPos;
          item.mesh.position.lerp(dest, 0.08);
        });
      }

      renderer.render(scene, camera);

      // Measure FPS
      frameCount++;
      if (timestamp - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (timestamp - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = timestamp;
      }
    };

    animate(0);

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
      detachControls();
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  // Rebuild 3D Scientific Geometry on Topic, Render Style, or Particle Density Change
  useEffect(() => {
    const group = masterGroupRef.current;
    if (!group) return;

    // Reset animation list
    animatedObjectsRef.current = { rotators: [], pulsers: [], explodedMeshes: [] };

    // Clean previous children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    const isWire = renderStyle === 'holographic';
    const isFlux = renderStyle === 'quantum-flux';
    const pointCount = particleDensity === 'ultra' ? 6500 : 3200;

    // -------------------------------------------------------------
    // TOPIC 1: QUANTUM SUPERPOSITION & ATOMIC ORBITAL HARMONICS
    // -------------------------------------------------------------
    if (selectedTopic === 'quantum-mechanics') {
      // 1. Quantum Nucleus Cluster (Protons & Neutrons)
      const nucleusGroup = new THREE.Group();
      const nucleonGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const protonMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8,
        roughness: 0.1,
      });
      const neutronMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x4338ca,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });

      const positions = [
        [0, 0, 0],
        [0.2, 0.1, 0],
        [-0.2, -0.1, 0.1],
        [0.1, -0.2, -0.1],
        [-0.1, 0.2, -0.1],
        [0, 0, 0.25],
        [0, 0, -0.25],
      ];

      positions.forEach(([x, y, z], idx) => {
        const sphere = new THREE.Mesh(nucleonGeo, idx % 2 === 0 ? protonMat : neutronMat);
        sphere.position.set(x, y, z);
        nucleusGroup.add(sphere);
      });
      group.add(nucleusGroup);
      animatedObjectsRef.current.pulsers.push({ mesh: nucleusGroup as any, baseScale: 1.0, speed: 2.0 });

      // 2. Quantum d_z^2 Spherical Harmonic Orbital Lobes
      const lobeGeo = new THREE.SphereGeometry(1.15, 32, 32);
      lobeGeo.scale(0.72, 1.45, 0.72);

      const lobeMat1 = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transmission: isWire ? 0 : 0.85,
        opacity: isWire ? 0.4 : 0.75,
        transparent: true,
        wireframe: isWire,
        roughness: 0.1,
        ior: 1.4,
      });
      const lobe1 = new THREE.Mesh(lobeGeo, lobeMat1);
      lobe1.position.set(0, 1.25, 0);

      const lobeMat2 = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transmission: isWire ? 0 : 0.85,
        opacity: isWire ? 0.4 : 0.75,
        transparent: true,
        wireframe: isWire,
        roughness: 0.1,
        ior: 1.4,
      });
      const lobe2 = new THREE.Mesh(lobeGeo, lobeMat2);
      lobe2.position.set(0, -1.25, 0);
      lobe2.rotation.x = Math.PI;

      group.add(lobe1);
      group.add(lobe2);

      // Toroidal Equatorial Donut Ring (Node of d_z^2)
      const donutGeo = new THREE.TorusGeometry(1.3, 0.22, 24, 64);
      const donutMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: isWire ? 0.5 : 0.8,
        wireframe: isWire,
        roughness: 0.2,
      });
      const donut = new THREE.Mesh(donutGeo, donutMat);
      donut.rotation.x = Math.PI / 2;
      group.add(donut);

      // 3. Quantized Orbital Energy Shell Rings
      for (let i = 0; i < 3; i++) {
        const rGeo = new THREE.TorusGeometry(2.4 + i * 0.5, 0.02, 16, 80);
        const rMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.4 - i * 0.08,
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        group.add(ring);
        animatedObjectsRef.current.rotators.push(ring);
      }

      // 4. Wave Probability Density Particle Cloud
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        // Probability distribution peaked along z axis
        const cosPhi = Math.cos(phi);
        const prob = Math.pow(3 * cosPhi * cosPhi - 1, 2);
        const r = 0.5 + Math.random() * 2.8 * (0.3 + 0.7 * prob);
        const sinPhi = Math.sin(phi);

        pPos[i * 3] = r * sinPhi * Math.cos(theta);
        pPos[i * 3 + 1] = r * cosPhi;
        pPos[i * 3 + 2] = r * sinPhi * Math.sin(theta);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: isFlux ? 0x00f0ff : 0x38bdf8,
        size: isFlux ? 0.07 : 0.045,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeo, pMat);
      group.add(points);

      // Register exploded coordinates
      animatedObjectsRef.current.explodedMeshes?.push(
        { mesh: lobe1, originalPos: new THREE.Vector3(0, 1.4, 0), explodedPos: new THREE.Vector3(0, 2.6, 0) },
        { mesh: lobe2, originalPos: new THREE.Vector3(0, -1.4, 0), explodedPos: new THREE.Vector3(0, -2.6, 0) },
        { mesh: donut, originalPos: new THREE.Vector3(0, 0, 0), explodedPos: new THREE.Vector3(0, 0, 0) }
      );
    }

    // -------------------------------------------------------------
    // TOPIC 2: EMBRYONIC MORPHOGENESIS & CELLULAR CLEAVAGE
    // -------------------------------------------------------------
    else if (selectedTopic === 'fetus-development') {
      // 1. Cleavage Blastomere Cluster (4-Cell to 8-Cell Stage with Translucent Membranes)
      const cellGeo = new THREE.SphereGeometry(1.05, 32, 32);
      const cellMat = new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        emissive: 0xbe123c,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        transmission: isWire ? 0 : 0.8,
        transparent: true,
        opacity: isWire ? 0.4 : 0.88,
        wireframe: isWire,
        ior: 1.35,
        clearcoat: 0.8,
      });

      const cellCoords = [
        [0.75, 0.75, 0.75],
        [-0.75, 0.75, -0.75],
        [0.75, -0.75, -0.75],
        [-0.75, -0.75, 0.75],
        [0.75, 0.75, -0.75],
        [-0.75, 0.75, 0.75],
      ];

      cellCoords.forEach(([x, y, z], idx) => {
        const cell = new THREE.Mesh(cellGeo, cellMat);
        cell.position.set(x * 0.9, y * 0.9, z * 0.9);
        group.add(cell);

        // Internal Nucleus
        const nGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const nMat = new THREE.MeshStandardMaterial({
          color: 0xfb7185,
          emissive: 0xe11d48,
          emissiveIntensity: 0.9,
          roughness: 0.1,
        });
        const nucleus = new THREE.Mesh(nGeo, nMat);
        cell.add(nucleus);

        animatedObjectsRef.current.explodedMeshes?.push({
          mesh: cell,
          originalPos: new THREE.Vector3(x * 0.9, y * 0.9, z * 0.9),
          explodedPos: new THREE.Vector3(x * 1.9, y * 1.9, z * 1.9),
        });
      });

      // 2. Translucent Zona Pellucida (Outer Protective Glycoprotein Capsule)
      const zonaGeo = new THREE.SphereGeometry(2.35, 32, 32);
      const zonaMat = new THREE.MeshPhysicalMaterial({
        color: 0xffe4e6,
        transparent: true,
        opacity: isWire ? 0.3 : 0.25,
        wireframe: isWire,
        transmission: 0.9,
        roughness: 0.1,
        depthWrite: false,
      });
      const zona = new THREE.Mesh(zonaGeo, zonaMat);
      group.add(zona);
      animatedObjectsRef.current.pulsers.push({ mesh: zona, baseScale: 1.0, speed: 1.5 });

      // 3. Morphogen Gradient & Extracellular Fluid Particle Flow
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount; i++) {
        const rad = 2.4 + Math.random() * 1.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        pPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = rad * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xfb7185,
        size: 0.05,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(pGeo, pMat));
    }

    // -------------------------------------------------------------
    // TOPIC 3: EV 4680 BATTERY CELL & POWERTRAIN DYNAMICS
    // -------------------------------------------------------------
    else if (selectedTopic === 'ev-battery') {
      // 1. 4680 Steel Casing (Cutaway / Wireframe)
      const canGeo = new THREE.CylinderGeometry(1.6, 1.6, 3.4, 40, 1, true);
      const canMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.85,
        roughness: 0.2,
        wireframe: isWire,
        side: THREE.DoubleSide,
      });
      const can = new THREE.Mesh(canGeo, canMat);
      group.add(can);

      // 2. Concentric Jellyroll Spiral Electrode Layers (Cathode & Anode)
      const jellyLayers = 4;
      for (let i = 0; i < jellyLayers; i++) {
        const jGeo = new THREE.CylinderGeometry(0.35 + i * 0.32, 0.35 + i * 0.32, 3.2, 32, 1, true);
        const jMat = new THREE.MeshPhysicalMaterial({
          color: i % 2 === 0 ? 0x34d399 : 0x059669,
          emissive: i % 2 === 0 ? 0x059669 : 0x047857,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: isWire ? 0.4 : 0.8,
          wireframe: isWire,
          side: THREE.DoubleSide,
        });
        const layer = new THREE.Mesh(jGeo, jMat);
        group.add(layer);

        animatedObjectsRef.current.explodedMeshes?.push({
          mesh: layer,
          originalPos: new THREE.Vector3(0, 0, 0),
          explodedPos: new THREE.Vector3(0, (i - 1.5) * 1.1, 0),
        });
      }

      // 3. Tabless Current Collector Cap (Top Anode Crown)
      const capGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.2, 32);
      const capMat = new THREE.MeshStandardMaterial({ color: 0x6ee7b7, metalness: 0.9, roughness: 0.1 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(0, 1.75, 0);
      group.add(cap);

      // 4. Electromagnetic Stator Flux Rings
      for (let i = 0; i < 3; i++) {
        const fluxGeo = new THREE.TorusGeometry(2.3 + i * 0.4, 0.03, 16, 60);
        fluxGeo.rotateX(Math.PI / 2);
        const fluxMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 - i * 0.15 });
        const ring = new THREE.Mesh(fluxGeo, fluxMat);
        ring.position.y = (i - 1) * 0.9;
        group.add(ring);
        animatedObjectsRef.current.rotators.push(ring);
      }

      // 5. Li+ Ion Fast Diffusion Stream (Moving Particles)
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount; i++) {
        const r = Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        pPos[i * 3] = r * Math.cos(theta);
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
        pPos[i * 3 + 2] = r * Math.sin(theta);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: isFlux ? 0x00ffcc : 0x10b981,
        size: isFlux ? 0.08 : 0.05,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(pGeo, pMat));

      animatedObjectsRef.current.explodedMeshes?.push({
        mesh: cap,
        originalPos: new THREE.Vector3(0, 1.75, 0),
        explodedPos: new THREE.Vector3(0, 3.2, 0),
      });
    }

    // -------------------------------------------------------------
    // TOPIC 4: PULMONOLOGY, ALVEOLAR SACS & PNEUMONIA CONSOLIDATION
    // -------------------------------------------------------------
    if (selectedTopic === 'pulmonology-pneumonia') {
      // 1. Terminal Bronchiole Airway
      const bronchioleGeo = new THREE.CylinderGeometry(0.28, 0.42, 1.5, 20, 1, true);
      const bronchioleMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.35,
        wireframe: isWire,
      });
      const bronchiole = new THREE.Mesh(bronchioleGeo, bronchioleMat);
      bronchiole.position.set(0, 1.85, 0);
      group.add(bronchiole);

      // 2. Alveolar Acinus (Cluster of 6 interconnected micro-sacs)
      const sacCenters: [number, number, number][] = [
        [0, 0.1, 0],
        [-0.8, -0.2, 0.5],
        [0.8, -0.2, 0.5],
        [-0.8, -0.4, -0.5],
        [0.8, -0.4, -0.5],
        [0, -0.9, 0],
      ];

      const sacMat = new THREE.MeshPhysicalMaterial({
        color: isFlux ? 0xf43f5e : 0xfb7185,
        roughness: 0.15,
        transmission: isWire ? 0 : 0.82,
        opacity: isWire ? 0.35 : 0.72,
        transparent: true,
        wireframe: isWire,
        ior: 1.35,
      });

      sacCenters.forEach(([sx, sy, sz], idx) => {
        const sacGeo = new THREE.SphereGeometry(0.75, 24, 20);
        const sacMesh = new THREE.Mesh(sacGeo, sacMat);
        sacMesh.position.set(sx, sy, sz);
        group.add(sacMesh);

        // Exploded view expands the outer sacs away from the central duct
        animatedObjectsRef.current.explodedMeshes?.push({
          mesh: sacMesh,
          originalPos: new THREE.Vector3(sx, sy, sz),
          explodedPos: new THREE.Vector3(sx * 1.85, sy * 1.85, sz * 1.85),
        });
      });

      // 3. Intra-Alveolar Exudate Consolidation Core
      const exudateGeo = new THREE.SphereGeometry(0.55, 20, 16);
      const exudateMat = new THREE.MeshStandardMaterial({
        color: 0xbe123c, // Deep consolidation red
        roughness: 0.4,
        emissive: 0x881337,
        emissiveIntensity: 0.4,
      });
      const exudateMesh = new THREE.Mesh(exudateGeo, exudateMat);
      exudateMesh.position.set(0, -0.2, 0);
      group.add(exudateMesh);
      animatedObjectsRef.current.pulsers.push({ mesh: exudateMesh, baseScale: 1.0, speed: 2.2 });

      // 4. Capillary Rings
      const capMatDeox = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
      const capMatOx = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
      for (let c = 0; c < 8; c++) {
        const torus = new THREE.Mesh(
          new THREE.TorusGeometry(1.45, 0.04, 8, 24),
          c % 2 === 0 ? capMatDeox : capMatOx
        );
        torus.rotation.x = (c * Math.PI) / 8;
        torus.rotation.y = (c * Math.PI) / 4;
        group.add(torus);
      }

      // 5. Gas Particles / Pathogen Spores
      const gGeo = new THREE.BufferGeometry();
      const gPos = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount * 3; i += 3) {
        gPos[i] = (Math.random() - 0.5) * 2.8;
        gPos[i + 1] = (Math.random() - 0.5) * 3.5;
        gPos[i + 2] = (Math.random() - 0.5) * 2.8;
      }
      gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
      const gMat = new THREE.PointsMaterial({
        color: 0xf43f5e,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(gGeo, gMat));
    }

    // -------------------------------------------------------------
    // TOPIC 5: CARDIAC ARREST & ACUTE CORONARY SYNDROMES
    // -------------------------------------------------------------
    if (selectedTopic === 'cardiac-arrest') {
      const heartGeo = new THREE.SphereGeometry(1.2, 32, 24);
      heartGeo.scale(1.0, 1.35, 0.85);
      const heartMat = new THREE.MeshStandardMaterial({
        color: isFlux ? 0xbe123c : 0x9f1239,
        roughness: 0.35,
        wireframe: isWire,
      });
      const heart = new THREE.Mesh(heartGeo, heartMat);
      heart.position.set(0, -0.1, 0);
      group.add(heart);
      animatedObjectsRef.current.pulsers.push({ mesh: heart, baseScale: 1.0, speed: 3.2 });

      const infarctGeo = new THREE.SphereGeometry(0.65, 20, 16);
      infarctGeo.scale(1.1, 1.3, 0.6);
      const infarctMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        roughness: 0.7,
        wireframe: isWire,
      });
      const infarct = new THREE.Mesh(infarctGeo, infarctMat);
      infarct.position.set(-0.15, -0.4, 0.6);
      group.add(infarct);

      const aortaCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.9, 0),
        new THREE.Vector3(0.15, 1.6, -0.1),
        new THREE.Vector3(-0.35, 1.95, -0.3),
        new THREE.Vector3(-0.7, 1.5, -0.5),
      ]);
      const aortaGeo = new THREE.TubeGeometry(aortaCurve, 24, 0.25, 12, false);
      const aortaMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, wireframe: isWire });
      group.add(new THREE.Mesh(aortaGeo, aortaMat));

      const defibMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.4 });
      for (let r = 0; r < 3; r++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6 + r * 0.25, 0.02, 8, 36), defibMat);
        ring.rotation.x = (r * Math.PI) / 3;
        ring.rotation.y = (r * Math.PI) / 4;
        group.add(ring);
        animatedObjectsRef.current.rotators.push(ring);
      }

      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount * 3; i += 3) {
        pPos[i] = (Math.random() - 0.5) * 3.2;
        pPos[i + 1] = (Math.random() - 0.5) * 3.2;
        pPos[i + 2] = (Math.random() - 0.5) * 3.2;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0xef4444, size: 0.048, transparent: true, opacity: 0.85 });
      group.add(new THREE.Points(pGeo, pMat));
    }

    // -------------------------------------------------------------
    // TOPIC 6: HYPERTENSION & VASCULAR HEMODYNAMICS
    // -------------------------------------------------------------
    if (selectedTopic === 'hypertension') {
      const lumenGeo = new THREE.CylinderGeometry(0.72, 0.72, 3.4, 32, 1, true);
      const lumenMat = new THREE.MeshStandardMaterial({
        color: 0xfecdd3,
        roughness: 0.25,
        side: THREE.DoubleSide,
        wireframe: isWire,
      });
      const lumen = new THREE.Mesh(lumenGeo, lumenMat);
      lumen.rotation.z = Math.PI / 4;
      group.add(lumen);

      const mediaGeo = new THREE.CylinderGeometry(1.28, 1.28, 3.38, 32, 1, true);
      const mediaMat = new THREE.MeshStandardMaterial({
        color: isFlux ? 0x991b1b : 0xd97706,
        roughness: 0.4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isWire ? 0.4 : 0.85,
        wireframe: isWire,
      });
      const media = new THREE.Mesh(mediaGeo, mediaMat);
      media.rotation.z = Math.PI / 4;
      group.add(media);
      animatedObjectsRef.current.pulsers.push({ mesh: media, baseScale: 1.0, speed: 2.8 });

      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7 });
      for (let k = -1.4; k <= 1.4; k += 0.4) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.025, 8, 36), ringMat);
        ring.rotation.z = Math.PI / 4;
        ring.position.set(k * 0.7, k * 0.7, 0);
        group.add(ring);
      }

      const rbcGeo = new THREE.BufferGeometry();
      const rbcPos = new Float32Array(pointCount * 3);
      for (let i = 0; i < pointCount * 3; i += 3) {
        const t = (Math.random() - 0.5) * 3.2;
        const rad = Math.sqrt(Math.random()) * 0.65;
        const theta = Math.random() * Math.PI * 2;
        rbcPos[i] = t * Math.cos(Math.PI / 4) + Math.cos(theta) * rad;
        rbcPos[i + 1] = t * Math.sin(Math.PI / 4) + Math.sin(theta) * rad;
        rbcPos[i + 2] = (Math.random() - 0.5) * 1.2;
      }
      rbcGeo.setAttribute('position', new THREE.BufferAttribute(rbcPos, 3));
      const rbcMat = new THREE.PointsMaterial({
        color: 0xf59e0b,
        size: 0.052,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(rbcGeo, rbcMat));
    }
  }, [selectedTopic, renderStyle, particleDensity]);

  // Telemetry details based on selected topic
  const telemetryData = useMemo(() => {
    switch (selectedTopic) {
      case 'quantum-mechanics':
        return [
          { label: 'Wavefunction', val: 'Ψ(r, θ, φ) = R_3d(r) Y_2^0(θ,φ)' },
          { label: 'Quantum Numbers', val: 'n = 3, l = 2, m = 0' },
          { label: 'Harmonic State', val: '|ψ⟩ = 1/√2(|0⟩ + e^{iφ}|1⟩)' },
          { label: 'Tunneling Prob.', val: 'T ≈ exp(-2K·L) = 14.8%' },
        ];
      case 'fetus-development':
        return [
          { label: 'Morphogenesis', val: '8-Cell Cleavage Blastomere' },
          { label: 'Embryo Diameter', val: '120 µm (Zona Pellucida intact)' },
          { label: 'Mitotic Division', val: 'Synchronous Holoblastic' },
          { label: 'Hemodynamics', val: 'Doppler S/D Ratio: 2.84' },
        ];
      case 'ev-battery':
        return [
          { label: 'Cell Chemistry', val: 'NMC 811 / Silicon-Graphite' },
          { label: 'Dimensions', val: 'Ø 46 mm × H 80 mm (Tabless)' },
          { label: 'Operating Voltage', val: '3.87 V (Nominal)' },
          { label: 'Current Flux', val: 'J_Li+ = 18.4 mA/cm² @ 3C' },
        ];
      case 'pulmonology-pneumonia':
        return [
          { label: 'PaO2 / FiO2 Ratio', val: '185 mmHg (Moderate ARDS)' },
          { label: 'Shunt Fraction', val: 'Qs/Qt = 28.4% (Consolidation)' },
          { label: 'Alveolar Exudate', val: '74% Lumen Occlusion' },
          { label: 'CURB-65 Metric', val: 'Class 3 (High Inpatient Risk)' },
        ];
      case 'cardiac-arrest':
        return [
          { label: 'Cardiac Rhythm', val: 'Acute Anterior STEMI (LAD Occlusion)' },
          { label: 'Coronary Perfusion', val: 'CPP = 24 mmHg (Ischemic Shock)' },
          { label: 'Door-to-Balloon', val: 'Target ≤ 90 min (Primary PCI)' },
          { label: 'Defibrillation', val: '200J Biphasic Truncated Exp.' },
        ];
      case 'hypertension':
        return [
          { label: 'Mean Arterial Press.', val: 'MAP = 138 mmHg (Crisis Stage)' },
          { label: 'Vascular Resistance', val: 'SVR = 2,450 dynes·s/cm⁵' },
          { label: 'Pulse Wave Velocity', val: 'PWV = 14.8 m/s (Arterial Stiffness)' },
          { label: 'Media/Lumen Ratio', val: 'M/L = 0.48 (Hypertrophic Remodeling)' },
        ];
      default:
        return [];
    }
  }, [selectedTopic]);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between p-4 sm:p-5 select-none transition-all">
      {/* 1. TOP DISCIPLINE SELECTOR DROPDOWN & HUD ACTIONS */}
      <div className="relative z-30 flex items-center justify-between gap-3">
        {/* Dropdown Selector */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs font-semibold backdrop-blur-md transition-all shadow-md cursor-pointer group"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <div className={`p-1 rounded-lg ${currentTopicData.badgeBg} ${currentTopicData.accentColor} shrink-0`}>
              <currentTopicData.icon className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-white tracking-wide">
              {currentTopicData.label[language]}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180 text-white' : 'group-hover:text-slate-300'
              }`}
            />
          </button>

          {/* Animated Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full mt-2 w-64 sm:w-72 p-1.5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800 shadow-2xl z-50 divide-y divide-slate-800/70"
                role="listbox"
              >
                <div className="px-2.5 py-1.5 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{language === 'en' ? 'Select 3D Discipline' : 'Pilih Disiplin 3D'}</span>
                  <span className="text-slate-500 font-normal">6 {language === 'en' ? 'Models' : 'Model'}</span>
                </div>
                <div className="pt-1 space-y-0.5 max-h-72 overflow-y-auto">
                  {TOPIC_OPTIONS.map((opt) => {
                    const isSelected = selectedTopic === opt.id;
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedTopic(opt.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-slate-800/90 text-white font-medium'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${opt.badgeBg} ${opt.accentColor}`}>
                            <OptIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className={`text-xs font-semibold truncate ${isSelected ? 'text-white font-bold' : 'text-slate-200'}`}>
                              {opt.label[language]}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {opt.category[language]}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-sky-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Action: Telemetry toggle & direct topic link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
              showTelemetry
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/60 ring-1 ring-cyan-400/30'
                : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300'
            }`}
            title="Toggle Live Scientific HUD Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Telemetry</span>
          </button>

          <button
            onClick={() => navigateTo('learn', selectedTopic)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs font-bold transition-all cursor-pointer"
          >
            <span>{language === 'en' ? 'Open Lab' : 'Buka Lab'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME TELEMETRY HUD (COMPACT OVERLAY WITH CLOSE BUTTON) */}
      {showTelemetry && (
        <div className="absolute top-16 right-4 sm:right-5 z-25 max-w-[270px] p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-slate-300 space-y-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300">Telemetry Matrix</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{fps} FPS</span>
              <button
                onClick={() => setShowTelemetry(false)}
                className="p-0.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close Telemetry HUD"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          {telemetryData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 text-[10px]">
              <span className="text-slate-400 truncate max-w-[100px]">{item.label}:</span>
              <span className="text-white font-bold truncate max-w-[150px]">{item.val}</span>
            </div>
          ))}
        </div>
      )}

      {/* 3. MAIN INTERACTIVE 3D VIEWPORT */}
      <div
        ref={mountRef}
        tabIndex={0}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none touch-none outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500/80"
      />

      {/* 4. BOTTOM INTERACTIVE STAGE CONTROLS TOOLBAR */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 pt-3">
        {/* Left Control Group: Shader Style & Explode View */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Shader Mode Switcher */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-[11px] font-medium">
            <button
              onClick={() => setRenderStyle('holographic')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                renderStyle === 'holographic' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hologram
            </button>
            <button
              onClick={() => setRenderStyle('pbr')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                renderStyle === 'pbr' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Solid PBR
            </button>
            <button
              onClick={() => setRenderStyle('quantum-flux')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                renderStyle === 'quantum-flux' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Flux Field
            </button>
          </div>

          {/* Explode / Cross-Section View Toggle */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 ${
              isExploded
                ? 'bg-amber-500/30 text-amber-300 border-amber-400/50'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? (language === 'en' ? 'Collapse' : 'Tutup') : (language === 'en' ? 'Explode View' : 'Bedah Anatomi')}</span>
          </button>
        </div>

        {/* Right Control Group: Rotation & Speed */}
        <div className="flex items-center gap-2">
          {/* Auto-rotation pause/play */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
            title={isAutoRotating ? 'Pause Rotation' : 'Resume Rotation'}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Speed Multiplier */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono">
            {[0.5, 1.0, 2.0].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimSpeed(spd)}
                className={`px-2 py-1 rounded-lg cursor-pointer ${
                  simSpeed === spd ? 'bg-slate-700 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}×
              </button>
            ))}
          </div>

          {/* Particle Density */}
          <button
            onClick={() => setParticleDensity(particleDensity === 'normal' ? 'ultra' : 'normal')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold backdrop-blur-md border transition-all cursor-pointer ${
              particleDensity === 'ultra'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-slate-900/80 text-slate-400 border-slate-800'
            }`}
            title="Toggle Particle Density"
          >
            {particleDensity === 'ultra' ? '6.5k Pts' : '3.2k Pts'}
          </button>
        </div>
      </div>
    </div>
  );
};
