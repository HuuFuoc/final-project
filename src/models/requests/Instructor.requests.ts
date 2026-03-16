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
  decision: 'approve' | 'accept' | 'reject' | 'deny' | 'denied'
  review_note?: string
}

export interface GetInstructorRequestsQuery {
  status?: InstructorRequestStatus
}

export type InstructorDashboardRange = '7d' | '30d' | '90d' | 'all'

export interface GetInstructorDashboardSummaryQuery {
  range?: InstructorDashboardRange
}

export interface InstructorDashboardOverview {
  totalCoursesCreated: number
  totalPublishedCourses: number
  totalDraftCourses: number
  totalArchivedCourses: number
  totalPaidOrders: number
  grossRevenue: number
  netRevenue: number
}

export interface InstructorDashboardTopCourse {
  courseId: string
  courseName: string
  totalPaidOrders: number
  grossRevenue: number
  netRevenue: number
}

export interface InstructorDashboardTrendPoint {
  date: string
  totalPaidOrders: number
  grossRevenue: number
  netRevenue: number
}

export interface InstructorDashboardSummaryResponse {
  overview: InstructorDashboardOverview
  topCourses: InstructorDashboardTopCourse[]
  trend: InstructorDashboardTrendPoint[]
}

