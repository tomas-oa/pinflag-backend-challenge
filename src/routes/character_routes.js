import app from 'express'
import asyncHandler from 'express-async-handler'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/:n?', asyncHandler(new CharacterController().index))

export default routes
