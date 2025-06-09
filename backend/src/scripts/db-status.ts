import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabaseStatus() {
  try {
    console.log('🔍 Checking database connection and status...\n');

    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection: OK');

    // Get counts of various entities
    const [
      organizationCount,
      userCount,
      workflowCount,
      processCount,
      dashboardCount,
      apiKeyCount
    ] = await Promise.all([
      prisma.organization.count(),
      prisma.user.count(),
      prisma.workflow.count(),
      prisma.businessProcess.count(),
      prisma.dashboard.count(),
      prisma.apiKey.count()
    ]);

    console.log('\n📊 Database Statistics:');
    console.log(`   Organizations: ${organizationCount}`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Workflows: ${workflowCount}`);
    console.log(`   Business Processes: ${processCount}`);
    console.log(`   Dashboards: ${dashboardCount}`);
    console.log(`   API Keys: ${apiKeyCount}`);

    // Get sample data
    const sampleOrg = await prisma.organization.findFirst({
      include: {
        users: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            role: true
          }
        }
      }
    });

    if (sampleOrg) {
      console.log('\n🏢 Sample Organization:');
      console.log(`   Name: ${sampleOrg.name}`);
      console.log(`   Plan: ${sampleOrg.plan}`);
      console.log(`   Users: ${sampleOrg.users.length}`);
      
      if (sampleOrg.users.length > 0) {
        console.log('\n👥 Sample Users:');
        sampleOrg.users.forEach(user => {
          console.log(`   - ${user.firstName} ${user.lastName} (${user.email}) - ${user.role}`);
        });
      }
    }

    console.log('\n🎉 Database is ready for use!');
    console.log('\n💡 You can view and manage your data using:');
    console.log('   - Prisma Studio: npx prisma studio');
    console.log('   - Adminer (if running): http://localhost:8080');

  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseStatus(); 