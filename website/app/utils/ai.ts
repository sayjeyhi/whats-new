import { google } from "@ai-sdk/google";
import { z } from "zod";
import { generateObject } from "ai";

export async function getSummary(text: string) {
  const prompt = `
  You are an AI assistant that summarizes the following text in a concise and informative manner.
  
  Create a short summary of the flowing text in 2 lines, Just return the summarized text.
  I will just use the your summary in my blog post description so the result should be short and concise.
  
  ${text}
  `;

  const result = await generateObject({
    model: google("gemini-2.0-flash"),
    temperature: 0,
    schema: z.object({
      score: z.number(),
      reason: z.string(),
      tips: z.array(z.string()),
    }),
    prompt,
  });

  console.log(result.response.body.candidates[0].content);
  console.log(JSON.stringify(result, null, 2));

  return result.response.body.candidates[0].content;
}

