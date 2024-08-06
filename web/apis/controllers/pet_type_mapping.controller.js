const db = require("../models");
const PetTypeMapping = db.pet_type_mapping;
const Op = db.Sequelize.Op;

//create PetTypeMapping object from req

function createPetTypeMapping(req)
{
  const petTypeMapping = {
    doctor_id: req.body.doctor_id,
    pet_type_id: req.body.pet_type_id
  };  
  return petTypeMapping;
}

// Create PetTypeMapping

exports.create = (req, res) => {
  const petTypeMapping = createPetTypeMapping(req);
  PetTypeMapping.create(petTypeMapping)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating PetTypeMapping."
     });
    });
};

// Find Single PetTypeMapping
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const petTypeMapping = PetTypeMapping.findByPk(id);
  petTypeMapping
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find PetTypeMapping with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving PetTypeMapping with id=" + id
    });
  });
};
// Update PetTypeMapping

exports.update = (req, res) => {
  const id = req.params.id;
  const petTypeMapping = createPetTypeMapping(req);
  PetTypeMapping.update(petTypeMapping, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PetTypeMapping was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update PetTypeMapping with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating PetTypeMapping with id=" + id
    });
  });
};

// Delete Profiles

exports.delete = (req, res) => {
  const id = req.params.id;
  PetTypeMapping.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PetTypeMapping was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete PetTypeMapping with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete PetTypeMapping with id=" + id
    });
  });
};