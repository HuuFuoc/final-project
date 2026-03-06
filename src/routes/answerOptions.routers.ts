import express from 'express'
import { wrapAsync } from '../utils/handlers'

const answerOptionsRouter = express.Router()

/**
 * @openapi
 * /api/answer-options/create:
 *   post:
 *     summary: Tạo answer option
 *     tags: [AnswerOption]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_id: { type: string }
 *               optionContent: { type: string }
 *               score: { type: number }
 *               positionOrder: { type: number }
 *     responses:
 *       200: { description: OK }
 */
answerOptionsRouter.post('/create', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/answer-options/update:
 *   put:
 *     summary: Cập nhật answer option
 *     tags: [AnswerOption]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: OK }
 */
answerOptionsRouter.put('/update', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/answer-options/{id}:
 *   delete:
 *     summary: Xóa answer option theo id
 *     tags: [AnswerOption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
answerOptionsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/answer-options/by-question/{questionId}:
 *   get:
 *     summary: Lấy danh sách answer options theo question
 *     tags: [AnswerOption]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
answerOptionsRouter.get('/by-question/:questionId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/answer-options/paged:
 *   get:
 *     summary: Lấy danh sách answer options có phân trang
 *     tags: [AnswerOption]
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
answerOptionsRouter.get('/paged', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default answerOptionsRouter
