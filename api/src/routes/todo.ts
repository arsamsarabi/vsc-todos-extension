import express from 'express'

import Todo from '../db/models/Todo'
import User from '../db/models/User'

const router = express.Router()

router.post('/', async (req, res) => {
  const { userId } = res.locals
  const todo = new Todo({
    text: req.body.text,
    creatorId: userId,
  })
  const creator = await User.findById(userId)
  const savedTodo = await todo.save()
  await creator?.updateOne({ todos: [savedTodo._id, ...creator.todos] })
  return res.status(200).send({ todo })
})

router.get('/', async (_, res) => {
  const { userId } = res.locals
  const todos = await Todo.find({ creatorId: userId }).sort({ createdAt: 'desc' })
  return res.status(200).send({ todos })
})

router.put('/', async (req, res) => {
  const todo = await Todo.findById(req.body._id)
  await todo?.updateOne(req.body)
  return res.status(200).send('Update successful.')
})

export default router
