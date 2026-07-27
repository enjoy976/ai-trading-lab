async function loadSignal(){


try {


const response = await fetch("signal.json?" + new Date().getTime());


const data = await response.json();



return data;



}

catch(error){


console.log("Signal error:", error);


return null;


}



}




async function openXAU(){



const data = await loadSignal();



if(!data){


document.getElementById("result").innerHTML = `

<h2>🥇 XAUUSD AI ENGINE</h2>

<p>
❌ Signal олдсонгүй
</p>

`;

return;


}





let signalColor = "🟢";


if(data.signal === "SELL"){

signalColor="🔴";

}



document.getElementById("result").innerHTML = `



<h2>🥇 XAUUSD АЛТНЫ ЗАХ ЗЭЭЛИЙН ЧИГЛЭЛ</h2>


<hr>


<p>


Symbol:

<br>

<b>${data.symbol}</b>


<br><br>



SIGNAL:

<br>

<b>${signalColor} ${data.signal}</b>


<br><br>



Trend:

<br>

<b>${data.trend}</b>



<br><br>



AI Confidence:

<br>

<b>${data.confidence}%</b>



<br><br>



Bot:

<br>

<b>${data.bot}</b>



<br><br>



Last Update:

<br>

<b>${data.time}</b>



</p>



<hr>



<h3>🤖 Morningstar шинэжилгээ</h3>



<p>


Market data MT5 engine-с ирж байна.


<br><br>


System:

🟢 ONLINE


</p>



`;



}








function openCrypto(){



document.getElementById("result").innerHTML = `



<h2>₿ CRYPTO SCANNER</h2>


<hr>


<p>


BTC / ETH / SOL monitoring...


<br><br>


Arbitrage Engine:

🟢 Running


<br><br>


Funding Monitor:

🟢 Active


</p>



`;



}








function openTelegram(){



document.getElementById("result").innerHTML = `



<h2>📱 TELEGRAM SIGNAL</h2>



<p>

Суваг сонгоно уу:

</p>



<br>



<button onclick="window.open('https://t.me/+BKi-tuWKLtdlMDhl','_blank')">

🥇 SWING SIGNAL

</button>



<br><br>




<button onclick="window.open('https://t.me/+FN8PsiLGr4JhY2Q1','_blank')">

⚡ INTRADAY SIGNAL

</button>



`;



}
