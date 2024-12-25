const express = require("express");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Login Process
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = req.db;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      req.session.userId = results[0].id;
      res.redirect("/dashboard");
    } else {
      res.render("login", { error: "Username atau password salah." });
    }
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Home Page
router.get("/", (req, res) => {
  res.render("index", { body: "Selamat Datang di Design Order App" });
});

module.exports = router;
