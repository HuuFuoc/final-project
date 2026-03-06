import { ObjectId } from 'mongodb'
import { SurveyType } from '../../constants/enums'

interface SurveyTypeInput {
  _id?: ObjectId
  name: string
  description?: string
  type?: SurveyType
  created_at?: Date
  updated_at?: Date
  isDeleted?: boolean
}

export default class Survey {
  _id?: ObjectId
  name: string
  description: string
  type: SurveyType
  created_at: Date
  updated_at: Date
  isDeleted: boolean

  constructor(survey: SurveyTypeInput) {
    const date = new Date()
    this._id = survey._id || new ObjectId()
    this.name = survey.name
    this.description = survey.description || ''
    this.type = survey.type ?? SurveyType.Assessment
    this.created_at = survey.created_at || date
    this.updated_at = survey.updated_at || date
    this.isDeleted = survey.isDeleted ?? false
  }
}
