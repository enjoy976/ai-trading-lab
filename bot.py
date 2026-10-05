# =====================================
# GOLD SNIPER AI v4 (FIXED)
# H4 BIAS / H1 / M15 / M5 ENTRY
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


def analyze_h4():
    return structure(get_candles(mt5.TIMEFRAME_H4, 300))


def analyze_h1():
    return structure(get_candles(mt5.TIMEFRAME_H1, 300))


def analyze_m15():
    return structure(get_candles(mt5.TIMEFRAME_M15, 300))


def analyze_m5():
    return structure(get_candles(mt5.TIMEFRAME_M5, 300))


# =====================================
# LIQUIDITY STATUS
# =====================================

def analyze_liquidity(h4, h1, m15, m5):
    tfs = [h4, h1, m15, m5]
    if all(t == "BULLISH" for t in tfs):
        return "ACTIVE BUY LIQUIDITY"
    elif all(t == "BEARISH" for t in tfs):
        return "ACTIVE SELL LIQUIDITY"
    elif h4 == "BULLISH":
        return "BUY BIAS (хүлээж байна)"
    elif h4 == "BEARISH":
        return "SELL BIAS (хүлээж байна)"
    return "WAIT"


# =====================================
# AI ANALYSIS
# H4 40 + H1 30 + M15 20 + M5 10
# Зөвхөн H4-тэй ижил чиглэлтэй TF оноо авна
# =====================================

def analyze_ai():
    h4 = analyze_h4()
    h1 = analyze_h1()
    m15 = analyze_m15()
    m5 = analyze_m5()

    signal = "WAIT"
    confidence = 0

    if h4 != "WAIT":
        confidence = 40
        if h1 == h4:
            confidence += 30
        if m15 == h4:
            confidence += 20
        if m5 == h4:
            confidence += 10

    if confidence == 100:
        signal = "BUY" if h4 == "BULLISH" else "SELL"

    return {
        "signal": signal,
        "confidence": confidence,
        "trend": h4,
        "h4_choch": h4,
        "h1_choch": h1,
        "m15_choch": m15,
        "m5_choch": m5,
        "liquidity": analyze_liquidity(h4, h1, m15, m5),
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
        "h4_choch": ai["h4_choch"],
        "h1_choch": ai["h1_choch"],
        "m15_choch": ai["m15_choch"],
        "m5_choch": ai["m5_choch"],
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
    print("H4:", ai["h4_choch"])
    print("H1:", ai["h1_choch"])
    print("M15:", ai["m15_choch"])
    print("M5:", ai["m5_choch"])
    print("Liquidity:", ai["liquidity"])
    print("==============================")

    time.sleep(10)
