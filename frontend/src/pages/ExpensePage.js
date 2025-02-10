// frontend/src/pages/ExpensePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpensePage = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/expense', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/expense',
        { amount, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExpenses(); // Refresh expenses list
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((e) => (
          <li key={e._id}>
            ${e.amount} - {e.category} ({new Date(e.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensePage;