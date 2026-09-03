'use client';

import React from 'react';
import { useLearning } from '@/context/LearningContext';
import { Cpu, Gauge, Zap } from 'lucide-react';

interface TelemetryHUDProps {
  fps: number;
  drawCalls?: number;
  triangles?: number;
  particleCount?: number;
  canvasWidth?: number;
  canvasHeight?: number;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  fps,
  drawCalls = 0,
  triangles = 0,
  particleCount,
  canvasWidth,
  canvasHeight,
}) => {
  const { settings, isWebGPUSupported, language } = useLearning();

  if (!settings.showFpsOverlay) return null;

  const fpsColor =
    fps >= 55 ? 'text-emerald-400' : fps >= 30 ? 'text-amber-400' : 'text-rose-400';

  const speedMultiplier = settings.physicsSpeed || 1.0;
  const engineSolver = (settings.physicsEngine || 'verlet').toUpperCase();

  return (
    <div className="absolute top-3 right-3 z-30 pointer-events-none select-none font-mono text-[10px] bg-slate-950/90 text-slate-300 border border-slate-700/80 rounded-xl p-2.5 shadow-xl backdrop-blur-md space-y-1.5 min-w-[190px]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
        <span className="flex items-center gap-1 text-sky-400">
          <Cpu className="w-3 h-3" />
          {isWebGPUSupported ? 'WebGPU Pipeline' : 'WebGL2 Pipeline'}
        </span>
        <span className={`font-black text-xs ${fpsColor}`}>{Math.round(fps)} FPS</span>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 pt-0.5 text-slate-300">
        <div>
          <span className="text-slate-500">Quality: </span>
          <span className="text-slate-200 capitalize font-bold">{settings.graphicsQuality}</span>
        </div>
        <div>
          <span className="text-slate-500">Density: </span>
          <span className="text-slate-200 font-bold">{settings.particleDensity}%</span>
        </div>
        <div>
          <span className="text-slate-500">Physics: </span>
          <span className="text-amber-400 font-bold">{speedMultiplier}× ({engineSolver})</span>
        </div>
        <div>
          <span className="text-slate-500">Auto-Rot: </span>
          <span className={settings.autoRotate3D ? 'text-emerald-400' : 'text-slate-400'}>
            {settings.autoRotate3D ? 'ON' : 'OFF'}
          </span>
        </div>
        {drawCalls > 0 && (
          <div>
            <span className="text-slate-500">Calls: </span>
            <span className="text-slate-200">{drawCalls}</span>
          </div>
        )}
        {triangles > 0 && (
          <div>
            <span className="text-slate-500">Tris: </span>
            <span className="text-slate-200">{triangles > 1000 ? `${(triangles / 1000).toFixed(1)}k` : triangles}</span>
          </div>
        )}
        {particleCount !== undefined && (
          <div className="col-span-2">
            <span className="text-slate-500">Particles: </span>
            <span className="text-sky-300 font-bold">{particleCount.toLocaleString()} active</span>
          </div>
        )}
      </div>
    </div>
  );
};
