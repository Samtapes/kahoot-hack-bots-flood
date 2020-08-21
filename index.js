const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3333;

const flood = require("./flood");


var bots = [];


app.use(express.json());


// CORS enabling the server01 acess all the servers server
app.use(function(req, res, next) {
    var allowedOrigins = ['https://kahoot-flood-server01.herokuapp.com/'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });



// Rendering frontend
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});



// Sending data to the frontend to check if the server are full and the players name
app.get('/login', async (req,res) => {
    return res.json(bots);
});


// Creating bots
app.post("/login", async (req,res) => {
    const data = req.body;
    
    const resposta = flood(data);


    bots.push({nick: data.nick, server: 1});

    return res.json("Wait");
});



app.listen(PORT, () => {
    console.log("Server is running!")
});