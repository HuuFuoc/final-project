import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '../models/Error'
import HTTP_STATUS from '../constants/httpStatus'
import databaseService from './database.services'
import Instructor from '../models/schemas/Instructor.schema'
import InstructorRequest from '../models/schemas/InstructorRequest.schema'
import { InstructorRequestStatus, OrderStatus, USER_ROLE } from '../constants/enums'
import {
  BecomeInstructorReqBody,
  GetInstructorRequestsQuery,
  ReviewInstructorRequestReqBody,
  UpdateInstructorReqBody
} from '../models/requests/Instructor.requests'
import { INSTRUCTORS_MESSAGES, USERS_MESSAGES } from '../constants/messages'

class InstructorService {
  private isApprovalDecision(decision: ReviewInstructorRequestReqBody['decision']) {
    return decision === 'approve' || decision === 'accept'
  }

  async listInstructors() {
    return databaseService.instructors.find({}).sort({ created_at: -1 }).toArray()
  }

  async getInstructorById(instructorId: string) {
    if (!ObjectId.isValid(instructorId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: INSTRUCTORS_MESSAGES.INVALID_ID
      })
    }

    const instructor = await databaseService.instructors.findOne({
      _id: new ObjectId(instructorId)
    })

    if (!instructor) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: INSTRUCTORS_MESSAGES.NOT_FOUND
      })
    }

    return instructor
  }

  async requestBecomeInstructor(userId: string, payload: BecomeInstructorReqBody) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USERS_MESSAGES.INVALID_USER_ID
      })
    }

    const userObjectId = new ObjectId(userId)
    const user = await databaseService.users.findOne({ _id: userObjectId })

    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }

    if (user.role === USER_ROLE.Instructor) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: 'You are already an instructor'
      })
    }

    const pendingRequest = await databaseService.instructor_requests.findOne({
      user_id: userObjectId,
      status: InstructorRequestStatus.Pending
    })

    if (pendingRequest) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: INSTRUCTORS_MESSAGES.REQUEST_ALREADY_PENDING
      })
    }

    const instructorRequest = new InstructorRequest({
      user_id: userObjectId,
      fullName: payload.fullName?.trim() || user.name,
      email: payload.email?.trim() || user.email,
      phoneNumber: payload.phoneNumber?.trim(),
      qualifications: payload.qualifications || [],
      jobTitle: payload.jobTitle?.trim(),
      profilePicUrl: payload.profilePicUrl?.trim(),
      note: payload.note?.trim()
    })

    const result = await databaseService.instructor_requests.insertOne(instructorRequest)
    return { ...instructorRequest, _id: result.insertedId }
  }

  async listInstructorRequests(query: GetInstructorRequestsQuery) {
    const filter: { status?: InstructorRequestStatus } = {}

    if (query.status) {
      filter.status = query.status
    }

    return databaseService.instructor_requests.find(filter).sort({ created_at: -1 }).toArray()
  }

  async reviewInstructorRequest(requestId: string, reviewerId: string, payload: ReviewInstructorRequestReqBody) {
    if (!ObjectId.isValid(requestId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: INSTRUCTORS_MESSAGES.INVALID_REQUEST_ID
      })
    }

    if (!ObjectId.isValid(reviewerId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USERS_MESSAGES.INVALID_USER_ID
      })
    }

    const decision = payload?.decision
    const shouldApprove = this.isApprovalDecision(decision)

    const requestObjectId = new ObjectId(requestId)
    const reviewerObjectId = new ObjectId(reviewerId)

    const instructorRequest = await databaseService.instructor_requests.findOne({ _id: requestObjectId })

    if (!instructorRequest) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: INSTRUCTORS_MESSAGES.REQUEST_NOT_FOUND
      })
    }

    if (instructorRequest.status !== InstructorRequestStatus.Pending) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: INSTRUCTORS_MESSAGES.REQUEST_ALREADY_REVIEWED
      })
    }

    const applicantUserId =
      instructorRequest.user_id instanceof ObjectId
        ? instructorRequest.user_id
        : new ObjectId(String(instructorRequest.user_id))

    if (shouldApprove) {
      await databaseService.users.updateOne(
        { _id: applicantUserId },
        {
          $set: {
            role: USER_ROLE.Instructor,
            updated_at: new Date()
          }
        }
      )

      const existingInstructor = await databaseService.instructors.findOne({
        user_id: applicantUserId
      })

      const fullName = instructorRequest.fullName ?? ''
      const email = instructorRequest.email ?? ''
      const phoneNumber = instructorRequest.phoneNumber ?? ''
      const qualifications = Array.isArray(instructorRequest.qualifications) ? instructorRequest.qualifications : []
      const jobTitle = instructorRequest.jobTitle ?? ''
      const profilePicUrl = instructorRequest.profilePicUrl ?? ''

      if (existingInstructor) {
        await databaseService.instructors.updateOne(
          { _id: existingInstructor._id },
          {
            $set: {
              fullName,
              email,
              phoneNumber,
              qualifications,
              jobTitle,
              profilePicUrl,
              updated_at: new Date()
            }
          }
        )
      } else {
        const newInstructor = new Instructor({
          user_id: applicantUserId,
          fullName,
          email,
          phoneNumber,
          qualifications,
          jobTitle,
          profilePicUrl
        })
        await databaseService.instructors.insertOne(newInstructor)
      }
    }

    const nextStatus = shouldApprove ? InstructorRequestStatus.Approved : InstructorRequestStatus.Rejected

    await databaseService.instructor_requests.updateOne(
      { _id: requestObjectId },
      {
        $set: {
          status: nextStatus,
          reviewed_by: reviewerObjectId,
          reviewed_at: new Date(),
          review_note: (payload?.review_note && String(payload.review_note).trim()) || '',
          updated_at: new Date()
        }
      }
    )

    const updated = await databaseService.instructor_requests.findOne({ _id: requestObjectId })
    return updated
  }

  async updateInstructor(instructorId: string, payload: UpdateInstructorReqBody) {
    const instructor = await this.getInstructorById(instructorId)

    await databaseService.instructors.updateOne(
      { _id: instructor._id },
      {
        $set: {
          ...(payload.fullName !== undefined ? { fullName: payload.fullName.trim() } : {}),
          ...(payload.email !== undefined ? { email: payload.email.trim() } : {}),
          ...(payload.phoneNumber !== undefined ? { phoneNumber: payload.phoneNumber.trim() } : {}),
          ...(payload.qualifications !== undefined ? { qualifications: payload.qualifications } : {}),
          ...(payload.jobTitle !== undefined ? { jobTitle: payload.jobTitle.trim() } : {}),
          ...(payload.hireDate !== undefined ? { hireDate: new Date(payload.hireDate) } : {}),
          ...(payload.salary !== undefined ? { salary: Number(payload.salary) } : {}),
          ...(payload.profilePicUrl !== undefined ? { profilePicUrl: payload.profilePicUrl.trim() } : {}),
          updated_at: new Date()
        }
      }
    )

    return this.getInstructorById(instructorId)
  }

  async deleteInstructor(instructorId: string) {
    const instructor = await this.getInstructorById(instructorId)

    await Promise.all([
      databaseService.instructors.deleteOne({ _id: instructor._id }),
      databaseService.users.updateOne(
        { _id: instructor.user_id },
        {
          $set: {
            role: USER_ROLE.User,
            updated_at: new Date()
          }
        }
      )
    ])

    return true
  }

  /**
   * Order history for instructor: orders of courses they own (course.user_id = instructorId).
   * Only paid orders; price/discount from cart then course; commissionRate 50%, earnedAmount = finalPrice * 0.5.
   */
  async getOrderHistory(
    instructorId: string,
    opts: { page?: number; limit?: number; courseId?: string; fromDate?: string; toDate?: string }
  ) {
    if (!ObjectId.isValid(instructorId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USERS_MESSAGES.INVALID_USER_ID
      })
    }
    const instructorObjectId = new ObjectId(instructorId)
    const page = Math.max(1, opts.page ?? 1)
    const limit = Math.min(100, Math.max(1, opts.limit ?? 10))
    const skip = (page - 1) * limit

    if (opts.courseId && !ObjectId.isValid(opts.courseId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid courseId'
      })
    }
    let fromDate: Date | null = null
    let toDate: Date | null = null
    if (opts.fromDate) {
      fromDate = new Date(opts.fromDate)
      if (Number.isNaN(fromDate.getTime())) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Invalid fromDate'
        })
      }
    }
    if (opts.toDate) {
      toDate = new Date(opts.toDate)
      if (Number.isNaN(toDate.getTime())) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Invalid toDate'
        })
      }
    }

    const ordersCol = process.env.DB_ORDERS_COLLECTION || 'orders'
    const coursesCol = process.env.DB_COURSES_COLLECTION || 'courses'
    const cartsCol = process.env.DB_CARTS_COLLECTION || 'carts'

    const pipeline: any[] = [
      {
        $lookup: {
          from: ordersCol,
          localField: 'order_id',
          foreignField: '_id',
          as: 'orderDoc'
        }
      },
      { $unwind: '$orderDoc' },
      { $match: { 'orderDoc.status': OrderStatus.Paid } },
      {
        $lookup: {
          from: coursesCol,
          localField: 'course_id',
          foreignField: '_id',
          as: 'courseDoc'
        }
      },
      { $unwind: '$courseDoc' },
      { $match: { 'courseDoc.user_id': instructorObjectId } },
      {
        $lookup: {
          from: cartsCol,
          localField: 'cart_id',
          foreignField: '_id',
          as: 'cartDoc'
        }
      },
      {
        $addFields: {
          cartDoc: { $arrayElemAt: ['$cartDoc', 0] }
        }
      },
      {
        $addFields: {
          price: { $ifNull: ['$cartDoc.price', '$courseDoc.price'] },
          discount: { $ifNull: ['$cartDoc.discount', '$courseDoc.discount'] }
        }
      },
      {
        $addFields: {
          discount: { $ifNull: ['$discount', 0] },
          price: { $ifNull: ['$price', 0] }
        }
      },
      {
        $addFields: {
          finalPrice: { $max: [0, { $subtract: ['$price', '$discount'] }] },
          commissionRate: 50,
          orderDate: '$orderDoc.orderDate',
          purchasedAt: '$orderDoc.created_at'
        }
      },
      {
        $addFields: {
          earnedAmount: { $multiply: ['$finalPrice', 0.5] }
        }
      }
    ]

    if (opts.courseId) {
      pipeline.push({ $match: { course_id: new ObjectId(opts.courseId) } })
    }
    if (fromDate) {
      pipeline.push({ $match: { orderDate: { $gte: fromDate } } })
    }
    if (toDate) {
      pipeline.push({ $match: { orderDate: { $lte: toDate } } })
    }

    const countPipeline = [...pipeline, { $count: 'total' }]
    const sortAndPagePipeline = [
      ...pipeline,
      { $sort: { orderDate: -1 } },
      {
        $facet: {
          totalCount: [{ $count: 'count' }],
          items: [{ $skip: skip }, { $limit: limit }]
        }
      }
    ]

    const [countResult, dataResult] = await Promise.all([
      databaseService.order_logs.aggregate(countPipeline).toArray(),
      databaseService.order_logs.aggregate(sortAndPagePipeline).toArray()
    ])

    const totalItems = countResult[0]?.total ?? 0
    const facet = dataResult[0] || { totalCount: [{ count: 0 }], items: [] }
    const items = (facet.items || []).map((row: any) => ({
      orderId: row.order_id?.toString(),
      courseId: row.course_id?.toString(),
      courseName: row.courseDoc?.name,
      buyerId: row.user_id?.toString(),
      price: row.price ?? 0,
      discount: row.discount ?? 0,
      finalPrice: row.finalPrice ?? 0,
      commissionRate: row.commissionRate ?? 50,
      earnedAmount: row.earnedAmount ?? 0,
      orderDate: row.orderDate,
      purchasedAt: row.purchasedAt
    }))

    const fullSummaryRevenue = await databaseService.order_logs
      .aggregate([
        ...pipeline,
        { $group: { _id: null, totalRevenue: { $sum: '$finalPrice' }, totalEarned: { $sum: '$earnedAmount' }, totalOrders: { $sum: 1 } } }
      ])
      .toArray()
    const summaryRow = fullSummaryRevenue[0]

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit) || 1
      },
      summary: {
        totalOrders: summaryRow?.totalOrders ?? 0,
        totalRevenue: summaryRow?.totalRevenue ?? 0,
        totalEarned: summaryRow?.totalEarned ?? 0
      }
    }
  }

  /**
   * Course sales summary for instructor: aggregate by course for courses they own.
   */
  async getCourseSalesSummary(instructorId: string) {
    if (!ObjectId.isValid(instructorId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USERS_MESSAGES.INVALID_USER_ID
      })
    }
    const instructorObjectId = new ObjectId(instructorId)
    const ordersCol = process.env.DB_ORDERS_COLLECTION || 'orders'
    const coursesCol = process.env.DB_COURSES_COLLECTION || 'courses'
    const cartsCol = process.env.DB_CARTS_COLLECTION || 'carts'

    const pipeline: any[] = [
      {
        $lookup: {
          from: ordersCol,
          localField: 'order_id',
          foreignField: '_id',
          as: 'orderDoc'
        }
      },
      { $unwind: '$orderDoc' },
      { $match: { 'orderDoc.status': OrderStatus.Paid } },
      {
        $lookup: {
          from: coursesCol,
          localField: 'course_id',
          foreignField: '_id',
          as: 'courseDoc'
        }
      },
      { $unwind: '$courseDoc' },
      { $match: { 'courseDoc.user_id': instructorObjectId } },
      {
        $lookup: {
          from: cartsCol,
          localField: 'cart_id',
          foreignField: '_id',
          as: 'cartDoc'
        }
      },
      {
        $addFields: {
          cartDoc: { $arrayElemAt: ['$cartDoc', 0] }
        }
      },
      {
        $addFields: {
          price: { $ifNull: ['$cartDoc.price', '$courseDoc.price'] },
          discount: { $ifNull: ['$cartDoc.discount', '$courseDoc.discount'] }
        }
      },
      {
        $addFields: {
          discount: { $ifNull: ['$discount', 0] },
          price: { $ifNull: ['$price', 0] }
        }
      },
      {
        $addFields: {
          finalPrice: { $max: [0, { $subtract: ['$price', '$discount'] }] },
          earnedAmount: { $multiply: [{ $max: [0, { $subtract: ['$price', '$discount'] }] }, 0.5] }
        }
      },
      {
        $group: {
          _id: '$course_id',
          courseName: { $first: '$courseDoc.name' },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$finalPrice' },
          totalEarned: { $sum: '$earnedAmount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]

    const items = await databaseService.order_logs.aggregate(pipeline).toArray()

    const summary = items.reduce(
      (acc, row) => ({
        totalCoursesSold: acc.totalCoursesSold + 1,
        totalOrders: acc.totalOrders + (row.totalOrders || 0),
        totalRevenue: acc.totalRevenue + (row.totalRevenue || 0),
        totalEarned: acc.totalEarned + (row.totalEarned || 0)
      }),
      { totalCoursesSold: 0, totalOrders: 0, totalRevenue: 0, totalEarned: 0 }
    )

    return {
      items: items.map((row: any) => ({
        courseId: row._id?.toString(),
        courseName: row.courseName,
        totalOrders: row.totalOrders ?? 0,
        totalRevenue: row.totalRevenue ?? 0,
        totalEarned: row.totalEarned ?? 0
      })),
      summary: {
        totalCoursesSold: summary.totalCoursesSold,
        totalOrders: summary.totalOrders,
        totalRevenue: summary.totalRevenue,
        totalEarned: summary.totalEarned
      }
    }
  }
}

const instructorService = new InstructorService()
export default instructorService

