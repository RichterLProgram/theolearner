import { Router, Request, Response } from 'express'

const router = Router()

// TODO: Implement user endpoints
// GET /progress - Get user progress
// GET /stats - Get user statistics
// GET /achievements - Get user achievements
// POST /achievements - Unlock achievement
// GET /leaderboard - Get leaderboard

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'user service ok' })
})

export default router
