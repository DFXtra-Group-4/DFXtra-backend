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

	describe(`/GET data`, () => {
		it(`/should return all of the data as an array`, async () => {
			const res = await chai.request(server).get(`/trainees`).send();

			expect(res).to.have.status(200);
			expect(res.body).to.be.an(`array`);
			expect(res.body.length).to.be.eql(testDataArray.length);
		});
	});

	describe("/Put data", () => {
		it("/should update the given profile by id", async () => {
			const profileToBeUpdated = testDataArray[0];
			profileToBeUpdated.personalDetails.name.firstName = "Test";
			profileToBeUpdated.personalDetails.name.lastName = "Data";

			const sendData = {
				"firstName": "Data",
				"lastName": "Test"
			};

			console.log(profileToBeUpdated._id);
			const res = await chai
				.request(server)
				.put(`/trainee/${profileToBeUpdated._id}/edit`)
				.send(sendData);

			expect(res).to.have.status(200);
			console.log(res.body);
			expect(res.body).to.be.a(`string`).eql(`Profile updated!`);
		});
	});
});
