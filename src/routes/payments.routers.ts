import express from 'express'
import { wrapAsync } from '../utils/handlers'

const paymentsRouter = express.Router()

/**
 * @openapi
 * /api/payment/createPaymentFromOrder:
 *   post:
 *     summary: Tạo payment từ order
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
paymentsRouter.post('/createPaymentFromOrder', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/payment/history/{userId}:
 *   get:
 *     summary: Lấy lịch sử thanh toán theo user
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
paymentsRouter.get('/history/:userId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/payment/stripe-webhook:
 *   post:
 *     summary: Webhook nhận kết quả từ Stripe
 *     tags: [Payments]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: OK }
 */
paymentsRouter.post('/stripe-webhook', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/payment/{paymentId}/status:
 *   put:
 *     summary: Cập nhật trạng thái payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *     responses:
 *       200: { description: OK }
 */
paymentsRouter.put('/:paymentId/status', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/payment/{paymentId}:
 *   get:
 *     summary: Lấy payment theo id
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
paymentsRouter.get('/:paymentId', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default paymentsRouter
