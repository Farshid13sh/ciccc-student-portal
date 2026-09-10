-- CICCC Student Portal — PostgreSQL schema
-- Mirrors the mock data in lib/data.ts. This is illustrative — the app
-- itself runs on an in-memory store (see README) — but it's what a real
-- backend for this app would look like.

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
  program       TEXT,                        -- student only, display name of their primary program
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT student_has_student_id
    CHECK (role <> 'student' OR student_id IS NOT NULL),
  CONSTRAINT instructor_has_employee_id
    CHECK (role <> 'instructor' OR employee_id IS NOT NULL)
);

-- A "program" is a CICCC diploma, certificate or language program
-- (Cybersecurity Diploma, CELPIP Test Preparation, etc.) — see README for
-- which tuition figures are sourced from ciccc.ca vs. illustrative.
CREATE TABLE programs (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code                  TEXT UNIQUE NOT NULL,          -- e.g. 'CY-500'
  title                 TEXT NOT NULL,
  description           TEXT NOT NULL,
  category              TEXT NOT NULL,                 -- Technology & AI | Business | Hospitality | Language | Test Preparation | Education
  duration_weeks        INTEGER NOT NULL,
  format                TEXT NOT NULL,                 -- Online | In-person | Hybrid
  application_fee_cents INTEGER NOT NULL DEFAULT 0,
  materials_fee_cents   INTEGER NOT NULL DEFAULT 0,
  tuition_domestic_cents INTEGER NOT NULL,
  tuition_intl_cents    INTEGER NOT NULL,
  deposit_due_cents     INTEGER,                       -- NULL means paid in full at enrollment
  instructor_id         UUID NOT NULL REFERENCES users(id),
  status                TEXT NOT NULL DEFAULT 'published',  -- draft | published | archived
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE lessons (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id   UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  unit         TEXT NOT NULL,                          -- e.g. 'Unit 1 · Network Security Fundamentals'
  title        TEXT NOT NULL,
  lesson_type  TEXT NOT NULL CHECK (lesson_type IN ('video', 'assignment')),
  duration_min INTEGER NOT NULL DEFAULT 30,
  sort_order   INTEGER NOT NULL
);

CREATE TABLE enrollments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID NOT NULL REFERENCES users(id),
  program_id   UUID NOT NULL REFERENCES programs(id),
  progress_pct SMALLINT NOT NULL DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  enrolled_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, program_id)
);

CREATE TABLE lesson_progress (
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at  TIMESTAMPTZ,
  PRIMARY KEY (enrollment_id, lesson_id)
);

CREATE TABLE attendance (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id   UUID NOT NULL REFERENCES programs(id),
  student_id   UUID NOT NULL REFERENCES users(id),
  session_date DATE NOT NULL,
  status       TEXT NOT NULL CHECK (status IN ('present', 'late', 'absent', 'excused')),
  UNIQUE (program_id, student_id, session_date)
);

CREATE TABLE lesson_videos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID REFERENCES lessons(id) ON DELETE SET NULL,
  program_id    UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  uploaded_by   UUID NOT NULL REFERENCES users(id),  -- must be role = 'instructor'
  title         TEXT NOT NULL,
  storage_url   TEXT NOT NULL,   -- object storage URL in a real deployment
  duration_sec  INTEGER,
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assignment_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID NOT NULL REFERENCES lessons(id),
  student_id    UUID NOT NULL REFERENCES users(id),  -- must be role = 'student'
  file_url      TEXT NOT NULL,   -- object storage URL in a real deployment
  notes         TEXT,
  status        TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'returned')),
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE certificates (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES users(id),
  program_id       UUID NOT NULL REFERENCES programs(id),
  verification_id  TEXT UNIQUE NOT NULL,
  issued_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tuition and fee payments. `kind` distinguishes the application fee,
-- materials fee, tuition deposit and tuition balance so the Tuition &
-- Payments tab can show a real fee breakdown, not just one lump sum.
CREATE TABLE payments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID NOT NULL REFERENCES users(id),
  program_id   UUID NOT NULL REFERENCES programs(id),
  kind         TEXT NOT NULL CHECK (kind IN ('application', 'materials', 'deposit', 'tuition')),
  amount_cents INTEGER NOT NULL,
  status       TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),
  paid_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_lessons_program ON lessons(program_id, sort_order);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_lesson_videos_program ON lesson_videos(program_id);
CREATE INDEX idx_submissions_lesson_student ON assignment_submissions(lesson_id, student_id);
