import { ObjectId } from 'mongodb'
import { AppointmentStatus } from '../../constants/enums'

interface AppointmentType {
  _id?: ObjectId
  user_id: ObjectId
  consultant_id: ObjectId
  status?: AppointmentStatus
  note?: string
  scheduledAt?: Date
  created_at?: Date
  updated_at?: Date
}

export default class Appointment {
  _id?: ObjectId
  user_id: ObjectId
  consultant_id: ObjectId
  status: AppointmentStatus
  note: string
  scheduledAt: Date
  created_at: Date
  updated_at: Date

  constructor(appointment: AppointmentType) {
    const date = new Date()
    this._id = appointment._id || new ObjectId()
    this.user_id = appointment.user_id
    this.consultant_id = appointment.consultant_id
    this.status = appointment.status ?? AppointmentStatus.Scheduled
    this.note = appointment.note || ''
    this.scheduledAt = appointment.scheduledAt || date
    this.created_at = appointment.created_at || date
    this.updated_at = appointment.updated_at || date
  }
}
