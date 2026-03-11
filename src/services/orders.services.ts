import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Order from '../models/schemas/Order.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import cartService from './carts.services'
import courseService from './courses.services'
import orderDetailService from './orderDetails.services'
import orderLogService from './orderLogs.services'
import { OrderStatus } from '../constants/enums'

class OrderService {
  private computeItemAmount(price: number, discount: number) {
    // TODO: discount hiện hiểu là số tiền giảm trực tiếp
    return Math.max(0, price - discount)
  }

  async createOrderFromCart(userId: string, selectedCartItemIds?: string[]) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }
    const userObjectId = new ObjectId(userId)
    let cartItems = await cartService.getPendingItemsForUser(userObjectId)

    if (selectedCartItemIds && selectedCartItemIds.length > 0) {
      const selectedObjectIds = selectedCartItemIds.map((id) => id.toString())
      cartItems = cartItems.filter((item) => selectedObjectIds.includes((item._id as ObjectId).toString()))
    }

    if (!cartItems.length) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Cart is empty'
      })
    }

    for (const item of cartItems) {
      const alreadyOwned = await courseService.userOwnsCourse(userObjectId, item.course_id)
      if (alreadyOwned) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.CONFLICT,
          message: 'You already own one of the courses in cart'
        })
      }
    }

    const itemsWithAmount = cartItems.map((item) => ({
      ...item,
      amount: this.computeItemAmount(item.price ?? 0, item.discount ?? 0)
    }))

    const totalAmount = itemsWithAmount.reduce((sum, item) => sum + item.amount, 0)
    if (totalAmount <= 0) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Total amount must be greater than zero'
      })
    }

    const order = new Order({
      cart_id: itemsWithAmount[0]._id as ObjectId, // TODO: dùng cart đầu tiên làm anchor; chi tiết ở OrderDetail/OrderLog
      totalAmount,
      status: OrderStatus.Pending
    })

    const result = await databaseService.orders.insertOne(order)
    const orderId = result.insertedId

    await orderDetailService.createOrderDetailsForCourses(
      orderId,
      itemsWithAmount.map((i) => ({ course_id: i.course_id, amount: i.amount }))
    )

    await orderLogService.logOrderCourses({
      order_id: orderId,
      user_id: userObjectId,
      cartItems: itemsWithAmount
    })

    await cartService.markItemsCheckedOut(itemsWithAmount.map((i) => i._id as ObjectId))

    return databaseService.orders.findOne({ _id: orderId })
  }

  async getMyOrders(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }
    const userObjectId = new ObjectId(userId)

    const logs = await databaseService.order_logs
      .aggregate([
        { $match: { user_id: userObjectId } },
        {
          $group: {
            _id: '$order_id'
          }
        }
      ])
      .toArray()

    const orderIds = logs.map((l) => l._id as ObjectId)
    if (!orderIds.length) return []

    const orders = await databaseService.orders
      .find({ _id: { $in: orderIds } })
      .sort({ created_at: -1 })
      .toArray()

    return orders
  }

  async getAllOrders() {
    return databaseService.orders.find({}).sort({ created_at: -1 }).toArray()
  }

  async getOrderById(orderId: string) {
    if (!ObjectId.isValid(orderId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid order id'
      })
    }
    const orderObjectId = new ObjectId(orderId)

    const order = await databaseService.orders.findOne({ _id: orderObjectId })
    if (!order) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Order not found'
      })
    }

    const details = await databaseService.order_details
      .find({ order_id: orderObjectId, isDeleted: { $ne: true } })
      .toArray()

    const logs = await databaseService.order_logs.find({ order_id: orderObjectId }).toArray()

    return { order, details, logs }
  }

  async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    if (!ObjectId.isValid(orderId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid order id'
      })
    }
    const orderObjectId = new ObjectId(orderId)

    const order = await databaseService.orders.findOne({ _id: orderObjectId })
    if (!order) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Order not found'
      })
    }

    await databaseService.orders.updateOne(
      { _id: orderObjectId },
      { $set: { status: newStatus, updated_at: new Date() } }
    )

    return databaseService.orders.findOne({ _id: orderObjectId })
  }
}
const orderService = new OrderService()
export default orderService
