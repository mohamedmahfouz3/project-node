const express = require('express');
const route = express.Router();
const { delete_all_users } = require('../controller/delete_all_users');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

route.delete('/api/users', currentUser, requireAuth, delete_all_users);

module.exports = route;
