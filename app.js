const express = require('express');
const cookieParer= require('cookie-parser');
const path = require('path');
const favicon = require('serve-favicon');
const menuRouter = require('./routers/menuRouter');
const userRouter=require('./routers/userRouter');
const orderRouter=require('./routers/orderRouter');
const viewRouter = require('./routers/viewRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app=express();
 
//Render data
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Limit requests from same API
app.use(express.json({ limit: '10kb' }));
app.use(cookieParer());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

 

//Reading the data from 
// app.get('/',(req,res)=>{
// res.status(200).render('base',{title:'All Menu'})
// })
 
// app.use((req,res,next)=>{
//     console.log(req.cookies)
//     next();
// })

app.use('/',viewRouter);
app.use('/api/v1/menus',menuRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/orders',orderRouter);
//Global erro handler
app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server!`,404));
});

app.use(globalErrorHandler);

module.exports=app;