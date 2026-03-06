import express from 'express'
import { wrapAsync } from '../utils/handlers'

const questionsRouter = express.Router()

/**
 * @openapi
 * /api/question:
 *   post:
 *     summary: Tạo question
 *     tags: [Question]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               survey_id: { type: string }
 *               questionContent: { type: string }
 *               questionType: { type: string }
 *               positionOrder: { type: number }
 *     responses:
 *       200: { description: OK }
 */
questionsRouter.post('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/question/paged:
 *   get:
 *     summary: Lấy danh sách questions có phân trang
 *     tags: [Question]
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
questionsRouter.get('/paged', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/question/by-survey/{surveyId}:
 *   get:
 *     summary: Lấy questions theo survey
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
questionsRouter.get('/by-survey/:surveyId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/question/{id}:
 *   get:
 *     summary: Lấy question theo id
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
questionsRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/question/{id}:
 *   put:
 *     summary: Cập nhật question
 *     tags: [Question]
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
questionsRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/question/{id}:
 *   delete:
 *     summary: Xóa question
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
questionsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default questionsRouter
