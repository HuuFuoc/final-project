import { ObjectId } from 'mongodb'
import { TransactionStatus, TransactionServiceType } from '../../constants/enums'

interface TransactionType {
  _id?: ObjectId
  consultant_id: ObjectId
  amount?: number
  status?: TransactionStatus
  serviceType?: TransactionServiceType
  payment_id?: ObjectId
  course_id?: ObjectId
  program_id?: ObjectId
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Transaction {
  _id?: ObjectId
  consultant_id: ObjectId
  amount: number
  status: TransactionStatus
  serviceType: TransactionServiceType
  payment_id: ObjectId | null
  course_id: ObjectId | null
  program_id: ObjectId | null
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(transaction: TransactionType) {
    const date = new Date()
    this._id = transaction._id || new ObjectId()
    this.consultant_id = transaction.consultant_id
    this.amount = transaction.amount ?? 0
    this.status = transaction.status ?? TransactionStatus.Pending
    this.serviceType = transaction.serviceType ?? TransactionServiceType.Course
    this.payment_id = transaction.payment_id ?? null
    this.course_id = transaction.course_id ?? null
    this.program_id = transaction.program_id ?? null
    this.created_at = transaction.created_at || date
    this.updated_at = transaction.updated_at || date
    this.isDeleted = transaction.isDeleted ?? false
  }
}
