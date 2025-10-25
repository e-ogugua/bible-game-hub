# Developer Onboarding Guide

This guide provides a step-by-step process for new developers to get started with the Bible Game Hub codebase.

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/e-ogugua/bible-game-hub.git
cd bible-game-hub
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Edit .env.local with your development settings
# NODE_ENV=development
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Tests
```bash
# Run linting to check code quality
npm run lint

# Run tests to verify functionality
npm run test

# Run type checking
npx tsc --noEmit
```

### 4. Start Development Server
```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Development Workflow

### Understanding the Codebase

#### Project Structure
```
bible-game-hub/
├── src/app/           # Next.js App Router pages
├── src/components/    # Reusable UI components
├── src/lib/          # Utility functions and services
├── src/modules/      # Game implementation modules
├── src/data/         # Static content and game data
├── src/contexts/     # React context providers
└── src/types/        # TypeScript type definitions
```

#### Key Concepts
- **Game Modules**: Self-contained game implementations (quiz, memory, adventure, stories)
- **Components**: Reusable UI elements with accessibility features
- **Context**: Global state management for user authentication and game progress
- **Services**: Business logic and data management utilities

### Making Changes

#### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

#### 2. Implement Your Changes
- Follow the existing code patterns and conventions
- Include accessibility features in all UI changes
- Write tests for new functionality
- Update documentation as needed

#### 3. Test Your Changes
```bash
# Run all tests
npm run test

# Check linting
npm run lint

# Test build process
npm run build

# Analyze bundle size
npm run analyze
```

#### 4. Submit a Pull Request
- Use the PR template format
- Include clear description of changes
- Reference related issues
- Ensure all tests pass

## Code Standards

### TypeScript Guidelines
- Use explicit types instead of `any`
- Follow the existing interface definitions
- Use union types for better type safety
- Include JSDoc comments for complex functions

### React Component Patterns
- Use functional components with hooks
- Implement proper error boundaries
- Include accessibility features
- Follow responsive design principles

### Styling Conventions
- Use Tailwind CSS with the established design system
- Follow the responsive typography scale
- Maintain consistent spacing and color usage
- Test on multiple screen sizes

## Development Tools

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run test         # Run tests
npm run analyze      # Bundle analysis
npm run type-check   # TypeScript checking
```

### Debugging Tools
- React DevTools for component inspection
- Browser DevTools for performance analysis
- Lighthouse for accessibility and performance auditing
- Bundle analyzer for optimization insights

## Common Development Tasks

### Adding a New Game Mode
1. Create game logic in `src/modules/new-game/`
2. Add routing in `src/app/new-game/page.tsx`
3. Implement UI components
4. Add accessibility features
5. Write comprehensive tests
6. Update documentation

### Modifying Existing Components
1. Understand the component's purpose and props
2. Follow the existing accessibility patterns
3. Test on multiple devices and screen sizes
4. Update related documentation
5. Add tests for new functionality

### Performance Optimization
1. Use React.memo for expensive components
2. Implement code splitting for large features
3. Optimize images and assets
4. Monitor bundle sizes
5. Use performance monitoring tools

## Troubleshooting

### Common Issues

#### Build Errors
- Check for TypeScript errors: `npx tsc --noEmit`
- Verify all dependencies are installed: `npm install`
- Clear cache if needed: `rm -rf .next node_modules && npm install`

#### Runtime Errors
- Check browser console for errors
- Verify environment variables are set correctly
- Test with different browsers and devices

#### Performance Issues
- Use React DevTools Profiler
- Check bundle analysis: `npm run analyze`
- Monitor Core Web Vitals
- Test on slower devices

### Getting Help
- Check existing issues on GitHub
- Review the documentation
- Ask questions in GitHub Discussions
- Create detailed bug reports with reproduction steps

## Best Practices

### Code Quality
- Write self-documenting code with clear variable names
- Use consistent formatting and style
- Include error handling in all async operations
- Follow the established component patterns

### Performance
- Optimize bundle sizes with code splitting
- Use efficient data structures and algorithms
- Minimize re-renders with proper memoization
- Test performance on various devices

### Accessibility
- Test with keyboard navigation only
- Use screen readers to verify accessibility
- Ensure proper color contrast ratios
- Include alternative text for all content

### Security
- Validate and sanitize all user inputs
- Use secure practices for data storage
- Follow security best practices for web applications
- Keep dependencies updated

## Next Steps After Onboarding

1. **Explore the codebase** by reading key files and understanding the architecture
2. **Run the application** and test different features
3. **Make a small change** to get familiar with the development process
4. **Contribute to an issue** or create a new feature
5. **Review pull requests** to understand the review process

---

*Welcome to the Bible Game Hub development team! We're excited to have you contribute to creating engaging faith-based gaming experiences.*
