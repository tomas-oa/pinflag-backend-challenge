import swaggerUi from 'swagger-ui-express'
import v1 from '../docs/v1.json'

const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(v1))
}

export default swaggerDocs
