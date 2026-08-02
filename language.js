// ==========================================
// MORNING STAR - LANGUAGE SYSTEM
// Монгол 🇲🇳 / English 🇺🇸
// ==========================================

const translations = {

    mn: {
        logout: "ГАРАХ",
        dashboard_title: "🤖 MORNING STAR GOLD SNIPER ZONE",
        dashboard_subtitle: "Арилжааны системийн терминалын хяналтын самбар",
        system_active: "🟢 СИСТЕМ ИДЭВХТЭЙ",

        user_account: "👤 ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ",
        email: "И-мэйл",
        status: "Төлөв",
        active: "🟢 Идэвхтэй",

        xauusd_live_market: "🥇 XAUUSD LIVE ЗАХ ЗЭЭЛ",
        gold: "GOLD",
        loading: "Ачааллаж байна...",
        checking: "Шалгаж байна...",
        live_gold_price: "Алтны зах зээлийн бодит үнэ",

        xauusd_direction: "🥇 XAUUSD ЗАХ ЗЭЭЛИЙН ЧИГЛЭЛ",
        analysis_loading: "⏳ Шинжилгээ ачааллаж байна...",

        live_chart: "📈 XAUUSD БОДИТ ЦАГИЙН ГРАФИК",

        forex_pairs: "FOREX ХОСЛОЛ",
        live_market_movement: "ЗАХ ЗЭЭЛИЙН ҮНИЙН БОДИТ ХӨДӨЛГӨӨН",

        crypto_scanner: "КРИПТО СКАННЕР",
        monitor: "ХЯНАХ",

        telegram_signal: "TELEGRAM ДОХИО",
        swing_intraday: "SWING & INTRADAY ДОХИО",

        market_sentiment: "ЗАХ ЗЭЭЛИЙН ЧИГ ХАНДЛАГА",
        xauusd_sentiment: "XAUUSD, Зах зээлийн хандлага, Итгэлцлийн шинжилгээ",

        risk_calculator: "ЭРСДЭЛИЙН ТООЦООЛУУР",
        lot_risk: "Lot Size & Эрсдэлийн удирдлага",

        forex: "FOREX",
        trading_education: "АРИЛЖААНЫ БОЛОВСРОЛ",

        news_market: "МЭДЭЭНИЙ ЗАХ ЗЭЭЛ",
        economic_news: "Эдийн засгийн мэдээ ба зах зээлийн шинжилгээ",

        market_sessions: "ЗАХ ЗЭЭЛИЙН СЕССҮҮД",
        global_sessions: "Дэлхийн арилжааны сессийн хяналт",

        trading_academy: "TRADING ACADEMY",
        trading_strategy: "Арилжааны боловсрол ба стратеги",

        system_status: "🚀 ТӨЛӨВ БАЙДАЛ",
        mt5_connection: "MT5 Холболт",
        signal: "ДОХИО",
        ready: "🟢 БЭЛЭН",
        market_scanner: "Зах зээлийн сканнер",
        active_status: "🟢 ИДЭВХТЭЙ",
        gold_price: "Алтны үнэ",
        live_data: "🟢 БОДИТ МЭДЭЭЛЭЛ",

        contact_admin: "📱 Админтай холбогдох"
    },

    en: {
        logout: "LOGOUT",
        dashboard_title: "🤖 MORNING STAR GOLD SNIPER ZONE",
        dashboard_subtitle: "Trading System Terminal Dashboard",
        system_active: "🟢 SYSTEM ACTIVE",

        user_account: "👤 USER ACCOUNT",
        email: "Email",
        status: "Status",
        active: "🟢 Active",

        xauusd_live_market: "🥇 XAUUSD LIVE MARKET",
        gold: "GOLD",
        loading: "Loading...",
        checking: "Checking...",
        live_gold_price: "Live Gold Market Price",

        xauusd_direction: "🥇 XAUUSD MARKET DIRECTION",
        analysis_loading: "⏳ Loading market analysis...",

        live_chart: "📈 XAUUSD LIVE CHART",

        forex_pairs: "FOREX PAIRS",
        live_market_movement: "LIVE MARKET PRICE MOVEMENT",

        crypto_scanner: "CRYPTO SCANNER",
        monitor: "MONITOR",

        telegram_signal: "TELEGRAM SIGNAL",
        swing_intraday: "SWING & INTRADAY SIGNALS",

        market_sentiment: "MARKET SENTIMENT",
        xauusd_sentiment: "XAUUSD, Market Sentiment, Confidence Analysis",

        risk_calculator: "RISK CALCULATOR",
        lot_risk: "Lot Size & Risk Management",

        forex: "FOREX",
        trading_education: "TRADING EDUCATION",

        news_market: "NEWS MARKET",
        economic_news: "Economic News & Market Analysis",

        market_sessions: "MARKET SESSIONS",
        global_sessions: "Global Trading Session Monitor",

        trading_academy: "TRADING ACADEMY",
        trading_strategy: "Trading Education & Strategy",

        system_status: "🚀 SYSTEM STATUS",
        mt5_connection: "MT5 Connection",
        signal: "SIGNAL",
        ready: "🟢 READY",
        market_scanner: "Market Scanner",
        active_status: "🟢 ACTIVE",
        gold_price: "Gold Price",
        live_data: "🟢 LIVE DATA",

        contact_admin: "📱 Contact Admin"
    }
};


// ==========================================
// CURRENT LANGUAGE
// ==========================================

let currentLanguage =
    localStorage.getItem("morningStarLanguage") || "mn";


// ==========================================
// CHANGE LANGUAGE
// ==========================================

function setLanguage(language) {

    if (!translations[language]) {
        return;
    }

    currentLanguage = language;

    localStorage.setItem(
        "morningStarLanguage",
        language
    );

    applyLanguage();

}


// ==========================================
// APPLY TRANSLATIONS
// ==========================================

function applyLanguage() {

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.getAttribute("data-i18n");

            if (
                translations[currentLanguage] &&
                translations[currentLanguage][key]
            ) {

                element.innerHTML =
                    translations[currentLanguage][key];

            }

        });


    // Update HTML language

    document.documentElement.lang =
        currentLanguage === "mn"
            ? "mn"
            : "en";


    // Update language buttons

    document
        .querySelectorAll("[data-language]")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.getAttribute("data-language")
                === currentLanguage
            ) {

                button.classList.add("active");

            }

        });

}


// ==========================================
// AUTO APPLY WHEN PAGE LOADS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        applyLanguage();

    }
);
