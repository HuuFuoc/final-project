import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  addToCartController,
  clearCartController,
  getMyCartController,
  removeFromCartController
} from '../controllers/carts.controllers'
import { requireUser } from '../middlewares/users.middlewares'

const cartsRouter = express.Router()

/**
 * @openapi
 * /api/cart/addCourse:
 *   post:
 *     summary: Thêm khóa học vào giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
cartsRouter.post('/addCourse', requireUser, wrapAsync(addToCartController))

/**
 * @openapi
 * /api/cart/myCart:
 *   get:
 *     summary: Lấy giỏ hàng hiện tại của user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
cartsRouter.get('/myCart', requireUser, wrapAsync(getMyCartController))

/**
 * @openapi
 * /api/cart/remove/{cartItemId}:
 *   delete:
 *     summary: Xóa item khỏi giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
cartsRouter.delete('/remove/:cartItemId', requireUser, wrapAsync(removeFromCartController))

/**
 * @openapi
 * /api/cart/clear:
 *   delete:
 *     summary: Xóa toàn bộ giỏ hàng (đánh dấu abandoned)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
cartsRouter.delete('/clear', requireUser, wrapAsync(clearCartController))

export default cartsRouter
