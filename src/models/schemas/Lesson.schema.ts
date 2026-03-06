import { ObjectId } from 'mongodb'
import { LessonType } from '../../constants/enums'

interface LessonTypeInput {
  _id?: ObjectId
  session_id: ObjectId
  course_id: ObjectId
  user_id: ObjectId
  name: string
  content?: string
  slug?: string
  lessonType?: LessonType
  videoUrl?: string
  imageUrl?: string
  fullTime?: number
  positionOrder?: number
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Lesson {
  _id?: ObjectId
  session_id: ObjectId
  course_id: ObjectId
  user_id: ObjectId
  name: string
  content: string
  slug: string
  lessonType: LessonType
  videoUrl: string
  imageUrl: string
  fullTime: number
  positionOrder: number
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(lesson: LessonTypeInput) {
    const date = new Date()
    this._id = lesson._id || new ObjectId()
    this.session_id = lesson.session_id
    this.course_id = lesson.course_id
    this.user_id = lesson.user_id
    this.name = lesson.name
    this.content = lesson.content || ''
    this.slug = lesson.slug || ''
    this.lessonType = lesson.lessonType ?? LessonType.Video
    this.videoUrl = lesson.videoUrl || ''
    this.imageUrl = lesson.imageUrl || ''
    this.fullTime = lesson.fullTime ?? 0
    this.positionOrder = lesson.positionOrder ?? 0
    this.created_at = lesson.created_at || date
    this.updated_at = lesson.updated_at || date
    this.isDeleted = lesson.isDeleted ?? false
  }
}
