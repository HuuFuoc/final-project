import { ObjectId } from 'mongodb'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import Review from '../models/schemas/Review.schema'
import databaseService from './database.services'

class ReviewService {
  private parseObjectId(id: string, fieldName: string) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: `Invalid ${fieldName}`
      })
    }
    return new ObjectId(id)
  }

  async getReviews() {
    return databaseService.reviews.find({}).sort({ created_at: -1 }).toArray()
  }

  async getReviewById(id: string) {
    const reviewId = this.parseObjectId(id, 'review id')
    const review = await databaseService.reviews.findOne({ _id: reviewId })
    if (!review) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Review not found'
      })
    }
    return review
  }

  async getReviewsByCourseId(courseId: string) {
    const courseObjectId = this.parseObjectId(courseId, 'course id')
    return databaseService.reviews.find({ course_id: courseObjectId }).sort({ created_at: -1 }).toArray()
  }

  async getReviewsByUserId(userId: string) {
    const userObjectId = this.parseObjectId(userId, 'user id')
    return databaseService.reviews.find({ user_id: userObjectId }).sort({ created_at: -1 }).toArray()
  }

  async createCourseReview(payload: { course_id: string; user_id: string; rating: number; comment?: string }) {
    const { course_id, user_id, rating, comment } = payload
    const courseObjectId = this.parseObjectId(course_id, 'course id')
    const userObjectId = this.parseObjectId(user_id, 'user id')

    const course = await databaseService.courses.findOne({ _id: courseObjectId, isDeleted: false })
    if (!course) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Course not found'
      })
    }

    const user = await databaseService.users.findOne({ _id: userObjectId })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found'
      })
    }

    const review = new Review({
      course_id: courseObjectId,
      user_id: userObjectId,
      rating,
      comment
    })
    const result = await databaseService.reviews.insertOne(review)
    return { ...review, _id: result.insertedId }
  }

  async createAppointmentReview(payload: { appointment_id: string; user_id: string; rating: number; comment?: string }) {
    const { appointment_id, user_id, rating, comment } = payload
    const appointmentObjectId = this.parseObjectId(appointment_id, 'appointment id')
    const userObjectId = this.parseObjectId(user_id, 'user id')

    const appointment = await databaseService.appointments.findOne({ _id: appointmentObjectId })
    if (!appointment) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Appointment not found'
      })
    }

    const user = await databaseService.users.findOne({ _id: userObjectId })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'User not found'
      })
    }

    const review = new Review({
      appointment_id: appointmentObjectId,
      consultant_id: appointment.consultant_id,
      user_id: userObjectId,
      rating,
      comment
    })
    const result = await databaseService.reviews.insertOne(review)
    return { ...review, _id: result.insertedId }
  }

  async updateReview(id: string, payload: { rating?: number; comment?: string }) {
    const review = await this.getReviewById(id)
    await databaseService.reviews.updateOne(
      { _id: review._id },
      {
        $set: {
          ...(payload.rating !== undefined ? { rating: payload.rating } : {}),
          ...(payload.comment !== undefined ? { comment: payload.comment } : {}),
          updated_at: new Date()
        }
      }
    )
    return this.getReviewById(id)
  }

  async deleteReview(id: string) {
    const review = await this.getReviewById(id)
    await databaseService.reviews.deleteOne({ _id: review._id })
    return true
  }
}
const reviewService = new ReviewService()
export default reviewService