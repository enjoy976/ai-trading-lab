let prevGoldPrice = 0;

async function loadGoldPrice() {
  try {
    const response = await fetch("https://gold-api.com" + Date.now());
    const data = await response.json();
    const price = Number(data.price);
    if (!price || isNaN(price)) return;

    const priceEl = document.getElementById("gold-price");
    const statusEl = document.getElementById("gold-status");

    let flashColor = "#FFFFFF";
    let trendBadge = "🟢 MARKET DATA ONLINE";

    if (prevGoldPrice > 0 && price > prevGoldPrice) {
      flashColor = "#22C55E";
      trendBadge = "🟢 ▲ +$" + (price - prevGoldPrice).toFixed(2) + " LIVE";
    } else if (prevGoldPrice > 0 && price < prevGoldPrice) {
      flashColor = "#EF4444";
      trendBadge = "🔴 ▼ -$" + (prevGoldPrice - price).toFixed(2) + " LIVE";
    }

    prevGoldPrice = price;

    if (priceEl) {
      priceEl.style.color = flashColor;
      priceEl.style.transition = "color 0.3s ease";
      priceEl.textContent = "$" + price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    if (statusEl) {
      statusEl.style.color = flashColor === "#EF4444" ? "#EF4444" : "#22C55E";
      statusEl.textContent = trendBadge;
    }
  } catch (error) {
    console.log("Reconnecting gold feed...");
  }
}

loadGoldPrice();
setInterval(loadGoldPrice, 2000);
