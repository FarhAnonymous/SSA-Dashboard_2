
import { GoogleGenAI } from "@google/genai";

export const analyzeData = async (csvData: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert data analyst. Below is data extracted from an Excel sheet, presented in CSV format.
    Your task is to perform a comprehensive analysis and present it in a clear, well-structured markdown format.

    Data:
    ---
    ${csvData}
    ---

    Please provide the following in your analysis:
    1.  **High-Level Summary:** Concisely describe what this data is about.
    2.  **Key Insights & Trends:** Identify the most important patterns, trends, or correlations in the data. Use bullet points for clarity.
    3.  **Anomalies or Outliers:** Point out any data points that seem unusual, noteworthy, or could be potential errors.
    4.  **Actionable Recommendations:** Based on your analysis, suggest potential actions, further investigations, or business decisions that could be made.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from the AI model. Please check the console for more details.");
  }
};
