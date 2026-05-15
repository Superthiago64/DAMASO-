import { GoogleGenAI } from "@google/generative-ai";

// Reemplazamos la clave real por la variable segura
const aiStudioKey = process.env.GEMINI_API_KEY; 

const ai = new GoogleGenAI({ apiKey: aiStudioKey });

export async function preguntarAGemini(pregunta) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
  const response = await model.generateContent(pregunta);
  return response.text;
}