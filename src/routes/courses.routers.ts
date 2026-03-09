import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createCourseController,
  deleteCourseController,
  getCourseByIdController,
  getCoursesController,
  getMyCoursesController,
  updateCourseController
} from '../controllers/courses.controllers'
import { requireAdmin, requireUser } from '../middlewares/users.middlewares'

const coursesRouter = express.Router()

/**
 * @openapi
 * /api/course:
 *   get:
 *     summary: Lấy danh sách courses (published)
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: OK
 */
coursesRouter.get('/', wrapAsync(getCoursesController))

/**
 * @openapi
 * /api/course/myCourses:
 *   get:
 *     summary: Lấy danh sách khóa học user đã mua
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
coursesRouter.get('/myCourses', requireUser, wrapAsync(getMyCoursesController))

/**
 * @openapi
 * /api/course/{courseId}:
 *   get:
 *     summary: Lấy course theo id kèm sessions và lessons
 *     tags: [Course]
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
coursesRouter.get('/:courseId', wrapAsync(getCourseByIdController))

/**
 * @openapi
 * /api/course/create:
 *   post:
 *     summary: Tạo course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               user_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *               content:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
coursesRouter.post('/create', requireAdmin, wrapAsync(createCourseController))

/**
 * @openapi
 * /api/course/{id}:
 *   put:
 *     summary: Cập nhật course
 *     tags: [Course]
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
coursesRouter.put('/:id', requireAdmin, wrapAsync(updateCourseController))

/**
 * @openapi
 * /api/course/{id}:
 *   delete:
 *     summary: Xóa course (soft delete)
 *     tags: [Course]
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
coursesRouter.delete('/:id', requireAdmin, wrapAsync(deleteCourseController))

export default coursesRouter
