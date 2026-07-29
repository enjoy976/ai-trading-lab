async function loadGoldPrice(){

try{


const response = await fetch(
"https://api.gold-api.com/price/XAU"
);


const data = await response.json();



const price = data.price;



document.getElementById("gold-price").innerHTML =
"$" + price.toFixed(2);



document.getElementById("gold-status").innerHTML =
"🟢 MARKET DATA ONLINE";


}

catch(error){


console.log(error);


document.getElementById("gold-status").innerHTML =
"🔴 DATA ERROR";


}


}



loadGoldPrice();


setInterval(loadGoldPrice,60000);
