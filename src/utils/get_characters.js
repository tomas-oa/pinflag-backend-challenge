import axios from 'axios'

const BASE_URL = 'https://rickandmortyapi.com/api'

export default async function getCharacters ({ n }) {
  try {
    const charactersArray = Array(n).fill().map((_, i) => i + 1)
    const { data } = await axios.get(`${BASE_URL}/character/${charactersArray}`)

    // handle if data is an object
    if (n === 1) {
      const { name, status, species, origin } = data
      return { results: { name, status, species, origin: origin.name } }
    }

    const results = data.map(({ name, status, species, origin }) => ({ name, status, species, origin: origin.name }))
    return { results }
  } catch (error) {
    console.error(error)
  }
}
