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
