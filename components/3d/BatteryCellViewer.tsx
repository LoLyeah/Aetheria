'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { Zap, Thermometer, BatteryCharging, RotateCcw, Play, Pause, Flame, Sliders, Layers } from 'lucide-react';

export type CellFormat = '4680-cylindrical' | 'prismatic-module' | 'pack-cooling';

export const BatteryCellViewer: React.FC = () => {
  const { language } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [cellFormat, setCellFormat] = useState<CellFormat>('4680-cylindrical');
  const [isCharging, setIsCharging] = useState<boolean>(true); // Charging vs Discharging Li+ flow
  const [cRate, setCRate] = useState<number>(2.0); // 0.5C to 4.0C fast charge
  const [showThermalHeatmap, setShowThermalHeatmap] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const ionParticlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Industrial Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    light1.position.set(6, 10, 8);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x10b981, 1.2);
    light2.position.set(-6, -4, -6);
    scene.add(light2);

    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Mouse Drag Rotation
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
      camera.position.z = Math.max(3, Math.min(20, camera.position.z + e.deltaY * 0.01));
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

      // Animate Lithium Ion migration particles along jellyroll spiral / cross-section
      if (ionParticlesRef.current) {
        const pos = ionParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const speed = (isCharging ? 1 : -1) * (cRate * 0.02);

        for (let i = 0; i < pos.count; i++) {
          let y = pos.getY(i) + speed;
          if (y > 2.0) y = -2.0;
          if (y < -2.0) y = 2.0;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
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
  }, [isRotating, cRate, isCharging]);

  // Rebuild 3D Battery Model on parameter changes
  useEffect(() => {
    const group = modelGroupRef.current;
    const scene = sceneRef.current;
    if (!group || !scene) return;

    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    if (ionParticlesRef.current) {
      scene.remove(ionParticlesRef.current);
      ionParticlesRef.current.geometry.dispose();
      (ionParticlesRef.current.material as THREE.Material).dispose();
      ionParticlesRef.current = null;
    }

    // Material definitions (Nickel Steel Can, Copper Anode Foil, Aluminum Cathode Foil, Polyethylene Separator)
    const steelCanMat = new THREE.MeshStandardMaterial({
      color: showThermalHeatmap ? 0xf43f5e : 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    });

    const copperAnodeMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Copper / Graphite
      metalness: 0.8,
      roughness: 0.3,
    });

    const cathodeNmcMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Aluminum / NMC Cobalt
      metalness: 0.7,
      roughness: 0.3,
    });

    const separatorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });

    // 1. FORMAT: 4680 TABLESS CYLINDRICAL CELL (Cutaway Jellyroll)
    if (cellFormat === '4680-cylindrical') {
      const outerRadius = 2.3;
      const height = 4.0;

      // Half-cylinder cutaway can to expose internal jellyroll
      const canGeo = new THREE.CylinderGeometry(outerRadius, outerRadius, height, 32, 1, false, 0, Math.PI * 1.5);
      const canMesh = new THREE.Mesh(canGeo, steelCanMat);
      group.add(canMesh);

      // Wound Jellyroll Concentric Spiral Layers
      const layerCount = 12;
      for (let i = 1; i <= layerCount; i++) {
        const rad = 0.4 + (i / layerCount) * (outerRadius - 0.45);
        const layerGeo = new THREE.CylinderGeometry(rad, rad, height - 0.2, 32, 1, true, 0, Math.PI * 1.5);
        const mat = i % 3 === 0 ? copperAnodeMat : i % 3 === 1 ? cathodeNmcMat : separatorMat;
        const layerMesh = new THREE.Mesh(layerGeo, mat);
        group.add(layerMesh);
      }

      // Top Tabless Crown Ring Terminal
      const crownGeo = new THREE.CylinderGeometry(outerRadius * 0.95, outerRadius * 0.95, 0.25, 32);
      const crownMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.position.set(0, height / 2 + 0.12, 0);
      group.add(crown);

      // Central Steel Mandrel Pin
      const pinGeo = new THREE.CylinderGeometry(0.35, 0.35, height, 16);
      const pinMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      group.add(pin);

      // Li+ Ion Migration Particles inside Jellyroll
      const ionCount = 1500;
      const ionGeo = new THREE.BufferGeometry();
      const ionPositions = new Float32Array(ionCount * 3);
      for (let i = 0; i < ionCount; i++) {
        const r = 0.5 + Math.random() * (outerRadius - 0.6);
        const angle = Math.random() * Math.PI * 1.5;
        const y = (Math.random() - 0.5) * height;
        ionPositions[i * 3] = r * Math.cos(angle);
        ionPositions[i * 3 + 1] = y;
        ionPositions[i * 3 + 2] = r * Math.sin(angle);
      }
      ionGeo.setAttribute('position', new THREE.BufferAttribute(ionPositions, 3));
      const ionMat = new THREE.PointsMaterial({
        color: isCharging ? 0x10b981 : 0x38bdf8,
        size: 0.08,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const ionParticles = new THREE.Points(ionGeo, ionMat);
      ionParticlesRef.current = ionParticles;
      scene.add(ionParticles);
    }

    // 2. FORMAT: PRISMATIC MODULE WITH COOLING PLATE
    else if (cellFormat === 'prismatic-module') {
      const cellWidth = 1.4;
      const cellHeight = 3.5;
      const cellDepth = 0.6;
      const numCells = 6;

      for (let i = 0; i < numCells; i++) {
        const xPos = (i - (numCells - 1) / 2) * (cellDepth + 0.15);
        const pGeo = new THREE.BoxGeometry(cellDepth, cellHeight, cellWidth);
        const pMat = new THREE.MeshStandardMaterial({
          color: showThermalHeatmap ? (i === 2 || i === 3 ? 0xef4444 : 0xf59e0b) : 0x3b82f6,
          metalness: 0.7,
          roughness: 0.3,
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(xPos, 0, 0);
        group.add(pMesh);

        // Terminals
        const termGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 12);
        const posTerm = new THREE.Mesh(termGeo, copperAnodeMat);
        posTerm.position.set(xPos, cellHeight / 2 + 0.12, 0.4);
        const negTerm = new THREE.Mesh(termGeo, steelCanMat);
        negTerm.position.set(xPos, cellHeight / 2 + 0.12, -0.4);
        group.add(posTerm);
        group.add(negTerm);
      }

      // Bottom Liquid Glycol Cooling Plate
      const plateGeo = new THREE.BoxGeometry(numCells * 0.85, 0.3, cellWidth + 0.6);
      const plateMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8, roughness: 0.2 });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(0, -cellHeight / 2 - 0.2, 0);
      group.add(plate);
    }

    // 3. FORMAT: STRUCTURAL BATTERY PACK & SERPENTINE COOLING
    else if (cellFormat === 'pack-cooling') {
      const rows = 4;
      const cols = 5;
      const radius = 0.55;
      const height = 2.4;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - (cols - 1) / 2) * 1.35;
          const z = (r - (rows - 1) / 2) * 1.35;
          const cGeo = new THREE.CylinderGeometry(radius, radius, height, 16);
          const cMat = new THREE.MeshStandardMaterial({
            color: showThermalHeatmap ? (r === 1 && c === 2 ? 0xef4444 : 0x10b981) : 0x64748b,
            metalness: 0.8,
            roughness: 0.2,
          });
          const cMesh = new THREE.Mesh(cGeo, cMat);
          cMesh.position.set(x, 0, z);
          group.add(cMesh);
        }
      }

      // Serpentine wavy cooling ribbon running between cell rows
      for (let r = 0; r < rows - 1; r++) {
        const ribbonGeo = new THREE.BoxGeometry(cols * 1.4, height * 0.7, 0.12);
        const ribbonMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.2 });
        const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
        ribbon.position.set(0, 0, (r - (rows - 1) / 2 + 0.5) * 1.35);
        group.add(ribbon);
      }
    }
  }, [cellFormat, showThermalHeatmap, isCharging]);

  return (
    <div className="flex flex-col gap-4 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Header & Format Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-mono">
              3D Electrochemical Architecture
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'en' ? 'EV Battery Cell & Thermal Architecture' : 'Sel Baterai EV & Arsitektur Termal'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en'
              ? 'Inspect 4680 tabless jellyrolls, lithium intercalation migration streams, and liquid cooling channels.'
              : 'Periksa gulungan jellyroll 4680 tanpa-tab, aliran migrasi ion litium, dan saluran pendingin cair.'}
          </p>
        </div>

        {/* Format Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setCellFormat('4680-cylindrical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              cellFormat === '4680-cylindrical'
                ? 'bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            4680 Tabless Cell
          </button>
          <button
            onClick={() => setCellFormat('prismatic-module')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              cellFormat === 'prismatic-module'
                ? 'bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Prismatic Module
          </button>
          <button
            onClick={() => setCellFormat('pack-cooling')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              cellFormat === 'pack-cooling'
                ? 'bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Pack Cooling Ribbons
          </button>
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative h-[420px] sm:h-[480px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing canvas-container" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-emerald-400">
              {cellFormat === '4680-cylindrical' ? '4680 Jellyroll (46mm x 80mm)' : cellFormat === 'prismatic-module' ? 'Prismatic Module (Aluminum Can)' : 'Structural Pack Array'}
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isCharging ? 'Fast Charging (Cathode → Anode)' : 'Discharging (Anode → Cathode)'}</span>
            </div>
          </div>

          {/* Thermal Overlay Badge */}
          {showThermalHeatmap && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-700 text-xs font-mono text-rose-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 animate-pulse" /> Thermal Gradient (ΔT: +18.4°C)
            </div>
          )}

          {/* Controls */}
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

        {/* Sidebar Parameters */}
        <div className="flex flex-col gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'en' ? 'Electrochemical Controls' : 'Kontrol Elektrokimia'}
          </h4>

          {/* Charge / Discharge Switch */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-lg font-medium">
            <button
              onClick={() => setIsCharging(true)}
              className={`py-1.5 rounded-md text-center transition-all ${
                isCharging ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'en' ? 'Fast Charge' : 'Isi Cepat'}
            </button>
            <button
              onClick={() => setIsCharging(false)}
              className={`py-1.5 rounded-md text-center transition-all ${
                !isCharging ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'en' ? 'Discharge (Drive)' : 'Kosongkan (Jalan)'}
            </button>
          </div>

          {/* C-Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
              <span>{language === 'en' ? 'Current Rate (C-Rate)' : 'Laju Arus (C-Rate)'}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{cRate.toFixed(1)}C</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={4.0}
              step={0.5}
              value={cRate}
              onChange={(e) => setCRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Thermal Heatmap Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
            <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-rose-500" />
              {language === 'en' ? 'Thermal Gradient Map' : 'Peta Gradien Termal'}
            </span>
            <input
              type="checkbox"
              checked={showThermalHeatmap}
              onChange={(e) => setShowThermalHeatmap(e.target.checked)}
              className="w-4 h-4 rounded text-rose-500 accent-rose-500 cursor-pointer"
            />
          </label>

          {/* Layer Materials Legend */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h5 className="font-bold text-slate-700 dark:text-slate-200">
              {language === 'en' ? 'Internal Layer Stack' : 'Tumpukan Lapisan Internal'}
            </h5>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-amber-700" />
                <span className="text-slate-600 dark:text-slate-300">Anode: Cu Foil + Synthetic Graphite (Li_x C_6)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-sky-600" />
                <span className="text-slate-600 dark:text-slate-300">Cathode: Al Foil + NMC811 / LFP Matrix</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-slate-300 dark:bg-slate-600" />
                <span className="text-slate-600 dark:text-slate-300">Separator: Microporous Polyethylene (16 µm)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-emerald-500" />
                <span className="text-slate-600 dark:text-slate-300">Lithium Ion Migration: Li⁺ Shuttle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
