import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Session from '../models/schemas/Session.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'

class SessionService {
  async createSession(payload: {
    course_id: string
    user_id: string
    name: string
    slug?: string
    content?: string
    positionOrder?: string
  }) {
    const { course_id, user_id, name } = payload
    if (!name || !name.trim()) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Session name is required'
      })
    }
    if (!ObjectId.isValid(course_id) || !ObjectId.isValid(user_id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid course_id or user_id'
      })
    }

    const session = new Session({
      course_id: new ObjectId(course_id),
      user_id: new ObjectId(user_id),
      name: name.trim(),
      slug: payload.slug || '',
      content: payload.content || '',
      positionOrder: payload.positionOrder || ''
    })
    const result = await databaseService.sessions.insertOne(session)
    return { ...session, _id: result.insertedId }
  }

  async listAllSessions() {
    return databaseService.sessions
      .find({ isDeleted: false })
      .sort({ created_at: -1 })
      .toArray()
  }

  async listSessionsByCourse(courseId: string) {
    if (!ObjectId.isValid(courseId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid courseId'
      })
    }
    return databaseService.sessions
      .find({ course_id: new ObjectId(courseId), isDeleted: false })
      .sort({ positionOrder: 1, created_at: 1 })
      .toArray()
  }

  async getSessionById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid session id'
      })
    }
    const session = await databaseService.sessions.findOne({
      _id: new ObjectId(id),
      isDeleted: false
    })
    if (!session) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Session not found'
      })
    }
    return session
  }

  async updateSession(
    id: string,
    payload: Partial<{ name: string; slug: string; content: string; positionOrder: string }>
  ) {
    const session = await this.getSessionById(id)
    const update: any = {}
    if (payload.name !== undefined) update.name = payload.name.trim()
    if (payload.slug !== undefined) update.slug = payload.slug
    if (payload.content !== undefined) update.content = payload.content
    if (payload.positionOrder !== undefined) update.positionOrder = payload.positionOrder
    if (Object.keys(update).length === 0) return session
    update.updated_at = new Date()
    await databaseService.sessions.updateOne({ _id: session._id }, { $set: update })
    return this.getSessionById(id)
  }

  async deleteSession(id: string) {
    const session = await this.getSessionById(id)
    await databaseService.sessions.updateOne(
      { _id: session._id },
      { $set: { isDeleted: true, updated_at: new Date() } }
    )
    return true
  }
}
const sessionService = new SessionService()
export default sessionService
