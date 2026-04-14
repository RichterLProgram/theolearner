import { Router, Request, Response } from 'express'

const router = Router()

// TODO: Implement exercise endpoints
// GET / - Get all exercises (with filters)
// GET /:id - Get single exercise
// POST /:id/submit - Submit answer & check
// GET /topic/:topicId - Get exercises for a topic

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'exercises service ok' })
})

export default router
