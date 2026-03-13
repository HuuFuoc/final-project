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
  const { requestId } = req.params
  const result = await instructorService.reviewInstructorRequest(requestId, user_id, req.body)

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

