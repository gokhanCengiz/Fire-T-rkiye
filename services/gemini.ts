import { GoogleGenAI } from "@google/genai";
import { FireInputs, SimulationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFireAdvice = async (inputs: FireInputs, result: SimulationResult): Promise<string> => {
  try {
    const prompt = `
      Sen uzman bir Türk finansal danışmanısın. Kullanıcı "Finansal Özgürlük ve Erken Emeklilik" (FIRE) hedefliyor.
      
      Kullanıcının Durumu:
      - Mevcut Yaş: ${inputs.currentAge}
      - Mevcut Birikim: ${inputs.currentSavings.toLocaleString('tr-TR')} TL
      - Aylık Eklenen Tutar: ${inputs.monthlyContribution.toLocaleString('tr-TR')} TL
      - Beklenen Yıllık Reel Getiri (Enflasyon arındırılmış): %${inputs.annualReturnRate}
      - Hedeflenen Tutar: ${inputs.targetAmount.toLocaleString('tr-TR')} TL
      
      Simülasyon Sonucu:
      - Hedefe Ulaşma Süresi: ${result.reachedGoal ? `${result.yearsToGoal} yıl` : '50 yıl içinde ulaşılamadı'}
      - Ulaşılan/Final Tutar: ${result.finalAmount.toLocaleString('tr-TR')} TL
      
      Lütfen bu senaryoyu analiz et.
      1. Bu plan gerçekçi mi? (Özellikle reel getiri oranı ve tasarruf miktarı açısından).
      2. Bu hedefe daha hızlı ulaşmak için 2-3 adet somut, uygulanabilir öneri ver.
      3. Riskler nelerdir? (Enflasyon, kur riski vb.).
      4. Motive edici kısa bir kapanış yap.
      
      Cevabı Türkçe olarak, Markdown formatında, listeler ve kalın yazılar kullanarak, okunaklı bir şekilde ver.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep thought for this
      }
    });

    return response.text || "Şu anda tavsiye oluşturulamıyor.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Yapay zeka servisine şu an ulaşılamıyor. Lütfen daha sonra tekrar deneyiniz.";
  }
};