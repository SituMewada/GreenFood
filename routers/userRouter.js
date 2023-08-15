const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController')
const router=express.Router();

router.post('/signup',authController.signup);

router.post('/login',authController.login);
router.get('/logout',authController.isLoggedIn,authController.logout);

router.post('/forgotPassword',authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);

router.patch('/updateMe',authController.protect,userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateMe);

router.route('/:id')
.get(userController.getUser);
module.exports=router; 