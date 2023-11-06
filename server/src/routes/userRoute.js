const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const middlewareController = require("../app/controllers/middlewareController");

// getUserById
router.get(
  "/user/profile/:id",
  middlewareController.middlewareCORS,
  userController.getUserById
);
// getUserByName
router.get(
  "/getUserByName/:name",
  middlewareController.middlewareCORS,
  middlewareController.verifyToken,
  userController.getUserByName
);
// getAllUser
router.get(
  "/getAllUser",
  middlewareController.middlewareCORS,
  middlewareController.verifyToken,
  userController.getAllUser
);
module.exports = router;
