import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import "react-datepicker/dist/react-datepicker.css";
import { Country, State, City } from "country-state-city";
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Noimg from "../images/no-image-icon-0.jpg";
import Banner from '../partials/Banner';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import API_ROUTES from '../utils/constants';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import StarRateIcon from '@mui/icons-material/StarRate';
import Alert from '@mui/material/Alert';

function SignUp({ type }) {
  const [accessToken, setAccessToken] = useState(null);

  const planList = {
    gold: {
      value: "gold",
      label: "Gold",
      userlimit: "3",
      icon: <StarIcon fontSize='large' style={{ color: 'gold' }} />,
      description: "Ideal for small practices with 1 Hospital and up to 2 Doctors.",
      price: "Rs.2,000 per month",
      specialOffer: "Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 12,000 Annually (Originally Rs. 24,000)"
    },
    diamond: {
      value: "diamond",
      label: "Diamond",
      userlimit: "12",
      icon: <DiamondIcon fontSize='large' style={{ color: '#b9f2ff' }} />,
      description: "Suitable for practices with 2 Hospitals and up to 10 Doctors.",
      price: "Rs.3,500 per month",
      specialOffer: "Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 21,000 Annually (Originally Rs. 42,000)"
    },
    platinum: {
      value: "platinum",
      label: "Platinum",
      userlimit: "100",
      icon: <StarRateIcon fontSize='large' style={{ color: '#E5E4E2' }} />,
      description: "Perfect for large practices with Unlimited Hospitals and Doctors.",
      price: "Rs.7,000 per month",
      specialOffer: "Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 42,000 Annually (Originally Rs. 84,000)"
    }
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalCategories, setHospitalCategories] = useState([]);
  const [selectedHospitalCategory, setSelectedHospitalCategory] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(type);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [phone, setPhone] = useState("");
  const [altphone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState("");

  const handleHospitalCategoryChange = (e) => {
    setSelectedHospitalCategory(e.target.value);
  };

  const handleButtonClick = (plan) => {
    setSelectedPlan(plan);
    console.log(plan);
  };

  const countryOptions = Country.getAllCountries();

  const handleCountryChange = (e) => {
    const selectedCountryValue = e.target.value;
    setSelectedCountry(selectedCountryValue);
    setSelectedState("");
    setSelectedCity("");
  };

  const stateOptions = State.getStatesOfCountry(selectedCountry);

  const handleStateChange = (e) => {
    const selectedStateValue = e.target.value;
    setSelectedState(selectedStateValue);
    setSelectedCity("");
  };

  const cityOptions = City.getCitiesOfState(selectedCountry, selectedState);

  const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    setSelectedCity(selectedCityValue);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected Image:", file);
    setImage(file);
  };

  const uploadImageToServer = async (imageFile) => {
    const returnurl = "https://wallpapers.com/images/high/deadly-gojo-satoru-fan-art-dld3h1qodm9hrs1l.webp";
    if (!imageFile) {
      return null;
    }

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(API_ROUTES.UPLOAD, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData.profile_url; // Assuming the response contains the image URL
      } else {
        console.error('Error uploading image:', response.statusText);
        setError('Error uploading image:', response.statusText);
        return returnurl;
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setError('Error uploading image:', error.message);
      return returnurl;
    }
  };

  const handleAlertClose = () => {
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    if (!username) {
      setError('Please Enter the Username');
      return;
    }
    if (!password) {
      setError('Please Enter the Password.');
      return;
    }
    if (!selectedPlan) {
      setError('Please Select the Required Plan.');
      return;
    }
    if (!firstName ) {
      setError('Please Enter the First Name');
      return;
    }
    if (!lastName) {
      setError('Please Enter the Last Name.');
      return;
    }
    if (!email ) {
      setError('Please Enter the email ID');
      return;
    }
    if (!phone ) {
      setError('Please Enter the Phone Number');
      return;
    }
   
    if (!selectedCountry) {
      setError('Please Select the country');
      return;
    }

    const profileImageUrl = await uploadImageToServer(image);

    const userData = {
      user_name: username,
      password: password,
      subscription_plan: planList[selectedPlan].value,
      first_name: firstName,
      last_name: lastName,
      gender: 'null',
      email: email,
      phone: phone,
      alt_phone: altphone,
      date_of_birth: 'null',
      street_address: address,
      city_name: selectedCity,
      state_name: selectedState,
      country: selectedCountry,
      postal_code: pincode,
      profile_image_url: profileImageUrl,
      userlimit: planList[selectedPlan].userlimit,
      category_id: selectedHospitalCategory
    };

    try {
      const response = await fetch(API_ROUTES.HOSPITAL, {
        method: 'POST',
        headers: {
          'Origin': 'https://vetcastle.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful login
        const responseData = await response.json();
        console.log('Profile Created Successful', responseData);
        setUsername('');
        setPassword('');
        setHospitalCategories([]);
        setSelectedHospitalCategory('');
        setSelectedPlan(type); // Assuming 'type' is the default plan
        setFirstName('');
        setLastName('');
        setEmail('');
        setSelectedCountry('');
        setSelectedState('');
        setSelectedCity('');
        setPhone('');
        setAltPhone('');
        setAddress('');
        setPincode('');
        setImage('');
        setSuccess('Hospital/Clinic Profile created');
      } else if (response.status === 404) {
        // Unauthorized - Invalid credentials
        setError('Invalid credentials');
        setUsername('');
        setPassword('');
      } else {
        // Handle other error cases
        const data = await response.json();
        setError(data.message || 'Login failed');
        setUsername('');
        setPassword('');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    // Retrieve the access token from localStorage when the component mounts
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    const fetchHospitalCategories = async () => {
      try {
        const response = await fetch(API_ROUTES.HOSPITAL_CATEGORY);
        if (response.ok) {
          const data = await response.json();
          setHospitalCategories(data);
        } else {
          console.error("Error fetching hospital categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching hospital categories:", error.message);
      }
    };

    fetchHospitalCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />
      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Optimize your veterinary practice management with us.</h1>
              </div>
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                {/* Subscription Plan */}
                <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="subscription_plan">
                      Subscription Plan: {planList[selectedPlan].label}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="flex flex-wrap -mx-3 mb-4 items-center justify-center">
                      {Object.keys(planList).map((type) => (
                        <div
                          key={type}
                          className={`cursor-pointer mx-4 flex flex-col items-center ${
                            selectedPlan === type ? 'border-b-2 border-purple-600 pb-1' : 'opacity-70 hover:opacity-100 transition duration-150 ease-in-out'
                          }`}
                          onClick={() => handleButtonClick(type)}
                        >
                          {planList[type].icon}
                          <p className="text-gray-600 text-sm mt-1">{planList[type].label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3 text-center">
                        <p className="text-gray-400">{planList[selectedPlan].price}</p>
                        <br />
                        <p className="text-red-400">{planList[selectedPlan].specialOffer}</p>
                        <br />
                        <p className="text-white-400">{planList[selectedPlan].description}</p>
                      </div>
                    </div>
              </div>
              {/* Subscription Plan and Image */}
              <div className="max-w-full mx-auto">
                <div className="flex flex-wrap -mx-3 mb-4">
                  <form className="w-full md:w-1/2 px-3">
                    {/* Image Upload */}
                    <div className="formInput">
                      <label htmlFor="file">
                        Profile Picture : <DriveFolderUploadOutlinedIcon className="icon" />
                      </label>
                      <img
                        style={{ width: '55px', height: '55px', borderRadius: '50%', marginBottom: '10px' }}
                        src={image ? URL.createObjectURL(image) : Noimg}
                        alt=""
                      />
                      <input
                        type="file"
                        id="file"
                        style={{ display: 'none', cursor: 'pointer' }}
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">
                          Username:<span className="text-red-600">*</span>
                        </label>
                        <input
                          id="username"
                          type="text"
                          className="form-input w-full text-gray-300"
                          placeholder="username"
                          autoComplete='username'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">
                          First Name:<span className="text-red-600">*</span>
                        </label>
                        <input
                          id="first-name"
                          type="text"
                          className="form-input w-full text-gray-300"
                          placeholder="First Name"
                          autoComplete='First Name'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">
                          Last Name:<span className="text-red-600">*</span>
                        </label>
                        <input
                          id="last-name"
                          type="text"
                          className="form-input w-full text-gray-300"
                          placeholder="Last Name"
                          autoComplete='Last Name'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="hospitalCategory">
                          Hospital Category:<span className="text-red-600">*</span>
                        </label>
                        <div className="input">
                          <select
                            id="hospitalCategory"
                            className="form-input w-full text-gray-300"
                            value={selectedHospitalCategory}
                            onChange={handleHospitalCategoryChange}
                            required
                          >
                            <option value="">Select Hospital Category</option>
                            {hospitalCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="phone">
                          Phone Number:<span className="text-red-600">*</span>
                        </label>
                        <PhoneInput
                          id="phone"
                          inputStyle={{ height: '50px', width: '100%', color: '#718096' }}
                          country={'in'}
                          value={phone}
                          onChange={setPhone}
                          autoComplete="Phone Number"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="alt-phone">
                          Alternative Phone Number:
                        </label>
                        <PhoneInput
                          id="alt-phone"
                          inputStyle={{ height: '50px', width: '100%', color: '#718096' }}
                          country={'in'}
                          value={altphone}
                          onChange={setAltPhone}
                          autoComplete="Phone Number"
                        />
                      </div>
                    </div>
                  </form>

                  {/* Form */}
                  <form className="w-full md:w-1/2 px-3">
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">
                          Hospital Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-input w-full text-gray-300"
                          placeholder="you@yourcompany.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">
                          Password <span className="text-red-600">*</span>
                        </label>
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
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="address">
                          Address:
                        </label>
                        <input
                          id="address"
                          type="text"
                          className="form-input w-full text-gray-300"
                          placeholder="Address"
                          autoComplete='Address'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="country">
                          Country:
                        </label>
                        <div className="input">
                          <select
                            id="country"
                            className="form-input w-full text-gray-300"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          >
                            <option value="">Select Country</option>
                            {countryOptions.map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                              {country.name}
                            </option>
                          ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {selectedCountry && (
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="state">
                            State:
                          </label>
                          <div className="input">
                            <select
                              id="state"
                              className="form-input w-full text-gray-300"
                              value={selectedState}
                              onChange={handleStateChange}
                            >
                              <option value="">Select State</option>
                              {stateOptions.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    { (
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="city">
                            City:
                          </label>
                          <div className="input">
                            <select
                              id="city"
                              className="form-input w-full text-gray-300"
                              value={selectedCity}
                              onChange={handleCityChange}
                            >
                              <option value="">Select City</option>
                              {cityOptions.map((city) => (
                            <option key={city.id} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="pincode">
                          Pincode:
                        </label>
                        <input
                          id="pincode"
                          type="text"
                          className="form-input w-full text-gray-300"
                          placeholder="Enter Pincode"
                          autoComplete="000000"
                          value={pincode}
                          onChange={handlePincodeChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Common form elements for both columns */}
              <div className="text-sm text-gray-500 text-center">
                By Signing in your are agreed to be contacted by VetCastle about this offer as per the VetCastle{' '}
                <Link to="#" className="underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="#" className="underline">
                  Privacy Policy
                </Link>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" type="submit" onClick={handleSubmit}>
                    Sign up
                  </button>
                </div>
              </div>
              {/* Error/Success Messages */}
              {error && (
                <Alert severity="error" onClose={handleAlertClose} className="mt-4">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" onClose={handleAlertClose} className="mt-4">
                  {success}
                </Alert>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
