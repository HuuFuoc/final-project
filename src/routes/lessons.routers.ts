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
 *             required:
 *               - session_id
 *               - course_id
 *               - user_id
 *               - name
 *             properties:
 *               session_id:
 *                 type: string
 *                 example: "661f1b2c3a4e5f6789abcdef"
 *               course_id:
 *                 type: string
 *                 example: "661f1b2c3a4e5f6789abc000"
 *               user_id:
 *                 type: string
 *                 example: "661f1b2c3a4e5f6789abc111"
 *               name:
 *                 type: string
 *                 example: "Giới thiệu về Node.js"
 *               content:
 *                 type: string
 *                 example: "Nội dung bài học..."
 *               slug:
 *                 type: string
 *                 example: "gioi-thieu-ve-nodejs"
 *               videoUrl:
 *                 type: string
 *                 example: "https://example.com/video.mp4"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/thumbnail.jpg"
 *               fullTime:
 *                 type: number
 *                 example: 1800
 *               positionOrder:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tạo lesson thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lesson created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     session_id:
 *                       type: string
 *                     course_id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     content:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     videoUrl:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     fullTime:
 *                       type: number
 *                     positionOrder:
 *                       type: number
 *                     isDeleted:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa xác thực
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
 *           default: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng mỗi trang
 *       - in: query
 *         name: user_id
 *         required: false
 *         schema:
 *           type: string
 *         description: Lọc lessons theo ID người tạo
 *     responses:
 *       200:
 *         description: Lấy danh sách lessons thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lessons fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           content:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           videoUrl:
 *                             type: string
 *                           imageUrl:
 *                             type: string
 *                           fullTime:
 *                             type: number
 *                           positionOrder:
 *                             type: number
 *                           isDeleted:
 *                             type: boolean
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 */
lessonsRouter.get('/paged', wrapAsync(getLessonsPagedController))

/**
 * @openapi
 * /api/lesson/session/{sessionId}:
 *   get:
 *     summary: Lấy danh sách lessons theo session
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của session
 *     responses:
 *       200:
 *         description: Lấy lessons theo session thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lessons fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       content:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       videoUrl:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       fullTime:
 *                         type: number
 *                       positionOrder:
 *                         type: number
 *       400:
 *         description: sessionId không hợp lệ
 */
lessonsRouter.get('/session/:sessionId', wrapAsync(getLessonsBySessionController))

/**
 * @openapi
 * /api/lesson/{lessonId}:
 *   get:
 *     summary: Lấy chi tiết lesson theo ID
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của lesson
 *     responses:
 *       200:
 *         description: Lấy lesson thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lesson fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     session_id:
 *                       type: string
 *                     course_id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     content:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     videoUrl:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     fullTime:
 *                       type: number
 *                     positionOrder:
 *                       type: number
 *                     isDeleted:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: lessonId không hợp lệ
 *       404:
 *         description: Không tìm thấy lesson
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
 *         description: ID của lesson cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Giới thiệu về Node.js (Updated)"
 *               content:
 *                 type: string
 *                 example: "Nội dung đã cập nhật..."
 *               slug:
 *                 type: string
 *                 example: "gioi-thieu-nodejs-updated"
 *               videoUrl:
 *                 type: string
 *                 example: "https://example.com/new-video.mp4"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/new-thumbnail.jpg"
 *               fullTime:
 *                 type: number
 *                 example: 2400
 *               positionOrder:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cập nhật lesson thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lesson updated successfully
 *                 data:
 *                   type: object
 *       400:
 *         description: lessonId không hợp lệ
 *       404:
 *         description: Không tìm thấy lesson
 *       401:
 *         description: Chưa xác thực
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
 *         description: ID của lesson cần xóa
 *     responses:
 *       200:
 *         description: Xóa lesson thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lesson deleted successfully
 *       400:
 *         description: lessonId không hợp lệ
 *       404:
 *         description: Không tìm thấy lesson
 *       401:
 *         description: Chưa xác thực
 */
lessonsRouter.delete('/:lessonId', requireAdmin, wrapAsync(deleteLessonController))

export default lessonsRouter
