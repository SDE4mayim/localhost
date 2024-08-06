const db = require("../models");
const PetOwnerManagement = db.pet_owner_management;
const Op = db.Sequelize.Op;
const Profile = require("../controllers/profiles.controller");


//create petOwnerManagement object from req
async function createPetOwnerManagement(req) {
  try {
    const profile = await Profile.createone(req); // Call createProfile function to get the profile data.
    console.log(profile.id, req.body.hospital_id, req.body.doctor_id);

    if (!profile) {
      throw new Error("Profile creation error");
    }

    const doctorManagement = {
      profile_id: profile.id,
      hospital_id: req.body.hospital_id,
      doctor_id: req.body.doctor_id
    };
    return doctorManagement;
  } catch (err) {
    throw new Error("Error creating Doctor Profile : " + err.message);
  }
}

function createPetOwnerManagementraw(req)
{
  const petOwnerManagement = {
    profile_id: req.body.profile_id,
    hospital_id: req.body.hospital_id,
    doctor_id: req.body.doctor_id
  };  
  return petOwnerManagement;
}

// Create petOwnerManagement

exports.create = async (req, res) => {
  try {
    console.log("Creating Pet Owner Profile");
    const petowner = await createPetOwnerManagement(req);
    const data = await PetOwnerManagement.create(petowner);
    res.send(data); // Send the response here
    console.log("Pet Owner Profile Creation Successful");
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating Pet Owner Profile.",
    });
  }
};

// Find Single petOwnerManagement
exports.findOne = async (req, res) => {
  const pet_owner_profile_Id = req.params.id;
  console.log("Pet Owner Profile ID = " + pet_owner_profile_Id);
  
  try {
    // Get the data from Pet Owner Management model
    const datapetOwnerProfile = await PetOwnerManagement.findByPk(pet_owner_profile_Id);
    
    if (!datapetOwnerProfile) {
      // If Pet Owner Management data is not found, send a 404 response
      res.status(404).send({
        message: `Cannot find Pet Owner Profile with id=${pet_owner_profile_Id}.`,
      });
      return;
    }

    // Now, get the profile data from Profiles model using the profile id from the Pet Owner Management data
    const profileId = datapetOwnerProfile.profile_id;
    console.log(datapetOwnerProfile.profile_id); 
    const dataProfiles = await Profile.findOnefunction(profileId);
    console.log(dataProfiles.id);
    
    if (!dataProfiles) {
      // If profile data is not found, send a 404 response
      res.status(404).send({
        message: `Cannot find Pet Owner Profile with id=${profileId}.`,
      });
      return;
    }

    // Combine the data from both models into a single object and send the response
    const mergedData = {
      petownerprofile: datapetOwnerProfile,
      profile: dataProfiles,
    };
    res.send(mergedData);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Pet Owner Profile with id=" + pet_owner_profile_Id,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { parameter, value } = req.query;

    // Get all the data from the Pet Owner Management model
    const petOwnerProfiles = await PetOwnerManagement.findAll();

    if (!petOwnerProfiles || petOwnerProfiles.length === 0) {
      // If no pet owner profiles are found, send a 404 response
      return res.status(404).send({
        message: "No Pet Owner Profiles found.",
      });
    }

    // Create an array to store the merged data for each profile
    const mergedDataArray = await Promise.all(petOwnerProfiles.map(async (petOwnerProfile) => {
      const profileId = petOwnerProfile.profile_id;
      const dataProfiles = await Profile.findOnefunction(profileId);

      if (!dataProfiles) {
        // If profile data is not found for a client profile, return null
        return null;
      }

      // Combine the data from both models into a single object for this profile
      const mergedData = {
        id: petOwnerProfile.dataValues.id,
        ...petOwnerProfile.toJSON(),
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



// Update PetOwnerManagement

exports.update = async (req, res) => {
  const id = req.params.id;
  try{
  const petowner = createPetOwnerManagementraw(req);
  dnum = await PetOwnerManagement.update(petowner, {
    where: { id: id }
  });
  const dataPetOwner = await PetOwnerManagement.findByPk(id);
  const pnum = await Profile.updateone(req, dataPetOwner.profile_id);
    if (pnum == 1 || dnum == 1) {
      res.send({
        message: "Pet Owner Profile was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update Pet Owner Profile with id=${id}.'
      });
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while updating Pet Owner Profile.",
    });
  }
};
// Delete Profiles

exports.delete = async (req, res) => {
  const id = req.params.id;
  try{
    const dataPetOwner = await PetOwnerManagement.findByPk(id);
  const pnum = await Profile.deleteone(dataPetOwner.profile_id);
  dnum = await PetOwnerManagement.destroy({
    where: { id: id }
  });
    if (pnum == 1 && dnum == 1) {
      res.send({
        message: "Pet Owner Profile was deleted successfully."
      });
    } else {
      res.send({
        message: 'Cannot delete Pet Owner Profile with id=${id}.'
      });
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while deleting Pet Owner Profile.",
    });
  }
};

// Enable Doctor Management
exports.enable = async (req, res) => {
  const datapetOwner = await PetOwnerManagement.findByPk(req.params.id);
  Profile.enableone(res, datapetOwner.profile_id);
};

// Disable Doctor Management
exports.disable = async (req, res) => {
  const dataPetOwner = await PetOwnerManagement.findByPk(req.params.id);
  Profile.disableone(res, dataPetOwner.profile_id);
};
