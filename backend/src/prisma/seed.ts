import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create a sample organization
  const organization = await prisma.organization.upsert({
    where: { id: 'sample-org-1' },
    update: {},
    create: {
      id: 'sample-org-1',
      name: 'WorkflowIQ Demo Organization',
      domain: 'demo.workflowiq.com',
      plan: 'PROFESSIONAL',
      settings: {
        enableAI: true,
        enableRealTimeCollaboration: true,
        timezone: 'UTC'
      },
      limits: {
        maxUsers: 100,
        maxWorkflows: 1000,
        maxProcesses: 500
      }
    }
  });

  console.log('✅ Created organization:', organization.name);

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@workflowiq.com' },
    update: {},
    create: {
      email: 'admin@workflowiq.com',
      passwordHash: adminPasswordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
      timezone: 'UTC',
      organizationId: organization.id,
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true
        }
      }
    }
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create a regular user
  const userPasswordHash = await bcrypt.hash('user123', 10);
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@workflowiq.com' },
    update: {},
    create: {
      email: 'user@workflowiq.com',
      passwordHash: userPasswordHash,
      firstName: 'John',
      lastName: 'Doe',
      role: 'ANALYST',
      status: 'ACTIVE',
      timezone: 'UTC',
      organizationId: organization.id,
      bio: 'A sample user for testing the WorkflowIQ platform',
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          push: false
        }
      }
    }
  });

  console.log('✅ Created regular user:', regularUser.email);

  // Create a sample workflow
  const sampleWorkflow = await prisma.workflow.upsert({
    where: { id: 'sample-workflow-1' },
    update: {},
    create: {
      id: 'sample-workflow-1',
      name: 'Employee Onboarding Process',
      description: 'A comprehensive workflow for onboarding new employees',
      status: 'ACTIVE',
      version: 1,
      nodes: [
        {
          id: 'start',
          type: 'start',
          position: { x: 100, y: 100 },
          data: { label: 'Start Onboarding' }
        },
        {
          id: 'hr-review',
          type: 'task',
          position: { x: 300, y: 100 },
          data: { 
            label: 'HR Document Review',
            assignee: 'hr-team',
            duration: '2 hours'
          }
        },
        {
          id: 'it-setup',
          type: 'task',
          position: { x: 500, y: 100 },
          data: { 
            label: 'IT Account Setup',
            assignee: 'it-team',
            duration: '1 hour'
          }
        },
        {
          id: 'end',
          type: 'end',
          position: { x: 700, y: 100 },
          data: { label: 'Onboarding Complete' }
        }
      ],
      connections: [
        { source: 'start', target: 'hr-review' },
        { source: 'hr-review', target: 'it-setup' },
        { source: 'it-setup', target: 'end' }
      ],
      metadata: {
        category: 'HR',
        tags: ['onboarding', 'employee', 'hr'],
        estimatedDuration: '3 hours'
      },
      organizationId: organization.id,
      createdBy: adminUser.id,
      publishedAt: new Date()
    }
  });

  console.log('✅ Created sample workflow:', sampleWorkflow.name);

  // Create a sample business process
  const sampleProcess = await prisma.businessProcess.upsert({
    where: { id: 'sample-process-1' },
    update: {},
    create: {
      id: 'sample-process-1',
      name: 'Invoice Processing',
      description: 'End-to-end invoice processing from receipt to payment',
      department: 'Finance',
      category: 'Accounts Payable',
      status: 'DOCUMENTED',
      complexity: 'MEDIUM',
      steps: [
        {
          id: 1,
          name: 'Invoice Receipt',
          description: 'Receive invoice from vendor',
          duration: '5 minutes',
          frequency: 'Daily'
        },
        {
          id: 2,
          name: 'Invoice Validation',
          description: 'Validate invoice details and amounts',
          duration: '15 minutes',
          frequency: 'Daily'
        },
        {
          id: 3,
          name: 'Approval Process',
          description: 'Get approval from department head',
          duration: '30 minutes',
          frequency: 'Daily'
        },
        {
          id: 4,
          name: 'Payment Processing',
          description: 'Process payment to vendor',
          duration: '10 minutes',
          frequency: 'Weekly'
        }
      ],
      metrics: {
        averageProcessingTime: '60 minutes',
        throughput: '25 invoices per day',
        errorRate: '2%',
        costPerTransaction: '$5.50'
      },
      stakeholders: [
        { role: 'Finance Manager', involvement: 'High' },
        { role: 'Accounts Payable Clerk', involvement: 'High' },
        { role: 'Department Head', involvement: 'Medium' }
      ],
      tags: ['finance', 'invoice', 'payment', 'approval'],
      organizationId: organization.id,
      createdBy: adminUser.id
    }
  });

  console.log('✅ Created sample business process:', sampleProcess.name);

  // Create a sample dashboard
  const sampleDashboard = await prisma.dashboard.upsert({
    where: { id: 'sample-dashboard-1' },
    update: {},
    create: {
      id: 'sample-dashboard-1',
      name: 'Workflow Performance Dashboard',
      description: 'Overview of workflow performance metrics and KPIs',
      widgets: [
        {
          id: 'widget-1',
          type: 'metric',
          title: 'Active Workflows',
          position: { x: 0, y: 0, width: 4, height: 2 },
          config: {
            metric: 'workflow_count',
            timeframe: 'current'
          }
        },
        {
          id: 'widget-2',
          type: 'chart',
          title: 'Workflow Executions Over Time',
          position: { x: 4, y: 0, width: 8, height: 4 },
          config: {
            chartType: 'line',
            metric: 'executions',
            timeframe: '30d'
          }
        },
        {
          id: 'widget-3',
          type: 'table',
          title: 'Recent Workflow Executions',
          position: { x: 0, y: 4, width: 12, height: 6 },
          config: {
            columns: ['workflow', 'status', 'duration', 'completed_at'],
            limit: 10
          }
        }
      ],
      filters: {
        dateRange: '30d',
        organizationId: organization.id
      },
      isPublic: false,
      refreshInterval: 300,
      organizationId: organization.id,
      createdBy: adminUser.id
    }
  });

  console.log('✅ Created sample dashboard:', sampleDashboard.name);

  // Create API key for the organization
  const apiKey = await prisma.apiKey.upsert({
    where: { id: 'sample-api-key-1' },
    update: {},
    create: {
      id: 'sample-api-key-1',
      name: 'Demo API Key',
      key: 'wiq_demo_key_' + Math.random().toString(36).substring(2, 15),
      permissions: ['read:workflows', 'write:workflows', 'read:processes'],
      isActive: true,
      organizationId: organization.id,
      createdBy: adminUser.id
    }
  });

  console.log('✅ Created API key:', apiKey.name);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📝 Sample accounts created:');
  console.log(`Admin: admin@workflowiq.com / admin123`);
  console.log(`User: user@workflowiq.com / user123`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 