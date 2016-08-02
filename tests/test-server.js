var chai = require('chai');
var chaiHttp = require('chai-http');
var faker = require('faker');

var should = chai.should();
var server = require('../index');

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';
console.log('server_path', process.env.NODE_ENV);

describe('workouts-api', function () {
  it('should add a single workout to the database using /api/workouts/add_workout POST\n' +
    'should then remove workout from the db using /api/workouts/remove_workout POST', function (done) {
    let workout_name = faker.random.word();
    let author_name = faker.fake('{{name.firstName}} {{name.lastName}}');
    let workout_id;
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
        res.body.workout.should.have.property('_id');
        res.body.workout.should.have.property('workout_name');
        res.body.workout.should.have.property('author');
        workout_id = res.body.workout._id;
        res.body.workout.workout_name.should.equal(workout_name);
        res.body.workout.author.should.equal(author_name);
      });
    chai.request(server)
      .post('/api/workouts/remove_workout')
      .send({
        workout_id: workout_id
      })
      .end(function (err, res) {
        console.log('status_test: ', res.status);
        res.should.have.status(200);
        done();
      });
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

describe('exercises-api', function () {
  it('should add a single exercise to the database using /api/exercises/add_exercise POST\n' +
    'should then remove exercise from the db using /api/exercises/remove_exercise POST', function (done) {
    let exercise_name = faker.random.word();
    let author_name = faker.fake('{{name.firstName}} {{name.lastName}}');
    let exercise_id;
    chai.request(server)
      .post('/api/exercises/add_exercise')
      .send({
        exercise_name: exercise_name,
        author: author_name,
      })
      .end(function (err, res) {
        console.log(res);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('exercise');
        res.body.exercise.should.have.property('_id');
        res.body.exercise.should.have.property('exercise_name');
        res.body.exercise.should.have.property('author');
        exercise_id = res.body.exercise._id;
        res.body.exercise.exercise_name.should.equal(exercise_name);
        res.body.exercise.author.should.equal(author_name);
      });
    chai.request(server)
      .post('/api/exercises/remove_exercise')
      .send({
        exercise_id: exercise_id
      })
      .end(function (err, res) {
        console.log('status_test: ', res.status);
        res.should.have.status(200);
        done();
      });
  });
  it('should return all exercises in the database using /api/exercises GET', function (done) {
    chai.request(server)
      .get('/api/exercises')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
});