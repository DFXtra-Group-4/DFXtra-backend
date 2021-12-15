const express = require("express");
const router = express.Router();

const Trainees = require("../models/trainee.model");

router.use(express.json());

router.route(`/:id`).get((req, res) => {
	const id = req.params.id;

	Trainees.findById(id, (error, trainee) => {
		if (!trainee) {
			res.status(404).send("Not working");
		} else {
			res.json(trainee);
		}
	});
});

module.exports = router;
