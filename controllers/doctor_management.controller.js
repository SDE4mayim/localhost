const db = require("../models");
const doctor_management = db.doctor_management;
const Op = db.Sequelize.Op;
const Profile = require("../controllers/profiles.controller");

// Create doctor management object from req
async function createDoctorManagement(req) {
  try {
    const profile = await Profile.createone(req); // Call createProfile function to get the profile data.
    console.log(profile.id, req.body.hospital_id);

    if (!profile) {
      throw new Error("Profile creation error");
    }

    const doctorManagement = {
      profile_id: profile.id,
      hospital_id: req.body.hospital_id,
    };
    return doctorManagement;
  } catch (err) {
    throw new Error("Error creating Doctor Profile : " + err.message);
  }
}

function createDoctorManagementraw(req)
{
  const doctorManagement = {
    profile_id: req.body.profile_id,
    hospital_id: req.body.hospital_id
  };  
  return doctorManagement;
}


// Create Doctor Management
exports.create = async (req, res) => {
  try {
    console.log("Creating Doctor Profile");
    const doctorManagement = await createDoctorManagement(req);
    const data = await doctor_management.create(doctorManagement);
    res.send(data); // Send the response here
    console.log("Doctor Profile Creation Successful");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating Doctor Profile.",
    });
  }
};


// Find Single Doctor Management
exports.findOne = async (req, res) => {
  const doctor_profile_Id = req.params.id;
  console.log("Doctor Profile ID = " + doctor_profile_Id);
  
  try {
    // Get the data from doctor_management model
    const dataDoctorProfile = await doctor_management.findByPk(doctor_profile_Id);
    
    if (!dataDoctorProfile) {
      // If doctor_management data is not found, send a 404 response
      res.status(404).send({
        message: `Cannot find Doctor Profile with id=${doctor_profile_Id}.`,
      });
      return;
    }

    // Now, get the profile data from Profiles model using the profile id from the doctorManagement data
    const profileId = dataDoctorProfile.profile_id;
    console.log(dataDoctorProfile.profile_id); 
    const dataProfiles = await Profile.findOnefunction(profileId);
    console.log(dataProfiles.id);
    
    if (!dataProfiles) {
      // If profile data is not found, send a 404 response
      res.status(404).send({
        message: `Cannot find Doctor Profile with id=${profileId}.`,
      });
      return;
    }

    // Combine the data from both models into a single object and send the response
    const mergedData = {
      Doctorprofile: dataDoctorProfile,
      profile: dataProfiles,
    };
    res.send(mergedData);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Doctor Profile with id=" + doctor_profile_Id,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { parameter, value } = req.query;

    // Get all the data from the Pet Owner Management model
    const doctorProfiles = await doctor_management.findAll();

    if (!doctorProfiles || doctorProfiles.length === 0) {
      // If no pet owner profiles are found, send a 404 response
      return res.status(404).send({
        message: "No Doctor Profiles found.",
      });
    }

    // Create an array to store the merged data for each profile
    const mergedDataArray = await Promise.all(doctorProfiles.map(async (doctorProfile) => {
      const profileId = doctorProfile.profile_id;
      const dataProfiles = await Profile.findOnefunction(profileId);

      if (!dataProfiles) {
        // If profile data is not found for a client profile, return null
        return null;
      }

      // Combine the data from both models into a single object for this profile
      const mergedData = {
        id: doctorProfile.dataValues.id,
        ...doctorProfile.toJSON(),
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


// Update Doctor Management
exports.update = async (req, res) => {
  const id = req.params.id;
  try{
  const doctorManagement = createDoctorManagementraw(req);
  dnum = await doctor_management.update(doctorManagement, {
    where: { id: id }
  });
  const dataDoctorManagement = await doctor_management.findByPk(id);
  const pnum = await Profile.updateone(req, dataDoctorManagement.profile_id);
    if (pnum == 1 || dnum == 1) {
      res.send({
        message: "Doctor Profile was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update Doctor Profile with id=${id}.'
      });
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while updating Doctor Profile.",
    });
  }
};

// Delete Doctor Management
exports.delete = async (req, res) => {
  const id = req.params.id;
  try{
    const dataDoctorManagement = await doctor_management.findByPk(id);
  const pnum = await Profile.deleteone(dataDoctorManagement.profile_id);
  dnum = await doctor_management.destroy({
    where: { id: id }
  });
    if (pnum == 1 && dnum == 1) {
      res.send({
        message: "Doctor Profile was deleted successfully."
      });
    } else {
      res.send({
        message: 'Cannot delete Doctor Profile with id=${id}.'
      });
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while deleting Doctor Profile.",
    });
  }
};

// Enable Doctor Management
exports.enable = async (req, res) => {
  const dataDoctorManagement = await doctor_management.findByPk(req.params.id);
  Profile.enableone(res, dataDoctorManagement.profile_id);
};

// Disable Doctor Management
exports.disable = async (req, res) => {
  const dataDoctorManagement = await doctor_management.findByPk(req.params.id);
  Profile.disableone(res, dataDoctorManagement.profile_id);
};
