import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createLessonController,
  deleteLessonController,
  getLessonByIdController,
  getLessonsBySessionController,
  getLessonsPagedController,
  updateLessonController
} from '../controllers/lessons.controllers'
import { requireAdmin } from '../middlewares/users.middlewares'

const lessonsRouter = express.Router()

/**
 * @openapi
 * /api/lesson:
 *   post:
 *     summary: Tạo lesson cho session
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id:
 *                 type: string
 *               course_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               lessonType:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               fullTime:
 *                 type: number
 *               positionOrder:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
lessonsRouter.post('/', requireAdmin, wrapAsync(createLessonController))

/**
 * @openapi
 * /api/lesson/paged:
 *   get:
 *     summary: Lấy danh sách lessons có phân trang
 *     tags: [Lesson]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
lessonsRouter.get('/paged', wrapAsync(getLessonsPagedController))

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
lessonsRouter.get('/session/:sessionId', wrapAsync(getLessonsBySessionController))

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
lessonsRouter.get('/:lessonId', wrapAsync(getLessonByIdController))

/**
 * @openapi
 * /api/lesson/{lessonId}:
 *   put:
 *     summary: Cập nhật lesson
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 */
lessonsRouter.put('/:lessonId', requireAdmin, wrapAsync(updateLessonController))

/**
 * @openapi
 * /api/lesson/{lessonId}:
 *   delete:
 *     summary: Xóa lesson (soft delete)
 *     tags: [Lesson]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
lessonsRouter.delete('/:lessonId', requireAdmin, wrapAsync(deleteLessonController))

export default lessonsRouter
