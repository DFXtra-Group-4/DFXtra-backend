const Trainees = require("../models/trainee.model");
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
		it("/should not update the fields on the database if the data supplied is bad data", async () => {
			const profileToBeUpdated = testDataArray[0];
			const updateTheProfile = {
				"firstname": "TestData",
				"lastName": "DataTest",
				"personalEmail": "testemail@test.com",
				"workEmail": "workEmail@df.com",
				"gitHub": "https://github.com/TesTperson",
				"linkedIn": "https://www.linkedin.com/in/test-person-123456/",
				"telNo": "+447911123456",
				"gender": "male",
				"personalityType": "INTJ-Architect",
				"nationality": "United_Kingdom"
			};

			const res = await chai
				.request(server)
				.put(`/trainee/${profileToBeUpdated._id}/edit`)
				.send(updateTheProfile);

			expect(res).to.have.status(400);
			expect(res.text).to.be.a(`string`).eql(`Update not possible.`);
		});

		it(`/should validate the input and not allow fields that don't meet minimum requirements or are invalid inputs `, async () => {
			const profileToBeUpdated = testDataArray[1];
			const updateTheProfile = {
				"firstName": "TestName",
				"lastName": "DataTest",
				"personalEmail": "testemail@test.com",
				"workEmail": "workEmail@df.com",
				"gitHub": "https://github/TesTperson",
				"linkedIn": "https://www.linkedin/in/test-person-123456/",
				"telNo": "07911123",
				"gender": "male",
				"personalityType": "INTJ-Architect",
				"nationality": "United_Kingdom"
			};
			const res = await chai
				.request(server)
				.put(`/trainee/${profileToBeUpdated._id}/edit`)
				.send(updateTheProfile);

			expect(res).to.have.status(400);
			expect(res.text).to.be.a(`string`).eql(`Update not possible.`);
		});

		it("/should update the given profile by id", async () => {
			const profileToBeUpdated = testDataArray[1];
			const updateTheProfile = {
				"firstName": "TestName",
				"lastName": "DataTest",
				"personalEmail": "testemail@test.com",
				"workEmail": "workEmail@df.com",
				"gitHub": "https://github.com/TesTperson",
				"linkedIn": "https://www.linkedin.com/in/test-person-123456/",
				"telNo": "07911123456",
				"gender": "male",
				"personalityType": "INTJ-Architect",
				"nationality": "United_Kingdom"
			};
			const res = await chai
				.request(server)
				.put(`/trainee/${profileToBeUpdated._id}/edit`)
				.send(updateTheProfile);

			expect(res).to.have.status(200);
			expect(res.body).to.be.a(`string`).eql(`Profile updated!`);
		});
	});
});
