import express from 'express'
import { wrapAsync } from '../utils/handlers'

const sessionsRouter = express.Router()

/**
 * @openapi
 * /api/session:
 *   post:
 *     summary: Tạo session
 *     tags: [Session]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string }
 *               user_id: { type: string }
 *               name: { type: string }
 *               slug: { type: string }
 *               content: { type: string }
 *               positionOrder: { type: string }
 *     responses:
 *       200: { description: OK }
 */
sessionsRouter.post('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/session/all:
 *   get:
 *     summary: Lấy tất cả sessions
 *     tags: [Session]
 *     responses:
 *       200: { description: OK }
 */
sessionsRouter.get('/all', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/session/course/{courseId}:
 *   get:
 *     summary: Lấy sessions theo course
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
sessionsRouter.get('/course/:courseId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/session/{id}:
 *   get:
 *     summary: Lấy session theo id
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
sessionsRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/session/{id}:
 *   put:
 *     summary: Cập nhật session
 *     tags: [Session]
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
sessionsRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/session/{id}:
 *   delete:
 *     summary: Xóa session
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
sessionsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default sessionsRouter
