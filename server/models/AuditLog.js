import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: ['register', 'register_failed', 'login', 'login_failed', 'logout'],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // Index for faster queries
  },
  ipAddress: {
    type: String,
    default: null,
  },
  userAgent: {
    type: String,
    default: null,
  },
});

// Index for faster queries by email and timestamp
auditLogSchema.index({ email: 1, timestamp: -1 });
auditLogSchema.index({ userId: 1, timestamp: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;

