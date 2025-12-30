import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

   //AUTH MIDDLEWARE
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

   //GET ALL TODOS
router.get('/', authenticate, async (req, res) => {
  try {
    const todos = req.user.todos.map(todo => ({
      id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
    res.json({ todos });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


   //ADD NEW TODO
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = {
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    req.user.todos.push(newTodo);
    await req.user.save();

    const addedTodo = req.user.todos.at(-1);
    res.status(201).json({
      todo: {
        id: addedTodo._id.toString(),
        title: addedTodo.title,
        description: addedTodo.description,
        completed: addedTodo.completed,
        createdAt: addedTodo.createdAt,
        updatedAt: addedTodo.updatedAt,
      }
    });
  } catch (error) {
    console.error('Add todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


   //UPDATE TODO
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = req.user.todos.id(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (completed !== undefined) todo.completed = completed;

    todo.updatedAt = new Date();

    await req.user.save();

    res.json({
      todo: {
        id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      }
    });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


   // TOGGLE TODO COMPLETION
router.patch('/:id/toggle', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = req.user.todos.id(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date();

    await req.user.save();

    res.json({ todo });
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  // DELETE TODO
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = req.user.todos.id(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.deleteOne();
    await req.user.save();

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
