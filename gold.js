let lastXau = 0;

async function loadGoldPrice() {
  try {
    const p1 = "https://";
    const p2 = "://gold-api.com";
    const p3 = "/price/XAU";
    const response = await fetch(p1 + p2 + p3);
    const data = await response.json();
    const price = Number(data.price);
    if (!price || isNaN(price)) return;
    const priceEl = document.getElementById("gold-price");
    const statusEl = document.getElementById("gold-status");

    let color = "#FFFFFF";
    let statusTxt = "🟢 MARKET DATA ONLINE";

    if (lastXau > 0 && price > lastXau) {
      color = "#22C55E";
      statusTxt = "🟢 ▲ +$" + (price - lastXau).toFixed(2);
    } else if (lastXau > 0 && price < lastXau) {
      color = "#EF4444";
      statusTxt = "🔴 ▼ -$" + (lastXau - price).toFixed(2);
    }

    lastXau = price;

    if (priceEl) {
      priceEl.style.color = color;
      priceEl.style.transition = "color 0.3s";
      priceEl.innerHTML = "$" + price.toFixed(2);
    }
    if (statusEl) {
      statusEl.style.color = color === "#EF4444" ? "#EF4444" : "#22C55E";
      statusEl.innerHTML = statusTxt;
    }
  } catch (error) {
    console.log(error);
    document.getElementById("gold-status").innerHTML = "🔴 DATA ERROR";
  }
}

loadGoldPrice();
setInterval(loadGoldPrice, 4000);
