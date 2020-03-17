const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

// morgan fucntion with dev argument:
// Configures morgan to log using devepolment version, wich brings aditional information to the screen
app.use(morgan('dev'));

// When the server receives requests with json formated data in the body,
// the body parser middleware will handle parsing that data into properties of the request object
// so we can access that data more easly
app.use(bodyParser.json());

// Routing method, to set properties on the response object
// 1º param path
// 2º callback function
app.all('/campsites', (req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // Pass control of the application routing to the next one
});

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description:  ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403; // Not supported
    res.end('PUT operation is not supportted on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403; // Not supported
    res.end(`POST operation is not supportted on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public'));

// The use app can take a callback function 
app.use((req, res) => {
    res.statusCode = 200; // set the status code to Success
    res.setHeader('Content-Type', 'text/html'); // Set the Header
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); // Substitutes the res.write() method and ends the response
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})