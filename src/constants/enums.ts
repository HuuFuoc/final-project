export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}
export enum USER_ROLE {
  Admin,
  Staff,
  User,
  Instructor
}
export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerificationToken
}

export enum CourseStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived'
}

export enum CourseTargetAudience {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  All = 'all'
}

export enum LessonType {
  Video = 'video',
  Text = 'text',
  Quiz = 'quiz',
  Assignment = 'assignment'
}

export enum CartStatus {
  Pending = 'pending',
  CheckedOut = 'checked_out',
  Abandoned = 'abandoned'
}

export enum ConsultantStatus {
  Active = 'active',
  Inactive = 'inactive',
  OnLeave = 'on_leave'
}

export enum AppointmentStatus {
  Scheduled = 'scheduled',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show'
}

export enum QuestionType {
  MultipleChoice = 'multiple_choice',
  TrueFalse = 'true_false',
  OpenEnded = 'open_ended'
}

export enum RiskLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum SurveyType {
  Assessment = 'assessment',
  Feedback = 'feedback',
  Quiz = 'quiz'
}

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Refunded = 'refunded'
}

export enum ProgramType {
  Online = 'online',
  Offline = 'offline',
  Hybrid = 'hybrid'
}

export enum TransactionStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
  Refunded = 'refunded'
}

export enum TransactionServiceType {
  Course = 'course',
  Program = 'program',
  Consultation = 'consultation'
}

export enum PaymentStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
  Refunded = 'refunded'
}

export enum PaymentMethod {
  VNPay = 'vnpay',
  Momo = 'momo',
  BankTransfer = 'bank_transfer',
  Cash = 'cash'
}
