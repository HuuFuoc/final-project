import { ObjectId } from 'mongodb'

interface SessionType {
  _id?: ObjectId
  course_id: ObjectId
  user_id: ObjectId
  name: string
  slug: string
  content?: string
  positionOrder?: string
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Session {
  _id?: ObjectId
  course_id: ObjectId
  user_id: ObjectId
  name: string
  slug: string
  content: string
  positionOrder: string
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(session: SessionType) {
    const date = new Date()
    this._id = session._id || new ObjectId()
    this.course_id = session.course_id
    this.user_id = session.user_id
    this.name = session.name
    this.slug = session.slug || ''
    this.content = session.content || ''
    this.positionOrder = session.positionOrder || ''
    this.created_at = session.created_at || date
    this.updated_at = session.updated_at || date
    this.isDeleted = session.isDeleted ?? false
  }
}
