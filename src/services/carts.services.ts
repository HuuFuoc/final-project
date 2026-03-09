import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Cart from '../models/schemas/Cart.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'
import courseService from './courses.services'
import { CartStatus, CourseStatus } from '../constants/enums'

class CartService {
  private computeItemAmount(cart: { price?: number; discount?: number }) {
    // TODO: hiện đang hiểu discount là số tiền giảm trực tiếp, không phải %
    const discount = cart.discount ?? 0
    return Math.max(0, (cart.price ?? 0) - discount)
  }

  async addCourseToCart(userId: string, courseId: string) {
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(courseId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid userId or courseId'
      })
    }
    const userObjectId = new ObjectId(userId)
    const courseObjectId = new ObjectId(courseId)

    const course = await databaseService.courses.findOne({
      _id: courseObjectId,
      isDeleted: false,
      status: CourseStatus.Published
    })
    if (!course) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Course not found or not available'
      })
    }

    const alreadyOwned = await courseService.userOwnsCourse(userObjectId, courseObjectId)
    if (alreadyOwned) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: 'You already own this course'
      })
    }

    const existedItem = await databaseService.carts.findOne({
      user_id: userObjectId,
      course_id: courseObjectId,
      status: CartStatus.Pending,
      isDeleted: false
    })
    if (existedItem) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: 'Course is already in your cart'
      })
    }

    const cartItem = new Cart({
      user_id: userObjectId,
      course_id: courseObjectId,
      cartNo: `CART-${userId}-${Date.now()}`,
      status: CartStatus.Pending,
      price: course.price,
      discount: course.discount ?? 0
    })

    const result = await databaseService.carts.insertOne(cartItem)
    return { ...cartItem, _id: result.insertedId }
  }

  async getMyCart(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }
    const userObjectId = new ObjectId(userId)

    const cartItems = await databaseService.carts
      .aggregate([
        {
          $match: {
            user_id: userObjectId,
            status: CartStatus.Pending,
            isDeleted: false
          }
        },
        {
          $lookup: {
            from: process.env.DB_COURSES_COLLECTION as string,
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' }
      ])
      .toArray()

    const items = cartItems.map((item) => ({
      _id: item._id,
      course: item.course,
      price: item.price,
      discount: item.discount ?? 0,
      amount: this.computeItemAmount(item)
    }))

    const totalAmount = items.reduce((sum, i) => sum + i.amount, 0)

    return {
      items,
      totalAmount
    }
  }

  async removeCartItem(userId: string, cartItemId: string) {
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(cartItemId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid id'
      })
    }
    const userObjectId = new ObjectId(userId)
    const cartObjectId = new ObjectId(cartItemId)

    const item = await databaseService.carts.findOne({
      _id: cartObjectId,
      user_id: userObjectId,
      isDeleted: false
    })
    if (!item) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Cart item not found'
      })
    }

    await databaseService.carts.updateOne(
      { _id: item._id },
      { $set: { isDeleted: true, status: CartStatus.Abandoned, updated_at: new Date() } }
    )
    return true
  }

  async clearCart(userId: string) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid user id'
      })
    }
    const userObjectId = new ObjectId(userId)
    await databaseService.carts.updateMany(
      {
        user_id: userObjectId,
        status: CartStatus.Pending,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true,
          status: CartStatus.Abandoned,
          updated_at: new Date()
        }
      }
    )
    return true
  }

  async getPendingItemsForUser(userId: ObjectId) {
    return databaseService.carts
      .find({
        user_id: userId,
        status: CartStatus.Pending,
        isDeleted: false
      })
      .toArray()
  }

  async markItemsCheckedOut(cartIds: ObjectId[]) {
    if (!cartIds.length) return
    await databaseService.carts.updateMany(
      { _id: { $in: cartIds } },
      { $set: { status: CartStatus.CheckedOut, updated_at: new Date() } }
    )
  }
}
const cartService = new CartService()
export default cartService
