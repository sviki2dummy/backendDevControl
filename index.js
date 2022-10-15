const port = process.env.PORT || 8000;
// const port = '0.0.0.0'


const express = require('express');
const app = express();

app.get('/',(req,res) => {
  console.log('request:/');
  res.send('hello world!!!');
});

app.listen(port, () => {
  console.log('started listening on portt ' + port)
});
