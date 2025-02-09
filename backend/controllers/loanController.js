const Loan = require('../models/Loan');

// Add Loan
exports.addLoan = async (req, res) => {
  try {
    const { amount, lender, dueDate } = req.body;
    const userId = req.userId; // Extracted from JWT middleware

    const loan = new Loan({ userId, amount, lender, dueDate });
    await loan.save();

    res.status(201).json({ message: 'Loan added successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get All Loans for a User
exports.getLoans = async (req, res) => {
  try {
    const userId = req.userId;
    const loans = await Loan.find({ userId });

    res.status(200).json({ loans });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Update Loan (e.g., repay part of the loan)
exports.updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { paidAmount } = req.body;
    const userId = req.userId;

    const loan = await Loan.findOne({ _id: id, userId });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.paidAmount += paidAmount;
    await loan.save();

    res.status(200).json({ message: 'Loan updated successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete Loan
exports.deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const loan = await Loan.findOneAndDelete({ _id: id, userId });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};