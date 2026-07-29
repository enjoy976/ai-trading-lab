import MetaTrader5 as mt5
import json
import time
from datetime import datetime
import pandas as pd



# ===============================
# MT5 CONNECT
# ===============================

if not mt5.initialize():

    print("❌ MT5 connection failed")
    quit()


print("✅ MT5 Connected")



# ===============================
# SYMBOL
# ===============================

symbol = "XAUUSDm"



if not mt5.symbol_select(symbol, True):

    print("❌ Symbol select failed:", symbol)
    quit()


print("✅ Symbol ready:", symbol)





# ===============================
# INDICATORS
# ===============================


def get_candles(timeframe, count=200):


    rates = mt5.copy_rates_from_pos(

        symbol,

        timeframe,

        0,

        count

    )


    if rates is None:

        return None


    df = pd.DataFrame(rates)


    return df





def calculate_ema(series, period):

    return series.ewm(

        span=period,

        adjust=False

    ).mean()





def calculate_rsi(series, period=14):


    delta = series.diff()


    gain = delta.clip(lower=0)

    loss = -delta.clip(upper=0)



    avg_gain = gain.rolling(period).mean()

    avg_loss = loss.rolling(period).mean()



    rs = avg_gain / avg_loss



    rsi = 100 - (100 / (1 + rs))


    return rsi





# ===============================
# AI ANALYSIS
# ===============================


def analyze_market():


    confidence = 0


    trend = "SIDEWAYS"


    momentum = "NEUTRAL"


    liquidity = "WAIT"



    # -------- M15 TREND --------


    m15 = get_candles(

        mt5.TIMEFRAME_M15,

        200

    )



    if m15 is None:

        return trend, confidence, momentum, liquidity



    m15["EMA50"] = calculate_ema(

        m15["close"],

        50

    )


    m15["EMA200"] = calculate_ema(

        m15["close"],

        200

    )



    last15 = m15.iloc[-1]




    if last15["EMA50"] > last15["EMA200"]:


        trend = "BULLISH"

        confidence += 40



    elif last15["EMA50"] < last15["EMA200"]:


        trend = "BEARISH"

        confidence += 40




    # -------- M5 MOMENTUM --------



    m5 = get_candles(

        mt5.TIMEFRAME_M5,

        100

    )



    if m5 is None:

        return trend, confidence, momentum, liquidity



    m5["EMA20"] = calculate_ema(

        m5["close"],

        20

    )



    m5["RSI"] = calculate_rsi(

        m5["close"]

    )



    last5 = m5.iloc[-1]





    if last5["close"] > last5["EMA20"]:


        momentum = "POSITIVE"

        confidence += 30



    elif last5["close"] < last5["EMA20"]:


        momentum = "NEGATIVE"

        confidence += 30





    # -------- RSI --------



    rsi = last5["RSI"]



    if rsi > 55:


        confidence += 30



    elif rsi < 45:


        confidence += 30





    # -------- LIQUIDITY --------



    if trend == "BULLISH" and momentum == "POSITIVE":


        liquidity = "BUY SIDE"



    elif trend == "BEARISH" and momentum == "NEGATIVE":


        liquidity = "SELL SIDE"




    return trend, min(confidence,100), momentum, liquidity






# ===============================
# MAIN LOOP
# ===============================


while True:



    tick = mt5.symbol_info_tick(symbol)



    if tick is None:


        print("❌ No tick data")

        time.sleep(5)

        continue





    price = tick.bid





    trend, confidence, momentum, liquidity = analyze_market()





    # SIGNAL


    if trend == "BULLISH" and momentum == "POSITIVE" and confidence >= 70:


        signal = "BUY"



    elif trend == "BEARISH" and momentum == "NEGATIVE" and confidence >= 70:


        signal = "SELL"



    else:


        signal = "WAIT"






    signal_data = {


        "symbol": symbol,


        "price": round(price,3),


        "signal": signal,


        "trend": trend,


        "confidence": confidence,


        "momentum": momentum,


        "liquidity": liquidity,


        "bot": "MT5 AI M15+M5",


        "status": "ONLINE",


        "time": datetime.now().strftime(

            "%Y-%m-%d %H:%M:%S"

        )


    }






    # SAVE JSON


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

    print("🤖 MT5 AI UPDATE")

    print(signal_data)

    print("======================")





    time.sleep(10)
