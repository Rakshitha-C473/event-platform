const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   1. CREATE EVENT (Organizer)
========================= */
app.post("/api/events", (req, res) => {
  const { title, category, college, location, event_date, description } = req.body;

  const sql = `
    INSERT INTO events (title, category, college, location, event_date, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, category, college, location, event_date, description],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Event stored in MySQL" });
    });
});


/* =========================
   2. GET EVENTS (Student)
========================= */
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events ORDER BY event_date ASC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});


/* =========================
   3. SEARCH EVENTS
========================= */
app.get("/api/events/search", (req, res) => {
  const { college, location, category } = req.query;

  let sql = "SELECT * FROM events WHERE 1=1";
  let values = [];

  if (college) {
    sql += " AND college LIKE ?";
    values.push(`%${college}%`);
  }

  if (location) {
    sql += " AND location LIKE ?";
    values.push(`%${location}%`);
  }

  if (category) {
    sql += " AND category = ?";
    values.push(category);
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));