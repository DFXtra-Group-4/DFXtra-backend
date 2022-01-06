const express = require("express");

const router = express.Router();
const { check, validationResult } = require(`express-validator`);

const User = require("../models/user.model");

router.route(`/`).post(
	[check("email").exists().isEmail(), check("password").exists()],

	(req, res) => {
		const errors = validationResult(req);
		console.log("Receiving");
		if (!errors.isEmpty()) {
			return res.status(422).json({
				"message": `There were errors in the sign up data`,
				"error": errors.array()
			});
		}
		const { email, password } = req.body;

		User.findOne({ email }, (err, user) => {
			if (user && password === user.password) {
				res.send({ message: `Login success`, user });
			} else {
				res.send({ message: `Details not found` });
			}
		});
	}
);

module.exports = router;
