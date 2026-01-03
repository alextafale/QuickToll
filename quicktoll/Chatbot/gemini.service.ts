import { GEMINI_CONFIG } from './config';
import { TELEPEAJE_PROMPT } from './chatbot.prompt';

export async function sendMessageToGemini(userMessage: string): Promise<string> {
  const url = `${GEMINI_CONFIG.baseUrl}/models/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: TELEPEAJE_PROMPT },
          { text: userMessage },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Lo siento, no pude responder en este momento.'
  );
}
