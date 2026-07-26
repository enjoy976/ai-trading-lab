@echo off
title AI Trading Lab START

echo ============================
echo   AI TRADING LAB STARTING
echo ============================

echo.
echo Starting Python Bot...

start "AI BOT" cmd /k "cd /d %USERPROFILE%\Desktop\my_website && python bot.py"


timeout /t 3


echo.
echo Starting Website Server...

start "WEBSITE SERVER" cmd /k "cd /d %USERPROFILE%\Desktop\my_website && python -m http.server 8000"


timeout /t 3


echo.
echo Starting Ngrok...

start "NGROK PUBLIC LINK" cmd /k "ngrok http 8000"


echo.
echo ============================
echo ALL SYSTEMS STARTED
echo ============================

pause