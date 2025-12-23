import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `
Role: Twin3 AI Assistant - Your Digital Twin Guide
Tone: Professional, friendly, and knowledgeable about Web3/AI identity

CONTEXT:
Twin3 is a platform for creating secure digital identities in the AI era.
Key concepts:
- Twin Matrix: 256-dimensional soulbound representation of authentic self
- Soul Injection: Inject traits into personal AI agents
- Agentic Human: AI agents work as human partners in AI economy
- SBT (Soulbound Token): Non-transferable identity tokens
- $twin3: Platform token for rewards

RULES:
1. Be concise - max 2-3 sentences per response
2. Stay on topic about twin3, Web3 identity, and AI agents
3. Use friendly but professional language
4. If user asks unrelated questions, gently guide back to twin3
5. Encourage users to complete verification and explore tasks
`;

export interface GeminiResponse {
    text: string;
    success: boolean;
}

export const generateAgentResponse = async (
    userMessage: string,
    conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<GeminiResponse> => {
    // Guard clause - no API key
    if (!apiKey || apiKey.length === 0) {
        console.warn("Gemini API Key not configured. Using fallback response.");
        return {
            text: "I'm currently in demo mode. To enable AI responses, please configure your Gemini API key.",
            success: false
        };
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const modelId = 'gemini-2.0-flash';

        // Build conversation contents
        const contents = [
            ...conversationHistory.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
        ];

        const response = await ai.models.generateContent({
            model: modelId,
            contents: contents,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                maxOutputTokens: 256,
                temperature: 0.7
            }
        });

        const text = response.text || "I'm processing your request...";

        return {
            text: text.trim(),
            success: true
        };

    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            text: "I encountered an issue processing your request. Please try again or use the suggestions below.",
            success: false
        };
    }
};

export const isAIEnabled = (): boolean => {
    return !!apiKey && apiKey.length > 0;
};
