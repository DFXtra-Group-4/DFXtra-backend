const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const industryPartnerSchema = new Schema({
	userType: { type: String, default: "IndustryPartner" },
	companyName: { type: String },
	email: { type: String },
	vacancies: [
		{
			vacancyType: { type: String }, //Full time or Part time
			jobTitle: { type: String }, // Software eng or data science
			location: { type: String },
			jobDescription: { type: String }
		}
	]
});

module.exports = mongoose.model("IndustryPartner", industryPartnerSchema);
