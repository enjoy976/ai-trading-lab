# =====================================
# GOLD SNIPER AI v3
#
# PURE SMC MARKET ENGINE
#
# M15 CHoCH BIAS
# M5 MOMENTUM
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



if not mt5.symbol_select(symbol,True):

    print("❌ Symbol error")

    quit()



print("✅ Symbol:",symbol)







# =====================================
# GET MARKET DATA
# =====================================


def get_candles(timeframe,count=300):


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
# SMC STRUCTURE ENGINE
#
# BOS = CONTINUATION
# CHoCH = REVERSAL
# =====================================


def detect_structure(df,lookback=5):


    if df is None:

        return "NONE"



    if len(df) < lookback*3:

        return "NONE"





    last = df.iloc[-1]





    recent_high = df["high"].iloc[

        -lookback:-1

    ].max()



    recent_low = df["low"].iloc[

        -lookback:-1

    ].min()






    previous_high = df["high"].iloc[

        -lookback*2:-lookback

    ].max()



    previous_low = df["low"].iloc[

        -lookback*2:-lookback

    ].min()







    # =============================
    # CHoCH UP
    #
    # Bearish -> Bullish reversal
    # =============================


    if (

        last["close"] > recent_high

        and

        previous_low < recent_low

    ):


        return "CHoCH UP"







    # =============================
    # CHoCH DOWN
    #
    # Bullish -> Bearish reversal
    # =============================


    if (

        last["close"] < recent_low

        and

        previous_high > recent_high

    ):


        return "CHoCH DOWN"








    # =============================
    # BOS UP
    #
    # continuation
    # =============================


    if last["close"] > recent_high:


        return "BOS UP"








    # =============================
    # BOS DOWN
    #
    # continuation
    # =============================


    if last["close"] < recent_low:


        return "BOS DOWN"






    return "RANGE"

    # =====================================
# PART 2/4
#
# M15 BIAS ENGINE
# M5 MOMENTUM
# M1 ENTRY
# =====================================





# =====================================
# LAST CHoCH STORAGE
# =====================================


last_choch = {


    "M15":"NONE"


}







# =====================================
# FIND LAST CHoCH
# =====================================


def find_last_choch(df):


    if df is None:

        return "NONE"



    # хамгийн сүүлийн structure хайна

    for i in range(len(df)-1,30,-1):


        temp = df.iloc[:i+1]



        structure = detect_structure(temp)



        if structure == "CHoCH UP":


            return "CHoCH UP"




        elif structure == "CHoCH DOWN":


            return "CHoCH DOWN"




    return "NONE"









# =====================================
# M15 MARKET BIAS
#
# LAST CHoCH = TREND
# =====================================


def analyze_m15_bias():


    global last_choch



    m15 = get_candles(

        mt5.TIMEFRAME_M15,

        300

    )



    if m15 is None:

        return "WAIT"




    choch = find_last_choch(m15)





    if choch != "NONE":


        last_choch["M15"] = choch







    # ==========================
    # MARKET DIRECTION
    # ==========================


    if last_choch["M15"] == "CHoCH UP":


        return "BULLISH"




    elif last_choch["M15"] == "CHoCH DOWN":


        return "BEARISH"





    return "WAIT"









# =====================================
# M5 MOMENTUM
#
# BOS CONFIRMATION
# =====================================


def analyze_m5_momentum():


    m5 = get_candles(

        mt5.TIMEFRAME_M5,

        200

    )



    if m5 is None:

        return "WAIT"




    structure = detect_structure(m5)





    if structure == "BOS UP":


        return "BULLISH"




    elif structure == "BOS DOWN":


        return "BEARISH"





    elif structure == "CHoCH UP":


        return "BULLISH REVERSAL"




    elif structure == "CHoCH DOWN":


        return "BEARISH REVERSAL"





    return "WAIT"









# =====================================
# M1 ENTRY MOMENTUM
#
# FAST CONFIRMATION
# =====================================


def analyze_m1_momentum():


    m1 = get_candles(

        mt5.TIMEFRAME_M1,

        200

    )



    if m1 is None:

        return "WAIT"




    structure = detect_structure(m1)





    if structure == "BOS UP":


        return "BULLISH"




    elif structure == "BOS DOWN":


        return "BEARISH"





    elif structure == "CHoCH UP":


        return "BULLISH REVERSAL"




    elif structure == "CHoCH DOWN":


        return "BEARISH REVERSAL"





    return "WAIT"

    # =====================================
# PART 3/4
#
# AI CONFLUENCE ENGINE
#
# M15 CHoCH
# M5 BOS
# M1 BOS
# =====================================







# =====================================
# LIQUIDITY STATUS
# =====================================


def analyze_liquidity(m15,m5,m1):


    if (

        m15=="BULLISH"

        and

        m5=="BULLISH"

        and

        m1=="BULLISH"

    ):


        return "ACTIVE BUY LIQUIDITY"





    elif (

        m15=="BEARISH"

        and

        m5=="BEARISH"

        and

        m1=="BEARISH"

    ):


        return "ACTIVE SELL LIQUIDITY"





    return "WAIT"









# =====================================
# FINAL AI ANALYSIS
# =====================================


def analyze_ai():



    # ==========================
    # GET STRUCTURE
    # ==========================


    m15 = analyze_m15_bias()


    m5 = analyze_m5_momentum()


    m1 = analyze_m1_momentum()






    score = 0


    signal = "WAIT"







    # ==========================
    # BUY CONDITIONS
    # ==========================


    if (

        m15=="BULLISH"

        and

        m5=="BULLISH"

        and

        m1=="BULLISH"

    ):


        score = 100


        signal = "BUY"









    # ==========================
    # SELL CONDITIONS
    # ==========================


    elif (

        m15=="BEARISH"

        and

        m5=="BEARISH"

        and

        m1=="BEARISH"

    ):


        score = 100


        signal = "SELL"








    # ==========================
    # PARTIAL ALIGNMENT
    # ==========================


    else:



        if m15=="BULLISH":


            score += 40




        elif m15=="BEARISH":


            score += 40





        if m5=="BULLISH":


            score += 30




        elif m5=="BEARISH":


            score += 30






        if m1=="BULLISH":


            score += 30




        elif m1=="BEARISH":


            score += 30







    # ==========================
    # LIQUIDITY
    # ==========================


    liquidity = analyze_liquidity(

        m15,

        m5,

        m1

    )








    # ==========================
    # FINAL DATA
    # ==========================


    return {


        "signal":signal,


        "confidence":min(score,100),



        "trend":m15,


        "m15_bias":m15,


        "m5_momentum":m5,


        "m1_entry":m1,



        "liquidity":liquidity



    }

    # =====================================
# PART 4/4
#
# WEBSITE SIGNAL EXPORT ENGINE
#
# JSON OUTPUT
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
    # REAL PRICE
    # ==========================


    price = tick.bid






    # ==========================
    # AI ANALYSIS
    # ==========================


    ai = analyze_ai()






    # ==========================
    # WEBSITE JSON DATA
    # ==========================


    signal_data = {



        "symbol":symbol,



        "price":round(

            price,

            3

        ),



        "signal":ai["signal"],



        "confidence":ai["confidence"],





        "trend":ai["trend"],




        "m15_bias":ai["m15_bias"],



        "m5_momentum":ai["m5_momentum"],



        "m1_entry":ai["m1_entry"],




        "liquidity":ai["liquidity"],





        "ai_status":"ONLINE",





        "bot":

        "GOLD SNIPER AI v3",





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

    ) as f:



        json.dump(

            signal_data,

            f,

            ensure_ascii=False,

            indent=4

        )








    # ==========================
    # TERMINAL
    # ==========================


    print("==============================")

    print("🥇 GOLD SNIPER AI v3")

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

        "M15 Bias:",

        ai["m15_bias"]

    )


    print(

        "M5 Momentum:",

        ai["m5_momentum"]

    )


    print(

        "M1 Entry:",

        ai["m1_entry"]

    )


    print(

        "Liquidity:",

        ai["liquidity"]

    )


    print("==============================")





    time.sleep(10)
