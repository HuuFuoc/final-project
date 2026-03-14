import { Collection, Db, Document, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '../models/schemas/User.schema'
import RefreshToken from '../models/schemas/RefreshToken.schema'
import Category from '../models/schemas/Category.schema'
import Course from '../models/schemas/Course.schema'
import Lesson from '../models/schemas/Lesson.schema'
import Question from '../models/schemas/Question.schema'
import AnswerOption from '../models/schemas/AnswerOption.schema'
import Order from '../models/schemas/Order.schema'
import Payment from '../models/schemas/Payment.schema'
import Review from '../models/schemas/Review.schema'
import Appointment from '../models/schemas/Appointment.schema'
import Instructor from '../models/schemas/Instructor.schema'
import InstructorRequest from '../models/schemas/InstructorRequest.schema'
import Survey from '../models/schemas/Survey.schema'
import Transaction from '../models/schemas/Transaction.schema'
import Cart from '../models/schemas/Cart.schema'
import Session from '../models/schemas/Session.schema'
import OrderDetail from '../models/schemas/OrderDetail.schema'
import OrderLog from '../models/schemas/OrderLog.schema'
import Enrollment from '../models/schemas/Enrollment.schema'
import Blog from '../models/schemas/Blog.schema'

dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@final-prj.wm3osql.mongodb.net/?retryWrites=true&w=majority`
class DatabaseService {
  private client: MongoClient
  private db: Db //tạo thành thuộc tình db
  constructor() {
    this.client = new MongoClient(uri)
    // nạp giá trị cho thuộc tình db thông qua constructor
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 }) //đổi cách xài
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection<User>(process.env.DB_USERS_COLLECTION as string)
  }
  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
  get categories(): Collection<Category> {
    return this.db.collection<Category>(process.env.DB_CATEGORIES_COLLECTION as string)
  }
  get courses(): Collection<Course> {
    return this.db.collection<Course>(process.env.DB_COURSES_COLLECTION as string)
  }
  get lessons(): Collection<Lesson> {
    return this.db.collection<Lesson>(process.env.DB_LESSONS_COLLECTION as string)
  }
  get questions(): Collection<Question> {
    return this.db.collection<Question>(process.env.DB_QUESTIONS_COLLECTION as string)
  }
  get answer_options(): Collection<AnswerOption> {
    return this.db.collection<AnswerOption>(process.env.DB_ANSWER_OPTIONS_COLLECTION as string)
  }
  get answers(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_ANSWERS_COLLECTION as string)
  }
  get orders(): Collection<Order> {
    return this.db.collection<Order>(process.env.DB_ORDERS_COLLECTION as string)
  }
  get payments(): Collection<Payment> {
    return this.db.collection<Payment>(process.env.DB_PAYMENTS_COLLECTION as string)
  }
  get reviews(): Collection<Review> {
    return this.db.collection<Review>(process.env.DB_REVIEWS_COLLECTION as string)
  }
  get appointments(): Collection<Appointment> {
    return this.db.collection<Appointment>(process.env.DB_APPOINTMENTS_COLLECTION as string)
  }
  get instructors(): Collection<Instructor> {
    return this.db.collection<Instructor>(process.env.DB_INSTRUCTORS_COLLECTION || process.env.DB_CONSULTANTS_COLLECTION || 'instructors')
  }
  get instructor_requests(): Collection<InstructorRequest> {
    return this.db.collection<InstructorRequest>(process.env.DB_INSTRUCTOR_REQUESTS_COLLECTION || 'instructor_requests')
  }
  get surveys(): Collection<Survey> {
    return this.db.collection<Survey>(process.env.DB_SURVEYS_COLLECTION as string)
  }
  get survey_questions(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_SURVEY_QUESTIONS_COLLECTION as string)
  }
  get survey_answers(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_SURVEY_ANSWERS_COLLECTION as string)
  }
  get survey_feedbacks(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_SURVEY_FEEDBACKS_COLLECTION as string)
  }
  get transactions(): Collection<Transaction> {
    return this.db.collection<Transaction>(process.env.DB_TRANSACTIONS_COLLECTION as string)
  }
  get transaction_items(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_TRANSACTION_ITEMS_COLLECTION as string)
  }
  get transaction_services(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_TRANSACTION_SERVICES_COLLECTION as string)
  }
  get transaction_service_items(): Collection<Document> {
    return this.db.collection<Document>(process.env.DB_TRANSACTION_SERVICE_ITEMS_COLLECTION as string)
  }
  get carts(): Collection<Cart> {
    return this.db.collection<Cart>(process.env.DB_CARTS_COLLECTION || 'carts')
  }
  get sessions(): Collection<Session> {
    return this.db.collection<Session>(process.env.DB_SESSIONS_COLLECTION || 'sessions')
  }
  get order_details(): Collection<OrderDetail> {
    return this.db.collection<OrderDetail>(process.env.DB_ORDER_DETAILS_COLLECTION || 'order_details')
  }
  get order_logs(): Collection<OrderLog> {
    return this.db.collection<OrderLog>(process.env.DB_ORDER_LOGS_COLLECTION || 'order_logs')
  }
  get enrollments(): Collection<Enrollment> {
    return this.db.collection<Enrollment>(process.env.DB_ENROLLMENTS_COLLECTION || 'enrollments')
  }
  get blogs(): Collection<Blog> {
    return this.db.collection<Blog>(process.env.DB_BLOGS_COLLECTION || 'blogs')
  }
}

//từ class tạo object và export nó ra ngoài
const databaseService = new DatabaseService()
export default databaseService
//đây chính là injection
//vì nếu ta export class ra ngoài, mỗi lần dùng phải tạo object
//dẫn đến việc sẽ có nhiều chỗ xài, nhiều chổ tạo nhiều object
//giống nhau
//ta chỉ cần 1 object xuyên suốt dự án , nên ta export object ra ngoài để bên ngoài chỉ xài chung mà k tạo lại
