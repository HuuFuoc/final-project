import { Request, Response } from 'express'
import cartService from '../services/carts.services'
import HTTP_STATUS from '../constants/httpStatus'
import { getAccessTokenPayload } from '../utils/jwt'

export const addToCartController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const { course_id } = req.body

  const result = await cartService.addCourseToCart(user_id, course_id)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Course added to cart successfully',
    data: result
  })
}

export const getMyCartController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const result = await cartService.getMyCart(user_id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Cart fetched successfully',
    data: result
  })
}

export const removeFromCartController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  await cartService.removeCartItem(user_id, req.params.cartItemId as string)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Cart item removed successfully',
    data: null
  })
}

export const clearCartController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  await cartService.clearCart(user_id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Cart cleared successfully',
    data: null
  })
}
