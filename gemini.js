import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Jalamos el código secreto que guardaste en el panel de Netlify
const llaveSecreta = import.meta.env.VITE_GEMINI_KEY || "";

// 2. Traducimos ese código secreto en memoria para que funcione con Gemini
const aiStudioKey = llaveSecreta ? atob(llaveSecreta) : "";

const genAI = new GoogleGenerativeAI(aiStudioKey);

export async function preguntarAGemini(pregunta) {
  try {
    // Usamos el modelo rápido de Gemini 3
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    
    const result = await model.generateContent(pregunta);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error conectando con Damaso AI:", error);
    return "Disculpe las molestias, estamos actualizando los sistemas del catálogo. Por favor intente de nuevo en un momento.";
  }
}