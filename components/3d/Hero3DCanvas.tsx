'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLearning } from '@/context/LearningContext';
import { TopicId } from '@/types/learning';
import { Atom, HeartPulse, Zap } from 'lucide-react';

export const Hero3DCanvas: React.FC<{ activeTopicId?: TopicId }> = ({ activeTopicId = 'quantum-mechanics' }) => {
  const { language } = useLearning();
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicId>(activeTopicId);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pLight1 = new THREE.PointLight(0x38bdf8, 2, 50);
    pLight1.position.set(5, 5, 5);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0xf43f5e, 1.5, 50);
    pLight2.position.set(-5, -5, -5);
    scene.add(pLight2);

    const masterGroup = new THREE.Group();
    groupRef.current = masterGroup;
    scene.add(masterGroup);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMouseMove);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth floating rotation
      masterGroup.rotation.y += 0.008;
      masterGroup.rotation.x = Math.sin(time * 0.5) * 0.2 + mouseY * 0.4;
      masterGroup.rotation.z = Math.cos(time * 0.4) * 0.1 + mouseX * 0.4;

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
      container.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  // Rebuild Holographic Geometry when selected topic changes
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }

    if (selectedTopic === 'quantum-mechanics') {
      // 1. Quantum Orbital Wave Cloud + Atomic Core
      const coreGeo = new THREE.SphereGeometry(0.4, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, roughness: 0.2 });
      group.add(new THREE.Mesh(coreGeo, coreMat));

      // Quantum Orbital Rings
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        const rGeo = new THREE.TorusGeometry(1.8 + i * 0.4, 0.03, 16, 64);
        const rMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = (i * Math.PI) / 3;
        ring.rotation.y = (i * Math.PI) / 4;
        group.add(ring);
      }

      // 3D Orbital Particle Density Cloud
      const pCount = 3500;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * 2.6;
        const sinPhi = Math.sin(phi);
        pPos[i * 3] = r * sinPhi * Math.cos(theta);
        pPos[i * 3 + 1] = r * sinPhi * Math.sin(theta) * Math.cos(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.06,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(pGeo, pMat));
    } else if (selectedTopic === 'fetus-development') {
      // 2. Organic Embryonic Morphogenesis Helix & Cellular Sphere
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 2.0, 0),
        new THREE.Vector3(2.2, 1.4, 0),
        new THREE.Vector3(1.8, -1.8, 0),
        new THREE.Vector3(-0.8, -1.5, 0)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.65, 20, false);
      const tubeMat = new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        roughness: 0.3,
        transmission: 0.5,
        transparent: true,
        opacity: 0.85,
      });
      group.add(new THREE.Mesh(tubeGeo, tubeMat));

      // Surrounding Amniotic Fluid Particles
      const pCount = 2000;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const rad = 1.0 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        pPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = rad * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0xfb7185, size: 0.05, transparent: true, opacity: 0.7 });
      group.add(new THREE.Points(pGeo, pMat));
    } else if (selectedTopic === 'ev-battery') {
      // 3. 4680 Cylindrical Battery Cell + Lithium Ion Energy Stream
      const canGeo = new THREE.CylinderGeometry(1.6, 1.6, 3.2, 32);
      const canMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: true,
      });
      group.add(new THREE.Mesh(canGeo, canMat));

      // Concentric Energy Pulse Rings
      for (let i = 0; i < 4; i++) {
        const ringGeo = new THREE.TorusGeometry(1.9 + i * 0.35, 0.04, 16, 48);
        ringGeo.rotateX(Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.8 - i * 0.15 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = (i - 1.5) * 0.8;
        group.add(ring);
      }

      // Li+ Ion Streams
      const pCount = 2500;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = Math.random() * 1.5;
        const a = Math.random() * Math.PI * 2;
        pPos[i * 3] = r * Math.cos(a);
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 3.0;
        pPos[i * 3 + 2] = r * Math.sin(a);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.07,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(pGeo, pMat));
    }
  }, [selectedTopic]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 shadow-2xl flex flex-col justify-between p-4">
      {/* Top Topic Switcher Buttons on Hero Canvas */}
      <div className="relative z-10 flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <button
          onClick={() => setSelectedTopic('quantum-mechanics')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
            selectedTopic === 'quantum-mechanics'
              ? 'bg-sky-500/30 text-sky-300 border border-sky-400/50 shadow-xs'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60'
          }`}
        >
          <Atom className="w-3.5 h-3.5" />
          <span>Quantum Mechanics</span>
        </button>

        <button
          onClick={() => setSelectedTopic('fetus-development')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
            selectedTopic === 'fetus-development'
              ? 'bg-rose-500/30 text-rose-300 border border-rose-400/50 shadow-xs'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Embryonic Biology</span>
        </button>

        <button
          onClick={() => setSelectedTopic('ev-battery')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
            selectedTopic === 'ev-battery'
              ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 shadow-xs'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>EV Battery & Energy</span>
        </button>
      </div>

      {/* Main 3D Viewport */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing canvas-container" />

      {/* Bottom Live Interactive Hologram Overlay */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 backdrop-blur-md bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
        <span className="font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          {language === 'en' ? 'Interactive 3D Stage (Drag to rotate)' : 'Panggung 3D Interaktif (Geser untuk memutar)'}
        </span>
        <span className="font-mono text-cyan-400 font-semibold">60 FPS Hardware Render</span>
      </div>
    </div>
  );
};
