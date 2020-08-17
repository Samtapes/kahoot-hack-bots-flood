const express = require('express');
const app = express();

const flood = require("./flood");


app.use(express.json());

app.post("/login", async (req,res) => {
    const data = req.body;
    
    const resposta = flood(data);

    return res.json("Wait")
});


app.listen(3333, () => {
    console.log("Server is running!")
});
