var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect();
var server = require('../index');

chai.use(chaiHttp);

describe('workouts-api', function () {
    it('should return all workouts in the database using /api/workouts GET', function (done) {
        chai.request(server)
            .get('/api/workouts')
            .end(function (err, res) {
                res.expect.status(200);
                done();
            });
    });
    //it('should add a single workout to the database');
});