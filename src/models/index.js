import fs from 'fs'
import { DataTypes, Op } from 'sequelize'
import sequelize from '../config/database.config'

// const files = fs.readdirSync(__dirname).filter((name) => name.includes('.model.') || name.includes('_model.'))
const files = fs.readdirSync(__dirname).filter((name) => {
  return ['.model.', '_model.'].some((suffix) => name.includes(suffix))
})
const models = {}

const capitalizeNameModel = (text) => {
  const texts = text.split('_').map((name) => name.charAt(0).toUpperCase() + name.slice(1))
  return texts.join('')
}

files.forEach((nameFile) => {
  // Remove _model.js or .model.js from filename
  const cleanedName = nameFile.slice(0, -9)
  const formatKey = capitalizeNameModel(cleanedName)

  // console.log(nameFile)
  models[formatKey] = require(`./${nameFile}`).default(sequelize, DataTypes)
})

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize, Op }
export default models
