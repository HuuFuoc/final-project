import express from 'express'
import { wrapAsync } from '../utils/handlers'
import {
  deleteInstructorController,
  getInstructorByIdController,
  getInstructorsController,
  getInstructorRequestsController,
  reviewInstructorRequestController,
  updateInstructorController
} from '../controllers/instructors.controllers'
import {
  instructorIdValidator,
  instructorRequestIdValidator,
  instructorRequestStatusValidator,
  reviewInstructorRequestValidator,
  updateInstructorValidator
} from '../middlewares/instructors.middlewares'
import { requireStaffOrAdmin } from '../middlewares/users.middlewares'

const instructorsRouter = express.Router()

/**
 * @openapi
 * /api/instructor:
 *   get:
 *     summary: Lay danh sach instructors
 *     tags: [Instructor]
 *     responses:
 *       200: { description: OK }
 */
instructorsRouter.get('/', wrapAsync(getInstructorsController))

/**
 * @openapi
 * /api/instructor/request:
 *   get:
 *     summary: Staff lay danh sach yeu cau become instructor
 *     tags: [Instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *     responses:
 *       200: { description: OK }
 */
instructorsRouter.get(
  '/request',
  requireStaffOrAdmin,
  instructorRequestStatusValidator,
  wrapAsync(getInstructorRequestsController)
)

/**
 * @openapi
 * /api/instructor/{instructorId}:
 *   get:
 *     summary: Lay instructor theo id
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
instructorsRouter.get('/:instructorId', instructorIdValidator, wrapAsync(getInstructorByIdController))

/**
 * @openapi
 * /api/instructor/request/{requestId}/review:
 *   patch:
 *     summary: Staff duyet hoac tu choi yeu cau become instructor
 *     tags: [Instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               decision:
 *                 type: string
 *                 enum: [approve, reject]
 *               review_note:
 *                 type: string
 *     responses:
 *       200: { description: OK }
 */
instructorsRouter.patch(
  '/request/:requestId/review',
  requireStaffOrAdmin,
  instructorRequestIdValidator,
  reviewInstructorRequestValidator,
  wrapAsync(reviewInstructorRequestController)
)

/**
 * @openapi
 * /api/instructor/{instructorId}:
 *   put:
 *     summary: Staff/Admin cap nhat thong tin instructor
 *     tags: [Instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string }
 *               phoneNumber: { type: string }
 *               qualifications: { type: array, items: { type: string } }
 *               jobTitle: { type: string }
 *               hireDate: { type: string, format: date-time }
 *               salary: { type: number }
 *               profilePicUrl: { type: string }
 *     responses:
 *       200: { description: OK }
 */
instructorsRouter.put(
  '/:instructorId',
  requireStaffOrAdmin,
  instructorIdValidator,
  updateInstructorValidator,
  wrapAsync(updateInstructorController)
)

/**
 * @openapi
 * /api/instructor/{instructorId}:
 *   delete:
 *     summary: Staff/Admin go instructor va tra role ve user
 *     tags: [Instructor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
instructorsRouter.delete('/:instructorId', requireStaffOrAdmin, instructorIdValidator, wrapAsync(deleteInstructorController))

export default instructorsRouter
