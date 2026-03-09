import { Request, Response } from 'express'
import lessonService from '../services/lessons.services'
import HTTP_STATUS from '../constants/httpStatus'

export const createLessonController = async (req: Request, res: Response) => {
  const result = await lessonService.createLesson(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Lesson created successfully',
    data: result
  })
}

export const getLessonsPagedController = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1', 10)
  const limit = parseInt((req.query.limit as string) || '10', 10)
  const result = await lessonService.listLessonsPaged(page, limit)
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
  const result = await lessonService.updateLesson(lessonId, req.body)
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
