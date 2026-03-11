//file này chứa hàm error handler tổng

import HTTP_STATUS from '../constants/httpStatus'
import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import { ErrorWithStatus } from '../models/Error'
//lỗi từ toàn bộ hệ thống sẽ được dồn về đây
export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  // Log lỗi thật ra console để debug
  console.error('defaultErrorHandler caught:', error)

  if (error instanceof ErrorWithStatus) {
    return res.status(error.status).json(omit(error, ['status']))
  }

  // Serialize an toàn, tránh circular reference
  let errorInfo: Record<string, any> = {}
  try {
    errorInfo = JSON.parse(
      JSON.stringify(error, (key, value) => {
        if (key === 'stack') return undefined
        return value
      })
    )
  } catch {
    // Circular reference hoặc lỗi serialize → bỏ qua
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: error.message || 'Internal Server Error',
    errorInfor: errorInfo
  })
}
