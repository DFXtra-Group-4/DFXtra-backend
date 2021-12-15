const express = require("express");
const router = express.Router();

const Trainees = require("../models/trainee.model");

router.use(express.json());

router.route(`/`).get((req, res) => {
	Trainees.find((error, trainees) => {
		error ? res.status(404).send("not found") : res.json(trainees);
	});
});

module.exports = router;
