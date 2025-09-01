const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetCtr");
const expenseController = require("../controllers/expenseCtr");

// Dashboard
router.get("/", budgetController.dashboard);

// Budget
router.post("/add-budget", budgetController.addBudget);

// Expense
router.post("/add-expense", expenseController.addExpense);
router.post("/delete-expense/:id", expenseController.deleteExpense);

// Reset
router.post("/reset", budgetController.resetAll);

module.exports = router;
