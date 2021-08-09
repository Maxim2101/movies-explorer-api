const express = require('express');

const usersRoute = express.Router();
const { updateUser, getUser } = require('../controllers/user');
const { userDataValidation } = require('../middlewares/validation');

usersRoute.get('/me', getUser);

usersRoute.patch('/me', userDataValidation, updateUser);

module.exports = usersRoute;
