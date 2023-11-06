const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/authController");
const middlewareController = require("../app/controllers/middlewareController");

//register
router.post(
  "/register",
  middlewareController.middlewareCORS,
  authController.registerUser
);

// signIn
router.post(
  "/signIn",
  middlewareController.middlewareCORS,
  authController.loginUser
);

// logout
router.post(
  "/logout",
  middlewareController.middlewareCORS,
  authController.logoutUser
);
module.exports = router;
