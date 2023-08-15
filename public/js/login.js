 
const body=document.querySelector("body");

const alertBox= (message,name)=>{
   //  console.log(body)
    body.insertAdjacentHTML('beforebegin',`<div class="alert alert--${name}">${message}</div>`)
     setTimeout(()=>{
        
        document.querySelector(".alert").remove()
     },3000)
    
};

 
 
const login=async (email,password)=>{
    try{
const res=await axios({
    method:"POST",
    url:"http://127.0.0.1:3000/api/v1/users/login",
    data:{
        email,
        password
    }
}) 

// console.log(res.data);
    if(res.data.status==="success"){
        alertBox('Successfuly logged in!','success');
     setTimeout(()=>{location.assign("/"); },3000)
         
    }
  }
  catch(err){
    
    alertBox('Wrong email or password!','error');
      //  console.log(err);
    }
}

const loginForm=document.querySelector('.login_button'); 
  if(loginForm)
    loginForm.addEventListener("click",(e)=>{
        e.preventDefault();
        const email=document.querySelector('.input_email').value;
        const password=document.querySelector('.input_password').value;
        console.log(email,password);
        
        login(email,password);
    })


 
const logoutbtn=document.querySelector('.logout_btn');
 

const logout=async()=>{
    try{
        const res=await axios({
            method:"GET",
            url:"http://127.0.0.1:3000/api/v1/users/logout"
        })
        if(res.data.status==="success"){
            alertBox('Logged out!','success');
            setTimeout(()=>{ location.reload(true);},1000)
             location.assign('/');
        }
       }
       catch(err){ 
        alert(err);
       }
}

if(logoutbtn) logoutbtn.addEventListener("click", logout);