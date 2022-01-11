import express from 'express'

import routes from './routes'

const app = express()
const port = process.env.PORT || 6000

app.use('/api', routes)

const startServer = () => {
  app.listen(port, () => {
    console.log(`API running on http://127.0.0.1:${port}/`)
  })
}

startServer()
