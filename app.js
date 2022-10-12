

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const users = ['hello', 'world'];
const port = process.env.PORT || 3000;

app.get('/users',(req,res) => {
    res.json(users);
});

app.get('/',(req,res) => {
    res.send(`port = ${port}`);
});

console.log(port);
app.listen(port);
