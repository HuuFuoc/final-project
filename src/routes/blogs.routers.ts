import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  createBlogController,
  deleteBlogController,
  getBlogByIdController,
  getBlogsByUserController,
  getBlogsController,
  updateBlogController
} from '../controllers/blogs.controllers'
import { blogIdValidator, blogUserIdValidator, createBlogValidator, updateBlogValidator } from '../middlewares/blogs.middlewares'
import { requireStaffOrAdmin } from '../middlewares/users.middlewares'

const blogsRouter = express.Router()

/**
 * @openapi
 * /api/blog/create:
 *   post:
 *     summary: Tao blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string }
 *               title: { type: string }
 *               content: { type: string }
 *               blogImgUrl: { type: string }
 *     responses:
 *       201: { description: Created }
 */
blogsRouter.post('/create', requireStaffOrAdmin, createBlogValidator, wrapAsync(createBlogController))

/**
 * @openapi
 * /api/blog:
 *   get:
 *     summary: Lay danh sach blogs
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.get('/', wrapAsync(getBlogsController))

/**
 * @openapi
 * /api/blog/user/{userId}:
 *   get:
 *     summary: Lay blogs theo user
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.get('/user/:userId', requireStaffOrAdmin, blogUserIdValidator, wrapAsync(getBlogsByUserController))

/**
 * @openapi
 * /api/blog/{id}:
 *   get:
 *     summary: Lay blog theo id
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.get('/:id', blogIdValidator, wrapAsync(getBlogByIdController))

/**
 * @openapi
 * /api/blog/{id}:
 *   put:
 *     summary: Cap nhat blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
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
blogsRouter.put('/:id', requireStaffOrAdmin, blogIdValidator, updateBlogValidator, wrapAsync(updateBlogController))

/**
 * @openapi
 * /api/blog/{id}:
 *   delete:
 *     summary: Xoa blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
blogsRouter.delete('/:id', requireStaffOrAdmin, blogIdValidator, wrapAsync(deleteBlogController))

export default blogsRouter
