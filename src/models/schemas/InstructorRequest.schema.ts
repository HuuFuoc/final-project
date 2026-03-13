import { ObjectId } from 'mongodb'
import { InstructorRequestStatus } from '../../constants/enums'

interface InstructorRequestType {
  _id?: ObjectId
  user_id: ObjectId
  fullName: string
  email: string
  phoneNumber?: string
  qualifications?: string[]
  jobTitle?: string
  profilePicUrl?: string
  note?: string
  status?: InstructorRequestStatus
  reviewed_by?: ObjectId
  reviewed_at?: Date
  review_note?: string
  created_at?: Date
  updated_at?: Date
}

export default class InstructorRequest {
  _id?: ObjectId
  user_id: ObjectId
  fullName: string
  email: string
  phoneNumber: string
  qualifications: string[]
  jobTitle: string
  profilePicUrl: string
  note: string
  status: InstructorRequestStatus
  reviewed_by?: ObjectId
  reviewed_at?: Date
  review_note: string
  created_at: Date
  updated_at: Date

  constructor(instructorRequest: InstructorRequestType) {
    const date = new Date()
    this._id = instructorRequest._id || new ObjectId()
    this.user_id = instructorRequest.user_id
    this.fullName = instructorRequest.fullName
    this.email = instructorRequest.email
    this.phoneNumber = instructorRequest.phoneNumber || ''
    this.qualifications = instructorRequest.qualifications ?? []
    this.jobTitle = instructorRequest.jobTitle || ''
    this.profilePicUrl = instructorRequest.profilePicUrl || ''
    this.note = instructorRequest.note || ''
    this.status = instructorRequest.status ?? InstructorRequestStatus.Pending
    this.reviewed_by = instructorRequest.reviewed_by
    this.reviewed_at = instructorRequest.reviewed_at
    this.review_note = instructorRequest.review_note || ''
    this.created_at = instructorRequest.created_at || date
    this.updated_at = instructorRequest.updated_at || date
  }
}

