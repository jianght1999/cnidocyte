
import { GoogleGenAI } from "@google/genai";
import { USER_INFO, PROJECTS, SKILLS } from "../constants.tsx";

export class GeminiAssistant {
  async getChatResponse(message: string, history: { role: string; content: string }[]) {
    // CRITICAL: Create a new instance right before the API call to ensure it uses 
    // the current environment variable and avoids initialization errors on load.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const systemInstruction = `
        You are an AI assistant representing ${USER_INFO.name}, a ${USER_INFO.title}.
        Your goal is to answer questions from visitors to Alex's personal website.
        
        Information about Alex:
        - Bio: ${USER_INFO.bio}
        - Location: ${USER_INFO.location}
        - Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join(', ')}
        - Key Skills: ${SKILLS.map(s => s.name).join(', ')}
        
        Guidelines:
        - Be professional, friendly, and concise.
        - If someone asks for contact info, provide ${USER_INFO.email}.
        - If someone asks something irrelevant to Alex or professional work, politely pivot back.
        - Use Markdown for formatting if necessary.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
          topP: 0.95,
        }
      });

      return response.text || "抱歉，我暂时无法回答这个问题。";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "我的神经网络正在休息，请稍后再试！";
    }
  }
}

export const geminiAssistant = new GeminiAssistant();
