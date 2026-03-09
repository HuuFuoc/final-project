import { Request, Response } from 'express'
import paymentService from '../services/payments.services'
import HTTP_STATUS from '../constants/httpStatus'
import { getAccessTokenPayload } from '../utils/jwt'
import { PaymentStatus } from '../constants/enums'

export const createPaymentFromOrderController = async (req: Request, res: Response) => {
  const { user_id } = getAccessTokenPayload(req)
  const { order_id, paymentMethod } = req.body
  const result = await paymentService.createPaymentFromOrder(user_id, order_id, paymentMethod)
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Payment created from order successfully',
    data: result
  })
}

export const getPaymentHistoryController = async (req: Request, res: Response) => {
  const userId = req.params.userId as string
  const result = await paymentService.getPaymentHistoryByUser(userId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Payment history fetched successfully',
    data: result
  })
}

export const getPaymentByIdController = async (req: Request, res: Response) => {
  const paymentId = req.params.paymentId as string
  const result = await paymentService.getPaymentById(paymentId)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Payment fetched successfully',
    data: result
  })
}

export const updatePaymentStatusController = async (req: Request, res: Response) => {
  const paymentId = req.params.paymentId as string
  const { status } = req.body
  const result = await paymentService.updatePaymentStatus(paymentId, status as PaymentStatus)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Payment status updated successfully',
    data: result
  })
}

export const stripeWebhookController = async (req: Request, res: Response) => {
  const event = req.body
  await paymentService.handleStripeWebhook(event)
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Webhook processed',
    data: null
  })
}
