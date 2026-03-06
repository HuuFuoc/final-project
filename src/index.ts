import 'dotenv/config'
import express from 'express'
import databaseService from './services/database.services'
import setupSwagger from './swagger'
import userRouter from './routes/users.routers'
import vnpayRouter from './routes/vnpay.routers'
import { defaultErrorHandler } from './middlewares/errors.middlewares'
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
setupSwagger(app)

app.use('/user', userRouter)
app.use('/api/vnpay', vnpayRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project này đang chạy trên port ${port}`)
  console.log(`Swagger UI at http://localhost:${port}/api-docs`)
})
databaseService.connect()

export default app
