const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const all_users_Schema = require('../models/users');
const Allusersdb = mongoose.model('allusersdb', all_users_Schema);
const BadRequestError = require('../errors/bad-request-error');

const create_user = async (req, res) => {
 
  const { email } = req.body;

  // variabe to express that this user email is reserved before ? (email ---> unique)

  const existingEmail = await Allusersdb.findOne({ email });

  // check if two fields is all ready reserved so this user is already in our system
  if (existingEmail) {
    throw new BadRequestError('This user is already exist');
  }

  // check if only email is reserved
  if (existingEmail) {
    throw new BadRequestError('This email is reserved for another user');
  }

  // Add new user
  const users = new Allusersdb({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // save user in the database
  users.save();

  res.status(200).send('User created');
};

module.exports = { create_user };
