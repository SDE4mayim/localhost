const db = require("../models");
const SalesBillDetails = db.salesbilldetails;
const Op = db.Sequelize.Op;

// Create and Save a new SalesBillDetails
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a SalesBillDetails
  const salesBillDetails = {
    billid: req.body.billid,
    pid: req.body.pid,
    pname: req.body.pname,
    pprice: req.body.pprice,
    qty: req.body.qty,
    total: req.body.total,
    model: req.body.model
  };

  // Save SalesBillDetails in the database
  SalesBillDetails.create(salesBillDetails)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SalesBillDetails."
      });
    });
};

// Retrieve all SalesBillDetails from the database.
exports.findAll = (req, res) => {
  const pname = req.query.pname;
  var condition = pname ? { pname: { [Op.like]: `%${pname}%` } } : null;

  SalesBillDetails.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales bill details."
      });
    });
};

// Find a single SalesBillDetails with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SalesBillDetails.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SalesBillDetails with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SalesBillDetails with id=" + id
      });
    });
};

// Update a SalesBillDetails by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  SalesBillDetails.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SalesBillDetails was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update SalesBillDetails with id=${id}. Maybe SalesBillDetails was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SalesBillDetails with id=" + id
      });
    });
};

// Delete a SalesBillDetails with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SalesBillDetails.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SalesBillDetails was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete SalesBillDetails with id=${id}. Maybe SalesBillDetails was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SalesBillDetails with id=" + id
      });
    });
};

// Delete all SalesBillDetails from the database.
exports.deleteAll = (req, res) => {
  SalesBillDetails.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} SalesBillDetails were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sales bill details."
      });
    });
};

// Find all published SalesBillDetails
exports.findAllPublished = (req, res) => {
  SalesBillDetails.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales bill details."
      });
    });
};
