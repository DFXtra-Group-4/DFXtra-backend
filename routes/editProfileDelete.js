const express = require("express");
const router = express.Router();

const Trainees = require("../models/trainee.model");
router.use(express.json());

router
  .route(`/:email/edit/delete`)
  .get((req, res) => {
    const { email } = req.params;
    Trainees.findOne(
      { "personalDetails.contact.email.workEmail": email },
      (err, user) => {
        if (!user) {
          res.status(404).send("Not working");
        } else {
          res.json(user);
        }
      }
    );
  })
  .put((req, res) => {
    const { email } = req.params;
    Trainees.findOne(
      { "personalDetails.contact.email.workEmail": email },
      (error, trainee) => {
        if (!trainee) {
          res.status(404).send(`Not found`);
        } else {
          const sQs = trainee.personalStory.schoolQualifications;
          const specific = sQs.filter((sQs) => sQs._id != id);
          if (specific) {
            trainee.personalStory.schoolQualifications = specific;
          }
          trainee
            .save()
            .then((trainee) => {
              res.json("specific");
            })
            .catch((err) => res.status(400).send(`Update not possible.`));
        }
      }
    );
  });

module.exports = router;
