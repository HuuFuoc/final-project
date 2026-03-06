import express from 'express'
import { wrapAsync } from '../utils/handlers'

const blogsRouter = express.Router()

/**
 * @openapi
 * /api/blog/create:
 *   post:
 *     summary: Tạo blog
 *     tags: [Blog]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string }
 *               content: { type: string }
 *               blogImgUrl: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.post('/create', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/blog:
 *   get:
 *     summary: Lấy danh sách blogs
 *     tags: [Blog]
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.get('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/blog/user/{userId}:
 *   get:
 *     summary: Lấy blogs theo user
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.get('/user/:userId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/blog/{id}:
 *   get:
 *     summary: Lấy blog theo id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/blog/{id}:
 *   put:
 *     summary: Cập nhật blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/blog/{id}:
 *   delete:
 *     summary: Xóa blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default blogsRouter
