import app from '../index'
import request from 'supertest'

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
  const validCharacter = {
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    origin: 'Earth'
  }

  test('should return 400 if there is a missing field', async () => {
    const invalidCharacters = [
      { ...validCharacter, name: undefined },
      { ...validCharacter, status: undefined },
      { ...validCharacter, species: undefined },
      { ...validCharacter, origin: undefined }
    ]

    for (const character of invalidCharacters) {
      const response = await request(app).post('/character').send(character)
      expect(response.statusCode).toBe(400)
    }
  })

  test('given a valid character, should return the character created', async () => {
    const response = await request(app).post('/character').send(validCharacter)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', 'Rick')
    expect(response.body).toHaveProperty('status', 'Alive')
    expect(response.body).toHaveProperty('species', 'Human')
    expect(response.body).toHaveProperty('origin', 'Earth')
  })
})
