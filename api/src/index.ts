require('dotenv-safe').config()
import './db/connection'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import morgan from 'morgan'

import routes from './routes'
import { __prod__ } from './config/constants'

const { PORT } = process.env

async function main() {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(passport.initialize())

  if (!__prod__) {
    app.use(morgan('tiny'))
  }

  app.use('/', routes)

  app.listen(PORT, () => {
    console.log(`Magic happening on port ${PORT}`)
  })
}

main()
