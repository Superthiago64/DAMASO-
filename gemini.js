import { GoogleGenAI } from "@google/generative-ai";

// Tu clave real de Google AI Studio ya configurada
const aiStudioKey = "AIzaSyBQHy0yxF5L7wjYGYJHArL57mcTpNEkxzg"; 

const ai = new GoogleGenAI({ apiKey: aiStudioKey });

export async function preguntarAGemini(pregunta) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
  const response = await model.generateContent(pregunta);
  return response.text;
}