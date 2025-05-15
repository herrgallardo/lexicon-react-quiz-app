# 🚀 Quizify Quiz App

Interactive Quiz Application built with React 19, Firebase, and Open Trivia Database API.

⸻

## 📚 Course Context

- **Program**: Arbetsmarknadsutbildning - IT Påbyggnad/Programmerare
- **Course**: Front-End Development
- **Project Type**: Group Project (Project-5: Quiz Application)
- **Team**: Antonio Gallardo Girela, Jonathan Persson, Jonni Åkesson, Mirjana Vasic

## 🌟 Overview

Quizify is a comprehensive, interactive quiz application that provides users with a dynamic learning experience. Built with modern web technologies, it offers customizable quizzes, real-time score tracking, and a competitive leaderboard system. The application seamlessly integrates with the Open Trivia Database API to provide thousands of questions across multiple categories and difficulty levels.

## 👥 Team Members

Our diverse team brought together complementary skills to create this application:

- **Antonio Gallardo Girela**

  - GitHub: [@herrgallardo](https://github.com/herrgallardo)

- **Jonathan Persson**

  - GitHub: [@JonathanPersson12](https://github.com/JonathanPersson12)

- **Jonni Åkesson**

  - GitHub: [@devbyjonni](https://github.com/devbyjonni)

- **Mirjana Vasic**
  - GitHub: [@Mirjana1234](https://github.com/Mirjana1234)

## 🚀 Live Demo

**Deployed Application**: [https://lexicon-react-quiz-app.vercel.app/quiz](https://lexicon-react-quiz-app.vercel.app/quiz)

**Repository**: [https://github.com/herrgallardo/lexicon-react-quiz-app](https://github.com/herrgallardo/lexicon-react-quiz-app)

## ✨ Key Features

### 🔐 Authentication & User Management

- Secure Firebase Authentication with email/password
- User profile management with customizable display names
- Password reset functionality
- Session persistence across browser sessions

### 🎯 Quiz Customization

- Choose from 20+ categories (Science, History, Sports, etc.)
- Select difficulty levels: Easy, Medium, Hard
- Choose question types: Multiple Choice or True/False
- Customize number of questions (5-30)

### 📊 Real-time Progress Tracking

- Live score tracking during quiz
- Visual progress bar with animated effects
- Question counter with immediate feedback
- Automatic session saving and restoration

### 🏆 Competitive Features

- Global leaderboard with top 10 scores
- Score history with timestamps
- Personal best tracking
- Anonymous guest mode available

### 📱 Responsive Design

- Mobile-first approach with touch-friendly interface
- Responsive breakpoints for all screen sizes
- Optimized for both portrait and landscape orientations
- Smooth animations and transitions

### 🎨 Modern UI/UX

- Glassmorphism design with backdrop blur effects
- Gradient backgrounds and smooth animations
- Intuitive navigation with clear visual hierarchy
- Accessibility considerations throughout

## 🛠️ Technical Implementation

### Frontend Technologies

```javascript
React 19.1.0              // Latest React with concurrent features
React Router 7.5.3        // Client-side routing
FontAwesome 6.7.2         // Icon library
Axios 1.9.0              // HTTP client for API calls
```

### Backend & Services

```javascript
Firebase 11.6.1          // Authentication and database
Firestore               // NoSQL database for scores and profiles
Open Trivia DB API      // External API for quiz questions
```

### Development Tools

```javascript
React Scripts 5.0.1     // Build tooling
Prettier 3.2.5          // Code formatting
Jest & React Testing Library // Testing framework
```

### Deployment

```text
Vercel                  // Serverless deployment platform
Continuous Integration  // Automatic deployments from GitHub
```

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── QuestionCard.jsx # Individual question display
│   ├── QuizProgress.jsx # Progress tracking
│   ├── Leaderboard.jsx # Score display
│   └── QuizResult.jsx  # Final results
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── Quiz.jsx        # Main quiz interface
│   ├── About.jsx       # Team information
│   └── LoginForm.jsx   # Authentication
├── hooks/              # Custom React hooks
│   ├── useTriviaHooks.js # Quiz logic hooks
│   └── useMediaQuery.jsx # Responsive design
├── services/           # External service integrations
│   ├── authService.js  # Firebase Auth wrapper
│   ├── firestoreService.js # Database operations
│   └── triviaService.js # API integration
├── context/            # React Context providers
│   └── AuthContext.js  # Authentication state
├── firebase/           # Firebase configuration
└── utils/              # Utility functions
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account and project

### Local Development Setup

<!-- markdownlint-disable MD029 -->

1. **Clone the repository**

```bash
git clone https://github.com/herrgallardo/lexicon-react-quiz-app.git
cd lexicon-react-quiz-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Admin Configuration (optional)
REACT_APP_ADMIN_UID=admin_user_id_for_dev_tools
```

4. **Start development server**

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database with these collections:
   - `users` - User profiles
   - `scores` - Quiz scores and leaderboard data
4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Anyone can read scores for leaderboard
    match /scores/{scoreId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🎮 How to Use

### Getting Started

1. Visit the application at [lexicon-react-quiz-app.vercel.app](https://lexicon-react-quiz-app.vercel.app/quiz)
2. Create an account or sign in with existing credentials
3. Customize your quiz by selecting:
   - Number of questions (5-30)
   - Category preference
   - Difficulty level
   - Question type

### Taking a Quiz

1. Click "Start Quiz" to begin
2. Read each question carefully
3. Select your answer from the multiple choice options
4. Get immediate feedback (correct/incorrect)
5. View your final score and compare with others

### Features to Explore

- **Leaderboard**: Check top scores and your ranking
- **Profile**: View your quiz history and best scores
- **Session Recovery**: Resume interrupted quizzes automatically
- **Responsive Design**: Enjoy the same experience on any device

## 🧪 Testing

Our application includes comprehensive testing coverage:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage Areas

- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interactions and data flow
- **API Tests**: External service integrations (mocked)
- **Authentication Tests**: Firebase Auth workflows

### Key Test Files

- `authService.test.js` - Authentication logic
- `firestoreService.test.js` - Database operations
- `triviaService.test.js` - API integration
- `LoginForm.test.js` - User interface components
- `quizLogic.test.js` - Core quiz functionality

## 🔍 Development Notes

### Console Logging Strategy

#### Why We Keep Console.logs in Production

We've intentionally maintained console logging statements in our deployed application for several important reasons:

1. **Educational Transparency**: As a learning project for fellow developers, our console logs serve as a real-time documentation system, helping others understand the application flow and state changes.

2. **Debugging Assistance**: The logs provide valuable insights into the application's behavior, making it easier for developers (including future contributors) to understand complex state transitions and API interactions.

3. **State Management Clarity**: Particularly in our quiz logic (`useTriviaHooks.js`), console logs help track score updates, question navigation, and session management - crucial for understanding the application's core functionality.

4. **Learning Resource**: For students and developers studying React patterns, our console output demonstrates best practices in state management, API integration, and user authentication flows.

5. **Troubleshooting Support**: If users experience issues, the console logs provide immediate diagnostics without requiring additional debugging tools or configurations.

#### Implementation Examples

```javascript
// Score tracking in useQuiz hook
console.log('Setting score to:', newScore);
console.log('Current score state:', score);

// API response handling
console.log('Questions loaded successfully:', data.length);

// Authentication state changes
console.log('User authenticated:', user.email);
```

### Code Quality & Standards

- **ESLint Configuration**: Enforces consistent code style
- **Prettier Integration**: Automatic code formatting
- **Component Structure**: Modular, reusable components
- **Error Boundaries**: Graceful error handling throughout the app
- **TypeScript-ready**: JSDoc comments for future TypeScript migration

## 🚀 Deployment

### Vercel Deployment

Our application is deployed on Vercel with automatic deployments configured:

1. **Connected to GitHub**: Automatic deployments on push to main branch
2. **Environment Variables**: Securely configured in Vercel dashboard
3. **Custom Domain**: Optional custom domain configuration
4. **Performance Optimizations**: Automatic code splitting and optimization

### Manual Deployment

To deploy your own instance:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Set environment variables
vercel env add REACT_APP_FIREBASE_API_KEY
```

## 📈 Future Enhancements

### Planned Features

- **Quiz Categories Statistics**: Detailed analytics per category
- **Multiplayer Mode**: Real-time quiz competitions
- **Custom Quiz Creation**: User-generated content
- **Advanced Analytics**: Detailed performance metrics
- **Social Features**: Share results, challenge friends
- **Offline Mode**: Progressive Web App capabilities

### Technical Improvements

- **TypeScript Migration**: Enhanced type safety
- **Micro-animations**: More engaging user interactions
- **Advanced Caching**: Improved performance for repeat users
- **Accessibility Enhancements**: WCAG 2.1 AA compliance
- **Internationalization**: Multi-language support

## 🤝 Contributing

While this is a course project, we welcome contributions and feedback:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed
- Ensure responsive design compliance

## 📜 License

This project is created for educational purposes as part of the Lexicon course curriculum. All rights reserved to the respective team members and educational institution.

## 🙏 Acknowledgments

- **Lexicon Course Instructors**: For guidance and project requirements
- **Open Trivia Database**: For providing the extensive question API
- **Firebase Team**: For the robust backend services
- **React Community**: For the amazing ecosystem and documentation
- **Course Colleagues**: For peer reviews and collaborative learning

## 📞 Contact

For questions about this project or collaboration opportunities:

- **Project Repository**: [GitHub](https://github.com/herrgallardo/lexicon-react-quiz-app)
- **Course**: Arbetsmarknadsutbildning - IT Påbyggnad/Programmerare

---

Built with ❤️ by Team Quizify - Antonio, Jonathan, Jonni & Mirjana
