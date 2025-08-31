import { config } from "dotenv";
import { GoogleGenAI } from "@google/genai";
config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are a helpful, concise, and friendly AI assistant for a Discord bot named Aura. Always provide clear, accurate, and safe information. If a response is too long, summarize or split it to fit within Discord's 2000 character message limit. Never send code or text that exceeds this limit in a single message.`;

async function generateContent(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content");
  }
}

export { generateContent };
