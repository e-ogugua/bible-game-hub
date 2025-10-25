# Bible Game Hub

Interactive faith-based gaming platform built with Next.js 15, featuring scripture-based games, progress tracking, and community features.

## Overview

Bible Game Hub provides an engaging platform for users to interact with biblical content through gamified experiences. The application supports multiple game modes including quizzes, memory challenges, character stories, and adventure scenarios, all designed to strengthen users' biblical knowledge and faith journey.

Built with modern web technologies and optimized for performance across all devices, the platform emphasizes accessibility, responsive design, and smooth user interactions.

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context with local storage persistence
- **Animations**: CSS-based with Framer Motion for complex interactions
- **3D Graphics**: React Three Fiber for immersive story experiences

### Key Features
- **Game Modes**: Quiz challenges, memory games, character stories, and adventures
- **User System**: Profile management with progress tracking and achievements
- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive keyboard navigation
- **Performance**: Code splitting and lazy loading for optimal bundle sizes
- **PWA Support**: Offline capabilities with service worker caching

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone https://github.com/e-ogugua/bible-game-hub.git
cd bible-game-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run test         # Run tests
npm run analyze      # Bundle analysis
```

## Project Structure

```
bible-game-hub/
├── 📄 README.md                    # Project documentation
├── ⚙️  next.config.js              # Next.js configuration
├── 🐳 Dockerfile                   # Container configuration
├── 🔧 docker-compose.yml           # Local development setup
├── 🌐 vercel.json                  # Serverless deployment
├── 📱 public/                      # Static assets
│   ├── sw.js                       # PWA service worker
│   └── audio/                      # Game audio assets
├── 🎨 src/app/                      # Next.js App Router pages
│   ├── page.tsx                    # Home page
│   ├── quiz/                       # Quiz game mode
│   ├── memory/                     # Memory game mode
│   ├── adventure/                  # Adventure game mode
│   ├── stories/                    # Story game mode
│   └── account/                    # User profile management
├── 🧩 src/components/               # Reusable UI components
│   ├── AccessibleComponents.tsx     # WCAG compliant components
│   ├── Button.tsx                  # Interactive elements
│   └── scenes/                     # 3D story scenes
├── 🔧 src/lib/                     # Utility functions and services
│   ├── config.ts                   # Environment configuration
│   ├── performance.ts              # Performance optimization hooks
│   ├── accessibility.ts            # Accessibility utilities
│   └── dynamicImports.ts           # Code splitting configuration
├── 🎮 src/modules/                  # Game implementation modules
│   ├── quiz/                       # Quiz game logic and data
│   ├── memory/                     # Memory game logic and data
│   ├── adventure/                  # Adventure game logic and data
│   └── StoryGame.tsx               # Story mode implementation
├── 📊 src/data/                    # Game content and biblical data
├── 🔄 src/contexts/                # React context providers
└── 📝 src/types/                   # TypeScript type definitions
```

## Architecture Decisions

### Framework Choice
Next.js 15 was selected for its excellent developer experience, built-in optimization features, and strong TypeScript support. The App Router provides clean routing patterns while the built-in Image optimization and font loading capabilities improve performance.

### State Management
React Context is used for global state management rather than external libraries to maintain simplicity and reduce bundle size. User authentication and game progress are persisted using local storage for offline functionality.

### Styling Approach
Tailwind CSS provides the foundation with a custom design system that maintains visual consistency across platforms. The responsive typography system uses clamp() functions to ensure fluid scaling from mobile to desktop.

### Performance Optimizations
- Route-based code splitting with React.lazy
- Component-based lazy loading for 3D scenes
- Asset optimization with WebP/AVIF formats
- Service worker caching for offline functionality
- CSS animations for GPU acceleration

## Development Guidelines

### Code Quality Standards
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Consistent code style and error detection
- **Prettier**: Automated code formatting
- **Testing**: Jest framework with coverage reporting
- **Accessibility**: WCAG 2.1 AA compliance required

### Git Workflow
1. Create feature branches from `main`
2. Follow conventional commit messages
3. Submit pull requests with clear descriptions
4. Ensure all tests pass before merging
5. Update documentation for significant changes

### Performance Requirements
- Bundle size: <120KB for main bundle
- Core Web Vitals: All metrics in "good" range
- Mobile performance: 60fps interactions
- Accessibility score: 100/100

## Deployment

### Development Environment
```bash
# Local development with hot reload
npm run dev
# Access at http://localhost:3000
```

### Production Deployment
```bash
# Build optimized production bundle
npm run build

# Deploy to Vercel (recommended)
npm run vercel:deploy

# Alternative: Docker deployment
docker build -t bible-game-hub .
docker run -p 3000:3000 bible-game-hub
```

### Environment Configuration
The application uses environment variables for configuration. Copy `.env.example` to `.env.local` and configure:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.biblegamehub.com
NEXT_PUBLIC_CDN_URL=https://cdn.biblegamehub.com
```

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following the coding standards
4. Run tests: `npm run test`
5. Submit a pull request with a clear description

### Code Standards
- Use TypeScript for all new code
- Follow the existing component patterns
- Include accessibility features in all UI changes
- Write tests for new functionality
- Update documentation for significant changes

### Pull Request Process
1. Ensure all tests pass
2. Update README.md if adding new features
3. Follow the PR template format
4. Request review from maintainers

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please create an issue in the GitHub repository or contact the development team.

---

*Built with modern web technologies for an engaging faith-based gaming experience.*
