// LOGIN SYSTEM UI

document.querySelector(".login-btn").onclick = function(){

document.getElementById("result").innerHTML = `

<h2>🔐 LOGIN ACCESS</h2>

<hr>

<p>
Email:
</p>

<input type="email" placeholder="Enter email">

<br><br>

<p>
Password:
</p>

<input type="password" placeholder="Enter password">

<br><br>

<button class="access-btn">
CONNECT SYSTEM
</button>

`;

};





document.querySelector(".signup-btn").onclick = function(){

document.getElementById("result").innerHTML = `

<h2>🧬 CREATE ACCOUNT</h2>

<hr>


<p>
Register new AI Trader account
</p>


<input type="text" placeholder="Username">


<br><br>


<input type="email" placeholder="Email">


<br><br>


<input type="password" placeholder="Password">


<br><br>


<button class="access-btn">

CREATE ACCOUNT

</button>


`;

};
