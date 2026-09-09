-- Seed data for BrightPath LMS
INSERT INTO users (id, full_name, email, role) VALUES
  ('a1', 'Maya Chen',   'maya@brightpath.dev', 'student'),
  ('a2', 'Leo Park',    'leo@brightpath.dev',  'student'),
  ('a3', 'Dr. Sofia Reyes', 'sofia@brightpath.dev', 'instructor'),
  ('a4', 'Admin Torres', 'admin@brightpath.dev', 'admin');

INSERT INTO courses (id, code, title, description, category, price_cents, instructor_id, status) VALUES
  ('c1', 'WD-101', 'Web Development Fundamentals', 'HTML, CSS and JavaScript from zero to deployed.', 'Development', 14900, 'a3', 'published'),
  ('c2', 'DS-201', 'Data Structures in Python', 'Lists, trees, graphs and the algorithms that use them.', 'Computer Science', 19900, 'a3', 'published'),
  ('c3', 'UX-110', 'UX Design Essentials', 'Research, wireframes, and usability testing.', 'Design', 12900, 'a3', 'published');

INSERT INTO lessons (course_id, title, duration_min, sort_order) VALUES
  ('c1', 'How the web works', 25, 1),
  ('c1', 'HTML structure & semantics', 40, 2),
  ('c1', 'CSS layout with Flexbox & Grid', 55, 3),
  ('c1', 'JavaScript basics', 60, 4),
  ('c1', 'Fetch & APIs', 45, 5),
  ('c1', 'Capstone: build a portfolio site', 90, 6);

INSERT INTO enrollments (student_id, course_id, progress_pct, enrolled_at) VALUES
  ('a1', 'c1', 67, now() - interval '3 weeks'),
  ('a1', 'c2', 12, now() - interval '1 week'),
  ('a2', 'c1', 100, now() - interval '2 months'),
  ('a2', 'c3', 40, now() - interval '2 weeks');

INSERT INTO payments (student_id, course_id, amount_cents, status, paid_at) VALUES
  ('a1', 'c1', 14900, 'paid', now() - interval '3 weeks'),
  ('a1', 'c2', 19900, 'pending', NULL),
  ('a2', 'c1', 14900, 'paid', now() - interval '2 months'),
  ('a2', 'c3', 12900, 'paid', now() - interval '2 weeks');
