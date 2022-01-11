import app from 'express'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.post('/', new CharacterController().create)

export default routes
