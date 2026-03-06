import express from 'express'
import { wrapAsync } from '../utils/handlers'

const cartsRouter = express.Router()

/**
 * @openapi
 * /api/cart/addCourse:
 *   post:
 *     summary: Thêm khóa học vào giỏ
 *     tags: [Cart]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
cartsRouter.post('/addCourse', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/cart/myCart:
 *   get:
 *     summary: Lấy giỏ hàng của user hiện tại
 *     tags: [Cart]
 *     responses:
 *       200: { description: OK }
 */
cartsRouter.get('/myCart', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/cart/remove/{cartItemId}:
 *   delete:
 *     summary: Xóa item khỏi giỏ
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
cartsRouter.delete('/remove/:cartItemId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/cart/clear:
 *   delete:
 *     summary: Xóa toàn bộ giỏ hàng
 *     tags: [Cart]
 *     responses:
 *       200: { description: OK }
 */
cartsRouter.delete('/clear', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default cartsRouter
