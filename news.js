// =================================
// GOLD SNIPER NEWS SYSTEM
// =================================


const newsContainer = document.getElementById("news-container");


// DEMO NEWS DATA
// Дараа нь API холбоно

const newsData = [

{
country:"🇺🇸 USD",
impact:"🔴 HIGH IMPACT",
title:"CPI Inflation Data",
time:"20:30 UB",
gold:"🔥 VERY HIGH"
},


{
country:"🇺🇸 USD",
impact:"🟠 MEDIUM IMPACT",
title:"FOMC Member Speech",
time:"22:00 UB",
gold:"⚠️ MEDIUM"
},


{
country:"🇺🇸 USD",
impact:"🟢 LOW IMPACT",
title:"Economic Report",
time:"15:00 UB",
gold:"LOW"
}


];





function loadNews(){


newsContainer.innerHTML="";



newsData.forEach(news => {


const card = document.createElement("div");


card.className="price-card";



card.innerHTML=`

<h3>

${news.impact}

</h3>


<p>

${news.country}

<br><br>


📊 <b>${news.title}</b>


<br><br>


⏰ ${news.time}


<br><br>


🥇 Gold Impact:

<br>


<b>

${news.gold}

</b>


</p>


`;



newsContainer.appendChild(card);



});


}




loadNews();
