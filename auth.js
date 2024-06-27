const jwtSecret = "passCODE";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

// local passport file
require("./passport");

let generateJWTToken = (user) => {
  console.log(generateJWTToken);
  return jwt.sign(user, jwtSecret, {
    // this is the username encoding in JWT
    subject: user.userName,
    // this specifies that token will expire in 7 days
    expiresIn: "7d",
    // this is the algorithm used to encode the values of jwt
    algorithm: "HS256",
  });
};

// post login
module.exports = (router) => {
  router.post("/login", (req, res) => {
    
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "something is wrong",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
