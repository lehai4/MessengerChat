const User = require("../models/User");
const declarePath = (path) => {
  let replaceResult = path.replaceAll("-", " ");
  const str = replaceResult;

  //split the above string into an array of strings
  //whenever a blank space is encountered

  const arr = str.split(" ");
  //loop through each element of the array and capitalize the first letter.

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const str2 = arr.join(" ");
  return str2;
};
const userController = {
  //get[/id]
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  //get[/id]
  getProfileByIdOfMe: async (req, res) => {
    try {
      const token = req.headers.token || req.body.headers.token;
      const accessToken = token.split(" ")[1];
      const user = await User.findById(req.params.id);
      const resultUser = {
        user,
        accessToken,
      };
      res.status(200).json(resultUser);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  //get[/name]
  getUserByName: async (req, res) => {
    let queryName = declarePath(req.params.name);
    try {
      const user = await User.find({
        name: queryName,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  //getAllUser
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json("Server no response!");
    }
  },
};
module.exports = userController;
