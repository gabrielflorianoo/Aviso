const Joi = require('joi');
const uuid = require('uuid');

const UserSchema = Joi.object({
    messageID: Joi.string().required(),
    message: Joi.string().min(1).max(300).required(),
    userID: Joi.string().min(3).max(30).required(),
    createDate: Joi.date().required(),
    toUser: Joi.string().max(30).allow(''), // Permite strings vazias
});

function ValidateMessage(req, res, next) {
    // The Id of the user must be its username
    req.body.messageID = uuid.v4();
    req.body.userID = req.session.user.username;
    req.body.createDate = new Date();
    if (!req.body.toUser) {
        req.body.toUser = '';
    }

    const { error } = UserSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message); // Usar 400 para erros de validação
    }

    next();
}

module.exports = ValidateMessage;
