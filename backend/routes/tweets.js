var express = require('express');
var router = express.Router();

var MessageValidator = require('../models/Message.js');

const messages = [
    {
        messageID: '1234567890abcdef',
        message: 'Este é um exemplo de mensagem com o usuário exampleUser.',
        userID: 'exampleUser',
        createDate: Date.now(),
    },
];

/* GET users listing. */
router.get('/', (req, res) => {
    res.send(messages);
});

/* POST request for creating a tweet. */
router.post('/', isLoggued, MessageValidator, (req, res) => {
    messages.push(req.body);

    res.send('Message sent succesfully');
});

function isLoggued(req, res, next) {
    if (!req.session.user) {
        res.status(403).send('User is not loggued');
    }

    next();
}

module.exports = router;
