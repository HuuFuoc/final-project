import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createOrderFromCartController,
  getAllOrdersController,
  getMyOrdersController,
  getOrderByIdController,
  updateOrderStatusController
} from '../controllers/orders.controllers'
import { requireAdmin, requireUser } from '../middlewares/users.middlewares'

const ordersRouter = express.Router()

/**
 * @openapi
 * /api/order/createOrderFromCart:
 *   post:
 *     summary: Tạo order từ giỏ hàng hiện tại
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
ordersRouter.post('/createOrderFromCart', requireUser, wrapAsync(createOrderFromCartController))

/**
 * @openapi
 * /api/order/myOrders:
 *   get:
 *     summary: Lấy orders của user hiện tại
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
ordersRouter.get('/myOrders', requireUser, wrapAsync(getMyOrdersController))

/**
 * @openapi
 * /api/order/all:
 *   get:
 *     summary: Lấy tất cả orders (admin)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
ordersRouter.get('/all', requireAdmin, wrapAsync(getAllOrdersController))

/**
 * @openapi
 * /api/order/{orderId}:
 *   get:
 *     summary: Lấy order theo id
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
ordersRouter.get('/:orderId', requireUser, wrapAsync(getOrderByIdController))

/**
 * @openapi
 * /api/order/status/{orderId}/{newStatus}:
 *   put:
 *     summary: Cập nhật trạng thái order (admin)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: newStatus
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, paid, failed, refunded]
 *     responses:
 *       200:
 *         description: OK
 */
ordersRouter.put('/status/:orderId/:newStatus', requireAdmin, wrapAsync(updateOrderStatusController))

export default ordersRouter
