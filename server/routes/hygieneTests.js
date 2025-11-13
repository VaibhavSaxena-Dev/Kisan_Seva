import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = express.Router();

// Helper function to calculate risk level and recommendations
const getRiskLevelAndRecommendations = (score) => {
  let riskLevel, recommendations;

  if (score >= 85) {
    riskLevel = 'excellent';
    recommendations = [
      'Continue maintaining high hygiene standards',
      'Regular monitoring and documentation of practices',
      'Train staff on best practices',
      'Implement preventive maintenance schedules'
    ];
  } else if (score >= 60) {
    riskLevel = 'good';
    recommendations = [
      'Focus on areas needing improvement',
      'Increase frequency of cleaning routines',
      'Implement better waste management',
      'Regular health checks for animals',
      'Improve ventilation systems'
    ];
  } else if (score >= 40) {
    riskLevel = 'moderate';
    recommendations = [
      'Immediate action required in critical areas',
      'Develop comprehensive cleaning protocols',
      'Isolate sick animals promptly',
      'Improve biosecurity measures',
      'Regular disinfection of equipment',
      'Train staff on hygiene protocols'
    ];
  } else {
    riskLevel = 'poor';
    recommendations = [
      'Urgent intervention needed',
      'Complete overhaul of hygiene practices',
      'Consult veterinary experts immediately',
      'Implement strict quarantine procedures',
      'Replace contaminated equipment',
      'Develop emergency response plans',
      'Regular professional cleaning services',
      'Continuous monitoring and improvement'
    ];
  }

  return { riskLevel, recommendations };
};

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

// Get all hygiene tests for user
router.get('/', authenticate, async (req, res) => {
  try {
    res.json({ hygieneTests: req.user.hygieneTests });
  } catch (error) {
    console.error('Get hygiene tests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit hygiene test
router.post('/', authenticate, async (req, res) => {
  try {
    const { farmType, answers, score } = req.body;

    if (!farmType || !answers || typeof score !== 'number') {
      return res.status(400).json({ error: 'Farm type, answers, and score are required' });
    }

    // Calculate risk level and recommendations based on score
    const { riskLevel, recommendations } = getRiskLevelAndRecommendations(score);

    const newTest = {
      farmType,
      answers,
      score,
      riskLevel,
      recommendations,
      completedAt: new Date(),
    };

    req.user.hygieneTests.push(newTest);
    await req.user.save();

    res.status(201).json({ test: newTest });
  } catch (error) {
    console.error('Submit hygiene test error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get hygiene test by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const test = req.user.hygieneTests.find(test => test.id === id);
    if (!test) {
      return res.status(404).json({ error: 'Hygiene test not found' });
    }

    res.json({ test });
  } catch (error) {
    console.error('Get hygiene test error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete hygiene test
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const testIndex = req.user.hygieneTests.findIndex(test => test.id === id);
    if (testIndex === -1) {
      return res.status(404).json({ error: 'Hygiene test not found' });
    }

    req.user.hygieneTests.splice(testIndex, 1);
    await req.user.save();

    res.json({ message: 'Hygiene test deleted successfully' });
  } catch (error) {
    console.error('Delete hygiene test error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
