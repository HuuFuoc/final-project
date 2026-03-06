import express from 'express'
import { wrapAsync } from '../utils/handlers'

const coursesRouter = express.Router()

/**
 * @openapi
 * /api/course:
 *   get:
 *     summary: Lấy danh sách courses
 *     tags: [Course]
 *     responses:
 *       200: { description: OK }
 */
coursesRouter.get('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/course/{courseId}:
 *   get:
 *     summary: Lấy course theo id
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
coursesRouter.get('/:courseId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/course/create:
 *   post:
 *     summary: Tạo course
 *     tags: [Course]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               slug: { type: string }
 *               user_id: { type: string }
 *               category_id: { type: string }
 *               content: { type: string }
 *               price: { type: number }
 *               discount: { type: number }
 *     responses:
 *       200: { description: OK }
 */
coursesRouter.post('/create', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/course/{id}:
 *   put:
 *     summary: Cập nhật course
 *     tags: [Course]
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
coursesRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/course/{id}:
 *   delete:
 *     summary: Xóa course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
coursesRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/course/myCourses:
 *   get:
 *     summary: Lấy courses của user hiện tại
 *     tags: [Course]
 *     responses:
 *       200: { description: OK }
 */
coursesRouter.get('/myCourses', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default coursesRouter
