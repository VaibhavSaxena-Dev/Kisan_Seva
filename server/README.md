# Kisan Seva - Backend Server

Node.js + Express + MongoDB backend server for Kisan Seva.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

## 📁 Structure

- `config/` - Configuration files
  - `database.js` - MongoDB connection
- `models/` - MongoDB schemas
  - `User.js` - User model
  - `Todo.js` - Todo model
  - `AuditLog.js` - Audit log model
  - `HygieneTest.js` - Hygiene test model
- `index.js` - Express server entry point

## 🌐 Access

API Server: `http://localhost:5000`
Health Check: `http://localhost:5000/api/health`

## 🔧 Environment Variables

Create `.env` file in root directory:
```
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

