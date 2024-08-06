const db = require("../models");
const PetManagement = db.pet_management;
const Op = db.Sequelize.Op;

//create profile object from req

function createPetManagement(req)
{
  const petManagement = {
    pet_name: req.body.pet_name,
    pet_type_id: req.body.pet_type_id,
    gender: req.body.gender,
    age: req.body.age,
    weight: req.body.weight,
    owner_id: req.body.owner_id,
    last_vet_visit: req.body.last_vet_visit,
    next_vet_visit: req.body.next_vet_visit,
    food_brand: req.body.food_brand,
    food_type: req.body.food_type,
    food_amount: req.body.food_amount

  };  
  return petManagement;
}

// Create Profiles

exports.create = (req, res) => {
  const petManagement = createPetManagement(req);
  PetManagement.create(petManagement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating petManagement."
     });
    });
};

// Find Single Profiles
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const petManagement = PetManagement.findByPk(id);
  petManagement
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find petManagement with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving petManagement with id=" + id
    });
  });
};
/*exports.findAll = async (req, res) => {
  try {
    const { search } = req.query;

    // Define a condition to search by pet_name if the search parameter is provided
    const condition = search ? { pet_name: { [Op.like]: `%${search}%` } } : {};

    // Get all the data from the Pet Owner Management model based on the condition
    const petProfiles = await PetManagement.findAll({
      where: {
        ...condition,
        is_active: true, // Add any additional conditions if needed
      },
    });

    if (!petProfiles || petProfiles.length === 0) {
      // If no matching pet owner profiles are found, send a 404 response
      res.status(404).send({
        message: "No matching Pet Profiles found.",
      });
      return;
    }

    // Send the array of merged data as the response
    res.send(petProfiles);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Pet Profiles.",
    });
  }
};*/

exports.findAll = async (req, res) => {
  try {
    const { parameter, value } = req.query;

    // Define a condition to search across the specified field if both parameter and value are provided
    const condition = {
      is_active: true, // Add any additional conditions if needed
    };

    if (parameter && value) {
      condition[Op.or] = [
        { [parameter]: { [Op.like]: `%${value}%` } },
        // Add more fields if needed
      ];
    }

    // Get all the data from the Pet Owner Management model based on the condition
    const petProfiles = await PetManagement.findAll({
      where: condition,
    });

    if (!petProfiles || petProfiles.length === 0) {
      // If no matching pet owner profiles are found, send a 404 response
      return res.status(404).send({
        message: "No matching Pet Profiles found.",
      });
    }

    // Send the array of merged data as the response
    res.send(petProfiles);
  } catch (err) {
    console.error("Error retrieving Pet Profiles:", err);
    res.status(500).send({
      message: "Error retrieving Pet Profiles.",
    });
  }
};

// Update petManagement

exports.update = (req, res) => {
  const id = req.params.id;
  const petManagement = createPetManagement(req);
  PetManagement.update(petManagement, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "petManagement was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update petManagement with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating petManagement with id=" + id
    });
  });
};

// Delete Profiles

exports.delete = (req, res) => {
  const id = req.params.id;
  PetManagement.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "petManagement was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete petManagement with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete petManagement with id=" + id
    });
  });
};


// Enable Pet Profile
exports.enable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await PetManagement.update({ is_active: 1 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Pet Profile was enabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot enable Pet Profile with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error enabling Pet Profile with id=" + id,
    });
  }
};

// Disable Pet Profile
exports.disable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await PetManagement.update({ is_active: 0 }, {
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