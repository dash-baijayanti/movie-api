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

Once the server is running, you can access the app in your browser at `http://localhost:5110`.

### Installation

1. Clone the repository: git clone <https://github.com/dash-baijayanti/movie-api.git>
2. Navigate to the project directory: cd movies-api
3. Install dependencies: npm install
4. Start the server: npm start

### Prerequisites

1. Node.js
2. MongoDB Atlas account or a local MongoDB instance
3. Heroku account for hosting
4. Render. Check out these step-by-step instructions on switching from Heroku to Render to host your API (on the CareerFoundry Forum).
5. Vercel. Check out these step-by-step instructions on how to deploy your Node project on Vercel.

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

+ URL: /users/:userName
+ Method: PUT
+ Description: Update user details.
+ Request Params:
+ Name (string): User Name

Add Favorite Movie to User

+ URL: /users/:userName/:movieTitle
+ Method: POST
+ Description: Add a favorite movie to a user's list.
+ Request Params:
+ Name (string): User Name
+ movieTitle (string): Movie Title

Delete User by userName

+ URL: /users/:userName
+ Method: DELETE
+ Description: Delete a new user.

Get All Movies

+ URL: /movies
+ Method: GET
+ Description: Retrieve a list of all movies.

Get All Movies by Title

+ URL: /movies/:Title
+ Method: GET
+ Description: Retrieve a  movie by Title.

Get movies and Description by Genre Name

+ URL: /movies/:Genre/:Title
+ Method: GET
+ Description: Retrieve movies by Genre Name.

Get movies and details of director by director Name

+ URL: /movies/:Director/:Name
+ Method: GET
+ Description: Retrieve Movie Details by Director Name.

### Error Handling

Errors are handled by a centralized middleware function that captures errors and sends a JSON response with an appropriate status code and message.

### Authentication

This API uses JWT (JSON Web Token) for authentication. To access protected routes, you need to include a valid JWT token in the Authorization header of your requests.
Implement CORS and Added password hashing to user schema.

### Login

To log in and receive a JWT token, use the following endpoint: [(http://localhost:5110/login?userName=alice_jones&password=password4563)]

### POST /login

Request body parameters: Username, Password.
Hosting
The MyFlix API is hosted on Render. You can access it at: [(https://movie-api-7rmr.onrender.com)]
