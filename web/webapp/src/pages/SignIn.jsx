import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import API_ROUTES from '../utils/constants';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Alert from '@mui/material/Alert';

const SignIn = () => {
  const [loginData, setLoginData] = useState(null);
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedLoginType, setSelectedLoginType] = useState('petowner');
  const navigate = useNavigate();

  const loginTypes = {
    petowner: {
      title: 'Pet Owner Login',
      description: 'Pet Owners can use this login',
      link: '/patients',
      icon: <PersonIcon fontSize="large" style={{ color: 'skyblue' }} />,
    },
    doctor: {
      title: 'Doctor Login',
      description: 'Doctors and Technicians can use this login',
      link: '/doctors',
      icon: <PersonIcon fontSize="large" style={{ color: 'white' }} />,
    },
    hospital: {
      title: 'Hospital Login',
      description: 'Hospitals and clinics can use this login',
      link: '/appointments',
      icon: <LocalHospitalIcon fontSize="large" style={{ color: 'white' }} />,
    }
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    const userData = {
      user_name: user_name,
      password,
      user_type: selectedLoginType,
    };

    try {
      const response = await fetch(API_ROUTES.LOGIN, {
        method: 'POST',
        headers: {
          'Origin': 'https://vetcastle.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        //window.open('/maindashboard','_blank');
        const AccessToken = responseData.accessToken;
        localStorage.setItem('loginData', JSON.stringify(responseData));
        setLoginData(responseData);
        setSuccess('Login successful'); 
        navigate('/maindashboard');
        localStorage.setItem('accessToken', AccessToken);
        setUsername('');
        setPassword('');
      } else if (response.status === 401) {
        setError('Invalid credentials');
        setUsername('');
        setPassword('');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleAlertClose = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">VetCastle Login</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4 items-center justify-center">
                    {Object.keys(loginTypes).map(type => (
                      <div key={type} className={`cursor-pointer mx-4 flex flex-col items-center ${selectedLoginType === type ? 'border-b-2 border-purple-600 pb-1' : 'opacity-70 hover:opacity-100 transition duration-150 ease-in-out'}`} onClick={() => setSelectedLoginType(type)}>
                        {loginTypes[type].icon}
                        <p className="text-gray-600 text-sm mt-1">{loginTypes[type].title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3 text-center">
                      <p className="text-gray-400">{loginTypes[selectedLoginType].description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">Username</label>
                      <input
                        id="username"
                        type="text"
                        className="form-input w-full text-gray-300"
                        placeholder="Username"
                        required
                        value={user_name}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-300"
                        placeholder="Password (at least 10 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" >Sign in</button>
                    </div>
                  </div>
                </form>
                {error && (
                  <Alert severity="error" onClose={handleAlertClose} sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" onClose={handleAlertClose} sx={{ mt: 2 }}>
                    {success}
                  </Alert>
                )}
                {selectedLoginType === 'hospital' && (
                  <div className="text-gray-400 text-center mt-6">
                    Don’t have a hospital account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                  </div>
                )}
                {selectedLoginType !== 'hospital' && (
                  <div className="text-gray-400 text-center mt-6">
                    If you need assistance, please contact your doctor/hospital administrator.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignIn;