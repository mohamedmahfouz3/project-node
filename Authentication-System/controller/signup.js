const express = require('express');
const crypto = require('crypto');
require('express-async-errors');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const dotenv = require('dotenv');
const BadRequestError = require('../errors/bad-request-error');
const validateRequest = require('../middlewares/validate-request');
const currentUser = require('../middlewares/current-user');
const { error } = require('console');
const router = express.Router();
dotenv.config();


const signup = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
}

  module.exports = {signup}