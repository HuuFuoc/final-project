import { Request, Response } from 'express'
import sessionService from '../services/sessions.services'
import HTTP_STATUS from '../constants/httpStatus'

export const createSessionController = async (req: Request, res: Response) => {
  const result = await sessionService.createSession(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Session created successfully',
    data: result
  })
}

export const getSessionsController = async (req: Request, res: Response) => {
  const result = await sessionService.listAllSessions()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Sessions fetched successfully',
    data: result
  })
}

export const getSessionByIdController = async (req: Request, res: Response) => {
  const result = await sessionService.getSessionById(req.params.id as string)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Session fetched successfully',
    data: result
  })
}

export const getSessionsByCourseController = async (req: Request, res: Response) => {
  const result = await sessionService.listSessionsByCourse(req.params.courseId as string)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Sessions fetched successfully',
    data: result
  })
}

export const updateSessionController = async (req: Request, res: Response) => {
  const result = await sessionService.updateSession(req.params.id as string, req.body)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Session updated successfully',
    data: result
  })
}

export const deleteSessionController = async (req: Request, res: Response) => {
  await sessionService.deleteSession(req.params.id as string)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Session deleted successfully',
    data: null
  })
}
