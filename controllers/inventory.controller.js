const db = require("../models");
const Inventory = db.products;
const Op = db.Sequelize.Op;

//create profile object from req

function createInventory(req)
{
  const inventory = {
    id:req.body.id,
    pname: req.body.pname,
    features: req.body.features,
    remarks:req.body.remarks,
    gst:req.body.gst,
    mrp:req.body.mrp,
    instock:req.body.istock,
    pcode:req.body.pcode
  };  
  return inventory;
}

// Create Profiles

exports.create = (req, res) => {
  const inventory = createInventory(req);
  Inventory.create(inventory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating Drug."
     });
    });
};

// Find Single Profiles
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("ID = " + id);
  const inventoryModel = Inventory.findByPk(id);
  inventoryModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Drug with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving Drug with id=" + id
    });
  });
};

exports.findAll = (req, res) => {
  const inventoryModel = Inventory.findAll();
  inventoryModel
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Drug List.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving Drug List"
    });
  });
};
// Update Inventory

exports.update = (req, res) => {
  const id = req.params.id;
  const inventory = createInventory(req);
  Inventory.update(inventory, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Drug was updated successfully."
      });
    } else {
      res.send({
        message: 'Cannot update Drug with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Drug with id=" + id
    });
  });
};

// Delete Profiles

exports.delete = (req, res) => {
  const id = req.params.id;
  Inventory.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Drug was deleted successfully!"
      });
    } else {
      res.send({
        message: 'Cannot delete Drug with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Drug with id=" + id
    });
  });
};