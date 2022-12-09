import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import LogIn from './pages/Login';
import Register from './pages/Register';
import Resorts from './pages/Resorts';
import { Route, Routes } from 'react-router'
import ResortDetails from './pages/ResortDetails';


function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<LogIn />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/resorts"
            element={<Resorts />}
          />
          <Route path="/resorts/:id" element={<ResortDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
