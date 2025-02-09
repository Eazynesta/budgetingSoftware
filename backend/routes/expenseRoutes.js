const express = require('express');
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with JWT authentication
router.use(authMiddleware);

// Add Expense
router.post('/', expenseController.addExpense);

// Get All Expenses
router.get('/', expenseController.getExpenses);

// Delete Expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;