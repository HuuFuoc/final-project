import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createSessionController,
  deleteSessionController,
  getSessionByIdController,
  getSessionsByCourseController,
  getSessionsController,
  updateSessionController
} from '../controllers/sessions.controllers'
import { requireAdmin } from '../middlewares/users.middlewares'

const sessionsRouter = express.Router()

/**
 * @openapi
 * /api/session:
 *   post:
 *     summary: Tạo session cho course
 *     tags: [Session]
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
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               positionOrder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
sessionsRouter.post('/', requireAdmin, wrapAsync(createSessionController))

/**
 * @openapi
 * /api/session/all:
 *   get:
 *     summary: Lấy tất cả sessions
 *     tags: [Session]
 *     responses:
 *       200:
 *         description: OK
 */
sessionsRouter.get('/all', wrapAsync(getSessionsController))

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
sessionsRouter.get('/course/:courseId', wrapAsync(getSessionsByCourseController))

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
sessionsRouter.get('/:id', wrapAsync(getSessionByIdController))

/**
 * @openapi
 * /api/session/{id}:
 *   put:
 *     summary: Cập nhật session
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
sessionsRouter.put('/:id', requireAdmin, wrapAsync(updateSessionController))

/**
 * @openapi
 * /api/session/{id}:
 *   delete:
 *     summary: Xóa session (soft delete)
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
sessionsRouter.delete('/:id', requireAdmin, wrapAsync(deleteSessionController))

export default sessionsRouter
