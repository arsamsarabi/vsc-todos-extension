import express from 'express'

import { authMiddleware } from '../middlewares/auth'
import auth from './auth'
import user from './user'
import todo from './todo'

const router = express.Router()

router.get('/', (_, res) => {
  res.send('Hello World!')
})

router.use('/auth', auth)
router.use('/user', authMiddleware, user)
router.use('/todo', authMiddleware, todo)

export default router
