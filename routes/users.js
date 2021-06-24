var express = require('express');
var router = express.Router();

const userModel = require('../models/users');

/* GET users listing. */

router.post('/sign-up', async (req, res) => {
  const searchUser = await userModel.findOne({
    email: req.body.email
  });
  if (!searchUser) {
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cities: []
    });
    const savedUser = await newUser.save();
    req.session.user = {
      email: savedUser.email
    };
    res.redirect('/weather');
  } else {
    res.render('login');
  }
});

router.post('/sign-in', async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password
  });
  
  if (user) {
    req.session.user = {
      email: user.email
    };
    res.redirect('/weather');
  } else {
    res.render('login');
  };
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
