import { ObjectId } from 'mongodb'
import { CourseStatus, CourseTargetAudience, RiskLevel } from '../../constants/enums'

interface CourseType {
  _id?: ObjectId
  name: string
  user_id: ObjectId
  category_id: ObjectId
  content: string
  slug: string
  status?: CourseStatus
  targetAudience?: CourseTargetAudience
  imageUrl?: string
  imageUrls?: string[]
  videoUrls?: string[]
  riskLevel?: RiskLevel
  price: number
  discount?: number
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Course {
  _id?: ObjectId
  name: string
  user_id: ObjectId
  category_id: ObjectId
  content: string
  slug: string
  status: CourseStatus
  targetAudience: CourseTargetAudience
  imageUrl: string
  imageUrls: string[]
  videoUrls: string[]
  riskLevel: RiskLevel
  price: number
  discount: number
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(course: CourseType) {
    const date = new Date()
    this._id = course._id || new ObjectId()
    this.name = course.name
    this.user_id = course.user_id
    this.category_id = course.category_id
    this.content = course.content || ''
    this.slug = course.slug || ''
    this.status = course.status ?? CourseStatus.Draft
    this.targetAudience = course.targetAudience ?? CourseTargetAudience.All
    this.imageUrl = course.imageUrl || ''
    this.imageUrls = course.imageUrls ?? []
    this.videoUrls = course.videoUrls ?? []
    this.riskLevel = course.riskLevel ?? RiskLevel.Low
    this.price = course.price ?? 0
    this.discount = course.discount ?? 0
    this.created_at = course.created_at || date
    this.updated_at = course.updated_at || date
    this.isDeleted = course.isDeleted ?? false
  }
}
