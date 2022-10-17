const express = require('express');
const app = express();

port = process.env.PORT || 3000;


app.use(express.static("public"));


app.set('view engine', 'ejs');
// app.use(logger);



const userRouter = require('./routes/users')

app.use('/users', userRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(port);