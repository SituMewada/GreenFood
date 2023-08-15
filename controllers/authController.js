const JWTs= require('jsonwebtoken');
const { promisify } = require('util');
 
const catchAsync = require('../utils/catchAsync');
const User= require("../models/userModel");
const AppError = require('../utils/appError');
const Email=require('../utils/email');
const signToken=id=>{
    return JWTs.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}

const createSendToken=(user,stausCode,res)=>{
   const token=signToken(user._id);
   const cookiesOption={
      expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
      httpOnly:true,
   }

   if(process.env.NODE_ENV==='production')  cookiesOption.secure=true;
   res.cookie('jwt',token,cookiesOption);

   user.password=undefined;
   res.status(stausCode).json({
      status:"success",
      token, 
      user 
   })
}
exports.signup =catchAsync(async(req,res,next)=>{
   
        const newUser=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm,
            
        });
      
        createSendToken(newUser,201,res);
});

exports.login=catchAsync(async (req,res,next)=>{
     const {email,password}=req.body;
     if(!email||!password){
        next(new AppError('Please provide email and password!',400))
     }

     const user=await User.findOne({email}).select('+password');

     if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password!',401))
     }

     createSendToken(user,201,res);
});

 

exports.protect=catchAsync(async(req,res,next)=>{
   //Validate the user
   let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1];
   }else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
   // console.log(token);
   //check user is logged  in
   if(!token) return next(new AppError('You are not loged in! Please log in to get access'),401);
   
   //Verification of the token
   const decode = await promisify(JWTs.verify)(token, process.env.JWT_SECRET);
 
   //check user is exist->  
   const freshUser= await User.findById(decode.id);
   if(!freshUser) return next(new AppError('User beloging to this token is not exist!',401));

   //chekc user is not change the passwor after the jwt token
    if(freshUser.changedPasswordAfter(decode.iat)){
      return next(new AppError('User recently changed the password. Please login again!',401))
    }
   //GRANT ACCESS THE PROTECTED ROUTE-->
   req.user=freshUser;
   res.locals.user=freshUser;

   next();
});

exports.isLoggedIn=async(req,res,next)=>{
   if(req.cookies.jwt){
      try{
         const decode=await promisify(JWTs.verify)(req.cookies.jwt,process.env.JWT_SECRET)
         const curUser=await User.findById(decode.id);
         if(curUser.changedPasswordAfter(decode.iat)){
            return next();
         }
      res.locals.user=curUser;
      return next();
      }catch(err){
      return next();
      }
   }
   next();
}

exports.logout = (req, res) => {
   res.cookie('jwt', 'loggedout', {
     expires: new Date(Date.now() + 10 * 1000),
     httpOnly: true,
   });
 
   res.status(200).json({ status: 'success' });
 };

exports.forgotPassword=catchAsync(async(req,res,next)=>{
   const user = await User.findOne({email:req.body.email});
   
   if(!user){ return next(new AppError('There is no user with this email address.',404))};

   const resetToken=user.createPasswordResetToken();
   
  // remove all the required feild in schema
   await user.save({validateBeforeSave: false});

   //Send it to user's Email
  const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
  
   try{
      await new Email(user,resetToken).sendWelcome();
      res.status(200).json({
         status:"success",
         message: 'Please check your email to reset password!',
      })
   }catch(err){
        user.createPasswordResetToken=undefined;
        user.passwordResetExpires=undefined;

        await user.save({ validateBeforeSave: false });

        return next(new AppError('There was an  error sending th email. Try again later!',500))
   };
    
})
exports.resetPassword=catchAsync(async(req,res,next)=>{

})

exports.restrictTo = (...roles) => {
   return (req, res, next) => {
     //roles ['admin' , 'lead-guide'].  role='user'
 
     if (roles.includes(req.User.role)) {
       return next(
         new AppError('You don not have permission to perform this action', 403)
       );
     }
     next();
   };
 };