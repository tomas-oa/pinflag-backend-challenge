import axios from 'axios'
import models from '../models'
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
      await models.Character.create(characterData)
    } catch (error) {
      console.log(error)
      return super.ErrorBadRequest(res, {
        message: 'Please include all params'
      })
    }

    return super.Success(res, {
      message: 'Character created',
      characterData
    })
  }

  async show (req, res) {
    const name = req.params.name.toLowerCase()

    let character
    try {
      character = await models.Character.findOne({
        where: {
          name
        }
      })
    } catch (error) {
      super.InternalError(res, 'Internal error finding a character')
    }
    if (!character) {
      character = await axios({
        method: 'GET',
        url: `https://rickandmortyapi.com/api/character/?name=${name}`
      })

      if (!character) return super.NotFound(res, 'Character not found')
    }

    return super.Success(res, character)
  }
}
