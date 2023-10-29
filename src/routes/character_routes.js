import app from 'express'
import asyncHandler from 'express-async-handler'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

/**
 * @openapi
 * /character?name={name}:
 *   get:
 *     tags:
 *       - Character
 *     summary: Find a character by name
 *     description: Retrieves a character from the database based on the name provided or from the Rick and Morty API if it doesn't exist in the database.
 *     parameters:
 *       - name: name
 *         required: true
 *         in: query
 *         description: Character name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Character found
 *       400:
 *         description: No name provided
 *       404:
 *         description: Character not found in the database or in the Rick and Morty API
 *       500:
 *         description: Internal Server Error
 */
routes.get('/', asyncHandler(new CharacterController().show))
/**
 * @openapi
 * /character/{number_of_characters}:
 *   get:
 *     tags:
 *       - Character
 *     summary: Retrieve a list of characters
 *     description: Retrieves a list of characters from the Rick and Morty API based on the number provided.
 *     parameters:
 *       - name: number_of_characters
 *         required: true
 *         in: path
 *         description: Number of characters to retrieve
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Returns a list of characters
 *       400:
 *         description: Missing number of characters or invalid number
 *       500:
 *         description: Internal Server Error
 */
routes.get('/:n?', asyncHandler(new CharacterController().index))

/**
 * @openapi
 * /character:
 *   post:
 *     tags:
 *       - Character
 *     summary: Create a character
 *     description: Creates a character in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Guts
 *               status:
 *                 type: string
 *                 example: Alive
 *               species:
 *                 type: string
 *                 example: Human
 *               origin:
 *                 type: string
 *                 example: Earth
 *     responses:
 *       200:
 *         description: Character created
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
routes.post('/', asyncHandler(new CharacterController().create))

export default routes
