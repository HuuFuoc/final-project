import 'dotenv/config'
import express from 'express'
import databaseService from './services/database.services'
import setupSwagger from './swagger'
import userRouter from './routes/users.routers'
import vnpayRouter from './routes/vnpay.routers'
import categoriesRouter from './routes/categories.routers'
import coursesRouter from './routes/courses.routers'
import lessonsRouter from './routes/lessons.routers'
import sessionsRouter from './routes/sessions.routers'
import reviewsRouter from './routes/reviews.routers'
import cartsRouter from './routes/carts.routers'
import ordersRouter from './routes/orders.routers'
import instructorsRouter from './routes/instructors.routers'
import appointmentsRouter from './routes/appointments.routers'
import surveysRouter from './routes/surveys.routers'
import questionsRouter from './routes/questions.routers'
import answerOptionsRouter from './routes/answerOptions.routers'
import paymentsRouter from './routes/payments.routers'
import programsRouter from './routes/programs.routers'
import blogsRouter from './routes/blogs.routers'
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
app.use('/api/category', categoriesRouter)
app.use('/api/course', coursesRouter)
app.use('/api/lesson', lessonsRouter)
app.use('/api/session', sessionsRouter)
app.use('/api/review', reviewsRouter)
app.use('/api/cart', cartsRouter)
app.use('/api/order', ordersRouter)
app.use('/api/instructor', instructorsRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/survey', surveysRouter)
app.use('/api/question', questionsRouter)
app.use('/api/answer-options', answerOptionsRouter)
app.use('/api/payment', paymentsRouter)
app.use('/api/program', programsRouter)
app.use('/api/blog', blogsRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Project này đang chạy trên port ${port}`)
  console.log(`Swagger UI at http://localhost:${port}/api-docs`)
})
databaseService.connect()

export default app
