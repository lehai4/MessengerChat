const authRouter = require("./authRoute");
const messageRouter = require("./messagesRoute");
const userRouter = require("./userRoute");
function route(app) {
  app.use("/v1/auth", authRouter);
  app.use("/v1/messages", messageRouter);
  app.use("/v1/users", userRouter);
}
module.exports = route;
