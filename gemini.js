import { GoogleGenerativeAI } from "@google/generative-ai";

// Protegemos la API Key usando la variable de Netlify para que no se bloquee
const aiStudioKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(aiStudioKey);

export async function preguntarAGemini(pregunta) {
  // Aquí usamos el modelo nuevo que encontraste en internet
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  
  const result = await model.generateContent(pregunta);
  const response = await result.response;
  return response.text();
}