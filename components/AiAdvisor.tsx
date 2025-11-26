import React, { useState } from 'react';
import { FireInputs, SimulationResult } from '../types';
import { getFireAdvice } from '../services/gemini';
import { Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorProps {
  inputs: FireInputs;
  result: SimulationResult;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ inputs, result }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const response = await getFireAdvice(inputs, result);
    setAdvice(response);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-indigo-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Yapay Zeka Danışmanı
        </h3>
        {!advice && !loading && (
          <button
            onClick={handleGetAdvice}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Planımı Yorumla
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 text-indigo-600">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p className="text-sm font-medium">Finansal planınız analiz ediliyor...</p>
        </div>
      )}

      {advice && !loading && (
        <div className="prose prose-indigo prose-sm max-w-none bg-white p-6 rounded-xl shadow-sm border border-indigo-50">
           <div className="flex items-start gap-3 mb-4">
             <div className="p-2 bg-indigo-100 rounded-lg">
                <MessageSquareQuote className="w-5 h-5 text-indigo-600" />
             </div>
             <div className="flex-1">
                <ReactMarkdown>{advice}</ReactMarkdown>
             </div>
           </div>
           
           <button
            onClick={handleGetAdvice}
            className="mt-4 text-xs text-indigo-500 hover:text-indigo-700 underline"
          >
            Analizi Yenile
          </button>
        </div>
      )}
      
      {!advice && !loading && (
        <p className="text-sm text-indigo-700/70">
          Gemini AI kullanarak hedeflerinize ulaşmak için kişiselleştirilmiş stratejiler ve risk analizi alın.
        </p>
      )}
    </div>
  );
};