

let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let User = require('../models/user');
let config = require('config');
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
exports.login = (req,res)=>{
	console.log(req.body);
	User.findOne({ email: req.body.username }, (err, user) => {
     console.log('result user',user);
      if (!user) { return res.sendStatus(403); }
     
      user.comparePassword(req.body.password, (error, isMatch) => {
      	console.log('isMatch',isMatch,config.SECRET_TOKEN);
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, config.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        console.log(token);
        let resultData = {
          username :user.username,
          email:user.email,
          token :token
        }
        res.status(200).json(resultData);
      });
    });

}

exports.authenticate = (req,res) =>{

  User.findOne({email:req.body.email},(err,user)=>{
      if (!user) { return res.sendStatus(403); }
      console.log('result user',user);
       if (user && bcrypt.compareSync(req.body.password, user.hash)) {
            // authentication successful
            res.status(200).json({                
                token: jwt.sign({ user: user }, config.SECRET_TOKEN)
            });
        } else {
            // authentication failed
            res.status(401).json({'message':'authentication failed'})
        }
  })
}

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

 // Get all
  exports.getAll = (req, res) => {
    User.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Count all
  exports.count = (req, res) => {
    User.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }

  // Insert
  exports.insert = (req, res) => {
    const obj = new User(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  // Get by id
  exports.get = (req, res) => {
    console.log(req.params.id);
    User.findOne({ username: req.params.username }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  // Update by id
  exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Delete by id
  exports.delete = (req, res) => {
    User.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
