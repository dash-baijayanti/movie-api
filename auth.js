const jwtSecret = "passCODE";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

// local passport file
require("./passport");

let generateJWTToken = (users) => {
  return jwt.sign(users, jwtSecret, {
    // this is the username encoding in JWT
    subject: users.userName,
    // this specifies that token will expire in 7 days
    expiresIn: "7d",
    // this is the algorithm used to encode the values of jwt
    algorithm: "HS256",
  });
};

// post login
module.exports = (router) => {
  router.post("/login", (req, res) => { 
    passport.authenticate("local", { session: false }, (error, users, info) => {
      if (error || !users) {
        return res.status(400).json({
          message: "something is wrong",
          users: users,
        });
      }
      req.login(users, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(users.toJSON());
        return res.json({ users, token });
      });
    })(req, res);
  });
};
