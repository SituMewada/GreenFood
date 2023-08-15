const express = require('express');
const menuController = require("../controllers/menuController");
const authController =require('../controllers/authController');


const router=express.Router();

router.route('/')
.get( menuController.getAllMenus)
.post(menuController.createMenu);
 
router.route('/:id')
.get(authController.protect,menuController.getOneMenu)
.patch(menuController.updateOne); 

router.route('/')


module.exports=router;