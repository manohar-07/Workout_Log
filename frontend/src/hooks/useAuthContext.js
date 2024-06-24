//consumes the context using useContext hook built in react, and also itchecks if it is used outside the scope of that context so that we r not trying to use it outside the context if we do then it throws an error!
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}