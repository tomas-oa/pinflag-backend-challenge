import express from 'express'

import './config/environment'
import routes from './routes'
import './models'
import swaggerDocs from './config/swagger'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/', routes)
app.all('*', (_, res) => res.status(404).json({ message: 'Route not defined' }))

const startServer = () => {
  app.listen(port, () => {
    swaggerDocs(app)
    console.log(`API running on http://127.0.0.1:${port}/`)
  })
}

startServer()
export default app
