require("dotenv").config();
const express = require("express"),
  app = express(),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  path = require("path"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  { check, validationResult } = require("express-validator");

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.urlencoded({ extended: true }));

// using CORS
const cors = require("cors");
app.use(cors());

// import auth.js and passport.js file
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

const uri = process.env.URI;
// "mongodb+srv://dashbaijayanti:DSE%40Life2023@baijayanti.jeczvvr.mongodb.net/MyFlix";

mongoose.connect(uri, {
  retryWrites: true,
  tls: true,
});

app.use(bodyParser.json());
// server
app.use(morgan("common"));

// express static function
app.use(express.static("public"));

// welcome note
app.get("/", async (req, res) => {
  res.status(200).send("welcome to MyFlixApp");
});

// documentation
app.get("/documentation.html", async (req, res) => {
  res.status(200).send("/documentation.html");
});

// using mongoose create/add a new user
app.post(
  "/users",
  // validation logic
  [
    check("userName", "userName is required").isLength({ min: 4 }),
    check(
      "userName",
      "userName contains non alphanumeric characters not allowed"
    ).isAlphanumeric(),
    check("password", "password is required").not().isEmpty(),
    check("Email", "does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors });
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    await Users.findOne({ userName: req.body.userName })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.userName + "already exists");
        } else {
          Users.create({
            userName: req.body.userName,
            password: hashedPassword,
            Email: req.body.Email,
            birthdate: req.body.birthdate,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error:" + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error:" + error);
      });
  }
);

// READ users in mongoose
app.get("/users", async (req, res) => {
  await Users.find()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

//GET a user by userName
app.get(
  "/users/:userName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.params.userName);
    await Users.find({ userName: req.params.userName })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

// UPDATE a user info by username
app.put(
  "/users/:userName",
  // validation
  [
    check("userName", "userName is required").isLength({ min: 4 }),
    check(
      "userName",
      "userName contains non alphanumeric characters not allowed"
    ).isAlphanumeric(),
    check("password", "password is required").not().isEmpty(),
    check("Email", "does not appear to be valid").isEmail(),
  ],

  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors });
    }
    let hashedPassword = Users.hashPassword(req.body.password);
    // condition for authentication
    if (req.user.userName !== req.params.userName) {
      return res.status(400).send("Permission Denied");
    }
    // end
    await Users.findOneAndUpdate(
      { userName: req.params.userName },
      {
        $set: {
          userName: req.body.userName,
          password: hashedPassword,
          Email: req.body.Email,
          birthdate: req.body.birthdate,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.status(201).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

// add movie to users list of favMovies
app.post(
  "/users/:userName/movies/:MovieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { userName: req.params.userName },
      { $push: { favMovies: req.params.MovieId } },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        res.status(500).send("Error:" + err);
      });
  }
);

// DELETE movie from favmovies list
app.delete(
  "/users/:userName/:movies/:MovieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      {  userName: req.params.userName },
      {
        $pull: { favMovies: req.params.MovieId },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// DELETE user by username
app.delete("/users/:userName", async (req, res) => {
  await Users.findOneAndDelete({ userName: req.params.userName })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.userName + "was not found");
      } else {
        res.status(200).send(req.params.userName + "was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

// READ all movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

// GET movies by Title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

//GET Genre description by name
app.get(
  "/movies/Genre/:Name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find({ "Genre.Name": req.params.Name })
      .then((genre) => {
        res.status(200).json(genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

// GET Director details by Director name
app.get(
  "/movies/Director/:Name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find({ "Director.Name": req.params.Name })
      .then((director) => {
        res.status(200).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

// listen for requests
const port = process.env.PORT || 5110;
app.listen(port, "0.0.0.0", () => {
  console.log("listening to port" + port);
});
