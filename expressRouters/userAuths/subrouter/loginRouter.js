const express = require('express');
const router = express.Router();

router.get('/X',(req,res) => {
    res.send('hello');
})

module.exports = router;