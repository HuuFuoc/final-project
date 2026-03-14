import { Request, Response } from 'express'
import HTTP_STATUS from '../constants/httpStatus'
import blogService from '../services/blogs.services'

export const getBlogsController = async (req: Request, res: Response) => {
  const result = await blogService.getBlogs()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Blogs fetched successfully',
    data: result
  })
}

export const getBlogsByUserController = async (req: Request, res: Response) => {
  const { userId } = req.params as { userId: string }
  const result = await blogService.getBlogsByUserId(userId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'User blogs fetched successfully',
    data: result
  })
}

export const getBlogByIdController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await blogService.getBlogById(id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Blog fetched successfully',
    data: result
  })
}

export const createBlogController = async (req: Request, res: Response) => {
  const result = await blogService.createBlog(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Blog created successfully',
    data: result
  })
}

export const updateBlogController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const result = await blogService.updateBlog(id, req.body)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Blog updated successfully',
    data: result
  })
}

export const deleteBlogController = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  await blogService.deleteBlog(id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    data: null
  })
}
