// import axios from "axios";
const stripe= Stripe('pk_test_51NFtKbSEiyFupe2ARJ4YiDA1Crzqv1NwVgMmzEPSda4HEdp89Felq4QAhrDvQUnDtiRfTVm1wPj9tuGo4xLaXg1J00pnL4SQ5b');
const orderBtn=document.getElementById('order-menu');
const order_pNumber=document.querySelector('.order_pNumber');
const order_address=document.querySelector('.order_location');
const order_quantity=document.querySelector('.order_quantity');

 
const orderMenu=async (menuId,pNumber,address,quantity)=>{
    try{
    //1)Get the checkout session from API
    const session=await axios({
        method:'POST',
        url:`http://127.0.0.1:3000/api/v1/orders/checkout-session/${menuId}`,
        data:{
            pNumber,
            address,
            quantity
        }
    });
    //2) Create checkout form + charge creadit card
    
    window.location.replace(session.data.session.url);
 }
    catch(err){
    alert(err);
    }
}

if(orderBtn)
orderBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    e.target.textContent='Processing...';
    console.log(order_address,order_pNumber,order_quantity);
    const pNumber=order_pNumber.value;
    const address=order_address.value;
    const quantity=order_quantity.value;

    const {menuId}=e.target.dataset;
    // console.log(menuId);
    orderMenu(menuId,pNumber,address,quantity);
})