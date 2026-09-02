'use client';

import React from 'react';
import { useLearning } from '@/context/LearningContext';
import { translations } from '@/lib/translations';
import { Cpu, Zap, Activity } from 'lucide-react';

export const WebGPUTestBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, isWebGPUSupported, gpuRendererInfo } = useLearning();
  const t = translations[language];

  if (compact) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs"
        title={gpuRendererInfo}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono">{isWebGPUSupported ? 'WebGPU' : 'WebGL2'}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-xs shadow-xs backdrop-blur-sm">
      <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
        <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <span>{isWebGPUSupported ? 'WebGPU Pipeline' : 'WebGL2 Pipeline'}</span>
      </div>
      <div className="hidden sm:block h-3.5 w-px bg-slate-200 dark:bg-slate-700" />
      <span className="hidden sm:inline font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]" title={gpuRendererInfo}>
        {gpuRendererInfo}
      </span>
      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold ml-auto">
        <Activity className="w-3 h-3 animate-pulse" /> 60 FPS
      </span>
    </div>
  );
};
