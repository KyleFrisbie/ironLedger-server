const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

const Authentication = require('./controllers/authentication');
const WorkoutsAPI = require('./controllers/api/workouts_api');
const ExercisesAPI = require('./controllers/api/exercises_api');
const passportService = require('./services/passport');

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'});
    });
    // user authentication
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    
    // workout api
    app.get('/api/workouts', WorkoutsAPI.getAllWorkouts);
    app.post('/api/workouts/add_workout', WorkoutsAPI.insertWorkout);
    app.post('/api/workouts/remove_workout', WorkoutsAPI.removeWorkout);
    
    // exercise api
    app.get('/api/exercises', ExercisesAPI.getAllExercises);
    app.post('/api/exercises/add_exercise', ExercisesAPI.insertExercise);
    app.post('/api/exercises/remove_exercise', ExercisesAPI.removeExercise);
};