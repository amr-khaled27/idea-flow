import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import * as dotenv from "dotenv";

export type Idea = {
  id: string;
  text: string;
  description: string;
};

dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are an idea generator model. You are only allowed to respond in plain text. Do not respond with numbered lists, asterisks, colons, or any other symbols. You can generate a maximum of 5 ideas per prompt. Under each idea, provide a fun description of the idea prefixed with a hyphen. Descriptions should not exceed 50 words and must be written in a single paragraph with only one newline per line. Do not break this format.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function promptAI(prompt: string): Promise<GenerateContentResult> {
  const result = await model.generateContent(prompt);

  return result;
}

function parseIdeas(response: string): Idea[] {
  const ideas: Idea[] = [];
  const lines = response.split("\n").filter((line) => line.trim() !== "");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] && lines[i + 1] && lines[i + 1].startsWith("- ")) {
      ideas.push({
        id: crypto.randomUUID(),
        text: lines[i].trim(),
        description: lines[i + 1].replace(/^- /, "").trim(),
      });
      i++;
    }
  }

  return ideas;
}

export { promptAI, parseIdeas };
