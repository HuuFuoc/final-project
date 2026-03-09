import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Lesson from '../models/schemas/Lesson.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import { LessonType } from '../constants/enums'

class LessonService {
  async createLesson(payload: {
    session_id: string
    course_id: string
    user_id: string
    name: string
    content?: string
    slug?: string
    lessonType?: LessonType
    videoUrl?: string
    imageUrl?: string
    fullTime?: number
    positionOrder?: number
  }) {
    const { session_id, course_id, user_id, name } = payload
    if (!name || !name.trim()) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Lesson name is required'
      })
    }
    if (!ObjectId.isValid(session_id) || !ObjectId.isValid(course_id) || !ObjectId.isValid(user_id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid ids in lesson payload'
      })
    }

    const lesson = new Lesson({
      session_id: new ObjectId(session_id),
      course_id: new ObjectId(course_id),
      user_id: new ObjectId(user_id),
      name: name.trim(),
      content: payload.content,
      slug: payload.slug,
      lessonType: payload.lessonType,
      videoUrl: payload.videoUrl,
      imageUrl: payload.imageUrl,
      fullTime: payload.fullTime,
      positionOrder: payload.positionOrder
    })

    const result = await databaseService.lessons.insertOne(lesson)
    return { ...lesson, _id: result.insertedId }
  }

  async listLessonsPaged(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
      databaseService.lessons
        .find({ isDeleted: false })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      databaseService.lessons.countDocuments({ isDeleted: false })
    ])
    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async listLessonsBySession(sessionId: string) {
    if (!ObjectId.isValid(sessionId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid sessionId'
      })
    }
    return databaseService.lessons
      .find({ session_id: new ObjectId(sessionId), isDeleted: false })
      .sort({ positionOrder: 1, created_at: 1 })
      .toArray()
  }

  async getLessonById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid lesson id'
      })
    }
    const lesson = await databaseService.lessons.findOne({
      _id: new ObjectId(id),
      isDeleted: false
    })
    if (!lesson) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Lesson not found'
      })
    }
    return lesson
  }

  async updateLesson(id: string, payload: Partial<Omit<Lesson, '_id'>>) {
    const lesson = await this.getLessonById(id)
    const update: any = {}
    ;['name', 'content', 'slug', 'videoUrl', 'imageUrl', 'fullTime', 'positionOrder', 'lessonType'].forEach(
      (key) => {
        const k = key as keyof typeof payload
        if (payload[k] !== undefined) {
          // @ts-ignore
          update[key] = payload[k]
        }
      }
    )
    if (Object.keys(update).length === 0) return lesson
    update.updated_at = new Date()
    await databaseService.lessons.updateOne({ _id: lesson._id }, { $set: update })
    return this.getLessonById(id)
  }

  async deleteLesson(id: string) {
    const lesson = await this.getLessonById(id)
    await databaseService.lessons.updateOne(
      { _id: lesson._id },
      { $set: { isDeleted: true, updated_at: new Date() } }
    )
    return true
  }
}
const lessonService = new LessonService()
export default lessonService
