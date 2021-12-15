const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const loginPage = require("./routes/loginPage");
const trainee = require("./routes/trainee");

const port = process.env.PORT ?? 4000;
const host = process.env.HOST ?? "localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const main = async () => {
	// console.log(`Connecting to DB @ ${process.env.DB_URI}`);
	await mongoose.connect(process.env.DB_URI);
};

app.use(cors());
app.use(`/loginPage`, loginPage);
app.use(`/trainee`, trainee);

main()
	.then(() => console.log(`Connecting to DB @ ${process.env.DB_URI}`))
	.catch(err => console.log(err));

const server = app.listen(port, host, () => {
	console.log("Server started");
	const SERVERHOST = server.address().address;
	const SERVERPORT = server.address().port;
	console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

module.exports = server;
