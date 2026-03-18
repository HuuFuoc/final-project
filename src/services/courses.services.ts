import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Course from '../models/schemas/Course.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import { CourseStatus, OrderStatus } from '../constants/enums'
import Enrollment from '../models/schemas/Enrollment.schema'

class CourseService {
  private parseCourseIdFromUnknown(value: unknown): ObjectId | null {
    if (!value) return null
    if (value instanceof ObjectId) return value
    if (typeof value === 'string' && ObjectId.isValid(value)) return new ObjectId(value)
    return null
  }

  private extractCourseIdFromOrderDetail(detail: Record<string, unknown>): ObjectId | null {
    const candidates = [
      detail.course_id,
      detail.courseId,
      detail.service_id,
      detail.serviceId,
      detail.item_id,
      detail.itemId
    ]

    for (const candidate of candidates) {
      const parsed = this.parseCourseIdFromUnknown(candidate)
      if (parsed) return parsed
    }

    return null
  }

  async getRecommendationsForCurrentUser(userId: string, options?: { limit?: number; includeReasons?: boolean }) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }

    const userObjectId = new ObjectId(userId)
    const limit = Math.min(20, Math.max(1, options?.limit ?? 4))
    const includeReasons = options?.includeReasons ?? false

    const userOrderLogs = await databaseService.order_logs
      .find({
        user_id: userObjectId
      })
      .toArray()

    const orderIdSet = new Set<string>(userOrderLogs.map((log) => log.order_id.toString()))

    let paidOrderIds: ObjectId[] = []
    if (orderIdSet.size > 0) {
      paidOrderIds = await databaseService.orders
        .find({
          _id: { $in: Array.from(orderIdSet).map((id) => new ObjectId(id)) },
          status: OrderStatus.Paid
        })
        .project({ _id: 1 })
        .toArray()
        .then((orders) => orders.map((order) => order._id as ObjectId))
    }

    const paidOrderIdSet = new Set<string>(paidOrderIds.map((id) => id.toString()))

    const paidLogs = userOrderLogs.filter((log) => paidOrderIdSet.has(log.order_id.toString()))
    const paidLogCourseIds = paidLogs.map((log) => log.course_id)

    let paidOrderDetailCourseIds: ObjectId[] = []
    if (paidOrderIds.length > 0) {
      const paidOrderDetails = (await databaseService.order_details
        .find({
          order_id: { $in: paidOrderIds },
          isDeleted: { $ne: true }
        })
        .toArray()) as unknown as Array<Record<string, unknown>>

      paidOrderDetailCourseIds = paidOrderDetails
        .map((detail) => this.extractCourseIdFromOrderDetail(detail))
        .filter((id): id is ObjectId => id instanceof ObjectId)
    }

    const purchasedCourseIdSet = new Set<string>(paidOrderDetailCourseIds.map((id) => id.toString()))
    if (!purchasedCourseIdSet.size) {
      paidLogCourseIds.forEach((id) => purchasedCourseIdSet.add(id.toString()))
    } else {
      paidLogCourseIds.forEach((id) => {
        if (!purchasedCourseIdSet.has(id.toString())) {
          purchasedCourseIdSet.add(id.toString())
        }
      })
    }

    const purchasedCourseIds = Array.from(purchasedCourseIdSet).map((id) => new ObjectId(id))

    if (!purchasedCourseIds.length) {
      const fallbackCourses = await databaseService.courses
        .find({
          status: CourseStatus.Published,
          isDeleted: false
        })
        .sort({ created_at: -1 })
        .limit(limit)
        .toArray()

      return fallbackCourses.map((course) => ({
        id: (course._id as ObjectId).toString(),
        name: course.name,
        categoryId: course.category_id?.toString() ?? null,
        status: course.status,
        price: course.price,
        discount: course.discount ?? 0,
        imageUrls: course.imageUrls ?? [],
        riskLevel: course.riskLevel,
        isPurchased: false,
        recommendationScore: 0,
        ...(includeReasons ? { recommendationReason: 'Newest published course' } : {})
      }))
    }

    const purchasedCourses = await databaseService.courses
      .find({
        _id: { $in: purchasedCourseIds }
      })
      .project({ _id: 1, category_id: 1 })
      .toArray()

    const categoryFrequency = new Map<string, number>()
    purchasedCourses.forEach((course) => {
      const categoryId = course.category_id?.toString()
      if (!categoryId) return
      categoryFrequency.set(categoryId, (categoryFrequency.get(categoryId) ?? 0) + 1)
    })

    const candidateCourses = await databaseService.courses
      .find({
        status: CourseStatus.Published,
        isDeleted: false,
        _id: { $nin: purchasedCourseIds }
      })
      .toArray()

    const scoredCourses = candidateCourses
      .map((course) => {
        const categoryId = course.category_id?.toString() ?? ''
        const baseScore = (categoryFrequency.get(categoryId) ?? 0) * 10
        return {
          id: (course._id as ObjectId).toString(),
          name: course.name,
          categoryId: course.category_id?.toString() ?? null,
          status: course.status,
          price: course.price,
          discount: course.discount ?? 0,
          imageUrls: course.imageUrls ?? [],
          riskLevel: course.riskLevel,
          isPurchased: false,
          recommendationScore: baseScore,
          createdAt: course.created_at,
          ...(includeReasons
            ? {
                recommendationReason:
                  baseScore > 0
                    ? 'Matches categories from your paid purchases'
                    : 'Popular published course you have not purchased'
              }
            : {})
        }
      })
      .sort((a, b) => {
        if (b.recommendationScore !== a.recommendationScore) {
          return b.recommendationScore - a.recommendationScore
        }
        return (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
      })
      .map(({ createdAt, ...rest }) => rest)

    return scoredCourses.slice(0, limit)
  }

  async listCourses(userId?: string) {
    const filter: any = { isDeleted: false, status: CourseStatus.Published }
    if (userId) {
      if (!ObjectId.isValid(userId)) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Invalid user_id'
        })
      }
      filter.user_id = new ObjectId(userId)
    }
    return databaseService.courses.find(filter).sort({ created_at: -1 }).toArray()
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
    imageUrl?: string
    imageUrls?: string[]
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
      imageUrl: payload.imageUrl || '',
      imageUrls: payload.imageUrls,
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
    const enrollmentCount = await databaseService.enrollments.countDocuments({
      course_id: existing._id,
      isDeleted: false
    })
    if (enrollmentCount > 0) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Cannot delete course that has been purchased by users'
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
