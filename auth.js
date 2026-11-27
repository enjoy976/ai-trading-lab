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

// ===============================
// FORGOT & RESET PASSWORD
// ===============================
async function forgotPassword() {
  const email = document.getElementById("loginEmail").value.trim();
  const resBox = document.getElementById("loginResult");

  if (!email) {
    resBox.innerHTML = "⚠️ Эхлээд дээрх нүдэнд бүртгэлтэй <b>Email</b> хаягаа бичнэ үү.";
    return;
  }

  resBox.innerHTML = "⏳ Нууц үг сэргээх линк илгээж байна...";

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/login.html"
  });

  if (error) {
    resBox.innerHTML = "❌ АЛДАА: " + error.message;
    return;
  }

  resBox.innerHTML = `
    🟢 <b>СЭРГЭЭХ ЛИНК ИЛГЭЭГДЛЭЭ!</b><br><br>
    📩 <b>${email}</b> хаягаа шалгаад ирсэн линк дээр дарж шинэ нууц үгээ оруулна уу.
  `;
}

// Хэрэглэгч и-мэйл дээрх сэргээх линкээр буцаж орж ирэх үед шинэ нууц үг солих цонх гаргана
supabaseClient.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") {
    const resetBox = document.getElementById("resetPasswordBox");
    if (resetBox) resetBox.style.display = "block";
  }
});

async function updateNewPassword() {
  const newPassword = document.getElementById("newPasswordInput").value;
  const resBox = document.getElementById("loginResult");

  if (!newPassword || newPassword.length < 6) {
    resBox.innerHTML = "⚠️ Шинэ нууц үг дор хаяж 6 тэмдэгттэй байх ёстой.";
    return;
  }

  const { error } = await supabaseClient.auth.updateUser({ password: newPassword });

  if (error) {
    resBox.innerHTML = "❌ АЛДАА: " + error.message;
    return;
  }

  resBox.innerHTML = "🟢 <b>НУУЦ ҮГ АМЖИЛТТАЙ СОЛИГДЛОО!</b> Dashboard руу шилжиж байна...";
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1500);
}


await supabaseClient.auth.signOut();



window.location.href="login.html";



}
