import app from 'express'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get(
  '/index',
  new CharacterController().index
)

routes.post(
  '/create',
  new CharacterController().create
)

routes.put(
  '/:name',
  new CharacterController().show
)

export default routes
