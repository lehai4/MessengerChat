const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const route = require("./src/routes");
const db = require("./src/config/db");
const jwt = require("jsonwebtoken");
const Message = require("./src/app/models/Message");
const ws = require("ws");
const fs = require("fs");
//Connect db
db.connect();

dotenv.config();
const app = express();
app.use("/v1/uploads", express.static(__dirname + "/src/uploads"));
const port = `${process.env.PORT}` | 8000;

app.use(
  cors({
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

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  function notifyAboutOnlinePeople() {
    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((c) => ({
            _id: c._id,
            name: c.name,
            avatar: c.avatar,
            active: c.active,
            phone: c.phone,
          })),
        })
      );
    });
  }
  connection.isAlive = true;

  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeople();
      console.log("dead");
    }, 1000);
  }, 5000);

  connection.on("pong", () => {
    clearTimeout(connection.deathTimer);
  });

  // read data form the cookie for this connection
  const cookies = req.headers.cookie;
  // console.log("REQUEST", req);
  if (cookies) {
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));
    if (tokenCookieString) {
      const token = tokenCookieString.split("=")[1];
      if (token) {
        jwt.verify(
          token,
          `${process.env.JWT_ACCESS_KEY}`,
          {},
          (err, userData) => {
            if (err) throw err;
            const { _id, name, avatar, phone } = userData;
            // console.log(userData);
            connection._id = _id;
            connection.name = name;
            connection.avatar = avatar;
            connection.active = true;
            connection.phone = phone;
          }
        );
      }
    }
  }
  // send messages
  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, text, file } = messageData;
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
      const messageDoc = await Message.create({
        sender: connection._id,
        recipient,
        text,
        file: file ? filename : null,
      });
      console.log("created message");

      [...wss.clients]
        .filter((c) => c._id === recipient)
        .forEach((c) =>
          c.send(
            JSON.stringify({
              text,
              sender: connection._id,
              recipient,
              file: file ? filename : null,
              _id: messageDoc._id,
            })
          )
        );
    }
  });
  // notify everyone about online people
  notifyAboutOnlinePeople();
});

module.exports = app;
