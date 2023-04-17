const express = require('express');
const route = express.Router();
const { delete_user } = require('../controller/delete_user');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

route.delete('/api/users/:user_id', currentUser, requireAuth, delete_user);

module.exports = route;
