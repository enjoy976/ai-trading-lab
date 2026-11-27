let prevGoldVal = 0;

async function updateRealGold() {
  const priceEl = document.getElementById("gold-price");
  const statusEl = document.getElementById("gold-status");
  let livePrice = 0;

  // 1-р эх сурвалж: Swissquote Бодит Цагийн Алтны Ханш (Мэргэжлийн брокер)
  try {
    const sqUrl = "https://swissquote.com" + "/public-quotes/bboquotes/instrument/XAU/USD";
    const sqRes = await fetch(sqUrl);
    const sqData = await sqRes.json();
    const bid = sqData.at(0).spreadProfilePrices.at(0).bid;
    if (bid && !isNaN(bid)) livePrice = Number(bid);
  } catch (e1) {}

  // 2-р эх сурвалж (Нөөц): gold-api.com
  if (!livePrice) {
    try {
      const gUrl = "https://gold-api.com" + "/price/XAU";
      const gRes = await fetch(gUrl);
      const gData = await gRes.json();
      if (gData && gData.price) livePrice = Number(gData.price);
    } catch (e2) {}
  }

  if (livePrice > 0 && priceEl) {
    let color = "#FFFFFF";
    let label = "🟢 LIVE BROKER FEED";

    if (prevGoldVal > 0 && livePrice > prevGoldVal) {
      color = "#22C55E";
      label = "🟢 ▲ +$" + (livePrice - prevGoldVal).toFixed(2);
    } else if (prevGoldVal > 0 && livePrice < prevGoldVal) {
      color = "#EF4444";
      label = "🔴 ▼ -$" + (prevGoldVal - livePrice).toFixed(2);
    }

    prevGoldVal = livePrice;
    priceEl.style.color = color;
    priceEl.style.transition = "color 0.3s";
    priceEl.textContent = "$" + livePrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    if (statusEl) {
      statusEl.style.color = color === "#EF4444" ? "#EF4444" : "#22C55E";
      statusEl.textContent = label;
    }
  }
}

updateRealGold();
setInterval(updateRealGold, 3000);
