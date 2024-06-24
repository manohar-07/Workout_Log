import { createContext, useReducer } from 'react'

export const BmiContext = createContext()

export const BmiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BMI':
      return { 
        bmi: action.payload 
      }
    case 'CALCULATE_BMI':
      return { 
        bmi: action.payload
      }
    default:
      return state
  }
}

export const BmiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BmiReducer, { 
    bmi: null
  })
  
  return (
    <BmiContext.Provider value={{ ...state, dispatch }}>
      { children }
    </BmiContext.Provider>
  )
}