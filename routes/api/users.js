const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users');
const ensureLogedIn = require('../../config/ensureLoggedIn');

// These are prefixed with /api/users
router.get('/check-token', ensureLogedIn, usersController.checkToken);
router.post('/', usersController.create); // POST /api/users (create a user - sign up)
router.post('/login', usersController.login); // POST /api/users/login

module.exports = router;