import express from 'express'
import { wrapAsync } from '../utils/handlers'

const consultantsRouter = express.Router()

/**
 * @openapi
 * /api/consultant:
 *   get:
 *     summary: Lấy danh sách consultants
 *     tags: [Consultant]
 *     responses:
 *       200: { description: OK }
 */
consultantsRouter.get('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/consultant/{id}:
 *   get:
 *     summary: Lấy consultant theo id
 *     tags: [Consultant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
consultantsRouter.get('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/consultant/create:
 *   post:
 *     summary: Tạo consultant
 *     tags: [Consultant]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string }
 *               fullName: { type: string }
 *               email: { type: string }
 *               jobTitle: { type: string }
 *               qualifications: { type: array, items: { type: string } }
 *     responses:
 *       200: { description: OK }
 */
consultantsRouter.post('/create', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/consultant/{id}:
 *   put:
 *     summary: Cập nhật consultant
 *     tags: [Consultant]
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
consultantsRouter.put('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/consultant/{id}:
 *   delete:
 *     summary: Xóa consultant
 *     tags: [Consultant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
consultantsRouter.delete('/:id', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default consultantsRouter
