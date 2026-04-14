import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import exerciseRoutes from './routes/exercises'
import userRoutes from './routes/user'
import chapterRoutes from './routes/chapters'
import './config/supabase' // Initialize Supabase

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:4173',
      'http://localhost:5173',
      'https://theolearner.vercel.app',
      process.env.CLIENT_URL
    ].filter(Boolean)
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/user', userRoutes)
app.use('/api/chapters', chapterRoutes)

// Error handling
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
