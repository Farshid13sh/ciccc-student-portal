-- Seed data for the CICCC Student Portal demo
-- password_hash below is the bcrypt hash of the shared demo password
-- "ciccc123" (see lib/auth-users.ts) — fine to publish since it's a demo.
INSERT INTO users (id, full_name, email, password_hash, role, student_id, program, employee_id, department) VALUES
  ('a1', 'Maya Chen',      'maya@ciccc-demo.ca',  '$2b$10$o1ECNc8UzuigTyGfn0yYN.0FB3y1JtxOmh3azP4BLO9wCRX2dkUfm', 'student', 'S-100234', 'Cybersecurity Diploma', NULL, NULL),
  ('a2', 'Leo Park',       'leo@ciccc-demo.ca',   '$2b$10$o1ECNc8UzuigTyGfn0yYN.0FB3y1JtxOmh3azP4BLO9wCRX2dkUfm', 'student', 'S-100255', 'International Business Management Diploma', NULL, NULL),
  ('a3', 'Dr. Amara Chen', 'amara@ciccc-demo.ca', '$2b$10$o1ECNc8UzuigTyGfn0yYN.0FB3y1JtxOmh3azP4BLO9wCRX2dkUfm', 'instructor', NULL, NULL, 'E-500011', 'Technology & AI'),
  ('a4', 'Admin Torres',   'admin@ciccc-demo.ca', '$2b$10$o1ECNc8UzuigTyGfn0yYN.0FB3y1JtxOmh3azP4BLO9wCRX2dkUfm', 'admin', NULL, NULL, NULL, NULL);

-- Fees marked [ESTIMATED] are a plausible stand-in, not scraped from ciccc.ca — see README.
INSERT INTO programs (id, code, title, description, category, duration_weeks, format, application_fee_cents, materials_fee_cents, tuition_domestic_cents, tuition_intl_cents, deposit_due_cents, instructor_id, status) VALUES
  ('p1', 'CY-500',   'Cybersecurity Diploma', 'Network security, threat detection, incident response and ethical hacking, taught through hands-on labs.', 'Technology & AI', 52, 'Online', 15000, 50000, 1580000, 1780000, 200000, 'a3', 'published'), -- [ESTIMATED]
  ('p2', 'AI-100',   'AI Tools & Technologies Certificate', 'Practical, tool-first introduction to modern AI systems and how to apply them at work.', 'Technology & AI', 8, 'Online', 0, 0, 99900, 99900, NULL, 'a3', 'published'),
  ('p3', 'BI-150',   'Business Intelligence & Analytics Basics Certificate', 'Data modeling, dashboards and reporting fundamentals for business decision-making.', 'Technology & AI', 8, 'Online', 0, 0, 89900, 89900, NULL, 'a3', 'published'), -- [ESTIMATED]
  ('p4', 'IB-400',   'International Business Management Diploma', 'Global trade, marketing and operations management with a co-op-ready capstone.', 'Business', 52, 'In-person', 15000, 45000, 1650000, 1850000, 200000, 'a3', 'published'), -- [ESTIMATED]
  ('p5', 'HM-600',   'Hospitality Management Co-op Diploma', 'Hotel & restaurant operations, guest experience and a supervised co-op work term.', 'Hospitality', 60, 'Hybrid', 15000, 50000, 1720000, 1920000, 250000, 'a3', 'published'), -- [ESTIMATED]
  ('p6', 'ESL-000',  'ESL Full Program', 'General English levels from beginner to advanced academic readiness.', 'Language', 30, 'In-person', 15000, 20000, 930000, 930000, NULL, 'a3', 'published'),
  ('p7', 'CP-120',   'CELPIP Test Preparation', 'Focused prep for the Listening, Reading, Writing and Speaking sections of CELPIP.', 'Test Preparation', 8, 'Online', 0, 0, 150000, 150000, NULL, 'a3', 'published'),
  ('p8', 'TESL-200', 'TESL Certificate', 'Teaching English as a Second Language: methodology, lesson design and a supervised practicum.', 'Education', 10, 'Hybrid', 10000, 15000, 220000, 220000, NULL, 'a3', 'published');

INSERT INTO lessons (program_id, unit, title, lesson_type, duration_min, sort_order) VALUES
  ('p1', 'Unit 1 · Network Security Fundamentals', 'Intro to Network Security', 'video', 45, 1),
  ('p1', 'Unit 1 · Network Security Fundamentals', 'Firewalls & VPNs', 'video', 50, 2),
  ('p1', 'Unit 1 · Network Security Fundamentals', 'Lab: Configure a Firewall', 'assignment', 60, 3),
  ('p1', 'Unit 2 · Threat Detection & Incident Response', 'Threat Detection Basics', 'video', 40, 4),
  ('p1', 'Unit 2 · Threat Detection & Incident Response', 'Incident Response Planning', 'video', 55, 5),
  ('p1', 'Unit 2 · Threat Detection & Incident Response', 'Case Study: Write an Incident Report', 'assignment', 70, 6),
  ('p1', 'Unit 3 · Ethical Hacking & Penetration Testing', 'Intro to Penetration Testing', 'video', 48, 7),
  ('p1', 'Unit 3 · Ethical Hacking & Penetration Testing', 'Vulnerability Scanning Tools', 'video', 42, 8),
  ('p1', 'Unit 3 · Ethical Hacking & Penetration Testing', 'Final Project: Penetration Test Report', 'assignment', 120, 9),
  ('p2', 'Unit 1 · Foundations of AI Tools', 'Intro to AI Tools & Technologies', 'video', 35, 1),
  ('p2', 'Unit 1 · Foundations of AI Tools', 'Prompt Engineering Basics', 'video', 38, 2),
  ('p2', 'Unit 1 · Foundations of AI Tools', 'Hands-on: Build a Prompt Workflow', 'assignment', 60, 3),
  ('p2', 'Unit 2 · Applying AI in the Workplace', 'AI for Business Productivity', 'video', 40, 4),
  ('p2', 'Unit 2 · Applying AI in the Workplace', 'Capstone: AI Tool Proposal', 'assignment', 90, 5);

INSERT INTO enrollments (student_id, program_id, progress_pct, enrolled_at) VALUES
  ('a1', 'p1', 67, now() - interval '3 weeks'),
  ('a1', 'p2', 40, now() - interval '1 week');

INSERT INTO payments (student_id, program_id, kind, amount_cents, status, paid_at) VALUES
  ('a1', 'p1', 'tuition', 1580000, 'paid', now() - interval '3 weeks'),
  ('a1', 'p2', 'tuition', 99900,   'paid', now() - interval '1 week'),
  ('a1', 'p7', 'tuition', 150000,  'paid', now() - interval '2 months'),
  ('a2', 'p4', 'tuition', 1650000, 'paid', now() - interval '1 month');

INSERT INTO certificates (student_id, program_id, verification_id, issued_at) VALUES
  ('a1', 'p7', 'CICCC-CP120-88213', now() - interval '6 weeks');
