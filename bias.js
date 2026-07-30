async function loadMarketBias(){


try{


const response = await fetch(

"https://disposal-exorcist-silly.ngrok-free.dev/signal",

{
method:"GET",
headers:{
"ngrok-skip-browser-warning":"true"
}
}

);



if(!response.ok){

throw new Error("API STATUS: " + response.status);

}



const data = await response.json();



let color="#94a3b8";


if(data.signal=="BUY"){

color="#00ff99";

}


if(data.signal=="SELL"){

color="#ff4444";

}





let strength="🟡 Дунд";


if(data.confidence>=80){

strength="🟢 Хүчтэй";

}

else if(data.confidence<50){

strength="🔴 Сул";

}







document.getElementById("market-bias").innerHTML =



`

<h3 style="color:${color};font-size:30px">

${data.signal}

</h3>



<p>

📈 Тренд чиглэл:

<b>${data.trend}</b>

</p>



<hr>



<p>

🤖 AI ШИНЖИЛГЭЭ:

</p>


<p>

• M15 Bias:

<b>${data.m15_bias || "WAIT"}</b>

</p>



<p>

• M5 Momentum:

<b>${data.m5_momentum || "WAIT"}</b>

</p>



<p>

• M1 Entry:

<b>${data.m1_entry || "WAIT"}</b>

</p>





<p>

💰 XAUUSD бодит үнэ:

<b>${data.price}</b>

</p>





<p>

🤖 AI Status:

<b>${data.ai_status || "ONLINE"}</b>

</p>





<p>

🎯 AI CONFIDENCE:

<b>${data.confidence}%</b>

</p>





<p>

Дохионы хүч:

${strength}

</p>





<p>

💧 LIQUIDITY FLOW:

<b>${data.liquidity || "WAIT"}</b>

</p>





<p>

🕒 Update:

${data.time}

</p>


`;



}

catch(error){


console.log("AI ERROR:",error);



document.getElementById("market-bias").innerHTML=


`

❌ AI SERVER CONNECTION FAILED

<br><br>

${error.message}

`;



}



}





loadMarketBias();


setInterval(loadMarketBias,10000);
