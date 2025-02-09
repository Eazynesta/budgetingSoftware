const Income = require('../models/Income');

// Add Income
exports.addIncome = async (req, res) => {
  try {
    const { amount, category } = req.body;
    const userId = req.userId; // Extracted from JWT middleware

    const income = new Income({ userId, amount, category });
    await income.save();

    res.status(201).json({ message: 'Income added successfully', income });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get All Income for a User
exports.getIncome = async (req, res) => {
  try {
    const userId = req.userId;
    const income = await Income.find({ userId });

    res.status(200).json({ income });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const income = await Income.findOneAndDelete({ _id: id, userId });
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};