import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Grid,
  IconButton,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import API_ROUTES from '../../../utils/constants';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from "country-state-city";

const storedLoginData = localStorage.getItem('loginData');
  const parsedLoginData = JSON.parse(storedLoginData);

const CreateProfileDialog = ({ open, handleClose, authToken, profileType }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('https://static.wikia.nocookie.net/jujutsu-kaisen/images/e/ef/Satoru_Gojo_%28Anime_2%29.png/revision/latest?cb=20201025013634');
  const [userlimit, setUserLimit] = useState('');
  const [hospitalCategories, setHospitalCategories] = useState([]);
  const [selectedHospitalCategory, setSelectedHospitalCategory] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [hospitalId, setHospitalId] = useState(parsedLoginData.id);
  

  const [accessToken, setAccessToken] = useState(null);

  const handleHospitalCategoryChange = (e) => {
    setSelectedHospitalCategory(e.target.value);
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
  const handleChange = (field, value) => {
    switch (field) {
      case 'user_name':
        setUserName(value);
        
        break;
      case 'password':
        setPassword(value);
        break;
      case 'first_name':
        setFirstName(value);
        break;
      case 'last_name':
        setLastName(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'alt_phone':
        setAltPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'date_of_birth':
        setDateOfBirth(value);
        break;
      case 'street_address':
        setStreetAddress(value);
        break;
      case 'city_name':
        setSelectedCity(value);
        break;
      case 'state_name':
        setSelectedState(value);
        break;
      case 'postal_code':
        setPostalCode(value);
        break;
      case 'country':
        setSelectedCountry(value);
        break;
      case 'profile_image_url':
        setProfileImageUrl(value);
        break;
      case 'userlimit':
        setUserLimit(value);
        break;
      case 'category_id':
        setCategoryId(value);
        break;
      case 'subscription_plan':
        setSubscriptionPlan(value);
        break;
      case 'hospital_id':
        setHospitalId(value);
        break;
      case 'doctor_id':
        setDoctorId(value);
        break;
      default:
        break;
    }
  };

  const handleSaveClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      switch (profileType) {
        case 'Hospital':
          {
            if(!userName){
              alert('Please enter the Username.')
             
              return;
            }
            if(!password)
              {
                alert('please enter the password.')
                return;
              }
            
            if(!firstName)
                {
                  alert('please enter the firstName.')
                  return;
                }
            if(firstName)
              {
              if(firstName[0].islower){
                alert('please enter the firstletter in capital.')
                return;
              }
              if(firstName.length!=10){
                alert('please enter ten character in firstname.')
                return;
              }
              } 
          if(!lastName)
              {
                alert('please enter the lastname.')
                return;
              }
            if(lastName)
              {
              if(lastName.islower){
                alert('please enter the firstletter in capital.')
                return;
              }
              if (/^[a-zA-Z]+$/.test(lastName)) {
                // alert('Please enter only letters in the last name. Special characters are not allowed.');
                return;
              }
              }   
            if(!gender)
              {
                alert('please enter the gender.')
                return;
              }
            if(!phone)
              {
                alert('please enter the phone number.')
                return;
              }
            if(!altPhone)
              {
                alert('please enter the alternate pnumber.')
                return;
              }
            if(!email)
              {
                alert('please enter the email.')
                return;
              }
            if(email)
              {
              if(!email.includes('@'))
                {
                  alert('please enter the email includes @.')
                    return;
                }
              }
            if(!dateOfBirth)
              {
                alert('please enter the dateofbirth.')
                return;
              }
            if(streetAddress)
              {
                alert('please enter the streetadress.')
                return; 
              }
            if(city_name)
              {
                alert('please select the city.')
                return;
              }
            if(state_name)
              {
                alert('please select the state.')
                return;
              }
        if(postalCode)
                {
                 if(!/^[0-9]+$/.postalCode)
                  {
                    alert(' please enter only the postal code.')
                    return;
                  }    
                }
        if(!Country)
                {
                  alert('please select the country.')
                  return;
                }

        if(!category_id)
          {
            alert('please select the category id.')
            return;
          }       
          if(!subscriptionPlan)
            {
              alert('please select the subscription.')
              return;
            }
            };
            break;


            case 'Doctor':
              if(userName){
                alert('Please enter the Username.')
                {
                  if(!userName.islower)
                    {
                         alert('please enter the username.')
                         return;
                    }
                }
              }
              if(!password)
                {
                  alert('please enter the password.')
                  return;
                }
              
              if(firstName)
                  {
                    alert('please enter the firstName.')
                    return;
                  }
              if(firstName)
                {
                if(firstName[0].islower){
                  alert('please enter the firstletter in capital.')
                  return;
                }
                if(firstName.length!=10){
                  alert('please enter ten character in firstname.')
                  return;
                }
                } 
            if(!lastName)
                {
                  alert('please enter the lastname.')
                  return;
                }
              if(lastName)
                {
                if(lastName[0].islower){
                  alert('please enter the firstletter in capital.')
                  return;
                }
                if (/^[a-zA-Z]+$/.test(lastName)) {
                  alert('Please enter only letters in the last name. Special characters are not allowed.');
                  return;
                }
                }   
              if(!gender)
                {
                  alert('please enter the gender.')
                  return;
                }
              if(!phone)
                {
                  alert('please enter the phone number.')
                  return;
                }
              if(!altPhone)
                {
                  alert('please enter the alternate-pnumber.')
                  return;
                }
              if(email)
                {
                  alert('please enter the email.')
                  return;
                }
              if(email)
                {
                if(!email.includes('@'))
                  {
                    alert('please enter the email includes @.')
                      return;
                  }
                }
              if(!dateOfBirth)
                {
                  alert('please enter the dateofbirth.')
                  return;
                }
              if(!streetAddress)
                {
                  alert('please enter the streetadress.')
                  return; 
                }
              if(!city_name)
                {
                  alert('please select the city.')
                  return;
                }
              if(!state_name)
                {
                  alert('please select the state.')
                  return;
                }
          if(postalCode)
                  {
                   if(!/^[0-9]+$/.postalCode)
                    {
                      alert(' please enter only the postal code.')
                      return;
                    }    
                  }
          if(!Country)
                  {
                    alert('please select the country.')
                    return;
                  }
          if(!hospitalId)
            {
              alert('please select the category id.')
              return;
            }      
          break;
          case 'Petowner':
            if(userName){
              alert('Please enter the Username.')
              {
                if(!userName.islower)
                  {
                       alert('please enter the username.')
                       return;
                  }
              }
            }
            if(!password)
              {
                alert('please enter the password.')
                return;
              }
            
            if(firstName)
                {
                  alert('please enter the firstName.')
                  return;
                }
            if(firstName)
              {
              if(firstName[0].islower){
                alert('please enter the firstletter in capital.')
                return;
              }
              if(firstName.length!=10){
                alert('please enter ten character in firstname.')
                return;
              }
              } 
          if(!lastName)
              {
                alert('please enter the lastname.')
                return;
              }
            if(lastName)
              {
              if(lastName[0].islower){
                alert('please enter the firstletter in capital.')
                return;
              }
              if (/^[a-zA-Z]+$/.test(lastName)) {
                alert('Please enter only letters in the last name. Special characters are not allowed.');
                return;
              }
              }   
            if(!gender)
              {
                alert('please enter the gender.')
                return;
              }
            if(!phone)
              {
                alert('please enter the phone number.')
                return;
              }
            if(!altPhone)
              {
                alert('please enter the alternate-pnumber.')
                return;
              }
            if(email)
              {
                alert('please enter the email.')
                return;
              }
            if(email)
              {
              if(!email.includes('@'))
                {
                  alert('please enter the email includes @.')
                    return;
                }
              }
            if(!dateOfBirth)
              {
                alert('please enter the dateofbirth.')
                return;
              }
            if(!streetAddress)
              {
                alert('please enter the streetadress.')
                return; 
              }
            if(!city_name)
              {
                alert('please select the city.')
                return;
              }
            if(!state_name)
              {
                alert('please select the state.')
                return;
              }
        if(postalCode)
                {
                 if(!/^[0-9]+$/.postalCode)
                  {
                    alert(' please enter only the postal code.')
                    return;
                  }    
                }
        if(!Country)
                {
                  alert('please select the country.')
                  return;
                }
        if(!hospitalId)
          {
            alert('please select the category id.')
            return;
          }      
          if(!doctorId)
            {
              alert('pleaseselect the doctor id.')
              return;
            }
          break;
        default:
             

        }
        
        
    

      let PROFILE_ROUTE;
      // Inside the handleSaveClick function
      let profileData;
      switch (profileType) {
        case 'Hospital':
          PROFILE_ROUTE = API_ROUTES.HOSPITAL;
          profileData = {
            user_name: userName,
            password: password,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            alt_phone: altPhone,
            email: email,
            date_of_birth: dateOfBirth,
            street_address: streetAddress,
            city_name: selectedCity,
            state_name: selectedState,
            postal_code: postalCode,
            country: selectedCountry,
            profile_image_url: profileImageUrl,
            userlimit: userlimit,
            category_id: selectedHospitalCategory,
            subscription_plan: subscriptionPlan,
          };
          break;
        case 'Doctor':
          PROFILE_ROUTE = API_ROUTES.DOCTORS;
          profileData = {
            user_name: userName,
            password: password,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            alt_phone: altPhone,
            email: email,
            date_of_birth: dateOfBirth,
            street_address: streetAddress,
            city_name: selectedCity,
            state_name: selectedState,
            postal_code: postalCode,
            country: selectedCountry,
            profile_image_url: profileImageUrl,
            hospital_id: hospitalId
          };
          break;
        case 'Petowner':
          PROFILE_ROUTE = API_ROUTES.PET_OWNERS;
          profileData = {
            user_name: userName,
            password: password,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            phone: phone,
            alt_phone: altPhone,
            email: email,
            date_of_birth: dateOfBirth,
            street_address: streetAddress,
            city_name: selectedCity,
            state_name: selectedState,
            postal_code: postalCode,
            country: selectedCountry,
            profile_image_url: profileImageUrl,
            doctor_id: doctorId,
            hospital_id: hospitalId
          };
          break;
        default:
          break;
      }

      console.log(profileData);


      const response = await fetch(PROFILE_ROUTE, {
        method: 'POST',
        headers,
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert('Profile created successfully');
        handleClose();
        // Optionally, you can fetch and update the profile data in the parent component
      } else {
        alert('Failed to create profile');
      }
    } 
    catch (error) {
      alert(`profile already exist: ${error.message}`);
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

    const fetchDoctor = async () => {
      try {
        const response = await fetch(API_ROUTES.DOCTORS);
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error("Error fetching doctors:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };

    fetchHospitalCategories();
    fetchDoctor();
    console.log(doctors);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Profile</Typography>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="User Name"
              fullWidth
              value={userName}
              onChange={(e) => handleChange('user_name', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter the user name or email id." : ""}
              
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              fullWidth
              value={password}
              type='password'
              onChange={(e) => handleChange('password', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter your Hospital ID." : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => handleChange('first_name', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter the first name in capital letter." : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => handleChange('last_name', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter the last name only letter not special character." : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                label="Gender"
                value={gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <PhoneInput
              specialLabel="Custom Phone*"
              inputStyle={{ height: '50px', width: '100%', color: '#718096' }}
              country={'in'}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter the phone number 10 character.": ""}
              autoComplete="Phone Number"
              required
             
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PhoneInput
              name="Alternative Phone"
              inputStyle={{ height: '50px', width: '100%', color: '#718096' }}
              country={'in'}
              value={altPhone}
              onChange={(altPhone) => setAltPhone(altPhone)}
              autoComplete="Phone Number"
              required
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter your phone number 10 digit." : ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter the email in small letter .": ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="DOB"
              fullWidth
              type='date'
              value={dateOfBirth}
              onChange={(e) => handleChange('date_of_birth', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter the date of birth day.": ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Street Address"
              fullWidth
              value={streetAddress}
              onChange={(e) => handleChange('street_address', e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please enter address in the formate doorno,streetname,village/town,dist .": ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
              <Select
                label="Country"
                fullWidth
                value={selectedCountry}
                onChange={(e) => handleChange('country', e.target.value)}
                onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={isFocused ? "Please select the country  .": ""}
              >
                <MenuItem value="">
                  <em>Select Country</em>
                </MenuItem>
                {countryOptions.map((country) => (
                  <MenuItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select State</InputLabel>
              <Select
                label="State Name"
                fullWidth
                value={selectedState}
                onChange={(e) => handleChange('state_name', e.target.value)}
              >
                <MenuItem value="">
                  <em>Select State</em>
                </MenuItem>
                {stateOptions.map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {(
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                <Select
                  label="City Name"
                  fullWidth
                  value={selectedCity}
                  onChange={(e) => handleChange('city_name', e.target.value)}
                  defaultValue='Select City'
                >
                  <MenuItem value="">
                    <em>Select City</em>
                  </MenuItem>
                  {cityOptions.map((city) => (
                    <MenuItem key={city.id} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <TextField
              label="Postal Code"
              fullWidth
              value={postalCode}
              onChange={(e) => handleChange('postal_code', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Profile Image URL"
              fullWidth
              value={profileImageUrl}
              onChange={(e) => handleChange('profile_image_url', e.target.value)}
            />
          </Grid>
          {profileType === 'hospital' && (
            <Grid item xs={12} md={6}>
              <TextField
                label="User Limit"
                fullWidth
                value={userlimit}
                onChange={(e) => handleChange('userlimit', e.target.value)}
              />
            </Grid>
          )}
          {profileType === 'Hospital' && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                  label="category id"
                  fullWidth
                  value={selectedHospitalCategory}
                  onChange={(e) => handleHospitalCategoryChange}
                  required
                >
                  <MenuItem>
                    <em>Select Category ID</em>
                  </MenuItem>
                  {hospitalCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          {profileType === 'Hospital' && (
            <Grid item xs={12} md={6}>
          
              <TextField
                label="Subscription Plan"
                fullWidth
                value={subscriptionPlan}
                onChange={(e) => handleChange('subscription_plan', e.target.value)}
              />
      
            </Grid>
          )}
          {profileType === 'Hospital' && (
            <Grid item xs={12} md={6}>
              
              <TextField
                label="Hospital ID"
                fullWidth
                value={hospitalId}
                onChange={(e) => handleChange('hospital_id', e.target.value)}
              />
            </Grid>
          )}
          {profileType === 'Petowner' && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
                <Select
                  label="doctor id"
                  fullWidth
                  value={doctorId}
                  onChange={(e) => handleChange('doctor_id', e.target.value)}
                  required
                >
                  <MenuItem>
                    <em>Select Doctor</em>
                  </MenuItem>
                  {doctors.map((doc) => (
                    <MenuItem key={doc.id} value={doc.id}>
                      {doc.user_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveClick} startIcon={<SaveIcon />} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProfileDialog;
