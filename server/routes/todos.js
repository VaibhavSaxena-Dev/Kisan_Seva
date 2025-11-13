import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = express.Router();

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all todos for user
router.get('/', authenticate, async (req, res) => {
  try {
    res.json({ todos: req.user.todos });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new todo
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: new Date(),
    };

    req.user.todos.push(newTodo);
    await req.user.save();

    res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error('Add todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update todo
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todoIndex = req.user.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (title !== undefined) {
      req.user.todos[todoIndex].title = title.trim();
    }
    if (description !== undefined) {
      req.user.todos[todoIndex].description = description.trim();
    }
    if (completed !== undefined) {
      req.user.todos[todoIndex].completed = completed;
    }

    await req.user.save();

    res.json({ todo: req.user.todos[todoIndex] });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle todo completion
router.patch('/:id/toggle', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const todoIndex = req.user.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    req.user.todos[todoIndex].completed = !req.user.todos[todoIndex].completed;
    await req.user.save();

    res.json({ todo: req.user.todos[todoIndex] });
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete todo
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const todoIndex = req.user.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    req.user.todos.splice(todoIndex, 1);
    await req.user.save();

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
