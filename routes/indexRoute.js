const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("/auth/login");
});

router.get("/reminder", ensureAuthenticated, (req, res) => {
  res.render("reminder/index", {
    user: req.user,
  });
});

module.exports = router;
