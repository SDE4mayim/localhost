const db = require("../models");
const Vaccination = db.vaccination;
const Op = db.Sequelize.Op;

// Create vaccination object from req
function createVaccination(req) {
  const vaccination = {
    animal_type: req.body.animal_type,
    age_weeks: req.body.age_weeks,
    vaccine: req.body.vaccine,
    notes: req.body.notes
  };
  return vaccination;
}

// Create Vaccination
exports.create = (req, res) => {
  const vaccination = createVaccination(req);
  Vaccination.create(vaccination)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating Vaccination."
      });
    });
};

// Find Single Vaccination
exports.findOne = (req, res) => {
  const id = req.params.id;
  const vaccinationModel = Vaccination.findByPk(id);
  vaccinationModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Vaccination with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vaccination with id=" + id
      });
    });
};

// Update Vaccination
exports.update = (req, res) => {
  const id = req.params.id;
  const vaccination = createVaccination(req);
  Vaccination.update(vaccination, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vaccination was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vaccination with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vaccination with id=" + id
      });
    });
};

// Delete Vaccination
exports.delete = (req, res) => {
  const id = req.params.id;
  Vaccination.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vaccination was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vaccination with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vaccination with id=" + id
      });
    });
};
