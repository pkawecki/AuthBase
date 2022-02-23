const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/no-permission" }),
  (req, res) => {
    // res.send(`I'm back from Google! ${typeof req.session}`);
    res.redirect("/user/logged");
  }
);

module.exports = router;

// app.get("/auth/google/callback", (req, res) => {
//   res.send(`I'm back from Google! ${typeof req.session}`);
// });
