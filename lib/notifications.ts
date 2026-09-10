import type { Notification, Role } from "./types";

const byRole: Record<Role, Notification[]> = {
  student: [
    { id: "n1", title: "Grade posted", body: "Your Capstone draft for WD-101 was graded: 92%.", when: "2h ago", read: false, icon: "🎓" },
    { id: "n2", title: "Deadline coming up", body: "Problem set 2: Linked lists is due Sep 12.", when: "5h ago", read: false, icon: "⏰" },
    { id: "n3", title: "New lesson video", body: "Dr. Sofia Reyes uploaded a new video for WD-101.", when: "Yesterday", read: true, icon: "🎥" },
    { id: "n4", title: "Payment received", body: "We received your payment for WD-101 — thanks!", when: "3 weeks ago", read: true, icon: "💳" },
  ],
  instructor: [
    { id: "n1", title: "New submission", body: "Maya Chen submitted Capstone: portfolio site for WD-101.", when: "1h ago", read: false, icon: "📤" },
    { id: "n2", title: "Enrollment request", body: "Nora Ali requested enrollment in DS-201.", when: "5h ago", read: false, icon: "🧑‍🎓" },
    { id: "n3", title: "Attendance reminder", body: "You haven't logged attendance for WD-101 this week.", when: "Yesterday", read: true, icon: "✅" },
    { id: "n4", title: "Course published", body: "AI for Educators is still in draft — publish when ready.", when: "3 days ago", read: true, icon: "📚" },
  ],
  admin: [
    { id: "n1", title: "Payment failed", body: "Nora Ali's payment for DS-201 failed to process.", when: "3h ago", read: false, icon: "⚠️" },
    { id: "n2", title: "New user invited", body: "Nora Ali was invited as a student.", when: "6h ago", read: false, icon: "👥" },
    { id: "n3", title: "Weekly report ready", body: "The platform activity report for this week is ready.", when: "Yesterday", read: true, icon: "📈" },
    { id: "n4", title: "Storage usage", body: "Video storage usage is at 62% of the demo plan.", when: "2 days ago", read: true, icon: "🗄️" },
  ],
};

export function notificationsForRole(role: Role): Notification[] {
  return byRole[role];
}
