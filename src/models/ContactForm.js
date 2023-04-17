const mongoose = require("mongoose");

const ContactForm=mongoose.Schema({
    contactEmail:String,
    contactPhone:String,
    contactQuery:String

})

module.exports=mongoose.model("queries",ContactForm)