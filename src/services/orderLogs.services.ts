import databaseService from './database.services'
import OrderLog from '../models/schemas/OrderLog.schema'
import { ObjectId } from 'mongodb'

class OrderLogService {
  async logOrderCourses(params: {
    order_id: ObjectId
    user_id: ObjectId
    cartItems: { _id?: ObjectId; course_id: ObjectId }[]
  }) {
    const { order_id, user_id, cartItems } = params
    const now = new Date()
    const logs = cartItems.map(
      (item) =>
        new OrderLog({
          order_id,
          course_id: item.course_id,
          user_id,
          cart_id: item._id as ObjectId,
          created_at: now,
          updated_at: now
        })
    )
    if (logs.length) {
      await databaseService.order_logs.insertMany(logs)
    }
  }
}
const orderLogService = new OrderLogService()
export default orderLogService
