const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  lender: { type: String, required: true },
  dueDate: { type: Date, required: true },
  paidAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);