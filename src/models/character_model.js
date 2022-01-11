import { Model, DataTypes } from 'sequelize'

import sequelize from '../config/sequelize'

class PurchaseLog extends Model {}

PurchaseLog.init({
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  requestBody: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'request_body'
  },
  requestHeaders: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'request_headers'
  },
  responseStatus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'response_status'
  },
  packageData: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'package_data'
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'store_name'
  },
  responseData: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'response_data'
  }
}, {
  sequelize,
  tableName: 'purchase_log',
  schema: 'public'
})

export default PurchaseLog
