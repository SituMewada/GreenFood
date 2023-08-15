const orderController=require('../controllers/orderController')
const authController=require('../controllers/authController')
const express= require('express');
const router=express.Router();


// router.get('/checkout-session/:menuId',authController.protect,orderController.getCheckoutSession)
router.post('/checkout-session/:menuId',authController.protect,orderController.getCheckoutSession,orderController.createOrder)

router.get('/my-orders/:userId',orderController.getMyOrder);
 
router.route('/')
.post(orderController.createOrder)
.get(orderController.getAllOrders);

module.exports=router; 