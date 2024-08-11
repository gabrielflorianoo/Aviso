var express = require('express');
var router = express.Router();
const UserValidator = require('../models/User.js');

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
    },
];

/* GET users listing. */
router.get('/', (req, res) => {
    req.session.user = users[0];
    res.send(users);
});

/* GET messages from that user */
router.get('/:username', (req, res) => {
    let found = users.find((user) => (user.username = req.params.username));

    res.send(found);
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
    // Encontrar o usuário pelo nome de usuário fornecido na URL
    let user = users.find((user) => user.username === req.params.username);

    // Verificar se o usuário existe
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Verificar se o usuário possui mensagens privadas
    let privateMessages = user.privateMessages || {};
    let messages = privateMessages.messages || [];

    // Adicionar a nova mensagem
    if (!privateMessages.name) {
        privateMessages.name = req.body.sender; // Definir o nome do remetente
    }
    messages.push(req.body.message); // Adicionar a nova mensagem à lista de mensagens

    // Atualizar o objeto privateMessages no usuário
    privateMessages = {
        name: privateMessages.name, // Manter o nome do remetente
        messages: messages, // Atualizar a lista de mensagens
    };

    let idx = users.findIndex((toFind) => toFind == user);

    // Atualizar o usuário com as novas mensagens
    users[idx] = {
        username: user.username,
        email: user.email,
        password: user.password,
        privateMessages: privateMessages,
    };

    // Aqui você deve salvar o usuário atualizado no seu banco de dados
    // Exemplo: await saveUser(user); // Salve o usuário atualizado no banco de dados

    res.send('User updated');
});

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
