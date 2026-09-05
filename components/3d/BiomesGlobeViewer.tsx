'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '@/context/LearningContext';
import {
  Globe,
  Sun,
  CloudRain,
  Thermometer,
  Layers,
  Trees,
  RotateCcw,
  Sparkles,
  Sliders,
  Info,
  Maximize2,
  Minimize2,
  ChevronRight,
  Eye,
  Activity,
  Flame,
  Droplets,
  Compass,
  Wind,
  ShieldAlert,
} from 'lucide-react';
import { attachCanvasControls } from '@/lib/canvasControls';
import { TelemetryHUD } from './TelemetryHUD';

export type ViewScale = 'globe' | 'biotope';
export type BiomeOverlay = 'biomes' | 'temperature' | 'precipitation' | 'npp';
export type BiotopeType = 'tundra' | 'taiga' | 'temperate' | 'desert' | 'rainforest' | 'coral';

interface HotspotPin {
  id: string;
  name: { en: string; id: string };
  biotope: BiotopeType;
  lat: number;
  lon: number;
  summary: { en: string; id: string };
}

const HOTSPOTS: HotspotPin[] = [
  {
    id: 'siberian-tundra',
    name: { en: 'Siberian Arctic Tundra', id: 'Tundra Arktik Siberia' },
    biotope: 'tundra',
    lat: 68.5,
    lon: 105.0,
    summary: {
      en: 'Continuous permafrost, active-layer freeze-thaw cycles, and prostrate dwarf willows.',
      id: 'Permafrost menerus, siklus beku-cair lapisan aktif, dan pohon willow kerdil merayap.',
    },
  },
  {
    id: 'canadian-taiga',
    name: { en: 'Canadian Boreal Taiga', id: 'Taiga Boreal Kanada' },
    biotope: 'taiga',
    lat: 56.0,
    lon: -106.0,
    summary: {
      en: 'Coniferous black spruce forests, acidic Spodosol soils, and serotinous fire regeneration.',
      id: 'Hutan konifer spruce hitam, tanah Spodosol masam, dan regenerasi serotini pascakebakaran.',
    },
  },
  {
    id: 'appalachian-forest',
    name: { en: 'Appalachian Deciduous Forest', id: 'Hutan Gugur Appalachia' },
    biotope: 'temperate',
    lat: 38.0,
    lon: -79.0,
    summary: {
      en: 'Stratified oak-maple canopies, spring ephemerals, and seasonal anthocyanin leaf senescence.',
      id: 'Kanopi pohon ek-mapel berlapis, tumbuhan efemeral semi, dan senesensi antosianin musim gugur.',
    },
  },
  {
    id: 'sahara-desert',
    name: { en: 'Sahara Subtropical Desert', id: 'Gurun Subtropis Sahara' },
    biotope: 'desert',
    lat: 23.5,
    lon: 13.0,
    summary: {
      en: 'Hadley subsidence hyper-aridity, wind-swept reg pavement, and CAM water conservation.',
      id: 'Hiper-ariditas akibat subsiden sel Hadley, hamparan kerikil reg, dan efisiensi air CAM.',
    },
  },
  {
    id: 'amazon-rainforest',
    name: { en: 'Amazon Equatorial Rainforest', id: 'Hutan Hujan Khatulistiwa Amazon' },
    biotope: 'rainforest',
    lat: -3.4,
    lon: -62.0,
    summary: {
      en: 'Hyper-diverse stratified canopy, buttress roots, and closed-loop mycorrhizal cycling on Oxisols.',
      id: 'Kanopi berlapis megabiodiversitas, akar banir papan, dan siklus mikoriza tertutup di tanah Oxisol.',
    },
  },
  {
    id: 'great-barrier-reef',
    name: { en: 'Great Barrier Reef Marine Coral', id: 'Terumbu Karang Great Barrier Reef' },
    biotope: 'coral',
    lat: -18.2,
    lon: 147.7,
    summary: {
      en: 'Aragonite biogenic calcification, dinoflagellate mutualism, and marine thermal bleaching vulnerability.',
      id: 'Kalsifikasi biogenik aragonit, simbiosis dinoflagellata, dan kerentanan pemutihan karang termal.',
    },
  },
];

export const BiomesGlobeViewer: React.FC = () => {
  const { language, settings, updateSettings } = useLearning();

  // Navigation & Scale Mode
  const [viewScale, setViewScale] = useState<ViewScale>('globe');
  const viewScaleRef = useRef<ViewScale>(viewScale);
  useEffect(() => {
    viewScaleRef.current = viewScale;
  }, [viewScale]);

  const [selectedBiotope, setSelectedBiotope] = useState<BiotopeType>('tundra');
  const [activeOverlay, setActiveOverlay] = useState<BiomeOverlay>('biomes');

  // Real-time FPS Telemetry tracking
  const [fps, setFps] = useState<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(0);

  // Planetary Parameters
  const [warmingDeltaT, setWarmingDeltaT] = useState<number>(0); // -3°C to +5°C
  const [activeHotspot, setActiveHotspot] = useState<HotspotPin | null>(null);

  // Biotope Micro-Parameters
  // Tundra
  const [thawDepthCm, setThawDepthCm] = useState<number>(35); // 10 to 80 cm
  const [snowAlbedo, setSnowAlbedo] = useState<number>(0.75); // 0.40 to 0.85

  // Taiga
  const [fireIntervalYrs, setFireIntervalYrs] = useState<number>(100); // 20 to 200 yrs
  const [soilAcidityPh, setSoilAcidityPh] = useState<number>(4.2); // 3.8 to 5.5

  // Temperate Forest (Season: 0=Spring, 1=Summer, 2=Autumn, 3=Winter)
  const [seasonIndex, setSeasonIndex] = useState<number>(1);

  // Desert
  const [rainPulseActive, setRainPulseActive] = useState<boolean>(false);
  const [camNightCycle, setCamNightCycle] = useState<boolean>(false);

  // Rainforest
  const [canopyLai, setCanopyLai] = useState<number>(6.5); // 1.0 to 8.0
  const [decompositionSpeed, setDecompositionSpeed] = useState<number>(1.8); // 0.5 to 3.0

  // Coral Reef
  const [seaTempC, setSeaTempC] = useState<number>(27.0); // 24.0°C to 32.0°C (bleaching > 29.5°C)
  const [aragoniteSat, setAragoniteSat] = useState<number>(3.8); // 1.0 to 4.5

  // Viewport & Canvas Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Three.js Scene Nodes
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
  const biotopeGroupRef = useRef<THREE.Group | null>(null);
  const animatedObjectsRef = useRef<{ update: (delta: number, elapsed: number) => void }[]>([]);

  // Camera tracking & rotation
  const isAutoRotateRef = useRef<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Synchronize autoRotate ref
  useEffect(() => {
    isAutoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Derived Telemetry Values
  const globalMeanTemp = useMemo(() => 14.8 + warmingDeltaT, [warmingDeltaT]);
  const estimatedNppGt = useMemo(() => {
    // Miami model global integration approximation (~56 Gt C/yr baseline)
    const factor = 1.0 + warmingDeltaT * 0.025 - Math.max(0, warmingDeltaT - 2.5) * 0.05;
    return (56.4 * factor).toFixed(1);
  }, [warmingDeltaT]);

  const planetaryAlbedo = useMemo(() => {
    // Albedo decreases with polar ice retreat
    const base = 0.306;
    const iceFeedback = warmingDeltaT * -0.008;
    return Math.max(0.24, Math.min(0.36, base + iceFeedback)).toFixed(3);
  }, [warmingDeltaT]);

  // Procedural Earth Texture Generation based on Overlay & Warming
  const generateEarthTexture = (overlay: BiomeOverlay, deltaT: number): THREE.CanvasTexture => {
    const width = 1024;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Warming shift: shifts polar boundaries towards poles, deserts poleward
    const warmShift = deltaT * 0.04;

    for (let y = 0; y < height; y++) {
      // Latitude: -90° (South pole) at y=height-1, +90° (North pole) at y=0
      const lat = 90 - (y / height) * 180;
      const absLat = Math.abs(lat);
      const normalizedLat = absLat / 90; // 0 at equator, 1 at poles

      for (let x = 0; x < width; x++) {
        const lon = (x / width) * 360 - 180;
        const idx = (y * width + x) * 4;

        // Simplified continent map: Land vs Ocean mask using harmonics
        const nx = x / width;
        const ny = y / height;
        const landVal =
          Math.sin(nx * Math.PI * 4 + 1.2) * Math.cos(ny * Math.PI * 2) +
          Math.sin(nx * Math.PI * 7 - 0.5) * 0.4 +
          Math.sin(ny * Math.PI * 6 + nx * 2) * 0.3;
        const isLand = landVal > -0.1 && absLat < 82;

        if (!isLand) {
          // Ocean rendering
          if (overlay === 'temperature') {
            // Thermal colormap for ocean
            const t = Math.max(-2, 30 - normalizedLat * 35 + deltaT);
            const normT = (t + 10) / 45;
            data[idx] = Math.min(255, Math.floor(normT * 255));
            data[idx + 1] = Math.floor(Math.sin(normT * Math.PI) * 200);
            data[idx + 2] = Math.floor((1 - normT) * 255);
            data[idx + 3] = 255;
          } else if (overlay === 'precipitation') {
            // ITCZ heavy rain band at equator, subtropical dry, mid-lat storm track
            const itcz = Math.exp(-Math.pow(absLat - 4, 2) / 35) * 255;
            const storm = Math.exp(-Math.pow(absLat - 48, 2) / 70) * 180;
            const rain = Math.min(255, itcz + storm);
            data[idx] = 20;
            data[idx + 1] = Math.floor(rain * 0.7);
            data[idx + 2] = Math.min(255, 120 + Math.floor(rain * 0.6));
            data[idx + 3] = 255;
          } else if (overlay === 'npp') {
            // Marine upwelling NPP zones
            const upwelling = Math.sin(nx * 14) * 0.3 + 0.5;
            const marineNpp = (1 - normalizedLat * 0.5) * upwelling * 160;
            data[idx] = 10;
            data[idx + 1] = Math.floor(marineNpp);
            data[idx + 2] = 80;
            data[idx + 3] = 255;
          } else {
            // Default ocean blue with shelf gradient
            const depthFactor = Math.sin(nx * 10 + ny * 6) * 0.15;
            data[idx] = 14 + Math.floor(depthFactor * 10);
            data[idx + 1] = 42 + Math.floor(depthFactor * 30);
            data[idx + 2] = 95 + Math.floor(depthFactor * 50);
            data[idx + 3] = 255;
          }
        } else {
          // Terrestrial Biomes mapping
          // Effective latitudinal band shifted by warmingDeltaT
          const effLat = absLat - warmShift * 12;

          if (overlay === 'temperature') {
            // Thermal surface temperature: -40°C to +35°C
            const t = 34 - normalizedLat * 60 + deltaT;
            const normT = Math.max(0, Math.min(1, (t + 30) / 70));
            // Colormap: Deep Blue -> Cyan -> Green -> Yellow -> Red
            data[idx] = Math.floor(normT > 0.5 ? (normT - 0.5) * 2 * 255 : 0);
            data[idx + 1] = Math.floor(Math.sin(normT * Math.PI) * 255);
            data[idx + 2] = Math.floor(normT < 0.5 ? (0.5 - normT) * 2 * 255 : 0);
            data[idx + 3] = 255;
          } else if (overlay === 'precipitation') {
            // Precipitation isohyets
            let precip = 40;
            if (effLat < 12) precip = 220; // ITCZ rainforest
            else if (effLat >= 12 && effLat < 32) precip = 25; // Subtropical desert
            else if (effLat >= 32 && effLat < 55) precip = 110; // Temperate
            else precip = 30; // Polar desert
            const pNorm = precip / 250;
            data[idx] = Math.floor((1 - pNorm) * 220);
            data[idx + 1] = Math.floor(pNorm * 210);
            data[idx + 2] = Math.floor(pNorm * 255);
            data[idx + 3] = 255;
          } else if (overlay === 'npp') {
            // NPP carbon flux
            let nppVal = 0.2;
            if (effLat < 15) nppVal = 0.95; // Tropical rainforest
            else if (effLat >= 15 && effLat < 30) nppVal = 0.15; // Desert
            else if (effLat >= 30 && effLat < 50) nppVal = 0.65; // Temperate forest
            else if (effLat >= 50 && effLat < 65) nppVal = 0.45; // Taiga
            else nppVal = 0.1; // Tundra
            data[idx] = Math.floor(30 + (1 - nppVal) * 100);
            data[idx + 1] = Math.floor(nppVal * 240);
            data[idx + 2] = 40;
            data[idx + 3] = 255;
          } else {
            // Natural Whittaker Biome Classification
            if (effLat > 72) {
              // Polar Ice Cap
              data[idx] = 238;
              data[idx + 1] = 244;
              data[idx + 2] = 250;
            } else if (effLat > 60) {
              // Arctic Tundra
              data[idx] = 142;
              data[idx + 1] = 155;
              data[idx + 2] = 128;
            } else if (effLat > 46) {
              // Boreal Taiga
              data[idx] = 34;
              data[idx + 1] = 95;
              data[idx + 2] = 62;
            } else if (effLat > 30) {
              // Temperate Deciduous & Grassland
              if (Math.sin(nx * 20 + ny * 10) > 0) {
                // Deciduous Forest
                data[idx] = 52;
                data[idx + 1] = 145;
                data[idx + 2] = 78;
              } else {
                // Steppe / Prairie
                data[idx] = 178;
                data[idx + 1] = 168;
                data[idx + 2] = 88;
              }
            } else if (effLat > 16) {
              // Arid Desert & Chaparral
              data[idx] = 215;
              data[idx + 1] = 178;
              data[idx + 2] = 112;
            } else if (effLat > 8) {
              // Tropical Savanna
              data[idx] = 158;
              data[idx + 1] = 172;
              data[idx + 2] = 82;
            } else {
              // Equatorial Tropical Rainforest
              data[idx] = 16;
              data[idx + 1] = 120;
              data[idx + 2] = 56;
            }
            data[idx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  };

  // Convert Spherical Lat/Lon into 3D coordinates
  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Switch to biotope directly
  const handleSelectBiotope = (biotope: BiotopeType) => {
    setSelectedBiotope(biotope);
    setViewScale('biotope');
  };

  // =========================================================================
  // MAIN THREE.JS MOUNT & RENDER EFFECT
  // =========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060b14);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.2);
    cameraRef.current = camera;

    // WebGL Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    sunLight.position.set(5, 4, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Root groups
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    // Earth's actual obliquity axial tilt = 23.44° = ~0.409 rad
    globeGroup.rotation.z = 0.409;
    scene.add(globeGroup);

    const biotopeGroup = new THREE.Group();
    biotopeGroupRef.current = biotopeGroup;
    scene.add(biotopeGroup);

    // -------------------------------------------------------------
    // BUILD PLANETARY GLOBE
    // -------------------------------------------------------------
    const globeRadius = 2.15;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthTexture = generateEarthTexture('biomes', 0);
    const globeMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(globeGeo, globeMat);
    earthMeshRef.current = earthMesh;
    globeGroup.add(earthMesh);

    // Atmosphere Rayleigh Glow Shell
    const atmoGeo = new THREE.SphereGeometry(globeRadius * 1.055, 48, 48);
    const atmoMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    atmosphereMeshRef.current = atmoMesh;
    globeGroup.add(atmoMesh);

    // Add Hotspot Marker Pins
    HOTSPOTS.forEach((pin) => {
      const pinPos = latLonToVector3(pin.lat, pin.lon, globeRadius + 0.04);
      const markerGroup = new THREE.Group();
      markerGroup.position.copy(pinPos);

      // Pin stem
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.16);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pinPos.clone().normalize());
      markerGroup.add(stem);

      // Pin head sphere
      const headGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x059669,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.copy(pinPos.clone().normalize().multiplyScalar(0.1));
      markerGroup.add(head);

      globeGroup.add(markerGroup);
    });

    // -------------------------------------------------------------
    // CANVAS CONTROLS VIA ATTACHCANVASCONTROLS
    // -------------------------------------------------------------
    const cleanupControls = attachCanvasControls(container, {
      onRotate: (deltaX, deltaY) => {
        isAutoRotateRef.current = false;
        setAutoRotate(false);
        if (viewScaleRef.current === 'globe' && globeGroupRef.current) {
          globeGroupRef.current.rotation.y += deltaX;
          globeGroupRef.current.rotation.x += deltaY;
        } else if (viewScaleRef.current === 'biotope' && biotopeGroupRef.current) {
          biotopeGroupRef.current.rotation.y += deltaX;
          biotopeGroupRef.current.rotation.x = Math.max(
            -0.4,
            Math.min(0.8, biotopeGroupRef.current.rotation.x + deltaY)
          );
        }
      },
      onZoom: (deltaZoom) => {
        if (!cameraRef.current) return;
        const newZ = cameraRef.current.position.z + deltaZoom * 4.0;
        cameraRef.current.position.z = Math.max(3.2, Math.min(10.5, newZ));
      },
    });

    // -------------------------------------------------------------
    // RENDER / ANIMATION LOOP
    // -------------------------------------------------------------
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Track FPS via 500ms sampling window
      frameCountRef.current++;
      const now = performance.now();
      if (lastFpsTimeRef.current === 0) {
        lastFpsTimeRef.current = now;
      } else if (now - lastFpsTimeRef.current >= 500) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastFpsTimeRef.current)));
        frameCountRef.current = 0;
        lastFpsTimeRef.current = now;
      }

      // Auto-rotation when idle
      if (isAutoRotateRef.current) {
        if (viewScaleRef.current === 'globe' && globeGroupRef.current) {
          globeGroupRef.current.rotation.y += 0.0035;
        } else if (viewScaleRef.current === 'biotope' && biotopeGroupRef.current) {
          biotopeGroupRef.current.rotation.y += 0.0025;
        }
      }

      // Execute registered dynamic biotope updates (particles, fish, waves)
      animatedObjectsRef.current.forEach((obj) => obj.update(delta, elapsed));

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupControls();
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

  // Update Globe Texture when overlay or warming changes
  useEffect(() => {
    if (!earthMeshRef.current) return;
    const newTex = generateEarthTexture(activeOverlay, warmingDeltaT);
    const mat = earthMeshRef.current.material as THREE.MeshStandardMaterial;
    if (mat.map) mat.map.dispose();
    mat.map = newTex;
    mat.needsUpdate = true;
  }, [activeOverlay, warmingDeltaT]);

  // Visibility toggle between Globe and Biotope
  useEffect(() => {
    if (!globeGroupRef.current || !biotopeGroupRef.current || !cameraRef.current) return;
    if (viewScale === 'globe') {
      globeGroupRef.current.visible = true;
      biotopeGroupRef.current.visible = false;
      cameraRef.current.position.set(0, 1.8, 6.2);
    } else {
      globeGroupRef.current.visible = false;
      biotopeGroupRef.current.visible = true;
      cameraRef.current.position.set(0, 2.2, 5.8);
    }
  }, [viewScale]);

  // =========================================================================
  // BIOTOPE DIORAMA GEOMETRY GENERATOR
  // Re-builds biotope meshes when selectedBiotope or its parameters change
  // =========================================================================
  useEffect(() => {
    const biotopeGroup = biotopeGroupRef.current;
    if (!biotopeGroup) return;

    // Clear prior biotope objects
    while (biotopeGroup.children.length > 0) {
      const child = biotopeGroup.children[0];
      biotopeGroup.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
        if (child.geometry) child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else if (child.material) child.material.dispose();
      }
    }
    animatedObjectsRef.current = [];

    // Base Diorama Platform (Pedestal slab)
    const platformGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.4, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.2,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = -0.2;
    biotopeGroup.add(platformMesh);

    // -----------------------------------------------------------------
    // 1. ❄️ ARCTIC TUNDRA DIORAMA
    // -----------------------------------------------------------------
    if (selectedBiotope === 'tundra') {
      // Patterned ground with polygonal ice-wedge ridges
      const groundGeo = new THREE.PlaneGeometry(4.4, 4.4, 32, 32);
      groundGeo.rotateX(-Math.PI / 2);
      const pos = groundGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        // Polygonal frost heave bumps
        const bump = Math.sin(x * 3.5) * Math.cos(z * 3.5) * 0.08;
        pos.setY(i, bump);
      }
      groundGeo.computeVertexNormals();

      const tundraMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().lerpColors(
          new THREE.Color(0x6b7280),
          new THREE.Color(0xf1f5f9),
          snowAlbedo * 0.8
        ),
        roughness: 0.9,
      });
      const groundMesh = new THREE.Mesh(groundGeo, tundraMat);
      groundMesh.position.y = 0.02;
      biotopeGroup.add(groundMesh);

      // Permafrost active layer cross-section slice
      const permaGeo = new THREE.BoxGeometry(4.4, 0.6, 0.2);
      const permaMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.95,
      });
      const permaMesh = new THREE.Mesh(permaGeo, permaMat);
      permaMesh.position.set(0, -0.28, 2.2);
      biotopeGroup.add(permaMesh);

      // Thaw depth indicator plane
      const thawDepthNorm = thawDepthCm / 100; // 0.1 to 0.8
      const thawGeo = new THREE.BoxGeometry(4.4, thawDepthNorm * 0.4, 0.22);
      const thawMat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.6,
      });
      const thawMesh = new THREE.Mesh(thawGeo, thawMat);
      thawMesh.position.set(0, -0.02 - (thawDepthNorm * 0.4) / 2, 2.2);
      biotopeGroup.add(thawMesh);

      // Low-stature dwarf shrubs / cushion plants
      for (let i = 0; i < 28; i++) {
        const shrubGeo = new THREE.SphereGeometry(0.08 + Math.random() * 0.07, 8, 8);
        shrubGeo.scale(1.2, 0.45, 1.2);
        const shrubMat = new THREE.MeshStandardMaterial({
          color: 0x4d7c0f,
          roughness: 0.85,
        });
        const shrub = new THREE.Mesh(shrubGeo, shrubMat);
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.sqrt(Math.random()) * 1.8;
        shrub.position.set(Math.cos(ang) * rad, 0.06, Math.sin(ang) * rad);
        biotopeGroup.add(shrub);
      }
    }

    // -----------------------------------------------------------------
    // 2. 🌲 BOREAL TAIGA DIORAMA
    // -----------------------------------------------------------------
    else if (selectedBiotope === 'taiga') {
      // Acidic needle floor
      const groundGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.08, 36);
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x451a03, // dark brown needle litter
        roughness: 0.95,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.position.y = 0.04;
      biotopeGroup.add(ground);

      // Coniferous spruce/pine trees
      const treeCount = 14;
      for (let i = 0; i < treeCount; i++) {
        const treeGroup = new THREE.Group();
        const ang = (i / treeCount) * Math.PI * 2 + Math.random() * 0.3;
        const rad = 0.5 + Math.random() * 1.5;
        treeGroup.position.set(Math.cos(ang) * rad, 0.08, Math.sin(ang) * rad);

        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.03, 0.05, 0.9, 8);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x271c19, roughness: 0.9 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 0.45;
        treeGroup.add(trunk);

        // Tiered conical needleleaf foliage
        const tiers = 3;
        for (let t = 0; t < tiers; t++) {
          const coneGeo = new THREE.ConeGeometry(0.35 - t * 0.08, 0.5, 8);
          const coneMat = new THREE.MeshStandardMaterial({
            color: 0x14532d, // dark conifer evergreen
            roughness: 0.7,
          });
          const cone = new THREE.Mesh(coneGeo, coneMat);
          cone.position.y = 0.65 + t * 0.32;
          treeGroup.add(cone);
        }

        biotopeGroup.add(treeGroup);
      }

      // Exposed Spodosol horizon side profile
      const podzolGeo = new THREE.BoxGeometry(4.2, 0.8, 0.15);
      const podzolMat = new THREE.MeshStandardMaterial({
        color: soilAcidityPh < 4.2 ? 0x94a3b8 : 0x78350f, // bleached albic E horizon vs illuvial B_s
        roughness: 0.9,
      });
      const podzol = new THREE.Mesh(podzolGeo, podzolMat);
      podzol.position.set(0, -0.3, 2.15);
      biotopeGroup.add(podzol);
    }

    // -----------------------------------------------------------------
    // 3. 🍂 TEMPERATE DECIDUOUS FOREST DIORAMA
    // -----------------------------------------------------------------
    else if (selectedBiotope === 'temperate') {
      // Season color mapping:
      // 0: Spring (tender green 0x84cc16), 1: Summer (lush deep green 0x15803d)
      // 2: Autumn (amber/crimson 0xd97706 / 0xb91c1c), 3: Winter (bare branches)
      const leafColor =
        seasonIndex === 0
          ? 0x84cc16
          : seasonIndex === 1
          ? 0x15803d
          : seasonIndex === 2
          ? 0xc2410c
          : 0x475569;

      const groundColor =
        seasonIndex === 3 ? 0xf8fafc : seasonIndex === 2 ? 0x92400e : 0x3f6212;

      // Forest ground
      const groundGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.08, 36);
      const groundMat = new THREE.MeshStandardMaterial({
        color: groundColor,
        roughness: 0.85,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.position.y = 0.04;
      biotopeGroup.add(ground);

      // Broadleaf deciduous trees (Oak/Maple)
      const treeCount = 7;
      for (let i = 0; i < treeCount; i++) {
        const treeGroup = new THREE.Group();
        const ang = (i / treeCount) * Math.PI * 2 + 0.2;
        const rad = 0.7 + (i % 2) * 0.8;
        treeGroup.position.set(Math.cos(ang) * rad, 0.08, Math.sin(ang) * rad);

        // Trunk & branches
        const trunkGeo = new THREE.CylinderGeometry(0.06, 0.09, 1.2, 8);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.85 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 0.6;
        treeGroup.add(trunk);

        // Canopy crown (hidden in winter)
        if (seasonIndex !== 3) {
          const crownGeo = new THREE.DodecahedronGeometry(0.55 + Math.random() * 0.15, 1);
          const crownMat = new THREE.MeshStandardMaterial({
            color: leafColor,
            roughness: 0.75,
          });
          const crown = new THREE.Mesh(crownGeo, crownMat);
          crown.position.y = 1.35;
          treeGroup.add(crown);
        }

        biotopeGroup.add(treeGroup);
      }
    }

    // -----------------------------------------------------------------
    // 4. 🏜️ ARID DESERT DIORAMA
    // -----------------------------------------------------------------
    else if (selectedBiotope === 'desert') {
      // Rippled sand dunes
      const duneGeo = new THREE.PlaneGeometry(4.4, 4.4, 32, 32);
      duneGeo.rotateX(-Math.PI / 2);
      const pos = duneGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const duneHeight = Math.sin(x * 1.8 + z * 0.8) * 0.22 + Math.cos(x * 0.7) * 0.12;
        pos.setY(i, duneHeight);
      }
      duneGeo.computeVertexNormals();

      const duneMat = new THREE.MeshStandardMaterial({
        color: camNightCycle ? 0x78716c : 0xf59e0b, // warm sand vs cool nocturnal
        roughness: 0.9,
      });
      const duneMesh = new THREE.Mesh(duneGeo, duneMat);
      duneMesh.position.y = 0.02;
      biotopeGroup.add(duneMesh);

      // Saguaro Columnar Cacti
      const cactusCount = 5;
      for (let i = 0; i < cactusCount; i++) {
        const cactusGroup = new THREE.Group();
        const ang = (i / cactusCount) * Math.PI * 2 + 0.4;
        const rad = 0.8 + (i % 3) * 0.5;
        cactusGroup.position.set(Math.cos(ang) * rad, 0.15, Math.sin(ang) * rad);

        // Main ribbed stem
        const stemGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 12);
        const stemMat = new THREE.MeshStandardMaterial({
          color: 0x15803d,
          roughness: 0.7,
        });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 0.7;
        cactusGroup.add(stem);

        // Branching arm
        if (i % 2 === 0) {
          const armGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
          const arm = new THREE.Mesh(armGeo, stemMat);
          arm.position.set(0.18, 0.85, 0);
          arm.rotation.z = -Math.PI / 2.5;
          cactusGroup.add(arm);

          const armUpGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
          const armUp = new THREE.Mesh(armUpGeo, stemMat);
          armUp.position.set(0.35, 1.05, 0);
          cactusGroup.add(armUp);
        }

        biotopeGroup.add(cactusGroup);
      }

      // Ephemeral Floral Bloom carpet when rain pulse is triggered
      if (rainPulseActive) {
        for (let i = 0; i < 40; i++) {
          const flowerGeo = new THREE.SphereGeometry(0.035, 6, 6);
          const flowerMat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0xec4899 : 0xfacc15, // magenta & yellow blooms
          });
          const flower = new THREE.Mesh(flowerGeo, flowerMat);
          const ang = Math.random() * Math.PI * 2;
          const rad = Math.sqrt(Math.random()) * 1.9;
          flower.position.set(Math.cos(ang) * rad, 0.22, Math.sin(ang) * rad);
          biotopeGroup.add(flower);
        }
      }
    }

    // -----------------------------------------------------------------
    // 5. 🌴 TROPICAL RAINFOREST DIORAMA
    // -----------------------------------------------------------------
    else if (selectedBiotope === 'rainforest') {
      // Forest floor
      const groundGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.08, 36);
      const groundMat = new THREE.MeshStandardMaterial({
        color: 0x14532d,
        roughness: 0.85,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.position.y = 0.04;
      biotopeGroup.add(ground);

      // Central Emergent Tree with giant Planar Buttress Roots
      const giantTree = new THREE.Group();

      // Main trunk
      const trunkGeo = new THREE.CylinderGeometry(0.16, 0.28, 2.8, 12);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x2e1c14, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.4;
      giantTree.add(trunk);

      // Planar buttress root fins radiating from base
      for (let r = 0; r < 4; r++) {
        const rootGeo = new THREE.BoxGeometry(0.04, 0.7, 0.6);
        const rootMat = new THREE.MeshStandardMaterial({ color: 0x2e1c14, roughness: 0.9 });
        const root = new THREE.Mesh(rootGeo, rootMat);
        const rootAngle = (r / 4) * Math.PI * 2;
        root.rotation.y = rootAngle;
        root.position.set(Math.cos(rootAngle) * 0.35, 0.35, Math.sin(rootAngle) * 0.35);
        giantTree.add(root);
      }

      // Dense emergent umbrella canopy
      const crownGeo = new THREE.ConeGeometry(1.4, 0.9, 12);
      const crownMat = new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        roughness: 0.7,
      });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.position.y = 2.75;
      crown.scale.y = canopyLai / 5.0;
      giantTree.add(crown);

      biotopeGroup.add(giantTree);

      // Volumetric humidity mist / sun-shaft particles
      const mistCount = 120;
      const mistGeo = new THREE.BufferGeometry();
      const mistPos = new Float32Array(mistCount * 3);
      for (let i = 0; i < mistCount; i++) {
        mistPos[i * 3] = (Math.random() - 0.5) * 3.6;
        mistPos[i * 3 + 1] = Math.random() * 2.5 + 0.2;
        mistPos[i * 3 + 2] = (Math.random() - 0.5) * 3.6;
      }
      mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
      const mistMat = new THREE.PointsMaterial({
        color: 0x6ee7b7,
        size: 0.07,
        transparent: true,
        opacity: 0.45,
      });
      const mist = new THREE.Points(mistGeo, mistMat);
      biotopeGroup.add(mist);

      animatedObjectsRef.current.push({
        update: (delta, elapsed) => {
          const positions = mist.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < mistCount; i++) {
            positions[i * 3 + 1] += Math.sin(elapsed + i) * 0.002;
          }
          mist.geometry.attributes.position.needsUpdate = true;
        },
      });
    }

    // -----------------------------------------------------------------
    // 6. 🪸 CORAL REEF & MARINE DIORAMA
    // -----------------------------------------------------------------
    else if (selectedBiotope === 'coral') {
      // Subsea sandy seabed
      const seabedGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.08, 36);
      const seabedMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.8,
      });
      const seabed = new THREE.Mesh(seabedGeo, seabedMat);
      seabed.position.y = 0.04;
      biotopeGroup.add(seabed);

      // Thermal bleaching condition:
      // If seaTempC > 29.5°C, corals lose zooxanthellae and turn bone white
      const isBleached = seaTempC > 29.5;
      const coralColor = isBleached ? 0xf8fafc : 0xf43f5e; // white vs vibrant coral rose

      // Branching Acropora stony corals
      const coralHeads = 9;
      for (let i = 0; i < coralHeads; i++) {
        const coralGroup = new THREE.Group();
        const ang = (i / coralHeads) * Math.PI * 2;
        const rad = 0.5 + (i % 3) * 0.55;
        coralGroup.position.set(Math.cos(ang) * rad, 0.1, Math.sin(ang) * rad);

        // Clustered branching fingers
        for (let b = 0; b < 5; b++) {
          const branchGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.45 + (b % 3) * 0.12, 8);
          const branchMat = new THREE.MeshStandardMaterial({
            color: coralColor,
            roughness: 0.5,
          });
          const branch = new THREE.Mesh(branchGeo, branchMat);
          branch.position.set((b - 2) * 0.08, 0.22, (b % 2) * 0.07);
          branch.rotation.z = (b - 2) * 0.15;
          coralGroup.add(branch);
        }

        biotopeGroup.add(coralGroup);
      }

      // Schooling marine fish instances
      const fishGroup = new THREE.Group();
      const fishCount = 12;
      const fishMeshes: THREE.Mesh[] = [];

      for (let i = 0; i < fishCount; i++) {
        const fishGeo = new THREE.ConeGeometry(0.04, 0.14, 6);
        fishGeo.rotateX(Math.PI / 2);
        const fishMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const fish = new THREE.Mesh(fishGeo, fishMat);
        fish.position.set(
          Math.cos((i / fishCount) * Math.PI * 2) * 1.4,
          1.1 + Math.sin(i) * 0.3,
          Math.sin((i / fishCount) * Math.PI * 2) * 1.4
        );
        fishGroup.add(fish);
        fishMeshes.push(fish);
      }
      biotopeGroup.add(fishGroup);

      // Animate fish swimming in circle
      animatedObjectsRef.current.push({
        update: (delta, elapsed) => {
          fishGroup.rotation.y += 0.015;
          fishMeshes.forEach((f, idx) => {
            f.position.y += Math.sin(elapsed * 2 + idx) * 0.002;
          });
        },
      });
    }
  }, [
    selectedBiotope,
    thawDepthCm,
    snowAlbedo,
    soilAcidityPh,
    seasonIndex,
    rainPulseActive,
    camNightCycle,
    canopyLai,
    seaTempC,
  ]);

  // Reset Camera View
  const handleResetCamera = () => {
    if (!cameraRef.current || !globeGroupRef.current || !biotopeGroupRef.current) return;
    if (viewScale === 'globe') {
      globeGroupRef.current.rotation.set(0, 0, 0.409);
      cameraRef.current.position.set(0, 1.8, 6.2);
    } else {
      biotopeGroupRef.current.rotation.set(0, 0, 0);
      cameraRef.current.position.set(0, 2.2, 5.8);
    }
    setAutoRotate(true);
    isAutoRotateRef.current = true;
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 select-none shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[640px] sm:h-[720px]'
      }`}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Telemetry HUD (FPS, WebGL/WebGPU pipeline, quality) */}
      <TelemetryHUD fps={fps} />

      {/* TOP BAR CONTROLS */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-20">
        <div className="flex flex-wrap items-center gap-2">
          {/* View Scale Toggle (Globe vs Biotope) */}
          <div className="pointer-events-auto flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setViewScale('globe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewScale === 'globe'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Planetary Globe' : 'Bola Planet'}</span>
            </button>
            <button
              onClick={() => setViewScale('biotope')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewScale === 'biotope'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trees className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Biome Biotope' : 'Diorama Bioma'}</span>
            </button>
          </div>

          {/* Action icons: Auto-rotate, Quality Switch, Reset, Fullscreen */}
          <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-lg">
            <button
              onClick={() => {
                setAutoRotate(!autoRotate);
                isAutoRotateRef.current = !autoRotate;
              }}
              title={language === 'en' ? 'Toggle Auto-Rotate' : 'Rotasi Otomatis'}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                autoRotate ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const nextQ: Record<'high' | 'balanced' | 'performance', 'high' | 'balanced' | 'performance'> = {
                  high: 'balanced',
                  balanced: 'performance',
                  performance: 'high',
                };
                updateSettings({ graphicsQuality: nextQ[settings.graphicsQuality] || 'balanced' });
              }}
              title={
                language === 'en'
                  ? `Graphics Quality: ${settings.graphicsQuality} (click to cycle)`
                  : `Kualitas Grafis: ${settings.graphicsQuality} (klik untuk beralih)`
              }
              className="px-2 py-1 rounded-lg text-[11px] font-mono font-bold text-slate-300 hover:text-emerald-400 transition-colors uppercase"
            >
              {settings.graphicsQuality === 'high' ? 'HQ' : settings.graphicsQuality === 'balanced' ? 'BAL' : 'PERF'}
            </button>
            <button
              onClick={handleResetCamera}
              title={language === 'en' ? 'Reset Camera' : 'Reset Kamera'}
              className="p-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={language === 'en' ? 'Toggle Fullscreen' : 'Layar Penuh'}
              className="p-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* GLOBE OVERLAYS & HOTSPOTS SELECTOR (Visible only in Globe mode) */}
      {viewScale === 'globe' && (
        <div className="absolute top-16 left-3 pointer-events-auto z-20 flex flex-col gap-1.5 max-w-[340px] sm:max-w-none">
          {/* Overlays */}
          <div className="flex flex-wrap gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-lg">
            <button
              onClick={() => setActiveOverlay('biomes')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                activeOverlay === 'biomes'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{language === 'en' ? 'Biomes' : 'Bioma'}</span>
            </button>
            <button
              onClick={() => setActiveOverlay('temperature')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                activeOverlay === 'temperature'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Thermometer className="w-3 h-3" />
              <span>{language === 'en' ? 'Isotherms' : 'Isoterm'}</span>
            </button>
            <button
              onClick={() => setActiveOverlay('precipitation')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                activeOverlay === 'precipitation'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <CloudRain className="w-3 h-3" />
              <span>{language === 'en' ? 'Rainfall' : 'Presipitasi'}</span>
            </button>
            <button
              onClick={() => setActiveOverlay('npp')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                activeOverlay === 'npp'
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{language === 'en' ? 'NPP Carbon' : 'Karbon NPP'}</span>
            </button>
          </div>

          {/* Hotspot Quick-Jump Buttons */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-1 shadow-lg text-[10px]">
            <span className="font-bold text-slate-400 px-1.5 flex items-center gap-1">
              <Compass className="w-3 h-3 text-emerald-400" />
              {language === 'en' ? 'Hotspots:' : 'Titik Pantau:'}
            </span>
            {HOTSPOTS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActiveHotspot(pin)}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  activeHotspot?.id === pin.id
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {pin.name[language].split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Hotspot Inspector Card */}
      {viewScale === 'globe' && activeHotspot && (
        <div className="absolute top-36 left-3 pointer-events-auto z-20 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 rounded-xl p-3 shadow-2xl space-y-2 max-w-[320px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="font-bold text-xs text-white">{activeHotspot.name[language]}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <div className="text-[10px] font-mono text-emerald-400">
            {activeHotspot.lat >= 0 ? `${activeHotspot.lat}°N` : `${Math.abs(activeHotspot.lat)}°S`},{' '}
            {activeHotspot.lon >= 0 ? `${activeHotspot.lon}°E` : `${Math.abs(activeHotspot.lon)}°W`}
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">{activeHotspot.summary[language]}</p>
          <button
            onClick={() => {
              setSelectedBiotope(activeHotspot.biotope);
              setViewScale('biotope');
              setActiveHotspot(null);
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trees className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Dive into 3D Biotope Diorama' : 'Jelajahi Diorama 3D Bioma'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* BIOTOPE SWITCHER (Visible only in Biotope mode) */}
      {viewScale === 'biotope' && (
        <div className="absolute top-16 left-3 pointer-events-auto z-20 flex flex-wrap gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-lg max-w-[340px] sm:max-w-none">
          {(
            [
              { key: 'tundra', label: { en: '❄️ Tundra', id: '❄️ Tundra' } },
              { key: 'taiga', label: { en: '🌲 Taiga', id: '🌲 Taiga' } },
              { key: 'temperate', label: { en: '🍂 Deciduous', id: '🍂 Hutan Gugur' } },
              { key: 'desert', label: { en: '🏜️ Desert', id: '🏜️ Gurun' } },
              { key: 'rainforest', label: { en: '🌴 Rainforest', id: '🌴 Hutan Hujan' } },
              { key: 'coral', label: { en: '🪸 Coral Reef', id: '🪸 Terumbu Karang' } },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedBiotope(item.key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                selectedBiotope === item.key
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label[language]}
            </button>
          ))}
        </div>
      )}

      {/* REAL-TIME SCIENTIFIC TELEMETRY HUD */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-20 font-mono text-[10px] bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-slate-300 shadow-xl space-y-1.5 max-w-[280px] sm:max-w-[340px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3" />
            {language === 'en' ? 'Biosphere Telemetry' : 'Telemetri Biosfer'}
          </span>
          <span className="text-slate-400 font-bold">
            {viewScale === 'globe' ? 'MACRO-SCALE' : 'MICRO-BIOTOPE'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-0.5">
          <div>
            <span className="text-slate-500">Mean Temp: </span>
            <span className="text-slate-200 font-bold">{globalMeanTemp.toFixed(1)}°C</span>
          </div>
          <div>
            <span className="text-slate-500">Albedo (α): </span>
            <span className="text-slate-200 font-bold">{planetaryAlbedo}</span>
          </div>
          <div>
            <span className="text-slate-500">Global NPP: </span>
            <span className="text-emerald-400 font-bold">{estimatedNppGt} Gt C/yr</span>
          </div>
          <div>
            <span className="text-slate-500">Solar Constant: </span>
            <span className="text-amber-400 font-bold">1361 W/m²</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CONTROLS DRAWER / PANEL (Bottom-Right) */}
      <div className="absolute bottom-3 right-3 pointer-events-auto z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl max-w-[300px] w-full space-y-2.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-bold text-slate-200">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Sliders className="w-3.5 h-3.5" />
            {viewScale === 'globe'
              ? language === 'en'
                ? 'Climate Warming Perturbation'
                : 'Perturbasi Pemanasan Iklim'
              : language === 'en'
              ? 'Biotope Parameter Controls'
              : 'Kontrol Parameter Bioma'}
          </span>
        </div>

        {/* MODE A: GLOBE CLIMATE WARMING SLIDER */}
        {viewScale === 'globe' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>{language === 'en' ? 'Global Anomaly (ΔT):' : 'Anomali Global (ΔT):'}</span>
              <span className="font-mono font-bold text-amber-400">
                {warmingDeltaT > 0 ? `+${warmingDeltaT}` : warmingDeltaT}°C
              </span>
            </div>
            <input
              type="range"
              min="-3"
              max="5"
              step="1"
              value={warmingDeltaT}
              onChange={(e) => setWarmingDeltaT(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>-3°C (Glacial)</span>
              <span>0°C (Baseline)</span>
              <span>+5°C (Extreme)</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {language === 'en'
                ? 'Alters latitudinal biome boundaries in real-time: tundra contracts, deserts expand poleward.'
                : 'Menggeser batas latitudinal bioma: tundra menyusut ke kutub, gurun meluas.'}
            </p>
          </div>
        )}

        {/* MODE B: BIOTOPE-SPECIFIC PARAMETER CONTROLS */}
        {viewScale === 'biotope' && (
          <div className="space-y-2.5 text-xs">
            {/* TUNDRA CONTROLS */}
            {selectedBiotope === 'tundra' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'en' ? 'Active Layer Thaw:' : 'Cair Lapisan Aktif:'}</span>
                    <span className="font-mono text-emerald-400">{thawDepthCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={thawDepthCm}
                    onChange={(e) => setThawDepthCm(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'en' ? 'Snow Albedo (α):' : 'Albedo Salju (α):'}</span>
                    <span className="font-mono text-sky-400">{snowAlbedo.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="85"
                    value={Math.round(snowAlbedo * 100)}
                    onChange={(e) => setSnowAlbedo(parseInt(e.target.value) / 100)}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </>
            )}

            {/* TAIGA CONTROLS */}
            {selectedBiotope === 'taiga' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'en' ? 'Fire Return Interval:' : 'Siklus Kebakaran:'}</span>
                    <span className="font-mono text-amber-400">{fireIntervalYrs} {language === 'en' ? 'yrs' : 'thn'}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="10"
                    value={fireIntervalYrs}
                    onChange={(e) => setFireIntervalYrs(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'en' ? 'Soil Acidity (pH):' : 'Keasaman Tanah (pH):'}</span>
                    <span className="font-mono text-emerald-400">{soilAcidityPh.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="38"
                    max="55"
                    value={Math.round(soilAcidityPh * 10)}
                    onChange={(e) => setSoilAcidityPh(parseInt(e.target.value) / 10)}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </>
            )}

            {/* TEMPERATE FOREST CONTROLS */}
            {selectedBiotope === 'temperate' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>{language === 'en' ? 'Season Morphing:' : 'Perubahan Musim:'}</span>
                  <span className="font-mono font-bold text-amber-400">
                    {
                      [
                        language === 'en' ? 'Spring' : 'Musim Semi',
                        language === 'en' ? 'Summer' : 'Musim Panas',
                        language === 'en' ? 'Autumn' : 'Musim Gugur',
                        language === 'en' ? 'Winter' : 'Musim Dingin',
                      ][seasonIndex]
                    }
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={seasonIndex}
                  onChange={(e) => setSeasonIndex(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[10px] text-slate-400">
                  {language === 'en'
                    ? 'Watch chlorophyll degrade in autumn, unmasking carotenoids and anthocyanins.'
                    : 'Saksikan degradasi klorofil saat musim gugur, menampakkan karotenoid & antosianin.'}
                </p>
              </div>
            )}

            {/* DESERT CONTROLS */}
            {selectedBiotope === 'desert' && (
              <div className="space-y-2">
                <button
                  onClick={() => setRainPulseActive(!rainPulseActive)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    rainPulseActive
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>
                    {rainPulseActive
                      ? language === 'en'
                        ? '🌸 Bloom Active'
                        : '🌸 Mekar Aktif'
                      : language === 'en'
                      ? 'Trigger Rain Pulse'
                      : 'Picu Hujan Gurun'}
                  </span>
                </button>
                <button
                  onClick={() => setCamNightCycle(!camNightCycle)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    camNightCycle
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>
                    {camNightCycle
                      ? language === 'en'
                        ? '🌙 Night: CAM Malate Fix'
                        : '🌙 Malam: Fiksasi Malat CAM'
                      : language === 'en'
                      ? '☀️ Day: Stomata Closed'
                      : '☀️ Siang: Stomata Tutup'}
                  </span>
                </button>
              </div>
            )}

            {/* RAINFOREST CONTROLS */}
            {selectedBiotope === 'rainforest' && (
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{language === 'en' ? 'Canopy LAI:' : 'Indeks LAI Kanopi:'}</span>
                  <span className="font-mono text-emerald-400">{canopyLai.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={Math.round(canopyLai * 10)}
                  onChange={(e) => setCanopyLai(parseInt(e.target.value) / 10)}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}

            {/* CORAL REEF CONTROLS */}
            {selectedBiotope === 'coral' && (
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{language === 'en' ? 'Sea Surface Temp:' : 'Suhu Air Laut:'}</span>
                    <span
                      className={`font-mono font-bold ${
                        seaTempC > 29.5 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {seaTempC.toFixed(1)}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="240"
                    max="320"
                    value={Math.round(seaTempC * 10)}
                    onChange={(e) => setSeaTempC(parseInt(e.target.value) / 10)}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>24°C (Normal)</span>
                    <span className="text-rose-400">&gt;29.5°C (Bleaching)</span>
                    <span>32°C</span>
                  </div>
                </div>

                {seaTempC > 29.5 && (
                  <div className="flex items-center gap-1.5 p-1.5 bg-rose-500/20 border border-rose-500/40 rounded-lg text-[10px] text-rose-300">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Thermal Bleaching: Zooxanthellae expelled!'
                        : 'Pemutihan Termal: Zooxanthellae terlempar!'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
