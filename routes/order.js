const express = require("express");
const router = express.Router();

// Middleware for Authentication
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Order Page
router.get("/", redirectLogin, (req, res) => {
  res.render("order");
});

// Process Order Submission
router.post("/", redirectLogin, (req, res) => {
  const { name, phone, designType, description } = req.body;
  const userId = req.session.userId;
  const db = req.db;

  const query =
    "INSERT INTO orders (user_id, name, phone, design_type, description) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [userId, name, phone, designType, description], (err) => {
    if (err) throw err;
    res.redirect("/dashboard");
  });
});

module.exports = router;
