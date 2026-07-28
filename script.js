// ===============================
// SUPABASE CONFIG
// ===============================


const SUPABASE_URL = "https://xkxcprkzubjwfglcrivg.supabase.co";


const SUPABASE_KEY = "sb_publishable_7rRB4Trj5OfjENqzvpu_YQ_otz11jrh";



const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);







// ===============================
// SIGN UP
// ===============================


async function signupUser(){



const email = 
document.getElementById("signupEmail").value;



const password =
document.getElementById("signupPassword").value;





const {error} = await supabaseClient.auth.signUp({


email:email,


password:password


});






if(error){


document.getElementById("result").innerHTML = `


<h2>❌ SIGN UP ERROR</h2>


<p>

${error.message}

</p>


`;


return;


}







document.getElementById("result").innerHTML = `


<h2>📩 EMAIL VERIFICATION REQUIRED</h2>


<hr>


<p>


Бүртгэл амжилттай үүслээ.


<br><br>


Таны email хаяг руу баталгаажуулах линк илгээгдлээ.


<br><br>


📬 Mail inbox-оо шалгаад

<br>

<strong>Confirm Email</strong>

товчийг дарна уу.


</p>


`;



}









// ===============================
// LOGIN
// ===============================



async function loginUser(){



const email =

document.getElementById("loginEmail").value;




const password =

document.getElementById("loginPassword").value;






const {data,error} = await supabaseClient.auth.signInWithPassword({


email:email,


password:password


});






if(error){



document.getElementById("result").innerHTML = `



<h2>❌ LOGIN FAILED</h2>


<p>

${error.message}

</p>



`;



return;


}








document.getElementById("result").innerHTML = `



<h2>🟢 SYSTEM ACCESS GRANTED</h2>



<hr>



<p>


User:


<br>


<b>${data.user.email}</b>


<br><br>


Status:


🟢 ONLINE



</p>




<br>


<button onclick="window.location.href='dashboard.html'">

ENTER DASHBOARD

</button>




`;



}









// ===============================
// XAUUSD API FUNCTION
// ===============================



async function loadSignal(){



try{


const response = await fetch(


"https://disposal-exorcist-silly.ngrok-free.dev/signal?_=" + Date.now(),


{


method:"GET",


mode:"cors",


cache:"no-store"


}


);





if(!response.ok){


throw new Error(

"HTTP ERROR: " + response.status

);


}





const data = await response.json();



return data;




}



catch(error){



console.log(error);



return null;



}



}
