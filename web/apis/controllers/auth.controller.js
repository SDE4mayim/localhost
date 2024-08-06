var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Function = require("../controllers/profiles.controller");
require('dotenv').config({
  path: './.env'
})
console.log(process.env.PORT)

const db = require("../models");
const Profiles = db.profiles;

// Dynamic model usage based on user type
const getManagementModel = userType => {
  switch (userType) {
    case 'hospital':
      return db.hospitals;
    case 'doctor':
      return db.doctor_management;
    case 'petowner':
      return db.pet_owner_management;
    default:
      throw new Error('Invalid user type');
  }
};

exports.signup = (req, res) => {
  Function.create(req, res);

  /*if (profile) {
    res.status(500)
      .send({
        message: err
      });
    return;
  } else {
    res.status(200)
      .send({
        message: "Profile Registered successfully"
      })
  }*/
};

exports.signin = async (req, res) => {
  const { user_name, password, user_type } = req.body;

  // Get the appropriate management model based on user type
  const ManagementModel = getManagementModel(user_type);

  try {
    // Find the profile associated with the user type
    const profile = await Profiles.findOne({
      where: {
        user_name: user_name
      }
    });

    if (!profile) {
      return res.status(404).send({ message: 'Profile not found.' });
    }

    // Check if the profile is associated with the specified user type
    const userManagementProfile = await ManagementModel.findOne({
      where: {
        profile_id: profile.id
      }
    });

    if (!userManagementProfile) {
      return res.status(401).send({ message: `Invalid user type for ${user_type} login.` });
    }

    // Verify password
    const passwordIsValid = bcrypt.compareSync(password, profile.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
    }

    // Sign token with user id
    const token = jwt.sign({ id: profile.user_name }, process.env.API_SECRET, { expiresIn: 86400 });

    // Responding to client request with user profile success message, access token, and additional details.
    res.status(200).send({
      ...profile.toJSON(),
      user_type: user_type,
      message: 'Login successful',
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Error retrieving profile: ' + err,
    });
  }
};
