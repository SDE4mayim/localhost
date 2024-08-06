const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create Product object from req
function createProduct(req) {
  return {
    pname: req.body.pname,
    rate: req.body.rate,
    features: req.body.features,
    remarks: req.body.remarks,
    status: req.body.status,
    catid: req.body.catid,
    gst: req.body.gst,
    mrp: req.body.mrp,
    instock: req.body.instock,
    priority: req.body.priority,
    pcode: req.body.pcode,
    hsn: req.body.hsn
  };
}

// Create and Save a new Product
exports.create = (req, res) => {
  const product = createProduct(req);
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products
exports.findAll = (req, res) => {
  Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const product = createProduct(req);

  Product.update(product, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Enable a Product by the id in the request
exports.enable = (req, res) => {
  const id = req.params.id;

  Product.update({ status: 1 }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was enabled successfully."
        });
      } else {
        res.send({
          message: `Cannot enable Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error enabling Product with id=" + id
      });
    });
};

// Disable a Product by the id in the request
exports.disable = (req, res) => {
  const id = req.params.id;

  Product.update({ status: 0 }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was disabled successfully."
        });
      } else {
        res.send({
          message: `Cannot disable Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error disabling Product with id=" + id
      });
    });
};
