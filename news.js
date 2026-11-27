// =================================
// GOLD SNIPER LIVE NEWS SYSTEM
// =================================

const newsContainer = document.getElementById("news-container");

const daysMn = ["Ням гараг", "Даваа гараг", "Мягмар гараг", "Лхагва гараг", "Пүрэв гараг", "Баасан гараг", "Бямба гараг"];
const now = new Date();
const dayIdx = now.getDay();
const todayStr = `${now.getFullYear()} оны ${now.getMonth() + 1}-р сарын ${now.getDate()}, ${daysMn[dayIdx]}`;

const scheduleByDay = {
  1: [
    { country: "🇺🇸 USD", impact: "🟠 MEDIUM IMPACT", title: "US Manufacturing PMI", time: "21:45 UB", gold: "⚠️ MEDIUM (50-100 PIPS)" },
    { country: "🇪🇺 EUR", impact: "🟢 LOW IMPACT", title: "Eurozone Industrial Sentiment", time: "17:00 UB", gold: "🟢 LOW (30-50 PIPS)" }
  ],
  2: [
    { country: "🇺🇸 USD", impact: "🔴 HIGH IMPACT", title: "US Retail Sales & Core Goods", time: "21:30 UB", gold: "🔥 VERY HIGH (100-200 PIPS)" },
    { country: "🇺🇸 USD", impact: "🟠 MEDIUM IMPACT", title: "JOLTS Job Openings", time: "22:00 UB", gold: "⚠️ MEDIUM (80-120 PIPS)" }
  ],
  3: [
    { country: "🇺🇸 USD", impact: "🔴 HIGH IMPACT", title: "US CPI Inflation & Core CPI", time: "20:30 UB", gold: "🔥 EXTREME (200-400 PIPS)" },
    { country: "🇺🇸 USD", impact: "🔴 HIGH IMPACT", title: "FOMC Meeting Minutes / Speech", time: "02:00 UB", gold: "🔥 HIGH (150-250 PIPS)" }
  ],
  4: [
    { country: "🇺🇸 USD", impact: "🔴 HIGH IMPACT", title: "Initial Jobless Claims & GDP", time: "20:30 UB", gold: "🔥 HIGH (120-220 PIPS)" },
    { country: "🇺🇸 USD", impact: "🟠 MEDIUM IMPACT", title: "US Services PMI", time: "21:45 UB", gold: "⚠️ MEDIUM (60-100 PIPS)" }
  ],
  5: [
    { country: "🇺🇸 USD", impact: "🔴 HIGH IMPACT", title: "Core PCE Price Index & NFP Data", time: "20:30 UB", gold: "🔥 EXTREME (200-350 PIPS)" },
    { country: "🇺🇸 USD", impact: "🟠 MEDIUM IMPACT", title: "Michigan Consumer Sentiment", time: "22:00 UB", gold: "⚠️ MEDIUM (80-130 PIPS)" },
    { country: "🇺🇸 USD", impact: "🔴 HIGH IMPACT", title: "FOMC Member Speech & Yields", time: "23:00 UB", gold: "🔥 HIGH (100-180 PIPS)" }
  ],
  0: [
    { country: "🌍 GLOBAL", impact: "🟢 MARKET CLOSED", title: "Амралтын өдөр — Зах зээл хаалттай", time: "WEEKEND", gold: "⚪ CLOSED" }
  ],
  6: [
    { country: "🌍 GLOBAL", impact: "🟢 MARKET CLOSED", title: "Амралтын өдөр — Зах зээл хаалттай", time: "WEEKEND", gold: "⚪ CLOSED" }
  ]
};

function loadNews() {
  if (!newsContainer) return;
  newsContainer.innerHTML = `
    <div style="grid-column: 1 / -1; padding: 12px 16px; border-radius: 10px; background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.4); color: #F0CE6E; font-family: var(--mono); font-size: 13px; font-weight: 700; margin-bottom: 10px;">
      📅 ӨНӨӨДӨР: ${todayStr} • УЛААНБААТАРЫН ЦАГААР
    </div>
  `;

  const list = scheduleByDay[dayIdx] || scheduleByDay[5];

  list.forEach(news => {
    const card = document.createElement("div");
    card.className = "price-card";
    card.style.borderColor = news.impact.includes("HIGH") ? "rgba(239,68,68,0.5)" : "rgba(212,175,55,0.35)";

    card.innerHTML = `
      <h3 style="color:${news.impact.includes("HIGH") ? "#EF4444" : "#F0CE6E"};">${news.impact}</h3>
      <p>
        ${news.country}
        <br><br>
        📊 <b style="color:#FFFFFF; font-size:16px;">${news.title}</b>
        <br><br>
        ⏰ <b style="color:#F0CE6E;">${news.time}</b>
        <br><br>
        🥇 Gold Impact:<br>
        <b style="color:#22C55E;">${news.gold}</b>
      </p>
    `;
    newsContainer.appendChild(card);
  });
}

loadNews();
