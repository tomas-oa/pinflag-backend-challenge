import axios from 'axios'
import Character from '../models/character_model'
import BaseController from './base'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const characters = await axios({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character'
    })

    const formatCharacters = characters.data.results.map(({ name, status, species, location }) => {
      return {
        name,
        status,
        species,
        origin: location.name
      }
    })

    return super.Success(res, formatCharacters)
  }

  async create (req, res) {
    const characterData = req.body

    try {
      await Character.create({
        ...characterData
      })
    } catch (error) {
      return super.ErrorBadRequest(res, {
        message: 'Please include all params'
      })
    }

    return super.Success(res, {
      message: 'Character created',
      characterData
    })
  }

  show (req, res) {
    return super.Success(res, '')
  }
}
