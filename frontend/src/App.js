import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import {Helmet} from 'react-helmet'

//pages and compoments
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Signup from './pages/Signup';
import Bmi from './pages/Bmi';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Workout Buddy</title>
                <meta name="description" content="Workout tracker" />
            </Helmet>
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route
          path="/"
          element={user?<Home/>:<Navigate to='/login' />}
          />
          <Route
          path="/login"
          element={user? <Navigate to='/' />:<Login/>}
          />
          <Route
          path="/signup"
          element={user? <Navigate to='/' />:<Signup/>}
          />
          <Route
          path="/bmi"
          element={user? <Bmi/>:<Navigate to='/login' />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
