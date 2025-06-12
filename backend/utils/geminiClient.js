import { GoogleGenerativeAI } from "@google/generative-ai";
import { tinaPrompt } from "./tinaPrompt.js";

const ai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function sendToGemini(userMessage, chatHistory = []) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const chat = await model.startChat({
      history: [
        tinaPrompt,
        ...chatHistory,
        { role: "user", parts: userMessage },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const text = result?.response?.text?.();

    return text || "Sorry, no response from Gemini.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
