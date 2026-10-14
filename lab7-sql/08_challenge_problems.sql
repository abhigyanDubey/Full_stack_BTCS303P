-- =============================================================================
-- Part H: Challenge Problems (Optional)
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- H1. Display a rank list of students by their total marks, with ties handled using RANK() or DENSE_RANK()
SELECT s.name, SUM(e.marks) AS total_marks,
    RANK() OVER (ORDER BY SUM(e.marks) DESC) AS rnk,
    DENSE_RANK() OVER (ORDER BY SUM(e.marks) DESC) AS dense_rnk
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.name;

-- H2. Assign a grade to each enrollment using CASE:
-- 90 and above = A, 75 to 89 = B, 60 to 74 = C, below 60 = D
SELECT student_id, course_id, marks,
    CASE
        WHEN marks >= 90 THEN 'A'
        WHEN marks >= 75 THEN 'B'
        WHEN marks >= 60 THEN 'C'
        ELSE 'D'
    END AS grade
FROM enrollments;

-- H3. Find pairs of students from the same city (self join)
SELECT a.name AS student1, b.name AS student2, a.city
FROM students a
JOIN students b ON a.city = b.city AND a.student_id < b.student_id;
-- Explanation: The inequality condition a.student_id < b.student_id prevents
-- self-pairing and eliminates duplicate symmetric permutations (e.g. A-B vs B-A).

-- H4. Find the second highest marks in the enrollments table without using LIMIT
SELECT MAX(marks) AS second_highest
FROM enrollments
WHERE marks < (SELECT MAX(marks) FROM enrollments);
