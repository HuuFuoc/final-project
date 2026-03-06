import { ObjectId } from 'mongodb'
import { PaymentStatus, PaymentMethod } from '../../constants/enums'

interface PaymentType {
  _id?: ObjectId
  user_id: ObjectId
  paymentNo?: string
  status?: PaymentStatus
  amount?: number
  paymentMethod?: PaymentMethod
  organizationShare?: number
  consultantShare?: number
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Payment {
  _id?: ObjectId
  user_id: ObjectId
  paymentNo: string
  status: PaymentStatus
  amount: number
  paymentMethod: PaymentMethod
  organizationShare: number
  consultantShare: number
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(payment: PaymentType) {
    const date = new Date()
    this._id = payment._id || new ObjectId()
    this.user_id = payment.user_id
    this.paymentNo = payment.paymentNo || ''
    this.status = payment.status ?? PaymentStatus.Pending
    this.amount = payment.amount ?? 0
    this.paymentMethod = payment.paymentMethod ?? PaymentMethod.VNPay
    this.organizationShare = payment.organizationShare ?? 0
    this.consultantShare = payment.consultantShare ?? 0
    this.created_at = payment.created_at || date
    this.updated_at = payment.updated_at || date
    this.isDeleted = payment.isDeleted ?? false
  }
}
