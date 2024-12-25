const express = require("express");
const router = express.Router();

// Portfolio Page
router.get("/", (req, res) => {
  res.render("portfolio");
});

module.exports = router;
