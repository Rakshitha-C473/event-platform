const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ✅ 1. CREATE EVENT (Organizer)
router.post("/", (req, res) => {
  const { title, category, college, location, event_date, description } = req.body;

  const sql = `
    INSERT INTO events (title, category, college, location, event_date, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, category, college, location, event_date, description],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Event created successfully" });
    });
});


// ✅ 2. GET ALL EVENTS (Student view)
router.get("/", (req, res) => {
  db.query("SELECT * FROM events ORDER BY event_date ASC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});


// ✅ 3. SEARCH EVENTS
router.get("/search", (req, res) => {
  const { college, location, category } = req.query;

  let sql = "SELECT * FROM events WHERE 1=1";
  let params = [];

  if (college) {
    sql += " AND college LIKE ?";
    params.push(`%${college}%`);
  }

  if (location) {
    sql += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

module.exports = router;