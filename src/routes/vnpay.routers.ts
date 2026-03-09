import express from 'express'
import type { ReturnQueryFromVNPay } from 'vnpay'
import { vnpayInstance, getReturnUrl } from '../config/vnpay'
import { wrapAsync } from '../utils/handlers'
import paymentService from '../services/payments.services'
import { PaymentStatus } from '../constants/enums'
import { getAccessTokenPayload } from '../utils/jwt'
import { requireUser } from '../middlewares/users.middlewares'

const vnpayRouter = express.Router()

/**
 * @openapi
 * /api/vnpay/create-payment-url:
 *   post:
 *     summary: Tạo URL thanh toán VNPay (Sandbox)
 *     description: |
 *       Tạo link chuyển hướng sang cổng thanh toán VNPay.
 *       Dùng URL trả về để redirect khách hàng đến trang thanh toán.
 *       Môi trường Sandbox - thẻ test NCB 9704198526191432198, OTP 123456.
 *     tags:
 *       - VNPay
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *             properties:
 *               paymentId:
 *                 type: string
 *                 description: ID payment đã tạo từ API createPaymentFromOrder
 *                 example: 69aede540ebe9343b15d4f20
 *               orderInfo:
 *                 type: string
 *                 description: Nội dung thanh toán (không dấu, không ký tự đặc biệt)
 *                 example: Thanh toan don hang test
 *     responses:
 *       200:
 *         description: Thành công - trả về URL thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL redirect sang VNPay
 *                 paymentId:
 *                   type: string
 *                 paymentNo:
 *                   type: string
 *       400:
 *         description: Thiếu amount hoặc orderId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 example:
 *                   type: object
 */
vnpayRouter.post(
  '/create-payment-url',
  requireUser,
  wrapAsync(async (req, res) => {
    const { user_id } = getAccessTokenPayload(req)
    const { paymentId, orderInfo } = req.body as {
      paymentId?: string
      orderInfo?: string
    }
    if (!paymentId) {
      return res.status(400).json({
        message: 'Thiếu paymentId',
        example: { paymentId: '69aede540ebe9343b15d4f20', orderInfo: 'Thanh toan don hang' }
      })
    }

    const payment = await paymentService.getPaymentById(paymentId)
    if (!payment._id || !payment.user_id || String(payment.user_id) !== user_id) {
      return res.status(403).json({ message: 'Bạn không có quyền thanh toán giao dịch này' })
    }
    if (payment.status !== PaymentStatus.Pending) {
      return res.status(409).json({
        message: 'Payment không ở trạng thái pending',
        data: { paymentId, currentStatus: payment.status }
      })
    }

    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1'
    const paymentUrl = vnpayInstance.buildPaymentUrl({
      vnp_Amount: payment.amount,
      vnp_IpAddr: clientIp,
      vnp_ReturnUrl: getReturnUrl(),
      vnp_TxnRef: payment.paymentNo,
      vnp_OrderInfo: orderInfo || `Thanh toan don hang ${payment.paymentNo}`
    })
    return res.json({
      url: paymentUrl,
      paymentId: String(payment._id),
      paymentNo: payment.paymentNo
    })
  })
)

/**
 * @openapi
 * /api/vnpay/return:
 *   get:
 *     summary: Return URL - Kết quả thanh toán (redirect từ VNPay)
 *     description: |
 *       VNPay chuyển hướng khách hàng về URL này sau khi thanh toán.
 *       Chỉ hiển thị trang HTML kết quả, không dùng để gọi trực tiếp từ Swagger.
 *       Test bằng cách thanh toán xong trên VNPay Sandbox sẽ tự redirect về đây.
 *     tags:
 *       - VNPay
 *     security: []
 *     parameters:
 *       - in: query
 *         name: vnp_TxnRef
 *         schema:
 *           type: string
 *         description: Mã đơn hàng
 *       - in: query
 *         name: vnp_Amount
 *         schema:
 *           type: string
 *         description: Số tiền (đã x100)
 *       - in: query
 *         name: vnp_ResponseCode
 *         schema:
 *           type: string
 *         description: 00 = thành công
 *       - in: query
 *         name: vnp_SecureHash
 *         schema:
 *           type: string
 *         description: Checksum từ VNPay
 *     responses:
 *       200:
 *         description: Trang HTML hiển thị kết quả thanh toán
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
vnpayRouter.get(
  '/return',
  wrapAsync(async (req, res) => {
    const query = req.query as Record<string, string>
    const verify = vnpayInstance.verifyReturnUrl(query as ReturnQueryFromVNPay)

    const paymentNo = query.vnp_TxnRef
    if (paymentNo && verify.isVerified) {
      if (verify.isSuccess) {
        await paymentService.updatePaymentStatusByPaymentNo(paymentNo, PaymentStatus.Completed)
      } else {
        await paymentService.updatePaymentStatusByPaymentNo(paymentNo, PaymentStatus.Failed)
      }
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8"><title>Kết quả thanh toán VNPay</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>${verify.isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</h1>
          <p>${verify.message}</p>
          ${query.vnp_TxnRef ? `<p>Mã đơn hàng: <strong>${query.vnp_TxnRef}</strong></p>` : ''}
          ${query.vnp_Amount ? `<p>Số tiền: <strong>${Number(query.vnp_Amount) / 100} VND</strong></p>` : ''}
        </body>
      </html>
    `
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(html)
  })
)

/**
 * @openapi
 * /api/vnpay/ipn:
 *   get:
 *     summary: IPN URL - Nhận thông báo từ VNPay (server-to-server)
 *     description: |
 *       VNPay gọi GET đến URL này để cập nhật trạng thái giao dịch.
 *       Merchant cần đăng ký URL IPN với VNPAY (cần HTTPS khi deploy).
 *       Trả về JSON { RspCode, Message }. RspCode 00/02 = đã xử lý, 97 = sai chữ ký, 99 = lỗi.
 *       Không dùng Swagger để test IPN - VNPay mới gọi được.
 *     tags:
 *       - VNPay
 *     security: []
 *     parameters:
 *       - in: query
 *         name: vnp_TxnRef
 *         schema:
 *           type: string
 *       - in: query
 *         name: vnp_Amount
 *         schema:
 *           type: string
 *       - in: query
 *         name: vnp_ResponseCode
 *         schema:
 *           type: string
 *       - in: query
 *         name: vnp_SecureHash
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Phản hồi cho VNPay (RspCode 00 = Confirm Success)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 RspCode:
 *                   type: string
 *                   example: "00"
 *                 Message:
 *                   type: string
 *                   example: Confirm Success
 */
vnpayRouter.get(
  '/ipn',
  wrapAsync(async (req, res) => {
    try {
      const query = req.query as Record<string, string>
      const result = vnpayInstance.verifyIpnCall(query as ReturnQueryFromVNPay)
      const paymentNo = String(query.vnp_TxnRef || '')

      if (!result.isVerified) {
        return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' })
      }

      if (!paymentNo) {
        return res.status(200).json({ RspCode: '99', Message: 'Missing vnp_TxnRef' })
      }

      if (result.isSuccess) {
        await paymentService.updatePaymentStatusByPaymentNo(paymentNo, PaymentStatus.Completed)
        return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' })
      }

      await paymentService.updatePaymentStatusByPaymentNo(paymentNo, PaymentStatus.Failed)
      return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' })
    } catch {
      return res.status(200).json({ RspCode: '99', Message: 'Unknow error' })
    }
  })
)

export default vnpayRouter
