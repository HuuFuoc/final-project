import { ObjectId } from 'mongodb'

interface AnswerOptionType {
  _id?: ObjectId
  question_id: ObjectId
  optionContent?: string
  score?: number
  positionOrder?: number
  created_at?: Date
  updated_at?: Date
}

export default class AnswerOption {
  _id?: ObjectId
  question_id: ObjectId
  optionContent: string
  score: number
  positionOrder: number
  created_at: Date
  updated_at: Date

  constructor(answerOption: AnswerOptionType) {
    const date = new Date()
    this._id = answerOption._id || new ObjectId()
    this.question_id = answerOption.question_id
    this.optionContent = answerOption.optionContent || ''
    this.score = answerOption.score ?? 0
    this.positionOrder = answerOption.positionOrder ?? 0
    this.created_at = answerOption.created_at || date
    this.updated_at = answerOption.updated_at || date
  }
}
