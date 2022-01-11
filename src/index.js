import express from 'express'

import routes from './routes'

const app = express()
const port = process.env.PORT || 5000

app.use('/', routes)

const startServer = () => {
  app.listen(port, () => {
    console.log(`API running on http://127.0.0.1:${port}/`)
  })
}

startServer()
