import app from 'express'

import Home from './home.routes'

const routes = app.Router()

routes.use('/', Home)

export default routes
