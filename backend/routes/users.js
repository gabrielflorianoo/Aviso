var express = require("express");
var router = express.Router();
const UserValidator = require("../models/User.js");

const users = [
	{
		username: "exampleUser",
		email: "user@example.com",
		password: "P@ssw0rd123",
	},
];

/* GET users listing. */
router.get("/", (req, res) => {
	req.session.user = users[0];
	res.send(users);
});

/* POST request for creating a user. */
router.post("/register", UserValidator, checkDuplicates, (req, res) => {
	users.push(req.body);

	req.session.user = req.body;
	console.log(req.session.user);

	res.send("User validated and created");
});

/* POST request for logging. */
router.post("/login", UserValidator, (req, res) => {
	const found = users.filter(
		(user) =>
			user.username == req.body.username &&
			user.email == req.body.email &&
			user.password == req.body.password
	);

	if (!found) {
		res.status(413).send("User not found");
	}

	req.session.user = req.body;
	res.send("User found");
});

function checkDuplicates(req, res, next) {
	const duplicate = users.filter(
		(user) =>
			user.username == req.body.username || user.email == req.body.email
	);

	if (duplicate.length > 0) {
		return res.status(401).send("User already exists");
	}

	next();
}

module.exports = router;
