const Workout=require('../models/workoutModel')
const mongoose = require('mongoose')



//get all workouts
const getWorkouts= async(req,res)=>{
    const user_id = req.user._id
     const workouts= await Workout.find({user_id}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


//get a single workout
const getWorkout=async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout= await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:'NO SUCH WORKOUT'})
    }
    else{
        return res.status(200).json(workout)
    }
}


// Create a new workout bundle
const createWorkout = async (req, res) => {
    const { exercises } = req.body;

    // Handling error
    let emptyFields = [];
    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
        emptyFields.push('exercises');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'add exercise', emptyFields });
    }

    // Add doc to db
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ exercises, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





//delete a workout
const deleteWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout = await Workout.findByIdAndDelete(id)
    if(!workout){
        return res.status(404).json({error:'NO SUCH WORKOUT'})
    }
    else{
        return res.status(200).json(workout)
    }
    
}

//update workout
const updateWorkout= async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    },{new:true})
    if(!workout){
        return res.status(404).json({error:'NO SUCH WORKOUT'})
    }
    else{
        return res.status(200).json(workout)
    }


}


module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}