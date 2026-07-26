async function openXAU(){


const data = await loadSignal();



if(!data){


document.getElementById("result").innerHTML = `

<h2>🥇 XAUUSD AI ENGINE</h2>

<hr>

<p>

❌ Signal олдсонгүй

</p>

`;

return;

}





let signalColor = "🟡";


if(data.signal === "BUY"){

signalColor="🟢";

}


if(data.signal === "SELL"){

signalColor="🔴";

}




document.getElementById("result").innerHTML = `


<h2>🥇 XAUUSD AI ENGINE</h2>


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




Price:

<br>

<b>${data.price}</b>



<br><br>




Bot:

<br>

<b>${data.bot}</b>



<br><br>




Status:

<br>

<b>🟢 ${data.status}</b>



<br><br>




Last Update:

<br>

<b>${data.time}</b>



</p>




<hr>




<h3>

🤖 AI Analysis

</h3>




<p>

Market data Python engine-с ирж байна.


<br><br>


System:

🟢 ONLINE


</p>


`;

}
