
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <div className='logo-and-bmi'>
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        {user && <Link to="/bmi" className='bmi-nav'>
          <h2>know your BMI</h2>
        </Link>}
        </div>
        <nav>
          { user && <div >
            <span className='user-name'>{user.name}</span>
            <button onClick={handleClick}>Log out</button>
          </div>}

          { !user && <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
