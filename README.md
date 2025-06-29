# TSLInterview - React Native App

A modern React Native application built with TypeScript, featuring Redux state management and integration with DummyJSON API for data fetching.

## 📱 Project Overview

This is a React Native mobile application that demonstrates:

- **Modern React Native Architecture** - Built with React Native 0.80.0 and TypeScript
- **State Management** - Redux Toolkit with React-Redux for efficient state management
- **Navigation** - React Navigation v7 with stack and bottom tab navigation
- **API Integration** - DummyJSON.com API for mock data and testing
- **UI Components** - Custom components with React Native SVG and Fast Image
- **Maps Integration** - React Native Maps with geolocation services
- **Performance** - Optimized with FlashList and React Native Reanimated
- **Data Storage** - MMKV for fast local storage
- **Error Handling** - React Error Boundary for graceful error management
- **Type Safety** - Zod for runtime type validation

## 🛠 Tech Stack

### Core Technologies

- **React Native** 0.80.0
- **TypeScript** 5.0.4
- **React** 19.1.0

### State Management

- **Redux Toolkit** (@reduxjs/toolkit) - Modern Redux with simplified boilerplate
- **React-Redux** - Official React bindings for Redux

### Navigation

- **React Navigation** v7 - Stack and Bottom Tab navigation

### API & Data

- **DummyJSON API** - Mock REST API for testing and development
- **Zod** - TypeScript-first schema validation

### UI & Performance

- **React Native Reanimated** - Smooth animations
- **FlashList** - High-performance list component
- **React Native SVG** - Vector graphics support
- **React Native Fast Image** - Optimized image loading

### Storage & Services

- **MMKV** - Fast key-value storage
- **React Native Config** - Environment configuration
- **Geolocation** - Location services

## 🚀 Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 18.0.0)
- **Yarn** or **npm**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **CocoaPods** (for iOS dependencies)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TSLInterview
   ```

2. **Install dependencies**

   ```bash
   # Using Yarn (recommended)
   yarn install

   # OR using npm
   npm install
   ```

3. **Environment Configuration**

   Copy the example environment file and configure your API settings:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration (see Environment Variables section below).

4. **iOS Setup** (macOS only)

   Install Ruby dependencies:

   ```bash
   bundle install
   ```

   Install CocoaPods dependencies:

   ```bash
   cd ios && bundle exec pod install && cd ..
   ```

5. **Android Setup**

   Make sure you have Android Studio installed and configured with:

   - Android SDK
   - Android SDK Platform-Tools
   - Android Emulator or connected device

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# App Configuration
APP_NAME=TSLInterview
VERSION_CODE=1
APP_ID=com.tslinterview

# API Configuration
API_URL=https://dummyjson.com

# Google Maps (if using maps features)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Environment
NODE_ENV=development
```

### DummyJSON API Integration

This app uses [DummyJSON](https://dummyjson.com) as the mock API service. DummyJSON provides:

- **Products** - `/products` - Product catalog with categories

Example API endpoints:

- `GET https://dummyjson.com/products` - Fetch all products
- `GET https://dummyjson.com/products/1` - Fetch single product
- `POST https://dummyjson.com/auth/login` - User authentication

## 🏃‍♂️ Running the Application

### Start Metro Bundler

First, start the Metro development server:

```bash
# Using Yarn
yarn start

# OR using npm
npm start
```

### Run on Android

```bash
# Using Yarn
yarn android

# OR using npm
npm run android
```

### Run on iOS

```bash
# Using Yarn
yarn ios

# OR using npm
npm run ios
```

## 📁 Project Structure

```
TSLInterview/
├── src/
│   ├── assets/          # Images, fonts, and other static assets
│   ├── config/          # App configuration and constants
│   ├── modules/         # Feature modules
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API services and external integrations
│   ├── shared/          # Shared components and utilities
│   ├── state/           # Redux store, slices, and state management
│   ├── theme/           # Theme configuration and styling
│   ├── types/           # TypeScript type definitions
│   └── index.tsx        # Main app entry point
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
├── assets/              # Global assets
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔄 State Management with Redux

This app uses **Redux Toolkit** for state management, providing:

### Store Configuration

- Centralized state management
- Redux DevTools integration
- Middleware for async actions

### Key Features

- **RTK Query** - For efficient API data fetching and caching
- **Redux Slices** - Simplified reducers and actions
- **TypeScript Integration** - Fully typed state and actions
- **Persistence** - State persistence with MMKV

### Usage Example

```typescript
// Using Redux hooks in components
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/state';

const MyComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.feature.data);

  // Dispatch actions
  dispatch(someAction());
};
```

## 🔍 Linting

Check code quality:

```bash
# Using Yarn
yarn lint

# OR using npm
npm run lint
```

## 📱 Development Tips

### Hot Reloading

- **Android**: Press `R` twice or `Ctrl/Cmd + M` → Reload
- **iOS**: Press `R` in iOS Simulator or `Cmd + R`

### Debugging

- **Flipper** - Use Flipper for advanced debugging
- **React Native Debugger** - Standalone debugging tool
- **Redux DevTools** - Monitor state changes

### Performance

- Use **FlashList** instead of FlatList for better performance
- Optimize images with **Fast Image**
- Use **React Native Reanimated** for smooth animations

## 🚨 Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   yarn start --reset-cache
   ```

2. **Android build issues**

   ```bash
   cd android && ./gradlew clean && cd ..
   yarn android
   ```

3. **iOS build issues**

   ```bash
   cd ios && bundle exec pod install && cd ..
   yarn ios
   ```

4. **Environment variables not loading**
   - Ensure `.env` file is in the root directory
   - Restart Metro bundler after changing environment variables

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [DummyJSON API Documentation](https://dummyjson.com/docs)
- [React Navigation Documentation](https://reactnavigation.org/)
- [TypeScript React Native Guide](https://reactnative.dev/docs/typescript)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**
