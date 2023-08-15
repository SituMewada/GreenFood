const Menu = require('../models/menuModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createMenu=catchAsync(async(req,res,next)=>{
    const newMenu=await Menu.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
           menu:newMenu
        }
    })
}); 

exports.getAllMenus=catchAsync(async(req,res,next) =>{
    const menus=await Menu.find();
    if(!menus) return(next(new AppError('No menu found!',404))) 
    res.status(201).json({
        status:"success",
        data:{
                menus:menus
        }
    }) 
});

exports.getOneMenu=catchAsync(async(req,res)=>{
     
        const menu=await Menu.findById(req.params.id);
        // .populate('orders');

        if(!menu) return(next(new AppError('No menu found with ID!',404)));

        res.status(201).json({
            status:"success",
            data:{ 
                menu:menu
            }
        })
    
     
});

exports.updateOne=catchAsync(async(req,res)=>{
     
        const menu=await Menu.findByIdAndUpdate(req.params.id,req.body);

        if(!menu) return(next(new AppError('No menu found with ID!',404)))
        
        res.status(201).json({
            status:"success",
            data:{
                menu
            }
        })
    
});