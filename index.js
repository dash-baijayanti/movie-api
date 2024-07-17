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
// to allow only certain users
// let allowedOrigins = ["http://localhost:5110", "http://testsite.com"];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         // if a specific origin is not found  on the list of allowed origins
//         let message =
//           "The CORs policy for this application doesnot allow access from origin" +
//           origin;
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// import auth.js and passport.js file
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

const uri =
  "mongodb+srv://dashbaijayanti:DSE%40Life2023@baijayanti.jeczvvr.mongodb.net/MyFlixDB";

mongoose.connect(uri, {
  retryWrites: true,
  tls: true,
});

app.use(bodyParser.json());
// server
app.use(morgan("common"));

// user
let users = [
  {
    id: 1,
    userName: "john_doe",
    email: "john.doe@example.com",
    password: "password123",
    dateOfBirth: "1991-06-08",
    favMovies: ["Dhoom 2", "Cinderella"],
  },
  {
    id: 2,
    userName: "alice_jones",
    email: "alice.jones@example.com",
    password: "password123",
    dateOfBirth: "1985-03-03",
    favMovies: [],
  },
  {
    id: 3,
    userName: "bob_brown",
    email: "bob.brown@example.com",
    password: "password123",
    dateOfBirth: "1988-04-04",
    favMovies: ["PK"],
  },
  {
    id: 4,
    userName: "charlie_davis",
    email: "charlie.davis@example.com",
    password: "password123",
    dateOfBirth: "1995-05-05",
    favMovies: [""],
  },
];

// 10 Movies data
let movies = [
  {
    Title: "Dhoom 2",
    Description:
      "Dhoom 2 is an action-packed Bollywood film that takes the genre to new heights.",
    Genre: {
      Name: "Action",
      Description:
        "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work",
    },
    Director: {
      Name: "Sanjay Gadhvi",
      Bio: "Gadhvi's career began by assisting Anant Balani with Tu Hi Bataa, which was never released.[3] He made his directorial debut with Tere Liye (2000), which performed poorly.[4] His first film with Yash Raj Films was Mere Yaar Ki Shaadi Hai (2002), which enjoyed moderate success. He first gained attention directing the action thriller Dhoom in 2004, followed by its sequel Dhoom 2.[5] The films starred Abhishek Bachchan, Uday Chopra, and Rimi Sen, with Hrithik Roshan, Aishwarya Rai, and Bipasha Basu joining the cast for the seque",
      BirthYear: "22 November 1965",
      DeathYear: "19 November 2023",
    },
    ReleaseDate: "24 November 2006",
    Cast: " Hrithik Roshan, Aishwarya Rai, Abhishek Bachchan, Bipasha Basu, Uday Chopra",
    ImageUrl:
      "https://www.yashrajfilms.com/images/default-source/Movies/Dhoom-2/dhoom2_mobile.jpg?sfvrsn=7598f5cc_8",
    Featured: true,
  },

  {
    Title: "3 Idiots",
    Description:
      "3 Idiots has been ranked China's 12th favourite film of all time according to ratings on popular Chinese film review site Douban, with only one domestic Chinese film (Farewell My Concubine) ranked higher.",
    Genre: {
      Name: "comedy-drama",
      Description:
        "This is a form of comedy that merges elements of tragedy and comedy together, often placing dramatic characters in comedic situations, or introducing comedic characters into dramas.",
    },
    Director: {
      Name: "Rajkumar Hirani",
      Bio: "Starting his career as a film editor after passing out from FTII in editing, a bad experience forced him to shift to ad films, where he made several successful ads. His first film as a professional editor was Vidhu Vinod Chopra's action drama Mission Kashmir (2000).",
      BirthYear: "20 November 1962",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "25 December 2009",
    Cast: " Aamir Khan, R. Madhavan, Sharman Joshi, Kareena Kapoor, Boman Irani",
    ImageUrl:
      "https://www.letsfindmovie.com/wp-content/uploads/2020/04/aFGPUmbgGoAt93WP3WYsAPa0Yv8.jpg",
    Featured: true,
  },

  {
    Title: "Kuch Kuch Hota Hai",
    Description:
      "The film tells the story of Rahul Khanna and two girls from his life",
    Genre: {
      Name: "Romantic Film",
      Description:
        "A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships.",
    },
    Director: {
      Name: "Karan Johar",
      Bio: "He has launched the careers of several successful actors and filmmakers under his company Dharma Productions. The recipient of several accolades, including two National Film Awards and seven Filmfare Awards, he has been honoured with the Padma Shri by the Government of India in 2020",
      BirthYear: "25 May 1972",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "16 October 1998",
    Cast: "Shah Rukh Khan, Kajol, Rani Mukherji",
    ImageUrl:
      "https://image.tmdb.org/t/p/original/5FmtHHDGPofW5Zjns1EM1D8503c.jpg",
    Featured: false,
  },

  {
    Title: "Andhadhun",
    Description:
      "The film tells the story of a blind piano player who unwittingly becomes embroiled in the murder of a retired actor.",
    Genre: {
      Name: "Thriller Crime ",
      Description:
        "The crime thriller has the central characters involved in crime, either in its investigation, as the perpetrator, or less commonly, a victim",
    },
    Director: {
      Name: "Sriram Raghavan",
      Bio: "Raghavan made his directorial debut with Ek Hasina Thi (2004). He then went on to direct the critically acclaimed Johnny Gaddaar (2007), an adaptation of the 1962 French novel Les mystifiés by Alain Reynaud-Fourton; followed by the action spy film Agent Vinod (2012) starring Saif Ali Khan; a critical and commercial failure. Raghavan's followup Badlapur (2015), a film based on Death's Dark Abyss by Massimo Carlotto met with positive reviews and was a moderate commercial success at the box office.",
      BirthYear: "22 June 1963",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "5 October 2018",
    Cast: "Ayushmann Khurrana, Radhika Apte",
    ImageUrl:
      "https://s4.scoopwhoop.com/anj/sw/b9c81e6c-f22c-46b4-952f-9804a374d59b.jpg",
    Featured: false,
  },

  {
    Title: "Titanic",
    Description:
      "Cameron's inspiration for the film came from his fascination with shipwrecks. He felt a love story interspersed with the human loss would be essential to convey the emotional impact of the disaster.",
    Genre: {
      Name: "Romantic Film",
      Description:
        "A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships.",
    },
    Director: {
      Name: "James Cameron",
      Bio: "He is a major figure in the post-New Hollywood era. He often uses novel technologies with a classical filmmaking style. He first gained recognition for writing and directing The Terminator (1984) and found further success with Aliens (1986), The Abyss (1989), Terminator 2: Judgment Day (1991), True Lies (1994), as well as Avatar (2009) and its sequels. He directed, wrote, co-produced, and co-edited Titanic (1997), winning three Academy Awards for Best Picture, Best Director, and Best Film Editing. He is a recipient of various other industry accolades, and three of his films have been selected for preservation in the National Film Registry by the Library of Congress.",
      BirthYear: "August 16 1954",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "December 19, 1997",
    Cast: "Kate Winslet, Leonardo DiCaprio ",
    ImageUrl: "https://picfiles.alphacoders.com/140/thumb-1920-140026.jpg",
    Featured: true,
  },

  {
    Title: "PK",
    Description:
      "A nude humanoid alien lands on Earth on a research mission in Rajasthan, India, and is stranded when the remote control to summon his spaceship is stolen.",
    Genre: {
      Name: "Comedy Film",
      Description:
        "Science fiction is a genre of fiction dealing with the impact of imagined innovations in science or technology.",
    },
    Director: {
      Name: "Rajkumar Hirani",
      Bio: "Starting his career as a film editor after passing out from FTII in editing, a bad experience forced him to shift to ad films, where he made several successful ads. His first film as a professional editor was Vidhu Vinod Chopra's action drama Mission Kashmir (2000).",
      BirthYear: "20 November 1962",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "19 December 2014",
    Cast: " Aamir Khan",
    ImageUrl:
      "https://i.pinimg.com/originals/58/a1/b4/58a1b4133da9cd918440aa203537e965.jpg",
    Featured: true,
  },

  {
    Title: "Aashiqui 2",
    Description:
      "The film opens by showing a large crowd waiting for Rahul Jaykar, a successful singer and musician whose career is waning because of his alcohol addiction ",
    Genre: {
      Name: "Romantic Film",
      Description:
        "A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships.",
    },
    Director: {
      Name: "Mohit Suri",
      Bio: "Mohit Suri is an Indian film director. Born into the Bhatt family, he is well known for directing the films Murder 2 (2011),[1] the musical romance Aashiqui 2 (2013)[2] and the romantic thrillers Awarapan (2007), Ek Villain (2014) and Malang (2020).[3] He has been married to Udita Goswami since 2013.",
      BirthYear: "11 April 1981",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "26 April 2013",
    Cast: "Aditya Roy Kapur, Shraddha Kapoor ",
    ImageUrl:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/z18DWXBRxn3kz00sIVhC7ZK39Qm.jpg",
    Featured: false,
  },

  {
    Title: "Cinderella",
    Description:
      "Cinderella is an ambitious young woman who dreams of establishing her shop, Dresses by Ella. After she catches the eye of Prince Robert in passing, he disguises himself as a commoner and sets out in hopes of meeting her.",
    Genre: {
      Name: "Romantic film",
      Description:
        "A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships.",
    },
    Director: {
      Name: "Kay Cannon",
      Bio: "She is best known for writing and producing the Pitch Perfect film series (2012–2017). She made her directorial debut with the comedy film Blockers (2018). Cannon was also a writer and producer for the NBC comedy series 30 Rock (2007–2012) and the FOX comedy series New Girl (2012–2014).[2] She created, wrote and produced the short-lived Netflix comedy-drama series Girlboss (2017).",
      BirthYear: "August 21 1974)",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "August 30 2021",
    Cast: "Camila Cabello, Nicholas Galitzine ",
    ImageUrl:
      "https://cdn.shopify.com/s/files/1/0197/1326/products/CINDERELLA_1200x1200.jpg?v=1629250365",
    Featured: false,
  },

  {
    Title: "Avatar The Way of Water",
    Description:
      "Avatar: The Way of Water is a movie that follows the story of the Sully family, more than a decade after the events of the first film",
    Genre: {
      Name: "science fiction film",
      Description:
        "Science fiction is a genre of fiction dealing with the impact of imagined innovations in science or technology.",
    },
    Director: {
      Name: "James Cameron",
      Bio: "He is a major figure in the post-New Hollywood era. He often uses novel technologies with a classical filmmaking style. He first gained recognition for writing and directing The Terminator (1984) and found further success with Aliens (1986), The Abyss (1989), Terminator 2: Judgment Day (1991), True Lies (1994), as well as Avatar (2009) and its sequels. He directed, wrote, co-produced, and co-edited Titanic (1997), winning three Academy Awards for Best Picture, Best Director, and Best Film Editing. He is a recipient of various other industry accolades, and three of his films have been selected for preservation in the National Film Registry by the Library of Congress.",
      BirthYear: " August 16 1954",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "December 6 2022",
    Cast: " Sam Worthington, Zoe Saldaña, Sigourney Weaver",
    ImageUrl:
      "https://content.webtickets.co.za/labia/banner_Avatar-The-Way-Of-Water-Header[1]_20221125_160122.jpg",
    Featured: false,
  },

  {
    Title: "Baahubali:(The Beginning)",
    Description:
      " A story about Sivagami, a woman who carries a baby in her hand while crossing a river, and a few years later about Kattappa, which intrigued Rajamouli. His fascination with Mahabharata and the tales of Amar Chitra Katha and Chandamama further fuelled his interest in the story",
    Genre: {
      Name: "Action film",
      Description:
        "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work",
    },
    Director: {
      Name: "S.S. Rajamouli",
      Bio: "S. S. Rajamouli, born Koduri Srisaila Sri Rajamouli on October 10, 1973, is an Indian director and screenwriter primarily known for his work in Telugu cinema. His films span epic, action, and fantasy genres, and he holds the distinction of being the highest-grossing Indian director of all time as well as the highest-paid director in India",
      BirthYear: " October 10 1973",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "10 July 2015",
    Cast: "Prabhas ",
    ImageUrl:
      "https://trendinindia.com/wp-content/uploads/2015/06/baahubali.jpg",
    Featured: false,
  },
];

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
  "/users/:id/:MovieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { FavoriteMovies: req.params.MovieId } },
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

//    async (req, res) => {
//   await Users.findOneAndDelete({ userName: req.params.userName })
//     .then((movieid) => {
//       if (!movieid) {
//         res.status(400).send(req.params.MovieId + "was not found");
//       } else {
//         res.status(200).send(req.params.MovieId + "was deleted");
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error:" + err);
//     });
// });
//
// app.delete( '/users/:id/:MovieId', passport.authenticate('jwt', { session: false }), (req, res) => { Users.findOneAndUpdate( { _id: req.params.id }, { $pull: { FavoriteMovies: req.params.MovieId }, }, { new: true } ) .then((updatedUser) => { res.json(updatedUser); }) .catch((err) => { console.error(err); res.status(500).send('Error: ' + err); });

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
