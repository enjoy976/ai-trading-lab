
// =====================================
// GOLD SNIPER RISK CALCULATOR
// =====================================


function calculateRisk(){



// Get values

let balance = Number(document.getElementById("balance").value);

let riskPercent = Number(document.getElementById("risk").value);

let stopLoss = Number(document.getElementById("stoploss").value);





// Check input

if(balance <= 0 || riskPercent <= 0 || stopLoss <= 0){


alert("Утгуудаа зөв оруулна уу");


return;


}





// Calculate risk money

let riskMoney = balance * (riskPercent / 100);







// XAUUSD lot calculation

// Approximation:
// 1.00 lot gold = $1 per 0.01 price movement (approx)
// Used for educational calculator


let lot = riskMoney / (stopLoss * 1);






// Limit decimals

lot = lot.toFixed(2);





// Display result


document.getElementById("risk-money").innerHTML =

"$" + riskMoney.toFixed(2);





document.getElementById("lot-size").innerHTML =

lot + " lot";




}




// Auto calculate when page opens

window.onload = function(){


calculateRisk();


}
