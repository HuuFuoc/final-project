import express from 'express'
import { wrapAsync } from '../utils/handlers'

const lessonsRouter = express.Router()

/**
 * @openapi
 * /api/lesson:
 *   post:
 *     summary: Tạo lesson
 *     tags: [Lesson]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id: { type: string }
 *               course_id: { type: string }
 *               user_id: { type: string }
 *               name: { type: string }
 *               content: { type: string }
 *               lessonType: { type: string }
 *               videoUrl: { type: string }
 *               fullTime: { type: number }
 *               positionOrder: { type: number }
 *     responses:
 *       200: { description: OK }
 */
lessonsRouter.post('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/lesson/paged:
 *   get:
 *     summary: Lấy danh sách lessons có phân trang
 *     tags: [Lesson]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
lessonsRouter.get('/paged', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/lesson/session/{sessionId}:
 *   get:
 *     summary: Lấy lessons theo session
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
lessonsRouter.get('/session/:sessionId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/lesson/{lessonId}:
 *   get:
 *     summary: Lấy lesson theo id
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
lessonsRouter.get('/:lessonId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/lesson/{lessonId}:
 *   put:
 *     summary: Cập nhật lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
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
lessonsRouter.put('/:lessonId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/lesson/{lessonId}:
 *   delete:
 *     summary: Xóa lesson
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
lessonsRouter.delete('/:lessonId', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default lessonsRouter
