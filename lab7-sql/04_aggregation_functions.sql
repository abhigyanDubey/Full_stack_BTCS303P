-- =============================================================================
-- Part D: Functions and Aggregation
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- D1. Find the total number of students
SELECT COUNT(*) AS total_students FROM students;

-- D2. Find the average, minimum and maximum marks in the enrollments table
SELECT AVG(marks) AS avg_marks, MIN(marks) AS min_marks, MAX(marks) AS max_marks
FROM enrollments;

-- D3. Count the number of students in each city
SELECT city, COUNT(*) AS num_students FROM students GROUP BY city;

-- D4. Find the average marks for each course
SELECT course_id, AVG(marks) AS avg_marks FROM enrollments GROUP BY course_id;

-- D5. Show only those cities that have more than one student (HAVING)
SELECT city, COUNT(*) AS num_students
FROM students
GROUP BY city
HAVING COUNT(*) > 1;

-- D6. Find the total credits offered by each department
SELECT d.dept_name, COALESCE(SUM(c.credits), 0) AS total_credits
FROM departments d
LEFT JOIN courses c ON d.dept_id = c.dept_id
GROUP BY d.dept_id, d.dept_name;

-- D7. Display student names in uppercase and the length of each name (UPPER, LENGTH)
SELECT UPPER(name) AS name_upper, LENGTH(name) AS name_length FROM students;

-- D8. Explain why WHERE cannot be used with aggregate functions, and what HAVING does differently
/*
Explanation:
- The WHERE clause filters individual rows BEFORE any grouping (GROUP BY) takes place.
  Therefore, aggregated values like COUNT(*), SUM(), or AVG() do not exist at that stage.
- The HAVING clause is evaluated AFTER the GROUP BY clause and operates on the aggregated groups.
- SQL Logical Query Execution Order:
  1. FROM & JOINs
  2. WHERE (Row-level filters)
  3. GROUP BY (Grouping)
  4. HAVING (Group-level aggregate filters)
  5. SELECT (Column projections & aliases)
  6. ORDER BY (Sorting)
  7. LIMIT / OFFSET (Pagination)
*/
-- Valid Demonstration:
SELECT city, COUNT(*) AS num_students
FROM students
GROUP BY city
HAVING COUNT(*) > 1;
