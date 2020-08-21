const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3333;

const flood = require("./flood");


var bots = [];


app.use(express.json());



// CORS enabling the server01 acess all the servers server
app.use(function(req, res, next){
    var origins = ['kahoot-flood-server01.herokuapp.com', 'kahoot-flood-server01.herokuapp.com/', 'https://kahoot-flood-server01.herokuapp.com/', 'https://kahoot-flood-server01.herokuapp.com'];
    for(var i=0;i<origins.length;i++){
        var origin = origins[i];
        if(req.headers.origin.indexOf(origin) > -1){ 
             res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
             return;
        }
        // else, tough cookies. 
    }
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