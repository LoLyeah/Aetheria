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
  Fuel,
  Gauge,
  Info,
  Maximize2,
  Minimize2,
  ChevronRight,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export type HybridArchitecture = 'MHEV' | 'HEV' | 'PHEV' | 'EREV';
export type DrivingState = 'ev' | 'parallel' | 'cruise' | 'regen';

interface HybridPowertrainViewerProps {
  moduleId?: string;
}

export const HybridPowertrainViewer: React.FC<HybridPowertrainViewerProps> = ({ moduleId }) => {
  const { language, settings, selectedModuleId } = useLearning();
  const activeModuleId = moduleId || selectedModuleId;
  const mountRef = useRef<HTMLDivElement>(null);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  // Derived default architecture from current module
  const defaultArch = useMemo<HybridArchitecture>(() => {
    if (activeModuleId === 'hyb-mod-2') return 'MHEV';
    if (activeModuleId === 'hyb-mod-3') return 'HEV';
    if (activeModuleId === 'hyb-mod-4') return 'PHEV';
    if (activeModuleId === 'hyb-mod-5') return 'EREV';
    return 'HEV';
  }, [activeModuleId]);

  // Core Interactive State
  const [architecture, setArchitecture] = useState<HybridArchitecture>(defaultArch);
  const [prevModuleId, setPrevModuleId] = useState(activeModuleId);

  // Synchronize architecture when navigating between hybrid modules
  if (activeModuleId !== prevModuleId) {
    setPrevModuleId(activeModuleId);
    setArchitecture(defaultArch);
  }

  const [drivingState, setDrivingState] = useState<DrivingState>('parallel');
  const [speedKmh, setSpeedKmh] = useState<number>(65); // 0 - 150 km/h
  const [throttlePercent, setThrottlePercent] = useState<number>(50); // 0 - 100%
  const [batterySoc, setBatterySoc] = useState<number>(68); // 10 - 100%
  const [roadGrade, setRoadGrade] = useState<number>(0); // -8% to +12%
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe'>('solid');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMetricsDrawer, setShowMetricsDrawer] = useState<boolean>(true);

  // Performance Telemetry
  const [fps, setFps] = useState<number>(60);

  // References for render loop
  const archRef = useRef(architecture);
  const stateRef = useRef(drivingState);
  const speedRef = useRef(speedKmh);
  const throttleRef = useRef(throttlePercent);
  const isRotatingRef = useRef(isRotating);
  const settingsRef = useRef(settings);

  useEffect(() => {
    archRef.current = architecture;
    stateRef.current = drivingState;
    speedRef.current = speedKmh;
    throttleRef.current = throttlePercent;
    isRotatingRef.current = isRotating;
    settingsRef.current = settings;
  }, [architecture, drivingState, speedKmh, throttlePercent, isRotating, settings]);

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animatedPartsRef = useRef<{
    crankshaft?: THREE.Mesh;
    pistons: THREE.Mesh[];
    sunGear?: THREE.Mesh;
    planetCarrier?: THREE.Group;
    planets: THREE.Mesh[];
    ringGear?: THREE.Mesh;
    mg1Rotor?: THREE.Mesh;
    mg2Rotor?: THREE.Mesh;
    propShaft?: THREE.Mesh;
    wheels: THREE.Group[];
    clutchK0?: THREE.Mesh;
    particleSystem?: THREE.Points;
    particleMaterial?: THREE.PointsMaterial;
    particlePositions?: Float32Array;
    batteryLeds: THREE.Mesh[];
  }>({
    pistons: [],
    planets: [],
    wheels: [],
    batteryLeds: [],
  });

  // Camera Orbit Angles
  const cameraAnglesRef = useRef({
    theta: 0.6,
    phi: 0.85,
    distance: 14,
    target: new THREE.Vector3(0, 0, 0),
  });

  // Derived Physical Metrics based on Architecture and State
  const physics = useMemo(() => {
    const isMhev = architecture === 'MHEV';
    const isHev = architecture === 'HEV';
    const isPhev = architecture === 'PHEV';
    const isErev = architecture === 'EREV';

    // Effective vehicle speed in m/s
    const vMs = (speedKmh * 1000) / 3600;
    const roadLoadKw = Math.max(
      2,
      (0.5 * 1.2 * 0.26 * 2.3 * Math.pow(vMs, 3)) / 1000 +
        (0.01 * 1800 * 9.81 * vMs) / 1000 +
        (1800 * 9.81 * (roadGrade / 100) * vMs) / 1000
    );

    let engineRpm = 0;
    let enginePowerKw = 0;
    let mg1PowerKw = 0; // Generation/Control
    let mg2PowerKw = 0; // Traction Motor
    let fuelRateL100km = 0;
    let thermalEffPercent = 0;
    let batteryPowerKw = 0; // Positive = discharging, negative = charging

    if (drivingState === 'ev') {
      if (isMhev) {
        // MHEV cannot drive pure EV; fallback to minimal engine crawl
        engineRpm = 850;
        enginePowerKw = Math.min(12, roadLoadKw);
        mg2PowerKw = 0;
        fuelRateL100km = 4.8;
        thermalEffPercent = 28.5;
      } else {
        // Pure EV Mode
        engineRpm = 0;
        enginePowerKw = 0;
        fuelRateL100km = 0;
        thermalEffPercent = 0;
        mg2PowerKw = roadLoadKw * 1.1; // Inverter/motor losses
        batteryPowerKw = mg2PowerKw / 0.94;
      }
    } else if (drivingState === 'parallel') {
      // High Acceleration / Boost Mode
      if (isMhev) {
        engineRpm = Math.min(5500, 1500 + throttlePercent * 40);
        enginePowerKw = (throttlePercent / 100) * 160;
        mg2PowerKw = Math.min(12, (throttlePercent / 100) * 12); // 48V boost limit
        batteryPowerKw = mg2PowerKw / 0.88;
        fuelRateL100km = 8.4;
        thermalEffPercent = 34.5;
      } else if (isHev) {
        engineRpm = Math.min(4800, 1800 + throttlePercent * 30);
        enginePowerKw = (throttlePercent / 100) * 115;
        mg1PowerKw = enginePowerKw * 0.28; // Reaction torque generation
        mg2PowerKw = (throttlePercent / 100) * 75 + mg1PowerKw;
        batteryPowerKw = 28;
        fuelRateL100km = 5.2;
        thermalEffPercent = 40.8;
      } else if (isPhev) {
        engineRpm = Math.min(5200, 1800 + throttlePercent * 34);
        enginePowerKw = (throttlePercent / 100) * 145;
        mg2PowerKw = (throttlePercent / 100) * 105; // P2 Motor
        batteryPowerKw = mg2PowerKw / 0.92;
        fuelRateL100km = 3.6;
        thermalEffPercent = 39.4;
      } else {
        // EREV: Engine strictly generates electricity for battery and motor
        engineRpm = 3200; // Optimal fixed BSFC plateau
        enginePowerKw = 75;
        mg1PowerKw = 70; // 93% generator efficiency
        mg2PowerKw = (throttlePercent / 100) * 180; // Powerful drive motor
        batteryPowerKw = Math.max(-20, mg2PowerKw - mg1PowerKw);
        fuelRateL100km = 4.2;
        thermalEffPercent = 41.2;
      }
    } else if (drivingState === 'cruise') {
      // Steady State Cruising
      if (isMhev) {
        engineRpm = 2100;
        enginePowerKw = roadLoadKw;
        fuelRateL100km = 5.6;
        thermalEffPercent = 33.2;
      } else if (isHev) {
        engineRpm = 1950;
        enginePowerKw = roadLoadKw * 1.15; // Splits to wheels and small charge
        mg1PowerKw = enginePowerKw * 0.28;
        mg2PowerKw = Math.max(0, roadLoadKw - enginePowerKw * 0.72);
        batteryPowerKw = -3.5; // Opportunistic charging
        fuelRateL100km = 4.1;
        thermalEffPercent = 41.5;
      } else if (isPhev) {
        engineRpm = batterySoc > 20 ? 0 : 2200;
        enginePowerKw = batterySoc > 20 ? 0 : roadLoadKw * 1.1;
        mg2PowerKw = batterySoc > 20 ? roadLoadKw : 0;
        batteryPowerKw = batterySoc > 20 ? roadLoadKw / 0.94 : -4.0;
        fuelRateL100km = batterySoc > 20 ? 0 : 4.4;
        thermalEffPercent = batterySoc > 20 ? 0 : 40.2;
      } else {
        // EREV: Silent EV cruise if SoC > 20%, generator runs if low
        if (batterySoc > 20) {
          engineRpm = 0;
          enginePowerKw = 0;
          mg2PowerKw = roadLoadKw;
          batteryPowerKw = roadLoadKw / 0.93;
          fuelRateL100km = 0;
          thermalEffPercent = 0;
        } else {
          engineRpm = 2400; // Peak BSFC point
          enginePowerKw = 55;
          mg1PowerKw = 51;
          mg2PowerKw = roadLoadKw;
          batteryPowerKw = -(mg1PowerKw - mg2PowerKw);
          fuelRateL100km = 4.6;
          thermalEffPercent = 41.4;
        }
      }
    } else {
      // Regenerative Braking
      engineRpm = 0;
      enginePowerKw = 0;
      fuelRateL100km = 0;
      thermalEffPercent = 0;
      const maxRegenKw = isMhev ? 12 : isHev ? 35 : 75;
      mg2PowerKw = -Math.min(maxRegenKw, (speedKmh / 100) * maxRegenKw);
      batteryPowerKw = mg2PowerKw * 0.88;
    }

    const netWheelTorqueNm = Math.round(
      speedKmh > 0 ? ((Math.abs(mg2PowerKw) + (isErev ? 0 : enginePowerKw * 0.7)) * 9550) / Math.max(300, (vMs / 0.33) * (60 / (2 * Math.PI))) : 0
    );

    return {
      engineRpm: Math.round(engineRpm),
      enginePowerKw: Number(enginePowerKw.toFixed(1)),
      mg1PowerKw: Number(mg1PowerKw.toFixed(1)),
      mg2PowerKw: Number(mg2PowerKw.toFixed(1)),
      batteryPowerKw: Number(batteryPowerKw.toFixed(1)),
      fuelRateL100km: Number(fuelRateL100km.toFixed(1)),
      thermalEffPercent: Number(thermalEffPercent.toFixed(1)),
      netWheelTorqueNm: Math.max(0, netWheelTorqueNm),
      roadLoadKw: Number(roadLoadKw.toFixed(1)),
    };
  }, [architecture, drivingState, speedKmh, throttlePercent, batterySoc, roadGrade]);

  // Fullscreen Management
  const toggleFullscreen = () => {
    if (!containerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      containerWrapperRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: settings.graphicsQuality !== 'performance',
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    const pixelRatio = settings.graphicsQuality === 'performance' ? 1.0 : Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(8, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf97316, 1.4);
    dirLight2.position.set(-8, -6, -8);
    scene.add(dirLight2);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(24, 24, 0x334155, 0x1e293b);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // Main Powertrain Assembly Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Reset animated parts
    animatedPartsRef.current = {
      pistons: [],
      planets: [],
      wheels: [],
      batteryLeds: [],
    };

    const isWire = renderMode === 'wireframe';

    // 1. ENGINE BLOCK (Front ICE)
    const engineGroup = new THREE.Group();
    engineGroup.position.set(-3.2, 0, 0);
    modelGroup.add(engineGroup);

    const blockGeo = new THREE.BoxGeometry(2.2, 1.4, 1.6);
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.8,
      roughness: 0.35,
      wireframe: isWire,
    });
    const blockMesh = new THREE.Mesh(blockGeo, blockMat);
    engineGroup.add(blockMesh);

    // 4 Cylinders with animated pistons
    for (let c = 0; c < 4; c++) {
      const cylGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.9, 16);
      const cylMat = new THREE.MeshPhysicalMaterial({
        color: 0xef4444,
        emissive: 0x991b1b,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.85,
        wireframe: isWire,
      });
      const piston = new THREE.Mesh(cylGeo, cylMat);
      piston.position.set(-0.75 + c * 0.5, 0.3, 0);
      engineGroup.add(piston);
      animatedPartsRef.current.pistons.push(piston);
    }

    // Engine crankshaft pulley
    const crankGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 20);
    const crankMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const crankPulley = new THREE.Mesh(crankGeo, crankMat);
    crankPulley.rotation.z = Math.PI / 2;
    crankPulley.position.set(1.2, -0.2, 0);
    engineGroup.add(crankPulley);
    animatedPartsRef.current.crankshaft = crankPulley;

    // 2. TRANSMISSION & COUPLING SECTION
    const transGroup = new THREE.Group();
    transGroup.position.set(-1.0, 0, 0);
    modelGroup.add(transGroup);

    if (architecture === 'HEV') {
      // PLANETARY GEAR POWER-SPLIT (e-CVT)
      const sunGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.35, 20);
      const sunMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.2, wireframe: isWire });
      const sunGear = new THREE.Mesh(sunGeo, sunMat);
      sunGear.rotation.z = Math.PI / 2;
      transGroup.add(sunGear);
      animatedPartsRef.current.sunGear = sunGear;

      const carrierGroup = new THREE.Group();
      transGroup.add(carrierGroup);
      animatedPartsRef.current.planetCarrier = carrierGroup;

      const planetMat = new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.85, roughness: 0.2, wireframe: isWire });
      for (let p = 0; p < 4; p++) {
        const pAng = (p / 4) * Math.PI * 2;
        const pGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.32, 16);
        const planet = new THREE.Mesh(pGeo, planetMat);
        planet.position.set(0, Math.cos(pAng) * 0.95, Math.sin(pAng) * 0.95);
        planet.rotation.z = Math.PI / 2;
        carrierGroup.add(planet);
        animatedPartsRef.current.planets.push(planet);
      }

      // Outer Ring Gear (Annulus)
      const ringGeo = new THREE.TorusGeometry(1.4, 0.16, 16, 36);
      const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x10b981, metalness: 0.9, roughness: 0.2, wireframe: isWire });
      const ringGear = new THREE.Mesh(ringGeo, ringMat);
      ringGear.rotation.y = Math.PI / 2;
      transGroup.add(ringGear);
      animatedPartsRef.current.ringGear = ringGear;
    } else if (architecture === 'PHEV') {
      // K0 DISCONNECT CLUTCH & P2 MOTOR
      const clutchGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.25, 24);
      const clutchMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.9, roughness: 0.25, wireframe: isWire });
      const clutch = new THREE.Mesh(clutchGeo, clutchMat);
      clutch.rotation.z = Math.PI / 2;
      clutch.position.set(-0.6, 0, 0);
      transGroup.add(clutch);
      animatedPartsRef.current.clutchK0 = clutch;

      // P2 High-Voltage Electric Motor
      const p2Geo = new THREE.CylinderGeometry(1.0, 1.0, 0.8, 28);
      const p2Mat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.25, wireframe: isWire });
      const p2Motor = new THREE.Mesh(p2Geo, p2Mat);
      p2Motor.rotation.z = Math.PI / 2;
      p2Motor.position.set(0.4, 0, 0);
      transGroup.add(p2Motor);
      animatedPartsRef.current.mg2Rotor = p2Motor;
    } else if (architecture === 'MHEV') {
      // P0 48V BELT STARTER-GENERATOR
      const bsgGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.6, 20);
      const bsgMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.25, wireframe: isWire });
      const bsg = new THREE.Mesh(bsgGeo, bsgMat);
      bsg.rotation.z = Math.PI / 2;
      bsg.position.set(-1.0, 0.9, 0);
      transGroup.add(bsg);
      animatedPartsRef.current.mg1Rotor = bsg;

      // Conventional Gearbox
      const gbGeo = new THREE.BoxGeometry(1.4, 1.1, 1.1);
      const gbMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.4, wireframe: isWire });
      const gb = new THREE.Mesh(gbGeo, gbMat);
      gb.position.set(0.3, 0, 0);
      transGroup.add(gb);
    } else {
      // EREV: Pure Series Generator coupled to engine, NO mechanical transmission link!
      const genGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.9, 24);
      const genMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.2, wireframe: isWire });
      const genMesh = new THREE.Mesh(genGeo, genMat);
      genMesh.rotation.z = Math.PI / 2;
      genMesh.position.set(-0.4, 0, 0);
      transGroup.add(genMesh);
      animatedPartsRef.current.mg1Rotor = genMesh;

      // Air gap showing complete mechanical decoupling!
      const gapSignGeo = new THREE.RingGeometry(0.4, 0.6, 20);
      const gapSignMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
      const gapSign = new THREE.Mesh(gapSignGeo, gapSignMat);
      gapSign.position.set(0.6, 0, 0);
      gapSign.rotation.y = Math.PI / 2;
      transGroup.add(gapSign);
    }

    // 3. BATTERY PACK & POWER ELECTRONICS (Center Chassis)
    const battGroup = new THREE.Group();
    battGroup.position.set(1.2, -0.6, 0);
    modelGroup.add(battGroup);

    // Battery pack dimensions vary by architecture
    const battDims =
      architecture === 'MHEV'
        ? [0.8, 0.35, 0.9]
        : architecture === 'HEV'
        ? [1.2, 0.45, 1.3]
        : architecture === 'PHEV'
        ? [2.2, 0.48, 1.8]
        : [2.6, 0.52, 2.0]; // EREV large 40 kWh pack

    const packGeo = new THREE.BoxGeometry(battDims[0], battDims[1], battDims[2]);
    const packMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: isWire,
    });
    const packMesh = new THREE.Mesh(packGeo, packMat);
    battGroup.add(packMesh);

    // Glowing State of Charge cell strips on battery
    const cellCount = 6;
    for (let c = 0; c < cellCount; c++) {
      const cellGeo = new THREE.BoxGeometry(battDims[0] * 0.12, 0.08, battDims[2] * 0.8);
      const cellMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const cell = new THREE.Mesh(cellGeo, cellMat);
      cell.position.set(-battDims[0] * 0.4 + c * (battDims[0] * 0.16), battDims[1] / 2 + 0.04, 0);
      battGroup.add(cell);
      animatedPartsRef.current.batteryLeds.push(cell);
    }

    // High Voltage Inverter Module
    const invGeo = new THREE.BoxGeometry(0.9, 0.5, 0.8);
    const invMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.15, wireframe: isWire });
    const invMesh = new THREE.Mesh(invGeo, invMat);
    invMesh.position.set(0.2, 0.5, 0);
    battGroup.add(invMesh);

    // 4. REAR AXLE & TRACTION MOTOR
    const rearGroup = new THREE.Group();
    rearGroup.position.set(3.8, 0, 0);
    modelGroup.add(rearGroup);

    // Rear electric traction motor (PMSM)
    const rearMotorGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.9, 24);
    const rearMotorMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: isWire,
    });
    const rearMotor = new THREE.Mesh(rearMotorGeo, rearMotorMat);
    rearMotor.rotation.z = Math.PI / 2;
    rearGroup.add(rearMotor);
    animatedPartsRef.current.mg2Rotor = rearMotor;

    // Rear Differential & Axle Shafts
    const diffGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const diffMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 });
    const diffMesh = new THREE.Mesh(diffGeo, diffMat);
    rearGroup.add(diffMesh);

    const axleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.4, 12);
    const axleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const rearAxle = new THREE.Mesh(axleGeo, axleMat);
    rearAxle.rotation.x = Math.PI / 2;
    rearGroup.add(rearAxle);

    // 4 Wheels
    const createWheel = (pos: [number, number, number]) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(...pos);

      const tireGeo = new THREE.TorusGeometry(0.9, 0.32, 16, 28);
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 });
      const tire = new THREE.Mesh(tireGeo, tireMat);

      const rimGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 16);
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;

      wGroup.add(tire);
      wGroup.add(rim);
      return wGroup;
    };

    const frontLeft = createWheel([-3.2, 0, 1.8]);
    const frontRight = createWheel([-3.2, 0, -1.8]);
    const rearLeft = createWheel([3.8, 0, 1.8]);
    const rearRight = createWheel([3.8, 0, -1.8]);

    modelGroup.add(frontLeft);
    modelGroup.add(frontRight);
    modelGroup.add(rearLeft);
    modelGroup.add(rearRight);
    animatedPartsRef.current.wheels = [frontLeft, frontRight, rearLeft, rearRight];

    // 5. DYNAMIC ENERGY FLOW PARTICLE STREAM
    const pCount = settings.particleDensity ? Math.round(600 * (settings.particleDensity / 100)) : 600;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 8.0;
      pPositions[i + 1] = -0.4 + Math.random() * 0.8;
      pPositions[i + 2] = (Math.random() - 0.5) * 1.6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(pGeo, pMat);
    modelGroup.add(particleSystem);

    animatedPartsRef.current.particleSystem = particleSystem;
    animatedPartsRef.current.particleMaterial = pMat;
    animatedPartsRef.current.particlePositions = pPositions;

    // Attach User Interaction Orbit / Zoom / Drag
    const detachControls = attachCanvasControls(container, {
      onRotate: (dx, dy) => {
        setIsRotating(false);
        cameraAnglesRef.current.theta -= dx * 1.5;
        cameraAnglesRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, cameraAnglesRef.current.phi - dy * 1.5));
      },
      onZoom: (dz) => {
        cameraAnglesRef.current.distance = Math.max(6, Math.min(26, cameraAnglesRef.current.distance + dz * 6));
      },
      onReset: () => {
        cameraAnglesRef.current = {
          theta: 0.6,
          phi: 0.85,
          distance: 14,
          target: new THREE.Vector3(0, 0, 0),
        };
      },
    });

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    });
    resizeObserver.observe(container);

    // 60 FPS Render Loop
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      const now = performance.now();
      const rawDt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const physicsMultiplier = settingsRef.current.physicsSpeed || 1.0;
      const dt = rawDt * physicsMultiplier;

      frameCount++;
      if (now - fpsTimer >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        fpsTimer = now;
      }

      // Auto-Rotation
      const shouldRotate = isRotatingRef.current && (settingsRef.current.autoRotate3D !== false);
      if (shouldRotate) {
        cameraAnglesRef.current.theta += 0.25 * dt;
      }

      // Update Camera Position from Spherical Coordinates
      const { theta, phi, distance, target } = cameraAnglesRef.current;
      const cx = target.x + distance * Math.sin(phi) * Math.sin(theta);
      const cy = target.y + distance * Math.cos(phi);
      const cz = target.z + distance * Math.sin(phi) * Math.cos(theta);
      camera.position.set(cx, cy, cz);
      camera.lookAt(target);

      // Animate Mechanical Parts
      const currentSpeed = speedRef.current;
      const currentThrottle = throttleRef.current;
      const currentState = stateRef.current;
      const currentArch = archRef.current;

      const wheelRotSpeed = (currentSpeed / 30) * 12; // rad/s approx
      const engineRunning = currentState !== 'ev' || currentArch === 'MHEV';
      const enginePistonSpeed = engineRunning ? (15 + currentThrottle * 0.4) : 0;

      // Crankshaft & Piston reciprocating animation
      if (animatedPartsRef.current.crankshaft && engineRunning) {
        animatedPartsRef.current.crankshaft.rotation.x += enginePistonSpeed * dt;
      }

      animatedPartsRef.current.pistons.forEach((p, idx) => {
        if (engineRunning) {
          p.position.y = 0.3 + Math.sin(now * 0.015 * (1 + currentThrottle * 0.02) + idx * Math.PI) * 0.18;
        } else {
          p.position.y = 0.3;
        }
      });

      // Planetary Gear Speeds
      if (animatedPartsRef.current.sunGear) {
        animatedPartsRef.current.sunGear.rotation.x += (wheelRotSpeed * 0.8) * dt;
      }
      if (animatedPartsRef.current.planetCarrier && engineRunning) {
        animatedPartsRef.current.planetCarrier.rotation.x += (enginePistonSpeed * 0.4) * dt;
      }
      if (animatedPartsRef.current.ringGear) {
        animatedPartsRef.current.ringGear.rotation.x += wheelRotSpeed * dt;
      }
      animatedPartsRef.current.planets.forEach((pl) => {
        pl.rotation.x -= (wheelRotSpeed * 1.4) * dt;
      });

      // Electric Motor Rotors & Generators
      if (animatedPartsRef.current.mg1Rotor) {
        const mg1RotSpeed =
          currentArch === 'MHEV' || currentArch === 'EREV'
            ? (engineRunning ? enginePistonSpeed * 1.4 : 0)
            : wheelRotSpeed * 0.85;
        animatedPartsRef.current.mg1Rotor.rotation.x += mg1RotSpeed * dt;
      }
      if (animatedPartsRef.current.mg2Rotor) {
        animatedPartsRef.current.mg2Rotor.rotation.x += wheelRotSpeed * dt;
      }

      // Rolling Wheels Animation
      if (animatedPartsRef.current.wheels && animatedPartsRef.current.wheels.length > 0) {
        animatedPartsRef.current.wheels.forEach((w) => {
          w.rotation.z += (currentSpeed > 0 ? 1 : 0) * wheelRotSpeed * dt;
        });
      }

      // Animate Energy Flow Particle Stream
      if (animatedPartsRef.current.particleSystem && animatedPartsRef.current.particlePositions) {
        const positions = animatedPartsRef.current.particlePositions;
        const count = positions.length / 3;
        const flowDir = currentState === 'regen' ? -1 : 1;
        const flowSpeed = (currentSpeed / 40 + 0.8) * dt * 4.0;

        for (let i = 0; i < count; i++) {
          positions[i * 3] += flowDir * flowSpeed;

          // Wrap particles across powertrain chassis length (-4.0 to +4.0)
          if (positions[i * 3] > 4.2) positions[i * 3] = -4.2;
          if (positions[i * 3] < -4.2) positions[i * 3] = 4.2;
        }

        animatedPartsRef.current.particleSystem.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      detachControls();

      // Clean up Three.js allocations
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [architecture, renderMode, settings.graphicsQuality, settings.particleDensity]);

  // Reactive updates for parameters that do NOT require rebuilding the 3D scene
  useEffect(() => {
    // 1. Update battery SoC LEDs without re-initializing WebGL
    if (animatedPartsRef.current.batteryLeds.length > 0) {
      animatedPartsRef.current.batteryLeds.forEach((led, idx) => {
        const activeCell = idx < Math.round((batterySoc / 100) * 6);
        const hex = activeCell ? (batterySoc > 25 ? 0x10b981 : 0xf59e0b) : 0x334155;
        (led.material as THREE.MeshBasicMaterial).color.setHex(hex);
      });
    }

    // 2. Update particle stream color based on driving state
    if (animatedPartsRef.current.particleMaterial) {
      const particleColor =
        drivingState === 'ev'
          ? 0x38bdf8
          : drivingState === 'parallel'
          ? 0xf97316
          : drivingState === 'cruise'
          ? 0xf59e0b
          : 0x10b981;
      animatedPartsRef.current.particleMaterial.color.setHex(particleColor);
    }

    // 3. Update PHEV K0 disconnect clutch visual indicator
    if (animatedPartsRef.current.clutchK0) {
      const isClutchEngaged = drivingState === 'parallel' || (drivingState === 'cruise' && batterySoc <= 20);
      (animatedPartsRef.current.clutchK0.material as THREE.MeshStandardMaterial).color.setHex(
        isClutchEngaged ? 0x10b981 : 0xef4444
      );
    }
  }, [batterySoc, drivingState]);

  return (
    <div
      ref={containerWrapperRef}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between select-none transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[640px] sm:h-[720px]'
      }`}
    >
      {/* 1. TOP HEADER & ARCHITECTURE SELECTION BAR */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4.5 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md">
        {/* Architecture Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {(['MHEV', 'HEV', 'PHEV', 'EREV'] as HybridArchitecture[]).map((arch) => {
            const isSelected = architecture === arch;
            return (
              <button
                key={arch}
                onClick={() => setArchitecture(arch)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-slate-950 shadow-md scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {arch}
              </button>
            );
          })}
        </div>

        {/* Driving States Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {[
            { id: 'ev', label: { en: 'EV Mode', id: 'Mode EV' }, color: 'text-sky-400' },
            { id: 'parallel', label: { en: 'Boost / Parallel', id: 'Paralel / Boost' }, color: 'text-orange-400' },
            { id: 'cruise', label: { en: 'Cruise / Split', id: 'Jelajah / Split' }, color: 'text-amber-400' },
            { id: 'regen', label: { en: 'Regen Brake', id: 'Rem Regen' }, color: 'text-emerald-400' },
          ].map((mode) => {
            const isSelected = drivingState === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setDrivingState(mode.id as DrivingState)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={isSelected ? mode.color : ''}>{mode.label[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Control Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isRotating
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={isRotating ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setRenderMode((m) => (m === 'solid' ? 'wireframe' : 'solid'))}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              renderMode === 'wireframe'
                ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowMetricsDrawer((prev) => !prev)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              showMetricsDrawer
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Metrics Telemetry"
          >
            <Gauge className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. THREE.JS 3D CANVAS VIEWPORT */}
      <div ref={mountRef} className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden" />

      {/* Telemetry HUD */}
      <TelemetryHUD fps={fps} />

      {/* 3. FLOATING HUD OVERLAYS */}
      {/* Top-Left Architecture Card */}
      <div className="absolute top-18 left-4 z-10 pointer-events-none max-w-xs sm:max-w-sm">
        <div className="p-3 rounded-2xl bg-slate-900/85 border border-slate-800/80 backdrop-blur-md shadow-lg text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold uppercase tracking-wider text-orange-400 text-[11px]">
              {architecture === 'MHEV' && (language === 'en' ? 'Mild Hybrid (48V BSG)' : 'Mild Hybrid (48V BSG)')}
              {architecture === 'HEV' && (language === 'en' ? 'Series-Parallel e-CVT' : 'Serial-Paralel e-CVT')}
              {architecture === 'PHEV' && (language === 'en' ? 'Parallel P2 + e-Axle' : 'Paralel P2 + e-Axle')}
              {architecture === 'EREV' && (language === 'en' ? 'Series Range Extender' : 'Range Extender Serial')}
            </span>
            <span className="text-[10px] font-mono text-slate-500">{fps} FPS</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {architecture === 'MHEV' &&
              (language === 'en'
                ? '48V BSG provides torque assist & start-stop without high-voltage conduits.'
                : 'BSG 48V membantu torsi & start-stop tanpa instalasi tegangan tinggi berbiaya mahal.')}
            {architecture === 'HEV' &&
              (language === 'en'
                ? 'Epicyclic planetary gear splits Atkinson engine torque between wheels and generator.'
                : 'Roda gigi planet membagi torsi mesin Atkinson antara penggerak roda dan generator.')}
            {architecture === 'PHEV' &&
              (language === 'en'
                ? 'K0 clutch decouples engine for pure EV driving; closes for parallel maximum boost.'
                : 'Kopling K0 memutus mesin untuk mode listrik murni; menutup untuk akselerasi paralel.')}
            {architecture === 'EREV' &&
              (language === 'en'
                ? 'Engine has ZERO mechanical wheel link, generating electricity at peak BSFC efficiency.'
                : 'Mesin TIDAK terhubung ke roda mekanis, berputar konstan sebagai generator efisiensi puncak.')}
          </p>
        </div>
      </div>

      {/* Bottom Controls Bar & Real-Time Parameter Sliders */}
      <div className="relative z-20 p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Speed Slider */}
          <div className="flex flex-col gap-1 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                {language === 'en' ? 'Vehicle Speed' : 'Kecepatan Kendaraan'}
              </span>
              <span className="font-mono font-bold text-white">{speedKmh} km/h</span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              step={1}
              value={speedKmh}
              onChange={(e) => setSpeedKmh(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Throttle Slider */}
          <div className="flex flex-col gap-1 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                {language === 'en' ? 'Throttle Demand' : 'Bukaan Pedal Gas'}
              </span>
              <span className="font-mono font-bold text-white">{throttlePercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={throttlePercent}
              onChange={(e) => setThrottlePercent(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Battery SoC Slider */}
          <div className="flex flex-col gap-1 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                {language === 'en' ? 'Battery State of Charge (SoC)' : 'Sisa Muatan Baterai (SoC)'}
              </span>
              <span
                className={`font-mono font-bold ${
                  batterySoc > 35 ? 'text-emerald-400' : batterySoc > 20 ? 'text-amber-400' : 'text-red-400'
                }`}
              >
                {batterySoc}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={batterySoc}
              onChange={(e) => setBatterySoc(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Road Incline Slider */}
          <div className="flex flex-col gap-1 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                {language === 'en' ? 'Road Gradient' : 'Kemiringan Tanjakan'}
              </span>
              <span className="font-mono font-bold text-white">{roadGrade}%</span>
            </div>
            <input
              type="range"
              min={-8}
              max={12}
              step={1}
              value={roadGrade}
              onChange={(e) => setRoadGrade(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>

        {/* Real-time Telemetry Values Strip */}
        {showMetricsDrawer && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === 'en' ? 'Engine Speed' : 'Putaran Mesin'}
              </span>
              <span className="font-mono font-bold text-orange-400 text-sm">{physics.engineRpm} RPM</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === 'en' ? 'ICE Power' : 'Daya Mesin Bensin'}
              </span>
              <span className="font-mono font-bold text-white text-sm">{physics.enginePowerKw} kW</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === 'en' ? 'Motor Output' : 'Daya Motor Listrik'}
              </span>
              <span className="font-mono font-bold text-sky-400 text-sm">{physics.mg2PowerKw} kW</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === 'en' ? 'Battery Flow' : 'Aliran Baterai'}
              </span>
              <span
                className={`font-mono font-bold text-sm ${
                  physics.batteryPowerKw < 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {physics.batteryPowerKw < 0
                  ? `+${Math.abs(physics.batteryPowerKw)} kW (Chg)`
                  : `${physics.batteryPowerKw} kW (Dis)`}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === 'en' ? 'Wheel Torque' : 'Torsi Roda'}
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{physics.netWheelTorqueNm} Nm</span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-medium">
                {language === 'en' ? 'Fuel Consumption' : 'Konsumsi BBM'}
              </span>
              <span className="font-mono font-bold text-white text-sm">{physics.fuelRateL100km} L/100km</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
