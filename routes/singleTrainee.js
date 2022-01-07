const express = require("express");
const router = express.Router();

const Trainees = require("../models/trainee.model");

router.use(express.json());

router.route(`/:email`).get((req, res) => {
	const { email } = req.body;

	Trainees.findOne({ email }, (err, user) => {
		if (!user) {
			res.status(404).send("Not working");
		} else {
			res.json(user);
		}
	});
});

module.exports = router;
