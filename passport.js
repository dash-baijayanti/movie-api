const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User;
JWTStrategy = passportJWT.Strategy;
ExtractJwt = passportJWT.ExtractJwt;

//   basic HTTP authentication for login request
passport.use(
  new localStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (username, Password, callback) => {
      console.log(`${username} ${Password}`);
      await Users.findOne({ userName: username })
        .then((user) => {
          if (!user) {
            console.log("incorrect username");
            return callback(null, false, {
              message: "incorrect username or password.",
            });
          }
          console.log("finished");
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    }
  )
);

//JWT Authentication code
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "passCODE"   
    },
    async (jwtPlayload, callback) => {
      return await Users.findOne({userName: jwtPlayload.userName})
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
