import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// Requires process.env.API_KEY to be set
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStrainDescription = async (strainName: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a fun, creative, and short description (max 50 words) for a cannabis strain named "${strainName}". Include typical effects and flavor profile if known, otherwise be creative but realistic. Use emojis.`,
    });
    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Error generating strain description:", error);
    return "The spirits are cloudy today. Try again later.";
  }
};

export const generateCaptionFromImage = async (base64Image: string, mimeType: string = "image/jpeg"): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image
                }
            },
            {
                text: "Write a short, engaging social media caption for this image. If it looks like a plant or cannabis, mention positive vibes, relaxation, or creativity. Keep it under 20 words. Add hashtags."
            }
        ]
      }
    });
    return response.text || "Just vibing. 🌿";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Focusing on the good times. ✨";
  }
};

export const chatWithBudBot = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: history,
            config: {
                systemInstruction: "You are 'BudBot', the expert AI cannabis sommelier on Phenogram. Your goal is to provide deep, accurate, and vibe-checked analysis of cannabis strains. When asked about a strain, you MUST provide: \n\n1. 🌿 **Effects**: Mental and physical sensation.\n2. 👅 **Flavor & Aroma**: Terpene profile.\n3. 🏥 **Medical Benefits**: Potential relief uses.\n4. 🧬 **Lineage**: Genetics/Parents.\n\nUse emojis. Keep it structured. Disclaimer: This is for informational purposes only, not medical advice.",
                tools: [{ googleSearch: {} }]
            }
        });
        
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        
        // Extract grounding sources
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
            .filter((s: any) => s) as { title: string, uri: string }[];

        return {
            text: response.text || "I'm having trouble retrieving that info right now.",
            sources: sources || []
        };
    } catch (error) {
        console.error("Chat error", error);
        return {
            text: "I'm taking a quick break. Ask me again in a sec! 🍃",
            sources: []
        };
    }
}