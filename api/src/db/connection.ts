import mongoose from 'mongoose'

import { __prod__ } from '../config/constants'

const DB_URI = __prod__ ? 'PROD_DB' : `mongodb://localhost:27017/vstodos`

const mongooseConfig = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose
  .connect(DB_URI, mongooseConfig)
  .then(() => console.log('  ☁️  Connected to MongoDB on the cloud  ☁️  '))
  .catch((error) => console.log('Could not connect to MongoDB', error))
