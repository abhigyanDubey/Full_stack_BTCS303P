-- =============================================================================
-- COER UNIVERSITY, ROORKEE - Department of Computer Science & Engineering
-- Full Stack Web Development (BTCS303P) - Labsheet 7: SQL Solutions
-- Name: Abhigyan Dubey | CUID: CU24250059 | Roll No: 02
-- Database: MariaDB 10.11 / MySQL Compatible
-- Full Executable Solution Script: college_db_full.sql
-- =============================================================================

DROP DATABASE IF EXISTS college_db;
CREATE DATABASE college_db;
USE college_db;

-- -----------------------------------------------------------------------------
-- Database Setup: Schema & Seed Data
-- -----------------------------------------------------------------------------

CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 17),
    city VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    credits INT DEFAULT 3,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    marks INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO departments VALUES 
(1, 'CSE'),
(2, 'ECE'),
(3, 'Mechanical'),
(4, 'Civil');

INSERT INTO students VALUES
(101, 'Aarav', 20, 'Roorkee', 1),
(102, 'Diya', 21, 'Dehradun', 1),
(103, 'Kabir', 19, 'Haridwar', 2),
(104, 'Meera', 22, 'Roorkee', 1),
(105, 'Rohan', 20, 'Delhi', 3),
(106, 'Sana', 21, 'Dehradun', 2),
(107, 'Vikram', 23, 'Jaipur', NULL),
(108, 'Isha', 19, 'Roorkee', 2);

INSERT INTO courses VALUES
(201, 'Data Structures', 4, 1),
(202, 'Operating Systems', 4, 1),
(203, 'Digital Electronics', 3, 2),
(204, 'Thermodynamics', 3, 3),
(205, 'Machine Learning', 4, 1);

INSERT INTO enrollments VALUES
(101, 201, 88),
(101, 202, 76),
(101, 205, 91),
(102, 201, 67),
(102, 205, 72),
(103, 203, 81),
(104, 201, 95),
(104, 202, 89),
(105, 204, 58),
(106, 203, 74),
(108, 203, 66);

-- -----------------------------------------------------------------------------
-- Part A: DDL (Data Definition Language)
-- -----------------------------------------------------------------------------
CREATE TABLE faculty (
    faculty_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

ALTER TABLE faculty ADD COLUMN phone VARCHAR(15);
ALTER TABLE faculty RENAME COLUMN phone TO contact_no;
ALTER TABLE faculty DROP COLUMN contact_no;
DROP TABLE faculty;

-- -----------------------------------------------------------------------------
-- Part B: DML (Data Manipulation Language)
-- -----------------------------------------------------------------------------
INSERT INTO students VALUES (109, 'Neha', 20, 'Roorkee', 1);
INSERT INTO students (student_id, name, age, dept_id) VALUES (110, 'Tara', 21, 1);
UPDATE students SET city = 'Roorkee' WHERE student_id = 105;
UPDATE enrollments SET marks = marks + 5 WHERE course_id = 203;
DELETE FROM students WHERE student_id IN (109, 110);

-- -----------------------------------------------------------------------------
-- Part C: Querying with SELECT
-- -----------------------------------------------------------------------------
SELECT * FROM students;
SELECT name, city FROM students;
SELECT * FROM students WHERE city = 'Roorkee';
SELECT * FROM students WHERE age BETWEEN 20 AND 22;
SELECT * FROM students WHERE city IN ('Roorkee', 'Dehradun');
SELECT * FROM students WHERE name LIKE 'A%';
SELECT * FROM students WHERE dept_id IS NULL;
SELECT DISTINCT city FROM students;
SELECT * FROM students ORDER BY age DESC, name ASC;
SELECT * FROM students ORDER BY age DESC LIMIT 3;
SELECT name AS `Student Name`, age AS `Age` FROM students;

-- -----------------------------------------------------------------------------
-- Part D: Functions and Aggregation
-- -----------------------------------------------------------------------------
SELECT COUNT(*) AS total_students FROM students;
SELECT AVG(marks) AS avg_marks, MIN(marks) AS min_marks, MAX(marks) AS max_marks FROM enrollments;
SELECT city, COUNT(*) AS num_students FROM students GROUP BY city;
SELECT course_id, AVG(marks) AS avg_marks FROM enrollments GROUP BY course_id;
SELECT city, COUNT(*) AS num_students FROM students GROUP BY city HAVING COUNT(*) > 1;
SELECT d.dept_name, COALESCE(SUM(c.credits), 0) AS total_credits FROM departments d LEFT JOIN courses c ON d.dept_id = c.dept_id GROUP BY d.dept_id, d.dept_name;
SELECT UPPER(name) AS name_upper, LENGTH(name) AS name_length FROM students;

-- -----------------------------------------------------------------------------
-- Part E: Joins
-- -----------------------------------------------------------------------------
SELECT s.name, d.dept_name FROM students s INNER JOIN departments d ON s.dept_id = d.dept_id;
SELECT s.name, d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id = d.dept_id;
SELECT d.dept_name, s.name FROM students s RIGHT JOIN departments d ON s.dept_id = d.dept_id;
SELECT s.name, c.title, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;
SELECT s.name FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id WHERE c.title = 'Data Structures';
SELECT s.student_id, s.name FROM students s LEFT JOIN enrollments e ON s.student_id = e.student_id WHERE e.student_id IS NULL;
SELECT c.title, COUNT(e.student_id) AS num_students FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id GROUP BY c.course_id, c.title;
SELECT d.dept_name, COUNT(s.student_id) AS num_students, AVG(s.age) AS avg_age FROM departments d LEFT JOIN students s ON d.dept_id = s.dept_id GROUP BY d.dept_id, d.dept_name;

-- -----------------------------------------------------------------------------
-- Part F: Subqueries
-- -----------------------------------------------------------------------------
SELECT * FROM students WHERE age > (SELECT AVG(age) FROM students);
SELECT s.name, e.course_id, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id WHERE e.marks = (SELECT MAX(marks) FROM enrollments);
SELECT * FROM courses WHERE course_id IN (SELECT course_id FROM enrollments);
SELECT name FROM students WHERE student_id IN (SELECT student_id FROM enrollments GROUP BY student_id HAVING COUNT(*) > 2);
SELECT d.dept_name, COUNT(*) AS num_students FROM students s JOIN departments d ON s.dept_id = d.dept_id GROUP BY d.dept_id, d.dept_name HAVING COUNT(*) = (SELECT MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM students WHERE dept_id IS NOT NULL GROUP BY dept_id) t);
SELECT c.title, s.name, e.marks FROM enrollments e JOIN students s ON s.student_id = e.student_id JOIN courses c ON c.course_id = e.course_id WHERE e.marks > (SELECT AVG(e2.marks) FROM enrollments e2 WHERE e2.course_id = e.course_id);

-- -----------------------------------------------------------------------------
-- Part G: Indexes, Views and Transactions
-- -----------------------------------------------------------------------------
CREATE INDEX idx_city ON students(city);
CREATE VIEW student_marks AS SELECT s.name, c.title, e.marks FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN courses c ON e.course_id = c.course_id;
SELECT * FROM student_marks WHERE marks > 80;
DROP VIEW student_marks;
DROP INDEX idx_city ON students;

START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
ROLLBACK;

START TRANSACTION;
UPDATE enrollments SET marks = 100 WHERE student_id = 101 AND course_id = 201;
COMMIT;

-- -----------------------------------------------------------------------------
-- Part H: Challenge Problems
-- -----------------------------------------------------------------------------
SELECT s.name, SUM(e.marks) AS total_marks, RANK() OVER (ORDER BY SUM(e.marks) DESC) AS rnk, DENSE_RANK() OVER (ORDER BY SUM(e.marks) DESC) AS dense_rnk FROM students s JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.student_id, s.name;
SELECT student_id, course_id, marks, CASE WHEN marks >= 90 THEN 'A' WHEN marks >= 75 THEN 'B' WHEN marks >= 60 THEN 'C' ELSE 'D' END AS grade FROM enrollments;
SELECT a.name AS student1, b.name AS student2, a.city FROM students a JOIN students b ON a.city = b.city AND a.student_id < b.student_id;
SELECT MAX(marks) AS second_highest FROM enrollments WHERE marks < (SELECT MAX(marks) FROM enrollments);
