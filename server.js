var http = require("http"),
  url = require("url"),
  fs = require("fs"),
  path = require("path");

// function to log the request
const logRequest = (requestUrl) => {
  const timestamp = new Date().toISOString();
  const logEntry = `URL: ${requestUrl}\nTimestamp: ${timestamp}\n\n`;
  const logFilePath = path.join(__dirname, "log.txt");

  //append the log entry ti the log file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.log("Error writing to log file:", err);
    } else {
      console.log("Log entry added.");
    }
  });
};

//http module
http.createServer((request, response) => {
    let addr = request.url,
      q = new URL(addr, "http://" + request.headers.host),
      filePath = "";

    // Log the request
    logRequest(addr);

    // Determine file to serve
    if (q.pathName.includes("documentation")) {
      filePath = path.join(__dirname + "/documentation.html");
    } else {
      filePath = path.join(__dirname, "index.html");
    }

    //read and server the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write("Internal Server Error");
        response.end();
      } else {
        response.writeHead(200, { "content-Type": "text/html" });
        response.write(data);
        response.end();
      }
    });
  })
  .listen(5501);

console.log("my test server is running on port 5501");
