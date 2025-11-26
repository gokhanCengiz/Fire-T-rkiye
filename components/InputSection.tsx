import React from 'react';
import { FireInputs } from '../types';
import { Calculator, Wallet, TrendingUp, Target, User } from 'lucide-react';

interface InputSectionProps {
  inputs: FireInputs;
  setInputs: React.Dispatch<React.SetStateAction<FireInputs>>;
}

export const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs }) => {
  const handleChange = (field: keyof FireInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-brand-600" />
        Hesaplama Parametreleri
      </h2>

      <div className="space-y-5">
        
        {/* Current Age */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
            <User className="w-4 h-4" />
            Mevcut Yaşınız
          </label>
          <input
            type="number"
            value={inputs.currentAge}
            onChange={(e) => handleChange('currentAge', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Current Savings */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Mevcut Birikim (TL)
          </label>
          <input
            type="number"
            value={inputs.currentSavings}
            onChange={(e) => handleChange('currentSavings', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Monthly Contribution */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Aylık Düzenli Tasarruf (TL)
          </label>
          <input
            type="number"
            value={inputs.monthlyContribution}
            onChange={(e) => handleChange('monthlyContribution', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="500"
            value={inputs.monthlyContribution}
            onChange={(e) => handleChange('monthlyContribution', e.target.value)}
            className="w-full mt-2 accent-brand-600"
          />
        </div>

        {/* Annual Return */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Yıllık Reel Getiri Beklentisi (%)
          </label>
          <div className="text-xs text-slate-500 mb-2">Enflasyon üzerinde kazanılan net getiri oranı.</div>
          <input
            type="number"
            value={inputs.annualReturnRate}
            onChange={(e) => handleChange('annualReturnRate', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Muhafazakar (%3)</span>
            <span>Dengeli (%7)</span>
            <span>Agresif (%10+)</span>
          </div>
        </div>

        {/* Target Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Hedeflenen FIRE Tutarı (TL)
          </label>
          <input
            type="number"
            value={inputs.targetAmount}
            onChange={(e) => handleChange('targetAmount', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          />
           <div className="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded">
             İpucu: Genellikle yıllık harcamalarınızın 25 katı güvenli bir hedeftir. (4% Kuralı)
          </div>
        </div>
      </div>
    </div>
  );
};