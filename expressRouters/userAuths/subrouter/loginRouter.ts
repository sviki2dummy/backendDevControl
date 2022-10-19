let express = require('express');
let router = express.Router();

router.get('/X',(req,res) => {
    res.send('hello');
})

module.exports = router;
export { }
