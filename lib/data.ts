import type { Course, Deadline, Lesson, PaymentRow, UserRow } from "./types";

export const courses: Course[] = [
  { id: "c1", code: "WD-101", title: "Web Development Fundamentals",
    description: "HTML, CSS and JavaScript from zero to deployed.",
    category: "Development", price: 149, instructor: "Dr. Sofia Reyes",
    lessons: 6, duration: "5h 55m", rating: 4.8, students: 214, status: "published" },
  { id: "c2", code: "DS-201", title: "Data Structures in Python",
    description: "Lists, trees, graphs and the algorithms that use them.",
    category: "Computer Science", price: 199, instructor: "Dr. Sofia Reyes",
    lessons: 8, duration: "9h 10m", rating: 4.9, students: 168, status: "published" },
  { id: "c3", code: "UX-110", title: "UX Design Essentials",
    description: "Research, wireframes, and usability testing.",
    category: "Design", price: 129, instructor: "Dr. Sofia Reyes",
    lessons: 5, duration: "6h 20m", rating: 4.7, students: 142, status: "published" },
  { id: "c4", code: "AI-301", title: "AI for Educators",
    description: "Practical AI tools for lesson planning and grading.",
    category: "Education", price: 179, instructor: "Dr. Sofia Reyes",
    lessons: 7, duration: "7h 45m", rating: 4.6, students: 0, status: "draft" },
];

export const enrollments = [
  { courseId: "c1", progress: 67, enrolled: "3 weeks ago" },
  { courseId: "c2", progress: 12, enrolled: "1 week ago" },
];

export const lessons: Lesson[] = [
  { id: "l1", courseId: "c1", title: "How the web works", durationMin: 25, order: 1 },
  { id: "l2", courseId: "c1", title: "HTML structure & semantics", durationMin: 40, order: 2 },
  { id: "l3", courseId: "c1", title: "CSS layout with Flexbox & Grid", durationMin: 55, order: 3 },
  { id: "l4", courseId: "c1", title: "JavaScript basics", durationMin: 60, order: 4 },
  { id: "l5", courseId: "c1", title: "Fetch & APIs", durationMin: 45, order: 5 },
  { id: "l6", courseId: "c1", title: "Capstone: build a portfolio site", durationMin: 90, order: 6 },
];

export const deadlines: Deadline[] = [
  { course: "DS-201", label: "Problem set 2: Linked lists", due: "Sep 12" },
  { course: "WD-101", label: "Capstone: portfolio site", due: "Sep 18" },
  { course: "WD-101", label: "Quiz: CSS layout", due: "Sep 20" },
];

export const payments: PaymentRow[] = [
  { id: "p1", student: "Maya Chen", course: "WD-101", amount: 149, status: "paid", date: "Aug 19, 2026" },
  { id: "p2", student: "Maya Chen", course: "DS-201", amount: 199, status: "pending", date: "Sep 2, 2026" },
  { id: "p3", student: "Leo Park", course: "WD-101", amount: 149, status: "paid", date: "Jul 6, 2026" },
  { id: "p4", student: "Leo Park", course: "UX-110", amount: 129, status: "paid", date: "Aug 26, 2026" },
  { id: "p5", student: "Nora Ali", course: "DS-201", amount: 199, status: "failed", date: "Sep 5, 2026" },
];

export const users: UserRow[] = [
  { id: "a1", name: "Maya Chen", email: "maya@brightpath.dev", role: "student", joined: "Aug 19, 2026", status: "active" },
  { id: "a2", name: "Leo Park", email: "leo@brightpath.dev", role: "student", joined: "Jul 6, 2026", status: "active" },
  { id: "a3", name: "Dr. Sofia Reyes", email: "sofia@brightpath.dev", role: "instructor", joined: "Jun 2, 2026", status: "active" },
  { id: "a4", name: "Admin Torres", email: "admin@brightpath.dev", role: "admin", joined: "Jun 1, 2026", status: "active" },
  { id: "a5", name: "Nora Ali", email: "nora@brightpath.dev", role: "student", joined: "Sep 5, 2026", status: "invited" },
];

export const activity = [
  { who: "Leo Park", what: "completed WD-101", when: "2h ago" },
  { who: "Nora Ali", what: "requested enrollment in DS-201", when: "5h ago" },
  { who: "Maya Chen", what: "submitted Capstone draft", when: "Yesterday" },
  { who: "Dr. Sofia Reyes", what: "published lesson 6 of WD-101", when: "Yesterday" },
];
