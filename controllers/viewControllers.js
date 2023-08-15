const catchAsync = require('../utils/catchAsync');
const Menu= require("../models/menuModel");
const Order= require("../models/orderModel")
const AppError = require('../utils/appError');


exports.getOverview=catchAsync(async(req,res,next)=>{
    const menus=await Menu.find();  
    res.status(200).render('overview',{title:'All Menu', menus});
})

exports.getLogInForm=catchAsync(async(req,res,next)=>{
    res.status(200).render('login',{title:'Log In'});
})

exports.getMenu=catchAsync(async(req,res,next)=>{
    const menu=await Menu.findOne({slug:req.params.slug})
    res.status(200).render('order',{title:'Order', menu});
})

exports.myProfile=catchAsync(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});
   // console.log(orders);
    res.status(200).render('myProfile',{title:'Profile',orders})
})