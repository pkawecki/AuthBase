const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("noPermission");
  }
});

router.get("/logged", (req, res) => {
  res.render("logged", { userOb: req.user._json });
});

router.get("/profile", (req, res) => {
  if (req.user) {
    res.render("profile", { userOb: req.user._json });
  } else res.redirect("/user/no-permission");
});

router.get("/settings", (req, res) => {
  if (req.user) {
    res.render("settings", { userOb: req.user._json });
  } else res.redirect("/user/no-permission");
});

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

module.exports = router;
