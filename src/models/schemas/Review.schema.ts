import { ObjectId } from 'mongodb'

interface ReviewType {
  _id?: ObjectId
  course_id?: ObjectId
  appointment_id?: ObjectId
  consultant_id?: ObjectId
  user_id: ObjectId
  rating: number
  comment?: string
  created_at?: Date
  updated_at?: Date
}

export default class Review {
  _id?: ObjectId
  course_id?: ObjectId
  appointment_id?: ObjectId
  consultant_id?: ObjectId
  user_id: ObjectId
  rating: number
  comment: string
  created_at: Date
  updated_at: Date

  constructor(review: ReviewType) {
    const date = new Date()
    this._id = review._id || new ObjectId()
    this.course_id = review.course_id
    this.appointment_id = review.appointment_id
    this.consultant_id = review.consultant_id
    this.user_id = review.user_id
    this.rating = review.rating ?? 0
    this.comment = review.comment || ''
    this.created_at = review.created_at || date
    this.updated_at = review.updated_at || date
  }
}
