const mongoose=require('mongoose')

const Schema = mongoose.Schema

//schema defines the structure of the collection
const exerciseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    }
})

const workoutSchema = new Schema({
    exercises:[exerciseSchema],
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Workout',workoutSchema) 