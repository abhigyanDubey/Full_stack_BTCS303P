-- =============================================================================
-- Part E: Joins
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- E1. Display each student's name along with their department name (INNER JOIN)
SELECT s.name, d.dept_name
FROM students s
INNER JOIN departments d ON s.dept_id = d.dept_id;

-- E2. Display all students, including those without a department (LEFT JOIN)
-- Vikram (student_id 107) shows NULL because no dept_id is assigned to him.
SELECT s.name, d.dept_name
FROM students s
LEFT JOIN departments d ON s.dept_id = d.dept_id;

-- E3. Display all departments, including those with no students (RIGHT JOIN)
-- The Civil department has no students enrolled, so student name is NULL.
SELECT d.dept_name, s.name
FROM students s
RIGHT JOIN departments d ON s.dept_id = d.dept_id;

-- E4. Display student name, course title and marks by joining students, enrollments and courses
SELECT s.name, c.title, e.marks
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;

-- E5. List the names of students enrolled in 'Data Structures'
SELECT s.name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE c.title = 'Data Structures';

-- E6. Find students who are not enrolled in any course (LEFT JOIN with IS NULL)
SELECT s.student_id, s.name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

-- E7. Display the number of students enrolled in each course (include courses with zero enrollments)
-- COUNT(e.student_id) is used rather than COUNT(*) so courses with 0 enrollments evaluate to 0.
SELECT c.title, COUNT(e.student_id) AS num_students
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.title;

-- E8. Display each department with its number of students and its average age
SELECT d.dept_name, COUNT(s.student_id) AS num_students, AVG(s.age) AS avg_age
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name;
