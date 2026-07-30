// =====================================
// GOLD SNIPER AI v4
// PURE CHoCH DASHBOARD
// PART 1/3
// =====================================



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


throw new Error(

"API STATUS: " + response.status

);


}





const data = await response.json();







let color="#94a3b8";



if(data.signal==="BUY"){


color="#00ff99";


}



if(data.signal==="SELL"){


color="#ff4444";


}





let strength="🔴 Сул";



if(data.confidence >= 80){


strength="🟢 Хүчтэй";


}

else if(data.confidence >= 50){


strength="🟡 Дунд";


}




// =====================================
// GOLD SNIPER AI v4
// PURE CHoCH DASHBOARD
// PART 2/3
// =====================================



document.getElementById("market-bias").innerHTML =


`

<h3 style="color:${color};font-size:30px">

${data.signal}

</h3>





<p>

📈 Тренд чиглэл:

<b>${data.trend || "WAIT"}</b>

</p>





<hr>





<p>

🤖 AI ШИНЖИЛГЭЭ:

</p>





<p>

• M15 CHoCH:

<b>

${data.m15_choch || "WAIT"}

</b>

</p>





<p>

• M5 CHoCH Confirmation:

<b>

${data.m5_choch || "WAIT"}

</b>

</p>





<p>

• M1 CHoCH Entry:

<b>

${data.m1_choch || "WAIT"}

</b>

</p>







<p>

💰 XAUUSD бодит үнэ:

<b>

${data.price}

</b>

</p>







<p>

🤖 AI Status:

<b>

${data.ai_status || "ONLINE"}

</b>

</p>







<p>

🎯 AI CONFIDENCE:

<b>

${data.confidence}%

</b>

</p>







<p>

Дохионы хүч:

${strength}

</p>





<p>

💧 LIQUIDITY FLOW:

<br>

<b>

${data.liquidity || "WAIT"}

</b>

</p>





`

// =====================================
// GOLD SNIPER AI v4
// PURE CHoCH DASHBOARD
// PART 3/3
// =====================================



}

catch(error){


console.log(

"AI ERROR:",

error

);





document.getElementById("market-bias").innerHTML =


`

<h3 style="color:#ff4444">

❌ AI CONNECTION FAILED

</h3>


<p>

${error.message}

</p>


`;



}



}







// =====================================
// INITIAL LOAD
// =====================================


loadMarketBias();





// =====================================
// AUTO UPDATE
// =====================================


setInterval(

loadMarketBias,

10000

);
