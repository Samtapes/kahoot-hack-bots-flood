const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;

const flood = require("./flood");


app.use(express.json());

app.post("/login", async (req,res) => {
    const data = req.body;
    
    const resposta = flood(data);

    return res.json("Wait")
});



app.listen(PORT, () => {
    console.log("Server is running!")
});
