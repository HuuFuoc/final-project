import { Request, Response } from 'express'
import orderService from '../services/orders.services'
import HTTP_STATUS from '../constants/httpStatus'
import { getAccessTokenPayload } from '../utils/jwt'
import { OrderStatus } from '../constants/enums'

export const createOrderFromCartController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const { selectedCartItemIds } = req.body
  const result = await orderService.createOrderFromCart(user_id, selectedCartItemIds)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Order created from cart successfully',
    data: result
  })
}

export const getMyOrdersController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const result = await orderService.getMyOrders(user_id)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Orders fetched successfully',
    data: result
  })
}

export const getAllOrdersController = async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders()
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'All orders fetched successfully',
    data: result
  })
}

export const getOrderByIdController = async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string
  const result = await orderService.getOrderById(orderId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Order fetched successfully',
    data: result
  })
}

export const updateOrderStatusController = async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string
  const newStatus = req.params.newStatus as string
  const result = await orderService.updateOrderStatus(orderId, newStatus as OrderStatus)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Order status updated successfully',
    data: result
  })
}
