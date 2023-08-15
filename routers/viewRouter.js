
const express = require('express');
const catchAsync = require('../utils/catchAsync');
const viewController=require('../controllers/viewControllers')
const authController=require('../controllers/authController')
const router=express.Router();

router.get('/',authController.isLoggedIn,viewController.getOverview);
router.get('/login',viewController.getLogInForm);
router.get('/menu/:slug',authController.protect,viewController.getMenu);
router.get('/my',authController.protect,viewController.myProfile); 
module.exports=router;