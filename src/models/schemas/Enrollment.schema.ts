import { ObjectId } from 'mongodb'

interface EnrollmentType {
  _id?: ObjectId
  user_id: ObjectId
  course_id: ObjectId
  order_id?: ObjectId
  payment_id?: ObjectId
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Enrollment {
  _id?: ObjectId
  user_id: ObjectId
  course_id: ObjectId
  order_id: ObjectId | null
  payment_id: ObjectId | null
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(enrollment: EnrollmentType) {
    const date = new Date()
    this._id = enrollment._id || new ObjectId()
    this.user_id = enrollment.user_id
    this.course_id = enrollment.course_id
    this.order_id = enrollment.order_id ?? null
    this.payment_id = enrollment.payment_id ?? null
    this.created_at = enrollment.created_at || date
    this.updated_at = enrollment.updated_at || date
    this.isDeleted = enrollment.isDeleted ?? false
  }
}

