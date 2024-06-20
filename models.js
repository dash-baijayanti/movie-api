const mongoose = require("mongoose");

// models using mongoose
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: { type: String, required: true },
    Description: { type: String, required: true },
  },
  Director: {
    Name: { type: String, required: true },
    Bio: { type: String, required: true },
    BirthYear: { type: Date },
    DeathYear: { type: Date },
  },
  // Actors: [String],
  ImageUrl: { type: String },
  Featured: { type: Boolean },
});

let userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  Email: { type: String, required: true },
  birthDate: { type: Date },
  favMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// creation of models
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

// exporting the models
module.exports.Movie = Movie;
module.exports.User = User;
