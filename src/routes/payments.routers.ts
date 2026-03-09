import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createPaymentFromOrderController,
  getPaymentByIdController,
  getPaymentHistoryController,
  stripeWebhookController,
  updatePaymentStatusController
} from '../controllers/payments.controllers'
import { requireAdmin, requireUser } from '../middlewares/users.middlewares'

const paymentsRouter = express.Router()

/**
 * @openapi
 * /api/payment/createPaymentFromOrder:
 *   post:
 *     summary: Tạo payment từ order
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [vnpay, momo, bank_transfer, cash]
 *     responses:
 *       201:
 *         description: Created
 */
paymentsRouter.post('/createPaymentFromOrder', requireUser, wrapAsync(createPaymentFromOrderController))

/**
 * @openapi
 * /api/payment/history/{userId}:
 *   get:
 *     summary: Lấy lịch sử thanh toán theo user
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
paymentsRouter.get('/history/:userId', requireUser, wrapAsync(getPaymentHistoryController))

/**
 * @openapi
 * /api/payment/stripe-webhook:
 *   post:
 *     summary: Webhook nhận kết quả từ Stripe
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 */
paymentsRouter.post('/stripe-webhook', wrapAsync(stripeWebhookController))

/**
 * @openapi
 * /api/payment/{paymentId}/status:
 *   put:
 *     summary: Cập nhật trạng thái payment (admin)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed, refunded]
 *     responses:
 *       200:
 *         description: OK
 */
paymentsRouter.put('/:paymentId/status', requireAdmin, wrapAsync(updatePaymentStatusController))

/**
 * @openapi
 * /api/payment/{paymentId}:
 *   get:
 *     summary: Lấy payment theo id
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
paymentsRouter.get('/:paymentId', requireUser, wrapAsync(getPaymentByIdController))

export default paymentsRouter
