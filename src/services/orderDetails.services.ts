import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import OrderDetail from '../models/schemas/OrderDetail.schema'
import { TransactionServiceType } from '../constants/enums'

class OrderDetailService {
  async createOrderDetailsForCourses(orderId: ObjectId, items: { course_id: ObjectId; amount: number }[]) {
    if (!items.length) return
    const now = new Date()
    const docs = items.map(
      (item) =>
        new OrderDetail({
          order_id: orderId,
          serviceType: TransactionServiceType.Course,
          amount: item.amount,
          transaction_id: null,
          created_at: now,
          updated_at: now
        })
    )
    if (docs.length) {
      await databaseService.order_details.insertMany(docs)
    }
  }
}
const orderDetailService = new OrderDetailService()
export default orderDetailService
