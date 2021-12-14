const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userType: { type: String, required: true },
  personalDetails: {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    gitHub: { type: String, required: true },
    linkedIn: { type: String, required: true },
    contact: {
      telNo: { type: Number, required: true },
      email: {
        email: { type: String, required: true },
        workEmail: { type: String, required: true },
      },
    },
    profileHeadline: { type: String, required: true },
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
      description: { type: String },
    },
    schoolQualifications: {
      school: { type: String, required: true },
      examType: { type: String, required: true },
      subject: { type: String, required: true },
      grade: { type: String, required: true },
      year: { type: Number, required: true },
      weight: { type: String, required: true },
      priority: { type: String, required: true },
      description: { type: String, required: true },
    },
    workExperience: {
      workExpType: { type: String },
      employer: { type: String },
      position: { type: String },
      from: { type: String },
      to: { type: String },
      weight: { type: String },
      priority: { type: Number },
      description: { type: String },
    },
    certificateAndAwards: {
      certificateType: { type: String },
      issuer: { type: String },
      award: { type: String },
      grade: { type: String },
      year: { type: String },
      weight: { type: String },
      priority: { type: String },
      description: { type: String },
    },
    portfolio: {
      title: { type: String },
      url: { type: String },
      year: { type: String },
      weight: { type: String },
      priority: { type: String },
      description: { type: String },
    },
    achievements: {
      organization: { type: String },
      title: { type: String },
      from: { type: String },
      to: { type: String },
      weight: { type: String },
      priority: { type: Number },
      description: { type: String },
    },
  },
  yourTraining: {
    trainingType: { type: String },
    learningType: { type: String },
    trainer: { type: String },
    trainingFinishDate: { type: String },
    modules: [
      {
        moduleName: { type: String },
        passStatus: {
          pass: { type: String },
          fail: { type: String },
          pending: { type: String },
        },
      },
      {
        moduleName: { type: String },
        passStatus: {
          pass: { type: String },
          fail: { type: String },
          pending: { type: String },
        },
      },
    ],
  },
  yourInfo: {
    badges: [
      {
        badgeName: { type: String },
        badgeDescp: { type: String },
      },
    ],
    scores: [
      {
        scoreName: { type: String },
        score: { type: String },
      },
    ],
    video: { type: String },
  },

  industry: {
    userType: { type: String },
    name: { type: String },
    email: { type: String },
    vacancies: [
      {
        vacancyType: { type: String },
        jobTitle: { type: String },
        location: { type: String },
        description: { type: String },
      },
      {
        vacancyType: { type: String },
        jobTitle: { type: String },
        location: { type: String },
        description: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("Users", usersSchema);
