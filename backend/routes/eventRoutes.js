const express = require("express");
const router = express.Router();
const db = require("../config/db");


// GET all events
router.get("/", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD event
router.post("/", (req, res) => {
  const { title, category, college, location, event_date, description, embedding } = req.body;

  const sql = `
    INSERT INTO events (title, category, college, location, event_date, description, embedding)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, category, college, location, event_date, description, JSON.stringify(embedding)],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Event added" });
    }
  );
});

// SEARCH
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