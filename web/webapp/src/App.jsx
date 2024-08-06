import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Pricing from './pages/Pricing';
import ResetPassword from './pages/ResetPassword';
import MainDashboard from './pages/MainDashboard';
import AppointmentDashboard from './pages/AppointmentDashboard';
import DiagnosisDashboard from './pages/DiagnosisDashboard';
import ErrorPage from './partials/Error';
import ProfileDashboard from './pages/ProfileDashboard';
import PetDashboard from './pages/PetDashboard';
import InventoryDashboard from './pages/InventoryDashboard';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      offset: 100, // Offset (in pixels) from the top of the document
      duration: 800, // Duration (in ms) of the animation
      easing: 'ease-in-sine', // Easing function for the animation
      delay: 100, // Delay (in ms) before the animation starts
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/petOwner" element={<SignIn type="petOwner" />} />
        <Route path="/hospital" element={<SignIn type="hospital" />} />
        <Route path="/doctor" element={<SignIn type="doctor" />} />
        <Route path="/signup" element={<SignUp type="gold" />} />
        <Route path="/gsignup" element={<SignUp type="gold" />} />
        <Route path="/dsignup" element={<SignUp type="diamond" />} />
        <Route path="/psignup" element={<SignUp type="platinum"/>} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/maindashboard" element={<MainDashboard />} />
        <Route path="/csd" element={<ProfileDashboard type={'Petowner'} />} />
        <Route path="/hsd" element={<ProfileDashboard type={'Hospital'} />} />
        <Route path="/dsd" element={<ProfileDashboard type={'Doctor'}/>} />
        <Route path="/asd" element={<AppointmentDashboard />} />
        <Route path="/diagnosis" element={<DiagnosisDashboard />} />
        <Route path="/psd" element={<PetDashboard/>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/newsd" element={<ProfileDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/inventory" element={<InventoryDashboard type={'Inventory'} />} />
      </Routes>
    </>
  );
}

export default App;
