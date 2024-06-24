import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [exercises, setExercises] = useState([])
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleAddExercise = async (e) => {
    e.preventDefault()

    const newExercise = { title, load, reps }
    const currentEmptyFields = []

    if (!newExercise.title) {
      currentEmptyFields.push('title')
    }
    if (!newExercise.load) {
      currentEmptyFields.push('load')
    }
    if (!newExercise.reps) {
      currentEmptyFields.push('reps')
    }

    if (currentEmptyFields.length > 0) {
      setEmptyFields(currentEmptyFields)
      setError('Please fill in all the fields')
      return
    }

    setExercises(prevExercise => [...prevExercise, newExercise])
    setTitle('')
    setLoad('')
    setReps('')
    setEmptyFields([])
    setError(null)
  }

  const handleAddWorkout = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    if (title !== '' && load !== '' && reps !== '') {
      const exercise = { title, load, reps }
      const updatedExercises = [...exercises, exercise]
      setExercises(updatedExercises)
      
      // Clear the input fields
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      setError(null)

      // Create workout object with updated exercises
      const workout = { exercises: updatedExercises }
      console.log(workout)
      
      // Send workout to the backend
      submitWorkout(workout)
    } else {
      // If there are no pending exercises to add, use the existing exercises state
      const workout = { exercises }

      // Send workout to the backend
      submitWorkout(workout)
    }
  }

  const submitWorkout = async (workout) => {
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error || 'Failed to create workout')
        setEmptyFields(json.emptyFields || [])
      } else {
        setExercises([]) // Clear exercises after successfully creating workout
        setError(null)
        dispatch({ type: 'CREATE_WORKOUT', payload: json })
      }
    } catch (error) {
      setError('Failed to connect to server')
      console.error('Error creating workout:', error)
    }
  }

  return (
    <form className="workout-form">
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button className="add-exercise-button" onClick={handleAddExercise}>Add Exercise</button>
      <button className="add-workout-button" onClick={handleAddWorkout}>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
