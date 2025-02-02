// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Start up an instance of app
const bodyParser  = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 8000;

const server = app.listen(port,()=>{
    console.log('Server running');
    console.log(`running on localhost:${port}`)
})
// GET route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/add', callBack);

function callBack(req,res){
  res.send('POST received');
  newEntry = {
    temp: req.body.temperature,
    date: req.body.date,
    feel: req.body.user_response
  }
  projectData.push(newEntry)
  res.send(projectData);
  console.log(projectData)
};