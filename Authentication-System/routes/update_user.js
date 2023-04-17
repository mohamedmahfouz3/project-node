const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validate-request');

const { update_user } = require('../controller/update_user');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

route.put(
  '/api/users/:user_id',
  [
    body('name')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('you must add a name'),

    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be valid'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],

  validateRequest,
  currentUser,
  requireAuth,
  update_user
);

module.exports = route;
