const express = require('express');
const incomeController = require('../controllers/incomeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with JWT authentication
router.use(authMiddleware);

// Add Income
router.post('/', incomeController.addIncome);

// Get All Income
router.get('/', incomeController.getIncome);

// Delete Income
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;