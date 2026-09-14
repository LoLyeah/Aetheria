'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { attachCanvasControls } from '@/lib/canvasControls';
import {
  RotateCcw,
  Play,
  Pause,
  Sliders,
  Zap,
  Gauge,
  Info,
  Maximize2,
  Minimize2,
  Layers,
  Flame,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Wind,
} from 'lucide-react';

export type StorageViewMode = 'container-bess' | 'redox-flow' | 'upcoming-chemistries';
export type UpcomingChemistry = 'na-ion' | 'solid-state' | 'li-sulfur' | 'iron-air';

interface BatteryStorageViewerProps {
  moduleId?: string;
}

export const BatteryStorageViewer: React.FC<BatteryStorageViewerProps> = ({ moduleId }) => {
  const { language, settings, selectedModuleId } = useLearning();
  const activeModuleId = moduleId || selectedModuleId;
  const mountRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  // Derive initial mode based on current module
  const defaultMode = useMemo<StorageViewMode>(() => {
    if (activeModuleId === 'bess-mod-2') return 'redox-flow';
    if (activeModuleId === 'bess-mod-3' || activeModuleId === 'bess-mod-4' || activeModuleId === 'bess-mod-5') {
      return 'upcoming-chemistries';
    }
    return 'container-bess';
  }, [activeModuleId]);

  const defaultChemistry = useMemo<UpcomingChemistry>(() => {
    if (activeModuleId === 'bess-mod-3') return 'na-ion';
    if (activeModuleId === 'bess-mod-4') return 'solid-state';
    if (activeModuleId === 'bess-mod-5') return 'iron-air';
    return 'na-ion';
  }, [activeModuleId]);

  const [viewMode, setViewMode] = useState<StorageViewMode>(defaultMode);
  const [chemistry, setChemistry] = useState<UpcomingChemistry>(defaultChemistry);
  const [prevModuleId, setPrevModuleId] = useState(activeModuleId);

  // Synchronize view mode if activeModuleId changes
  if (activeModuleId !== prevModuleId) {
    setPrevModuleId(activeModuleId);
    setViewMode(defaultMode);
    setChemistry(defaultChemistry);
  }

  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [powerRatingMw, setPowerRatingMw] = useState<number>(2.5); // 0.5 to 5.0 MW
  const [stateOfCharge, setStateOfCharge] = useState<number>(72); // 10% to 95%
  const [showThermalOverlay, setShowThermalOverlay] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMetricsDrawer, setShowMetricsDrawer] = useState<boolean>(true);

  // Performance telemetry
  const [fps, setFps] = useState<number>(60);

  // Refs for render animation loop
  const modeRef = useRef(viewMode);
  const chemRef = useRef(chemistry);
  const chargingRef = useRef(isCharging);
  const powerRef = useRef(powerRatingMw);
  const socRef = useRef(stateOfCharge);
  const thermalRef = useRef(showThermalOverlay);
  const rotatingRef = useRef(isRotating);

  useEffect(() => {
    modeRef.current = viewMode;
    chemRef.current = chemistry;
    chargingRef.current = isCharging;
    powerRef.current = powerRatingMw;
    socRef.current = stateOfCharge;
    thermalRef.current = showThermalOverlay;
    rotatingRef.current = isRotating;
  }, [viewMode, chemistry, isCharging, powerRatingMw, stateOfCharge, showThermalOverlay, isRotating]);

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  // Camera Orbit Angles
  const cameraAnglesRef = useRef({
    theta: 0.65,
    phi: 0.85,
    distance: 14,
    target: new THREE.Vector3(0, 0, 0),
  });

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!containerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      containerWrapperRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Initialize and Render Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x2dd4bf, 2.0); // Teal grid glow
    dirLight1.position.set(10, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 1.4); // Sky fill
    dirLight2.position.set(-12, -8, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x14b8a6, 2.0, 30);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    // Primary Model Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Ground Reference Grid
    const gridHelper = new THREE.GridHelper(24, 24, 0x14b8a6, 0x1e293b);
    gridHelper.position.y = -2.8;
    scene.add(gridHelper);

    // Animated particle systems tracking
    const animatedParticles: {
      points: THREE.Points;
      basePositions: Float32Array;
      speedMult: number;
      direction: number;
    }[] = [];

    let flowLiquids: { neg: THREE.Mesh; pos: THREE.Mesh } | null = null;

    // Helper functions to build 3D models for each mode
    if (viewMode === 'container-bess') {
      // 1. CONTAINERIZED BESS ENCLOSURE (40ft shipping container cutaway)
      const containerMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.7,
        roughness: 0.35,
      });

      // Floor & Rear Wall
      const floorGeo = new THREE.BoxGeometry(10, 0.3, 4.4);
      const floor = new THREE.Mesh(floorGeo, containerMat);
      floor.position.set(0, -2.6, 0);
      modelGroup.add(floor);

      const backWallGeo = new THREE.BoxGeometry(10, 4.2, 0.2);
      const backWall = new THREE.Mesh(backWallGeo, containerMat);
      backWall.position.set(0, -0.6, -2.2);
      modelGroup.add(backWall);

      // Roof frame with glass solar/observation panels
      const roofGeo = new THREE.BoxGeometry(10, 0.2, 4.4);
      const roofMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        transmission: 0.6,
        opacity: 0.8,
        transparent: true,
        roughness: 0.1,
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(0, 1.6, 0);
      modelGroup.add(roof);

      // 6 BESS Racks with Battery Cell Modules & Cooling Cold Plates
      const rackMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.4 });
      const cellModuleMat = new THREE.MeshStandardMaterial({
        color: showThermalOverlay ? 0xf59e0b : 0x0d9488,
        metalness: 0.6,
        roughness: 0.2,
      });
      const coldPlateMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9, roughness: 0.1 });

      for (let r = 0; r < 5; r++) {
        const xPos = -4.0 + r * 1.6;
        const rackFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.8, 1.6), rackMat);
        rackFrame.position.set(xPos, -0.6, -1.0);
        modelGroup.add(rackFrame);

        // 6 module shelves per rack
        for (let m = 0; m < 5; m++) {
          const yPos = -2.1 + m * 0.75;
          const cellModule = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.45, 1.4), cellModuleMat);
          cellModule.position.set(xPos, yPos, -1.0);
          modelGroup.add(cellModule);

          // Liquid cooling cold plate underneath
          const coldPlate = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.08, 1.45), coldPlateMat);
          coldPlate.position.set(xPos, yPos - 0.26, -1.0);
          modelGroup.add(coldPlate);

          // Status LED
          const ledMat = new THREE.MeshBasicMaterial({ color: isCharging ? 0x22c55e : 0x06b6d4 });
          const led = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), ledMat);
          led.position.set(xPos + 0.56, yPos, -0.25);
          modelGroup.add(led);
        }
      }

      // Inverter / Power Conversion System (PCS) Cabinet on right end
      const pcsMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.2 });
      const pcsCabinet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.8, 3.6), pcsMat);
      pcsCabinet.position.set(4.1, -0.6, 0);
      modelGroup.add(pcsCabinet);

      // Liquid chiller & HVAC unit on roof
      const hvacMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5, roughness: 0.4 });
      const hvacUnit = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 1.8), hvacMat);
      hvacUnit.position.set(3.2, 2.2, 0);
      modelGroup.add(hvacUnit);

      // Power Flow Particle Corridor
      const pCount = 500;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pPos[i] = -4.5 + Math.random() * 8.5; // X length
        pPos[i + 1] = -2.3 + Math.random() * 3.5; // Y height
        pPos[i + 2] = 0.8 + (Math.random() - 0.5) * 0.8; // Z corridor
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: isCharging ? 0x14b8a6 : 0x38bdf8,
        size: 0.07,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeo, pMat);
      modelGroup.add(points);
      animatedParticles.push({
        points,
        basePositions: pPos.slice(),
        speedMult: 0.04,
        direction: isCharging ? 1 : -1,
      });
    } else if (viewMode === 'redox-flow') {
      // 2. VANADIUM REDOX FLOW BATTERY (VRFB) SYSTEM
      // Two Large Electrolyte Storage Tanks (Anolyte V²⁺/V³⁺ vs Catholyte VO²⁺/VO₂⁺)
      const tankGeo = new THREE.CylinderGeometry(1.8, 1.8, 4.4, 32);

      // Negative Tank (Anolyte - Violet/Green)
      const negTankMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        transmission: 0.75,
        opacity: 0.85,
        transparent: true,
        roughness: 0.15,
      });
      const negTank = new THREE.Mesh(tankGeo, negTankMat);
      negTank.position.set(-3.5, -0.4, 0);
      modelGroup.add(negTank);

      // Negative Tank Liquid Level
      const negLiquid = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.7, 3.8, 24),
        new THREE.MeshStandardMaterial({ color: 0x059669, metalness: 0.4, roughness: 0.3 })
      );
      negLiquid.position.set(-3.5, -2.5 + 1.9, 0);
      modelGroup.add(negLiquid);

      // Positive Tank (Catholyte - Golden/Blue VO²⁺/VO₂⁺)
      const posTankMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        transmission: 0.75,
        opacity: 0.85,
        transparent: true,
        roughness: 0.15,
      });
      const posTank = new THREE.Mesh(tankGeo, posTankMat);
      posTank.position.set(3.5, -0.4, 0);
      modelGroup.add(posTank);

      // Positive Tank Liquid Level
      const posLiquid = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.7, 3.8, 24),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.3 })
      );
      posLiquid.position.set(3.5, -2.5 + 1.9, 0);
      modelGroup.add(posLiquid);

      flowLiquids = { neg: negLiquid, pos: posLiquid };

      // Central Electrochemical Membrane Cell Stack
      const stackFrameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 });
      const cellStack = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 2.2), stackFrameMat);
      cellStack.position.set(0, -0.8, 0);
      modelGroup.add(cellStack);

      // Stack end-plates & compression tie rods
      for (let i = -1; i <= 1; i += 2) {
        const tieRod = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 3.4, 12),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 })
        );
        tieRod.position.set(1.15 * i, -0.8, 1.15);
        modelGroup.add(tieRod);

        const tieRodBack = tieRod.clone();
        tieRodBack.position.set(1.15 * i, -0.8, -1.15);
        modelGroup.add(tieRodBack);
      }

      // Circulation Pumps
      const pumpMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 });
      const negPump = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16), pumpMat);
      negPump.position.set(-1.6, -2.4, 0.8);
      negPump.rotation.x = Math.PI / 2;
      modelGroup.add(negPump);

      const posPump = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16), pumpMat);
      posPump.position.set(1.6, -2.4, 0.8);
      posPump.rotation.x = Math.PI / 2;
      modelGroup.add(posPump);

      // Flowing Ion Fluid Particles
      const fCount = 600;
      const fGeo = new THREE.BufferGeometry();
      const fPos = new Float32Array(fCount * 3);
      for (let i = 0; i < fCount * 3; i += 3) {
        const isLeft = i % 2 === 0;
        const radius = Math.random() * 1.5;
        const angle = Math.random() * Math.PI * 2;
        fPos[i] = isLeft ? -3.5 + Math.cos(angle) * radius : 3.5 + Math.cos(angle) * radius;
        fPos[i + 1] = -2.2 + Math.random() * 3.2;
        fPos[i + 2] = Math.sin(angle) * radius;
      }
      fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
      const fMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.065,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const flowPoints = new THREE.Points(fGeo, fMat);
      modelGroup.add(flowPoints);
      animatedParticles.push({
        points: flowPoints,
        basePositions: fPos.slice(),
        speedMult: 0.03,
        direction: isCharging ? 1 : -1,
      });
    } else {
      // 3. UPCOMING CHEMISTRIES ATOMIC / LAYER MICROSTRUCTURE VIEW
      if (chemistry === 'na-ion') {
        // Sodium-ion: Aluminum foil collectors (both sides) + Hard Carbon turbostratic lattice + Na⁺ ions
        // Anode Aluminum Current Collector
        const alCollector = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 4.4, 5.0),
          new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.15 })
        );
        alCollector.position.set(-3.6, -0.5, 0);
        modelGroup.add(alCollector);

        // Hard Carbon Turbostratic Matrix
        const hardCarbonMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.6 });
        for (let l = 0; l < 5; l++) {
          const sheet = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.0, 4.6), hardCarbonMat);
          sheet.position.set(-3.0 + l * 0.45, -0.5, (Math.random() - 0.5) * 0.2);
          sheet.rotation.z = (Math.random() - 0.5) * 0.08;
          modelGroup.add(sheet);
        }

        // Separator Membrane
        const sepMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 0.8,
          opacity: 0.6,
          transparent: true,
          roughness: 0.2,
        });
        const separator = new THREE.Mesh(new THREE.BoxGeometry(0.4, 4.4, 5.0), sepMat);
        separator.position.set(0, -0.5, 0);
        modelGroup.add(separator);

        // Prussian White / Layered Oxide Cathode Matrix
        const cathodeMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, metalness: 0.7, roughness: 0.3 });
        for (let c = 0; c < 5; c++) {
          const cathLayer = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.0, 4.6), cathodeMat);
          cathLayer.position.set(1.0 + c * 0.45, -0.5, 0);
          modelGroup.add(cathLayer);
        }

        // Cathode Aluminum Current Collector
        const cathAlCollector = alCollector.clone();
        cathAlCollector.position.set(3.4, -0.5, 0);
        modelGroup.add(cathAlCollector);

        // Na⁺ Ion Migrating Particle Cloud
        const naCount = 450;
        const naGeo = new THREE.BufferGeometry();
        const naPos = new Float32Array(naCount * 3);
        for (let i = 0; i < naCount * 3; i += 3) {
          naPos[i] = -3.2 + Math.random() * 6.4;
          naPos[i + 1] = -2.2 + Math.random() * 3.6;
          naPos[i + 2] = -2.2 + Math.random() * 4.4;
        }
        naGeo.setAttribute('position', new THREE.BufferAttribute(naPos, 3));
        const naMat = new THREE.PointsMaterial({
          color: 0xf59e0b, // Sodium Yellow
          size: 0.1,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        });
        const naPoints = new THREE.Points(naGeo, naMat);
        modelGroup.add(naPoints);
        animatedParticles.push({
          points: naPoints,
          basePositions: naPos.slice(),
          speedMult: 0.05,
          direction: isCharging ? -1 : 1,
        });
      } else if (chemistry === 'solid-state') {
        // All-Solid-State: Metallic Li anode + dense ceramic/sulfide LLZO electrolyte + composite cathode + spring compression fixture
        // Spring Compression Pressure Plates
        const plateMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 });
        const leftPlate = new THREE.Mesh(new THREE.BoxGeometry(0.4, 4.6, 5.2), plateMat);
        leftPlate.position.set(-3.8, -0.5, 0);
        modelGroup.add(leftPlate);

        // Compression Springs
        for (let s = -1; s <= 1; s += 2) {
          const spring = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16),
            new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.3 })
          );
          spring.position.set(-3.2, s * 1.5, 0);
          spring.rotation.z = Math.PI / 2;
          modelGroup.add(spring);
        }

        // Pure Metallic Lithium Anode (Silvery mirror finish)
        const liAnodeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
        const liAnode = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.0, 4.6), liAnodeMat);
        liAnode.position.set(-2.2, -0.5, 0);
        modelGroup.add(liAnode);

        // Solid Ceramic Electrolyte Separator (Dense translucent LLZO/Sulfide)
        const solidElectrolyteMat = new THREE.MeshPhysicalMaterial({
          color: 0x14b8a6,
          transmission: 0.65,
          opacity: 0.9,
          transparent: true,
          roughness: 0.1,
          metalness: 0.2,
        });
        const solidSep = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.2, 4.8), solidElectrolyteMat);
        solidSep.position.set(0, -0.5, 0);
        modelGroup.add(solidSep);

        // Solid Composite Cathode
        const solidCathodeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.4 });
        const solidCathode = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.0, 4.6), solidCathodeMat);
        solidCathode.position.set(1.8, -0.5, 0);
        modelGroup.add(solidCathode);

        // Right Compression End-plate
        const rightPlate = leftPlate.clone();
        rightPlate.position.set(3.2, -0.5, 0);
        modelGroup.add(rightPlate);
      } else if (chemistry === 'li-sulfur') {
        // Lithium-Sulfur: Metallic Li Anode + Polysulfide Barrier Membrane + Carbon-Sulfur S₈ Cathode
        const liAnode = new THREE.Mesh(
          new THREE.BoxGeometry(1.0, 4.2, 4.8),
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 })
        );
        liAnode.position.set(-2.6, -0.5, 0);
        modelGroup.add(liAnode);

        // Polysulfide Barrier Membrane
        const barrierMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.5, roughness: 0.3 });
        const barrier = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4.4, 5.0), barrierMat);
        barrier.position.set(-0.6, -0.5, 0);
        modelGroup.add(barrier);

        // Mesoporous Carbon / Sulfur Matrix Cathode (Octasulfur Yellow clusters)
        const carbonMatrixMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.3, roughness: 0.7 });
        const carbonCathode = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.2, 4.8), carbonMatrixMat);
        carbonCathode.position.set(1.4, -0.5, 0);
        modelGroup.add(carbonCathode);

        // Sulfur S₈ clusters embedded
        const sClusterMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.3, roughness: 0.3 });
        for (let sc = 0; sc < 18; sc++) {
          const sCluster = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), sClusterMat);
          sCluster.position.set(
            0.5 + Math.random() * 1.8,
            -2.0 + Math.random() * 3.5,
            -1.8 + Math.random() * 3.6
          );
          modelGroup.add(sCluster);
        }
      } else {
        // Iron-Air (Fe-Air): Sintered Metallic Iron Plate + Alkaline KOH Bath + Gas-diffusion Air Breathing Cathode
        // Sintered Iron Pellet Anode
        const feMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.4 });
        const feAnode = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.2, 4.8), feMat);
        feAnode.position.set(-2.2, -0.5, 0);
        modelGroup.add(feAnode);

        // Alkaline KOH Electrolyte Chamber
        const kohMat = new THREE.MeshPhysicalMaterial({
          color: 0x38bdf8,
          transmission: 0.85,
          opacity: 0.7,
          transparent: true,
          roughness: 0.1,
        });
        const kohChamber = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.4, 5.0), kohMat);
        kohChamber.position.set(0, -0.5, 0);
        modelGroup.add(kohChamber);

        // Air Breathing Gas-Diffusion Cathode (Porous carbon mesh)
        const airCathodeMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          wireframe: true,
          metalness: 0.9,
          roughness: 0.1,
        });
        const airCathode = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.2, 4.8), airCathodeMat);
        airCathode.position.set(1.8, -0.5, 0);
        modelGroup.add(airCathode);

        // Oxygen (O₂) Gas Exchange Bubble Particles
        const o2Count = 300;
        const o2Geo = new THREE.BufferGeometry();
        const o2Pos = new Float32Array(o2Count * 3);
        for (let i = 0; i < o2Count * 3; i += 3) {
          o2Pos[i] = 1.4 + Math.random() * 1.6;
          o2Pos[i + 1] = -2.0 + Math.random() * 3.8;
          o2Pos[i + 2] = -2.0 + Math.random() * 4.0;
        }
        o2Geo.setAttribute('position', new THREE.BufferAttribute(o2Pos, 3));
        const o2Mat = new THREE.PointsMaterial({
          color: 0x67e8f9,
          size: 0.08,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        });
        const o2Points = new THREE.Points(o2Geo, o2Mat);
        modelGroup.add(o2Points);
        animatedParticles.push({
          points: o2Points,
          basePositions: o2Pos.slice(),
          speedMult: 0.04,
          direction: isCharging ? 1 : -1, // Oxygen evolution on charge, intake on discharge
        });
      }
    }

    // Attach Unified Canvas Controls
    const detachControls = attachCanvasControls(container, {
      onRotate: (deltaX, deltaY) => {
        cameraAnglesRef.current.theta -= deltaX;
        cameraAnglesRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, cameraAnglesRef.current.phi - deltaY));
      },
      onZoom: (deltaZoom) => {
        cameraAnglesRef.current.distance = Math.max(6, Math.min(28, cameraAnglesRef.current.distance + deltaZoom));
      },
      onReset: () => {
        cameraAnglesRef.current.theta = 0.65;
        cameraAnglesRef.current.phi = 0.85;
        cameraAnglesRef.current.distance = 14;
      },
    });

    // Main Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS Telemetry calculation
      frameCount++;
      if (currentTime - fpsTimer >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - fpsTimer)));
        frameCount = 0;
        fpsTimer = currentTime;
      }

      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Auto-rotation handling
      if (rotatingRef.current) {
        cameraAnglesRef.current.theta += 0.25 * dt;
      }

      // Update Spherical Camera Position
      const { theta, phi, distance, target } = cameraAnglesRef.current;
      camera.position.x = target.x + distance * Math.sin(phi) * Math.sin(theta);
      camera.position.y = target.y + distance * Math.cos(phi);
      camera.position.z = target.z + distance * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(target);

      // Animate Active Particles
      animatedParticles.forEach((sys) => {
        const positions = sys.points.geometry.attributes.position.array as Float32Array;
        const count = positions.length / 3;
        const dir = sys.direction;
        const spd = sys.speedMult * (powerRef.current / 2.5);

        for (let i = 0; i < count; i++) {
          positions[i * 3] += spd * dir;
          // Loop boundary wrapping
          if (positions[i * 3] > 4.5) positions[i * 3] = -4.5;
          if (positions[i * 3] < -4.5) positions[i * 3] = 4.5;
        }
        sys.points.geometry.attributes.position.needsUpdate = true;
      });

      // Dynamically scale VRFB liquid heights based on live SoC
      if (flowLiquids) {
        const socFraction = Math.max(0.08, Math.min(1.0, socRef.current / 100));
        flowLiquids.neg.scale.y = socFraction;
        flowLiquids.neg.position.y = -2.5 + (3.8 * socFraction) / 2;
        flowLiquids.pos.scale.y = socFraction;
        flowLiquids.pos.position.y = -2.5 + (3.8 * socFraction) / 2;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      detachControls();
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [viewMode, chemistry, isCharging, showThermalOverlay, settings.graphicsQuality]);

  // Derived Physical Telemetry Metrics
  const calculatedDurationHours = useMemo(() => {
    if (viewMode === 'redox-flow') return (12.0 * (100 / stateOfCharge)).toFixed(1);
    if (viewMode === 'upcoming-chemistries' && chemistry === 'iron-air') return '100.0';
    return (4.0).toFixed(1);
  }, [viewMode, chemistry, stateOfCharge]);

  const calculatedRtePercent = useMemo(() => {
    if (viewMode === 'redox-flow') return 74.2;
    if (viewMode === 'upcoming-chemistries') {
      if (chemistry === 'na-ion') return 87.5;
      if (chemistry === 'solid-state') return 93.8;
      if (chemistry === 'li-sulfur') return 81.0;
      if (chemistry === 'iron-air') return 49.5;
    }
    return 89.4; // Default container LFP BESS
  }, [viewMode, chemistry]);

  const estimatedCellTemp = useMemo(() => {
    const baseTemp = 24.5;
    const thermalRise = (powerRatingMw / 5.0) * 12.0;
    return (baseTemp + (showThermalOverlay ? thermalRise : thermalRise * 0.4)).toFixed(1);
  }, [powerRatingMw, showThermalOverlay]);

  return (
    <div
      ref={containerWrapperRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen rounded-none' : 'h-[520px] sm:h-[600px]'
      }`}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP BAR: View Mode Switcher & Visual Controls */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-20 pointer-events-none">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 pointer-events-auto shadow-md">
          <button
            onClick={() => setViewMode('container-bess')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              viewMode === 'container-bess'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Container BESS' : 'BESS Kontainer'}</span>
          </button>
          <button
            onClick={() => setViewMode('redox-flow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              viewMode === 'redox-flow'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Redox Flow (VRFB)' : 'Alir Redoks (VRFB)'}</span>
          </button>
          <button
            onClick={() => setViewMode('upcoming-chemistries')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              viewMode === 'upcoming-chemistries'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Upcoming Chemistries' : 'Kimia Masa Depan'}</span>
          </button>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={language === 'en' ? 'Toggle Auto-Rotation' : 'Putar Otomatis'}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setShowThermalOverlay(!showThermalOverlay)}
            title={language === 'en' ? 'Thermal & Cooling Gradient' : 'Gradien Termal & Pendingin'}
            className={`p-1.5 rounded-lg transition-colors ${
              showThermalOverlay ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleFullscreen}
            title={language === 'en' ? 'Toggle Fullscreen' : 'Layar Penuh'}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* SUB-BAR: Upcoming Chemistry Switcher (Only visible when upcoming-chemistries mode is active) */}
      {viewMode === 'upcoming-chemistries' && (
        <div className="absolute top-16 left-3 z-20 pointer-events-auto">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 shadow-lg text-[11px]">
            <button
              onClick={() => setChemistry('na-ion')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                chemistry === 'na-ion' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Sodium-ion (Na⁺)
            </button>
            <button
              onClick={() => setChemistry('solid-state')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                chemistry === 'solid-state' ? 'bg-teal-400 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Solid-State (ASSB)
            </button>
            <button
              onClick={() => setChemistry('li-sulfur')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                chemistry === 'li-sulfur' ? 'bg-purple-400 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Lithium-Sulfur (Li-S)
            </button>
            <button
              onClick={() => setChemistry('iron-air')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                chemistry === 'iron-air' ? 'bg-sky-400 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Iron-Air (100h)
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM FLOATING CONTROLS & TELEMETRY HUD */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 z-20 pointer-events-none">
        {/* Left Side: Interactive Operating Controls */}
        <div className="p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800/80 pointer-events-auto space-y-3 w-full sm:w-80 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              {language === 'en' ? 'BESS Dispatch Parameters' : 'Parameter Operasi BESS'}
            </span>
            <button
              onClick={() => setIsCharging(!isCharging)}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isCharging
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
              }`}
            >
              {isCharging ? (language === 'en' ? 'Charging' : 'Mengisi') : (language === 'en' ? 'Discharging' : 'Menyalurkan')}
            </button>
          </div>

          {/* Power Dispatch Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">
                {language === 'en' ? 'Dispatch Power:' : 'Daya Penyaluran:'}
              </span>
              <span className="font-mono font-bold text-teal-300">{powerRatingMw.toFixed(1)} MW</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={powerRatingMw}
              onChange={(e) => setPowerRatingMw(parseFloat(e.target.value))}
              className="w-full accent-teal-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* State of Charge (SoC) Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">
                {language === 'en' ? 'State of Charge (SoC):' : 'Status Muatan (SoC):'}
              </span>
              <span className="font-mono font-bold text-teal-300">{stateOfCharge}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="1"
              value={stateOfCharge}
              onChange={(e) => setStateOfCharge(parseInt(e.target.value))}
              className="w-full accent-teal-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Side: Real-Time Thermodynamic Telemetry HUD */}
        <div className="p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800/80 pointer-events-auto space-y-2 w-full sm:w-72 shadow-lg">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
            <span className="font-mono font-semibold text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-teal-400" />
              {language === 'en' ? 'Grid Telemetry HUD' : 'Telemetri Jaringan'}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
              {fps} FPS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-0.5">
            <div>
              <span className="text-slate-500 block text-[10px]">
                {language === 'en' ? 'Round-Trip Eff.' : 'Efisiensi RTE'}
              </span>
              <span className="font-bold text-teal-300">{calculatedRtePercent}%</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">
                {language === 'en' ? 'Nominal Duration' : 'Durasi Nominal'}
              </span>
              <span className="font-bold text-slate-200">{calculatedDurationHours} hrs</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">
                {language === 'en' ? 'Cell Core Temp' : 'Suhu Inti Sel'}
              </span>
              <span className="font-bold text-amber-300">{estimatedCellTemp} °C</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">
                {language === 'en' ? 'Grid Coupling' : 'Kopling Grid'}
              </span>
              <span className="font-bold text-sky-400">PCS 13.8 kV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
