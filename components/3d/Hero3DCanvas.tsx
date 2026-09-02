'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
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
  Eye,
  Activity,
  X,
  Info,
} from 'lucide-react';

interface Hero3DCanvasProps {
  activeTopicId?: TopicId;
}

type RenderStyle = 'holographic' | 'pbr' | 'quantum-flux';

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  activeTopicId = 'quantum-mechanics',
}) => {
  const { language, navigateTo } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicId>(activeTopicId);
  const [renderStyle, setRenderStyle] = useState<RenderStyle>('holographic');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [particleDensity, setParticleDensity] = useState<'normal' | 'ultra'>('normal');
  const [fps, setFps] = useState<number>(60);
  const [showTelemetry, setShowTelemetry] = useState<boolean>(false);

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
      targetRotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotX));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.005;
      targetZoom = Math.max(4.0, Math.min(14.0, targetZoom));
    };

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = true;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Render loop & FPS telemetry
    let animId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * speedRef.current;

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
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }
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
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
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
      default:
        return [];
    }
  }, [selectedTopic]);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between p-4 sm:p-5 select-none transition-all">
      {/* 1. TOP DISCIPLINE SELECTOR PILLS */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedTopic('quantum-mechanics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
              selectedTopic === 'quantum-mechanics'
                ? 'bg-sky-500/30 text-sky-300 border border-sky-400/60 shadow-xs ring-1 ring-sky-400/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Atom className="w-3.5 h-3.5 text-sky-400" />
            <span>Quantum Physics</span>
          </button>

          <button
            onClick={() => setSelectedTopic('fetus-development')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
              selectedTopic === 'fetus-development'
                ? 'bg-rose-500/30 text-rose-300 border border-rose-400/60 shadow-xs ring-1 ring-rose-400/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            <span>Embryonic Biology</span>
          </button>

          <button
            onClick={() => setSelectedTopic('ev-battery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
              selectedTopic === 'ev-battery'
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/60 shadow-xs ring-1 ring-emerald-400/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>EV 4680 Powertrain</span>
          </button>
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
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
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
