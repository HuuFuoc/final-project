import { ObjectId } from 'mongodb'

interface BlogType {
  _id?: ObjectId
  user_id: ObjectId
  content?: string
  blogImgUrl?: string
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Blog {
  _id?: ObjectId
  user_id: ObjectId
  content: string
  blogImgUrl: string
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(blog: BlogType) {
    const date = new Date()
    this._id = blog._id || new ObjectId()
    this.user_id = blog.user_id
    this.content = blog.content || ''
    this.blogImgUrl = blog.blogImgUrl || ''
    this.created_at = blog.created_at || date
    this.updated_at = blog.updated_at || date
    this.isDeleted = blog.isDeleted ?? false
  }
}
