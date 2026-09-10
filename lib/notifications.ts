import type { Notification, Role } from "./types";

const byRole: Record<Role, Notification[]> = {
  student: [
    { id: "n1", title: "Grade posted", body: "Your Case Study submission for CY-500 was graded: 92%.", when: "2h ago", read: false, icon: "🎓" },
    { id: "n2", title: "Deadline coming up", body: "Case Study: Write an Incident Report is due Sep 12.", when: "5h ago", read: false, icon: "⏰" },
    { id: "n3", title: "New lesson video", body: "Dr. Amara Chen uploaded a new video for CY-500.", when: "Yesterday", read: true, icon: "🎥" },
    { id: "n4", title: "Payment received", body: "We received your tuition payment for AI-100 — thanks!", when: "3 weeks ago", read: true, icon: "💳" },
  ],
  instructor: [
    { id: "n1", title: "New submission", body: "Maya Chen submitted the Case Study for CY-500.", when: "1h ago", read: false, icon: "📤" },
    { id: "n2", title: "Enrollment request", body: "Nora Ali requested enrollment in ESL-000.", when: "5h ago", read: false, icon: "🧑‍🎓" },
    { id: "n3", title: "Attendance reminder", body: "You haven't logged attendance for CY-500 this week.", when: "Yesterday", read: true, icon: "✅" },
    { id: "n4", title: "Program update needed", body: "Business Intelligence & Analytics Basics has no badge set yet.", when: "3 days ago", read: true, icon: "📚" },
  ],
  admin: [
    { id: "n1", title: "Payment failed", body: "Nora Ali's payment for ESL-000 failed to process.", when: "3h ago", read: false, icon: "⚠️" },
    { id: "n2", title: "New user invited", body: "Nora Ali was invited as a student.", when: "6h ago", read: false, icon: "👥" },
    { id: "n3", title: "Weekly report ready", body: "The platform activity report for this week is ready.", when: "Yesterday", read: true, icon: "📈" },
    { id: "n4", title: "Storage usage", body: "Video storage usage is at 62% of the demo plan.", when: "2 days ago", read: true, icon: "🗄️" },
  ],
};

export function notificationsForRole(role: Role): Notification[] {
  return byRole[role];
}
