async function loadSignal(){

    try {

        const response = await fetch(
            "https://disposal-exorcist-silly.ngrok-free.dev/signal?_=" + Date.now(),
            {
                method: "GET",
                mode: "cors",
                cache: "no-store"
            }
        );


        if(!response.ok){

            throw new Error(
                "HTTP ERROR: " + response.status
            );

        }


        const contentType = response.headers.get("content-type");


        if(!contentType || !contentType.includes("application/json")){

            throw new Error(
                "Server returned HTML instead of JSON"
            );

        }


        const data = await response.json();


        return data;


    }


    catch(error){


        console.log("Signal error:", error);


        document.getElementById("result").innerHTML = `

        <h2>🥇 XAUUSD AI ENGINE</h2>

        <hr>

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


    if(data.signal === "SELL"){

        signalColor="🔴";

    }


    if(data.signal === "WAIT"){

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



    Last Update:

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
