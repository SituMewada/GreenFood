const multer=require('multer')
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const User= require("../models/userModel");
const AppError = require('../utils/appError');

//store image in buffer
const multerStrorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStrorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  // console.log(req.file.buffer);
  // console.log(req.file.filename);
  // console.log(req.user.id);
//use buffer stored image by multer
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${req.file.filename}`);

  next();
});

exports.updateMe=catchAsync(async(req,res,next)=>{
 // console.log(req.file.filename);
  const user=await User.findByIdAndUpdate(req.user.id,{photo:req.file.filename},{
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status:'success',
    user
  })
})

exports.getUser=catchAsync(async(req,res,next)=>{
    const users=await User.findById(req.params.id)
    // .populate('orders');
    res.status(201).json({
        status:"success",
        data:{
            users
        }
    })
})