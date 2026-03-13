import { ObjectId } from 'mongodb'

interface InstructorType {
  _id?: ObjectId
  user_id: ObjectId
  fullName?: string
  email?: string
  phoneNumber?: string
  qualifications?: string[]
  jobTitle?: string
  hireDate?: Date
  salary?: number
  created_at?: Date
  updated_at?: Date
  profilePicUrl?: string
}

export default class Instructor {
  _id?: ObjectId
  user_id: ObjectId
  fullName: string
  email: string
  phoneNumber: string
  qualifications: string[]
  jobTitle: string
  hireDate: Date
  salary: number
  created_at: Date
  updated_at: Date
  profilePicUrl: string

  constructor(instructor: InstructorType) {
    const date = new Date()
    this._id = instructor._id || new ObjectId()
    this.user_id = instructor.user_id
    this.fullName = instructor.fullName || ''
    this.email = instructor.email || ''
    this.phoneNumber = instructor.phoneNumber || ''
    this.qualifications = instructor.qualifications ?? []
    this.jobTitle = instructor.jobTitle || ''
    this.hireDate = instructor.hireDate || date
    this.salary = instructor.salary ?? 0
    this.created_at = instructor.created_at || date
    this.updated_at = instructor.updated_at || date
    this.profilePicUrl = instructor.profilePicUrl || ''
  }
}

