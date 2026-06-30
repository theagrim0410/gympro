# GymPro 💪

A comprehensive Expo React Native fitness application that helps users manage their fitness journey with workout tracking, nutrition planning, BMI calculation, and admin management features.

## Features

- **User Authentication**: Login and registration system
- **Workout Management**: Track and view workout routines
- **Nutrition Planning**: Access nutrition data and meal plans
- **BMI Calculator**: Calculate and monitor Body Mass Index
- **User Profiles**: Manage user data and settings
- **Complaint System**: Report and track user complaints
- **Admin Panel**: Administrative dashboard and complaint management
- **Cross-Platform**: Available on iOS, Android, and Web

## Project Structure

```
gym/
├── app/                          # Main application screens & routing
│   ├── _layout.tsx              # Root layout configuration
│   ├── index.tsx                # Home screen
│   ├── login.tsx                # User login screen
│   ├── register.tsx             # User registration screen
│   ├── home.tsx                 # Main home page
│   ├── workout.tsx              # Workout tracking screen
│   ├── nutrition.tsx            # Nutrition information screen
│   ├── BMICalculator.tsx        # BMI calculation screen
│   ├── userdata.tsx             # User data management
│   ├── setting.tsx              # User settings
│   ├── complains.tsx            # User complaint submission
│   ├── showcomplaints.tsx       # Complaint display screen
│   ├── admin.tsx                # Admin dashboard
│   ├── adminsetting.jsx         # Admin settings
│   └── addUser.tsx              # Add new user (admin)
├── components/                   # Reusable components
│   ├── Header.tsx               # Main header component
│   ├── AdminHeader.tsx          # Admin header component
│   └── Loader.tsx               # Loading spinner component
├── constant/                    # Constants & static data
│   ├── login.js                 # Login constants
│   ├── userdata.js              # User data constants
│   ├── users.js                 # Users data
│   ├── workout.js               # Workout data
│   ├── nutritionData.js         # Nutrition data
│   ├── complain.js              # Complaint constants
│   ├── light.js                 # Theme/styling constants
│   └── data.txt                 # Additional data file
├── assets/                       # Static assets
│   ├── bg1.jpg                  # Background image
│   ├── burpees-video.mp4        # Burpees exercise video
│   ├── burpees.jpg              # Burpees exercise image
│   ├── plank-video.mp4          # Plank exercise video
│   ├── plank.jpg                # Plank exercise image
│   ├── push-up.jpg              # Push-up exercise image
│   ├── push-ups-video.mp4       # Push-ups exercise video
│   ├── sliding-floor-bridge-curl-video.mp4  # Sliding floor bridge curl video
│   ├── sliding-floor-bridge-curl.png        # Sliding floor bridge curl image
│   ├── squats-video.mp4         # Squats exercise video
│   ├── squats.jpg               # Squats exercise image
│   ├── start.png                # Start screen image
│   └── images/                  # App icon and splash screen assets
│       ├── android-icon-background.png      # Android icon background
│       ├── android-icon-foreground.png      # Android icon foreground
│       ├── android-icon-monochrome.png      # Android icon monochrome
│       ├── favicon.png                      # Favicon for web
│       ├── icon.png                         # App icon
│       ├── partial-react-logo.png           # Partial React logo
│       ├── react-logo.png                   # React logo (standard)
│       ├── react-logo@2x.png                # React logo (2x resolution)
│       ├── react-logo@3x.png                # React logo (3x resolution)
│       └── splash-icon.png                  # Splash screen icon
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── app.json                    # Expo app configuration
├── expo-env.d.ts               # Environment types
├── CLAUDE.md                   # Claude AI instructions
├── AGENTS.md                   # Agent definitions
└── README.md                   # Project documentation
```

## Tech Stack

- **Framework**: Expo with React Native
- **Language**: TypeScript & JavaScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Native AsyncStorage
- **UI Components**: 
  - React Navigation (Bottom Tabs)
  - Expo Vector Icons
  - Custom components
- **Additional Libraries**:
  - React Native Circular Progress Indicator
  - React Native Gesture Handler
  - React Native Reanimated
  - React Native Safe Area Context

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Choose your platform to run the app:**

   - **Android Emulator**: Press `a` in the terminal
   - **iOS Simulator**: Press `i` in the terminal
   - **Web**: Press `w` in the terminal
   - **Expo Go App**: Scan the QR code with Expo Go on your mobile device

### Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Lint the code
npm lint

# Reset project to starter template
npm run reset-project
```

## File-Based Routing

This project uses Expo Router's file-based routing system. Files in the `app/` directory automatically become routes:

- `app/index.tsx` → `/`
- `app/login.tsx` → `/login`
- `app/register.tsx` → `/register`
- `app/home.tsx` → `/home`
- And so on...

## Environment Configuration

See [Expo Documentation](https://docs.expo.dev/versions/v54.0.0/) for the latest version-specific documentation and setup guides.

## Development

The app uses TypeScript for type safety. Key folders:

- **app/**: All screen components and routing logic
- **components/**: Reusable UI components
- **constant/**: Static data, constants, and configuration values

## Learn More

- [Expo Documentation](https://docs.expo.dev/): Learn fundamentals and advanced topics
- [React Native Docs](https://reactnative.dev/): Core React Native concepts
- [Expo Router Guide](https://docs.expo.dev/router/introduction/): File-based routing documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/): TypeScript language features

## Support & Community

- [Expo GitHub](https://github.com/expo/expo): Report issues and contribute
- [Expo Discord](https://chat.expo.dev): Get help from the community
- [Expo Snack](https://snack.expo.dev/): Try Expo online without local setup
