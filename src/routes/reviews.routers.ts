import express from 'express'
import { wrapAsync } from '../utils/handlers'

const reviewsRouter = express.Router()

/**
 * @openapi
 * /api/review:
 *   get:
 *     summary: Lấy danh sách reviews
 *     tags: [Review]
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.get('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/course:
 *   post:
 *     summary: Tạo review cho course
 *     tags: [Review]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id: { type: string }
 *               user_id: { type: string }
 *               rating: { type: number }
 *               comment: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.post('/course', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/appointment:
 *   post:
 *     summary: Tạo review cho appointment
 *     tags: [Review]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointment_id: { type: string }
 *               user_id: { type: string }
 *               rating: { type: number }
 *               comment: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.post('/appointment', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/course/{courseId}:
 *   get:
 *     summary: Lấy reviews theo course
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.get('/course/:courseId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/user/{userId}:
 *   get:
 *     summary: Lấy reviews theo user
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.get('/user/:userId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/appointment/{appointmentId}:
 *   get:
 *     summary: Lấy reviews theo appointment
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.get('/appointment/:appointmentId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/consultant/{consultantId}:
 *   get:
 *     summary: Lấy reviews theo consultant
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: consultantId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.get('/consultant/:consultantId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/{id}:
 *   get:
 *     summary: Lấy review theo id
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/{id}:
 *   put:
 *     summary: Cập nhật review
 *     tags: [Review]
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
reviewsRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/review/{id}:
 *   delete:
 *     summary: Xóa review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
reviewsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default reviewsRouter
