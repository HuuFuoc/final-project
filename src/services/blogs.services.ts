import { ObjectId } from 'mongodb'
import HTTP_STATUS from '../constants/httpStatus'
import { BLOGS_MESSAGES, USERS_MESSAGES } from '../constants/messages'
import { ErrorWithStatus } from '../models/Error'
import Blog from '../models/schemas/Blog.schema'
import databaseService from './database.services'

class BlogService {
  private parseObjectId(id: string, message: string) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message
      })
    }
    return new ObjectId(id)
  }

  async getBlogs() {
    return databaseService.blogs.find({ isDeleted: false }).sort({ created_at: -1 }).toArray()
  }

  async getBlogsByUserId(userId: string) {
    const userObjectId = this.parseObjectId(userId, BLOGS_MESSAGES.INVALID_USER_ID)
    return databaseService.blogs.find({ user_id: userObjectId, isDeleted: false }).sort({ created_at: -1 }).toArray()
  }

  async getBlogById(id: string) {
    const blogId = this.parseObjectId(id, BLOGS_MESSAGES.INVALID_ID)
    const blog = await databaseService.blogs.findOne({
      _id: blogId,
      isDeleted: false
    })
    if (!blog) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: BLOGS_MESSAGES.NOT_FOUND
      })
    }
    return blog
  }

  async createBlog(payload: { user_id: string; title?: string; content: string; blogImgUrl?: string }) {
    const userObjectId = this.parseObjectId(payload.user_id, USERS_MESSAGES.INVALID_USER_ID)

    const user = await databaseService.users.findOne({ _id: userObjectId })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }

    const content = payload.content?.trim()
    if (!content) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: BLOGS_MESSAGES.CONTENT_IS_REQUIRED
      })
    }

    const blog = new Blog({
      user_id: userObjectId,
      title: payload.title?.trim(),
      content,
      blogImgUrl: payload.blogImgUrl?.trim()
    })
    const result = await databaseService.blogs.insertOne(blog)
    return { ...blog, _id: result.insertedId }
  }

  async updateBlog(id: string, payload: { title?: string; content?: string; blogImgUrl?: string }) {
    const blog = await this.getBlogById(id)
    const content = payload.content?.trim()
    if (payload.content !== undefined && !content) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: BLOGS_MESSAGES.CONTENT_IS_REQUIRED
      })
    }

    await databaseService.blogs.updateOne(
      { _id: blog._id },
      {
        $set: {
          ...(payload.title !== undefined ? { title: payload.title.trim() } : {}),
          ...(payload.content !== undefined ? { content } : {}),
          ...(payload.blogImgUrl !== undefined ? { blogImgUrl: payload.blogImgUrl.trim() } : {}),
          updated_at: new Date()
        }
      }
    )

    return this.getBlogById(id)
  }

  async deleteBlog(id: string) {
    const blog = await this.getBlogById(id)
    await databaseService.blogs.updateOne(
      { _id: blog._id },
      {
        $set: {
          isDeleted: true,
          updated_at: new Date()
        }
      }
    )
    return true
  }
}
const blogService = new BlogService()
export default blogService
