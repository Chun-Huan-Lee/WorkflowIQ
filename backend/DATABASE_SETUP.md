# Database Setup Guide

This guide explains how to set up and initialize the WorkflowIQ database.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ installed
- PostgreSQL (via Docker or local installation)

## Quick Setup

1. **Start the database services:**
   ```bash
   docker-compose up -d postgres redis
   ```

2. **Set up environment variables:**
   The `DATABASE_URL` should already be configured in the `.env` file:
   ```
   DATABASE_URL="postgresql://workflowiq:workflowiq_dev_password@localhost:5432/workflowiq"
   ```
   
   **For PowerShell users:** Load the environment variables:
   ```powershell
   cd backend
   .\load-env.ps1
   ```

3. **Run database migration:**
   ```bash
   npm run db:migrate
   ```

4. **Seed the database with sample data:**
   ```bash
   npm run db:seed
   ```

5. **Verify the setup:**
   ```bash
   npm run db:status
   ```

## Available Scripts

- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:status` - Check database connection and statistics
- `npm run db:reset` - Reset database (WARNING: destroys all data)

## Sample Data

The seed script creates:

### Sample Organization
- **Name:** WorkflowIQ Demo Organization
- **Plan:** Professional
- **Domain:** demo.workflowiq.com

### Sample Users
- **Admin User:** 
  - Email: `admin@workflowiq.com`
  - Password: `admin123`
  - Role: Admin

- **Regular User:**
  - Email: `user@workflowiq.com`
  - Password: `user123`
  - Role: Analyst

### Sample Data Includes
- 1 Employee Onboarding Workflow
- 1 Invoice Processing Business Process
- 1 Performance Dashboard
- 1 API Key for testing

## Database Management Tools

### Prisma Studio
Access the database GUI:
```bash
npm run db:studio
```
Opens at: http://localhost:5555

### Adminer (Optional)
If running with the tools profile:
```bash
docker-compose --profile tools up -d adminer
```
Opens at: http://localhost:8080

Connection details:
- **System:** PostgreSQL
- **Server:** postgres (or localhost)
- **Username:** workflowiq
- **Password:** workflowiq_dev_password
- **Database:** workflowiq

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running:
   ```bash
   docker-compose ps postgres
   ```

2. Check logs:
   ```bash
   docker-compose logs postgres
   ```

3. Verify environment variables:
   ```bash
   npm run db:status
   ```

### Migration Issues
1. Reset the database if needed:
   ```bash
   npm run db:reset
   ```

2. Re-run migrations:
   ```bash
   npm run db:migrate
   ```

### Environment Variable Issues
Make sure the `DATABASE_URL` is properly set in both:
- Root `.env` file
- `backend/.env` file

**PowerShell specific:** If you get "Environment variable not found: DATABASE_URL":
1. Run the environment loader script:
   ```powershell
   .\load-env.ps1
   ```
2. Or manually set the variable:
   ```powershell
   $env:DATABASE_URL="postgresql://workflowiq:workflowiq_dev_password@localhost:5432/workflowiq"
   ```

## Schema Updates

When updating the Prisma schema:

1. Create a new migration:
   ```bash
   npx prisma migrate dev --name describe_your_changes
   ```

2. Generate the updated client:
   ```bash
   npm run db:generate
   ```

3. Update seed data if necessary and re-run:
   ```bash
   npm run db:seed
   ``` 