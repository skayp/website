const mongoose=require("mongoose")
const Test=mongoose.Schema({
    icon:String,
    title:String,
    description:String,
    linkText:String,
    link:String

})
module.exports=mongoose.model("test",Test)