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
