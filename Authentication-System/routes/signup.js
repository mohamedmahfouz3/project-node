const validateRequest = require('../middlewares/validate-request');
const express = require('express');
const route = express.Router();
const {signup} = require('../controller/signup');
const { body } = require('express-validator');

route.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  signup
);

module.exports = route;
