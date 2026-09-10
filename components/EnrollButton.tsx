"use client";

import { useState } from "react";

export default function EnrollButton({ courseTitle }: { courseTitle: string }) {
  const [enrolled, setEnrolled] = useState(false);

  if (enrolled) {
    return (
      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        You're enrolled in {courseTitle}! (demo — refresh resets this)
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEnrolled(true)}
      className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      Enroll in this course
    </button>
  );
}
