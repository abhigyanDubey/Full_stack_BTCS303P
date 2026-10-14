-- =============================================================================
-- Part F: Subqueries
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- F1. Find students whose age is greater than the average age
SELECT * FROM students
WHERE age > (SELECT AVG(age) FROM students);

-- F2. Find the student(s) with the highest marks in any course
SELECT s.name, e.course_id, e.marks
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
WHERE e.marks = (SELECT MAX(marks) FROM enrollments);

-- F3. List courses that have at least one enrollment (IN or EXISTS)
-- Using IN:
SELECT * FROM courses
WHERE course_id IN (SELECT course_id FROM enrollments);

-- Equivalent query using EXISTS:
SELECT * FROM courses c
WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = c.course_id);

-- F4. List students enrolled in more than 2 courses
SELECT name FROM students
WHERE student_id IN (
    SELECT student_id FROM enrollments
    GROUP BY student_id
    HAVING COUNT(*) > 2
);

-- F5. Find the department with the highest number of students
SELECT d.dept_name, COUNT(*) AS num_students
FROM students s
JOIN departments d ON s.dept_id = d.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING COUNT(*) = (
    SELECT MAX(cnt) FROM (
        SELECT COUNT(*) AS cnt FROM students
        WHERE dept_id IS NOT NULL GROUP BY dept_id
    ) t
);

-- F6. For each course, list students who scored above that course's average (correlated subquery)
SELECT c.title, s.name, e.marks
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c ON c.course_id = e.course_id
WHERE e.marks > (
    SELECT AVG(e2.marks) FROM enrollments e2
    WHERE e2.course_id = e.course_id
);
-- Explanation: The inner query references outer row column e.course_id,
-- executing once per candidate row in the outer query.
