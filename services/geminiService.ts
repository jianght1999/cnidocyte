
import { GoogleGenAI } from "@google/genai";
import { USER_INFO, PROJECTS, SKILLS } from "../constants.tsx";

export class GeminiAssistant {
  // Always use process.env.API_KEY directly for initialization as per @google/genai coding guidelines
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  async getChatResponse(message: string, history: { role: string; content: string }[]) {
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

      // Use ai.models.generateContent to query GenAI with the model name, prompt history, and system instructions.
      const response = await this.ai.models.generateContent({
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

      // Extract generated text from response.text property (not a method)
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm currently resting my neural networks. Please try again later!";
    }
  }
}

export const geminiAssistant = new GeminiAssistant();
