import { ObjectId } from 'mongodb'
import { CartStatus } from '../../constants/enums'

interface CartType {
  _id?: ObjectId
  user_id: ObjectId
  course_id: ObjectId
  cartNo?: string
  status?: CartStatus
  price?: number
  discount?: number
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Cart {
  _id?: ObjectId
  user_id: ObjectId
  course_id: ObjectId
  cartNo: string
  status: CartStatus
  price: number
  discount: number
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(cart: CartType) {
    const date = new Date()
    this._id = cart._id || new ObjectId()
    this.user_id = cart.user_id
    this.course_id = cart.course_id
    this.cartNo = cart.cartNo || ''
    this.status = cart.status ?? CartStatus.Pending
    this.price = cart.price ?? 0
    this.discount = cart.discount ?? 0
    this.created_at = cart.created_at || date
    this.updated_at = cart.updated_at || date
    this.isDeleted = cart.isDeleted ?? false
  }
}
