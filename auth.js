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



const email = document.getElementById("signupEmail").value;


const password = document.getElementById("signupPassword").value;





const {data,error} = await supabaseClient.auth.signUp({


email:email,


password:password


});






if(error){


document.getElementById("signupResult").innerHTML =


"❌ ERROR: " + error.message;


return;


}







document.getElementById("signupResult").innerHTML =


`

🟢 ACCOUNT CREATED

<br><br>

Бүртгэл амжилттай үүслээ.

<br><br>

📩 Имэйл хаягаа шалгаад

<br>

<strong>Confirm Email</strong>

линк дээр дарна уу.

<br><br>

Дараа нь Login хийнэ үү.


`;



}









// ===============================
// LOGIN
// ===============================


async function loginUser(){



const email = document.getElementById("loginEmail").value;


const password = document.getElementById("loginPassword").value;







const {data,error} = await supabaseClient.auth.signInWithPassword({



email:email,



password:password



});







if(error){



document.getElementById("loginResult").innerHTML =



"❌ LOGIN FAILED: " + error.message;



return;


}









// CHECK EMAIL CONFIRM



if(!data.user.email_confirmed_at){



await supabaseClient.auth.signOut();



document.getElementById("loginResult").innerHTML =



`

⚠️ EMAIL NOT CONFIRMED

<br><br>

📩 Эхлээд email баталгаажуулна уу.

<br><br>

Confirm Email линкээ шалгана уу.


`;



return;



}









document.getElementById("loginResult").innerHTML =



`

🟢 ACCESS GRANTED

<br><br>

Welcome:

<br>

${data.user.email}

<br><br>

Opening Dashboard...


`;







setTimeout(()=>{


window.location.href="dashboard.html";


},1000);





}











// ===============================
// LOGOUT
// ===============================


async function logoutUser(){



await supabaseClient.auth.signOut();



window.location.href="login.html";



}
