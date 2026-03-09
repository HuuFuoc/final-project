import { ObjectId } from 'mongodb'

interface OrderDetailType {
  _id?: ObjectId
  order_id: ObjectId
  serviceType?: string
  amount?: number
  transaction_id?: ObjectId | null
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class OrderDetail {
  _id?: ObjectId
  order_id: ObjectId
  serviceType: string
  amount: number
  transaction_id: ObjectId | null
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(orderDetail: OrderDetailType) {
    const date = new Date()
    this._id = orderDetail._id || new ObjectId()
    this.order_id = orderDetail.order_id
    this.serviceType = orderDetail.serviceType || ''
    this.amount = orderDetail.amount ?? 0
    this.transaction_id = orderDetail.transaction_id ?? null
    this.created_at = orderDetail.created_at || date
    this.updated_at = orderDetail.updated_at || date
    this.isDeleted = orderDetail.isDeleted ?? false
  }
}
