import request from 'supertest'
import app from '../index'

const validDBCharacter = {
  name: 'Miles Davis',
  status: 'Dead',
  species: 'Human',
  origin: 'Earth'
}

const validAPICharacter = {
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  origin: 'unknown'
}

describe('GET: /character/:n', () => {
  test('should return 400 if number of characters is not provided', async () => {
    const response = await request(app).get('/character/')
    expect(response.statusCode).toBe(400)
  })
  test('should return 400 if number of characters is not a number', async () => {
    const response = await request(app).get('/character/number')
    expect(response.statusCode).toBe(400)
  })
  test('should return 400 if number of characters is less than 1', async () => {
    const response = await request(app).get('/character/0')
    expect(response.statusCode).toBe(400)
  })
  test('given a number of characters, should return an array of characters', async () => {
    const response = await request(app).get('/character/2')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toHaveLength(2)
  })
})

describe('POST: /character', () => {
  test('should return 400 if there is a missing field', async () => {
    const invalidCharacters = [
      { ...validDBCharacter, name: undefined },
      { ...validDBCharacter, status: undefined },
      { ...validDBCharacter, species: undefined },
      { ...validDBCharacter, origin: undefined }
    ]

    for (const character of invalidCharacters) {
      const response = await request(app).post('/character').send(character)
      expect(response.statusCode).toBe(400)
    }
  })

  test('given a valid character, should return the character created', async () => {
    const { name, status, species, origin } = validDBCharacter

    const response = await request(app).post('/character').send(validDBCharacter)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', name)
    expect(response.body).toHaveProperty('status', status)
    expect(response.body).toHaveProperty('species', species)
    expect(response.body).toHaveProperty('origin', origin)
  })
})

describe('GET: /character?name=', () => {
  test('should return 400 if there is no name query param', async () => {
    const response = await request(app).get('/character?name=')
    expect(response.statusCode).toBe(400)
  })
  test('given a valid api character name, should return the character', async () => {
    const { name, status, species, origin } = validAPICharacter

    const response = await request(app).get('/character?name=morty')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', name)
    expect(response.body).toHaveProperty('status', status)
    expect(response.body).toHaveProperty('species', species)
    expect(response.body).toHaveProperty('origin', origin)
  })
  test('given a valid db character name, should return the character', async () => {
    const { name, status, species, origin } = validDBCharacter

    const response = await request(app).get(`/character?name=${name}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', name)
    expect(response.body).toHaveProperty('status', status)
    expect(response.body).toHaveProperty('species', species)
    expect(response.body).toHaveProperty('origin', origin)
  })
  test('given an invalid name, should return 404', async () => {
    const response = await request(app).get('/character?name=invalid')
    expect(response.statusCode).toBe(404)
  })
})
