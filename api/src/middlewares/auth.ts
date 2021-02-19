import { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export const authMiddleware: RequestHandler<{}, any, any, {}> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!authHeader || !token) return res.status(401).send({ error: new Error('Not authenticated.') })

  try {
    const payload: any = jwt.verify(token || '', JWT_SECRET)
    req.userId = payload.userId
    next()
    return
  } catch {}

  return res.status(401).send({ error: new Error('Not authenticated.') })
}
