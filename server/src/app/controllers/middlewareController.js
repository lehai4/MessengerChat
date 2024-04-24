const jwt = require("jsonwebtoken");
const middlewareController = {
  // middlewareCORS
  middlewareCORS: (req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    next();
  },
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token || req.body.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, `${process.env.JWT_ACCESS_KEY}`, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  // getUserDataFromRequest
  getUserDataFromRequest: async (req) => {
    return new Promise((resolve, reject) => {
      const token = req.token.split(" ")[1] || req.authorization.split(" ")[1];
      if (token) {
        jwt.verify(
          token,
          `${process.env.JWT_ACCESS_KEY}`,
          {},
          (err, userData) => {
            if (err) throw err;
            resolve(userData);
          }
        );
      } else {
        reject("no token");
      }
    });
  },
};
module.exports = middlewareController;
