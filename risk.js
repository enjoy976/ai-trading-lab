// =====================================
// GOLD SNIPER RISK CALCULATOR
// =====================================


function calculateRisk(){


    let balance = Number(document.getElementById("balance").value);

    let riskPercent = Number(document.getElementById("risk").value);

    let stopLoss = Number(document.getElementById("stoploss").value);



    if(balance <= 0 || riskPercent <= 0 || stopLoss <= 0){

        alert("Утгуудаа зөв оруулна уу");

        return;

    }



    // ==========================
    // Эрсдэлийн мөнгө
    // ==========================


    let riskMoney = balance * (riskPercent / 100);




    // ==========================
    // XAUUSD LOT CALCULATION
    // ==========================

    // Ойролцоогоор:
    // 1.00 lot XAUUSD ≈ $1 / pip хөдөлгөөн


    let pipValuePerLot = 1;



    let lot = riskMoney / (stopLoss * pipValuePerLot);




    // ==========================
    // LOT ХАМГААЛАЛТ
    // ==========================


    if(lot > 5){

        lot = 5;

    }


    if(lot < 0.01){

        lot = 0.01;

    }



    // 0.01 алхамтай болгох

    lot = Math.floor(lot * 100) / 100;





    // ==========================
    // ҮР ДҮН ХАРУУЛАХ
    // ==========================


    document.getElementById("risk-money").innerHTML =

    "$" + riskMoney.toFixed(2);




    document.getElementById("lot-size").innerHTML =

    lot.toFixed(2) + " lot";



}
