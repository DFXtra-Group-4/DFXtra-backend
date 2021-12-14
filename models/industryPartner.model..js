const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const industryPartnerSchema = new Schema({
	industryPartnerId: { type: String },
	userType: { type: String },
	name: { type: String },
	email: { type: String },
	vacancies: [
		{
			vacancyType: { type: String },
			jobTitle: { type: String },
			location: { type: String },
			description: { type: String }
		}
	]
});

module.exports = mongoose.model("IndustryPartner", traineesSchema);
