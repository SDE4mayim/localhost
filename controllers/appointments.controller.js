const db = require("../models");
const Appointment = db.appointments;
const Op = db.Sequelize.Op;

//create profile object from req

function createAppointment(req)
{
  const appointment = {
    pet_id: req.body.pet_id,
    doctor_id: req.body.doctor_id,
    appointment_date: req.body.appointment_date,
    appointment_notes: req.body.appointment_notes
  };  
  return appointment;
}

// Create Profiles

exports.create = (req, res) => {
  const appointment = createAppointment(req);
  Appointment.create(appointment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating Appointment."
     });
    });
};

// Find Single Profiles
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const appointmentModel = Appointment.findByPk(id);
  appointmentModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Appointment with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving Appointment with id=" + id
    });
  });
};

exports.findAll = (req, res) => {
  const condition = {
    is_active: true, // Add any additional conditions if needed
  };
  const appointmentModel = Appointment.findAll({
    where: condition,
  });
  appointmentModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Appointment List.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving Appointment List"
    });
  });
};
// Update appointment

exports.update = (req, res) => {
  const id = req.params.id;
  const appointment = createAppointment(req);
  Appointment.update(appointment, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "appointment was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update appointment with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating appointment with id=" + id
    });
  });
};

// Delete Profiles

exports.delete = (req, res) => {
  const id = req.params.id;
  Appointment.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "appointment was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete appointment with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete appointment with id=" + id
    });
  });
};


// Enable Pet Profile
exports.enable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Appointment.update({ is_active: 1 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Appointment was enabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot enable Appointment with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error enabling Appointment with id=" + id,
    });
  }
};

// Disable Pet Profile
exports.disable = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Appointment.update({ is_active: 0 }, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Appointment was disabled successfully.",
      });
    } else {
      res.send({
        message: `Cannot disable Appoitnment with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error disabling Appointment with id=" + id,
    });
  }
};