const ErrorHandler = require("../utils/ErrorHandler");

const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

      //Handling Cast Error
      if(err.name === "CastError"){
        const message = `Resource Not Found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400);
    }

    //Mongoose Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.message
    });
};

module.exports = errorMiddleware;