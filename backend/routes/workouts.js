const express=require('express')
const Workout=require('../models/workoutModel')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}=require('../controllers/workoutController')  //controllers to the routes
const requireAuth = require('../middleware/requireAuth')


const router =express.Router()

//require auth for all workout routes
router.use(requireAuth)  //middleware


//get all workouts
router.get('/',getWorkouts)

//get single workout
router.get('/:id',getWorkout)

//post a workout
router.post('/',createWorkout )

//delete a workout
router.delete('/:id',deleteWorkout)

//update single workout
router.patch('/:id',updateWorkout)

module.exports=router 