import json
import time
from datetime import datetime
import random


while True:


    # Түр simulation data
    # Дараа нь энд MT5-оос бодит үнэ авна

    price = round(random.uniform(4300, 4400), 2)


    signals = [
        "BUY",
        "SELL",
        "WAIT"
    ]


    trends = [
        "BULLISH",
        "BEARISH",
        "SIDEWAYS"
    ]



    signal_data = {


        "symbol": "XAUUSD",


        "price": price,


        "signal": random.choice(signals),


        "trend": random.choice(trends),


        "confidence": random.randint(70,95),


        "bot": "INTRADAY AI",


        "status": "ONLINE",


        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")


    }



    with open(
        "signal.json",
        "w",
        encoding="utf-8"
    ) as file:


        json.dump(
            signal_data,
            file,
            ensure_ascii=False,
            indent=4
        )



    print("======================")
    print("🤖 AI TRADING UPDATE")
    print("======================")

    print(signal_data)



    time.sleep(10)