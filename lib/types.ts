export type Role = "student" | "instructor" | "admin";

export type ProgramFormat = "Online" | "In-person" | "Hybrid";
export type ProgramBadge = "Bestseller" | "New" | "Top Rated" | "Popular" | "Co-op";

export interface Program {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  durationWeeks: number;
  format: ProgramFormat;
  instructor: string;
  lessons: number;
  duration: string;       // display string, e.g. "48 weeks"
  rating: number;
  students: number;
  status: "published" | "draft" | "archived";
  badge?: ProgramBadge;
  // Fees modeled on ciccc.ca/en/tuition-fees (see README for what's sourced vs illustrative)
  applicationFee: number;
  materialsFee: number;
  tuitionDomestic: number;
  tuitionIntl: number;
  depositDue?: number; // due at enrollment; remainder due before start
}

export interface Lesson {
  id: string;
  courseId: string; // Program id
  unit: string;
  title: string;
  durationMin: number;
  order: number;
  type: "video" | "assignment";
}

export interface Deadline {
  course: string;
  label: string;
  due: string;
}

export interface PaymentRow {
  id: string;
  student: string;
  course: string;
  amount: number;
  status: "paid" | "pending" | "refunded" | "failed";
  date: string;
  kind: "application" | "materials" | "tuition" | "deposit";
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  joined: string;
  status: "active" | "invited";
}

export interface ScheduleItem {
  id: string;
  course: string;   // program code
  title: string;
  day: string;      // "Mon", "Wed", ...
  start: string;    // "10:00 AM"
  end: string;      // "11:30 AM"
  format: "Live" | "Self-paced";
  location: string; // "Zoom" | "Studio 2" | ...
}

export interface AttendanceRecord {
  id: string;
  course: string;   // program code
  student: string;
  date: string;
  status: "present" | "late" | "absent" | "excused";
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  when: string;
  read: boolean;
  icon: string;
}

export interface Certificate {
  id: string;
  student: string;
  courseId: string;
  issuedDate: string;
  verificationId: string;
}
