import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController
} from '../controllers/categories.controllers'
import { requireAdmin } from '../middlewares/users.middlewares'

const categoriesRouter = express.Router()

/**
 * @openapi
 * /api/category/create:
 *   post:
 *     summary: Tạo category
 *     tags: [Category]
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
 *     responses:
 *       201:
 *         description: Created
 */
categoriesRouter.post('/create', requireAdmin, wrapAsync(createCategoryController))

/**
 * @openapi
 * /api/category:
 *   get:
 *     summary: Lấy danh sách categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: OK
 */
categoriesRouter.get('/', wrapAsync(getCategoriesController))

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
categoriesRouter.get('/:categoryId', wrapAsync(getCategoryByIdController))

/**
 * @openapi
 * /api/category/{categoryId}:
 *   put:
 *     summary: Cập nhật category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
categoriesRouter.put('/:categoryId', requireAdmin, wrapAsync(updateCategoryController))

/**
 * @openapi
 * /api/category/{categoryId}:
 *   delete:
 *     summary: Xóa category (soft delete)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
categoriesRouter.delete('/:categoryId', requireAdmin, wrapAsync(deleteCategoryController))

export default categoriesRouter
