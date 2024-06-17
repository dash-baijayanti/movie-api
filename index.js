const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
 


// express module

  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect('mongodb://localhost:27017/myFlixDB', 
  {  useNewUrlParser: true,
     useUnifiedTopology: true ,
  });

// user
let users = [
  {
    id: 1,
    name: "Baijayanti",
    favMovies: ["Dhoom 2", "Cinderella"],
  },
  {
    id: 2,
    name: "KK",
    favMovies: [],
  },
  {
    id: 3,
    name: "Moni",
    favMovies: ["PK"],
  },
];

// 10 Movies data
let movies = [
  {
    Title: "Dhoom 2",
    Description:"Dhoom 2 is an action-packed Bollywood film that takes the genre to new heights.",
    Genre: {
      Name: "Action",
      Description: "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work"
      },
    Director: {
      Name: "Sanjay Gadhvi",
      Bio: "Gadhvi's career began by assisting Anant Balani with Tu Hi Bataa, which was never released.[3] He made his directorial debut with Tere Liye (2000), which performed poorly.[4] His first film with Yash Raj Films was Mere Yaar Ki Shaadi Hai (2002), which enjoyed moderate success. He first gained attention directing the action thriller Dhoom in 2004, followed by its sequel Dhoom 2.[5] The films starred Abhishek Bachchan, Uday Chopra, and Rimi Sen, with Hrithik Roshan, Aishwarya Rai, and Bipasha Basu joining the cast for the seque",
      BirthYear: "22 November 1965",
      DeathYear: "19 November 2023",
    },
    ReleaseDate: "24 November 2006",
    Cast: " Hrithik Roshan, Aishwarya Rai, Abhishek Bachchan, Bipasha Basu, Uday Chopra",
    ImageUrl:"https://www.yashrajfilms.com/images/default-source/Movies/Dhoom-2/dhoom2_mobile.jpg?sfvrsn=7598f5cc_8",
    Featured : true
  },

  {
    Title: "3 Idiots",
    Description:"3 Idiots has been ranked China's 12th favourite film of all time according to ratings on popular Chinese film review site Douban, with only one domestic Chinese film (Farewell My Concubine) ranked higher.",
    Genre: {
      Name: "comedy-drama",
      Description:"This is a form of comedy that merges elements of tragedy and comedy together, often placing dramatic characters in comedic situations, or introducing comedic characters into dramas."
      },
    Director: {
      Name: "Rajkumar Hirani",
      Bio: "Starting his career as a film editor after passing out from FTII in editing, a bad experience forced him to shift to ad films, where he made several successful ads. His first film as a professional editor was Vidhu Vinod Chopra's action drama Mission Kashmir (2000).",
      BirthYear: "20 November 1962",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "25 December 2009",
    Cast: " Aamir Khan, R. Madhavan, Sharman Joshi, Kareena Kapoor, Boman Irani",
    ImageUrl:"https://www.letsfindmovie.com/wp-content/uploads/2020/04/aFGPUmbgGoAt93WP3WYsAPa0Yv8.jpg",
    Featured : true  
  },

  {
    Title: "Kuch Kuch Hota Hai",
    Description:"The film tells the story of Rahul Khanna and two girls from his life",
    Genre: {
      Name: "Romantic Film",
      Description:"A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships."
      },
    Director: {
      Name: "Karan Johar",
      Bio: "He has launched the careers of several successful actors and filmmakers under his company Dharma Productions. The recipient of several accolades, including two National Film Awards and seven Filmfare Awards, he has been honoured with the Padma Shri by the Government of India in 2020",
      BirthYear: "25 May 1972",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "16 October 1998",
    Cast: "Shah Rukh Khan, Kajol, Rani Mukherji",
    ImageUrl: "https://image.tmdb.org/t/p/original/5FmtHHDGPofW5Zjns1EM1D8503c.jpg",
    Featured : false
  },

  {
    Title: "Andhadhun",
    Description:"The film tells the story of a blind piano player who unwittingly becomes embroiled in the murder of a retired actor.",
    Genre: {
      Name: "Thriller Crime ",
      Description: "The crime thriller has the central characters involved in crime, either in its investigation, as the perpetrator, or less commonly, a victim"
     },
    Director: {
      Name: "Sriram Raghavan",
      Bio: "Raghavan made his directorial debut with Ek Hasina Thi (2004). He then went on to direct the critically acclaimed Johnny Gaddaar (2007), an adaptation of the 1962 French novel Les mystifiés by Alain Reynaud-Fourton; followed by the action spy film Agent Vinod (2012) starring Saif Ali Khan; a critical and commercial failure. Raghavan's followup Badlapur (2015), a film based on Death's Dark Abyss by Massimo Carlotto met with positive reviews and was a moderate commercial success at the box office.",
      BirthYear: "22 June 1963",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "5 October 2018",
    Cast: "Ayushmann Khurrana, Radhika Apte",
    ImageUrl:"https://s4.scoopwhoop.com/anj/sw/b9c81e6c-f22c-46b4-952f-9804a374d59b.jpg",
    Featured : false
  },

  {
    Title: "Titanic",
    Description:"Cameron's inspiration for the film came from his fascination with shipwrecks. He felt a love story interspersed with the human loss would be essential to convey the emotional impact of the disaster.",
    Genre: {
      Name: "Romantic Film",
      Description:"A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships."
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
    Featured : true
  },

  {
    Title: "PK",
    Description: "A nude humanoid alien lands on Earth on a research mission in Rajasthan, India, and is stranded when the remote control to summon his spaceship is stolen.",
    Genre: {
      Name: "Comedy Film",
      Description:"Science fiction is a genre of fiction dealing with the impact of imagined innovations in science or technology."   
    },
    Director: {
      Name: "Rajkumar Hirani",
      Bio: "Starting his career as a film editor after passing out from FTII in editing, a bad experience forced him to shift to ad films, where he made several successful ads. His first film as a professional editor was Vidhu Vinod Chopra's action drama Mission Kashmir (2000).",
      BirthYear: "20 November 1962",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "19 December 2014",
    Cast: " Aamir Khan",
    ImageUrl:"https://i.pinimg.com/originals/58/a1/b4/58a1b4133da9cd918440aa203537e965.jpg",
    Featured : true
  },

  {
    Title: "Aashiqui 2",
    Description:"The film opens by showing a large crowd waiting for Rahul Jaykar, a successful singer and musician whose career is waning because of his alcohol addiction ",
    Genre: {
      Name: "Romantic Film",
      Description:"A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships."
     },
    Director: {
      Name: "Mohit Suri",
      Bio: "Mohit Suri is an Indian film director. Born into the Bhatt family, he is well known for directing the films Murder 2 (2011),[1] the musical romance Aashiqui 2 (2013)[2] and the romantic thrillers Awarapan (2007), Ek Villain (2014) and Malang (2020).[3] He has been married to Udita Goswami since 2013.",
      BirthYear: "11 April 1981",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "26 April 2013",
    Cast: "Aditya Roy Kapur, Shraddha Kapoor ",
    ImageUrl:"https://image.tmdb.org/t/p/w600_and_h900_bestv2/z18DWXBRxn3kz00sIVhC7ZK39Qm.jpg",
    Featured : false
  },

  {
    Title: "Cinderella",
    Description:"Cinderella is an ambitious young woman who dreams of establishing her shop, Dresses by Ella. After she catches the eye of Prince Robert in passing, he disguises himself as a commoner and sets out in hopes of meeting her.",
    Genre: {
      Name: "Romantic film",
      Description:"A Romantic storytelling genre that focuses on love and romantic relationships between two or more characters. It typically includes themes of passion, intimacy, and emotional connection between characters, and often explores the complexities of human relationships."
       },
    Director: {
      Name: "Kay Cannon",
      Bio: "She is best known for writing and producing the Pitch Perfect film series (2012–2017). She made her directorial debut with the comedy film Blockers (2018). Cannon was also a writer and producer for the NBC comedy series 30 Rock (2007–2012) and the FOX comedy series New Girl (2012–2014).[2] She created, wrote and produced the short-lived Netflix comedy-drama series Girlboss (2017).",
      BirthYear: "August 21 1974)",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "August 30 2021",
    Cast: "Camila Cabello, Nicholas Galitzine ",
    ImageUrl: "https://cdn.shopify.com/s/files/1/0197/1326/products/CINDERELLA_1200x1200.jpg?v=1629250365",
    Featured : false
  },

  {
    Title: "Avatar The Way of Water",
    Description:"Avatar: The Way of Water is a movie that follows the story of the Sully family, more than a decade after the events of the first film",
    Genre: {
      Name: "science fiction film",
      Description:"Science fiction is a genre of fiction dealing with the impact of imagined innovations in science or technology."
      },
    Director: {
      Name: "James Cameron",
      Bio: "He is a major figure in the post-New Hollywood era. He often uses novel technologies with a classical filmmaking style. He first gained recognition for writing and directing The Terminator (1984) and found further success with Aliens (1986), The Abyss (1989), Terminator 2: Judgment Day (1991), True Lies (1994), as well as Avatar (2009) and its sequels. He directed, wrote, co-produced, and co-edited Titanic (1997), winning three Academy Awards for Best Picture, Best Director, and Best Film Editing. He is a recipient of various other industry accolades, and three of his films have been selected for preservation in the National Film Registry by the Library of Congress.",
      BirthYear: " August 16 1954",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "December 6 2022",
    Cast: " Sam Worthington, Zoe Saldaña, Sigourney Weaver",
    ImageUrl:"https://content.webtickets.co.za/labia/banner_Avatar-The-Way-Of-Water-Header[1]_20221125_160122.jpg",
    Featured : false
  },

  {
    Title: "Baahubali:(The Beginning)",
    Description:" A story about Sivagami, a woman who carries a baby in her hand while crossing a river, and a few years later about Kattappa, which intrigued Rajamouli. His fascination with Mahabharata and the tales of Amar Chitra Katha and Chandamama further fuelled his interest in the story",
    Genre: {
      Name: "Action film",
      Description:"The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work"
     },
    Director: {
      Name: "S.S. Rajamouli",
      Bio: "S. S. Rajamouli, born Koduri Srisaila Sri Rajamouli on October 10, 1973, is an Indian director and screenwriter primarily known for his work in Telugu cinema. His films span epic, action, and fantasy genres, and he holds the distinction of being the highest-grossing Indian director of all time as well as the highest-paid director in India",
      BirthYear: " October 10 1973",
      DeathYear: "Waiting😃",
    },
    ReleaseDate: "10 July 2015",
    Cast: "Prabhas ",
    ImageUrl:"https://trendinindia.com/wp-content/uploads/2015/06/baahubali.jpg",
    Featured : false
  },
];

// express static function
app.use(express.static("public"));

// GET
// app.get('/', (req,res) => {
// res.status(201).send('WELCOME TO MOVIES API');
// });
// app.get('/documentation.html', (req,res) => {
//   res.sendFile('/documentation.html', {root : __dirname});
// });

// GET users
// app.get('/users', (req,res) => {
//   res.status(200).json(users);
// });

// ADD/CREATE newUser in users
// app.post('/users', (req,res) => {
//   const newUser = req.body;

//   if(newUser.name){
//     newUser.id = uuid.v4();
//     users.push(newUser);
//     res.status(201).json(newUser);
//   }else{
//     res.status(400).send('Users need name');
//   }
// });

// UPDATE USERS
// app.put('/users/:id', (req,res) => {
//   const{ id } = req.params;
//   const updateUser = req.body;

//   let user = users.find(user => user.id == id);

//   if(user){
//  user.name = updateUser.name;
//  res.status(200).json(user);
//   }else{
//     res.status(400).send('no such user');
//   }
// });

// UPDATE/post favMovies in user
// app.post('/users/:id/:movieTitle', (req,res) => {
//     const { id,movieTitle } = req.params;

//     let user = users.find(user => user.id == id);

//     if(user){
//     user.favMovies.push(movieTitle);
//     res.status(201).send(`${movieTitle} has been added to ${id}'s array`);
//     }else{
//       res.status(400).send('no such user');
//     }
// });

// DELETE favMovies from users
// app.delete('/users/:id/:movieTitle', (req,res) => {
//   const{id, movieTitle} = req.params;
  
//   let user = users.find(user => user.id == id);

//   if(user){
//     user.favMovies = user.favMovies.filter(title => title !== movieTitle);
//     res.status(200).send(`${movieTitle} has been deleted from ${id}'s array`)
//   }else{
//     res.status(400).send('No such user');
//   }
// }); 

// DELETE user from users
// app.delete('/users/:id', (req,res) => {
//   const{ id } = req.params;
  
//   let user = users.find(user => user.id == id);

//   if(user){
//     users = users.filter(user => user.id != id);
//     res.status(200).send(`${id}'s user has been deleted`);
//     // res.json(users);
//   }else{
//     res.status(400).send('No such user');
//   }
// });

// READ ENDPOINT by all movies
// app.get("/movies", (req, res) => {
//   res.status(201).json(movies);
// });

// READ ENDPOINT by only Title
// app.get("/movies/:title", (req, res) => {
//   const { title } = req.params;
//   const movie = movies.find((movie) => movie.Title === title);

//   if (movie) {
//     res.status(200).json(movie);
//   } else {
//     res.status(400).send("No such movie.");
//   }
// });

//  READ only the data of Genre by Title ENDPOINT
// app.get("/movies/:genre/:genreName", (req, res) => {
//   const { genreName } = req.params;
//   const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

//   if (genre) {
//     res.status(200).json(genre);
//   } else {
//     res.status(400).send("No such genre.");
//   }
// });

//   READ only the data of Director by Director ENDPOINT
// app.get("/movies/directors/:directorName", (req, res) => {
//   const directorName  = req.params.directorName;
//   const director = movies.find((movie) => movie.Director.Name === directorName).Director;

//   if (director) {
//     res.status(200).json(director);
//   } else {
//     res.status(400).send("No such Director.");
//   }
// });

// using mongoose how to create/add a new user
app.post('/users', async(req, res) =>{
  await Users.findOne({username: req.body.Username})
  .then((user)=>{
    if(user){
      return res.status(404).send(req.body.Username +'already exists');
    }else{
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user)=>{res.status(201).json(user)} )
      .catch((error)=> {
        console.error(error);
        res.status(500).send('Error' + error);
      })
    }
  })
  .catch((error)=>{
    console.error(error);
    res.status(500).send('Error'+ error);
  });
});


// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
