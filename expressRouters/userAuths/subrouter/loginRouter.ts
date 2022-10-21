var express = require('express');
var router = express.Router();

router.get('/X',(req,res) => {
    res.send('hello');
})


// router.post('/login',(req,res) => {
//     const loginReq: ILoginRequest = req.body;
// })

module.exports = router;