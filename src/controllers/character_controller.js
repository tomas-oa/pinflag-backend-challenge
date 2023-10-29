import BaseController from './base'
import CharacterService from '../services/character_service'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const { n } = req.params
    const numberOfCharacters = Number(n)

    if (!numberOfCharacters) return super.ErrorBadRequest(res, 'Please provide a number of characters.')
    if (numberOfCharacters < 1) return super.ErrorBadRequest(res, 'Please provide a number greater than 0.')
    if (isNaN(numberOfCharacters)) return super.ErrorBadRequest(res, 'Please a valid number of characters.')

    const characters = await CharacterService.getCharacters({ n: numberOfCharacters })
    if (!characters) return super.InternalError(res, 'Something went wrong.')

    return super.Success(res, characters)
  }

  async create (req, res) {
    const { name, status, species, origin } = req.body
    if (!name) return super.ErrorBadRequest(res, 'Please provide a name.')
    if (!status) return super.ErrorBadRequest(res, 'Please provide a status.')
    if (!species) return super.ErrorBadRequest(res, 'Please provide a species.')
    if (!origin) return super.ErrorBadRequest(res, 'Please provide an origin.')

    const character = await CharacterService.createCharacter({ name, status, species, origin })
    if (!character) return super.InternalError(res, 'Something went wrong.')

    return super.Success(res, character)
  }

  async show (req, res) {
    const { name } = req.query
    if (!name) return super.ErrorBadRequest(res, 'Please provide a for the character that you want to search.')

    const character = await CharacterService.show({ queryName: name })
    if (!character) return super.NotFound(res, 'Character not found.')

    return super.Success(res, character)
  }
}
