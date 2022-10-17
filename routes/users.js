const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('user list');
});

router.get('/new', (req, res) => {
    res.send('new user Form');
});

router.post('/', (req, res) => {
    res.send('create user');
});


router.route('/:id').get((req, res) => {
    const id = req.params.id;
    console.log(req.user)
    res.send("User get " + id);
}).post((req, res) => {

}).put((req, res) => {

}).delete((req, res) => {

});

const users = [{ name: 'Kyle' }, { name: 'Sally' }];


router.param('id', (req, res, next, id) => {
    req.user = users[id];
    next();
});

// router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     res.send("User get " + id);
// });

// router.put('/:id', (req, res) => {
//     const id = req.params.id;
//     res.send("User get " + id);
// });

// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     res.send("User get " + id);
// });


module.exports = router;