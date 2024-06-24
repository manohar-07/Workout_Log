import { BmiContext } from "../context/BmiContext"
import { useContext } from "react"

export const useBmiContext = () => {
  const context = useContext(BmiContext)

  if(!context) {
    throw Error('useBmiContext must be used inside an BmiContextProvider')
  }

  return context
}