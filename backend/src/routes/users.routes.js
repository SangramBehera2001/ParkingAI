const express = require('express');
const usersController = require('../controllers/users.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', requireAuth, requireAdmin, usersController.getAllUsers);

module.exports = router;
