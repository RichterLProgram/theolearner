# TheoLearner Backend

Node.js + Express + Firebase Backend für gamifizierte Theoretische Informatik Platform.

## Setup

### 1. Environment Variables
Kopiere `.env.example` zu `.env` und fülle die Firebase Credentials aus:

```bash
cp .env.example .env
```

Dann bearbeite `.env`:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

Hol dir die Credentials von Firebase Console:
- Gehe zu Project Settings → Service Accounts
- Klick "Generate New Private Key"
- Kopiere die Werte in `.env`

### 2. Installation

```bash
npm install
```

### 3. Development

```bash
npm run dev
```

Server läuft auf http://localhost:5000

### 4. Scripts

- `npm run dev` — Start dev server with hot reload
- `npm run build` — Compile TypeScript
- `npm run start` — Run compiled production build
- `npm run lint` — Check code quality
- `npm run type-check` — Check TypeScript types

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user

### Exercises
- `GET /api/exercises` — List all exercises
- `GET /api/exercises/:id` — Get exercise details
- `POST /api/exercises/:id/submit` — Submit answer

### User
- `GET /api/user/progress` — Get user progress & stats
- `GET /api/user/achievements` — Get user achievements
- `GET /api/leaderboard` — Get global leaderboard

## Project Structure

```
src/
  ├── index.ts           — Entry point / app setup
  ├── config/
  │   └── firebase.ts    — Firebase initialization
  ├── routes/
  │   ├── auth.ts        — Auth endpoints
  │   ├── exercises.ts   — Exercise endpoints
  │   └── user.ts        — User progress endpoints
  ├── services/
  │   ├── ExerciseService.ts
  │   ├── GamificationService.ts
  │   └── UserService.ts
  ├── middleware/
  │   └── auth.ts        — Firebase ID token verification
  └── data/
      └── aufgaben-2-2.ts — Seed data for exercises
```

## Firestore Collections

- `users/` — User profiles & account data
- `exercises/` — Exercise definitions
- `topics/` — Topic/Chapter metadata
- `userProgress/` — User exercise attempts & progress
- `achievements/` — Achievement definitions

## Gamification

- **XP**: Earned when correct answer submitted (varies by difficulty)
- **Levels**: Level = floor(totalXP / 100) + 1
- **Achievements**: Unlocked based on conditions (e.g., "First 5 Exercises")
- **Leaderboard**: Top users by total XP (cached weekly)
