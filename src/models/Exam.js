const mongoose = require("mongoose")
const Exam = mongoose.Schema({
    question: String,

    a: String,
    b: String,
    c: String,
    d: String,



})
module.exports = mongoose.model("exam", Exam)