// const port = process.env.PORT || 8000;  //heroku ili localhost
const port = '0.0.0.0' || 8000; //render ili localhost


const express = require('express');
const app = express();

app.get('/',(req,res) => {
  console.log('request:/');
  res.send('hello world!!!');
});

app.listen('0.0.0.0', () => {
  console.log('started listening on portt ' + port)
});
