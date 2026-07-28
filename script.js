// ===============================
// SUPABASE CONFIG
// ===============================

const SUPABASE_URL = "https://xkxcprkzubjwfglcrivg.supabase.co";

const SUPABASE_KEY = "sb_publishable_7rRB4Trj5OfjENqzvpu_YQ_otz11jrh";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);





// ===============================
// SIGN UP
// ===============================

document.querySelector(".signup-btn").onclick = function(){


document.getElementById("result").innerHTML = `


<h2>🧬 CREATE ACCOUNT</h2>

<hr>


<p>Email</p>

<input id="signupEmail" type="email" placeholder="Enter email">


<br><br>


<p>Password</p>

<input id="signupPassword" type="password" placeholder="Enter password">


<br><br>


<button class="access-btn" onclick="signupUser()">

CREATE ACCOUNT

</button>


`;

};





async function signupUser(){


const email =
document.getElementById("signupEmail").value;


const password =
document.getElementById("signupPassword").value;



const {data,error} =
await supabaseClient.auth.signUp({

email:email,

password:password

});



if(error){


document.getElementById("result").innerHTML = `

<h2>❌ SIGN UP ERROR</h2>

<p>
${error.message}
</p>

`;

return;

}





document.getElementById("result").innerHTML = `


<h2>✅ ACCOUNT CREATED</h2>


<p>

Registration successful.

<br><br>

Check your email if confirmation is enabled.

</p>


`;



}








// ===============================
// LOGIN
// ===============================


document.querySelector(".login-btn").onclick = function(){


document.getElementById("result").innerHTML = `


<h2>🔐 LOGIN ACCESS</h2>


<hr>


<p>Email</p>


<input id="loginEmail" type="email" placeholder="Enter email">


<br><br>



<p>Password</p>


<input id="loginPassword" type="password" placeholder="Enter password">


<br><br>



<button class="access-btn" onclick="loginUser()">

CONNECT SYSTEM

</button>



`;

};








async function loginUser(){



const email =
document.getElementById("loginEmail").value;



const password =
document.getElementById("loginPassword").value;




const {data,error} =
await supabaseClient.auth.signInWithPassword({

email:email,

password:password

});





if(error){


document.getElementById("result").innerHTML = `


<h2>❌ LOGIN FAILED</h2>


<p>

${error.message}

</p>


`;

return;

}





document.getElementById("result").innerHTML = `



<h2>🟢 SYSTEM ACCESS GRANTED</h2>


<hr>


<p>

User:

<br>

<b>${data.user.email}</b>


<br><br>


Status:

🟢 ONLINE


</p>



`;



}









// ===============================
// XAUUSD SIGNAL API
// ===============================


async function loadSignal(){


try {


const response = await fetch(

"https://disposal-exorcist-silly.ngrok-free.dev/signal?_=" + Date.now(),

{

method:"GET",

mode:"cors",

cache:"no-store"

}

);





if(!response.ok){

throw new Error(

"HTTP ERROR: " + response.status

);

}





const data = await response.json();


return data;



}

catch(error){


console.log(error);



document.getElementById("result").innerHTML = `


<h2>🥇 XAUUSD AI ENGINE</h2>


<p>

❌ Connection error

<br><br>

${error.message}

</p>



`;



return null;


}



}









async function openXAU(){



const data = await loadSignal();



if(!data){

return;

}




let signalColor="🟢";



if(data.signal==="SELL"){

signalColor="🔴";

}



if(data.signal==="WAIT"){

signalColor="🟡";

}





document.getElementById("result").innerHTML = `


<h2>🥇 XAUUSD AI ENGINE</h2>


<hr>


<p>


Symbol:

<br>

<b>${data.symbol}</b>


<br><br>


PRICE:

<br>

<b>${data.price}</b>


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


Status:

<br>

<b>${data.status}</b>


<br><br>


Time:

<br>

<b>${data.time}</b>



</p>


<hr>


<h3>🤖 AI Analysis</h3>


<p>

Market data MT5 AI engine-с ирж байна.

<br><br>

System:

🟢 ONLINE

</p>



`;



}









// ===============================
// CRYPTO
// ===============================


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









// ===============================
// TELEGRAM
// ===============================


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
