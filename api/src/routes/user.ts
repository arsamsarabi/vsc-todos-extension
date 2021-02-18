import express from 'express'

import User from '../db/models/User'

const router = express.Router()

router.get('/me', async (_, res) => {
  const user = await User.findById(res.locals.userId)
  return res.status(200).send({ user })
})

export default router
