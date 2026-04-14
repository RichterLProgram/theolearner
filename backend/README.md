# TheoLearner Backend

Node.js + Express + Supabase (PostgreSQL) Backend für gamifizierte Theoretische Informatik Platform.

## Setup

### 1. Environment Variables
Kopiere `.env.example` zu `.env` und fülle die Supabase Credentials aus:

```bash
cp .env.example .env
```

Dann bearbeite `.env`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-from-supabase
```

Hol dir die Credentials von Supabase:
- Gehe zu Supabase Project Settings → API
- Kopiere `Project URL` (SUPABASE_URL)
- Kopiere `anon` Key (SUPABASE_ANON_KEY)
- Kopiere `service_role` Key (SUPABASE_SERVICE_ROLE_KEY)

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

## Supabase (PostgreSQL) Tables

- `users` — User profiles & account data
- `exercises` — Exercise definitions
- `topics` — Topic/Chapter metadata
- `user_progress` — User exercise attempts & progress
- `achievements` — Achievement definitions
- `user_achievements` — User achievement unlock tracking

## Gamification

- **XP**: Earned when correct answer submitted (varies by difficulty)
- **Levels**: Level = floor(totalXP / 100) + 1
- **Achievements**: Unlocked based on conditions (e.g., "First 5 Exercises")
- **Leaderboard**: Top users by total XP (cached weekly)
