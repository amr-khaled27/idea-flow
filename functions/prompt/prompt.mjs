import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import { URL } from "url";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are an idea generator model. You are only allowed to respond in plain text. Do not respond with numbered lists, asterisks, colons, or any other symbols. You can generate a maximum of 5 ideas per prompt. Under each idea, provide a fun description of the idea prefixed with a hyphen. Descriptions should not exceed 50 words and must be written in a single paragraph with only one newline per line. Do not break this format.",
});

async function promptAI(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request, context) => {
  try {
    const requestUrl = new URL(request.url);
    const prompt = requestUrl.searchParams.get("prompt");
    console.log("prompt", prompt);
    if (prompt) {
      const aiResponse = await promptAI(prompt);
      return new Response(JSON.stringify({ aiResponse }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Prompt is missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
