import express from 'express'
import { wrapAsync } from '../utils/handlers'

const appointmentsRouter = express.Router()

/**
 * @openapi
 * /api/appointments/book:
 *   post:
 *     summary: Đặt lịch hẹn
 *     tags: [Appointment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: string }
 *               consultant_id: { type: string }
 *               scheduledAt: { type: string, format: date-time }
 *               note: { type: string }
 *     responses:
 *       200: { description: OK }
 */
appointmentsRouter.post('/book', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/appointments/assign:
 *   put:
 *     summary: Gán consultant cho appointment
 *     tags: [Appointment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: OK }
 */
appointmentsRouter.put('/assign', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/appointments/status:
 *   put:
 *     summary: Cập nhật trạng thái appointment
 *     tags: [Appointment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId: { type: string }
 *               status: { type: string }
 *     responses:
 *       200: { description: OK }
 */
appointmentsRouter.put('/status', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/appointments/search:
 *   get:
 *     summary: Tìm kiếm appointments
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *       - in: query
 *         name: consultantId
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
appointmentsRouter.get('/search', wrapAsync((req, res) => res.json({ message: 'OK' })))

/**
 * @openapi
 * /api/appointments/cancel/{appointmentId}:
 *   put:
 *     summary: Hủy appointment
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */
appointmentsRouter.put('/cancel/:appointmentId', wrapAsync((req, res) => res.json({ message: 'OK' })))

export default appointmentsRouter
