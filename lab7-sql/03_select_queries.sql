-- =============================================================================
-- Part C: Querying with SELECT
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- C1. Display all columns of all students
SELECT * FROM students;

-- C2. Display only the name and city of all students
SELECT name, city FROM students;

-- C3. List students from Roorkee
SELECT * FROM students WHERE city = 'Roorkee';

-- C4. List students aged between 20 and 22 (use BETWEEN)
SELECT * FROM students WHERE age BETWEEN 20 AND 22;

-- C5. List students from Roorkee or Dehradun (use IN)
SELECT * FROM students WHERE city IN ('Roorkee', 'Dehradun');

-- C6. List students whose name starts with 'A' (use LIKE)
SELECT * FROM students WHERE name LIKE 'A%';

-- C7. List students who have no department assigned (use IS NULL)
SELECT * FROM students WHERE dept_id IS NULL;

-- C8. Display distinct cities of all students
SELECT DISTINCT city FROM students;

-- C9. Display students sorted by age in descending order, then by name ascending
SELECT * FROM students ORDER BY age DESC, name ASC;

-- C10. Display the top 3 oldest students (LIMIT)
SELECT * FROM students ORDER BY age DESC LIMIT 3;

-- C11. Display name as Student Name and age as Age using aliases
SELECT name AS `Student Name`, age AS `Age` FROM students;
