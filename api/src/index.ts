import express from 'express'

const PORT = 4200

async function main() {
  const app = express()

  app.get('/', (_, res) => {
    res.send('Hello World!')
  })

  app.listen(PORT, () => {
    console.log(`Magic happening on port ${PORT}`)
  })
}

main()
