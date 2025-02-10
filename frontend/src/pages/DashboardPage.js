// frontend/src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2'; // ✅ Correct imports
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DashboardPage = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const incomeResponse = await axios.get('http://localhost:5000/income', { headers });
      const expensesResponse = await axios.get('http://localhost:5000/expense', { headers });
      const loansResponse = await axios.get('http://localhost:5000/loan', { headers });

      setIncome(incomeResponse.data.income);
      setExpenses(expensesResponse.data.expenses);
      setLoans(loansResponse.data.loans);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const incomeData = {
    labels: income.map((i) => i.category),
    datasets: [
      {
        label: 'Income',
        data: income.map((i) => i.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const expensesData = {
    labels: expenses.map((e) => e.category),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((e) => e.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Income</h2>
        <Bar data={incomeData} /> {/* ✅ Fixed */}
      </div>
      <div>
        <h2>Expenses</h2>
        <Pie data={expensesData} /> {/* ✅ Fixed */}
      </div>
      <div>
        <h2>Loans</h2>
        <ul>
          {loans.map((loan) => (
            <li key={loan._id}>
              {loan.lender}: ${loan.amount} (Due: {new Date(loan.dueDate).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
