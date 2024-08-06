const db = require("../models");
const Hospitals = db.hospitals;
const Op = db.Sequelize.Op;
const Profile = require("../controllers/profiles.controller");


//create profile object from req
async function createHospital(req) {
  try {
    const profile = await Profile.createone(req); // Call createProfile function to get the profile data.
    console.log(profile.id, req.body.user_limit,  req.body.category_id);
    if (!profile) {
      throw new Error("Profile creation error");
    }

    const hospital = {
      profile_id: profile.id,
      subscription_plan: req.body.subscription_plan,
      userlimit: req.body.userlimit,
      category_id: req.body.category_id,
    };
    return hospital;
  } catch (err) {
    throw new Error("Error creating Hospital Profile : " + err.message);
  }
}
function createHospitalraw(req)
{
  const hospital = {
    profile_id: req.body.profile_id,
    subscription_plan: req.body.subscription_plan,
    userlimit: req.body.userlimit,
    category_id: req.body.category_id
  };  
  return hospital;
}

// Create Profiles

exports.create = async (req, res) => {
  try {
    console.log("Creating Hospital Profile");
    const hospital = await createHospital(req);
    const data = await Hospitals.create(hospital);
    res.send(data); // Send the response here
    console.log("Hospital Profile Creation Successful");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating Hospital Profile.",
    });
  }
};

// Find Single Profiles
exports.findOne = async (req, res) => {
  const hospital_profile_Id = req.params.id;
  console.log("Hospital Profile ID = " + hospital_profile_Id);
  
  try {
    // Get the data from Hospital model
    const dataHospitalProfile = await Hospitals.findByPk(hospital_profile_Id);
    
    if (!dataHospitalProfile) {
      // If Hospital data is not found, send a 404 response
      res.status(404).send({
        message: `Cannot find Hospital Profile with id=${hospital_profile_Id}.`,
      });
      return;
    }

    // Now, get the profile data from Profiles model using the profile id from the Hospital data
    const profileId = dataHospitalProfile.profile_id;
    console.log(dataHospitalProfile.profile_id); 
    const dataProfiles = await Profile.findOnefunction(profileId);
    console.log(dataProfiles.id);
    
    if (!dataProfiles) {
      // If profile data is not found, send a 404 response
      res.status(404).send({
        message: `Cannot find Hospital Profile with id=${profileId}.`,
      });
      return;
    }

    // Combine the data from both models into a single object and send the response
    const mergedData = {
      Hospitalprofile: dataHospitalProfile,
      profile: dataProfiles,
    };
    res.send(mergedData);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Hospital Profile with id=" + hospital_profile_Id,
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const { parameter, value } = req.query;

    // Get all the data from the Pet Owner Management model
    const HospitalProfiles = await Hospitals.findAll();

    if (!HospitalProfiles || HospitalProfiles.length === 0) {
      // If no pet owner profiles are found, send a 404 response
      return res.status(404).send({
        message: "No Hospital Profiles found.",
      });
    }

    // Create an array to store the merged data for each profile
    const mergedDataArray = await Promise.all(HospitalProfiles.map(async (hospitalProfile) => {
      const profileId = hospitalProfile.profile_id;
      const dataProfiles = await Profile.findOnefunction(profileId);

      if (!dataProfiles) {
        // If profile data is not found for a client profile, return null
        return null;
      }

      // Combine the data from both models into a single object for this profile
      const mergedData = {
        id: hospitalProfile.dataValues.id,
        ...hospitalProfile.toJSON(),
        // Exclude the id from dataProfiles.toJSON() and merge the rest
        ...Object.entries(dataProfiles.toJSON())
          .filter(([key]) => key !== 'id') // Exclude the id
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      };

      return mergedData;
    }));

    // Filter out null entries
    const filteredDataArray = mergedDataArray.filter(data => data !== null);

    // Apply condition based on parameters passed
    let dataToSend = filteredDataArray;
    if (parameter && value) {
      dataToSend = filteredDataArray.filter(data => {
        return Object.keys(data).some(key => {
          return key === parameter && data[key].includes(value);
        });
      });
    }

    // If no data meets the condition, send a 404 response
    if (dataToSend.length === 0) {
      return res.status(404).send({
        message: "No Pet Owner Profiles found that meet the condition.",
      });
    }

    // Send the filtered array of merged data as the response
    res.send(dataToSend);
  } catch (err) {
    console.error("Error retrieving Pet Owner Profiles:", err);
    res.status(500).send({
      message: "Error retrieving Pet Owner Profiles.",
    });
  }
};

// Update hospital

exports.update = async (req, res) => {
  const id = req.params.id;
  try{
  const hospital = createHospitalraw(req);
  dnum = await Hospitals.update(hospital, {
    where: { id: id }
  });
  const dataHospitalProfile = await Hospitals.findByPk(id);
  const pnum = await Profile.updateone(req, dataHospitalProfile.profile_id);
    if (pnum == 1 || dnum == 1) {
      res.send({
        message: "Hospital Profile was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update Hospital Profile with id=${id}.'
      });
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while updating Hospital Profile.",
    });
  }
};

// Delete Profiles

exports.delete = async (req, res) => {
  const id = req.params.id;
  try{
    const dataHospitalProfile = await Hospitals.findByPk(id);
  const pnum = await Profile.deleteone(dataHospitalProfile.profile_id);
  dnum = await Hospitals.destroy({
    where: { id: id }
  });
    if (pnum == 1 && dnum == 1) {
      res.send({
        message: "Hospital Profile was deleted successfully."
      });
    } else {
      res.send({
        message: 'Cannot delete Hospital Profile with id=${id}.'
      });
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while deleting Hospital Profile.",
    });
  }
};

// Enable Hospital
exports.enable = async (req, res) => {
  const dataHospitalProfile = await Hospitals.findByPk(req.params.id);
  Profile.enableone(res, dataHospitalProfile.profile_id);
};

// Disable Hospital
exports.disable = async (req, res) => {
  const dataHospitalProfile = await Hospitals.findByPk(req.params.id);
  Profile.disableone(res, dataHospitalProfile.profile_id);
};