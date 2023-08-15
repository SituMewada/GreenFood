const mongoose =require("mongoose");
const slugify = require("slugify");
const validator=require('validator')
const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Menu must have a name.'],
        unique:true,
        trim:true,
        maxlength:[40,'A Menu have less or equal then 40 characters'],
        minlenght:[2,'A Menu have equal or more then 2 characters'],
        // validate:[validator.isAlpha,'A Menu must only characters']
    },
    slug:String, 
    menuType:{
        type:String,
        default:"Food",
        trim:true,
    },
    category:{
         type:String,
    },
    price:{
        type:Number,
        required:[true,'A Menu must have a price.'],
    },
    image:{
        type:String
    },
    description:{
        type:String,
        maxlength:[200,'Descriptoinshoul be under 200 characters']
    },
    calorieFrom:{
        type:Number
    },
    calorieTo:{
        type:Number
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
    },
    ratingsQuantity:{
        type:Number, 
        default:0
    } 
}
  );
 
menuSchema.pre('save',function(next){
    this.slug=slugify((this.name).split(" ").join("-"),{lower:true})
    next();
})

 

const Menu=mongoose.model('Menu',menuSchema);

module.exports=Menu;