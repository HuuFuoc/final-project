import express from 'express'
import { wrapAsync } from '../utils/handlers'

const programsRouter = express.Router()

/**
 * @openapi
 * /api/program:
 *   get:
 *     summary: Lấy danh sách programs
 *     tags: [CommunityProgram]
 *     responses:
 *       200: { description: OK }
 */
programsRouter.get('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/program/history:
 *   get:
 *     summary: Lấy lịch sử program của user
 *     tags: [CommunityProgram]
 *     responses:
 *       200: { description: OK }
 */
programsRouter.get('/history', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/program/{id}:
 *   get:
 *     summary: Lấy program theo id
 *     tags: [CommunityProgram]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
programsRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/program/create:
 *   post:
 *     summary: Tạo program
 *     tags: [CommunityProgram]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               location: { type: string }
 *               type: { type: string }
 *               startDate: { type: string, format: date-time }
 *               endDate: { type: string, format: date-time }
 *     responses:
 *       200: { description: OK }
 */
programsRouter.post('/create', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/program/{id}:
 *   put:
 *     summary: Cập nhật program
 *     tags: [CommunityProgram]
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
programsRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/program/{id}:
 *   delete:
 *     summary: Xóa program
 *     tags: [CommunityProgram]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
programsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/program/enroll:
 *   post:
 *     summary: Đăng ký user vào program
 *     tags: [CommunityProgram]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               program_id: { type: string }
 *               user_id: { type: string }
 *     responses:
 *       200: { description: OK }
 */
programsRouter.post('/enroll', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default programsRouter
