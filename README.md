# BrightPath LMS — Demo Project

A frontend-heavy demo of an online school platform: role-scoped auth, student/instructor/admin
dashboards, course pages, video uploads, project submissions, and a full relational database
schema. Built to demonstrate the skills in the job posting: React/Next.js, Tailwind,
component-based design, responsive UI, accessibility, authentication, and database modeling.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 → **Sign in to the demo** → pick a role → sign in.

No external services or environment variables are required to run it. `SESSION_SECRET` is
optional (see `.env.local.example`); without it, a fixed demo secret is used to sign session
cookies, which is fine for local/demo use only.

## Auth flow

1. **Choose a role** (`/login`) — Student, Instructor, or Admin.
2. **Sign in** (`/login/[role]`) — a real email + password form, checked against bcrypt-hashed
   passwords and scoped to that role: an account is rejected here even if the password is right
   but the account belongs to a different portal. A wrong email/password shows the seeded demo
   account for that role so reviewers aren't stuck.
   - **Continue with Google** opens a mock account-picker modal (clearly labeled "demo only") —
     selecting the account signs you in through the same session logic, just without a password
     step, mimicking how a real OAuth flow would already have verified the identity.
3. **Sign up** (`/signup/[role]`, Student/Instructor only) — collects the info that's actually
   necessary for school auth: a **Student ID** for students, an **Employee ID** + department for
   instructors, alongside name/email/password. Submitting **creates a real working account** for
   the session (bcrypt-hashed, held in memory) — you can immediately sign in with exactly what
   you entered. Admins don't self-serve sign-up; that page explains accounts are provisioned by
   IT, matching how most real school platforms handle admin access.
4. Sessions are signed httpOnly JWT cookies (`jose`, HS256, 1-day expiry). `middleware.ts`
   protects every `/student`, `/instructor`, and `/admin` route: no session → redirected to
   `/login`; wrong-role session → redirected to your own dashboard.
5. **Log out** is in the sidebar of every dashboard.

### Demo accounts (password: `brightpath123`)

| Role | Email | Extra fields |
|---|---|---|
| Student | maya@brightpath.dev | Student ID `S-100234` |
| Student | leo@brightpath.dev | Student ID `S-100255` |
| Instructor | sofia@brightpath.dev | Employee ID `E-500011`, Computer Science & Design |
| Admin | admin@brightpath.dev | — |

## What's included

- **Role-gated auth**: role picker → role-scoped sign-in → bcrypt password checks → signed
  session cookies → middleware route protection, plus sign-up and a mocked Google OAuth entry
  point.
- **Student portal** (`/student`): dashboard, course detail pages, and **Submissions**
  (`/student/submissions`) — submit a project file + notes per course; list persists via
  `localStorage`.
- **Instructor portal** (`/instructor`): dashboard, and **Uploads** (`/instructor/uploads`) —
  attach a video file to a lesson; list persists via `localStorage`.
- **Admin portal** (`/admin`): platform KPIs, user table, payments table, activity feed.
- Each role has its own distinct route tree and sidebar — no shared pages between roles.
- Responsive layout with collapsible sidebar, accessible markup (semantic HTML, aria labels,
  focus states).
- PostgreSQL schema + seed script in `/database`, including `lesson_videos` and
  `project_submissions` tables mirroring the upload/submission features above.

## Tech

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn-style hand-rolled components ·
`bcryptjs` (password hashing) · `jose` (signed session cookies, Edge-compatible for middleware) ·
PostgreSQL schema

## Demo-scope limitations (by design, not oversights)

- Sign-up accounts live in a server-side in-memory array (`lib/auth-users.ts`) — they reset if
  the dev/prod process restarts. A real deployment would write to the `users` table in
  `/database/schema.sql` instead.
- "Continue with Google" is a styled mock, not real OAuth — no Google account is ever contacted.
- Uploaded video/submission files are never actually stored — only the file name and size are
  kept (in `localStorage`), matching the "no backend required" scope of this demo. Swap in real
  object storage (e.g. S3, Supabase Storage) and the `lesson_videos` / `project_submissions`
  tables to make this real.

## Possible next steps

- Deploy to Vercel (free) and share the live link
- Wire Supabase/Postgres to replace both the in-memory user store and `lib/data.ts`
- Real file storage for uploads/submissions, backed by the new `lesson_videos` and
  `project_submissions` tables
- Add Stripe test-mode checkout for one course
