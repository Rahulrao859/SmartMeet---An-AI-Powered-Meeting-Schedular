const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("⚠️ GEMINI_API_KEY is not set in .env");
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async parseMeetingDetails(query) {
        try {
            const prompt = `
            Extract the following meeting details from this request:
            "${query}"

            Respond ONLY with valid JSON in the following format (no explanations, no markdown, no extra text):

            {
                "title": "...",
                "date": "YYYY-MM-DD",
                "time": "HH:MM",
                "duration": "...",
                "participants": ["name1", "name2"],
                "platform": "...",
                "platform_link": "..."
            }

            If any field is not mentioned, use a reasonable default or leave it blank (e.g., empty list or "Not specified").
            For date, if "tomorrow" or "next monday" is used, calculate the date based on the current date: ${new Date().toISOString().split('T')[0]}.
            `;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            // Clean up markdown code blocks if present
            if (text.startsWith("```json")) {
                text = text.replace("```json", "").replace("```", "");
            } else if (text.startsWith("```")) {
                text = text.replace("```", "").replace("```", "");
            }

            return JSON.parse(text.trim());
        } catch (error) {
            console.error("❌ Error parsing meeting details with Gemini:", error);
            // Return a fallback structure
            return {
                title: "Error parsing request",
                date: "",
                time: "",
                duration: "",
                participants: [],
                platform: "Unknown"
            };
        }
    }
}

module.exports = new GeminiService();
