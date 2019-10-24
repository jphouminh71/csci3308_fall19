const router = require('express').Router();

router.post('./register', (req, res) => {
    res.send('Register test');
});

module.exports = router;