import { useState } from 'react';
import './App.css';
import LoginPage from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout"; 
import DashboardLayout from "./components/DashboardLayout"; 
import SignUp from "./components/SignUp";
import LandingPage from './components/LandingPage';
import SchoolSignUp from './components/SchoolSignUp';
import Donations from "./components/Donations";
import FundingCampaignForm from './components/FundingCampaign';
import Flutter from "./components/FlutterWavePayroll";
import Campaigns from './components/Campaigns';
import Donate from './components/Donate';
import CreateCampaign from './components/CreateCampaign';
import { AuthProvider } from './context/AuthContext'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout></Layout>}>
              <Route path='/' element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path="/donations" element={<Donations />} />
              <Route path='/campaign' element={<FundingCampaignForm />} />
              <Route path='/pay' element={<Flutter />} />
              <Route path='campaigns' element={<Campaigns />} />
              <Route path='donate/:id/' element={<Donate />} />
              <Route path="*" element={<h1>404 - Not Found</h1>} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path='/dashboard/create-campaign' element={<CreateCampaign />} />
              <Route path="*" element={<h1>404 - Not Found</h1>} />
              <Route path="/dashboard" element={<Dashboard />} />
            `<Route path='/dashboard/register-school' element={<SchoolSignUp />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;