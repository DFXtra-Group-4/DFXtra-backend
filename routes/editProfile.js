const express = require("express");
const router = express.Router();
const { check, validationResult } = require(`express-validator`);

const Trainees = require("../models/trainee.model");

const {
  phoneNumberRegExp,
  linkedInRegex,
  gitHubRegEx,
} = require("../jsRegex/regEx");
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
      check("personalDetails.name.lastName").isLength({ min: 2 }),
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
          pDetails.name = {
            firstName: req.body.firstName ?? pDetails.name.firstName,
            lastName: req.body.lastName ?? pDetails.name.lastName,
          };
          pDetails.contact = {
            email: {
              email: req.body.personalEmail ?? pDetails.contact.email.email,
              workEmail: req.body.workEmail ?? pDetails.contact.email.workEmail,
            },
            telNo: req.body.telNo ?? pDetails.contact.telNo,
          };
          pDetails.gitHub = req.body.gitHub ?? pDetails.gitHub;
          pDetails.linkedIn = req.body.linkedIn ?? pDetails.linkedIn;
          pDetails.gender = req.body.gender ?? pDetails.gender;
          pDetails.personalityType =
            req.body.personalityType ?? pDetails.personalityType;
          pDetails.nationality = req.body.nationality ?? pDetails.nationality;

          let schoolQs = req.body.schoolQualifications;
          if (schoolQs) {
            trainee.personalStory.schoolQualifications.push({
              school: schoolQs?.school,
              examType: schoolQs?.examType,
              subject: schoolQs?.subject,
              grade: schoolQs?.grade,
              year: schoolQs?.year,
              weight: schoolQs?.weight,
              priority: schoolQs?.priority,
              description: schoolQs?.description,
            });
          }
          trainee
            .save()
            .then((trainee) => {
              res.json(`Profile updated!`);
            })
            .catch((err) => res.status(400).send(`Update not possible.`));
        }
      });
    }
  );

module.exports = router;
