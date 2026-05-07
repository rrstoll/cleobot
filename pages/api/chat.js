const ANTHROPIC_VERSION = "2023-06-01";

function parseProviderError(errorBody) {
  try {
    const parsed = JSON.parse(errorBody);
    // Anthropic: { type: "error", error: { type, message } }
    const anthropicMsg = parsed?.error?.message;
    if (typeof anthropicMsg === "string") {
      const t = parsed?.error?.type;
      return t ? `${anthropicMsg} (${t})` : anthropicMsg;
    }
    // OpenAI-style fallback
    const openAiMsg = parsed?.error?.message;
    if (typeof openAiMsg === "string") {
      const code = parsed?.error?.code;
      return code ? `${openAiMsg} (${code})` : openAiMsg;
    }
  } catch {
    /* plain text */
  }
  return errorBody.slice(0, 500);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { character, message } = req.body || {};

  if (!character || !message || !String(message).trim()) {
    return res.status(400).json({ error: "character and message are required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });
  }

  const model =
    process.env.ANTHROPIC_MODEL?.trim() || "claude-haiku-4-5";

  const systemPrompt = `You are ${character}. Reply in their voice, tone, and knowledge.`;

  try {
    const anthropicResponse = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": ANTHROPIC_VERSION,
        },
        body: JSON.stringify({
          model,
          max_tokens: 4096,
          temperature: 0.7,
          system: systemPrompt,
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    if (!anthropicResponse.ok) {
      const errorBody = await anthropicResponse.text();
      const errorMessage = parseProviderError(errorBody);
      const status =
        anthropicResponse.status >= 500 ? 502 : anthropicResponse.status;
      return res.status(status).json({
        error: errorMessage,
        upstreamStatus: anthropicResponse.status,
      });
    }

    const data = await anthropicResponse.json();
    const blocks = data?.content;
    let responseText = "";
    if (Array.isArray(blocks)) {
      for (const block of blocks) {
        if (block?.type === "text" && typeof block.text === "string") {
          responseText += block.text;
        }
      }
    }
    responseText = responseText.trim();

    if (!responseText) {
      return res.status(502).json({ error: "Claude returned an empty response" });
    }

    return res.status(200).json({ response: responseText });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
