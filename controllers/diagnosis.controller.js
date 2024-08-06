// controllers/diagnosis.controller.js
const db = require("../models");
const Diagnosis = db.diagnosis;
const Op = db.Sequelize.Op;

// Create diagnosis object from req
function createDiagnosis(req) {
  const diagnosis = {
    pet_id: req.body.pet_id,
    doctor_id: req.body.doctor_id,
    diagnosis_date: req.body.diagnosis_date,
    diagnosis_notes: req.body.diagnosis_notes
  };
  return diagnosis;
}

// Create Diagnosis
exports.create = (req, res) => {
  const diagnosis = createDiagnosis(req);
  Diagnosis.create(diagnosis)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating Diagnosis."
      });
    });
};

// Find Single Diagnosis
exports.findOne = (req, res) => {
  const id = req.params.id;
  const diagnosisModel = Diagnosis.findByPk(id);
  diagnosisModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Diagnosis with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Diagnosis with id=" + id
      });
    });
};

exports.findAll = (req, res) => {
  const condition = {
    is_active: true, // Add any additional conditions if needed
  };
  const diagnosesModel = Diagnosis.findAll({
    where: condition,
  });
  diagnosesModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Diagnoses List.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving Diagnoses List"
    });
  });
};

// Update Diagnosis
exports.update = (req, res) => {
  const id = req.params.id;
  const diagnosis = createDiagnosis(req);
  Diagnosis.update(diagnosis, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Diagnosis was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Diagnosis with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Diagnosis with id=" + id
      });
    });
};

// Delete Diagnosis
exports.delete = (req, res) => {
  const id = req.params.id;
  Diagnosis.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Diagnosis was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Diagnosis with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Diagnosis with id=" + id
      });
    });
};

// Enable Pet Profile
exports.enable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Diagnosis.update({ is_active: 1 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Diagnoses was enabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot enable Diagnoses with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error enabling Diagnoses with id=" + id,
    });
  }
};

// Disable Pet Profile
exports.disable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Diagnosis.update({ is_active: 0 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Diagnoses was disabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot disable Diagnoses with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error disabling Diagnoses with id=" + id,
    });
  }
};
