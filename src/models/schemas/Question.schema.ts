import { ObjectId } from 'mongodb'
import { QuestionType } from '../../constants/enums'

interface QuestionTypeInput {
  _id?: ObjectId
  survey_id: ObjectId
  questionContent: string
  questionType?: QuestionType
  positionOrder?: number
  created_at?: Date
  updated_at?: Date
}

export default class Question {
  _id?: ObjectId
  survey_id: ObjectId
  questionContent: string
  questionType: QuestionType
  positionOrder: number
  created_at: Date
  updated_at: Date

  constructor(question: QuestionTypeInput) {
    const date = new Date()
    this._id = question._id || new ObjectId()
    this.survey_id = question.survey_id
    this.questionContent = question.questionContent || ''
    this.questionType = question.questionType ?? QuestionType.MultipleChoice
    this.positionOrder = question.positionOrder ?? 0
    this.created_at = question.created_at || date
    this.updated_at = question.updated_at || date
  }
}
