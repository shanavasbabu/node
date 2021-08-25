const express = require("express");

const router = express.Router();

// require('dotenv/config')

const mongoose = require("mongoose");

const login = require("../models/login");

const userData = require("../models/register");

const db = "mongodb://localhost:27017/formTask";
// const db = process.env.MONGO_LOCAL_CONN_URL;
var bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);
// PUT FUNCTION

router.put("/updateuser/:id", (req, res, next) => {
  userData
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// find and post function in login

router.post("/loginpost", async (req, res) => {
  let userdata = req.body;
 const d =  await userData.findOne({username: userdata.username})
 console.log(d.passwords)
 console.log(userdata.password)
 console.log('111111111111111')

 if(!d){
  res.status(400).send("Invalid Username")
 }
 bcrypt.compare(userdata.password, d.passwords).then(match => {
  console.log(match)
  if(match){

    const payload = { name: d.username };
                const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                // const secret =process.env.JWT_SECRET;
                const secret ='MyToken';
                const token = jwt.sign(payload, secret, options);
                   res.send({token:token, name:d.username})


  }else{
    res.status(404).send("Invalid Username & password")
  }
 });
});

// find and post 

router.post("/post", (req, res) => {
  let userdata = req.body;
  let user = new userData(userdata);
  user.save((error, registerd) => {
    if (error) {
      console.log(error);
    } else {
      res.send(user);
    }
  });
});

// delete function

router.delete("/deleteuser/:id", (req, res) => {
  userData.findByIdAndDelete(req.params.id, (err, deleteuser) => {
    res.send(deleteuser);
  });
});

// get Function
router.get("/get", (req, res) => {
  userData.find((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// get Function in login
router.get("/loginget", (req, res) => {
  login.find((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

router.get("/getuser/:id", (req, res) => {
  console.log(req.params.id);
  userData.findOne({ _id: req.params.id }, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
