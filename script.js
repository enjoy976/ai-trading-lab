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


async function signupUser(){


const email =
document.getElementById("signupEmail").value;


const password =
document.getElementById("signupPassword").value;



const {error} =
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


<h2>📩 EMAIL VERIFICATION REQUIRED</h2>


<hr>


<p>

Бүртгэл амжилттай үүслээ.

<br><br>

Таны email хаяг руу баталгаажуулах линк илгээгдлээ.

<br><br>

📬 Mail inbox-оо шалгаад

<br>

<strong>Confirm Email</strong>

товчийг дарна уу.

</p>


`;



}








// ===============================
// LOGIN
// ===============================


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








// ===============================
// FOREX EDUCATION
// ===============================


function openForex(){


document.getElementById("result").innerHTML = `


<h2>📚 FOREX ГЭЖ ЮУ ВЭ?</h2>


<hr>


<p>


Forex (Foreign Exchange) гэдэг нь

дэлхийн валютуудыг хооронд нь

арилжаалдаг зах зээл юм.


<br><br>


Жишээ:

EUR/USD

GBP/USD

USD/JPY


<br><br>


Forex зах зээл нь 24 цаг ажилладаг.

Үнэ нь эдийн засгийн мэдээ,

төв банкны шийдвэр,

хүүгийн өөрчлөлтөөс хамаарч хөдөлдөг.


</p>



`;



}








// ===============================
// NEWS MARKET
// ===============================


function openNews(){


document.getElementById("result").innerHTML = `


<h2>📰 NEWS MARKET</h2>


<hr>


<p>


Томоохон мэдээ гарах үед

зах зээл огцом хөдөлгөөн хийх боломжтой.


<br><br>


🔴 CPI

<br>

🔴 FOMC

<br>

🔴 NFP


<br><br>


Мэдээний үед:

<br><br>


🟢 Сайн мэдээлэл → өсөлт хийх боломж

<br>

🔴 Муу мэдээлэл → бууралт хийх боломж


<br><br>


⚠️ Гэхдээ эхний хөдөлгөөн

ихэвчлэн хуурамч breakout байж болох тул

баталгаажуулалт хүлээх хэрэгтэй.


</p>



`;



}
