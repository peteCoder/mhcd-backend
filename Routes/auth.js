const express = require("express");
const { loginUser, registerUser } = require("../Controllers/auth");

const router = express.Router();
router.post("/register", registerUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  }),
  loginUser
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard", // Redirect on successful authentication
    failureRedirect: "/login", // Redirect to login on failure
    failureFlash: true,
  })
);

module.exports = router;
