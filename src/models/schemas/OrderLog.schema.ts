import { ObjectId } from 'mongodb'

interface OrderLogType {
  _id?: ObjectId
  order_id: ObjectId
  course_id: ObjectId
  user_id: ObjectId
  cart_id: ObjectId
  created_at?: Date
  updated_at?: Date
}

export default class OrderLog {
  _id?: ObjectId
  order_id: ObjectId
  course_id: ObjectId
  user_id: ObjectId
  cart_id: ObjectId
  created_at: Date
  updated_at: Date

  constructor(orderLog: OrderLogType) {
    const date = new Date()
    this._id = orderLog._id || new ObjectId()
    this.order_id = orderLog.order_id
    this.course_id = orderLog.course_id
    this.user_id = orderLog.user_id
    this.cart_id = orderLog.cart_id
    this.created_at = orderLog.created_at || date
    this.updated_at = orderLog.updated_at || date
  }
}
