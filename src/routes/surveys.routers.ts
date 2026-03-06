import express from 'express'
import { wrapAsync } from '../utils/handlers'

const surveysRouter = express.Router()

/**
 * @openapi
 * /api/survey:
 *   post:
 *     summary: Tạo survey
 *     tags: [Survey]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               type: { type: string }
 *     responses:
 *       200: { description: OK }
 */
surveysRouter.post('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/survey/submit:
 *   post:
 *     summary: Nộp bài survey
 *     tags: [Survey]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               survey_id: { type: string }
 *               user_id: { type: string }
 *               answers: { type: array }
 *     responses:
 *       200: { description: OK }
 */
surveysRouter.post('/submit', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/survey/paged:
 *   get:
 *     summary: Lấy danh sách surveys có phân trang
 *     tags: [Survey]
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
surveysRouter.get('/paged', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/survey/survey-result/{id}:
 *   get:
 *     summary: Lấy kết quả survey theo id
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
surveysRouter.get('/survey-result/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/survey/{id}:
 *   get:
 *     summary: Lấy survey theo id
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
surveysRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/survey/{id}:
 *   put:
 *     summary: Cập nhật survey
 *     tags: [Survey]
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
surveysRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/survey/{id}:
 *   delete:
 *     summary: Xóa survey
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
surveysRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default surveysRouter
