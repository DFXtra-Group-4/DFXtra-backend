const mongoose = require("mongoose");
const { emailRegExp, passwordRegex } = require(`../jsRegex/regEx`);

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, `No email supplied`],
		match: [emailRegExp, `Invalid Email format`]
	},
	password: {
		type: String,
		required: [true, "No password supplied"],
		validator: value => {
			return value.length > 4;
		},
		message: "password not long enough. Should be greater than 4 characters",
		match: [passwordRegex, `password doesn't meet requirements`]
	},
	roles: [
		{
			//type: mongoose.Schema.Types.ObjectId,
			type: String,
			ref: "Role"
		}
	]
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
