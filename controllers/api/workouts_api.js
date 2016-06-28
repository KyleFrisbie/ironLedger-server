const Workout = require('../../models/workout_model');

exports.getAllWorkouts = function (req, res, next) {
   const workouts = Workout.find(function(err, workouts) {
      if (err) {
         return next(err);
      }
      return res.json({workouts});
   });
};

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
   });
   res.send({workout});
};


exports.removeWorkout = function (req, res, next) {
   const _id = req.body.workout_id;
   Workout.findByIdAndRemove(_id, function (err, workout) {
      if (err) {
         return next(err);
      }
      return res.json({workout});
   });
};