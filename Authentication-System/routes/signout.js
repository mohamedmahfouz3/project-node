const express = require('express');
const route = express.Router();

const { signout } = require('../controller/sginout');

route.post('/api/users/signout', signout);

module.exports = route;
