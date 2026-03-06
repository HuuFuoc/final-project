import { ObjectId } from 'mongodb'
import { ProgramType } from '../../constants/enums'

interface ProgramTypeInput {
  _id?: ObjectId
  name: string
  description?: string
  location?: string
  type?: ProgramType
  startDate?: Date
  endDate?: Date
  programImgUrl?: string
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Program {
  _id?: ObjectId
  name: string
  description: string
  location: string
  type: ProgramType
  startDate: Date
  endDate: Date
  programImgUrl: string
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(program: ProgramTypeInput) {
    const date = new Date()
    this._id = program._id || new ObjectId()
    this.name = program.name
    this.description = program.description || ''
    this.location = program.location || ''
    this.type = program.type ?? ProgramType.Online
    this.startDate = program.startDate || date
    this.endDate = program.endDate || date
    this.programImgUrl = program.programImgUrl || ''
    this.created_at = program.created_at || date
    this.updated_at = program.updated_at || date
    this.isDeleted = program.isDeleted ?? false
  }
}
