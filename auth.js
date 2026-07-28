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

email: email,

password: password

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

Имэйл баталгаажуулалтаа шалгана уу..

`;



}







// ===============================
// LOGIN
// ===============================

async function loginUser(){



const email = document.getElementById("loginEmail").value;


const password = document.getElementById("loginPassword").value;




const {data,error} = await supabaseClient.auth.signInWithPassword({

email: email,

password: password

});





if(error){


document.getElementById("loginResult").innerHTML =

"❌ LOGIN FAILED: " + error.message;


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

Redirecting...

`;




setTimeout(()=>{

window.location.href="index.html";

},2000);



}
