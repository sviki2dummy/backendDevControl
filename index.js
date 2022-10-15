const port = process.env.PORT || 8000;

const express = require('express');
const app = express();

app.get('/',(req,res) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log('started listening on portt ' + port)
});
