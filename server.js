var http = require('http'),
  url = require('url'),
  fs = require('fs');
 
//http module
http.createServer((request, response) => {
  let addr = request.url,
      q = new URL(addr, 'http://' + request.headers.host),
      filePath = '';
    

 //append the log entry ti the log file
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Added to log.');
    }
});


// Determine file to serve
if (q.pathname.includes('documentation')) {
  filePath = (__dirname + '/documentation.html');
} else {
  filePath = 'index.html';
}

    //read and server the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
          throw err;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  }).listen(5501);

console.log("my test server is running on port 5501");
