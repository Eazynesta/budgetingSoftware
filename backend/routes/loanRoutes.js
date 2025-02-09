const express = require('express');
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with JWT authentication
router.use(authMiddleware);

// Add Loan
router.post('/', loanController.addLoan);

// Get All Loans
router.get('/', loanController.getLoans);

// Update Loan
router.put('/:id', loanController.updateLoan);

// Delete Loan
router.delete('/:id', loanController.deleteLoan);

module.exports = router;