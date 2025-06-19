import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;
const EXTERNAL_API = 'https://todo-app-4-oz22.onrender.com';

// Middleware
app.use(cors());
app.use(express.json());

// Proxy routes
app.get('/api/todos', async (req, res) => {
  try {
    const response = await axios.get(`${EXTERNAL_API}/todos`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const response = await axios.post(`${EXTERNAL_API}/todos`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error creating todo:', error.message);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.get('/api/todos/:id', async (req, res) => {
  try {
    const response = await axios.get(`${EXTERNAL_API}/todos/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching todo:', error.message);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const response = await axios.put(`${EXTERNAL_API}/todos/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating todo:', error.message);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await axios.delete(`${EXTERNAL_API}/todos/${req.params.id}`);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});