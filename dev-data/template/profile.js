const profilePic = document.querySelector('.uplole_imaged_profile');
const inputPic=document.querySelector('.input_user_profile');

// inputPic.addEventListener('onChange',()=>{
//     profilePic.src=URL.createObjectURL(inputPic.files[0]);
// })
inputPic.onchange=()=>{
    profilePic.src=URL.createObjectURL(inputPic.files[0]);
}