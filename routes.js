const express = require('express');
const routes = express.Router();
const auth = require('./src/middleware/auth');

//require Controllers
const UsersController = require('./src/user/Controller');

routes.post('/user/create', UsersController.create);
routes.post('/login', UsersController.login);
routes.post('/home', auth, UsersController.home);

module.exports = routes;

