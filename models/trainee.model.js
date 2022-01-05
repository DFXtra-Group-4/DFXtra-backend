const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const { emailRegExp, phoneNumberRegExp, linkedInRegex, gitHubRegEx } = require(`../jsRegex/regEx`);

const traineesSchema = new Schema({
	userType: { type: String, default: "Graduate" },
	personalDetails: {
		name: {
			firstName: {
				type: String,
				required: [true, "No firstName supplied"],
				validate: {
					validator: value => {
						return value.length > 1;
					},
					message: "first name not long enough"
				}
			},
			lastName: {
				type: String,
				required: [true, "No lastName supplied"],
				validate: {
					validator: value => {
						return value.length > 1;
					},
					message: "last name not long enough"
				}
			}
		},
		gitHub: { type: String, required: true, match: [gitHubRegEx, "Not valid link"] },
		linkedIn: { type: String, required: true, match: [linkedInRegex, "Not valid link"] },
		contact: {
			telNo: {
				type: Number,
				match: [phoneNumberRegExp, `Invalid phone number supplied`],
				required: false
			},
			email: {
				email: {
					type: String,
					required: [true, "No email supplied"],
					match: [emailRegExp, `Invalid Email format`]
				},
				workEmail: {
					type: String,
					required: [true, "No email supplied"],
					match: [emailRegExp, `Invalid Email format`]
				}
			}
		},
		profileHeadline: { type: String, required: true },
		gender: { type: String, required: true },
		nationality: { type: String, required: true },
		personalityType: { type: String, required: true }
	},
	personalStory: {
		degree: {
			university: { type: String, required: true },
			subject: { type: String, required: true },
			degreeLevel: { type: String, required: true },
			grade: { type: String, required: true },
			from: { type: String, required: true },
			to: { type: String, required: true },
			weight: { type: String },
			priority: { type: Number },
			description: { type: String }
		},

		schoolQualifications: [
			{
				school: { type: String, required: true },
				examType: { type: String, required: true },
				subject: { type: String, required: true },
				grade: { type: String, required: true },
				year: { type: Number, required: true },
				weight: { type: String, required: true },
				priority: { type: String, required: true },
				description: { type: String, required: true }
			}
		],
		workExperience: [
			{
				workExpType: { type: String },
				employer: { type: String },
				position: { type: String },
				from: { type: String },
				to: { type: String },
				weight: { type: String },
				priority: { type: Number },
				description: { type: String }
			}
		],
		certificatesAndAwards: [
			{
				certificateType: { type: String },
				issuer: { type: String },
				award: { type: String },
				grade: { type: String },
				year: { type: String },
				weight: { type: String },
				priority: { type: Number },
				description: { type: String }
			}
		],
		portfolio: [
			{
				title: { type: String },
				url: { type: String },
				year: { type: String },
				weight: { type: String },
				priority: { type: String },
				description: { type: String }
			}
		],
		achievements: [
			{
				organization: { type: String },
				title: { type: String },
				from: { type: String },
				to: { type: String },
				weight: { type: String },
				priority: { type: Number },
				description: { type: String }
			}
		]
	},
	yourTraining: {
		trainingPath: { type: String },
		cohort: { type: String },
		trainer: { type: String },
		trainingFinishDate: { type: String },
		modules: [
			{
				moduleName: { type: String },
				passStatus: {
					pass: { type: String },
					fail: { type: String },
					pending: { type: String }
				}
			},
			{
				moduleName: { type: String },
				passStatus: {
					pass: { type: String },
					fail: { type: String },
					pending: { type: String }
				}
			}
		]
	},
	yourInfo: {
		badges: [
			{
				badgeName: { type: String },
				badgeDescp: { type: String }
			}
		],
		scores: [
			{
				scoreName: { type: String },
				score: { type: String }
			}
		]
	}
});

module.exports = mongoose.model("Trainees", traineesSchema);
