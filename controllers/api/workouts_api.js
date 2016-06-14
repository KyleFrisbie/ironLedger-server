const Workout = require('../../models/workout_model');

exports.getAllWorkouts = function (req, res, next) {
   const workouts = Workout.find();
   return res.json({workouts});
}

exports.insertWorkout = function (req, res, next) {
   const workout_name = req.body.workout_name;
   const author = req.body.author;
   const workout = new Workout({
      workout_name,
      author
   });
   workout.save(function (err) {
      if (err) {
         return next(err)
      }
   })
   res.send({workout});
}