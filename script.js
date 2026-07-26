async function openXAU(){


const data = await loadSignal();



if(!data){


document.getElementById("result").innerHTML = `

<div class="ai-card">

<h2>🥇 XAUUSD AI ENGINE</h2>

<p>❌ Signal олдсонгүй</p>

</div>

`;

return;

}




let signalClass = "wait";
let signalEmoji = "🟡";



if(data.signal === "BUY"){

signalClass="buy";
signalEmoji="🟢";

}



if(data.signal === "SELL"){

signalClass="sell";
signalEmoji="🔴";

}




document.getElementById("result").innerHTML = `


<div class="ai-card">


<div class="header">


<h2>🥇 XAUUSD AI</h2>


<span class="online">

● ONLINE

</span>


</div>





<div class="price">

$${data.price}

</div>





<div class="signal ${signalClass}">

${signalEmoji} ${data.signal}

</div>





<div class="info-box">


<div>

<span>Trend</span>

<b>${data.trend}</b>

</div>




<div>

<span>Confidence</span>

<b>${data.confidence}%</b>

</div>




<div>

<span>Bot</span>

<b>${data.bot}</b>

</div>



</div>







<div class="progress">


<div style="width:${data.confidence}%"></div>


</div>





<p class="update">

Last update:

${data.time}

</p>





<h3>

🤖 AI Analysis

</h3>




<p>

Market data Python engine-с ирж байна.

<br><br>

System:

🟢 ONLINE

</p>





</div>


`;

}
