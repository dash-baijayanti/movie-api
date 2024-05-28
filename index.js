// express module
const express = require("express"),
  morgan = require("morgan");
let app = express();

// 10 Movies data
let movieList = [
  {
    MovieName: "Dhoom 2( action thriller film )",
    Director: "Sanjay Gadhvi",
    ReleaseDate: "24 November 2006",
    Cast: " Hrithik Roshan, Aishwarya Rai, Abhishek Bachchan, Bipasha Basu, Uday Chopra",
    ProducedBy: "Aditya Chopra",
    WrittenBy: "Vijay Krishna Acharya",
    DistributedBy: "Yash Raj Films",
  },
  {
    MovieName: " 3 Idiots( comedy-drama film )",
    Director: "Rajkumar Hirani",
    ReleaseDate: "25 December 2009",
    Cast: " Aamir Khan, R. Madhavan, Sharman Joshi, Kareena Kapoor, Boman Irani",
    ProducedBy: "Vidhu Vinod Chopra",
    WrittenBy: "Rajkumar Hirani",
    DistributedBy: "Reliance BIG Pictures",
  },
  {
    MovieName: "Baahubali:(The Beginning)( epic action film )",
    Director: "S.S. Rajamouli",
    ReleaseDate: "10 July 2015",
    Cast: "Prabhas",
    ProducedBy: "Shobu Yarlagadda",
    WrittenBy: "S. S. Rajamouli",
    DistributedBy: "Dharma Productions, AA Films",
  },
  {
    MovieName: " The Way of Water( epic science fiction film )",
    Director: "James Cameron",
    ReleaseDate: "December 6, 2022",
    Cast: "Sam Worthington, Zoe Saldaña, Sigourney Weaver",
    ProducedBy: "James Cameron",
    WrittenBy: "Josh Friedman and Shane Salerno",
    DistributedBy: "20th Century Studios",
  },
  {
    MovieName: "Cinderella( romantic musical film )",
    Director: "Kay Cannon",
    ReleaseDate: "August 30, 2021",
    Cast: "Camila Cabello, Nicholas Galitzine",
    ProducedBy: "James Corden",
    WrittenBy: "Kay Cannon",
    DistributedBy: "Amazon Studios",
  },
  {
    MovieName: "Aashiqui 2( romantic musical drama film )",
    Director: "Mohit Suri",
    ReleaseDate: "26 April 2013",
    Cast: "Aditya Roy Kapur, Shraddha Kapoor ",
    ProducedBy: "Mukesh Bhatt, Mahesh Bhatt, Bhushan Kumar",
    WrittenBy: "Shagufta Rafique",
    DistributedBy: "AA Films",
  },
  {
    MovieName: "PK(science fiction religious satire comedy drama film)",
    Director: "Rajkumar Hirani",
    ReleaseDate: "19 December 2014",
    Cast: "Aamir Khan",
    ProducedBy: " Vidhu Vinod Chopra, Rajkumar Hirani",
    WrittenBy: "Rajkumar Hirani, Abhijat Joshi",
    DistributedBy: "UTV Motion Pictures",
  },
  {
    MovieName: "Titanic(epic romantic disaster film)",
    Director: "James Cameron",
    ReleaseDate: "December 19, 1997",
    Cast: "Kate Winslet, Leonardo DiCaprio ",
    ProducedBy: "James Cameron, Jon Landau",
    WrittenBy: "James Cameron",
    DistributedBy: "Paramount Pictures, 20th Century Fox",
  },
  {
    MovieName: "Andhadhun( black comedy crime thriller suspense film )",
    Director: "Sriram Raghavan",
    ReleaseDate: " 5 October 2018",
    Cast: "Ayushmann Khurrana, Radhika Apte",
    ProducedBy: "Sudhanshu Vats",
    WrittenBy: "Sriram Raghavan",
    DistributedBy: "Viacom 18 Motion Pictures",
  },
  {
    MovieName: "Kuch Kuch Hota Hai",
    Director: "Karan Johar",
    ReleaseDate: "16 October 1998",
    Cast: "Shah Rukh Khan, Kajol, Rani Mukherji ",
    ProducedBy: "Yash Johar",
    WrittenBy: "Karan Johar",
    DistributedBy: "Yash Raj Films",
  },
];

// express static function
app.use(express.static("public"));

// using morgan middleware
app.use(morgan("common"));

// get request
app.get("/", (req, res) => {
  res.send("wlcome to my app!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(movieList);
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
