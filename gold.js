// =====================================
// GOLD SNIPER XAUUSD LIVE PRICE
// =====================================


async function loadGoldPrice(){


try{


const response = await fetch(
"https://api.metals.live/v1/spot/gold"
);


const data = await response.json();


// Gold price

const goldPrice = data[0].price;



document.getElementById("gold-price").innerHTML =
"$" + goldPrice.toFixed(2);





document.getElementById("gold-status").innerHTML =
"🟢 MARKET DATA ONLINE";



}

catch(error){


console.log(error);


document.getElementById("gold-status").innerHTML =
"🔴 DATA ERROR";


}


}




// first load

loadGoldPrice();


// update every 60 seconds

setInterval(loadGoldPrice,60000);
