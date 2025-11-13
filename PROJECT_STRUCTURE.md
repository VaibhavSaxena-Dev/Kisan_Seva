# Kisan Seva - Project Structure

This document describes the proper organization of the Kisan Seva project.

## 📁 Project Structure

```
Kisan Seva/
├── Frontend/                 # All frontend React application files
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.ts    # Tailwind CSS configuration
│   ├── postcss.config.js     # PostCSS configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tsconfig.app.json     # TypeScript app config
│   ├── tsconfig.node.json    # TypeScript node config
│   ├── eslint.config.js      # ESLint configuration
│   ├── components.json       # shadcn/ui configuration
│   ├── index.html            # HTML entry point
│   ├── public/               # Static assets (if needed)
│   └── src/                  # Source code
│       ├── App.tsx           # Main app component
│       ├── main.tsx          # Entry point
│       ├── index.css         # Global styles
│       ├── assets/           # Images and media
│       ├── components/       # React components
│       ├── contexts/         # React contexts (Auth, Language)
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Page components
│       ├── utils/            # Utility functions
│       ├── lib/              # Library utilities
│       └── Backend/          # Frontend backend logic
│           ├── api/          # API clients (todoApi)
│           └── models/       # Frontend models (TodoItem, TodoStore)
│
└── server/                   # All backend Node.js/Express files
    ├── package.json          # Backend dependencies
    ├── index.js              # Express server entry point
    ├── config/               # Configuration files
    │   └── database.js       # MongoDB connection
    └── models/               # MongoDB schemas
        ├── User.js
        ├── AuditLog.js
        ├── Todo.js
        ├── HygieneTest.js
        └── index.js
```

## 🚀 How to Run

### Frontend (React/Vite)
```bash
cd Frontend
npm install
npm run dev
```
Server will run on: `http://localhost:3000`

### Backend (Node.js/Express)
```bash
cd server
npm install
npm run dev
```
Server will run on: `http://localhost:5000`

## 📝 Important Notes

1. **Two Separate package.json Files:**
   - `Frontend/package.json` - Frontend dependencies (React, Vite, etc.)
   - `server/package.json` - Backend dependencies (Express, Mongoose, etc.)

2. **No Root package.json:**
   - All frontend code is in `Frontend/` folder
   - All backend code is in `server/` folder

3. **Environment Variables:**
   - Create `.env` file in root directory with MongoDB connection string
   - Backend will read from root `.env` file

4. **Duplicate Files to Remove:**
   - Root `src/` folder (duplicate of `Frontend/src/`)
   - Root `index.html` (moved to `Frontend/`)
   - Root config files (moved to `Frontend/`)

## 🔧 Configuration Files

### Frontend Config Files (in `Frontend/`):
- `vite.config.ts` - Vite bundler config
- `tailwind.config.ts` - Tailwind CSS config
- `postcss.config.js` - PostCSS config
- `tsconfig.json` - TypeScript config
- `tsconfig.app.json` - TypeScript app config
- `tsconfig.node.json` - TypeScript node config
- `eslint.config.js` - ESLint config
- `components.json` - shadcn/ui config

### Backend Config Files (in `server/`):
- `config/database.js` - MongoDB connection
- `.env` (in root) - Environment variables

## 📦 Dependencies

### Frontend (`Frontend/package.json`):
- React, Vite, TypeScript
- UI libraries (shadcn/ui, Radix UI)
- Routing (react-router-dom)
- Forms (react-hook-form, zod)
- State management (React Context)

### Backend (`server/package.json`):
- Express.js
- Mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- CORS, dotenv, jsonwebtoken

## 🗑️ Files to Delete (Duplicates)

The following files/folders in the root directory are duplicates and can be deleted:
- `src/` folder (duplicate - use `Frontend/src/` instead)
- `index.html` (moved to `Frontend/`)
- `package.json` (if exists in root - not needed)
- `vite.config.ts` (moved to `Frontend/`)
- `postcss.config.js` (moved to `Frontend/`)
- `tsconfig.*.json` (moved to `Frontend/`)
- `eslint.config.js` (moved to `Frontend/`)
- `components.json` (moved to `Frontend/`)

Keep in root:
- `README.md`
- `.env` (environment variables)
- `server/` folder
- `Frontend/` folder
- `public/` (if contains shared assets, otherwise can move to Frontend)

