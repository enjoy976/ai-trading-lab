// GOLD SNIPER AI v4 - H4 / H1 / M15 / M5 DASHBOARD

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

async function loadMarketBias() {
  try {
    const response = await fetch(
      "https://ngrok-free.dev",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      }
    );

    if (!response.ok) throw new Error("API STATUS: " + response.status);

    const data = await response.json();

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
