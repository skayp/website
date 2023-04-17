const mongoose = require("mongoose");

const Expense=mongoose.Schema({
    user_id: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      otherCategory: {
        type: String
      },
      remarks: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }

})

module.exports=mongoose.model("expense",Expense)