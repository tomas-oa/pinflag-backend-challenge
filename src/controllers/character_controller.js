import models from '../models'
import BaseController from './base'
import getCharacters from '../utils/get_characters'
import axios from 'axios'

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
    const { name, status, species, origin } = req.body

    if (!name) return super.ErrorBadRequest(res, 'Please provide a name.')
    if (!status) return super.ErrorBadRequest(res, 'Please provide a status.')
    if (!species) return super.ErrorBadRequest(res, 'Please provide a species.')
    if (!origin) return super.ErrorBadRequest(res, 'Please provide an origin.')

    const character = await models.Character.create({ name, status, species, origin })
    return super.Success(res, character)
  }

  async show (req, res) {
    const { name: queryName } = req.query
    if (!queryName) return super.ErrorBadRequest(res, 'Please provide a name.')
    const character = await models.Character.findOne({ where: { name: queryName } })

    if (!character) {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${queryName}`)
      const { name, status, species, origin } = data.results[0]

      const character = await models.Character.create({ name, status, species, origin: origin.name })
      return super.Success(res, character)
    }

    return super.Success(res, character)
  }
}
