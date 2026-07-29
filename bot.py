import MetaTrader5 as mt5
import json
import time
from datetime import datetime
import pandas as pd



# =====================================
# GOLD SNIPER AI v2
# MT5 SMC ENGINE
# PART 1/4
# =====================================



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
# GET MARKET DATA
# ===============================


def get_candles(timeframe, count=300):


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







# ===============================
# EMA
# ===============================


def calculate_ema(series, period):


    return series.ewm(

        span=period,

        adjust=False

    ).mean()







# ===============================
# RSI
# ===============================


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
# ATR VOLATILITY
# ===============================


def calculate_atr(df, period=14):


    high_low = df["high"] - df["low"]


    high_close = abs(

        df["high"] - df["close"].shift()

    )


    low_close = abs(

        df["low"] - df["close"].shift()

    )



    ranges = pd.concat(

        [

            high_low,

            high_close,

            low_close

        ],

        axis=1

    )



    true_range = ranges.max(axis=1)



    atr = true_range.rolling(period).mean()



    return atr

    # =====================================
# AI MARKET STRUCTURE ENGINE
# PART 2/4
# =====================================



# ===============================
# H1 BIAS
# ===============================


def analyze_h1_bias():


    h1 = get_candles(

        mt5.TIMEFRAME_H1,

        300

    )


    if h1 is None:

        return "UNKNOWN"



    h1["EMA50"] = calculate_ema(

        h1["close"],

        50

    )


    h1["EMA200"] = calculate_ema(

        h1["close"],

        200

    )



    last = h1.iloc[-1]



    if last["EMA50"] > last["EMA200"]:


        return "BULLISH"



    elif last["EMA50"] < last["EMA200"]:


        return "BEARISH"



    return "SIDEWAYS"








# ===============================
# M15 TREND
# ===============================


def analyze_m15_trend():


    m15 = get_candles(

        mt5.TIMEFRAME_M15,

        300

    )



    if m15 is None:

        return "UNKNOWN"




    m15["EMA50"] = calculate_ema(

        m15["close"],

        50

    )


    m15["EMA200"] = calculate_ema(

        m15["close"],

        200

    )



    last = m15.iloc[-1]





    if last["EMA50"] > last["EMA200"]:


        return "BULLISH"



    elif last["EMA50"] < last["EMA200"]:


        return "BEARISH"



    return "SIDEWAYS"









# ===============================
# M5 MOMENTUM
# ===============================


def analyze_m5_momentum():


    m5 = get_candles(

        mt5.TIMEFRAME_M5,

        200

    )



    if m5 is None:

        return "NEUTRAL",0




    m5["EMA20"] = calculate_ema(

        m5["close"],

        20

    )



    m5["RSI"] = calculate_rsi(

        m5["close"]

    )



    last = m5.iloc[-1]



    score = 0



    if last["close"] > last["EMA20"]:


        score += 20



    elif last["close"] < last["EMA20"]:


        score -= 20






    if last["RSI"] > 55:


        score += 20



    elif last["RSI"] < 45:


        score -= 20






    if score > 0:


        return "POSITIVE", score



    elif score < 0:


        return "NEGATIVE", score



    return "NEUTRAL", score










# ===============================
# MARKET STRUCTURE
# BOS / CHoCH
# ===============================


def analyze_structure():


    m5 = get_candles(

        mt5.TIMEFRAME_M5,

        100

    )



    if m5 is None:

        return "NONE"




    current = m5.iloc[-1]


    previous = m5.iloc[-2]





    if current["high"] > previous["high"] and current["close"] > previous["close"]:


        return "BOS UP"





    elif current["low"] < previous["low"] and current["close"] < previous["close"]:


        return "BOS DOWN"





    return "RANGE"

    # =====================================
# AI SCORING ENGINE
# PART 3/4
# =====================================



# ===============================
# LIQUIDITY ANALYSIS
# ===============================


def analyze_liquidity(trend, momentum, structure):


    if trend == "BULLISH" and momentum == "POSITIVE":


        return "BUY SIDE"



    elif trend == "BEARISH" and momentum == "NEGATIVE":


        return "SELL SIDE"



    elif structure == "BOS UP":


        return "BUY SIDE"



    elif structure == "BOS DOWN":


        return "SELL SIDE"



    return "WAIT"








# ===============================
# AI MARKET SCORE
# ===============================


def analyze_ai():


    score = 0



    # -------------------------
    # H1 BIAS
    # -------------------------


    h1 = analyze_h1_bias()



    if h1 == "BULLISH":


        score += 25



    elif h1 == "BEARISH":


        score -= 25






    # -------------------------
    # M15 TREND
    # -------------------------


    m15 = analyze_m15_trend()



    if m15 == "BULLISH":


        score += 25



    elif m15 == "BEARISH":


        score -= 25






    # -------------------------
    # M5 MOMENTUM
    # -------------------------


    momentum, momentum_score = analyze_m5_momentum()



    score += momentum_score






    # -------------------------
    # STRUCTURE
    # -------------------------


    structure = analyze_structure()



    if structure == "BOS UP":


        score += 15



    elif structure == "BOS DOWN":


        score -= 15






    # -------------------------
    # FINAL
    # -------------------------


    liquidity = analyze_liquidity(

        h1,

        momentum,

        structure

    )





    confidence = abs(score)



    if score >= 60:


        signal = "BUY"



    elif score <= -60:


        signal = "SELL"



    else:


        signal = "WAIT"







    # Risk calculation


    if confidence >= 80:


        risk = "LOW"



    elif confidence >= 50:


        risk = "MEDIUM"



    else:


        risk = "HIGH"







    return {


        "signal": signal,


        "confidence": min(confidence,100),


        "h1_bias": h1,


        "m15_trend": m15,


        "momentum": momentum,


        "structure": structure,


        "liquidity": liquidity,


        "risk": risk


    }

    # =====================================
# MAIN LOOP
# PART 4/4
# =====================================



while True:


    tick = mt5.symbol_info_tick(symbol)



    if tick is None:


        print("❌ No tick data")

        time.sleep(5)

        continue





    # ===============================
    # REAL PRICE
    # ===============================


    price = tick.bid





    # ===============================
    # AI ANALYSIS
    # ===============================


    ai = analyze_ai()






    signal_data = {



        "symbol": symbol,



        "price": round(price,3),



        "signal": ai["signal"],



        "confidence": ai["confidence"],



        "trend": ai["m15_trend"],



        "h1_bias": ai["h1_bias"],



        "momentum": ai["momentum"],



        "structure": ai["structure"],



        "liquidity": ai["liquidity"],



        "risk": ai["risk"],



        "bot": "GOLD SNIPER AI v2",



        "status": "ONLINE",



        "time": datetime.now().strftime(

            "%Y-%m-%d %H:%M:%S"

        )



    }







    # ===============================
    # SAVE JSON
    # ===============================


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







    # ===============================
    # TERMINAL DISPLAY
    # ===============================


    print("==============================")

    print("🥇 GOLD SNIPER AI UPDATE")

    print("==============================")


    print(

        "Signal:",

        signal_data["signal"]

    )


    print(

        "Price:",

        signal_data["price"]

    )


    print(

        "Confidence:",

        signal_data["confidence"],

        "%"

    )


    print(

        "H1:",

        signal_data["h1_bias"]

    )


    print(

        "M15:",

        signal_data["trend"]

    )


    print(

        "Momentum:",

        signal_data["momentum"]

    )


    print(

        "Structure:",

        signal_data["structure"]

    )


    print(

        "Liquidity:",

        signal_data["liquidity"]

    )


    print(

        "Risk:",

        signal_data["risk"]

    )


    print("==============================")





    time.sleep(10)
