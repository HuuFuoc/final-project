import { ObjectId } from 'mongodb'
import { ConsultantStatus } from '../../constants/enums'

interface ConsultantType {
  _id?: ObjectId
  user_id: ObjectId
  fullName?: string
  email?: string
  phoneNumber?: string
  qualifications?: string[]
  jobTitle?: string
  hireDate?: Date
  salary?: number
  status?: ConsultantStatus
  created_at?: Date
  updated_at?: Date
  profilePicUrl?: string
}

export default class Consultant {
  _id?: ObjectId
  user_id: ObjectId
  fullName: string
  email: string
  phoneNumber: string
  qualifications: string[]
  jobTitle: string
  hireDate: Date
  salary: number
  status: ConsultantStatus
  created_at: Date
  updated_at: Date
  profilePicUrl: string

  constructor(consultant: ConsultantType) {
    const date = new Date()
    this._id = consultant._id || new ObjectId()
    this.user_id = consultant.user_id
    this.fullName = consultant.fullName || ''
    this.email = consultant.email || ''
    this.phoneNumber = consultant.phoneNumber || ''
    this.qualifications = consultant.qualifications ?? []
    this.jobTitle = consultant.jobTitle || ''
    this.hireDate = consultant.hireDate || date
    this.salary = consultant.salary ?? 0
    this.status = consultant.status ?? ConsultantStatus.Active
    this.created_at = consultant.created_at || date
    this.updated_at = consultant.updated_at || date
    this.profilePicUrl = consultant.profilePicUrl || ''
  }
}
