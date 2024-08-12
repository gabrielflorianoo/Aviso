var express = require('express');
var router = express.Router();
const uuid = require('uuid');

var { ValidateMessage } = require('../models/Message.js');

const messages = [
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
];

const privateMessages = [];

/* GET messages listing. */
router.get('/globalMessages', (req, res) => {
    res.send(messages);
});

/* POST request for creating a post. */
router.post('/', isLoggued, ValidateMessage, (req, res) => {
    messages.push(req.body);

    res.send('Message sent succesfully');
});

router.get('/privateMessages', (req, res) => {
    res.send(privateMessages);
});

/* POST request for creating a private post. */
router.post('/privateMessages', isLoggued, ValidateMessage, (req, res) => {
    let usersToFind1 = `${req.body.sender}_${req.body.toUser}`;
    let usersToFind2 = `${req.body.toUser}_${req.body.sender}`;

    let message = createMessage(req.body.message, req.body.userID);

    let found = privateMessages.find((pvrM) => pvrM.from == usersToFind1 || usersToFind2);
    if (!found) {
        privateMessages.push({
            from: `${req.body.sender}_${req.body.toUser}`, // Makes from tag specific
            messages: [message],
        });
    } else {
        found.messages.push(message);
    }

    res.send('Message sent succesfully');
});

function createMessage(message, userID) {
    return {
        messageID: uuid.v4(),
        message: message,
        userID: userID,
        createDate: Date.now(),
    };
}

function isLoggued(req, res, next) {
    if (!req.session.user) {
        res.status(403).send('User is not loggued');
    }

    next();
}

module.exports = router;
