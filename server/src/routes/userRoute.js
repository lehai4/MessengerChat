const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const middlewareController = require("../app/controllers/middlewareController");

// getAllUser
router.get(
  "/getAllUser",
  middlewareController.middlewareCORS,
  middlewareController.verifyToken,
  userController.getAllUser
);
// getUserById
router.get(
  "/:id",
  middlewareController.middlewareCORS,
  middlewareController.verifyToken,
  userController.getUserById
);
// gerProfile
router.get(
  "/profile/:id",
  middlewareController.middlewareCORS,
  middlewareController.verifyToken,
  userController.getProfileByIdOfMe
);

// getUserByName
router.get(
  "/getUserByName/:name",
  middlewareController.middlewareCORS,
  middlewareController.verifyToken,
  userController.getUserByName
);

module.exports = router;
