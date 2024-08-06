const db = require("../models");
const SalesBill = db.salesbill;
const Op = db.Sequelize.Op;

// Create and Save a new SalesBill
exports.create = (req, res) => {
  // Validate request
  if (!req.body.total) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a SalesBill
  const salesBill = {
    pdate: req.body.pdate,
    cid: req.body.cid,
    total: req.body.total,
    discount: req.body.discount,
    discount2: req.body.discount2,
    gtotal: req.body.gtotal,
    sid: req.body.sid,
    edate: req.body.edate,
    totalpvs: req.body.totalpvs,
    usedwallet: req.body.usedwallet,
    billedby: req.body.billedby,
    cname: req.body.cname,
    cadd: req.body.cadd,
    cmobile: req.body.cmobile,
    bikeid: req.body.bikeid,
    dealer: req.body.dealer,
    bankid: req.body.bankid,
    billtype: req.body.billtype
  };

  // Save SalesBill in the database
  SalesBill.create(salesBill)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SalesBill."
      });
    });
};

// Retrieve all SalesBills from the database.
exports.findAll = (req, res) => {
  const cname = req.query.cname;
  var condition = cname ? { cname: { [Op.like]: `%${cname}%` } } : null;

  SalesBill.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales bills."
      });
    });
};

// Find a single SalesBill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SalesBill.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SalesBill with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SalesBill with id=" + id
      });
    });
};

// Update a SalesBill by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  SalesBill.update(req.body, {
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SalesBill was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update SalesBill with id=${id}. Maybe SalesBill was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SalesBill with id=" + id
      });
    });
};

// Delete a SalesBill with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SalesBill.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SalesBill was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete SalesBill with id=${id}. Maybe SalesBill was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SalesBill with id=" + id
      });
    });
};

// Delete all SalesBills from the database.
exports.deleteAll = (req, res) => {
  SalesBill.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} SalesBills were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sales bills."
      });
    });
};

// Find all published SalesBills
exports.findAllPublished = (req, res) => {
  SalesBill.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales bills."
      });
    });
};
