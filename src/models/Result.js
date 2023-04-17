const mongoose = require("mongoose")
const Result = mongoose.Schema({
    uid:String,
    ans:[{
        _id: false,
    question:Number,
    a: Boolean,
    b: Boolean,
    c: Boolean,
    d: Boolean},{
        _id: false,
        question:Number,
        a: Boolean,
        b: Boolean,
        c: Boolean,
        d: Boolean},{
            _id: false,
            question:Number,
            a: Boolean,
            b: Boolean,
            c: Boolean,
            d: Boolean},{
                _id: false,
                question:Number,
                a: Boolean,
                b: Boolean,
                c: Boolean,
                d: Boolean},{
                    _id: false,
                    question:Number,
                    a: Boolean,
                    b: Boolean,
                    c: Boolean,
                    d: Boolean},{
                        _id: false,
                        question:Number,
                        a: Boolean,
                        b: Boolean,
                        c: Boolean,
                        d: Boolean},{_id: false,
                            question:Number,
                            a: Boolean,
                            b: Boolean,
                            c: Boolean,
                            d: Boolean},{_id: false,question:Number,
                                a: Boolean,
                                b: Boolean,
                                c: Boolean,
                                d: Boolean},{_id: false,question:Number,
                                    a: Boolean,
                                    b: Boolean,
                                    c: Boolean,
                                    d: Boolean},{_id: false,question:Number,
                                        a: Boolean,
                                        b: Boolean,
                                        c: Boolean,
                                        d: Boolean}]



})
module.exports = mongoose.model("result", Result)