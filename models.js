const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// models using mongoose
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    BirthYear: Date,
    DeathYear: Date,
  },
  ImageUrl: { type: String },
  Featured: { type: Boolean },
});

let Movie = mongoose.model("Movie", movieSchema);

let userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  Email: { type: String, required: true },
  birthDate: { type: Date },
  favMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

// hashing for password submitted
userSchema.statics.hashPassword = (Password) => {
  return bcrypt.hashSync(Password, 10);
};

// hashing for compaires submitted password
userSchema.methods.validatePassword = function(Password){
  return bcrypt.compareSync(Password, this.password);
};

// creation of models
let User = mongoose.model("User", userSchema);

// exporting the models
module.exports.Movie = Movie;
module.exports.User = User;