import { GoogleGenAI } from "@google/genai";

// Initialize securely - assumes environment variable is injected
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMiningAdvice = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el asistente virtual experto de CriptoWallet AI. 
      Tu objetivo es ayudar a los usuarios con dudas sobre minería de criptomonedas, retiros y funcionamiento de la plataforma.
      La plataforma es legítima, usa nodos en Amsterdam y NY.
      
      Pregunta del usuario: ${userQuery}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response for chat
      }
    });
    return response.text || "Lo siento, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hubo un error de conexión con el asistente AI. Intenta más tarde.";
  }
};