const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// const { default: isEmail } = require('validator/lib/isemail')



const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Plese tell us your name!'],
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:[true,'Please provide your valid email!'],
        validate:[validator.isEmail,'Please provide a valid email!']
    },
    photo:{
        type:String,  
    },
    role:{
          type:String,
          enum:['user','admin'],
          default:'user'
    
    },
    password:{ 
        type:String,
        trim:true,
        required:[true,'Please enter passwors!'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        trim:true,
        required:[true,'Please confirm your passwors!'],
        validate:{
            validator:function(el){
               return el===this.password
            },
            message:'Password are not same!'

        }

    },
    passwordChangedAt:{
           type:Date
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    passwordResetToken:{
        type:String
    },
    passwordResetTokenExpires:{
        type:String
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();

    this.password=await bcrypt.hash(this.password,12)

    this.passwordConfirm=undefined
    next();
}) 

userSchema.methods.correctPassword=async function(condidatePassword,userPassword){
    return await bcrypt.compare(condidatePassword,userPassword);
};

userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
    const time=parseInt(this.passwordChangedAt.getTime()/1000,10);
    return JWTTimestamp < time;
    } 
    return false;
}

userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');

    this.passwordResetToken=crypto
                             .createHash('sha256')
                             .update(resetToken)
                             .digest('hex')
    
    this.passwordResetTokenExpires=Date.now()+10*60*1000;
    
    return resetToken;
}

 //Virtual populate
userSchema.virtual('orders', {
    ref: 'Order',
    foreignField: 'user',
    localField: '_id',
  });

const User=mongoose.model('User',userSchema);

module.exports=User;