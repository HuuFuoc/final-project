import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Category {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(category: CategoryType) {
    const date = new Date()
    this._id = category._id || new ObjectId()
    this.name = category.name
    this.created_at = category.created_at || date
    this.updated_at = category.updated_at || date
    this.isDeleted = category.isDeleted ?? false
  }
}
