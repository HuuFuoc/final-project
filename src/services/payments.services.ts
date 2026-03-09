import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Payment from '../models/schemas/Payment.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import { OrderStatus, PaymentMethod, PaymentStatus } from '../constants/enums'
import Enrollment from '../models/schemas/Enrollment.schema'

class PaymentService {
  async createPaymentFromOrder(userId: string, orderId: string, method?: PaymentMethod) {
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(orderId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid userId or orderId'
      })
    }
    const userObjectId = new ObjectId(userId)
    const orderObjectId = new ObjectId(orderId)

    const order = await databaseService.orders.findOne({ _id: orderObjectId })
    if (!order) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Order not found'
      })
    }

    const log = await databaseService.order_logs.findOne({
      order_id: orderObjectId,
      user_id: userObjectId
    })
    if (!log) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.FORBBIDEN,
        message: 'You do not own this order'
      })
    }

    if (order.status === OrderStatus.Paid) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: 'Order has already been paid'
      })
    }

    const payment = new Payment({
      user_id: userObjectId,
      order_id: orderObjectId,
      paymentNo: `PM-${Date.now()}`,
      amount: order.totalAmount,
      paymentMethod: method ?? PaymentMethod.VNPay,
      status: PaymentStatus.Pending
    })

    const result = await databaseService.payments.insertOne(payment)

    // TODO: tích hợp Stripe / VNPay thật: tạo paymentIntent / redirectUrl tại đây

    return databaseService.payments.findOne({ _id: result.insertedId })
  }

  async getPaymentById(paymentId: string) {
    if (!ObjectId.isValid(paymentId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid payment id'
      })
    }
    const payment = await databaseService.payments.findOne({
      _id: new ObjectId(paymentId),
      isDeleted: false
    })
    if (!payment) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Payment not found'
      })
    }
    return payment
  }

  async getPaymentByNo(paymentNo: string) {
    const payment = await databaseService.payments.findOne({
      paymentNo,
      isDeleted: false
    })
    if (!payment) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Payment not found'
      })
    }
    return payment
  }

  async getPaymentHistoryByUser(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }
    const userObjectId = new ObjectId(userId)
    return databaseService.payments
      .find({
        user_id: userObjectId,
        isDeleted: false
      })
      .sort({ created_at: -1 })
      .toArray()
  }

  private async grantOwnership(orderId: ObjectId, paymentId: ObjectId | null) {
    const logs = await databaseService.order_logs.find({ order_id: orderId }).toArray()

    if (!logs.length) return

    const now = new Date()
    const enrollments: Enrollment[] = []

    for (const log of logs) {
      const exists = await databaseService.enrollments.findOne({
        user_id: log.user_id,
        course_id: log.course_id,
        isDeleted: false
      })
      if (exists) continue

      enrollments.push(
        new Enrollment({
          user_id: log.user_id,
          course_id: log.course_id,
          order_id: orderId,
          payment_id: paymentId ?? undefined,
          created_at: now,
          updated_at: now
        })
      )
    }

    if (enrollments.length) {
      await databaseService.enrollments.insertMany(enrollments)
    }
  }

  async updatePaymentStatus(paymentId: string, status: PaymentStatus) {
    const payment = await this.getPaymentById(paymentId)

    if (payment.status === status) {
      return payment
    }

    await databaseService.payments.updateOne({ _id: payment._id }, { $set: { status, updated_at: new Date() } })

    const updated = await this.getPaymentById(paymentId)

    if (updated.order_id && status === PaymentStatus.Completed) {
      await databaseService.orders.updateOne(
        { _id: updated.order_id },
        { $set: { status: OrderStatus.Paid, updated_at: new Date() } }
      )
      await this.grantOwnership(updated.order_id, updated._id!)
    } else if (updated.order_id && status === PaymentStatus.Failed) {
      await databaseService.orders.updateOne(
        { _id: updated.order_id },
        { $set: { status: OrderStatus.Failed, updated_at: new Date() } }
      )
    }

    return updated
  }

  async updatePaymentStatusByPaymentNo(paymentNo: string, status: PaymentStatus) {
    const payment = await this.getPaymentByNo(paymentNo)
    return this.updatePaymentStatus(String(payment._id), status)
  }

  async handleStripeWebhook(event: any) {
    // TODO: verify Stripe signature từ header & STRIPE_WEBHOOK_SECRET
    const eventType = event.type
    const data = event.data?.object

    // Giả sử ta embed paymentId vào metadata
    const paymentId = data?.metadata?.paymentId as string | undefined
    if (!paymentId) {
      // idempotent: nếu không có paymentId thì bỏ qua
      return
    }

    const payment = await this.getPaymentById(paymentId)

    if (eventType === 'payment_intent.succeeded') {
      if (payment.status !== PaymentStatus.Completed) {
        await this.updatePaymentStatus(paymentId, PaymentStatus.Completed)
      }
    } else if (eventType === 'payment_intent.payment_failed') {
      if (payment.status !== PaymentStatus.Failed) {
        await this.updatePaymentStatus(paymentId, PaymentStatus.Failed)
      }
    }
  }
}
const paymentService = new PaymentService()
export default paymentService
