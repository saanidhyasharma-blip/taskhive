import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Lazy initialization
function getGenAI() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenerativeAI(key);
}

export async function generateSummary(tasks) {
  try {
    const genAI = getGenAI(); // ✅ only runs when summary is requested
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Analyze the following task data and give a short, clear productivity summary in 1-2 lines:

${JSON.stringify(tasks, null, 2)}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) return "I couldn't generate a summary right now. Stay consistent!";
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI insight is currently unavailable. Please check your API key.";
  }
}