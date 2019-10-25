const router = require('express').Router();

router.get('/users', (req, res) => {
    res.send({type: 'GET'});
});

router.post('/users', (req, res) => {
    res.send({type: 'POST'});
});

router.delete('/users', (req, res) => {
    res.send({type: 'DEL'});
});

router.put('/users', (req, res) => {
    res.send({type: 'PUT'});
});

module.exports = router;