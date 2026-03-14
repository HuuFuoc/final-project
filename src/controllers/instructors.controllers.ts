import { Request, Response } from 'express'
import HTTP_STATUS from '../constants/httpStatus'
import instructorService from '../services/instructors.services'
import { getAccessTokenPayload } from '../utils/jwt'
import {
  GetInstructorRequestsQuery,
  ReviewInstructorRequestReqBody,
  UpdateInstructorReqBody
} from '../models/requests/Instructor.requests'
import { INSTRUCTORS_MESSAGES } from '../constants/messages'

export const getInstructorsController = async (req: Request, res: Response) => {
  const result = await instructorService.listInstructors()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: INSTRUCTORS_MESSAGES.LIST_FETCHED,
    data: result
  })
}

export const getInstructorByIdController = async (req: Request, res: Response) => {
  const { instructorId } = req.params as { instructorId: string }
  const result = await instructorService.getInstructorById(instructorId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Instructor fetched successfully',
    data: result
  })
}

export const getInstructorRequestsController = async (req: Request<any, any, any, GetInstructorRequestsQuery>, res: Response) => {
  const result = await instructorService.listInstructorRequests(req.query)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: INSTRUCTORS_MESSAGES.REQUESTS_FETCHED,
    data: result
  })
}

export const reviewInstructorRequestController = async (
  req: Request<{ requestId: string }, any, ReviewInstructorRequestReqBody>,
  res: Response
) => {
  const { user_id } = getAccessTokenPayload(req)
  const requestId = (req.params as { requestId: string }).requestId
  const payload = req.body ?? {}
  const result = await instructorService.reviewInstructorRequest(requestId, user_id, payload)

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: INSTRUCTORS_MESSAGES.REQUEST_REVIEWED,
    data: result
  })
}

export const updateInstructorController = async (
  req: Request<{ instructorId: string }, any, UpdateInstructorReqBody>,
  res: Response
) => {
  const { instructorId } = req.params
  const result = await instructorService.updateInstructor(instructorId, req.body)

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: INSTRUCTORS_MESSAGES.UPDATED,
    data: result
  })
}

export const deleteInstructorController = async (req: Request<{ instructorId: string }>, res: Response) => {
  const { instructorId } = req.params
  await instructorService.deleteInstructor(instructorId)

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: INSTRUCTORS_MESSAGES.DELETED,
    data: null
  })
}

export const getOrderHistoryController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const page = req.query.page as string | undefined
  const limit = req.query.limit as string | undefined
  const courseId = req.query.courseId as string | undefined
  const fromDate = req.query.fromDate as string | undefined
  const toDate = req.query.toDate as string | undefined
  const result = await instructorService.getOrderHistory(user_id, {
    page: page ? parseInt(page, 10) : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
    courseId,
    fromDate,
    toDate
  })
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Get instructor order history successfully',
    data: result
  })
}

export const getCourseSalesSummaryController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const result = await instructorService.getCourseSalesSummary(user_id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Get instructor course sales summary successfully',
    data: result
  })
}

