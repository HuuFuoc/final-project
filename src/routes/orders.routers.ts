import express from 'express'
import { wrapAsync } from '../utils/handlers'

const ordersRouter = express.Router()

/**
 * @openapi
 * /api/order/createOrderFromCart:
 *   post:
 *     summary: Tạo order từ giỏ hàng
 *     tags: [Order]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
ordersRouter.post('/createOrderFromCart', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/order/myOrders:
 *   get:
 *     summary: Lấy orders của user hiện tại
 *     tags: [Order]
 *     responses:
 *       200: { description: OK }
 */
ordersRouter.get('/myOrders', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/order/all:
 *   get:
 *     summary: Lấy tất cả orders
 *     tags: [Order]
 *     responses:
 *       200: { description: OK }
 */
ordersRouter.get('/all', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/order/{orderId}:
 *   get:
 *     summary: Lấy order theo id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
ordersRouter.get('/:orderId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/order/status/{orderId}/{newStatus}:
 *   put:
 *     summary: Cập nhật trạng thái order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: newStatus
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
ordersRouter.put('/status/:orderId/:newStatus', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default ordersRouter
