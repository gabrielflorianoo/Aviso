var express = require('express');
var router = express.Router();
const UserValidator = require('../models/User.js');

const users = [
    {
        username: 'exampleUser',
        email: 'user@example.com',
        password: 'P@ssw0rd123',
    },
];

/* GET users listing. */
router.get('/', (req, res) => {
    req.session.user = users[0];
    res.send(users);
});

/* POST request for creating a user. */
router.post(
    '/register',
    UserValidator.ValidateUser,
    checkDuplicates,
    getOtherUsers,
    (req, res) => {
        users.push(req.body);

        req.session.user = req.body;
        console.log(req.session.user);

        res.send('User validated and created');
    },
);

/* POST request for logging. */
router.post(
    '/login',
    UserValidator.ValidateUserLogin,
    getOtherUsers,
    (req, res) => {
        const found = users.filter(
            (user) =>
                user.username == req.body.username &&
                user.password == req.body.password,
        );

        if (!found) {
            res.status(413).send('User not found');
        }

        req.session.user = req.body;
        console.log(req.body);
        res.send('User found');
    },
);

/* GET request for logging out. */
router.get('/logout', (req, res) => {
    req.session.destroy();

    res.send('User logged out succesfully');
});

function getOtherUsers(req, res, next) {
    if (!req.body.privateMessages) {
        try {
            req.body.privateMessages = [];
            for (let x = 0; x < users.length; x++) {
                if (req.body.username != users[x].username) {
                    req.body.privateMessages.push(users[x].username);
                }
            }
        } catch (error) {
            console.log('Error while adding other users: ', error.message);
        }
    }

    next();
}

function checkDuplicates(req, res, next) {
    const duplicate = users.filter(
        (user) =>
            user.username == req.body.username || user.email == req.body.email,
    );

    if (duplicate.length > 0) {
        return res.status(401).send('User already exists');
    }

    next();
}

module.exports = router;
