import React, { useState } from 'react'
import {useBmiContext} from '../hooks/useBmiContext'
import { useAuthContext } from '../hooks/useAuthContext';

function BmiForm() {
  const {user}= useAuthContext()
  const {dispatch} = useBmiContext()
  const [age,setAge]=useState('null');
  const [weight,setWeight]=useState('null');
  const [height,setHeight]=useState('null');
  const [error, setError] = useState(null)

  const [emptyFields,setEmptyFields] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!user){
      setError('you must be logged in')
      return
    }

    const bmi = {age,weight,height}
    
    const response = await fetch('/api/kybmi/calculate', {
      method: 'POST',
      body: JSON.stringify(bmi),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setAge('')
      setWeight('')
      setHeight('')
      setEmptyFields([])

      dispatch({type: 'CALCULATE_BMI', payload: json})
    }

  }

  return (
    <form className="bmi-form" onSubmit={handleSubmit}> 
    <h3 className='bmi-form-head'>Calculate BMI</h3>

    <label>Age:</label>
    <input 
      type="number" 
      onChange={(e) => setAge(e.target.value)} 
      value={age || ''}
      className={emptyFields.includes('age')? 'error': '' }
    />

    <label>Weight (in kg):</label>
    <input 
      type="number" 
      onChange={(e) => setWeight(e.target.value)} 
      value={weight || ''}
      className={emptyFields.includes('weight')? 'error': '' }
    />

    <label>Height (in cm):</label>
    <input 
      type="number" 
      onChange={(e) => setHeight(e.target.value)} 
      value={height || ''} 
      className={emptyFields.includes('height')? 'error': '' }
    />
    <div className='bmi-form-button'>
    <button>Calculate</button>
    </div>
    {error && <div className="error">{error}</div>}
  </form>
  )
}

export default BmiForm
