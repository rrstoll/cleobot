export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { character, message } = req.body || {};

  if (!character || !message || !String(message).trim()) {
    return res.status(400).json({ error: "character and message are required" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

  const systemPrompt = `You are ${character}. Reply in their voice, tone, and knowledge.`;

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    if (!openAIResponse.ok) {
      const errorBody = await openAIResponse.text();
      return res.status(openAIResponse.status).json({
        error: "OpenAI request failed",
        details: errorBody,
      });
    }

    const data = await openAIResponse.json();
    const responseText = data?.choices?.[0]?.message?.content?.trim() || "";

    if (!responseText) {
      return res.status(502).json({ error: "OpenAI returned an empty response" });
    }

    return res.status(200).json({ response: responseText });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
