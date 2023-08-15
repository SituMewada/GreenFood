
//============= Alert =========================>
const body=document.querySelector("body");
const alertBox= (message,name)=>{
   //  console.log(body)
    body.insertAdjacentHTML('beforebegin',`<div class="alert alert--${name}">${message}</div>`)
     setTimeout(()=>{
        
        document.querySelector(".alert").remove()
     },3000)
    
};
//==================================================>


const profile = document.querySelector('.uplode_image_profile');
const inputPic=document.querySelector('.input_user_profile');
const editProfile=document.querySelector('#editProfile');
const myorder=document.querySelector('#myOrder');
const userImageContainer=document.querySelector('.upload_user_image');
const userOrders=document.querySelectorAll('.pre_order_details');
const photoUpload=document.querySelector('#input_file');
// inputPic.addEventListener('onChange',()=>{
//     profilePic.src=URL.createObjectURL(inputPic.files[0]);
// })

 
inputPic.onchange=async()=>{ 
    profile.src=URL.createObjectURL(inputPic.files[0]);
    
    let form=new FormData();
    form.append('photo', inputPic.files[0]);

    console.log(inputPic.files[0]);
    try{
    const res=await axios({
        method:"PATCH", 
        url:"http://127.0.0.1:3000/api/v1/users/updateMe",
        data: form
         
    })
      
    if(res.data.status==="success"){
         alertBox('Update successfuly!','success');
         location.reload(true);
    }

}
    catch(err){
        alertBox(err.message,'error');
    }
}
//console.log(userImageContainer,userOrders);
editProfile.addEventListener('click',()=>{
    userImageContainer.style.display='flex';
    editProfile.style.color='#3E9A3D';
    myorder.style.color='#141313';
    for( el of userOrders){
        el.style.display='none';
    }
})


myorder.addEventListener('click',()=>{
    userImageContainer.style.display='none';
    editProfile.style.color="#141313";
    myorder.style.color='#3E9A3D';
    for( el of userOrders){
        el.style.display='flex';
    }
})

//default behavior
window.onload=function(){
    editProfile.style.color='#3E9A3D';
    myorder.style.color='#141313';
    for( el of userOrders){
        el.style.display='none';
    }
};