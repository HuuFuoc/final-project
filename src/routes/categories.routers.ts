import express from 'express'
import { wrapAsync } from '../utils/handlers'

const categoriesRouter = express.Router()

/**
 * @openapi
 * /api/category/create:
 *   post:
 *     summary: Tạo category
 *     tags: [Category]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       200: { description: OK }
 */
categoriesRouter.post('/create', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/category:
 *   get:
 *     summary: Lấy danh sách categories
 *     tags: [Category]
 *     responses:
 *       200: { description: OK }
 */
categoriesRouter.get('/', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/category/{categoryId}:
 *   get:
 *     summary: Lấy category theo id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
categoriesRouter.get('/:categoryId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/category/{categoryId}:
 *   put:
 *     summary: Cập nhật category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *     responses:
 *       200: { description: OK }
 */
categoriesRouter.put('/:categoryId', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/category/{categoryId}:
 *   delete:
 *     summary: Xóa category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
categoriesRouter.delete('/:categoryId', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default categoriesRouter
