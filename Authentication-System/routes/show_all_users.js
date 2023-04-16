const express = require('express');
const route = express.Router();
const { get_all_users } = require('../controller/show_all_users');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

route.get('/api/users', currentUser, requireAuth, get_all_users);

module.exports = route;
