import { Model, DataTypes } from 'sequelize'

import sequelize from '../config/sequelize'

class Character extends Model {}

Character.init({
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  species: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'character',
  schema: 'public'
})

export default Character
