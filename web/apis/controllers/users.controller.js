const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Find Single Article
exports.findOne = (req, res) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find User with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};