import { InstructorRequestStatus } from '~/constants/enums'

export interface BecomeInstructorReqBody {
  fullName?: string
  email?: string
  phoneNumber?: string
  qualifications?: string[]
  jobTitle?: string
  profilePicUrl?: string
  note?: string
}

export interface UpdateInstructorReqBody {
  fullName?: string
  email?: string
  phoneNumber?: string
  qualifications?: string[]
  jobTitle?: string
  hireDate?: string
  salary?: number
  profilePicUrl?: string
}

export interface ReviewInstructorRequestReqBody {
  decision: 'approve' | 'reject'
  review_note?: string
}

export interface GetInstructorRequestsQuery {
  status?: InstructorRequestStatus
}

