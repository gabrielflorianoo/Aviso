var express = require('express');
var router = express.Router();

/* GET status for session. */
router.get('/session-status', (req, res) => {
    console.log(req.session.user);
    res.json({ loggedIn: !!req.session.user });
});

/* GET session info. */
router.get('/get-session-user', (req, res) => {
    res.json({ loggedUser: req.session.user });
});

/* GET request for logging out. */
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error while destroying session: ', err.message);
            return res.status(500).send('Could not log out. Please try again.');
        }

        res.send('User logged out successfully');
    });
});

module.exports = router;
