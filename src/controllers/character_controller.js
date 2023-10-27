import models from '../models'
import BaseController from './base'
import getCharacters from '../utils/get_characters'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const { n } = req.params
    if (!n) return super.ErrorBadRequest(res, 'Please provide a number of characters to fetch.')
    if (isNaN(n)) return super.ErrorBadRequest(res, 'Please provide a valid number of characters to fetch.')
    if (Number(n) <= 0) return super.ErrorBadRequest(res, 'Please provide a number of characters to fetch greater than 0.')

    const characters = await getCharacters({ n: Number(n) })
    const { results } = characters

    return super.Success(res, results)
  }

  async create (req, res) {
    return super.Success(res, '')
  }

  async show (req, res) {
    return super.Success(res, '')
  }
}
