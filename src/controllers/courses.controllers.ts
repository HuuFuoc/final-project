import { Request, Response } from 'express'
import courseService from '../services/courses.services'
import HTTP_STATUS from '../constants/httpStatus'
import { getAccessTokenPayload } from '../utils/jwt'

export const getCoursesController = async (req: Request, res: Response) => {
  const result = await courseService.listCourses()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Courses fetched successfully',
    data: result
  })
}

export const getCourseByIdController = async (req: Request, res: Response) => {
  const { courseId } = req.params as { courseId: string }
  const result = await courseService.getCourseById(courseId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Course fetched successfully',
    data: result
  })
}

export const createCourseController = async (req: Request, res: Response) => {
  const body = req.body
  const result = await courseService.createCourse({
    name: body.name,
    user_id: body.user_id,
    category_id: body.category_id,
    content: body.content,
    slug: body.slug,
    price: body.price,
    discount: body.discount,
    status: body.status
  })
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Course created successfully',
    data: result
  })
}

export const updateCourseController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await courseService.updateCourse(id, req.body)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Course updated successfully',
    data: result
  })
}

export const deleteCourseController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  await courseService.deleteCourse(id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Course deleted successfully',
    data: null
  })
}

export const getMyCoursesController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const result = await courseService.getMyCourses(user_id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'My courses fetched successfully',
    data: result
  })
}
