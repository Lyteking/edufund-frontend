import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './components/SignUp'
import Dashboard from "./components/Dashboard";


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Router>
   </>
  )
}

export default App
