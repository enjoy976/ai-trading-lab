// GOLD SNIPER AI v4 - H4 / H1 / M15 / M5 DASHBOARD + SENTIMENT GAUGE

function formatBiasBadge(text) {
  if (!text) return '<b style="color:#F0CE6E;">WAIT</b>';
  const upper = String(text).toUpperCase();
  if (upper.includes("BEARISH") || upper.includes("SELL")) {
    return `<b style="color:#EF4444; text-shadow:0 0 8px rgba(239,68,68,0.4);">${text}</b>`;
  }
  if (upper.includes("BULLISH") || upper.includes("BUY")) {
    return `<b style="color:#22C55E; text-shadow:0 0 8px rgba(34,197,94,0.4);">${text}</b>`;
  }
  return `<b style="color:#F0CE6E;">${text}</b>`;
}

function updateGaugeMeter(signal, confidence, trend) {
  const needle = document.getElementById("ai-gauge-needle");
  const scoreEl = document.getElementById("ai-gauge-score");
  const labelEl = document.getElementById("ai-gauge-label");
  if (!needle || !scoreEl || !labelEl) return;

  const conf = Number(confidence) || 50;
  let angle = 0; // -90 (Strong Sell) to +90 (Strong Buy)
  let labelText = "⏳ NEUTRAL / ХҮЛЭЭЖ БАЙНА";
  let labelColor = "#F0CE6E";

  const sig = String(signal || "").toUpperCase();
  const trd = String(trend || "").toUpperCase();

  if (sig === "SELL" || (sig === "WAIT" && trd.includes("BEARISH"))) {
    angle = -Math.min(85, Math.max(25, (conf / 100) * 85));
    labelText = sig === "SELL" ? `🔴 STRONG SELL (${conf}% AI CONFIDENCE)` : `🔻 BEARISH BIAS (${conf}%)`;
    labelColor = "#EF4444";
  } else if (sig === "BUY" || (sig === "WAIT" && trd.includes("BULLISH"))) {
    angle = Math.min(85, Math.max(25, (conf / 100) * 85));
    labelText = sig === "BUY" ? `🟢 STRONG BUY (${conf}% AI CONFIDENCE)` : `🔺 BULLISH BIAS (${conf}%)`;
    labelColor = "#22C55E";
  }

  needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  scoreEl.textContent = `${conf}%`;
  scoreEl.style.color = labelColor;
  labelEl.textContent = labelText;
  labelEl.style.color = labelColor;
}

async function loadMarketBias() {
  try {
    const response = await fetch(
      "https://ngrok-free.dev",
      { method: "GET", headers: { "ngrok-skip-browser-warning": "true" } }
    );

    if (!response.ok) throw new Error("API STATUS: " + response.status);

    const data = await response.json();

    // Хэмжүүрийн зүүг хөдөлгөнө
    updateGaugeMeter(data.signal, data.confidence, data.trend);

    let color = "#F0CE6E";
    if (data.signal === "BUY") color = "#22C55E";
    if (data.signal === "SELL") color = "#EF4444";

    let strength = "⏳ Дохио байхгүй (WAIT)";
    if (data.signal === "BUY" || data.signal === "SELL") {
      strength = "🟢 Хүчтэй";
    }

    document.getElementById("market-bias").innerHTML = `
      <h3 style="color:${color};font-size:30px;text-shadow:0 0 12px ${color}40;">${data.signal}</h3>
      <p>📈 Тренд чиглэл (H4): ${formatBiasBadge(data.trend)}</p>
      <hr>
      <p>🤖 AI ШИНЖИЛГЭЭ:</p>
      <p>• H4 CHoCH Bias: ${formatBiasBadge(data.h4_choch)}</p>
      <p>• H1 CHoCH: ${formatBiasBadge(data.h1_choch)}</p>
      <p>• M15 CHoCH: ${formatBiasBadge(data.m15_choch)}</p>
      <p>• M5 CHoCH Entry: ${formatBiasBadge(data.m5_choch)}</p>
      <p>💰 XAUUSD бодит үнэ: <b style="color:#F0CE6E;">${data.price}</b></p>
      <p>🤖 AI Status: <b style="color:#22C55E;">${data.ai_status || "ONLINE"}</b></p>
      <p>🎯 AI CONFIDENCE: <b style="color:#D4AF37;">${data.confidence}%</b></p>
      <p>Дохионы хүч: ${strength}</p>
      <p>💧 LIQUIDITY FLOW:<br>${formatBiasBadge(data.liquidity)}</p>
    `;
  } catch (error) {
    console.log("AI ERROR:", error);
    document.getElementById("market-bias").innerHTML = `
      <h3 style="color:#EF4444">❌ ОДООГООР ХОЛБОЛТ ТҮР САЛСАН БАЙНА</h3>
      <p>${error.message}</p>
    `;
  }
}

loadMarketBias();
setInterval(loadMarketBias, 10000);
