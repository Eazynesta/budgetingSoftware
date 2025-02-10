// frontend/src/pages/IncomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncomePage = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [income, setIncome] = useState([]);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/income', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncome(response.data.income);
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/income',
        { amount, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchIncome(); // Refresh income list
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div>
      <h1>Income</h1>
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
        <button type="submit">Add Income</button>
      </form>
      <ul>
        {income.map((i) => (
          <li key={i._id}>
            ${i.amount} - {i.category} ({new Date(i.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomePage;