const mongoose = require("mongoose");

const Register=mongoose.Schema({
    // regName:String,
    // regEmail:String,
    // regPassword:String
    username: String,
    email:String,
    hash: String,
    salt: String,
    admin:Boolean
})

module.exports=mongoose.model("users",Register)