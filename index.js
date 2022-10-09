const express = require('express');
const crypto = require('crypto');
const app = express();

const users = [];
const port = process.env.PORT || 3000;


app.get('/users',(req,res) => {
    res.json(users);
});



console.log(port)
app.listen(port);
