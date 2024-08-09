const Joi = require("joi");

// Definindo o padrão de senha com uma expressão regular correta
const pattern =
	/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.%*?&])[A-Za-z\d$@$!%*?&.]{8,20}/;

const UserSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().pattern(pattern).min(8).max(20).required(),
});

const UserLoginSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
	password: Joi.string().pattern(pattern).min(8).max(20).required(),
});

function ValidateUser(req, res, next) {
	const { error } = UserSchema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message); // Use 400 para erros de validação
	}

	next();
}

function ValidateUserLogin(req, res, next) {
	const { error } = UserLoginSchema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message); // Use 400 para erros de validação
	}

	next();
}

module.exports = {
	ValidateUser,
	ValidateUserLogin,
};
