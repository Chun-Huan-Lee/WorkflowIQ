# Contributing to WorkflowIQ

Thank you for your interest in contributing to WorkflowIQ! 🎉 We're excited to have you join our community and help build the future of AI-powered workflow intelligence.

## 🌟 Welcome Contributors

WorkflowIQ is in its early development stage, and we believe that diverse perspectives and contributions make our project stronger. Whether you're fixing a bug, adding a feature, improving documentation, or suggesting ideas, every contribution is valuable and appreciated.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Ways to Contribute](#-ways-to-contribute)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Pull Request Process](#-pull-request-process)
- [Issue Guidelines](#-issue-guidelines)
- [Community Guidelines](#-community-guidelines)
- [Recognition](#recognition)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold these values:

### Our Standards

**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include:**
- Harassment, discrimination, or unwelcome attention
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and will take fair corrective action in response to unacceptable behavior. Report any issues to [vincent741516899@gmail.com.com](mailto:vincent741516899@gmail.com).

## 🤝 Ways to Contribute

### 🐛 Reporting Bugs

Found a bug? Help us improve by reporting it:

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed information** including:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots or logs if applicable

### 💡 Suggesting Features

Have an idea for a new feature?

1. **Check existing feature requests** to see if it's already suggested
2. **Use the feature request template**
3. **Describe the problem** you're trying to solve
4. **Explain your proposed solution** in detail
5. **Consider alternatives** and explain why your approach is preferred

### 🛠️ Code Contributions

We welcome code contributions! Here's what you can work on:

- **Bug fixes** - Help us squash those pesky bugs
- **Feature implementation** - Bring new capabilities to life
- **Performance improvements** - Make WorkflowIQ faster and more efficient
- **Test coverage** - Help us maintain quality with better tests
- **Refactoring** - Improve code quality and maintainability

### 📖 Documentation

Documentation is crucial for project success:

- **API documentation** - Help document our endpoints and services
- **User guides** - Create tutorials and how-to guides
- **Code comments** - Improve code readability
- **README updates** - Keep our main documentation current
- **Architecture docs** - Help explain system design

### 🎨 Design & UX

Help make WorkflowIQ beautiful and user-friendly:

- **UI/UX improvements** - Enhance user experience
- **Design mockups** - Create visual concepts for new features
- **Accessibility** - Ensure our platform is accessible to everyone
- **Usability testing** - Help us understand user needs

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **Docker** & Docker Compose
- **Git** configured with your GitHub account
- **Code editor** (we recommend VS Code)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/Chun-Huan-Lee/workflowiq.git
   cd workflowiq
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Chun-Huan-Lee/workflowiq.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   cp frontend/.env.local.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

6. **Start development environment**
   ```bash
   npm run docker:dev
   ```

7. **Initialize database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

### Verify Your Setup

After setup, you should be able to access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- AI Services: http://localhost:8001
- Database Studio: http://localhost:5555

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names that follow this pattern:

- `feature/description` - For new features
- `fix/description` - For bug fixes
- `docs/description` - For documentation updates
- `refactor/description` - For code refactoring
- `test/description` - For adding tests

**Examples:**
- `feature/ai-process-discovery`
- `fix/authentication-redirect`
- `docs/api-endpoints`

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Write or update tests** for your changes

4. **Run tests** to ensure nothing is broken
   ```bash
   npm run test
   npm run lint
   ```

5. **Commit your changes** using conventional commits
   ```bash
   git commit -m "feat: add AI-powered process discovery"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** with our template

## 🎯 Coding Standards

### TypeScript/JavaScript

- **Use TypeScript** for all new code
- **Follow ESLint** configuration
- **Use meaningful variable names** that describe their purpose
- **Write JSDoc comments** for functions and classes
- **Prefer functional programming** patterns where appropriate

```typescript
// Good
const calculateProcessEfficiency = (startTime: Date, endTime: Date): number => {
  return (endTime.getTime() - startTime.getTime()) / 1000;
};

// Bad
const calc = (a: any, b: any) => {
  return (b - a) / 1000;
};
```

### React Components

- **Use functional components** with hooks
- **Follow the component naming convention**: PascalCase
- **Keep components small** and focused on single responsibility
- **Use TypeScript interfaces** for props
- **Write meaningful prop names**

```tsx
// Good
interface ProcessCardProps {
  processId: string;
  title: string;
  efficiency: number;
  onEdit: (id: string) => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ 
  processId, 
  title, 
  efficiency, 
  onEdit 
}) => {
  // Component implementation
};
```

### Backend API

- **Use Express.js** with TypeScript
- **Follow RESTful** API conventions
- **Use proper HTTP status codes**
- **Implement error handling** middleware
- **Add request validation** using Joi or similar

```typescript
// Good
router.get('/api/processes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const process = await processService.getById(id);
    
    if (!process) {
      return res.status(404).json({ error: 'Process not found' });
    }
    
    res.json(process);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Database

- **Use Prisma** for database operations
- **Write meaningful migration names**
- **Include proper indexes** for performance
- **Use transactions** for related operations

### Testing

- **Write unit tests** for business logic
- **Write integration tests** for API endpoints
- **Use React Testing Library** for component tests
- **Aim for good test coverage** (70%+ is ideal)

```typescript
// Good test example
describe('ProcessService', () => {
  it('should calculate efficiency correctly', () => {
    const startTime = new Date('2024-01-01T09:00:00Z');
    const endTime = new Date('2024-01-01T10:00:00Z');
    
    const efficiency = calculateProcessEfficiency(startTime, endTime);
    
    expect(efficiency).toBe(3600); // 1 hour in seconds
  });
});
```

## 📝 Pull Request Process

### Before Submitting

- [ ] **Code follows** our style guidelines
- [ ] **Tests pass** locally (`npm run test`)
- [ ] **Linting passes** (`npm run lint`)
- [ ] **Build succeeds** (`npm run build`)
- [ ] **Self-review** completed
- [ ] **Documentation updated** if needed

### Pull Request Template

When creating a PR, use our template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots for UI changes

## Additional Notes
Any additional information reviewers should know
```

### Review Process

1. **Automated checks** must pass (CI/CD, tests, linting)
2. **At least one maintainer** must review
3. **Address feedback** promptly and respectfully
4. **Squash commits** before merging if requested
5. **Delete feature branch** after successful merge

## 🐛 Issue Guidelines

### Bug Reports

Use this template for bug reports:

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Node version: [e.g. 18.17.0]
- WorkflowIQ version: [e.g. 1.0.0]

**Additional Context**
Screenshots, logs, or other helpful information.
```

### Feature Requests

Use this template for feature requests:

```markdown
**Problem Statement**
Describe the problem you're trying to solve.

**Proposed Solution**
Describe the solution you'd like to see.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

## 🌍 Community Guidelines

### Communication

- **Be respectful** and professional in all interactions
- **Use clear, concise language** in issues and PRs
- **Provide context** when asking questions
- **Search existing issues** before creating new ones
- **Use appropriate labels** to categorize issues

### Getting Help

- **GitHub Discussions** - For questions and general discussion
- **Discord** - For real-time chat and community interaction
- **Email** - For sensitive issues or conduct concerns

### Recognition

We believe in recognizing our contributors:

- **Contributors** are listed in our README
- **Significant contributions** are highlighted in release notes
- **Regular contributors** may be invited to join the core team
- **Annual contributor awards** for outstanding contributions

## 🎊 Thank You

Thank you for considering contributing to WorkflowIQ! Your involvement helps make this project better for everyone. We're excited to see what we can build together.

## 📞 Questions?

If you have any questions about contributing, please:

- Check our [FAQ](docs/faq.md) (coming soon)
- Ask in [GitHub Discussions](https://github.com/yourusername/workflowiq/discussions)
- Join our [Discord community](https://discord.gg/workflowiq) (coming soon)
- Email us at [vincent741516899@gmail.com.com](mailto:vincent741516899@gmail.com)

---

**Happy contributing! 🚀** 
