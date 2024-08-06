const db = require("../models");
const Profiles = db.profiles;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
exports.createProfile = createProfile;

// Synchronous create profile object from req
function createProfile(req) {
  profile = {
    user_name: req.body.user_name,
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    phone: req.body.phone,
    alt_phone: req.body.alt_phone,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    street_address: req.body.street_address,
    city_name: req.body.city_name,
    state_name: req.body.state_name,
    postal_code: req.body.postal_code,
    country: req.body.country,
    profile_image_url: req.body.profile_image_url,
    is_active: req.body.is_active,
  };
  return profile;
}



// Create Profiles (asynchronous using async/await)
exports.create = async (req, res) => {
  console.log("Creating Profile");
  try {
    profile = createProfile(req);
    const data = await Profiles.create(profile);
    //res.send(data);
    profile.id = data.id;
    console.log("Profile Creation Successful : " + data.id + "  : " + profile.id);
  } catch (err) {
    res.status(500).send({
      message: err.message + " Some error occurred while creating the Profile.",
    });
  }
  return profile;
};

// Create Profiles (asynchronous using async/await)
exports.createone = async (req) => {
  console.log("Creating Profile");
  try {
    profile = createProfile(req);
    const data = await Profiles.create(profile);
    //res.send(data);
    profile.id = data.id;
    return data;
    console.log("Profile Creation Successful : " + data.id + "  : " + profile.id);
  } catch (err) {
    /*res.status(500).send({
      message: err.message + " Some error occurred while creating the Profile.",
    });*/
    return 0;
  }
  return profile;
};

// Find Single Profiles (asynchronous using async/await)
exports.findOne = async (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  try {
    const data = await Profiles.findByPk(id);
    if (data) {
      return data;
    } else {
      res.status(404).send({
        message: `Cannot find Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Profile with id=" + id,
    });
  }
  
};

exports.findOnefunction = async (id) => {
  console.log("ID = " + id);
  try {
    const profile = await Profiles.findByPk(id);

    if (profile) {
      // Check the is_active property
      if (profile.is_active) {
        return profile;
      } else {
        return null; // Profile exists but is not active
      }
    } else {
      return null; // Profile not found
    }
  } catch (err) {
    console.error("Error retrieving Profile with id=" + id, err);
    throw err; // You may want to handle this error at a higher level in your application
  }
};

// Update Profiles (asynchronous using async/await)
exports.update = async (req, res) => {
  const id = req.params.id;
  const profile = createProfile(req);
  try {
    const num = await Profiles.update(profile, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Profiles with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Profiles with id=" + id,
    });
  }
};

exports.updateone = async (req, id) => {
  const profile = createProfile(req);
  try {
    const num = await Profiles.update(profile, {
      where: { id: id },
    });
    if (num == 1) {
      /*res.send({
        message: "Profile was updated successfully.",
      });*/
      return 1;
    } else {
      /*res.send({
        message: `Cannot update Profiles with id=${id}.`,
      });*/
      return 0;
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Profiles with id=" + id,
    });
  }
};





// Delete Profiles (asynchronous using async/await)
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Profiles.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Profiles with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Profile with id=" + id,
    });
  }
};

exports.deleteone = async (id) => {
  try {
    const num = await Profiles.destroy({
      where: { id: id },
    });
    if (num == 1) {
      /*res.send({
        message: "Profile was deleted successfully!",
      });*/
      return 1;
    } else {
      /*res.send({
        message: `Cannot delete Profiles with id=${id}.`,
      });*/
      return 0;
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Profile with id=" + id,
    });
  }
};


// Enable Doctor Management
exports.enable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Profiles.update({ is_active: 1 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was enabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot enable Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error enabling Profile with id=" + id,
    });
  }
};

exports.enableone = async (res , id) => {
  try {
    const num = await Profiles.update({ is_active: 1 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was enabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot enable Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error enabling Profile with id=" + id,
    });
  }
};

// Disable Doctor Management
exports.disable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Profiles.update({ is_active: 0 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was disabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot disable Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error disabling Profile with id=" + id,
    });
  }
};

exports.disableone = async (res , id) => {
  try {
    const num = await Profiles.update({ is_active: 0 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Profile was disabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot disable Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error disabling Profile with id=" + id,
    });
  }
};