# TheoLearner Frontend

React + TypeScript + Vite + Tailwind CSS Frontend für gamifizierte Theoretische Informatik Platform.

## Setup

### 1. Environment Variables
Kopiere `.env.example` zu `.env.local` und fülle die Firebase Credentials aus:

```bash
cp .env.example .env.local
```

Dann bearbeite `.env.local` mit deinen Firebase Credentials:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:5000/api
```

Hol dir die Credentials von Firebase Console:
- Gehe zu Project Settings → Your Apps
- Wähle Web App
- Kopiere die Konfiguration

### 2. Installation

```bash
npm install
```

### 3. Development

```bash
npm run dev
```

Frontend läuft auf http://localhost:3000

### 4. Scripts

- `npm run dev` — Start dev server with HMR
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Check code quality
- `npm run type-check` — Check TypeScript types

## Pages

- `/` — Dashboard (user stats, topics, leaderboard)
- `/login` — Login page
- `/register` — Registration page
- `/topic/:topicId` — Topic exercises list
- `/exercise/:exerciseId` — Single exercise player
- `/profile` — User profile & achievements

## Components

- `Layout` — Main layout wrapper (header, footer, nav)
- `ExercisePlayer` — Exercise display & MCQ interaction
- Dashboard widgets — Stats, progress bars, leaderboard

## Project Structure

```
src/
  ├── main.tsx           — Entry point
  ├── App.tsx            — Router setup
  ├── index.css          — Global styles
  ├── components/
  │   └── Layout.tsx     — Main layout
  ├── pages/
  │   ├── Dashboard.tsx
  │   ├── TopicView.tsx
  │   ├── ExercisePlayer.tsx
  │   ├── Profile.tsx
  │   └── Auth/
  │       ├── Login.tsx
  │       └── Register.tsx
  ├── hooks/
  │   ├── useAuth.ts     — Firebase auth hook
  │   ├── useExercise.ts — Exercise fetching
  │   └── useUserProgress.ts — User stats
  ├── services/
  │   ├── api.ts         — Axios client
  │   └── Firebase.ts    — Firebase SDK setup
  ├── context/
  │   └── AuthContext.tsx — Auth state management
  └── styles/
      └── globals.css    — Utility styles
```

## Design

- **Colors**: Green (#4CAF50), Orange (#FFC107), Blue (#2196F3), Pink (#E91E63)
- **CSS Framework**: Tailwind CSS
- **Typography**: Inter sans-serif
- **Responsive**: Mobile-first, tested on phones/tablets/desktop

## Features

- ✅ Firebase Authentication (Email, Google, GitHub)
- ✅ Multiple Choice Exercise Player
- ✅ XP & Level System
- ✅ Achievement Unlock
- ✅ Leaderboard
- ✅ User Progress Tracking
- ✅ Responsive Design
