import { useState } from 'react'
import './App.css'
import LoginPage from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SponsorSignupPage from './components/SponsorSignUp'
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import SignUpSelection from "./components/SignUpSelection";
import LandingPage from './components/LandingPage'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
      <Router>
        <Layout>
          <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUpSelection />} />
          <Route path='/signup/sponsor' element={<SponsorSignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
        </Layout>
        
      </Router>
   </>
  )
}

export default App
