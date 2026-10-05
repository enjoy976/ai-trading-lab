# =====================================
# GOLD SNIPER AI v4 (FIXED)
# M15 BIAS / M5 CONFIRMATION / M1 ENTRY
# =====================================

import MetaTrader5 as mt5
import pandas as pd
import json
import time
from datetime import datetime

# Website руу илгээх бол URL-аа бич. Хоосон бол илгээхгүй.
UPLOAD_URL = ""
UPLOAD_TOKEN = "YOUR_SECRET"

SYMBOL = "XAUUSDm"
SWING_N = 3


# =====================================
# MT5 CONNECT
# =====================================

if not mt5.initialize():
    print("❌ MT5 connection failed")
    quit()

print("✅ MT5 Connected")

symbol = SYMBOL

if not mt5.symbol_select(symbol, True):
    print("❌ Symbol select failed")
    quit()

print("✅ Symbol ready:", symbol)


# =====================================
# GET CANDLES
# =====================================

def get_candles(timeframe, count=300):
    rates = mt5.copy_rates_from_pos(symbol, timeframe, 0, count)
    if rates is None or len(rates) == 0:
        return None
    return pd.DataFrame(rates)


# =====================================
# MARKET STRUCTURE
# Swing high/low-г close-оор эвдсэн чиглэл = тренд
# Зөвхөн хаагдсан свеч ашиглана
# =====================================

def structure(df, n=SWING_N):
    if df is None or len(df) < 50:
        return "WAIT"

    df = df.iloc[:-1].reset_index(drop=True)   # хаагдаагүй свечийг хасна

    hi = df["high"].to_numpy()
    lo = df["low"].to_numpy()
    cl = df["close"].to_numpy()

    trend = "WAIT"
    sh = None
    sl = None

    for i in range(2 * n, len(df)):
        p = i - n

        if hi[p] == hi[p - n:p + n + 1].max():
            sh = hi[p]

        if lo[p] == lo[p - n:p + n + 1].min():
            sl = lo[p]

        if sh is not None and cl[i] > sh:
            trend = "BULLISH"
            sh = None
        elif sl is not None and cl[i] < sl:
            trend = "BEARISH"
            sl = None

    return trend


def analyze_m15_choch():
    return structure(get_candles(mt5.TIMEFRAME_M15, 300))


def analyze_m5_choch():
    return structure(get_candles(mt5.TIMEFRAME_M5, 300))


def analyze_m1_choch():
    return structure(get_candles(mt5.TIMEFRAME_M1, 300))


# =====================================
# LIQUIDITY STATUS
# =====================================

def analyze_liquidity(m15, m5, m1):
    if m15 == "BULLISH" and m5 == "BULLISH" and m1 == "BULLISH":
        return "ACTIVE BUY LIQUIDITY"
    elif m15 == "BEARISH" and m5 == "BEARISH" and m1 == "BEARISH":
        return "ACTIVE SELL LIQUIDITY"
    elif m15 == "BULLISH":
        return "BUY SIDE WATCH"
    elif m15 == "BEARISH":
        return "SELL SIDE WATCH"
    return "WAIT"


# =====================================
# AI ANALYSIS
# =====================================

def analyze_ai():
    m15 = analyze_m15_choch()
    m5 = analyze_m5_choch()
    m1 = analyze_m1_choch()

    signal = "WAIT"

    if m15 == "BULLISH" and m5 == "BULLISH" and m1 == "BULLISH":
        signal = "BUY"
        confidence = 100
    elif m15 == "BEARISH" and m5 == "BEARISH" and m1 == "BEARISH":
        signal = "SELL"
        confidence = 100
    else:
        confidence = 0
        if m15 != "WAIT":
            confidence += 40
            if m5 == m15:
                confidence += 30
            if m1 == m15:
                confidence += 30

    liquidity = analyze_liquidity(m15, m5, m1)

    return {
        "signal": signal,
        "confidence": confidence,
        "trend": m15,
        "m15_choch": m15,
        "m5_choch": m5,
        "m1_choch": m1,
        "liquidity": liquidity,
    }


# =====================================
# UPLOAD (optional)
# =====================================

def upload(data):
    if not UPLOAD_URL:
        return
    try:
        import requests
        requests.post(
            UPLOAD_URL,
            json=data,
            headers={"Authorization": "Bearer " + UPLOAD_TOKEN},
            timeout=5,
        )
    except Exception as e:
        print("⚠️ Upload failed:", e)


# =====================================
# MAIN LOOP
# =====================================

last_tick_time = 0
last_tick_change = time.time()

while True:

    tick = mt5.symbol_info_tick(symbol)

    if tick is None:
        print("❌ Price unavailable")
        time.sleep(5)
        continue

    # Stale tick шалгалт (зах зээл хаалттай үед)
    if tick.time != last_tick_time:
        last_tick_time = tick.time
        last_tick_change = time.time()
    elif time.time() - last_tick_change > 120:
        print("⚠️ Stale tick - market closed?")
        time.sleep(10)
        continue

    price = tick.bid

    ai = analyze_ai()

    signal_data = {
        "symbol": symbol,
        "price": round(price, 3),
        "signal": ai["signal"],
        "confidence": ai["confidence"],
        "trend": ai["trend"],
        "m15_choch": ai["m15_choch"],
        "m5_choch": ai["m5_choch"],
        "m1_choch": ai["m1_choch"],
        "liquidity": ai["liquidity"],
        "ai_status": "ONLINE",
        "bot": "GOLD SNIPER AI v4",
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    with open("signal.json", "w", encoding="utf-8") as file:
        json.dump(signal_data, file, ensure_ascii=False, indent=4)

    upload(signal_data)

    print("==============================")
    print("🥇 GOLD SNIPER AI v4")
    print("==============================")
    print("Signal:", ai["signal"])
    print("Price:", price)
    print("Confidence:", ai["confidence"], "%")
    print("M15:", ai["m15_choch"])
    print("M5:", ai["m5_choch"])
    print("M1:", ai["m1_choch"])
    print("Liquidity:", ai["liquidity"])
    print("==============================")

    time.sleep(10)
