// import {login} from './login';
// import { orderMenu } from './stripe';
// const loginForm=document.querySelector('.login_form');
// const orderBtn=document.getElementById('order-menu');
const quantityBtn=document.querySelector('.order_quantity');
const totalPrice=document.querySelector('.order_total_price');
const rightBtnReview=document.querySelector('.right-arrow');
const leftBtnReview=document.querySelector('.left-arrow');
const reviews=document.querySelector('.reviews');

let currentReview=reviews.firstChild

if(rightBtnReview)
rightBtnReview.addEventListener("click",(e)=>{
   if(currentReview){
    if(currentReview.nextSibling){
        currentReview.nextSibling.scrollIntoView({ behavior: 'smooth' });
        currentReview=currentReview.nextSibling;
    }
    else{
        reviews.firstChild.scrollIntoView({behavior:'smooth'})
        currentReview=reviews.firstChild;
    }
   }
})

if(leftBtnReview)
leftBtnReview.addEventListener('click',(e)=>{
    if(currentReview){
        if(currentReview.previousSibling){
            currentReview.previousSibling.scrollIntoView({ behavior: 'smooth' });
            currentReview=currentReview.previousSibling;
        }
        else{
            reviews.lastChild.scrollIntoView({behavior:'smooth'})
            currentReview=reviews.lastChild;
        }
       }
})

// if(loginForm){
//     loginForm.addEventListener('submit',(e)=>{
//         e.preventDefault();
//         const email=document.getElementsByClassName('input_email').value;
//         const password=document.getElementsByClassName('input_password').value;
        
//         login(email,password);
//     })
// }

 

// if(orderBtn)
// orderBtn.addEventListener('click',(e)=>{
//     e.preventDefault();
//     e.target.textContent='Processing...';
//     const {menuId}=e.target.dataset;
//     console.log(menuId);
//     orderMenu(menuId);
// })
let preValue=Number(totalPrice.textContent.split('₹')[1]); 
quantityBtn.value=1;
quantityBtn.onchange=()=>{
    let value=quantityBtn.value;
    totalPrice.textContent=`Total-₹${value*preValue}`;
};