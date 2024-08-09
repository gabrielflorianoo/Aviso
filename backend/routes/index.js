var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/session-status', (req, res) => {
    res.json({ loggedIn: !!req.session.user });
});

module.exports = router;
