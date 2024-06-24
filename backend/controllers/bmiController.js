const Bmi=require('../models/bmiModel')



//get bmi
const getBmi= async(req,res)=>{
    const user_id = req.user._id
     const bmi= await Bmi.findOne({user_id})

    res.status(200).json(bmi)
}


//create a new workout
const calculateBmi = async(req,res)=>{
    const {age,weight,height}=req.body

    //handleing error
    let emptyFields=[]
    if(!age){
        emptyFields.push('age')
    }
    if(!weight){
        emptyFields.push('weight')
    }
    if(!height){
        emptyFields.push('height')
    }

    if(emptyFields.length >0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }

    // add doc to db
    try{
        const user_id =req.user._id
        const deleted=await Bmi.findOneAndDelete({user_id:user_id})
        if(deleted){
            const bmi= await Bmi.create({age,weight,height,user_id})
            res.status(200).json(bmi)
        }else{
            const bmi= await Bmi.create({age,weight,height,user_id})
            res.status(200).json(bmi)
        }
        // const bmi= await Bmi.create({age,weight,height,user_id})
        // res.status(200).json(bmi)
        
    }catch(error){
        res.status(400).json({error:error.message})
    }
}



module.exports={
    calculateBmi,
    getBmi
}