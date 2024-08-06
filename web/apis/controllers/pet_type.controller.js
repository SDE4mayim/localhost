const db = require("../models");
const PetType = db.pet_type;
const Op = db.Sequelize.Op;

//create PetType object from req

function createPetType(req)
{
  const petType = {
    pet_type: req.body.pet_type,
    breed: req.body.breed
  };  
  return petType;
}

// Create PetType

exports.create = (req, res) => {
  const petType = createPetType(req);
  PetType.create(petType)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating PetType."
     });
    });
};

// Find Single PetType
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const petType = PetType.findByPk(id);
  petType
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find PetType with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving PetType with id=" + id
    });
  });
};

exports.findAll = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const petType = PetType.findAll();
  petType
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find PetType with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving PetType with id=" + id
    });
  });
};
// Update PetType

exports.update = (req, res) => {
  const id = req.params.id;
  const petType = createPetType(req);
  PetType.update(petType, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PetType was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update PetType with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating PetType with id=" + id
    });
  });
};

// Delete Profiles

exports.delete = (req, res) => {
  const id = req.params.id;
  PetType.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PetType was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete PetType with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete PetType with id=" + id
    });
  });
};