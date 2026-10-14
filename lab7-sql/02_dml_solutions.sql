-- =============================================================================
-- Part B: DML (Data Manipulation Language)
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- B1. Insert a new student: (109, 'Neha', 20, 'Roorkee', 1)
INSERT INTO students VALUES (109, 'Neha', 20, 'Roorkee', 1);
SELECT * FROM students WHERE student_id = 109;

-- B2. Insert a student without specifying city and observe the value stored
INSERT INTO students (student_id, name, age, dept_id)
VALUES (110, 'Tara', 21, 1);
SELECT * FROM students WHERE student_id = 110;
-- Explanation: Because city has no DEFAULT value and was omitted, NULL is stored.

-- B3. Update the city of student 105 to 'Roorkee'
UPDATE students SET city = 'Roorkee' WHERE student_id = 105;
SELECT * FROM students WHERE student_id = 105;

-- B4. Increase marks by 5 for all enrollments in course 203
UPDATE enrollments SET marks = marks + 5 WHERE course_id = 203;
SELECT * FROM enrollments WHERE course_id = 203;
-- Explanation: Marks for course 203 updated from 81, 74, 66 to 86, 79, 71.

-- B5. Delete the student with student_id = 109 (and test row 110)
DELETE FROM students WHERE student_id IN (109, 110);
SELECT COUNT(*) AS total_students FROM students;

-- B6. Try inserting a student with age 15. Record error message and explain constraint.
-- Query:
-- INSERT INTO students VALUES (111, 'Test', 15, 'Delhi', 1);
/*
Output Error:
ERROR 4025 (23000): CONSTRAINT `students.age` failed for `college_db`.`students`
Explanation:
The CHECK constraint on the age column (age >= 17) rejected the row because
15 is below 17. The row is rejected and transaction rolls back insertion.
*/
