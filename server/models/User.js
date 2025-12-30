import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Todo list Sub-schema
const todoSchema = new mongoose.Schema({  
  title: {
    type: String,
    required: [true, 'Todo title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hygiene Test Sub-schema
const hygieneTestSchema = new mongoose.Schema({
  farmType: {
    type: String,
    required: true,
    enum: ['poultry', 'cattle'],
  },
  answers: {
    type: [Number],
    required: true,
    validate: {
      validator: function(v) {
        return v.every(answer => answer >= 0 && answer <= 3);
      },
      message: 'Each answer must be between 0 and 3',
    },
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  riskLevel: {
    type: String,
    required: true,
    enum: ['excellent', 'good', 'moderate', 'poor'],
  },
  recommendations: {
    type: [String],
    default: [],
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false, // Don't return password by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  
  todos: [todoSchema], // Embedded todos
  hygieneTests: [hygieneTestSchema], // Embedded hygiene test results
});


userSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) return next();

  try {
    
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;

