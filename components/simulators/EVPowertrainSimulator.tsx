'use client';

import React, { useState, useMemo } from 'react';
import { useLearning } from '@/context/LearningContext';
import { Zap, Wind, Mountain, Thermometer, Battery, Gauge, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export const EVPowertrainSimulator: React.FC = () => {
  const { language } = useLearning();

  // Dynamic Simulator State Controls
  const [speedKmh, setSpeedKmh] = useState<number>(100); // 0 - 160 km/h
  const [inclinePercent, setInclinePercent] = useState<number>(0); // -10% downhill to +15% uphill
  const [ambientTempC, setAmbientTempC] = useState<number>(22); // -20°C to +45°C
  const [regenLevel, setRegenLevel] = useState<number>(80); // 0 - 100%
  const [hvacLoadKw, setHvacLoadKw] = useState<number>(1.5); // 0 - 5.0 kW
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState<number>(75); // 50 - 100 kWh
  const [inverterTech, setInverterTech] = useState<'SiC' | 'IGBT'>('SiC');

  // Vehicle Parameters (Modern Aerodynamic Electric Sedan)
  const vehicleMassKg = 1950;
  const dragCoeffCd = 0.22;
  const frontalAreaM2 = 2.25;
  const rollingResistCrr = 0.009;
  const gravityG = 9.81;

  // Real-time Physics & Electrical Computations
  const results = useMemo(() => {
    const vMs = (speedKmh * 1000) / 3600; // m/s

    // Air density with ambient temperature (Ideal Gas Law approx)
    const airDensityRho = 1.293 * (273.15 / (273.15 + ambientTempC));

    // 1. Aerodynamic Drag Force: F_aero = 0.5 * rho * Cd * A * v^2
    const fAero = 0.5 * airDensityRho * dragCoeffCd * frontalAreaM2 * Math.pow(vMs, 2); // Newtons

    // 2. Rolling Resistance: F_roll = Crr * m * g * cos(theta)
    const inclineRad = Math.atan(inclinePercent / 100);
    const fRoll = rollingResistCrr * vehicleMassKg * gravityG * Math.cos(inclineRad); // Newtons

    // 3. Gravitational Gradient Force: F_grade = m * g * sin(theta)
    const fGrade = vehicleMassKg * gravityG * Math.sin(inclineRad); // Newtons

    // Total Road Load Force
    const fTotal = fAero + fRoll + fGrade;

    // Mechanical Power at wheels: P_mech = F_total * v (Watts)
    const pWheelsKw = (fTotal * vMs) / 1000;

    // Component efficiencies
    const inverterEff = inverterTech === 'SiC' ? 0.985 : 0.952;
    const motorEff = 0.96;
    const drivetrainEff = 0.97;
    const totalPowertrainEff = inverterEff * motorEff * drivetrainEff;

    let pBatteryKw = 0;
    let isRegenerating = false;

    if (pWheelsKw >= 0) {
      // Traction mode: battery delivers power to wheels
      pBatteryKw = pWheelsKw / totalPowertrainEff + hvacLoadKw + 0.35; // 0.35kW auxiliary electronics
    } else {
      // Deceleration / steep descent: regenerative braking
      isRegenerating = true;
      const regenHarvestKw = Math.abs(pWheelsKw) * totalPowertrainEff * (regenLevel / 100);
      pBatteryKw = -regenHarvestKw + hvacLoadKw + 0.35;
    }

    // Energy Consumption in Wh/km: (P_battery_kW / speed_kmh) * 1000
    const consumptionWhKm = speedKmh > 0 ? (pBatteryKw / speedKmh) * 1000 : 0;

    // Estimated Range: Battery Capacity / (consumption_kWh_per_km)
    const rangeKm =
      consumptionWhKm > 0 ? Math.max(0, (batteryCapacityKwh * 1000) / consumptionWhKm) : 999;

    // Battery C-rate (Discharge or Charge current / Capacity)
    const batteryCRate = Math.abs(pBatteryKw) / batteryCapacityKwh;

    // Thermal delta estimate (°C above ambient at steady state)
    const cellHeatingDeltaC = Math.max(2, Math.pow(batteryCRate, 1.8) * 14 * (inverterTech === 'SiC' ? 0.85 : 1.0));

    return {
      fAero: Math.round(fAero),
      fRoll: Math.round(fRoll),
      fGrade: Math.round(fGrade),
      pWheelsKw: Number(pWheelsKw.toFixed(1)),
      pBatteryKw: Number(pBatteryKw.toFixed(1)),
      consumptionWhKm: Math.max(0, Math.round(consumptionWhKm)),
      rangeKm: Math.round(rangeKm),
      batteryCRate: Number(batteryCRate.toFixed(2)),
      cellHeatingDeltaC: Number(cellHeatingDeltaC.toFixed(1)),
      isRegenerating,
      airDensityRho: Number(airDensityRho.toFixed(3)),
    };
  }, [speedKmh, inclinePercent, ambientTempC, regenLevel, hvacLoadKw, batteryCapacityKwh, inverterTech]);

  return (
    <div className="flex flex-col gap-6 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-mono">
              Thermodynamic Powertrain Engine
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'en' ? 'EV Vehicle Dynamics & Energy Flow Simulator' : 'Simulator Dinamika Kendaraan EV & Aliran Energi'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en'
              ? 'Calculate aerodynamic resistance, incline forces, SiC inverter switching losses, and real-time range.'
              : 'Hitung resistansi aerodinamis, gaya tanjakan gravitasi, rugi switching inverter SiC, dan estimasi jarak tempuh.'}
          </p>
        </div>

        {/* Inverter Tech Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setInverterTech('SiC')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              inverterTech === 'SiC'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            SiC MOSFET (98.5% Eff)
          </button>
          <button
            onClick={() => setInverterTech('IGBT')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              inverterTech === 'IGBT'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Silicon IGBT (95.2% Eff)
          </button>
        </div>
      </div>

      {/* Primary KPI Dashboards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Estimated Range */}
        <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/40 dark:to-slate-900 rounded-xl border border-emerald-200/80 dark:border-emerald-800/80">
          <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-semibold mb-1">
            <span>{language === 'en' ? 'Projected Range' : 'Estimasi Jangkauan'}</span>
            <Battery className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {results.rangeKm} <span className="text-sm font-sans font-normal text-slate-500">km</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {batteryCapacityKwh} kWh Pack (100% SoC)
          </div>
        </div>

        {/* Energy Consumption Wh/km */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold mb-1">
            <span>{language === 'en' ? 'Efficiency' : 'Efisiensi Energi'}</span>
            <Gauge className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {results.consumptionWhKm} <span className="text-sm font-sans font-normal text-slate-500">Wh/km</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {(results.consumptionWhKm / 10).toFixed(1)} kWh / 100km
          </div>
        </div>

        {/* Net Battery Power Draw */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold mb-1">
            <span>{language === 'en' ? 'Net Battery Power' : 'Daya Baterai Netto'}</span>
            <Zap className={`w-4 h-4 ${results.isRegenerating ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
          </div>
          <div className={`text-2xl font-black font-mono ${results.pBatteryKw < 0 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
            {results.pBatteryKw > 0 ? `+${results.pBatteryKw}` : results.pBatteryKw}{' '}
            <span className="text-sm font-sans font-normal text-slate-500">kW</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {results.isRegenerating ? (language === 'en' ? 'Regen Charging Battery' : 'Regen Mengisi Baterai') : `C-Rate: ${results.batteryCRate}C`}
          </div>
        </div>

        {/* Battery Cell Thermal Heating */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold mb-1">
            <span>{language === 'en' ? 'Cell Thermal Delta' : 'Kenaikan Suhu Sel'}</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
            +{results.cellHeatingDeltaC} <span className="text-sm font-sans font-normal text-slate-500">°C</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Pack: {(ambientTempC + results.cellHeatingDeltaC).toFixed(1)}°C
          </div>
        </div>
      </div>

      {/* Interactive Parameter Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
        {/* Speed Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-sky-500" />
              {language === 'en' ? 'Vehicle Speed' : 'Kecepatan Kendaraan'}
            </span>
            <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{speedKmh} km/h</span>
          </div>
          <input
            type="range"
            min={0}
            max={160}
            step={5}
            value={speedKmh}
            onChange={(e) => setSpeedKmh(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>

        {/* Hill Incline Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-indigo-500" />
              {language === 'en' ? 'Road Incline Grade' : 'Kemiringan Tanjakan'}
            </span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {inclinePercent > 0 ? `+${inclinePercent}%` : `${inclinePercent}%`}
            </span>
          </div>
          <input
            type="range"
            min={-10}
            max={15}
            step={1}
            value={inclinePercent}
            onChange={(e) => setInclinePercent(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Ambient Temperature Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-rose-500" />
              {language === 'en' ? 'Ambient Temperature' : 'Suhu Lingkungan'}
            </span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{ambientTempC}°C</span>
          </div>
          <input
            type="range"
            min={-20}
            max={45}
            step={1}
            value={ambientTempC}
            onChange={(e) => setAmbientTempC(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        {/* Regenerative Braking Level Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
              {language === 'en' ? 'Regenerative Braking Level' : 'Tingkat Pengereman Regen'}
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{regenLevel}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={10}
            value={regenLevel}
            onChange={(e) => setRegenLevel(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* HVAC Cabin Load Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-amber-500" />
              {language === 'en' ? 'HVAC Cabin Load' : 'Beban AC / Pemanas Kabin'}
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{hvacLoadKw.toFixed(1)} kW</span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={hvacLoadKw}
            onChange={(e) => setHvacLoadKw(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Battery Capacity Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-medium text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Battery className="w-3.5 h-3.5 text-emerald-500" />
              {language === 'en' ? 'Battery Pack Size' : 'Kapasitas Baterai'}
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{batteryCapacityKwh} kWh</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            step={5}
            value={batteryCapacityKwh}
            onChange={(e) => setBatteryCapacityKwh(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      {/* Physics Force Breakdown Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
          <span>{language === 'en' ? 'Tractive Resistance Forces Decomposition (N)' : 'Dekomposisi Gaya Hambat Traksi (Newton)'}</span>
          <span className="font-mono text-slate-500">Total F: {results.fAero + results.fRoll + results.fGrade} N</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/60">
            <span className="text-slate-500 dark:text-slate-400 block">{language === 'en' ? 'Aerodynamic Drag (F_aero)' : 'Hambatan Udara (F_aero)'}</span>
            <span className="text-base font-bold font-mono text-sky-600 dark:text-sky-400">{results.fAero} N</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">ρ = {results.airDensityRho} kg/m³</span>
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/60">
            <span className="text-slate-500 dark:text-slate-400 block">{language === 'en' ? 'Tire Rolling (F_roll)' : 'Gesekan Ban (F_roll)'}</span>
            <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">{results.fRoll} N</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">C_rr = 0.009 (Low-rolling tire)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60">
            <span className="text-slate-500 dark:text-slate-400 block">{language === 'en' ? 'Hill Gravity (F_grade)' : 'Gravitasi Tanjakan (F_grade)'}</span>
            <span className={`text-base font-bold font-mono ${results.fGrade >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
              {results.fGrade} N
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">θ = {inclinePercent}% grade</span>
          </div>
        </div>
      </div>
    </div>
  );
};
