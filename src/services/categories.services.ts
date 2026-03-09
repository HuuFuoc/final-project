import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Category from '../models/schemas/Category.schema'
import HTTP_STATUS from '../constants/httpStatus'
import { ErrorWithStatus } from '../models/Error'

class CategoryService {
  async listCategories() {
    return databaseService.categories
      .find({ isDeleted: false })
      .sort({ created_at: -1 })
      .toArray()
  }

  async getCategoryById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid category id'
      })
    }
    const category = await databaseService.categories.findOne({
      _id: new ObjectId(id),
      isDeleted: false
    })
    if (!category) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Category not found'
      })
    }
    return category
  }

  async createCategory(payload: { name: string }) {
    const { name } = payload
    if (!name || !name.trim()) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Category name is required'
      })
    }
    const existed = await databaseService.categories.findOne({
      name: name.trim(),
      isDeleted: false
    })
    if (existed) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: 'Category name already exists'
      })
    }
    const category = new Category({ name: name.trim() })
    const result = await databaseService.categories.insertOne(category)
    return { ...category, _id: result.insertedId }
  }

  async updateCategory(id: string, payload: { name?: string }) {
    const category = await this.getCategoryById(id)
    const name = payload.name?.trim()
    if (name && name !== category.name) {
      const existed = await databaseService.categories.findOne({
        _id: { $ne: category._id },
        name,
        isDeleted: false
      })
      if (existed) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.BAD_REQUEST,
          message: 'Category name already exists'
        })
      }
    }
    await databaseService.categories.updateOne(
      { _id: category._id },
      {
        $set: {
          ...(name ? { name } : {}),
          updated_at: new Date()
        }
      }
    )
    return this.getCategoryById(id)
  }

  async deleteCategory(id: string) {
    const category = await this.getCategoryById(id)
    await databaseService.categories.updateOne(
      { _id: category._id },
      { $set: { isDeleted: true, updated_at: new Date() } }
    )
    return true
  }
}
const categoryService = new CategoryService()
export default categoryService
