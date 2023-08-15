const mongoose= require('mongoose');

const orderSchema=new mongoose.Schema({
 pNumber:{
    type:Number,
    required:[true,'A menu must have a number!'],
    trim:true,
    maxlength:[10,'Please use only 10 digit number!']
 },
 price:{
    type:Number,
     required:[true,'Order must hava a price']
 },
 createdAt:{
   type:Date,
   default:Date.now()
 },
 name:{
    type:String,
 },
 address:{
    type:String,
    required:[true,'A order must have a address']
 },
 
 quantity:{
    type:Number,
    default:1
 },
 user: {
   type: mongoose.Schema.ObjectId,
   ref: 'User',
   required: [true, 'Order must belong to a user.'],
 },
 menu: {
   type: mongoose.Schema.ObjectId,
   ref: 'Menu',
   required: [true, 'Order must belong to a menu.'],
 },
},
{
   toJSON: { virtuals: true },
   toObject: { virtuals: true },
 }
 );
 
 
orderSchema.pre(/^find/, function (next) {
   // this.populate({
   //   path: 'tour',
   //   select: 'name ',
   // }).populate({
   //   path: 'user',
   //   select: 'name photo',
   // });
 
   this.populate({
     path: 'menu',
     select: 'name',
   });
   next();
 });

const Order=mongoose.model('Order',orderSchema);

module.exports=Order;