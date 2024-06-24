import React, { useEffect } from 'react'

//components
import BmiValue from '../components/BmiValue'
import BmiForm from '../components/BmiForm'
import { useBmiContext } from '../hooks/useBmiContext'
import { useAuthContext } from '../hooks/useAuthContext'


function Bmi() {
  const { bmi, dispatch } = useBmiContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchBmi = async () => {

      const response = await fetch('/api/kybmi/',{
        method:"GET",
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BMI', payload:json})
      }
    }
    if(user){
      fetchBmi()
    }
    
  }, [dispatch,user])
  
  return (
    <div className='Bmi'>
      <BmiValue bmi={bmi} />
      <BmiForm />
      
    </div>
  )
}

export default Bmi
