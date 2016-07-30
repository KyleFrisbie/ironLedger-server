var chai = require('chai');
var chaiHttp = require('chai-http');
var faker = require('faker');

var should = chai.should();
var server = require('../index');

chai.use(chaiHttp);

process.env.NODE_EN = 'test';

describe('workouts-api', function () {
	it('should add a single workout to the database using /api/workouts/add_workout POST', function (done) {
		let workout_name = faker.random.word();
		let author_name = faker.fake('{{name.firstName}}, {{name.lastName}}');
		chai.request(server)
			.post('/api/workouts/add_workout')
			.send({
				workout_name: workout_name,
				author: author_name,
			})
			.end(function (err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('workout');
				res.body.workout.should.have.property('workout_name');
				res.body.workout.should.have.property('author');
				//res.body.workout_name.should.have.property()
				done();
			})
	});
	it('should return all workouts in the database using /api/workouts GET', function (done) {
		chai.request(server)
			.get('/api/workouts')
			.end(function (err, res) {
				res.should.have.status(200);
				done();
			});
	});
});