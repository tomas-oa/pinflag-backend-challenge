
import { DataTypes, Op } from 'sequelize'
import sequelize from '../config/database.config'

const models = {}

models.Character = require('./character_model').default(sequelize, DataTypes)

export { sequelize, Op }
export default models
