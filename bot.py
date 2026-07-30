# =====================================
# GOLD SNIPER AI v4
#
# PURE CHoCH ENGINE
#
# M15 BIAS
# M5 CONFIRMATION
# M1 ENTRY
#
# PART 1/4
# =====================================


import MetaTrader5 as mt5
import pandas as pd
import json
import time

from datetime import datetime




# =====================================
# MT5 CONNECT
# =====================================


if not mt5.initialize():

    print("❌ MT5 connection failed")

    quit()


print("✅ MT5 Connected")





# =====================================
# SYMBOL
# =====================================


symbol = "XAUUSDm"



if not mt5.symbol_select(symbol, True):

    print("❌ Symbol select failed")

    quit()



print("✅ Symbol ready:", symbol)







# =====================================
# GET CANDLES
# =====================================


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







# =====================================
# CHoCH DETECTION
#
# MARKET STRUCTURE REVERSAL
# =====================================


def detect_choch(df):


    if df is None:

        return "WAIT"



    if len(df) < 30:

        return "WAIT"





    current = df.iloc[-1]




    recent_high = df["high"].iloc[-10:-1].max()


    recent_low = df["low"].iloc[-10:-1].min()



    previous_high = df["high"].iloc[-20:-10].max()


    previous_low = df["low"].iloc[-20:-10].min()






    # ==========================
    # BULLISH CHoCH
    # ==========================


    if (

        current["close"] > recent_high

        and

        previous_low < recent_low

    ):


        return "CHoCH UP"







    # ==========================
    # BEARISH CHoCH
    # ==========================


    if (

        current["close"] < recent_low

        and

        previous_high > recent_high

    ):


        return "CHoCH DOWN"





    return "WAIT"

    # =====================================
# PART 2/4
#
# MTF CHoCH ENGINE
#
# M15 BIAS
# M5 CONFIRMATION
# M1 ENTRY
# =====================================





# =====================================
# LAST M15 CHoCH STORAGE
# =====================================


last_m15_choch = "WAIT"








# =====================================
# FIND LAST CHoCH
#
# Latest structure change
# =====================================


def find_last_choch(df):


    if df is None:

        return "WAIT"





    # хамгийн сүүлийн 100 candle дотроос хайна

    for i in range(len(df)-1,30,-1):


        temp = df.iloc[:i+1]


        result = detect_choch(temp)



        if result != "WAIT":


            return result




    return "WAIT"









# =====================================
# M15 MARKET BIAS
#
# LAST CHoCH = TREND
# =====================================


def analyze_m15_choch():


    global last_m15_choch



    m15 = get_candles(

        mt5.TIMEFRAME_M15,

        300

    )



    if m15 is None:

        return "WAIT"





    choch = find_last_choch(m15)





    if choch != "WAIT":


        last_m15_choch = choch







    if last_m15_choch == "CHoCH UP":


        return "BULLISH"





    elif last_m15_choch == "CHoCH DOWN":


        return "BEARISH"





    return "WAIT"









# =====================================
# M5 CHoCH CONFIRMATION
# =====================================


def analyze_m5_choch():


    m5 = get_candles(

        mt5.TIMEFRAME_M5,

        200

    )



    if m5 is None:

        return "WAIT"





    choch = detect_choch(m5)





    if choch == "CHoCH UP":


        return "BULLISH"





    elif choch == "CHoCH DOWN":


        return "BEARISH"





    return "WAIT"









# =====================================
# M1 CHoCH ENTRY
# =====================================


def analyze_m1_choch():


    m1 = get_candles(

        mt5.TIMEFRAME_M1,

        200

    )



    if m1 is None:

        return "WAIT"





    choch = detect_choch(m1)





    if choch == "CHoCH UP":


        return "BULLISH"





    elif choch == "CHoCH DOWN":


        return "BEARISH"





    return "WAIT"

    # =====================================
# PART 3/4
#
# PURE CHoCH CONFLUENCE ENGINE
#
# M15 + M5 + M1
# =====================================







# =====================================
# LIQUIDITY STATUS
#
# CHoCH BASED
# =====================================


def analyze_liquidity(
    
    m15,
    m5,
    m1

):


    if (

        m15 == "BULLISH"

        and

        m5 == "BULLISH"

        and

        m1 == "BULLISH"

    ):


        return "ACTIVE BUY LIQUIDITY"





    elif (

        m15 == "BEARISH"

        and

        m5 == "BEARISH"

        and

        m1 == "BEARISH"

    ):


        return "ACTIVE SELL LIQUIDITY"





    elif m15 == "BULLISH":


        return "BUY SIDE WATCH"





    elif m15 == "BEARISH":


        return "SELL SIDE WATCH"





    return "WAIT"









# =====================================
# AI CHoCH ANALYSIS
#
# FINAL DECISION
# =====================================


def analyze_ai():



    # ==========================
    # GET TIMEFRAME DATA
    # ==========================


    m15 = analyze_m15_choch()


    m5 = analyze_m5_choch()


    m1 = analyze_m1_choch()






    signal = "WAIT"


    confidence = 0






    # ==========================
    # BUY CONDITION
    # ==========================


    if (

        m15 == "BULLISH"

        and

        m5 == "BULLISH"

        and

        m1 == "BULLISH"

    ):


        signal = "BUY"


        confidence = 100







    # ==========================
    # SELL CONDITION
    # ==========================


    elif (

        m15 == "BEARISH"

        and

        m5 == "BEARISH"

        and

        m1 == "BEARISH"

    ):


        signal = "SELL"


        confidence = 100







    # ==========================
    # PARTIAL CONFIRMATION
    # ==========================


    else:



        score = 0





        if m15 != "WAIT":


            score += 40





        if m5 != "WAIT":


            score += 30





        if m1 != "WAIT":


            score += 30






        confidence = score







    # ==========================
    # LIQUIDITY
    # ==========================


    liquidity = analyze_liquidity(

        m15,

        m5,

        m1

    )







    return {


        "signal":signal,


        "confidence":confidence,



        "trend":m15,



        "m15_choch":m15,


        "m5_choch":m5,


        "m1_choch":m1,



        "liquidity":liquidity



    }

    # =====================================
# PART 4/4
#
# WEBSITE JSON EXPORT ENGINE
#
# PURE CHoCH SIGNAL API
# =====================================





# =====================================
# MAIN LOOP
# =====================================


while True:



    tick = mt5.symbol_info_tick(symbol)



    if tick is None:


        print("❌ Price unavailable")


        time.sleep(5)


        continue






    # ==========================
    # REAL XAUUSD PRICE
    # ==========================


    price = tick.bid






    # ==========================
    # AI ANALYSIS
    # ==========================


    ai = analyze_ai()






    # ==========================
    # WEBSITE DATA
    # ==========================


    signal_data = {



        "symbol": symbol,



        "price": round(

            price,

            3

        ),



        "signal": ai["signal"],



        "confidence": ai["confidence"],




        "trend": ai["trend"],





        "m15_choch": ai["m15_choch"],



        "m5_choch": ai["m5_choch"],



        "m1_choch": ai["m1_choch"],





        "liquidity": ai["liquidity"],




        "ai_status": "ONLINE",




        "bot":

        "GOLD SNIPER AI v4",





        "time":

        datetime.now().strftime(

            "%Y-%m-%d %H:%M:%S"

        )



    }







    # ==========================
    # SAVE JSON
    # ==========================


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







    # ==========================
    # TERMINAL
    # ==========================


    print("==============================")

    print("🥇 GOLD SNIPER AI v4")

    print("==============================")


    print(

        "Signal:",

        ai["signal"]

    )


    print(

        "Price:",

        price

    )


    print(

        "Confidence:",

        ai["confidence"],

        "%"

    )


    print(

        "M15 CHoCH:",

        ai["m15_choch"]

    )


    print(

        "M5 CHoCH:",

        ai["m5_choch"]

    )


    print(

        "M1 CHoCH:",

        ai["m1_choch"]

    )


    print(

        "Liquidity:",

        ai["liquidity"]

    )


    print("==============================")





    time.sleep(10)
