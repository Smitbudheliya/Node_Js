const mongoose = require("mongoose");

const budgetSchema =  mongoose.Schema({
  totalBudget: {
    type: Number,
    required: true
  }
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget