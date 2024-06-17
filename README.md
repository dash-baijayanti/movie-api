# Movie API Documentation

## Table of Contents

+ Overview
+ Installation
+ Usage
+ API Endpoints
  + Get All Users
  + Create New User
  + Update User
  + Add Favorite Movie to User
  + Remove Favorite Movie from User
  + Delete User
  + Get All Movies
  + Get Movie by Title
+ Contributing
+ License

### Overview

This is a simple movie app built with Node.js and Express that provides information about various movies through API endpoints.

The Movie App is a Node.js application that serves information about movies through several endpoints. It uses Express for handling HTTP requests and Morgan for logging.

Once the server is running, you can access the app in your browser at `http://localhost:8080`.

### Installation

1. Clone the repository: git clone <https://github.com/dash-baijayanti/movie-api.git>
2. Navigate to the project directory: cd movies-api
3. Install dependencies: npm install
4. Start the server: npm start

### API Endpoints

Get All Users

+ URL: /users
+ Method: GET
+ Description: Retrieve a list of all users.

Create New User

+ URL: /users
+ Method: POST
+ Description: Create a new user.

Update User

+ URL: /users/:id
+ Method: PUT
+ Description: Update user details.
+ Request Params:
+ id (string): User ID

Add Favorite Movie to User

+ URL: /users/:id/:movieTitle
+ Method: POST
+ Description: Add a favorite movie to a user's list.
+ Request Params:
+ id (string): User ID
+ movieTitle (string): Movie Title

### Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

### License

This project is licensed under the MIT License - see the LICENSE.md file for details.
