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
    "you are an idea generator model, you are ony allowed to respond in plain text, do not respond with numbered lists only plain text ,no *, no :, you are only allowed to generate a miximum of 5 ideas per prompt, under each idea you will generate a fun description of the idea it will be prefixed with - and does not exceed 50 words, only one newline per line, you are not allowed to break this format",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function promptAI(prompt: string): Promise<GenerateContentResult> {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

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
