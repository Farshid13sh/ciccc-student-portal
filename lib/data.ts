import type { AttendanceRecord, Certificate, Deadline, Lesson, PaymentRow, Program, ScheduleItem, UserRow } from "./types";

// Programs are modeled on CICCC (Cornerstone International Community College of Canada,
// ciccc.ca) — 6 program categories, 8 programs. Where a real number was available on
// ciccc.ca/en/tuition-fees it's used directly; everything marked [ESTIMATED] below is a
// plausible stand-in at a comparable scale, not a scraped figure. See README for the list.
export const programs: Program[] = [
  {
    id: "p1", code: "CY-500", title: "Cybersecurity Diploma",
    description: "Network security, threat detection, incident response and ethical hacking, taught through hands-on labs.",
    category: "Technology & AI", durationWeeks: 52, format: "Online",
    instructor: "Dr. Amara Chen", lessons: 9, duration: "52 weeks", rating: 4.8, students: 142,
    status: "published", badge: "Bestseller",
    applicationFee: 150, materialsFee: 500, tuitionDomestic: 15800, tuitionIntl: 17800, depositDue: 2000, // [ESTIMATED]
  },
  {
    id: "p2", code: "AI-100", title: "AI Tools & Technologies Certificate",
    description: "Practical, tool-first introduction to modern AI systems and how to apply them at work.",
    category: "Technology & AI", durationWeeks: 8, format: "Online",
    instructor: "Priya Nair", lessons: 5, duration: "8 weeks", rating: 4.9, students: 210,
    status: "published", badge: "New",
    applicationFee: 0, materialsFee: 0, tuitionDomestic: 999, tuitionIntl: 999, // sourced from ciccc.ca/en/tuition-fees
  },
  {
    id: "p3", code: "BI-150", title: "Business Intelligence & Analytics Basics Certificate",
    description: "Data modeling, dashboards and reporting fundamentals for business decision-making.",
    category: "Technology & AI", durationWeeks: 8, format: "Online",
    instructor: "Marcus Webb", lessons: 6, duration: "8 weeks", rating: 4.7, students: 98,
    status: "published",
    applicationFee: 0, materialsFee: 0, tuitionDomestic: 899, tuitionIntl: 899, // [ESTIMATED]
  },
  {
    id: "p4", code: "IB-400", title: "International Business Management Diploma",
    description: "Global trade, marketing and operations management with a co-op-ready capstone.",
    category: "Business", durationWeeks: 52, format: "In-person",
    instructor: "Jonathan Reyes", lessons: 10, duration: "52 weeks", rating: 4.6, students: 176,
    status: "published", badge: "Popular",
    applicationFee: 150, materialsFee: 450, tuitionDomestic: 16500, tuitionIntl: 18500, depositDue: 2000, // [ESTIMATED]
  },
  {
    id: "p5", code: "HM-600", title: "Hospitality Management Co-op Diploma",
    description: "Hotel & restaurant operations, guest experience and a supervised co-op work term.",
    category: "Hospitality", durationWeeks: 60, format: "Hybrid",
    instructor: "Sofia Marin", lessons: 12, duration: "60 weeks incl. co-op", rating: 4.8, students: 134,
    status: "published", badge: "Co-op",
    applicationFee: 150, materialsFee: 500, tuitionDomestic: 17200, tuitionIntl: 19200, depositDue: 2500, // [ESTIMATED]
  },
  {
    id: "p6", code: "ESL-000", title: "ESL Full Program",
    description: "General English levels from beginner to advanced academic readiness.",
    category: "Language", durationWeeks: 30, format: "In-person",
    instructor: "Grace Thompson", lessons: 8, duration: "30 weeks", rating: 4.7, students: 320,
    status: "published", badge: "Top Rated",
    applicationFee: 150, materialsFee: 200, tuitionDomestic: 9300, tuitionIntl: 9300, // based on ciccc.ca/en/tuition-fees weekly rate
  },
  {
    id: "p7", code: "CP-120", title: "CELPIP Test Preparation",
    description: "Focused prep for the Listening, Reading, Writing and Speaking sections of CELPIP.",
    category: "Test Preparation", durationWeeks: 8, format: "Online",
    instructor: "Grace Thompson", lessons: 6, duration: "8 weeks", rating: 4.9, students: 265,
    status: "published", badge: "Bestseller",
    applicationFee: 0, materialsFee: 0, tuitionDomestic: 1500, tuitionIntl: 1500, // sourced from ciccc.ca/en/tuition-fees
  },
  {
    id: "p8", code: "TESL-200", title: "TESL Certificate",
    description: "Teaching English as a Second Language: methodology, lesson design and a supervised practicum.",
    category: "Education", durationWeeks: 10, format: "Hybrid",
    instructor: "Daniel Osei", lessons: 7, duration: "10 weeks", rating: 4.8, students: 87,
    status: "published",
    applicationFee: 100, materialsFee: 150, tuitionDomestic: 2200, tuitionIntl: 2200, // sourced from ciccc.ca/en/tuition-fees
  },
];

export const enrollments = [
  { courseId: "p1", progress: 67, enrolled: "3 weeks ago" },
  { courseId: "p2", progress: 40, enrolled: "1 week ago" },
];

export const lessons: Lesson[] = [
  // CY-500 Cybersecurity Diploma — Unit 1: Network Security Fundamentals
  { id: "l1", courseId: "p1", unit: "Unit 1 · Network Security Fundamentals", title: "Intro to Network Security", durationMin: 45, order: 1, type: "video" },
  { id: "l2", courseId: "p1", unit: "Unit 1 · Network Security Fundamentals", title: "Firewalls & VPNs", durationMin: 50, order: 2, type: "video" },
  { id: "l3", courseId: "p1", unit: "Unit 1 · Network Security Fundamentals", title: "Lab: Configure a Firewall", durationMin: 60, order: 3, type: "assignment" },
  // Unit 2: Threat Detection & Incident Response
  { id: "l4", courseId: "p1", unit: "Unit 2 · Threat Detection & Incident Response", title: "Threat Detection Basics", durationMin: 40, order: 4, type: "video" },
  { id: "l5", courseId: "p1", unit: "Unit 2 · Threat Detection & Incident Response", title: "Incident Response Planning", durationMin: 55, order: 5, type: "video" },
  { id: "l6", courseId: "p1", unit: "Unit 2 · Threat Detection & Incident Response", title: "Case Study: Write an Incident Report", durationMin: 70, order: 6, type: "assignment" },
  // Unit 3: Ethical Hacking & Penetration Testing
  { id: "l7", courseId: "p1", unit: "Unit 3 · Ethical Hacking & Penetration Testing", title: "Intro to Penetration Testing", durationMin: 48, order: 7, type: "video" },
  { id: "l8", courseId: "p1", unit: "Unit 3 · Ethical Hacking & Penetration Testing", title: "Vulnerability Scanning Tools", durationMin: 42, order: 8, type: "video" },
  { id: "l9", courseId: "p1", unit: "Unit 3 · Ethical Hacking & Penetration Testing", title: "Final Project: Penetration Test Report", durationMin: 120, order: 9, type: "assignment" },

  // AI-100 AI Tools & Technologies Certificate — Unit 1: Foundations of AI Tools
  { id: "l10", courseId: "p2", unit: "Unit 1 · Foundations of AI Tools", title: "Intro to AI Tools & Technologies", durationMin: 35, order: 1, type: "video" },
  { id: "l11", courseId: "p2", unit: "Unit 1 · Foundations of AI Tools", title: "Prompt Engineering Basics", durationMin: 38, order: 2, type: "video" },
  { id: "l12", courseId: "p2", unit: "Unit 1 · Foundations of AI Tools", title: "Hands-on: Build a Prompt Workflow", durationMin: 60, order: 3, type: "assignment" },
  // Unit 2: Applying AI in the Workplace
  { id: "l13", courseId: "p2", unit: "Unit 2 · Applying AI in the Workplace", title: "AI for Business Productivity", durationMin: 40, order: 4, type: "video" },
  { id: "l14", courseId: "p2", unit: "Unit 2 · Applying AI in the Workplace", title: "Capstone: AI Tool Proposal", durationMin: 90, order: 5, type: "assignment" },
];

export const deadlines: Deadline[] = [
  { course: "CY-500", label: "Case Study: Write an Incident Report", due: "Sep 12" },
  { course: "AI-100", label: "Capstone: AI Tool Proposal", due: "Sep 18" },
  { course: "CY-500", label: "Final Project: Penetration Test Report", due: "Sep 26" },
];

export const payments: PaymentRow[] = [
  { id: "p1", student: "Maya Chen", course: "CY-500", amount: 15800, status: "paid", date: "Aug 19, 2026", kind: "tuition" },
  { id: "p2", student: "Maya Chen", course: "AI-100", amount: 999, status: "paid", date: "Sep 2, 2026", kind: "tuition" },
  { id: "p3", student: "Maya Chen", course: "CP-120", amount: 1500, status: "paid", date: "Jul 6, 2026", kind: "tuition" },
  { id: "p4", student: "Leo Park", course: "IB-400", amount: 16500, status: "paid", date: "Aug 26, 2026", kind: "tuition" },
  { id: "p5", student: "Nora Ali", course: "ESL-000", amount: 9300, status: "failed", date: "Sep 5, 2026", kind: "tuition" },
];

export const certificates: Certificate[] = [
  { id: "cert1", student: "Maya Chen", courseId: "p7", issuedDate: "Jul 28, 2026", verificationId: "CICCC-CP120-88213" },
];

export const users: UserRow[] = [
  { id: "a1", name: "Maya Chen", email: "maya@ciccc-demo.ca", role: "student", joined: "Aug 19, 2026", status: "active" },
  { id: "a2", name: "Leo Park", email: "leo@ciccc-demo.ca", role: "student", joined: "Jul 6, 2026", status: "active" },
  { id: "a3", name: "Dr. Amara Chen", email: "amara@ciccc-demo.ca", role: "instructor", joined: "Jun 2, 2026", status: "active" },
  { id: "a4", name: "Admin Torres", email: "admin@ciccc-demo.ca", role: "admin", joined: "Jun 1, 2026", status: "active" },
  { id: "a5", name: "Nora Ali", email: "nora@ciccc-demo.ca", role: "student", joined: "Sep 5, 2026", status: "invited" },
];

export const schedule: ScheduleItem[] = [
  { id: "sc1", course: "CY-500", title: "Live Q&A: Firewalls & VPNs", day: "Mon", start: "10:00 AM", end: "11:00 AM", format: "Live", location: "Zoom" },
  { id: "sc2", course: "AI-100", title: "Office hours", day: "Tue", start: "1:00 PM", end: "2:00 PM", format: "Live", location: "Zoom" },
  { id: "sc3", course: "CY-500", title: "Lesson: Threat Detection Basics", day: "Wed", start: "Anytime", end: "", format: "Self-paced", location: "Online" },
  { id: "sc4", course: "CY-500", title: "Study group: Penetration testing", day: "Thu", start: "4:00 PM", end: "5:00 PM", format: "Live", location: "Zoom" },
  { id: "sc5", course: "AI-100", title: "Capstone check-in", day: "Fri", start: "11:00 AM", end: "11:30 AM", format: "Live", location: "Zoom" },
];

export const attendance: AttendanceRecord[] = [
  { id: "at1", course: "CY-500", student: "Maya Chen", date: "Sep 1, 2026", status: "present" },
  { id: "at2", course: "CY-500", student: "Maya Chen", date: "Sep 3, 2026", status: "present" },
  { id: "at3", course: "CY-500", student: "Maya Chen", date: "Sep 5, 2026", status: "late" },
  { id: "at4", course: "CY-500", student: "Leo Park", date: "Sep 1, 2026", status: "present" },
  { id: "at5", course: "CY-500", student: "Leo Park", date: "Sep 3, 2026", status: "absent" },
  { id: "at6", course: "CY-500", student: "Leo Park", date: "Sep 5, 2026", status: "present" },
  { id: "at7", course: "AI-100", student: "Maya Chen", date: "Sep 2, 2026", status: "present" },
  { id: "at8", course: "AI-100", student: "Maya Chen", date: "Sep 4, 2026", status: "excused" },
  { id: "at9", course: "AI-100", student: "Nora Ali", date: "Sep 2, 2026", status: "present" },
];

export const activity = [
  { who: "Leo Park", what: "completed IB-400 module 4", when: "2h ago" },
  { who: "Nora Ali", what: "requested enrollment in ESL-000", when: "5h ago" },
  { who: "Maya Chen", what: "submitted Case Study draft (CY-500)", when: "Yesterday" },
  { who: "Dr. Amara Chen", what: "published Unit 3 of CY-500", when: "Yesterday" },
];
