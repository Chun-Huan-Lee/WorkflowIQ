# WorkflowIQ Development Guide

## 🚀 Quick Start

### 1. **Environment Setup**

Create environment files in each package:

**Backend** (`backend/.env`):
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/workflowiq"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"

# OpenAI (for AI features)
OPENAI_API_KEY="sk-your-openai-api-key"

# Redis (optional - for caching)
REDIS_URL="redis://localhost:6379"

# Server Configuration
PORT=4000
NODE_ENV=development
LOG_LEVEL=debug

# CORS
FRONTEND_URL="http://localhost:3000"
```

**Frontend** (`frontend/.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=http://localhost:4000
```

### 2. **Database Setup**

```bash
# Start PostgreSQL (using Docker)
docker run --name workflowiq-postgres \
  -e POSTGRES_DB=workflowiq \
  -e POSTGRES_USER=your_username \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15

# Generate Prisma client and run migrations
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 3. **Install Dependencies**

```bash
# Install root dependencies
npm install

# Install shared package dependencies
cd shared && npm install && npm run build

# Install backend dependencies  
cd ../backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 4. **Start Development Servers**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```

**Terminal 3 - Shared Types (watch mode):**
```bash
cd shared
npm run dev
```

## 🌐 Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api-docs
- **Health Check**: http://localhost:4000/health

## 🧪 Testing the Features

### **1. Authentication Flow**

1. Visit http://localhost:3000
2. Click "Get Started" → Register new account
3. Verify JWT token storage in browser dev tools
4. Test login/logout functionality

### **2. API Testing**

Use the Swagger documentation at http://localhost:4000/api-docs or test with curl:

```bash
# Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "organizationName": "Test Company"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com", 
    "password": "SecurePass123!"
  }'

# Test protected endpoint (replace TOKEN with actual JWT)
curl -X GET http://localhost:4000/api/users \
  -H "Authorization: Bearer TOKEN"
```

### **3. WebSocket Testing**

Test real-time features using the browser console:

```javascript
// Connect to WebSocket
const socket = io('http://localhost:4000', {
  auth: {
    token: 'your-jwt-token-here'
  }
});

// Join a resource room
socket.emit('join-resource', {
  resourceType: 'workflow',
  resourceId: 'test-workflow-id'
});

// Send cursor update
socket.emit('cursor-update', {
  resourceType: 'workflow',
  resourceId: 'test-workflow-id',
  position: { x: 100, y: 200 }
});

// Listen for updates
socket.on('cursor-update', (data) => {
  console.log('Cursor update received:', data);
});
```

## 🗄️ Database Management

### **View Data**
```bash
# Open Prisma Studio (GUI)
cd backend
npx prisma studio
```

### **Reset Database**
```bash
cd backend
npx prisma migrate reset
```

### **Seed Data**
```bash
cd backend
npx prisma db seed
```

### **Generate Types**
```bash
cd backend
npx prisma generate
```

## 🐛 Debugging

### **Backend Debugging**

**Check Logs:**
```bash
# View application logs
cd backend
tail -f logs/combined.log

# View error logs
tail -f logs/error.log
```

**Debug Database Queries:**
Set `LOG_LEVEL=debug` in `.env` to see all Prisma queries.

### **Frontend Debugging**

**React Query DevTools:**
- Automatically enabled in development
- Check network tab for API calls
- Use React DevTools browser extension

**WebSocket Debugging:**
```javascript
// Enable Socket.IO debugging
localStorage.debug = 'socket.io-client:socket';
```

## 📦 Building for Production

### **Backend**
```bash
cd backend
npm run build
npm start
```

### **Frontend**
```bash
cd frontend
npm run build
npm start
```

### **Shared Types**
```bash
cd shared
npm run build
```

## 🐳 Docker Development

### **Full Stack with Docker Compose**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Individual Services**
```bash
# Backend only
docker build -t workflowiq-backend ./backend
docker run -p 4000:4000 workflowiq-backend

# Frontend only
docker build -t workflowiq-frontend ./frontend
docker run -p 3000:3000 workflowiq-frontend
```

## 🧪 Testing

### **Backend Tests**
```bash
cd backend
npm test
npm run test:watch
```

### **Frontend Tests**
```bash
cd frontend
npm test
npm run test:watch
```

### **E2E Tests** (Future Enhancement)
```bash
# Using Playwright or Cypress
npm run test:e2e
```

## 🔧 Common Issues & Solutions

### **Port Conflicts**
```bash
# Check what's using port 4000
lsof -i :4000

# Kill process if needed
kill -9 $(lsof -ti:4000)
```

### **Database Connection Issues**
```bash
# Test PostgreSQL connection
psql -h localhost -p 5432 -U your_username -d workflowiq

# Reset Prisma
cd backend
rm -rf node_modules/.prisma
npx prisma generate
```

### **TypeScript Errors**
```bash
# Clear TypeScript cache
cd backend
rm -rf dist/
npm run build

cd ../frontend
rm -rf .next/
npm run build
```

### **WebSocket Connection Issues**
- Check CORS settings in backend
- Verify JWT token is valid
- Check browser network tab for WebSocket connection status

## 📊 Performance Monitoring

### **Backend Metrics**
- API response times logged automatically
- Database query performance in logs
- Memory usage monitoring with process.memoryUsage()

### **Frontend Metrics**
- React Query cache hit rates
- Component render performance
- Bundle size analysis: `npm run build` shows bundle stats

## 🔄 Development Workflow

### **Making Changes**

1. **Shared Types**: Edit in `shared/src/types/`, run `npm run build`
2. **Backend**: TypeScript auto-compiles, server restarts with `tsx watch`
3. **Frontend**: Next.js hot-reloads automatically

### **Adding New Features**

1. Define types in `shared/src/types/`
2. Update Prisma schema if needed
3. Create backend API routes
4. Build frontend components
5. Add WebSocket handlers for real-time features

### **Database Changes**

1. Edit `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name feature-name`
3. Update seed data if needed

## 🚀 Deployment Preparation

### **Environment Variables for Production**
```bash
# Backend Production .env
NODE_ENV=production
JWT_SECRET=super-secure-production-secret
DATABASE_URL=postgresql://prod-user:prod-pass@prod-host:5432/workflowiq
LOG_LEVEL=info
```

### **Security Checklist**
- [ ] Change all default secrets
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting
- [ ] Enable audit logging
- [ ] Configure backup strategy

## 📱 Demo Script

### **For Showcasing to Recruiters**

1. **Landing Page** (30 seconds)
   - Show modern, professional design
   - Highlight key features and value proposition

2. **Authentication** (1 minute)
   - Register new organization
   - Show JWT-based security

3. **API Documentation** (1 minute)
   - Open Swagger UI at /api-docs
   - Show comprehensive API coverage
   - Demonstrate real API calls

4. **Real-time Features** (2 minutes)
   - Open multiple browser tabs
   - Show live cursor tracking
   - Demonstrate collaborative comments

5. **Code Review** (5 minutes)
   - TypeScript types and validation
   - WebSocket implementation
   - Database schema design
   - Modern React patterns

**Total Demo Time**: ~10 minutes

---

## 🎯 Key Selling Points for Interviews

1. **Modern Tech Stack**: Latest versions of React, Node.js, TypeScript
2. **Enterprise Architecture**: Monorepo, shared types, proper separation
3. **Real-time Features**: WebSocket implementation with authentication
4. **AI Integration**: OpenAI GPT-4 for business process analysis
5. **Type Safety**: End-to-end TypeScript with runtime validation
6. **Professional Code**: Proper error handling, logging, security
7. **Scalable Design**: Ready for microservices, multi-tenant

This project demonstrates **senior-level full-stack engineering skills** with practical business applications that any tech company would value.

---

**Happy coding! 🚀** 