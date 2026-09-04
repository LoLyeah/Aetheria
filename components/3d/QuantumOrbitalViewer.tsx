'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { RotateCcw, Play, Pause, Layers, Eye, Sparkles, Sliders, Maximize2 } from 'lucide-react';
import { TelemetryHUD } from './TelemetryHUD';
import { attachCanvasControls } from '@/lib/canvasControls';

export type OrbitalKey = '1s' | '2s' | '2px' | '2pz' | '3dz2' | '3dxy' | '4fxyz';

interface OrbitalData {
  key: OrbitalKey;
  name: string;
  n: number;
  l: number;
  ml: number;
  formula: string;
  nodes: { radial: number; angular: number };
  energy: string;
  description: { en: string; id: string };
}

const ORBITALS: Record<OrbitalKey, OrbitalData> = {
  '1s': {
    key: '1s',
    name: '1s (Ground State)',
    n: 1,
    l: 0,
    ml: 0,
    formula: '\\psi_{100}(r) = \\frac{1}{\\sqrt{\\pi a_0^3}} e^{-r/a_0}',
    nodes: { radial: 0, angular: 0 },
    energy: '-13.60 eV',
    description: {
      en: 'Spherically symmetric ground state. Maximum probability density is at the nucleus (r=0), but total radial probability P(r) peaks at the Bohr radius a₀.',
      id: 'Keadaan dasar simetris bola. Kerapatan probabilitas maksimum ada di inti (r=0), namun peluang radial total P(r) mencapai puncak di jari-jari Bohr a₀.',
    },
  },
  '2s': {
    key: '2s',
    name: '2s (1 Radial Node)',
    n: 2,
    l: 0,
    ml: 0,
    formula: '\\psi_{200}(r) = \\frac{1}{4\\sqrt{2\\pi a_0^3}} \\left(2 - \\frac{r}{a_0}\\right) e^{-r/2a_0}',
    nodes: { radial: 1, angular: 0 },
    energy: '-3.40 eV',
    description: {
      en: 'Spherically symmetric with an inner spherical nodal surface at r = 2a₀ where the wave function crosses zero.',
      id: 'Simetris bola dengan satu permukaan simpul bola internal di r = 2a₀ di mana fungsi gelombang bernilai nol.',
    },
  },
  '2pz': {
    key: '2pz',
    name: '2p_z (Dumbbell Lobe)',
    n: 2,
    l: 1,
    ml: 0,
    formula: '\\psi_{210}(r,\\theta) = \\frac{1}{4\\sqrt{2\\pi a_0^3}} \\frac{r}{a_0} e^{-r/2a_0} \\cos\\theta',
    nodes: { radial: 0, angular: 1 },
    energy: '-3.40 eV',
    description: {
      en: 'Bilobed along the z-axis with opposite phase signs (+ and -). The xy-plane (z=0) is a nodal plane with zero electron probability.',
      id: 'Bentuk dua cuping di sepanjang sumbu-z dengan tanda fase berlawanan (+ dan -). Bidang xy (z=0) adalah bidang simpul bernilai nol.',
    },
  },
  '2px': {
    key: '2px',
    name: '2p_x (Horizontal Lobe)',
    n: 2,
    l: 1,
    ml: 1,
    formula: '\\psi_{211}(r,\\theta,\\phi) \\propto r e^{-r/2a_0} \\sin\\theta \\cos\\phi',
    nodes: { radial: 0, angular: 1 },
    energy: '-3.40 eV',
    description: {
      en: 'Bilobed along the x-axis. Perpendicular yz-plane forms the angular nodal plane.',
      id: 'Dua cuping di sepanjang sumbu-x. Bidang yz tegak lurus menjadi bidang simpul angular.',
    },
  },
  '3dz2': {
    key: '3dz2',
    name: '3d_{z²} (Toroid + Lobes)',
    n: 3,
    l: 2,
    ml: 0,
    formula: '\\psi_{320} \\propto r^2 e^{-r/3a_0} (3\\cos^2\\theta - 1)',
    nodes: { radial: 0, angular: 2 },
    energy: '-1.51 eV',
    description: {
      en: 'Two polar lobes along z-axis surrounded by an equatorial donut torus. Features two conical nodal surfaces at θ = 54.7° and 125.3°.',
      id: 'Dua cuping kutub di sepanjang sumbu-z dikelilingi cincin torus ekuatorial. Memiliki dua permukaan simpul kerucut pada sudut θ = 54.7° dan 125.3°.',
    },
  },
  '3dxy': {
    key: '3dxy',
    name: '3d_{xy} (Four Cloverleaf)',
    n: 3,
    l: 2,
    ml: -2,
    formula: '\\psi_{3dxy} \\propto r^2 e^{-r/3a_0} \\sin^2\\theta \\sin(2\\phi)',
    nodes: { radial: 0, angular: 2 },
    energy: '-1.51 eV',
    description: {
      en: 'Four-lobed cloverleaf pattern in the xy plane with alternating wave phases and two perpendicular nodal planes (xz and yz).',
      id: 'Pola semanggi empat cuping pada bidang xy dengan fase gelombang bergantian dan dua bidang simpul tegak lurus (xz dan yz).',
    },
  },
  '4fxyz': {
    key: '4fxyz',
    name: '4f_{xyz} (Octalobe)',
    n: 4,
    l: 3,
    ml: 0,
    formula: '\\psi_{4fxyz} \\propto r^3 e^{-r/4a_0} \\sin^2\\theta \\cos\\theta \\sin(2\\phi)',
    nodes: { radial: 0, angular: 3 },
    energy: '-0.85 eV',
    description: {
      en: 'Complex eight-lobed 3D spatial orbital in the corners of a cube, demonstrating intricate angular momentum quantization in lanthanides/actinides.',
      id: 'Orbital spasial 3D kompleks delapan cuping di sudut-sudut kubus, menunjukkan kuantisasi momentum sudut yang rumit pada lantanida/aktinida.',
    },
  },
};

const SUBSHELL_GROUPS: { subshell: string; l: number; keys: OrbitalKey[] }[] = [
  { subshell: 's (l=0)', l: 0, keys: ['1s', '2s'] },
  { subshell: 'p (l=1)', l: 1, keys: ['2px', '2pz'] },
  { subshell: 'd (l=2)', l: 2, keys: ['3dz2', '3dxy'] },
  { subshell: 'f (l=3)', l: 3, keys: ['4fxyz'] },
];

export const QuantumOrbitalViewer: React.FC = () => {
  const { language, settings } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedOrbital, setSelectedOrbital] = useState<OrbitalKey>('2pz');
  const [renderMode, setRenderMode] = useState<'cloud' | 'mesh' | 'both'>('cloud');
  const [particleDensity, setParticleDensity] = useState<number>(12000);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [showSlice, setShowSlice] = useState<boolean>(false);
  const [showBohrOrbit, setShowBohrOrbit] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMobileControls, setShowMobileControls] = useState<boolean>(false);
  const [contextLost, setContextLost] = useState<boolean>(false);

  // Telemetry state
  const [fps, setFps] = useState<number>(60);
  const [drawCalls, setDrawCalls] = useState<number>(0);
  const [triangles, setTriangles] = useState<number>(0);

  // Dynamic settings ref for animation loop without recreating scene
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Derived active particle count
  const activeParticleCount =
    renderMode === 'mesh'
      ? 0
      : Math.round(particleDensity * ((settings.particleDensity || 100) / 100));

  // Dynamic references to prevent WebGL canvas re-mounting on rotation toggle
  const isRotatingRef = useRef(isRotating);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const bohrGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const orbitalData = ORBITALS[selectedOrbital];

  // Mathematical Wave Function Evaluation
  const evaluateWavefunction = (
    key: OrbitalKey,
    x: number,
    y: number,
    z: number
  ): { psi: number; prob: number; phase: number } => {
    const r = Math.sqrt(x * x + y * y + z * z) + 0.0001;
    const theta = Math.acos(Math.max(-1, Math.min(1, z / r)));
    const phi = Math.atan2(y, x);

    let psi = 0;
    const a0 = 1.0;

    switch (key) {
      case '1s': {
        const rho = r / a0;
        psi = Math.exp(-rho);
        break;
      }
      case '2s': {
        const rho = r / a0;
        psi = (2 - rho) * Math.exp(-rho / 2);
        break;
      }
      case '2pz': {
        const rho = r / a0;
        psi = rho * Math.exp(-rho / 2) * Math.cos(theta);
        break;
      }
      case '2px': {
        const rho = r / a0;
        psi = rho * Math.exp(-rho / 2) * Math.sin(theta) * Math.cos(phi);
        break;
      }
      case '3dz2': {
        const rho = r / a0;
        psi = rho * rho * Math.exp(-rho / 3) * (3 * Math.cos(theta) * Math.cos(theta) - 1);
        break;
      }
      case '3dxy': {
        const rho = r / a0;
        psi = rho * rho * Math.exp(-rho / 3) * (Math.sin(theta) * Math.sin(theta)) * Math.sin(2 * phi);
        break;
      }
      case '4fxyz': {
        const rho = r / a0;
        psi = rho * rho * rho * Math.exp(-rho / 4) * Math.sin(theta) * Math.sin(theta) * Math.cos(theta) * Math.sin(2 * phi);
        break;
      }
    }

    const prob = psi * psi;
    const phase = psi >= 0 ? 1 : -1;
    return { psi, prob, phase };
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Create Three.js Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
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

    // Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf43f5e, 1.5, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Central Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleus);

    // Coordinate Axes Helper (Subtle)
    const axesGroup = new THREE.Group();
    const axisMatX = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35 });
    const axisMatY = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 });
    const axisMatZ = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 });

    const createAxisLine = (p1: THREE.Vector3, p2: THREE.Vector3, mat: THREE.Material) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      return new THREE.Line(geo, mat);
    };
    axesGroup.add(createAxisLine(new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0), axisMatX));
    axesGroup.add(createAxisLine(new THREE.Vector3(0, -6, 0), new THREE.Vector3(0, 6, 0), axisMatY));
    axesGroup.add(createAxisLine(new THREE.Vector3(0, 0, -6), new THREE.Vector3(0, 0, 6), axisMatZ));
    scene.add(axesGroup);

    // Unified Touch, Mouse, and Keyboard Controls
    let isDragging = false;
    const domElement = renderer.domElement;
    domElement.setAttribute('role', 'region');
    domElement.setAttribute(
      'aria-label',
      'Interactive 3D Quantum Orbital Simulation. Use arrow keys or WASD to rotate, plus and minus to zoom, Space to toggle auto-rotation, R to reset camera.'
    );

    const detachControls = attachCanvasControls(domElement, {
      onRotate: (deltaX, deltaY) => {
        scene.rotation.y += deltaX;
        scene.rotation.x += deltaY;
      },
      onZoom: (deltaZoom) => {
        camera.position.z = Math.max(4, Math.min(25, camera.position.z + deltaZoom));
      },
      onReset: () => {
        camera.position.set(0, 5, 14);
        camera.lookAt(0, 0, 0);
        scene.rotation.set(0, 0, 0);
      },
      onToggleAutoRotate: () => {
        setIsRotating((prev) => !prev);
      },
      onDragStateChange: (dragging) => {
        isDragging = dragging;
      },
    });

    // Animation Loop
    let animationFrameId: number;
    let frameCounter = 0;
    let fpsTimer = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      frameCounter++;
      if (now - fpsTimer >= 500) {
        setFps((frameCounter * 1000) / (now - fpsTimer));
        frameCounter = 0;
        fpsTimer = now;
      }

      const speed = settingsRef.current.physicsSpeed || 1.0;
      if (isRotatingRef.current && settingsRef.current.autoRotate3D !== false && !isDragging) {
        scene.rotation.y += 0.004 * speed;
      }

      // Pulse nucleus
      const t = Date.now() * 0.003 * speed;
      nucleus.scale.setScalar(1 + 0.08 * Math.sin(t));

      // Rotate Bohr orbit electron if active
      if (bohrGroupRef.current) {
        bohrGroupRef.current.rotation.y += 0.03 * speed;
      }

      renderer.render(scene, camera);
      setDrawCalls(renderer.info.render.calls);
      setTriangles(renderer.info.render.triangles);
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

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };

    const handleContextRestored = () => {
      setContextLost(false);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('webglcontextlost', handleContextLost, false);
    domElem.addEventListener('webglcontextrestored', handleContextRestored, false);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      detachControls();
      domElem.removeEventListener('webglcontextlost', handleContextLost);
      domElem.removeEventListener('webglcontextrestored', handleContextRestored);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [settings.graphicsQuality]);

  // Rebuild 3D Orbital Geometry on parameters change
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove old particle system
    if (particlesRef.current) {
      scene.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
      (particlesRef.current.material as THREE.Material).dispose();
      particlesRef.current = null;
    }

    // Remove old mesh group
    if (meshGroupRef.current) {
      scene.remove(meshGroupRef.current);
      meshGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      });
      meshGroupRef.current = null;
    }

    // Remove Bohr model group
    if (bohrGroupRef.current) {
      scene.remove(bohrGroupRef.current);
      bohrGroupRef.current = null;
    }

    // 1. Build Probabilistic Quantum Particle Cloud
    if (renderMode === 'cloud' || renderMode === 'both') {
      const positions: number[] = [];
      const colors: number[] = [];
      const sizes: number[] = [];

      const maxR = orbitalData.n * 2.8;
      let count = 0;
      const densityRatio = (settings.particleDensity || 100) / 100;
      const targetCount = Math.round(particleDensity * densityRatio);
      let iterations = 0;
      const maxIterations = targetCount * 50;

      // Color pallete: Cyan (Phase +) / Magenta (Phase -)
      const colorPos = new THREE.Color(0x06b6d4); // Cyan
      const colorNeg = new THREE.Color(0xf43f5e); // Rose / Magenta
      const colorNeutral = new THREE.Color(0x38bdf8);

      while (count < targetCount && iterations < maxIterations) {
        iterations++;
        // Rejection sampling
        const x = (Math.random() * 2 - 1) * maxR;
        const y = (Math.random() * 2 - 1) * maxR;
        const z = (Math.random() * 2 - 1) * maxR;

        // Apply slice plane if enabled
        if (showSlice && x < 0) continue;

        const { psi, prob, phase } = evaluateWavefunction(selectedOrbital, x, y, z);

        // Acceptance condition scaled
        const scaleFactor = selectedOrbital === '1s' ? 1.0 : selectedOrbital === '2s' ? 1.8 : 2.4;
        const threshold = Math.random() * 0.8;

        if (prob * scaleFactor > threshold) {
          positions.push(x, y, z);

          const c = phase > 0 ? colorPos : colorNeg;
          colors.push(c.r, c.g, c.b);

          sizes.push(0.04 + Math.random() * 0.05);
          count++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      // Circular particle point texture
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,0.8)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);

      const pTexture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        map: pTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particleSystem = new THREE.Points(geometry, material);
      particlesRef.current = particleSystem;
      scene.add(particleSystem);
    }

    // 2. Build Smooth Isosurface Parametric Lobes
    if (renderMode === 'mesh' || renderMode === 'both') {
      const meshGroup = new THREE.Group();

      const createLobe = (colorHex: number, position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3) => {
        const geo = new THREE.SphereGeometry(1, 32, 32);
        geo.scale(scale.x, scale.y, scale.z);
        const mat = new THREE.MeshPhysicalMaterial({
          color: colorHex,
          transparent: true,
          opacity: 0.45,
          roughness: 0.2,
          transmission: 0.4,
          thickness: 0.5,
          wireframe: false,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(position);
        mesh.rotation.copy(rotation);
        return mesh;
      };

      if (selectedOrbital === '1s') {
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.8, 1.8, 1.8)));
      } else if (selectedOrbital === '2s') {
        // Inner positive sphere + outer sphere
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.2, 1.2, 1.2)));
        meshGroup.add(createLobe(0xf43f5e, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(3.2, 3.2, 3.2)));
      } else if (selectedOrbital === '2pz') {
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(0, 1.8, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.2, 1.8, 1.2)));
        meshGroup.add(createLobe(0xf43f5e, new THREE.Vector3(0, -1.8, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.2, 1.8, 1.2)));
      } else if (selectedOrbital === '2px') {
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(1.8, 0, 0), new THREE.Euler(0, 0, Math.PI / 2), new THREE.Vector3(1.2, 1.8, 1.2)));
        meshGroup.add(createLobe(0xf43f5e, new THREE.Vector3(-1.8, 0, 0), new THREE.Euler(0, 0, Math.PI / 2), new THREE.Vector3(1.2, 1.8, 1.2)));
      } else if (selectedOrbital === '3dz2') {
        // Polar lobes + Torus
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(0, 2.2, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.1, 2.0, 1.1)));
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(0, -2.2, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.1, 2.0, 1.1)));

        const torusGeo = new THREE.TorusGeometry(1.6, 0.45, 24, 48);
        torusGeo.rotateX(Math.PI / 2);
        const torusMat = new THREE.MeshPhysicalMaterial({
          color: 0xf43f5e,
          transparent: true,
          opacity: 0.5,
          roughness: 0.3,
        });
        meshGroup.add(new THREE.Mesh(torusGeo, torusMat));
      } else if (selectedOrbital === '3dxy') {
        const offset = 1.8;
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(offset, offset, 0), new THREE.Euler(0, 0, Math.PI / 4), new THREE.Vector3(1.0, 1.6, 1.0)));
        meshGroup.add(createLobe(0x06b6d4, new THREE.Vector3(-offset, -offset, 0), new THREE.Euler(0, 0, Math.PI / 4), new THREE.Vector3(1.0, 1.6, 1.0)));
        meshGroup.add(createLobe(0xf43f5e, new THREE.Vector3(-offset, offset, 0), new THREE.Euler(0, 0, -Math.PI / 4), new THREE.Vector3(1.0, 1.6, 1.0)));
        meshGroup.add(createLobe(0xf43f5e, new THREE.Vector3(offset, -offset, 0), new THREE.Euler(0, 0, -Math.PI / 4), new THREE.Vector3(1.0, 1.6, 1.0)));
      } else if (selectedOrbital === '4fxyz') {
        const o = 1.4;
        const signs = [
          [1, 1, 1, 0x06b6d4],
          [-1, -1, 1, 0x06b6d4],
          [-1, 1, -1, 0x06b6d4],
          [1, -1, -1, 0x06b6d4],
          [-1, 1, 1, 0xf43f5e],
          [1, -1, 1, 0xf43f5e],
          [1, 1, -1, 0xf43f5e],
          [-1, -1, -1, 0xf43f5e],
        ];
        signs.forEach(([sx, sy, sz, col]) => {
          meshGroup.add(createLobe(col as number, new THREE.Vector3(sx * o, sy * o, sz * o), new THREE.Euler(0, 0, 0), new THREE.Vector3(0.85, 0.85, 0.85)));
        });
      }

      meshGroupRef.current = meshGroup;
      scene.add(meshGroup);
    }

    // 3. Optional Classical Bohr Orbit Track comparison
    if (showBohrOrbit) {
      const bohrGroup = new THREE.Group();
      const r = orbitalData.n * 2.2;
      const ringGeo = new THREE.RingGeometry(r - 0.03, r + 0.03, 64);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
      bohrGroup.add(new THREE.Mesh(ringGeo, ringMat));

      // Orbiting electron sphere
      const eGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const eMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xd97706 });
      const electron = new THREE.Mesh(eGeo, eMat);
      electron.position.set(r, 0, 0);
      bohrGroup.add(electron);

      bohrGroupRef.current = bohrGroup;
      scene.add(bohrGroup);
    }
  }, [selectedOrbital, renderMode, particleDensity, showSlice, showBohrOrbit, orbitalData.n, settings.particleDensity]);

  const resetCamera = () => {
    if (cameraRef.current && sceneRef.current) {
      cameraRef.current.position.set(0, 5, 14);
      cameraRef.current.lookAt(0, 0, 0);
      sceneRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className={`flex flex-col gap-4 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm min-w-0 overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none p-6 overflow-y-auto' : ''}`}>
      {/* Top Header & Orbital Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 min-w-0">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-mono flex-shrink-0">
              ψ(r, θ, φ)
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words">
              {language === 'en' ? '3D Quantum Orbital Probability Cloud' : 'Awan Probabilitas Orbital Kuantum 3D'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en'
              ? 'Real-time probability density (|ψ|²) Monte-Carlo spatial sampling and wave phase coloring.'
              : 'Sampling spasial Monte-Carlo kerapatan probabilitas real-time (|ψ|²) dan pewarnaan fase gelombang.'}
          </p>
        </div>

        {/* Subshell-Chunked Orbital Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {SUBSHELL_GROUPS.map((group) => (
            <div
              key={group.subshell}
              className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
            >
              <span className="px-1.5 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase select-none">
                {group.subshell}
              </span>
              {group.keys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedOrbital(key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedOrbital === key
                      ? 'bg-white dark:bg-sky-600 text-sky-600 dark:text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  aria-pressed={selectedOrbital === key}
                  title={`Select orbital ${key}`}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main 3D Canvas + Live Stats Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* 3D Canvas Stage */}
        <div className="lg:col-span-3 relative h-[420px] sm:h-[480px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
          <TelemetryHUD
            fps={fps}
            drawCalls={drawCalls}
            triangles={triangles}
            particleCount={renderMode === 'mesh' ? 0 : activeParticleCount}
          />

          <div
            ref={mountRef}
            tabIndex={0}
            className="w-full h-full cursor-grab active:cursor-grabbing canvas-container select-none touch-none outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500/80"
          />

          {/* Floating Canvas Overlays */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
            <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-cyan-400">
              {orbitalData.name}
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
              Energy: <span className="text-emerald-400 font-semibold">{orbitalData.energy}</span>
            </div>
            <div className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-400">
              {language === 'en' ? '↺ Drag/Touch to Orbit • Pinch to Zoom • [R] Reset' : '↺ Sentuh untuk Putar • Cubit untuk Zoom • [R] Reset'}
            </div>
          </div>

          {/* Phase Legend Overlay */}
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 text-[10px] sm:text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-xs shadow-cyan-500/50" />
              +ψ ({language === 'en' ? 'Positive Phase' : 'Fase Positif'})
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs shadow-rose-500/50" />
              -ψ ({language === 'en' ? 'Negative Phase' : 'Fase Negatif'})
            </span>
          </div>

          {/* Screen Reader Dynamic Simulation State Announcement */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {language === 'en'
              ? `Currently viewing 3D quantum orbital ${orbitalData.name}. Principal quantum number n equals ${orbitalData.n}, angular momentum l equals ${orbitalData.l}, magnetic quantum number m_l equals ${orbitalData.ml}. Radial nodes: ${orbitalData.nodes.radial}, angular nodal planes: ${orbitalData.nodes.angular}. Energy: ${orbitalData.energy}.`
              : `Sedang menampilkan orbital kuantum 3D ${orbitalData.name}. Bilangan kuantum utama n sama dengan ${orbitalData.n}, momentum sudut l sama dengan ${orbitalData.l}, bilangan kuantum magnetik m_l sama dengan ${orbitalData.ml}. Simpul radial: ${orbitalData.nodes.radial}, bidang simpul sudut: ${orbitalData.nodes.angular}. Energi: ${orbitalData.energy}.`}
          </div>

          {/* WebGL Context Loss Recovery Overlay */}
          {contextLost && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
              <p className="text-sm font-bold text-rose-400 mb-2">
                {language === 'en' ? '3D Graphics Context Suspended' : 'Konteks Grafis 3D Ditangguhkan'}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                {language === 'en'
                  ? 'Your GPU context was temporarily reclaimed by the browser or operating system.'
                  : 'Konteks GPU perangkat Anda dihentikan sementara oleh peramban atau sistem operasi.'}
              </p>
              <button
                onClick={() => {
                  setContextLost(false);
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                {language === 'en' ? 'Reload 3D Simulation' : 'Muat Ulang Simulasi 3D'}
              </button>
            </div>
          )}

          {/* Mobile Quick Parameter Drawer */}
          {showMobileControls && (
            <div className="lg:hidden absolute bottom-14 left-3 right-3 p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white shadow-2xl space-y-3 z-10 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-sky-400">
                  {language === 'en' ? 'Quick Parameters' : 'Parameter Cepat'}
                </span>
                <button
                  onClick={() => setShowMobileControls(false)}
                  className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              {/* Density slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                  <span>{language === 'en' ? 'Particle Density' : 'Kepadatan Partikel'}</span>
                  <span className="text-sky-400">{particleDensity.toLocaleString()} pts</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={24000}
                  step={1000}
                  value={particleDensity}
                  onChange={(e) => setParticleDensity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
              {/* Mode & Slice */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="grid grid-cols-3 gap-1 flex-1 text-[11px] font-medium bg-slate-800 p-1 rounded-lg">
                  <button
                    onClick={() => setRenderMode('cloud')}
                    className={`py-1 rounded text-center cursor-pointer transition-all ${
                      renderMode === 'cloud' ? 'bg-sky-500 text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    Cloud
                  </button>
                  <button
                    onClick={() => setRenderMode('mesh')}
                    className={`py-1 rounded text-center cursor-pointer transition-all ${
                      renderMode === 'mesh' ? 'bg-sky-500 text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    Mesh
                  </button>
                  <button
                    onClick={() => setRenderMode('both')}
                    className={`py-1 rounded text-center cursor-pointer transition-all ${
                      renderMode === 'both' ? 'bg-sky-500 text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    Both
                  </button>
                </div>
                <button
                  onClick={() => setShowSlice(!showSlice)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
                    showSlice
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {showSlice ? 'Slice: ON' : 'Slice: OFF'}
                </button>
              </div>
            </div>
          )}

          {/* Canvas Floating Action Buttons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            <button
              onClick={() => setShowMobileControls(!showMobileControls)}
              className="lg:hidden p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
              title={language === 'en' ? 'Quick Parameters' : 'Parameter Cepat'}
              aria-expanded={showMobileControls}
            >
              <Sliders className="w-4 h-4 text-sky-400" />
            </button>
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
              title={isRotating ? 'Pause Rotation' : 'Auto Rotate'}
            >
              {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetCamera}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
              title="Reset Camera View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Sidebar: Analytical Parameters & Controls */}
        <div className="flex flex-col gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'en' ? 'Quantum Parameters' : 'Parameter Kuantum'}
          </h4>

          {/* Quantum Numbers Grid */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">n (Shell)</span>
              <span className="text-base font-bold text-sky-600 dark:text-sky-400">{orbitalData.n}</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">l (Subshell)</span>
              <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">{orbitalData.l}</span>
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">m_l (Orientation)</span>
              <span className="text-base font-bold text-purple-600 dark:text-purple-400">{orbitalData.ml}</span>
            </div>
          </div>

          {/* Node Counts */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">{language === 'en' ? 'Radial Nodes' : 'Simpul Radial'} (n-l-1):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">{orbitalData.nodes.radial}</span>
            </div>
            <div className="flex justify-between py-1 pt-1.5">
              <span className="text-slate-500">{language === 'en' ? 'Angular Nodal Planes' : 'Bidang Simpul Sudut'} (l):</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">{orbitalData.nodes.angular}</span>
            </div>
          </div>

          {/* Rendering View Options */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              {language === 'en' ? 'Visualization Mode' : 'Mode Visualisasi'}
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-lg text-xs font-medium">
              <button
                onClick={() => setRenderMode('cloud')}
                className={`py-1 rounded-md text-center transition-all ${
                  renderMode === 'cloud' ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                |ψ|² Cloud
              </button>
              <button
                onClick={() => setRenderMode('mesh')}
                className={`py-1 rounded-md text-center transition-all ${
                  renderMode === 'mesh' ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Isosurface
              </button>
              <button
                onClick={() => setRenderMode('both')}
                className={`py-1 rounded-md text-center transition-all ${
                  renderMode === 'both' ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Combined
              </button>
            </div>
          </div>

          {/* Particle Density Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span>{language === 'en' ? 'Particle Cloud Density' : 'Kepadatan Partikel'}</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{particleDensity.toLocaleString()} pts</span>
            </div>
            <input
              type="range"
              min={3000}
              max={24000}
              step={1000}
              value={particleDensity}
              onChange={(e) => setParticleDensity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Interactive Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300">
                {language === 'en' ? 'Slice Radial Cross-Section' : 'Iris Penampang Radial (Cross-Section)'}
              </span>
              <input
                type="checkbox"
                checked={showSlice}
                onChange={(e) => setShowSlice(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 accent-sky-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700 dark:text-slate-300">
                {language === 'en' ? 'Compare Bohr Planetary Orbit' : 'Bandingkan Orbit Bohr Klasik'}
              </span>
              <input
                type="checkbox"
                checked={showBohrOrbit}
                onChange={(e) => setShowBohrOrbit(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Analytical Description */}
          <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-900/60 rounded-xl text-xs text-sky-900 dark:text-sky-200 leading-relaxed">
            {orbitalData.description[language]}
          </div>
        </div>
      </div>
    </div>
  );
};
