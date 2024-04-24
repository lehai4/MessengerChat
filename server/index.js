const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const route = require("./src/routes");
const db = require("./src/config/db");
const Message = require("./src/app/models/Message");
var path = require("path");
const fs = require("fs");
//Connect db
db.connect();

dotenv.config();
const app = express();
app.use(
  "/v1/uploads",
  express.static(path.resolve(__dirname + "./src/uploads"))
);
const port = `${process.env.PORT}` | 8000;

app.use(
  cors({
    methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
    credentials: true,
    origin: `${process.env.CLIENT_URL}`,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Routes init
route(app);

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});
// run
const server = app.listen(port, () => {
  console.log(`Server run with port http://localhost:${port}`);
});
// socket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let users = [];

const addUser = (userData, socketId) => {
  return (
    !users.some((u) => u._id === userData._id) &&
    users.push({ userData, socketId })
  );
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, sender, text, file } = messageData;

    let filename = null;
    if (file) {
      console.log("size", file.data.length);
      const parts = file.name.split(".");
      const ext = parts[parts.length - 1];
      filename = Date.now() + "." + ext;
      const path = __dirname + "/src/uploads/" + filename;
      const bufferData = new Buffer(file.data.split(",")[1], "base64");
      fs.writeFile(path, bufferData, () => {
        console.log("file saved:" + path);
      });
    }
    if (recipient && (text || file)) {
      await Message.create({
        sender: sender,
        recipient,
        text,
        file: file ? filename : null,
      });
      console.log("created message");
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

module.exports = app;
