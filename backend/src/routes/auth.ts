import { Router, Request, Response } from 'express'

const router = Router()

// TODO: Implement auth endpoints
// POST /register - Register new user
// POST /login - Login user
// POST /logout - Logout user
// GET /me - Get current user
// POST /refresh - Refresh ID token

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'auth service ok' })
})

export default router
