async function loadGoldPrice() {
  try {
    const endpoint = ["https:", "", "://gold-api.com", "price", "XAU"].join("/");
    const response = await fetch(endpoint);
    const data = await response.json();
    const price = Number(data.price);

    if (!price || isNaN(price)) return;

    document.getElementById("gold-price").innerHTML = "$" + price.toFixed(2);
    document.getElementById("gold-status").innerHTML = "🟢 MARKET DATA ONLINE";
  } catch (error) {
    console.log(error);
    document.getElementById("gold-status").innerHTML = "🔴 DATA ERROR";
  }
}

loadGoldPrice();
setInterval(loadGoldPrice, 5000);
