const catchAsync = require('../utils/catchAsync');
const Order= require("../models/orderModel");
const AppError = require('../utils/appError');
const Menu= require('../models/menuModel');
const Stripe= require('stripe');

exports.getCheckoutSession=catchAsync(async(req,res,next)=>{
    const menu=await Menu.findById(req.params.menuId);
    //create checkout session
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        success_url:`${req.protocol}://${req.get('host')}`,
        cancel_url:`${req.protocol}://${req.get('host')}/menu/${menu.slug}`,
        customer_email:req.user.email,
        client_reference_id:req.params.menuId,
        line_items:[{
            // name:`${menu.name} Menu`,
            // description: menu.description,
            // image:[`../public/img/menu/${menu.image}`],
            // price:menu.price*100,
            // currency: 'inr',
            quantity:1,
            price_data: {
                currency: 'inr',
                unit_amount: menu.price,
                product_data: {
                  name: `${menu.name} Menu`,
                  description: menu.description,
                  images: [`../public/img/menu/${menu.image}`],
                },
              }, 
        }]
    });
    res.status(200).json({
        status:'success',
        session
    });
    next();
});



exports.createOrder=catchAsync(async(req,res,next)=>{
    const menu=await Menu.findById(req.params.menuId);
    
     const order=await Order.create({
        pNumber:req.body.pNumber,
        address:req.body.address,
        name:menu.name,
        quantity:req.body.quantity,
        price: menu.price*req.body.quantity,
        user:req.user.id,
        menu:req.params.menuId,
     });
   // console.log(order);
    //  res.status(201).json({
    //     status:'success',
    //     data:{
    //     order
    //     } 
    //  })
    //  next();
});

exports.getAllOrders=catchAsync(async(req,res,next)=>{
    const orders=await Order.find();
    res.status(201).json({
        status:"success",
        data:{
            orders
        }
    })
})


exports.getMyOrder=catchAsync(async(req,res,next)=>{
    const myOrder=await Order.find({user:req.params.userId});

    res.status(200).json({
        status:'success', 
        myOrder
    })
})