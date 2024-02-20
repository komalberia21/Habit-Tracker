let currentuserId;
console.log(document.cookie);
const apiUrl ='https://habittracker-q6ux.onrender.com'
const frontendurl='https://habit-tracker-frontend-olive.vercel.app'



//function to registeruser
async function registerUser() {
  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
 
   const userData = {
    name: username,
    email: email,
    password: password
   };

try {
    const response = await fetch(`${apiUrl}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data);
      const newurl = `${frontendurl}/login.html`
      window.location.href=newurl;
    }else {
      const errorResponse = await response.json();
      console.log("erorrrrrr")
      console.error('Error logging in:', response.status, response.statusText);
      // Display validation errors to the user
      if (errorResponse.errors) {
        errorResponse.errors.forEach(error => {
          const errordom=document.getElementById("error")
          errordom.innerHTML+=`<div class="alert alert-danger" role="alert">
          ${error.msg}</div>`
        console.error(`Validation Error - ${error.msg}`);
        });
      } }
  } catch (error) {
    const errordisplay=document.getElementById("errors");
    if(errordisplay){
      errordisplay.innerHTML=`<div class="alert alert-danger" role="alert">
      Something went wrong!! Try latter..</div>`
    }
    // Set a timeout to clear the error message after 5 seconds
    setTimeout(() => {
     errordisplay.innerHTML = ''; // Clear the content
     }, 5000); // 5000 milliseconds (5 seconds)
    console.error('Error registering user:', error);}}

//function to loginuser
async function loginUser() {
 console.log("inside login function");
 const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
const loginData = {
    email: email,
    password: password};
    try {
    const response = await fetch(`${apiUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("logindata",data) ;
       console.log('Login successful:', data);
      
      localStorage.setItem("user",JSON.stringify(data.user));
      
     
      //on successfull login we are redirected to dashboard page
      const newurl = `${frontendurl}/dashboard.html`;
      window.location.href = newurl;
      
      const uuser=localStorage.getItem("user");
      console.log("uuser",uuser);
      
    } else {
      const errorResponse = await response.json();
     
      // Display validation errors to the user
      if (errorResponse) {
        const loginerror=document.getElementById("loginerror");
          loginerror.innerHTML+=`<div class="alert alert-danger" role="alert">
          Login with right Credentials!
        </div>
        ` }}
} 
   catch (error) {
    console.error('Error logging in:', error);
  }
}










//tried to get userId from cookie but did not work
async function getCookie(name) {
  const userId =  await getCookie('userId');
      if (userId) {
         console.log('User ID:',userId);
       } else {
         console.log('User ID cookie not found.');
       }
 
  console.log("getcookie called");
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(cookie => cookie.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}
//function to logout 
function logout(){
  console.log("inside logout");
  currentuserId=null;
  localStorage.setItem("userId",null);
  const newurl="http://127.0.0.1:5500/index.html";
  window.location.href=newurl;
}

// nav background
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})




  


