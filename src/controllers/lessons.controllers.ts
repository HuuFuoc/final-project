import { Request, Response } from 'express'
import lessonService from '../services/lessons.services'
import HTTP_STATUS from '../constants/httpStatus'

const pickFirstNonEmptyString = (...values: unknown[]) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim() !== '') {
      return value
    }
  }
  return undefined
}

const normalizeLessonPayload = (body: Record<string, any>) => {
  const normalized = { ...body }
  normalized.imageUrl = pickFirstNonEmptyString(body.imageUrl, body.image, body.thumbnail, body.image_url)
  normalized.videoUrl = pickFirstNonEmptyString(body.videoUrl, body.video, body.video_url)

  if (normalized.fullTime !== undefined) {
    const parsed = Number(normalized.fullTime)
    normalized.fullTime = Number.isNaN(parsed) ? normalized.fullTime : parsed
  }

  if (normalized.positionOrder !== undefined) {
    const parsed = Number(normalized.positionOrder)
    normalized.positionOrder = Number.isNaN(parsed) ? normalized.positionOrder : parsed
  }

  return normalized
}

export const createLessonController = async (req: Request, res: Response) => {
  const body = normalizeLessonPayload(req.body)
  const result = await lessonService.createLesson({
    session_id: body.session_id,
    course_id: body.course_id,
    user_id: body.user_id,
    name: body.name,
    content: body.content,
    slug: body.slug,
    videoUrl: body.videoUrl,
    imageUrl: body.imageUrl,
    fullTime: body.fullTime,
    positionOrder: body.positionOrder
  })
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Lesson created successfully',
    data: result
  })
}

export const getLessonsPagedController = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1', 10)
  const limit = parseInt((req.query.limit as string) || '10', 10)
  const { user_id } = req.query as { user_id?: string }
  const result = await lessonService.listLessonsPaged(page, limit, user_id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Lessons fetched successfully',
    data: result
  })
}

export const getLessonsBySessionController = async (req: Request, res: Response) => {
  const { sessionId } = req.params as { sessionId: string }
  const result = await lessonService.listLessonsBySession(sessionId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Lessons fetched successfully',
    data: result
  })
}

export const getLessonByIdController = async (req: Request, res: Response) => {
  const { lessonId } = req.params as { lessonId: string }
  const result = await lessonService.getLessonById(lessonId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Lesson fetched successfully',
    data: result
  })
}

export const updateLessonController = async (req: Request, res: Response) => {
  const { lessonId } = req.params as { lessonId: string }
  const result = await lessonService.updateLesson(lessonId, normalizeLessonPayload(req.body))
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Lesson updated successfully',
    data: result
  })
}

export const deleteLessonController = async (req: Request, res: Response) => {
  const { lessonId } = req.params as { lessonId: string }
  await lessonService.deleteLesson(lessonId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Lesson deleted successfully',
    data: null
  })
}
