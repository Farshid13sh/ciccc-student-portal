# CICCC Student Portal — Demo Project

A frontend-heavy demo of a real online school platform, modeled on **CICCC (Cornerstone
International Community College of Canada)**, [ciccc.ca](https://ciccc.ca/en). Role-scoped auth,
distinct student/instructor/admin portals, a program catalog with real tuition figures, a unit-
based "My Learning" experience (video lessons + assignments), a tuition checkout flow, and a full
relational database schema. Built to demonstrate the skills in the job posting: React/Next.js,
Tailwind, component-based design, responsive UI, accessibility, authentication, APIs/LMS
concepts, and database modeling.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 → **Sign in to the demo** → pick a role → sign in.

No external services or environment variables are required to run it. `SESSION_SECRET` is
optional (see `.env.local.example`); without it, a fixed demo secret is used to sign session
cookies, which is fine for local/demo use only.

## Why CICCC

The job posting is for an online school platform, so this demo is deliberately modeled on a real
school rather than invented "Course A / Course B" placeholder content. **CICCC**
(Cornerstone International Community College of Canada, Vancouver) is a real private college —
[ciccc.ca/en](https://ciccc.ca/en) — and its actual program list and tuition-fees page shaped the
data in `lib/data.ts`:

- **Program catalog** (`/student/courses`) mirrors CICCC's real program structure: diplomas,
  certificates, and language/test-prep programs grouped into 6 categories (Technology & AI,
  Business, Hospitality, Language, Test Preparation, Education) — see [Data sources](#data-sources)
  below for exactly which figures are real vs. illustrative.
- There is **no "buy a course" checkout** like a generic course marketplace — a school doesn't
  sell individual videos. Instead, enrolling opens a **tuition payment flow**
  (`/student/account?tab=billing`) with a real fee structure: application fee, materials fee,
  tuition (domestic/international), and — for longer diploma programs — a deposit due now with
  the balance due before the program start date.

## Information architecture

The student portal follows a simple 4-item nav: **Dashboard · Course Catalog · My Learning ·
Account.**

- **Dashboard** (`/student`) — this week's schedule, upcoming deadlines, and a "continue
  learning" shortcut into whichever program has the most recent progress.
- **Course Catalog** (`/student/courses`) — all 8 programs, searchable and filterable by
  category, each showing its badge, tuition, and an **Enroll Now** (unenrolled) or **Continue
  Learning** (enrolled) call to action.
- **My Learning** (`/student/learn`) — replaces the old separate "course detail" and
  "submissions" pages. Each enrolled program opens a unit-grouped curriculum: video lessons play
  in a dark inline player, assignment lessons open a file-upload + notes form, and both can be
  marked complete. Progress is tracked per lesson and persisted to `localStorage`.
- **Account** (`/student/account`) — three tabs: **Profile & Settings** (edit name/program),
  **Tuition & Payments** (fee breakdown per enrolled program, full billing history, and the
  checkout form for a program you're not yet enrolled in), and **Certificate** (a CICCC-branded
  certificate for each completed program).

Instructor and admin portals reuse the same collapsible-sidebar + top-bar shell and the same
"Account" pattern, restyled to match, but keep their existing distinct pages (Programs, Uploads,
Students, Attendance for instructors; Users, Payments, Reports for admins) — a school's staff
tools don't need the same 4-item simplification as the student catalog.

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
5. **Log out** is in the account menu (top-right avatar) of every dashboard.

### Demo accounts (password: `ciccc123`)

| Role | Email | Extra fields |
|---|---|---|
| Student | maya@ciccc-demo.ca | Student ID `S-100234`, enrolled in Cybersecurity Diploma + AI Tools Certificate |
| Student | leo@ciccc-demo.ca | Student ID `S-100255`, enrolled in International Business Management Diploma |
| Instructor | amara@ciccc-demo.ca | Employee ID `E-500011`, Technology & AI faculty |
| Admin | admin@ciccc-demo.ca | — |

## Data sources

The 8 programs in `lib/data.ts` (and mirrored in `database/seed.sql`) are based on CICCC's real
program list and tuition-fees page. Tuition and fee figures fall into two groups — every program
in the code is commented with which one it is:

**Sourced from ciccc.ca/en/tuition-fees:** AI Tools & Technologies Certificate ($999), CELPIP
Test Preparation ($1,500), TESL Certificate ($2,200), and the ESL Full Program tuition (based on
that page's published weekly rate).

**[ESTIMATED]** — a plausible figure at a comparable scale to similar Canadian private-college
diploma programs, not a number scraped from the site (CICCC's public pages didn't expose a
specific tuition total for these programs at research time): Cybersecurity Diploma, Business
Intelligence & Analytics Basics Certificate, International Business Management Diploma, and
Hospitality Management Co-op Diploma.

Program names, categories, and durations are drawn from CICCC's real program catalog at
[ciccc.ca/en/programs](https://ciccc.ca/en/programs). Everything else — the specific students,
instructors, lesson content, schedule, and payment history — is invented demo data.

## What's included

- **Role-gated auth**: role picker → role-scoped sign-in → bcrypt password checks → signed
  session cookies → middleware route protection, plus sign-up and a mocked Google OAuth entry
  point.
- **Student portal** (`/student`): dashboard, searchable/filterable program catalog, a unit-based
  "My Learning" workspace (video + assignment lessons, progress tracking, file-upload
  submissions), and an Account page with tuition checkout, billing history, and certificates.
- **Instructor portal** (`/instructor`): dashboard, program management with curriculum + roster,
  video uploads, students, attendance, and account settings.
- **Admin portal** (`/admin`): platform KPIs, user table, payments table, reports (revenue by
  program, enrollment by category), and account settings.
- Each role has its own distinct route tree and sidebar — no shared pages between roles.
- Responsive layout with a collapsible sidebar, a persistent top bar (search + notifications +
  account menu), and accessible markup (semantic HTML, aria labels, focus states).
- PostgreSQL schema + seed script in `/database`, including `lesson_videos`,
  `assignment_submissions`, and `certificates` tables mirroring the features above.
- A real REST API layer (`/app/api/*`) — see below.
- A public certificate verification page (`/certificates/verify`) that calls that API with no
  login required.

## API layer

Most pages render server-side by importing straight from `lib/data.ts` — the idiomatic Next.js
App Router pattern, and the fastest path for a page that just needs to render once. But the app
also exposes a handful of genuine REST endpoints under `/app/api`, used by client components that
need to fetch fresh data after the page has already loaded (search-as-you-type, a public lookup
page) rather than everything being baked in at render time:

| Route | Auth | Used by |
|---|---|---|
| `GET /api/programs?q=&category=` | Public | `components/CourseCatalog.tsx` — the catalog's search box and category pills debounce, then fetch this over the network (open devtools → Network tab while typing to see it) instead of filtering an array that was already sent to the client. |
| `GET /api/programs/[id]` | Public | Returns one program plus its curriculum. Not wired into the UI yet — the server-rendered pages already have this via `lib/data.ts` — but available for a future mobile client or partner integration. |
| `GET /api/enrollments` | Session cookie, student role only | Returns the signed-in student's enrolled programs + progress. 401 without a session, 403 for non-student roles. |
| `GET /api/notifications` | Session cookie, any role | Returns that role's notifications. |
| `GET /api/certificates/verify/[verificationId]` | Public, no session | Looks up a certificate by its verification ID. Powers `/certificates/verify`, a page anyone (an employer, another school) can use without an account — a real feature most schools' platforms have. |

Try it with curl once the dev server is running:

```bash
curl "http://localhost:3000/api/programs?category=Technology%20%26%20AI"
curl "http://localhost:3000/api/certificates/verify/CICCC-CP120-88213"
```

The auth-gated routes read the same signed session cookie as every Server Component in the app
(`lib/auth.ts`'s `getSession()`), so there's one auth system, not two.

## Tech

Next.js 14 (App Router) · TypeScript · Tailwind CSS · hand-rolled components ·
`bcryptjs` (password hashing) · `jose` (signed session cookies, Edge-compatible for middleware) ·
PostgreSQL schema

## Demo-scope limitations (by design, not oversights)

- Sign-up accounts live in a server-side in-memory array (`lib/auth-users.ts`) — they reset if
  the dev/prod process restarts. A real deployment would write to the `users` table in
  `/database/schema.sql` instead.
- "Continue with Google" is a styled mock, not real OAuth — no Google account is ever contacted.
- The tuition checkout form is a styled mock — no real payment is processed and no card details
  are stored anywhere.
- Uploaded video/submission files are never actually stored — only the file name and size are
  kept (in `localStorage`), matching the "no backend required" scope of this demo. Swap in real
  object storage (e.g. S3, Supabase Storage) and the `lesson_videos` / `assignment_submissions`
  tables to make this real.
- Lesson completion and assignment submissions are tracked in `localStorage`, keyed per program —
  they reset if you clear site data, and don't sync across devices.

## Possible next steps

- Deploy to Vercel (free) and share the live link
- Wire Supabase/Postgres to replace both the in-memory user store and `lib/data.ts`
- Real file storage for uploads/submissions, backed by the `lesson_videos` and
  `assignment_submissions` tables
- Add Stripe test-mode checkout for tuition payments
