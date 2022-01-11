import app from 'express'

import Home from './home_routes'
import CharactersRouter from './character_routes'

const routes = app.Router()

routes.use('/', Home)
routes.use('/characters', CharactersRouter)

export default routes
