const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bmiSchema = new Schema({
    age:{
        type:Number,
        required: true
    },
    weight:{
        type:Number,
        required: true
    },
    height:{
        type:Number,
        required: true
    },
    user_id:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Bmi',bmiSchema)