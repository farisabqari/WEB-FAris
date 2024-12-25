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

// Dashboard Page
router.get("/", redirectLogin, (req, res) => {
  const db = req.db;
  const query = "SELECT * FROM orders WHERE user_id = ?";
  db.query(query, [req.session.userId], (err, results) => {
    if (err) throw err;
    res.render("dashboard", { orders: results, body: req.body });
  });
});

module.exports = router;
