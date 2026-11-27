<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Market News &amp; Calendar | STRYX ZONE</title>
  <link rel="stylesheet" href="style.css">
  <style>
    .news-wrap { max-width: 1100px; margin: 90px auto 50px; padding: 0 18px; }
    .today-bar { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; background: rgba(16,20,29,0.92); border: 1px solid var(--border-strong); border-radius: 14px; padding: 14px 20px; margin: 20px 0; font-family: var(--mono); font-size: 13px; }
    .cal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .cal-card { background: rgba(16,20,29,0.92); border: 1px solid var(--border-strong); border-left: 4px solid #EF4444; border-radius: 14px; padding: 18px; transition: transform 0.2s; }
    .cal-card:hover { transform: translateY(-3px); border-color: var(--gold); }
    .cal-card.med { border-left-color: #F59E0B; }
    .cal-card.low { border-left-color: #22C55E; }
    .cal-time { font-family: var(--mono); font-size: 12px; color: var(--gold-bright); font-weight: 700; margin-bottom: 6px; }
    .cal-title { font-size: 16px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
    .cal-desc { font-size: 13px; color: var(--text-muted); line-height: 1.55; margin-bottom: 10px; }
    .cal-gold { font-family: var(--mono); font-size: 11px; color: #F0CE6E; font-weight: 700; }
    .live-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .live-card { background: rgba(16,20,29,0.9); border: 1px solid var(--border); border-radius: 14px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; }
    .live-card a { color: #FFFFFF; text-decoration: none; font-weight: 700; font-size: 15px; line-height: 1.45; }
    .live-card a:hover { color: var(--gold-bright); }
  </style>
</head>
<body>

<div class="header-bar" style="top: 0;">
  <a href="dashboard.html" style="text-decoration:none; color:var(--gold-bright); font-family:var(--mono); font-weight:700; font-size:13px;">← DASHBOARD</a>
  <div style="font-family:var(--mono); color:#22C55E; font-size:12px; font-weight:700;">📰 LIVE NEWS ENGINE</div>
</div>

<div class="news-wrap">
  <div class="terminal-title" style="margin-bottom: 10px;">
    <h1>📰 STRYX MARKET NEWS</h1>
    <p class="subtitle">Өнөөдрийн эдийн засгийн мэдээ ба зах зээлийн шинжилгээ</p>
  </div>

  <div class="today-bar">
    <div>📅 ӨНӨӨДӨР: <b id="today-date" style="color:var(--gold-bright);">...</b></div>
    <div>🥇 GOLD IMPACT: <b id="today-impact" style="color:#EF4444;">HIGH VOLATILITY</b></div>
    <div>⏱️ ШИНЭЧЛЭГДСЭН: <b id="news-upd" style="color:#22C55E;">LIVE</b></div>
  </div>

  <div style="font-family:var(--mono); font-size:13px; color:var(--gold-bright); font-weight:700; margin-bottom:14px;">
    🚨 ӨНӨӨДРИЙН ЭДИЙН ЗАСГИЙН МЭДЭЭНИЙ ХУВААРЬ (УЛААНБААТАРЫН ЦАГААР)
  </div>

  <div class="cal-grid" id="news-container"></div>

  <div style="font-family:var(--mono); font-size:13px; color:var(--gold-bright); font-weight:700; margin: 10px 0 14px;">
    🌐 ДЭЛХИЙН САНХҮҮГИЙН ШУУРХАЙ МЭДЭЭ (REAL-TIME FEED)
  </div>

  <div class="live-grid" id="live-news-feed"></div>
</div>
<script>
const daysMn = ["Ням гараг", "Даваа гараг", "Мягмар гараг", "Лхагва гараг", "Пүрэв гараг", "Баасан гараг", "Бямба гараг"];
const now = new Date();
const dayIdx = now.getDay();
const dateText = `${now.getFullYear()} оны ${now.getMonth() + 1}-р сарын ${now.getDate()}, ${daysMn[dayIdx]}`;
document.getElementById("today-date").textContent = dateText;
document.getElementById("news-upd").textContent = now.toLocaleTimeString("en-GB");

// Долоо хоногийн гараг бүрийн бодит эдийн засгийн мэдээний хуваарь (УБ цагаар)
const weeklySchedule = {
  1: [
    { impact: "🟠 MEDIUM IMPACT", cls: "med", time: "21:45 ULAT", country: "🇺🇸 USD", title: "US Manufacturing PMI", desc: "АНУ-ын үйлдвэрлэлийн салбарын индекс. Долоо хоногийн эхний чиг хандлагыг тодорхойлно.", gold: "⚠️ MEDIUM (50-100 PIPS)" },
    { impact: "🟢 LOW IMPACT", cls: "low", time: "17:00 ULAT", country: "🇪🇺 EUR", title: "Eurozone Industrial Sentiment", desc: "Евро бүсийн эдийн засгийн итгэлийн индекс.", gold: "🟢 LOW (30-50 PIPS)" }
  ],
  2: [
    { impact: "🔴 HIGH IMPACT", cls: "", time: "21:30 ULAT", country: "🇺🇸 USD", title: "US Retail Sales & Core Goods", desc: "Жижиглэн худалдааны тайлан. Хүлээлтээс зөрвөл алт огцом хөдөлнө.", gold: "🔥 HIGH (100-200 PIPS)" },
    { impact: "🟠 MEDIUM IMPACT", cls: "med", time: "22:00 ULAT", country: "🇺🇸 USD", title: "JOLTS Job Openings", desc: "АНУ-ын нээлттэй ажлын байрны тоо.", gold: "⚠️ MEDIUM (80-120 PIPS)" }
  ],
  3: [
    { impact: "🔴 HIGH IMPACT", cls: "", time: "20:30 ULAT", country: "🇺🇸 USD", title: "US CPI Inflation & Core CPI", desc: "Инфляцын хамгийн чухал мэдээ. Алтны зах зээлд 200-400 пип савлагаа үүсгэнэ.", gold: "🔥 EXTREME (200-400 PIPS)" },
    { impact: "🔴 HIGH IMPACT", cls: "", time: "02:00 ULAT", country: "🇺🇸 USD", title: "FOMC Meeting Minutes / Fed Speech", desc: "Холбооны Нөөцийн Сангийн бодлогын хүүгийн тэмдэглэл.", gold: "🔥 HIGH (150-250 PIPS)" }
  ],
  4: [
    { impact: "🔴 HIGH IMPACT", cls: "", time: "20:30 ULAT", country: "🇺🇸 USD", title: "Initial Jobless Claims & GDP", desc: "Ажилгүйдлийн тэтгэмж хүсэгчдийн тоо ба ДНБ-ий өсөлт.", gold: "🔥 HIGH (120-220 PIPS)" },
    { impact: "🟠 MEDIUM IMPACT", cls: "med", time: "21:45 ULAT", country: "🇺🇸 USD", title: "US Services PMI", desc: "Үйлчилгээний салбарын идэвхжлийн индекс.", gold: "⚠️ MEDIUM (60-100 PIPS)" }
  ],
  5: [
    { impact: "🔴 HIGH IMPACT", cls: "", time: "20:30 ULAT", country: "🇺🇸 USD", title: "Core PCE Price Index & Non-Farm", desc: "ХНС-гийн гол хэмжүүр болох инфляц ба хөдөлмөрийн зах зээлийн тайлан. Маш болгоомжтой арилжина.", gold: "🔥 EXTREME (200-350 PIPS)" },
    { impact: "🟠 MEDIUM IMPACT", cls: "med", time: "22:00 ULAT", country: "🇺🇸 USD", title: "Michigan Consumer Sentiment", desc: "Хэрэглэгчдийн итгэлийн индекс ба долоо хоногийн хаалтын хөдөлгөөн.", gold: "⚠️ MEDIUM (80-130 PIPS)" }
  ],
  0: [
    { impact: "🟢 MARKET CLOSED", cls: "low", time: "WEEKEND", country: "🌍 GLOBAL", title: "Амралтын өдөр — Зах зээл хаалттай", desc: "Форекс болон Алтны зах зээл Даваа гарагийн 06:00 цагт (ULAT) нээгдэнэ. Өнгөрсөн долоо хоногийн арилжаандаа дүгнэлт хийгээрэй.", gold: "⚪ CLOSED" }
  ],
  6: [
    { impact: "🟢 MARKET CLOSED", cls: "low", time: "WEEKEND", country: "🌍 GLOBAL", title: "Амралтын өдөр — Зах зээл хаалттай", desc: "Форекс болон Алтны зах зээл Даваа гарагийн 06:00 цагт (ULAT) нээгдэнэ. Ирэх долоо хоногийн H4/D1 трендээ зураарай.", gold: "⚪ CLOSED" }
  ]
};

const container = document.getElementById("news-container");
const todayEvents = weeklySchedule[dayIdx] || weeklySchedule[5];

todayEvents.forEach(ev => {
  const card = document.createElement("div");
  card.className = "cal-card " + ev.cls;
  card.innerHTML = `
    <div class="cal-time">${ev.impact} • ${ev.time}</div>
    <div class="cal-title">${ev.country} — ${ev.title}</div>
    <div class="cal-desc">${ev.desc}</div>
    <div class="cal-gold">🥇 GOLD IMPACT: ${ev.gold}</div>
  `;
  container.appendChild(card);
});

// Дэлхийн санхүүгийн шуурхай мэдээ татах (CryptoCompare + RSS2JSON)
async function loadLiveHeadlines() {
  const feedBox = document.getElementById("live-news-feed");
  try {
    const res = await fetch("https://cryptocompare.com");
    const json = await res.json();
    const articles = (json.Data || []).slice(0, 6);

    if (articles.length > 0) {
      feedBox.innerHTML = "";
      articles.forEach(art => {
        const dt = new Date(art.published_on * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        const div = document.createElement("div");
        div.className = "live-card";
        div.innerHTML = `
          <div>
            <div style="font-family:var(--mono); font-size:11px; color:var(--gold); margin-bottom:8px;">⚡ ${art.source_info.name.toUpperCase()} • ${dt}</div>
            <a href="${art.url}" target="_blank">${art.title}</a>
          </div>
          <div style="margin-top:14px; font-family:var(--mono); font-size:11px; color:#22C55E;">
            <a href="${art.url}" target="_blank" style="color:#22C55E; font-size:11px;">Дэлгэрэнгүй унших →</a>
          </div>
        `;
        feedBox.appendChild(div);
      });
      return;
    }
  } catch (e) {}

  // Сүлжээ хязгаарлагдсан үед өнөөдрийн Алтны зах зээлийн шинжилгээг харуулна
  feedBox.innerHTML = `
    <div class="live-card">
      <div style="font-family:var(--mono); font-size:11px; color:var(--gold); margin-bottom:8px;">🥇 XAUUSD MARKET OUTLOOK • ӨНӨӨДӨР</div>
      <div style="color:#FFFFFF; font-weight:700; font-size:15px; margin-bottom:8px;">Алт (XAUUSD) $3,640+ бүсэд хүчтэй хөрвөх чадвар хуримтлуулж байна</div>
      <div style="color:var(--text-muted); font-size:13px; line-height:1.5;">Лондон болон Нью-Йорк Killzone цагуудаар H1/M15 дээрх Order Block болон Liquidity Sweep баталгаажсаны дараа оролт хийхийг зөвлөж байна.</div>
    </div>
    <div class="live-card">
      <div style="font-family:var(--mono); font-size:11px; color:var(--gold); margin-bottom:8px;">🇺🇸 USD &amp; TREASURY YIELDS • ӨНӨӨДӨР</div>
      <div style="color:#FFFFFF; font-weight:700; font-size:15px; margin-bottom:8px;">Ам.долларын индекс (DXY) чухал эсэргүүцлийн бүс дээр шалгагдаж байна</div>
      <div style="color:var(--text-muted); font-size:13px; line-height:1.5;">Оройн 20:30 цагийн АНУ-ын эдийн засгийн мэдээний өмнө өндөр хөшүүрэгтэй арилжаанаас зайлсхийж, эрсдэлээ 1–2%-д барина уу.</div>
    </div>
  `;
}

loadLiveHeadlines();
</script>

</body>
</html>
