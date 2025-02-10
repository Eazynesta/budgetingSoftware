// frontend/src/pages/LoanPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanPage = () => {
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/loan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data.loans);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/loan',
        { amount, lender, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLoans(); // Refresh loans list
      setAmount('');
      setLender('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding loan:', error);
    }
  };

  const handleRepay = async (id, paidAmount) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/loan/${id}`,
        { paidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLoans(); // Refresh loans list
    } catch (error) {
      console.error('Error repaying loan:', error);
    }
  };

  return (
    <div>
      <h1>Loans</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lender"
          value={lender}
          onChange={(e) => setLender(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Loan</button>
      </form>
      <ul>
        {loans.map((loan) => (
          <li key={loan._id}>
            {loan.lender}: ${loan.amount} (Due: {new Date(loan.dueDate).toLocaleDateString()})
            <button onClick={() => handleRepay(loan._id, 100)}>Repay $100</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanPage;