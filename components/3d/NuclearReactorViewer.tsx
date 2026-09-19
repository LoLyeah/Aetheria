'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { attachCanvasControls } from '@/lib/canvasControls';
import { TelemetryHUD } from './TelemetryHUD';
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
  ShieldAlert,
  ShieldCheck,
  Droplets,
  Wind,
  AlertTriangle,
  Activity,
  Radio,
  Sparkles,
} from 'lucide-react';

export type ReactorViewMode = 'core-chamber' | 'plant-steam-loop' | 'safety-mitigation';
export type SafetyScenario = 'normal' | 'scram-trip' | 'station-blackout' | 'passive-cooling';

interface NuclearReactorViewerProps {
  moduleId?: string;
}

export const NuclearReactorViewer: React.FC<NuclearReactorViewerProps> = ({ moduleId }) => {
  const { language, settings, selectedModuleId } = useLearning();
  const activeModuleId = moduleId || selectedModuleId;
  const mountRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  // Derive initial mode based on current module
  const defaultMode = useMemo<ReactorViewMode>(() => {
    if (activeModuleId === 'nuc-mod-3' || activeModuleId === 'nuc-mod-4') {
      return 'plant-steam-loop';
    }
    if (activeModuleId === 'nuc-mod-5') {
      return 'safety-mitigation';
    }
    return 'core-chamber';
  }, [activeModuleId]);

  const [viewMode, setViewMode] = useState<ReactorViewMode>(defaultMode);
  const [prevModuleId, setPrevModuleId] = useState(activeModuleId);

  // Sync mode if activeModuleId changes
  if (activeModuleId !== prevModuleId) {
    setPrevModuleId(activeModuleId);
    setViewMode(defaultMode);
  }

  // Interactive Reactor State
  const [controlRodInsertion, setControlRodInsertion] = useState<number>(25); // 0% (withdrawn) to 100% (fully in)
  const [isScrammed, setIsScrammed] = useState<boolean>(false);
  const [safetyScenario, setSafetyScenario] = useState<SafetyScenario>('normal');
  const [showCherenkovGlow, setShowCherenkovGlow] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(settings.autoRotate3D ?? true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMetricsDrawer, setShowMetricsDrawer] = useState<boolean>(true);

  // Performance telemetry
  const [fps, setFps] = useState<number>(60);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
    if (settings.autoRotate3D !== undefined) {
      setIsRotating(settings.autoRotate3D);
    }
  }, [settings]);

  // Derived Physical Metrics
  const coreMetrics = useMemo(() => {
    if (isScrammed || safetyScenario === 'scram-trip' || safetyScenario === 'station-blackout') {
      return {
        keff: 0.942,
        reactivityDollar: -8.92,
        thermalPowerMw: 185, // Decay heat ~5.4% of 3400 MWth
        coreTempC: 308,
        coolantPressureMpa: safetyScenario === 'station-blackout' ? 8.2 : 15.3,
        containmentPressKpa: safetyScenario === 'station-blackout' ? 142 : 101.3,
        coolantFlowKgS: safetyScenario === 'station-blackout' ? 1200 : 18500, // Natural circulation vs pumped
        pccsActive: safetyScenario === 'station-blackout' || safetyScenario === 'passive-cooling',
        statusEn: safetyScenario === 'station-blackout' ? 'Station Blackout - Passive Cooling Active' : 'SCRAM Triggered - Decay Heat Removal',
        statusId: safetyScenario === 'station-blackout' ? 'Station Blackout - Pendinginan Pasif Aktif' : 'SCRAM Dipicu - Pembuangan Panas Peluruhan',
      };
    }

    // Normal or modified rod position
    // Insertion 0% -> keff 1.004 (+0.6$), 25% -> keff 1.000 (critical), 100% -> keff 0.950 (subcritical)
    const effectiveK = 1.004 - (controlRodInsertion / 100) * 0.054;
    const reactivity = ((effectiveK - 1) / effectiveK) / 0.0065; // in dollars
    const powerFraction = Math.max(0.06, Math.min(1.05, 1.0 - (controlRodInsertion - 25) * 0.012));
    const powerMw = Math.round(3400 * powerFraction);
    const fuelTemp = Math.round(290 + powerFraction * 480);

    return {
      keff: Number(effectiveK.toFixed(5)),
      reactivityDollar: Number(reactivity.toFixed(2)),
      thermalPowerMw: powerMw,
      coreTempC: fuelTemp,
      coolantPressureMpa: 15.5,
      containmentPressKpa: 101.3,
      coolantFlowKgS: 18500,
      pccsActive: false,
      statusEn: controlRodInsertion < 25 ? 'Supercritical Ramp' : controlRodInsertion === 25 ? 'Steady-State Critical' : 'Subcritical Insertion',
      statusId: controlRodInsertion < 25 ? 'Kenaikan Superkritis' : controlRodInsertion === 25 ? 'Kritis Tunak Stabil' : 'Penyisipan Subkritis',
    };
  }, [controlRodInsertion, isScrammed, safetyScenario]);

  // Dynamic references for render animation loop
  const modeRef = useRef(viewMode);
  const rodRef = useRef(controlRodInsertion);
  const scramRef = useRef(isScrammed);
  const cherenkovRef = useRef(showCherenkovGlow);
  const powerRef = useRef(coreMetrics.thermalPowerMw);
  const rotatingRef = useRef(isRotating);
  const scenarioRef = useRef(safetyScenario);

  useEffect(() => {
    modeRef.current = viewMode;
    rodRef.current = controlRodInsertion;
    scramRef.current = isScrammed;
    cherenkovRef.current = showCherenkovGlow;
    powerRef.current = coreMetrics.thermalPowerMw;
    rotatingRef.current = isRotating;
    scenarioRef.current = safetyScenario;
  }, [viewMode, controlRodInsertion, isScrammed, showCherenkovGlow, coreMetrics.thermalPowerMw, isRotating, safetyScenario]);

  // SCRAM Action Handler
  const handleTriggerScram = () => {
    setIsScrammed(true);
    setControlRodInsertion(100);
    setSafetyScenario('scram-trip');
  };

  const handleResetReactor = () => {
    setIsScrammed(false);
    setControlRodInsertion(25);
    setSafetyScenario('normal');
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      containerWrapperRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // --------------------------------------------------------------------------
  // THREE.JS SCENE CREATION & RENDER PIPELINE
  // --------------------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d); // Deep obsidian slate

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // Initial camera placement
    const cameraAnglesRef = {
      theta: 0.75,
      phi: 0.95,
      distance: viewMode === 'core-chamber' ? 14 : viewMode === 'plant-steam-loop' ? 22 : 18,
      target: new THREE.Vector3(0, 0, 0),
    };

    const updateCameraPos = () => {
      const { theta, phi, distance, target } = cameraAnglesRef;
      camera.position.x = target.x + distance * Math.sin(phi) * Math.sin(theta);
      camera.position.y = target.y + distance * Math.cos(phi);
      camera.position.z = target.z + distance * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(target);
    };
    updateCameraPos();

    const isPerf = settings.graphicsQuality === 'performance';
    const isBalanced = settings.graphicsQuality === 'balanced';
    const renderer = new THREE.WebGLRenderer({
      antialias: !isPerf,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isPerf ? 1.0 : isBalanced ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.replaceChildren(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(12, 20, 15);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const blueGlowLight = new THREE.PointLight(0x0ea5e9, 2.5, 20);
    blueGlowLight.position.set(0, 0, 0);
    scene.add(blueGlowLight);

    // Grid Floor
    const grid = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    grid.position.y = -4.5;
    scene.add(grid);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Tracking references for dynamic updates in animation loop
    let controlRodSpiderGroup: THREE.Group | null = null;
    let cherenkovParticles: THREE.Points | null = null;
    let cherenkovMaterial: THREE.PointsMaterial | null = null;
    let coolantParticles: THREE.Points | null = null;
    let turbineRotorGroup: THREE.Group | null = null;
    let pccsSprayParticles: THREE.Points | null = null;
    let coriumGlowMesh: THREE.Mesh | null = null;

    // -------------------------------------------------------------
    // MODE 1: CORE CHAMBER & FUEL ASSEMBLY LATTICE
    // -------------------------------------------------------------
    if (viewMode === 'core-chamber') {
      // 1. Reactor Pressure Vessel (RPV)
      const rpvGroup = new THREE.Group();
      rootGroup.add(rpvGroup);

      const vesselMat = new THREE.MeshPhysicalMaterial({
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.25,
        transparent: true,
        opacity: 0.55,
        clearcoat: 0.8,
      });

      // Vessel main cylinder
      const vesselMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 5.8, 36, 1, true), vesselMat);
      rpvGroup.add(vesselMesh);

      // Bottom Head
      const bottomHead = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 36, 18, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
        vesselMat
      );
      bottomHead.position.y = -2.9;
      rpvGroup.add(bottomHead);

      // Flange & Head Closure
      const flangeMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 });
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.4, 36), flangeMat);
      flange.position.y = 2.9;
      rpvGroup.add(flange);

      // Core Barrel Interior Liner
      const barrelMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.4,
        wireframe: true,
      });
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 4.2, 24, 1, true), barrelMat);
      rpvGroup.add(barrel);

      // 2. Fuel Assemblies Lattice (Uranium Rods with Zircaloy Clad)
      const fuelGroup = new THREE.Group();
      rpvGroup.add(fuelGroup);

      const fuelMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Amber glowing fuel
        emissive: 0xd97706,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
      });

      const rodGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.4, 12);
      const latticeR = 1.35;
      const spacings = [-1.1, -0.75, -0.4, 0, 0.4, 0.75, 1.1];

      for (const x of spacings) {
        for (const z of spacings) {
          if (x * x + z * z <= latticeR * latticeR) {
            const rod = new THREE.Mesh(rodGeo, fuelMat);
            rod.position.set(x, -0.2, z);
            fuelGroup.add(rod);
          }
        }
      }

      // 3. Movable Control Rod Spider Cluster (B4C Absorber Rods)
      controlRodSpiderGroup = new THREE.Group();
      rpvGroup.add(controlRodSpiderGroup);

      const spiderPlateMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
      const spiderPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.12, 24), spiderPlateMat);
      controlRodSpiderGroup.add(spiderPlate);

      // Drive shaft extending upwards
      const driveShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.0, 16), spiderPlateMat);
      driveShaft.position.y = 1.5;
      controlRodSpiderGroup.add(driveShaft);

      // Absorber poison rods suspended downwards
      const poisonGeo = new THREE.CylinderGeometry(0.065, 0.065, 3.2, 12);
      const poisonMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.3 });

      for (const cx of [-0.75, 0, 0.75]) {
        for (const cz of [-0.75, 0, 0.75]) {
          if (cx * cx + cz * cz <= 0.9) {
            const pRod = new THREE.Mesh(poisonGeo, poisonMat);
            pRod.position.set(cx, -1.6, cz);
            controlRodSpiderGroup.add(pRod);
          }
        }
      }

      // 4. Cherenkov Radiation Particle Cloud (Brilliant Electric Blue Glow)
      const densityScale = (settings.particleDensity || 100) / 100;
      const pCount = Math.round(1200 * densityScale);
      const cherenkovGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const rad = 0.3 + Math.random() * 1.4;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 3.6;
        posArray[i * 3] = Math.cos(theta) * rad;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = Math.sin(theta) * rad;
      }
      cherenkovGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      cherenkovMaterial = new THREE.PointsMaterial({
        color: 0x38bdf8, // Cherenkov Electric Cyan
        size: 0.065,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      cherenkovParticles = new THREE.Points(cherenkovGeo, cherenkovMaterial);
      rpvGroup.add(cherenkovParticles);

      // 5. Upward Coolant Flow Stream Particles
      const cCount = Math.round(500 * densityScale);
      const coolantGeo = new THREE.BufferGeometry();
      const cPos = new Float32Array(cCount * 3);
      for (let i = 0; i < cCount; i++) {
        cPos[i * 3] = (Math.random() - 0.5) * 2.6;
        cPos[i * 3 + 1] = (Math.random() - 0.5) * 5.0;
        cPos[i * 3 + 2] = (Math.random() - 0.5) * 2.6;
      }
      coolantGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
      const coolantMat = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.04,
        transparent: true,
        opacity: 0.6,
      });
      coolantParticles = new THREE.Points(coolantGeo, coolantMat);
      rpvGroup.add(coolantParticles);

      // 6. Primary Nozzles (Hot Leg / Cold Leg)
      const pipeMatHot = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.7, roughness: 0.3 });
      const pipeMatCold = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.7, roughness: 0.3 });
      const pipeGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.6, 20);

      const hotNozzle = new THREE.Mesh(pipeGeo, pipeMatHot);
      hotNozzle.rotation.z = Math.PI / 2;
      hotNozzle.position.set(2.6, 1.2, 0);
      rpvGroup.add(hotNozzle);

      const coldNozzle = new THREE.Mesh(pipeGeo, pipeMatCold);
      coldNozzle.rotation.z = Math.PI / 2;
      coldNozzle.position.set(-2.6, -1.2, 0);
      rpvGroup.add(coldNozzle);
    }

    // -------------------------------------------------------------
    // MODE 2: FULL PLANT STEAM LOOP & THERMODYNAMIC FLOW
    // -------------------------------------------------------------
    else if (viewMode === 'plant-steam-loop') {
      const plantGroup = new THREE.Group();
      rootGroup.add(plantGroup);

      // 1. Reactor Pressure Vessel (Left)
      const rpvMini = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, 4.4, 24),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 })
      );
      rpvMini.position.set(-6, 0, 0);
      plantGroup.add(rpvMini);

      // 2. Steam Generator (U-Tube Vertical Vessel)
      const sgMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.2, 6.2, 24),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.75, roughness: 0.35 })
      );
      sgMesh.position.set(-1.5, 0.8, 0);
      plantGroup.add(sgMesh);

      // 3. Pressurizer Vessel
      const pzrMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 3.2, 16),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.25 })
      );
      pzrMesh.position.set(-3.8, 2.2, -1.5);
      plantGroup.add(pzrMesh);

      // 4. Connecting Primary Piping (Hot Leg Red, Cold Leg Blue)
      const hotLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 4.6, 16),
        new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.7, roughness: 0.3 })
      );
      hotLeg.rotation.z = Math.PI / 2;
      hotLeg.position.set(-3.7, 1.4, 0);
      plantGroup.add(hotLeg);

      const coldLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 4.6, 16),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.7, roughness: 0.3 })
      );
      coldLeg.rotation.z = Math.PI / 2;
      coldLeg.position.set(-3.7, -1.8, 0);
      plantGroup.add(coldLeg);

      // Reactor Coolant Pump (RCP)
      const rcp = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 })
      );
      rcp.position.set(-4.5, -1.8, 0);
      plantGroup.add(rcp);

      // 5. Steam Turbine & Generator Rotor (Right)
      turbineRotorGroup = new THREE.Group();
      turbineRotorGroup.position.set(3.5, 0.5, 0);
      plantGroup.add(turbineRotorGroup);

      const turbineHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.2, 3.8, 20),
        new THREE.MeshPhysicalMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.2, wireframe: false, transparent: true, opacity: 0.85 })
      );
      turbineHousing.rotation.z = Math.PI / 2;
      turbineRotorGroup.add(turbineHousing);

      // Blades inside
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
      for (let b = 0; b < 12; b++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 0.25), bladeMat);
        blade.rotation.x = (b * Math.PI) / 6;
        turbineRotorGroup.add(blade);
      }

      // Generator Block connected to turbine
      const genMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 1.6, 1.6),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.6, roughness: 0.4 })
      );
      genMesh.position.set(6.8, 0.5, 0);
      plantGroup.add(genMesh);

      // 6. Surface Condenser beneath turbine
      const condenserMesh = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 1.4, 2.2),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 })
      );
      condenserMesh.position.set(3.5, -1.6, 0);
      plantGroup.add(condenserMesh);

      // Secondary Steam Pipe from SG to Turbine
      const steamPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 5.0, 16),
        new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.8, roughness: 0.2 })
      );
      steamPipe.rotation.z = Math.PI / 2;
      steamPipe.position.set(1.0, 3.2, 0);
      plantGroup.add(steamPipe);

      // 7. Natural Draft Hyperbolic Cooling Tower
      const towerGroup = new THREE.Group();
      towerGroup.position.set(9.5, 0.5, -3.5);
      plantGroup.add(towerGroup);

      const towerGeo = new THREE.CylinderGeometry(1.4, 2.2, 5.5, 24, 1, true);
      const towerMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8, side: THREE.DoubleSide });
      const tower = new THREE.Mesh(towerGeo, towerMat);
      towerGroup.add(tower);
    }

    // -------------------------------------------------------------
    // MODE 3: DISASTER MITIGATION & PASSIVE SAFETY
    // -------------------------------------------------------------
    else if (viewMode === 'safety-mitigation') {
      const safetyGroup = new THREE.Group();
      rootGroup.add(safetyGroup);

      // 1. Prestressed Reinforced Concrete Containment Dome (Cutaway)
      const domeMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.7,
        metalness: 0.2,
        side: THREE.DoubleSide,
      });

      // Half-dome cylinder cutaway to look inside
      const outerDomeCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.2, 4.8, 32, 1, true, 0, Math.PI * 1.5),
        domeMat
      );
      outerDomeCyl.position.y = 0.5;
      safetyGroup.add(outerDomeCyl);

      const outerDomeTop = new THREE.Mesh(
        new THREE.SphereGeometry(4.2, 32, 16, 0, Math.PI * 1.5, 0, Math.PI / 2),
        domeMat
      );
      outerDomeTop.position.y = 2.9;
      safetyGroup.add(outerDomeTop);

      // Inner Steel Containment Vessel
      const steelVesselMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const steelDome = new THREE.Mesh(
        new THREE.CylinderGeometry(3.6, 3.6, 4.4, 24, 1, true),
        steelVesselMat
      );
      steelDome.position.y = 0.4;
      safetyGroup.add(steelDome);

      // 2. Reactor Pressure Vessel in Central Cavity
      const rpv = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 3.6, 20),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 })
      );
      rpv.position.set(0, 0.4, 0);
      safetyGroup.add(rpv);

      // 3. Passive Containment Cooling System (PCCS) Water Tank on Top
      const pccsTank = new THREE.Mesh(
        new THREE.CylinderGeometry(2.4, 2.4, 1.0, 24),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7, roughness: 0.3 })
      );
      pccsTank.position.set(0, 5.4, 0);
      safetyGroup.add(pccsTank);

      // PCCS Water Spray Particles flowing down dome
      const sprayCount = 600;
      const sprayGeo = new THREE.BufferGeometry();
      const sprayPos = new Float32Array(sprayCount * 3);
      for (let i = 0; i < sprayCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const rad = 3.62 + Math.random() * 0.15;
        sprayPos[i * 3] = Math.cos(theta) * rad;
        sprayPos[i * 3 + 1] = 0.5 + (Math.random() - 0.5) * 4.0;
        sprayPos[i * 3 + 2] = Math.sin(theta) * rad;
      }
      sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3));
      const sprayMat = new THREE.PointsMaterial({
        color: 0x7dd3fc,
        size: 0.055,
        transparent: true,
        opacity: 0.8,
      });
      pccsSprayParticles = new THREE.Points(sprayGeo, sprayMat);
      safetyGroup.add(pccsSprayParticles);

      // 4. Core Catcher (Corium Retention Crucible Beneath Cavity)
      const catcherCrucible = new THREE.Mesh(
        new THREE.CylinderGeometry(1.8, 1.4, 0.9, 20),
        new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 }) // Sacrificial refractory concrete
      );
      catcherCrucible.position.set(0, -2.4, 0);
      safetyGroup.add(catcherCrucible);

      // Glowing corium bed inside catcher
      coriumGlowMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.2, 0.2, 16),
        new THREE.MeshStandardMaterial({
          color: 0xdc2626,
          emissive: 0xb91c1c,
          emissiveIntensity: 0.8,
          roughness: 0.4,
        })
      );
      coriumGlowMesh.position.set(0, -2.2, 0);
      safetyGroup.add(coriumGlowMesh);

      // 5. Passive Autocatalytic Recombiners (PAR) on Inner Walls
      const parMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
      for (let a = 0; a < 4; a++) {
        const angle = (a * Math.PI) / 2 + 0.3;
        const parBox = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 0.3), parMat);
        parBox.position.set(Math.cos(angle) * 3.3, 1.8, Math.sin(angle) * 3.3);
        safetyGroup.add(parBox);
      }
    }

    // Attach Unified Canvas Controls
    const detachControls = attachCanvasControls(container, {
      onRotate: (deltaX, deltaY) => {
        cameraAnglesRef.theta -= deltaX;
        cameraAnglesRef.phi = Math.max(0.05, Math.min(Math.PI * 0.72, cameraAnglesRef.phi - deltaY));
      },
      onZoom: (deltaZoom) => {
        cameraAnglesRef.distance = Math.max(6, Math.min(36, cameraAnglesRef.distance + deltaZoom));
      },
      onReset: () => {
        cameraAnglesRef.theta = 0.75;
        cameraAnglesRef.phi = 0.95;
        cameraAnglesRef.distance = viewMode === 'core-chamber' ? 14 : viewMode === 'plant-steam-loop' ? 22 : 18;
        cameraAnglesRef.target.set(0, 0, 0);
      },
    });

    // Main Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // FPS tracking
      frameCount++;
      if (currentTime - fpsTimer >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        fpsTimer = currentTime;
      }

      // Auto-rotation
      const physicsMultiplier = settingsRef.current.physicsSpeed || 1.0;
      if (rotatingRef.current && settingsRef.current.autoRotate3D !== false) {
        cameraAnglesRef.theta += 0.2 * dt * physicsMultiplier;
      }
      updateCameraPos();

      // Dynamic animations per mode
      const isScram = scramRef.current;
      const curPower = powerRef.current;
      const insertion = rodRef.current;
      const isSBO = scenarioRef.current === 'station-blackout';

      // Mode 1: Core updates
      if (controlRodSpiderGroup) {
        // Rod position: 0% -> y = 2.4 (high), 100% -> y = 0.0 (fully inserted)
        const targetY = 2.4 - (insertion / 100) * 2.4;
        controlRodSpiderGroup.position.y += (targetY - controlRodSpiderGroup.position.y) * 0.12 * Math.min(physicsMultiplier, 2.0);
      }

      if (cherenkovParticles && cherenkovMaterial) {
        cherenkovParticles.visible = cherenkovRef.current;
        if (cherenkovRef.current) {
          cherenkovParticles.rotation.y += 0.012 * physicsMultiplier;
          const glowFactor = isScram ? 0.25 : Math.max(0.2, curPower / 3400);
          cherenkovMaterial.opacity = (0.5 + Math.sin(currentTime * 0.004) * 0.15) * glowFactor;
          blueGlowLight.intensity = glowFactor * 3.0;
        } else {
          blueGlowLight.intensity = 0.1;
        }
      }

      if (coolantParticles) {
        coolantParticles.rotation.y += 0.005 * physicsMultiplier;
        const flowSpeed = (isSBO ? 0.25 : 1.8) * physicsMultiplier; // Natural circulation vs pumped flow
        const cPositions = coolantParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < cPositions.length; i += 3) {
          cPositions[i] += flowSpeed * dt;
          if (cPositions[i] > 2.5) cPositions[i] = -2.5;
        }
        coolantParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Mode 2: Turbine rotation
      if (turbineRotorGroup) {
        const spinSpeed = (isSBO ? 0 : (curPower / 3400) * 8.0) * physicsMultiplier;
        turbineRotorGroup.rotation.x += spinSpeed * dt;
      }

      // Mode 3: PCCS spray flow & corium decay heat
      if (pccsSprayParticles) {
        const pccsActive = isSBO || isScram;
        pccsSprayParticles.visible = pccsActive;
        if (pccsActive) {
          const sprayPositions = pccsSprayParticles.geometry.attributes.position.array as Float32Array;
          for (let i = 1; i < sprayPositions.length; i += 3) {
            sprayPositions[i] -= 2.2 * dt * physicsMultiplier;
            if (sprayPositions[i] < -1.8) sprayPositions[i] = 2.5;
          }
          pccsSprayParticles.geometry.attributes.position.needsUpdate = true;
        }
      }

      if (coriumGlowMesh) {
        const coriumActive = isSBO || isScram;
        const coriumMat = coriumGlowMesh.material as THREE.MeshStandardMaterial;
        coriumMat.emissiveIntensity = coriumActive
          ? 0.5 + Math.sin(currentTime * 0.005) * 0.35
          : 0.15;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Responsive Resize Handler with ResizeObserver
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      detachControls();

      // Cleanly dispose all Three.js geometries and materials (prevent WebGL memory leaks)
      const disposedGeometries = new Set<THREE.BufferGeometry>();
      const disposedMaterials = new Set<THREE.Material>();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
          if (obj.geometry && !disposedGeometries.has(obj.geometry)) {
            obj.geometry.dispose();
            disposedGeometries.add(obj.geometry);
          }
          if (obj.material) {
            const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
            materials.forEach((mat) => {
              if (mat && !disposedMaterials.has(mat)) {
                mat.dispose();
                disposedMaterials.add(mat);
              }
            });
          }
        }
      });

      renderer.dispose();
      scene.clear();
    };
  }, [viewMode, settings.graphicsQuality, settings.particleDensity]);

  return (
    <div
      ref={containerWrapperRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex flex-col select-none transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[640px]'
      }`}
    >
      {/* 1. TOP HEADER & TELEMETRY STATUS BAR */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Mode Title & Discipline Tag */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
                {language === 'en' ? 'Nuclear Fission Lab' : 'Lab Fisi Nuklir'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <span className={`w-1.5 h-1.5 rounded-full ${isScrammed ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'}`} />
                {language === 'en' ? coreMetrics.statusEn : coreMetrics.statusId}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {viewMode === 'core-chamber' && (language === 'en' ? 'Core Chamber & Control Rod Dynamics' : 'Teras Reaktor & Dinamika Batang Kendali')}
              {viewMode === 'plant-steam-loop' && (language === 'en' ? 'PWR Thermodynamic Steam Loop' : 'Loop Uap Termodinamika PWR')}
              {viewMode === 'safety-mitigation' && (language === 'en' ? 'Disaster Mitigation & Passive Safety' : 'Mitigasi Bencana & Keselamatan Pasif')}
            </h3>
          </div>
        </div>

        {/* Center: Mode Switching Segmented Controls */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => setViewMode('core-chamber')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'core-chamber'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Core & Rods' : 'Teras & Kendali'}
          </button>
          <button
            onClick={() => setViewMode('plant-steam-loop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'plant-steam-loop'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Plant Steam Cycle' : 'Siklus Uap PLTN'}
          </button>
          <button
            onClick={() => setViewMode('safety-mitigation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'safety-mitigation'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Safety & Disaster' : 'Keselamatan Pasif'}
          </button>
        </div>

        {/* Right: Actions (Rotate, Fullscreen, FPS) */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>{fps} FPS</span>
          </div>

          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause rotation' : 'Auto-rotate'}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isRotating
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowMetricsDrawer(!showMetricsDrawer)}
            title="Toggle telemetry metrics"
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showMetricsDrawer
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. THREE.JS 3D CANVAS MOUNT */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Real-time Telemetry HUD */}
      <TelemetryHUD fps={fps} />

      {/* 3. INTERACTIVE CONTROL DRAWER (BOTTOM OVERLAY) */}
      {showMetricsDrawer && (
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl">
            {/* Column 1: Control Rod Slider & SCRAM Button */}
            <div className="md:col-span-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'en' ? 'Control Rod Insertion' : 'Penyisipan Batang Kendali'}
                </span>
                <span className="font-mono font-bold text-amber-400">{controlRodInsertion}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                disabled={isScrammed}
                value={controlRodInsertion}
                onChange={(e) => setControlRodInsertion(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>0% ({language === 'en' ? 'Withdrawn' : 'Ditarik'})</span>
                <span>25% ({language === 'en' ? 'Critical' : 'Kritis'})</span>
                <span>100% ({language === 'en' ? 'Inserted' : 'Masuk Penuh'})</span>
              </div>
            </div>

            {/* Column 2: Emergency Trip / Reset Controls */}
            <div className="md:col-span-3 flex flex-col gap-2">
              {!isScrammed ? (
                <button
                  onClick={handleTriggerScram}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-98 text-white font-black tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 border border-red-400 transition-all cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                  <span>{language === 'en' ? 'EMERGENCY SCRAM TRIP' : 'PEMADAMAN DARURAT SCRAM'}</span>
                </button>
              ) : (
                <button
                  onClick={handleResetReactor}
                  className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'en' ? 'Reset Reactor to Critical' : 'Atur Ulang ke Kondisi Kritis'}</span>
                </button>
              )}

              {/* Scenario Toggle */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSafetyScenario(safetyScenario === 'station-blackout' ? 'normal' : 'station-blackout')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer text-center ${
                    safetyScenario === 'station-blackout'
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {safetyScenario === 'station-blackout' ? 'SBO Active' : 'Test SBO'}
                </button>
                <button
                  onClick={() => setShowCherenkovGlow(!showCherenkovGlow)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer text-center ${
                    showCherenkovGlow
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700'
                  }`}
                >
                  {language === 'en' ? 'Cherenkov' : 'Cherenkov'}
                </button>
              </div>
            </div>

            {/* Column 3: Live Thermodynamic Telemetry Grid */}
            <div className="md:col-span-5 grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">{language === 'en' ? 'Multiplication' : 'Multiplikasi'}</div>
                <div className="text-sm font-black font-mono text-amber-400">{coreMetrics.keff}</div>
                <div className="text-[10px] text-slate-500 font-mono">{coreMetrics.reactivityDollar} $</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">{language === 'en' ? 'Thermal Power' : 'Daya Termal'}</div>
                <div className="text-sm font-black font-mono text-white">{coreMetrics.thermalPowerMw} MWth</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {Math.round(coreMetrics.thermalPowerMw * 0.338)} MWe (η 33.8%)
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">{language === 'en' ? 'Core Temp & Flow' : 'Suhu & Aliran'}</div>
                <div className="text-sm font-black font-mono text-rose-400">{coreMetrics.coreTempC} °C</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {coreMetrics.coolantPressureMpa} MPa • {coreMetrics.coolantFlowKgS.toLocaleString()} kg/s
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
