const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

// The use app can take a callback function 
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200; // set the status code to Success
    res.setHeader('Content-Type', 'text/html'); // Set the Header
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); // Substitutes the res.write() method and ends the response
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})