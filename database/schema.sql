-- BrightPath LMS — PostgreSQL schema
-- Mirrors the mock data in lib/data.ts

CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,               -- bcrypt; never selected into API responses
  role          user_role NOT NULL DEFAULT 'student',
  avatar_url    TEXT,
  student_id    TEXT UNIQUE,                 -- required when role = 'student'
  employee_id   TEXT UNIQUE,                 -- required when role = 'instructor'
  department    TEXT,                        -- instructor only
  program       TEXT,                        -- student only
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT student_has_student_id
    CHECK (role <> 'student' OR student_id IS NOT NULL),
  CONSTRAINT instructor_has_employee_id
    CHECK (role <> 'instructor' OR employee_id IS NOT NULL)
);

CREATE TABLE courses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code          TEXT UNIQUE NOT NULL,          -- e.g. 'WD-101'
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  category      TEXT NOT NULL,
  price_cents   INTEGER NOT NULL DEFAULT 0,
  instructor_id UUID NOT NULL REFERENCES users(id),
  status        TEXT NOT NULL DEFAULT 'published',  -- draft | published | archived
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE lessons (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  duration_min INTEGER NOT NULL DEFAULT 30,
  sort_order  INTEGER NOT NULL,
  is_preview  BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE enrollments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES users(id),
  course_id   UUID NOT NULL REFERENCES courses(id),
  progress_pct SMALLINT NOT NULL DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, course_id)
);

CREATE TABLE lesson_progress (
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at  TIMESTAMPTZ,
  PRIMARY KEY (enrollment_id, lesson_id)
);

CREATE TABLE attendance (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   UUID NOT NULL REFERENCES courses(id),
  student_id  UUID NOT NULL REFERENCES users(id),
  session_date DATE NOT NULL,
  status      TEXT NOT NULL CHECK (status IN ('present', 'late', 'absent', 'excused')),
  UNIQUE (course_id, student_id, session_date)
);

CREATE TABLE lesson_videos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID REFERENCES lessons(id) ON DELETE SET NULL,
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  uploaded_by   UUID NOT NULL REFERENCES users(id),  -- must be role = 'instructor'
  title         TEXT NOT NULL,
  storage_url   TEXT NOT NULL,   -- object storage URL in a real deployment
  duration_sec  INTEGER,
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE project_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID NOT NULL REFERENCES courses(id),
  student_id    UUID NOT NULL REFERENCES users(id),  -- must be role = 'student'
  title         TEXT NOT NULL,
  file_url      TEXT NOT NULL,   -- object storage URL in a real deployment
  notes         TEXT,
  status        TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'returned')),
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE payments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID NOT NULL REFERENCES users(id),
  course_id    UUID NOT NULL REFERENCES courses(id),
  amount_cents INTEGER NOT NULL,
  status       TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),
  paid_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_lessons_course ON lessons(course_id, sort_order);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_lesson_videos_course ON lesson_videos(course_id);
CREATE INDEX idx_submissions_course_student ON project_submissions(course_id, student_id);
