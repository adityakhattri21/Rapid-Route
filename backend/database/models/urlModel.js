const mongoose = require("mongoose");
require("mongoose-type-url");

const urlSchema = new mongoose.Schema({
    urlCode:{
        type:String,
        required:[true , "Please Enter the urlCode"],
        maxLength:[10,"urlCode cannot be more than 10 characters"],
        unique:true
    },
    originalUrl:{
        type:mongoose.SchemaTypes.Url,
        required:[true,"URL is required"]
    }
})

module.exports = mongoose.model("URL",urlSchema);