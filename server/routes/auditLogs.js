import express from 'express';
import jwt from 'jsonwebtoken';
import { AuditLog } from '../models/index.js';

const router = express.Router();

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get audit logs for current user
router.get('/', authenticate, async (req, res) => {
  try {
    const logs = await AuditLog.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(100); // Limit to last 100 entries

    res.json({ logs });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log an audit event (for frontend to call)
router.post('/', authenticate, async (req, res) => {
  try {
    const { event, metadata } = req.body;

    if (!event) {
      return res.status(400).json({ error: 'Event is required' });
    }

    // Get user email for logging
    const { User } = await import('../models/index.js');
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const logEntry = new AuditLog({
      event,
      email: user.email,
      userId: req.userId,
      metadata,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    });

    await logEntry.save();

    res.status(201).json({ message: 'Audit log created', log: logEntry });
  } catch (error) {
    console.error('Create audit log error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
