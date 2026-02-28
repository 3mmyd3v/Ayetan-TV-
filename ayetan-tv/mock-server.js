import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tokens = {};

// Mock signup
app.post('/api/auth/signup', (req, res) => {
  const { fullName, email, password } = req.body;
  
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  
  const user = { id: Date.now().toString(), fullName, email };
  users.push({ ...user, password });
  
  const token = 'mock_token_' + Date.now();
  tokens[token] = email;
  
  res.json({ user, token });
});

// Mock login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = 'mock_token_' + Date.now();
  tokens[token] = email;
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token });
});

// Mock profile
app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const email = tokens[token];
  
  if (!email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const user = users.find(u => u.email === email);
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

app.listen(5000, () => {
  console.log('Mock backend running on http://localhost:5000');
});
