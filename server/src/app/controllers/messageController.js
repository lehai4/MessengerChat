const Message = require("../models/Message");
const middlewareController = require("./middlewareController");

const messageController = {
  getMessage: async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = await middlewareController.getUserDataFromRequest(
        req.headers
      );
      const ourUserId = userData?.id;

      const messages = await Message.find({
        sender: { $in: [userId, ourUserId] },
        recipient: { $in: [userId, ourUserId] },
      }).sort({ createdAt: 1 });

      res.status(200).json(messages);
    } catch (e) {
      res.status(404).json("There aren't any messages !");
    }
  },
  // getAllMessage
  getAllMessage: async (req, res) => {
    try {
      const AllMessage = await Message.find();
      if (AllMessage) {
        res.status(200).json(AllMessage);
      }
    } catch (e) {
      res
        .status(404)
        .json(`There aren't any messages collection with UserID:${userId}!`);
    }
  },
};
module.exports = messageController;
