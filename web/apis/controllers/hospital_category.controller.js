const db = require("../models");
const HospitalCategory = db.hospital_category;
const Op = db.Sequelize.Op;

//create profile object from req

function createHospitalCategory(req)
{
  const hospitalCategory = {
    category_name: req.body.category_name
  };  
  return hospitalCategory;
}

// Create Profiles

exports.create = (req, res) => {
  const hospitalCategory = createHospitalCategory(req);
  HospitalCategory.create(hospitalCategory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating hospital."
     });
    });
};

// Find Single Profiles
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const hospitalCategory = HospitalCategory.findByPk(id);
  hospitalCategory
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find hospitalCategory with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving hospitalCategory with id=" + id
    });
  });
};

exports.findAll = async (req, res) => {
  try {
    // Get all the data from the Pet Owner Management model
    const hospitalCategory = await HospitalCategory.findAll();

    if (!hospitalCategory || hospitalCategory.length === 0) {
      // If no pet owner profiles are found, send a 404 response
      res.status(404).send({
        message: "No Hospital Category found.",
      });
      return;
    }
    // Send the array of merged data as the response
    res.send(hospitalCategory);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Hospital Categories.",
    });
  }
};
// Update hospitalCategory

exports.update = (req, res) => {
  const id = req.params.id;
  const hospitalCategory = createHospitalCategory(req);
  HospitalCategory.update(hospitalCategory, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "hospitalCategory was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update hospitalCategory with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating hospitalCategory with id=" + id
    });
  });
};

// Delete Profiles

exports.delete = (req, res) => {
  const id = req.params.id;
  HospitalCategory.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "hospitalCategory was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete hospitalCategory with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete hospitalCategory with id=" + id
    });
  });
};