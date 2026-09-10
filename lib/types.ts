export type Role = "student" | "instructor" | "admin";

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  price: number;          // dollars, for display
  instructor: string;
  lessons: number;
  duration: string;       // "12h 30m"
  rating: number;
  students: number;
  status: "published" | "draft" | "archived";
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  durationMin: number;
  order: number;
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
  course: string;   // course code
  title: string;
  day: string;      // "Mon", "Wed", ...
  start: string;    // "10:00 AM"
  end: string;      // "11:30 AM"
  format: "Live" | "Self-paced";
  location: string; // "Zoom" | "Studio 2" | ...
}

export interface AttendanceRecord {
  id: string;
  course: string;   // course code
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
