import { ObjectId } from 'mongodb'

interface UserAnswerLogType {
  _id?: ObjectId
  survey_result_id: ObjectId
  question_id: ObjectId
  answer_option_id: ObjectId
  program_id: ObjectId
  answerValue?: string
  score?: number
  created_at?: Date
}

export default class UserAnswerLog {
  _id?: ObjectId
  survey_result_id: ObjectId
  question_id: ObjectId
  answer_option_id: ObjectId
  program_id: ObjectId
  answerValue: string
  score: number
  created_at: Date

  constructor(userAnswerLog: UserAnswerLogType) {
    const date = new Date()
    this._id = userAnswerLog._id || new ObjectId()
    this.survey_result_id = userAnswerLog.survey_result_id
    this.question_id = userAnswerLog.question_id
    this.answer_option_id = userAnswerLog.answer_option_id
    this.program_id = userAnswerLog.program_id
    this.answerValue = userAnswerLog.answerValue || ''
    this.score = userAnswerLog.score ?? 0
    this.created_at = userAnswerLog.created_at || date
  }
}
