const Budget = require("../model/budget");
const Expense = require("../model/expense");

// Dashboard Controller
module.exports.dashboard = async (req, res) => {
    const budgetData = await Budget.find();
    const expenseData = await Expense.find();

    const totalExpenses = expenseData.reduce((total, expense) => total + expense.amount, 0);
    let totalBudget = budgetData.length > 0 ? budgetData[0].totalBudget : 0;
    const budgetLeft = totalBudget - totalExpenses;

    res.render("show", {
        budget: totalBudget,
        totalExpenses,
        budgetLeft,
        expenses: expenseData 
    });
};

// Add or Update Budget
module.exports.addBudget = async (req, res) => {
    const { totalBudget } = req.body;
    let budgetDoc = await Budget.findOne();

    if (!budgetDoc) {
        budgetDoc = new Budget({ totalBudget });
    } else {
        budgetDoc.totalBudget = totalBudget;
    }

    await budgetDoc.save();
    res.redirect("/");
};

// Reset All
module.exports.resetAll = async (req, res) => {
    await Budget.deleteMany();
    await Expense.deleteMany();
    res.redirect("/");
};
