const express = require("express");
const router = express.Router();

const students = [
  { id: 1, name: "Dev Sharma", rollNo: "CU24250269" },
  { id: 2, name: "Riya Shukla", rollNo: "CU24250100" }
];

router.get("/", (req, res) => {
  res.json(students);
});

// Task 8: Route parameters
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const student = students.find((item) => String(item.id) === id);
  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    return next(err);
  }
  res.json({ id, message: "Student details" });
});

module.exports = router;
