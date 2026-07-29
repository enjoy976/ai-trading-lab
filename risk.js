// =====================================
// GOLD SNIPER SIMPLE RISK CALCULATOR
// =====================================


function calculateRisk(){


    let balance = Number(document.getElementById("balance").value);

    let riskPercent = Number(document.getElementById("risk").value);

    let stopLoss = Number(document.getElementById("stoploss").value);



    if(!balance || !riskPercent || !stopLoss){

        alert("Утгуудаа бүрэн оруулна уу");

        return;

    }



    // Эрсдэлийн мөнгө

    let riskMoney = balance * (riskPercent / 100);



    // Lot тооцоо
    // XAUUSD энгийн тооцоо

    let lot = riskMoney / stopLoss;



    // Үр дүн харуулах


    document.getElementById("risk-money").innerHTML =

    "$" + riskMoney.toFixed(2);



    document.getElementById("lot-size").innerHTML =

    lot.toFixed(2) + " lot";



}


// Тооцоолох товч дарахад ажиллана
