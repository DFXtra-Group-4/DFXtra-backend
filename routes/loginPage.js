const express = require("express");
const router = express.Router();
const userSchema = require("../models/trainee.model");

router.route("/").post((req, res) => {
	const { email, password } = req.body;
	userSchema.findOne({ email }, (err, user) => {
		if (user && password === user.password) {
			res.send("login successful", user);
		} else {
			res.send(`if login is wrong`);
		}
	});
});

router.route(`/`).get((req, res) => {
	res.send("this is the login page");
});

module.exports = router;
