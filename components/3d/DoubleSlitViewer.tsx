'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { Eye, EyeOff, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { TelemetryHUD } from './TelemetryHUD';
import { attachCanvasControls } from '@/lib/canvasControls';

export const DoubleSlitViewer: React.FC = () => {
  const { language, settings } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [detectorActive, setDetectorActive] = useState<boolean>(false);
  const [wavelength, setWavelength] = useState<number>(550); // nm
  const [slitDistance, setSlitDistance] = useState<number>(1.2); // mm
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [accumulatedHits, setAccumulatedHits] = useState<number>(0);

  // Telemetry state
  const [fps, setFps] = useState<number>(60);
  const [drawCalls, setDrawCalls] = useState<number>(0);
  const [triangles, setTriangles] = useState<number>(0);

  // References for dynamic updates to avoid tearing down WebGL renderer and re-renders
  const detectorActiveRef = useRef(detectorActive);
  const wavelengthRef = useRef(wavelength);
  const slitDistanceRef = useRef(slitDistance);
  const isRunningRef = useRef(isRunning);

  useEffect(() => {
    detectorActiveRef.current = detectorActive;
    wavelengthRef.current = wavelength;
    slitDistanceRef.current = slitDistance;
    isRunningRef.current = isRunning;
  }, [detectorActive, wavelength, slitDistance, isRunning]);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const waveMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particleHitPositions = useRef<number[]>([]);
  const hitCountRef = useRef<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7, 13);
    camera.lookAt(0, 0, -1);

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
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // 1. Emitter Source Gun
    const gunGeo = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 16);
    gunGeo.rotateX(Math.PI / 2);
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
    const gun = new THREE.Mesh(gunGeo, gunMat);
    gun.position.set(0, 0, 5);
    scene.add(gun);

    // Glowing tip
    const tipGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.set(0, 0, 4.4);
    scene.add(tip);

    // 2. Barrier Wall with Two Slits
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    // Left piece
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3, 0.2), wallMat);
    leftWall.position.set(-2, 0, 1);
    scene.add(leftWall);

    // Center piece (between slits)
    const centerWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3, 0.2), wallMat);
    centerWall.position.set(0, 0, 1);
    scene.add(centerWall);

    // Right piece
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3, 0.2), wallMat);
    rightWall.position.set(2, 0, 1);
    scene.add(rightWall);

    // 3. Detector Screen at Back
    const screenGeo = new THREE.PlaneGeometry(8, 3.5);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      side: THREE.DoubleSide,
      roughness: 0.8,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0, -4);
    scene.add(screen);

    // Screen Grid Border
    const screenBorder = new THREE.LineSegments(
      new THREE.EdgesGeometry(screenGeo),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
    );
    screenBorder.position.copy(screen.position);
    scene.add(screenBorder);

    // 4. Wave Mesh plane between Slits and Screen
    const waveGeo = new THREE.PlaneGeometry(7.5, 5, 80, 80);
    waveGeo.rotateX(-Math.PI / 2);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.position.set(0, -1.2, -1.5);
    waveMeshRef.current = waveMesh;
    scene.add(waveMesh);

    // 5. Particle Hit Points on the screen
    const hitGeo = new THREE.BufferGeometry();
    const maxHits = 4000;
    const hitPositions = new Float32Array(maxHits * 3);
    hitGeo.setAttribute('position', new THREE.BufferAttribute(hitPositions, 3));
    const hitMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particleHits = new THREE.Points(hitGeo, hitMat);
    particlesRef.current = particleHits;
    scene.add(particleHits);

    // Unified Touch, Mouse, and Keyboard Controls
    const domElement = renderer.domElement;
    domElement.setAttribute('role', 'region');
    domElement.setAttribute(
      'aria-label',
      'Interactive Double-Slit Wave-Particle Simulation. Use arrow keys or WASD to orbit, plus and minus to zoom, Space to pause or resume, R to reset camera.'
    );

    const detachControls = attachCanvasControls(domElement, {
      onRotate: (dx, dy) => {
        scene.rotation.y += dx * 0.7;
        camera.position.y = Math.max(2, Math.min(12, camera.position.y - dy * 1.5));
        camera.lookAt(0, 0, -1);
      },
      onZoom: (dZoom) => {
        camera.position.z = Math.max(4, Math.min(16, camera.position.z + dZoom));
        camera.lookAt(0, 0, -1);
      },
      onReset: () => {
        camera.position.set(0, 6, 9);
        camera.lookAt(0, 0, -1);
        scene.rotation.set(0, 0, 0);
      },
      onToggleAutoRotate: () => {
        setIsRunning((prev) => !prev);
      },
    });

    // Animation Loop
    let animId: number;
    let time = 0;
    let frameCount = 0;
    let frameCounter = 0;
    let fpsTimer = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frameCount++;
      const now = performance.now();
      frameCounter++;
      if (now - fpsTimer >= 500) {
        setFps((frameCounter * 1000) / (now - fpsTimer));
        frameCounter = 0;
        fpsTimer = now;
      }

      const speed = settingsRef.current.physicsSpeed || 1.0;
      time += 0.04 * speed;

      const currentIsRunning = isRunningRef.current;
      const currentDetectorActive = detectorActiveRef.current;
      const currentSlitDistance = slitDistanceRef.current;
      const currentWavelength = wavelengthRef.current;

      // Animate wave surface
      if (waveMeshRef.current && currentIsRunning) {
        const pos = waveMeshRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const slit1X = -currentSlitDistance / 2;
        const slit2X = currentSlitDistance / 2;
        const k = (2 * Math.PI * 550) / currentWavelength;

        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const z = pos.getZ(i);

          if (currentDetectorActive) {
            // Classical decoherence: sum of independent intensities without phase interference
            const r1 = Math.sqrt((x - slit1X) ** 2 + z ** 2);
            const r2 = Math.sqrt((x - slit2X) ** 2 + z ** 2);
            const amp = (Math.exp(-r1 * 0.5) + Math.exp(-r2 * 0.5)) * Math.sin(time * 3);
            pos.setY(i, amp * 0.25);
          } else {
            // Quantum wave interference: Superposition of two coherent circular waves
            const r1 = Math.sqrt((x - slit1X) ** 2 + z ** 2);
            const r2 = Math.sqrt((x - slit2X) ** 2 + z ** 2);
            const psi1 = Math.sin(r1 * k * 0.8 - time * 3) / (r1 + 0.5);
            const psi2 = Math.sin(r2 * k * 0.8 - time * 3) / (r2 + 0.5);
            pos.setY(i, (psi1 + psi2) * 0.35);
          }
        }
        pos.needsUpdate = true;
      }

      // Spawn photon/electron hits on the detector screen
      const densityScale = (settingsRef.current.particleDensity || 100) / 100;
      const spawnBatches = Math.max(1, Math.round(2 * densityScale * speed));

      if (currentIsRunning && particlesRef.current && hitCountRef.current < maxHits) {
        for (let h = 0; h < spawnBatches; h++) {
          if (hitCountRef.current >= maxHits) break;
          const hitIdx = hitCountRef.current;
          let screenX = 0;

          if (currentDetectorActive) {
            // Classical two peaks
            const slitChoice = Math.random() > 0.5 ? -currentSlitDistance / 2 : currentSlitDistance / 2;
            const gaussian = (Math.random() + Math.random() + Math.random() - 1.5) * 0.6;
            screenX = slitChoice + gaussian;
          } else {
            // Quantum interference fringes distribution
            let accepted = false;
            let candX = 0;
            for (let attempt = 0; attempt < 20; attempt++) {
              candX = (Math.random() * 2 - 1) * 3.5;
              const fringeFreq = (currentSlitDistance * 1.8 * (550 / currentWavelength));
              const intensity = Math.pow(Math.cos(candX * fringeFreq), 2) * Math.exp(-(candX * candX) / 6);
              if (Math.random() < intensity) {
                screenX = candX;
                accepted = true;
                break;
              }
            }
            if (!accepted) screenX = candX;
          }

          const screenY = (Math.random() * 2 - 1) * 1.5;
          const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
          posAttr.setXYZ(hitIdx, screenX, screenY, -3.95);
          posAttr.needsUpdate = true;
          hitCountRef.current++;
        }

        // Throttle React state updates to every 12 frames (~5 times/sec) to avoid component re-render thrashing
        if (frameCount % 12 === 0) {
          setAccumulatedHits(hitCountRef.current);
        }
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

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      detachControls();
      ro.disconnect();
      renderer.dispose();
    };
  }, [settings.graphicsQuality]);

  const resetSimulation = () => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setXYZ(i, 0, 0, -100);
      }
      pos.needsUpdate = true;
      hitCountRef.current = 0;
      setAccumulatedHits(0);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-mono">
              ψ₁ + ψ₂
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'en' ? 'Double-Slit Wave-Particle Interference' : 'Interferensi Celah Ganda Gelombang-Partikel'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en'
              ? 'Observe how quantum wave coherence generates interference fringes, and how observation collapses the wavefunction.'
              : 'Amati bagaimana koherensi gelombang kuantum menciptakan pola interferensi, dan bagaimana pengamatan meruntuhkan fungsi gelombang.'}
          </p>
        </div>

        {/* Observer Detector State Toggle */}
        <button
          onClick={() => {
            setDetectorActive(!detectorActive);
            resetSimulation();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
            detectorActive
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
          }`}
        >
          {detectorActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>
            {detectorActive
              ? (language === 'en' ? 'Observer Active (Decoherence / Particles)' : 'Detektor Aktif (Dekoherensi / Partikel)')
              : (language === 'en' ? 'Observer Off (Quantum Superposition)' : 'Detektor Mati (Superposisi Kuantum)')}
          </span>
        </button>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="relative h-[380px] sm:h-[440px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
        <TelemetryHUD
          fps={fps}
          drawCalls={drawCalls}
          triangles={triangles}
          particleCount={accumulatedHits}
        />

        <div
          ref={mountRef}
          tabIndex={0}
          className="w-full h-full cursor-grab active:cursor-grabbing canvas-container select-none touch-none outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500/80"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-cyan-400">
            {detectorActive ? 'COLLAPSED: Two Classical Particle Bands' : 'SUPERPOSITION: Wave Interference Fringes'}
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-slate-300">
            Hits: <span className="text-emerald-400 font-semibold">{accumulatedHits}</span>
          </div>
          <div className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-slate-900/70 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-400">
            {language === 'en' ? '↺ Drag/Touch to Orbit • Pinch to Zoom • [R] Reset' : '↺ Sentuh untuk Putar • Cubit untuk Zoom • [R] Reset'}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md"
            title="Play/Pause Emitter"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={resetSimulation}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md"
            title="Reset Screen Hits"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sliders & Physical Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span>{language === 'en' ? 'De Broglie Wavelength (λ)' : 'Panjang Gelombang De Broglie (λ)'}</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">{wavelength} nm</span>
          </div>
          <input
            type="range"
            min={400}
            max={750}
            step={25}
            value={wavelength}
            onChange={(e) => {
              setWavelength(Number(e.target.value));
              resetSimulation();
            }}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span>{language === 'en' ? 'Slit Separation Distance (d)' : 'Jarak Antar Celah (d)'}</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400">{slitDistance.toFixed(1)} mm</span>
          </div>
          <input
            type="range"
            min={0.6}
            max={2.4}
            step={0.2}
            value={slitDistance}
            onChange={(e) => {
              setSlitDistance(Number(e.target.value));
              resetSimulation();
            }}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};
