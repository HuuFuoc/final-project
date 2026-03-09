import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Course from '../models/schemas/Course.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import { CourseStatus } from '../constants/enums'
import Enrollment from '../models/schemas/Enrollment.schema'

class CourseService {
  async listCourses() {
    return databaseService.courses
      .find({ isDeleted: false, status: CourseStatus.Published })
      .sort({ created_at: -1 })
      .toArray()
  }

  async getCourseById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid course id'
      })
    }
    const course = await databaseService.courses.findOne({
      _id: new ObjectId(id),
      isDeleted: false
    })
    if (!course) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Course not found'
      })
    }

    const sessions = await databaseService.sessions
      .find({ course_id: course._id, isDeleted: false })
      .sort({ positionOrder: 1, created_at: 1 })
      .toArray()

    const lessons = await databaseService.lessons
      .find({ course_id: course._id, isDeleted: false })
      .sort({ positionOrder: 1, created_at: 1 })
      .toArray()

    const sessionsWithLessons = sessions.map((s) => ({
      ...s,
      lessons: lessons.filter((l) => String(l.session_id) === String(s._id))
    }))

    return { course, sessions: sessionsWithLessons }
  }

  async createCourse(payload: {
    name: string
    user_id: string
    category_id: string
    content?: string
    slug?: string
    price: number
    discount?: number
    status?: CourseStatus
  }) {
    const { name, user_id, category_id, price } = payload
    if (!name || !name.trim()) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Course name is required'
      })
    }
    if (!ObjectId.isValid(user_id) || !ObjectId.isValid(category_id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user_id or category_id'
      })
    }
    if (price < 0) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Price must be >= 0'
      })
    }

    const course = new Course({
      name: name.trim(),
      user_id: new ObjectId(user_id),
      category_id: new ObjectId(category_id),
      content: payload.content || '',
      slug: payload.slug || '',
      price,
      discount: payload.discount ?? 0, // TODO: hiện đang hiểu discount là số tiền giảm trực tiếp
      status: payload.status ?? CourseStatus.Published
    })

    const result = await databaseService.courses.insertOne(course)
    return { ...course, _id: result.insertedId }
  }

  async updateCourse(
    id: string,
    payload: Partial<{
      name: string
      content: string
      slug: string
      price: number
      discount: number
      status: CourseStatus
      category_id: string
    }>
  ) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid course id'
      })
    }

    const course = await databaseService.courses.findOne({
      _id: new ObjectId(id),
      isDeleted: false
    })
    if (!course) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Course not found'
      })
    }

    const update: any = {}
    if (payload.name !== undefined) update.name = payload.name.trim()
    if (payload.content !== undefined) update.content = payload.content
    if (payload.slug !== undefined) update.slug = payload.slug
    if (payload.price !== undefined) {
      if (payload.price < 0) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Price must be >= 0'
        })
      }
      update.price = payload.price
    }
    if (payload.discount !== undefined) update.discount = payload.discount
    if (payload.status !== undefined) update.status = payload.status
    if (payload.category_id !== undefined) {
      if (!ObjectId.isValid(payload.category_id)) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Invalid category_id'
        })
      }
      update.category_id = new ObjectId(payload.category_id)
    }

    if (Object.keys(update).length === 0) {
      return course
    }

    update.updated_at = new Date()

    await databaseService.courses.updateOne({ _id: course._id }, { $set: update })

    return databaseService.courses.findOne({ _id: course._id })
  }

  async deleteCourse(id: string) {
    const existing = await databaseService.courses.findOne({
      _id: new ObjectId(id),
      isDeleted: false
    })
    if (!existing) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Course not found'
      })
    }
    await databaseService.courses.updateOne(
      { _id: existing._id },
      { $set: { isDeleted: true, updated_at: new Date() } }
    )
    return true
  }

  async getMyCourses(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }
    const userObjectId = new ObjectId(userId)

    const enrollments = await databaseService.enrollments
      .find({
        user_id: userObjectId,
        isDeleted: false
      })
      .toArray()

    if (!enrollments.length) {
      return []
    }

    const courseIds = enrollments.map((e) => e.course_id)

    const courses = await databaseService.courses
      .find({
        _id: { $in: courseIds },
        isDeleted: false
      })
      .toArray()

    return courses
  }

  async userOwnsCourse(userId: ObjectId, courseId: ObjectId) {
    const enrollment = await databaseService.enrollments.findOne({
      user_id: userId,
      course_id: courseId,
      isDeleted: false
    })
    return !!enrollment
  }
}
const courseService = new CourseService()
export default courseService
