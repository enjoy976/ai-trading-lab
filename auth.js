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


document.getElementById("signupResult").innerHTML =


"❌ ERROR: " + error.message;


return;


}







document.getElementById("signupResult").innerHTML =


`

🟢 ACCOUNT CREATED


<br><br>


Имэйл баталгаажуулалтаа шалгана уу.


<br><br>


📩 Confirm Email линк дээр дарсны дараа Login хийнэ үү.


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



const {error} = await supabaseClient.auth.signOut();




if(error){


console.log(error);


}






window.location.href="login.html";



}
