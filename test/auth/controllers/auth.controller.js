var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Profile = require("../models/profiles.model");

require('dotenv').config({
        path: './.env'
      })
console.log(process.env.PORT)

const db = require("../models");
const Profiles = db.profiles;

exports.signup = (req, res) => {
  const profile = new Profile({
    user_name: req.body.user_name,
    email: req.body.email,
    first_name: req.body.first_name,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  profile.save((err, Profile) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "Profile Registered successfully"
        })
    }
  });
};

exports.signin = (req, res) => {
	
  const profileModel = Profiles.findAll({
	  where: {
		user_name: req.body.user_name
	  }
    });
	profileModel
    .then(data => {
      if (data) {
		  var username = data[0].user_name;
		  console.log('Username : ' + username + '.');
		  console.log('process.env.API_SECRET : ' + process.env.API_SECRET + '.');
		  //console.log('Users : ',  data );
		  //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id
      var token = jwt.sign({
        id: data[0].user_name
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          username,
          message: "Login successfull",
          accessToken: token,
        });
		
		
        //res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Profile with id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: "Error retrieving Profile with id="  + "  " + err
    });
  });
  /*
    .exec((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "Profile Not found."
          });
      }

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id
      var token = jwt.sign({
        id: user.id
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          message: "Login successfull",
          accessToken: token,
        });
    });*/
};