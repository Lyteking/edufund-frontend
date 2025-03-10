import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './components/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<SignupPage/>}/>
          <Route path='/log-in' element={<LoginPage/>}/>
        </Routes>
      </Router>
   </>
  )
}

export default App
