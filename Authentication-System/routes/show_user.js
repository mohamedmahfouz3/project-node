const express = require('express');
const route = express.Router();
const { get_user } = require('../controller/show_user');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

route.get('/api/users/:user_id', currentUser, requireAuth, get_user);

module.exports = route;
