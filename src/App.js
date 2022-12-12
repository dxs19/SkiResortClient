import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import LogIn from './pages/Login';
import Register from './pages/Register';
import Resorts from './pages/Resorts';
import { Route, Routes } from 'react-router'
import ResortDetails from './pages/ResortDetails';
import { useState, useEffect } from 'react';
import { CheckSession } from './services/AuthServices'
import { Link } from 'react-router-dom';


const App = () => {

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  if (user && authenticated) { console.log() }

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <header>
        <Nav handleLogOut={handleLogOut} />
        {user && authenticated ? `signed in as: ${user.email}` :
          "Please sign in"}
      </header>

      <main>

        <Routes>
          <Route
            path="/"
            element={<Home
              user={user}
              toggleAuthenticated={toggleAuthenticated} />}
          />
          <Route
            path="/login"
            element={<LogIn setUser={setUser}
              toggleAuthenticated={toggleAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/resorts"
            element={<Resorts />}
          />
          <Route path="/resorts/:id" element={<ResortDetails setUser={setUser}
            user={user}
            toggleAuthenticated={toggleAuthenticated}
            authenticated={authenticated} />} />
        </Routes>
      </main>
    </div>);
  // ) : (
  //   <div>
  //     <h1>login</h1>
  //     <Link to='/login'>Sign In</Link>

  //   </div>
  // )
}

export default App;
