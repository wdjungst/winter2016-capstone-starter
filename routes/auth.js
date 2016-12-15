'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
  else
    return res.json({ })
}

router.post('/signup', (req, res) => {
  User.register(new User({username: req.body.email}), req.body.password, (err, user) => {
    if (err)
      return res.status(500).json(err);
 
    user.save( (err, user) => {
      if (err)
        return res.status(500).json(err);
      req.logIn(user, (err) => {
        return res.json(user);
      })
    });
  });
});

router.post('/signin', (req, res) => {
  User.findOne({ username: req.body.email}, (err, user) => {
    user.authenticate(req.body.password, (err, user, passwordErr) => {
      if (err)
        return res.status(500).json({ message: 'User not found' });
      if (passwordErr)
        return res.status(500).json({ message: passwordErr.message })

      req.logIn(user, (err) => {
        return res.json(user);
      })
    });
  });
});

router.get('/user', isAuthenticated, (req,res) => {
  return res.json(req.user)
});

router.delete('/sign_out', (req, res) => {
  req.logout();
  res.status(200).json({});
});


module.exports = router;
