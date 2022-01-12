const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const industryPartnerSchema = new Schema({
	userType: { type: String, default: "IndustryPartner" },
	companyName: { type: String },
	field: { type: String },
	companySize: { type: Number },
	address: { type: String },
	email: { type: String },
	about: { type: String },
	logo: { type: String },
	rolesAvailable: { type: Number },
	companyWebsite: { type: String },
	vacancies: [
		{
			vacancyType: { type: String }, //Full time or Part time
			salary: { type: String },
			jobTitle: { type: String }, // Software eng or data science
			location: { type: String },
			jobDescription: { type: String },
			logo: { type: String }
		}
	],
	salary: { type: String }
});

module.exports = mongoose.model("IndustryPartner", industryPartnerSchema);
