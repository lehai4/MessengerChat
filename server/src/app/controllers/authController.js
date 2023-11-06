const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
  // [GET]/news
  registerUser: async (req, res) => {
    const { phone, password, name, avatar, active } = req.body;

    try {
      const createdUser = await User.create({
        phone: phone,
        password: password,
        name: name,
        avatar: avatar,
        active: active,
      });
      jwt.sign(
        {
          userId: createdUser._id,
          phone: createdUser.phone,
          password: createdUser.password,
          name: createdUser.name,
          avatar: createdUser.avatar,
          active: createdUser.active,
        },
        `${process.env.JWT_ACCESS_KEY}`,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true,
              httpOnly: true,
              origin: "http://localhost:8000",
            })
            .status(201)
            .json({
              id: createdUser._id,
            });
        }
      );
    } catch (err) {
      if (err) throw err;
      res.status(500).json("error");
    }
  },
  loginUser: async (req, res) => {
    const { phone, password } = req.body;
    const foundUser = await User.findOne({
      phone: phone,
      password: password,
    });
    if (!foundUser) {
      return res.status(404).json("Incorrect phone or password");
    }
    if (foundUser) {
      const accessToken = authController.generateAccessToken(foundUser);
      jwt.sign(
        {
          _id: foundUser._id,
          phone: foundUser.phone,
          password: foundUser.password,
          name: foundUser.name,
          avatar: foundUser.avatar,
          active: foundUser.active,
        },
        `${process.env.JWT_ACCESS_KEY}`,
        {},
        (err, token) => {
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true,
              httpOnly: true,
              origin: "http://localhost:8000",
            })
            .json({
              user: {
                _id: foundUser._id,
                phone: foundUser.phone,
                password: foundUser.password,
                name: foundUser.name,
                avatar: foundUser.avatar,
                active: foundUser.active,
              },
              accessToken: accessToken,
            });
        }
      );
    }
  },
  //LOG OUT
  logoutUser: async (req, res) => {
    res
      .cookie("token", "", {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        origin: "http://localhost:8000",
      })
      .status(200)
      .json("Logged out successfully!");
  },
  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      `${process.env.JWT_ACCESS_KEY}`,
      { expiresIn: "365d" }
    );
  },
};
module.exports = authController;
