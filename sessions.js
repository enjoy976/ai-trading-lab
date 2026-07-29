// =====================================
// GOLD SNIPER MARKET SESSIONS SYSTEM
// =====================================


// Ulaanbaatar Time + Forex Sessions


function updateSessions(){


const now = new Date();


// UTC time

const utc = now.getTime() + (now.getTimezoneOffset() * 60000);


// Ulaanbaatar UTC+8

const ubTime = new Date(utc + (8 * 60 * 60 * 1000));





// TIME DISPLAY


const hours = String(ubTime.getHours()).padStart(2,"0");

const minutes = String(ubTime.getMinutes()).padStart(2,"0");



document.getElementById("ub-time").innerHTML =

`🕒 ${hours}:${minutes} UB`;







// Convert UB time to decimal


const currentHour = ubTime.getHours() + ubTime.getMinutes()/60;







// SESSION TIMES (UB TIME)

// Sydney 05:00 - 14:00

const sydneyOpen = currentHour >= 5 && currentHour < 14;


// Tokyo 08:00 - 17:00

const tokyoOpen = currentHour >= 8 && currentHour < 17;


// London 16:00 - 01:00

const londonOpen = currentHour >= 16 || currentHour < 1;


// New York 21:00 - 06:00

const newYorkOpen = currentHour >= 21 || currentHour < 6;







// UPDATE STATUS


document.getElementById("sydney").innerHTML =

sydneyOpen ?

"🟢 OPEN<br><br>Pacific Session"

:

"🔴 CLOSED";





document.getElementById("tokyo").innerHTML =

tokyoOpen ?

"🟢 OPEN<br><br>Asian Session"

:

"🔴 CLOSED";






document.getElementById("london").innerHTML =

londonOpen ?

"🟢 OPEN<br><br>European Session"

:

"🔴 CLOSED";






document.getElementById("newyork").innerHTML =

newYorkOpen ?

"🟢 OPEN<br><br>US Session"

:

"🔴 CLOSED";








// ACTIVE SESSION


let active = [];



if(sydneyOpen)

active.push("🇦🇺 Sydney");



if(tokyoOpen)

active.push("🇯🇵 Tokyo");



if(londonOpen)

active.push("🇬🇧 London");



if(newYorkOpen)

active.push("🇺🇸 New York");







if(active.length > 0){


document.getElementById("active-session").innerHTML =

"🔥 " + active.join(" + ");


}

else{


document.getElementById("active-session").innerHTML =

"⏳ Market Closed";


}



}






// First load

updateSessions();


// Update every minute

setInterval(updateSessions,60000);
