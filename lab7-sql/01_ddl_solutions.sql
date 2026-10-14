-- =============================================================================
-- Part A: DDL (Data Definition Language)
-- Student: Abhigyan Dubey | CU24250059
-- =============================================================================

USE college_db;

-- A1. Create a table faculty with columns:
-- faculty_id (primary key), name (not null), email (unique), salary, dept_id (FK to departments)
CREATE TABLE faculty (
    faculty_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
DESCRIBE faculty;

-- A2. Add a new column phone (VARCHAR(15)) to faculty using ALTER TABLE
ALTER TABLE faculty ADD COLUMN phone VARCHAR(15);
DESCRIBE faculty;

-- A3. Rename the column phone to contact_no
ALTER TABLE faculty RENAME COLUMN phone TO contact_no;
-- (Note for MySQL 5.7: ALTER TABLE faculty CHANGE phone contact_no VARCHAR(15);)
DESCRIBE faculty;

-- A4. Drop the column contact_no
ALTER TABLE faculty DROP COLUMN contact_no;
DESCRIBE faculty;

-- A5. Remove the faculty table completely
DROP TABLE faculty;
SHOW TABLES;

/*
Explanation of DROP vs TRUNCATE vs DELETE:
--------------------------------------------------------------------------------
1. DROP:
   - DDL command.
   - Deletes the entire table structure, data, associated indexes, triggers, and constraints.
   - Cannot be rolled back.
2. TRUNCATE:
   - DDL command (implicit commit).
   - Removes all rows from the table while retaining table definition/structure.
   - Resets AUTO_INCREMENT counter and cannot take a WHERE clause.
   - Fast deallocation of data pages.
3. DELETE:
   - DML command.
   - Removes rows one by one based on optional WHERE condition.
   - Can be rolled back inside an active transaction.
   - Table structure and constraints remain intact.
--------------------------------------------------------------------------------
*/
