# Lab Sheet 5 — Express.js (Practical)

**Student Name:** Abhigyan Dubey  
**Roll No:** 02  
**CU ID:** CU24250059  
**Branch:** B.Tech CSE "B"  
**Course:** Full Stack Web Development (BTCS303P)  

---

## 📌 Objective

Get hands-on with Express.js — routing, middleware, REST APIs, and error handling — by building small, working pieces of code for every core concept.

---

## 📂 Implementation Details

### Part A: Project Setup & Core Configuration
- Initializes Express application with environment configuration loaded via `dotenv`.
- Configures body parsing middlewares: `express.json()` and `express.urlencoded({ extended: true })`.
- Mounts routes and global logger middleware.

### Part B: Basic Routing
- **Task 5 (`GET /about`):** Returns developer identity JSON (`{ name: "Dev Sharma", rollNo: "CU24250269" }`).
- **Task 6 (`GET /courses`):** Returns course list array (`["Full Stack Web Development", "Computer Vision", "Data Analytics"]`).
- **Task 7 (`POST /echo`):** Parses and echoes the incoming JSON request payload.

### Part C: Route Parameters & Query Strings
- **Task 8 (`GET /api/students/:id`):** Extracts dynamic URL parameter `req.params.id` to look up students. Forwards a 404 Error object to next middleware if student is not found.
- **Task 9 (`GET /search`):** Extracts query parameters `req.query.name` and `req.query.age`.
- **Task 10 (`GET /products/:category/:id`):** Multi-segment route parameters returning matched category and product identifier.

### Part D: Middleware
- **Task 11: Global Request Logger:** Intercepts all incoming requests logging HTTP method, path, and ISO timestamp.
- **Task 12-13: Route Protection Middleware (`adminAuth`):** Checks for presence of `x-api-key` header. If absent, terminates request cycle with `403 Forbidden` JSON. Protects `/admin/dashboard`.

### Part E: JSON & Form Parsing
- **Task 14:** Global JSON and URL-encoded body parser integration.
- **Task 15 (`POST /register`):** Handles form submissions returning formatted greeting.
- **Task 16 (`POST /contact`):** Logs contact inquiry payload to console and acknowledges request.

### Part F: Modular Routing (`express.Router()`)
- **Task 17-18 (`/api/students`):** Modular router in `routes/students.js` isolating student resource operations.
- **Task 19 (`/api/books`):** Modular router in `routes/books.js` managing book collection lookups.

### Part G: Building a REST API (CRUD)
- **Task 20 (`/api/tasks`):** Resource router in `routes/resource.js` providing standard REST operations:
  - `GET /api/tasks` — List all tasks
  - `GET /api/tasks/:id` — Retrieve task by identifier
  - `POST /api/tasks` — Create task record (status 201)
  - `PUT /api/tasks/:id` — Update existing task
  - `DELETE /api/tasks/:id` — Remove task record

### Part H: Error Handling
- **Task 22: 404 Route Not Found Handler:** Catches unmatched routes and sends standard `{ error: "Route not found" }` with 404 status.
- **Task 23: Centralized Error Middleware (4 parameters):** Catches uncaught runtime exceptions and forwarded errors, responding with appropriate HTTP status codes and JSON messages.

### Part I: Static Files & Environment Config
- **Task 25:** Serves static web assets from `public/` directory via `express.static()`.
- Reads application port from `.env` (`PORT=4000`).

---

## 🚀 How to Run

```bash
cd lab5-express
npm install
npm run dev
# or
npm start
```
Server runs at `http://localhost:4000`.
