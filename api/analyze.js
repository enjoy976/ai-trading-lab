export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ fallback: true, reason: "NO_KEY" });
  }

  try {
    const { imageBase64, mediaType, timeframe, session, livePrice } = req.body;
    const endpoint = ["https:", "", "://anthropic.com", "v1", "messages"].join("/");

    const promptText = `You are an elite institutional SMC (Smart Money Concept) Gold & Forex trader. Analyze this chart screenshot (Timeframe: ${timeframe}, Session: ${session}, Current Live XAUUSD Reference: ${livePrice}).
Look closely at the candlesticks, market structure (BOS/CHoCH), liquidity sweeps, Order Blocks, FVG, and the price axis on the right.
Respond ONLY with valid JSON (no markdown, no backticks) in this exact structure:
{
  "direction": "BUY" or "SELL",
  "confidence": "92.4",
  "tags": ["Bullish BOS", "Liquidity Sweep", "Fresh Order Block", "${timeframe} Structure"],
  "entry": "3678.50",
  "sl": "3670.00",
  "tp1": "3694.00",
  "tp2": "3706.00",
  "rr": "1 : 3.2 R",
  "check1_title": "Монгол гарчиг 1 (ж: Liquidity Sweep Баталгаажсан)",
  "check1_desc": "Зураг дээрх лааны хөдөлгөөний бодит тайлбар монголоор",
  "check2_title": "Монгол гарчиг 2 (ж: Order Block & FVG Бүс)",
  "check2_desc": "Яагаад энэ цэгээс орох болсон шалтгааныг монголоор"
}`;

    const aiRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 600,
        messages: [{
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType || "image/png",
                data: imageBase64
              }
            },
            { type: "text", text: promptText }
          ]
        }]
      })
    });

    const data = await aiRes.json();
    if (!aiRes.ok || !data.content) {
      return res.status(200).json({ fallback: true, reason: "API_LIMIT" });
    }

    const rawText = data.content.map(c => c.text || "").join("").trim();
    const parsed = JSON.parse(rawText);
    return res.status(200).json({ fallback: false, result: parsed });
  } catch (err) {
    return res.status(200).json({ fallback: true, reason: "PARSE_ERR" });
  }
}
