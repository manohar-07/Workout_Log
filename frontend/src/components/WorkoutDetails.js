import React from 'react'
import { useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
//date fns 

function WorkoutDetails(props) {

  const formatCreatedAt=(dateString)=> {
    const createdAt = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = createdAt.toDateString() === today.toDateString();
    const isYesterday = createdAt.toDateString() === yesterday.toDateString();
    
    if (isToday) {
        return "Today";
    } else if (isYesterday) {
        return "Yesterday";
    } else {
        const day = String(createdAt.getDate()).padStart(2, '0');
        const month = String(createdAt.getMonth() + 1).padStart(2, '0');
        const year = createdAt.getFullYear();
        return `${day}-${month}-${year}`;
    }
}
const createdAt = new Date(props.workout.createdAt);
    const hours = String(createdAt.getHours()).padStart(2, '0');
    const minutes = String(createdAt.getMinutes()).padStart(2, '0');
    const seconds = String(createdAt.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;


  const {dispatch}=useWorkoutsContext()
  const {user} = useAuthContext()
  
  const handleClick= async ()=>{
    if(!user){
      return
    }
    const response = await fetch('/api/workouts/'+ props.workout._id,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }

  }
  return (

    <div className='workout-details'>
      <p id='workout-date'>{formatCreatedAt(props.workout.createdAt)}</p><p id='workout-time'>{time}</p>
    { props.exercise && props.exercise.map(exercise =>(
      <div key={exercise._id}>
        <h4>{exercise.title}</h4>
        <p><strong>Load (kg): {exercise.load}</strong></p>
        <p><strong>Reps: {exercise.reps}</strong></p>
        <span className='material-symbols-outlined' onClick={handleClick} >delete</span>
      </div>
      
     ))}
     </div>

  )
}

export default WorkoutDetails
