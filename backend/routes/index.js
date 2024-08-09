var express = require('express');
var router = express.Router();

/* GET status for session. */
router.get('/session-status', (req, res) => {
    res.json({ loggedIn: !!req.session.user });
});

/* GET session info. */
router.get('/get-session-user', (req, res) => {
    res.send(req.session.user);
});

module.exports = router;
