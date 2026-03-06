import express from 'express'
import type { ReturnQueryFromVNPay } from 'vnpay'
import { vnpayInstance, getReturnUrl } from '../config/vnpay'
import { wrapAsync } from '../utils/handlers'

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
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - orderId
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Số tiền thanh toán (VND)
 *                 example: 100000
 *               orderId:
 *                 type: string
 *                 description: Mã đơn hàng duy nhất (vnp_TxnRef)
 *                 example: ORDER_001
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
 *                 orderId:
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
  wrapAsync(async (req, res) => {
    const { amount, orderId, orderInfo } = req.body as {
      amount?: number
      orderId?: string
      orderInfo?: string
    }
    if (!amount || amount <= 0 || !orderId) {
      return res.status(400).json({
        message: 'Thiếu amount (VND) hoặc orderId',
        example: { amount: 100000, orderId: 'ORDER_001', orderInfo: 'Thanh toan don hang' }
      })
    }
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1'
    const paymentUrl = vnpayInstance.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: clientIp,
      vnp_ReturnUrl: getReturnUrl(),
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo || `Thanh toan don hang ${orderId}`
    })
    return res.json({ url: paymentUrl, orderId })
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
  wrapAsync((req, res) => {
    const query = req.query as Record<string, string>
    const verify = vnpayInstance.verifyReturnUrl(query as ReturnQueryFromVNPay)
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
  wrapAsync((req, res) => {
    try {
      const result = vnpayInstance.verifyIpnCall((req.query as Record<string, string>) as ReturnQueryFromVNPay)
      if (!result.isVerified) {
        return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' })
      }
      if (result.isSuccess) {
        // TODO: cập nhật đơn hàng trong DB tại đây (orderId = result.vnp_TxnRef)
        return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' })
      }
      return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' })
    } catch {
      return res.status(200).json({ RspCode: '99', Message: 'Unknow error' })
    }
  })
)

export default vnpayRouter
