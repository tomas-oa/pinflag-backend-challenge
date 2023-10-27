import models from '../models'
import axios from 'axios'

const BASE_URL = 'https://rickandmortyapi.com/api'

export default class CharacterService {
  static async getCharacters ({ n }) {
    try {
      const charactersArray = Array(n).fill().map((_, i) => i + 1)
      const { data } = await axios.get(`${BASE_URL}/character/${charactersArray}`)

      if (n === 1) {
        const { name, status, species, origin } = data
        return { name, status, species, origin: origin.name }
      }

      return data.map(({ name, status, species, origin }) => ({ name, status, species, origin: origin.name }))
    } catch (error) {
      console.error(error)
    }
  }

  static async createCharacter ({ name, status, species, origin }) {
    try {
      return await models.Character.create({ name, status, species, origin })
    } catch (error) {
      console.error(error)
    }
  }

  static async show ({ queryName }) {
    let character = await models.Character.findOne({ where: { name: queryName } })

    if (!character) {
      const { data } = await axios.get(`${BASE_URL}/character/?name=${queryName}`)
      const { name, status, species, origin } = data.results[0]
      character = { name, status, species, origin: origin.name }
    }

    return character
  }
}
