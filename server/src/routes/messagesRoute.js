const express = require("express");
const router = express.Router();
const messageController = require("../app/controllers/messageController");
const middlewareController = require("../app/controllers/middlewareController");

//register
router.get(
  "/message/:userId",
  middlewareController.middlewareCORS,
  messageController.getMessage
);
// getAllMessage
router.get(
  "/getAllMessage",
  middlewareController.middlewareCORS,
  messageController.getAllMessage
);

module.exports = router;
