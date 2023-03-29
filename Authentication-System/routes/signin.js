const express = require('express');
const route = express.Router();
const validateRequest = require('../middlewares/validate-request');

const {signin} = require('../controller/signin');

const { body } = require('express-validator');

route.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('invalid email address'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password required')
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 characters'),
  ],
  validateRequest,signin);

module.exports = route;
