const URL = require("../database/models/urlModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const {generateShortId} = require("../utils/generateUid");


exports.generateUrl = catchAsyncError(async(req,res,next)=>{
    let {longUrl , urlCode} = req.body;

    if(!longUrl){
        return next(new ErrorHandler("URL is required",400));
    }
    if(!urlCode){
        urlCode = generateShortId();
    }
    const shortUrl = await URL.create({
        urlCode,
        originalUrl:longUrl
    });

    res.status(200).json({
        success:true,
        shortUrl
    });
});

exports.getUrl = catchAsyncError(async(req,res,next)=>{
    const {urlCode} = req.params;
    const url = await URL.findOne({urlCode:urlCode});

    if(!url){
        return next(new ErrorHandler("URL does not exist",404));
    }
    res.status(200).json({
        success:true,
        longUrl  :url.originalUrl
    });
});