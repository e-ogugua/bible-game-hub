# Bible Game Hub v4.0 - FaithVerse Connected Edition

A comprehensive, immersive faith-based gaming platform built with Next.js 15, featuring interactive Bible stories, quizzes, memory games, and a complete user profile system.

## 🌟 Features

### 🎮 Game Modes
- **Bible Quiz Challenge** - Test your knowledge with scripture-based questions
- **Scripture Memory** - Memorize and recall famous Bible verses
- **Character Stories** - Interactive journey through biblical narratives (Moses, David, Jesus)
- **Bible Adventures** - Epic faith-based adventure experiences

### 🎨 Visual & Audio Experience
- **3D Story Scenes** - Immersive 3D visualizations with particle effects and lighting
- **Ambient Audio** - Character-specific background music and sound effects
- **Divine Atmosphere** - Sacred lighting, ray effects, and parallax backgrounds
- **Responsive Design** - Optimized for desktop and mobile devices

### 👥 FaithVerse Community System
- **User Profiles** - Complete account management with progress tracking
- **Leaderboards** - Dynamic rankings with XP, scores, and achievements
- **Save Sync** - Local storage with export/import functionality
- **Social Preview** - Community features roadmap and early access

### 🛠️ Technical Features
- **Next.js 15** - Latest App Router with server-side rendering
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Modern, responsive styling
- **Framer Motion** - Smooth animations and transitions
- **React Three Fiber** - 3D graphics and visual effects
- **Howler.js** - Audio management and playback
- **Local Storage** - Offline-first architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
bible-game-hub/
├── public/                 # Static assets (audio, images)
│   └── audio/             # Ambient music and sound effects
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── account/       # User profile management
│   │   ├── adventure/     # Adventure game mode
│   │   ├── faithverse/    # Community features preview
│   │   ├── leaderboard/   # Rankings and scores
│   │   ├── quiz/          # Quiz game mode
│   │   └── stories/       # Story mode with 3D scenes
│   ├── components/        # Reusable UI components
│   │   ├── scenes/        # 3D story scenes (Burning Bush, Red Sea, etc.)
│   │   ├── FaithVerse.tsx # Main community page
│   │   └── Leaderboard.tsx # Rankings component
│   ├── contexts/          # React context providers
│   ├── data/              # Game data and content
│   ├── lib/               # Utility services
│   ├── modules/           # Game mode implementations
│   └── types/             # TypeScript type definitions
└── package.json           # Dependencies and scripts
```

## 🎯 Game Modes

### Quiz Mode
- Multiple choice questions about biblical stories and characters
- Progressive difficulty with scoring system
- Achievement tracking and progress persistence

### Memory Mode
- Scripture memorization challenges
- Card matching gameplay with biblical verses
- Multiple difficulty levels and themes

### Story Mode
- Interactive narratives through Moses, David, and Jesus stories
- Branching choices that affect outcomes and scoring
- 3D visual scenes with immersive storytelling

### Adventure Mode
- Epic faith-based adventures
- Character progression and skill development
- Multiple story branches and outcomes

## 🔧 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Code Quality

- **ESLint** - Code linting and error detection
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Jest** - Testing framework (configured)

## 🎨 Design System

### Color Palette
- **Primary Purple**: `#7C3AED` - Faith and spirituality
- **Divine Gold**: `#FBBF24` - Sacred and holy elements
- **Heavenly Blue**: `#3B82F6` - Trust and peace
- **Sacred White**: `#FFFFFF` - Purity and light

### Typography
- **Headings**: Poppins (modern, clean)
- **Body**: Inter (readable, accessible)
- **Scripture**: Merriweather (elegant serif for biblical text)

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Interactive Elements**: Hover states with divine light effects
- **Loading States**: Elegant spinners and progress indicators

## 🌐 Deployment

The application is configured for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Self-hosted** (Docker/Node.js)

### Environment Variables

Create a `.env.local` file:
```env
# Optional: Analytics and monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 📚 API Reference

### Profile Service (`/lib/profileService.ts`)
```typescript
// Create user profile
ProfileService.createProfile(profileData)

// Get current profile
ProfileService.getCurrentProfile()

// Update profile
ProfileService.updateProfile(profileId, updates)

// Export/Import profiles
ProfileService.exportProfileData()
ProfileService.importProfileData(jsonData)
```

### Audio Manager (`/lib/audioManager.ts`)
```typescript
// Play ambient music
audioManager.playAmbientMusic('moses')

// Play sound effects
audioManager.playSoundEffect('choice')

// Volume controls
audioManager.setVolume(0.5)
audioManager.mute()
```

## 🔮 Roadmap

### Phase 6 (Future)
- Real-time multiplayer features
- Cloud synchronization with Supabase/Firebase
- Advanced social features and community challenges
- Progressive Web App (PWA) capabilities
- Advanced analytics and user insights

## 🤝 Contributing

This project is developed by Emmanuel Chukwuka Ogugua as part of a faith-based gaming initiative.

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Ensure accessibility compliance
- Test across different devices and browsers

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

Built with love and faith for the global Christian community. Special thanks to:
- The Bible Study community for inspiration
- Open source contributors and the React ecosystem
- Faith-based organizations supporting digital ministry

---

*"For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future."* - Jeremiah 29:11
