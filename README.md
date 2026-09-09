# BrightPath LMS — Demo Project

A frontend demo of an online school platform: student, instructor, and admin dashboards,
course pages, and a full relational database schema. Built to demonstrate the skills in
the job posting: React/Next.js, Tailwind, component-based design, responsive UI,
accessibility, and database modeling.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 — pick a role on the login screen to enter each dashboard.

No environment variables, no API keys, no database required for the demo UI.
The `database/` folder contains the real PostgreSQL schema + seed data so reviewers
can see the data model.

## What's included

- Landing page + role-picker login (simulates auth, skip real auth per demo scope)
- **Student dashboard**: enrolled courses, progress, continue-learning, deadlines
- **Course detail page**: lesson list with completion states, progress bar
- **Instructor dashboard**: course stats, student enrollment, recent submissions
- **Admin dashboard**: platform KPIs, user table, payments table, activity feed
- Responsive layout with collapsible sidebar, accessible markup (semantic HTML, aria labels, focus states)
- PostgreSQL schema + seed script in `/database`

## Tech

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn-style hand-rolled components · PostgreSQL schema

## Possible next steps

- Deploy to Vercel (free) and share the live link
- Wire Supabase to replace mock data in `lib/data.ts`
- Add Stripe test-mode checkout for one course
