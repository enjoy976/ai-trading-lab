// GOLD SNIPER AI v4 - H4 / H1 / M15 / M5 DASHBOARD

async function loadMarketBias() {
  try {
    const response = await fetch(
      "https://disposal-exorcist-silly.ngrok-free.dev/signal",
      { method: "GET", headers: { "ngrok-skip-browser-warning": "true" } }
    );

    if (!response.ok) throw new Error("API STATUS: " + response.status);

    const data = await response.json();

    let color = "#94a3b8";
    if (data.signal === "BUY") color = "#00ff99";
    if (data.signal === "SELL") color = "#ff4444";

    let strength = "⏳ Дохио байхгүй (WAIT)";
    if (data.signal === "BUY" || data.signal === "SELL") {
      strength = "🟢 Хүчтэй";
    }

    document.getElementById("market-bias").innerHTML = `
      <h3 style="color:${color};font-size:30px">${data.signal}</h3>
      <p>📈 Тренд чиглэл (H4): <b>${data.trend || "WAIT"}</b></p>
      <hr>
      <p>🤖 AI ШИНЖИЛГЭЭ:</p>
      <p>• H4 CHoCH Bias: <b>${data.h4_choch || "WAIT"}</b></p>
      <p>• H1 CHoCH: <b>${data.h1_choch || "WAIT"}</b></p>
      <p>• M15 CHoCH: <b>${data.m15_choch || "WAIT"}</b></p>
      <p>• M5 CHoCH Entry: <b>${data.m5_choch || "WAIT"}</b></p>
      <p>💰 XAUUSD бодит үнэ: <b>${data.price}</b></p>
      <p>🤖 AI Status: <b>${data.ai_status || "ONLINE"}</b></p>
      <p>🎯 AI CONFIDENCE: <b>${data.confidence}%</b></p>
      <p>Дохионы хүч: ${strength}</p>
      <p>💧 LIQUIDITY FLOW:<br><b>${data.liquidity || "WAIT"}</b></p>
    `;
  } catch (error) {
    console.log("AI ERROR:", error);
    document.getElementById("market-bias").innerHTML = `
      <h3 style="color:#ff4444">❌ AI CONNECTION FAILED</h3>
      <p>${error.message}</p>
    `;
  }
}

loadMarketBias();
setInterval(loadMarketBias, 10000);
