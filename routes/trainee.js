const express = require("express");
const router = express.Router();
// import userSchema from "../models/user.model";

const traineeSchema = require("../models/trainee.model");

router.use(express.json());

router.route(`/:id`).get((req, res) => {
	const id = req.params.id;
	// console.dir(traineeSchema);
	// res.send(`obtaining trainee with an id ${id}`);
	traineeSchema.findById(id, (error, trainee) => {
		if (!trainee) {
			res.status(404).send("Not working");
		} else {
			// console.dir(res.json(trainee));
			res.json(trainee);
		}
	});
});

module.exports = router;
