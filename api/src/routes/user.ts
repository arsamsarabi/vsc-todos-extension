import express from 'express'

import User from '../db/models/User'

const router = express.Router()

router.get('/me', async (req, res) => {
  const user = await User.findById(req.userId)
  return res.status(200).send({ user })
})

export default router
