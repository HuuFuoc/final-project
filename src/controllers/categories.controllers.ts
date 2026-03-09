import { Request, Response } from 'express'
import categoryService from '../services/categories.services'
import HTTP_STATUS from '../constants/httpStatus'

export const createCategoryController = async (req: Request, res: Response) => {
  const result = await categoryService.createCategory({ name: req.body.name })
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Category created successfully',
    data: result
  })
}

export const getCategoriesController = async (req: Request, res: Response) => {
  const result = await categoryService.listCategories()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Categories fetched successfully',
    data: result
  })
}

export const getCategoryByIdController = async (req: Request, res: Response) => {
  const { categoryId } = req.params as { categoryId: string }
  const result = await categoryService.getCategoryById(categoryId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Category fetched successfully',
    data: result
  })
}

export const updateCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params as { categoryId: string }
  const result = await categoryService.updateCategory(categoryId, {
    name: req.body.name
  })
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Category updated successfully',
    data: result
  })
}

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params as { categoryId: string }
  await categoryService.deleteCategory(categoryId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Category deleted successfully',
    data: null
  })
}
