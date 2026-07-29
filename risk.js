// =====================================
// GOLD SNIPER REAL XAUUSD RISK CALCULATOR
// =====================================


function calculateRisk(){


let balance = Number(document.getElementById("balance").value);

let riskPercent = Number(document.getElementById("risk").value);

let entry = Number(document.getElementById("entry").value);

let stopLoss = Number(document.getElementById("stoploss").value);



if(
    balance <= 0 ||
    riskPercent <= 0 ||
    entry <= 0 ||
    stopLoss <= 0
){

alert("Утгуудаа зөв оруулна уу");

return;

}



// ===============================
// Risk Money
// ===============================


let riskMoney = balance * (riskPercent / 100);




// ===============================
// XAUUSD Calculation
// ===============================


// Entry ба Stop Loss хоорондын зай

let priceDistance = Math.abs(entry - stopLoss);



// XAUUSD:
// 1 lot = 100 oz
// $1 хөдөлгөөн = $100 / lot


let lossPerLot = priceDistance * 100;



// Lot size

let lot = riskMoney / lossPerLot;



// ===============================
// Protection
// ===============================


if(lot < 0.01){

    lot = 0.01;

}


if(lot > 100){

    lot = 100;

}



// 0.01 алхам

lot = Math.floor(lot * 100) / 100;





// ===============================
// Display
// ===============================


document.getElementById("risk-money").innerHTML =

"$" + riskMoney.toFixed(2);



document.getElementById("lot-size").innerHTML =

lot.toFixed(2) + " lot";



}
