const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("dotenv").config();

//RouteCs
const loginPage = require("./routes/loginPage");
const singleTrainee = require("./routes/singleTrainee");
const allTrainees = require("./routes/AllTrainees");
const editProfile = require("./routes/editProfile");
const vacancies = require("./routes/vacancies");
const editProfileDelete = require("./routes/editProfileDelete");

const port = process.env.PORT ?? 4000;
const host = process.env.HOST ?? "0.0.0.0";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const main = async () => {
	await mongoose.connect(
		// console.log(
		// 	`${process.env.DBPROTOCOL}://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DB}?${process.env.DBOPTIONS}`
		`${process.env.DBPROTOCOL}://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DB}?${process.env.DBOPTIONS}`
	);
};

app.use(cors());
app.use(`/login`, loginPage);
app.use(`/trainee`, singleTrainee);
app.use("/trainees", allTrainees);
app.use("/trainee", editProfile);
app.use(`/vacancies`, vacancies);
app.use(`/trainee`, editProfileDelete);
//app.get(`/`, (req, res) => res.send(`Hello World`));

main()
	.then(() =>
		console.log(
			`Connecting to DB @ ${process.env.DBPROTOCOL}://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DB}?${process.env.DBOPTIONS}`
		)
	)
	.catch(err => console.log(err));

const server = app.listen(port, host, () => {
	console.log("Server started");
	const SERVERHOST = server.address().address;
	const SERVERPORT = server.address().port;
	console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

module.exports = server;
