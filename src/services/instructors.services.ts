import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '../models/Error'
import HTTP_STATUS from '../constants/httpStatus'
import databaseService from './database.services'
import Instructor from '../models/schemas/Instructor.schema'
import InstructorRequest from '../models/schemas/InstructorRequest.schema'
import { InstructorRequestStatus, USER_ROLE } from '../constants/enums'
import {
  BecomeInstructorReqBody,
  GetInstructorRequestsQuery,
  ReviewInstructorRequestReqBody,
  UpdateInstructorReqBody
} from '../models/requests/Instructor.requests'
import { INSTRUCTORS_MESSAGES, USERS_MESSAGES } from '../constants/messages'

class InstructorService {
  private isApprovalDecision(decision: ReviewInstructorRequestReqBody['decision']) {
    return decision === 'approve' || decision === 'accept'
  }

  async listInstructors() {
    return databaseService.instructors.find({}).sort({ created_at: -1 }).toArray()
  }

  async getInstructorById(instructorId: string) {
    if (!ObjectId.isValid(instructorId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: INSTRUCTORS_MESSAGES.INVALID_ID
      })
    }

    const instructor = await databaseService.instructors.findOne({
      _id: new ObjectId(instructorId)
    })

    if (!instructor) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: INSTRUCTORS_MESSAGES.NOT_FOUND
      })
    }

    return instructor
  }

  async requestBecomeInstructor(userId: string, payload: BecomeInstructorReqBody) {
    if (!ObjectId.isValid(userId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USERS_MESSAGES.INVALID_USER_ID
      })
    }

    const userObjectId = new ObjectId(userId)
    const user = await databaseService.users.findOne({ _id: userObjectId })

    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }

    if (user.role === USER_ROLE.Instructor) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: 'You are already an instructor'
      })
    }

    const pendingRequest = await databaseService.instructor_requests.findOne({
      user_id: userObjectId,
      status: InstructorRequestStatus.Pending
    })

    if (pendingRequest) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: INSTRUCTORS_MESSAGES.REQUEST_ALREADY_PENDING
      })
    }

    const instructorRequest = new InstructorRequest({
      user_id: userObjectId,
      fullName: payload.fullName?.trim() || user.name,
      email: payload.email?.trim() || user.email,
      phoneNumber: payload.phoneNumber?.trim(),
      qualifications: payload.qualifications || [],
      jobTitle: payload.jobTitle?.trim(),
      profilePicUrl: payload.profilePicUrl?.trim(),
      note: payload.note?.trim()
    })

    const result = await databaseService.instructor_requests.insertOne(instructorRequest)
    return { ...instructorRequest, _id: result.insertedId }
  }

  async listInstructorRequests(query: GetInstructorRequestsQuery) {
    const filter: { status?: InstructorRequestStatus } = {}

    if (query.status) {
      filter.status = query.status
    }

    return databaseService.instructor_requests.find(filter).sort({ created_at: -1 }).toArray()
  }

  async reviewInstructorRequest(requestId: string, reviewerId: string, payload: ReviewInstructorRequestReqBody) {
    if (!ObjectId.isValid(requestId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: INSTRUCTORS_MESSAGES.INVALID_REQUEST_ID
      })
    }

    if (!ObjectId.isValid(reviewerId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: USERS_MESSAGES.INVALID_USER_ID
      })
    }

    const requestObjectId = new ObjectId(requestId)
    const reviewerObjectId = new ObjectId(reviewerId)

    const instructorRequest = await databaseService.instructor_requests.findOne({ _id: requestObjectId })

    if (!instructorRequest) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: INSTRUCTORS_MESSAGES.REQUEST_NOT_FOUND
      })
    }

    if (instructorRequest.status !== InstructorRequestStatus.Pending) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.CONFLICT,
        message: INSTRUCTORS_MESSAGES.REQUEST_ALREADY_REVIEWED
      })
    }

    const shouldApprove = this.isApprovalDecision(payload.decision)

    if (shouldApprove) {
      await databaseService.users.updateOne(
        { _id: instructorRequest.user_id },
        {
          $set: {
            role: USER_ROLE.Instructor,
            updated_at: new Date()
          }
        }
      )

      const existingInstructor = await databaseService.instructors.findOne({
        user_id: instructorRequest.user_id
      })

      if (existingInstructor) {
        await databaseService.instructors.updateOne(
          { _id: existingInstructor._id },
          {
            $set: {
              fullName: instructorRequest.fullName,
              email: instructorRequest.email,
              phoneNumber: instructorRequest.phoneNumber,
              qualifications: instructorRequest.qualifications,
              jobTitle: instructorRequest.jobTitle,
              profilePicUrl: instructorRequest.profilePicUrl,
              updated_at: new Date()
            }
          }
        )
      } else {
        await databaseService.instructors.insertOne(
          new Instructor({
            user_id: instructorRequest.user_id,
            fullName: instructorRequest.fullName,
            email: instructorRequest.email,
            phoneNumber: instructorRequest.phoneNumber,
            qualifications: instructorRequest.qualifications,
            jobTitle: instructorRequest.jobTitle,
            profilePicUrl: instructorRequest.profilePicUrl
          })
        )
      }
    }

    const nextStatus = shouldApprove ? InstructorRequestStatus.Approved : InstructorRequestStatus.Rejected

    await databaseService.instructor_requests.updateOne(
      { _id: requestObjectId },
      {
        $set: {
          status: nextStatus,
          reviewed_by: reviewerObjectId,
          reviewed_at: new Date(),
          review_note: payload.review_note?.trim() || '',
          updated_at: new Date()
        }
      }
    )

    return databaseService.instructor_requests.findOne({ _id: requestObjectId })
  }

  async updateInstructor(instructorId: string, payload: UpdateInstructorReqBody) {
    const instructor = await this.getInstructorById(instructorId)

    await databaseService.instructors.updateOne(
      { _id: instructor._id },
      {
        $set: {
          ...(payload.fullName !== undefined ? { fullName: payload.fullName.trim() } : {}),
          ...(payload.email !== undefined ? { email: payload.email.trim() } : {}),
          ...(payload.phoneNumber !== undefined ? { phoneNumber: payload.phoneNumber.trim() } : {}),
          ...(payload.qualifications !== undefined ? { qualifications: payload.qualifications } : {}),
          ...(payload.jobTitle !== undefined ? { jobTitle: payload.jobTitle.trim() } : {}),
          ...(payload.hireDate !== undefined ? { hireDate: new Date(payload.hireDate) } : {}),
          ...(payload.salary !== undefined ? { salary: Number(payload.salary) } : {}),
          ...(payload.profilePicUrl !== undefined ? { profilePicUrl: payload.profilePicUrl.trim() } : {}),
          updated_at: new Date()
        }
      }
    )

    return this.getInstructorById(instructorId)
  }

  async deleteInstructor(instructorId: string) {
    const instructor = await this.getInstructorById(instructorId)

    await Promise.all([
      databaseService.instructors.deleteOne({ _id: instructor._id }),
      databaseService.users.updateOne(
        { _id: instructor.user_id },
        {
          $set: {
            role: USER_ROLE.User,
            updated_at: new Date()
          }
        }
      )
    ])

    return true
  }
}

const instructorService = new InstructorService()
export default instructorService

