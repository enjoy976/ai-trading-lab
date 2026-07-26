async function loadSignal(){


try {


const response = await fetch(
"signal.json?" + new Date().getTime()
);


const data = await response.json();


return data;



}

catch(error){


console.log("Signal error:", error);


return null;


}


}







async function openXAU(){



// HOME нуух

document.getElementById("homePage").style.display="none";


// XAU page гаргах

document.getElementById("xauPage").style.display="block";





const data = await loadSignal();




if(!data){



document.getElementById("result").innerHTML = `


<div class="ai-card">


<h2>
🥇 XAUUSD AI ENGINE
</h2>


<p>
❌ Signal олдсонгүй
</p>


</div>


`;


return;


}





let signalClass="wait";

let signalEmoji="🟡";




if(data.signal==="BUY"){


signalClass="buy";

signalEmoji="🟢";


}



if(data.signal==="SELL"){


signalClass="sell";

signalEmoji="🔴";


}







document.getElementById("result").innerHTML = `



<div class="ai-card">



<div class="header">


<h2>
🥇 XAUUSD AI ENGINE
</h2>


<span class="online">
● ONLINE
</span>


</div>





<div class="price">

${data.price}

</div>





<div class="signal ${signalClass}">


${signalEmoji}

${data.signal}


</div>







<div class="info-box">



<div>


<span>

Symbol

</span>


<b>

${data.symbol}

</b>


</div>






<div>


<span>

Trend

</span>


<b>

${data.trend}

</b>


</div>






<div>


<span>

AI Confidence

</span>


<b>

${data.confidence}%

</b>


</div>





<div>


<span>

Bot

</span>


<b>

${data.bot}

</b>


</div>




<div>


<span>

Status

</span>


<b>

🟢 ONLINE

</b>


</div>




<div>


<span>

Update

</span>


<b>

${data.time}

</b>


</div>



</div>







<div class="progress">


<div style="width:${data.confidence}%"></div>


</div>







<h3>

🤖 AI Analysis

</h3>





<p>


Market data MT5 engine-с ирж байна.


<br><br>


System:

🟢 ONLINE


</p>





</div>



`;



}









function backHome(){


// XAU page нуух

document.getElementById("xauPage").style.display="none";


// Home буцаах

document.getElementById("homePage").style.display="block";


}









function openCrypto(){



document.getElementById("homePage").style.display="none";


document.getElementById("xauPage").style.display="block";




document.getElementById("result").innerHTML = `



<div class="ai-card">


<h2>
₿ CRYPTO SCANNER
</h2>



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



</div>



`;



}









function openTelegram(){



document.getElementById("homePage").style.display="none";


document.getElementById("xauPage").style.display="block";





document.getElementById("result").innerHTML = `



<div class="ai-card">


<h2>

📱 TELEGRAM SIGNAL

</h2>




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



</div>



`;



}
