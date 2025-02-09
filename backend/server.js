const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const loanRoutes = require('./routes/loanRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected Successfully');
}).catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);
app.use('/loan', loanRoutes);

app.get('/', (req, res) => {
  res.send('Budgeting App Backend');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));