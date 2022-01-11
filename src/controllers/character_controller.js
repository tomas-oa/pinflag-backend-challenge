import BaseController from './base'
import Character from '../models/character_model'

export default class CharacterController extends BaseController {
  CharacterController () {}

  async index (req, res) {
    return super.Success(res, '')
  }

  async create (req, res) {
    const character = await Character.create(req.body)

    return super.Success(res, character.dataValues)
  }

  async show (req, res) {
    return super.Success(res, '')
  }
}
