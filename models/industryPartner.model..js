const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const industryPartnerSchema = new Schema({
	userType: { type: String, default: "IndustryPartner" },
	companyName: { type: String },
	name: {
		firstName: { type: String },
		lastName: { type: String }
	},

	email: { type: String },
	password: { type: String },

	vacancies: [
		{
			vacancyType: { type: String }, //Full time or Part time
			jobTitle: { type: String }, // Software eng or data science
			location: { type: String },
			jobSummary: { type: String }
		}
	]
});

module.exports = mongoose.model("IndustryPartner", industryPartnerSchema);
