const Trainees = require("../models/trainee.model");
// const Sample = require("../models/sample.model");
const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const { expect } = require(`chai`);
const server = require(`../server`);

const testData = require("../sampleData.json");

const testDataArray = testData.trainees;

chai.use(chaiHttp);

describe(`Test of retrieving trainees`, () => {
	beforeEach(async () => {
		await Trainees.deleteMany()
			.then(() => console.log(`Database cleared`))
			.catch(error => {
				console.log(`Error clearing`);
				throw new Error();
			});
		await Trainees.insertMany(testDataArray)
			.then(() => console.log(`Database populated with sampleTrainerData`))
			.catch(error => {
				console.log(`Error inserting`);
				throw new Error();
			});
	});
	it(`/GET test on home route should return sampleData`, async () => {
		await chai.request(server).get(`/`).send();
	});
});
