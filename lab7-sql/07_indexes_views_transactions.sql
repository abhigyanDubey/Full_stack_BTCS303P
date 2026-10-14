-- =============================================================================
-- Part G: Indexes, Views and Transactions
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- G1. Create an index on students(city). Run EXPLAIN and observe performance changes.
EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';

CREATE INDEX idx_city ON students(city);

EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';
/*
Explanation:
Before index creation: access type is ALL (full table scan) and possible_keys is NULL.
After index creation: possible_keys displays `idx_city`, enabling fast B-Tree lookups on large tables.
*/

-- G2. Create a view student_marks that shows student name, course title and marks
CREATE VIEW student_marks AS
SELECT s.name, c.title, e.marks
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;

SELECT * FROM student_marks;

-- G3. Query the view to list students scoring above 80
SELECT * FROM student_marks WHERE marks > 80;

-- G4. Drop the view and the index
DROP VIEW student_marks;
DROP INDEX idx_city ON students;
SHOW INDEX FROM students;

-- G5. Transaction with ROLLBACK
-- Start a transaction, update marks for student 101 in course 201 to 100, then ROLLBACK.
START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
SELECT marks AS inside_transaction FROM enrollments WHERE student_id = 101 AND course_id = 201;
ROLLBACK;
SELECT marks AS after_rollback FROM enrollments WHERE student_id = 101 AND course_id = 201;
-- Explanation: The rollback undoes the change, restoring the original value (88).

-- G6. Transaction with COMMIT
-- Repeat update using COMMIT to ensure changes are persistently flushed to disk.
START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
COMMIT;
SELECT marks AS after_commit FROM enrollments WHERE student_id = 101 AND course_id = 201;
-- Explanation: COMMIT makes the transaction permanent across all subsequent sessions.
