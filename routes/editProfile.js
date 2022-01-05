const express = require("express");
const router = express.Router();
const { check, validationResult } = require(`express-validator`);

const Trainees = require("../models/trainee.model");

const { phoneNumberRegExp, linkedInRegex, gitHubRegEx } = require("../jsRegex/regEx");
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
	.put(
		[
			check("personalDetails.name.firstName").isLength({ min: 2 }),
			check("personalDetails.name.lastName").isLength({ min: 2 })
			// check("personalDetails.gitHub").exists().matches(gitHubRegEx),
			// check("personalDetails.linkedIn").exists().matches(linkedInRegex),
			// check("personalDetails.contact.telNo").exists().matches(phoneNumberRegExp)
		],
		(req, res) => {
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return res.status(400).json({
			// 		"message": `There were errors when updating data`,
			// 		"error": errors.array()
			// 	});
			// }
			const id = req.params.id;
			Trainees.findById(id, (error, trainee) => {
				if (!trainee) {
					res.status(404).send("Not working");
				} else {
					const pDetails = trainee.personalDetails;
					pDetails.name.firstName = req.body.firstName;
					pDetails.name.lastName = req.body.lastName;
					pDetails.contact.email.email = req.body.personalEmail;
					pDetails.contact.email.workEmail = req.body.workEmail;
					pDetails.gitHub = req.body.gitHub;
					pDetails.linkedIn = req.body.linkedIn;
					pDetails.contact.telNo = req.body.telNo;

					trainee
						.save()
						.then(trainee => {
							res.json(`Profile updated!`);
						})
						.catch(err => res.status(400).send(`Update not possible.`));
				}
			});
		}
	);

module.exports = router;
