import { ObjectId } from 'mongodb'
import { OrderStatus } from '../../constants/enums'

interface OrderType {
  _id?: ObjectId
  cart_id: ObjectId
  totalAmount?: number
  orderDate?: Date
  status?: OrderStatus
  created_at?: Date
  updated_at?: Date
}

export default class Order {
  _id?: ObjectId
  cart_id: ObjectId
  totalAmount: number
  orderDate: Date
  status: OrderStatus
  created_at: Date
  updated_at: Date

  constructor(order: OrderType) {
    const date = new Date()
    this._id = order._id || new ObjectId()
    this.cart_id = order.cart_id
    this.totalAmount = order.totalAmount ?? 0
    this.orderDate = order.orderDate || date
    this.status = order.status ?? OrderStatus.Pending
    this.created_at = order.created_at || date
    this.updated_at = order.updated_at || date
  }
}
