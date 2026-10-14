# Lab Sheet 4 — Node.js Core Modules & Native Server

**Student Name:** Abhigyan Dubey  
**Roll No:** 02  
**CU ID:** CU24250059  
**Branch:** B.Tech CSE "B"  
**Course:** Full Stack Web Development (BTCS303P)  

---

## 📌 Overview

This lab demonstrates foundational Node.js development covering core built-in modules, asynchronous file operations, stream processing, event-driven architecture, custom CommonJS modules, and a pure Node.js HTTP server without external frameworks.

---

## 📂 Tasks & Implementations

### Task 1: Custom Modules (`sum.js`, `even-odd.js`, `app1.js`)
- Exports custom functions using CommonJS `module.exports`.
- Imports and executes them using `require()`.
- **Run:** `node app1.js`

### Task 2: File System Operations (`file-ops.js`)
- Uses `fs.writeFile` to write student metadata.
- Uses `fs.appendFile` to append course details.
- Uses `fs.readFile` with UTF-8 encoding to print contents.
- Uses `fs.rename` to rename `student.txt` to `profile.txt`.
- **Run:** `node file-ops.js`

### Task 3: Directory Operations (`dir-ops.js`)
- Uses `fs.mkdir` with `{ recursive: true }` to create `uploads/`.
- Populates files asynchronously.
- Reads directory contents using `fs.readdir`.
- Deletes `file1.txt` using `fs.unlink`.
- **Run:** `node dir-ops.js`

### Task 4: Path Module Exploration (`path-demo.js`)
- Extracts directory name (`path.dirname`), base file name (`path.basename`), and file extension (`path.extname`).
- Resolves relative path to absolute filesystem path using `path.resolve`.
- **Run:** `node path-demo.js`

### Task 5: OS System Health Report (`sys-report.js`)
- Analyzes operating system architecture, platform, CPU cores, system uptime, and computes total & free memory in Gigabytes.
- **Run:** `node sys-report.js`

### Task 6: Event-Driven Architecture (`order-events.js`)
- Creates an instance of `EventEmitter`.
- Binds listener to `orderPlaced` event with order payload `{ id, item, amount }`.
- Emits multiple order placement events with ₹ currency formatting.
- **Run:** `node order-events.js`

### Task 7 & 8: Pure Node.js HTTP Server (`server.js`)
- Builds an HTTP web server using `http.createServer` and `url.parse`.
- Endpoints:
  - `GET /` — Plaintext welcome message: `"Welcome to the NovaCart Node.js Server"`
  - `GET /students` — Returns JSON list of student records
  - `GET /students/:id` — Dynamic regex matching for student lookup by ID (returns 404 if not found)
  - `GET /search?keyword=...` — Parses query parameters
  - Non-GET methods return `405 Method Not Allowed`
  - Unmatched routes return `404 - Page Not Found`
- **Run:** `node server.js` (Listening on port `3000`)

### Task 9: Stream Processing (`stream-demo.js`)
- Generates 50 lines of data.
- Reads chunks incrementally using `fs.createReadStream`.
- Listens to `data` and `end` stream events to demonstrate low-memory stream processing.
- **Run:** `node stream-demo.js`

### Task 10: Third-Party Package Management (`id-gen.js`)
- Integrates `nanoid` to generate secure, URL-friendly unique IDs.
- **Run:** `node id-gen.js`

### Task 11: Command-Line Interface (`calc-cli.js`)
- Parses command line parameters from `process.argv`.
- Performs arithmetic operations (`+`, `-`, `*`, `/`) with zero-division validation and NaN handling.
- **Run:** `node calc-cli.js 10 5 +`

### Task 12: Environment Configuration (`env-demo.js`)
- Reads configurable port from `process.env.PORT` with fallback to `4000`.
- **Run:** `node env-demo.js`
