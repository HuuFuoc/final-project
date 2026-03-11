import { Request, Response } from 'express'
import HTTP_STATUS from '../constants/httpStatus'
import reviewService from '../services/reviews.services'

export const getReviewsController = async (req: Request, res: Response) => {
  const result = await reviewService.getReviews()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Reviews fetched successfully',
    data: result
  })
}

export const createCourseReviewController = async (req: Request, res: Response) => {
  const result = await reviewService.createCourseReview(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Course review created successfully',
    data: result
  })
}

export const createAppointmentReviewController = async (req: Request, res: Response) => {
  const result = await reviewService.createAppointmentReview(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Appointment review created successfully',
    data: result
  })
}

export const getReviewsByCourseController = async (req: Request, res: Response) => {
  const { courseId } = req.params as { courseId: string }
  const result = await reviewService.getReviewsByCourseId(courseId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Course reviews fetched successfully',
    data: result
  })
}

export const getReviewsByUserController = async (req: Request, res: Response) => {
  const { userId } = req.params as { userId: string }
  const result = await reviewService.getReviewsByUserId(userId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'User reviews fetched successfully',
    data: result
  })
}

export const getReviewByIdController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await reviewService.getReviewById(id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Review fetched successfully',
    data: result
  })
}

export const updateReviewController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await reviewService.updateReview(id, req.body)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Review updated successfully',
    data: result
  })
}

export const deleteReviewController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  await reviewService.deleteReview(id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Review deleted successfully',
    data: null
  })
}