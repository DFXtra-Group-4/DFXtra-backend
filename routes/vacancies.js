const express = require("express");
const router = express.Router();

const IndustryPartner = require("../models/industryPartner.model");

router.use(express.json());

router.route(`/`).get((req, res) => {
	IndustryPartner.find((error, vacancies) => {
		error ? res.status(404).send("not found") : res.json(vacancies);
	});
});

module.exports = router;
