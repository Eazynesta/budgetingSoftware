const Expense = require('../models/Expense');

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category } = req.body;
    const userId = req.userId; // Extracted from JWT middleware

    const expense = new Expense({ userId, amount, category });
    await expense.save();

    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get All Expenses for a User
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Expense.find({ userId });

    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};