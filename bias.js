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





document.getElementById("market-bias").innerHTML =


`

<h3 style="color:${color};font-size:30px">

${data.signal}

</h3>



<p>

📈 Trend:

<b>${data.trend}</b>

</p>



<p>

💰 Price:

<b>${data.price}</b>

</p>



<p>

🎯 Confidence:

<b>${data.confidence}%</b>

</p>



<p>

🤖 AI Status:

<b>${data.status}</b>

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
