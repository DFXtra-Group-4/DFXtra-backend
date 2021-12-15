const express = require("express");
const router = express.Router();

const Trainees = require("../models/trainee.model");

router.use(express.json());

router
	.route(`/:id/edit`)
	.get((req, res) => {
		const id = req.params.id;
		Trainees.findById(id, (error, trainee) => {
			if (!trainee) {
				res.status(404).send("Not working");
			} else {
				res.json(trainee);
			}
		});
	})
	.put((req, res) => {
		const id = req.params.id;
		Trainees.findById(id, (error, trainee) => {
			if (!trainee) {
				res.status(404).send("Not working");
			} else {
				trainee.personalDetails.name.firstName = req.body.firstName;
				trainee.personalDetails.name.lastName = req.body.lastName;

				trainee
					.save()
					.then(trainee => {
						res.json(`Profile updated!`);
					})
					.catch(err => res.status(400).send(`Update not possible.`));
			}
		});
	});

module.exports = router;
