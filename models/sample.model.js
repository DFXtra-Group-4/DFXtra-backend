const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
	userType: { type: String, required: true },
	personalDetails: {
		name: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true }
		}
	}
});

module.exports = mongoose.model(`Sample`, sampleSchema);
