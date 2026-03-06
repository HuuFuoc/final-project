import { ObjectId } from 'mongodb'
import { RiskLevel } from '../../constants/enums'

interface SurveyResultType {
  _id?: ObjectId
  user_id: ObjectId
  survey_id: ObjectId
  program_id: ObjectId
  totalScore?: number
  riskLevel?: RiskLevel
  completedAt?: Date
  created_at?: Date
  updated_at?: Date
}

export default class SurveyResult {
  _id?: ObjectId
  user_id: ObjectId
  survey_id: ObjectId
  program_id: ObjectId
  totalScore: number
  riskLevel: RiskLevel
  completedAt: Date
  created_at: Date
  updated_at: Date

  constructor(surveyResult: SurveyResultType) {
    const date = new Date()
    this._id = surveyResult._id || new ObjectId()
    this.user_id = surveyResult.user_id
    this.survey_id = surveyResult.survey_id
    this.program_id = surveyResult.program_id
    this.totalScore = surveyResult.totalScore ?? 0
    this.riskLevel = surveyResult.riskLevel ?? RiskLevel.Low
    this.completedAt = surveyResult.completedAt || date
    this.created_at = surveyResult.created_at || date
    this.updated_at = surveyResult.updated_at || date
  }
}
