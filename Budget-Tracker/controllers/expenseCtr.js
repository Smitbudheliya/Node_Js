const Expense = require("../model/expense");

// Add Expense
module.exports.addExpense = async (req, res) => {
    const { title, amount } = req.body;
    const expense = new Expense({ title, amount });
    await expense.save();
    res.redirect("/");
};

// Delete Expense
module.exports.deleteExpense = async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect("/");
};
