var express = require('express');
var router = express.Router();
const UserValidator = require('../models/User.js');
const uuid = require('uuid');

const users = [
    {
        username: 'exampleUser',
        email: 'user@example.com',
        password: 'P@ssw0rd123',
    },
    {
        username: 'exampleUser2',
        email: 'user2@example.com',
        password: 'P@ssw0rd123',
        privateMessages: [
            {
                name: 'exampleUser',
                messages: [
                    {
                        messageID: '1234567890abcdef',
                        message: 'Hello man',
                        userID: 'exampleUser',
                        createDate: Date.now(),
                    },
                ],
            },
        ],
    },
    {
        username: 'exampleUser3',
        email: 'user3@example.com',
        password: 'P@ssw0rd123',
    },
];

/* GET users listing. */
router.get('/', (req, res) => {
    res.send(users);
});

/* GET messages from that user */
router.get('/:username', (req, res) => {
    let found = users.find((user) => user.username == req.params.username);

    res.send(found.privateMessages);
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
        res.send('User found');
    },
);

router.put('/:username', (req, res, next) => {
    let message = createMessage(req.body.message, req.body.loggedUser);
    let sender = req.body.sender.username;

    console.log(req.body);

    let userFoundIdx = users.findIndex(
        (user) => user.username == req.params.username,
    );

    if (userFoundIdx === -1) {
        return res.status(404).send('User not found');
    }

    // Verifica se privateMessages é um array
    if (!Array.isArray(users[userFoundIdx].privateMessages)) {
        users[userFoundIdx].privateMessages = [];
    }

    let senderIdx = users[userFoundIdx].privateMessages.findIndex(
        (privM) => privM.name == sender,
    );

    if (senderIdx !== -1) {
        // Se o usuário já tem mensagens privadas de 'sender'
        users[userFoundIdx].privateMessages[senderIdx].messages.push(message);
    } else {
        // Se não houver mensagens de 'sender', cria uma nova entrada
        users[userFoundIdx].privateMessages.push({
            name: sender,
            messages: [message],
        });
    }

    res.send('User updated');
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

function createMessage(message, loggedUser) {
    return {
        messageID: uuid.v4(),
        message: message,
        userID: loggedUser,
        createDate: Date.now(),
    };
}

module.exports = router;
