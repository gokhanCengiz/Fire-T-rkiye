import React, { useState, useEffect, useMemo } from 'react';
import { FireInputs, SimulationResult, SimulationPoint } from './types';
import { InputSection } from './components/InputSection';
import { GrowthChart } from './components/GrowthChart';
import { AiAdvisor } from './components/AiAdvisor';
import { TrendingUp, Calendar, Coins, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  // Initial State
  const [inputs, setInputs] = useState<FireInputs>({
    currentAge: 25,
    currentSavings: 100000,
    monthlyContribution: 10000,
    annualReturnRate: 8, // Real return (inflation adjusted)
    targetAmount: 5000000,
  });

  // Calculation Logic
  const simulation = useMemo<SimulationResult>(() => {
    const points: SimulationPoint[] = [];
    let currentBalance = inputs.currentSavings;
    let totalInvested = inputs.currentSavings;
    let month = 0;
    const monthlyRate = inputs.annualReturnRate / 100 / 12;
    const maxYears = 50;
    const maxMonths = maxYears * 12;

    // Initial point
    points.push({
      year: 0,
      age: inputs.currentAge,
      totalSavings: currentBalance,
      totalPrincipal: totalInvested,
      totalInterest: 0
    });

    while (currentBalance < inputs.targetAmount && month < maxMonths) {
      // Add interest
      currentBalance = currentBalance * (1 + monthlyRate);
      
      // Add contribution
      currentBalance += inputs.monthlyContribution;
      totalInvested += inputs.monthlyContribution;
      
      month++;

      // Record data every year (12 months)
      if (month % 12 === 0) {
        points.push({
          year: month / 12,
          age: inputs.currentAge + (month / 12),
          totalSavings: Math.round(currentBalance),
          totalPrincipal: Math.round(totalInvested),
          totalInterest: Math.round(currentBalance - totalInvested)
        });
      }
    }

    // If goal reached mid-year, push final point
    if (month % 12 !== 0 && currentBalance >= inputs.targetAmount) {
         points.push({
          year: parseFloat((month / 12).toFixed(1)),
          age: inputs.currentAge + (month / 12),
          totalSavings: Math.round(currentBalance),
          totalPrincipal: Math.round(totalInvested),
          totalInterest: Math.round(currentBalance - totalInvested)
        });
    }

    return {
      yearsToGoal: parseFloat((month / 12).toFixed(1)),
      data: points,
      reachedGoal: currentBalance >= inputs.targetAmount,
      finalAmount: Math.round(currentBalance)
    };
  }, [inputs]);

  // Derived metrics
  const monthlyPassiveIncome = (simulation.finalAmount * 0.04) / 12; // 4% Rule

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
              FIRE Türkiye
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Finansal Özgürlük Yolculuğu
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
             <InputSection inputs={inputs} setInputs={setInputs} />
             
             {/* Passive Income Preview Card (Mobile only, or desktop stacked) */}
             <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-lg">
               <h3 className="text-brand-100 text-sm font-medium mb-1">Hedeflenen Pasif Gelir (4% Kuralı)</h3>
               <div className="text-3xl font-bold">
                 {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(monthlyPassiveIncome)}
                 <span className="text-sm font-normal text-brand-300 ml-1">/ay</span>
               </div>
               <p className="text-xs text-brand-300 mt-2 leading-relaxed">
                 Hedef tutarınız olan {new Intl.NumberFormat('tr-TR', { notation: 'compact' }).format(inputs.targetAmount)} TL'ye ulaştığınızda, anaparayı koruyarak çekebileceğiniz güvenli tutar.
               </p>
             </div>
          </div>

          {/* Right Column: Results & Viz */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <span className="text-slate-500 text-sm flex items-center gap-1 mb-1">
                  <Calendar className="w-4 h-4" /> Süre
                </span>
                <span className="text-2xl font-bold text-slate-800">
                  {simulation.reachedGoal ? `${simulation.yearsToGoal} Yıl` : '> 50 Yıl'}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Hedefe ulaşma süresi
                </span>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <span className="text-slate-500 text-sm flex items-center gap-1 mb-1">
                   <User className="w-4 h-4" /> Hedef Yaş
                </span>
                <span className="text-2xl font-bold text-slate-800">
                   {simulation.reachedGoal ? (inputs.currentAge + simulation.yearsToGoal).toFixed(1) : '---'}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Özgürlüğe kavuşacağınız yaş
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <span className="text-slate-500 text-sm flex items-center gap-1 mb-1">
                   <Coins className="w-4 h-4" /> Toplam Birikim
                </span>
                <span className={`text-2xl font-bold ${simulation.reachedGoal ? 'text-brand-600' : 'text-slate-800'}`}>
                   {new Intl.NumberFormat('tr-TR', { notation: "compact", compactDisplay: "short" }).format(simulation.finalAmount)} ₺
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Simülasyon sonundaki değer
                </span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Birikim Gelişimi</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span>Anapara</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-brand-500"></div>
                    <span>Bileşik Getiri</span>
                  </div>
                </div>
              </div>
              <GrowthChart data={simulation.data} />
            </div>

            {/* AI Advisor */}
            <AiAdvisor inputs={inputs} result={simulation} />

          </div>
        </div>
      </main>
    </div>
  );
};

// Helper for Icon in Stat card (Adding locally to avoid import mess if moved)
const User = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default App;